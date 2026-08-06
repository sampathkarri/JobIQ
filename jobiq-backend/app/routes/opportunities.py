from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.opportunity import Opportunity
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityIngestResponse,
    OpportunityListResponse,
    OpportunityRead,
)
from app.services.opportunity_ingestion import (
    OpportunityIngestionError,
    ingest_remotive_opportunities,
)

router = APIRouter(prefix="/opportunities", tags=["opportunities"])


@router.get("/", response_model=OpportunityListResponse)
def list_opportunities(db: Session = Depends(get_db)) -> OpportunityListResponse:
    rows = db.query(Opportunity).order_by(Opportunity.created_at.desc()).all()
    return OpportunityListResponse(items=[OpportunityRead.model_validate(row) for row in rows])


@router.post("/", response_model=OpportunityRead, status_code=status.HTTP_201_CREATED)
def create_opportunity(payload: OpportunityCreate, db: Session = Depends(get_db)) -> OpportunityRead:
    row = Opportunity(
        title=payload.title,
        company=payload.company,
        location=payload.location,
        source_url=payload.source_url,
        description=payload.description,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return OpportunityRead.model_validate(row)


@router.post("/ingest/remotive", response_model=OpportunityIngestResponse)
def ingest_opportunities_from_remotive(
    limit: int = Query(default=20, ge=1, le=100), db: Session = Depends(get_db)
) -> OpportunityIngestResponse:
    try:
        result = ingest_remotive_opportunities(db, limit=limit)
    except OpportunityIngestionError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return OpportunityIngestResponse(**result)
