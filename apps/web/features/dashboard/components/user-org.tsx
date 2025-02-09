import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { Skeleton } from "@workspace/ui/components/skeleton";

import profileAction from "../actions/view-profile.action";

import OnboardingDialog from "@/features/onboarding/components/onboarding-dialog";

export function UserOrgSkeleton() {
  return <Skeleton className="w-[150px] h-3" />;
}

export default async function UserOrg() {
  const profile = await profileAction();

  if (profile.success === false) throw new Error(profile.error);

  if (profile?.success && profile.data.org_name === null)
    return <OnboardingDialog />;

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/dashboard">
        {profile?.success && profile.data.org_name?.toLowerCase()}
      </Link>
      <Badge className="text-muted-foreground rounded-full bg-background border-border">
        {profile?.success && profile.data.plan?.toLowerCase()}
      </Badge>
    </div>
  );
}
