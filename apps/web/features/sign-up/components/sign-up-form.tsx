"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUpAction } from "@/actions/auth/sign-up.action";
import OAuthButton from "@/_components/oauth-button";

import ErrorAlert from "@/_components/error-alert";
import LoadingIcon from "@/_components/loading-icon";
import { useServerAction } from "@/hooks/useServerAction";
import {SignUpSchema} from "../schema/sign-up.schema";
import {routes} from "@/lib/routes"

export default function SignUpForm() {
  const signUpForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation<
    { redirectTo: string },
    Error,
    { email: string; password: string; }
  >({
    mutationFn: useServerAction(signUpAction),
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    signUp(values);
  }

  return (
    <Card className="w-2/5">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
        <CardDescription className="text-balance text-sm">
          Create an account to get started.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <ErrorAlert message={(error as Error)?.message} />
        <Form {...signUpForm}>
          <form
            method="post"
            onSubmit={signUpForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-center"
          >
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? <LoadingIcon /> : "Sign up"}
            </Button>
          </form>
        </Form>

        <OAuthButton />

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href={routes.auth.signin} className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}