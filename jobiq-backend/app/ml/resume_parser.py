import re
from dataclasses import dataclass, field
from app.ml.skill_extractor import extract_skills

@dataclass
class ParsedResume:
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    skills: list[str] = field(default_factory=list)
    experience_summary: str | None = None
    education_summary: str | None = None
    projects: list[str] = field(default_factory=list)

def parse_resume(text: str) -> ParsedResume:
    """Parse resume text and extract structured data."""
    # Extract email
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, text)
    email = emails[0] if emails else None
    
    # Extract phone
    phone_pattern = r'[\+]?[1-9]?[\d\s\-\(\)]{7,15}'
    phones = re.findall(phone_pattern, text)
    phone = phones[0].strip() if phones else None
    
    # Extract name (first non-empty line, often the name)
    lines = [l.strip() for l in text.strip().split('\n') if l.strip()]
    name = lines[0] if lines and len(lines[0]) < 60 and not re.search(email_pattern, lines[0]) else None
    
    # Extract skills
    skills = extract_skills(text)
    
    # Extract sections
    experience_summary = _extract_section(text, ['experience', 'work experience', 'employment', 'work history'])
    education_summary = _extract_section(text, ['education', 'academic', 'qualification', 'degree'])
    projects_text = _extract_section(text, ['projects', 'personal projects', 'key projects'])
    
    projects = []
    if projects_text:
        project_lines = [l.strip() for l in projects_text.split('\n') if l.strip() and len(l.strip()) > 10]
        projects = project_lines[:10]  # max 10 projects
    
    return ParsedResume(
        name=name, email=email, phone=phone,
        skills=skills, experience_summary=experience_summary,
        education_summary=education_summary, projects=projects
    )

def _extract_section(text: str, headers: list[str]) -> str | None:
    """Extract a section from resume text based on common header patterns."""
    text_lower = text.lower()
    for header in headers:
        pattern = rf'(?:^|\n)\s*{re.escape(header)}[:\s]*\n(.*?)(?=\n\s*(?:experience|education|skills|projects|certifications|achievements|awards|references|objective|summary|contact)[:\s]*\n|\Z)'
        match = re.search(pattern, text_lower, re.DOTALL | re.IGNORECASE)
        if match:
            start = match.start(1)
            end = match.end(1)
            return text[start:end].strip()[:2000]
    return None
