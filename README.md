# JobIQ Monorepo Kickoff

This repository now contains a minimal, runnable foundation for JobIQ with:

- `jobiq-backend/` (FastAPI + SQLAlchemy + PostgreSQL config + Celery/Redis skeleton)
- `jobiq-frontend/` (React + TypeScript + Tailwind + route/page placeholders)

Current scope is intentionally starter-only: core structure, models, stubs, and local bootstrapping.

## Project Structure

```text
jobiq-backend/
  app/
    core/
    models/
    routes/
    scrapers/
    ml/
    tasks/
    utils/
    websocket/
jobiq-frontend/
  src/
    api/
    components/
    hooks/
    pages/
    routes/
    store/
```

## Backend Setup (FastAPI)

1. Create and activate a virtual environment:
   - PowerShell:
     - `cd jobiq-backend`
     - `python -m venv .venv`
     - `.venv\Scripts\Activate.ps1`
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Copy environment template:
   - `Copy-Item .env.example .env`
4. Run API:
   - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
5. If PostgreSQL is not installed yet, run with SQLite for local bootstrap:
   - PowerShell: `$env:DATABASE_URL="sqlite:///./jobiq.db"`
   - Command Prompt: `set DATABASE_URL=sqlite:///./jobiq.db`

Health endpoint:
- `GET http://localhost:8000/api/v1/health`

## Frontend Setup (React + Vite + Tailwind)

1. Install dependencies:
   - `cd jobiq-frontend`
   - `npm install`
2. Optional env file:
   - `Copy-Item .env.example .env`
3. Run frontend:
   - `npm run dev`

Default local URL:
- `http://localhost:5173`

## Current Phase-1 Baseline

- DB-backed opportunities API:
  - `GET /api/v1/opportunities/`
  - `POST /api/v1/opportunities/`
- Startup seeding creates initial sample opportunities when DB is empty.
- Frontend Opportunities page now fetches and renders live API data.

## Notes

- Database migrations are not added yet (TODO: Alembic).
- Scrapers, ML matching, and external integrations are stubbed with TODO-ready interfaces.
- Celery worker app is scaffolded; task queue wiring is intentionally minimal.
