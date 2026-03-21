"use client";

import { useState } from "react";
import { runDataQuery } from "../lib/api/data-query";
import type { DataQueryResponse } from "../lib/types/data-query";

export function useDataQuery() {
  const [data, setData] = useState<DataQueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (question: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await runDataQuery({ question });
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