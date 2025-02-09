import LayoutHeader from "./layout-header";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh w-full bg-background flex">
      <Sidebar />
      <div className="flex flex-col w-full min-h-svh">
        <LayoutHeader />
        {children}
      </div>
    </div>
  );
}
