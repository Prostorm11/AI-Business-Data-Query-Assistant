import requests

from my_prompt import my_prompt

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:1.5b"

def generate_sql(question:str)->str:
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


if __name__ == "__main__":
    question = "Which country generated the most sales?"
    sql = generate_sql(question)
    print(sql)