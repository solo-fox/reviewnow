import { env } from "@/env";

export const routes = {
  base: env.NEXT_PUBLIC_SITE_URL,
  home: "/",
  error: (message: string) => `/error?=${encodeURIComponent(message)}`,
  auth: {
    signin: "/sign-in",
    signup: "/sign-up",
    onboarding: "/onboarding"
  },
  protected: {
    dashboard: "/dashboard",
    settings: "/dashboard/settings",
    project: (id: string) => `/project/${encodeURIComponent(id)}`,
  },
  api: {
    auth: {
      callback: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  },
  resources: {
    api: "#",
    docs: "#",
    contact: "#",
    help: "#",
  },
};
