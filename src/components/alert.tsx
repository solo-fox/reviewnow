"use client"

import { AlertCircle } from "lucide-react";
import {
  Alert as AlertUi,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useQueryState } from 'nuqs'

interface AlertProps {
  type: "warning" | "error";
}

export default function Alert({ type }: AlertProps) {
  const iconColor = type === "error" ? "text-red-600" : "text-yellow-600";
  const [message, _ ] = useQueryState('message', { defaultValue: "" })

  if(message.length === 0) return null
  
  return (
    <AlertUi variant={type === "error" ? "destructive" : "warning"}>
      <AlertCircle className={`size-4 ${iconColor}`} />
      <AlertTitle>{type === "error" ? "Error!" : "Warning!"}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </AlertUi>
  );
}
