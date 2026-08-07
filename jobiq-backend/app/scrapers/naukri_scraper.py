import logging
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)

class NaukriScraper(BaseScraper):
    source_name = "naukri"

    def fetch_opportunities(self, limit: int = 100) -> list[ScrapedOpportunity]:
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "appid": "109",
            "systemid": "Naukri",
        }

        keywords = [
            "software engineer",
            "python developer",
            "data scientist",
            "frontend developer"
        ]

        for kw in keywords:
            if len(opportunities) >= limit:
                break
                
            api_url = f"https://www.naukri.com/jobapi/v3/search?noOfResults=20&keyword={kw.replace(' ', '%20')}&location=india"

            try:
                with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                    response = client.get(api_url, headers=headers)
                    if response.status_code == 200:
                        data = response.json()
                        job_details = data.get("jobDetails", [])
                        
                        for job in job_details:
                            if len(opportunities) >= limit:
                                break
                                
                            title = job.get("title", "").strip()
                            company = job.get("companyName", "").strip()
                            if not title:
                                continue

                            tags_str = job.get("tagsAndSkills", "")
                            tags = [t.strip() for t in tags_str.split(",") if t.strip()] if tags_str else []
                            
                            jd_url = job.get('jdURL')
                            url = f"https://www.naukri.com{jd_url}" if jd_url and jd_url.startswith("/") else (jd_url or "https://www.naukri.com")
                            
                            placeholders = job.get("placeholders", [])
                            place = "India"
                            salary_min = None
                            salary_max = None
                            
                            for p in placeholders:
                                if p.get("type") == "location":
                                    place = p.get("label", "India")
                                elif p.get("type") == "salary":
                                    sal_label = p.get("label", "")
                                    # Very basic parsing, e.g., "5-10 Lacs PA"
                                    if "Lacs" in sal_label:
                                        parts = sal_label.replace("Lacs PA", "").replace("PA", "").strip().split("-")
                                        if len(parts) == 2:
                                            try:
                                                salary_min = int(float(parts[0].strip()) * 100000)
                                                salary_max = int(float(parts[1].strip()) * 100000)
                                            except ValueError:
                                                pass
                            
                            # Fallback to salaryRange field if any
                            if not salary_min and not salary_max:
                                pass # Left as None if we can't parse

                            opportunities.append(
                                ScrapedOpportunity(
                                    title=title,
                                    company=company,
                                    location=place,
                                    source_url=url,
                                    source=self.source_name,
                                    type="job",
                                    required_skills=tags,
                                    salary_min=salary_min,
                                    salary_max=salary_max,
                                    description=None,
                                )
                            )

                    self._rate_limit()
            except Exception as exc:
                logger.error(f"Naukri scraping error for {kw}: {exc}")

        return opportunities
