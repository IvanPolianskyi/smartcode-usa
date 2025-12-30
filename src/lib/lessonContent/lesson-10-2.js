/**
 * Lesson 10-2: API та JSON
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson10_2 = {
  lessonId: "lesson-10-2",
  moduleId: "module-10",
  order: 2,
  title: "API та JSON",
  
  learningObjectives: [
    "Розуміти, що таке API",
    "Працювати з JSON даними",
    "Парсити JSON відповіді",
    "Використовувати публічні API"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-10-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке API?",
        content: `**API (Application Programming Interface)** — інтерфейс для взаємодії між програмами.

**Аналогія:**
API — це як меню в ресторані. Ви бачите список страв (endpoints), замовляєте (робите запит), а кухня (сервер) готує та приносить (повертає відповідь).

**Типи API:**
- **REST API** — найпоширеніший, використовує HTTP методи
- **GraphQL** — більш гнучкий, один endpoint
- **SOAP** — старіший, складніший

**REST API принципи:**
- **Stateless** — кожен запит незалежний
- **Ресурси** — дані представлені як ресурси (URL)
- **HTTP методи** — GET, POST, PUT, DELETE
- **JSON** — формат обміну даними

**Приклади API:**
- GitHub API — інформація про репозиторії
- Weather API — дані про погоду
- News API — новини
- JSONPlaceholder — тестове API`
      },
      {
        title: "Що таке JSON?",
        content: `**JSON (JavaScript Object Notation)** — формат для зберігання та передачі даних.

**Структура JSON:**

\`\`\`json
{
  "name": "Олександр",
  "age": 15,
  "city": "Київ",
  "hobbies": ["програмування", "читання"],
  "student": true
}
\`\`\`

**Типи даних JSON:**
- **Рядок** — "текст"
- **Число** — 42, 3.14
- **Булеве** — true, false
- **null** — null
- **Масив** — [1, 2, 3]
- **Об'єкт** — {"key": "value"}

**Python та JSON:**

\`\`\`python
import json

# Python → JSON
data = {"name": "Олександр", "age": 15}
json_string = json.dumps(data)
# '{"name": "Олександр", "age": 15}'

# JSON → Python
json_string = '{"name": "Олександр", "age": 15}'
data = json.loads(json_string)
# {"name": "Олександр", "age": 15}
\`\`\`

**Робота з файлами:**

\`\`\`python
# Запис у файл
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Читання з файлу
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
\`\`\``
      },
      {
        title: "Парсинг JSON відповідей",
        content: `**requests автоматично парсить JSON:**

\`\`\`python
import requests

response = requests.get("https://api.github.com/users/octocat")
data = response.json()  # Автоматично парсить JSON

print(data["name"])  # Доступ до полів
print(data["public_repos"])
\`\`\`

**Обробка складних структур:**

\`\`\`python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
post = response.json()

print(f"ID: {post['id']}")
print(f"Заголовок: {post['title']}")
print(f"Автор ID: {post['userId']}")
\`\`\`

**Робота з масивами:**

\`\`\`python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()  # Список постів

for post in posts[:5]:  # Перші 5
    print(f"{post['id']}: {post['title']}")
\`\`\`

**Вкладені об'єкти:**

\`\`\`python
# Якщо JSON має вкладені об'єкти
data = {
    "user": {
        "name": "Олександр",
        "address": {
            "city": "Київ",
            "country": "Україна"
        }
    }
}

city = data["user"]["address"]["city"]  # Доступ до вкладених полів
\`\`\``
      },
      {
        title: "Публічні API для практики",
        content: `**JSONPlaceholder** — тестове API:

\`\`\`python
import requests

# Отримати всі пости
response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()

# Отримати один пост
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
post = response.json()

# Створити пост
new_post = {"title": "Test", "body": "Content", "userId": 1}
response = requests.post("https://jsonplaceholder.typicode.com/posts", json=new_post)
\`\`\`

**HTTPBin** — тестування HTTP:

\`\`\`python
# Тест GET
response = requests.get("https://httpbin.org/get?name=Олександр")
print(response.json())

# Тест POST
response = requests.post("https://httpbin.org/post", json={"key": "value"})
print(response.json())
\`\`\`

**Приклад: Отримання даних про користувача GitHub:**

\`\`\`python
import requests

def get_github_user(username):
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        return None

user = get_github_user("octocat")
if user:
    print(f"Ім'я: {user['name']}")
    print(f"Репозиторії: {user['public_repos']}")
    print(f"Підписники: {user['followers']}")
\`\`\``
      },
      {
        title: "Обробка складних JSON",
        content: `**Фільтрація даних:**

\`\`\`python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()

# Знайти пости конкретного користувача
user_posts = [p for p in posts if p['userId'] == 1]
print(f"Користувач 1 має {len(user_posts)} постів")
\`\`\`

**Сортування:**

\`\`\`python
# Сортувати пости за ID
sorted_posts = sorted(posts, key=lambda x: x['id'], reverse=True)
\`\`\`

**Пошук:**

\`\`\`python
# Знайти пост за заголовком
found = next((p for p in posts if "qui" in p['title'].lower()), None)
if found:
    print(f"Знайдено: {found['title']}")
\`\`\`

**Збереження даних:**

\`\`\`python
import json
import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()

# Зберегти у файл
with open("posts.json", "w", encoding="utf-8") as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Отримання та парсинг JSON",
      code: `import requests

# Отримати дані
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
post = response.json()

# Вивести інформацію
print(f"ID: {post['id']}")
print(f"Заголовок: {post['title']}")
print(f"Текст: {post['body'][:50]}...")`,
      explanation: "Демонструє отримання JSON даних та доступ до полів."
    },
    {
      title: "Приклад 2: Робота з масивом даних",
      code: `import requests

# Отримати всі пости
response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()

# Обробити дані
print(f"Всього постів: {len(posts)}")

# Перші 3 пости
for post in posts[:3]:
    print(f"\\nПост {post['id']}:")
    print(f"  Заголовок: {post['title']}")
    print(f"  Автор: Користувач {post['userId']}")`,
      explanation: "Показує роботу з масивом JSON даних та ітерацію по них."
    },
    {
      title: "Приклад 3: Фільтрація та пошук",
      code: `import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = response.json()

# Знайти пости користувача 1
user1_posts = [p for p in posts if p['userId'] == 1]
print(f"Користувач 1 має {len(user1_posts)} постів")

# Знайти пост з певним словом
keyword = "qui"
found = [p for p in posts if keyword in p['title'].lower()]
print(f"Знайдено {len(found)} постів з '{keyword}'")`,
      explanation: "Демонструє фільтрацію та пошук у JSON даних."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба отримати доступ до неіснуючого ключа",
      explanation: "Якщо ключа немає в JSON, виникне KeyError.",
      correctApproach: "Використовуйте .get() для безпечного доступу: data.get('key', 'default')"
    },
    {
      mistake: "Не перевіряти тип даних",
      explanation: "JSON може містити різні типи, не завжди очікуваний.",
      correctApproach: "Перевіряйте типи: if isinstance(data, dict): ..."
    },
    {
      mistake: "Не обробляти помилки парсингу",
      explanation: "Якщо відповідь не JSON, response.json() викличе помилку.",
      correctApproach: "Використовуйте try/except або перевіряйте Content-Type."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **API** — інтерфейс для взаємодії між програмами
2. **JSON** — формат даних для API
3. **Парсинг JSON** — response.json() автоматично парсить
4. **Робота з даними** — доступ до полів, фільтрація, пошук
5. **Публічні API** — JSONPlaceholder, HTTPBin для практики

Тепер ви можете працювати з будь-яким REST API!`,
  
  practiceTask: {
    title: "Робота з JSON API",
    description: "Створіть програму для роботи з JSON API",
    problemStatement: `Створіть програму, яка:
1. Отримує список користувачів з JSONPlaceholder API
2. Показує інформацію про кожного користувача (ім'я, email, місто)
3. Знаходить користувача за ID
4. Фільтрує користувачів за містом
5. Зберігає дані у JSON файл`,
    inputFormat: "Програма робить HTTP-запити",
    outputFormat: `Приклад виведення:
Користувачі:
1. Leanne Graham (Sincere@april.biz) - Gwenborough
2. Ervin Howell (Shanna@melissa.tv) - Wisokyburgh
...`,
    examples: [
      {
        input: "GET запит до /users",
        output: "Список користувачів з деталями",
        explanation: "Програма отримує та обробляє JSON дані про користувачів"
      }
    ],
    solution: {
      code: `import requests
import json

def get_users():
    try:
        response = requests.get("https://jsonplaceholder.typicode.com/users", timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Помилка: {e}")
        return []

def find_user_by_id(users, user_id):
    return next((u for u in users if u['id'] == user_id), None)

def filter_by_city(users, city):
    return [u for u in users if u['address']['city'].lower() == city.lower()]

# Отримати користувачів
users = get_users()

if users:
    print("Користувачі:")
    for user in users:
        name = user['name']
        email = user['email']
        city = user['address']['city']
        print(f"{user['id']}. {name} ({email}) - {city}")
    
    # Знайти користувача за ID
    user = find_user_by_id(users, 1)
    if user:
        print(f"\\nКористувач #1: {user['name']}")
    
    # Фільтр за містом
    city_users = filter_by_city(users, "Gwenborough")
    print(f"\\nКористувачі з Gwenborough: {len(city_users)}")
    
    # Зберегти у файл
    with open("users.json", "w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)
    print("\\nДані збережено у users.json")`,
      explanation: "Програма отримує користувачів з API, обробляє дані та зберігає у файл."
    },
    hints: [
      "Використовуйте response.json() для парсингу",
      "Доступ до вкладених полів: user['address']['city']",
      "Використовуйте list comprehension для фільтрації",
      "json.dump() для збереження у файл"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке API?",
        options: ["Мова програмування", "Інтерфейс для взаємодії між програмами", "База даних", "Фреймворк"],
        correctAnswer: 1,
        explanation: "API (Application Programming Interface) — це інтерфейс, який дозволяє програмам взаємодіяти одна з одною."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що поверне response.json()?",
        options: ["Рядок", "Словник або список (Python об'єкт)", "HTML", "Помилку"],
        correctAnswer: 1,
        explanation: "response.json() парсить JSON відповідь та повертає Python об'єкт (словник, список тощо)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат даних найчастіше використовується в REST API?",
        options: ["XML", "JSON", "CSV", "HTML"],
        correctAnswer: 1,
        explanation: "JSON — найпоширеніший формат для REST API завдяки простоті та читабельності."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

