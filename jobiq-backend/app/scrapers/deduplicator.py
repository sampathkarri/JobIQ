from difflib import SequenceMatcher
from sqlalchemy.orm import Session
from app.models.opportunity import Opportunity

def similarity(a: str, b: str) -> float:
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()

def is_duplicate(opp1_title: str, opp1_company: str, opp2_title: str, opp2_company: str, threshold: float = 0.85) -> bool:
    title_sim = similarity(opp1_title, opp2_title)
    company_sim = similarity(opp1_company, opp2_company)
    combined = (title_sim * 0.6) + (company_sim * 0.4)
    return combined >= threshold

def deduplicate_opportunities(db: Session) -> int:
    """Remove duplicate opportunities. Returns count of removed duplicates."""
    opps = db.query(Opportunity).filter(Opportunity.is_active == True).all()
    duplicates_removed = 0
    seen = []
    
    for opp in opps:
        is_dup = False
        for seen_opp in seen:
            if is_duplicate(opp.title, opp.company, seen_opp.title, seen_opp.company):
                opp.is_active = False  # soft-delete duplicate
                duplicates_removed += 1
                is_dup = True
                break
        if not is_dup:
            seen.append(opp)
    
    db.commit()
    return duplicates_removed
