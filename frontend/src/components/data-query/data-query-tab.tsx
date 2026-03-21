"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../../components/ui/button";
import { QueryInput } from "../shared/query-input";
import { SampleQuestions } from "../shared/sample-questions";
import { DataQueryResult } from "../data-query/data-query-result";
import {
  EmptyState,
  LoadingState,
  ErrorState,
} from "../shared/query-states";

import { sampleDataQuestions } from "../../lib/data/placeholder-data";
import type { DataQueryResponse } from "../../lib/types/data-query";

interface DataQueryTabProps {
  query: string;
  setQuery: (value: string) => void;
  data: DataQueryResponse | null;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
  onClear: () => void;
  onSavePrompt?: () => void;
}

export function DataQueryTab({
  query,
  setQuery,
  data,
  loading,
  error,
  onSubmit,
  onClear,
  onSavePrompt,
}: DataQueryTabProps) {
  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Ask a Business Question</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <QueryInput
            value={query}
            onChange={setQuery}
            onSubmit={onSubmit}
            onClear={handleClear}
            isLoading={loading}
            placeholder="e.g., What were our total sales last quarter?"
            submitLabel="Run Query"
          />

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSavePrompt}
              disabled={!query.trim() || loading}
            >
              Save Prompt
            </Button>
          </div>

          <SampleQuestions
            questions={sampleDataQuestions}
            onSelect={setQuery}
            disabled={loading}
          />
        </CardContent>
      </Card>

      {!loading && !error && !data && <EmptyState type="data" />}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={onSubmit} />}
      {data && <DataQueryResult result={data} />}
    </div>
  );
}