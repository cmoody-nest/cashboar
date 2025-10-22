CREATE TABLE "receipts" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(1024) NOT NULL,
	"profileId" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;