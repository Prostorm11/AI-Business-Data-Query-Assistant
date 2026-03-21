"use client";

import { Clock3, Bookmark, Lightbulb, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { RecentQuery, SavedPrompt, QueryTabType } from "../../lib/types/common";

interface UtilitySidebarProps {
  recentQueries: RecentQuery[];
  savedPrompts: SavedPrompt[];
  usageTips: string[];
  onSelectQuery: (query: string, type: QueryTabType) => void;
  onClearRecent: () => void;
  onRemoveSavedPrompt: (id: string) => void;
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
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock3 className="h-4 w-4" />
            Recent Queries
          </CardTitle>
          {recentQueries.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearRecent}>
              Clear
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {recentQueries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent queries yet.</p>
          ) : (
            recentQueries.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectQuery(item.query, item.type)}
                className="w-full rounded-md border p-3 text-left hover:bg-muted"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="outline">{item.type}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm line-clamp-2">{item.query}</p>
              </button>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bookmark className="h-4 w-4" />
            Saved Prompts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {savedPrompts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved prompts yet.</p>
          ) : (
            savedPrompts.map((item) => (
              <div key={item.id} className="rounded-md border p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="outline">{item.type}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onRemoveSavedPrompt(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <button
                  onClick={() => onSelectQuery(item.query, item.type)}
                  className="w-full text-left"
                >
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {item.query}
                  </p>
                </button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4" />
            Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {usageTips.map((tip, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              • {tip}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}