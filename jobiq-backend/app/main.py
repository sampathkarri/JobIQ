import threading
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401
from app.core.bootstrap import bootstrap_data
from app.core.config import get_settings
from app.core.database import Base, engine
from app.routes import api_router


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        debug=settings.debug,
        description="JobIQ AI-Powered Career Opportunities Platform API",
    )

    origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://job-iq-six.vercel.app",
        "*",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.api_v1_prefix)

    @app.get("/", include_in_schema=False)
    def root():
        return {
            "message": "Welcome to JobIQ API Backend!",
            "status": "online",
            "documentation": "/docs",
            "api_v1_prefix": settings.api_v1_prefix,
        }

    @app.on_event("startup")
    def on_startup() -> None:
        # Create all tables in Supabase database
        try:
            Base.metadata.create_all(bind=engine)
        except Exception as e:
            print(f"Error creating DB tables: {e}")

        # Run initial ingestion asynchronously in background thread so port binds immediately
        threading.Thread(target=bootstrap_data, daemon=True).start()
        

    return app


app = create_app()
