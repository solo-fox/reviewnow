import Sidebar from "./sidebar";
import Header from "./header";
import Projects from "./projects";

export default function DashboardPage() {
  return (
    <div className="min-h-svh w-full bg-background flex">
      <Sidebar />
      <div className="flex flex-col w-full min-h-svh">
        <Header />
        <Projects />
      </div>
    </div>
  );
}
