# Відповіді для еквайрингу (Monobank / перевірка мерчанта)

Документ для передачі банку після деплою змін. Заповніть блок **тестовий доступ** реальними даними перед відправкою.

---

## 1. Тестовий доступ до кабінету та курсу

| Що надати | Значення (заповнити) |
|-----------|----------------------|
| URL сайту | https://smartcode-academy.com |
| Сторінка входу | https://smartcode-academy.com/login |
| Тестовий email | `___________________________` |
| Тестовий пароль | `___________________________` |
| Курс з доступом | Напр. Python / Roblox — вказати назву та URL уроку |
| URL особистого кабінету | https://smartcode-academy.com/dashboard |

**Як підготувати тестовий акаунт (внутрішньо):**

1. Зареєструйте користувача на `/register` або створіть у MongoDB.
2. У CRM / адмінці надайте доступ до курсу (`purchasedCourses` або активна онлайн-група).
3. Перевірте вхід на `/login` → `/dashboard` → відкриття уроку курсу.

**Тестовий платіж Monobank** (за потреби банку):

```bash
curl -X POST https://smartcode-academy.com/api/payment/monobank/test \
  -H "Content-Type: application/json" \
  -d '{"amountKopiyky":100000,"description":"Тестова оплата","redirectUrl":"https://smartcode-academy.com/payment-result"}'
```

---

## 2. Сторінка `/projects`

**Проблема:** маршрут `/projects` обходив i18n-middleware через префікс `/projects` (той самий шлях, що й статичні зображення в `public/projects/`).

**Виправлення:** прибрано `/projects` зі списку skip у `src/middleware.js`. Сторінка проєктів учнів: https://smartcode-academy.com/projects

---

## 3. Модель оплати: оплата після кожного уроку

**Для української аудиторії (живі уроки Zoom):**

- Оплата **після проведення кожного уроку** (за фактично проведені заняття), без обов’язкової передоплати за пакети.
- Вартість уроку — на https://smartcode-academy.com/tariff та в особистому кабінеті.
- Способи: **Monobank** (картка, Apple Pay, Google Pay) або **банківський переказ** (реквізити в кабінеті).
- Зафіксовано в публічній оферті, розд. 3.3.1: https://smartcode-academy.com/oferta

**Для EN-локалі (іноземні клієнти):** лише **повний онлайн-курс** на `/buy/[courseId]` або в кабінеті — без живих уроків Zoom. Сторінка `/book-lesson` на EN недоступна (перенаправлення на головну).

**Для UA-локалі:** живі уроки Zoom + курси на платформі; оплата після уроку (п. 3.3.1 оферти) або банківський переказ.

---

## 4. Refund Policy (політика повернення)

**Посилання:**

- UA: https://smartcode-academy.com/refund
- EN: https://smartcode-academy.com/en/refund

**Де видно на сайті:**

- Футер → «Умови повернення» / «Refund Policy» (усі мови)
- Сторінка оплати курсу — чекбокс з посиланням
- Публічна оферта — розділ 4 з посиланням на Refund Policy

---

## 5. Політика конфіденційності

**Посилання:**

- UA: https://smartcode-academy.com/privacy
- EN: https://smartcode-academy.com/en/privacy

**Де видно на сайті:**

- Футер → «Політика конфіденційності» / «Privacy Policy» (усі мови)
- Сторінка оплати — згода з політикою
- Sitemap: `/privacy`, `/refund`

---

## Юридичні сторінки (чеклист для банку)

| Документ | URL (UA) | URL (EN) |
|----------|----------|----------|
| Публічна оферта | /oferta | /en/oferta |
| Політика конфіденційності | /privacy | /en/privacy |
| Політика повернення | /refund | /en/refund |
| Тарифи | /tariff | /en/tariff |
| Контакти продавця | футер, юридичні сторінки | FooterMerchantInfo на EN |

Реквізити продавця: змінні `NEXT_PUBLIC_MERCHANT_*` (див. `PAYMENT_SETUP.md`).

---

## Що змінено в коді (для вашої команди)

1. `src/middleware.js` — `/projects` знову проходить через next-intl
2. `src/components/Footer/footer.js` — посилання Privacy + Refund для UK і EN
3. `src/app/sitemap.js` — `/privacy`, `/refund` для UA
4. `messages/uk.json` — metadata для privacy/refund
5. `messages/uk/pages.json` — п. 3.3.1 оферти про оплату після уроку
6. `PAYMENT_SETUP.md` — коректні URL refund для UA

Після деплою перевірте вручну: `/projects`, `/privacy`, `/refund`, футер, тестовий логін.
