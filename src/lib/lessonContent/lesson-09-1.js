/**
 * Lesson 09-1: HTTP-запити: requests
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_09_1 = {
  lessonId: "lesson-09-1",
  moduleId: "module-09",
  order: 1,
  title: "HTTP-запити: requests",
  
  learningObjectives: [
    "Встановити та використовувати requests",
    "Виконувати GET та POST запити",
    "Обробляти відповіді",
    "Працювати з заголовками та cookies"
  ],
  
  prerequisites: ["lesson-08-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до HTTP-запитів",
        content: `HTTP (HyperText Transfer Protocol) - це протокол для передачі даних між клієнтом та сервером.

**Що таке HTTP-запити?**

- **GET** - отримання даних з сервера
- **POST** - відправка даних на сервер
- **PUT** - оновлення даних
- **DELETE** - видалення даних

**Бібліотека requests:**

- Найпопулярніша бібліотека для HTTP-запитів у Python
- Простий та зручний API
- Підтримує всі типи HTTP-запитів
- Обробка cookies, сесій, заголовків

**Встановлення:**

\`\`\`bash
pip install requests
\`\`\`

**Імпорт:**

\`\`\`python
import requests
\`\`\``
      },
      {
        title: "GET запити",
        content: `**requests.get()** - виконує GET запит до URL.

\`\`\`python
import requests

# Простий GET запит
response = requests.get('https://api.github.com')
print(response.status_code)  # 200
print(response.text)  # HTML або JSON відповідь
\`\`\`

**Статус коди:**

- **200** - OK (успішно)
- **404** - Not Found (не знайдено)
- **500** - Server Error (помилка сервера)
- **403** - Forbidden (заборонено)

\`\`\`python
import requests

response = requests.get('https://httpbin.org/get')
print(response.status_code)  # 200

if response.status_code == 200:
    print('Успішно!')
    print(response.text)
else:
    print(f'Помилка: {response.status_code}')
\`\`\`

**Перевірка успішності:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

# Метод raise_for_status() викликає виняток при помилці
response.raise_for_status()  # Якщо статус не 200, викличе HTTPError
\`\`\``
      },
      {
        title: "Параметри запиту",
        content: `**Параметри URL (query parameters):**

\`\`\`python
import requests

# Додавання параметрів до URL
params = {'key1': 'value1', 'key2': 'value2'}
response = requests.get('https://httpbin.org/get', params=params)

print(response.url)
# https://httpbin.org/get?key1=value1&key2=value2
\`\`\`

**Приклад з реальним API:**

\`\`\`python
import requests

# Пошук репозиторіїв на GitHub
params = {
    'q': 'python',
    'sort': 'stars',
    'order': 'desc'
}

response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()

print(f"Знайдено репозиторіїв: {data['total_count']}")
\`\`\``
      },
      {
        title: "POST запити",
        content: `**requests.post()** - виконує POST запит з даними.

\`\`\`python
import requests

# POST з даними
data = {'name': 'Олександр', 'age': 25}
response = requests.post('https://httpbin.org/post', data=data)

print(response.status_code)  # 200
print(response.json())
\`\`\`

**POST з JSON:**

\`\`\`python
import requests

# Відправка JSON даних
json_data = {
    'username': 'user123',
    'email': 'user@example.com'
}

response = requests.post(
    'https://httpbin.org/post',
    json=json_data
)

print(response.json())
\`\`\`

**Різниця між data та json:**

- **data** - відправляє дані як form-data
- **json** - відправляє дані як JSON (автоматично встановлює Content-Type)

\`\`\`python
import requests

# Form data
response1 = requests.post('https://httpbin.org/post', data={'key': 'value'})

# JSON data
response2 = requests.post('https://httpbin.org/post', json={'key': 'value'})
\`\`\``
      },
      {
        title: "Обробка відповіді",
        content: `**Основні методи об'єкта Response:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

# Текстова відповідь
print(response.text)  # str

# JSON відповідь (якщо це JSON)
print(response.json())  # dict або list

# Бінарні дані
print(response.content)  # bytes

# Заголовки відповіді
print(response.headers)  # dict

# Статус код
print(response.status_code)  # int

# URL запиту
print(response.url)  # str
\`\`\`

**Робота з JSON:**

\`\`\`python
import requests

response = requests.get('https://api.github.com/users/octocat')

if response.status_code == 200:
    user_data = response.json()
    print(f"Ім'я: {user_data['name']}")
    print(f"Локація: {user_data['location']}")
    print(f"Публічні репозиторії: {user_data['public_repos']}")
\`\`\`

**Обробка помилок:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError

try:
    response = requests.get('https://api.github.com/users/invalid-user-12345')
    response.raise_for_status()  # Викличе HTTPError якщо статус не 200
except HTTPError as e:
    print(f'HTTP помилка: {e}')
except RequestException as e:
    print(f'Помилка запиту: {e}')
\`\`\``
      },
      {
        title: "Заголовки (Headers)",
        content: `**Відправка заголовків:**

\`\`\`python
import requests

headers = {
    'User-Agent': 'MyApp/1.0',
    'Accept': 'application/json',
    'Authorization': 'Bearer token123'
}

response = requests.get('https://httpbin.org/headers', headers=headers)
print(response.json())
\`\`\`

**User-Agent:**

Деякі сайти блокуватимуть запити без User-Agent:

\`\`\`python
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

response = requests.get('https://example.com', headers=headers)
\`\`\`

**Читання заголовків відповіді:**

\`\`\`python
import requests

response = requests.get('https://api.github.com')

print(response.headers['Content-Type'])  # application/json; charset=utf-8
print(response.headers.get('Server'))  # GitHub.com
\`\`\``
      },
      {
        title: "Cookies та сесії",
        content: `**Робота з cookies:**

\`\`\`python
import requests

# Відправка cookies
cookies = {'session_id': 'abc123', 'user': 'admin'}
response = requests.get('https://httpbin.org/cookies', cookies=cookies)
print(response.json())

# Читання cookies з відповіді
response = requests.get('https://httpbin.org/cookies/set?name=value')
print(response.cookies)  # <RequestsCookieJar>
print(response.cookies.get('name'))  # value
\`\`\`

**Сесії:**

Сесії зберігають cookies між запитами:

\`\`\`python
import requests

# Створення сесії
session = requests.Session()

# Всі запити через сесію використовують одні cookies
session.get('https://httpbin.org/cookies/set/sessioncookie/123456789')
response = session.get('https://httpbin.org/cookies')
print(response.json())  # {'cookies': {'sessioncookie': '123456789'}}
\`\`\`

**Приклад: Авторизація:**

\`\`\`python
import requests

session = requests.Session()

# Логін
login_data = {'username': 'user', 'password': 'pass'}
session.post('https://example.com/login', data=login_data)

# Тепер можна робити авторизовані запити
response = session.get('https://example.com/profile')
\`\`\``
      },
      {
        title: "Таймаути та обробка помилок",
        content: `**Таймаути:**

\`\`\`python
import requests
from requests.exceptions import Timeout

try:
    # Таймаут 5 секунд
    response = requests.get('https://httpbin.org/delay/10', timeout=5)
except Timeout:
    print('Запит перевищив час очікування')
\`\`\`

**Повна обробка помилок:**

\`\`\`python
import requests
from requests.exceptions import RequestException, HTTPError, Timeout, ConnectionError

def make_request(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        print(f'HTTP помилка: {e}')
    except Timeout:
        print('Таймаут запиту')
    except ConnectionError:
        print('Помилка з'єднання')
    except RequestException as e:
        print(f'Помилка запиту: {e}')
    return None

data = make_request('https://api.github.com/users/octocat')
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Отримання погоди (симуляція)**

\`\`\`python
import requests

def get_weather(city):
    # Симуляція API погоди
    url = f'https://wttr.in/{city}?format=j1'
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        current = data['current_condition'][0]
        print(f"Погода в {city}:")
        print(f"Температура: {current['temp_C']}°C")
        print(f"Опис: {current['weatherDesc'][0]['value']}")
    except RequestException as e:
        print(f'Помилка: {e}')

get_weather('Kyiv')
\`\`\`

**Приклад 2: Перевірка доступності сайту**

\`\`\`python
import requests

def check_site(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f'{url} - доступний')
            return True
        else:
            print(f'{url} - статус {response.status_code}')
            return False
    except RequestException as e:
        print(f'{url} - недоступний: {e}')
        return False

check_site('https://google.com')
\`\`\`

**Приклад 3: Завантаження файлу**

\`\`\`python
import requests

def download_file(url, filename):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'Файл збережено: {filename}')
    except RequestException as e:
        print(f'Помилка завантаження: {e}')

# Завантаження зображення
download_file('https://example.com/image.jpg', 'image.jpg')
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили роботу з HTTP-запитами:

**Ключові методи:**

1. **requests.get()** - GET запит
2. **requests.post()** - POST запит
3. **response.json()** - парсинг JSON відповіді
4. **response.text** - текстова відповідь
5. **response.status_code** - статус код

**Основні концепції:**

- GET - отримання даних
- POST - відправка даних
- Headers - метадані запиту
- Cookies - збереження стану
- Сесії - збереження cookies між запитами
- Таймаути - обмеження часу очікування

**Важливо:**

- Завжди обробляйте помилки
- Використовуйте таймаути
- Дотримуйтеся правил robots.txt
- Поважайте обмеження сервера

**Наступний крок:**

У наступному уроці ми коротко познайомимося з BeautifulSoup - інструментом для парсингу HTML, але основну увагу приділимо роботі з JSON API через requests.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий GET запит",
      code: `import requests

response = requests.get('https://api.github.com')
print(response.status_code)  # 200
print(response.json())`,
      explanation: "Виконуємо простий GET запит до API GitHub та виводимо результат."
    },
    {
      title: "Приклад 2: GET з параметрами",
      code: `import requests

params = {'q': 'python', 'sort': 'stars'}
response = requests.get('https://api.github.com/search/repositories', params=params)
data = response.json()
print(f"Знайдено: {data['total_count']} репозиторіїв")`,
      explanation: "Виконуємо GET запит з параметрами пошуку."
    },
    {
      title: "Приклад 3: POST запит",
      code: `import requests

data = {'name': 'Олександр', 'age': 25}
response = requests.post('https://httpbin.org/post', json=data)
print(response.json())`,
      explanation: "Виконуємо POST запит з JSON даними."
    },
    {
      title: "Приклад 4: Робота з сесіями",
      code: `import requests

session = requests.Session()
session.get('https://httpbin.org/cookies/set/session/123')
response = session.get('https://httpbin.org/cookies')
print(response.json())`,
      explanation: "Використовуємо сесію для збереження cookies між запитами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не обробляти помилки запитів",
      explanation: "Запити можуть не вдатися через мережеві проблеми, таймаути або помилки сервера.",
      correctApproach: "Завжди використовуйте try/except для обробки RequestException та перевіряйте status_code."
    },
    {
      mistake: "Забувати про таймаути",
      explanation: "Без таймаутів запит може чекати дуже довго.",
      correctApproach: "Завжди встановлюйте timeout параметр: requests.get(url, timeout=5)."
    },
    {
      mistake: "Плутати data та json параметри",
      explanation: "data відправляє form-data, json відправляє JSON з правильними заголовками.",
      correctApproach: "Використовуйте json= для JSON даних, data= для form-data."
    },
    {
      mistake: "Не перевіряти статус код",
      explanation: "Навіть при помилці (404, 500) requests не викличе виняток автоматично.",
      correctApproach: "Використовуйте response.raise_for_status() або перевіряйте response.status_code."
    }
  ],
  
  summary: `На цьому уроці ми вивчили роботу з HTTP-запитами:

1. requests.get() - отримання даних
2. requests.post() - відправка даних
3. Заголовки та cookies - налаштування запитів
4. Сесії - збереження стану
5. Обробка помилок - правильна обробка винятків

Бібліотека requests - потужний інструмент для роботи з веб-API!`,
  
  practiceTask: {
    title: "Створення API клієнта",
    description: "Створіть простий клієнт для роботи з даними користувача (без мережі)",
    problemStatement: `Створіть функцію get_user_info(username), яка:
1. Шукає користувача у словнику-«базі» USERS
2. Якщо знайдено — виводить ім'я, біо та кількість репозиторіїв
3. Якщо ні — виводить повідомлення що користувача не знайдено

Зчитайте username з input() і викличте функцію.

USERS вже заданий у рішенні (скопіюйте його у свій код).`,
    outputFormat: `Інформація про користувача:
Ім'я: The Octocat
Біо: GitHub mascot
Публічні репозиторії: 8`,
    examples: [
      {
        input: `octocat`,
        output: `Інформація про користувача:
Ім'я: The Octocat
Біо: GitHub mascot
Публічні репозиторії: 8`,
        explanation: "Користувач octocat є в базі"
      },
      {
        input: `torvalds`,
        output: `Інформація про користувача:
Ім'я: Linus Torvalds
Біо: Linux creator
Публічні репозиторії: 1`,
        explanation: "Користувач torvalds є в базі"
      },
      {
        input: `unknown_user`,
        output: `Користувач unknown_user не знайдений`,
        explanation: "Відсутній користувач"
      }
    ],
    solution: {
      code: `USERS = {
    'octocat': {'name': 'The Octocat', 'bio': 'GitHub mascot', 'public_repos': 8},
    'torvalds': {'name': 'Linus Torvalds', 'bio': 'Linux creator', 'public_repos': 1},
    'gvanrossum': {'name': 'Guido van Rossum', 'bio': 'Python BDFL', 'public_repos': 12},
}

def get_user_info(username):
    user_data = USERS.get(username)
    if user_data is None:
        print(f'Користувач {username} не знайдений')
        return None

    print('Інформація про користувача:')
    print(f"Ім'я: {user_data.get('name', 'Не вказано')}")
    print(f"Біо: {user_data.get('bio', 'Не вказано')}")
    print(f"Публічні репозиторії: {user_data.get('public_repos', 0)}")
    return user_data

username = input().strip()
get_user_info(username)`,
      explanation: "Працюємо з локальним словником замість мережевого API — стабільні тести."
    },
    hints: [
      "Скопіюйте словник USERS у свій код",
      "Використайте USERS.get(username)",
      "Зчитайте username через input().strip()",
      "Для відсутнього ключа виведіть повідомлення про помилку"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод requests використовується для отримання даних?",
        options: [
          "requests.get()",
          "requests.fetch()",
          "requests.retrieve()",
          "requests.download()"
        ],
        correctAnswer: 0,
        explanation: "requests.get() використовується для виконання HTTP GET запитів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між параметрами data та json у requests.post()?",
        options: [
          "data відправляє form-data, json відправляє JSON з правильними заголовками",
          "json відправляє form-data, data відправляє JSON",
          "Немає різниці",
          "data швидший"
        ],
        correctAnswer: 0,
        explanation: "data відправляє дані як form-data, а json автоматично встановлює Content-Type: application/json та серіалізує дані."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає статус код 404?",
        options: [
          "Not Found - ресурс не знайдено",
          "OK - успішно",
          "Server Error - помилка сервера",
          "Forbidden - заборонено"
        ],
        correctAnswer: 0,
        explanation: "404 означає, що запитуваний ресурс не знайдено на сервері."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо використовувати сесії (requests.Session())?",
        options: [
          "Для збереження cookies між запитами",
          "Для прискорення запитів",
          "Для шифрування даних",
          "Для кешування відповідей"
        ],
        correctAnswer: 0,
        explanation: "Сесії зберігають cookies та інші налаштування між кількома запитами, що корисно для авторизації."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "requests автоматично викликає виняток при статус коді 404.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. requests не викликає виняток автоматично. Потрібно використовувати response.raise_for_status() або перевіряти response.status_code вручну."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


