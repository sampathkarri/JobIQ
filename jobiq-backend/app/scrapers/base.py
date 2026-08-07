from __future__ import annotations
import time
import logging
from collections.abc import Sequence
from dataclasses import dataclass, field
from typing import Optional

logger = logging.getLogger(__name__)

@dataclass
class ScrapedOpportunity:
    title: str
    company: str
    location: Optional[str] = None
    source_url: Optional[str] = None
    description: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    required_skills: list[str] = field(default_factory=list)
    job_level: Optional[str] = None
    employment_type: Optional[str] = None
    remote: bool = False
    source: Optional[str] = None
    company_logo_url: Optional[str] = None
    type: str = "job"  # job, internship, hackathon, competition
    stipend: Optional[int] = None
    prize_pool: Optional[int] = None
    duration_weeks: Optional[int] = None

class BaseScraper:
    """Base class for all job scrapers."""
    source_name: str = "unknown"
    rate_limit_seconds: float = 2.0

    def fetch_opportunities(self, limit: int = 20) -> Sequence[ScrapedOpportunity]:
        raise NotImplementedError

    def _rate_limit(self) -> None:
        time.sleep(self.rate_limit_seconds)

    def _safe_int(self, value: str | None) -> int | None:
        if not value:
            return None
        try:
            import re
            match = re.search(r'\b\d+(?:,\d+)*\b', str(value))
            if match:
                return int(match.group(0).replace(',', ''))
            return None
        except (ValueError, TypeError):
            return None
