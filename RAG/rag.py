from typing import List, Tuple

from RAG.file_loading import load_text_file, load_pdf_file, load_files
from RAG.chunking import chunk_text
from RAG.embedding import embed_chunks
from RAG.indexing import index_to_chroma
from RAG.retrieval import retrieve_documents


# Part 1: Indexing documents

def index_documents(file_paths: List[str], file_name_prefix: str = "doc") -> dict:
    """
    Index one or more files into Chroma.
    """
    all_embedded_chunks = []

    for i, file_path in enumerate(file_paths):
        # Load file
        if file_path.endswith(".txt"):
            text = load_text_file(file_path)
        elif file_path.endswith(".pdf"):
            text = load_pdf_file(file_path)
        else:
            text = load_text_file(file_path)  # fallback
        if not text.strip():
            continue

        # Chunk text
        chunks = chunk_text(text)
        if not chunks:
            continue

        # Embed chunks
        embedded_chunks = embed_chunks(chunks)

        # Append file-specific prefix for IDs
        for c in embedded_chunks:
            c["file_name"] = f"{file_name_prefix}_{i}"

        all_embedded_chunks.extend(embedded_chunks)

    
    if all_embedded_chunks:
        result = index_to_chroma(all_embedded_chunks, file_name=file_name_prefix)
        return result
    return {"status": "no content to index"}


# ----------------------------
# Part 2: Querying / Retrieval
# ----------------------------
def answer_question(question: str, n_results: int = 3) -> Tuple[str, List[dict]]:
    """
    Given a question, retrieve top-k chunks and assemble a prompt for the LLM.
    """
    # Retrieve chunks from Chroma
    retrieved = retrieve_documents(question, n_results=n_results)

    # Build context for LLM
    context = "\n".join([r["chunk"] for r in retrieved])
    prompt = f"Answer the question based on the following context:\n\nContext:\n{context}\n\nQuestion:\n{question}"

    return prompt, retrieved


# ----------------------------
# Example usage
# ----------------------------
if __name__ == "__main__":
    # 1️ Indexing example
    files_to_index = ["sample.txt"]  # add more file paths here
    index_result = index_documents(files_to_index, file_name_prefix="sample_doc")
    print("Indexing result:", index_result)

    #  Retrieval example
    question = "What is AI?"
    prompt, retrieved_chunks = answer_question(question)
    print("\nPrompt for LLM:\n", prompt)
    print("\nRetrieved chunks:")
    for r in retrieved_chunks:
        print(r)