import logging
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)

class UnstopScraper(BaseScraper):
    source_name = "unstop"

    def fetch_opportunities(self, limit: int = 100) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json",
        }

        endpoints = [
            "https://unstop.com/api/public/opportunity/search-new?opportunity=all&per_page=50",
            "https://unstop.com/api/public/opportunity/search-new?opportunity=hackathons&per_page=50",
            "https://unstop.com/api/public/opportunity/search-new?opportunity=jobs&per_page=50",
        ]

        for url in endpoints:
            if len(opportunities) >= limit:
                break

            try:
                with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                    response = client.get(url, headers=headers)
                    if response.status_code != 200:
                        continue

                    data = response.json()
                    items = data.get("data", {}).get("data", [])

                    for item in items:
                        if len(opportunities) >= limit:
                            break

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

                            slug = item.get("site_url") or item.get("seo_url") or item.get("slug")
                            if slug:
                                if str(slug).startswith("http"):
                                    link = slug
                                else:
                                    link = f"https://unstop.com/{slug}"
                            else:
                                continue

                            region = item.get("region") or "Online"
                            prize = item.get("prize_money") or None
                            if prize:
                                prize = self._safe_int(str(prize))
                                if prize == 0:
                                    prize = None

                            description = item.get("short_desc") or None
                            
                            opportunities.append(
                                ScrapedOpportunity(
                                    title=title,
                                    company=company,
                                    location=region,
                                    source_url=link,
                                    source=self.source_name,
                                    type=opp_type,
                                    prize_pool=prize,
                                    remote="online" in region.lower(),
                                    required_skills=[],
                                    description=description,
                                )
                            )
                        except Exception as e:
                            logger.warning(f"Error parsing Unstop item: {e}")
                            continue

                    self._rate_limit()
            except Exception as exc:
                logger.error(f"Unstop scraping error for {url}: {exc}")

        return opportunities
