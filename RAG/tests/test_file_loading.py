# tests/test_file_loading.py
from file_loading import load_text_file

def test_load_text():
    text = load_text_file("sample.txt")
    assert isinstance(text, str)
    assert len(text) > 0
    print("Loaded text:", text[:100])