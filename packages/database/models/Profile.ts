import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import errorMessages, { AppError } from "@workspace/error";

export type ProfileView = Database["public"]["Tables"]["profiles"]["Row"];

export default class Profile {
  constructor(public client: SupabaseClient<Database>) {}

  public async view(user_id: string): Promise<NonNullable<ProfileView>> {
    try {
      const { data, error } = await this.client
        .from("profiles")
        .select("*")
        .eq("id", user_id)
        .limit(1)
        .single();

      if (error) {
        throw new AppError(error, errorMessages.profile.view.serverError);
      }
      if (data === undefined || data === null)
        throw new AppError(error, errorMessages.profile.view.notFound);

      return data;
    } catch (error: any) {
      throw new AppError(error, errorMessages.profile.view.serverError);
    }
  }
}
