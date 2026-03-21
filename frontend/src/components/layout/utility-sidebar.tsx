"use client"

import { Clock, Bookmark, Lightbulb, Zap, Database, FileText, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import type { RecentQuery, SavedPrompt } from "../../lib/types"

interface UtilitySidebarProps {
  recentQueries: RecentQuery[]
  savedPrompts: SavedPrompt[]
  usageTips: string[]
  onSelectQuery: (query: string, type: 'data' | 'document') => void
  onClearRecent: () => void
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function UtilitySidebar({
  recentQueries,
  savedPrompts,
  usageTips,
  onSelectQuery,
  onClearRecent
}: UtilitySidebarProps) {
  return (
    <div className="space-y-4">
      {/* Recent Queries */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Recent Queries
            </CardTitle>
            {recentQueries.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearRecent} className="h-7 px-2">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {recentQueries.length === 0 ? (
            <p className="text-xs text-muted-foreground">No recent queries</p>
          ) : (
            <ScrollArea className="h-[180px]">
              <div className="space-y-2">
                {recentQueries.map((query) => (
                  <button
                    key={query.id}
                    onClick={() => onSelectQuery(query.query, query.type)}
                    className="w-full text-left rounded-md p-2 hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      {query.type === 'data' ? (
                        <Database className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                      ) : (
                        <FileText className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate group-hover:text-primary">
                          {query.query}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(query.timestamp)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Saved Prompts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Bookmark className="h-4 w-4" />
            Saved Prompts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {savedPrompts.length === 0 ? (
            <p className="text-xs text-muted-foreground">No saved prompts</p>
          ) : (
            <div className="space-y-2">
              {savedPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => onSelectQuery(prompt.prompt, prompt.type)}
                  className="w-full text-left rounded-md p-2 hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium truncate group-hover:text-primary">
                      {prompt.name}
                    </span>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {prompt.type}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Lightbulb className="h-4 w-4" />
            Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2">
            {usageTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Zap className="h-4 w-4" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-2">
            <Button variant="outline" size="sm" className="justify-start text-xs h-8">
              <Database className="mr-2 h-3.5 w-3.5" />
              Export Results
            </Button>
            <Button variant="outline" size="sm" className="justify-start text-xs h-8">
              <FileText className="mr-2 h-3.5 w-3.5" />
              View Query History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
