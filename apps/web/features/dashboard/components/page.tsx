import { Suspense } from "react";

import PageHeader from "./page-header";
import Projects, { ProjectsSkeleton } from "./projects";

import { ErrorBoundary } from "@/_components/error-boundary";

interface DashboardPageProps {
  searchParams?: Promise<{
    searchquery?: string;
  }>;
}

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.searchquery || "";

  return (
    <div className="flex flex-col h-full">
      <PageHeader />
      <ErrorBoundary>
        <Suspense key={searchQuery} fallback={<ProjectsSkeleton />}>
          <Projects searchQuery={searchQuery} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
