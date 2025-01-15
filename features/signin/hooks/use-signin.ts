import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/client";
import authSchema from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function useSignIn(setPending: (arg: boolean) => void) {
  const { toast } = useToast()
  const router = useRouter()
  
  return async function signUp(
    values: z.infer<typeof authSchema>,
    event?: React.BaseSyntheticEvent,
  ) {
    setPending(true)
    event?.preventDefault();

    try {
      const client = createClient();
      

      await client.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      setPending(false)
      toast({
        title: "Account created successfully!",
        description: "You can now log in with your new account."
      });
      router.push('/protected')
    } catch (error: any) {
      setPending(false)
      toast({
        title: "Cannot create an account.",
        description: error.message,
        variant: "destructive",
      });
    }
  };
}
