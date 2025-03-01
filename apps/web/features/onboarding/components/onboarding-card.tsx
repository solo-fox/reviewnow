"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@workspace/ui/hooks/use-toast";

import onboardingSchema from "../schema/onboarding.schema";
import { onboardUserWithProjectAction } from "@/actions/auth/onboard-user-with-project.action";
import { useServerAction } from "@/hooks/useServerAction";
import ErrorAlert from "@/_components/error-alert";
import LoadingIcon from "@/_components/loading-icon";
import randomProjectName from "@/lib/projectnames";

export default function OnboardingCard() {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      orgName: "",
      projectName: randomProjectName(),
    },
  });

  const { toast } = useToast();

  const {
    mutate: onboard,
    isPending,
    error,
  } = useMutation({
    mutationFn: useServerAction(onboardUserWithProjectAction),
    onSuccess: () => {
      toast({ title: "Project created" });
    },
  });

  function onSubmit(values: z.infer<typeof onboardingSchema>) {
    onboard({
      orgName: values.orgName,
      projectName: values.projectName,
    });
  }

  return (
    <Card className="w-2/5">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Let us finish this.
        </CardTitle>
        <CardDescription className="text-balance text-sm">
          You are required to have at least one org.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ErrorAlert message={(error as Error)?.message} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? <LoadingIcon /> : <Plus />} Create a Project
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
