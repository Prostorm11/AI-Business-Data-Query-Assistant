import os
import chromadb
from sentence_transformers import SentenceTransformer

CHROMA_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "vectorstore", "chroma_db")
)
COLLECTION_NAME = "business_docs"

_client = None
_collection = None

def get_collection():
    global _client, _collection

    if _client is None:
        _client = chromadb.PersistentClient(path=CHROMA_PATH)

    if _collection is None:
        _collection = _client.get_or_create_collection(name=COLLECTION_NAME)

    return _collection


MODEL_NAME = "all-MiniLM-L6-v2"
_model = None

def get_embedding_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)

    return _model
CHUNK_SIZE = 200
CHUNK_OVERLAP = 20  