# Паралельна робота над продуктом: Cursor + Antigravity

Два незалежні треки покращення SmartCode Academy, які виконуються **одночасно**
і **не перетинаються по файлах**.

| Трек | Інструмент | Промпт | Зона відповідальності |
|------|-----------|--------|----------------------|
| **A — Контент і педагогіка** | Cursor | [cursor-prompt.md](cursor-prompt.md) | Дані курсів: уроки, теорія, квізи, практика, curriculum, тести цілісності контенту |
| **B — Платформа і продуктивність** | Antigravity | [antigravity-prompt.md](antigravity-prompt.md) | Рендеринг, бандл, лоадери контенту, a11y, SEO, CSS, збірка, lint |

Границя одним реченням:

> **Cursor редагує те, ЩО читає студент. Antigravity редагує те, ЯК це потрапляє в браузер.**

---

## 1. Як стартувати — рекомендований шлях (git worktree)

Робоче дерево зараз брудне й активно змінюється (див. `git status`). Два агенти
в одній теці **зламають одне одному збірку**: `next build` і `next dev --turbopack`
пишуть в один і той самий `.next/`.

Тому — окремий worktree на кожного агента.

Крок 1, зафіксувати поточний WIP:

```bash
git add -A && git commit -m "wip: snapshot before parallel agent work"
```

Крок 2, створити два worktree:

```bash
git worktree add ../smartcode-cursor -b agent/cursor-content
```

```bash
git worktree add ../smartcode-antigravity -b agent/antigravity-platform
```

Крок 3, встановити залежності в кожному (node_modules не спільні):

```bash
cd ../smartcode-cursor && npm ci
```

```bash
cd ../smartcode-antigravity && npm ci
```

Крок 4, скопіювати `.env.local` у кожен worktree (він у `.gitignore`, тому сам не переноситься):

```bash
cp .env.local ../smartcode-cursor/.env.local && cp .env.local ../smartcode-antigravity/.env.local
```

Далі:

- у **Cursor** відкрити теку `../smartcode-cursor`;
- в **Antigravity** відкрити теку `../smartcode-antigravity`;
- дати кожному його стартову команду (розділ 3).

Порти dev-серверів рознесені: Cursor — `3001`, Antigravity — `3002` (прописано в промптах).

Коли обидва закінчать:

```bash
git merge agent/cursor-content && git merge agent/antigravity-platform
```

Конфліктів бути не повинно — таблиця володіння (розділ 2) розводить файли повністю.

### Fallback: якщо worktree не варіант (одна тека на двох)

Тоді діють жорсткі правила:

1. **Тільки один агент одночасно** запускає `npm run build` або `npm run dev`.
   Перед запуском агент створює `docs/agents/status/BUILD-LOCK.md` з рядком
   `locked by: <agent> at <time>` і видаляє його одразу після завершення.
   Якщо файл існує — чекати, не запускати.
2. Ніхто не робить `git checkout`, `git stash`, `git reset`, `git clean` — тільки редагування файлів.
3. Таблиця володіння з розділу 2 стає обов'язковою, а не рекомендованою.

---

## 2. Таблиця володіння файлами

Агент має **ексклюзивне право на запис** у свої шляхи. Читати чуже — можна й треба.
Писати в чуже — заборонено, навіть якщо «там баг на один рядок».

### Трек A — Cursor (контент)

```
src/lib/lessonContent/en/**
src/lib/robloxLessonContent/en/**
src/lib/robloxLessonContent/lesson-roblox-*.js
src/lib/aiAtWorkLessonContent/en/**
src/lib/pythonCurriculum.js
src/lib/pythonModuleMeta.js
src/lib/robloxCurriculum.js
src/lib/robloxCurriculumLocale.js
src/lib/robloxModuleMeta.js
src/lib/aiAtWorkCurriculum.js
src/lib/getCurriculum.js
src/lib/courseData.js
src/lib/practiceValidation.js
src/lib/parsePracticeStdin.js
src/lib/pythonCodeGuard.js
src/lib/courseContent.test.mjs          (новий)
src/lib/practiceValidation.test.mjs     (новий)
scripts/audit-course-content.mjs        (новий)
scripts/audit-*.mjs
scripts/verify_python_solutions.mjs
docs/agents/reports/content-*.md        (нові)
docs/agents/status/cursor.md            (новий)
```

### Трек B — Antigravity (платформа)

```
src/components/Lesson/**
src/components/Course/**
src/components/Dashboard/**
src/components/Nav/**
src/components/Visual/**
src/components/Motion/**
src/components/Icons/**
src/components/Support/**
src/app/[locale]/courses/**
src/app/[locale]/dashboard/**
src/app/[locale]/page.js
src/app/[locale]/page.module.css
src/app/globals.css
src/styles/**
src/lib/lessonContentMap.en.js
src/lib/lessonContentMap.uk.js
src/lib/robloxLessonContent/index.js
src/lib/aiAtWorkLessonContent/index.js
src/lib/lessonContentLoader.js          (новий, якщо знадобиться)
src/lib/quizValidation.js
src/lib/markdownToHtml.js
src/lib/createPageMetadata.js
src/lib/i18nMetadata.js
src/lib/courseUtils.js
src/lib/courseLessonAccess.js
src/hooks/useCopyCodeBlocks.js
src/hooks/useCoursesListData.js
src/hooks/useDashboardCourses.js
src/app/sitemap.js
src/app/robots.js
scripts/build-lesson-content-maps.mjs
next.config.mjs
eslint.config.mjs
package.json                            (тільки scripts + видалення невживаних deps)
docs/agents/reports/perf-*.md           (нові)
docs/agents/reports/a11y-audit.md       (новий)
docs/agents/status/antigravity.md       (новий)
```

### Заморожені шляхи — не чіпає НІХТО з двох

Це або активний незакомічений WIP власника (Paddle, аналітика, SEO), або зона,
де помилка коштує реальних грошей:

```
src/lib/paddle.js  paddleClient.js  paddleCountry.js  paddleEvents.js  paddleIps.js
src/lib/billingCatalog.js
src/lib/entitlements.js
src/lib/subscriptionStore.js
src/lib/startCheckout.js
src/lib/analytics.js
src/lib/structuredData.js
src/lib/legalConfig.js
src/lib/lessonGamification.js
src/lib/auth.js  authClient.js  authLogin.js  authUserResponse.js  loadUser.js
src/lib/mongodb.js
src/lib/requireAdmin.js  requireAdminRoute.js  requireTeacher.js
src/lib/lessonDrip.js
src/components/Billing/**
src/components/Analytics/**
src/components/Seo/**
src/components/Legal/**
src/components/AttributionCapture/**
src/app/api/**                (весь API: billing, admin, auth, progress, upload)
src/app/[locale]/admin/**
src/app/[locale]/start/**  register/**  login/**  welcome/**  pricing/**  plans/**
src/app/[locale]/terms/**  privacy/**  refund/**  contact/**
src/app/[locale]/layout.js
src/app/[locale]/opengraph-image.js
src/hooks/useBillingStatus.js  usePaddlePrices.js
src/i18n/**
messages/**
scripts/paddle-*.mjs
.env*
vercel.json
CLAUDE.md
```

Якщо агент знайшов баг у замороженому файлі — **не виправляє**, а записує знахідку
у свій status-файл у розділ `## Handoff` (файл:рядок, опис, пропозиція, ризик).

---

## 3. Стартові команди для агентів

**Cursor:**

```
Прочитай docs/agents/cursor-prompt.md і виконай його повністю, крок за кроком. Це твоє єдине завдання на цю сесію.
```

**Antigravity:**

```
Прочитай docs/agents/antigravity-prompt.md і виконай його повністю, крок за кроком. Це твоє єдине завдання на цю сесію.
```

---

## 4. Спільний контракт тестування

Обов'язково для **обох** треків. Жоден крок не вважається завершеним, поки це не зелене.

```bash
node --test "src/**/*.test.mjs"
```

Базовий стан на 2026-08-27: **49 pass / 0 fail**. Регресія = зупинка й полагодження.

```bash
npm run build
```

Має завершитись без помилок. Порівнюйте вивід First Load JS до і після своїх змін.

```bash
node scripts/verify_python_solutions.mjs
```

Базовий стан: **Checked 114 practice solutions. Failed: 0**. Потребує `python` у PATH
(перевірено на цій машині: Python 3.12.5). Скрипт створює тимчасові `tmp_lesson-*.js`
у корені репозиторію й прибирає їх за собою — якщо після падіння вони лишились,
видаліть вручну, у коміт вони потрапити не мають.

Про `npm run lint`: зараз зламаний (Next 16 прибрав `next lint`, flat-config кидає
circular structure error). Полагодити його — задача **A9 у треку Antigravity**.
До того моменту єдина верифікація збірки — це `npm run build`.

`npm test` наразі запускає лише `src/lib/paddle.test.mjs`. Antigravity розширює його
до glob у задачі A9 — після цього нові тести Cursor підхоплюються автоматично.

---

## 5. Протокол звітності

Кожен агент **веде свій окремий файл** (не спільний — щоб не було конфліктів запису):

- Cursor → `docs/agents/status/cursor.md`
- Antigravity → `docs/agents/status/antigravity.md`

Формат:

```markdown
# <Трек> — статус

Оновлено: <дата, час>

## Прогрес
- [x] C1 Інвентаризація контенту — done, звіт: docs/agents/reports/content-inventory.md
- [ ] C2 Тест цілісності — in progress

## Зроблено (по кроках)
### C1
Що змінено: <файли>
Як перевірено: <команда + фактичний результат>
Метрика до/після: <числа>

## Handoff (знахідки в чужих або заморожених файлах)
- src/app/api/progress/route.js:88 — <опис> — пропозиція: <що зробити> — ризик: <який>

## Заблоковано
- <що і чому>
```

Оновлювати після **кожної** завершеної задачі, а не наприкінці. Це єдиний спосіб
для власника бачити прогрес двох треків, не перериваючи роботу.

---

## 6. Definition of Done для обох треків

Задача закрита, коли виконано **все**:

1. Зміни зроблені лише у своїх файлах (перевірка: `git status --short` — нічого чужого).
2. `node --test "src/**/*.test.mjs"` — зелений, тестів не менше, ніж було.
3. `npm run build` — успішний.
4. Є **вимірювана** метрика до/після. Не «стало краще», а «First Load JS на
   /courses/[courseId]/lessons/[lessonId]: 412 kB → 180 kB» або «14 уроків без
   explanation у квізі → 0».
5. Status-файл оновлений.
6. Один коміт на задачу з префіксом треку: `content: ...` для Cursor,
   `platform: ...` для Antigravity.

---

## 7. Загальні заборони (обидва треки)

- Не переписувати архітектуру «під себе»: міграція на TypeScript, нові UI-бібліотеки,
  state-менеджери, зміна структури роутів — **ні**, якщо це не прописано в задачі.
- Не додавати нових npm-залежностей без явного дозволу в промпті.
- Не робити `git push`, не створювати PR, не чіпати гілки крім своєї.
- Не вигадувати функціонал, якого немає в коді, і не писати в документацію плани як факт.
- Не видаляти й не пропускати тести (`skip`, `only`), щоб зробити збірку зеленою.
- Не робити масові автозаміни по всьому репозиторію без попереднього dry-run звіту.
- Не чіпати `.env.local` і не друкувати вміст секретів у логах чи звітах.
