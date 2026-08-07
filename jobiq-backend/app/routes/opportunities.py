from __future__ import annotations

import json
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.job_match import JobMatch
from app.models.opportunity import Opportunity
from app.models.saved_opportunity import SavedOpportunity
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
    is_saved: bool = False,
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
        posted_at=opp.posted_at,
        company_logo_url=opp.company_logo_url,
        is_active=opp.is_active,
        created_at=opp.created_at,
        updated_at=opp.updated_at,
        match_score=match_score,
        is_saved=is_saved,
    )


@router.get("/", response_model=OpportunityListResponse)
def list_opportunities(
    q: str | None = None,
    location: str | None = None,
    salary_min: int | None = None,
    salary_max: int | None = None,
    type: str | None = None,
    job_level: str | None = None,
    employment_type: str | None = None,
    remote: bool | None = None,
    skills: str | None = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    """
    List opportunities with search, filtering, and pagination.
    If user is authenticated, includes match scores and saved state.
    """
    query = db.query(Opportunity).filter(Opportunity.is_active == True)

    # Search
    if q:
        search_filter = or_(
            Opportunity.title.ilike(f"%{q}%"),
            Opportunity.description.ilike(f"%{q}%"),
            Opportunity.company.ilike(f"%{q}%"),
        )
        query = query.filter(search_filter)

    # Filters
    if location:
        query = query.filter(Opportunity.location.ilike(f"%{location}%"))

    if salary_min is not None:
        query = query.filter(Opportunity.salary_min >= salary_min)

    if salary_max is not None:
        query = query.filter(Opportunity.salary_max <= salary_max)

    if type:
        query = query.filter(Opportunity.type == type)

    if job_level:
        query = query.filter(Opportunity.job_level == job_level)

    if employment_type:
        query = query.filter(Opportunity.employment_type == employment_type)

    if remote is not None:
        query = query.filter(Opportunity.remote == remote)

    # Skills filtering
    if skills:
        skill_list = [s.strip().lower() for s in skills.split(",") if s.strip()]
        if skill_list:
            for skill in skill_list:
                query = query.filter(Opportunity.required_skills.ilike(f"%{skill}%"))

    total = query.count()
    offset = (page - 1) * per_page
    opportunities = query.order_by(Opportunity.created_at.desc()).offset(offset).limit(per_page).all()

    # Get match scores if user authenticated
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

            is_saved = (
                db.query(SavedOpportunity)
                .filter(
                    and_(
                        SavedOpportunity.user_id == current_user.id,
                        SavedOpportunity.opportunity_id == opp.id,
                    )
                )
                .first()
                is not None
            )

            items.append(
                _opportunity_to_read(
                    opp,
                    match_score=match.match_score if match else None,
                    is_saved=is_saved,
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
    """
    Get personalized job recommendations for current user.
    Sorted by match score (highest first).
    """
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
            is_saved = (
                db.query(SavedOpportunity)
                .filter(
                    and_(
                        SavedOpportunity.user_id == current_user.id,
                        SavedOpportunity.opportunity_id == opp.id,
                    )
                )
                .first()
                is not None
            )

            opportunities.append(
                _opportunity_to_read(
                    opp,
                    match_score=match.match_score,
                    is_saved=is_saved,
                )
            )

    return OpportunityListResponse(
        items=opportunities,
        total=len(opportunities),
        page=1,
        per_page=limit,
    )


@router.get("/saved", response_model=OpportunityListResponse)
def get_saved_opportunities(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Get user's saved opportunities."""
    query = db.query(SavedOpportunity).filter(SavedOpportunity.user_id == current_user.id)

    total = query.count()
    offset = (page - 1) * per_page

    saved_opps = query.offset(offset).limit(per_page).all()

    opportunities = []
    for saved_opp in saved_opps:
        opp = db.query(Opportunity).filter(Opportunity.id == saved_opp.opportunity_id).first()

        if opp:
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

            opportunities.append(
                _opportunity_to_read(
                    opp,
                    match_score=match.match_score if match else None,
                    is_saved=True,
                )
            )

    return OpportunityListResponse(
        items=opportunities,
        total=total,
        page=page,
        per_page=per_page,
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
    is_saved = False
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

        is_saved = (
            db.query(SavedOpportunity)
            .filter(
                and_(
                    SavedOpportunity.user_id == current_user.id,
                    SavedOpportunity.opportunity_id == opportunity_id,
                )
            )
            .first()
            is not None
        )

    return {
        **_opportunity_to_read(opp, match_score, is_saved).model_dump(),
        "match_reason": match_reason,
    }


@router.post("/{opportunity_id}/save", status_code=status.HTTP_201_CREATED)
def save_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Save/bookmark an opportunity for later."""
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()

    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    existing = (
        db.query(SavedOpportunity)
        .filter(
            and_(
                SavedOpportunity.user_id == current_user.id,
                SavedOpportunity.opportunity_id == opportunity_id,
            )
        )
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Already saved")

    saved = SavedOpportunity(user_id=current_user.id, opportunity_id=opportunity_id)
    db.add(saved)
    db.commit()

    return {"message": "Opportunity saved"}


@router.delete("/{opportunity_id}/save", status_code=status.HTTP_200_OK)
def unsave_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Remove an opportunity from saved list."""
    saved = (
        db.query(SavedOpportunity)
        .filter(
            and_(
                SavedOpportunity.user_id == current_user.id,
                SavedOpportunity.opportunity_id == opportunity_id,
            )
        )
        .first()
    )

    if not saved:
        raise HTTPException(status_code=404, detail="Saved opportunity not found")

    db.delete(saved)
    db.commit()

    return {"message": "Opportunity removed from saved"}


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



