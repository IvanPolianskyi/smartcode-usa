# Налаштування системи оплати

## Огляд

Система використовує **LiqPay** для обробки платежів. Після натискання "Придбати курс" користувач перенаправляється на сторінку оплати LiqPay, а після успішної оплати отримує доступ до всіх модулів та тем курсу.

## Налаштування LiqPay

### 1. Реєстрація в LiqPay

1. Зареєструйтеся на [liqpay.ua](https://www.liqpay.ua/)
2. Створіть новий проект/кабінет
3. Отримайте `Public Key` та `Private Key` з налаштувань

### 2. Налаштування змінних середовища

Додайте до файлу `.env`:

```env
# LiqPay Configuration
LIQPAY_PUBLIC_KEY=your_public_key_here
LIQPAY_PRIVATE_KEY=your_private_key_here
LIQPAY_SANDBOX=true  # Використовуйте true для тестування, false для продакшену

# Base URL для webhook
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
# або для Vercel автоматично використовується VERCEL_URL
```

### 3. Налаштування Webhook

LiqPay потребує URL для відправки результатів оплати. Налаштуйте webhook URL в кабінеті LiqPay:

```
https://yourdomain.com/api/payment/webhook
```

Або для Vercel:
```
https://your-project.vercel.app/api/payment/webhook
```

## Юридичні сторінки та реквізити продавця

На сайті мають бути доступні:

- `/oferta` та `/en/oferta` — публічна оферта
- `/privacy` та `/en/privacy` — політика конфіденційності
- `/en/refund` — політика повернення коштів
- Контакти продавця у футері та на юридичних сторінках

```env
NEXT_PUBLIC_MERCHANT_LEGAL_NAME_UK=ФОП Полянський Іван Іванович
NEXT_PUBLIC_MERCHANT_LEGAL_NAME_EN=Private Entrepreneur Ivan Ivanovych Polyanskyi (FOP)
NEXT_PUBLIC_MERCHANT_TAX_ID=3923908357
NEXT_PUBLIC_MERCHANT_LEGAL_ADDRESS=79000, м. Львів, вул. Пасічна, буд. 162 (офісний центр IQ Park)
NEXT_PUBLIC_MERCHANT_ACTUAL_ADDRESS=79000, м. Львів, вул. Пасічна, буд. 162 (офісний центр IQ Park)
NEXT_PUBLIC_MERCHANT_PHONE=+380951457248
NEXT_PUBLIC_MERCHANT_EMAIL=smartcodeacadem@gmail.com
NEXT_PUBLIC_MERCHANT_WEBSITE=https://smartcode-academy.com
NEXT_PUBLIC_MERCHANT_IBAN=UA123220010000026002380006329
```

## Monobank (онлайн-оплата карткою, UAH)

Для курсів на `/en`, поповнення уроків та тестових платежів використовується **Monobank Acquiring**.

Додайте до `.env`:

```env
MONOBANK_TOKEN=your_merchant_token_from_web_monobank_ua
# опційно:
MONOBANK_API_URL=https://api.monobank.ua
MONOBANK_REDIRECT_URL=https://mysite.com/payment-result
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
# лише для локальної розробки без перевірки підпису webhook:
# MONOBANK_SKIP_WEBHOOK_VERIFY=true
```

Webhook URL (POST, перевірка заголовка `X-Sign`):

```
https://yourdomain.com/api/payment/monobank/webhook
```

Тестовий платіж (1000 грн, «Тестова оплата»):

```bash
curl -X POST https://yourdomain.com/api/payment/monobank/test \
  -H "Content-Type: application/json" \
  -d '{"amountKopiyky":100000,"description":"Тестова оплата","redirectUrl":"https://mysite.com/payment-result"}'
```

Після оплати користувач повертається на `MONOBANK_REDIRECT_URL` або `/{locale}/payment-result?orderId=...`.

Ціни (див. `src/lib/coursePrices.js`):
- Повний курс (EN): **$30** → Monobank **1300 грн**
- Групове заняття (EN): **$15** → Monobank **665 грн**
- Індивідуальне заняття (EN): **$20** → Monobank **800 грн**

## Ціни курсів

Ціни налаштовуються в файлі `src/lib/coursePrices.js`:

```javascript
export const coursePrices = {
  'python-developer-zero-to-junior': {
    price: 1000, // UAH
    currency: 'UAH',
    name: 'Python Developer: From Zero to Confident Junior'
  },
  'web-development': {
    price: 1000, // UAH
    currency: 'UAH',
    name: 'Веб-розробка: Від основ до просунутого рівня'
  },
  'roblox-studio': {
    price: 1000, // UAH
    currency: 'UAH',
    name: 'Roblox Studio'
  }
}
```

## Процес оплати

### 1. Користувач натискає "Придбати курс"

- Система створює унікальний `orderId`
- Генерується платіжне посилання через LiqPay API
- Створюється запис в базі даних зі статусом `pending`

### 2. Перенаправлення на LiqPay

- Користувач перенаправляється на сторінку оплати LiqPay
- Вводить дані картки та підтверджує оплату

### 3. Webhook обробка

- Після успішної оплати LiqPay відправляє POST запит на `/api/payment/webhook`
- Система перевіряє підпис та оновлює статус платежу
- Якщо оплата успішна (`status === 'success'`):
  - Курс додається до `purchasedCourses` користувача
  - Створюється запис прогресу
  - Користувач отримує доступ до всіх модулів

### 4. Повернення на сайт

- Після оплати користувач перенаправляється на `/payment/success`
- Сторінка перевіряє статус оплати та показує результат

## API Endpoints

### POST /api/payment/create
Створює платіжне посилання для курсу.

**Request:**
```json
{
  "courseId": "python-developer-zero-to-junior"
}
```

**Response:**
```json
{
  "paymentUrl": "https://www.liqpay.ua/api/3/checkout",
  "data": "base64_encoded_data",
  "signature": "sha1_signature",
  "orderId": "course_python-developer-zero-to-junior_userId_timestamp"
}
```

### POST /api/payment/webhook
Webhook для обробки результатів оплати від LiqPay.

**Request (form-data):**
- `data`: base64 encoded payment data
- `signature`: SHA1 signature

### GET /api/payment/status?orderId=...
Перевіряє статус оплати за orderId.

**Response:**
```json
{
  "orderId": "...",
  "status": "completed",
  "purchased": true,
  "courseId": "...",
  "amount": 2999,
  "currency": "UAH"
}
```

## Тестування

### Sandbox режим

Для тестування встановіть `LIQPAY_SANDBOX=true`. LiqPay надає тестові картки для перевірки:

- **Успішна оплата**: 4242424242424242
- **Відхилена оплата**: 4000000000000002

### Перевірка webhook локально

Для локального тестування webhook використовуйте ngrok або інший tunnel сервіс:

```bash
ngrok http 3000
```

Потім встановіть webhook URL в LiqPay:
```
https://your-ngrok-url.ngrok.io/api/payment/webhook
```

## Безпека

1. **Підпис**: Всі запити від LiqPay перевіряються за допомогою SHA1 підпису
2. **Перевірка користувача**: Webhook перевіряє, що платеж належить правильному користувачу
3. **Унікальні orderId**: Кожен платіж має унікальний ID для запобігання дублікатам

## Troubleshooting

### Проблема: Webhook не отримує запити

- Перевірте, що URL webhook правильно налаштований в LiqPay
- Переконайтеся, що сервер доступний з інтернету
- Перевірте логи сервера на наявність помилок

### Проблема: Платіж не підтверджується

- Перевірте, що `LIQPAY_PRIVATE_KEY` правильно налаштований
- Переконайтеся, що підпис перевіряється коректно
- Перевірте статус платежу в кабінеті LiqPay

### Проблема: Курс не відкривається після оплати

- Перевірте логи webhook на наявність помилок
- Переконайтеся, що статус платежу в базі даних `completed`
- Перевірте, що курс додано до `purchasedCourses` користувача
