"use server";

import { createClient } from "@/lib/server";
import ServerActionReturn from "@/_types/server-actions";
import routes from "@/lib/routes";
import { AppError } from "@workspace/error";

export default async function signUpAction(user: {
  email: string;
  password: string;
}): Promise<ServerActionReturn<undefined>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

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
