import { Database } from "../database.types";
import { SupabaseClient } from "@supabase/supabase-js"
import err from "../err"

export type UserSignIn = {
  email: string,
  password: string
}

class User {
  constructor(public supabase: SupabaseClient<Database>) {}
  
  async signUp(userData: UserSignIn) {
    const { data, error } = await this.supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      throw new Error(err.user.signUpError(error.message));
    }

    return data;
  }
}

export { User }
