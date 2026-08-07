from __future__ import annotations

from typing import Optional


def generate_application_email(
    job_title: str,
    company: str,
    applicant_name: str,
    skills: list[str],
    email_type: str = "cover_letter",  # 'cover_letter' | 'follow_up' | 'interview_thank_you'
    custom_notes: Optional[str] = None,
) -> dict:
    """Generate professional AI application email templates."""

    skills_str = ", ".join(skills[:5]) if skills else "software engineering and modern web development"

    if email_type == "follow_up":
        subject = f"Following up on my application for {job_title} at {company}"
        body = (
            f"Dear Hiring Team at {company},\n\n"
            f"I hope this message finds you well.\n\n"
            f"I recently submitted my application for the {job_title} position. Given my expertise in {skills_str}, "
            f"I am very enthusiastic about the opportunity to contribute to {company}.\n\n"
            f"I wanted to briefly follow up and confirm if there are any additional details or work samples "
            f"I can provide to support my application.\n\n"
            f"Thank you for your time and consideration. I look forward to hearing from you!\n\n"
            f"Best regards,\n"
            f"{applicant_name}"
        )
    elif email_type == "interview_thank_you":
        subject = f"Thank you - {job_title} Interview"
        body = (
            f"Dear Hiring Manager,\n\n"
            f"Thank you for taking the time to speak with me regarding the {job_title} position at {company}.\n\n"
            f"I really enjoyed learning more about your engineering team's vision and initiatives. "
            f"Our discussion further confirmed my excitement about bringing my experience in {skills_str} to the team.\n\n"
            f"Please let me know if you need any further information from my end.\n\n"
            f"Warm regards,\n"
            f"{applicant_name}"
        )
    else:  # cover_letter
        subject = f"Application for {job_title} - {applicant_name}"
        body = (
            f"Dear Hiring Team at {company},\n\n"
            f"I am writing to express my strong interest in the {job_title} position at {company}. "
            f"With a proven background in {skills_str}, I am confident in my ability to add immediate value to your team.\n\n"
            f"{f'Note: {custom_notes}' if custom_notes else 'Throughout my career, I have focused on delivering scalable, clean, and high-impact software solutions.'}\n\n"
            f"I would welcome the opportunity to discuss how my technical skills and passion align with {company}'s goals.\n\n"
            f"Sincerely,\n"
            f"{applicant_name}"
        )

    return {
        "subject": subject,
        "body": body,
        "email_type": email_type,
    }
