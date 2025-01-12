"use client";

import { z } from "zod";
import signUpFormSchema from "../schemas/signup-form.schema";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/client";
import { User } from "database/models";

export default function useSignUp(setPending: (arg: boolean) => void) {
  const { toast } = useToast();

  return async function signUp(
    values: z.infer<typeof signUpFormSchema>,
    event?: React.BaseSyntheticEvent
  ) {
    setPending(true)
    event?.preventDefault();

    try {
      const client = createClient();
      const user = new User(client);

      await user.signUp({
        email: values.email,
        password: values.password,
      });
      setPending(false)
      toast({
        title: "Account created successfully!",
        description: "You can now log in with your new account."
      });
    } catch (error: any) {
      setPending(false)
      toast({
        title: "Cannot create an account",
        description: error.message,
        variant: "destructive",
      });
    }
  };
}
