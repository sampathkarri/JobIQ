from __future__ import annotations

import json
import re
from urllib.error import URLError
from urllib.request import Request, urlopen

from app.scrapers.base import BaseScraper, ScrapedOpportunity


class RemotiveScraper(BaseScraper):
    api_url = "https://remotive.com/api/remote-jobs"

    def fetch_opportunities(self, limit: int = 20) -> list[ScrapedOpportunity]:
        request = Request(self.api_url, headers={"User-Agent": "JobIQ/0.1"})
        try:
            with urlopen(request, timeout=20) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except URLError as exc:
            raise RuntimeError(f"Failed to reach Remotive API: {exc}") from exc
        except json.JSONDecodeError as exc:
            raise RuntimeError("Remotive API returned invalid JSON") from exc

        jobs = payload.get("jobs")
        if not isinstance(jobs, list):
            raise RuntimeError("Remotive API response did not include jobs list")

        rows: list[ScrapedOpportunity] = []
        for job in jobs[:limit]:
            title = (job.get("title") or "").strip()
            company = (job.get("company_name") or "Unknown Company").strip()
            if not title:
                continue

            html_description = job.get("description") or ""
            plain_description = re.sub(r"<[^>]+>", " ", html_description)
            plain_description = " ".join(plain_description.split())

            rows.append(
                ScrapedOpportunity(
                    title=title,
                    company=company,
                    location=(job.get("candidate_required_location") or "").strip() or None,
                    source_url=(job.get("url") or "").strip() or None,
                    description=plain_description[:1000] or None,
                )
            )

        return rows

