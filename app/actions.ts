"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { claimCoreSaveOffer } from "@/lib/coresave/customer";
import { db } from "@/lib/db";
import { getProfileBySupabaseId } from "@/lib/db/profiles/utils";
import { profile_offers } from "@/lib/db/schema";
import logger from "@/lib/logger";
import { getSupabaseUser } from "@/lib/supabase/utils";
import { OfferSchema } from "@/lib/types/offer";

export async function claimOffer(data: FormData) {
  const user = await getSupabaseUser();
  const profile = await getProfileBySupabaseId(user.id);
  const { id, source } = OfferSchema.pick({ id: true })
    .extend({
      source: z.string(),
    })
    .parse({
      id: data.get("offerId"),
      source: data.get("source"),
    });

  await db
    .insert(profile_offers)
    .values({
      offerId: id,
      offerwallType: "coresave",
      status: "claimed",
      source,
      profileId: profile.id,
    })
    .onConflictDoUpdate({
      target: [
        profile_offers.offerId,
        profile_offers.offerwallType,
        profile_offers.profileId,
      ],
      set: {
        source,
      },
    });

  logger.info(
    `Offer claimed: offerId=${id}, profileId=${profile.id}, type=coresave`,
  );

  const offerUrl = await claimCoreSaveOffer(id, user.id);

  redirect(offerUrl);
}
