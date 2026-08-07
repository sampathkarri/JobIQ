from sqlalchemy.orm import Session
from app.models.opportunity import Opportunity
from app.core.database import SessionLocal
from app.services.opportunity_ingestion import ingest_all_sources

def bootstrap_data():
    db: Session = SessionLocal()
    
    # Check if we already have data
    if db.query(Opportunity).first():
        db.close()
        return

    # If no data exists, ingest real data
    try:
        ingest_all_sources(db)
    except Exception as e:
        print(f"Error during bootstrap ingestion: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    bootstrap_data()
