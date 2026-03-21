import os
import requests
from .my_prompt import my_prompt

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_URL = f"{OLLAMA_BASE_URL}/api/generate"
MODEL_NAME = "qwen2.5:1.5b"

def generate_sql(question: str) -> str:
    prompt = my_prompt(question)
   
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

    sql = response.json()["response"].strip()

    # basic cleanup in case the model adds markdown
    sql = sql.replace("```sql", "").replace("```", "").strip()
    
    return sql