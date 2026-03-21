"use client"

import { useState } from "react"

import { SampleQuestions } from "../document-assistant/sample-questions"
import { useDataQuery } from "../../hooks/use-data-query"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { QueryInput } from "../shared/query-input"
import { sampleDataQuestions } from "../../lib/data/placeholder-data"
import { EmptyState, ErrorState, LoadingState } from "../shared/query-states"
import { DataQueryResult } from "./data-query-result"

interface DataQueryTabProps {
  onQuerySubmit?: (query: string) => void
}

export function DataQueryTab({ onQuerySubmit }: DataQueryTabProps) {
  const [query, setQuery] = useState("")
  const { data, loading, error, submit, clear } = useDataQuery()

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
          <CardTitle className="text-base">Ask a Business Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            onClear={handleClear}
            isLoading={loading}
            placeholder="e.g., What were our total sales last quarter?"
            submitLabel="Run Query"
          />
          <SampleQuestions
            questions={sampleDataQuestions}
            onSelect={handleSampleSelect}
            disabled={loading}
          />
        </CardContent>
      </Card>

      {!loading && !error && !data && <EmptyState type="data" />}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={handleRetry} />}
      {data && <DataQueryResult result={data} />}
    </div>
  )
}