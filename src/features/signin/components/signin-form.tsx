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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import signInAction from "../actions/signin.action";
import LoadingIcon from "@/components/loading-icon";
import Alert from "@/components/alert";
import routes from "@/lib/routes";
import OAuthButton from "@/components/oauth-button";

export default function SignInForm() {
  const [pending, setPending] = useState<boolean>(false);

  const signInForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      terms_accepted: true,
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
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription className="text-balance text-sm">
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <Alert />
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-center"
          >
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
          </form>
        </Form>

        <OAuthButton />

        <div className="text-center text-sm">
          Do not have an account?{" "}
          <Link
            href={routes.auth.signup}
            className="underline underline-offset-4"
          >
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
