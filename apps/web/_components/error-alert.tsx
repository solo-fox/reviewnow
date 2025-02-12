"use client";

import { AlertCircle, Copy } from "lucide-react";

interface ErrorAlertProps {
  message: string | null;
}

export default function ErrorAlert(props: ErrorAlertProps) {
  if (!props.message || props.message === null) {
    return null;
  }

  return (
    <div className="flex rounded-md bg-destructive text-destructive-foreground min-w-sm max-w-md overflow-hidden">
      <div className="relative flex-shrink-0 flex items-center gap-2 bg-background text-destructive dark:text-foreground p-2 border border-dashed border-destructive">
        <AlertCircle className="size-4" />
        <span className="text-sm font-medium">Error</span>
      </div>

      <div className="flex-grow p-2 min-w-0 relative">
        <p className="break-all text-sm line-clamp-2 pr-6">
          {decodeURIComponent(props.message)}
        </p>
      </div>
    </div>
  );
}
