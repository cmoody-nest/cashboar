import { randomUUID } from "crypto";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import pino from "pino";
import { env } from "./env";

const REDACTED_FIELDS = ["password", "token", "secret"];

const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: REDACTED_FIELDS.map((field) => `*.${field}`),
    censor: "[REDACTED]",
  },
  transport:
    env.NODE_ENV === "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        }
      : undefined,
});

export function withLogger(handler: NextApiHandler) {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const start = Date.now();
    const requestId = randomUUID();
    // TODO: Add user identification if available

    response.on("finish", () => {
      const duration = Date.now() - start;
      logger.info({
        requestId,
        duration,
        method: request.method,
        url: request.url,
        status: response.statusCode,
        timestamp: new Date().toISOString(),
      });
    });

    try {
      await handler(request, response);
    } catch (error) {
      logger.error({ requestId, error }, "Unhandled error in API handler");
      response.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default logger;
