import { type EventMessage, PostHog } from "posthog-node";
import { env } from "./env";

const posthog = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: "https://us.i.posthog.com",
});

export function trackEvent({ distinctId, event, properties }: EventMessage) {
  posthog.capture({
    distinctId,
    event,
    properties,
  });
}
