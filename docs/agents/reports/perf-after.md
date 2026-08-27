# Performance After Report (Track B — Antigravity)

**Date**: 2026-08-27  
**Optimization Step**: A2 (Remove Course Content from Client Bundles)  

---

## 1. Top Client Bundle Chunks Comparison

| Chunk / Asset | Size Before | Size After (A2) | Delta | Notes |
|---|---|---|---|---|
| `0e855232203e6cc8.js` (Roblox Content EN + UK) | **3,906 KB** | **0 KB** (Eliminated) | **-3,906 KB (-100%)** | Removed from client bundle |
| `9762117c5863d9cf.js` (Python Content EN + UK) | **2,756 KB** | **0 KB** (Eliminated) | **-2,756 KB (-100%)** | Removed from client bundle |
| Top JS runtime chunk (`249261e921aeebba.js`) | 218 KB | 218 KB | 0 KB | Core React / Turbopack runtime |
| Total Top 2 Content Bloat | **6,662 KB** | **0 KB** | **-6.66 MB (-100%)** | **6.66 MB saved on every lesson page load!** |

---

## 2. Largest Client JS Files After A2

1. `249261e921aeebba.js` — 218 KB (React & Turbopack framework runtime)
2. `a6dad97d9634a72d.js` — 110 KB (Shared utilities)
3. `3e200bca904262de.js` — 108 KB (Lucide icons)
4. `de037b804d1c9620.js` — 59 KB (Turbopack chunks)
5. `65b5e7ee5766c7d3.js` — 57 KB (Monolithic `LessonPage.js` — targeted in A4)

---

## 3. Architecture Changes

1. **Server-Side Content Resolution**:
   - `src/lib/lessonContentLoader.js` was introduced to resolve individual lessons on the server side (`getLessonContent(courseId, lessonId, locale)`).
   - `src/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.js` fetches only the single requested lesson and passes it as `lesson` prop to `LessonPage` and `RobloxLessonPage`.
2. **Client Components Cleaned**:
   - `LessonPage.js`: Removed static imports of `lessonContentMapEn` (84 Python lessons) and `lessonContentMapUk`. Accepts `lesson` prop from RSC.
   - `RobloxLessonPage.js`: Removed imports of `getRobloxLessonContent` and `getAiAtWorkLessonContent`. Accepts `lesson` prop from RSC.
3. **Module-level Map Execution Removed**:
   - `src/lib/robloxLessonContent/index.js`: Removed eager `robloxLessonContentMap = buildMapForLocale('en')` at module root. Refactored to lazily build server maps and directly import EN module sources instead of individual UK bridges.
   - `src/lib/quizValidation.js`: Updated to use clean `lessonContentMap.en.js` without UK copies.
