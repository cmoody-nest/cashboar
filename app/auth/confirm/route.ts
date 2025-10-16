import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { env } from "@/lib/env";
import { withLogger } from "@/lib/logger";
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
  next: z.string().nullable(),
});

export async function GET(request: NextRequest) {
  return withLogger(request, async (request) => {
    // Extract parameters from the URL
    const { searchParams } = new URL(request.url);
    const { token_hash, type, next } = RequestSchema.parse({
      token_hash: searchParams.get("token_hash"),
      type: searchParams.get("type"),
      next: searchParams.get("next"),
    });

    // Attempt to verify the user using Supabase
    if (token_hash && type) {
      const supabase = await createClient();

      const { data, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      // If verification is successful and a user is returned, redirect to the next URL or home
      if (!error && data.user) {
        const redirectUrl = new URL(next || "/", env.NEXT_PUBLIC_BASE_URL);

        return NextResponse.redirect(redirectUrl);
      }
    }

    // Otherwise, redirect to an error page
    return NextResponse.redirect(new URL("/error", env.NEXT_PUBLIC_BASE_URL));
  });
}
