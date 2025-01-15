"use server"

interface SignUpAction {
  email: string,
  password: string
}
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function signUp(user: SignUpAction) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect("/signup", error.message);
  } else {
    return redirect("/signin")
  }
  
}