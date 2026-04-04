"use client";

import { useState } from "react";
import { Search, X, Sparkles, Send, Bookmark, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
  placeholder?: string;
  submitLabel?: string;
  onSavePrompt?: () => void;
  variant?: "default" | "document-assistant";
}

export function QueryInput({
  value,
  onChange,
  onSubmit,
  onClear,
  isLoading,
  placeholder = "Enter your question...",
  submitLabel = "Run Query",
  onSavePrompt,
  variant = "default",
}: QueryInputProps) {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (variant === "document-assistant") {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !isLoading) onSubmit();
      }
      return;
    }

    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  if (variant === "document-assistant") {
    return (
      <div
        style={{
          background: "var(--bg-surface)",
          border: `1px solid ${focused ? "var(--accent-2)" : "var(--border)"}`,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          transition: "border-color 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(6,182,212,0.1)" : "none",
        }}
      >
        <div style={{ padding: "16px 20px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={14} color="var(--accent-2)" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Search Internal Knowledge
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                Ask questions about your documents
              </div>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={3}
            disabled={isLoading}
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
              caretColor: "var(--accent-2)",
            }}
          />
        </div>

        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border-subtle)",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={onSavePrompt}
              disabled={!value.trim() || isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 12px",
                borderRadius: "7px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-secondary)",
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                cursor: !value.trim() || isLoading ? "not-allowed" : "pointer",
                opacity: !value.trim() || isLoading ? 0.5 : 1,
              }}
            >
              <Bookmark size={12} />
              Save
            </button>

            {value && (
              <button
                onClick={onClear}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>

          <button
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              background:
                !value.trim() || isLoading
                  ? "var(--bg-elevated)"
                  : "linear-gradient(135deg, var(--accent-2), #0891b2)",
              color: !value.trim() || isLoading ? "var(--text-muted)" : "#fff",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: !value.trim() || isLoading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow:
                !value.trim() || isLoading
                  ? "none"
                  : "0 0 16px rgba(6,182,212,0.3)",
            }}
          >
            {isLoading ? (
              <>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Searching...
              </>
            ) : (
              <>
                <Send size={13} />
                Ask
              </>
            )}
          </button>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-[100px] resize-none"
        disabled={isLoading}
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Press{" "}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
            ⌘
          </kbd>{" "}
          +{" "}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
            Enter
          </kbd>{" "}
          to submit
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            disabled={isLoading || !value}
          >
            <X className="mr-1.5 h-4 w-4" />
            Clear
          </Button>
          <Button
            size="sm"
            onClick={onSubmit}
            disabled={isLoading || !value.trim()}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-1.5 h-4 w-4" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {submitLabel}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}