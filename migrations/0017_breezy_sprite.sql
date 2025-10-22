CREATE TABLE "saved_offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"offerId" varchar(256) NOT NULL,
	"offerwallType" "offerwall_type" NOT NULL,
	"profileId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saved_offers" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "saved_offers" ADD CONSTRAINT "saved_offers_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;