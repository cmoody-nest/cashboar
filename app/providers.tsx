"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "@/lib/env";

const queryClient = new QueryClient();

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(function setupPostHog() {
    if (posthog.__loaded) {
      console.warn("PostHog already loaded");
      return;
    }
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "https://us.i.posthog.com",
      capture_exceptions: true,
      defaults: "2025-05-24",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
