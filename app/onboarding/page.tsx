import { redirect } from "next/navigation";
import { getUserProfile, insertProfileData } from "@/app/onboarding/actions";
import { OnboardingForm } from "@/components/onboarding/form";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const client = await createClient();
  const user = await client.auth.getUser();

  if (!user.data.user) {
    throw new Error("User not authenticated");
  }

  const profile = await getUserProfile(user.data.user.id);

  if (profile) {
    console.warn("Profile already exists, redirecting to home page");
    return redirect("/");
  }

  return <OnboardingForm formAction={insertProfileData} />;
}
