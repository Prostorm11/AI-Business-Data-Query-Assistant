"use client";

import { Clock, Bookmark, Lightbulb, Trash2, X } from "lucide-react";
import type { RecentQuery, SavedPrompt, QueryTabType } from "../../lib/types/common";

interface UtilitySidebarProps {
  recentQueries: RecentQuery[];
  savedPrompts: SavedPrompt[];
  usageTips: string[];
  onSelectQuery: (query: string, type: QueryTabType) => void;
  onClearRecent: () => void;
  onRemoveSavedPrompt: (id: string) => void;
}

function SideSection({ icon, title, children, action }: {
  icon: React.ReactNode;
  title: string;
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
        padding: "12px 14px",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ color: "var(--accent)" }}>{icon}</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.01em" }}>{title}</span>
        </div>
        {action}
      </div>
      <div style={{ padding: "10px" }}>
        {children}
      </div>
    </div>
  );
}

export function UtilitySidebar({
  recentQueries,
  savedPrompts,
  usageTips,
  onSelectQuery,
  onClearRecent,
  onRemoveSavedPrompt,
}: UtilitySidebarProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Recent */}
      <SideSection
        icon={<Clock size={13} />}
        title="Recent"
        action={
          recentQueries.length > 0 ? (
            <button
              onClick={onClearRecent}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "11px",
                cursor: "pointer",
                padding: "2px 6px",
                borderRadius: "5px",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--danger)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"}
            >
              <Trash2 size={11} />
              Clear
            </button>
          ) : undefined
        }
      >
        {recentQueries.length === 0 ? (
          <p style={{ fontSize: "12px", color: "var(--text-muted)", padding: "4px" }}>No recent queries yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {recentQueries.slice(0, 5).map((q) => (
              <button
                key={q.id}
                onClick={() => onSelectQuery(q.query, q.type)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "7px 9px",
                  borderRadius: "7px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background 0.12s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                  <span style={{
                    fontSize: "10px",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    background: q.type === "data" ? "rgba(59,130,246,0.15)" : "rgba(6,182,212,0.15)",
                    color: q.type === "data" ? "var(--accent)" : "var(--accent-2)",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>
                    {q.type === "data" ? "SQL" : "DOC"}
                  </span>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                    {new Date(q.timestamp).toLocaleString()}
                  </span>
                </div>
                <span style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}>
                  {q.query}
                </span>
              </button>
            ))}
          </div>
        )}
      </SideSection>

      {/* Saved */}
      <SideSection icon={<Bookmark size={13} />} title="Saved Prompts">
        {savedPrompts.length === 0 ? (
          <p style={{ fontSize: "12px", color: "var(--text-muted)", padding: "4px" }}>No saved prompts yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {savedPrompts.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 9px",
                  borderRadius: "7px",
                  transition: "background 0.12s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--bg-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
              >
                <button
                  onClick={() => onSelectQuery(p.query, p.type)}
                  style={{
                    flex: 1,
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <p style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {p.label}
                  </p>
                  <p style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: "2px",
                  }}>
                    {p.query}
                  </p>
                </button>
                <button
                  onClick={() => onRemoveSavedPrompt(p.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    padding: "2px",
                    flexShrink: 0,
                    transition: "color 0.12s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--danger)"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </SideSection>

      {/* Tips */}
      <SideSection icon={<Lightbulb size={13} />} title="Tips">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {usageTips.map((tip, i) => (
            <p key={i} style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              lineHeight: 1.5,
              padding: "3px 4px",
            }}>
              · {tip}
            </p>
          ))}
        </div>
      </SideSection>
    </div>
  );
}
