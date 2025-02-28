import LayoutNav from "@/features/dashboard-layout/components/layout-nav";
import Sidebar from "@/features/dashboard-layout/components/sidebar";
import { runServerAction } from "@/lib/action-utils";
import { isUserOnboardedAction } from "@/actions/auth/is-user-onboarded.action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await runServerAction(isUserOnboardedAction)
  
  return (
    <div className="min-h-dvh w-full flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <LayoutNav />
        {children}
      </div>
    </div>
  );
}
