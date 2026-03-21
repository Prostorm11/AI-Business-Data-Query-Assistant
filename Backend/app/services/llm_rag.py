import os
import requests
from app.services.rag_prompt import build_rag_prompt
from app.rag.rag import retrieve_context

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_URL = f"{OLLAMA_BASE_URL}/api/generate"
MODEL_NAME = "qwen2.5:1.5b"


def generate_rag_answer(question: str) -> dict:
    retrieved_docs = retrieve_context(question, n_results=3)
    context_chunks = [doc["chunk"] for doc in retrieved_docs]

    if not context_chunks:
        return {
            "question": question,
            "answer": "I could not find that in the project documentation.",
            "sources": []
        }

    context = "\n\n".join(context_chunks)
    prompt = build_rag_prompt(question, context)

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        },
        timeout=60
    )

    response.raise_for_status()
    answer = response.json()["response"].strip()

    return {
        "question": question,
        "answer": answer,
        "sources": retrieved_docs
    }