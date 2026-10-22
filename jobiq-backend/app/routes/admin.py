from __future__ import annotations

import logging
from typing import Optional
from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import SessionLocal, get_db
from app.models.opportunity import Opportunity
from app.scrapers.deduplicator import deduplicate_opportunities
from app.services.opportunity_ingestion import ingest_all_sources
from app.utils.dependencies import verify_admin_or_cron

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])


def _run_ingest_background():
    db = SessionLocal()
    try:
        logger.info("🚀 [ADMIN] Background ingestion pipeline started...")
        results = ingest_all_sources(db)
        logger.info(f"✅ [ADMIN] Background ingestion finished: {results}")
        removed = deduplicate_opportunities(db)
        logger.info(f"🧹 [ADMIN] Background deduplication finished: {removed} removed")
    except Exception as e:
        logger.error(f"❌ [ADMIN] Error during background ingestion: {e}")
    finally:
        db.close()


@router.post("/scrape")
def trigger_scrape(
    background_tasks: BackgroundTasks,
    source: Optional[str] = None,
    authorized: bool = Depends(verify_admin_or_cron),
):
    """Trigger scraping. Runs asynchronously in background to prevent HTTP gateway timeouts."""
    background_tasks.add_task(_run_ingest_background)
    return {
        "message": "Scraping pipeline started in background",
        "status": "processing",
    }


@router.post("/deduplicate")
def trigger_deduplicate(
    background_tasks: BackgroundTasks,
    authorized: bool = Depends(verify_admin_or_cron),
):
    """Trigger deduplication of opportunities in background."""
    def _run_dedup():
        db = SessionLocal()
        try:
            logger.info("🧹 [ADMIN] Background deduplication started...")
            removed = deduplicate_opportunities(db)
            logger.info(f"✅ [ADMIN] Deduplication complete: {removed} duplicates removed")
        except Exception as e:
            logger.error(f"❌ [ADMIN] Error during deduplication: {e}")
        finally:
            db.close()

    background_tasks.add_task(_run_dedup)
    return {
        "message": "Deduplication started in background",
        "status": "processing",
    }


@router.get("/stats")
def get_scraper_stats(
    authorized: bool = Depends(verify_admin_or_cron),
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
