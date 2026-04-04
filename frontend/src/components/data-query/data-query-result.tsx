"use client";

import { useMemo, useState } from "react";
import type { DataQueryResponse } from "../../lib/types/data-query";
import { Check, Code2, Copy, MessageSquare, TableIcon, ChevronDown, ChevronUp } from "lucide-react";

interface DataQueryResultProps {
  result: DataQueryResponse;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        display: "flex", alignItems: "center", gap: "5px",
        padding: "5px 11px",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        background: "transparent",
        color: copied ? "var(--success)" : "var(--text-secondary)",
        fontSize: "11px",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : label}
    </button>
  );
}

function SectionCard({ icon, title, badge, children, action }: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "var(--accent)" }}>{icon}</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
          {badge && (
            <span style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              padding: "1px 8px",
              borderRadius: "100px",
            }}>
              {badge}
            </span>
          )}
        </div>
        {action}
      </div>
      <div style={{ padding: "16px 18px" }}>
        {children}
      </div>
    </div>
  );
}

export function DataQueryResult({ result }: DataQueryResultProps) {
  const rows = result.result ?? [];
  const [sqlExpanded, setSqlExpanded] = useState(false);
  const columns = useMemo(() => {
    if (!rows.length) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const summary = rows.length
    ? `Returned ${rows.length} row${rows.length > 1 ? "s" : ""} for: "${result.question}"`
    : `No rows returned for: "${result.question}"`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Summary */}
      <SectionCard
        icon={<MessageSquare size={14} />}
        title="Summary"
        action={<CopyButton text={summary} label="Copy" />}
      >
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{summary}</p>
      </SectionCard>

      {/* SQL */}
      {result.sql && (
        <SectionCard
          icon={<Code2 size={14} />}
          title="Generated SQL"
          action={
            <div style={{ display: "flex", gap: "8px" }}>
              <CopyButton text={result.sql} label="Copy SQL" />
              <button
                onClick={() => setSqlExpanded(!sqlExpanded)}
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "5px 11px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  fontSize: "11px",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                {sqlExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                {sqlExpanded ? "Collapse" : "Expand"}
              </button>
            </div>
          }
        >
          <div style={{
            overflowX: "auto",
            maxHeight: sqlExpanded ? "none" : "120px",
            overflow: sqlExpanded ? "visible" : "hidden",
            position: "relative",
          }}>
            <pre style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              padding: "14px 16px",
              fontSize: "12.5px",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: "#93c5fd",
              lineHeight: 1.7,
              overflowX: "auto",
            }}>
              <code>{result.sql}</code>
            </pre>
            {!sqlExpanded && (
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "40px",
                background: "linear-gradient(transparent, var(--bg-surface))",
                pointerEvents: "none",
              }} />
            )}
          </div>
        </SectionCard>
      )}

      {/* Results table */}
      <SectionCard
        icon={<TableIcon size={14} />}
        title="Results"
        badge={`${rows.length} rows`}
      >
        {rows.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>No results found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col} style={{
                      padding: "9px 14px",
                      textAlign: "left",
                      color: "var(--text-muted)",
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid var(--border)",
                      whiteSpace: "nowrap",
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{ borderBottom: ri < rows.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "var(--bg-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = "transparent"}
                  >
                    {columns.map((col) => (
                      <td key={col} style={{
                        padding: "10px 14px",
                        color: "var(--text-secondary)",
                        whiteSpace: "nowrap",
                        transition: "background 0.1s",
                      }}>
                        {String(row[col] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
