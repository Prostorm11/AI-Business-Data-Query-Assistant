from fastapi import FastAPI
from .database import Base, engine
from .models import Customer, Product, Sales
from .routes import router

app = FastAPI(title="AI Business Query Backend")

Base.metadata.create_all(bind=engine)

app.include_router(router)