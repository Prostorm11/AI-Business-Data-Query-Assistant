"use client";

import { useState } from "react";
import { Send, X, Bookmark, Zap, Database } from "lucide-react";
import { DataQueryResult } from "../data-query/data-query-result";
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
  const [focused, setFocused] = useState(false);

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (query.trim() && !loading) onSubmit();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Query card */}
      <div style={{
        background: "var(--bg-surface)",
        border: `1px solid ${focused ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transition: "border-color 0.2s",
        boxShadow: focused ? "0 0 0 3px var(--accent-glow)" : "none",
      }}>
        {/* Card header */}
        <div style={{
          padding: "16px 20px 0",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "30px", height: "30px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))",
            border: "1px solid rgba(59,130,246,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Database size={14} color="var(--accent)" />
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Ask a Business Question</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Natural language → SQL → Results</div>
          </div>
        </div>

        {/* Textarea */}
        <div style={{ padding: "14px 20px 0" }}>
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., What were our total sales last quarter by region?"
            rows={3}
            disabled={loading}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              color: "var(--text-primary)",
              fontSize: "14px",
              lineHeight: 1.6,
              fontFamily: "'DM Sans', sans-serif",
              caretColor: "var(--accent)",
            }}
          />
        </div>

        {/* Actions row */}
        <div style={{
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border-subtle)",
          marginTop: "8px",
        }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={onSavePrompt}
              disabled={!query.trim() || loading}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "6px 12px",
                borderRadius: "7px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-secondary)",
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                cursor: !query.trim() || loading ? "not-allowed" : "pointer",
                opacity: !query.trim() || loading ? 0.5 : 1,
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (query.trim() && !loading) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)" }}
            >
              <Bookmark size={12} />
              Save
            </button>
            {query && (
              <button
                onClick={handleClear}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--danger)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)" }}
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>

          <button
            onClick={onSubmit}
            disabled={!query.trim() || loading}
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              background: !query.trim() || loading
                ? "var(--bg-elevated)"
                : "linear-gradient(135deg, var(--accent), var(--accent-dim))",
              color: !query.trim() || loading ? "var(--text-muted)" : "#fff",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: !query.trim() || loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: !query.trim() || loading ? "none" : "0 0 16px rgba(59,130,246,0.3)",
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: "12px", height: "12px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }} />
                Running...
              </>
            ) : (
              <>
                <Send size={13} />
                Run Query
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sample questions */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <Zap size={12} color="var(--warning)" />
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>Quick examples</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {sampleDataQuestions.slice(0, 4).map((q, i) => (
            <button
              key={i}
              onClick={() => setQuery(q)}
              disabled={loading}
              style={{
                padding: "6px 13px",
                borderRadius: "100px",
                border: "1px solid var(--border)",
                background: "var(--bg-surface)",
                color: "var(--text-secondary)",
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                opacity: loading ? 0.5 : 1,
              }}
              onMouseEnter={e => {
                if (!loading) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {!loading && !error && !data && <EmptyDataState />}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={onSubmit} />}
      {data && <DataQueryResult result={data} />}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function EmptyDataState() {
  return (
    <div style={{
      textAlign: "center",
      padding: "56px 24px",
      background: "var(--bg-surface)",
      border: "1px dashed var(--border)",
      borderRadius: "var(--radius-lg)",
    }}>
      <div style={{
        width: "52px", height: "52px",
        borderRadius: "14px",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
      }}>
        <Database size={22} color="var(--text-muted)" />
      </div>
      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
        No results yet
      </div>
      <div style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "300px", margin: "0 auto" }}>
        Ask a business question above and the AI will generate SQL and fetch your data.
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{
      textAlign: "center",
      padding: "56px 24px",
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
    }}>
      <div style={{
        width: "40px", height: "40px",
        border: "3px solid var(--border)",
        borderTopColor: "var(--accent)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        margin: "0 auto 16px",
      }} />
      <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Generating SQL and fetching results...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div style={{
      padding: "20px",
      background: "rgba(239,68,68,0.07)",
      border: "1px solid rgba(239,68,68,0.25)",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
    }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--danger)", marginBottom: "4px" }}>Query failed</div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{message}</div>
      </div>
      <button
        onClick={onRetry}
        style={{
          padding: "6px 14px",
          borderRadius: "7px",
          border: "1px solid rgba(239,68,68,0.3)",
          background: "transparent",
          color: "var(--danger)",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Retry
      </button>
    </div>
  );
}
