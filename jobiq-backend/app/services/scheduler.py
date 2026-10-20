from __future__ import annotations

import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from app.core.database import SessionLocal
from app.services.opportunity_ingestion import ingest_all_sources

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()


def run_daily_cron_scrape() -> None:
    """Automated job ingestion that runs daily at 02:00 AM without human intervention."""
    logger.info("⏰ [CRON SCHEDULER] Daily 02:00 AM job ingestion started automatically...")
    db = SessionLocal()
    try:
        results = ingest_all_sources(db)
        logger.info(f"✅ [CRON SCHEDULER] Daily 02:00 AM scraping completed: {results}")
    except Exception as exc:
        logger.error(f"❌ [CRON SCHEDULER] Error during scheduled scrape: {exc}")
    finally:
        db.close()


def start_scheduler() -> None:
    """Initialize and start the background cron scheduler."""
    if not scheduler.running:
        scheduler.add_job(
            run_daily_cron_scrape,
            trigger=CronTrigger(hour=2, minute=0),
            id="daily_scrape_2am",
            replace_existing=True,
            name="Daily Job Scraping at 2:00 AM",
        )
        scheduler.start()
        logger.info("🚀 [CRON SCHEDULER] APScheduler started. Scheduled daily run for 02:00 AM.")
