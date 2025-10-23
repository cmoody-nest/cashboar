import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal"])
      .default("info"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    // Supabase
    DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
    // Resend
    RESEND_SENDER_EMAIL: z
      .string()
      .default("KnockKnockCash <noreply@knockknockcash.com>"),
    RESEND_API_KEY: z
      .string()
      .min(1, { message: "RESEND_API_KEY is required" }),
    RESEND_WEBHOOK_SECRET: z
      .string()
      .min(1, { message: "RESEND_WEBHOOK_SECRET is required" }),
    // CoreSave
    CORESAVE_ORGANIZATION_ID: z
      .string()
      .min(1, { message: "CORESAVE_ORGANIZATION_ID is required" }),
    // Veryfi
    VERYFI_CLIENT_ID: z
      .string()
      .min(1, { message: "VERYFI_CLIENT_ID is required" }),
    VERYFI_CLIENT_SECRET: z
      .string()
      .min(1, { message: "VERYFI_CLIENT_SECRET is required" }),
    VERYFI_USERNAME: z
      .string()
      .min(1, { message: "VERYFI_USERNAME is required" }),
    VERYFI_API_KEY: z
      .string()
      .min(1, { message: "VERYFI_API_KEY is required" }),
  },
  client: {
    // PostHog
    NEXT_PUBLIC_POSTHOG_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_POSTHOG_KEY is required" }),
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SUPABASE_URL is required" }),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required" }),
    // Base URLs
    NEXT_PUBLIC_BASE_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_CORESAVE_API_URL: z.url().default("http://localhost:4000"),
  },
  runtimeEnv: {
    // Server
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_SENDER_EMAIL: process.env.RESEND_SENDER_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
    VERYFI_CLIENT_ID: process.env.VERYFI_CLIENT_ID,
    VERYFI_CLIENT_SECRET: process.env.VERYFI_CLIENT_SECRET,
    VERYFI_USERNAME: process.env.VERYFI_USERNAME,
    VERYFI_API_KEY: process.env.VERYFI_API_KEY,
    CORESAVE_ORGANIZATION_ID: process.env.CORESAVE_ORGANIZATION_ID,
    // Client
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CORESAVE_API_URL: process.env.NEXT_PUBLIC_CORESAVE_API_URL,
  },
});
