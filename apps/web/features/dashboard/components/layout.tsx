import LayoutHeader from "./layout-header";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
