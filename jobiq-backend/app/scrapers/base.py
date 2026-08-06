from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass
from typing import Optional


@dataclass
class ScrapedOpportunity:
    title: str
    company: str
    location: Optional[str] = None
    source_url: Optional[str] = None
    description: Optional[str] = None


class BaseScraper:
    def fetch_opportunities(self, limit: int = 20) -> Sequence[ScrapedOpportunity]:
        # TODO: implement provider-specific scrapers.
        return []
