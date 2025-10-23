import z from "zod";
import { coresaveApiService } from "@/lib/coresave/api";
import { env } from "@/lib/env";
import logger from "@/lib/logger";
import type { Customer } from "@/lib/types/customer";
import { ClaimedOfferSchema, type Offer } from "@/lib/types/offer";

export async function ensureCoreSaveCustomer(
  externalId: Customer["externalId"],
) {
  logger.info(`Ensuring CoreSave customer with externalId: ${externalId}`);

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

export async function claimCoreSaveOffer(
  offerId: Offer["id"],
  externalId: Customer["externalId"],
) {
  logger.info(`Claiming CoreSave offer ${offerId} for customer ${externalId}`);

  const { offerUrl } = await coresaveApiService.POST(
    `/customer-offers/${externalId}/claim/${offerId}`,
    {
      schema: ClaimedOfferSchema,
      params: {
        organizationId: env.CORESAVE_ORGANIZATION_ID,
      },
      presignUrl: true,
    },
  );

  logger.info(`Claimed CoreSave offer ${offerId} for customer ${externalId}`);

  return offerUrl;
}
