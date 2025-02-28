import { getAllOrganizationsAction } from "@/actions/organization/get-all-organizations.action";
import { runServerAction } from "@/lib/action-utils";
import { Skeleton } from "@workspace/ui/components/skeleton";
import OrgDropdown from "./org-dropdown";

export function OrgSelectorSkeleton() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <Skeleton className="w-[200px] h-8 rounded-md" />
      <Skeleton className="w-[80px] h-6 rounded-full" />
    </div>
  );
}

export default async function OrgSelector() {
  const organizations = await runServerAction(getAllOrganizationsAction);

  
  return (
    <div className="flex items-center gap-4 text-sm">
      <OrgDropdown
        organizations={organizations}
        placeholder="Select organization..."
        defaultValue={organizations[0]?.id}
      />
    </div>
  );
}
