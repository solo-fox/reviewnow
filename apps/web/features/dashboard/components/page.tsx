import { Suspense } from "react";
import Projects, { ProjectsSkeleton } from "./projects";
import { ErrorBoundary } from "@/_components/error-boundary";
import PageHeader from "./page-header";

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
