CREATE TYPE "public"."offer_status" AS ENUM('claimed', 'completed');--> statement-breakpoint
ALTER TABLE "saved_offers" RENAME TO "profile_offers";--> statement-breakpoint
ALTER TABLE "profile_offers" DROP CONSTRAINT "saved_offers_profileId_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_offers" ADD COLUMN "status" "offer_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "profile_offers" ADD CONSTRAINT "profile_offers_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;