from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity


def seed_opportunities_if_empty(db: Session) -> None:
    if db.query(Opportunity).count() > 0:
        return

    seed_rows = [
        Opportunity(
            title="Junior Backend Engineer",
            company="JobIQ Labs",
            location="Remote",
            description="Entry-level backend role focused on FastAPI and data pipelines.",
            source_url="https://example.com/jobs/backend-junior",
        ),
        Opportunity(
            title="Frontend Engineer (React)",
            company="CareerFlow Inc.",
            location="Bengaluru",
            description="Build user-facing workflows for job discovery and application tracking.",
            source_url="https://example.com/jobs/frontend-react",
        ),
    ]
    db.add_all(seed_rows)
    db.commit()

