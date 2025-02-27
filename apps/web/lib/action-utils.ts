import { redirect } from "next/navigation";

export type ServerActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerActionError";
  }
}

export function createServerAction<Return, Args extends unknown[] = []>(
  callback: (...args: Args) => Promise<Return>,
): (...args: Args) => Promise<ServerActionResult<Return>> {
  return async (...args: Args) => {
    try {
      const data = await callback(...args);
      return { success: true, data };
    } catch (error) {
      if (error instanceof ServerActionError)
        return { success: false, error: error.message };
      throw error;
    }
  };
}

export type AsyncAction<TArgs, TResult> = (args: TArgs) => Promise<TResult>;

// eslint-disable-next-line
export const runServerAction = async <TArgs = void, TData = any>(
  fn: AsyncAction<TArgs, ServerActionResult<TData>>,
  args?: TArgs,
): Promise<TData> => {
  // Handle functions that do not require arguments
  const action = await (args !== undefined
    ? fn(args)
    : (fn as () => Promise<ServerActionResult<TData>>)());

  if (!action.success) throw new ServerActionError(action.error);
  if (action.success && (action.data as { redirectTo?: string }).redirectTo) {
    redirect((action.data as { redirectTo: string }).redirectTo);
  }
  return action.data;
};
