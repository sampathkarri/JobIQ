from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "JobIQ API"
    app_env: str = "production"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"

    # Default fallback for local dev (overridden by DATABASE_URL env var in production)
    database_url: str = "postgresql+psycopg2://postgres:password@localhost:5432/jobiq"

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://job-iq-six.vercel.app",
        "*"
    ]

    jwt_secret_key: str = "jobiq-dev-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days expiration

    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
