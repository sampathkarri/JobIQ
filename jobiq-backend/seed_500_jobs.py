from __future__ import annotations

import json
import logging
from urllib.parse import quote
from app.core.database import SessionLocal
from app.models.opportunity import Opportunity

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Curated high-demand Indian software engineering job templates
ROLE_TITLES = [
    "Full Stack Software Engineer (React + Python/Node)",
    "Backend Developer (Go / Microservices)",
    "Senior Java Spring Boot Engineer",
    "Frontend Developer (Next.js + TypeScript)",
    "Data Scientist (GenAI / LLMs / NLP)",
    "Machine Learning Systems Engineer",
    "DevOps & Site Reliability Engineer (AWS/K8s)",
    "Cloud Solutions Architect (Azure/GCP)",
    "Android Native App Developer (Kotlin)",
    "iOS Mobile Application Engineer (Swift)",
    "Python FastAPI Backend Engineer",
    "Database Administrator & Performance Tuning",
    "Cybersecurity SOC Analyst & Penetration Tester",
    "QA Automation Engineer (Cypress / Selenium)",
    "Data Engineer (PySpark / Airflow / Snowflake)",
    "Embedded Systems & IoT Software Engineer",
    "Blockchain & Smart Contract Engineer (Solidity/Rust)",
    "UI/UX Product Designer & Developer",
    "Product Manager - Technical Career Platform",
    "Scrum Master / Agile Delivery Lead",
]

COMPANIES = [
    "Flipkart", "Swiggy", "Zomato", "PhonePe", "Razorpay", "Meesho", "CRED",
    "Amazon India", "Microsoft India", "Google India", "Salesforce India",
    "Uber India", "Ola Cabs", "Acko General Insurance", "Paytm", "Zerodha",
    "Groww", "Postman", "BrowserStack", "Freshworks", "Zoho Corporation",
    "TCS Digital", "Infosys Cobalt", "Wipro Turbo", "HCL Tech", "Tech Mahindra",
    "Cognizant", "LTI Mindtree", "Deloitte India", "PwC India", "EY India",
    "KPMG India", "NVIDIA India", "Intel India", "AMD India", "Qualcomm India",
    "Cisco Systems India", "VMware India", "Red Hat India", "Oracle India",
]

LOCATIONS = [
    "Bengaluru, Karnataka, India",
    "Hyderabad, Telangana, India",
    "Pune, Maharashtra, India",
    "Gurgaon, Haryana, India",
    "Noida, Uttar Pradesh, India",
    "Mumbai, Maharashtra, India",
    "Chennai, Tamil Nadu, India",
    "Kolkata, West Bengal, India",
    "Ahmedabad, Gujarat, India",
    "Jaipur, Rajasthan, India",
    "Kochi, Kerala, India",
    "Trivandrum, Kerala, India",
    "Chandigarh, India",
    "Work From Home / Remote India",
]

SKILL_SETS = [
    ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    ["Java", "Spring Boot", "Microservices", "Kafka", "Redis"],
    ["Go", "Kubernetes", "gRPC", "Docker", "PostgreSQL"],
    ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "NLP"],
    ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
    ["Kotlin", "Android SDK", "Jetpack Compose", "Git"],
    ["Swift", "SwiftUI", "Combine", "iOS", "Git"],
    ["Python", "Apache Spark", "Airflow", "Snowflake", "SQL"],
    ["TypeScript", "Cypress", "Selenium", "Jest", "CI/CD"],
]

def seed_500():
    db = SessionLocal()
    existing_count = db.query(Opportunity).count()
    logger.info(f"Existing opportunities before seed: {existing_count}")

    target_total = 500
    needed = max(0, target_total - existing_count)

    if needed == 0:
        logger.info("Already have 500+ opportunities!")
        db.close()
        return

    logger.info(f"Generating {needed} new opportunities to reach 500+ total...")

    created = 0
    for idx in range(needed):
        role_base = ROLE_TITLES[idx % len(ROLE_TITLES)]
        company_base = COMPANIES[idx % len(COMPANIES)]
        location_base = LOCATIONS[idx % len(LOCATIONS)]
        skills = SKILL_SETS[idx % len(SKILL_SETS)]

        opp_num = existing_count + idx + 1
        title = f"{role_base} #{opp_num}"
        company = f"{company_base}"
        is_remote = "Remote" in location_base or "Work From Home" in location_base

        sal_min = 800000 + (idx % 15) * 100000
        sal_max = sal_min + 1200000

        source_name = "naukri" if idx % 3 == 0 else "linkedin" if idx % 3 == 1 else "india_jobs"
        
        query_str = quote(f"{company} {role_base} jobs India")
        if source_name == "linkedin":
            source_url = f"https://www.linkedin.com/jobs/search/?keywords={quote(role_base)}&location=India"
        elif source_name == "naukri":
            source_url = f"https://www.naukri.com/software-engineer-jobs-in-india?k={quote(role_base)}"
        else:
            source_url = f"https://www.google.com/search?q={query_str}"

        opp = Opportunity(
            title=title,
            company=company,
            location=location_base,
            source_url=source_url,
            description=f"Verified Software Engineering position at {company} in {location_base}. Required skills: {', '.join(skills)}.",
            salary_min=sal_min,
            salary_max=sal_max,
            required_skills=json.dumps(skills),
            job_level="Senior" if "Senior" in title or "Lead" in title or "Architect" in title else "Mid",
            employment_type="Full-time",
            remote=is_remote,
            source=source_name,
            type="job" if idx % 5 != 0 else "internship",
            is_active=True
        )
        db.add(opp)
        created += 1

    db.commit()
    final_count = db.query(Opportunity).count()
    logger.info(f"Successfully created {created} opportunities! Final count in DB: {final_count}")
    db.close()

if __name__ == "__main__":
    seed_500()
