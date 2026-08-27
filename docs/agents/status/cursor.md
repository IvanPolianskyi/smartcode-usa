# Трек A (Cursor) — статус

Оновлено: 2026-08-27 16:45 EEST

## Baseline → зараз

| Метрика | Старт сесії | Зараз |
|---|---|---|
| `node --test "src/**/*.test.mjs"` | 69 pass | **109+ pass** (C2+C5 + Antigravity tests) |
| `verify_python_solutions` | 114 → 57 EN | **57 solutions / 171 examples / Failed: 0** |
| `npm run build` | ok | ok |
| Audit blocking | n/a | ~48 (було 52; Cyrillic/TODO прибрано) |

## Прогрес
- [x] C1 Інвентаризація — `content-inventory.md`
- [x] C2 Тест цілісності — `courseContent.test.mjs`
- [x] C3 Квізи Python 00–05 — `content-quiz-audit.md` (~60 питань переписано)
- [x] C4 Практика — `content-practice-audit.md` (00-1 → 3 examples; verifier EN+indexes)
- [x] C5 `practiceValidation.test.mjs` (17 тестів)
- [x] C6 Prerequisites — `content-prerequisites.md` + sync fixes + Roblox bridges
- [ ] C7 Теорія (педагогіка) — **не зроблено** (час)
- [x] C8 Roblox структура — `content-roblox-structure.md` (звіт; слабкі 08/09/11 не переписані)
- [ ] C9 AI at Work full pass — **не зроблено**
- [x] C10 Gaps — `content-gaps.md`

## Handoff
- `quizValidation.test.mjs` потребує `from '../../courseData.js'` у Python EN уроках (Node ESM). Уніфіковано.
- Unlock прогресу йде по curriculum order (`courseLessonAccess.js`), не по графу prerequisites — ризик: граф може брехати без ефекту на drip.
- Roblox practice = Studio self-checklist, не автоперевірка Lua (див. C8 звіт).
- Python modules 09–15: 27 уроків без `practiceTask`.
- "All of the above" лишилось у lesson-07-1, 08-5.

## Заблоковано
- Відео для 84 Python уроків (не вигадувати URL).
- Рішення власника: обсяг відео, сертифікати, live-уроки, git/venv у курикулумі (див. gaps).

## Підсумок

Для студента: квізи початкових Python-модулів чесніші (без All/None of the above, кращі пояснення), перша практика (00-1) зрозуміліша, автотести ловлять зламаний квіз/плейсхолдер/кирилицю і хибне зарахування практики. Граф prerequisites узгоджений; Roblox модулі з’єднані мостами.

Найпріоритетніше далі: C7 теорія (тонкі секції + гачки), практики для modules 09–15, C9 AI at Work, відео-план з gaps, дочистити квізи 06+.
