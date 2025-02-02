export default interface ServerActionReturn<T> {
  success: boolean;
  redirect: boolean;
  error?: string;
  data: T;
  url?: string;
}
