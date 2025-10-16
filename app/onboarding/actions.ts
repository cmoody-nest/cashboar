"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { OnboardingProfileDataSchema } from "@/lib/onboarding/schema";
import { createClient } from "@/lib/supabase/server";

export async function insertProfileData(formData: FormData) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const supabaseId = user.data.user?.id;

  if (!supabaseId) {
    throw new Error("User not authenticated");
  }

  const formValues = Object.fromEntries(formData.entries());
  const data = OnboardingProfileDataSchema.parse(formValues);
  const values = {
    ...data,
    supabaseId,
    dateOfBirth: new Date(data.dateOfBirth),
  };

  await db.insert(profiles).values(values).onConflictDoNothing();

  redirect("/");
}

export async function getUserProfile(
  supabaseId: (typeof profiles.$inferSelect)["supabaseId"],
) {
  const profile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.supabaseId, supabaseId))
    .limit(1);

  return profile.at(0);
}
