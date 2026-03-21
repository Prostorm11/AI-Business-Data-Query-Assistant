from typing import List
from pathlib import Path
import uuid

from app.rag.file_loading import load_text_file, load_pdf_file
from app.rag.chunking import chunk_text
from app.rag.embedding import embed_chunks
from app.rag.indexing import index_to_chroma
from app.rag.retrieval import retrieve_documents

BASE_DIR = Path(__file__).resolve().parents[2]   # backend/
DOCUMENTS_DIR = BASE_DIR / "data" / "documents"
DOCUMENTS_DIR.mkdir(parents=True, exist_ok=True)


def index_documents(file_paths: List[str], file_name_prefix: str = "doc") -> dict:
    """
    Index one or more files into Chroma.
    """
    all_embedded_chunks = []

    for i, file_path in enumerate(file_paths):
        if file_path.endswith(".txt"):
            text = load_text_file(file_path)
        elif file_path.endswith(".pdf"):
            text = load_pdf_file(file_path)
        else:
            text = load_text_file(file_path)

        if not text.strip():
            continue

        chunks = chunk_text(text)
        if not chunks:
            continue

        embedded_chunks = embed_chunks(chunks)

        for c in embedded_chunks:
            c["file_name"] = f"{file_name_prefix}_{i}"

        all_embedded_chunks.extend(embedded_chunks)

    if all_embedded_chunks:
        return index_to_chroma(all_embedded_chunks, file_name=file_name_prefix)

    return {"status": "no content to index"}


def index_single_document(file_path: str, file_name_prefix: str | None = None) -> dict:
    """
    Index a single saved file into Chroma.
    """
    path = Path(file_path)
    prefix = file_name_prefix or path.stem
    return index_documents([str(path)], file_name_prefix=prefix)


def retrieve_context(question: str, n_results: int = 3) -> List[dict]:
    """
    Retrieve top-k relevant chunks from Chroma.
    """
    return retrieve_documents(question, n_results=n_results)


def build_saved_filename(original_name: str) -> str:
    """
    Avoid collisions by appending a short unique suffix.
    """
    path = Path(original_name)
    safe_stem = path.stem.replace(" ", "_")
    suffix = uuid.uuid4().hex[:8]
    return f"{safe_stem}_{suffix}{path.suffix}"


if __name__ == "__main__":
    files_to_index = ["sample.txt"]
    index_result = index_documents(files_to_index, file_name_prefix="sample_doc")
    print("Indexing result:", index_result)

    question = "What is AI?"
    retrieved_chunks = retrieve_context(question)

    print("\nRetrieved chunks:")
    for r in retrieved_chunks:
        print(r)