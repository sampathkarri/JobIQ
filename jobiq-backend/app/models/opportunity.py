from datetime import datetime
from enum import Enum
from typing import Optional
from sqlalchemy import JSON, Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class OpportunityType(str, Enum):
    JOB = "job"
    INTERNSHIP = "internship"
    HACKATHON = "hackathon"
    COMPETITION = "competition"


class Opportunity(Base):
    __tablename__ = "opportunities"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    # Basic Info
    type: Mapped[Optional[str]] = mapped_column(String(50), default="job")
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    company: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    location: Mapped[Optional[str]] = mapped_column(String(255))

    # Salary/Compensation
    salary_min: Mapped[Optional[int]] = mapped_column(Integer)
    salary_max: Mapped[Optional[int]] = mapped_column(Integer)
    salary_currency: Mapped[str] = mapped_column(String(10), default="INR")
    stipend: Mapped[Optional[int]] = mapped_column(Integer)  # For internships
    prize_pool: Mapped[Optional[int]] = mapped_column(Integer)  # For hackathons

    # Duration
    duration_weeks: Mapped[Optional[int]] = mapped_column(Integer)

    # Job Details
    description: Mapped[Optional[str]] = mapped_column(Text)
    required_skills: Mapped[list] = mapped_column(JSON, default=list)  # FIXED: Now JSON array
    job_level: Mapped[Optional[str]] = mapped_column(String(50))  # junior, mid, senior
    employment_type: Mapped[Optional[str]] = mapped_column(String(50))  # full-time, part-time, contract
    remote: Mapped[bool] = mapped_column(Boolean, default=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)  # Promoted jobs

    # Application Details
    application_deadline: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    applicant_count: Mapped[Optional[int]] = mapped_column(Integer, default=0)  # NEW

    # Source Info
    source: Mapped[str] = mapped_column(String(100))  # linkedin, indeed, angellist, github, unstop, internshala, naukri
    source_url: Mapped[str] = mapped_column(String(500), unique=True, nullable=False, index=True)
    source_job_id: Mapped[Optional[str]] = mapped_column(String(255))
    posted_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    company_logo_url: Mapped[Optional[str]] = mapped_column(String(500))

    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    last_scraped_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))  # NEW

    # Relationships
    applications = relationship("Application", back_populates="opportunity", cascade="all, delete-orphan")
    saved_by_users = relationship("SavedOpportunity", back_populates="opportunity", cascade="all, delete-orphan")
    job_matches = relationship("JobMatch", back_populates="opportunity", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Opportunity({self.id}, {self.title}, {self.company})>"
