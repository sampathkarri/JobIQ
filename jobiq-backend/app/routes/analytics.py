import json
from collections import Counter
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.dependencies import get_current_active_user
from app.models import Opportunity, Application, JobMatch, SavedOpportunity, User

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/market")
def get_market_analytics(db: Session = Depends(get_db)):
    active_opportunities = db.query(Opportunity).filter(Opportunity.is_active == True).all()
    
    total_opportunities = len(active_opportunities)
    
    skills_counter = Counter()
    salary_mins = []
    salary_maxs = []
    type_counter = Counter()
    remote_count = 0
    company_counter = Counter()
    
    for opp in active_opportunities:
        if opp.required_skills:
            try:
                skills = json.loads(opp.required_skills)
                if isinstance(skills, list):
                    skills_counter.update(skills)
            except:
                pass
                
        if opp.salary_min is not None:
            salary_mins.append(opp.salary_min)
        if opp.salary_max is not None:
            salary_maxs.append(opp.salary_max)
            
        if opp.employment_type:
            type_counter[opp.employment_type] += 1
            
        if opp.remote:
            remote_count += 1
            
        if opp.company:
            company_counter[opp.company] += 1
            
    top_skills = [{"skill": k, "count": v} for k, v in skills_counter.most_common(20)]
    type_breakdown = [{"type": k, "count": v} for k, v in type_counter.items()]
    top_companies = [{"company": k, "count": v} for k, v in company_counter.most_common(10)]
    
    remote_ratio = (remote_count / total_opportunities) if total_opportunities > 0 else 0.0
    
    salary_stats = {
        "avg_min": sum(salary_mins) / len(salary_mins) if salary_mins else 0.0,
        "avg_max": sum(salary_maxs) / len(salary_maxs) if salary_maxs else 0.0,
        "median_min": sorted(salary_mins)[len(salary_mins) // 2] if salary_mins else 0.0,
        "median_max": sorted(salary_maxs)[len(salary_maxs) // 2] if salary_maxs else 0.0
    }
    
    return {
        "total_opportunities": total_opportunities,
        "top_skills": top_skills,
        "salary_stats": salary_stats,
        "type_breakdown": type_breakdown,
        "remote_ratio": remote_ratio,
        "top_companies": top_companies
    }

@router.get("/personal")
def get_personal_analytics(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    applications = db.query(Application).filter(Application.user_id == current_user.id).all()
    total_applications = len(applications)
    
    status_counter = Counter(app.status for app in applications)
    status_breakdown = [{"status": k, "count": v} for k, v in status_counter.items()]
    
    matches_agg = db.query(
        func.count(JobMatch.id).label('total'),
        func.avg(JobMatch.match_score).label('avg_score')
    ).filter(JobMatch.user_id == current_user.id).first()
    
    total_matches = matches_agg.total or 0
    avg_match_score = matches_agg.avg_score or 0.0
    
    total_saved = db.query(SavedOpportunity).filter(SavedOpportunity.user_id == current_user.id).count()
    
    funnel = {
        "interested": total_saved,
        "applied": status_counter.get("applied", 0),
        "interviewing": status_counter.get("interviewing", 0),
        "offered": status_counter.get("offered", 0),
        "rejected": status_counter.get("rejected", 0),
        "withdrawn": status_counter.get("withdrawn", 0)
    }
    
    return {
        "total_applications": total_applications,
        "status_breakdown": status_breakdown,
        "total_matches": total_matches,
        "avg_match_score": avg_match_score,
        "total_saved": total_saved,
        "funnel": funnel
    }
