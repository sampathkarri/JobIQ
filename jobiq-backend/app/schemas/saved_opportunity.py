from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class SavedOpportunityCreate(BaseModel):
    opportunity_id: int

class SavedOpportunityRead(BaseModel):
    id: int
    user_id: int
    opportunity_id: int
    saved_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class SavedOpportunityListResponse(BaseModel):
    items: list[SavedOpportunityRead]
