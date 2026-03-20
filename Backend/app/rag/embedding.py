from sentence_transformers import SentenceTransformer
from typing import List, Dict

MODEL_NAME = "all-MiniLM-L6-v2"
model = SentenceTransformer(MODEL_NAME)


def embed_chunks(chunks: List[Dict]) -> List[Dict]:
    if not chunks:
        return []

    chunk_texts = [chunk["chunk"] for chunk in chunks]

    chunk_embeddings = model.encode(
        chunk_texts,
        batch_size=32,
        show_progress_bar=True
    )

    embedded_chunks = []
    for chunk, emb in zip(chunks, chunk_embeddings):
        embedded_chunks.append({
            "chunk": chunk["chunk"],
            "start_token": chunk["start_token"],
            "end_token": chunk["end_token"],
            "embedding": emb.tolist()
        })

    return embedded_chunks