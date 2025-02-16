import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { Skeleton } from "@workspace/ui/components/skeleton";

import { findProfile } from "@/actions/profile/find.action";
import OnboardingDialog from "@/features/onboarding/components/onboarding-dialog";
import { runServerAction } from "@/lib/action-utils";

export function UserOrgSkeleton() {
  return <Skeleton className="w-[150px] h-3" />;
}

export default async function UserOrg() {
  const profile = await runServerAction(findProfile);

  if (profile.org_name === null) return <OnboardingDialog />;

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/dashboard">{profile.org_name.toLowerCase()}</Link>
      <Badge className="text-muted-foreground rounded-full bg-background border-border">
        {profile.plan.toLowerCase()}
      </Badge>
    </div>
  );
}
