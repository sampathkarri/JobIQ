from fastapi import APIRouter
from app.scrapers.interviewbit_scraper import InterviewBitQuestionScraper

router = APIRouter(prefix="/interview-prep", tags=["interview-prep"])

@router.get("/scrape-interviewbit")
def scrape_interviewbit_questions():
    """Scrape live tech & system design interview questions directly from InterviewBit."""
    scraper = InterviewBitQuestionScraper()
    questions = scraper.fetch_questions(limit_per_category=3)
    
    # Format questions nicely for the API response
    items = []
    for idx, q in enumerate(questions, start=100):
        items.append({
            "id": idx,
            "category": q.category,
            "role": q.role,
            "difficulty": q.difficulty,
            "title": q.title,
            "tips": q.tips,
            "keywords": q.keywords,
            "ideal_points": q.ideal_points,
            "company": q.company,
            "source_url": q.source_url,
        })
    return {"source": "InterviewBit", "total": len(items), "questions": items}
