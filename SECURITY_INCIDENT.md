# Інцидент: сторінка /projects (березень 2026)

## Що сталося

На сторінці проєктів з’явилися картки **«hacked by Ant (qq)»**. Це не новий React-компонент у коді — зловмисник додав **2 записи в MongoDB** через відкритий API:

```http
POST /api/projects
```

Без авторизації, без перевірки ролі.

## Що зроблено в коді

1. **`POST /api/projects`** — лише для адміністратора (cookie `auth_token` + `role: admin`).
2. **`DELETE /api/projects?id=...`** — видалення проєкту (адмін).
3. **`POST /api/upload`** — лише адмін або внутрішній виклик з заголовком `X-Internal-Upload-Secret`.
4. **Telegram webhook** — опційна перевірка `TELEGRAM_WEBHOOK_SECRET` (заголовок `X-Telegram-Bot-Api-Secret-Token`).
5. Скрипт очищення: `node scripts/remove-spam-projects.js` (у БД видалено 2 спам-записи).

## Після деплою — обов’язково

Додайте в `.env` / Vercel:

```env
# Випадковий довгий рядок (openssl rand -hex 32)
INTERNAL_UPLOAD_SECRET=...

# Секрет при налаштуванні webhook у Telegram (@BotFather → setWebhook secret_token)
TELEGRAM_WEBHOOK_SECRET=...
```

Перевстановіть webhook бота з `secret_token`, якщо використовуєте `/api/telegram/webhook`.

## Рекомендації

- Перевірте **MongoDB Atlas** → Network Access / Database Access.
- Змініть **`JWT_SECRET`**, якщо могли витікнути.
- Перегляньте логи Vercel на підозрілі `POST /api/projects` до деплою фіксу.
- Перевірте інші відкриті `POST` без auth у проєкті.

## Відновлення

```bash
cd smartcode
node scripts/remove-spam-projects.js        # видалити спам
node scripts/remove-spam-projects.js --dry-run  # лише перегляд
```
