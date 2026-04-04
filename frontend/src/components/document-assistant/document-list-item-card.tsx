"use client";

import { FileText } from "lucide-react";
import type { DocumentListItem } from "../../lib/types/documents";

interface DocumentListItemCardProps {
  doc: DocumentListItem;
}

export function DocumentListItemCard({ doc }: DocumentListItemCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 13px",
        borderRadius: "8px",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          background: "rgba(6,182,212,0.1)",
          border: "1px solid rgba(6,182,212,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FileText size={12} color="var(--accent-2)" />
      </div>

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          {doc.name}
        </p>
        <p
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          {doc.type.toUpperCase()} · {(doc.size / 1024).toFixed(1)} KB
        </p>
      </div>
    </div>
  );
}