import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import logger from "@workspace/logger";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      logger.error(error);
      const errorUrl = new URL(routes.error, routes.base);
      errorUrl.searchParams.set("message", error.message);
      return Response.redirect(errorUrl.toString(), 302);
    }

    return Response.redirect(
      new URL(routes.protected.dashboard, routes.base),
      302,
    );
  }

  return Response.redirect(new URL(routes.auth.signin, routes.base), 302);
}
