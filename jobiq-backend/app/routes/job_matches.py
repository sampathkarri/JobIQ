import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.dependencies import get_current_active_user
from app.models import JobMatch, User
from app.schemas.job_match import JobMatchRead, JobMatchListResponse

router = APIRouter(prefix="/job-matches", tags=["job-matches"])


def _match_to_read(match: JobMatch) -> JobMatchRead:
    matching_skills = json.loads(match.matching_skills) if match.matching_skills else []
    missing_skills = json.loads(match.missing_skills) if match.missing_skills else []
    
    return JobMatchRead(
        id=match.id,
        user_id=match.user_id,
        opportunity_id=match.opportunity_id,
        match_score=match.match_score,
        matching_skills=matching_skills,
        missing_skills=missing_skills,
        match_reason=match.match_reason,
        created_at=match.created_at,
        updated_at=match.updated_at
    )


@router.get("/top", response_model=JobMatchListResponse)
def list_top_job_matches(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    matches = db.query(JobMatch).filter(JobMatch.user_id == current_user.id).order_by(JobMatch.match_score.desc()).limit(10).all()
    items = [_match_to_read(m) for m in matches]
    return JobMatchListResponse(items=items)


@router.get("/", response_model=JobMatchListResponse)
def list_job_matches(
    min_score: int = 0,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(JobMatch).filter(JobMatch.user_id == current_user.id)
    if min_score > 0:
        query = query.filter(JobMatch.match_score >= min_score)
    matches = query.order_by(JobMatch.match_score.desc()).all()
    items = [_match_to_read(m) for m in matches]
    return JobMatchListResponse(items=items)

