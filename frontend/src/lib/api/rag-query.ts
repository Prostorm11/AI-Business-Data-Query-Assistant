import { apiPost } from "./client";
import type { RagQueryRequest, RagQueryResponse } from "../types/rag";

export async function runRagQuery(
  payload: RagQueryRequest
): Promise<RagQueryResponse> {
  return apiPost<RagQueryResponse>("/rag-query", payload);
}