import { SupabaseClient } from "@supabase/supabase-js";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";
import uuidAPIKey from "uuid-apikey";

import { Database, SearchOptions, Tables, TablesInsert } from "../types";

export async function createProject(
  client: SupabaseClient<Database>,
  payload: {
    userId: string;
    orgId: string;
    fields: Partial<TablesInsert<"projects">>;
  },
): Promise<Tables<"projects">> {
  const date = new Date().toISOString();
  const apiKey = uuidAPIKey.create();

  const newProject: TablesInsert<"projects"> = {
    id: apiKey.uuid,
    api_key: apiKey.apiKey as string,
    api_limit: 1000,
    description: payload.fields.description ?? null,
    logs: [{ timestamp: date, message: "Project was created." }],
    name: payload.fields.name as string,
    user_id: payload.userId,
    org_id: payload.orgId,
  };

  const { data, error } = await client
    .from("projects")
    .insert([newProject])
    .select("*")
    .single();

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data;
}

export async function paginateProjects(
  client: SupabaseClient<Database>,
  payload: {
    userId: string;
    orgId: string;
    options: SearchOptions;
  },
): Promise<Tables<"projects">[]> {
  const { limit, offset, searchString } = payload.options;

  let query = client
    .from("projects")
    .select("*")
    .eq("user_id", payload.userId)
    .eq("org_id", payload.orgId)
    .order("createdAt", { ascending: false })
    .range(offset, offset + limit - 1);

  if (searchString !== undefined || searchString !== "") {
    query = query.ilike("name", `%${searchString?.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data ?? [];
}

async function findProject(
  client: SupabaseClient<Database>,
  payload: {
    userId: string;
    orgId: string;
    projectId: string;
  },
): Promise<Tables<"projects"> | null> {
  let { data, error } = await client
    .from("projects")
    .select("*")
    .eq("user_id", payload.userId)
    .eq("org_id", payload.orgId)
    .eq("id", payload.projectId)
    .limit(1)
    .single();

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data;
}