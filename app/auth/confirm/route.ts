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
  next: z.string().nullable().default("/"),
});

export async function GET(request: NextRequest) {
  return withLogger(request, async (request) => {
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
        return NextResponse.redirect(
          new URL(next ?? "/", env.NEXT_PUBLIC_BASE_URL),
        );
      }
    }

    // redirect the user to an error page with some instructions
    return NextResponse.redirect(new URL("/error", env.NEXT_PUBLIC_BASE_URL));
  });
}
