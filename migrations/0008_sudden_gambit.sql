ALTER TABLE "users" RENAME TO "profiles";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "users_supabaseId_unique";--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_supabaseId_unique" UNIQUE("supabaseId");