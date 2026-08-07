from __future__ import annotations

import logging
import re
from dataclasses import dataclass, field
from app.ml.skill_extractor import extract_skills

logger = logging.getLogger(__name__)

# Optional spaCy NER loading
_spacy_nlp = None
try:
    import spacy

    try:
        _spacy_nlp = spacy.load("en_core_web_sm")
    except Exception:
        try:
            _spacy_nlp = spacy.load("en_core_web_md")
        except Exception:
            _spacy_nlp = None
except ImportError:
    _spacy_nlp = None


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
    """Parse resume text using spaCy NER (if available) with regex fallback."""
    # Extract email
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    emails = re.findall(email_pattern, text)
    email = emails[0] if emails else None

    # Extract phone
    phone_pattern = r"[\+]?[1-9]?[\d\s\-\(\)]{7,15}"
    phones = re.findall(phone_pattern, text)
    phone = phones[0].strip() if phones else None

    # Extract name (spaCy PERSON entity or regex first line)
    name = None
    if _spacy_nlp:
        try:
            doc = _spacy_nlp(text[:1000])
            for ent in doc.ents:
                if ent.label_ == "PERSON" and len(ent.text.split()) in (2, 3):
                    name = ent.text.strip()
                    break
        except Exception as e:
            logger.warning(f"spaCy NER parsing notice: {e}")

    if not name:
        lines = [l.strip() for l in text.strip().split("\n") if l.strip()]
        name = (
            lines[0]
            if lines and len(lines[0]) < 60 and not re.search(email_pattern, lines[0])
            else None
        )

    # Extract skills
    skills = extract_skills(text)

    # Extract sections
    experience_summary = _extract_section(
        text, ["experience", "work experience", "employment", "work history"]
    )
    education_summary = _extract_section(
        text, ["education", "academic", "qualification", "degree"]
    )
    projects_text = _extract_section(text, ["projects", "personal projects", "key projects"])

    projects = []
    if projects_text:
        project_lines = [
            l.strip()
            for l in projects_text.split("\n")
            if l.strip() and len(l.strip()) > 10
        ]
        projects = project_lines[:10]

    return ParsedResume(
        name=name,
        email=email,
        phone=phone,
        skills=skills,
        experience_summary=experience_summary,
        education_summary=education_summary,
        projects=projects,
    )


def _extract_section(text: str, headers: list[str]) -> str | None:
    """Extract a section from resume text based on common header patterns."""
    text_lower = text.lower()
    for header in headers:
        pattern = rf"(?:^|\n)\s*{re.escape(header)}[:\s]*\n(.*?)(?=\n\s*(?:experience|education|skills|projects|certifications|achievements|awards|references|objective|summary|contact)[:\s]*\n|\Z)"
        match = re.search(pattern, text_lower, re.DOTALL | re.IGNORECASE)
        if match:
            start = match.start(1)
            end = match.end(1)
            return text[start:end].strip()[:2000]
    return None
