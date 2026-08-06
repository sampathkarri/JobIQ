"""Skill extractor using regex matching against a curated taxonomy."""
from __future__ import annotations

import re


# Curated skill taxonomy — 160+ tech, business, and design skills
SKILL_TAXONOMY: list[str] = [
    # Programming Languages
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Perl",
    "Dart", "Lua", "Haskell", "Elixir", "Clojure", "Objective-C",
    # Web Frontend
    "React", "Angular", "Vue.js", "Svelte", "Next.js", "Nuxt.js",
    "HTML", "CSS", "SASS", "SCSS", "Tailwind CSS", "Bootstrap", "jQuery",
    "Redux", "MobX", "Zustand", "Webpack", "Vite", "Babel",
    # Web Backend
    "Node.js", "Express.js", "Django", "Flask", "FastAPI", "Spring Boot",
    "Ruby on Rails", "Laravel", "ASP.NET", "NestJS", "Gin", "Fiber",
    "GraphQL", "REST API", "gRPC", "WebSocket",
    # Databases
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Elasticsearch",
    "Cassandra", "DynamoDB", "Neo4j", "Firebase", "Supabase",
    "SQL", "NoSQL", "MariaDB", "CouchDB",
    # Cloud & DevOps
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
    "Jenkins", "GitHub Actions", "CI/CD", "Ansible", "Prometheus",
    "Grafana", "Nginx", "Apache", "Linux", "Bash", "Shell Scripting",
    "Heroku", "Vercel", "Netlify", "DigitalOcean",
    # Data & ML
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
    "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
    "Spark", "Hadoop", "Airflow", "Kafka", "Data Engineering",
    "Data Science", "Data Analytics", "Power BI", "Tableau",
    "Matplotlib", "Seaborn", "Jupyter", "Databricks",
    # Mobile
    "React Native", "Flutter", "iOS", "Android", "SwiftUI",
    "Jetpack Compose", "Xamarin", "Ionic",
    # Tools & Practices
    "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence",
    "Figma", "Sketch", "Adobe XD",
    "OAuth", "JWT", "SSO", "SAML",
    "Microservices", "System Design", "Agile", "Scrum", "Kanban",
    "Unit Testing", "TDD", "BDD", "Selenium", "Cypress", "Jest", "Pytest",
    "API Development", "API Design",
    # Blockchain & Web3
    "Blockchain", "Web3", "Solidity", "Ethereum", "Smart Contracts",
    # Business & Soft Skills
    "UI/UX Design", "Product Management", "Project Management",
    "Leadership", "Communication", "Problem Solving", "Teamwork",
    "Critical Thinking", "Analytical Skills",
    # Office & Marketing
    "Excel", "Word", "PowerPoint", "Google Analytics",
    "SEO", "SEM", "Digital Marketing", "Content Marketing",
    "Copywriting", "Social Media Marketing", "Email Marketing",
    # Design & Creative
    "Photoshop", "Illustrator", "After Effects", "Premiere Pro",
    "InDesign", "Canva", "Blender", "Unity", "Unreal Engine",
    # Engineering
    "AutoCAD", "SolidWorks", "CATIA", "Simulink", "LabVIEW",
    # Enterprise
    "SAP", "Salesforce", "HubSpot", "Zoho", "ServiceNow",
    "Oracle", "Workday", "Dynamics 365",
    # Security
    "Cybersecurity", "Penetration Testing", "OWASP", "Encryption",
    "Network Security", "Ethical Hacking",
    # Other
    "Technical Writing", "Documentation", "Open Source",
    "Embedded Systems", "IoT", "Robotics", "Arduino", "Raspberry Pi",
]

# Pre-compile patterns for performance
_PATTERNS: list[tuple[str, re.Pattern]] = [
    (skill, re.compile(r"\b" + re.escape(skill) + r"\b", re.IGNORECASE))
    for skill in SKILL_TAXONOMY
]


def extract_skills(text: str) -> list[str]:
    """Extract skills from text using regex matching against the skill taxonomy.

    Args:
        text: Raw text to extract skills from (resume, job description, etc.)

    Returns:
        Sorted list of unique matched skills.
    """
    if not text:
        return []
    found: list[str] = []
    for canonical_name, pattern in _PATTERNS:
        if pattern.search(text):
            found.append(canonical_name)
    return sorted(set(found))
