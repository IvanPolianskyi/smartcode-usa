# SmartCode Academy

Next.js 16 LMS for self-paced coding programs (Roblox Studio, Python, AI for Real Life).
Subscriptions are billed through [Paddle](https://paddle.com) (Merchant of Record).
English-only locale. MongoDB backend, JWT cookie auth.

## Commands

```bash
npm run dev    # next dev --turbopack
npm run build  # next build
npm run start  # next start (production)
npm run lint
node --test src/lib/paddle.test.mjs
node --test src/lib/entitlements.test.mjs src/lib/billingCatalog.test.mjs
```

## Deploy (Vercel)

1. Push this repo to GitHub (`IvanPolianskyi/smartcode-usa`).
2. Import the project in [Vercel](https://vercel.com/new) → Framework: Next.js.
3. Copy every variable from `.env.example` into Vercel → Settings → Environment Variables
   (Production). Set `NEXT_PUBLIC_SITE_URL=https://smartcode.academy`.
4. Deploy, then add domain `smartcode.academy` (+ `www`) in Vercel → Domains.
5. Point Namecheap DNS: A `@` → Vercel IP, CNAME `www` → Vercel CNAME target.
6. Paddle webhook URL: `https://smartcode.academy/api/billing/webhook`.
7. MongoDB Atlas Network Access: allow `0.0.0.0/0` (or Vercel IPs) so the app can connect.

```bash
npm run build   # must pass before first production deploy
```

## Setup

1. Copy `.env.example` → `.env.local` and fill in values.
2. `npm install`
3. `npm run dev` → [http://localhost:3000](http://localhost:3000)

### Required env

| Variable | Purpose |
|---|---|
| `MONGODB_URI`, `MONGODB_DB` | Database |
| `JWT_SECRET` | Auth cookies (required in production) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `SUPPORT_EMAIL` / `NEXT_PUBLIC_SUPPORT_*` | Legal / support contact (Paddle reviews these) |

### Paddle (billing)

| Variable | Purpose |
|---|---|
| `PADDLE_ENV` / `NEXT_PUBLIC_PADDLE_ENV` | `sandbox` until live approval |
| `PADDLE_API_KEY` | Server API |
| `PADDLE_WEBHOOK_SECRET` | Webhook HMAC verification |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | Client checkout overlay |
| `NEXT_PUBLIC_PADDLE_PRICE_*` | Price IDs per program × tier × interval |

Until price IDs are set, checkout in non-production falls through to a
dev-only local grant (`/api/billing/local-grant`). That route is hard-blocked
when `NODE_ENV=production`.

See `.env.example` for the full list of price env vars.

## Architecture (short)

- **Courses** — IDs in `src/lib/courseIds.js`. Lesson content under
  `src/lib/lessonContent/`, `src/lib/robloxLessonContent/`, etc. Unified route:
  `/courses/[courseId]/lessons/[lessonId]`.
- **Billing** — Paddle specifics isolated in `src/lib/paddle.js`. Price ↔ course
  map in `src/lib/billingCatalog.js`. Checkout entry: `/pricing` → `/start` →
  Paddle overlay (or local grant in dev).
- **Entitlements** — `src/lib/entitlements.js` is the only place that decides
  whether an account has access. Webhook at `/api/billing/webhook` is the only
  path that grants/revokes paid access (checkout redirect is never trusted).
- **Legal** — `/terms`, `/privacy`, `/refund` read merchant details from
  `src/lib/legalConfig.js`.

## License

Private. All rights reserved.
