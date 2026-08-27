# Трек A (Cursor) — статус

Оновлено: 2026-08-27 16:10 EEST

## Baseline (до змін)

| Метрика | Очікувано (промпт) | Факт на старті → зараз |
|---|---|---|
| tests | 49 pass | 69 → **92 pass** |
| verify_python | 114 / 0 fail | 114 → **57** (UK root removed) / 0 fail |
| build | ok | ok |
| Python quiz Qs | 513 | 515 |

## Прогрес
- [x] C1 Інвентаризація
- [x] C2 Тест цілісності
- [x] C3 Якість квізів (Python 00–05) — звіт: docs/agents/reports/content-quiz-audit.md
- [ ] C4 Практика
- [ ] C5 practiceValidation тести
- [ ] C6 Prerequisites
- [ ] C7 Теорія
- [ ] C8 Roblox
- [ ] C9 AI at Work
- [ ] C10 Gaps

## Зроблено (по кроках)

### C1
audit-course-content.mjs → 204 уроки / 52 blocking (див. inventory)

### C2
courseContent.test.mjs (6); виправлено Cyrillic lesson-04-1 + placeholders

### C3
Python модулі 00–05: **286 питань переглянуто, ~60 переписано**
- прибрано None/All of the above (00-3, 00-4, 03-1)
- length-leak / thin-explanation flags очищені
- звіт: content-quiz-audit.md
- усі EN lesson imports: `courseData` → `courseData.js` (потрібно для Node ESM у quizValidation.test Antigravity)

## Handoff
- `src/lib/quizValidation.test.mjs` (Antigravity) падає без `.js` у `from '../../courseData.js'` у lesson-файлах — Node ESM. Ми уніфікували імпорти в EN Python уроках. Roblox/AI можуть ще мати extensionless — перевірити їхнім треком.
- Модулі 06–15 ще мають "All of the above" (lesson-07-1, 08-5) — наступний батч C3.

## Заблоковано
(немає)
