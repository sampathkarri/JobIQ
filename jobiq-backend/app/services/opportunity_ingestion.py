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

    if not opps:
        return {"fetched": 0, "created": 0, "updated": 0}

    # Preload existing active opportunities for fast in-memory matching
    existing_records = (
        db.query(Opportunity.id, Opportunity.source_url, Opportunity.title, Opportunity.company, Opportunity.description)
        .filter(Opportunity.is_active == True)
        .all()
    )
    existing_urls = {r.source_url: r for r in existing_records if r.source_url}
    existing_title_company = [
        (r.title.strip(), r.company.strip())
        for r in existing_records
        if r.title and r.company
    ]

    for scraped in opps:
        if not scraped.source_url:
            continue

        if scraped.source_url in existing_urls:
            existing = existing_urls[scraped.source_url]
            if scraped.description and existing.description != scraped.description:
                db_opp = db.query(Opportunity).filter(Opportunity.id == existing.id).first()
                if db_opp:
                    db_opp.description = scraped.description
                    db.commit()
                    updated += 1
            continue

        # Fast in-memory fuzzy duplicate check
        is_dup = False
        for title, company in existing_title_company:
            if is_duplicate(scraped.title, scraped.company, title, company):
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
                existing_urls[scraped.source_url] = new_opp
                existing_title_company.append((scraped.title.strip(), scraped.company.strip()))
            except IntegrityError:
                db.rollback()

    logger.info(f"Finished {scraper.source_name}: fetched={fetched}, created={created}, updated={updated}")
    return {"fetched": fetched, "created": created, "updated": updated}


def ingest_all_sources(db: Session) -> dict:
    from app.scrapers.linkedin_scraper import LinkedInScraper
    from app.scrapers.unstop_scraper import UnstopScraper
    from app.scrapers.internshala_scraper import InternshalaScraper
    from app.scrapers.naukri_scraper import NaukriScraper

    scrapers = [
        LinkedInScraper(),
        UnstopScraper(),
        InternshalaScraper(),
        NaukriScraper(),
    ]

    results = {}
    for scraper in scrapers:
        try:
            results[scraper.source_name] = ingest_opportunities(db, scraper)
        except Exception as e:
            logger.error(f"Failed to ingest from {scraper.source_name}: {e}")
            results[scraper.source_name] = {"error": str(e)}

    return results
