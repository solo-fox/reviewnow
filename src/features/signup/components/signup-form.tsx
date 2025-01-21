"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import authSchema from "@/schemas/auth.schema";
import signUpAction from "../actions/signup.action";
import Alert from "@/components/alert";
import routes from "@/lib/routes";
import OAuthButton from "@/components/oauth-button";
import LoadingIcon from "@/components/loading-icon";
import Link from "next/link";

export default function SignUpForm() {
  const [pending, setPending] = useState<boolean>(false);

  const signUpForm = useForm<z.infer<typeof authSchema>>({
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
    await signUpAction({
      email: values.email,
      password: values.password,
    });
    setPending(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-balance text-sm">
          Enter your email and password to create a new account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <Alert />
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <FormField
              control={signUpForm.control}
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
              control={signUpForm.control}
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
          </form>
        </Form>

        <Button disabled={pending} className="w-full" type="submit">
          {pending ? <LoadingIcon /> : ""} <p>Create a free account</p>
        </Button>

        <OAuthButton />

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href={routes.auth.signin}
            className="underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
