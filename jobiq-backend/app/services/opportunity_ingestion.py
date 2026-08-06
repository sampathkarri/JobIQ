from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.scrapers.remotive import RemotiveScraper


class OpportunityIngestionError(RuntimeError):
    pass


def ingest_remotive_opportunities(db: Session, limit: int = 20) -> dict[str, int]:
    scraper = RemotiveScraper()
    try:
        scraped = scraper.fetch_opportunities(limit=limit)
    except RuntimeError as exc:
        raise OpportunityIngestionError(str(exc)) from exc

    created = 0
    updated = 0

    for item in scraped:
        existing = None
        if item.source_url:
            existing = (
                db.query(Opportunity)
                .filter(Opportunity.source_url == item.source_url)
                .one_or_none()
            )

        if existing is None:
            existing = (
                db.query(Opportunity)
                .filter(
                    Opportunity.title == item.title,
                    Opportunity.company == item.company,
                )
                .one_or_none()
            )

        if existing is None:
            db.add(
                Opportunity(
                    title=item.title,
                    company=item.company,
                    location=item.location,
                    source_url=item.source_url,
                    description=item.description,
                )
            )
            created += 1
            continue

        existing.location = item.location
        existing.description = item.description
        if item.source_url:
            existing.source_url = item.source_url
        updated += 1

    db.commit()
    return {"fetched": len(scraped), "created": created, "updated": updated}

