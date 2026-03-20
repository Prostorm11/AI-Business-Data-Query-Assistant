from typing import List, Dict
from app.rag.config import get_collection, get_embedding_model


model=get_embedding_model()
def retrieve_documents(question: str, n_results: int = 3) -> List[Dict]:
    """
    Given a question, return top relevant chunks with metadata.
    """
    collection = get_collection()

    # Embed the query manually (IMPORTANT for consistency)
    query_embedding = model.encode(question).tolist()

    # Query Chroma using embedding
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    #  Combine results
    retrieved = []
    for doc, meta, dist in zip(documents, metadatas, distances):
        retrieved.append({
            "chunk": doc,
            "metadata": meta,
            "score": dist  # lower = more similar (cosine distance)
        })

    return retrieved