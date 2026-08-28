# ТРЕК B — Antigravity: продуктивність, доступність, якість платформи

> Це твоє повне завдання на сесію. Виконуй крок за кроком, зверху вниз.
> Паралельно з тобою в іншому worktree працює другий агент (Cursor) над **вмістом**
> курсів. Він **не чіпає** твої файли, ти **не чіпаєш** його.
> Правила співіснування: [README.md](README.md) — прочитай його теж.

---

## 0. Контекст: що це за продукт і що ти робиш

SmartCode Academy — LMS на Next.js 16 (App Router, Turbopack, **JavaScript, не TypeScript**),
що продає курси програмування за підпискою через Paddle. MongoDB, JWT-cookie auth,
хостинг Vercel. Локаль **одна — англійська** (`src/i18n/routing.js`: `locales: ['en']`).

Проєкт готується до запуску реальних продажів. Твоя мета — **довести платформу
до рівня, де сторінка уроку відкривається миттєво, працює з клавіатури, читається
скрінрідером і не тягне в браузер мегабайти чужого контенту.**

Ти працюєш з **доставкою й рендерингом**. Текст уроків, квізи й практику не чіпаєш —
це зона Cursor.

### Головна відома проблема (виміряна, не гіпотеза)

`src/components/Lesson/LessonPage.js` — це `"use client"` компонент на 67 KB, який
у рядках 25–26 **статично імпортує обидві мапи контенту**:

```js
import { lessonContentMap as lessonContentMapEn } from '@/lib/lessonContentMap.en'
import { lessonContentMap as lessonContentMapUk } from '@/lib/lessonContentMap.uk'
```

і вибирає одну в рантаймі (рядок 204): `locale === 'uk' ? lessonContentMapUk : lessonContentMapEn`.

Оскільки локаль en-only, uk-гілка **недосяжна назавжди**, але обидві мапи потрапляють
у клієнтський бандл. Це, за вихідними файлами:

| Що | Розмір джерел | Потрібно для одного уроку |
|---|---|---|
| `src/lib/lessonContent/en/` (84 файли) | **1316 KB** | ~15 KB |
| `src/lib/lessonContent/*.js` — uk-копії | **1732 KB** | 0 (мертві) |
| `src/lib/robloxLessonContent/en/` | **1703 KB** | ~20 KB |
| `src/lib/robloxLessonContent/uk/` | **2298 KB** | 0 (мертві) |
| `src/lib/unityLessonContent/` | **287 KB** | 0 (нуль імпортів у всьому `src/`) |

Те саме в `src/components/Lesson/RobloxLessonPage.js` — він `'use client'` і імпортує
`getRobloxLessonContent` з `src/lib/robloxLessonContent/index.js`, а той файл
статично імпортує **всі 24 модулі (en + uk)** і ще й **жадібно будує мапу на рівні
модуля**:

```js
export const robloxLessonContentMap = buildMapForLocale('en')
```

Це означає, що студент, який відкрив урок 1-1, завантажує весь курс двома мовами.
Це твоя задача №1 і найбільший потенційний виграш у продукті.

---

## 1. ОБОВ'ЯЗКОВЕ ЧИТАННЯ перед першою правкою

Прочитай **повністю** і лише потім починай.

### 1.1 Контекст

| Файл | Навіщо |
|---|---|
| `CLAUDE.md` (корінь) | Стан проєкту, конвенції, відомі прогалини. Ключове: `npm run lint` зламаний, верифікація — `npm run build`; **не запускай build, поки живий `next dev`** — вони пишуть в один `.next/`. |
| `docs/agents/README.md` | Таблиця володіння, заморожені шляхи, контракт тестування, формат звіту. |
| `next.config.mjs` | Поточні налаштування: `compress`, `images` (webp/avif, `minimumCacheTTL` 1 рік), кеш-хедери для статики, rewrites. |
| `src/i18n/routing.js` | `locales: ['en']` — підстава вважати весь uk-код мертвим. |

### 1.2 Гаряча зона — сторінка уроку

| Файл | Що зрозуміти |
|---|---|
| `src/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.js` | **Server component.** Вже вантажить користувача, прогрес, права доступу і рендерить `LessonPage` або `RobloxLessonPage` через `next/dynamic`. Це правильне місце, щоб підвантажити контент уроку **на сервері** і передати пропом. Файл твій. |
| `src/components/Lesson/LessonPage.js` (67 KB) | Монолітний клієнтський компонент: теорія, приклади, практика з Pyodide, квіз, навігація, власний markdown-парсер усередині. Головна ціль оптимізації. |
| `src/components/Lesson/RobloxLessonPage.js` | Те саме для Roblox і AI at Work. |
| `src/components/Lesson/LessonPageWithSidebar.js`, `LessonPageLoading.js` | Обгортка й лоадер. |
| `src/lib/lessonContentMap.en.js` / `.uk.js` | Згенеровані мапи (`scripts/build-lesson-content-maps.mjs`). Твої. |
| `src/lib/robloxLessonContent/index.js` | Лоадер Roblox: статичні імпорти всіх модулів + жадібна побудова мапи. Твій. |
| `src/lib/aiAtWorkLessonContent/index.js` | Те саме для AI at Work. Твій. |
| `src/lib/quizValidation.js` | Серверна перевірка квізу, теж імпортує обидві мапи. Використовується з `src/app/api/progress/route.js` — **а цей API-роут заморожений**. Тримай публічний API `quizValidation` синхронним, щоб не довелось його чіпати. |

### 1.3 Решта поверхонь

| Файл | Що зрозуміти |
|---|---|
| `src/lib/markdownToHtml.js` | Власний markdown → HTML. Викликається на кожній секції при рендері. Результат вставляється через `dangerouslySetInnerHTML` (10 місць у двох компонентах Lesson). |
| `src/lib/courseLessonAccess.js`, `src/lib/courseUtils.js` | Логіка доступу до уроків і допоміжні функції. |
| `src/lib/getCurriculum.js` | Тягне **три** curriculum-файли (`pythonCurriculum.js` сам по собі 43 KB) — і це імпортується в клієнтські компоненти. |
| `src/components/Course/CoursePage.js`, `src/app/[locale]/courses/**` | Сторінки курсу і списку курсів. |
| `src/components/Dashboard/**` | Кабінет студента, зокрема `CodeCrushGame.js` — перевір, чи він не тягнеться в бандл усюди. |
| `src/components/Nav/**`, `Visual/**`, `Motion/**` | Шапка, футер, герой, анімації. |
| `src/app/globals.css`, `src/styles/**` | Глобальні стилі. |
| `src/app/sitemap.js`, `src/app/robots.js`, `src/lib/createPageMetadata.js`, `src/lib/i18nMetadata.js` | SEO-поверхня. |
| `src/lib/paddle.test.mjs` | Зразок стилю тестів у цьому репозиторії (`node:test`, без фреймворків). |

---

## 2. Твої межі

**Ти редагуєш** усе з розділу «Трек B» у `docs/agents/README.md` §2. Коротко:
`src/components/{Lesson,Course,Dashboard,Nav,Visual,Motion,Icons,Support}/**`,
`src/app/[locale]/{courses,dashboard}/**`, `src/app/[locale]/page.js`,
`src/app/globals.css`, `src/styles/**`, лоадери контенту й мапи,
`quizValidation.js`, `markdownToHtml.js`, `courseUtils.js`, `courseLessonAccess.js`,
`createPageMetadata.js`, `i18nMetadata.js`, `src/hooks/{useCopyCodeBlocks,useCoursesListData,useDashboardCourses}.js`,
`src/app/{sitemap,robots}.js`, `next.config.mjs`, `eslint.config.mjs`,
`package.json` (тільки `scripts` і видалення невживаних залежностей),
`scripts/build-lesson-content-maps.mjs`.

**Ти НЕ редагуєш:**

- **Жодного файлу з вмістом уроків** — `src/lib/lessonContent/en/**`,
  `src/lib/robloxLessonContent/en/**` і `lesson-roblox-*.js`,
  `src/lib/aiAtWorkLessonContent/en/**`, усі `*Curriculum*.js`, `courseData.js`,
  `practiceValidation.js`, `parsePracticeStdin.js`, `pythonCodeGuard.js`.
  Це файли Cursor, він у них зараз пише.
- Усі заморожені шляхи з `README.md` §2: білінг, Paddle, auth, **весь `src/app/api/**`**,
  admin, сторінки start/register/login/welcome/pricing/plans/legal,
  `src/app/[locale]/layout.js`, `src/i18n/**`, `messages/**`, `.env*`, `vercel.json`, `CLAUDE.md`.

**Особливе правило про мертвий uk-контент.** Ти маєш право **видалити**
`src/lib/lessonContent/*.js` (uk-копії в корені теки), `src/lib/robloxLessonContent/uk/**`,
`src/lib/lessonContentMap.uk.js` і `src/lib/unityLessonContent/**` — але:

1. Спершу доведи, що вони недосяжні: `grep -rn "unityLessonContent\|lessonContentMap.uk\|robloxLessonContent/uk" src/` і покажи результат у звіті.
2. Роби це **окремим комітом**, який не змішаний з іншими змінами (щоб легко відкотити).
3. Якщо вирішиш не видаляти, а лише виключити з бандла — це теж прийнятно і навіть безпечніше; головне, щоб байти не доїжджали до браузера.

**Особливе правило про `src/app/api/**`.** Він заморожений. Якщо твій рефакторинг
лоадерів **вимагає** зміни в `src/app/api/progress/route.js` — зупинись і вибери
інший дизайн (див. §4, A2: правильне рішення такої потреби не створює).
Якщо все ж не уникнути — не редагуй, а запиши в `## Handoff`.

---

## 3. Baseline — виміряй ПЕРЕД тим, як щось міняти

Це найважливіший крок усього треку: без чисел «до» твоя робота недоказова.

```bash
node --test "src/**/*.test.mjs"
```

```bash
npm run build
```

Із виводу `npm run build` **збережи повну таблицю маршрутів** (Route / Size / First Load JS)
у `docs/agents/reports/perf-baseline.md`. Особливо рядок
`/[locale]/courses/[courseId]/lessons/[lessonId]`.

Додатково зафіксуй:

```bash
node -e "const fs=require('fs'),p='.next/static/chunks';const f=fs.readdirSync(p).map(n=>[n,fs.statSync(p+'/'+n).size]).sort((a,b)=>b[1]-a[1]).slice(0,20);f.forEach(([n,s])=>console.log((s/1024).toFixed(0).padStart(7)+' KB  '+n))"
```

Очікуваний стан на 2026-08-27: тести **49 pass / 0 fail**, build успішний,
`npm run lint` — **зламаний** (це задача A9).

Твій dev-порт — **3002** (3001 у Cursor):

```bash
npm run dev -- -p 3002
```

**Ніколи не запускай `npm run build`, поки в цьому ж worktree живий `next dev`** —
вони перезаписують `.next/` і dev-сервер починає віддавати 500 до перезапуску.

---

## 4. Задачі

**A1–A4 обов'язкові** — це те, заради чого весь трек. A5–A10 — за пріоритетом.
Після кожної: тести → build → заміряти → оновити статус → окремий коміт `platform: <що>`.

---

### A1. Карта бандла і план (обов'язково)

Розберись, що саме летить у клієнт на сторінці уроку і чому.

Дозволено **один** новий devDependency для вимірювання: `@next/bundle-analyzer`
(підключити в `next.config.mjs` під прапорцем `ANALYZE=true`, щоб він не впливав
на звичайну збірку). Більше нових залежностей додавати не можна.

Здай `docs/agents/reports/perf-baseline.md`:

- таблиця маршрутів із `npm run build`;
- топ-20 чанків за розміром;
- для сторінки уроку — з чого складається First Load JS: контент, curriculum,
  `lucide-react`, Pyodide, власний markdown-парсер, решта;
- перелік усіх 32 файлів із `'use client'` і вердикт по кожному: клієнт справді
  потрібен / можна перевести в server component / можна винести інтерактивну частину.

---

### A2. Прибрати контент курсів із клієнтського бандла (обов'язково — головна задача)

**Прописаний дизайн** (обраний саме тому, що не зачіпає заморожений `src/app/api/**`):

1. Сторінка-роут `src/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.js` —
   вже server component. Хай **вона** дістає контент саме цього уроку
   (`lessonContentMap.en[lessonId]` / `getRobloxLessonContent(lessonId)`) і передає
   готовий об'єкт уроку пропом у `LessonPage` / `RobloxLessonPage`.
2. `LessonPage.js` і `RobloxLessonPage.js` **більше не імпортують** ані мапи, ані
   `robloxLessonContent/index.js`, ані `aiAtWorkLessonContent/index.js`. Вони
   приймають `lesson` пропом.
3. `src/lib/lessonContentMap.en.js` і `quizValidation.js` лишаються **синхронними**
   і server-only — тоді `src/app/api/progress/route.js` міняти не треба взагалі.
4. `src/lib/robloxLessonContent/index.js`: прибрати жадібний
   `export const robloxLessonContentMap = buildMapForLocale('en')` на рівні модуля
   (якщо на нього хтось посилається — знайди через grep і переведи на функцію),
   прибрати всі імпорти `uk`-модулів.
5. Якщо після цього серверний бандл усе одно тягне всі 12 модулів на кожен урок —
   переведи `index.js` на `await import()` по модулю, з кешем у `Map`. Тільки
   переконайся, що виклик лишився серверним.

Ризики, які треба перевірити **до** коміту:

- Прогрес/квіз усе ще працюють: пройди урок у браузері на `:3002` — теорія,
  практика (Pyodide реально запускає код), квіз, зарахування.
- Навігація між уроками (prev/next) не втрачає контент.
- `robots: 'noindex, nofollow'` на сторінці уроку лишився.
- Обʼєкт уроку серіалізується в RSC-payload: усередині не має бути функцій,
  `undefined` у несподіваних місцях, `Date`. Якщо є — нормалізуй **у лоадері**
  (твій файл), а не в контенті (файл Cursor).

**Критерій приймання:** таблиця «First Load JS до → після» для сторінки уроку в
`docs/agents/reports/perf-after.md`. Мета — скорочення в рази, не на відсотки.

---

### A3. Мертвий код (обов'язково, окремим комітом)

- `src/lib/unityLessonContent/**` — 287 KB, **нуль імпортів** у `src/`. Підтвердь grep-ом і видали.
- `src/lib/lessonContent/*.js` (uk-копії в корені) — 1732 KB, недосяжні при `locales: ['en']`.
- `src/lib/robloxLessonContent/uk/**` — 2298 KB, те саме.
- `src/lib/lessonContentMap.uk.js` — те саме; онови `scripts/build-lesson-content-maps.mjs`, щоб він більше не генерував uk-мапу.
- `package.json`: перевір **кожну** залежність grep-ом перед видаленням. Не видаляй нічого, що використовується в `scripts/` або в заморожених файлах.
- Прибери з репозиторію сміттєві файли в корені, якщо вони не в `.gitignore`
  (`sales_report.csv`, `students.csv`, `tasks.json`, `tmp_lesson-*.js`, `__pycache__`,
  `_translate_*.py` у корені) — **тільки додаванням у `.gitignore` і `git rm --cached`,
  без видалення з диска**, і опиши це в звіті окремим пунктом.

**Обережно:** Cursor паралельно працює в `src/lib/lessonContent/en/**` і
`src/lib/robloxLessonContent/en/**`. Ти видаляєш **тільки uk і unity**. Якщо рука
потягнулась до `en/` — стоп.

---

### A4. Розібрати монолітний `LessonPage.js` (обов'язково)

67 KB в одному клієнтському файлі з власним markdown-парсером усередині (рядки ~33+),
теорією, практикою, Pyodide і квізом.

1. Винеси локальну функцію `markdownToHtml` з `LessonPage.js` — у проєкті вже є
   `src/lib/markdownToHtml.js` (ним користується `RobloxLessonPage`). **Звір поведінку
   обох реалізацій перед заміною** — вони можуть розходитись, і мовчазна заміна
   зіпсує рендер уроків. Спочатку тест (див. A10), потім заміна.
2. Розділи на компоненти: `LessonTheory`, `LessonPractice`, `LessonQuiz`, `LessonNav`.
   Практику з Pyodide (`src/lib/pyodideRunner.js`) вантаж через `next/dynamic`
   з `ssr: false` — вона потрібна тільки коли студент дійшов до кроку практики.
3. `lucide-react`: перевір, чи іконки не тягнуть увесь пакет. Якщо тягнуть — точкові імпорти.
4. `getCurriculum` у клієнті тягне три curriculum-файли (лише `pythonCurriculum.js` — 43 KB).
   Передавай з сервера лише те, що потрібно для навігації (id, title, order, moduleId),
   а не весь curriculum.
5. Мемоізуй результат `markdownToHtml` по секціях (`useMemo`), щоб він не перераховувався
   на кожен ререндер стану квізу.

**Критерій приймання:** поведінка сторінки уроку **не змінилась** (перевір у браузері
покроково), розмір клієнтського чанка сторінки впав, у звіті — числа.

---

### A5. Безпека рендерингу контенту

У `LessonPage.js` і `RobloxLessonPage.js` — 10 місць із `dangerouslySetInnerHTML`,
куди йде вивід `markdownToHtml`. Контент зараз довірений (лежить у репозиторії),
але:

1. Перевір, чи `markdownToHtml` екранує HTML **до** застосування markdown-правил,
   і чи не можна протягнути `<script>`, `<img onerror=...>`, `javascript:` у посиланні
   через `[text](javascript:...)`.
2. Напиши тести на ці випадки (A10).
3. Якщо `escapeHtml` пропускає — полагодь у `src/lib/markdownToHtml.js` (твій файл).
4. `next.config.mjs`: `images.remotePatterns` зараз `hostname: '**'` — дозволяє
   оптимізувати зображення з будь-якого домену в інтернеті. Звузь до реально
   потрібних хостів. Якщо жодного зовнішнього хоста не використовується — прибери зовсім.

---

### A6. Доступність (a11y)

Пройди три сценарії **тільки клавіатурою**, без миші: головна → сторінка курсу →
сторінка уроку → пройти квіз → перейти до наступного уроку.

Перевір і виправ:

- Порядок фокуса логічний, фокус видимий (`:focus-visible`), нічого не «пропадає».
- Немає пасток фокуса в модалках/сайдбарі; Esc закриває.
- Ієрархія заголовків без пропусків (один `h1` на сторінку, далі без стрибків h2→h4).
- Інтерактивні елементи — це `button`/`a`, а не `div` з `onClick`. Якщо `div` —
  або замінити, або дати `role`, `tabIndex`, обробку Enter/Space.
- Іконкові кнопки мають доступну назву (`aria-label`), декоративні іконки — `aria-hidden`.
- Квіз: варіанти відповіді — справжня радіо-група (`role="radiogroup"`, стрілки працюють),
  результат оголошується (`aria-live`), стан «правильно/неправильно» не переданий **лише** кольором.
- Контраст тексту ≥ 4.5:1 (звичайний) і ≥ 3:1 (великий). Перевір і код-блоки теж.
- `prefers-reduced-motion` шанується в `src/components/Motion/Reveal.js` і в CSS-анімаціях.
- Форми мають `label`, помилки прив'язані через `aria-describedby`.

Здай `docs/agents/reports/a11y-audit.md`: знайдено / виправлено / лишилось,
кожен пункт — файл:рядок.

---

### A7. Core Web Vitals і рендеринг

- **LCP:** що є найбільшим елементом на головній і на сторінці курсу? Пріоритетне
  завантаження (`priority` у `next/image`), прибрати блокуючі ресурси.
- **Зображення:** у `src/lib/lessonContent/en/lesson-12-2.js` є сирий `<img>` —
  це файл Cursor, **не виправляй сам**, запиши в Handoff. У своїх компонентах —
  усе через `next/image` з явними `width`/`height` (проти CLS).
- **Шрифти:** перевір, як підключені (layout заморожений — якщо проблема там,
  це Handoff, не правка). Опиши в звіті.
- **CLS:** зарезервуй місце під динамічний контент (лоадери, скелетони, банери).
- **Кешування:** маршрути курсів — які статичні, які динамічні? Сторінка уроку
  персональна (прогрес, доступ) і має лишитись динамічною, а сторінка **опису курсу**
  і список курсів — кандидати на статику/ISR. Оціни і, якщо безпечно, зроби.
- **CSS:** знайди мертві правила в `src/app/globals.css` і `*.module.css` своїх
  компонентів (особливо стилі від видалених сторінок — Roblox/Unity/Scratch/webDev
  лендингів, affiliate, certificates).

---

### A8. SEO

- `src/app/sitemap.js` — чи немає посилань на видалені маршрути, чи є всі живі публічні сторінки.
- `src/app/robots.js` — узгоджений із sitemap; сторінки уроків мають лишатись `noindex`.
- `generateMetadata` на сторінках курсів: title, description, canonical, OG. Порівняй
  з `src/lib/createPageMetadata.js` і `src/lib/i18nMetadata.js`.
- Не чіпай `src/lib/structuredData.js`, `src/components/Seo/**` і
  `src/app/[locale]/opengraph-image.js` — це незакомічений WIP власника.
  Знахідки по них — у Handoff.

---

### A9. Полагодити інструменти якості

1. **`npm run lint` зламаний**: Next 16 прибрав `next lint`, а flat-config кидає
   circular structure error. Полагодь: перевести скрипт на `eslint .`, розібратись
   із `eslint.config.mjs`, додати `.eslintignore`-еквівалент для `scripts/`, `messages/`,
   контенту уроків (лінтити 7 МБ даних немає сенсу і саме там, найімовірніше, витік пам'яті).
   Мета: `npm run lint` завершується і показує реальні проблеми, а не падає.
2. **`npm test` запускає лише один файл** (`node --test src/lib/paddle.test.mjs`).
   Заміни на glob, який ловить усі тести, включно з новими файлами Cursor:

   ```
   "test": "node --test \"src/**/*.test.mjs\""
   ```

   (перевірено на Node 22.14 — працює).
3. Додай `"test:watch"` і, якщо неважко, `"analyze": "ANALYZE=true next build"`.
4. Не додавай CI-конфіг і не встановлюй git-хуки — цього ніхто не просив.

---

### A10. Тести на те, що ти зачепив (обов'язково)

Твої зміни — рефакторинг гарячого шляху. Без тестів це рулетка.

Створи (стиль — `src/lib/paddle.test.mjs`: `node:test`, `node:assert/strict`,
коментар угорі про те, що ламається без цього тесту):

1. **`src/lib/markdownToHtml.test.mjs`** — до того, як щось у ньому міняти:
   - код-блоки з ` ``` ` не інтерпретуються як markdown усередині;
   - інлайн-код не ламається сусіднім `**bold**`;
   - `<script>alert(1)</script>` у контенті екранується;
   - `[x](javascript:alert(1))` не перетворюється на клікабельний `javascript:`;
   - посилання отримують `rel="noopener noreferrer"`;
   - порожній/`null`/`undefined` вхід не кидає виняток.
   Якщо на якомусь із цих кейсів тест червоний — це реальний баг, виправ його.

2. **`src/lib/lessonContentLoader.test.mjs`** (або тест на існуючі лоадери) —
   що для кожного `lessonId` з curriculum лоадер повертає урок, для невідомого id —
   `null` (а не виняток), і що об'єкт уроку серіалізується
   (`JSON.parse(JSON.stringify(lesson))` не втрачає полів, немає функцій).

3. **`src/lib/quizValidation.test.mjs`** — правильна відповідь зараховується,
   неправильна ні, невідомий `lessonId` не валить сервер, поріг 70% працює на межі.

**Правила:** тестів має ставати більше, ніж 49. Жодного `skip`/`only`. Не послаблюй
асерти заради зеленого. Не видаляй чужі тести.

---

## 5. Тестування — окремо і обов'язково

**Після кожної задачі:**

```bash
node --test "src/**/*.test.mjs"
```

```bash
npm run build
```

**Ручна перевірка після A2 і A4 — не пропускати.** Автотести не покривають Pyodide
й реальний рендер. Пройди на `:3002`:

1. `/courses` → сторінка курсу → урок 1 (Python) — теорія, приклади коду, кнопка копіювання.
2. Практика: написати код, запустити, отримати вердикт. Перевірити і правильний, і неправильний варіант.
3. Квіз: пройти, отримати результат, побачити explanation.
4. Прогрес зберігся після перезавантаження сторінки.
5. Те саме на уроці Roblox (інший компонент, інший лоадер).
6. Мобільна ширина 375px: нічого не переповнює екран, код-блоки скролять горизонтально всередині себе, а не рвуть сторінку.
7. Консоль браузера чиста: без помилок гідратації, без 404 на чанки.

Якщо щось із цього зламалось — **відкоти свій коміт і зроби інакше**, не залишай
«майже працює».

---

## 6. Формат звіту

Веди `docs/agents/status/antigravity.md`, оновлюй **після кожної задачі**.
Формат — `docs/agents/README.md` §5.

Обов'язково:

- **Числа до/після** на кожну задачу: First Load JS по маршрутах, розмір топ-чанків,
  кількість `'use client'` файлів, кількість a11y-порушень. Без чисел задача не закрита.
- `## Handoff` — усе, що знайшов у чужих і заморожених файлах: файл:рядок, опис,
  пропозиція, ризик. Сюди точно піде `<img>` у `lesson-12-2.js`, можливі знахідки
  в `layout.js`, `src/app/api/progress/route.js`, `src/lib/auth.js`.
- `## Заблоковано` — де потрібне рішення власника.

Наприкінці — `## Підсумок`: що змінилось для студента (швидкість, доступність),
і що лишилось найпріоритетнішим.

---

## 7. Заборони

- Не чіпай файли вмісту уроків і curriculum — там зараз пише Cursor.
- Не чіпай заморожені шляхи, особливо `src/app/api/**` і білінг. Помилка там коштує грошей.
- Не мігруй на TypeScript, не додавай Tailwind-компонентні бібліотеки, state-менеджери,
  нові фреймворки тестування, Storybook. Стек лишається як є.
- Один дозволений новий devDependency — `@next/bundle-analyzer`. Більше нічого.
- Не міняй структуру роутів і не перейменовуй маршрути — на них зав'язані sitemap,
  редіректи й (можливо) зовнішня реклама.
- Не запускай `npm run build` під живим `next dev` у тій самій теці.
- Не роби `git push`, не створюй PR, не перемикай гілку.
- Не видаляй тести й не пропускай кроки ручної перевірки заради швидкості.
- Якщо не встигаєш: доведи до кінця A1–A4 і чесно познач решту як незроблену.
  **Незавершена робота, названа завершеною, гірша за незавершену.**
