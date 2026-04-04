"use client";

import { DocumentQueryResult } from "../document-assistant/document-query-result";
import { KnowledgeBaseCard } from "../document-assistant/knowledge-base-card";
import { QuickExamples } from "../document-assistant/quick-examples";
import { QueryInput } from "../shared/query-input";
import { EmptyState, LoadingState, ErrorState } from "../shared/query-states";
import { sampleDocumentQuestions } from "../../lib/data/placeholder-data";
import type { RagQueryResponse } from "../../lib/types/rag";
import type { DocumentListItem } from "../../lib/types/documents";

interface DocumentAssistantTabProps {
  query: string;
  setQuery: (value: string) => void;
  data: RagQueryResponse | null;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
  onClear: () => void;
  onSavePrompt?: () => void;
  documents: DocumentListItem[];
  uploading: boolean;
  loadingDocuments: boolean;
  uploadError: string | null;
  onUpload: (file: File) => Promise<void>;
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
  documents,
  uploading,
  loadingDocuments,
  uploadError,
  onUpload,
}: DocumentAssistantTabProps) {
  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <KnowledgeBaseCard
        documents={documents}
        uploading={uploading}
        loadingDocuments={loadingDocuments}
        uploadError={uploadError}
        onUpload={onUpload}
      />

      <QueryInput
        value={query}
        onChange={setQuery}
        onSubmit={onSubmit}
        onClear={handleClear}
        isLoading={loading}
        onSavePrompt={onSavePrompt}
        placeholder="e.g., What is the architecture of the backend system?"
        variant="document-assistant"
      />

      <QuickExamples
        questions={sampleDocumentQuestions.slice(0, 4)}
        loading={loading}
        onSelect={setQuery}
      />

      {!loading && !error && !data && (
        <EmptyState type="document" variant="document-assistant" />
      )}

      {loading && <LoadingState variant="document-assistant" />}

      {error && (
        <ErrorState
          message={error}
          onRetry={onSubmit}
          variant="document-assistant"
        />
      )}

      {data && <DocumentQueryResult result={data} />}
    </div>
  );
}