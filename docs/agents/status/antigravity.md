# Трек B — Antigravity: Статус

Оновлено: 2026-08-27 14:58

## Прогрес
- [x] A1 Карта бандла і baseline — done, звіт: `docs/agents/reports/perf-baseline.md`
- [x] A2 Прибрати контент курсів із клієнтського бандла — done, звіт: `docs/agents/reports/perf-after.md`
- [x] A3 Мертвий код — done
- [x] A4 Розібрати монолітний LessonPage.js — done
- [x] A5 Безпека рендерингу контенту — done
- [x] A6 Доступність (a11y) — done, звіт: `docs/agents/reports/a11y-audit.md`
- [ ] A7 Core Web Vitals і рендеринг — in progress
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

### A4: Розібрати монолітний LessonPage.js
- **Що змінено**:
  - Замінено дубльований інлайн markdown-парсер на безпечний `src/lib/markdownToHtml.js`.
  - Декомпоновано моноліт на модульні компоненти: `LessonTheory`, `LessonPractice`, `LessonQuiz`, `LessonNav`, `LessonSidebar`.
  - Практика та середовище Pyodide переведені на dynamic import (`ssr: false`) та завантажуються за вимогою.
  - Навігація та curriculum передаються з Server Component пропом, прибрано клієнтські імпорти важких файлів навчальних планів.
  - Мемоізовано HTML-трансформацію теорії та квізів (`useMemo`).
- **Як перевірено**:
  - `node --test "src/**/*.test.mjs"`: 82 pass / 0 fail.
  - `npm run build`: успішно (39/39 сторінок).
- **Метрика до/після**:
  - `LessonPage.js` скорочено з 1735 рядків до компактного контролера (650 рядків) з ізольованими компонентами.

### A5: Безпека рендерингу контенту
- **Що змінено**:
  - `src/lib/markdownToHtml.js`: додано попереднє HTML-екранування тексту перед підстановкою розмітки та санітизацію схем посилань (блокування `javascript:`, `vbscript:`, `data:`).
  - `src/lib/markdownToHtml.test.mjs`: додано повний набір unit-тестів на XSS / sanitization / markdown edge cases.
  - `next.config.mjs`: видалено небезпечний wildcard `hostname: '**'` з `images.remotePatterns`.
- **Як перевірено**:
  - `node --test src/lib/markdownToHtml.test.mjs`: 7 pass / 0 fail.
  - `npm run build`: успішно.
- **Метрика до/після**:
  - Всі посилання тепер мають захист від XSS (`rel="noopener noreferrer"`, блокування небезпечних протоколів), wildcard SSRF закрито.

### A6: Доступність (a11y)
- **Що змінено**:
  - Додано глобальні `:focus-visible` стилі у `src/app/globals.css` для всіх інтерактивних елементів.
  - Додано `.sr-only` utility клас.
  - Оновлено `--sc-muted` у `src/styles/tokens.css` з `#8b919c` (2.8:1) до `#626975` (4.6:1) для повного проходження WCAG AA (≥4.5:1).
  - Перевірено та додано ARIA-ролі для табів (`tablist`, `tab`, `tabpanel`), радіогруп квізів (`radiogroup`, `radio`, `aria-checked`), статусних оголошень (`aria-live="polite"`).
  - Згенеровано детальний звіт: `docs/agents/reports/a11y-audit.md`.
- **Як перевірено**:
  - Аудит контрастності кольорів та клавіатурної навігації.
  - `npm run build`: успішно.

## Handoff (знахідки в чужих або заморожених файлах)
- `src/lib/lessonContent/en/lesson-12-2.js` — містить сирий `<img>` тег замість оптимізованого формату — пропозиція: нормалізувати через контентний пайплайн (Cursor) — ризик: CLS при завантаженні.

## Заблоковано
- Немає блокерів.
