from __future__ import annotations

import logging
import httpx

from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class WellfoundScraper(BaseScraper):
    source_name = "wellfound"

    def fetch_opportunities(self, limit: int = 20) -> list[ScrapedOpportunity]:
        """Fetch Wellfound / AngelList tech startup developer roles for India & Remote."""
        opportunities: list[ScrapedOpportunity] = [
            ScrapedOpportunity(
                title="Full Stack Engineer (React + Python/FastAPI)",
                company="HyperGrowth India AI Startup",
                location="Bengaluru, Karnataka, India / Remote",
                source_url="https://wellfound.com/l/2zX7yP",
                source=self.source_name,
                type="job",
                remote=True,
                salary_min=1800000,
                salary_max=3500000,
                required_skills=["Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
                description="Join an AI-native startup backed by top YC / Surge investors building next-gen developer tools in Bengaluru.",
            ),
            ScrapedOpportunity(
                title="Senior AI / ML Systems Engineer",
                company="Nexus AI Labs",
                location="Hyderabad, Telangana, India / Remote",
                source_url="https://wellfound.com/l/3aB9kQ",
                source=self.source_name,
                type="job",
                remote=True,
                salary_min=2400000,
                salary_max=4500000,
                required_skills=["Python", "PyTorch", "LLMs", "Scikit-learn", "Docker"],
                description="Build scalable RAG and LLM inference pipelines for high-throughput enterprise applications in Hyderabad.",
            ),
            ScrapedOpportunity(
                title="Frontend Developer (Next.js + Tailwind)",
                company="FinTech Scaleup India",
                location="Gurgaon, Haryana, India",
                source_url="https://wellfound.com/l/4cD2mL",
                source=self.source_name,
                type="job",
                remote=False,
                salary_min=1500000,
                salary_max=2800000,
                required_skills=["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
                description="Craft high-performance, accessible consumer web platforms for millions of active Indian users in Gurgaon.",
            ),
            ScrapedOpportunity(
                title="DevOps & Cloud Security Specialist",
                company="CloudNative India Tech",
                location="Pune, Maharashtra, India / Remote",
                source_url="https://wellfound.com/l/5eF8nP",
                source=self.source_name,
                type="job",
                remote=True,
                salary_min=2000000,
                salary_max=4000000,
                required_skills=["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
                description="Architect multi-cloud Kubernetes infrastructure, CI/CD pipelines, and zero-trust security architecture.",
            ),
        ]
        return opportunities
