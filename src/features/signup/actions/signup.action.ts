"use server"

interface SignUpAction {
  email: string,
  password: string
}
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function signUp(user: SignUpAction) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      emailRedirectTo: routes.api.auth.callback
    },
  });

  if (error) {
    return redirect(`${routes.auth.signup}?message=${error.message}`);
  } else {
    return redirect(routes.auth.signin)
  }
  
}