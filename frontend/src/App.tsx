
import { Database, FileText } from "lucide-react"
import { useState } from "react"
import type { RecentQuery } from "./lib/types"
import { placeholderRecentQueries, placeholderSavedPrompts, usageTips } from "./lib/data/placeholder-data"
import { Header } from "./components/layout/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { DataQueryTab } from "./components/data-query/data-query-tab"
import { DocumentAssistantTab } from "./components/document-assistant/document-assistant-tab"
import { UtilitySidebar } from "./components/layout/utility-sidebar"




export default function BusinessQueryAssistant() {
  const [activeTab, setActiveTab] = useState<string>("data")
  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>(placeholderRecentQueries)

  const handleQuerySubmit = (query: string, type: 'data' | 'document') => {
    const newQuery: RecentQuery = {
      id: `rq-${Date.now()}`,
      query,
      type,
      timestamp: new Date()
    }
    setRecentQueries(prev => [newQuery, ...prev.slice(0, 9)])
  }

  const handleSelectQuery = (query: string, type: 'data' | 'document') => {
    setActiveTab(type)
    // The query will be handled by the tab components
  }

  const handleClearRecent = () => {
    setRecentQueries([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isConnected={true} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Main Workspace */}
          <div className="min-w-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  onQuerySubmit={(query) => handleQuerySubmit(query, 'data')} 
                />
              </TabsContent>
              
              <TabsContent value="document" className="mt-0">
                <DocumentAssistantTab 
                  onQuerySubmit={(query) => handleQuerySubmit(query, 'document')} 
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Utility Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <UtilitySidebar
                recentQueries={recentQueries}
                savedPrompts={placeholderSavedPrompts}
                usageTips={usageTips}
                onSelectQuery={handleSelectQuery}
                onClearRecent={handleClearRecent}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
