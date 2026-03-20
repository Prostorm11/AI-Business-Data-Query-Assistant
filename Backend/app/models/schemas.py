from pydantic import BaseModel
from typing import Any


class QueryRequest(BaseModel):
    question: str


class QueryResponse(BaseModel):
    sql: str
    result: list[dict[str, Any]]