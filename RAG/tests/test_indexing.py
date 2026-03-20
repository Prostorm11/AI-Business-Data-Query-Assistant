# tests/test_indexing.py
from RAG.indexing import index_to_chroma

def test_indexing():
    embedded_chunks = [
        {
            "chunk": "AI is amazing",
            "start_token": 0,
            "end_token": 5,
            "embedding": [0.1] * 384
        },
        {
            "chunk": "RAG systems are powerful",
            "start_token": 5,
            "end_token": 10,
            "embedding": [0.2] * 384
        }
    ]

    result = index_to_chroma(embedded_chunks, file_name="test_doc")
    assert result["status"] == "indexed"

    print(result)