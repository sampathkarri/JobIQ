from __future__ import annotations

import json

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.opportunity import Opportunity
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityIngestResponse,
    OpportunityListResponse,
    OpportunityRead,
)
from app.services.opportunity_ingestion import ingest_opportunities

router = APIRouter(prefix="/opportunities", tags=["opportunities"])


def _opportunity_to_read(opp: Opportunity) -> OpportunityRead:
    """Convert an Opportunity model instance to an OpportunityRead schema."""
    required_skills = None
    if opp.required_skills:
        try:
            required_skills = json.loads(opp.required_skills)
        except (json.JSONDecodeError, TypeError):
            required_skills = None

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
):
    """List opportunities with search, filtering, and pagination."""
    query = db.query(Opportunity).filter(Opportunity.is_active == True)

    # Full-text search across title, description, company
    if q:
        search_filter = or_(
            Opportunity.title.ilike(f"%{q}%"),
            Opportunity.description.ilike(f"%{q}%"),
            Opportunity.company.ilike(f"%{q}%"),
        )
        query = query.filter(search_filter)

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

    # Skills filter: match any of the comma-separated skills
    if skills:
        skill_list = [s.strip() for s in skills.split(",") if s.strip()]
        if skill_list:
            skill_filters = [
                Opportunity.required_skills.ilike(f"%{skill}%") for skill in skill_list
            ]
            query = query.filter(or_(*skill_filters))

    total = query.count()
    offset = (page - 1) * per_page
    rows = query.order_by(Opportunity.created_at.desc()).offset(offset).limit(per_page).all()

    return OpportunityListResponse(
        items=[_opportunity_to_read(r) for r in rows],
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/{opportunity_id}", response_model=OpportunityRead)
def get_opportunity(opportunity_id: int, db: Session = Depends(get_db)):
    """Get a single opportunity by ID."""
    opp = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return _opportunity_to_read(opp)


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


@router.post("/ingest/remotive", response_model=OpportunityIngestResponse)
def ingest_opportunities_from_remotive(
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Trigger ingestion of jobs from the Remotive API."""
    from app.scrapers.remotive import RemotiveScraper

    try:
        scraper = RemotiveScraper()
        result = ingest_opportunities(db, scraper)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    return OpportunityIngestResponse(**result)
