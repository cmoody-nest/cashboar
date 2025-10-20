import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal"])
      .default("info"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
    RESEND_WEBHOOK_SECRET: z
      .string()
      .min(1, { message: "RESEND_WEBHOOK_SECRET is required" }),

    CORESAVE_API_KEY: z
      .string()
      .min(1, { message: "CORESAVE_API_KEY is required" }),
  },
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_POSTHOG_KEY is required" }),
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SUPABASE_URL is required" }),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required" }),
    NEXT_PUBLIC_BASE_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_CORESAVE_API_URL: z.url().default("http://localhost:4000"),
    NEXT_PUBLIC_CORESAVE_ORGANIZATION_ID: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_CORESAVE_ORGANIZATION_ID is required" }),
  },
  runtimeEnv: {
    // Server
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
    CORESAVE_API_KEY: process.env.CORESAVE_API_KEY,
    // Client
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CORESAVE_API_URL: process.env.NEXT_PUBLIC_CORESAVE_API_URL,
    NEXT_PUBLIC_CORESAVE_ORGANIZATION_ID:
      process.env.NEXT_PUBLIC_CORESAVE_ORGANIZATION_ID,
  },
});
