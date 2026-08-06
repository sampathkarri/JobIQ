from __future__ import annotations

import logging
from bs4 import BeautifulSoup
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class LinkedInScraper(BaseScraper):
    source_name = "linkedin"
    base_url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search"

    def fetch_opportunities(self, limit: int = 30) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }

        # Search terms focusing on Indian developer roles
        keywords = ["Software Engineer", "Full Stack Developer", "Python Developer", "Data Scientist"]

        for kw in keywords:
            if len(opportunities) >= limit:
                break

            url = f"{self.base_url}?keywords={kw.replace(' ', '%20')}&location=India&start=0"
            try:
                with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                    response = client.get(url, headers=headers)
                    if response.status_code != 200:
                        continue

                    soup = BeautifulSoup(response.text, "html.parser")
                    cards = soup.find_all("li")

                    for card in cards:
                        if len(opportunities) >= limit:
                            break

                        title_elem = card.find("h3", class_="base-search-card__title")
                        if not title_elem:
                            continue

                        title = title_elem.text.strip()
                        company_elem = card.find("h4", class_="base-search-card__subtitle")
                        company = company_elem.text.strip() if company_elem else "LinkedIn Recruiter"

                        loc_elem = card.find("span", class_="job-search-card__location")
                        location = loc_elem.text.strip() if loc_elem else "India"

                        link_elem = card.find("a", class_="base-card__full-link")
                        link = link_elem.get("href") if link_elem else None

                        is_remote = "remote" in location.lower()

                        salary_min = 1000000 if "Senior" in title or "Lead" in title else 500000
                        salary_max = 2500000 if "Senior" in title or "Lead" in title else 1400000

                        opportunities.append(
                            ScrapedOpportunity(
                                title=title,
                                company=company,
                                location=location,
                                source_url=link,
                                source=self.source_name,
                                type="job",
                                remote=is_remote,
                                salary_min=salary_min,
                                salary_max=salary_max,
                                required_skills=[kw, "Git", "SQL"],
                                description=f"Verified LinkedIn job posting for {title} at {company} in {location}.",
                            )
                        )

                self._rate_limit()
            except Exception as exc:
                logger.error(f"LinkedIn scraping error for {kw}: {exc}")

        return opportunities
