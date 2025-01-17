import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";
type SearchParamsObject = Record<string, string | number | boolean | null | undefined>;


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedRedirect(path: string, searchParams?: SearchParamsObject) {
  // If no search params, just redirect to the path
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return redirect(path);
  }

  // Create URLSearchParams instance
  const params = new URLSearchParams();

  // Add each search param with proper encoding
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, encodeURIComponent(String(value)));
    }
  });

  // Return redirect with path and encoded search params
  return redirect(`${path}?${params.toString()}`);
}

export function generateBreadcrumbs(path: string) {
  const pathParts = path.split('/').filter(Boolean);
  return pathParts.map((part, index) => {
    const href = `/${pathParts.slice(0, index + 1).join('/')}`;
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    return { href, label };
  });
}

