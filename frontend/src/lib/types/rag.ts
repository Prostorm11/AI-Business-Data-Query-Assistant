export interface RagQueryRequest {
  question: string;
}

export interface RagSource {
  chunk: string;
  metadata?: {
    start_token?: number;
    end_token?: number;
    file_name?: string;
    image_path?: string;
  };
  score?: number;
}

export interface RagQueryResponse {
  question: string;
  answer?: string;
  sources?: RagSource[];
  error?: string;
}