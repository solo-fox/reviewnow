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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingIcon from "@/components/loading-icon";
import { useState } from "react";
import authSchema from "@/schemas/auth.schema";
import signUpAction from "../actions/signup.action"
import Alert from "@/components/alert"
import routes from "@/lib/routes";
import OAuthButton from "@/components/oauth-button"

export default function SignUpForm() {
  const [pending, setPending] = useState<boolean>(false);
  
  
  const signUpForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authSchema>, event?: React.BaseSyntheticEvent) {
    event?.preventDefault()
    setPending(true)
    await signUpAction({
      email: values.email,
      password: values.password
    })
    setPending(false)
  }

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email and password to create a new account
          </p>
        </div>

        <Alert /> 

        <div className="grid gap-6">
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

          <Button disabled={pending} className="w-full" type="submit">
            {pending ? <LoadingIcon /> : ""} <p>Create a free account</p>
          </Button>

          <OAuthButton />
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href={routes.auth.signin} className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
