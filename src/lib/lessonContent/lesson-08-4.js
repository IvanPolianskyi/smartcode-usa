/**
 * Lesson 08-4: Робота з JSON
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_4 = {
  lessonId: "lesson-08-4",
  moduleId: "module-08",
  order: 4,
  title: "Робота з JSON",
  
  learningObjectives: [
    "Читати та записувати JSON файли",
    "Парсити JSON дані",
    "Серіалізувати Python об'єкти в JSON",
    "Працювати з вкладеними структурами JSON"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-08-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до JSON",
        content: `JSON (JavaScript Object Notation) — це формат для обміну даними, який легко читається людьми та машинами.

**Що таке JSON?**

- Текстовий формат для зберігання та передачі даних
- Використовується для API, конфігурацій, зберігання даних
- Схожий на структури даних Python (dict, list)

**Основні типи даних JSON:**

- **Об'єкт** (object) — словник у Python
- **Масив** (array) — список у Python
- **Рядок** (string) — рядок у Python
- **Число** (number) — int або float у Python
- **Булеве** (boolean) — True/False у Python
- **null** — None у Python

**Приклад JSON:**

\`\`\`json
{
  "name": "Олександр",
  "age": 25,
  "city": "Київ",
  "skills": ["Python", "JavaScript"],
  "active": true,
  "salary": null
}
\`\`\`

**Імпорт модуля:**

\`\`\`python
import json
\`\`\``
      },
      {
        title: "Читання JSON з рядка",
        content: `**json.loads()** — парсить JSON рядок в Python об'єкт.

\`\`\`python
import json

# JSON рядок
json_string = '{"name": "Олександр", "age": 25}'

# Парсимо в словник
data = json.loads(json_string)
print(data)  # {'name': 'Олександр', 'age': 25}
print(type(data))  # <class 'dict'>
\`\`\`

**Приклад з вкладеними структурами:**

\`\`\`python
import json

json_string = '''
{
  "person": {
    "name": "Олександр",
    "age": 25,
    "skills": ["Python", "JavaScript"]
  }
}
'''

data = json.loads(json_string)
print(data['person']['name'])  # Олександр
print(data['person']['skills'][0])  # Python
\`\`\`

**Обробка помилок:**

\`\`\`python
import json

json_string = '{"name": "Олександр"'  # Неправильний JSON

try:
    data = json.loads(json_string)
except json.JSONDecodeError as e:
    print(f'Помилка парсингу: {e}')
\`\`\``
      },
      {
        title: "Запис Python об'єктів в JSON",
        content: `**json.dumps()** — конвертує Python об'єкт в JSON рядок.

\`\`\`python
import json

# Python словник
data = {
    'name': 'Олександр',
    'age': 25,
    'city': 'Київ',
    'skills': ['Python', 'JavaScript']
}

# Конвертуємо в JSON
json_string = json.dumps(data)
print(json_string)
# {"name": "Олександр", "age": 25, "city": "Київ", "skills": ["Python", "JavaScript"]}
\`\`\`

**Форматування JSON:**

\`\`\`python
import json

data = {'name': 'Олександр', 'age': 25}

# З відступами для читабельності
json_string = json.dumps(data, indent=2, ensure_ascii=False)
print(json_string)
# {
#   "name": "Олександр",
#   "age": 25
# }
\`\`\`

**Параметри json.dumps():**

- **indent** — кількість пробілів для відступу
- **ensure_ascii** — чи екранувати не-ASCII символи (False для українських букв)
- **sort_keys** — чи сортувати ключі

\`\`\`python
import json

data = {'z': 3, 'a': 1, 'b': 2}

# З сортуванням ключів
json_string = json.dumps(data, sort_keys=True, indent=2)
print(json_string)
# {
#   "a": 1,
#   "b": 2,
#   "z": 3
# }
\`\`\``
      },
      {
        title: "Робота з JSON файлами",
        content: `**json.load()** — читає JSON з файлу.

\`\`\`python
import json

# Читаємо JSON з файлу
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(data)
\`\`\`

**json.dump()** — записує Python об'єкт в JSON файл.

\`\`\`python
import json

# Дані для збереження
data = {
    'name': 'Олександр',
    'age': 25,
    'skills': ['Python', 'JavaScript']
}

# Записуємо в файл
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
\`\`\`

**Повний приклад: Читання та запис:**

\`\`\`python
import json

# Записуємо дані
data = {
    'students': [
        {'name': 'Олександр', 'grade': 95},
        {'name': 'Марія', 'grade': 88}
    ]
}

with open('students.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Читаємо дані
with open('students.json', 'r', encoding='utf-8') as f:
    loaded_data = json.load(f)

print(loaded_data['students'][0]['name'])  # Олександр
\`\`\``
      },
      {
        title: "Обробка складних типів даних",
        content: `JSON підтримує не всі типи Python. Потрібно конвертувати деякі типи.

**Проблема з datetime:**

\`\`\`python
import json
from datetime import datetime

data = {'date': datetime.now()}

# Помилка! datetime не підтримується JSON
# json.dumps(data)  # TypeError
\`\`\`

**Рішення: Кастомний encoder:**

\`\`\`python
import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {'date': datetime.now()}
json_string = json.dumps(data, cls=DateTimeEncoder)
print(json_string)
\`\`\`

**Конвертація назад:**

\`\`\`python
import json
from datetime import datetime

def decode_datetime(dct):
    for key, value in dct.items():
        if isinstance(value, str) and 'T' in value:
            try:
                dct[key] = datetime.fromisoformat(value)
            except:
                pass
    return dct

json_string = '{"date": "2024-01-15T10:30:00"}'
data = json.loads(json_string, object_hook=decode_datetime)
print(data['date'])  # datetime object
\`\`\`

**Обробка set та tuple:**

\`\`\`python
import json

data = {'numbers': {1, 2, 3}}  # set не підтримується

# Конвертуємо set в list
data_serializable = {'numbers': list(data['numbers'])}
json_string = json.dumps(data_serializable)
print(json_string)  # {"numbers": [1, 2, 3]}
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Збереження конфігурації**

\`\`\`python
import json

config = {
    'database': {
        'host': 'localhost',
        'port': 5432,
        'name': 'mydb'
    },
    'api_key': 'secret_key_123'
}

# Зберігаємо конфігурацію
with open('config.json', 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2)

# Завантажуємо конфігурацію
with open('config.json', 'r', encoding='utf-8') as f:
    loaded_config = json.load(f)
\`\`\`

**Приклад 2: Обробка API відповіді**

\`\`\`python
import json

# Симуляція API відповіді
api_response = '''
{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "Олександр"},
      {"id": 2, "name": "Марія"}
    ]
  }
}
'''

# Парсимо відповідь
response_data = json.loads(api_response)

if response_data['status'] == 'success':
    users = response_data['data']['users']
    for user in users:
        print(f"ID: {user['id']}, Ім'я: {user['name']}")
\`\`\`

**Приклад 3: Збереження даних користувача**

\`\`\`python
import json

def save_user_data(user_id, user_data):
    filename = f'user_{user_id}.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(user_data, f, indent=2, ensure_ascii=False)

def load_user_data(user_id):
    filename = f'user_{user_id}.json'
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return None

# Використання
user_data = {
    'name': 'Олександр',
    'email': 'alex@example.com',
    'preferences': {'theme': 'dark', 'language': 'uk'}
}

save_user_data(1, user_data)
loaded = load_user_data(1)
print(loaded)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили роботу з JSON:

**Ключові функції:**

1. **json.loads()** — парсить JSON рядок в Python об'єкт
2. **json.dumps()** — конвертує Python об'єкт в JSON рядок
3. **json.load()** — читає JSON з файлу
4. **json.dump()** — записує Python об'єкт в JSON файл

**Основні типи:**

- JSON object → Python dict
- JSON array → Python list
- JSON string → Python str
- JSON number → Python int/float
- JSON boolean → Python bool
- JSON null → Python None

**Важливо:**

- Використовуйте ensure_ascii=False для українських символів
- Використовуйте indent для читабельності
- Обробляйте помилки парсингу
- Конвертуйте нестандартні типи (datetime, set)

**Наступний крок:**

У наступному уроці ми вивчимо роботу з CSV та Excel файлами.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Парсинг JSON рядка",
      code: `import json

json_string = '{"name": "Олександр", "age": 25}'
data = json.loads(json_string)
print(data['name'])  # Олександр`,
      explanation: "Використовуємо json.loads() для парсингу JSON рядка в Python словник."
    },
    {
      title: "Приклад 2: Конвертація в JSON",
      code: `import json

data = {'name': 'Олександр', 'age': 25}
json_string = json.dumps(data, indent=2, ensure_ascii=False)
print(json_string)`,
      explanation: "Використовуємо json.dumps() для конвертації Python об'єкта в JSON рядок з форматуванням."
    },
    {
      title: "Приклад 3: Читання з файлу",
      code: `import json

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
print(data)`,
      explanation: "Використовуємо json.load() для читання JSON з файлу."
    },
    {
      title: "Приклад 4: Запис у файл",
      code: `import json

data = {'name': 'Олександр', 'age': 25}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)`,
      explanation: "Використовуємо json.dump() для запису Python об'єкта в JSON файл."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути ensure_ascii=False для українських символів",
      explanation: "За замовчуванням JSON екранує не-ASCII символи, що псує українські букви.",
      correctApproach: "Завжди використовуйте ensure_ascii=False при роботі з українським текстом."
    },
    {
      mistake: "Спроба серіалізувати несеріалізовані типи",
      explanation: "JSON не підтримує datetime, set, tuple без конвертації.",
      correctApproach: "Конвертуйте спеціальні типи перед серіалізацією або використовуйте кастомні encoders."
    },
    {
      mistake: "Не обробляти помилки парсингу",
      explanation: "Неправильний JSON викликає JSONDecodeError, який потрібно обробити.",
      correctApproach: "Використовуйте try/except для обробки помилок парсингу."
    }
  ],
  
  summary: `На цьому уроці ми вивчили роботу з JSON:

1. **json.loads()** — парсинг JSON рядка
2. **json.dumps()** — конвертація в JSON рядок
3. **json.load()** — читання з файлу
4. **json.dump()** — запис у файл

JSON — стандартний формат для обміну даними та зберігання конфігурацій!`,
  
  practiceTask: {
    title: "Створення системи збереження завдань",
    description: "Створіть систему для збереження та завантаження списку завдань у JSON",
    problemStatement: `Створіть систему управління завданнями:
1. Створіть функцію для збереження завдань у JSON файл
2. Створіть функцію для завантаження завдань з JSON файлу
3. Додайте можливість додавання нових завдань
4. Збережіть та завантажте список завдань

Структура завдання:
{
  "id": 1,
  "title": "Вивчити JSON",
  "completed": false
}`,
    inputFormat: "Список завдань",
    outputFormat: `Завдання збережено у tasks.json
Завантажено 3 завдання:
1. Вивчити JSON (не виконано)
2. Створити проект (не виконано)
3. Написати тести (виконано)`,
    examples: [
      {
        output: `Завдання збережено
Завантажено 1 завдання:
1. Завдання 1 (не виконано)`,
        explanation: "Використовуємо json.dump() для збереження та json.load() для завантаження."
      }
    ],
    solution: {
      code: `import json

def save_tasks(tasks, filename='tasks.json'):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, indent=2, ensure_ascii=False)
    print('Завдання збережено')

def load_tasks(filename='tasks.json'):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            tasks = json.load(f)
        return tasks
    except FileNotFoundError:
        return []

# Створюємо завдання
tasks = [{'id': 1, 'title': 'Завдання 1', 'completed': False}]

# Зберігаємо
save_tasks(tasks)

# Завантажуємо
loaded_tasks = load_tasks()
print(f'Завантажено {len(loaded_tasks)} завдання:')
for task in loaded_tasks:
    status = 'виконано' if task['completed'] else 'не виконано'
    print(f"{task['id']}. {task['title']} ({status})")`,
      explanation: "Використовуємо json.dump() для збереження та json.load() для завантаження завдань з обробкою помилок."
    },
    hints: [
      "Використайте json.dump() для збереження",
      "Використайте json.load() для завантаження",
      "Обробіть FileNotFoundError для нового файлу",
      "Використайте ensure_ascii=False для українського тексту"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить json.loads()?",
        options: [
          "Парсить JSON рядок в Python об'єкт",
          "Конвертує Python об'єкт в JSON рядок",
          "Читає JSON з файлу",
          "Записує JSON у файл"
        ],
        correctAnswer: 0,
        explanation: "json.loads() парсить (розбирає) JSON рядок і конвертує його в Python об'єкт (dict, list тощо)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр потрібен для коректного відображення українських символів?",
        options: [
          "ensure_ascii=False",
          "indent=2",
          "sort_keys=True",
          "encoding='utf-8'"
        ],
        correctAnswer: 0,
        explanation: "ensure_ascii=False дозволяє зберігати не-ASCII символи (українські букви) без екранування."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться, якщо спробувати серіалізувати datetime без конвертації?",
        options: [
          "Працюватиме нормально",
          "TypeError",
          "JSONDecodeError",
          "Нічого не станеться"
        ],
        correctAnswer: 1,
        explanation: "JSON не підтримує datetime напряму, тому виникне TypeError. Потрібна конвертація."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між json.load() та json.loads()?",
        options: [
          "load() працює з файлами, loads() з рядками",
          "loads() працює з файлами, load() з рядками",
          "Немає різниці",
          "load() швидший"
        ],
        correctAnswer: 0,
        explanation: "json.load() читає з файлу, json.loads() парсить рядок (s = string)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "JSON підтримує всі типи даних Python.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JSON підтримує тільки базові типи: dict, list, str, int, float, bool, None. Не підтримує datetime, set, tuple без конвертації."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
