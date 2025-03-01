import { ErrorBoundary } from "@/_components/error-boundary";
import OrgSelector, {
  OrgSelectorSkeleton,
} from "@/features/dashboard-layout/components/org-selector";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";

export default function DashboardSelectOrgPage() {
  return (
    <div className="fullscreen-centered">
      <div className="dotted-background"></div>
      <Card className="w-2/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Select an Organization</CardTitle>
          <CardDescription className="text-balance text-sm">
            Choose an organization to continue managing your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 items-center justify-center">
          <ErrorBoundary>
            <Suspense fallback={<OrgSelectorSkeleton />}>
              <OrgSelector />
            </Suspense>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
