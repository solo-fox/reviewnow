import { SupabaseClient } from "@supabase/supabase-js";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";

import { Database, Tables } from "../database.types";

import { Model } from "./model.interface";

export type Profile = Tables<"profiles">;

export default class ProfileModel implements Partial<Model<Profile>> {
  public readonly tableName = "profiles";

  constructor(public client: SupabaseClient<Database>) {}

  public async find(userId: string): Promise<Profile> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single();

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }

    return data;
  }

  public async update(
    userId: string,
    payload: Partial<Profile>,
  ): Promise<Profile | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .update(payload)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }
    return data;
  }

  public async delete(userId: string): Promise<boolean> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq("id", userId);

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }
    return true;
  }
}
