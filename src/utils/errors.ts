export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export class AlreadyExistsError extends Error {
  fieldName: string;

  constructor(fieldName: string) {
    super(`${fieldName} already exists`);
    this.fieldName = fieldName;
    this.name = 'AlreadyExistsError';
  }
}
