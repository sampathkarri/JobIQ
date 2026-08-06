from fastapi import APIRouter

router = APIRouter(prefix="/resumes", tags=["resumes"])


@router.get("/")
def list_resumes() -> dict[str, list]:
    # TODO: replace with database-backed implementation.
    return {"items": []}

