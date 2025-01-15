"use server"

interface SignUpAction {
  email: string,
  password: string
}
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export default async function signUp(user: SignUpAction) {
  const { headers } = await import('next/headers')
  
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/signup", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
  
}