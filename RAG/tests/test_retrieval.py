# tests/test_retrieval.py
from RAG.retrieval import retrieve_documents

def test_retrieval():
    results = retrieve_documents("What is AI?", n_results=2)

    assert isinstance(results, list)

    if results:
        for r in results:
            assert "chunk" in r
            assert "metadata" in r
            assert "score" in r

    print("Results:", results)