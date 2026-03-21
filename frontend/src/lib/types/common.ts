export type QueryTabType = "data" | "document";

export interface RecentQuery {
  id: string;
  query: string;
  type: QueryTabType;
  timestamp: string;
}

export interface SavedPrompt {
  id: string;
  label: string;
  query: string;
  type: QueryTabType;
  createdAt: string;
}