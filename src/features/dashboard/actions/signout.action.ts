"use server"

import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export default async function signOut() {

  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  return encodedRedirect(routes.auth.signin)
}