from datetime import timedelta

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

from app.core.config import get_settings
from app.utils.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/login")
def login(payload: LoginRequest) -> dict[str, str]:
    # TODO: validate credentials against persisted user records.
    settings = get_settings()
    token = create_access_token(
        {"sub": payload.email},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
    )
    return {"access_token": token, "token_type": "bearer"}

