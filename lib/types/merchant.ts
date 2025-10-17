import z from "zod";

export const MerchantSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});
