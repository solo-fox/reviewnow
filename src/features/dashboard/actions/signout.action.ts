"use server"

import { createClient } from "@/lib/server";

export default async function signOut() {

  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
}