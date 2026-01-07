# Troubleshooting - Сторінка не відкривається

## Виправлені проблеми

✅ **Оновлено для Next.js 15**: Параметри маршруту тепер асинхронні

## Кроки для перевірки

### 1. Перезапустіть сервер розробки

Зупиніть поточний сервер (Ctrl+C) та запустіть знову:

```bash
npm run dev
```

### 2. Перевірте консоль браузера

Відкрийте DevTools (F12) та перевірте:
- Чи є помилки в Console
- Чи є помилки в Network tab

### 3. Перевірте термінал

Подивіться на помилки в терміналі, де запущено `npm run dev`

### 4. Спробуйте прямі URL

**Сторінка курсу:**
```
http://localhost:3000/courses/python-developer-zero-to-junior
```

**Урок 1-2:**
```
http://localhost:3000/courses/python-developer-zero-to-junior/lessons/lesson-1-2
```

**Урок 2-1:**
```
http://localhost:3000/courses/python-developer-zero-to-junior/lessons/lesson-2-1
```

## Можливі помилки та рішення

### Помилка: "Cannot find module"
**Рішення:** Перевірте, чи всі файли створені:
- `src/lib/courseData.js`
- `src/lib/pythonCurriculum.js`
- `src/lib/lessonContent/lesson-1-2.js`
- `src/lib/lessonContent/lesson-2-1.js`

### Помилка: "params is not defined"
**Рішення:** Файли вже виправлені для Next.js 15 з async params

### Помилка: "Module not found"
**Рішення:** Перевірте шляхи імпортів у файлах

### Сторінка біла/порожня
**Рішення:** 
1. Перевірте консоль браузера на помилки
2. Перевірте, чи правильно імпортуються компоненти
3. Перезавантажте сторінку (Ctrl+Shift+R)

## Якщо все ще не працює

1. **Очистіть кеш Next.js:**
```bash
rm -rf .next
npm run dev
```

2. **Перевірте версію Next.js:**
```bash
npm list next
```
Має бути версія 15.x.x

3. **Перевірте структуру папок:**
```
src/
├── app/
│   └── courses/
│       └── [courseId]/
│           ├── page.js
│           └── lessons/
│               └── [lessonId]/
│                   └── page.js
├── components/
│   ├── Course/
│   │   ├── CoursePage.js
│   │   └── CoursePage.module.css
│   └── Lesson/
│       ├── LessonPage.js
│       └── LessonPage.module.css
└── lib/
    ├── courseData.js
    ├── pythonCurriculum.js
    └── lessonContent/
        ├── lesson-1-2.js
        └── lesson-2-1.js
```

## Тестова сторінка

Спробуйте відкрити головну сторінку:
```
http://localhost:3000
```

Якщо вона працює, але курс не відкривається - проблема в маршрутизації.
Якщо і головна не працює - проблема в сервері.

