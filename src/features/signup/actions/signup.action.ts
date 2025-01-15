"use server"

interface SignUpAction {
  email: string,
  password: string
}
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export default async function signUp(user: SignUpAction) {
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
    return encodedRedirect("/signup", error.message);
  } else {
    return redirect("/signin")
  }
  
}