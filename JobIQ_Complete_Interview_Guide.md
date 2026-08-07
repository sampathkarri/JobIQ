# JobIQ — AI-Powered Job Aggregation Platform
## Complete Technical & Interview Master Guide

> **Target Audience:** Full-Stack & Machine Learning Engineering Interviews  
> **Platform Focus:** Software Jobs, Internships, Hackathons & Competitions in India (INR)

---

## 1. Executive Overview & Problem Statement

### What is JobIQ?
**JobIQ** is a modern career operating system designed to aggregate, deduplicate, score, and track tech opportunities across India. It solves the fragmented job search experience by pulling opportunities from multiple sources (LinkedIn, Internshala, Unstop, Naukri) into a unified dashboard with AI match scoring and a Kanban application tracker.

### Key Problems Solved
1. **Fragmented Search**: Eliminates the need to manually check 4+ different portals daily.
2. **Data Noise & Bad Formatting**: Normalizes salary/stipend ranges into standard INR formats and strips corrupt/template text.
3. **No Quality Matching**: Evaluates candidate resumes against job descriptions using TF-IDF text similarity and skill taxonomy overlap instead of simple keyword searching.
4. **Scattered Tracking**: Combines automatically aggregated listings with user-pasted custom job links in a single Kanban pipeline.

---

## 2. Full Technology Stack

| Layer | Technology | Purpose & Responsibility |
| :--- | :--- | :--- |
| **Frontend UI** | React 18, TypeScript, Vite, Tailwind CSS | Single Page Application (SPA), responsive dashboard, dark-mode styling, Kanban pipeline |
| **State & Fetching** | Zustand, React Query (TanStack Query v5) | Client-side cache management, optimistic updates, JWT state persistence |
| **Backend API** | Python 3.9, FastAPI, Pydantic v2, Uvicorn | Asynchronous REST API, strict request/response validation, auth dependencies |
| **Database & ORM** | SQLite (`jobiq.db`), SQLAlchemy 2.0 ORM | Declarative data modeling, relational storage, indexing |
| **Scraping Pipeline**| HTTPX, BeautifulSoup4, `difflib.SequenceMatcher` | Direct HTTP guest scraping, rate limiting, range numerical extraction, fuzzy deduplication |
| **Task Execution** | Celery, Redis Task Broker | Asynchronous background execution for periodic web scraping & heavy matching tasks |
| **ML Engine** | Scikit-Learn (TF-IDF), Cosine Similarity, Regex Taxonomy | Content-based job matching, 200+ skill taxonomy extraction, resume section parsing |

---

## 3. System Architecture & Component Interaction

```
[ External Portals ] (LinkedIn, Unstop, Internshala)
        │
        ▼ (HTTP Scraping & API Requests)
[ Scraping Engine ] ────► [ Deduplicator (SequenceMatcher) ]
                                    │
                                    ▼ (Clean Opportunities)
                            [ SQLite Database ]
                                    ▲
                                    │ (SQLAlchemy ORM)
[ React 18 Frontend ] ◄───► [ FastAPI REST API ]
                                    │
                                    ▼
                        [ ML Matcher Engine ]
                (TF-IDF Vectorizer + Skill Taxonomy)
```

---

## 4. Database Schema & Data Models

### 1. `users` Table
- `id` (INT, Primary Key)
- `email` (VARCHAR, Unique, Indexed)
- `hashed_password` (VARCHAR)
- `full_name` (VARCHAR)
- `target_role` (VARCHAR)
- `location_preference` (VARCHAR)

### 2. `opportunities` Table
- `id` (INT, Primary Key)
- `title` (VARCHAR, Indexed)
- `company` (VARCHAR, Indexed)
- `location` (VARCHAR)
- `salary_min` / `salary_max` (INT, Nullable)
- `stipend` / `prize_pool` (INT, Nullable)
- `description` (TEXT)
- `required_skills` (JSON / TEXT array)
- `type` (`job`, `internship`, `hackathon`, `competition`)
- `source` (`linkedin`, `unstop`, `internshala`, `naukri`)
- `source_url` (VARCHAR, Unique)

### 3. `job_matches` Table
- `id` (INT, Primary Key)
- `user_id` (INT, Foreign Key -> `users.id`)
- `opportunity_id` (INT, Foreign Key -> `opportunities.id`)
- `match_score` (INT, Range 0-100)
- `matching_skills` (JSON array)
- `missing_skills` (JSON array)
- `match_reason` (TEXT explanation)

### 4. `applications` Table (Kanban Pipeline)
- `id` (INT, Primary Key)
- `user_id` (INT, Foreign Key)
- `opportunity_id` (INT, Foreign Key)
- `status` (`interested`, `applied`, `interviewing`, `offered`, `rejected`)
- `applied_at` (DATETIME)
- `notes` (TEXT)

---

## 5. Core Technical Modules Walkthrough

### A. Web Scraping & Ingestion (`app/scrapers/`)
- **LinkedIn Scraper (`linkedin_scraper.py`)**: Calls LinkedIn's Guest Search API endpoint (`/jobs-guest/jobs/api/seeMoreJobPostings/search`) without requiring Selenium browser automation. Extracts direct job URLs, titles, and companies.
- **Unstop Scraper (`unstop_scraper.py`)**: Fetches hackathons & competitions from Unstop's public API. Strictly tags items as `hackathon` or `competition` so they don't pollute the job pipeline.
- **Internshala Scraper (`internshala_scraper.py`)**: Parses HTML using BeautifulSoup for internships in India, extracting title, company, stipend, and duration.
- **Deduplication Engine (`deduplicator.py`)**: Uses Python's `difflib.SequenceMatcher`. Calculates a weighted similarity:
  $$\text{Similarity} = (\text{Title Sim} \times 0.6) + (\text{Company Sim} \times 0.4)$$
  If score ≥ 0.85, the item is marked as a duplicate.

### B. Smart Link Parser (`app/services/link_parser.py`)
Allows users to paste any job URL into JobIQ:
1. Fetches HTML via HTTPX with browser headers.
2. Extracts OpenGraph meta tags (`og:title`, `og:description`) and Schema.org JSON-LD microdata.
3. Automatically extracts key details (title, company, location) and returns a JSON preview before saving to the user's application pipeline.

### C. ML Matching Engine (`app/ml/matcher.py`)
JobIQ uses a **Hybrid Multi-Factor Scoring Formula**:

$$\text{Match Score} = (\text{Skills Overlap} \times 0.40) + (\text{TF-IDF Cosine Sim} \times 0.30) + (\text{Salary Match} \times 0.15) + (\text{Location Match} \times 0.15)$$

- **Skills Overlap (40%)**: Matches user resume skills against job required skills using a 200+ tech taxonomy regex extractor.
- **TF-IDF + Cosine Similarity (30%)**: Converts resume text and job description into TF-IDF term-frequency vectors using Scikit-Learn and computes standard cosine similarity.
- **Salary & Location (15% each)**: Scores alignment between user target preferences and job attributes.

---

## 6. Top 7 Interview Questions & Answers

### Q1: Walk me through the architecture of JobIQ.
> **Answer:** JobIQ is built as a decoupled full-stack application. The frontend is a React 18 SPA written in TypeScript with Zustand for auth state and React Query for asynchronous server state management. The backend is built with FastAPI (Python 3.9) and SQLAlchemy ORM on top of SQLite. We have an asynchronous ingestion engine that scrapes opportunities from LinkedIn, Internshala, and Unstop, deduplicates them using string similarity algorithms, and ranks them against candidate resumes using a Scikit-Learn TF-IDF matcher.

### Q2: How do your scrapers work without getting IP-blocked?
> **Answer:** Instead of heavy browser automation frameworks like Selenium or Puppeteer that consume excessive RAM and trigger anti-bot protections, we use lightweight direct HTTP guest API endpoints with custom headers and rate-limiting delays (`time.sleep`).

### Q3: How does your deduplication logic prevent duplicate listings?
> **Answer:** We compute a composite similarity score using Python's `difflib.SequenceMatcher`. We give a 60% weight to job title similarity and 40% weight to company name similarity. If the score is 85% or higher, the listing is soft-deleted as a duplicate.

### Q4: Why did you choose TF-IDF + Cosine Similarity over Large Language Models (LLMs)?
> **Answer:** Speed and cost efficiency. Running LLM API calls or heavy local Transformer models (like BERT) over thousands of job descriptions per query is slow and expensive. TF-IDF vectorization executes in milliseconds, uses virtually no RAM, and accurately matches domain-specific tech terms.

### Q5: How did you fix corrupted stipend numbers (like `$1,100,021,000/mo`)?
> **Answer:** The scraper was stripping non-digit characters from range strings like `"11,000 - 21,000"`, concatenating `11000` and `21000` into `1100021000`. I updated `_safe_int` in `base.py` to extract only the first regex numeric match (`\b\d+(?:,\d+)*\b`), resolving range parsing errors, and updated the UI to format currency in INR (`₹`).

### Q6: How does the Smart Link Parser service handle arbitrary URLs?
> **Answer:** It uses HTTPX to fetch the page HTML and extracts standardized OpenGraph metadata (`og:title`, `og:description`) and Schema.org JSON-LD microdata blocks, presenting a pre-filled preview card for user verification.

### Q7: How did you categorize hackathons vs software jobs?
> **Answer:** In `unstop_scraper.py`, we explicitly map Unstop listing types. Items classified as competitions or hackathons are saved as `OpportunityType.HACKATHON` or `COMPETITION`, ensuring they don't pollute the main job search pipeline.

---

## 7. How to Run & Present the Project

### Start Backend Server
```bash
cd jobiq-backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

### Start Frontend Application
```bash
cd jobiq-frontend
npm run dev
```
- Local Web App: `http://localhost:5173`
