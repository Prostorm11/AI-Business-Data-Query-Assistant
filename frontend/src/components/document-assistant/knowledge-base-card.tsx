"use client";

import { FileText } from "lucide-react";
import type { DocumentListItem } from "../../lib/types/documents";
import { UploadButton } from "./upload-button";
import { DocumentList } from "./document-list";

interface KnowledgeBaseCardProps {
  documents: DocumentListItem[];
  uploading: boolean;
  loadingDocuments: boolean;
  uploadError: string | null;
  onUpload: (file: File) => Promise<void>;
}

export function KnowledgeBaseCard({
  documents,
  uploading,
  loadingDocuments,
  uploadError,
  onUpload,
}: KnowledgeBaseCardProps) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FileText size={14} color="var(--accent-2)" />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Knowledge Base
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              padding: "1px 8px",
              borderRadius: "100px",
            }}
          >
            {documents.length} indexed
          </span>
        </div>

        <UploadButton uploading={uploading} onUpload={onUpload} />
      </div>

      <div style={{ padding: "14px 18px" }}>
        <DocumentList
          documents={documents}
          loadingDocuments={loadingDocuments}
          uploadError={uploadError}
        />
      </div>
    </div>
  );
}