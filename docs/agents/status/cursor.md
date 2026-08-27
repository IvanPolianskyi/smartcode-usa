# Трек A (Cursor) — статус

Оновлено: 2026-08-27 15:25 EEST

## Baseline (до змін)

Відхилення від очікуваного (промпт: 49 pass / 513 quiz):

| Метрика | Очікувано (промпт) | Факт на старті |
|---|---|---|
| `node --test "src/**/*.test.mjs"` | 49 pass / 0 fail | **69 pass / 0 fail** |
| `verify_python_solutions` | Checked 114, Failed: 0 | Checked 114 → зараз **57** (UK root `lessonContent/*.js` прибрано іншим треком) / Failed: 0 |
| `npm run build` | успіх | успіх |
| Python EN | 84 / 513 quiz / videoUrl "" ×84 | 84 / **515** / 84 |
| Roblox EN | 92, 0 comingSoon | 92 / 0 |
| AI at Work | 28 у 6 модулях | 28 / 6 |

## Прогрес
- [x] C1 Інвентаризація контенту — done, звіт: docs/agents/reports/content-inventory.md
- [x] C2 Тест цілісності — done, `src/lib/courseContent.test.mjs`
- [ ] C3 Якість квізів
- [ ] C4 Практика
- [ ] C5 practiceValidation тести
- [ ] C6 Prerequisites
- [ ] C7 Теорія
- [ ] C8 Roblox структурна повнота
- [ ] C9 AI at Work
- [ ] C10 Gaps report

## Зроблено (по кроках)

### C1
Що змінено: `scripts/audit-course-content.mjs`, `docs/agents/reports/content-inventory.md`
Як перевірено: audit exit 1 (blocking є); tests 69 pass
Метрика: **204 уроки, 52 blocking** на першому прогоні

### C2
Що змінено:
- `src/lib/courseContent.test.mjs` (6 тестів)
- `lesson-03-7.js` — прибрано кирилицю в «Global»
- `lesson-04-1.js` — повний EN переклад (був весь українською)
- `module04-lessons.js` / `module12-lessons.js` — прибрано false-positive / реальний TODO
- audit: uppercase `TODO` only (lowercase «todo» = to-do list)

Як перевірено: тест **спочатку впав** на 4 дефектах (Cyrillic×2, TODO×2) → виправлено → 6/6 green; full suite **82 pass**; build OK; verify Failed: 0
Метрика до/після: 69 → 82 тестів; Cyrillic EN lessons 2 → 0; placeholder TODO 2 → 0

## Handoff (знахідки в чужих або заморожених файлах)

(ще немає)

## Заблоковано

(ще немає)
