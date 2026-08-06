from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class OpportunityCreate(BaseModel):
    title: str
    company: str
    type: str = "job"
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    stipend: int | None = None
    prize_pool: int | None = None
    duration_weeks: int | None = None
    description: str | None = None
    required_skills: list[str] | None = None
    job_level: str | None = None
    employment_type: str | None = None
    remote: bool = False
    application_deadline: datetime | None = None
    source: str | None = None
    source_url: str | None = None
    source_job_id: str | None = None
    company_logo_url: str | None = None

class OpportunityRead(BaseModel):
    id: int
    type: str
    title: str
    company: str
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    stipend: int | None = None
    prize_pool: int | None = None
    duration_weeks: int | None = None
    description: str | None = None
    required_skills: list[str] | None = None
    job_level: str | None = None
    employment_type: str | None = None
    remote: bool
    application_deadline: datetime | None = None
    source: str | None = None
    source_url: str | None = None
    source_job_id: str | None = None
    posted_at: datetime | None = None
    company_logo_url: str | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class OpportunityUpdate(BaseModel):
    title: str | None = None
    company: str | None = None
    type: str | None = None
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    stipend: int | None = None
    prize_pool: int | None = None
    duration_weeks: int | None = None
    description: str | None = None
    required_skills: list[str] | None = None
    job_level: str | None = None
    employment_type: str | None = None
    remote: bool | None = None
    application_deadline: datetime | None = None
    source: str | None = None
    source_url: str | None = None
    source_job_id: str | None = None
    company_logo_url: str | None = None

class OpportunityListResponse(BaseModel):
    items: list[OpportunityRead]
    total: int
    page: int
    per_page: int

class OpportunitySearchParams(BaseModel):
    q: str | None = None
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    type: str | None = None
    job_level: str | None = None
    employment_type: str | None = None
    remote: bool | None = None
    skills: str | None = None
    page: int = 1
    per_page: int = 20

class OpportunityIngestResponse(BaseModel):
    fetched: int
    created: int
    updated: int
