"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { QueryInput } from "../shared/query-input";
import { SampleQuestions } from "../shared/sample-questions";
import { DocumentQueryResult } from "../document-assistant/document-query-result";
import {
  EmptyState,
  LoadingState,
  ErrorState,
} from "../shared/query-states";

import { sampleDocumentQuestions } from "../../lib/data/placeholder-data";
import type { RagQueryResponse } from "../../lib/types/rag";

interface DocumentAssistantTabProps {
  query: string;
  setQuery: (value: string) => void;
  data: RagQueryResponse | null;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
  onClear: () => void;
  onSavePrompt?: () => void;
}

export function DocumentAssistantTab({
  query,
  setQuery,
  data,
  loading,
  error,
  onSubmit,
  onClear,
  onSavePrompt,
}: DocumentAssistantTabProps) {
  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Search Internal Knowledge</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <QueryInput
            value={query}
            onChange={setQuery}
            onSubmit={onSubmit}
            onClear={handleClear}
            isLoading={loading}
            placeholder="e.g., What is AI?"
            submitLabel="Ask"
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
            questions={sampleDocumentQuestions}
            onSelect={setQuery}
            disabled={loading}
          />
        </CardContent>
      </Card>

      {!loading && !error && !data && <EmptyState type="document" />}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={onSubmit} />}
      {data && <DocumentQueryResult result={data} />}
    </div>
  );
}