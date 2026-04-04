"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";

interface UploadButtonProps {
  uploading: boolean;
  onUpload: (file: File) => Promise<void>;
  accept?: string;
}

export function UploadButton({
  uploading,
  onUpload,
  accept = ".pdf,.txt",
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await onUpload(file);
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 14px",
          borderRadius: "8px",
          border: "1px solid rgba(6,182,212,0.3)",
          background: "rgba(6,182,212,0.08)",
          color: "var(--accent-2)",
          fontSize: "12px",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: uploading ? "not-allowed" : "pointer",
          opacity: uploading ? 0.6 : 1,
          transition: "all 0.15s",
        }}
      >
        <Upload size={12} />
        {uploading ? "Uploading..." : "Add Document"}
      </button>
    </>
  );
}