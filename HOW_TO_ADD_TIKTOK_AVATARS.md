# Як додати посилання на аватарки TikTok

Є **3 способи** додати посилання на аватарки TikTok профілів:

## Спосіб 1: Безпосередньо в компоненті (НАЙПРОСТІШИЙ)

Відкрийте файл `src/components/SocialMedia/SocialMedia.js` і знайдіть масив `tiktokAccounts`.

Додайте поле `avatarUrl` до кожного об'єкта:

```javascript
{
  id: 1,
  name: 'SmartCode Academy',
  username: '@smartcodeacademy',
  url: 'https://www.tiktok.com/@smartcodeacademy',
  description: 'Офіційний профіль академії',
  color: 'blue',
  avatarUrl: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/...', // Додайте тут
},
```

## Спосіб 2: Через конфігураційний файл

Відкрийте файл `src/config/tiktokAvatars.js` і додайте посилання:

```javascript
export const TIKTOK_AVATARS = {
  'smartcodeacademy': 'https://p16-sign-va.tiktokcdn.com/...',
  'smartcode_academy': 'https://p16-sign-va.tiktokcdn.com/...',
  'ivan.smartcode.python': 'https://p16-sign-va.tiktokcdn.com/...',
  'Artem.smartcode.academy': 'https://p16-sign-va.tiktokcdn.com/...',
}
```

## Як отримати посилання на аватарку TikTok:

### Метод 1: Через інструменти розробника браузера

1. Відкрийте профіль TikTok в браузері (наприклад: `https://www.tiktok.com/@smartcodeacademy`)
2. Натисніть `F12` або `Правий клік → Inspect` (Перевірити елемент)
3. Перейдіть на вкладку **Network** (Мережа)
4. Оновіть сторінку (`F5`)
5. У фільтрі введіть `img` або `avatar`
6. Знайдіть запит з аватаркою профілю
7. Скопіюйте URL зображення (зазвичай починається з `https://p16-sign-va.tiktokcdn.com/...`)

### Метод 2: Через Elements (Елементи)

1. Відкрийте профіль TikTok в браузері
2. Натисніть `F12`
3. Перейдіть на вкладку **Elements** (Елементи)
4. Знайдіть елемент з аватаркою (зазвичай `<img>` з класом, що містить `avatar`)
5. Скопіюйте значення атрибута `src`

### Метод 3: Через View Page Source (Перегляд коду сторінки)

1. Відкрийте профіль TikTok
2. Натисніть `Ctrl+U` (або `Правий клік → View Page Source`)
3. Натисніть `Ctrl+F` і шукайте `avatar` або `p16-sign-va.tiktokcdn.com`
4. Скопіюйте знайдене посилання

## Приклад посилання на аватарку:

```
https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/avatar/example123~tplv-obj.image
```

**Важливо:** Посилання на аватарки TikTok можуть змінюватися з часом. Якщо аватарка перестала відображатися, оновіть посилання одним з вищезазначених методів.

