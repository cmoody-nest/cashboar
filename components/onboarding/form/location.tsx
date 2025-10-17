"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import states from "states-us";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useZipCode } from "@/hooks/onboarding/use-zip-code";
import { OnboardingProfileDataSchema } from "@/lib/onboarding/schema";

const stateOptions = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

export const formSchema = OnboardingProfileDataSchema.pick({
  state: true,
  city: true,
  zipCode: true,
});

type FormValues = z.infer<typeof formSchema>;
type Props = {
  onSubmit: (data: FormValues) => void;
};

function OnboardingLocationForm({ onSubmit }: Props) {
  const form = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      city: "",
      zipCode: "",
    },
  });
  const zipCode = form.watch("zipCode");

  const zipCodeQuery = useZipCode({
    zipCode,
    onSuccess: ({ city, state }) => {
      form.setValue("state", state, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });

      form.setValue("city", city, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
              <FormControl>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zip Code"
                  required
                  readOnly={zipCodeQuery.isFetching}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="city">City</FormLabel>
              <FormControl>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  required
                  readOnly={zipCodeQuery.isFetching}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="state">State</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={zipCodeQuery.isFetching}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            zipCodeQuery.isFetching ||
            !form.formState.isValid
          }
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}

export { OnboardingLocationForm };
