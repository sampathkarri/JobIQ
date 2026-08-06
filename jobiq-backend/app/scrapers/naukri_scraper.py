from __future__ import annotations

import logging
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class NaukriScraper(BaseScraper):
    source_name = "naukri"
    api_url = "https://www.naukri.com/jobapi/v3/search?noOfResults=20&keyword=software%20engineer&location=india"

    def fetch_opportunities(self, limit: int = 25) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "appid": "109",
            "systemid": "Naukri",
        }

        try:
            with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                response = client.get(self.api_url, headers=headers)
                if response.status_code == 200:
                    data = response.json()
                    job_details = data.get("jobDetails", [])
                    for job in job_details[:limit]:
                        title = job.get("title", "").strip()
                        company = job.get("companyName", "").strip()
                        if not title:
                            continue

                        tags = job.get("tagsAndSkills", "").split(",") if job.get("tagsAndSkills") else []
                        url = f"https://www.naukri.com{job.get('jdURL')}" if job.get("jdURL") else "https://www.naukri.com"
                        place = job.get("place", "India")

                        opportunities.append(
                            ScrapedOpportunity(
                                title=title,
                                company=company,
                                location=place,
                                source_url=url,
                                source=self.source_name,
                                type="job",
                                required_skills=[t.strip() for t in tags[:5]],
                                salary_min=800000,
                                salary_max=2000000,
                                description=f"Naukri job listing for {title} at {company} in {place}.",
                            )
                        )

                self._rate_limit()
        except Exception as exc:
            logger.error(f"Naukri scraping error: {exc}")

        return opportunities
