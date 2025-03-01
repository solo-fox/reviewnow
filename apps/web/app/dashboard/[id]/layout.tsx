import LayoutNav from "@/features/dashboard-layout/components/layout-nav";
import Sidebar from "@/features/dashboard-layout/components/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
