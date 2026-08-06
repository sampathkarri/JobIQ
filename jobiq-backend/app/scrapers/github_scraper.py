import json
import logging
from urllib.request import Request, urlopen
from urllib.error import URLError
from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)

class ArbeitNowScraper(BaseScraper):
    source_name = "arbeitnow"
    api_url = "https://www.arbeitnow.com/api/job-board-api"

    def fetch_opportunities(self, limit: int = 20) -> list[ScrapedOpportunity]:
        request = Request(self.api_url, headers={"User-Agent": "JobIQ/0.1"})
        try:
            with urlopen(request, timeout=20) as response:
                payload = json.loads(response.read().decode())
        except (URLError, json.JSONDecodeError) as exc:
            logger.error(f"ArbeitNow API error: {exc}")
            return []

        jobs = payload.get("data", [])
        rows = []
        for job in jobs[:limit]:
            title = (job.get("title") or "").strip()
            company = (job.get("company_name") or "Unknown").strip()
            if not title:
                continue
            rows.append(ScrapedOpportunity(
                title=title,
                company=company,
                location=(job.get("location") or "").strip() or None,
                source_url=(job.get("url") or "").strip() or None,
                description=(job.get("description") or "")[:1000].strip() or None,
                remote=job.get("remote", False),
                source=self.source_name,
                required_skills=job.get("tags", []) or [],
                employment_type=job.get("job_types", [""])[0] if job.get("job_types") else None,
            ))
        return rows
