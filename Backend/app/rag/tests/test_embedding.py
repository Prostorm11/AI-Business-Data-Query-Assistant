# tests/test_embedding.py
from app.rag.embedding import embed_chunks

def test_embedding():
    chunks = [
        {"chunk": "AI is amazing", "start_token": 0, "end_token": 5},
        {"chunk": "RAG systems are powerful", "start_token": 5, "end_token": 10}
    ]

    embedded = embed_chunks(chunks)

    assert len(embedded) == len(chunks)

    for e in embedded:
        assert "embedding" in e
        assert isinstance(e["embedding"], list)
        assert len(e["embedding"]) > 0

    print("Embedding sample length:", len(embedded[0]["embedding"]))