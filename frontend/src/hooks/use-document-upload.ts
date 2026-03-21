import { useEffect, useState } from "react"
import { fetchDocuments, uploadDocument } from "../lib/api/documents"
import type { DocumentListItem } from "../lib/types/documents"

export function useDocumentUpload() {
  const [documents, setDocuments] = useState<DocumentListItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDocuments = async () => {
    try {
      setLoadingDocuments(true)
      setError(null)
      const data = await fetchDocuments()
      setDocuments(data.documents)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load documents")
    } finally {
      setLoadingDocuments(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  const upload = async (file: File) => {
    try {
      setUploading(true)
      setError(null)
      await uploadDocument(file)
      await loadDocuments()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      throw err
    } finally {
      setUploading(false)
    }
  }

  return {
    documents,
    uploading,
    loadingDocuments,
    error,
    upload,
    loadDocuments,
  }
}