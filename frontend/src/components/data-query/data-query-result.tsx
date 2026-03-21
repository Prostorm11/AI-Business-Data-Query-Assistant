"use client"

import { useMemo, useState } from "react";
import type { DataQueryResponse } from "../../lib/types/data-query";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Check, Code2, Copy, MessageSquare, TableIcon } from "lucide-react";



interface DataQueryResultProps {
  result: DataQueryResponse
}

function CopyButton({ text, label }: { text: string; label: string }) {
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
          {label}
        </>
      )}
    </Button>
  )
}

export function DataQueryResult({ result }: DataQueryResultProps) {
  const rows = result.result ?? []
  const columns = useMemo(() => {
    if (!rows.length) return []
    return Object.keys(rows[0])
  }, [rows])

  const summary = rows.length
    ? `Returned ${rows.length} row${rows.length > 1 ? "s" : ""} for: "${result.question}"`
    : `No rows returned for: "${result.question}"`

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Summary
            </CardTitle>
            <CopyButton text={summary} label="Copy" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>

      {result.sql && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code2 className="h-4 w-4" />
                Generated SQL
              </CardTitle>
              <CopyButton text={result.sql} label="Copy SQL" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <pre className="rounded-lg bg-muted p-4 text-sm">
                <code className="text-foreground">{result.sql}</code>
              </pre>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TableIcon className="h-4 w-4" />
            Results ({rows.length} rows)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results found.</p>
          ) : (
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column} className="whitespace-nowrap font-medium">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((column) => (
                        <TableCell key={column} className="whitespace-nowrap">
                          {String(row[column] ?? "-")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}