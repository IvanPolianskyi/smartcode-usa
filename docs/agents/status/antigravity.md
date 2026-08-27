# Трек B — Antigravity: Статус

Оновлено: 2026-08-27 14:50

## Прогрес
- [x] A1 Карта бандла і baseline — done, звіт: `docs/agents/reports/perf-baseline.md`
- [ ] A2 Прибрати контент курсів із клієнтського бандла — in progress
- [ ] A3 Мертвий код — todo
- [ ] A4 Розібрати монолітний LessonPage.js — todo
- [ ] A5 Безпека рендерингу контенту — todo
- [ ] A6 Доступність (a11y) — todo
- [ ] A7 Core Web Vitals і рендеринг — todo
- [ ] A8 SEO — todo
- [ ] A9 Полагодити інструменти якості — todo
- [ ] A10 Тести — todo

## Зроблено (по кроках)

### A1: Карта бандла і baseline
- **Що змінено**: 
  - Встановлено devDependency `@next/bundle-analyzer` і підключено до `next.config.mjs` під прапорцем `ANALYZE=true`.
  - Згенеровано baseline звіт: `docs/agents/reports/perf-baseline.md`.
- **Як перевірено**:
  - `node --test "src/**/*.test.mjs"`: 69 pass / 0 fail.
  - `npm run build`: успішно (39/39 статичних сторінок).
  - Зафіксовано топ-20 чанків (`0e855232203e6cc8.js`: 3906 KB, `9762117c5863d9cf.js`: 2756 KB).
  - Проінспектовано всі 51 файл із `'use client'`.
- **Метрика baseline**:
  - Розмір топ-2 чанків з контентом у клієнті: **6,662 KB (6.66 MB)**.
  - Тести: 69 pass / 0 fail.

## Handoff (знахідки в чужих або заморожених файлах)
- `src/lib/lessonContent/en/lesson-12-2.js` — містить сирий `<img>` тег замість оптимізованого формату — пропозиція: нормалізувати через контентний пайплайн (Cursor) — ризик: CLS при завантаженні.

## Заблоковано
- Немає блокерів.
