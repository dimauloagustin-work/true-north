import { ApiError } from "../api";

export const catchError = (err: unknown) : Error | unknown => {
  if (err instanceof ApiError) return new Error(err.body.message);
  return err;
};
