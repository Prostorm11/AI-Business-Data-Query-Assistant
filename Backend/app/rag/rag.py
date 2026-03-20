from typing import List

from app.rag.file_loading import load_text_file, load_pdf_file
from app.rag.chunking import chunk_text
from app.rag.embedding import embed_chunks
from app.rag.indexing import index_to_chroma
from app.rag.retrieval import retrieve_documents


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


def retrieve_context(question: str, n_results: int = 3) -> List[dict]:
    """
    Retrieve top-k relevant chunks from Chroma.
    """
    retrieved = retrieve_documents(question, n_results=n_results)
    return retrieved


if __name__ == "__main__":
    files_to_index = ["sample.txt"]
    index_result = index_documents(files_to_index, file_name_prefix="sample_doc")
    print("Indexing result:", index_result)

    question = "What is AI?"
    retrieved_chunks = retrieve_context(question)

    print("\nRetrieved chunks:")
    for r in retrieved_chunks:
        print(r)