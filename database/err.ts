const err = {
  user: {
    signUpError: (cause: string) => `DBERR(user::signUpError): Failed to create User. Due to: ${cause}`,
  },
};

export default err
