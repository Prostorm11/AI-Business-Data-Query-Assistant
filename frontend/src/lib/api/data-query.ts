import { apiPost } from "./client";
import type { DataQueryRequest, DataQueryResponse } from "../types/data-query";

export async function runDataQuery(
  payload: DataQueryRequest
): Promise<DataQueryResponse> {
  return apiPost<DataQueryResponse>("/query", payload);
}