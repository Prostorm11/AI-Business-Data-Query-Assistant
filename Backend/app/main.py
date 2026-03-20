from fastapi import FastAPI
from app.db.database import Base, engine
from app.models.models import Customer, Product, Sales
from app.routes.query import router

app = FastAPI(title="AI Business Query Backend")

Base.metadata.create_all(bind=engine)

app.include_router(router)