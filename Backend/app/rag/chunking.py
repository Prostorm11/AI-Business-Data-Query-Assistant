import tiktoken
import nltk
from typing import List, Dict

from app.rag.config import CHUNK_SIZE

try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")

encoding = tiktoken.get_encoding("cl100k_base")


def chunk_text(text: str, chunk_size: int=CHUNK_SIZE, use_sentences: bool = True, overlap: int = 30) -> List[dict]:
    text = text.strip()
    if not text:
        return []

    if use_sentences:
        sentences = nltk.sent_tokenize(text)
    else:
        sentences = [text]

    all_tokens = []
    sentence_map = []

    for i, sentence in enumerate(sentences):
        tokens = encoding.encode(sentence)
        all_tokens.extend(tokens)
        sentence_map.extend([i] * len(tokens))

    chunks = []
    start = 0
    total_tokens = len(all_tokens)

    while start < total_tokens:
        end = min(start + chunk_size, total_tokens)
        chunk_tokens = all_tokens[start:end]
        chunk_text_str = encoding.decode(chunk_tokens)

        chunks.append({
            "chunk": chunk_text_str,
            "start_token": start,
            "end_token": end,
        })

        start += chunk_size - overlap

    return chunks
