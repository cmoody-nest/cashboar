import { redirect } from "next/navigation";
import { getUserProfile, insertProfileData } from "@/app/onboarding/actions";
import { OnboardingForm } from "@/components/onboarding/form";
import { getSupabaseUser } from "@/lib/supabase/utils";

export default async function OnboardingPage() {
  const { id } = await getSupabaseUser();
  const profile = await getUserProfile(id);

  if (profile) {
    console.warn("Profile already exists, redirecting to home page");
    return redirect("/");
  }

  return <OnboardingForm formAction={insertProfileData} />;
}
