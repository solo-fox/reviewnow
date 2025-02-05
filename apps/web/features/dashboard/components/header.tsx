import { Bell, CircleHelp } from "lucide-react";
import ThemeSwitcher from "@/_components/theme-switcher";
import Logo from "@/_components/Logo";
import Breadcrumb from "./breadcrumb";
import UserOrg, { UserOrgSkeleton } from "./user-org";
import { Suspense } from "react";
import { ErrorBoundary } from "@/_components/error-boundary";

export default function Header() {
  return (
    <nav className="flex justify-between items-center w-full h-[3rem] border-b p-4">
      <div className="flex flex-grow gap-6 items-center">
        <Logo />
        <p className="text-muted-foreground">/</p>
        
        <ErrorBoundary>
          <Suspense fallback={<UserOrgSkeleton />}>
            <UserOrg />
          </Suspense>
        </ErrorBoundary>

        <Breadcrumb />
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Bell className="size-4" />
        <CircleHelp className="size-4" />
      </div>
    </nav>
  );
}
