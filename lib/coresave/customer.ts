import z from "zod";
import { coresaveApiService } from "@/lib/coresave/api";
import { env } from "@/lib/env";
import logger from "@/lib/logger";

export async function ensureCoreSaveCustomer(externalId: string) {
  await coresaveApiService.POST("/customers/ensure", {
    schema: z.unknown(),
    body: {
      externalId,
      organizationId: env.CORESAVE_ORGANIZATION_ID,
    },
    presignUrl: true,
  });

  logger.info(`Ensured CoreSave customer with externalId: ${externalId}`);
}
