import type { User } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";

export async function getProfileBySupabaseId(supabaseId: User["id"]) {
  const data = await db
    .select()
    .from(profiles)
    .where(eq(profiles.supabaseId, supabaseId));

  const profile = data.at(0);

  if (!profile) {
    throw new Error(`Profile not found for Supabase ID: ${supabaseId}`);
  }

  return profile;
}
