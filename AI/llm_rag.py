import requests
from AI.rag_prompt import build_rag_prompt

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:1.5b"   


def generate_rag_answer(question: str, context_chunks: list[str]) -> str:
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
    return answer