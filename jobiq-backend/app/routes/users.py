from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
def list_users() -> dict[str, list]:
    # TODO: replace with database-backed implementation.
    return {"items": []}

