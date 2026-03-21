// Data Query Types
export interface DataQueryResult {
  summary: string
  sql: string
  data: Record<string, unknown>[]
  columns: string[]
}

// Document Assistant Types
export interface DocumentSource {
  id: string
  label: string
  score: number
  chunkText: string
  metadata: Record<string, string>
  imageUrl?: string
}

export interface DocumentQueryResult {
  question: string
  answer: string
  metadata: {
    model: string
    responseTime: string
    confidence: string
  }
  sources: DocumentSource[]
}

// UI State Types
export type QueryState = 'idle' | 'loading' | 'success' | 'error'

export interface RecentQuery {
  id: string
  query: string
  type: 'data' | 'document'
  timestamp: Date
}

export interface SavedPrompt {
  id: string
  name: string
  prompt: string
  type: 'data' | 'document'
}
