"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import {
  Alert as AlertUi,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { useQueryState } from "nuqs";
export default function Alert() {
  const [message] = useQueryState("message", { defaultValue: "" });
  const [type] = useQueryState("type", { defaultValue: "success" });

  if (message.length === 0) return null;

  const isError = type === "error";
  const title = isError ? "Error" : "Success";

  return (
    <AlertUi variant={isError ? "destructive" : "default"}>
      {isError ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{decodeURIComponent(message)}</AlertDescription>
    </AlertUi>
  );
}
