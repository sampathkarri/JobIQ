from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class UserRead(BaseModel):
    id: int
    email: str
    full_name: str | None = None
    phone: str | None = None
    location: str | None = None
    current_role: str | None = None
    experience_years: int | None = None
    preferred_salary_min: int | None = None
    preferred_salary_max: int | None = None
    preferred_locations: list[str] | None = None
    preferred_job_types: list[str] | None = None
    avatar_url: str | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    location: str | None = None
    current_role: str | None = None
    experience_years: int | None = None
    preferred_salary_min: int | None = None
    preferred_salary_max: int | None = None
    preferred_locations: list[str] | None = None
    preferred_job_types: list[str] | None = None
    avatar_url: str | None = None
