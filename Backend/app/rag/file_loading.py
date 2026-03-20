# file_loading.py
import os
from typing import List
from pathlib import Path
from pypdf import PdfReader  # for PDF support

def load_text_file(file_path: str) -> str:
    """
    Load a plain text file and return its contents as a string.
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def load_pdf_file(file_path: str) -> str:
    """
    Load a PDF file and return its text content as a single string.
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    reader = PdfReader(file_path)
    text = []
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text.append(page_text)
    return "\n".join(text)


def load_files(file_paths: List[str]) -> str:
    """
    Load multiple text or PDF files and combine into one string.
    """
    all_text = []
    for path in file_paths:
        ext = Path(path).suffix.lower()
        if ext == ".txt":
            all_text.append(load_text_file(path))
        elif ext == ".pdf":
            all_text.append(load_pdf_file(path))
        else:
            print(f"Skipping unsupported file type: {path}")
    return "\n".join(all_text)