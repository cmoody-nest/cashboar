import { type NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import z from "zod";
import { env } from "@/lib/env";
import { withLogger } from "@/lib/logger";

const RequestSchema = z.object({
  type: z.string(),
  created_at: z.coerce.date(),
  data: z.record(z.string(), z.unknown()),
});

export async function POST(request: NextRequest) {
  return withLogger(request, async (request) => {
    const headers = Object.fromEntries(request.headers.entries());
    const payload = await request.text();

    const webhook = new Webhook(env.RESEND_WEBHOOK_SECRET);

    try {
      const { type, created_at, data } = RequestSchema.parse(
        webhook.verify(payload, headers),
      );

      return NextResponse.json({ received: true });
    } catch (error) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  });
}
