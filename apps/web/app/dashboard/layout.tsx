import LayoutHeader from "@/features/organization/components/l";
import Sidebar from "./sidebar";
import { runServerAction } from "@/lib/action-utils";
import { isUserOnboarded } from "@/actions/auth/is-user-onboarded.action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await runServerAction(isUserOnboarded)
  
  return (
    <div className="min-h-dvh w-full flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <LayoutHeader />
        {children}
      </div>
    </div>
  );
}
