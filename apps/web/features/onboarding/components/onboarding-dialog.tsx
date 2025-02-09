"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";

import ProjectSetup from "./project-setup";

export default function OnboardingDialog() {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-[500px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="font-bold text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Let us finish this.
          </DialogTitle>
        </DialogHeader>
        <ProjectSetup />
      </DialogContent>
    </Dialog>
  );
}
