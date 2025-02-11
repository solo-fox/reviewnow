import { SupabaseClient } from "@supabase/supabase-js";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";
import uuidAPIKey from "uuid-apikey";

import { Database } from "../database.types";

export type ProjectView = Database["public"]["Tables"]["projects"]["Row"];

export default class Project {
  constructor(public client: SupabaseClient<Database>) {}

  public async list(
    userId: string,
    payload: {
      limit: number;
      offset: number;
      search?: string;
    },
  ): Promise<NonNullable<ProjectView[]>> {
    const { limit, offset, search } = payload;

    let { data, error } = await this.client
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search !== undefined) {
      query = query.ilike("name", `%${search}%`); // Case-insensitive search
    }

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.project.list.serverError);
    }

    if (data === undefined || data === null)
      throw new Error(errorMessages.project.list.notFound);

    return data;
  }

  public async create(
    userId: string,
    payload: {
      name: string;
      description: string | null;
    },
  ): Promise<string> {
    const date = new Date().toISOString(); // ISO format for consistency
    const api_key = uuidAPIKey.create();

    const { error } = await this.client.from("projects").insert([
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
        user_id: userId,
      },
    ]);

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.project.create.serverError);
    }

    return api_key.uuid;
  }
}
