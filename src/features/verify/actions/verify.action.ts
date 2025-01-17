"use server";

import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function verifyAction() {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    return encodedRedirect(routes.auth.verify, {
      message: user.error.message,
      typw: "error",
    });
  }

  if (!user.data.user?.email) {
    return encodedRedirect(routes.auth.verify, {
      message: "No Email was found",
      type: "error",
    });
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: user.data.user?.email,
    options: {
      emailRedirectTo: routes.api.auth.callback,
    },
  });

  if (error) {
    return encodedRedirect(routes.auth.verify, {
      message: error.message,
      type: "error",
    });
  }

  return encodedRedirect(routes.auth.verify, {
    message: "Email sent successfully",
    type: "success",
  });
}
