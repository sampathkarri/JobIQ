from __future__ import annotations

import json
from celery import shared_task
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.ml.matcher import score_opportunity
from app.models.job_match import JobMatch
from app.models.opportunity import Opportunity
from app.models.resume import Resume
from app.models.user import User


def calculate_matches_for_user(db: Session, user_id: int) -> int:
    """Calculate and upsert ML job match scores for a specific user against all active opportunities."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return 0

    latest_resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.created_at.desc())
        .first()
    )

    resume_text = latest_resume.raw_text if latest_resume else ""
    resume_skills = []
    if latest_resume and latest_resume.skills:
        try:
            resume_skills = json.loads(latest_resume.skills)
        except Exception:
            resume_skills = []

    preferred_locs = []
    if user.preferred_locations:
        try:
            preferred_locs = json.loads(user.preferred_locations)
        except Exception:
            preferred_locs = []

    active_jobs = db.query(Opportunity).filter(Opportunity.is_active == True).all()
    count = 0

    for job in active_jobs:
        job_skills = []
        if job.required_skills:
            try:
                job_skills = json.loads(job.required_skills)
            except Exception:
                job_skills = []

        match_result = score_opportunity(
            resume_text=resume_text,
            resume_skills=resume_skills,
            job_description=job.description or "",
            job_skills=job_skills,
            user_salary_min=user.preferred_salary_min,
            user_salary_max=user.preferred_salary_max,
            job_salary_min=job.salary_min,
            job_salary_max=job.salary_max,
            user_preferred_locations=preferred_locs,
            job_location=job.location,
        )

        existing = (
            db.query(JobMatch)
            .filter(JobMatch.user_id == user.id, JobMatch.opportunity_id == job.id)
            .first()
        )

        matching_json = json.dumps(match_result.matching_skills)
        missing_json = json.dumps(match_result.missing_skills)

        if existing:
            existing.match_score = match_result.score
            existing.matching_skills = matching_json
            existing.missing_skills = missing_json
            existing.match_reason = match_result.match_reason
        else:
            new_match = JobMatch(
                user_id=user.id,
                opportunity_id=job.id,
                match_score=match_result.score,
                matching_skills=matching_json,
                missing_skills=missing_json,
                match_reason=match_result.match_reason,
            )
            db.add(new_match)
        count += 1

    db.commit()
    return count


@shared_task
def run_job_matcher() -> int:
    """Pre-calculate job match scores for all registered users."""
    db: Session = SessionLocal()
    try:
        users = db.query(User).all()
        total = 0
        for user in users:
            total += calculate_matches_for_user(db, user.id)
        return total
    finally:
        db.close()
