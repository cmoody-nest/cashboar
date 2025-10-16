ALTER TABLE "users" RENAME COLUMN "first_name" TO "firstName";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "last_name" TO "lastName";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "date_of_birth" TO "dateOfBirth";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "supabase_id" TO "supabaseId";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_supabase_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_supabaseId_unique" UNIQUE("supabaseId");