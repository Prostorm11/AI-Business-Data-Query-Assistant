import { Database, FileText } from "lucide-react"
import { useState } from "react"

import { Header } from "./components/layout/header"
import { UtilitySidebar } from "./components/layout/utility-sidebar"
import { DataQueryTab } from "./components/data-query/data-query-tab"
import { DocumentAssistantTab } from "./components/document-assistant/document-assistant-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

import { useDataQuery } from "./hooks/use-data-query"
import { useRagQuery } from "./hooks/use-rag-query"
import { useLocalHistory } from "./hooks/use-local-history"
import { useDocumentUpload } from "./hooks/use-document-upload"

import type { QueryTabType } from "./lib/types/common"
import { usageTips } from "./lib/data/placeholder-data"

export default function BusinessQueryAssistant() {
  const [activeTab, setActiveTab] = useState<QueryTabType>("data")

  const [dataQueryInput, setDataQueryInput] = useState("")
  const [documentQueryInput, setDocumentQueryInput] = useState("")

  const dataQuery = useDataQuery()
  const ragQuery = useRagQuery()
  const documentUpload = useDocumentUpload()

  const {
    recentQueries,
    savedPrompts,
    addRecentQuery,
    clearRecentQueries,
    savePrompt,
    removeSavedPrompt,
  } = useLocalHistory()

  const handleDataSubmit = async () => {
    if (!dataQueryInput.trim()) return
    await dataQuery.submit(dataQueryInput)
    addRecentQuery(dataQueryInput, "data")
  }

  const handleDocumentSubmit = async () => {
    if (!documentQueryInput.trim()) return
    await ragQuery.submit(documentQueryInput)
    addRecentQuery(documentQueryInput, "document")
  }

  const handleSelectQuery = (query: string, type: QueryTabType) => {
    setActiveTab(type)

    if (type === "data") {
      setDataQueryInput(query)
    } else {
      setDocumentQueryInput(query)
    }
  }

  const handleSaveCurrentPrompt = (type: QueryTabType) => {
    const query = type === "data" ? dataQueryInput : documentQueryInput
    if (!query.trim()) return

    const label =
      type === "data"
        ? `Data: ${query.slice(0, 30)}`
        : `Doc: ${query.slice(0, 30)}`

    savePrompt(label, query, type)
  }

  const handleClearDataTab = () => {
    setDataQueryInput("")
    dataQuery.clear()
  }

  const handleClearDocumentTab = () => {
    setDocumentQueryInput("")
    ragQuery.clear()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isConnected={true} />

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as QueryTabType)}
              className="w-full"
            >
              <TabsList className="mb-4 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="data" className="gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Data Query</span>
                  <span className="sm:hidden">Data</span>
                </TabsTrigger>

                <TabsTrigger value="document" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Document Assistant</span>
                  <span className="sm:hidden">Docs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="data" className="mt-0">
                <DataQueryTab
                  query={dataQueryInput}
                  setQuery={setDataQueryInput}
                  data={dataQuery.data}
                  loading={dataQuery.loading}
                  error={dataQuery.error}
                  onSubmit={handleDataSubmit}
                  onClear={handleClearDataTab}
                  onSavePrompt={() => handleSaveCurrentPrompt("data")}
                />
              </TabsContent>

              <TabsContent value="document" className="mt-0">
                <DocumentAssistantTab
                  query={documentQueryInput}
                  setQuery={setDocumentQueryInput}
                  data={ragQuery.data}
                  loading={ragQuery.loading}
                  error={ragQuery.error}
                  onSubmit={handleDocumentSubmit}
                  onClear={handleClearDocumentTab}
                  onSavePrompt={() => handleSaveCurrentPrompt("document")}
                  documents={documentUpload.documents}
                  uploading={documentUpload.uploading}
                  loadingDocuments={documentUpload.loadingDocuments}
                  uploadError={documentUpload.error}
                  onUpload={documentUpload.upload}
                />
              </TabsContent>
            </Tabs>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <UtilitySidebar
                recentQueries={recentQueries}
                savedPrompts={savedPrompts}
                usageTips={usageTips}
                onSelectQuery={handleSelectQuery}
                onClearRecent={clearRecentQueries}
                onRemoveSavedPrompt={removeSavedPrompt}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}