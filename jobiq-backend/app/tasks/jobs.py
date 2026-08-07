import logging
from datetime import datetime, timedelta
from app.tasks.worker import celery_app
from app.database import SessionLocal
from app.models.opportunity import Opportunity
from app.services.opportunity_ingestion import ingest_all_sources, ingest_opportunities
from app.scrapers.deduplicator import deduplicate_opportunities

logger = logging.getLogger(__name__)

@celery_app.task(name="ping")
def ping():
    return "pong"

@celery_app.task(name="scrape_all_sources")
def scrape_all_sources():
    db = SessionLocal()
    try:
        results = ingest_all_sources(db)
        return results
    finally:
        db.close()

@celery_app.task(name="scrape_single_source")
def scrape_single_source(source_name: str):
    db = SessionLocal()
    try:
        from app.scrapers.github_scraper import ArbeitNowScraper
        from app.scrapers.internshala_scraper import InternshalaScraper
        from app.scrapers.unstop_scraper import UnstopScraper
        
        scrapers = {
            "arbeitnow": ArbeitNowScraper,
            "internshala": InternshalaScraper,
            "unstop": UnstopScraper
        }
        

        if source_name not in scrapers:
            return {"error": f"Scraper {source_name} not found"}
            
        scraper_cls = scrapers[source_name]
        results = ingest_opportunities(db, scraper_cls())
        return results
    finally:
        db.close()

@celery_app.task(name="cleanup_expired_jobs")
def cleanup_expired_jobs():
    db = SessionLocal()
    try:
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        expired = db.query(Opportunity).filter(
            Opportunity.is_active == True,
            Opportunity.created_at < thirty_days_ago
        ).update({"is_active": False})
        db.commit()
        return {"deactivated": expired}
    finally:
        db.close()

@celery_app.task(name="deduplicate_jobs")
def deduplicate_jobs():
    db = SessionLocal()
    try:
        removed = deduplicate_opportunities(db)
        return {"duplicates_removed": removed}
    finally:
        db.close()
