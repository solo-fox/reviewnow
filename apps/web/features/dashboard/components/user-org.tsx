"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import Alert from "@/_components/alert";
import { useAction } from "@/hooks/useAction";
import profileAction from "../actions/profile.action";
import { Skeleton } from "@workspace/ui/components/skeleton";
import OnboardingDialog from "@/features/onboarding/components/onboarding-dialog";

export default function UserOrg() {
  const {
    data: profile,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: useAction(profileAction),
    retry: 0,
  });

  if (isPending) return <Skeleton className="w-[150px] h-3" />;
  if (profile?.success && profile.data.org_name === null)
    return <OnboardingDialog />;

  return (
    <div className="flex items-center gap-4 text-sm">
      {isError ? (
        <Alert message={(error as Error).message} isError={isError} />
      ) : (
        <>
          <Link href="/dashboard">
            {profile?.success && profile.data.org_name?.toLowerCase()}
          </Link>
          <Badge className="text-muted-foreground rounded-full bg-background border-border">
            {profile?.success && profile.data.plan?.toLowerCase()}
          </Badge>
        </>
      )}
    </div>
  );
}
