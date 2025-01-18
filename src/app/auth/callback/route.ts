import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign up process completes
  if (!next) {
    return NextResponse.redirect(`${routes.base}${routes.protected.dashboard}`);
  } else {
    return NextResponse.redirect(`${routes.base}${next}`);
  }
}
