import { CircleHelp } from "lucide-react";
import ThemeSwitcher from "@/_components/theme-switcher";

export default function Header() {
  return (
    <nav className="flex justify-between items-center w-full h-[3rem] border-b p-4">
      <p className="text-sm text-muted-foreground">Projects</p>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <CircleHelp className="size-4" />
      </div>
    </nav>
  );
}
