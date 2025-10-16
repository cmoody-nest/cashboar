import { createClient } from "@/lib/supabase/server";

export async function getSupabaseUser() {
  const client = await createClient();
  const user = await client.auth.getUser();

  if (!user.data.user) {
    throw new Error("User not authenticated");
  }

  return user.data.user;
}
