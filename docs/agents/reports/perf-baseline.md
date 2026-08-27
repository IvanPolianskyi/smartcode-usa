# Baseline Performance Report (Track B — Antigravity)

**Date**: 2026-08-27  
**Build Tool**: Next.js 16.1.1 (Turbopack)  
**Node.js**: v22.14.0  

---

## 1. Route Table (`npm run build`)

```text
Route (app)
┌ ○ /_not-found
├ ● /[locale]
│ └ /en
├ ● /[locale]/admin
│ └ /en/admin
├ ● /[locale]/admin/live-lessons
│ └ /en/admin/live-lessons
├ ƒ /[locale]/admin/students/[studentId]
├ ○ /[locale]/apple-icon.png
├ ƒ /[locale]/auth/enter
├ ● /[locale]/contact
│ └ /en/contact
├ ● /[locale]/courses
│ └ /en/courses
├ ƒ /[locale]/courses/[courseId]
├ ƒ /[locale]/courses/[courseId]/lessons/[lessonId]
├ ● /[locale]/dashboard
│ └ /en/dashboard
├ ● /[locale]/forgot-password
│ └ /en/forgot-password
├ ○ /[locale]/icon.png
├ ● /[locale]/login
│ └ /en/login
├ ƒ /[locale]/opengraph-image
├ ƒ /[locale]/plans/[courseId]
├ ● /[locale]/pricing
│ └ /en/pricing
├ ƒ /[locale]/privacy
├ ƒ /[locale]/refund
├ ● /[locale]/register
│ └ /en/register
├ ● /[locale]/reset-password
│ └ /en/reset-password
├ ● /[locale]/start
│ └ /en/start
├ ƒ /[locale]/terms
├ ● /[locale]/welcome
│ └ /en/welcome
├ ƒ /api/admin/live-lessons
├ ƒ /api/admin/live-lessons/[id]
├ ƒ /api/admin/stats
├ ƒ /api/admin/students
├ ƒ /api/admin/students/[studentId]
├ ƒ /api/admin/students/[studentId]/grant
├ ƒ /api/admin/students/[studentId]/revoke
├ ƒ /api/arcade/leaderboard
├ ƒ /api/arcade/score
├ ƒ /api/auth/delete-account
├ ƒ /api/auth/forgot-password
├ ƒ /api/auth/login
├ ƒ /api/auth/logout
├ ƒ /api/auth/magic
├ ƒ /api/auth/me
├ ƒ /api/auth/register
├ ƒ /api/auth/reset-password
├ ƒ /api/billing/cancel
├ ƒ /api/billing/change-plan
├ ƒ /api/billing/local-grant
├ ƒ /api/billing/portal
├ ƒ /api/billing/reconcile
├ ƒ /api/billing/status
├ ƒ /api/billing/webhook
├ ƒ /api/courses/enroll
├ ƒ /api/live-lessons
├ ƒ /api/progress
├ ƒ /api/upload
├ ƒ /api/visit
├ ○ /robots.txt
└ ○ /sitemap.xml

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

---

## 2. Top 20 Client Chunks by Size (`.next/static/chunks`)

| Rank | Size (KB) | Chunk Filename | Contents / Primary Origin |
|---|---|---|---|
| 1 | **3906 KB** | `0e855232203e6cc8.js` | Roblox lesson content (all 24 modules EN + UK) & maps |
| 2 | **2756 KB** | `9762117c5863d9cf.js` | Python lesson content (`lessonContentMap.en` + `lessonContentMap.uk`) |
| 3 | **218 KB** | `249261e921aeebba.js` | Core framework / React runtime / Turbopack runtime |
| 4 | **113 KB** | `a6dad97d9634a72d.js.map` | Source map |
| 5 | **110 KB** | `a6dad97d9634a72d.js` | Shared libraries & helpers |
| 6 | **108 KB** | `3e200bca904262de.js` | `lucide-react` icons & component bundle |
| 7 | **107 KB** | `84e71e5714455e94.css` | Global CSS bundle |
| 8 | **57 KB** | `65b5e7ee5766c7d3.js` | `LessonPage.js` monolithic component code |
| 9 | **54 KB** | `7013ea60b086887c.js` | `CoursePage.js` & curriculum data |
| 10 | **54 KB** | `75ed626d3d028915.js` | `pythonCurriculum.js` (43 KB) + metadata |
| 11 | **52 KB** | `9ae92e91e43d9a8c.css` | Component styles |
| 12 | **42 KB** | `0dcd302116dfeb2d.css` | Component styles |
| 13 | **40 KB** | `b208afbd1c9eaf07.js` | Dashboard / Arcade components |
| 14 | **40 KB** | `b7e31d2f7cb95527.js` | Next-intl & routing bundle |
| 15 | **38 KB** | `4d7bb9eccc47a678.js` | `RobloxLessonPage.js` component code |
| 16 | **36 KB** | `6371365d94181b90.js` | Interactive quiz & gamification blocks |
| 17 | **34 KB** | `087ae57cb3eb475f.js` | `pyodideRunner.js` + practice validation |
| 18 | **33 KB** | `30a04bf96fdbd20f.js` | Auth / Admin helpers |
| 19 | **33 KB** | `40ddd58f9397a711.js` | Support & Navigation components |
| 20 | **33 KB** | `7ce192e8d07f7711.js` | Billing & Checkout components |

**Total for Top 2 Chunks alone**: **6,662 KB** (6.66 MB of static text data pushed to clients!).

---

## 3. Lesson Page First Load JS Breakdown

On `/[locale]/courses/[courseId]/lessons/[lessonId]`:

1. **Course Content (Massive Bloat - 6.66 MB)**:
   - `lessonContentMap.en` (84 Python lessons) + `lessonContentMap.uk` (dead UK copies): ~2.75 MB
   - `robloxLessonContent` (all 24 modules EN + UK): ~3.9 MB
   - Static client imports in `LessonPage.js` and `RobloxLessonPage.js` force Turbopack to bundle the entire academy course catalog into client JavaScript.
2. **Curriculum Data**:
   - `getCurriculum` imports `pythonCurriculum.js` (43 KB raw), `robloxCurriculumLocale.js`, and `aiAtWorkCurriculum.js` into client state.
3. **Icons (`lucide-react`)**:
   - ~108 KB bundled icon representations across client components.
4. **Pyodide & Execution**:
   - `pyodideRunner.js` loaded eagerly in client bundle even during theory/quiz reading.
5. **Markdown Parser**:
   - Monolithic embedded regex parser duplicated in `LessonPage.js` (50+ lines) vs standalone `markdownToHtml.js`.
6. **Gamification & Interactive**:
   - `InteractiveBlock`, `XpHud`, `AchievementToast`, `FillBlankBlock`, `PredictOutputBlock`, `TryItBlock`, `VarTraceBlock` bundled directly.

---

## 4. Audit of `'use client'` Directives (51 Files)

| File | Verdict | Strategy |
|---|---|---|
| `src/app/[locale]/admin/live-lessons/page.js` | Keep Client | Interactive admin form & state table |
| `src/app/[locale]/admin/students/[studentId]/page.js` | Keep Client | Student grants management actions |
| `src/app/[locale]/admin/page.js` | Keep Client | Search filter table & real-time counts |
| `src/app/[locale]/courses/page.js` | Refactor | Page can be Server Component; only client filter/modals needed |
| `src/app/[locale]/dashboard/page.js` | Refactor | Server Component page; client widgets embedded |
| `src/app/[locale]/forgot-password/page.js` | Keep Client | Client auth form |
| `src/app/[locale]/login/page.js` | Keep Client | Client auth form |
| `src/app/[locale]/register/page.js` | Keep Client | Client auth form |
| `src/app/[locale]/reset-password/page.js` | Keep Client | Client auth form |
| `src/app/[locale]/start/page.js` | Keep Client | Interactive checkout flow |
| `src/app/[locale]/welcome/page.js` | Keep Client | Interactive onboarding flow |
| `src/components/Analytics/Analytics.js` | Keep Client | Browser event listeners |
| `src/components/AuthSessionProvider.js` | Keep Client | React Context Provider |
| `src/components/Billing/CheckoutButton.js` | Keep Client | Paddle overlay checkout trigger |
| `src/components/Billing/PlanPicker.js` | Keep Client | Plan pricing tabs & checkout button |
| `src/components/Course/CoursePage.js` | Keep Client | Syllabus accordions & preview modals |
| `src/components/Course/CourseScrollEnable.js` | Keep Client | Tiny DOM effect hook |
| `src/components/Dashboard/ArcadeLeaderboard.js` | Keep Client | Real-time leaderboard view |
| `src/components/Dashboard/CodeCrushGame.js` | Keep Client | Canvas / DOM arcade game |
| `src/components/Dashboard/MyCoursesSection.js` | Keep Client | Interactive course progression cards |
| `src/components/Dashboard/PremiumLiveLessons.js` | Keep Client | Live lesson slot reservation UI |
| `src/components/Dashboard/ProfileAccountSection.js` | Keep Client | Account settings & profile edits |
| `src/components/Lesson/Gamification/AchievementToast.js` | Keep Client | Toast notification rendering |
| `src/components/Lesson/Gamification/XpHud.js` | Keep Client | Interactive XP counters |
| `src/components/Lesson/Interactive/FillBlankBlock.js` | Keep Client | Interactive fill-in-the-blank block |
| `src/components/Lesson/Interactive/InteractiveBlock.js` | Keep Client | Practice dispatcher |
| `src/components/Lesson/Interactive/PredictOutputBlock.js` | Keep Client | Code prediction quiz block |
| `src/components/Lesson/Interactive/TryItBlock.js` | Keep Client | Code runner block |
| `src/components/Lesson/Interactive/VarTraceBlock.js` | Keep Client | Step-by-step variable tracer |
| `src/components/Lesson/LessonMissions.js` | Keep Client | Gamification mission checklists |
| `src/components/Lesson/LessonPage.js` | **Refactor Monolith** | Remove all static content map imports; accept `lesson` prop from RSC; lazy load Pyodide; split into `LessonTheory`, `LessonPractice`, `LessonQuiz`, `LessonNav` |
| `src/components/Lesson/LessonPageLoading.js` | Keep Client | Loading fallback UI |
| `src/components/Lesson/LessonPageWithSidebar.js` | Keep Client | Sidebar drawer & step tabs |
| `src/components/Lesson/RobloxLessonPage.js` | **Refactor Monolith** | Remove all static content imports; accept `lesson` prop from RSC |
| `src/components/Motion/Reveal.js` | Keep Client | Animation observer |
| `src/components/Nav/HomeNavAuth.js` | Keep Client | Auth state dependent CTA |
| `src/components/Nav/LmsHeader.js` | Keep Client | Header with dynamic navigation |
| `src/components/Nav/SiteHeader.js` | Keep Client | Marketing site mobile menu |
| `src/components/Nav/StickyNav.js` | Keep Client | Intersection-based sticky header |
| `src/components/Support/SupportWidget.js` | Keep Client | Chat trigger widget |
| `src/components/Visual/DemoScenes.js` | Keep Client | Interactive visual demo |
| `src/components/Visual/HeroDemo.js` | Keep Client | Interactive hero animation |
| `src/hooks/useArcadeProgress.js` | Keep Client | Hook for local storage / state |
| `src/hooks/useBillingStatus.js` | Keep Client | Hook for polling / status |
| `src/hooks/useCopyCodeBlocks.js` | Keep Client | Hook for code block clipboard copy |
| `src/hooks/useCoursesListData.js` | Keep Client | Hook for courses filtering |
| `src/hooks/useDashboardCourses.js` | Keep Client | Hook for dashboard state |
| `src/hooks/useLessonGamification.js` | Keep Client | Hook for XP calculation & rewards |
| `src/hooks/usePaddlePrices.js` | Keep Client | Hook for fetching prices |
| `src/lib/authClient.js` | Keep Client | Client API client |
| `src/lib/pyodideRunner.js` | Keep Client | Lazy Pyodide WebAssembly runner |

---

## 5. Optimization Plan

1. **A2 — Server-Side Content Loading (RSC)**:
   - `src/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.js` loads the specific lesson content on the server (`lessonContentMap.en[lessonId]`, `getRobloxLessonContent(lessonId, 'en')`, `getAiAtWorkLessonContent(lessonId)`).
   - Pass serialized `lesson` prop to `LessonPage` / `RobloxLessonPage`.
   - Remove static imports of `lessonContentMapEn`, `lessonContentMapUk`, `robloxLessonContent`, `aiAtWorkLessonContent` from client files.
   - Result: Client bundle drops by ~6.66 MB immediately.
2. **A3 — Dead Code Removal**:
   - Verify zero imports and remove `src/lib/unityLessonContent/` (287 KB).
   - Remove dead root UK copies in `src/lib/lessonContent/*.js` (1.73 MB).
   - Remove dead UK Roblox content in `src/lib/robloxLessonContent/uk/` (2.30 MB).
   - Remove dead UK map generator in `scripts/build-lesson-content-maps.mjs` and `lessonContentMap.uk.js`.
3. **A4 — Decompose `LessonPage.js` Monolith**:
   - Extract unified `markdownToHtml` from `src/lib/markdownToHtml.js`.
   - Split into `LessonTheory`, `LessonPractice`, `LessonQuiz`, `LessonNav`.
   - Dynamic import Pyodide runner only when practice tab is activated.
   - Pass trimmed navigation metadata instead of full curriculum tree.
4. **A5 — Security**:
   - Verify HTML escaping, sanitize markdown link schemes (`javascript:` blocking).
   - Restrict `images.remotePatterns` in `next.config.mjs`.
5. **A6 — Accessibility (a11y)**:
   - Full keyboard navigation, focus visible, ARIA roles, quiz radio groups, contrast.
6. **A7 — Core Web Vitals**:
   - Priority images, CLS prevention, CSS cleanup.
7. **A8 — SEO**:
   - Sitemap, robots.js, metadata.
8. **A9 — Tooling**:
   - Fix `npm run lint` with proper flat config and ignore patterns.
   - Expand `npm test` to run all `src/**/*.test.mjs`.
9. **A10 — Tests**:
   - Add unit tests for `markdownToHtml`, `lessonContentLoader`, `quizValidation`.
