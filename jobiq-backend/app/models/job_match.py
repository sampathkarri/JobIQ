from datetime import datetime
from typing import Optional
from sqlalchemy import Integer, Text, ForeignKey, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class JobMatch(Base):
    __tablename__ = "job_matches"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    opportunity_id: Mapped[int] = mapped_column(ForeignKey("opportunities.id"), index=True)
    match_score: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    matching_skills: Mapped[Optional[str]] = mapped_column(Text)
    missing_skills: Mapped[Optional[str]] = mapped_column(Text)
    match_reason: Mapped[Optional[str]] = mapped_column(Text)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint('user_id', 'opportunity_id', name='uq_match_user_opportunity'),
    )

    user = relationship("User", back_populates="job_matches")
    opportunity = relationship("Opportunity", back_populates="job_matches")
