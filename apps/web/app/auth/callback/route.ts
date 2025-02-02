import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const errorUrl = new URL(routes.error);
      errorUrl.searchParams.set("message", error.message);
      return Response.redirect(errorUrl.toString(), 302);
    }

    return Response.redirect(routes.protected.dashboard, 302);
  }

  return Response.redirect(routes.auth.signin, 302);
}
