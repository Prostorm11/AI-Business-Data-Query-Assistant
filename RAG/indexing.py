import os
import chromadb
from chromadb.config import Settings

COLLECTION_NAME = "business_docs"
CHROMA_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "vectorstore", "chroma_db")
)

def get_collection():
    client = chromadb.PersistentClient(path=CHROMA_PATH)
    collection = client.get_or_create_collection(name=COLLECTION_NAME)
    return collection


def index_to_chroma(embedded_chunks,file_name:str):
    collection=get_collection()
    
    ids=[f"{file_name}_chunk_{i}" for i in range(len(embedded_chunks))]
    documents=[c["chunk"] for c in embedded_chunks]    
    metadatas=[{"start_token": c["start_token"], "end_token": c["end_token"]} for c in embedded_chunks]
    embeddings=[c["embedding"] for c in embedded_chunks]
    
    # remove existing entries for the same file
    existing=collection.get()
    existing_ids=existing.get("ids", [])
    ids_to_delete=[id_ for id_ in existing_ids if id_.startswith(file_name)]
    
    if ids_to_delete:
        collection.delete(ids=ids_to_delete)

    # Add new chunks
    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
        embeddings=embeddings
    )

    return {"status": "indexed", "chunks_added": len(embedded_chunks)}
    
    