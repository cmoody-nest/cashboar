import { createClient } from "@/lib/supabase/client";

const client = createClient();

export async function getSupabaseUser() {
  const user = await client.auth.getUser();

  if (!user.data.user) {
    throw new Error("User not authenticated");
  }

  return user.data.user;
}
