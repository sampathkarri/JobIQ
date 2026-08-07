from __future__ import annotations

import json
import logging
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.scrapers.base import BaseScraper, ScrapedOpportunity
from app.scrapers.deduplicator import is_duplicate

logger = logging.getLogger(__name__)


def ingest_opportunities(db: Session, scraper: BaseScraper) -> dict:
    logger.info(f"Starting ingestion from {scraper.source_name}")
    opps = scraper.fetch_opportunities()

    fetched = len(opps)
    created = 0
    updated = 0

    for scraped in opps:
        if not scraped.source_url:
            continue

        existing = (
            db.query(Opportunity).filter(Opportunity.source_url == scraped.source_url).first()
        )

        if existing:
            if scraped.description and existing.description != scraped.description:
                existing.description = scraped.description
                updated += 1
            continue

        # Check fuzzy match
        potential_dups = db.query(Opportunity).filter(Opportunity.is_active == True).all()
        is_dup = False
        for p in potential_dups:
            if is_duplicate(scraped.title, scraped.company, p.title, p.company):
                is_dup = True
                break

        if not is_dup:
            new_opp = Opportunity(
                title=scraped.title,
                company=scraped.company,
                location=scraped.location,
                source_url=scraped.source_url,
                description=scraped.description,
                salary_min=scraped.salary_min,
                salary_max=scraped.salary_max,
                required_skills=json.dumps(scraped.required_skills) if scraped.required_skills else "[]",
                job_level=scraped.job_level,
                employment_type=scraped.employment_type,
                remote=scraped.remote,
                source=scraped.source or scraper.source_name,
                company_logo_url=scraped.company_logo_url,
                type=scraped.type,
                stipend=scraped.stipend,
                prize_pool=scraped.prize_pool,
                duration_weeks=scraped.duration_weeks,
                is_active=True,
            )
            db.add(new_opp)
            try:
                db.commit()
                created += 1
            except IntegrityError:
                db.rollback()

    logger.info(f"Finished {scraper.source_name}: fetched={fetched}, created={created}, updated={updated}")
    return {"fetched": fetched, "created": created, "updated": updated}


def ingest_all_sources(db: Session) -> dict:
    from app.scrapers.linkedin_scraper import LinkedInScraper
    from app.scrapers.github_scraper import ArbeitNowScraper
    from app.scrapers.unstop_scraper import UnstopScraper
    from app.scrapers.internshala_scraper import InternshalaScraper
    from app.scrapers.naukri_scraper import NaukriScraper
    from app.scrapers.remotive import RemotiveScraper

    scrapers = [
        LinkedInScraper(),
        ArbeitNowScraper(),
        UnstopScraper(),
        InternshalaScraper(),
        NaukriScraper(),
        RemotiveScraper(),
    ]

    results = {}
    for scraper in scrapers:
        try:
            results[scraper.source_name] = ingest_opportunities(db, scraper)
        except Exception as e:
            logger.error(f"Failed to ingest from {scraper.source_name}: {e}")
            results[scraper.source_name] = {"error": str(e)}

    return results
