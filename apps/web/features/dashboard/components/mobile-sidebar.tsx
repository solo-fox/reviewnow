"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import Sidebar from "./sidebar";

export default function MobileSidebar() {
  return (
    <Drawer>
      <DrawerTrigger className="block md:hidden" asChild>
        <Button size="icon" variant="ghost">
          <Menu className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Sidebar classname="flex w-full h-fit" />
      </DrawerContent>
    </Drawer>
  );
}
