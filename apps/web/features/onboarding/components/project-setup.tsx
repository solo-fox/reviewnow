import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import onboardSchema from "../schema/onboard.schema";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import onboardAction from "../actions/onboard.action";
import { useAction } from "@/hooks/useAction";
import ErrorAlert from '@/_components/error-alert';
import LoadingIcon from "@/_components/loading-icon";

export default function ProjectSetup() {
  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
    defaultValues: {
      orgName: "",
      projectName: "",
    },
  });

  const {
    mutate: onboard,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: useAction(onboardAction),
  });

  function onSubmit(values: z.infer<typeof onboardSchema>) {
    onboard({
      orgName: values.orgName,
      projectName: values.projectName,
    });
  }

  return (
    <Form {...form}>
      <ErrorAlert message={(error as Error)?.message as string}  />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Lovely Org" {...field} />
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
                <Input placeholder="My Awesome Project" {...field} />
              </FormControl>
              <FormDescription>You can change this later.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? <LoadingIcon /> : <Plus />} Create a new Project
        </Button>
      </form>
    </Form>
  );
}
