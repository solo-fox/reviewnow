"use server"

import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function verifyAction() {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if(user.error) {
    return redirect(`${routes.auth.verify}?message=${user.error.message}`);
  }

  if(!user.data.user?.email) {
    return redirect(`${routes.auth.verify}?message=No Email was found`);
  }
  
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user.data.user?.email,
    options: {
      emailRedirectTo: routes.api.auth.callback
    }
  })

  if (error) {
    return redirect(`${routes.auth.verify}?message=${error.message}&type=error`);
  }

  return redirect(`${routes.auth.verify}?message=${encodeURIComponent("Email sent successfully")}&type=success`); 
}