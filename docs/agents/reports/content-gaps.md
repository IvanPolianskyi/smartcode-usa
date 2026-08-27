# C10 — Content gaps

Generated: 2026-08-27. Sources: `content-inventory.md`, curricula, lesson content (read-only). No videos or marketing facts invented.

## Video (`videoUrl`)

| Course | Lessons | Empty `videoUrl` |
|---|---:|---:|
| Python | 84 | **84** (100%) |
| Roblox | 92 | 92 (100%) |
| AI at Work | 28 | 28 (100%) |

Inventory confirms: every lesson currently has an empty `videoUrl`.

### Python video priority (suggested first wave)

Produce for foundational modules first (setup + control flow + functions), then OOP/errors, then applied tracks. Durations are **suggested targets** for production planning (not measured from existing media — there is none).

| Priority | Module | Lessons | Suggested length / lesson | Rationale |
|---:|---|---:|---|---|
| 1 | 00 — Objects and Data Structures | 8 | 8–12 min | First impression; install + core types |
| 2 | 02 — Statements | 8 | 8–12 min | Conditionals/loops — high confusion risk |
| 3 | 03 — Methods and Functions | 10 | 10–15 min | Core “write real code” skill |
| 4 | 04 — OOP | 8 | 10–15 min | Abstract; benefits from walkthrough |
| 5 | 01 — Comparison Operators | 3 | 5–8 min | Short module; quick wins |
| 6 | 05 — Errors / Exceptions | 5 | 8–10 min | Debugging habits |
| 7 | 09 — Web Scraping | 4 | 10–15 min | Live HTTP demos help |
| 8 | 14 — Telegram Bots | 4 | 12–18 min | Account/API setup is visual |
| 9 | 15 — FastAPI | 5 | 12–18 min | Server/run demos |
| — | 06–08, 10–13 | remaining | 6–12 min | After wave 1 ships |

**Rough wave-1 budget:** modules 00–05 ≈ 42 lessons × ~10 min ≈ **7 hours** of edited video before applied modules.

Roblox/AI video is also empty; prioritize Python if the “Zero to Junior” claim is the sales lead, then Roblox Studio demos (screen capture of Studio is the natural format).

## Thinner-than-average theory (inventory flags)

Inventory threshold: section `content` length **&lt; 200** chars. **10** short sections flagged:

| Lesson | Location | Chars | Course |
|---|---|---:|---|
| `lesson-12-5` | theory.sections[4] | 147 | Python |
| `lesson-13-1` | theory.sections[5] | 142 | Python |
| `lesson-13-3` | theory.sections[5] | 142 | Python |
| `lesson-14-2` | theory.sections[5] | 137 | Python |
| `lesson-14-3` | theory.sections[5] | 185 | Python |
| `lesson-15-1` | theory.sections[7] | 125 | Python |
| `lesson-15-2` | theory.sections[6] | 131 | Python |
| `lesson-15-3` | theory.sections[6] | 122 | Python |
| `lesson-roblox-5-2` | theory.sections[4] | 173 | Roblox |
| `ai-lesson-00-4` | theory.sections[1] | 185 | AI at Work |

Python short sections cluster in **modules 12–15** (email/GUI/bots/API wrap-ups). Roblox short section is isolated to `lesson-roblox-5-2`. AI: one section in `ai-lesson-00-4`.

Related inventory blockers (not theory length, but gap signals): **27** Python lessons missing `practiceTask` (modules 09–15 cluster), plus Roblox module 05 practice tasks with **0 hints**.

## “Zero to Junior” topic coverage (Python)

Honest present vs absent check against curriculum + EN lesson content (search for dedicated teaching, not incidental mentions).

| Topic | Status | Evidence |
|---|---|---|
| **APIs / HTTP** | **Present** | Module 09 (`requests`, scraping); module 14 (Telegram Bot API); module 15 (FastAPI REST) |
| **Deploy** | **Partial** | `lesson-15-6` “Deploying Your API and Next Steps” — overview (process manager, Docker snippet, checklist). Not a full deploy lab with a live ship |
| **Testing** | **Thin / absent as a track** | `lesson-05-4` Assert and Data Validation; deploy lesson mentions `pytest + httpx` in passing. **No** dedicated pytest/unittest module |
| **Git / version control** | **Absent as a topic** | Mentions only as hygiene (e.g. don’t commit tokens / `.gitignore` for `.env`). **No** lesson on `git init`, branches, or GitHub workflow |
| **venv / virtual environments** | **Absent** | No curriculum title or content hit for `venv` / `virtualenv` / `pipenv` / `poetry` |

Also present (supports junior claim elsewhere): OOP, exceptions, decorators, generators, stdlib modules, images/PDFs/email, Tkinter GUIs, bots, FastAPI.

**Gap summary for the claim:** a motivated student gets solid Python + one API path, but **not** a standard junior toolkit of git + venv + automated tests. Deploy is orientation, not practiced shipping.

## Owner decisions needed

Items that content agents cannot close alone:

1. **Price / Paddle go-live** — catalogue and tiers exist in `billingCatalog.js` (standard vs premium); production still needs real Paddle keys, price IDs, and webhook (known launch blocker in `CLAUDE.md`).
2. **Certificates** — `COURSE_SYSTEM_DOCUMENTATION.md` still describes certificate fields/placeholders; no confirmed ship decision for paid completion certificates.
3. **Live lessons** — premium tier copy references live lessons (`billingCatalog.js`: platform + Discord + 2 live lessons/week). Teacher tooling / scheduling was not ported; owner must confirm whether premium live is launch-scope or later.
4. **Video production** — all 204 `videoUrl` empty. Decide: wave-1 budget (see table), who records, host (YouTube unlisted vs Mux/Vimeo), and whether Roblox Studio capture is in-scope for v1.

## Cross-links

- Inventory: `docs/agents/reports/content-inventory.md`
- Prerequisites: `docs/agents/reports/content-prerequisites.md`
- Roblox structure: `docs/agents/reports/content-roblox-structure.md`
