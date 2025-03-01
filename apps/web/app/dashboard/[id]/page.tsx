import { Suspense } from "react";

import Header from "@/features/dashboard/components/header";
import Projects, { ProjectsSkeleton } from "@/features/dashboard/components/projects";

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
    <div className="fullscreen-base">
      <Header />
      {/* <ErrorBoundary>
        <Suspense key={searchQuery} fallback={<ProjectsSkeleton />}>
          <Projects searchQuery={searchQuery} />
        </Suspense>
      </ErrorBoundary>
      */}
    </div>
  );
}
