from fastapi import APIRouter

router = APIRouter(prefix="/saved-opportunities", tags=["saved-opportunities"])


@router.get("/")
def list_saved_opportunities() -> dict[str, list]:
    # TODO: replace with database-backed implementation.
    return {"items": []}

