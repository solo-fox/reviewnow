"use server"

interface SignInAction {
  email: string,
  password: string
}
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function signIn(user: SignInAction) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password
  });

  if (error) {
    return encodedRedirect("/signin", error.message);
  }

  return redirect("/dashboard");

}