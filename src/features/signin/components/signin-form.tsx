"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import authSchema from "@/schemas/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import signInAction from "../actions/signin.action";
import { Button } from "@/components/ui/button";
import LoadingIcon from "@/components/loading-icon";
import { useState } from "react";
import Alert from "@/components/alert";
import routes from "@/lib/routes";
import OAuthButton from "@/components/oauth-button"

export default function SignInForm() {
  const [pending, setPending] = useState<boolean>(false);

  const signInForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof authSchema>,
    event?: React.BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    setPending(true);
    await signInAction({
      email: values.email,
      password: values.password,
    });
    setPending(false);
  }

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email and password to login to your account
          </p>
        </div>

        <Alert />

        <div className="grid gap-6">
          <FormField
            control={signInForm.control}
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
            control={signInForm.control}
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
          
          
          <Button disabled={pending} className="w-full" type="submit">
            {pending ? <LoadingIcon /> : ""} <p>Login to your account</p>
          </Button>

          <OAuthButton />
        </div>

        <div className="text-center text-sm">
          Do not have an account?{" "}
          <Link
            href={routes.auth.signup}
            className="underline underline-offset-4"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}
