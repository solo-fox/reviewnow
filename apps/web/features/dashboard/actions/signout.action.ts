"use server";

import ServerActionReturn from "@/_types/server-actions";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { AppError } from "@workspace/error";

export default async function signOutAction(): Promise<
  ServerActionReturn<undefined>
> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      error: new AppError(error, error.message),
      data: undefined,
      redirect: false,
      url: undefined,
    };
  }
  return {
    success: true,
    error: undefined,
    data: undefined,
    redirect: true,
    url: routes.protected.dashboard,
  };
}
