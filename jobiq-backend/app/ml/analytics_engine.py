from collections import defaultdict
from typing import Any

def top_skills_demand(jobs: list[dict[str, Any]]) -> list[tuple[str, int]]:
    """Compute count of skills across all jobs, return sorted."""
    skill_counts = defaultdict(int)
    for job in jobs:
        for skill in job.get("skills", []):
            skill_counts[skill] += 1
    return sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)

def salary_by_role(jobs: list[dict[str, Any]]) -> dict[str, float]:
    """Compute average salary grouped by job_level/role."""
    role_totals = defaultdict(float)
    role_counts = defaultdict(int)
    for job in jobs:
        level = job.get("job_level")
        salary_max = job.get("salary_max")
        salary_min = job.get("salary_min")
        
        if level and (salary_max is not None or salary_min is not None):
            if salary_max is not None and salary_min is not None:
                avg_salary = (salary_max + salary_min) / 2
            else:
                avg_salary = salary_max if salary_max is not None else salary_min
            
            role_totals[level] += avg_salary
            role_counts[level] += 1
            
    return {role: role_totals[role] / role_counts[role] for role in role_totals}

def salary_by_location(jobs: list[dict[str, Any]]) -> dict[str, float]:
    """Compute average salary grouped by location."""
    loc_totals = defaultdict(float)
    loc_counts = defaultdict(int)
    for job in jobs:
        location = job.get("location")
        salary_max = job.get("salary_max")
        salary_min = job.get("salary_min")
        
        if location and (salary_max is not None or salary_min is not None):
            if salary_max is not None and salary_min is not None:
                avg_salary = (salary_max + salary_min) / 2
            else:
                avg_salary = salary_max if salary_max is not None else salary_min
                
            loc_totals[location] += avg_salary
            loc_counts[location] += 1
            
    return {loc: loc_totals[loc] / loc_counts[loc] for loc in loc_totals}

def job_posting_trends(jobs: list[dict[str, Any]]) -> dict[str, int]:
    """Count jobs by type over time."""
    trends = defaultdict(int)
    for job in jobs:
        job_type = job.get("type", "Unknown")
        trends[job_type] += 1
    return dict(trends)

def remote_ratio(jobs: list[dict[str, Any]]) -> float:
    """Percentage of remote jobs."""
    if not jobs:
        return 0.0
    remote_count = sum(1 for job in jobs if job.get("is_remote") or "remote" in job.get("location", "").lower())
    return (remote_count / len(jobs)) * 100
