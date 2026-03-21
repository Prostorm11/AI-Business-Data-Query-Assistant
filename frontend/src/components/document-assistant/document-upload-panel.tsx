import { useRef } from "react"
import { Upload, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import type { DocumentListItem } from "../../lib/types/documents"

interface DocumentUploadPanelProps {
  documents: DocumentListItem[]
  uploading: boolean
  loadingDocuments: boolean
  error: string | null
  onUpload: (file: File) => Promise<void>
}

export function DocumentUploadPanel({
  documents,
  uploading,
  loadingDocuments,
  error,
  onUpload,
}: DocumentUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handlePick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    await onUpload(file)
    event.target.value = ""
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button onClick={handlePick} disabled={uploading} className="gap-2">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Add PDF or TXT"}
        </Button>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Indexed documents</h4>

          {loadingDocuments ? (
            <p className="text-sm text-muted-foreground">Loading documents...</p>
          ) : documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No uploaded documents yet.</p>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type.toUpperCase()} • {(doc.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}