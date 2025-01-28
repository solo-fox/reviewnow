import Link from "next/link";
import { ArrowUpRight, Cog, LogOut, Frame } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col min-h-svh w-[280px] border-r">
      <div className="flex items-center h-[3rem] p-4 border-b">
        <p className="text-xl font-bold">Dashboard</p>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Projects</p>
        <Link href="#" className="text-sm flex items-center gap-4">
          <Frame className="size-4" />
          reviewnow
        </Link>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Documentation</p>
        <Link href="#" className="text-sm flex items-center gap-4">
          <ArrowUpRight className="size-4" />
          Guides
        </Link>
        <Link href="#" className="text-sm flex items-center gap-4">
          <ArrowUpRight className="size-4" />
          API Reference
        </Link>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Account</p>
        <Link href="#" className="text-sm flex items-center gap-4">
          <Cog className="size-4" />
          Settings
        </Link>
        <Link href="#" className="text-sm flex items-center gap-4">
          <LogOut className="size-4" />
          Log out
        </Link>
      </div>
    </div>
  );
}
