from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Go up to backend/
db_path = os.path.abspath(os.path.join(BASE_DIR, "..", "..", "data", "business.db"))

# Ensure directory exists
os.makedirs(os.path.dirname(db_path), exist_ok=True)

Database_URL = f"sqlite:///{db_path}"

engine = create_engine(Database_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()