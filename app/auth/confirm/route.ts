import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

const RequestSchema = z.object({
  type: z
    .enum([
      "signup",
      "invite",
      "magiclink",
      "recovery",
      "email_change",
      "email",
    ])
    .nullable(),
  token_hash: z.string().nullable(),
  next: z.string().optional().default("/"),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { token_hash, type, next } = RequestSchema.parse({
    token_hash: searchParams.get("token_hash"),
    type: searchParams.get("type"),
    next: searchParams.get("next"),
  });

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
