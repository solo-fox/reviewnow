"use client";

import { Bell, CircleHelp } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/_components/theme-switcher";
import Logo from "@/_components/Logo";

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex justify-between items-center w-full h-[3rem] border-b p-4">
      <div className="flex gap-6 items-center">
        <Logo />
        <p className="text-muted-foreground">/</p>

        <p className="text-sm">solo-fox</p>

        {segments.map((segment, index) => (
          <div key={`${segment}-${index}`} className="flex items-center gap-6">
            <p className="text-muted-foreground">/</p>
            <p className="text-sm">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Bell className="size-4" />
        <CircleHelp className="size-4" />
      </div>
    </nav>
  );
}
