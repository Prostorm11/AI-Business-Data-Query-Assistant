"use client";

import { useState } from "react";
import { Check, Copy, MessageSquare, BookOpen, FileText, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import type { RagQueryResponse, RagSource } from "../../lib/types/rag";

interface DocumentQueryResultProps {
  result: RagQueryResponse;
}

function CopyButton({ text }: { text: string }) {
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
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function relevanceBadge(score?: number) {
  if (typeof score !== "number") return { label: "Unknown", color: "var(--text-muted)", bg: "var(--bg-elevated)" };
  if (score < 0.8) return { label: "High", color: "var(--success)", bg: "rgba(16,185,129,0.1)" };
  if (score < 1.2) return { label: "Medium", color: "var(--warning)", bg: "rgba(245,158,11,0.1)" };
  return { label: "Low", color: "var(--danger)", bg: "rgba(239,68,68,0.1)" };
}

function SourceCard({ source, index }: { source: RagSource; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const rel = relevanceBadge(source.score);

  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: "10px",
      overflow: "hidden",
      background: "var(--bg-elevated)",
      transition: "border-color 0.15s",
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 14px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{
          width: "28px", height: "28px",
          borderRadius: "6px",
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <FileText size={12} color="var(--accent-2)" />
        </div>

        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {source.metadata?.file_name || `Source ${index + 1}`}
        </span>

        {source.score !== undefined && (
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            color: rel.color,
            background: rel.bg,
            padding: "2px 9px",
            borderRadius: "100px",
            flexShrink: 0,
          }}>
            {rel.label} · {source.score.toFixed(3)}
          </span>
        )}

        <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>

      {expanded && (
        <div style={{
          padding: "0 14px 14px",
          borderTop: "1px solid var(--border-subtle)",
          marginTop: 0,
          paddingTop: "12px",
        }}>
          <div style={{
            background: "var(--bg-surface)",
            borderRadius: "8px",
            padding: "12px 14px",
            marginBottom: "10px",
          }}>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {source.chunk}
            </p>
          </div>

          {source.metadata?.image_path && (
            <div style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <ImageIcon size={12} color="var(--text-muted)" />
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Related image</span>
              </div>
              <img
                src={source.metadata.image_path}
                alt="Related source"
                style={{ maxWidth: "240px", width: "100%", borderRadius: "8px", border: "1px solid var(--border)" }}
              />
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {source.metadata?.file_name && (
              <span style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                padding: "2px 9px",
                borderRadius: "100px",
              }}>
                file: {source.metadata.file_name}
              </span>
            )}
            {source.metadata?.start_token !== undefined && (
              <span style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                padding: "2px 9px",
                borderRadius: "100px",
              }}>
                start: {source.metadata.start_token}
              </span>
            )}
            {source.metadata?.end_token !== undefined && (
              <span style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                padding: "2px 9px",
                borderRadius: "100px",
              }}>
                end: {source.metadata.end_token}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function DocumentQueryResult({ result }: DocumentQueryResultProps) {
  const sources = result.sources ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Answer card */}
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
            <MessageSquare size={14} color="var(--accent)" />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Answer</span>
          </div>
          <CopyButton text={result.answer ?? ""} />
        </div>
        <div style={{ padding: "16px 18px" }}>
          <div style={{
            background: "var(--bg-elevated)",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "14px",
          }}>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "3px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Question</p>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{result.question}</p>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.75, whiteSpace: "pre-line" }}>
            {result.answer || "No answer returned."}
          </p>
        </div>
      </div>

      {/* Sources card */}
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
          gap: "8px",
        }}>
          <BookOpen size={14} color="var(--accent-2)" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Sources</span>
          <span style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            padding: "1px 8px",
            borderRadius: "100px",
          }}>
            {sources.length}
          </span>
        </div>
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {sources.length === 0 ? (
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>No sources available.</p>
          ) : (
            sources.map((source, i) => <SourceCard key={i} source={source} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
}
