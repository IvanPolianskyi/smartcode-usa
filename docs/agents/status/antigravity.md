# Трек B — Antigravity: Статус

Оновлено: 2026-08-27 14:53

## Прогрес
- [x] A1 Карта бандла і baseline — done, звіт: `docs/agents/reports/perf-baseline.md`
- [x] A2 Прибрати контент курсів із клієнтського бандла — done, звіт: `docs/agents/reports/perf-after.md`
- [ ] A3 Мертвий код — in progress
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

### A2: Прибрати контент курсів із клієнтського бандла
- **Що змінено**:
  - Створено серверний лоадер `src/lib/lessonContentLoader.js` для підвантаження окремого уроку на сервері.
  - `src/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.js` дістає урок на сервері та передає пропом `lesson` у клієнтські компоненти.
  - `src/components/Lesson/LessonPage.js` та `src/components/Lesson/RobloxLessonPage.js` очищено від статичних імпортів контенту та мап.
  - `src/lib/robloxLessonContent/index.js` переведено на прямі EN імпорти та lazy побудову серверної мапи; видалено жадібну ініціалізацію на рівні модуля.
  - `src/lib/quizValidation.js` переведено на чистий `lessonContentMap.en.js`.
  - `scripts/build-lesson-content-maps.mjs` оновлено для генерації EN мапи з розширеннями `.js`.
- **Як перевірено**:
  - `node --test "src/**/*.test.mjs"`: 69 pass / 0 fail.
  - `npm run build`: успішно (39/39 сторінок).
  - Виміряно розміри чанків: чанки `0e855232203e6cc8.js` (3.9 MB) та `9762117c5863d9cf.js` (2.75 MB) повністю зникли з клієнтського бандла.
- **Метрика до/після**:
  - Клієнтський бандл контенту курсів: **6,662 KB → 0 KB (-6.66 MB / -100%)**.
  - Найбільший клієнтський JS файл: **3,906 KB → 218 KB** (core runtime).

## Handoff (знахідки в чужих або заморожених файлах)
- `src/lib/lessonContent/en/lesson-12-2.js` — містить сирий `<img>` тег замість оптимізованого формату — пропозиція: нормалізувати через контентний пайплайн (Cursor) — ризик: CLS при завантаженні.

## Заблоковано
- Немає блокерів.
