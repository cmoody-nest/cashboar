CREATE TABLE "resend_webhooks" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(256) NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"data" json NOT NULL
);
