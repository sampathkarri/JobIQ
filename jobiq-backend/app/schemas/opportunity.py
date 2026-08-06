from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class OpportunityCreate(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    source_url: Optional[str] = None
    description: Optional[str] = None


class OpportunityRead(BaseModel):
    id: int
    title: str
    company: str
    location: Optional[str]
    source_url: Optional[str]
    description: Optional[str]
    posted_at: Optional[datetime]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class OpportunityListResponse(BaseModel):
    items: list[OpportunityRead]


class OpportunityIngestResponse(BaseModel):
    fetched: int
    created: int
    updated: int
