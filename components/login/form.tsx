"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent, type HTMLProps, useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

function validatePasswordComplexity(password: string) {
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false;
  }

  return true;
}

const formSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .refine(validatePasswordComplexity, {
      error:
        "Password must include uppercase, lowercase, number, and special character",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onLogin: (data: FormData) => Promise<void>;
  onSignup: (data: FormData) => Promise<void>;
};

function LoginForm({ onLogin, onSignup }: Props) {
  const form = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormValues, e?: BaseSyntheticEvent) => {
      if (e?.nativeEvent instanceof SubmitEvent && e.nativeEvent.submitter) {
        const action = e.nativeEvent.submitter.getAttribute("value");
        const formData = new FormData();

        formData.append("email", data.email);
        formData.append("password", data.password);

        switch (action) {
          case "login":
            await onLogin(formData);
            break;
          case "signUp":
            await onSignup(formData);
            break;
          default:
            console.error("Unknown action:", action);
            break;
        }
      }
    },
    [onLogin, onSignup],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
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

        <Button
          type="submit"
          value="login"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Log In
        </Button>
        <Button
          type="submit"
          variant="outline"
          value="signUp"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export { LoginForm };
