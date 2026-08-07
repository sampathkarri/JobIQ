from __future__ import annotations

import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.application import Application
from app.models.opportunity import Opportunity
from app.models.user import User
from app.routes.opportunities import _opportunity_to_read
from app.schemas.application import (
    ApplicationCreate,
    ApplicationListResponse,
    ApplicationRead,
    ApplicationUpdate,
)
from app.utils.dependencies import get_current_active_user

from pydantic import BaseModel
from app.services.email_generator import generate_application_email

router = APIRouter(prefix="/applications", tags=["applications"])


class EmailGenerateRequest(BaseModel):
    opportunity_id: int
    email_type: str = "cover_letter"  # cover_letter | follow_up | interview_thank_you
    custom_notes: str | None = None


@router.post("/generate-email")
def generate_email(
    req: EmailGenerateRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    opp = db.query(Opportunity).filter(Opportunity.id == req.opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    skills = []
    if opp.required_skills:
        try:
            skills = json.loads(opp.required_skills)
        except Exception:
            skills = []

    result = generate_application_email(
        job_title=opp.title,
        company=opp.company,
        applicant_name=current_user.full_name or "JobIQ Candidate",
        skills=skills,
        email_type=req.email_type,
        custom_notes=req.custom_notes,
    )
    return result


def _application_to_read(app: Application) -> ApplicationRead:
    """Convert an Application model instance to an ApplicationRead schema, including Opportunity details."""
    interview_dates = None
    if app.interview_dates:
        try:
            interview_dates = json.loads(app.interview_dates)
        except (json.JSONDecodeError, TypeError):
            interview_dates = None

    opp_read = _opportunity_to_read(app.opportunity) if app.opportunity else None

    return ApplicationRead(
        id=app.id,
        user_id=app.user_id,
        opportunity_id=app.opportunity_id,
        status=app.status,
        applied_date=app.applied_date,
        notes=app.notes,
        interview_dates=interview_dates,
        salary_offered=app.salary_offered,
        rejected_reason=app.rejected_reason,
        source_application_url=app.source_application_url,
        opportunity=opp_read,
        created_at=app.created_at,
        updated_at=app.updated_at,
    )


@router.post("/", response_model=ApplicationRead, status_code=status.HTTP_201_CREATED)
def create_application(
    payload: ApplicationCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Create a new application for the current user."""
    # Verify opportunity exists
    opp = db.query(Opportunity).filter(Opportunity.id == payload.opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    # Check for duplicate
    existing = db.query(Application).filter(
        Application.user_id == current_user.id,
        Application.opportunity_id == payload.opportunity_id,
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Application for this opportunity already exists")

    applied_date = None
    if payload.status == "applied":
        applied_date = datetime.now(timezone.utc)

    row = Application(
        user_id=current_user.id,
        opportunity_id=payload.opportunity_id,
        status=payload.status,
        notes=payload.notes,
        applied_date=applied_date,
    )
    db.add(row)
    try:
        db.commit()
        db.refresh(row)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Application for this opportunity already exists")

    return _application_to_read(row)


@router.get("/", response_model=ApplicationListResponse)
def list_applications(
    status: str | None = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """List all applications for the current user, optionally filtered by status."""
    query = db.query(Application).filter(Application.user_id == current_user.id)

    if status:
        query = query.filter(Application.status == status)

    rows = query.order_by(Application.updated_at.desc()).all()
    return ApplicationListResponse(
        items=[_application_to_read(a) for a in rows],
        total=len(rows),
    )


@router.get("/{application_id}", response_model=ApplicationRead)
def get_application(
    application_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Get a single application by ID."""
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this application")
    return _application_to_read(app)


@router.put("/{application_id}", response_model=ApplicationRead)
def update_application(
    application_id: int,
    payload: ApplicationUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Update an application's status, notes, or other fields."""
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this application")

    update_data = payload.model_dump(exclude_unset=True)

    # Auto-set applied_date when status changes to 'applied'
    if "status" in update_data and update_data["status"] == "applied" and app.status != "applied":
        app.applied_date = datetime.now(timezone.utc)

    # Handle interview_dates JSON serialization
    if "interview_dates" in update_data:
        val = update_data.pop("interview_dates")
        app.interview_dates = json.dumps(val) if val is not None else None

    for field, value in update_data.items():
        setattr(app, field, value)

    db.commit()
    db.refresh(app)
    return _application_to_read(app)


@router.delete("/{application_id}")
def delete_application(
    application_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Delete an application."""
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this application")

    db.delete(app)
    db.commit()
    return {"detail": "Application deleted"}
