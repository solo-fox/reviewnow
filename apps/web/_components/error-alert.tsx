"use client"

import { AlertCircle, Copy } from "lucide-react"

interface ErrorAlertProps {
  message: string | null
}

export default function ErrorAlert(props: ErrorAlertProps) {
  if (!props.message || props.message === null) {
    return null
  }

  return (
    <div className="flex rounded-md bg-destructive text-destructive-foreground min-w-md overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-2 bg-background text-destructive dark:text-foreground p-2 border-r border-dashed border-destructive">
        <AlertCircle className="size-4" />
        <span className="text-sm font-medium">Error</span>
      </div>

      <div className="flex-grow p-2 min-w-0 relative">
        <p className="break-all text-sm line-clamp-2 pr-6">{decodeURIComponent(props.message)}</p>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-destructive"></div>
      </div>

      <div className="flex-shrink-0 relative">
        <button
          onClick={() => {}}
          className="h-full px-3 flex items-center justify-center bg-transparent hover:bg-destructive-foreground/10 transition-colors relative"
          title="Copy error message"
        >
          <Copy className="size-4" />
          {true && (
            <span className="absolute bg-background text-foreground text-xs px-2 py-1 rounded-md -top-8 left-1/2 transform -translate-x-1/2">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

