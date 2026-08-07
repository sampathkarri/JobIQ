from __future__ import annotations

import json
import logging
import re
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import httpx

from app.ml.skill_extractor import extract_skills

logger = logging.getLogger(__name__)


def parse_job_link(url: str) -> dict:
    """
    Smart job link parser.
    Fetches HTML from any career portal or job listing URL and extracts structured job details:
    title, company, location, salary_min, salary_max, salary_currency, description, required_skills, source_name, source_url.
    """
    parsed_url = urlparse(url)
    domain = parsed_url.netloc.lower()

    # Extract human-friendly source name from domain
    source_name = _extract_source_name(domain)

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        with httpx.Client(timeout=20.0, follow_redirects=True) as client:
            response = client.get(url, headers=headers)
            html = response.text
    except Exception as exc:
        logger.error(f"Failed to fetch job link {url}: {exc}")
        # Fallback response if web page cannot be fetched
        return {
            "title": _title_from_url(url),
            "company": source_name,
            "location": "Remote / Unspecified",
            "salary_min": None,
            "salary_max": None,
            "salary_currency": "INR",
            "description": f"Custom job added from {url}",
            "required_skills": [],
            "source_name": source_name,
            "source_url": url,
        }

    soup = BeautifulSoup(html, "html.parser")

    title = None
    company = None
    location = None
    description = None
    salary_min = None
    salary_max = None
    salary_currency = "INR"

    # 1. Try JSON-LD Schema (JobPosting)
    json_ld_data = _extract_json_ld(soup)
    if json_ld_data:
        title = json_ld_data.get("title")
        org = json_ld_data.get("hiringOrganization")
        if isinstance(org, dict):
            company = org.get("name")
        elif isinstance(org, str):
            company = org

        loc_data = json_ld_data.get("jobLocation")
        if isinstance(loc_data, dict):
            addr = loc_data.get("address")
            if isinstance(addr, dict):
                parts = [
                    addr.get("addressLocality"),
                    addr.get("addressRegion"),
                    addr.get("addressCountry"),
                ]
                location = ", ".join([p for p in parts if p])

        desc_raw = json_ld_data.get("description")
        if desc_raw:
            description = _clean_html_text(desc_raw)

        sal_data = json_ld_data.get("baseSalary")
        if isinstance(sal_data, dict):
            val = sal_data.get("value")
            if isinstance(val, dict):
                salary_min = _safe_int(val.get("minValue"))
                salary_max = _safe_int(val.get("maxValue"))
            salary_currency = sal_data.get("currency") or "INR"

    # 2. Extract from Meta tags & OpenGraph if missing
    if not title:
        og_title = (
            soup.find("meta", property="og:title")
            or soup.find("meta", name="twitter:title")
            or soup.find("meta", name="title")
        )
        if og_title and og_title.get("content"):
            title = og_title["content"].strip()

    if not company:
        og_site = (
            soup.find("meta", property="og:site_name")
            or soup.find("meta", name="publisher")
            or soup.find("meta", name="author")
        )
        if og_site and og_site.get("content"):
            company = og_site["content"].strip()

    if not description:
        og_desc = (
            soup.find("meta", property="og:description")
            or soup.find("meta", name="description")
            or soup.find("meta", name="twitter:description")
        )
        if og_desc and og_desc.get("content"):
            description = og_desc["content"].strip()

    # 3. DOM HTML Heuristic Fallbacks
    if not title:
        h1 = soup.find("h1")
        if h1:
            title = h1.text.strip()

    if not title and soup.title:
        clean_page_title = soup.title.text.strip()
        # Clean title strings like "Software Engineer at LSEG - Careers"
        title = clean_page_title.split("|")[0].split("-")[0].strip()

    if not company:
        # Check domain or fallback
        company = source_name

    if not description:
        # Search for main job description containers
        main_container = (
            soup.find(class_=re.compile(r"description|job-details|content|posting-requirements", re.I))
            or soup.find("main")
            or soup.find("article")
        )
        if main_container:
            description = _clean_html_text(main_container.text)
        else:
            description = _clean_html_text(soup.body.text if soup.body else "")[:2000]

    # Extract salary if not found in JSON-LD
    if not salary_min and description:
        salary_min, salary_max, salary_currency = _extract_salary_from_text(description)

    # Extract required skills from description and title
    combined_text = f"{title or ''} {description or ''}"
    required_skills = extract_skills(combined_text)

    # Fallback default title if still missing
    if not title:
        title = _title_from_url(url)

    return {
        "title": title[:255] if title else "Software Engineer Position",
        "company": company[:255] if company else source_name,
        "location": location[:255] if location else "India / Remote",
        "salary_min": salary_min,
        "salary_max": salary_max,
        "salary_currency": salary_currency,
        "description": description[:4000] if description else f"Job posting parsed from {url}",
        "required_skills": required_skills,
        "source_name": source_name,
        "source_url": url,
    }


def _extract_source_name(domain: str) -> str:
    """Derive clean source name from domain (e.g. careers.lseg.com -> LSEG, in.linkedin.com -> LinkedIn)."""
    domain_lower = domain.lower()
    known_sources = {
        "lseg": "LSEG",
        "linkedin": "LinkedIn",
        "naukri": "Naukri",
        "indeed": "Indeed",
        "unstop": "Unstop",
        "internshala": "Internshala",
        "glassdoor": "Glassdoor",
        "wellfound": "Wellfound",
        "myworkdayjobs": "Workday",
        "greenhouse": "Greenhouse",
        "lever": "Lever",
        "workable": "Workable",
        "smartrecruiters": "SmartRecruiters",
        "google": "Google Careers",
        "amazon": "Amazon Jobs",
        "microsoft": "Microsoft Careers",
    }

    for key, val in known_sources.items():
        if key in domain_lower:
            return val

    parts = domain.replace("www.", "").replace("careers.", "").replace("jobs.", "").split(".")
    name = parts[0] if parts else "Career Portal"
    return name.capitalize()


def _extract_json_ld(soup: BeautifulSoup) -> dict | None:
    """Extract JSON-LD JobPosting schema if present."""
    scripts = soup.find_all("script", type="application/ld+json")
    for script in scripts:
        if not script.string:
            continue
        try:
            data = json.loads(script.string)
            if isinstance(data, dict):
                if data.get("@type") == "JobPosting":
                    return data
                if "@graph" in data and isinstance(data["@graph"], list):
                    for item in data["@graph"]:
                        if isinstance(item, dict) and item.get("@type") == "JobPosting":
                            return item
            elif isinstance(data, list):
                for item in data:
                    if isinstance(item, dict) and item.get("@type") == "JobPosting":
                        return item
        except Exception:
            continue
    return None


def _clean_html_text(text: str) -> str:
    """Strip extra spaces and html markup."""
    text = re.sub(r"<[^>]+>", " ", text)
    return " ".join(text.split()).strip()


def _title_from_url(url: str) -> str:
    """Generate title fallback from URL path."""
    parsed = urlparse(url)
    path_segments = [s for s in parsed.path.split("/") if s and not s.isdigit()]
    if path_segments:
        last = path_segments[-1].replace("-", " ").replace("_", " ")
        return last.title()
    return "Custom Job Opportunity"


def _extract_salary_from_text(text: str) -> tuple[int | None, int | None, str]:
    """Extract salary min/max and currency from text."""
    currency = "INR"
    min_sal = None
    max_sal = None

    # Check Lacs PA regex: e.g. "12-25 Lacs PA" or "15 to 30 LPA"
    lpa_match = re.search(r"(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lpa)", text, re.I)
    if lpa_match:
        try:
            min_sal = int(float(lpa_match.group(1)) * 100000)
            max_sal = int(float(lpa_match.group(2)) * 100000)
            return min_sal, max_sal, "INR"
        except ValueError:
            pass

    # Check Rupee range: ₹12,00,000 - ₹24,00,000
    inr_match = re.search(r"₹\s*([\d,]+)\s*-\s*₹?\s*([\d,]+)", text)
    if inr_match:
        try:
            min_sal = int(inr_match.group(1).replace(",", ""))
            max_sal = int(inr_match.group(2).replace(",", ""))
            return min_sal, max_sal, "INR"
        except ValueError:
            pass

    # Check USD range: $80,000 - $120,000
    usd_match = re.search(r"\$\s*([\d,]+)\s*-\s*\$?\s*([\d,]+)", text)
    if usd_match:
        try:
            min_sal = int(usd_match.group(1).replace(",", ""))
            max_sal = int(usd_match.group(2).replace(",", ""))
            return min_sal, max_sal, "USD"
        except ValueError:
            pass

    return None, None, currency


def _safe_int(val: any) -> int | None:
    if val is None:
        return None
    try:
        return int(float(val))
    except (ValueError, TypeError):
        return None
