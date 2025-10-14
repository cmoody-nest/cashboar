import { randomUUID } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import pino from "pino";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

const REDACTED_FIELDS = ["password", "token", "secret"];

const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: REDACTED_FIELDS.map((field) => `*.${field}`),
    censor: "[REDACTED]",
  },
});

export async function withLogger(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>,
) {
  const start = Date.now();
  const requestId = randomUUID();
  const client = await createClient();
  const user = await client.auth.getUser();
  const userId = user.data.user?.id ?? null;

  try {
    const response = await handler(request);

    const duration = Date.now() - start;

    logger.info({
      requestId,
      duration,
      userId,
      method: request.method,
      url: request.url,
      status: response.status,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    logger.error({ requestId, error }, "Unhandled error in API handler");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export default logger;
