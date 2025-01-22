import Client from "database/server";
import { type NextRequest, NextResponse } from "next/server";
import routes from "./routes";
import { encodedRedirect } from "./utils";

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

  
  // Handle unauthenticated users trying to access protected routes
  if (request.nextUrl.pathname.startsWith(routes.protected.dashboard) && user.error) {
    return NextResponse.redirect(new URL(routes.auth.signin, request.url));
  }

  // Redirect unverified users to email verification
  if (request.nextUrl.pathname.startsWith(routes.protected.dashboard) && 
      !user.error && 
      user.data.user?.email_confirmed_at === null) {
    return NextResponse.redirect(new URL(routes.auth.verify, request.url));
  }

  // Redirect verified users away from verification page
  if (request.nextUrl.pathname === routes.auth.verify && 
      !user.error && 
      user.data.user?.email_confirmed_at !== null) {
    return NextResponse.redirect(new URL(routes.protected.dashboard, request.url));
  }

  // Redirect authenticated users away from auth pages
  if ((request.nextUrl.pathname === routes.auth.signin || 
       request.nextUrl.pathname === routes.auth.signup) && 
      !user.error) {
    return NextResponse.redirect(new URL(routes.protected.dashboard, request.url));
  }

  // Redirect users trying to access dashboard without an org_name
  if (request.nextUrl.pathname.startsWith(routes.protected.dashboard) && !user.error && user.data.user.id) {
    const {data, error} = await supabase.from("profiles").select("onboarding_complete").eq("id", user.data.user.id).single()
    if(error) {
       return encodedRedirect(routes.auth.signin, {
         message: "Something went wrong. Please try again later.",
         type: "error"
       })
    }
    
    if(data?.onboarding_complete === false) {
      return NextResponse.redirect(new URL(routes.auth.onboarding, request.url));
    }
  }

  return response;
};
