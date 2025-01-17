"use server"

interface SignInAction {
  email: string,
  password: string
}
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function signInAction(user: SignInAction) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password
  });

  if (error) {
    return redirect(`${routes.auth.signin}?message=${error.message}&type=error`);
  }

  return redirect(routes.protected.dashboard);

}