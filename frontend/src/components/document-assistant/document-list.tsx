"use client";

import type { DocumentListItem } from "../../lib/types/documents";
import { DocumentListItemCard } from "./document-list-item-card";

interface DocumentListProps {
  documents: DocumentListItem[];
  loadingDocuments: boolean;
  uploadError: string | null;
}

export function DocumentList({
  documents,
  loadingDocuments,
  uploadError,
}: DocumentListProps) {
  if (uploadError) {
    return (
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.2)",
          color: "var(--danger)",
          fontSize: "12px",
          marginBottom: "12px",
        }}
      >
        {uploadError}
      </div>
    );
  }

  if (loadingDocuments) {
    return (
      <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
        Loading documents...
      </p>
    );
  }

  if (documents.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px dashed var(--border)",
          borderRadius: "8px",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
          No documents indexed yet. Upload a PDF or TXT to get started.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {documents.map((doc) => (
        <DocumentListItemCard key={doc.name} doc={doc} />
      ))}
    </div>
  );
}