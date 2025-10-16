"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import states from "states-us";
import z from "zod";
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

const zipStaticApiResponseSchema = z.object({
  country: z.literal("US"),
  state: z.string().min(2),
  city: z.string().min(2),
});

function decapitalizeCity(city: string) {
  return city
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

  const zipCodeQuery = useQuery({
    queryKey: ["location", zipCode],
    queryFn: async () => {
      const response = await fetch(`https://ZiptasticAPI.com/${zipCode}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      const { state, city } = zipStaticApiResponseSchema.parse(json);

      form.setValue("state", state, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      form.setValue("city", decapitalizeCity(city), {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });

      return json;
    },
    enabled: zipCode.length >= 5,
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
