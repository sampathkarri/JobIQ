from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.schemas.opportunity import OpportunityRead


class ApplicationCreate(BaseModel):
    opportunity_id: int
    status: str = "interested"
    notes: str | None = None


class ApplicationRead(BaseModel):
    id: int
    user_id: int
    opportunity_id: int
    status: str
    applied_date: datetime | None = None
    notes: str | None = None
    interview_dates: list[str] | None = None
    salary_offered: int | None = None
    rejected_reason: str | None = None
    source_application_url: str | None = None
    opportunity: OpportunityRead | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ApplicationUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None
    interview_dates: list[str] | None = None
    salary_offered: int | None = None
    rejected_reason: str | None = None
    source_application_url: str | None = None


class ApplicationListResponse(BaseModel):
    items: list[ApplicationRead]
    total: int
