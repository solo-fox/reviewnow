import { Bell, CircleHelp } from "lucide-react";
import { Suspense } from "react";

import MobileSidebar from "./mobile-sidebar";
import OrgSelector, { OrgSelectorSkeleton } from "./org-selector";

import Logo from "@/_components/logo";
import { ErrorBoundary } from "@/_components/error-boundary";
import ThemeSwitcher from "@/_components/theme-switcher";
import UriBreadcrumb from "@/_components/uri-breadcrumb";

export default function LayoutNav() {
  return (
    <nav className="sticky top-0 flex justify-between items-center w-full h-[3rem] border-b p-4 gap-6 bg-background">
      <div className="flex items-center">
        <MobileSidebar />
        <Logo />
      </div>

      <div className="hidden md:flex flex-grow items-center">
        <ErrorBoundary>
          <Suspense fallback={<OrgSelectorSkeleton />}>
            <OrgSelector />
          </Suspense>
        </ErrorBoundary>

        <UriBreadcrumb />
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Bell className="size-4" />
        <CircleHelp className="hidden md:block size-4" />
      </div>
    </nav>
  );
}
