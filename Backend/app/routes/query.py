from fastapi import APIRouter
from sqlalchemy import text

from app.models.schemas import QueryRequest
from app.services.llm_sql import generate_sql
from app.services.llm_rag import generate_rag_answer
from app.db.database import engine

router = APIRouter()


@router.get("/health")
def health_check():
    return {"status": "API is working fine"}


@router.post("/query")
def execute_question_sql(request: QueryRequest):
    try:
        if request.question.strip().lower() in ["", "string"]:
            return {"error": "Please enter a real business question"}

        sql_query = generate_sql(request.question)

        if sql_query.strip() == "INVALID_QUERY":
            return {"error": "Question not related to available data"}

        if not sql_query.strip().lower().startswith("select"):
            return {"error": "Only SELECT queries are allowed"}

        with engine.connect() as connection:
            result = connection.execute(text(sql_query))
            rows = [dict(row._mapping) for row in result]

        return {
            "question": request.question,
            "sql": sql_query.strip(),
            "result": rows
        }

    except Exception as e:
        return {
            "error": str(e),
            "sql": sql_query if "sql_query" in locals() else None
        }


@router.post("/rag-query")
def execute_rag_query(request: QueryRequest):
    try:
        if request.question.strip().lower() in ["", "string"]:
            return {"error": "Please enter a real question"}

        return generate_rag_answer(request.question)

    except Exception as e:
        return {"error": str(e)}