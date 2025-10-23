import z from "zod";

export const CustomerSchema = z.object({
  id: z.uuid(),
  externalId: z.string(),
});

export type Customer = z.infer<typeof CustomerSchema>;
