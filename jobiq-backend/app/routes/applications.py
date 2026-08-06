from fastapi import APIRouter

router = APIRouter(prefix="/applications", tags=["applications"])


@router.get("/")
def list_applications() -> dict[str, list]:
    # TODO: replace with database-backed implementation.
    return {"items": []}

