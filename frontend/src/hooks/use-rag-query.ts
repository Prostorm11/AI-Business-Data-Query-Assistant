"use client";

import { useState } from "react";
import { runRagQuery } from "../lib/api/rag-query";
import type { RagQueryResponse } from "../lib/types/rag";

export function useRagQuery() {
  const [data, setData] = useState<RagQueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (question: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await runRagQuery({ question });
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, submit, clear };
}