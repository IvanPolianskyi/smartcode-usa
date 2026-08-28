# SmartCode Academy

Next.js 16 (App Router, Turbopack) LMS selling self-paced coding courses (Roblox
Studio, Python, AI for Real Life) by subscription via Paddle. MongoDB backend, JWT
cookie auth. Legal seller: Ivan Polianskyi, sole proprietor (FOP), Ukraine.

## Status (2026-08-28)

The pivot away from the old sprawling Ukrainian marketing site (per-course
landing pages, affiliate cabinet, certificates, CRM sync, Telegram leads,
Monobank/LiqPay) to a single-locale (English) SaaS course platform billed
through Paddle is **done and committed**. Work since then has been content
(lesson quality, quizzes, practice grading) and landing-page iteration.

The working tree usually carries a large number of uncommitted content edits,
and several Claude sessions may be editing this repo at once — run
`git status` before assuming the state of any file.

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
  priced → opens Paddle overlay checkout. Signed-out → register → resumes at
  `/start`. The dev-only local grant
  ([src/app/api/billing/local-grant/route.js](src/app/api/billing/local-grant/route.js),
  hard-blocked when `NODE_ENV=production`) only fires when a price ID is
  missing, which is no longer the normal path — all 12 prices are configured.
- **Tiers**: `SELLABLE_TIER_IDS` in `billingCatalog.js` is the single switch
  for what the public site sells. It is `['standard']` right now — Premium is
  deliberately not offered on any marketing/purchase surface, while remaining
  fully live in the webhook, entitlements, admin grants, and for existing
  subscribers. Put `'premium'` back in that array to start selling it again;
  do not re-add tier copy page by page.
- **Legal pages**: `/terms`, `/privacy`, `/refund` pull merchant details from
  [src/lib/legalConfig.js](src/lib/legalConfig.js) (reads env, never hardcodes
  placeholders — Paddle reviewers check these).
- **Course platform**: unified `/courses/[courseId]/lessons/[lessonId]`
  (replaced separate Roblox/Unity/Scratch/webDev page trees). Content lives in
  `src/lib/lessonContent/`, `src/lib/robloxLessonContent/`, `src/lib/unityLessonContent/`.
- **Auth**: JWT in httpOnly cookie, 10-year expiry with sliding refresh on
  each visit (see commit `f33af72`) — long-lived on purpose, LMS not a bank.

### Known gaps / open questions (do not guess on these — ask)
1. **Paddle is connected in sandbox.** `.env.local` holds real credentials —
   `PADDLE_API_KEY` (`pdl_…`), `PADDLE_WEBHOOK_SECRET`,
   `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, and **all 12**
   `NEXT_PUBLIC_PADDLE_PRICE_*` IDs (`pri_…`, standard + premium × 3 programs
   × monthly/annual). Checkout opens and pays with sandbox test cards.

   Do **not** tell the user checkout is unconfigured — read `.env.local`
   first. What is genuinely still open is **live**: `PADDLE_ENV=sandbox`, so
   no real money moves yet, and whether Vercel production carries the Paddle
   vars is unverified from here (no Vercel CLI installed — ask the owner or
   run `vercel env ls` once it is).

   ```bash
   npm run paddle:doctor                   # verify env, prices, trial, webhook
   npm run paddle:provision -- --dry-run   # show catalogue repairs before applying
   npm run paddle:provision                # create/repair 6 products + 12 prices
   npm run paddle:go-live                  # one-shot live bootstrap (needs a live key)
   ```

   `paddle-provision.mjs` is idempotent (tags everything with
   `custom_data.smartcode_key`), reads every number from `billingCatalog.js` /
   `legalConfig.js`, and sets the advertised `trialDays` trial on each price.
   `paddle-doctor.mjs` fails loudly on anything that would stop a payment from
   granting access — mismatched sandbox/live env, a price without the
   advertised trial, a missing webhook destination or unsubscribed event.
   `paddle-go-live.mjs` recreates the catalogue on the live account, mints a
   live client token, and creates the production webhook destination; it never
   touches sandbox and never writes Vercel for you.

   Still owner-only: the live API key, approving `smartcode.academy` as a
   Paddle.js domain, and pasting the printed env block into Vercel.
2. ~~Admin panel removed, not replaced.~~ Rebuilt 2026-08-26, scoped to the
   new model: `/admin` (student list + search + subscription counts) and
   `/admin/students/[studentId]` (subscription history, manual grant/revoke).
   API in [src/app/api/admin/](src/app/api/admin/). Manual grants are tagged
   `paddleCustomerId: 'admin_manual'` so the webhook (which only matches on
   `paddleSubscriptionId`) can never confuse one for a real purchase. Revoking
   a real Paddle subscription calls Paddle's cancel API, not just a local
   status flip. The old CRM-era admin surface (groups, receipts, teacher
   scheduling, lesson-slot booking) was **not** ported — this panel only
   covers billing support (view a student, grant/revoke course access).
   Teacher-facing tooling is still owed if/when premium-tier live lessons
   ship — currently moot, since Premium is not being sold (see Tiers above).
3. **Locale is English-only** ([src/i18n/routing.js](src/i18n/routing.js):
   `locales: ['en']`). `messages/uk.json` and `messages/uk/` still exist, plus
   leftover UK→EN translation tooling in `scripts/` (`translate-*.mjs`,
   `_translate_*` logs/caches). Confirm before deleting any of it whether uk
   is coming back post-launch or this is cleanup-in-progress.
4. Root `.gitignore`-worthy scratch files got tracked historically and were
   deleted in this pass (`log.txt`, `output.txt`, `report.txt`, `result.txt`,
   `source.txt`, `sales_report.csv`, `grades.txt`, `oferta.pdf`, various
   `SECURITY_INCIDENT.md`/`ACQUIRING_SUBMISSION.md`-style docs). Fine to leave
   deleted; don't recreate them.

## Commands

```bash
npm run dev      # next dev --turbopack
npm run build    # next build
npm run start    # next start (production)
npm run lint     # eslint . — passes (0 errors, ~16 pre-existing warnings)
npm test         # node --test over src/**/*.test.mjs — 123 tests, all passing
npm run paddle:provision   # create/repair the Paddle catalogue (add --dry-run)
npm run paddle:doctor      # preflight: env, prices, trial, webhook destination
npm run paddle:go-live     # live bootstrap once a live API key exists
```

`npm test` runs 12 suites (billing activation/catalog, entitlements, paddle,
course content, lesson loader/drip/XP, quiz + practice validation, markdown,
codeCrush) through `scripts/node-loader.mjs`, which resolves the `@/` alias.

Do not run `npm run build` while `next dev` is up — it overwrites `.next` and
the dev server starts 500ing until restarted.

No CI config in-repo. Verify with `npm test` + `npm run build`, then click
through `/pricing` → checkout in the browser preview.

## Environment

Copy `.env.example` → `.env.local`. Required for the app to boot:
`MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`. Paddle needs `PADDLE_API_KEY`,
`PADDLE_WEBHOOK_SECRET`, `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, and the
per-program `NEXT_PUBLIC_PADDLE_PRICE_*` vars — **all of these are already
populated in `.env.local`** (sandbox). `PADDLE_ENV=sandbox` until the live
account is switched over; run `npm run paddle:doctor` to confirm the current
state rather than trusting this file.

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
- Which tiers the site sells is `SELLABLE_TIER_IDS` in `billingCatalog.js`,
  not a judgement call per page. Anything that lists or sells tiers should
  iterate it.
- This file goes stale. Before telling the user something is missing,
  unconfigured, or broken, check the actual source — `.env.local`,
  `git log`, the script — and trust that over what you read here.
