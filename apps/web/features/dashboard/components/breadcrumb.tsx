"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname(),
    segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="hidden md:block">
      {segments.map((segment, index) => (
        <div key={`${segment}-${index}`} className="flex items-center gap-6">
          <p className="text-muted-foreground">/</p>
          <p className="text-sm">
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </p>
        </div>
      ))}
    </div>
  );
}
