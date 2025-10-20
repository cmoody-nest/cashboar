# CashBoar

### ✨ Installation
1. Run `npm install` to install dependencies
2. Create a `.env` file based on `lib/env.ts` and fill in required environment variables
3. Run `npm run dev` to start the development server

### 🚀 Supabase
- Database migrations are managed by Drizzle ORM
- Ensure that the invite link email uses the correct URL: `<a href="{{ .RedirectTo }}auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/onboarding">Confirm your mail</a>`

### 🪵 Logging

- Local logs: pretty printed in the terminal
- Production logs: visible in Vercel Logs (structured JSON)
- Sensitive fields (passwords, tokens, PII) are automatically redacted
- Use `logger.info()`, `logger.error()`, `logger.debug()` from `utils/logger.ts`
- Wrap API routes with `withLogging()` to capture request/response metrics

### 📈 Analytics (PostHog)

- Major backend events are tracked via `trackEvent()`
- View analytics at https://app.posthog.com

