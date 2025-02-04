"use client";

import { AlertCircle } from "lucide-react";

export default function ErrorAlert(props: { message: string }) {
  if (!props.message) return null;

  return (
    <div className="flex flex-nowrap gap-2 w-full h-full max-w-md p-0 bg-destructive text-destructive-foreground rounded-md">
      <p className="flex items-center gap-2 bg-background text-destructive p-0 m-0 border border-dashed border-destructive px-2 rounded-l-md">
        <AlertCircle className="size-4" />
        Error
      </p>

      <div className="p-0 m-0 truncate">
        <p>{decodeURIComponent(props.message)}</p>
      </div>
    </div>
  );
}
