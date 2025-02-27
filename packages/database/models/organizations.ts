import { SupabaseClient } from "@supabase/supabase-js";
import errorMessages from "@workspace/error";
import logger from "@workspace/logger";

import { Database, Tables, TablesInsert, TablesUpdate } from "../types";

async function create(
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

async function all(
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

async function update(
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

async function del(
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

async function hasUserOrgs(
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

export const organizations = {
  all,
  create,
  update,
  del,
  hasUserOrgs,
};
