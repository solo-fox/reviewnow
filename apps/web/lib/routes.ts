const routes = {
  base: process.env.NEXT_PUBLIC_SITE_URL,
  error: "/error",
  home: "/",
  api: {
    auth: {
      callback: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  },
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
  },
  protected: {
    dashboard: "/dashboard",
    project: (id: string) => `/project/${id}`,
  },
  resources: {
    docs: "#",
    contact: "#",
    help: "#",
  },
};

export default routes;
