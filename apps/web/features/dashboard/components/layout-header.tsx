import { Bell, CircleHelp } from "lucide-react";
import { Suspense } from "react";

import Breadcrumb from "./breadcrumb";
import MobileSidebar from "./mobile-sidebar";
import UserOrg, { UserOrgSkeleton } from "./user-org";

import Logo from "@/_components/Logo";
import { ErrorBoundary } from "@/_components/error-boundary";
import ThemeSwitcher from "@/_components/theme-switcher";

export default function LayoutHeader() {
  return (
    <nav className="flex justify-between items-center w-full h-[3rem] border-b p-4 gap-6">
      <div className="flex items-center">
        <MobileSidebar />
        <Logo />
      </div>

      <div className="hidden md:flex flex-grow gap-6 items-center">
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
        <CircleHelp className="hidden md:block size-4" />
      </div>
    </nav>
  );
}
