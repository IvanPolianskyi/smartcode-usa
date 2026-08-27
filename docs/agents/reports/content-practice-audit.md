# Practice audit (C4)

Generated: 2026-08-27

## Metrics

| Check | Result |
|---|---|
| `verify_python_solutions.mjs` | Checked **57** solutions (**171** examples). Failed: **0** |
| Practices with ≥3 examples | **57 / 57** (was 56; only `lesson-00-1` had 1) |
| Hints rewritten | `lesson-00-1` (lead without spoiling solution code) |
| Verifier | EN-only dir; prints `lessonId example[i]` on failure; counts examples |

## Changes

1. **lesson-00-1** — expanded from 1 → 3 illustrative examples (typical / Hi-Bye / unusual Hey+See you); clarified `problemStatement` against `lineRules`; hints now: sketch → tool (`print`) → structure words (no full code).
2. **verify_python_solutions.mjs** — drop removed UK root; always iterate every example; clearer failure label.

## Not done (honest)

- Full hint rewrite across all 57 practices (only 00-1 + prior quality).
- Difficulty monotonicity audit per module.
- Adding automated practices to Python modules 09–15 (still missing `practiceTask` — see inventory / gaps).
