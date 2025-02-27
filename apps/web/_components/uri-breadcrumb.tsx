"use client";

import { usePathname } from "next/navigation";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";

export default function UriBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <Breadcrumb className="hidden md:block flex-grow">
      <BreadcrumbList>
        <BreadcrumbSeparator>
          <Slash className="size-4" />
        </BreadcrumbSeparator>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <BreadcrumbItem key={`${segment}-${index}`}>
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              )}
              {!isLast && (
                <BreadcrumbSeparator>
                  <Slash className="size-4" />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
