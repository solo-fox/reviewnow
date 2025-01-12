"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signUpFormSchema from "../schemas/signup-form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link"
import useSignUp from "../hooks/use-signup"
import { Button } from "@/components/ui/button";
import LoadingIcon from "@/components/loading-icon";
import { useState } from "react";

export default function SignUpForm() {
  const [pending, setPending] = useState<boolean>(false);
  
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const signUp = useSignUp(setPending);

  return (
    <Form {...signUpForm} >
      <form onSubmit={signUpForm.handleSubmit(signUp)} className="space-y-8">
        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
                <Input placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} className="w-full" type="submit" >
          {pending ? <LoadingIcon /> : ""} <p>Create a free account</p>
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
