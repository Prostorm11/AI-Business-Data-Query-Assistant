import type {
  UploadedDocumentResponse,
  DocumentListResponse,
} from "../types/documents"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"

export async function uploadDocument(file: File): Promise<UploadedDocumentResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/upload-document`, {
    method: "POST",
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.detail || data?.error || "Upload failed")
  }

  return data
}

export async function fetchDocuments(): Promise<DocumentListResponse> {
  const response = await fetch(`${API_BASE_URL}/documents`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.detail || "Failed to fetch documents")
  }

  return data
}