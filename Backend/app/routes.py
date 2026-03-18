from fastapi import APIRouter
from sqlalchemy import text
from .schemas import QueryRequest

from AI.llm_sql import generate_sql
from .database import engine


router =APIRouter()

@router.get("/health")
def health_check():
    return {"status": "API is working fine"}


@router.post("/query")
def execute_question_sql(request: QueryRequest):
    sql_query = generate_sql(request.question)

    with engine.connect() as connection:
        result = connection.execute(text(sql_query))
        rows = [dict(row._mapping) for row in result]

    return {
        "sql": sql_query.strip(),
        "result": rows
    }



