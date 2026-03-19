import tiktoken
import nltk
from typing import List, Dict
    

nltk.download('punkt', quiet=True)

encoding=tiktoken.get_encoding("cl100k_base")

def chunk_text(text:str, chunk_size:int, use_sentences:bool=True, overlap:int=50)->List[dict]:
    text=text.strip()
    if not text:
        return[]
    
    
    
