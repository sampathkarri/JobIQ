from fastapi import APIRouter

from app.routes.admin import router as admin_router
from app.routes.analytics import router as analytics_router
from app.routes.applications import router as applications_router
from app.routes.auth import router as auth_router
from app.routes.custom_jobs import router as custom_jobs_router
from app.routes.health import router as health_router
from app.routes.job_matches import router as job_matches_router
from app.routes.opportunities import router as opportunities_router
from app.routes.resumes import router as resumes_router
from app.routes.users import router as users_router
from app.websocket.routes import router as websocket_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(opportunities_router)
api_router.include_router(applications_router)
api_router.include_router(resumes_router)
api_router.include_router(job_matches_router)
api_router.include_router(websocket_router)
api_router.include_router(analytics_router)
api_router.include_router(admin_router)
api_router.include_router(custom_jobs_router)
