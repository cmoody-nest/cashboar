import { type NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import z from "zod";
import { db } from "@/lib/db";
import { resend_webhooks } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { withLogger } from "@/lib/logger";

const RequestSchema = z.object({
  type: z.string(),
  created_at: z.coerce.date(),
  data: z.object({
    email_id: z.string(),
    to: z.array(z.string()),
  }),
});

export async function POST(request: NextRequest) {
  return withLogger(request, async (request) => {
    const headers = Object.fromEntries(request.headers.entries());
    const payload = await request.text();

    const webhook = new Webhook(env.RESEND_WEBHOOK_SECRET);

    const { type, created_at, data } = RequestSchema.parse(
      webhook.verify(payload, headers),
    );

    const emailId = data.email_id;
    const recipient = data.to.at(0);
    const timestamp = created_at;
    const deliveryStatus = type.split(".").pop();

    if (!recipient) {
      throw new Error("No recipient found");
    }

    if (!deliveryStatus) {
      throw new Error("No delivery status found");
    }

    db.insert(resend_webhooks).values({
      type,
      emailId,
      recipient,
      timestamp,
      deliveryStatus,
    });

    return NextResponse.json({ received: true });
  });
}
