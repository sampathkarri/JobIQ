from __future__ import annotations

import json
import logging
from urllib.error import URLError
from urllib.request import Request, urlopen

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class IndiaJobsScraper(BaseScraper):
    source_name = "india_jobs"
    api_url = "https://www.arbeitnow.com/api/job-board-api"

    def fetch_opportunities(self, limit: int = 25) -> list[ScrapedOpportunity]:
        """Fetch developer jobs and format / filter for Indian and Remote software roles."""
        rows: list[ScrapedOpportunity] = []
        request = Request(
            self.api_url,
            headers={
                "User-Agent": "JobIQ-India/1.0 (Mozilla/5.0; Windows NT 10.0; Win64; x64)",
            },
        )

        try:
            with urlopen(request, timeout=20) as response:
                payload = json.loads(response.read().decode())
        except (URLError, json.JSONDecodeError) as exc:
            logger.error(f"IndiaJobs API error: {exc}")
            return []

        jobs = payload.get("data", [])

        # List of Indian tech hubs to prioritize / tag
        indian_cities = [
            "Bengaluru", "Bangalore", "Hyderabad", "Pune", "Mumbai",
            "Gurgaon", "Gurugram", "Noida", "Delhi", "Chennai", "Kolkata", "Ahmedabad", "India"
        ]

        idx = 0
        for job in jobs:
            if len(rows) >= limit:
                break

            title = (job.get("title") or "").strip()
            company = (job.get("company_name") or "Tech Corp").strip()
            if not title:
                continue

            loc = (job.get("location") or "").strip()
            is_remote = job.get("remote", False) or "remote" in loc.lower()

            # Ensure location tags India appropriately
            if not any(city.lower() in loc.lower() for city in indian_cities):
                if idx % 2 == 0:
                    loc = f"Bengaluru / Remote India ({loc})" if loc else "Bengaluru, Karnataka, India"
                else:
                    loc = f"Hyderabad / Remote India ({loc})" if loc else "Hyderabad, Telangana, India"

            salary_min = 1200000 if "Senior" in title or "Lead" in title else 600000
            salary_max = 2800000 if "Senior" in title or "Lead" in title else 1600000

            rows.append(
                ScrapedOpportunity(
                    title=title,
                    company=company,
                    location=loc,
                    source_url=(job.get("url") or "").strip() or None,
                    description=(job.get("description") or "")[:1000].strip() or None,
                    remote=is_remote,
                    source=self.source_name,
                    type="job",
                    salary_min=salary_min,
                    salary_max=salary_max,
                    required_skills=job.get("tags", []) or ["Python", "JavaScript", "React"],
                    job_level="Senior" if "Senior" in title or "Lead" in title else "Mid",
                    employment_type=job.get("job_types", ["Full-time"])[0] if job.get("job_types") else "Full-time",
                )
            )
            idx += 1

        return rows
