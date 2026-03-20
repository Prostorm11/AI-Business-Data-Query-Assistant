def build_rag_prompt(question: str, context: str) -> str:
    return f"""
You are a business documentation assistant.

Answer the user's question using ONLY the context provided below.

Rules:
- Answer clearly and briefly
- Use only the provided context
- If the answer is not in the context, say exactly:
I could not find that in the project documentation.
- Do not make up information

Context:
{context}

User question:
{question}
"""