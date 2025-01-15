import Client from "database/server";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = Client({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) =>
        request.cookies.set(name, value),
      );
      response = NextResponse.next({
        request,
      });
      cookiesToSet.forEach(({ name, value, options }) =>
        response.cookies.set(name, value, options),
      );
    },
  });

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const user = await supabase.auth.getUser();

  // protected routes
  if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (request.nextUrl.pathname === "/" && !user.error) {
    return NextResponse.redirect(new URL("/protected", request.url));
  }

  return response;
};
