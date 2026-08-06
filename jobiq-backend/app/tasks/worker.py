from celery import Celery
from celery.schedules import crontab
from app.config import settings

celery_app = Celery(
    "jobiq_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
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
