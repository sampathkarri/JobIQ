from __future__ import annotations
from datetime import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict

class ResumeCreate(BaseModel):
    title: str
    raw_text: str | None = None
    file_url: str | None = None

class ResumeRead(BaseModel):
    id: int
    user_id: int
    title: str
    file_url: str | None = None
    raw_text: str | None = None
    parsed_data: dict[str, Any] | None = None
    skills: list[str] | None = None
    experience_summary: str | None = None
    education_summary: str | None = None
    projects: list[str] | None = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class ResumeListResponse(BaseModel):
    items: list[ResumeRead]
