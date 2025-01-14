import authSchema from "@/schemas/auth.schema";
import { z } from "zod";

export default function useSignIn(setPending: (arg: boolean) => void) {
  return async function signUp(
    values: z.infer<typeof authSchema>,
    event?: React.BaseSyntheticEvent,
  ) {};
}
