ALTER TABLE "receipts" DROP CONSTRAINT "receipts_profileId_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "profileId" SET DATA TYPE integer;