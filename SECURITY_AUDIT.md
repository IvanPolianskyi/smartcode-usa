# Аудит безпеки SmartCode (сайт)

Дата: березень 2026. Після інциденту з `/api/projects` проведено огляд усіх API.

---

## Критичні (виправлено в коді)

| # | Проблема | Ризик | Статус |
|---|----------|-------|--------|
| 1 | `POST /api/projects` без auth | Спам/дефейс на сайті (було використано) | ✅ Admin only |
| 2 | `POST /api/upload` без auth | Завантаження файлів | ✅ Admin + internal secret |
| 3 | `GET /api/phone-collection` | Витік телефонів і імен лідів | ✅ Admin only |
| 4 | `GET /api/knowledge-test` | Витік результатів тестів (PII) | ✅ Admin only |
| 5 | `GET/POST/DELETE /api/telegram/setup`, `/init` | Перехоплення webhook бота | ✅ Admin + 404 на production |
| 6 | `POST /api/payment/monobank/test` | Створення рахунків Monobank без логіну | ✅ Admin only |
| 7 | `POST /api/progress` без перевірки доступу до курсу | Відмітка уроків без оплати | ✅ `hasStudentCourseAccess` |
| 8 | `POST /api/courses/enroll` без доступу | Запис на курс без оплати | ✅ `hasStudentCourseAccess` |
| 9 | `GET /api/payment/status?orderId=` для guest | IDOR — статус чужої оплати | ✅ Token у redirect URL |

---

## Високий пріоритет (потребує уваги)

| # | Проблема | Рекомендація |
|---|----------|--------------|
| 10 | `POST /api/code/execute` без auth | Обмежити авторизацією + лише Piston/ізольований runner; вимкнути local `spawn` на production |
| 11 | `POST /api/telegram/webhook` без `TELEGRAM_WEBHOOK_SECRET` | Задати secret у BotFather і в `.env` |
| 12 | `JWT_SECRET` fallback у dev | На production **обов’язково** сильний `JWT_SECRET` (перевірка при login) |
| 13 | `MONOBANK_SKIP_WEBHOOK_VERIFY=true` | Ніколи на production |
| 14 | `INTERNAL_UPLOAD_SECRET`, `TELEGRAM_WEBHOOK_SECRET` | Додати в Vercel після деплою |
| 15 | `scripts/grant-all-courses.js` | У репозиторії був fallback URI з паролем — прибрати, ротувати пароль Atlas |
| 15b | `src/lib/telegramBot.js` fallback токен бота | ✅ Прибрано; токен лише з env |
| 15c | `scripts/create-admin.js` пароль/MongoDB у коді | ✅ Лише через env |
| 15d | `smartcode_manager_backend/.env` у git | ✅ Вилучено з індексу; додано `.gitignore` |
| 16 | `POST /api/crm/purchase` без auth | Meta CAPI — додати HMAC/secret або rate limit (спам подій) |
| 17 | `POST /api/submissions`, `POST /api/phone-collection` | Публічні форми — додати captcha / підпис lead token (як у lead-intent) |

---

## Середній пріоритет

| # | Проблема | Рекомендація |
|---|----------|--------------|
| 18 | `GET /api/tiktok/avatar?username=` | SSRF до TikTok — додано валідацію username |
| 19 | `GET /api/lesson-slots` публічний | OK для бронювання; слідкувати за scraping |
| 20 | `dangerouslySetInnerHTML` у уроках | Переконатися, що `markdownToHtml` санітизує HTML |
| 21 | Internal CRM `/api/internal/crm/*` | Захищено `x-api-key` = `JWT_SECRET` — не ділитися ключем |
| 22 | Пароль мін. 6 символів | Підняти до 10+ для нових реєстрацій |
| 23 | Rate limiting | Глобально на auth, forms, execute (Cloudflare / middleware) |

---

## Що зроблено добре

- Monobank webhook — перевірка `X-Sign`
- LiqPay webhook — перевірка signature
- Admin routes — перевірка `role === 'admin'`
- Реєстрація — `role` завжди `student` (не з body)
- Telegram notifications — `escapeHtml` для PII

---

## Чеклист після деплою

```env
JWT_SECRET=<32+ random>
INTERNAL_UPLOAD_SECRET=<32+ random>
TELEGRAM_WEBHOOK_SECRET=<from BotFather>
# НЕ встановлювати:
# MONOBANK_SKIP_WEBHOOK_VERIFY=true
# ALLOW_PUBLIC_SETUP_ROUTES=true
```

1. Задеплоїти всі зміни безпеки  
2. Ротувати `JWT_SECRET` (усі сесії скинуться)  
3. Ротувати пароль MongoDB Atlas  
3b. Ротувати **усі** ключі, що колись були в git (Telegram, Google OAuth, Meta CAPI, JWT, service account)  
4. Перевірити Network Access Atlas (лише Vercel IP / 0.0.0.0 з обережністю)  
5. `node scripts/remove-spam-projects.js` — якщо з’явиться новий спам  
6. Логи Vercel: `POST /api/projects` 401 після фіксу  

---

## Файли змін безпеки

- `src/lib/requireAdmin.js`, `requireAdminRoute.js`, `paymentStatusToken.js`
- `src/app/api/projects/route.js`, `upload/route.js`
- `src/app/api/phone-collection/route.js`, `knowledge-test/route.js`
- `src/app/api/telegram/setup/route.js`, `init/route.js`
- `src/app/api/payment/monobank/test/route.js`, `status/route.js`
- `src/app/api/progress/route.js`, `courses/enroll/route.js`
- `src/lib/auth.js`, `paymentUrls.js`, `createMonobankPayment.js`
- `src/components/Payment/PaymentResultFlow.js`
