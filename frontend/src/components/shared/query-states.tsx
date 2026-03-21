"use client"

import { Database, FileSearch, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

interface EmptyStateProps {
  type: 'data' | 'document'
}

export function EmptyState({ type }: EmptyStateProps) {
  const Icon = type === 'data' ? Database : FileSearch
  const title = type === 'data' ? 'Query Your Business Data' : 'Search Internal Knowledge'
  const description = type === 'data' 
    ? 'Ask questions about your business data in natural language. Get SQL queries and results instantly.'
    : 'Search through documents, policies, and internal knowledge base. Get answers with source references.'

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export function LoadingState() {
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
  )
}

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ 
  message = "Something went wrong while processing your query.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Query Failed</h3>
        <p className="text-sm text-muted-foreground max-w-md mb-4">
          {message}
        </p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
