"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { ShieldAlert } from "lucide-react";

export default function DangerZoneSection() {
  const [deleteProfileText, setDeleteProfileText] = useState("");
  const [deleteProjectsText, setDeleteProjectsText] = useState("");

  return (
    <Card className="md:flex-row flex-col flex items-stretch border-red-500 border-2">
      <CardHeader className="flex flex-col justify-center flex-1 space-y-1 p-6 ">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <CardTitle className="text-2xl">Danger Zone</CardTitle>
        </div>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center flex-1 p-6">
        <div className="space-y-4 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete your profile?
                </DialogTitle>
                <DialogDescription>
                  This action is irreversible. Please type "delete my profile"
                  to confirm.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={deleteProfileText}
                onChange={(e) => setDeleteProfileText(e.target.value)}
                placeholder="Type 'delete my profile'"
              />
              <DialogFooter>
                <Button
                  variant="destructive"
                  disabled={deleteProfileText !== "delete my profile"}
                >
                  Delete Profile
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete All Projects
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete ALL your projects?
                </DialogTitle>
                <DialogDescription>
                  This action is irreversible. Please type "delete ALL my
                  projects" to confirm.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={deleteProjectsText}
                onChange={(e) => setDeleteProjectsText(e.target.value)}
                placeholder="Type 'delete ALL my projects'"
              />
              <DialogFooter>
                <Button
                  variant="destructive"
                  disabled={deleteProjectsText !== "delete ALL my projects"}
                >
                  Delete All Projects
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
