import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import pino from "pino";
import { env } from "./env";

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
  // TODO: Add user identification if available
  try {
    const response = await handler(request);

    const duration = Date.now() - start;

    logger.info({
      requestId,
      duration,
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
