"use client";

import { Database, FileSearch, AlertCircle, Loader2, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface EmptyStateProps {
  type: "data" | "document";
  variant?: "default" | "document-assistant";
}

export function EmptyState({
  type,
  variant = "default",
}: EmptyStateProps) {
  if (variant === "document-assistant") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "56px 24px",
          background: "var(--bg-surface)",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <FileText size={22} color="var(--text-muted)" />
        </div>
        <div
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "6px",
          }}
        >
          Ready to search
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          Upload documents above, then ask anything about their content.
        </div>
      </div>
    );
  }

  const Icon = type === "data" ? Database : FileSearch;
  const title = type === "data" ? "Query Your Business Data" : "Search Internal Knowledge";
  const description =
    type === "data"
      ? "Ask questions about your business data in natural language. Get SQL queries and results instantly."
      : "Search through documents, policies, and internal knowledge base. Get answers with source references.";

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </CardContent>
    </Card>
  );
}

interface LoadingStateProps {
  variant?: "default" | "document-assistant";
}

export function LoadingState({
  variant = "default",
}: LoadingStateProps) {
  if (variant === "document-assistant") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "56px 24px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid var(--border)",
            borderTopColor: "var(--accent-2)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Searching knowledge base...
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Processing your query...</p>
        </div>
        <div className="mt-6 space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  variant?: "default" | "document-assistant";
}

export function ErrorState({
  message = "Something went wrong while processing your query.",
  onRetry,
  variant = "default",
}: ErrorStateProps) {
  if (variant === "document-assistant") {
    return (
      <div
        style={{
          padding: "20px",
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--danger)",
              marginBottom: "4px",
            }}
          >
            Search failed
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            {message}
          </div>
        </div>
        {onRetry && (
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
        )}
      </div>
    );
  }

  return (
    <Card className="border-destructive/50">
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Query Failed</h3>
        <p className="text-sm text-muted-foreground max-w-md mb-4">{message}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}