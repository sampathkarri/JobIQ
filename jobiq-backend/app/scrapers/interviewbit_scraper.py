from __future__ import annotations
import logging
import re
from dataclasses import dataclass, field
import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

@dataclass
class ScrapedInterviewQuestion:
    title: str
    category: str
    difficulty: str
    company: str
    role: string
    tips: str
    keywords: list[str] = field(default_factory=list)
    ideal_points: list[str] = field(default_factory=list)
    source_url: str = "https://www.interviewbit.com"

class InterviewBitQuestionScraper:
    source_name = "interviewbit"

    CATEGORIES = [
        {"name": "Technical", "url": "https://www.interviewbit.com/python-interview-questions/", "role": "Python Developer"},
        {"name": "System Design", "url": "https://www.interviewbit.com/system-design-interview-questions/", "role": "System Architect"},
        {"name": "Technical", "url": "https://www.interviewbit.com/react-interview-questions/", "role": "Frontend Engineer"},
        {"name": "DSA", "url": "https://www.interviewbit.com/data-structure-interview-questions/", "role": "Software Engineer"},
        {"name": "Technical", "url": "https://www.interviewbit.com/sql-interview-questions/", "role": "Database Engineer"},
    ]

    COMPANIES = ["Google", "Amazon", "Microsoft", "Meta", "Flipkart", "Uber", "Oracle", "Goldman Sachs"]

    def fetch_questions(self, limit_per_category: int = 4) -> list[ScrapedInterviewQuestion]:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
        
        scraped_questions = []

        for cat in self.CATEGORIES:
            try:
                response = httpx.get(cat["url"], headers=headers, timeout=10.0, follow_redirects=True)
                if response.status_code != 200:
                    logger.warning(f"Failed to fetch {cat['url']}: status {response.status_code}")
                    continue

                soup = BeautifulSoup(response.text, "html.parser")
                # InterviewBit questions are usually inside h3 or article elements with class ib-heading or similar
                headings = soup.select("h3, h2.ib-heading, section.ib-page-section h3")

                count = 0
                for h in headings:
                    raw_title = h.get_text(strip=True)
                    # Clean up question numbers like "1. What is..." or "Q1: What is..."
                    title = re.sub(r'^\d+[\.\:]\s*|^Q\d+[\.\:]\s*', '', raw_title).strip()
                    
                    if not title or len(title) < 15 or len(title) > 200:
                        continue
                    if not title.endswith("?"):
                        title += "?"

                    # Extract answer/tips snippet from sibling elements
                    tips = "Focus on core principles, trade-offs, and practical code/architecture examples."
                    sibling = h.find_next_sibling(["p", "div"])
                    if sibling:
                        snippet = sibling.get_text(strip=True)
                        if len(snippet) > 20:
                            tips = snippet[:220] + "..." if len(snippet) > 220 else snippet

                    # Determine difficulty heuristic
                    difficulty = "Medium"
                    if any(w in title.lower() for w in ["basic", "what is", "define", "difference"]):
                        difficulty = "Easy"
                    elif any(w in title.lower() for w in ["design", "architecture", "optimize", "internal", "scale"]):
                        difficulty = "Hard"

                    # Assign company randomly or deterministically
                    company = self.COMPANIES[(len(scraped_questions) + count) % len(self.COMPANIES)]

                    # Extract keywords from title
                    words = [w.strip('?,.()').lower() for w in title.split() if len(w) > 3]
                    keywords = list(set(words))[:6]

                    # Extract ideal points
                    ideal_points = [
                        "Clear explanation of core concept",
                        "Real-world application/use-case",
                        "Time/Space complexity or performance impact",
                        "Trade-offs and alternative approaches"
                    ]

                    scraped_questions.append(
                        ScrapedInterviewQuestion(
                            title=title,
                            category=cat["name"],
                            difficulty=difficulty,
                            company=company,
                            role=cat["role"],
                            tips=tips,
                            keywords=keywords,
                            ideal_points=ideal_points,
                            source_url=cat["url"]
                        )
                    )
                    count += 1
                    if count >= limit_per_category:
                        break

            except Exception as e:
                logger.error(f"Error scraping InterviewBit page {cat['url']}: {e}")

        logger.info(f"Successfully scraped {len(scraped_questions)} questions from InterviewBit.")
        return scraped_questions
