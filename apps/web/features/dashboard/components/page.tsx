import { Suspense } from "react";

import PageHeader from "./page-header";
import Projects, { ProjectsSkeleton } from "./projects";

import { ErrorBoundary } from "@/_components/error-boundary";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader />
      <ErrorBoundary>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
