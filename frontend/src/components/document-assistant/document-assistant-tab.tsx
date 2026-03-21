"use client"

import { useState } from "react"
import { useRagQuery } from "../../hooks/use-rag-query"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { QueryInput } from "../shared/query-input"
import { SampleQuestions } from "./sample-questions"
import { sampleDocumentQuestions } from "../../lib/data/placeholder-data"
import { EmptyState, ErrorState, LoadingState } from "../shared/query-states"
import { DocumentQueryResult } from "./document-query-result"


interface DocumentAssistantTabProps {
  onQuerySubmit?: (query: string) => void
}

export function DocumentAssistantTab({ onQuerySubmit }: DocumentAssistantTabProps) {
  const [query, setQuery] = useState("")
  const { data, loading, error, submit, clear } = useRagQuery()

  const handleSubmit = async () => {
    if (!query.trim()) return
    await submit(query)
    onQuerySubmit?.(query)
  }

  const handleClear = () => {
    setQuery("")
    clear()
  }

  const handleRetry = () => {
    handleSubmit()
  }

  const handleSampleSelect = (question: string) => {
    setQuery(question)
  }

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
            onSubmit={handleSubmit}
            onClear={handleClear}
            isLoading={loading}
            placeholder="e.g., What is AI?"
            submitLabel="Ask"
          />
          <SampleQuestions
            questions={sampleDocumentQuestions}
            onSelect={handleSampleSelect}
            disabled={loading}
          />
        </CardContent>
      </Card>

      {!loading && !error && !data && <EmptyState type="document" />}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={handleRetry} />}
      {data && <DocumentQueryResult result={data} />}
    </div>
  )
}