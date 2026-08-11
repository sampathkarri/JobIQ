from __future__ import annotations

import json
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import and_, or_, cast, String
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.job_match import JobMatch
from app.models.opportunity import Opportunity
from app.models.user import User
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityIngestResponse,
    OpportunityListResponse,
    OpportunityRead,
)
from app.services.opportunity_ingestion import ingest_opportunities
from app.utils.dependencies import get_current_active_user, get_current_user_optional

router = APIRouter(prefix="/opportunities", tags=["opportunities"])


def _opportunity_to_read(
    opp: Opportunity,
    match_score: int | None = None,
) -> OpportunityRead:
    """Convert Opportunity model to OpportunityRead schema."""
    required_skills = []
    if opp.required_skills:
        try:
            if isinstance(opp.required_skills, str):
                required_skills = json.loads(opp.required_skills)
            elif isinstance(opp.required_skills, list):
                required_skills = opp.required_skills
        except (json.JSONDecodeError, TypeError):
            required_skills = []

    return OpportunityRead(
        id=opp.id,
        type=opp.type or "job",
        title=opp.title,
        company=opp.company,
        location=opp.location,
        salary_min=opp.salary_min,
        salary_max=opp.salary_max,
        stipend=opp.stipend,
        prize_pool=opp.prize_pool,
        duration_weeks=opp.duration_weeks,
        description=opp.description,
        required_skills=required_skills,
        job_level=opp.job_level,
        employment_type=opp.employment_type,
        remote=opp.remote or False,
        application_deadline=opp.application_deadline,
        source=opp.source,
        source_url=opp.source_url,
        source_job_id=opp.source_job_id,
        company_logo_url=opp.company_logo_url,
        match_score=match_score,
        is_saved=False,
    )


@router.get("/", response_model=OpportunityListResponse)
def list_opportunities(
    q: str | None = Query(None, description="Search keyword for title/company/description"),
    location: str | None = Query(None, description="Filter by location"),
    type: str | None = Query(None, description="Filter by type (job, internship, hackathon, competition)"),
    job_level: str | None = Query(None, description="Filter by job level"),
    remote: bool | None = Query(None, description="Filter by remote work"),
    salary_min: int | None = Query(None, description="Filter by minimum salary"),
    skills: str | None = Query(None, description="Filter by required skills (comma-separated)"),
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    """List opportunities with filtering and pagination."""
    query = db.query(Opportunity).filter(Opportunity.is_active == True)

    if q:
        search_pattern = f"%{q}%"
        query = query.filter(
            or_(
                Opportunity.title.ilike(search_pattern),
                Opportunity.company.ilike(search_pattern),
                Opportunity.description.ilike(search_pattern),
            )
        )

    if location:
        query = query.filter(Opportunity.location.ilike(f"%{location}%"))

    if type:
        query = query.filter(Opportunity.type == type)

    if job_level:
        query = query.filter(Opportunity.job_level == job_level)

    if remote is not None:
        query = query.filter(Opportunity.remote == remote)

    if salary_min is not None:
        query = query.filter(Opportunity.salary_max >= salary_min)

    if skills:
        skill_list = [s.strip() for s in skills.split(",") if s.strip()]
        for skill in skill_list:
            query = query.filter(cast(Opportunity.required_skills, String).ilike(f"%{skill}%"))

    total = query.count()
    offset = (page - 1) * per_page
    opportunities = query.order_by(Opportunity.created_at.desc()).offset(offset).limit(per_page).all()

    items = []
    if current_user:
        for opp in opportunities:
            match = (
                db.query(JobMatch)
                .filter(
                    and_(
                        JobMatch.user_id == current_user.id,
                        JobMatch.opportunity_id == opp.id,
                    )
                )
                .first()
            )

            items.append(
                _opportunity_to_read(
                    opp,
                    match_score=match.match_score if match else None,
                )
            )
    else:
        items = [_opportunity_to_read(opp) for opp in opportunities]

    return OpportunityListResponse(
        items=items,
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/recommended", response_model=OpportunityListResponse)
def get_recommended_opportunities(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Get personalized recommendations based on AI Job Matches."""
    matches = (
        db.query(JobMatch)
        .filter(JobMatch.user_id == current_user.id)
        .order_by(JobMatch.match_score.desc())
        .limit(limit)
        .all()
    )

    opportunities = []
    for match in matches:
        opp = db.query(Opportunity).filter(Opportunity.id == match.opportunity_id).first()

        if opp:
            opportunities.append(
                _opportunity_to_read(
                    opp,
                    match_score=match.match_score,
                )
            )

    return OpportunityListResponse(
        items=opportunities,
        total=len(opportunities),
        page=1,
        per_page=limit,
    )


@router.get("/{opportunity_id}", response_model=dict)
def get_opportunity_details(
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    """Get detailed information about a specific opportunity."""
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()

    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    match_score = None
    match_reason = None

    if current_user:
        match = (
            db.query(JobMatch)
            .filter(
                and_(
                    JobMatch.user_id == current_user.id,
                    JobMatch.opportunity_id == opportunity_id,
                )
            )
            .first()
        )

        if match:
            match_score = match.match_score
            match_reason = match.match_reason

    return {
        **_opportunity_to_read(opp, match_score).model_dump(),
        "match_reason": match_reason,
    }


@router.post("/", response_model=OpportunityRead, status_code=status.HTTP_201_CREATED)
def create_opportunity(payload: OpportunityCreate, db: Session = Depends(get_db)):
    """Create a new opportunity."""
    row = Opportunity(
        type=payload.type,
        title=payload.title,
        company=payload.company,
        location=payload.location,
        salary_min=payload.salary_min,
        salary_max=payload.salary_max,
        stipend=payload.stipend,
        prize_pool=payload.prize_pool,
        duration_weeks=payload.duration_weeks,
        description=payload.description,
        required_skills=json.dumps(payload.required_skills) if payload.required_skills else None,
        job_level=payload.job_level,
        employment_type=payload.employment_type,
        remote=payload.remote,
        application_deadline=payload.application_deadline,
        source=payload.source,
        source_url=payload.source_url,
        source_job_id=payload.source_job_id,
        company_logo_url=payload.company_logo_url,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return _opportunity_to_read(row)
