ALTER TABLE "receipts" DROP CONSTRAINT "receipts_profileId_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;