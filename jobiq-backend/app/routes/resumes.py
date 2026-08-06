from __future__ import annotations

import json
from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.ml.resume_parser import parse_resume
from app.models.resume import Resume
from app.models.user import User
from app.schemas.resume import ResumeCreate, ResumeListResponse, ResumeRead
from app.utils.dependencies import get_current_active_user

router = APIRouter(prefix="/resumes", tags=["resumes"])


def _resume_to_read(resume: Resume) -> ResumeRead:
    parsed_data = json.loads(resume.parsed_data) if resume.parsed_data else {}
    skills = json.loads(resume.skills) if resume.skills else []
    projects = json.loads(resume.projects) if resume.projects else []

    return ResumeRead(
        id=resume.id,
        user_id=resume.user_id,
        title=resume.title,
        file_url=resume.file_url,
        raw_text=resume.raw_text,
        parsed_data=parsed_data,
        skills=skills,
        experience_summary=resume.experience_summary,
        education_summary=resume.education_summary,
        projects=projects,
        created_at=resume.created_at,
        updated_at=resume.updated_at,
    )


@router.post("/", response_model=ResumeRead, status_code=status.HTTP_201_CREATED)
def create_resume(
    resume_in: ResumeCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Create a new resume and automatically run NLP parsing to extract skills & structured entities."""
    raw_text = resume_in.raw_text or ""

    # Run NLP parser & skill extractor
    parsed = parse_resume(raw_text)

    parsed_data_json = json.dumps(
        {
            "name": parsed.name,
            "email": parsed.email,
            "phone": parsed.phone,
        }
    )
    skills_json = json.dumps(parsed.skills)
    projects_json = json.dumps(parsed.projects)

    new_resume = Resume(
        user_id=current_user.id,
        title=resume_in.title,
        file_url=resume_in.file_url,
        raw_text=raw_text,
        parsed_data=parsed_data_json,
        skills=skills_json,
        experience_summary=parsed.experience_summary,
        education_summary=parsed.education_summary,
        projects=projects_json,
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    # Immediately calculate AI job matches for this user against all active opportunities
    try:
        from app.tasks.matcher_tasks import calculate_matches_for_user

        calculate_matches_for_user(db, current_user.id)
    except Exception as exc:
        print(f"Match calculation warning: {exc}")

    return _resume_to_read(new_resume)


@router.get("/", response_model=ResumeListResponse)
def list_resumes(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.created_at.desc())
        .all()
    )
    items = [_resume_to_read(r) for r in resumes]
    return ResumeListResponse(items=items)


@router.get("/{id}", response_model=ResumeRead)
def get_resume(
    id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    resume = db.query(Resume).filter(Resume.id == id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    if resume.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return _resume_to_read(resume)


@router.delete("/{id}")
def delete_resume(
    id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    resume = db.query(Resume).filter(Resume.id == id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    if resume.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    db.delete(resume)
    db.commit()
    return {"detail": "Resume deleted"}
