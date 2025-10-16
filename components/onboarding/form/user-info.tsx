"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears, format, isValid } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MIN_AGE = 18;
const MAX_AGE = 100;

function validateDateOfBirth(date: Date) {
  if (!isValid(date)) {
    return false;
  }

  const today = new Date();
  const age = Math.abs(differenceInYears(date, today));

  if (age < MIN_AGE || age > MAX_AGE) {
    return false;
  }

  return true;
}

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { error: "Last name must be at least 2 characters." }),
  dateOfBirth: z.date().refine(validateDateOfBirth, {
    error: "Invalid date of birth.",
  }),
  gender: z.enum(["male", "female"], {
    error: "Please select a valid gender.",
  }),
});

function OnboardingUserInfoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      gender: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <FormControl>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <FormControl>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
              <FormControl>
                <Popover onOpenChange={field.onBlur}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between font-normal"
                    >
                      {format(field.value, "MM/dd/yyyy")}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}

export { OnboardingUserInfoForm };
