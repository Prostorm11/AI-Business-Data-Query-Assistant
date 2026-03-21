"use client"

import { Copy, Check, MessageSquare, BookOpen, FileText, Star, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import type { RagQueryResponse, RagSource } from "../../lib/types/rag"


interface DocumentQueryResultProps {
  result: RagQueryResponse
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-1.5">
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </Button>
  )
}

function SourceCard({ source, index }: { source: RagSource; index: number }) {
  const scorePercentage =
    typeof source.score === "number" ? Math.round(source.score * 100) : null

  return (
    <AccordionItem value={`source-${index}`} className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center gap-3 text-left w-full">
          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="font-medium text-sm">
            {source.metadata?.file_name || `Source ${index + 1}`}
          </span>
          {scorePercentage !== null && (
            <Badge variant="outline" className="ml-auto">
              <Star className="mr-1 h-3 w-3" />
              {scorePercentage}%
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="pb-4">
        <div className="space-y-3">
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {source.chunk}
            </p>
          </div>

          {source.metadata?.image_path && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                <span>Related Image</span>
              </div>
              <div className="rounded-md border overflow-hidden bg-muted/50 p-2">
                <img
                  src={source.metadata.image_path}
                  alt="Related source"
                  className="w-full max-w-xs h-auto rounded"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {source.metadata?.file_name && (
              <Badge variant="secondary" className="text-xs">
                file: {source.metadata.file_name}
              </Badge>
            )}
            {source.metadata?.start_token !== undefined && (
              <Badge variant="secondary" className="text-xs">
                start: {source.metadata.start_token}
              </Badge>
            )}
            {source.metadata?.end_token !== undefined && (
              <Badge variant="secondary" className="text-xs">
                end: {source.metadata.end_token}
              </Badge>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export function DocumentQueryResult({ result }: DocumentQueryResultProps) {
  const sources = result.sources ?? []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Answer
            </CardTitle>
            <CopyButton text={result.answer ?? ""} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-sm font-medium text-muted-foreground">Question:</p>
            <p className="text-sm mt-1">{result.question}</p>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {result.answer || "No answer returned."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4" />
            Sources ({sources.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sources available.</p>
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {sources.map((source, index) => (
                <SourceCard key={index} source={source} index={index} />
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  )
}