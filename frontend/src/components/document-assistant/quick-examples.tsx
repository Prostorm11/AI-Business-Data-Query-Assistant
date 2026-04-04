"use client";

import { Zap } from "lucide-react";

interface QuickExamplesProps {
  questions: string[];
  loading: boolean;
  onSelect: (question: string) => void;
}

export function QuickExamples({
  questions,
  loading,
  onSelect,
}: QuickExamplesProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "10px",
        }}
      >
        <Zap size={12} color="var(--accent-2)" />
        <span
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          Quick examples
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
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
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.borderColor = "var(--accent-2)";
                e.currentTarget.style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}