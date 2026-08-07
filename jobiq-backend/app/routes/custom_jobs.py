from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.custom_job import CustomJob
from app.models.user import User
from app.schemas.custom_job import (
    CustomJobCreate,
    CustomJobListResponse,
    CustomJobParseRequest,
    CustomJobParseResponse,
    CustomJobRead,
    CustomJobUpdate,
)
from app.services.link_parser import parse_job_link
from app.utils.dependencies import get_current_active_user

router = APIRouter(prefix="/custom-jobs", tags=["custom-jobs"])


@router.post("/from-link", response_model=CustomJobParseResponse)
def parse_link_and_preview(payload: CustomJobParseRequest):
    """
    Smart Link Parser endpoint:
    Accepts any job portal URL, fetches the web page, extracts job details, and returns a preview object.
    """
    if not payload.url or not payload.url.startswith(("http://", "https://")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide a valid URL starting with http:// or https://",
        )

    try:
        parsed_data = parse_job_link(payload.url)
        return CustomJobParseResponse(**parsed_data)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to parse job link: {str(exc)}",
        ) from exc


@router.post("/manual", response_model=CustomJobRead, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=CustomJobRead, status_code=status.HTTP_201_CREATED)
def create_custom_job(
    payload: CustomJobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Save a user-added custom job to the pipeline."""
    job = CustomJob(
        user_id=current_user.id,
        title=payload.title,
        company=payload.company,
        location=payload.location,
        salary_min=payload.salary_min,
        salary_max=payload.salary_max,
        salary_currency=payload.salary_currency or "INR",
        description=payload.description,
        required_skills=payload.required_skills or [],
        source_url=payload.source_url,
        source_name=payload.source_name or "Custom Link",
        posted_at=payload.posted_at,
        application_deadline=payload.application_deadline,
        status=payload.status or "interested",
        notes=payload.notes,
        interview_dates=payload.interview_dates or [],
        salary_offered=payload.salary_offered,
        rejected_reason=payload.rejected_reason,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.get("/", response_model=CustomJobListResponse)
def list_custom_jobs(
    status_filter: str | None = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """List all custom jobs saved by the authenticated user."""
    query = db.query(CustomJob).filter(CustomJob.user_id == current_user.id)
    if status_filter:
        query = query.filter(CustomJob.status == status_filter)

    jobs = query.order_by(CustomJob.created_at.desc()).all()
    return CustomJobListResponse(items=jobs, total=len(jobs))


@router.get("/{job_id}", response_model=CustomJobRead)
def get_custom_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Get details of a specific custom job."""
    job = (
        db.query(CustomJob)
        .filter(CustomJob.id == job_id, CustomJob.user_id == current_user.id)
        .first()
    )
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Custom job not found",
        )
    return job


@router.put("/{job_id}", response_model=CustomJobRead)
def update_custom_job(
    job_id: int,
    payload: CustomJobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Update status, notes, interview dates, or details of a custom job."""
    job = (
        db.query(CustomJob)
        .filter(CustomJob.id == job_id, CustomJob.user_id == current_user.id)
        .first()
    )
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Custom job not found",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(job, field, value)

    db.commit()
    db.refresh(job)
    return job


@router.delete("/{job_id}", status_code=status.HTTP_200_OK)
def delete_custom_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Delete a custom job."""
    job = (
        db.query(CustomJob)
        .filter(CustomJob.id == job_id, CustomJob.user_id == current_user.id)
        .first()
    )
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Custom job not found",
        )

    db.delete(job)
    db.commit()
    return {"message": "Custom job deleted successfully", "id": job_id}
