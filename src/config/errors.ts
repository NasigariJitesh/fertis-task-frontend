export const ErrorMessages = {
  notVerify: 'Your account is not verified. Please verify from your email account.',
  inactive: 'Your account is currently inactive. Please contact support for assistance.',
  invalidEmailPassword: 'Invalid email or password. Please check your credentials.',
  oopsMessage: 'Oops! Something went wrong on our end. Please try again later.',
};

export class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}
