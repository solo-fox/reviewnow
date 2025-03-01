"use client";

import { usePathname } from "next/navigation";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";

export default function UriBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const firstSegment = segments[0] || "";

  if (!firstSegment) return null;

  const label = firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);

  return (
    <Breadcrumb className="hidden md:block flex-grow">
      <BreadcrumbList>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink>{label}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
