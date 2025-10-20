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

export const CustomerOfferSchema = z.object({
  offer: OfferSchema,
});

export type CustomerOffer = z.infer<typeof CustomerOfferSchema>;

export const OffersResponseSchema = z.object({
  data: z.array(OfferSchema),
});

export type OffersResponse = z.infer<typeof OffersResponseSchema>;

export const CustomerOffersResponseSchema = z.object({
  data: z.array(CustomerOfferSchema),
});

export type CustomerOffersResponse = z.infer<
  typeof CustomerOffersResponseSchema
>;
