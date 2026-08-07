from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, ConfigDict, HttpUrl


class CustomJobParseRequest(BaseModel):
    url: str


class CustomJobParseResponse(BaseModel):
    title: str
    company: str
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    salary_currency: str = "INR"
    description: str | None = None
    required_skills: list[str] = []
    source_name: str | None = None
    source_url: str


class CustomJobCreate(BaseModel):
    title: str
    company: str
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    salary_currency: str = "INR"
    description: str | None = None
    required_skills: list[str] = []
    source_url: str
    source_name: str | None = None
    posted_at: datetime | None = None
    application_deadline: datetime | None = None
    status: str = "interested"
    notes: str | None = None
    interview_dates: list[str] = []
    salary_offered: int | None = None
    rejected_reason: str | None = None


class CustomJobUpdate(BaseModel):
    title: str | None = None
    company: str | None = None
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    salary_currency: str | None = None
    description: str | None = None
    required_skills: list[str] | None = None
    source_url: str | None = None
    source_name: str | None = None
    posted_at: datetime | None = None
    application_deadline: datetime | None = None
    status: str | None = None
    notes: str | None = None
    interview_dates: list[str] | None = None
    salary_offered: int | None = None
    rejected_reason: str | None = None


class CustomJobRead(BaseModel):
    id: int
    user_id: int
    title: str
    company: str
    location: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    salary_currency: str = "INR"
    description: str | None = None
    required_skills: list[str] = []
    source_url: str
    source_name: str | None = None
    posted_at: datetime | None = None
    application_deadline: datetime | None = None
    status: str
    notes: str | None = None
    interview_dates: list[str] = []
    salary_offered: int | None = None
    rejected_reason: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CustomJobListResponse(BaseModel):
    items: list[CustomJobRead]
    total: int
