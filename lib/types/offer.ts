import z from "zod";
import { MerchantSchema } from "@/lib/types/merchant";

export const OfferSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.url().nullable(),
  merchant: MerchantSchema,
});

export type Offer = z.infer<typeof OfferSchema>;
