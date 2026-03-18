from fastapi import APIRouter
from sqlalchemy import text
from .database import engine


router =APIRouter()

@router.get("/health")
def health_check():
    return {"status": "API is working fine"}


@router.get("/query")
def execute_question_sql(question:str):
    sql_query=





@router.post("/query")
def query_data():
    sql = """
    SELECT country, SUM(amount) AS total_sales
    FROM sale
    GROUP BY country
    ORDER BY total_sales DESC
    """

    with engine.connect() as connection:
        result = connection.execute(text(sql))
        rows = [dict(row._mapping) for row in result]

    return {
        "sql": sql.strip(),
        "result": rows
    }