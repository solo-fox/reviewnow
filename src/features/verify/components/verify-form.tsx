"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Alert from "@/components/alert";
import { MailCheck } from "lucide-react";
import { useActionState } from "react";
import verifyAction from "../actions/verify.action";

const formSchema = z.object({});

export default function VerifyForm() {
  const [_, formAction, isPending] = useActionState(verifyAction, null);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const isButtonDisabled = isPending || countdown > 0;

  function onSubmit(values: z.infer<typeof formSchema>) {
    formAction(new FormData());
    setCountdown(40);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Activate your account
        </CardTitle>
        <CardDescription className="text-balance text-sm ">
          A confirmation email has been sent to your email address.
          Please check your inbox and follow the instructions to verify your
          account.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <Alert />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="resend"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      type="submit"
                      disabled={isButtonDisabled}
                      className="w-full"
                      {...field}
                    >
                      {isPending || countdown > 0 ? (
                        <LoadingIcon className="mr-2" />
                      ) : null}
                      {countdown > 0
                        ? `Wait ${countdown}s to resend`
                        : "Resend Confirmation Email"}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
