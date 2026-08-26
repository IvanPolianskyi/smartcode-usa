# Паралельні задачі — SmartCode Academy

Контекст: проєкт щойно пройшов великий рефакторинг (перехід на Paddle Billing,
єдина система курсів, English-only запуск). Робочий стан задокументований у
[CLAUDE.md](../CLAUDE.md) — прочитайте його першим, у будь-якому інструменті.

Я (Claude Code, основна сесія) зараз відновлюю адмін-панель у
`src/app/[locale]/admin/**` і `src/app/api/admin/**`. **Ніхто інший не повинен
чіпати ці шляхи**, поки я не завершу — інакше буде конфлікт правок в одній
робочій теці (worktree тут не використовується).

Усі задачі нижче незалежні одна від одної й від адмін-панелі — можна пускати
паралельно.

---

## Для Cursor

### 1. Прибрати мертвий код і biті імпорти після рефакторингу
```
Проєкт щойно пройшов великий рефакторинг: видалено CRM/Telegram/Monobank/LiqPay/affiliate/certificates інтеграції та старі сторінки курсів (Roblox/Unity/Scratch/webDev як окремі лендинги). Знайди всі імпорти, що досі посилаються на видалені файли (наприклад src/lib/monobank.js, liqpay.js, telegramBot.js, crmLmsSync.js, affiliateClicks.js, minecraftCurriculum.js, scratchCurriculum.js, unityCurriculum.js, webDevCurriculum.js та компоненти на кшталт Header, Footer, ContactForm, Teachers, Testimonials) і познач їх. Онови package.json — прибери залежності, які більше ніде не використовуються (перевір кожну через grep перед видаленням). НЕ чіпай src/app/[locale]/admin/** і src/app/api/admin/** — там паралельно ведеться інша робота. Запусти npm run build і npm run lint після змін, покажи результат.
```

### 2. Прибрати README.md
```
README.md досі описує Telegram-бота, якого вже немає в коді (перевір — grep telegramBot, TELEGRAM_BOT_TOKEN). Перепиши README.md під актуальний стан проєкту: Next.js 16 LMS-платформа з підпискою через Paddle. Опиши: npm run dev/build/start, структуру .env.local (дивись .env.example), і коротко архітектуру (courses, billing, entitlements). Не вигадуй функціонал, якого немає в коді.
```

### 3. SEO та метадані для нових сторінок
```
Сторінки /pricing і /start (src/app/[locale]/pricing/page.js, src/app/[locale]/start/page.js) — нові після рефакторингу. Перевір, чи є в них generateMetadata / metadata export (title, description, Open Graph). Порівняй з тим, як це зроблено на src/app/[locale]/page.js і src/lib/createPageMetadata.js — і зроби так само для pricing/start. Онови також src/app/sitemap.js, якщо там ще є посилання на видалені маршрути (Roblox/Unity/Scratch/admin/certificate/affiliate) або бракує /pricing, /start.
```

### 4. Адаптивність і базовий QA нового флоу
```
Пройди /pricing → /start?course=roblox-studio → /register на мобільній ширині (375px) і десктопі. Знайди й виправи візуальні баги: переповнення, нечитабельний текст, кнопки що не влазять. Файли: src/app/[locale]/pricing/page.js, src/app/[locale]/start/page.js, src/components/Billing/*, src/app/[locale]/login/Auth.module.css (start сторінка перевикористовує ці стилі). Не змінюй логіку checkout, тільки CSS/розмітку.
```

### 5. Юніт-тести для billing-логіки
```
Подивись src/lib/paddle.test.mjs — приклад стилю тестів (node:test, без фреймворків). Напиши так само для src/lib/entitlements.js (evaluateSubscription — грейс-період past_due, trialing, cancelAtPeriodEnd) і src/lib/billingCatalog.js (priceIdFor, courseIdsForPriceId, legacy price fallback). Тести мають бути ізольовані від MongoDB (тестуй чисті функції, не getSubscriptions/getEntitlement, які ходять у БД).
```

---

## Для паралельної сесії Claude Code

### 6. Security review перед виходом у прод з реальними платежами
```
Читай спочатку CLAUDE.md у корені репозиторію — там повний опис поточного стану
проєкту (SmartCode Academy, Next.js 16 LMS, Paddle Billing, MongoDB, JWT auth).
Проєкт готується до подачі в Paddle і запуску продажів, тож потрібен security
review з фокусом на реальні гроші/дані студентів.

НЕ чіпай src/app/[locale]/admin/** і src/app/api/admin/** — там паралельно
ведеться інша робота (файли можуть з'являтися/змінюватися під час твого
review — це нормально, просто не редагуй їх).

Прочитай і проаналізуй:
- src/lib/auth.js, src/lib/requireAdmin.js, src/lib/requireTeacher.js —
  JWT/cookie auth, 10-річний sliding-refresh cookie (навмисно довгий, це не
  баг — але перевір, чи secret правильно вимагається в production і чи cookie
  дійсно httpOnly+secure).
- src/app/api/billing/webhook/route.js, src/lib/paddle.js — перевірка підпису
  Paddle-webhook (HMAC, timing-safe compare, replay-window). Це єдине місце,
  що видає/забирає платний доступ — переконайся, що обійти його неможливо.
- src/app/api/billing/local-grant/route.js — dev-only bypass, заблокований
  через NODE_ENV === 'production'. Перевір, чи немає способу обійти цю
  перевірку (env override, інша умова гонки).
- src/app/api/auth/*/route.js (login, register, delete-account, me) —
  rate limiting (чи є взагалі?), bcrypt cost factor, чи не витікають деталі
  помилок (user enumeration через різні повідомлення "user not found" vs
  "wrong password").
- src/lib/mongodb.js — чи всі запити з user input йдуть через параметризовані
  filters, чи немає $where/eval, чи ObjectId конструюється з try/catch перед
  передачею в запит (греп `new ObjectId(` по всьому src/app/api).
- src/lib/markdownToHtml.js — чи є санітизація HTML (XSS через контент уроків
  або будь-який user-generated текст, що рендериться як HTML).
- .env.example — чи всі секрети справді потрібні на сервері (не NEXT_PUBLIC_),
  чи немає значень, які мали б бути NEXT_PUBLIC_, але позначені як серверні
  (і навпаки — секрет, випадково позначений NEXT_PUBLIC_).

Формат відповіді: список знахідок, кожна — файл:рядок, опис вразливості,
конкретний сценарій експлуатації, і пропоноване виправлення. Якщо після
аналізу вважаєш щось безпечним (наприклад signature verification вже
правильний) — теж напиши це коротко, щоб я знав, що це перевірено.
```

---

## Нотатка

Ці задачі узгоджені з рішеннями від 2026-08-26: WIP закомічено, адмін-панель
відновлюється зараз, Paddle-каталог (продукти/ціни) поки не займаємось,
запуск лише англійською.
