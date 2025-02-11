const errorMessages = {
  profile: {
    view: {
      notFound:
        "Profile not found. Try again later. If the problem persists, contact support.",
      serverError:
        "There was an error retrieving the profile. Try again later. If the problem persists, contact support.",
    },
    update: {
      serverError:
        "There was an error updating the profile. Try again later. If the problem persists, contact support.",
    },
  },
  project: {
    create: {
      serverError:
        "There was an error creating the project. Try again later. If the problem persists, contact support.",
    },
  },
};

export default errorMessages;
