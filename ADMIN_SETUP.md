# Налаштування адміністратора

## Створення адмін акаунту

Для створення адміністраторського акаунту виконайте:

```bash
node scripts/create-admin.js
```

Обовʼязкові змінні середовища (наприклад у `.env.local`):
- `MONGODB_URI` — URI підключення до MongoDB
- `MONGODB_DB` — назва бази даних (за замовчуванням: SmartCodeLogs)
- `ADMIN_EMAIL` — email адміністратора
- `ADMIN_PASSWORD` — пароль адміністратора (мінімум 12 символів)
- `ADMIN_NAME` — (необовʼязково) відображуване імʼя

> Ніколи не зберігайте реальні паролі в репозиторії. Див. `.env.example`.

## Дані для входу адміністратора

Задаються через `ADMIN_EMAIL` та `ADMIN_PASSWORD` під час запуску скрипта.
Після створення акаунту увійдіть на сайт з цими даними.

## Права адміністратора

Адміністратор має:
- Доступ до всіх курсів без оплати
- Роль `admin` в системі
- Всі модулі та теми відкриті одразу

## Система оплати

### Для користувачів

1. **Безкоштовний доступ**: Тільки перший урок першого модуля доступний безкоштовно
2. **Після оплати**: Всі модулі та теми відкриваються одразу
3. **Послідовне відкриття**: Прибрано - всі уроки доступні після оплати

### API оплати

- `POST /api/payment` - Створити оплату курсу
- `GET /api/payment?courseId=...` - Перевірити статус оплати

### Структура даних

**Користувач (users collection)**:
```javascript
{
  email: string,
  password: string (hashed),
  name: string,
  role: 'user' | 'admin',
  purchasedCourses: string[], // Array of courseIds
  enrolledCourses: string[]
}
```

**Оплата (payments collection)**:
```javascript
{
  userId: ObjectId,
  courseId: string,
  paymentMethod: string,
  paymentData: object,
  status: 'completed' | 'pending' | 'failed',
  createdAt: Date
}
```

