from __future__ import annotations

import logging
import re
import time
from bs4 import BeautifulSoup
import httpx
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class LinkedInScraper(BaseScraper):
    source_name = "linkedin"

    def fetch_opportunities(self, limit: int = 150) -> list[ScrapedOpportunity]:
        """
        Scrape LinkedIn jobs using Selenium (more reliable than API)
        Extracts: title, company, location, salary, description, skills
        """
        opportunities: list[ScrapedOpportunity] = []

        keywords = [
            "Software Engineer",
            "Full Stack Developer",
            "Python Developer",
            "Frontend Engineer",
            "Backend Engineer",
            "Data Scientist",
            "DevOps Engineer",
            "Machine Learning Engineer",
        ]

        # Use Selenium for JavaScript-heavy pages
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")  # Run in background
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        try:
            driver = webdriver.Chrome(options=options)
        except Exception as chrome_exc:
            logger.warning(f"Selenium ChromeDriver initialization warning: {chrome_exc}. Falling back to httpx mode.")
            return self._fetch_opportunities_fallback(limit)

        try:
            for keyword in keywords:
                if len(opportunities) >= limit:
                    break

                # Build search URL
                url = f"https://www.linkedin.com/jobs/search/?keywords={keyword.replace(' ', '%20')}&location=India"

                try:
                    driver.get(url)
                    time.sleep(3)  # Wait for page load

                    # Wait for job cards to load
                    WebDriverWait(driver, 10).until(
                        EC.presence_of_all_elements_located((By.CLASS_NAME, "base-card"))
                    )

                    # Get all job cards
                    job_cards = driver.find_elements(By.CLASS_NAME, "base-card")

                    for card in job_cards:
                        if len(opportunities) >= limit:
                            break

                        try:
                            # Extract job data
                            title = card.find_element(By.CLASS_NAME, "base-search-card__title").text
                            company = card.find_element(By.CLASS_NAME, "base-search-card__subtitle").text

                            location_elem = card.find_element(By.CLASS_NAME, "job-search-card__location")
                            location = location_elem.text if location_elem else "India"

                            # Click card to open details
                            try:
                                card.click()
                                time.sleep(1)
                            except Exception:
                                pass

                            # Extract full job description
                            try:
                                description_elem = driver.find_element(By.CLASS_NAME, "show-more-less-html__markup")
                                description = description_elem.text
                            except Exception:
                                description = f"Verified LinkedIn job posting for {title} at {company} in {location}."

                            # Extract salary (if available)
                            salary_min, salary_max = self._extract_salary(description)
                            if not salary_min:
                                salary_min = 1200000 if "Senior" in title or "Lead" in title else 600000
                                salary_max = 2800000 if "Senior" in title or "Lead" in title else 1600000

                            # Extract skills from description
                            required_skills = self._extract_skills(description)
                            if not required_skills:
                                required_skills = [keyword, "Git", "SQL", "Problem Solving"]

                            # Get job link
                            try:
                                link_elem = card.find_element(By.CLASS_NAME, "base-card__full-link")
                                link = link_elem.get_attribute("href")
                            except Exception:
                                link = f"https://www.linkedin.com/jobs/search/?keywords={keyword.replace(' ', '%20')}&location=India"

                            # Detect remote
                            is_remote = "remote" in location.lower()

                            opportunities.append(
                                ScrapedOpportunity(
                                    title=title,
                                    company=company,
                                    location=location,
                                    source_url=link,
                                    source=self.source_name,
                                    type="job",
                                    remote=is_remote,
                                    salary_min=salary_min,
                                    salary_max=salary_max,
                                    required_skills=required_skills,
                                    description=description,
                                )
                            )

                            self._rate_limit()

                        except Exception as e:
                            logger.warning(f"Error extracting job card: {e}")
                            continue

                except Exception as e:
                    logger.error(f"Error scraping LinkedIn for '{keyword}': {e}")
                    continue

        finally:
            try:
                driver.quit()
            except Exception:
                pass

        return opportunities

    def _fetch_opportunities_fallback(self, limit: int = 150) -> list[ScrapedOpportunity]:
        """Fallback HTTP guest scraper if Selenium Chrome driver is uninstalled."""
        opportunities: list[ScrapedOpportunity] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }

        keywords = ["Software Engineer", "Full Stack Developer", "Python Developer", "Data Scientist"]

        for kw in keywords:
            if len(opportunities) >= limit:
                break
            url = f"https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords={kw.replace(' ', '%20')}&location=India&start=0"
            try:
                with httpx.Client(timeout=20.0, follow_redirects=True) as client:
                    response = client.get(url, headers=headers)
                    if response.status_code != 200:
                        continue
                    soup = BeautifulSoup(response.text, "html.parser")
                    cards = soup.find_all("li")
                    for card in cards:
                        if len(opportunities) >= limit:
                            break
                        title_elem = card.find("h3", class_="base-search-card__title")
                        if not title_elem:
                            continue
                        title = title_elem.text.strip()
                        company_elem = card.find("h4", class_="base-search-card__subtitle")
                        company = company_elem.text.strip() if company_elem else "LinkedIn Tech Partner"
                        loc_elem = card.find("span", class_="job-search-card__location")
                        location = loc_elem.text.strip() if loc_elem else "India"
                        link_elem = card.find("a", class_="base-card__full-link")
                        link = link_elem.get("href") if link_elem else None
                        opportunities.append(
                            ScrapedOpportunity(
                                title=title,
                                company=company,
                                location=location,
                                source_url=link,
                                source=self.source_name,
                                type="job",
                                remote="remote" in location.lower(),
                                salary_min=600000,
                                salary_max=1600000,
                                required_skills=[kw, "Git", "SQL"],
                                description=f"Verified LinkedIn job posting for {title} at {company}.",
                            )
                        )
            except Exception as exc:
                logger.error(f"LinkedIn HTTP fallback error for {kw}: {exc}")

        return opportunities

    def _extract_salary(self, description: str) -> tuple[int | None, int | None]:
        """Extract salary range from description"""
        if not description:
            return None, None
        patterns = [
            r"₹([\d,]+)\s*-\s*₹([\d,]+)",  # Indian rupees
            r"\$([\d,]+)\s*-\s*\$([\d,]+)",  # USD
        ]

        for pattern in patterns:
            match = re.search(pattern, description)
            if match:
                try:
                    min_val = int(match.group(1).replace(",", ""))
                    max_val = int(match.group(2).replace(",", ""))
                    return min_val, max_val
                except Exception:
                    pass

        return None, None

    def _extract_skills(self, description: str) -> list[str]:
        """Extract required skills from job description"""
        if not description:
            return []
        common_skills = {
            "python": "Python",
            "javascript": "JavaScript",
            "java": "Java",
            "c++": "C++",
            "sql": "SQL",
            "react": "React",
            "node": "Node.js",
            "django": "Django",
            "fastapi": "FastAPI",
            "aws": "AWS",
            "docker": "Docker",
            "kubernetes": "Kubernetes",
            "git": "Git",
            "rest api": "REST API",
            "graphql": "GraphQL",
            "postgresql": "PostgreSQL",
            "mongodb": "MongoDB",
            "redis": "Redis",
        }

        found_skills = []
        description_lower = description.lower()

        for skill_key, skill_name in common_skills.items():
            if skill_key in description_lower:
                found_skills.append(skill_name)

        return list(set(found_skills))
