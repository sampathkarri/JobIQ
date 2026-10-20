from __future__ import annotations

from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.opportunity import Opportunity
from app.models.user import User
from app.scrapers.deduplicator import deduplicate_opportunities
from app.services.opportunity_ingestion import ingest_all_sources
from app.utils.dependencies import get_current_admin_user

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/scrape")
def trigger_scrape(
    source: Optional[str] = None,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    """Trigger scraping. Strictly restricted to administrative users."""
    result = ingest_all_sources(db)
    return {"message": "Scraping completed", "result": result}


@router.post("/deduplicate")
def trigger_deduplicate(
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    """Trigger deduplication of opportunities. Strictly restricted to admin users."""
    removed = deduplicate_opportunities(db)
    return {"message": "Deduplication completed", "duplicates_removed": removed}


@router.get("/stats")
def get_scraper_stats(
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    """Get opportunity counts grouped by source."""
    rows = (
        db.query(Opportunity.source, func.count(Opportunity.id))
        .group_by(Opportunity.source)
        .all()
    )
    total = db.query(func.count(Opportunity.id)).scalar()
    return {
        "total_opportunities": total,
        "by_source": {source or "seed": count for source, count in rows},
    }
