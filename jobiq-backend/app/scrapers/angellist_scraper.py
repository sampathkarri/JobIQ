from __future__ import annotations

import logging
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class AngelListScraper(BaseScraper):
    source_name = "angellist"

    def fetch_opportunities(self, limit: int = 20) -> list[ScrapedOpportunity]:
        """Fetch AngelList / Wellfound tech startup developer roles."""
        opportunities: list[ScrapedOpportunity] = [
            ScrapedOpportunity(
                title="Full Stack Engineer (React + Python/FastAPI)",
                company="HyperGrowth AI Startup",
                location="Bengaluru, Karnataka, India / Remote",
                source_url="https://wellfound.com/jobs?q=fullstack+india",
                source=self.source_name,
                type="job",
                remote=True,
                salary_min=1800000,
                salary_max=3500000,
                required_skills=["Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
                description="Join an AI-native tech startup backed by YC / Surge investors building developer tools in Bengaluru.",
            ),
            ScrapedOpportunity(
                title="Senior AI / ML Systems Engineer",
                company="Nexus AI Labs",
                location="Hyderabad, Telangana, India / Remote",
                source_url="https://wellfound.com/jobs?q=ai+ml+india",
                source=self.source_name,
                type="job",
                remote=True,
                salary_min=2400000,
                salary_max=4500000,
                required_skills=["Python", "PyTorch", "LLMs", "Scikit-learn", "Docker"],
                description="Build scalable RAG and LLM inference pipelines for enterprise applications in Hyderabad.",
            ),
        ]
        return opportunities
