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

import authSchema from "../schema/auth.schema";

import OAuthButton from "./oauth-button";

import ErrorAlert from "@/_components/error-alert";
import LoadingIcon from "@/_components/loading-icon";
import { AsyncAction, useServerAction } from "@/hooks/useServerAction";
import { ServerActionResult } from "@/lib/action-utils";

interface AuthFormProps {
  action: AsyncAction<
    { email: string; password: string },
    ServerActionResult<{ redirectTo: string }>
  >;
  header: string;
  buttonText: string;
  link: string;
  linkText: string;
}

export default function AuthForm(props: AuthFormProps) {
  const authForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: auth,
    isPending,
    error,
  } = useMutation<
    { redirectTo: string },
    Error,
    { email: string; password: string }
  >({
    mutationFn: useServerAction(props.action),
  });

  function onSubmit(values: z.infer<typeof authSchema>) {
    auth({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{props.header}</CardTitle>
        <CardDescription className="text-balance text-sm">
          Enter your email and password to let the magic happen.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <ErrorAlert message={(error as Error)?.message} />
        <Form {...authForm}>
          <form
            method="post"
            onSubmit={authForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-center"
          >
            <FormField
              control={authForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={authForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? <LoadingIcon /> : ""} <p>Sign in to your account.</p>
            </Button>
          </form>
        </Form>

        <OAuthButton />

        <div className="text-center text-sm">
          {props.buttonText}{" "}
          <Link href={props.link} className="underline underline-offset-4">
            {props.linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
