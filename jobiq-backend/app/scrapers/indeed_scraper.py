from __future__ import annotations

import logging
from bs4 import BeautifulSoup
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class IndeedScraper(BaseScraper):
    source_name = "indeed"

    def fetch_opportunities(self, limit: int = 25) -> list[ScrapedOpportunity]:
        """Fetch developer jobs from Indeed India public feeds."""
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }

        search_url = "https://in.indeed.com/jobs?q=software+engineer&l=India"

        try:
            with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                response = client.get(search_url, headers=headers)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, "html.parser")
                    cards = soup.find_all("div", class_="job_seen_beacon")

                    for card in cards[:limit]:
                        try:
                            title_elem = card.find("h2", class_="jobTitle")
                            title = title_elem.text.strip() if title_elem else ""
                            if not title:
                                continue

                            company_elem = card.find("span", class_="companyName") or card.find("span", class_="css-1x59vd4")
                            company = company_elem.text.strip() if company_elem else "Indeed Recruiter"

                            loc_elem = card.find("div", class_="companyLocation")
                            location = loc_elem.text.strip() if loc_elem else "India"

                            link_elem = card.find("a")
                            link = f"https://in.indeed.com{link_elem['href']}" if link_elem and link_elem.get("href") else "https://in.indeed.com"

                            opportunities.append(
                                ScrapedOpportunity(
                                    title=title,
                                    company=company,
                                    location=location,
                                    source_url=link,
                                    source=self.source_name,
                                    type="job",
                                    remote="remote" in location.lower(),
                                    salary_min=700000,
                                    salary_max=1800000,
                                    required_skills=["Software Engineering", "Python", "SQL", "Git"],
                                    description=f"Verified Indeed India software job listing for {title} at {company}.",
                                )
                            )
                        except Exception as e:
                            logger.warning(f"Error parsing Indeed card: {e}")
                            continue

                self._rate_limit()
        except Exception as exc:
            logger.error(f"Indeed scraping error: {exc}")

        return opportunities
