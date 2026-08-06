from app.tasks.worker import celery_app


@celery_app.task(name="app.tasks.jobs.ping")
def ping() -> str:
    return "pong"

