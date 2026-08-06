import json
from dataclasses import dataclass, field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.ml.skill_extractor import extract_skills

@dataclass
class MatchResult:
    score: int  # 0-100
    matching_skills: list[str] = field(default_factory=list)
    missing_skills: list[str] = field(default_factory=list)
    match_reason: str = ""

def score_opportunity(
    resume_text: str,
    resume_skills: list[str],
    job_description: str,
    job_skills: list[str],
    user_salary_min: int | None = None,
    user_salary_max: int | None = None,
    job_salary_min: int | None = None,
    job_salary_max: int | None = None,
    user_preferred_locations: list[str] | None = None,
    job_location: str | None = None,
) -> MatchResult:
    """Score how well a job matches a user's resume and preferences."""
    
    # 1. Skills overlap (40% weight)
    resume_skills_set = set(s.lower() for s in resume_skills)
    job_skills_set = set(s.lower() for s in job_skills)
    
    matching = [s for s in job_skills if s.lower() in resume_skills_set]
    missing = [s for s in job_skills if s.lower() not in resume_skills_set]
    
    if job_skills_set:
        skills_score = len(matching) / len(job_skills_set) * 100
    else:
        skills_score = 50  # neutral if no skills listed
    
    # 2. Text similarity via TF-IDF (30% weight)
    text_score = 0
    if resume_text and job_description:
        try:
            vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
            tfidf_matrix = vectorizer.fit_transform([resume_text, job_description])
            sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            text_score = sim * 100
        except:
            text_score = 0
    
    # 3. Salary match (15% weight)
    salary_score = 50  # neutral default
    if user_salary_min and job_salary_max:
        if job_salary_max >= user_salary_min:
            salary_score = 100
        else:
            salary_score = max(0, 100 - ((user_salary_min - job_salary_max) / user_salary_min * 100))
    
    # 4. Location match (15% weight)
    location_score = 50  # neutral default
    if user_preferred_locations and job_location:
        job_loc_lower = job_location.lower()
        for pref in user_preferred_locations:
            if pref.lower() in job_loc_lower or job_loc_lower in pref.lower():
                location_score = 100
                break
    
    # Weighted final score
    final_score = int(
        skills_score * 0.40 +
        text_score * 0.30 +
        salary_score * 0.15 +
        location_score * 0.15
    )
    final_score = max(0, min(100, final_score))
    
    # Build explanation
    reasons = []
    if matching:
        reasons.append(f"Skills match: {', '.join(matching[:5])}")
    if missing:
        reasons.append(f"Missing: {', '.join(missing[:3])}")
    if salary_score >= 80:
        reasons.append("Salary matches your range")
    if location_score >= 80:
        reasons.append("Location matches preferences")
    
    return MatchResult(
        score=final_score,
        matching_skills=matching,
        missing_skills=missing,
        match_reason=". ".join(reasons) if reasons else "General match based on profile"
    )
