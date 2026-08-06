import httpx
import logging
from bs4 import BeautifulSoup
from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)

class InternshalaScraper(BaseScraper):
    source_name = "internshala"
    base_url = "https://internshala.com"
    target_url = "https://internshala.com/internships/internship-in-india"

    def fetch_opportunities(self, limit: int = 20) -> list[ScrapedOpportunity]:
        opportunities = []
        try:
            with httpx.Client(timeout=20.0) as client:
                response = client.get(self.target_url, headers={"User-Agent": "Mozilla/5.0"})
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                cards = soup.find_all("div", class_="internship_meta")
                for card in cards[:limit]:
                    try:
                        title_elem = card.find("h3", class_="job-internship-name")
                        title = title_elem.text.strip() if title_elem else "Unknown Title"
                        
                        company_elem = card.find("p", class_="company-name")
                        company = company_elem.text.strip() if company_elem else "Unknown Company"
                        
                        location_elem = card.find("a", class_="location_link")
                        location = location_elem.text.strip() if location_elem else None
                        
                        link_elem = title_elem.find("a") if title_elem else None
                        link = self.base_url + link_elem["href"] if link_elem and "href" in link_elem.attrs else None
                        
                        stipend_elem = card.find("span", class_="stipend")
                        stipend_str = stipend_elem.text.strip() if stipend_elem else None
                        stipend = self._safe_int(stipend_str)
                        
                        opportunities.append(ScrapedOpportunity(
                            title=title,
                            company=company,
                            location=location,
                            source_url=link,
                            source=self.source_name,
                            type="internship",
                            stipend=stipend,
                            remote=bool(location and "Work From Home" in location)
                        ))
                    except Exception as e:
                        logger.warning(f"Error parsing Internshala card: {e}")
                        continue
                        
                self._rate_limit()
        except Exception as exc:
            logger.error(f"Internshala scraping error: {exc}")
            
        return opportunities
