import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";
import uuidAPIKey from "uuid-apikey";

export type ProjectView = Database["public"]["Tables"]["projects"]["Row"];

export default class Project {
  constructor(public client: SupabaseClient<Database>) {}

  public async create(
    user_id: string,
    payload: {
      name: string;
      description: string | null;
    },
  ): Promise<string> {
    const date = new Date().toISOString(); // ISO format for consistency
    const api_key = uuidAPIKey.create()

    const { error } = await this.client
      .from("projects")
      .insert([
        {
          id: api_key.uuid,
          api_key: api_key.apiKey,
          api_limit: 1000,
          description: payload.description,
          logs: [
            {
              timestamp: date,
              message: "Project was created.",
            },
          ],
          name: payload.name,
          user_id,
        },
      ])

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.project.create.serverError);
    }

    return api_key.uuid
  }
}
