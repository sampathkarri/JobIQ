import json
from sqlalchemy.orm import Session
from app.models.opportunity import Opportunity
from app.core.database import SessionLocal

def bootstrap_data():
    db: Session = SessionLocal()
    
    # Check if we already have data
    if db.query(Opportunity).first():
        db.close()
        return

    opportunities = [
        # Full-time jobs (4)
        Opportunity(
            type="job",
            title="Senior Software Engineer",
            company="Tech Innovators Inc.",
            location="San Francisco, CA",
            salary_min=140000,
            salary_max=180000,
            description="We are looking for a Senior Software Engineer to lead our core product development.",
            required_skills=json.dumps(["Python", "FastAPI", "React", "PostgreSQL"]),
            job_level="Senior",
            employment_type="Full-time",
            remote=False
        ),
        Opportunity(
            type="job",
            title="Backend Developer",
            company="CloudScale",
            location="Remote",
            salary_min=110000,
            salary_max=140000,
            description="Join our remote team to build scalable backend services.",
            required_skills=json.dumps(["Go", "Docker", "Kubernetes", "AWS"]),
            job_level="Mid-Level",
            employment_type="Full-time",
            remote=True
        ),
        Opportunity(
            type="job",
            title="Machine Learning Engineer",
            company="AI Solutions",
            location="New York, NY",
            salary_min=130000,
            salary_max=170000,
            description="Apply cutting-edge ML models to solve real-world problems.",
            required_skills=json.dumps(["Python", "PyTorch", "Scikit-Learn", "SQL"]),
            job_level="Mid-Level",
            employment_type="Full-time",
            remote=False
        ),
        Opportunity(
            type="job",
            title="Junior Frontend Engineer",
            company="WebWizards",
            location="Austin, TX",
            salary_min=75000,
            salary_max=95000,
            description="Start your career by building beautiful user interfaces.",
            required_skills=json.dumps(["HTML", "CSS", "JavaScript", "React"]),
            job_level="Junior",
            employment_type="Full-time",
            remote=False
        ),

        # Internships (3)
        Opportunity(
            type="internship",
            title="Software Engineering Intern",
            company="Global Tech",
            location="Seattle, WA",
            stipend=6000,
            duration_weeks=12,
            description="Learn and grow with our experienced engineering teams.",
            required_skills=json.dumps(["Java", "Data Structures", "Algorithms"]),
            job_level="Intern",
            employment_type="Internship",
            remote=False
        ),
        Opportunity(
            type="internship",
            title="Data Science Intern",
            company="DataDriven",
            location="Boston, MA",
            stipend=5000,
            duration_weeks=10,
            description="Assist in analyzing large datasets to derive business insights.",
            required_skills=json.dumps(["Python", "Pandas", "SQL"]),
            job_level="Intern",
            employment_type="Internship",
            remote=False
        ),
        Opportunity(
            type="internship",
            title="Product Management Intern",
            company="NextGen Startup",
            location="Remote",
            stipend=4000,
            duration_weeks=8,
            description="Work closely with PMs to design and launch new features.",
            required_skills=json.dumps(["Agile", "Jira", "Communication"]),
            job_level="Intern",
            employment_type="Internship",
            remote=True
        ),

        # Hackathons (2)
        Opportunity(
            type="hackathon",
            title="Global AI Hackathon",
            company="AI Foundation",
            location="Remote",
            prize_pool=50000,
            duration_weeks=1,
            description="Build innovative AI solutions over a weekend.",
            required_skills=json.dumps(["Python", "Machine Learning", "Creativity"]),
            job_level="All Levels",
            employment_type="Event",
            remote=True
        ),
        Opportunity(
            type="hackathon",
            title="FinTech Innovation Challenge",
            company="BankCorp",
            location="Chicago, IL",
            prize_pool=25000,
            duration_weeks=2,
            description="Create the future of decentralized finance.",
            required_skills=json.dumps(["Blockchain", "Solidity", "Web3"]),
            job_level="All Levels",
            employment_type="Event",
            remote=False
        ),

        # Remote Jobs (2) (Adding to previous remote)
        Opportunity(
            type="job",
            title="DevOps Engineer",
            company="RemoteFirst",
            location="Remote",
            salary_min=120000,
            salary_max=160000,
            description="Manage our CI/CD pipelines and infrastructure.",
            required_skills=json.dumps(["Linux", "Jenkins", "Terraform", "AWS"]),
            job_level="Mid-Level",
            employment_type="Full-time",
            remote=True
        ),
        Opportunity(
            type="job",
            title="Technical Writer",
            company="DocuSys",
            location="Remote",
            salary_min=80000,
            salary_max=110000,
            description="Create clear and comprehensive documentation for our APIs.",
            required_skills=json.dumps(["Markdown", "API Documentation", "Git"]),
            job_level="Mid-Level",
            employment_type="Full-time",
            remote=True
        ),

        # Contract Position (1)
        Opportunity(
            type="job",
            title="Freelance UX Designer",
            company="CreativeAgency",
            location="Remote",
            salary_min=90000,
            salary_max=120000,
            description="Redesign our client's e-commerce platform.",
            required_skills=json.dumps(["Figma", "User Research", "Wireframing"]),
            job_level="Senior",
            employment_type="Contract",
            remote=True
        ),
    ]

    for opp in opportunities:
        db.add(opp)
    
    db.commit()
    db.close()

if __name__ == "__main__":
    bootstrap_data()
