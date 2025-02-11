import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../database.types";

export type Tables = keyof Database["public"]["Tables"];

export interface Search {
  limit: number;
  offset: number;
  search: string | null;
}

export interface Model<T extends { id: string }> {
  tableName: keyof Database["public"]["Tables"];
  client: SupabaseClient<Database>;

  create?(userId: string, payload: T): Promise<T>;
  findById(userId: string, id?: string): Promise<T | null>;
  findAll(userId: string, payload: Search): Promise<T[]>;
  update(
    userId: string,
    payload: Required<Pick<T, "id">> & Partial<T>,
  ): Promise<T | null>;
  delete(userId: string, id?: string): Promise<boolean>;
}
