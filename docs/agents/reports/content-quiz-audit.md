# Quiz quality audit — Python modules 00–05 (C3)

Generated: 2026-08-27

## Scope

Reviewed and improved quizzes for Python EN modules **00 → 05** (42 lessons, **286 questions** total in these modules). Priority: beginners / highest churn.

## Summary table

| Module | Questions reviewed | Rewritten | Left as-is |
|---|---:|---:|---:|
| 00 | 52 | 4 | 48 |
| 01 | 18 | 2 | 16 |
| 02 | 45 | 6 | 39 |
| 03 | 80 | 22 | 58 |
| 04 | 56 | 17 | 39 |
| 05 | 35 | 9 | 26 |
| **Total** | **286** | **60** | **226** |

Also removed remaining **None of the above** / **All of the above** in modules 00 and 03.

Later modules (06+) may still contain "All of the above" (e.g. lesson-07-1, lesson-08-5) — deferred.

## Before → after examples

### 1. lesson-00-3 q1 — banned "None of the above"

**Before:** options `list()` / `[]` / `Both options are correct` / `None of the above` (correct: both).

**After:** `Only with list()` / `Only with []` / `With either list() or []` / `With list[]` — forces a real choice; distractor `list[]` is a common syntax mix-up. Explanation names why the wrong syntax fails.

### 2. lesson-00-4 q1 — same pattern for dicts

**Before:** `None of the above` as a fourth option.

**After:** parallel structure to lists; explanation warns that `{}` is a dict, not a set (`set()` is empty set).

### 3. lesson-03-1 q7 — banned "All of the above"

**Before:** correct answer was literally "All of the above" (fragile under option reorder).

**After:** one clear benefit ("avoid repeating the same code") plus distractors that are wrong for principled reasons (indentation, variables, Jupyter).

### 4. lesson-02-8 q4 — length leak

**Before:** correct option was a long prose description; distractors were short ("list of all books", "An error").

**After:** balanced lengths — "Titles of books rated 4.5 or higher" vs full-dict / ratings-only / syntax-error options of similar width.

### 5. lesson-01-3 q3 — thin explanation

**Before:** `5 > 3 is True, so not True = False.`

**After:** walks parentheses → `True`, then `not` flips it, and why numeric answers `5`/`3` are tempting but wrong.

### 6. lesson-05-2 — IndexError vs TypeError

**Before:** one-line explanations.

**After:** contrasts IndexError with KeyError/ValueError/TypeError so students learn the error family, not a memorised label.

### 7. lesson-00-8 q5 — length leak on deepcopy

**Before:** long correct option listing every copy method; short absurd distractors (`int()`).

**After:** short correct ("Use copy.deepcopy for nested lists") with teaching explanation on shallow vs deep; distractors stay short and wrong for clear reasons.

## Criteria checklist (applied)

- [x] Removed All/None of the above in modules 00–05
- [x] Rebalanced length leaks flagged by scan
- [x] Expanded thin explanations to teach the tempting wrong answer
- [x] Kept question counts and `QUIZ_QUESTION_TYPES` unchanged
- [x] Mix of `multiple_choice`, `code_reading`, `logic`, `true_false` preserved where already present

## Not done in this pass

- Full pedagogical rewrite of every remaining "memory" question in 00–05 (only weakest + flagged)
- Modules 06–15 and Roblox / AI at Work quizzes
- Automated CI rule forbidding "All of the above" (could add to `courseContent.test.mjs` later)
