"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import {
  Alert as AlertUi,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

interface AlertProps {
  message: string;
  isError: boolean;
}

export default function Alert({ message, isError }: AlertProps) {
  if (!message) return null;

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
