"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowUpRight, Cog, Frame, LogOut } from "lucide-react";
import Link from "next/link";

import { signOutAction } from "@/actions/auth/sign-out.action";
import ErrorAlert from "@/_components/error-alert";
import LoadingIcon from "@/_components/loading-icon";
import { useServerAction } from "@/hooks/useServerAction";
import { routes } from "@/lib/routes";

export default function Sidebar(props: { classname?: string }) {
  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: useServerAction(signOutAction),
  });

  return (
    <div
      className={cn(
        "sticky top-0 hidden md:flex flex-col h-dvh w-[280px] border-r",
        props.classname,
      )}
    >
      <div className="flex items-center gap-6 h-[3rem] p-4 border-b">
        <p className="text-xl font-bold">Dashboard</p>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Projects</p>
        <Link
          href={routes.protected.dashboard}
          className="text-sm flex items-center gap-4 hover:text-muted-foreground"
        >
          <Frame className="size-4" />
          All Projects
        </Link>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Documentation</p>
        <Link
          href={routes.resources.docs}
          className="text-sm flex items-center gap-4 hover:text-muted-foreground"
        >
          <ArrowUpRight className="size-4" />
          Guides
        </Link>
        <Link
          href={routes.resources.api}
          className="text-sm flex items-center gap-4 hover:text-muted-foreground"
        >
          <ArrowUpRight className="size-4" />
          API Reference
        </Link>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Account</p>
        <Link
          href={routes.protected.settings}
          className="text-sm flex items-center gap-4 hover:text-muted-foreground"
        >
          <Cog className="size-4" />
          Settings
        </Link>
        <ErrorAlert message={(error as Error)?.message} />
        <Button
          disabled={isPending}
          variant={"ghost"}
          onClick={() => signOut()}
          className="m-0 p-0 text-sm flex items-center justify-start gap-4 hover:text-destructive hover:bg-background"
        >
          {!isPending ? <LogOut className="size-4" /> : <LoadingIcon />}
          Log out
        </Button>
      </div>
    </div>
  );
}
