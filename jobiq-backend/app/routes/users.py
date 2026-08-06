import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserRead, UserUpdate
from app.utils.dependencies import get_current_active_user

router = APIRouter(prefix="/users", tags=["users"])


def _user_to_read(user: User) -> UserRead:
    """Convert a User model instance to a UserRead schema."""
    preferred_locations = None
    if user.preferred_locations:
        try:
            preferred_locations = json.loads(user.preferred_locations)
        except (json.JSONDecodeError, TypeError):
            preferred_locations = None

    preferred_job_types = None
    if user.preferred_job_types:
        try:
            preferred_job_types = json.loads(user.preferred_job_types)
        except (json.JSONDecodeError, TypeError):
            preferred_job_types = None

    return UserRead(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        location=user.location,
        current_role=user.current_role,
        experience_years=user.experience_years,
        preferred_salary_min=user.preferred_salary_min,
        preferred_salary_max=user.preferred_salary_max,
        preferred_locations=preferred_locations,
        preferred_job_types=preferred_job_types,
        avatar_url=user.avatar_url,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at,
    )


@router.get("/me", response_model=UserRead)
def get_my_profile(current_user: User = Depends(get_current_active_user)):
    """Get the current authenticated user's profile."""
    return _user_to_read(current_user)


@router.put("/me", response_model=UserRead)
def update_my_profile(
    payload: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Update the current user's profile and preferences."""
    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if field in ("preferred_locations", "preferred_job_types"):
            if value is not None:
                setattr(current_user, field, json.dumps(value))
            else:
                setattr(current_user, field, None)
        else:
            setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)
    return _user_to_read(current_user)
