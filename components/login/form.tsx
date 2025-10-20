"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Flex } from "@/components/base/flex";
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
import { isRedirect } from "@/lib/error/utils";

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
            await onLogin(formData)
              .then(() => {
                toast.success("Login successful");
                form.reset();
              })
              .catch((error) => {
                if (isRedirect(error)) {
                  return;
                }

                console.error("Login error:", error);
                toast.error("Login failed", {
                  description: "Please check your credentials and try again.",
                });
              });
            break;
          case "signUp":
            await onSignup(formData)
              .then(() => {
                toast.success("Signup successful");
                form.reset();
              })
              .catch((error) => {
                if (isRedirect(error)) {
                  return;
                }

                console.error("Signup error:", error);
                toast.error("Signup failed", {
                  description:
                    "We're unable to create your account at this time. Please try again later.",
                });
              });
            break;
          default:
            console.error("Unknown action:", action);
            break;
        }
      }
    },
    [onLogin, onSignup, form],
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

        <Flex direction="row" className="gap-2">
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
        </Flex>
      </form>
    </Form>
  );
}

export { LoginForm };
