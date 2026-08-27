# Трек A (Cursor) — статус

Оновлено: 2026-08-27 15:00 EEST

## Baseline (до змін)

Відхилення від очікуваного (промпт: 49 pass / 513 quiz):

| Метрика | Очікувано (промпт) | Факт |
|---|---|---|
| `node --test "src/**/*.test.mjs"` | 49 pass / 0 fail | **69 pass / 0 fail** |
| `verify_python_solutions` | Checked 114, Failed: 0 | Checked 114, Failed: 0 |
| `npm run build` | успіх | успіх |
| Python EN | 84 уроків, 513 квіз-питань, videoUrl "" ×84 | 84 / **515** / 84 |
| Roblox EN | 92, 0 comingSoon | 92 / 0 |
| AI at Work | 28 у 6 модулях | 28 / 6 |

Порт dev: 3001. Робота в основній теці з BUILD-LOCK на час build.

## Прогрес
- [x] C1 Інвентаризація контенту — done, звіт: docs/agents/reports/content-inventory.md
- [ ] C2 Тест цілісності
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
Як перевірено: `node scripts/audit-course-content.mjs` (exit 1 — є blocking); `node --test "src/**/*.test.mjs"` → 69 pass
Метрика до/після:
- до: немає аудиту
- після: **204 уроки, 52 проблеми (усі blocking)**
  - Python missing practiceTask: 27 (модулі 09–15)
  - short theory sections: 10
  - Roblox module 05 без hints: 10
  - Cyrillic в EN: 2 (lesson-03-7, 04-1)
  - placeholder TODO/todo: 2 (roblox 4-8, 12-4)
  - practice examples <2: 1 (lesson-00-1)
  - AI short section: 1

## Handoff (знахідки в чужих або заморожених файлах)

(ще немає)

## Заблоковано

(ще немає)
