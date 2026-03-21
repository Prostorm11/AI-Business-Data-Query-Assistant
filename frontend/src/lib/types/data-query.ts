export interface DataQueryRequest {
  question: string;
}

export interface DataQueryResponse {
  question: string;
  sql?: string;
  result?: Record<string, unknown>[];
  error?: string;
}