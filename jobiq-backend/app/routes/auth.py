import json
from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, LoginResponse, RegisterRequest
from app.schemas.user import UserRead
from app.utils.auth import create_access_token, get_password_hash, verify_password
from app.utils.dependencies import get_current_active_user

router = APIRouter(prefix="/auth", tags=["auth"])


def _user_to_read(user: User) -> UserRead:
    """Convert a User model instance to a UserRead schema, deserializing JSON fields."""
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


@router.post("/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new user and return an access token."""
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_user = User(
        email=request.email,
        hashed_password=get_password_hash(request.password),
        full_name=request.full_name,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    settings = get_settings()
    token = create_access_token(
        {"sub": new_user.email},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
    )
    return LoginResponse(access_token=token)


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user and return an access token."""
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    settings = get_settings()
    token = create_access_token(
        {"sub": user.email},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
    )
    return LoginResponse(access_token=token)


@router.get("/me", response_model=UserRead)
def get_current_user_profile(current_user: User = Depends(get_current_active_user)):
    """Get the current authenticated user's profile."""
    return _user_to_read(current_user)
