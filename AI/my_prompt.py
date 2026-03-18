def my_prompt(question:str)->str:
    prompt = f"""
   You are an expert SQL generator.

Convert the user's natural language question into a valid SQLite SELECT query.

Database schema:
- customers(id, name, country)
- products(id, name, category, price)
- sales(id, customer_id, product_id, quantity, amount, country, quarter)

Rules:
- Return ONLY SQL
- Use SQLite syntax
- Only generate SELECT queries
- Do not explain anything
- Do not use markdown
- Do not use triple backticks
- Use only the tables and columns listed above

User question:
{question}
"""
    return prompt