# C8 — Roblox lesson structure

Generated: 2026-08-27. Sources: `robloxCurriculum.js`, `src/lib/robloxLessonContent/en/**`, `RobloxLessonPage.js` (read-only).

## practiceTask coverage

| Metric | Value |
|---|---:|
| Lessons in curriculum | 92 |
| Lessons with `practiceTask` in content | **92** |
| Missing practiceTask | 0 |

Inventory (`content-inventory.md`) also reports 92/92 with practice. Module 05 has practice tasks but **0 hints** on all 10 lessons (quality flag, not absence).

## How practice is validated (`RobloxLessonPage.js`)

Practice is **not** automated Lua execution. Students work in Roblox Studio; the LMS only gates completion on a **self-attested checklist**, then calls `completePracticeTask`.

Key mechanism:

```js
const practiceChecklistReady =
  practiceChecks.studio && practiceChecks.steps && practiceChecks.saved
```

Three checkboxes must be true before "Mark practice complete" enables:

1. Opened Studio (`checklistOpenStudio`)
2. Did the steps (`checklistDidSteps`)
3. Saved the Place (`checklistSaved`)

UI copy (practice step): *"Studio Practice: Follow the steps in Roblox Studio, save your Place, and complete the checklist."*

On click, `handleMarkPractice` posts `action: 'completePracticeTask'` — no server-side Lua judge. Quiz scoring is separate (multiple-choice in-app).

Contrast with Python: Python `practiceTask` is meant for in-browser / judge-style checks; Roblox practice is checklist + Studio homework.

## Density by module (01–12)

Measures from EN content files: average theory section count, average quiz question count, average theory `content` character length, and approximate lesson object size (chars of the lesson slice in the module file).

Course averages: **~9 522** theory chars/lesson; **~19 442** approx lesson size chars. Every module has **15** quiz questions per lesson (constant).

| Mod | Title | Lessons | Avg theory sections | Avg quiz Qs | Avg theory chars | Avg approx size |
|---|---|---:|---:|---:|---:|---:|
| 01 | 01 - Creator Start | 8 | 11.1 | 15 | 11 938 | 25 452 |
| 02 | 02 - World craft | 4 | 9.8 | 15 | 8 772 | 20 050 |
| 03 | 03 - Playable code | 8 | 15.4 | 15 | 13 751 | 22 488 |
| 04 | 04 - Tables & data | 8 | 15.9 | 15 | 9 416 | 19 658 |
| 05 | 05 - Obby | 10 | 12.7 | 15 | 8 392 | 18 837 |
| 06 | 06 - Simulator | 10 | 11.7 | 15 | 11 318 | 22 646 |
| 07 | 07 - Tycoon | 8 | 11.3 | 15 | 8 015 | 17 012 |
| 08 | 08 - Arena | 8 | 11.5 | 15 | 7 336 | 15 743 |
| 09 | 09 - Race + networking | 8 | 12.1 | 15 | 7 404 | 16 308 |
| 10 | 10 - Living hub | 8 | 12.1 | 15 | 8 947 | 18 173 |
| 11 | 11 - Polish | 6 | 12.3 | 15 | 7 889 | 16 765 |
| 12 | 12 - Release | 6 | 13.2 | 15 | 10 342 | 19 062 |

Mid-course density (modules 05–09) sits below early foundations (01, 03) and below release (12) on theory chars, with 08/09 the thinnest.

## Weakest modules by theory density

Lowest average theory `content` characters (primary density signal):

| Rank | Module | Avg theory chars | Avg approx size | Avg sections |
|---:|---|---:|---:|---:|
| 1 | **08 — Arena** | 7 336 | 15 743 | 11.5 |
| 2 | **09 — Race + networking** | 7 404 | 16 308 | 12.1 |
| 3 | **11 — Polish** | 7 889 | 16 765 | 12.3 |

Honorable mention: **07 — Tycoon** (8 015 avg theory chars). Module **05 — Obby** is mid on theory chars but inventory flags short section + empty hints across the module.

Quiz count is uniform (15) so it does not differentiate modules; theory length does.
