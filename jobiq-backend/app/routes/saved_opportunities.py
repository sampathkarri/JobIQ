from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.dependencies import get_current_active_user
from app.models import SavedOpportunity, Opportunity, User
from app.schemas.saved_opportunity import SavedOpportunityCreate, SavedOpportunityRead, SavedOpportunityListResponse

router = APIRouter(prefix="/saved-opportunities", tags=["saved-opportunities"])


@router.post("/", response_model=SavedOpportunityRead, status_code=status.HTTP_201_CREATED)
def create_saved_opportunity(
    saved_in: SavedOpportunityCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    opportunity = db.query(Opportunity).filter(Opportunity.id == saved_in.opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
        
    existing = db.query(SavedOpportunity).filter(
        SavedOpportunity.user_id == current_user.id,
        SavedOpportunity.opportunity_id == saved_in.opportunity_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=409, detail="Opportunity already saved")
        
    new_saved = SavedOpportunity(
        user_id=current_user.id,
        opportunity_id=saved_in.opportunity_id
    )
    db.add(new_saved)
    db.commit()
    db.refresh(new_saved)
    return new_saved


@router.get("/", response_model=SavedOpportunityListResponse)
def list_saved_opportunities(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    saved = db.query(SavedOpportunity).filter(SavedOpportunity.user_id == current_user.id).order_by(SavedOpportunity.saved_at.desc()).all()
    return SavedOpportunityListResponse(items=saved)


@router.delete("/{opportunity_id}")
def delete_saved_opportunity(
    opportunity_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    saved = db.query(SavedOpportunity).filter(
        SavedOpportunity.user_id == current_user.id,
        SavedOpportunity.opportunity_id == opportunity_id
    ).first()
    
    if not saved:
        raise HTTPException(status_code=404, detail="Saved opportunity not found")
        
    db.delete(saved)
    db.commit()
    return {"detail": "Opportunity unsaved"}

