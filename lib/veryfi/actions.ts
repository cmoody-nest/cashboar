"use server";

import { randomUUID } from "node:crypto";
import z from "zod";
import { db } from "@/lib/db";
import { getProfileBySupabaseId } from "@/lib/db/profiles/utils";
import { receipts } from "@/lib/db/schema";
import logger from "@/lib/logger";
import { getSupabaseUser } from "@/lib/supabase/utils";
import { client } from "@/lib/veryfi";

export async function submitDocumentForProcessing(formData: FormData) {
  const user = await getSupabaseUser();
  const profile = await getProfileBySupabaseId(user.id);

  const { url } = z
    .object({
      url: z.url(),
    })
    .parse({
      url: formData.get("url"),
    });

  logger.info(`Submitting document for processing`);

  const fileName = `${randomUUID()}.png`;
  const result = await client.process_document_from_base64(url, fileName);

  if (!result.id) {
    logger.error(`Document processing failed: no document ID returned`);
    throw new Error("Document processing failed");
  }

  if (!result.img_url) {
    logger.error(`Document processing failed: no img_url returned`);
    throw new Error("Document processing failed");
  }

  logger.info(`Document submitted for processing: documentId=${result.id}`);

  await db.insert(receipts).values({
    externalId: result.id.toString(),
    url: result.img_url,
    profileId: profile.id,
  });
}
