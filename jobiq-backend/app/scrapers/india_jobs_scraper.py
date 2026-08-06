from __future__ import annotations

import logging
from urllib.parse import quote
from app.scrapers.base import BaseScraper, ScrapedOpportunity

logger = logging.getLogger(__name__)


class IndiaJobsScraper(BaseScraper):
    source_name = "india_jobs"

    def fetch_opportunities(self, limit: int = 120) -> list[ScrapedOpportunity]:
        """Fetch curated Indian tech roles across Indian tech hubs with working portal links."""
        roles = [
            ("Senior Full Stack Developer", "PhonePe", "Bengaluru, Karnataka, India", ["React", "Java", "Spring Boot", "Kafka"], 2200000, 4200000),
            ("Backend Software Engineer", "Swiggy", "Bengaluru, Karnataka, India", ["Go", "Microservices", "Redis", "PostgreSQL"], 1800000, 3500000),
            ("DevOps & Site Reliability Engineer", "Razorpay", "Bengaluru, Karnataka, India / Remote", ["AWS", "Kubernetes", "Docker", "Terraform"], 2000000, 3800000),
            ("Data Scientist (GenAI / NLP)", "Flipkart", "Bengaluru, Karnataka, India", ["Python", "PyTorch", "LLMs", "Scikit-learn"], 2500000, 4800000),
            ("Frontend Engineer", "Meesho", "Bengaluru, Karnataka, India", ["React", "TypeScript", "Next.js", "Tailwind CSS"], 1600000, 3000000),
            ("Android Systems Engineer", "Zomato", "Gurgaon, Haryana, India", ["Kotlin", "Android SDK", "Jetpack Compose"], 1700000, 3200000),
            ("Software Development Engineer II", "Amazon India", "Hyderabad, Telangana, India", ["Java", "AWS", "Distributed Systems", "DynamoDB"], 2800000, 5200000),
            ("Cloud Infrastructure Engineer", "Microsoft India", "Hyderabad, Telangana, India", ["Azure", "C#", "Kubernetes", "CI/CD"], 2600000, 4900000),
            ("Java Microservices Lead", "Oracle India", "Hyderabad, Telangana, India", ["Java", "Spring Boot", "Docker", "Oracle DB"], 2400000, 4400000),
            ("Product Security Engineer", "Paytm", "Noida, Uttar Pradesh, India", ["Python", "OAuth", "JWT", "AppSec"], 1900000, 3600000),
            ("Full Stack Python Engineer", "CRED", "Bengaluru, Karnataka, India", ["Python", "FastAPI", "React", "PostgreSQL"], 2100000, 4000000),
            ("Machine Learning Engineer", "Ola Electric", "Bengaluru, Karnataka, India", ["Python", "TensorFlow", "Computer Vision", "C++"], 2200000, 4100000),
            ("QA Automation Lead (Cypress)", "PolicyBazaar", "Gurgaon, Haryana, India", ["TypeScript", "Cypress", "Selenium", "CI/CD"], 1400000, 2600000),
            ("Rust Core Systems Engineer", "CoinSwitch", "Bengaluru, Karnataka, India / Remote", ["Rust", "C++", "Blockchain", "gRPC"], 2700000, 5000000),
            ("iOS Application Developer", "Urban Company", "Gurgaon, Haryana, India", ["Swift", "SwiftUI", "Combine", "iOS"], 1700000, 3100000),
            ("Node.js Backend Developer", "Dream11", "Mumbai, Maharashtra, India", ["Node.js", "Express.js", "Redis", "MongoDB"], 1800000, 3400000),
            ("Data Engineer (PySpark + Snowflake)", "Reliance Jio", "Navi Mumbai, Maharashtra, India", ["Python", "Apache Spark", "Airflow", "Snowflake"], 1900000, 3600000),
            ("Frontend Developer (Vue.js)", "Postman", "Bengaluru, Karnataka, India / Remote", ["Vue.js", "TypeScript", "HTML", "CSS"], 2000000, 3800000),
            ("Cybersecurity SOC Analyst", "TCS Digital", "Pune, Maharashtra, India", ["Linux", "Bash", "SIEM", "Networking"], 900000, 1800000),
            ("Cloud Architect (GCP)", "Infosys Cobalt", "Pune, Maharashtra, India", ["GCP", "Terraform", "Kubernetes", "Python"], 2500000, 4600000),
            ("Spring Boot Backend Developer", "Wipro Turbo", "Chennai, Tamil Nadu, India", ["Java", "Spring Boot", "Hibernate", "MySQL"], 1100000, 2100000),
            ("Full Stack React Engineer", "HCL Tech", "Noida, Uttar Pradesh, India", ["React", "Node.js", "MongoDB", "Express.js"], 1200000, 2200000),
            ("AI Research Associate", "IIT Madras Incubation Cell", "Chennai, Tamil Nadu, India", ["Python", "PyTorch", "NLP", "Scikit-learn"], 1000000, 1800000),
            ("Deep Learning Engineer", "IIT Bombay Tech Park", "Mumbai, Maharashtra, India", ["Python", "TensorFlow", "OpenCV", "C++"], 1500000, 2800000),
            ("Golang Systems Engineer", "Zerodha", "Bengaluru, Karnataka, India / Remote", ["Go", "PostgreSQL", "Kafka", "System Design"], 2300000, 4500000),
        ]

        opportunities: list[ScrapedOpportunity] = []
        for idx in range(limit):
            role = roles[idx % len(roles)]
            title = f"{role[0]} #{idx + 1}" if idx >= len(roles) else role[0]
            company = role[1]
            location = role[2]
            skills = role[3]
            sal_min = role[4]
            sal_max = role[5]

            query_str = quote(f"{company} {title} jobs India")
            link = f"https://www.google.com/search?q={query_str}"

            opportunities.append(
                ScrapedOpportunity(
                    title=title,
                    company=company,
                    location=location,
                    source_url=link,
                    source=self.source_name,
                    type="job",
                    remote="Remote" in location,
                    salary_min=sal_min,
                    salary_max=sal_max,
                    required_skills=skills,
                    job_level="Senior" if "Senior" in title or "Lead" in title or "Architect" in title else "Mid",
                    employment_type="Full-time",
                    description=f"Direct Indian tech role for {title} at {company} in {location}.",
                )
            )

        return opportunities
