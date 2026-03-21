from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException
from sqlalchemy import text

from app.models.schemas import QueryRequest
from app.services.llm_sql import generate_sql
from app.services.llm_rag import generate_rag_answer
from app.db.database import engine
from app.rag.rag import DOCUMENTS_DIR, build_saved_filename, index_single_document

router = APIRouter()

ALLOWED_EXTENSIONS = {".pdf", ".txt"}


@router.get("/health")
def health_check():
    return {"status": "API is working fine"}


@router.get("/documents")
def list_documents():
    files = []
    for file_path in DOCUMENTS_DIR.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in ALLOWED_EXTENSIONS:
            files.append({
                "name": file_path.name,
                "type": file_path.suffix.lower().replace(".", ""),
                "size": file_path.stat().st_size
            })

    return {"documents": sorted(files, key=lambda x: x["name"].lower())}


@router.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are allowed")

    saved_name = build_saved_filename(file.filename)
    saved_path = DOCUMENTS_DIR / saved_name

    try:
        content = await file.read()
        saved_path.write_bytes(content)

        index_result = index_single_document(str(saved_path), file_name_prefix=saved_path.stem)

        return {
            "message": "Document uploaded and indexed successfully",
            "file_name": saved_name,
            "path": str(saved_path),
            "index_result": index_result,
        }

    except Exception as e:
        if saved_path.exists():
            saved_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail=str(e))


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