"use client";

import { useRouter } from "next/navigation";

import { ServerActionResult } from "@/lib/action-utils";

export type AsyncAction<TArgs, TResult> = (args: TArgs) => Promise<TResult>;

// eslint-disable-next-line
export const useAction = <TArgs = void, TData = any>(
  fn: AsyncAction<TArgs, ServerActionResult<TData>>,
) => {
  const router = useRouter();

  return async function callback(
    args?: TArgs,
  ): Promise<TData> {
    // Handle functions that do not require arguments
    const action = await (args !== undefined
      ? fn(args)
      : (fn as () => Promise<ServerActionResult<TData>>)());

    if (!action.success) throw new Error(action.error);
    if (action.success && (action.data as { redirectTo?: string }).redirectTo) {
      router.push((action.data as { redirectTo: string }).redirectTo);
    }

    return action.data
  };
};
