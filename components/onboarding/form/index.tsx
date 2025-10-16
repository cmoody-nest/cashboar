"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { OnboardingFinishForm } from "@/components/onboarding/form/finish";
import {
  formSchema as locationFormSchema,
  OnboardingLocationForm,
} from "@/components/onboarding/form/location";
import { OnboardingSplashForm } from "@/components/onboarding/form/splash";
import {
  OnboardingUserInfoForm,
  formSchema as userInfoFormSchema,
} from "@/components/onboarding/form/user-info";
import { Form, FormField } from "@/components/ui/form";

const formSchema = z.object({
  userInfo: userInfoFormSchema,
  location: locationFormSchema,
  step: z.enum(["splash", "userInfo", "location", "finish"]),
});

type FormValues = z.infer<typeof formSchema>;
type Props = {
  formAction: (data: FormData) => Promise<void>;
};

function OnboardingForm({ formAction }: Props) {
  const form = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      step: "userInfo",
    },
  });

  const onBeginOnboarding = useCallback(() => {
    form.setValue("step", "userInfo");
  }, [form]);

  const onSubmit = useCallback(
    (key: keyof FormValues, step: FormValues["step"]) =>
      async (data: FormValues[typeof key]) => {
        form.setValue(key, data);
        form.setValue("step", step);

        if (step === "finish") {
          const values = form.getValues();
          const formData = new FormData();

          // Append user info
          formData.append("firstName", values.userInfo.firstName);
          formData.append("lastName", values.userInfo.lastName);
          formData.append("dateOfBirth", values.userInfo.dateOfBirth);
          formData.append("gender", values.userInfo.gender);

          // Append location info
          formData.append("state", values.location.state);
          formData.append("city", values.location.city);
          formData.append("zipCode", values.location.zipCode);

          await formAction(formData);
        }
      },
    [form, formAction],
  );

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="step"
        render={({ field }) => {
          switch (field.value) {
            case "splash":
              return <OnboardingSplashForm onSubmit={onBeginOnboarding} />;
            case "userInfo":
              return (
                <OnboardingUserInfoForm
                  onSubmit={onSubmit("userInfo", "location")}
                />
              );
            case "location":
              return (
                <OnboardingLocationForm
                  onSubmit={onSubmit("location", "finish")}
                />
              );
            case "finish":
              return <OnboardingFinishForm />;
            default:
              throw new Error(`Unknown onboarding step: ${field.value}`);
          }
        }}
      />
    </Form>
  );
}

export { OnboardingForm };
