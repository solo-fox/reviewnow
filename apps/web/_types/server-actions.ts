import { AppError } from "../../../packages/error";

export default interface ServerActionReturn<T> {
  success: boolean;
  redirect: boolean;
  error?: AppError;
  data: T;
  url?: string;
}
