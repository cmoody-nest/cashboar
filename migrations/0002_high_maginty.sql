ALTER TABLE "resend_webhooks" RENAME COLUMN "type" TO "eventType";--> statement-breakpoint
ALTER TABLE "resend_webhooks" ADD COLUMN "emailId" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "resend_webhooks" ADD COLUMN "recipient" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "resend_webhooks" ADD COLUMN "timestamp" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "resend_webhooks" ADD COLUMN "deliveryStatus" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "resend_webhooks" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "resend_webhooks" DROP COLUMN "data";