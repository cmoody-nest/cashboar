"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = LoginFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const { email, password } = LoginFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const emailRedirectTo = new URL(env.NEXT_PUBLIC_BASE_URL).toString();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
