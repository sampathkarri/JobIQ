from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.opportunity import Opportunity
from app.models.saved_opportunity import SavedOpportunity
from app.models.user import User
from app.routes.opportunities import _opportunity_to_read
from app.schemas.saved_opportunity import (
    SavedOpportunityCreate,
    SavedOpportunityListResponse,
    SavedOpportunityRead,
)
from app.utils.dependencies import get_current_active_user

router = APIRouter(prefix="/saved-opportunities", tags=["saved-opportunities"])


def _saved_to_read(saved: SavedOpportunity) -> SavedOpportunityRead:
    opp_read = _opportunity_to_read(saved.opportunity) if saved.opportunity else None
    return SavedOpportunityRead(
        id=saved.id,
        user_id=saved.user_id,
        opportunity_id=saved.opportunity_id,
        saved_at=saved.saved_at,
        opportunity=opp_read,
    )


@router.post("/", response_model=SavedOpportunityRead, status_code=status.HTTP_201_CREATED)
def create_saved_opportunity(
    saved_in: SavedOpportunityCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    opportunity = db.query(Opportunity).filter(Opportunity.id == saved_in.opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    existing = db.query(SavedOpportunity).filter(
        SavedOpportunity.user_id == current_user.id,
        SavedOpportunity.opportunity_id == saved_in.opportunity_id,
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Opportunity already saved")

    new_saved = SavedOpportunity(
        user_id=current_user.id,
        opportunity_id=saved_in.opportunity_id,
    )
    db.add(new_saved)
    db.commit()
    db.refresh(new_saved)
    return _saved_to_read(new_saved)


@router.get("/", response_model=SavedOpportunityListResponse)
def list_saved_opportunities(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    saved_rows = (
        db.query(SavedOpportunity)
        .filter(SavedOpportunity.user_id == current_user.id)
        .order_by(SavedOpportunity.saved_at.desc())
        .all()
    )
    return SavedOpportunityListResponse(items=[_saved_to_read(s) for s in saved_rows])


@router.delete("/{opportunity_id}")
def delete_saved_opportunity(
    opportunity_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    saved = db.query(SavedOpportunity).filter(
        SavedOpportunity.user_id == current_user.id,
        SavedOpportunity.opportunity_id == opportunity_id,
    ).first()

    if not saved:
        raise HTTPException(status_code=404, detail="Saved opportunity not found")

    db.delete(saved)
    db.commit()
    return {"detail": "Opportunity unsaved"}
