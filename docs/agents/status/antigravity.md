# Трек B — Antigravity: Статус

Оновлено: 2026-08-27 14:54

## Прогрес
- [x] A1 Карта бандла і baseline — done, звіт: `docs/agents/reports/perf-baseline.md`
- [x] A2 Прибрати контент курсів із клієнтського бандла — done, звіт: `docs/agents/reports/perf-after.md`
- [x] A3 Мертвий код — done
- [ ] A4 Розібрати монолітний LessonPage.js — in progress
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
  - `npm run build`: успішно (39/39 сторінок).
  - Виміряно розміри чанків: чанки `0e855232203e6cc8.js` (3.9 MB) та `9762117c5863d9cf.js` (2.75 MB) повністю зникли з клієнтського бандла.
- **Метрика до/після**:
  - Клієнтський бандл контенту курсів: **6,662 KB → 0 KB (-6.66 MB / -100%)**.
  - Найбільший клієнтський JS файл: **3,906 KB → 218 KB** (core runtime).

### A3: Мертвий код
- **Що змінено**:
  - Підтверджено grep-ом 0 імпортів у `src/` для `unityLessonContent`, `robloxLessonContent/uk`, `lessonContentMap.uk` та кореневих `src/lib/lessonContent/*.js`.
  - Видалено `src/lib/unityLessonContent/` (287 KB).
  - Видалено `src/lib/robloxLessonContent/uk/` (2298 KB).
  - Видалено `src/lib/lessonContentMap.uk.js` (7.7 KB).
  - Видалено 84 мертві українські файли `src/lib/lessonContent/*.js` (1732 KB), збережено всі файли `src/lib/lessonContent/en/**`.
  - Оновлено `.gitignore` для ігнорування сміттєвих файлів (`*.csv`, `tasks.json`, `tmp_lesson-*.js`, `nul.css`, `scripts/_baseline_counts.*`).
- **Як перевірено**:
  - `npm run build`: успішно (39/39 сторінок).
  - Кількість файлів EN: 84 Python + 12 Roblox модулів інтактні.
- **Метрика до/після**:
  - Видалено мертвого коду з репозиторію: **~4.32 MB**.

## Handoff (знахідки в чужих або заморожених файлах)
- `src/lib/lessonContent/en/lesson-12-2.js` — містить сирий `<img>` тег замість оптимізованого формату — пропозиція: нормалізувати через контентний пайплайн (Cursor) — ризик: CLS при завантаженні.
- `src/lib/lessonContent/en/lesson-04-1.js` — містить кириличний фрагмент у контенті EN (`src/lib/courseContent.test.mjs:307`) — пропозиція: Cursor завершить переклад — ризик: тест контенту.

## Заблоковано
- Немає блокерів.
