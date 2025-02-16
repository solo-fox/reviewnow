import { SupabaseClient } from "@supabase/supabase-js";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";
import uuidAPIKey from "uuid-apikey";

import { Database, TablesInsert } from "../database.types";

import { Model, Search } from "./model.interface";

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export default class ProjectModel implements Model<Project> {
  public readonly tableName = "projects";

  constructor(public client: SupabaseClient<Database>) {}

  public async create(
    userId: string,
    payload: Partial<Project>,
  ): Promise<Project> {
    const date = new Date().toISOString();
    const api_key = uuidAPIKey.create();

    const newProject: TablesInsert<"projects"> = {
      id: api_key.uuid,
      api_key: api_key.apiKey,
      api_limit: 1000,
      description: payload.description ?? null,
      logs: [{ timestamp: date, message: "Project was created." }],
      name: payload.name as string,
      user_id: userId,
    };

    const { data, error } = await this.client
      .from(this.tableName)
      .insert([newProject])
      .select("*")
      .single();

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }

    return data;
  }

  public async paginate(userId: string, payload: Search): Promise<Project[]> {
    const { limit, offset, search } = payload;

    let query = this.client
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search && search.length > 0) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }

    return data ?? [];
  }

  public async find(userId: string, id: string): Promise<Project> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .eq("id", id)
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
    payload: Required<Pick<Project, "id">> & Partial<Project>,
  ): Promise<Project | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .update(payload)
      .eq("user_id", userId)
      .eq("id", payload.id)
      .select("*")
      .single();

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }

    return data;
  }

  public async delete(userId: string, id?: string): Promise<boolean> {
    if (!id) return false;

    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq("user_id", userId)
      .eq("id", id);

    if (error) {
      logger.error(error);
      throw new Error(errorMessages.serverError);
    }

    return true;
  }
}
