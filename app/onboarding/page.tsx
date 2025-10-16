import { insertProfileData } from "@/app/onboarding/actions";
import { OnboardingForm } from "@/components/onboarding/form";

export default function OnboardingPage() {
  return <OnboardingForm formAction={insertProfileData} />;
}
