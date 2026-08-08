# 🚀 JobIQ — AI-Powered Career Opportunities & Interview Prep Platform

[![Live App](https://img.shields.io/badge/Vercel-Live%20App-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://job-iq-six.vercel.app)
[![Live Backend API](https://img.shields.io/badge/Render-API%20Online-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://jobiq-3vun.onrender.com)
[![Database](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Python](https://img.shields.io/badge/FastAPI-0.116-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)

**JobIQ** is a full-stack, AI-powered career aggregation platform designed to discover jobs, internships, hackathons, and competitions across India, match candidates using ML algorithms, manage job application pipelines, and conduct AI mock interviews with real-time speech recognition.

---

## 🌐 Live Production Deployments

* 🎨 **Frontend Application (Vercel):** [https://job-iq-six.vercel.app](https://job-iq-six.vercel.app)
* ⚡ **Backend API Docs (Render):** [https://jobiq-3vun.onrender.com/docs](https://jobiq-3vun.onrender.com/docs)
* 🗄️ **Database Instance (Supabase):** PostgreSQL in `ap-south-1` (Mumbai, India)

---

## ✨ Key Features

### 🧠 1. AI Mock Interviewer (300 Curated Questions)
- **12 Technical & Behavioral Subjects:** 25 curated, high-yield questions for DBMS, OOPs, Computer Networks, Software Engineering, Git, SQL, DSA, HR, Backend, Frontend, Python, and Java (**300 total questions**).
- **Speech-to-Text Recognition:** Live voice answering via Web Speech API.
- **Instant Keyword & Concept Scoring:** Evaluates user answers against ideal technical key points and calculates live readiness scores.

### 💼 2. Real Indian Job Aggregation & Scrapers
- **Multi-Source Ingestion:** Automated scrapers for **LinkedIn (Guest API)**, **Naukri**, **Internshala**, and **Unstop**.
- **Fuzzy Deduplication:** SequenceMatcher algorithm to merge duplicate job postings across platforms.
- **INR Currency Calibration:** Salaries and stipends normalized in Indian Rupees (₹).

### 🎯 3. Machine Learning Matcher & Resume Parser
- **TF-IDF & Cosine Similarity:** Computes exact match scores (0-100%) between candidates' resumes and job postings.
- **Skill Taxonomy Extractor:** Scans 200+ tech skills (React, Python, AWS, Docker, PyTorch, etc.) using regex pattern matching.

### 📊 4. Application Pipeline Management
- **Kanban Pipeline:** Track applications across states (`Saved`, `Applied`, `Interviewing`, `Offered`, `Rejected`).
- **Instant Pipeline Addition:** Add jobs directly from AI Match recommendations in 1 click.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Zustand, Axios, Web Speech API |
| **Backend** | Python 3.12, FastAPI, SQLAlchemy 2.0, Pydantic v2, Scikit-learn, BeautifulSoup4, HTTPX |
| **Database** | PostgreSQL 18 (Supabase / Local) |
| **Task Queue** | Celery + Redis |
| **Hosting** | Vercel (Frontend), Render (Backend), Supabase (Database) |

---

## 📁 Repository Structure

```text
starter-project/
├── jobiq-backend/
│   ├── app/
│   │   ├── core/           # Config, Database Engine, Bootstrap Seeding
│   │   ├── models/         # SQLAlchemy ORM Models (User, Opportunity, Match, Application)
│   │   ├── routes/         # FastAPI Route Endpoints (Auth, Opportunities, Matches, Pipeline)
│   │   ├── scrapers/       # Multi-Source Scrapers (LinkedIn, Naukri, Internshala, Unstop)
│   │   ├── ml/             # TF-IDF Matcher, Skill Extractor, Resume Parser, Analytics
│   │   ├── schemas/        # Pydantic Schemas
│   │   └── main.py         # FastAPI App Entrypoint & Background Initialization
│   └── requirements.txt
├── jobiq-frontend/
│   ├── public/             # Branding Assets (favicon.svg, custom logo)
│   ├── src/
│   │   ├── api/            # Axios API Client & Authentication Interceptors
│   │   ├── components/     # Reusable UI & AppShell Layout
│   │   ├── data/           # interviewQuestions.ts (300 Curated Questions)
│   │   ├── pages/          # Dashboard, Opportunities, AI Matches, Pipeline, Mock Interview
│   │   └── store/          # Zustand State Management (Auth, Applications, Saved Jobs)
│   └── package.json
└── README.md
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js & npm** (Required locally to run `npm run dev` and build the React frontend)
- **Python (v3.9+)** (Required locally to run the **FastAPI** backend server)
- **PostgreSQL** (Local database or free Supabase cloud URI)

### 1. Backend Setup

```bash
cd jobiq-backend

# Create & activate virtual environment
python -m venv .venv
# On Windows:
.\.venv\Scripts\Activate.ps1
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create a .env file:
DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/jobiq
SECRET_KEY=jobiq-secret-jwt-key-2026

# Start FastAPI Dev Server
python -m uvicorn app.main:app --reload --port 8000
```
Backend will run at: `http://localhost:8000` (API Docs at `http://localhost:8000/docs`).

### 2. Frontend Setup

```bash
cd jobiq-frontend

# Install dependencies
npm install

# Start Vite Dev Server
npm run dev
```
Frontend will run at: `http://localhost:5173`.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
