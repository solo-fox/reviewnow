"use server";

import ServerActionReturn from "@/_types/server-actions";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { AppError } from "@workspace/error";

export async function signInWithGitHub(): Promise<
  ServerActionReturn<undefined>
> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: routes.api.auth.callback,
    },
  });

  if (error) {
    return {
      data: undefined,
      success: false,
      error: new AppError(error, error.message),
      url: undefined,
      redirect: false,
    };
  }

  return {
    data: undefined,
    success: true,
    error: undefined,
    url: data.url,
    redirect: true,
  };
}
