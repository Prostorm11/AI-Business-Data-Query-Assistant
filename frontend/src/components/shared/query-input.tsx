"use client"

import { Search, X, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Spinner } from "../ui/spinner"

interface QueryInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onClear: () => void
  isLoading: boolean
  placeholder?: string
  submitLabel?: string
}

export function QueryInput({
  value,
  onChange,
  onSubmit,
  onClear,
  isLoading,
  placeholder = "Enter your question...",
  submitLabel = "Run Query"
}: QueryInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSubmit()
    }
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
          Press <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">⌘</kbd> + <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">Enter</kbd> to submit
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
  )
}
