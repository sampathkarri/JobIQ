import json
from celery import shared_task
from app.ml.matcher import score_opportunity

# Assumed database imports - update with your actual app structure
from app.db.database import get_db
# from app.models.user import User
# from app.models.opportunity import Opportunity
# from app.models.job_match import JobMatch

@shared_task
def run_job_matcher():
    """
    Fetches all users with resumes, fetches all active opportunities,
    runs score_opportunity() for each pair, and stores results in job_matches table.
    Uses json.dumps() for array fields.
    """
    # Assuming SQLAlchemy is being used. Here is a generic ORM structure:
    # db = next(get_db())
    # try:
    #     users = db.query(User).filter(User.resume_text.isnot(None)).all()
    #     jobs = db.query(Opportunity).filter(Opportunity.is_active == True).all()
    #     
    #     for user in users:
    #         for job in jobs:
    #             # Parse stored stringified arrays or use lists directly
    #             resume_skills = json.loads(user.skills) if isinstance(user.skills, str) else (user.skills or [])
    #             job_skills = json.loads(job.skills) if isinstance(job.skills, str) else (job.skills or [])
    #             preferred_locs = json.loads(user.preferred_locations) if isinstance(user.preferred_locations, str) else (user.preferred_locations or [])
    #             
    #             match_result = score_opportunity(
    #                 resume_text=user.resume_text,
    #                 resume_skills=resume_skills,
    #                 job_description=job.description,
    #                 job_skills=job.skills,
    #                 user_salary_min=user.salary_min,
    #                 user_salary_max=user.salary_max,
    #                 job_salary_min=job.salary_min,
    #                 job_salary_max=job.salary_max,
    #                 user_preferred_locations=preferred_locs,
    #                 job_location=job.location
    #             )
    #             
    #             existing_match = db.query(JobMatch).filter_by(user_id=user.id, job_id=job.id).first()
    #             
    #             matching_skills_str = json.dumps(match_result.matching_skills)
    #             missing_skills_str = json.dumps(match_result.missing_skills)
    #             
    #             if existing_match:
    #                 existing_match.score = match_result.score
    #                 existing_match.matching_skills = matching_skills_str
    #                 existing_match.missing_skills = missing_skills_str
    #                 existing_match.match_reason = match_result.match_reason
    #             else:
    #                 new_match = JobMatch(
    #                     user_id=user.id,
    #                     job_id=job.id,
    #                     score=match_result.score,
    #                     matching_skills=matching_skills_str,
    #                     missing_skills=missing_skills_str,
    #                     match_reason=match_result.match_reason
    #                 )
    #                 db.add(new_match)
    #     db.commit()
    # except Exception as e:
    #     db.rollback()
    #     raise e
    # finally:
    #     db.close()
    pass
