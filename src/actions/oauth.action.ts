"use server";

import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: routes.api.auth.callback,
    },
  });
  
  if(error) {
    return encodedRedirect(routes.auth.signup, {
      message: error.message,
      type: "error"
    })
  }

  if (data.url) {
    return encodedRedirect(data?.url);
  }
}
