import { Suspense } from "react";

import PageHeader from "./page-header";
import Projects, { ProjectsSkeleton } from "./projects";

import { ErrorBoundary } from "@/_components/error-boundary";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 h-full p-4">
      <PageHeader />
      <ErrorBoundary>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
