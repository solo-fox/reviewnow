import Sidebar from "./sidebar";
import Header from "./header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh w-full bg-background flex">
      <Sidebar />
      <div className="flex flex-col w-full min-h-svh">
        <Header />
        {children}
      </div>
    </div>
  );
}
