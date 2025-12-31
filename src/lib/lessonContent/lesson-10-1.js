/**
 * Lesson 10-1: HTTP-запити: requests
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson10_1 = {
  lessonId: "lesson-10-1",
  moduleId: "module-10",
  order: 1,
  title: "HTTP-запити: requests",
  
  learningObjectives: [
    "Встановити та використовувати requests",
    "Виконувати GET та POST запити",
    "Обробляти відповіді",
    "Працювати з заголовками"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-9-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке HTTP?",
        content: `**HTTP (HyperText Transfer Protocol)** — протокол для передачі даних через інтернет.

**Основні поняття:**
- **Клієнт** — програма, яка робить запит (ваш Python скрипт)
- **Сервер** — програма, яка обробляє запити та повертає відповіді
- **URL** — адреса ресурсу (https://api.example.com/data)
- **Метод** — тип запиту (GET, POST, PUT, DELETE)

**HTTP методи:**
- **GET** — отримати дані
- **POST** — відправити дані
- **PUT** — оновити дані
- **DELETE** — видалити дані

**Приклад:**
Коли ви відкриваєте сайт у браузері, браузер робить GET запит до сервера, а сервер повертає HTML сторінку.`
      },
      {
        title: "Бібліотека requests",
        content: `**requests** — найпопулярніша бібліотека Python для HTTP-запитів.

**Встановлення:**

\`\`\`bash
pip install requests
\`\`\`

**Перевірка:**

\`\`\`python
import requests
print(requests.__version__)
\`\`\`

**Переваги requests:**
- Простий API
- Автоматичне кодування/декодування
- Підтримка JSON
- Обробка помилок
- Підтримка сесій

**Базовий приклад:**

\`\`\`python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)  # 200
print(response.text)  # HTML або JSON
\`\`\``
      },
      {
        title: "GET запити",
        content: `**GET** — отримання даних з сервера.

**Базовий GET:**

\`\`\`python
import requests

response = requests.get("https://api.github.com/users/octocat")
print(response.status_code)  # 200 (успіх)
print(response.json())  # JSON дані
\`\`\`

**Параметри запиту:**

\`\`\`python
# Додавання параметрів до URL
params = {"q": "python", "page": 1}
response = requests.get("https://api.example.com/search", params=params)
# URL стане: https://api.example.com/search?q=python&page=1
\`\`\`

**Заголовки:**

\`\`\`python
headers = {
    "User-Agent": "MyApp/1.0",
    "Accept": "application/json"
}
response = requests.get("https://api.example.com/data", headers=headers)
\`\`\`

**Обробка відповіді:**

\`\`\`python
response = requests.get("https://api.example.com/data")

# Статус код
print(response.status_code)  # 200, 404, 500 тощо

# Текст відповіді
print(response.text)

# JSON (якщо відповідь JSON)
data = response.json()

# Заголовки відповіді
print(response.headers)

# Перевірка успіху
if response.status_code == 200:
    print("Успіх!")
else:
    print("Помилка!")
\`\`\``
      },
      {
        title: "POST запити",
        content: `**POST** — відправка даних на сервер.

**Базовий POST:**

\`\`\`python
import requests

data = {"name": "Олександр", "age": 15}
response = requests.post("https://api.example.com/users", json=data)
print(response.status_code)
\`\`\`

**Відправка JSON:**

\`\`\`python
import requests

data = {
    "title": "Новий пост",
    "content": "Текст поста"
}

response = requests.post(
    "https://api.example.com/posts",
    json=data,  # Автоматично встановлює Content-Type: application/json
    headers={"Authorization": "Bearer token123"}
)

print(response.json())
\`\`\`

**Відправка форми:**

\`\`\`python
data = {"username": "user", "password": "pass"}
response = requests.post("https://api.example.com/login", data=data)
\`\`\`

**Різниця між json= та data=:**
- \`json=\` — відправляє JSON, встановлює правильні заголовки
- \`data=\` — відправляє форму (application/x-www-form-urlencoded)`
      },
      {
        title: "Обробка помилок",
        content: `**Перевірка статус коду:**

\`\`\`python
response = requests.get("https://api.example.com/data")

if response.status_code == 200:
    data = response.json()
elif response.status_code == 404:
    print("Ресурс не знайдено!")
elif response.status_code == 500:
    print("Помилка сервера!")
else:
    print(f"Помилка: {response.status_code}")
\`\`\`

**Використання raise_for_status():**

\`\`\`python
response = requests.get("https://api.example.com/data")
response.raise_for_status()  # Викличе виняток, якщо статус не 2xx
data = response.json()
\`\`\`

**Try/except:**

\`\`\`python
try:
    response = requests.get("https://api.example.com/data", timeout=5)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"Помилка запиту: {e}")
\`\`\`

**Таймаут:**

\`\`\`python
# Запит не буде чекати більше 5 секунд
response = requests.get("https://api.example.com/data", timeout=5)
\`\`\``
      },
      {
        title: "Практичний приклад: Робота з API",
        content: `**Приклад: Отримання погоди (приклад API):**

\`\`\`python
import requests

def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": "YOUR_API_KEY",  # Потрібен API ключ
        "units": "metric"
    }
    
    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        return {
            "temp": data["main"]["temp"],
            "description": data["weather"][0]["description"]
        }
    except requests.exceptions.RequestException as e:
        print(f"Помилка: {e}")
        return None

weather = get_weather("Kyiv")
if weather:
    print(f"Температура: {weather['temp']}°C")
    print(f"Опис: {weather['description']}")
\`\`\`

**Приклад: Отримання даних з JSONPlaceholder:**

\`\`\`python
import requests

# Отримати список постів
response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()

for post in posts[:5]:  # Перші 5 постів
    print(f"ID: {post['id']}")
    print(f"Заголовок: {post['title']}")
    print()

# Отримати один пост
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
post = response.json()
print(f"Пост #1: {post['title']}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий GET запит",
      code: `import requests

# Отримати дані
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")

print(f"Статус: {response.status_code}")
print(f"Дані: {response.json()}")`,
      explanation: "Демонструє базовий GET запит та отримання JSON даних."
    },
    {
      title: "Приклад 2: GET з параметрами",
      code: `import requests

# Пошук з параметрами
params = {"userId": 1}
response = requests.get("https://jsonplaceholder.typicode.com/posts", params=params)

posts = response.json()
print(f"Знайдено {len(posts)} постів")`,
      explanation: "Показує додавання параметрів до GET запиту."
    },
    {
      title: "Приклад 3: POST запит",
      code: `import requests

# Створити новий пост
new_post = {
    "title": "Мій пост",
    "body": "Текст поста",
    "userId": 1
}

response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=new_post
)

print(f"Статус: {response.status_code}")
print(f"Створено: {response.json()}")`,
      explanation: "Демонструє відправку даних через POST запит."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не обробляти помилки",
      explanation: "Якщо сервер недоступний або повертає помилку, програма може впасти.",
      correctApproach: "Використовуйте try/except та перевіряйте response.status_code."
    },
    {
      mistake: "Плутанина між json= та data=",
      explanation: "json= відправляє JSON, data= відправляє форму. Використовуйте правильний параметр.",
      correctApproach: "Використовуйте json= для JSON API, data= для форм."
    },
    {
      mistake: "Не встановлювати таймаут",
      explanation: "Без таймауту запит може чекати дуже довго, якщо сервер не відповідає.",
      correctApproach: "Завжди встановлюйте timeout: requests.get(url, timeout=5)"
    },
    {
      mistake: "Не перевіряти статус код",
      explanation: "Навіть якщо запит виконався, сервер може повернути помилку (404, 500).",
      correctApproach: "Перевіряйте response.status_code або використовуйте response.raise_for_status()."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **HTTP** — протокол для передачі даних через інтернет
2. **requests** — бібліотека для HTTP-запитів
3. **GET запити** — отримання даних з сервера
4. **POST запити** — відправка даних на сервер
5. **Обробка відповідей** — status_code, json(), text
6. **Обробка помилок** — try/except, raise_for_status()
7. **Параметри та заголовки** — params, headers

Тепер ви можете взаємодіяти з веб-API!`,
  
  practiceTask: {
    title: "Робота з API",
    description: "Створіть програму для роботи з публічним API",
    problemStatement: `Створіть програму, яка:
1. Отримує список постів з JSONPlaceholder API
2. Показує перші 5 постів (ID, заголовок)
3. Дозволяє створити новий пост через POST
4. Обробляє помилки (таймаут, недоступність сервера)
5. Виводить результати у зрозумілому форматі`,
    inputFormat: "Програма робить HTTP-запити",
    outputFormat: `Приклад виведення:
Пости з API:
1. sunt aut facere...
2. qui est esse...
...

Створено новий пост з ID: 101`,
    examples: [
      {
        input: "GET запит до API",
        output: "Список постів",
        explanation: "Програма отримує дані з API та відображає їх"
      }
    ],
    solution: {
      code: `import requests

def get_posts(limit=5):
    try:
        response = requests.get(
            "https://jsonplaceholder.typicode.com/posts",
            timeout=5
        )
        response.raise_for_status()
        posts = response.json()
        return posts[:limit]
    except requests.exceptions.RequestException as e:
        print(f"Помилка отримання постів: {e}")
        return []

def create_post(title, body, user_id=1):
    try:
        data = {
            "title": title,
            "body": body,
            "userId": user_id
        }
        response = requests.post(
            "https://jsonplaceholder.typicode.com/posts",
            json=data,
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Помилка створення поста: {e}")
        return None

# Отримати пости
print("Пости з API:")
posts = get_posts(5)
for post in posts:
    print(f"{post['id']}. {post['title'][:50]}...")

# Створити новий пост
print("\\nСтворення нового поста...")
new_post = create_post("Мій пост", "Текст поста")
if new_post:
    print(f"Створено пост з ID: {new_post.get('id', 'невідомо')}")`,
      explanation: "Програма отримує пости з API та створює новий пост, з обробкою помилок."
    },
    hints: [
      "Використовуйте requests.get() для отримання даних",
      "Використовуйте requests.post() з json= для створення",
      "Додайте try/except для обробки помилок",
      "Використовуйте timeout для обмеження часу очікування"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке HTTP?",
        options: ["Мова програмування", "Протокол для передачі даних", "База даних", "Фреймворк"],
        correctAnswer: 1,
        explanation: "HTTP (HyperText Transfer Protocol) — це протокол для передачі даних через інтернет."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить requests.get('https://api.example.com')?",
        options: ["Відправляє дані", "Отримує дані з сервера", "Видаляє дані", "Оновлює дані"],
        correctAnswer: 1,
        explanation: "requests.get() робить GET запит для отримання даних з сервера."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який статус код означає успіх?",
        options: ["404", "500", "200", "300"],
        correctAnswer: 2,
        explanation: "200 означає успішний запит. 404 — не знайдено, 500 — помилка сервера."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Яка різниця між json= та data= у requests.post()?",
        options: ["Немає різниці", "json= відправляє JSON, data= відправляє форму", "data= відправляє JSON", "json= не працює"],
        correctAnswer: 1,
        explanation: "json= автоматично встановлює заголовки для JSON, data= відправляє дані як форму."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

