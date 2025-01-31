const err = {
  database: {
    profile: {
      show: {
        404: "Profile not found. Try again later. If the problem persists, contact support.",
        500: "There was an error retrieving the profile. Try again later. If the problem persists, contact support.",
      },
    },
  },

  web: {
    auth: {
      oauth: {
        500: "Cannot sign in with GitHub. Try again later. If the problem persists, contact support.",
      },
      cookies: {
        500: "Cannot set cookies. Try again later. If the problem persists, contact support.",
      },
    },
  },
};

export default err;
