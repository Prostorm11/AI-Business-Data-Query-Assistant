# tests/test_chunking.py
from app.rag.chunking import chunk_text

def test_chunking():
    text = "This is a simple test text for chunking. " * 10
    chunks = chunk_text(text, chunk_size=50, overlap=10)

    assert isinstance(chunks, list)
    assert len(chunks) > 0

    for c in chunks:
        assert "chunk" in c
        assert "start_token" in c
        assert "end_token" in c

    print("Chunks:", chunks[:2])