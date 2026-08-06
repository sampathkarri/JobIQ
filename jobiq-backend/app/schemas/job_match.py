from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class JobMatchRead(BaseModel):
    id: int
    user_id: int
    opportunity_id: int
    match_score: int
    matching_skills: list[str] | None = None
    missing_skills: list[str] | None = None
    match_reason: str | None = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class JobMatchListResponse(BaseModel):
    items: list[JobMatchRead]
