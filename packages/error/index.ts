export class AppError extends Error {
  constructor(origin, message) {
    super(message);
    this.origin = origin;
    this.name = 'AppError';

    // Preserve the original stack trace
    if (origin instanceof Error) {
      this.stack = `${this.stack}\nCaused by: ${origin.stack}`;
    }
  }
}

const errorMessages = {
  profile: {
    view: {
      notFound:
        "Profile not found. Try again later. If the problem persists, contact support.",
      serverError:
        "There was an error retrieving the profile. Try again later. If the problem persists, contact support.",
    },
  },
};

export default errorMessages;
