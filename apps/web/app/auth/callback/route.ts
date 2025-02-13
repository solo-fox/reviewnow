import logger from "@workspace/logger";

import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

export const GET = async (request: Request) => {
  const requestUrl = new URL(request.url),
    code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient(),
      { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      logger.error(error);
      const errorUrl = new URL(routes.error(error.message), routes.base);
      return Response.redirect(errorUrl.toString(), 302);
    }

    return Response.redirect(
      new URL(routes.protected.dashboard, routes.base),
      302,
    );
  }

  return Response.redirect(new URL(routes.auth.signin, routes.base), 302);
};
