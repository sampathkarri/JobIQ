from celery import Celery
from celery.schedules import crontab
from app.core.config import get_settings

settings = get_settings()

celery_app = Celery(
    "jobiq_worker",
    broker=getattr(settings, "celery_broker_url", "redis://localhost:6379/0"),
    backend=getattr(settings, "celery_result_backend", "redis://localhost:6379/1"),
    include=["app.tasks.jobs"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

celery_app.autodiscover_tasks(['app.tasks'])

celery_app.conf.beat_schedule = {
    'daily-scraping': {
        'task': 'scrape_all_sources',
        'schedule': crontab(hour=2, minute=0),
    },
    'daily-cleanup': {
        'task': 'cleanup_expired_jobs',
        'schedule': crontab(hour=3, minute=0),
    },
    'daily-deduplication': {
        'task': 'deduplicate_jobs',
        'schedule': crontab(hour=4, minute=0),
    }
}
