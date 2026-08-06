import httpx
import logging
from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)

class UnstopScraper(BaseScraper):
    source_name = "unstop"
    api_url = "https://unstop.com/api/public/opportunity/search-new?opportunity=all&per_page=15"

    def fetch_opportunities(self, limit: int = 15) -> list[ScrapedOpportunity]:
        opportunities = []
        try:
            with httpx.Client(timeout=20.0) as client:
                response = client.get(self.api_url)
                response.raise_for_status()
                data = response.json()
                
                items = data.get("data", {}).get("data", [])
                for item in items[:limit]:
                    title = item.get("title", "Unknown")
                    company = item.get("organization", {}).get("name") or item.get("organisationName", "Unknown")
                    opp_type = item.get("opportunityType", "competition")
                    skills = item.get("skills", [])
                    link = f"https://unstop.com/{item.get('seo_url')}" if item.get('seo_url') else None
                    
                    opportunities.append(ScrapedOpportunity(
                        title=title,
                        company=company,
                        source_url=link,
                        source=self.source_name,
                        type=opp_type.lower(),
                        required_skills=skills
                    ))
                self._rate_limit()
        except Exception as exc:
            logger.error(f"Unstop API error: {exc}")
            
        return opportunities
