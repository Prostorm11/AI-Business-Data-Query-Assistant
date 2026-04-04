import { Database, FileText, Sparkles } from "lucide-react"
import { useState } from "react"

import { Header } from "./components/layout/header"
import { UtilitySidebar } from "./components/layout/utility-sidebar"
import { DataQueryTab } from "./components/data-query/data-query-tab"
import { DocumentAssistantTab } from "./components/document-assistant/document-assistant-tab"

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
    <div className="min-h-screen" style={{ background: "var(--bg-base)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        :root {
          --bg-base: #0a0e1a;
          --bg-surface: #111827;
          --bg-elevated: #1a2235;
          --bg-hover: #1e2a3d;
          --border: #1e2d45;
          --border-subtle: #162030;
          --accent: #3b82f6;
          --accent-dim: #1d4ed8;
          --accent-glow: rgba(59, 130, 246, 0.15);
          --accent-2: #06b6d4;
          --text-primary: #f0f4ff;
          --text-secondary: #8b9cc8;
          --text-muted: #4a5a7a;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
          --radius: 10px;
          --radius-lg: 14px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg-base);
          color: var(--text-primary);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-surface); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

        .tab-bar {
          display: flex;
          gap: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 4px;
          width: fit-content;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s ease;
          color: var(--text-secondary);
          background: transparent;
          letter-spacing: 0.01em;
        }

        .tab-btn:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
        }

        .tab-btn.active {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
        }

        .tab-btn svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }

        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
        }

        .layout-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr 300px;
        }

        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr;
          }
          .sidebar-col {
            display: none;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-glow);
          border: 1px solid rgba(59,130,246,0.3);
          color: #93c5fd;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 16px;
        }
      `}</style>

      <Header isConnected={true} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px" }}>
        {/* Page heading */}
        <div style={{ marginBottom: "28px" }}>
          <div className="hero-badge">
            <Sparkles size={12} />
            AI-Powered Analytics
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Business Intelligence Hub
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>
            Query your data and documents with natural language — powered by local AI
          </p>
        </div>

        {/* Tab navigation */}
        <div className="tab-bar" style={{ marginBottom: "24px" }}>
          <button
            className={`tab-btn ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            <Database />
            Data Query
          </button>
          <button
            className={`tab-btn ${activeTab === "document" ? "active" : ""}`}
            onClick={() => setActiveTab("document")}
          >
            <FileText />
            Document Assistant
          </button>
        </div>

        <div className="layout-grid">
          <div style={{ minWidth: 0 }}>
            <div className={`tab-content ${activeTab === "data" ? "active" : ""}`}>
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
            </div>
            <div className={`tab-content ${activeTab === "document" ? "active" : ""}`}>
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
            </div>
          </div>

          <aside className="sidebar-col">
            <div style={{ position: "sticky", top: "24px" }}>
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
