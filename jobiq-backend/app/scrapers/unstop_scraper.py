from __future__ import annotations

import logging
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class UnstopScraper(BaseScraper):
    source_name = "unstop"
    api_url = "https://unstop.com/api/public/opportunity/search-new?opportunity=all&per_page=20"

    def fetch_opportunities(self, limit: int = 25) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json",
        }

        try:
            with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                response = client.get(self.api_url, headers=headers)
                response.raise_for_status()

                data = response.json()
                items = data.get("data", {}).get("data", [])

                for item in items[:limit]:
                    try:
                        title = (item.get("title") or "").strip()
                        if not title:
                            continue

                        org = item.get("organisation", {}) or {}
                        company = (org.get("name") or "Unstop Partner").strip()

                        opp_type_raw = str(item.get("type", "")).lower()
                        if "hackathon" in opp_type_raw or "coding" in title.lower():
                            opp_type = "hackathon"
                        elif "competition" in opp_type_raw:
                            opp_type = "competition"
                        else:
                            opp_type = "job"

                        item_id = item.get("id")
                        slug = item.get("site_url") or item.get("slug")
                        if slug:
                            link = f"https://unstop.com/{slug}"
                        elif item_id:
                            link = f"https://unstop.com/o/{item_id}"
                        else:
                            link = f"https://unstop.com/opportunity/{abs(hash(title))}"

                        region = item.get("region") or "Online / India"
                        prize = item.get("prize_money") or 50000

                        opportunities.append(
                            ScrapedOpportunity(
                                title=title,
                                company=company,
                                location=f"{region}, India",
                                source_url=link,
                                source=self.source_name,
                                type=opp_type,
                                prize_pool=self._safe_int(str(prize)),
                                remote=True,
                                required_skills=["Competitive Coding", "System Design", "Problem Solving"],
                                description=f"Unstop opportunity: {title} organized by {company}.",
                            )
                        )
                    except Exception as e:
                        logger.warning(f"Error parsing Unstop item: {e}")
                        continue

                self._rate_limit()
        except Exception as exc:
            logger.error(f"Unstop scraping error: {exc}")

        return opportunities
