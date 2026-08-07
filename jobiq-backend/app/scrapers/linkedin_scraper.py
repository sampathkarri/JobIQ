import logging
from bs4 import BeautifulSoup
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)

class LinkedInScraper(BaseScraper):
    source_name = "linkedin"

    def fetch_opportunities(self, limit: int = 150) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }

        keywords = [
            "Software Engineer",
            "Python Developer",
            "Data Scientist",
            "Frontend Developer",
            "Backend Developer",
            "DevOps Engineer"
        ]

        for kw in keywords:
            for start in [0, 25]:
                if len(opportunities) >= limit:
                    return opportunities
                
                url = f"https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords={kw.replace(' ', '%20')}&location=India&start={start}"
                try:
                    with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                        response = client.get(url, headers=headers)
                        if response.status_code != 200:
                            continue
                        
                        soup = BeautifulSoup(response.text, "html.parser")
                        cards = soup.find_all("li")
                        
                        if not cards:
                            break  # No more results for this keyword

                        for card in cards:
                            if len(opportunities) >= limit:
                                return opportunities
                            
                            title_elem = card.find("h3", class_="base-search-card__title")
                            if not title_elem:
                                continue
                            title = title_elem.text.strip()
                            
                            company_elem = card.find("h4", class_="base-search-card__subtitle")
                            company = company_elem.text.strip() if company_elem else "Unknown Company"
                            
                            loc_elem = card.find("span", class_="job-search-card__location")
                            location = loc_elem.text.strip() if loc_elem else "India"
                            
                            link_elem = card.find("a", class_="base-card__full-link")
                            link = link_elem.get("href") if link_elem else None
                            
                            if not link:
                                continue

                            opportunities.append(
                                ScrapedOpportunity(
                                    title=title,
                                    company=company,
                                    location=location,
                                    source_url=link.split("?")[0] if "?" in link else link,  # Clean URL
                                    source=self.source_name,
                                    type="job",
                                    remote="remote" in location.lower(),
                                    salary_min=None,
                                    salary_max=None,
                                    required_skills=[],
                                    description=None,
                                )
                            )
                except Exception as exc:
                    logger.error(f"LinkedIn HTTP error for {kw}: {exc}")

        return opportunities
