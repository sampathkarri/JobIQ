from fastapi import APIRouter

router = APIRouter(prefix="/job-matches", tags=["job-matches"])


@router.get("/")
def list_job_matches() -> dict[str, list]:
    # TODO: replace with database-backed implementation.
    return {"items": []}

