# SmartCode Academy

Next.js 16 (App Router, Turbopack) LMS selling self-paced coding courses (Roblox
Studio, Python, AI for Real Life) by subscription via Paddle. MongoDB backend, JWT
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
1. **Paddle is not connected anywhere yet — this is the launch blocker.**
   - `.env.local` holds `test_paddle_*` *placeholders*, not real keys.
   - Vercel **production has no Paddle variables at all** (`vercel env ls`
     shows only Mongo/JWT/site/support vars). So on smartcode.academy today a
     signed-in visitor cannot buy: there is no price ID, and the dev-only
     local grant is blocked in prod.
   - No `NEXT_PUBLIC_PADDLE_PRICE_*` exists in either environment.

   The catalogue itself no longer has to be built by hand:

   ```bash
   npm run paddle:provision -- --dry-run   # show the plan
   npm run paddle:provision                # create 6 products + 12 prices
   npm run paddle:doctor                   # verify env, prices, trial, webhook
   ```

   `paddle-provision.mjs` is idempotent (tags everything with
   `custom_data.smartcode_key`), reads every number from `billingCatalog.js` /
   `legalConfig.js`, sets the advertised `trialDays` trial on each price, and
   prints the exact env block to paste into `.env.local` and Vercel.
   `paddle-doctor.mjs` fails loudly on anything that would stop a payment from
   granting access — mismatched sandbox/live env, a price without the
   advertised trial, a missing webhook destination or unsubscribed event.

   Still owner-only (cannot be scripted): a real API key + client token +
   notification secret, approving `smartcode.academy` as a Paddle.js domain,
   and creating the webhook destination pointing at
   `https://smartcode.academy/api/billing/webhook`.
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
   ship.
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
npm test         # node --test src/lib/paddle.test.mjs (the only automated test)
npm run paddle:provision   # create/repair the Paddle catalogue (add --dry-run / --fix)
npm run paddle:doctor      # preflight: env, prices, trial, webhook destination
```

`npm run lint` is broken (Next 16 removed `next lint`, and the flat ESLint
config throws a circular-structure error). Verification is `npm run build`.
Do not run `npm run build` while `next dev` is up — it overwrites `.next` and
the dev server starts 500ing until restarted.

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
