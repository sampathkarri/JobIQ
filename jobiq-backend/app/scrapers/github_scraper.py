from __future__ import annotations

import json
import logging
from urllib.error import URLError
from urllib.request import Request, urlopen

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class ArbeitNowScraper(BaseScraper):
    source_name = "arbeitnow"
    api_url = "https://www.arbeitnow.com/api/job-board-api"

    def fetch_opportunities(self, limit: int = 150) -> list[ScrapedOpportunity]:
        rows: list[ScrapedOpportunity] = []

        for page in range(1, 6):
            if len(rows) >= limit:
                break

            url = f"{self.api_url}?page={page}"
            request = Request(url, headers={"User-Agent": "JobIQ/0.1"})
            try:
                with urlopen(request, timeout=20) as response:
                    payload = json.loads(response.read().decode())
            except (URLError, json.JSONDecodeError) as exc:
                logger.error(f"ArbeitNow API page {page} error: {exc}")
                break

            jobs = payload.get("data", [])
            if not jobs:
                break

            for job in jobs:
                if len(rows) >= limit:
                    break

                title = (job.get("title") or "").strip()
                company = (job.get("company_name") or "Unknown").strip()
                if not title:
                    continue

                rows.append(
                    ScrapedOpportunity(
                        title=title,
                        company=company,
                        location=(job.get("location") or "").strip() or "Remote / International",
                        source_url=(job.get("url") or "").strip() or None,
                        description=(job.get("description") or "")[:1000].strip() or None,
                        remote=job.get("remote", False),
                        source=self.source_name,
                        required_skills=job.get("tags", []) or ["Software Development"],
                        employment_type=job.get("job_types", ["Full-time"])[0] if job.get("job_types") else "Full-time",
                    )
                )
            self._rate_limit()

        return rows
