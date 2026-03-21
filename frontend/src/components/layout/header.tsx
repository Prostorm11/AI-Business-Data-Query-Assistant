"use client"

import { Database, FileText, Wifi, WifiOff } from "lucide-react"
import { Badge } from "../ui/badge"

interface HeaderProps {
  isConnected?: boolean
}

export function Header({ isConnected = true }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Business Query Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Query business data and internal knowledge with natural language
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "destructive"} className="gap-1.5">
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3" />
                  Connected
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  Disconnected
                </>
              )}
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <FileText className="h-3 w-3" />
              v1.0
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
