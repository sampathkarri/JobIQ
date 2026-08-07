from datetime import datetime
from typing import Optional
from sqlalchemy import JSON, Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class CustomJob(Base):
    __tablename__ = "custom_jobs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    # Job Details
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    company: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    location: Mapped[Optional[str]] = mapped_column(String(255))
    salary_min: Mapped[Optional[int]] = mapped_column(Integer)
    salary_max: Mapped[Optional[int]] = mapped_column(Integer)
    salary_currency: Mapped[str] = mapped_column(String(10), default="INR")
    description: Mapped[Optional[str]] = mapped_column(Text)
    required_skills: Mapped[list] = mapped_column(JSON, default=list)

    # Source Info
    source_url: Mapped[str] = mapped_column(String(500), nullable=False)
    source_name: Mapped[Optional[str]] = mapped_column(String(100))

    # Application Details
    posted_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    application_deadline: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    # Status & Tracking
    status: Mapped[str] = mapped_column(String(50), default="interested")
    # Status values: interested, applied, interviewing, offered, rejected, withdrawn

    notes: Mapped[Optional[str]] = mapped_column(Text)
    interview_dates: Mapped[list] = mapped_column(JSON, default=list)
    salary_offered: Mapped[Optional[int]] = mapped_column(Integer)
    rejected_reason: Mapped[Optional[str]] = mapped_column(Text)

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

    # Relationships
    user = relationship("User", back_populates="custom_jobs")

    def __repr__(self) -> str:
        return f"<CustomJob({self.id}, {self.title}, {self.company})>"
