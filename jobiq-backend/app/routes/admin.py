from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.opportunity import Opportunity

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/scrape")
def trigger_scrape(
    source: str | None = None,
    db: Session = Depends(get_db),
):
    """Trigger scraping. If source is provided, scrape only that source."""
    try:
        from app.tasks.jobs import scrape_all_sources, scrape_single_source

        if source:
            task = scrape_single_source.delay(source)
        else:
            task = scrape_all_sources.delay()
        return {"message": "Scraping triggered", "task_id": task.id}
    except Exception:
        # Celery/Redis not running — run synchronously instead
        from app.services.opportunity_ingestion import ingest_all_sources

        result = ingest_all_sources(db)
        return {"message": "Scraping completed (sync)", "result": result}


@router.post("/deduplicate")
def trigger_deduplicate(db: Session = Depends(get_db)):
    """Trigger deduplication of opportunities."""
    try:
        from app.tasks.jobs import deduplicate_jobs

        task = deduplicate_jobs.delay()
        return {"message": "Deduplication triggered", "task_id": task.id}
    except Exception:
        from app.scrapers.deduplicator import deduplicate_opportunities

        removed = deduplicate_opportunities(db)
        return {"message": "Deduplication completed (sync)", "duplicates_removed": removed}


@router.get("/stats")
def get_scraper_stats(db: Session = Depends(get_db)):
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
