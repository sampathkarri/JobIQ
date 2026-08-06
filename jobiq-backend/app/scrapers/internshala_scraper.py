from __future__ import annotations

import logging
from bs4 import BeautifulSoup
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class InternshalaScraper(BaseScraper):
    source_name = "internshala"
    base_url = "https://internshala.com"

    categories = [
        "computer-science-internship",
        "python-shala-internships",
        "web-development-internship",
        "mobile-app-development-internship",
        "data-science-internship",
    ]

    def fetch_opportunities(self, limit: int = 150) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }

        for cat in self.categories:
            if len(opportunities) >= limit:
                break

            target_url = f"{self.base_url}/internships/{cat}/"
            try:
                with httpx.Client(timeout=25.0, follow_redirects=True) as client:
                    response = client.get(target_url, headers=headers)
                    if response.status_code != 200:
                        continue

                    soup = BeautifulSoup(response.text, "html.parser")
                    cards = soup.find_all("div", class_="individual_internship")

                    for card in cards:
                        if len(opportunities) >= limit:
                            break

                        try:
                            title_elem = card.find(class_="job-title-href")
                            title = title_elem.text.strip() if title_elem else ""
                            if not title:
                                continue

                            company_elem = card.find(class_="company-name") or card.find(class_="company_name")
                            company = company_elem.text.strip() if company_elem else "Unknown Company"

                            loc_elem = card.find(class_="locations")
                            location = loc_elem.text.strip() if loc_elem else "India"

                            href = card.get("data-href") or (title_elem.get("href") if title_elem else "")
                            link = self.base_url + href if href and not href.startswith("http") else href

                            stipend_elem = card.find(class_="stipend")
                            stipend_str = stipend_elem.text.strip() if stipend_elem else None
                            stipend = self._safe_int(stipend_str)

                            skills = []
                            skill_elems = card.find_all(class_="job_skill")
                            for s in skill_elems:
                                skills.append(s.text.strip())

                            is_remote = "Work From Home" in location or "Remote" in location

                            opportunities.append(
                                ScrapedOpportunity(
                                    title=title,
                                    company=company,
                                    location=location,
                                    source_url=link,
                                    source=self.source_name,
                                    type="internship",
                                    stipend=stipend,
                                    remote=is_remote,
                                    required_skills=skills,
                                    description=f"Internship opportunity at {company} ({location}). Stipend: {stipend_str or 'Disclosed upon application'}.",
                                )
                            )
                        except Exception as e:
                            logger.warning(f"Error parsing Internshala card: {e}")
                            continue

                    self._rate_limit()
            except Exception as exc:
                logger.error(f"Internshala scraping error for category {cat}: {exc}")

        return opportunities
