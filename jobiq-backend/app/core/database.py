import re
from collections.abc import Generator
from urllib.parse import quote_plus, unquote

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.core.config import get_settings

settings = get_settings()

db_url = settings.database_url

# Normalize legacy postgres:// scheme to postgresql://
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

# Safely handle passwords containing unencoded '@' or special characters
pattern = r'^(postgresql(?:\+[a-zA-Z0-9]+)?:\/\/)([^:]+):(.+)@([^@:\/\?]+)(:\d+)?(\/[^\?]+)?(\?.+)?$'
match = re.match(pattern, db_url)
if match:
    scheme, user, pwd, host, port, dbname, query_params = match.groups()
    port_str = port if port else ""
    dbname_str = dbname if dbname else "/postgres"
    query_str = query_params if query_params else ""
    pwd_quoted = quote_plus(unquote(pwd))
    db_url = f"{scheme}{user}:{pwd_quoted}@{host}{port_str}{dbname_str}{query_str}"

# Create PostgreSQL SQLAlchemy engine
engine = create_engine(db_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
