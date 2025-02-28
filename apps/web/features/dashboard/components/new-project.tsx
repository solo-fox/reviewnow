"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import createProjectSchema from "../schema/create-project.schema";

import { createProjectAction } from "@/actions/project/create-project.action";
import ErrorAlert from "@/_components/error-alert";
import LoadingIcon from "@/_components/loading-icon";
import { useServerAction } from "@/hooks/useServerAction";
import randomProjectName from "@/lib/projectnames";

export default function NewProject() {
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectDescription: "My lovely project",
      projectName: randomProjectName(),
    },
  });
  const { toast } = useToast();

  const {
    mutate: createProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: useServerAction(createProjectAction),
    onSuccess: () => {
      toast({
        title: "Project created",
      });
    },
  });

  function onSubmit(values: z.infer<typeof createProjectSchema>) {
    createProject({
      orgId: "",
      projectName: values.projectName,
      projectDescription: values.projectDescription,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>New project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Project ⚡️</DialogTitle>
          <DialogDescription>
            You can change the name of your project later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <ErrorAlert message={(error as Error)?.message} />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? <LoadingIcon /> : <Plus />} Create a new Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
