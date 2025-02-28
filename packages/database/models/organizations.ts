import { SupabaseClient } from "@supabase/supabase-js";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";

import { Database, Tables, TablesInsert, TablesUpdate } from "../types";

export async function createOrganization(
  client: SupabaseClient<Database>,
  payload: {
    userId: string;
    fields: Partial<TablesInsert<"organizations">>;
  },
): Promise<Tables<"organizations">> {
  const newOrganization: TablesInsert<"organizations"> = {
    name: payload.fields.name as string,
    user_id: payload.userId,
  };

  const { data, error } = await client
    .from("organizations")
    .insert([newOrganization])
    .select("*")
    .single();

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data;
}

export async function getAllOrganizations(
  client: SupabaseClient<Database>,
  payload: {
    userId: string;
  },
): Promise<Tables<"organizations">[]> {
  const { data, error } = await client
    .from("organizations")
    .select("*")
    .eq("user_id", payload.userId);

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data;
}

export async function updateOrganization(
  client: SupabaseClient<Database>,
  payload: {
    userId: string;
    orgId: string;
    fields: TablesUpdate<"organizations">;
  },
): Promise<Tables<"organizations">> {
  const { data, error } = await client
    .from("organizations")
    .update(payload.fields)
    .eq("id", payload.orgId)
    .eq("user_id", payload.userId)
    .select("*")
    .single();

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data;
}

export async function deleteOrganization(
  client: SupabaseClient<Database>,
  payload: {
    orgId: string;
    userId: string;
  },
): Promise<boolean> {
  const { error } = await client
    .from("organizations")
    .delete()
    .eq("id", payload.orgId)
    .eq("user_id", payload.userId);

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return true;
}

export async function hasUserOrganizations(
  client: SupabaseClient<Database>,
  payload: { userId: string },
): Promise<{ id: string }[] | null> {
  const { data, error } = await client
    .from("organizations")
    .select("id")
    .order("created_at", { ascending: true })
    .eq("user_id", payload.userId)
    .limit(1);

  if (error) {
    logger.error(error);
    throw new Error(errorMessages.serverError);
  }

  return data;
}