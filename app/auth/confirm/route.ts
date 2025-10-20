import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { WelcomeEmail } from "@/components/email/welcome";
import { resend } from "@/lib/email";
import { env } from "@/lib/env";
import logger, { withLogger } from "@/lib/logger";
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
        // Send welcome email on signup
        if (data.user.email) {
          const { error } = await resend.emails.send({
            from: env.RESEND_SENDER_EMAIL,
            to: [data.user.email],
            subject: "Welcome  — Let’s Turn Actions into Rewards!",
            react: WelcomeEmail(),
          });

          if (error) {
            logger.warn(`Failed to send welcome email: ${error.message}`);
          }
        }

        // Regardless of email success, redirect the user
        const redirectUrl = new URL(next || "/", env.NEXT_PUBLIC_BASE_URL);

        return NextResponse.redirect(redirectUrl);
      }
    }

    // Otherwise, redirect to an error page
    return NextResponse.redirect(new URL("/error", env.NEXT_PUBLIC_BASE_URL));
  });
}
