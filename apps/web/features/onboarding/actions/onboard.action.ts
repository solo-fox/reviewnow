"use server";

interface OnboardAction {
  org_name: string;
}
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export default async function onboardAction(user: OnboardAction) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (session.error) {
    return encodedRedirect(routes.auth.onboarding, {
      message: session.error.message,
      type: "error",
    });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ org_name: user.org_name, onboarding_complete: true })
    .eq("id", session.data.user.id);

  if (error) {
    return encodedRedirect(routes.auth.onboarding, {
      message: error.message,
      type: "error",
    });
  }

  return encodedRedirect(routes.protected.dashboard);
}
