import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedRedirect(
  path: string,
  message: string,
) {
  return redirect(`${path}?message=${encodeURIComponent(message)}`);
}
