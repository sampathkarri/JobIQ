from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401
from app.core.bootstrap import bootstrap_data
from app.core.config import get_settings
from app.core.database import Base, engine
from app.routes import api_router


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name, debug=settings.debug)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.api_v1_prefix)

    @app.on_event("startup")
    def on_startup() -> None:
        # TODO: replace metadata.create_all with Alembic migrations.
        Base.metadata.create_all(bind=engine)
        bootstrap_data()

    return app


app = create_app()
