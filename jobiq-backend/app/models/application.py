from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Text, ForeignKey, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True, nullable=False)
    opportunity_id: Mapped[int] = mapped_column(ForeignKey("opportunities.id"), index=True, nullable=False)
    status: Mapped[str] = mapped_column(String(100), default="interested", nullable=False)
    applied_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    notes: Mapped[Optional[str]] = mapped_column(Text)
    interview_dates: Mapped[Optional[str]] = mapped_column(Text)
    salary_offered: Mapped[Optional[int]] = mapped_column(Integer)
    rejected_reason: Mapped[Optional[str]] = mapped_column(Text)
    source_application_url: Mapped[Optional[str]] = mapped_column(String(500))
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint('user_id', 'opportunity_id', name='uq_user_opportunity'),
    )

    user = relationship("User", back_populates="applications")
    opportunity = relationship("Opportunity", back_populates="applications")
