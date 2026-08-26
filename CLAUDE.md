# SmartCode Academy

Next.js 16 (App Router, Turbopack) LMS selling self-paced coding courses (Roblox
Studio, Python, AI at Work) by subscription via Paddle. MongoDB backend, JWT
cookie auth. Legal seller: Ivan Polianskyi, sole proprietor (FOP), Ukraine.

## Status (2026-08-26)

The repo is mid-pivot, **entirely uncommitted** (last commit `f33af72`). The
working tree replaces the old sprawling multi-page Ukrainian marketing site
(per-course landing pages, admin/teacher panels, affiliate cabinet,
certificates, CRM sync, Telegram leads, Monobank/LiqPay) with a single-locale
(English) SaaS course platform billed through Paddle. `npm run build` passes
and `node --test src/lib/paddle.test.mjs` passes (10/10).

Do not assume anything below is committed — check `git status` before relying
on file presence, and see `git diff --stat` for the full pivot.

### What's built and working
- **Billing**: Paddle Billing integration — [src/lib/paddle.js](src/lib/paddle.js)
  (webhook signature verify, portal sessions, subscription normalize),
  [src/lib/billingCatalog.js](src/lib/billingCatalog.js) (price ID ↔ course/tier/interval
  map, reads `NEXT_PUBLIC_PADDLE_PRICE_*` env vars),
  [src/lib/entitlements.js](src/lib/entitlements.js) (single source of truth for
  "does this account have access", course-scoped, 3-day past-due grace period).
  Webhook at [src/app/api/billing/webhook/route.js](src/app/api/billing/webhook/route.js)
  is the *only* thing that grants/revokes access — checkout success redirect is
  never trusted. Idempotent via unique index on `paddleWebhookEvents.eventId`.
- **Checkout**: [src/lib/startCheckout.js](src/lib/startCheckout.js) shared by
  `CheckoutButton` and `/start`. Signed-in + entitled → dashboard. Signed-in +
  not entitled + no price ID configured → dev-only local grant
  ([src/app/api/billing/local-grant/route.js](src/app/api/billing/local-grant/route.js),
  hard-blocked when `NODE_ENV=production`). Signed-in + priced → opens Paddle
  overlay checkout. Signed-out → `/start` gate → register/login → resumes.
- **Legal pages**: `/terms`, `/privacy`, `/refund` pull merchant details from
  [src/lib/legalConfig.js](src/lib/legalConfig.js) (reads env, never hardcodes
  placeholders — Paddle reviewers check these).
- **Course platform**: unified `/courses/[courseId]/lessons/[lessonId]`
  (replaced separate Roblox/Unity/Scratch/webDev page trees). Content lives in
  `src/lib/lessonContent/`, `src/lib/robloxLessonContent/`, `src/lib/unityLessonContent/`.
- **Auth**: JWT in httpOnly cookie, 10-year expiry with sliding refresh on
  each visit (see commit `f33af72`) — long-lived on purpose, LMS not a bank.

### Known gaps / open questions (do not guess on these — ask)
1. **Paddle catalog not provisioned.** `.env.local` has `PADDLE_API_KEY`,
   `PADDLE_WEBHOOK_SECRET`, `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` set, but **zero**
   `NEXT_PUBLIC_PADDLE_PRICE_*` vars. Products/prices for each
   program × tier (standard/premium) × interval (month/year) must be created
   in the Paddle dashboard first — this needs the account owner, not just an
   API key. Until then every checkout silently falls through to the dev-only
   local grant in non-prod, and would hard-fail in prod.
2. **Admin panel removed, not replaced.** `requireAdmin.js` / `requireTeacher.js`
   and the `admin`/`teacher` roles still exist in the data model, but there is
   no admin UI left (`src/app/[locale]/admin/**` was deleted). Unclear if this
   is deliberate (defer ops tooling until there are paying customers) or
   mid-refactor and still owed. Confirm before rebuilding or before launch —
   day-one operations (refunds, manual grants, viewing signups) currently
   have no UI.
3. **Locale is English-only now** ([src/i18n/routing.js](src/i18n/routing.js):
   `locales: ['en']`). `messages/uk*.json` and `messages/uk/` still exist and
   are still being edited (see recent `git status`), and there's a large
   in-progress UK→EN lesson-content translation effort (`scripts/_translate*`,
   `messages/en/`, `src/lib/lessonContent/en/`). Confirm whether uk is coming
   back post-launch or the translation scripts are cleanup-in-progress toward
   English-only.
4. **README.md is stale** — still describes a Telegram bot system that no
   longer exists in the codebase.
5. Root `.gitignore`-worthy scratch files got tracked historically and were
   deleted in this pass (`log.txt`, `output.txt`, `report.txt`, `result.txt`,
   `source.txt`, `sales_report.csv`, `grades.txt`, `oferta.pdf`, various
   `SECURITY_INCIDENT.md`/`ACQUIRING_SUBMISSION.md`-style docs). Fine to leave
   deleted; don't recreate them.

## Commands

```bash
npm run dev      # next dev --turbopack
npm run build    # next build
npm run start    # next start (production)
npm run lint
node --test src/lib/paddle.test.mjs   # only real automated test today
```

No CI config in-repo. Verify manually: `npm run build`, then click through
`/pricing` → `/start?course=<id>` → checkout in the browser preview.

## Environment

Copy `.env.example` → `.env.local`. Required for the app to boot:
`MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`. Required for Paddle to actually
charge anyone: `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET`,
`NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, and the per-program `NEXT_PUBLIC_PADDLE_PRICE_*`
vars (see gap #1 above). `PADDLE_ENV=sandbox` until Paddle approves the live
account.

## Conventions

- Course IDs are the join key across billing, entitlements, and content —
  see [src/lib/courseIds.js](src/lib/courseIds.js). Never hardcode a course
  id string elsewhere.
- Money/access logic lives in `entitlements.js` + `billingCatalog.js` only.
  Nothing else should read `subscription.status` directly.
- Paddle specifics are isolated to `paddle.js`; the rest of the app should
  stay processor-agnostic through `entitlements.js`.
- Legal/support copy reads from `legalConfig.js`, not inline strings —
  Paddle re-reviews these pages periodically.
