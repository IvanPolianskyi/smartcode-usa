# Налаштування Telegram бота для проєктів на Vercel

## Проблема
Бот не працює на Vercel, хоча працює локально з `npm run dev`.

## Причина
Vercel не підтримує довготривалі процеси (polling), тому бот не може працювати як завжди запущений сервіс.

## Рішення
Перехід з polling на webhook-архітектуру.

## Змінні середовища в Vercel

Додайте наступні змінні середовища в налаштуваннях Vercel:

```
TELEGRAM_BOT_TOKEN_PROJECTS=your_bot_token_here
MONGODB_URI=your_mongodb_connection_string
```

## Налаштування після деплою

### Варіант 1: Через API
Після деплою на Vercel, зробіть POST запит до:
```
https://your-app.vercel.app/api/telegram/init
```

### Варіант 2: Через скрипт
```bash
npm run setup:webhook
```

### Варіант 3: Вручну
Зробіть POST запит до Telegram API:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.vercel.app/api/telegram/webhook",
    "allowed_updates": ["message", "photo"]
  }'
```

## Перевірка статусу

Перевірити статус webhook:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

## Структура API роутів

- `/api/telegram/webhook` - основний webhook для обробки повідомлень
- `/api/telegram/init` - налаштування webhook
- `/api/telegram/setup` - альтернативний роут для налаштування

## Команди бота

- `/start` або `/help` - довідка
- `/addproject` - додати проєкт
- `/listprojects` - список проєктів
- `/listleads` - список запитів на код
- `/confirm` - підтвердити створення проєкту
- `/skip` - пропустити зображення
- `/cancel` - скасувати створення проєкту

## Швидкий формат

Можна відправити проєкт одним повідомленням:
```
Назва проєкту|Опис проєкту|Код проєкту
```

## Логування

Всі помилки логуються в консоль Vercel. Перевірте логи в панелі Vercel для діагностики проблем.

## Тестування

Для тестування локально:
1. Запустіть `npm run dev`
2. Використайте ngrok або інший тунель для створення публічного URL
3. Налаштуйте webhook на цей URL
