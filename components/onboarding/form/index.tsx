"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type HTMLProps, useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  formSchema as locationFormSchema,
  OnboardingLocationForm,
} from "@/components/onboarding/form/location";
import {
  OnboardingUserInfoForm,
  formSchema as userInfoFormSchema,
} from "@/components/onboarding/form/user-info";
import { Form, FormField } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  userInfo: userInfoFormSchema,
  location: locationFormSchema,
  step: z.enum(["userInfo", "location", "finish"]),
});

type FormData = z.infer<typeof formSchema>;
type Props = Pick<HTMLProps<HTMLButtonElement>, "formAction">;

function OnboardingForm({ formAction }: Props) {
  const form = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      step: "userInfo",
    },
  });

  const onSubmit = useCallback(
    (key: keyof FormData, step: FormData["step"]) =>
      (data: FormData[typeof key]) => {
        form.setValue(key, data);
        form.setValue("step", step);

        if (step === "finish") {
          if (typeof formAction !== "function") {
            throw new Error("formAction is not a function");
          }

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

          formAction(formData);
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
              return (
                <div className="flex items-center space-x-2">
                  <Spinner /> <p>Finishing up...</p>
                </div>
              );
            default:
              throw new Error(`Unknown onboarding step: ${field.value}`);
          }
        }}
      />
    </Form>
  );
}

export { OnboardingForm };
