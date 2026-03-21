export interface UploadedDocumentResponse {
  message: string
  file_name: string
  path: string
  index_result?: Record<string, unknown>
}

export interface DocumentListItem {
  name: string
  type: string
  size: number
}

export interface DocumentListResponse {
  documents: DocumentListItem[]
}