/**
 * Lesson 3-5: Модулі та пакети
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson3_5 = {
  lessonId: "lesson-3-5",
  moduleId: "module-3",
  order: 5,
  title: "Модулі та пакети",
  
  learningObjectives: [
    "Імпортувати модулі та використовувати їх функції",
    "Створювати власні модулі",
    "Організовувати код у пакети",
    "Використовувати стандартну бібліотеку Python"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-3-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке модулі?",
        content: `Модуль — це файл з розширенням .py, який містить Python код.

**Чому використовувати модулі?**
- **Організація коду** — розбиваємо великі програми на частини
- **Повторне використання** — один раз написав, використовуй скрізь
- **Приховування деталей** — показуємо тільки те, що потрібно
- **Співпраця** — різні люди можуть працювати над різними модулями

**Створення модуля:**
\`\`\`python
# math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159
\`\`\`

**Використання модуля:**
\`\`\`python
# main.py
import math_utils

result = math_utils.add(5, 3)
print(result)  # 8
\`\`\``
      },
      {
        title: "Різні способи імпорту",
        content: `**1. Повний імпорт:**
\`\`\`python
import math
result = math.sqrt(16)  # 4.0
\`\`\`

**2. Імпорт з псевдонімом:**
\`\`\`python
import math as m
result = m.sqrt(16)  # 4.0
\`\`\`

**3. Імпорт конкретних функцій:**
\`\`\`python
from math import sqrt, pi
result = sqrt(16)  # 4.0 (без math.)
print(pi)  # 3.14159...
\`\`\`

**4. Імпорт всього (не рекомендується):**
\`\`\`python
from math import *
result = sqrt(16)  # Працює, але не рекомендується
\`\`\`

**5. Імпорт з псевдонімом функції:**
\`\`\`python
from math import sqrt as квадратний_корінь
result = квадратний_корінь(16)
\`\`\``
      },
      {
        title: "Створення власних модулів",
        content: `**Структура проекту:**
\`\`\`
my_project/
├── main.py
├── utils.py
└── helpers.py
\`\`\`

**utils.py:**
\`\`\`python
# utils.py
def greet(name):
    return f"Привіт, {name}!"

def calculate_age(birth_year):
    return 2025 - birth_year
\`\`\`

**main.py:**
\`\`\`python
# main.py
from utils import greet, calculate_age

name = "Олександр"
print(greet(name))
print(f"Вік: {calculate_age(2010)}")
\`\`\`

**Перевірка, чи модуль запускається напряму:**
\`\`\`python
# utils.py
def greet(name):
    return f"Привіт, {name}!"

if __name__ == "__main__":
    # Цей код виконається тільки якщо файл запущено напряму
    print("Модуль utils запущено напряму")
    print(greet("Тест"))
\`\`\``
      },
      {
        title: "Пакети (Packages)",
        content: `Пакет — це папка, яка містить модулі та файл \`__init__.py\`.

**Структура пакету:**
\`\`\`
my_package/
├── __init__.py
├── module1.py
└── module2.py
\`\`\`

**__init__.py** (може бути порожнім):
\`\`\`python
# __init__.py
from .module1 import function1
from .module2 import function2

__all__ = ['function1', 'function2']
\`\`\`

**Використання пакету:**
\`\`\`python
# З пакету
from my_package import function1
from my_package.module2 import function2

# Або
import my_package.module1
\`\`\``
      },
      {
        title: "Стандартна бібліотека Python",
        content: `Python має багату стандартну бібліотеку:

**math** — математичні функції:
\`\`\`python
import math
print(math.sqrt(16))      # 4.0
print(math.pi)            # 3.14159...
print(math.ceil(4.3))     # 5
print(math.floor(4.7))    # 4
\`\`\`

**random** — випадкові числа:
\`\`\`python
import random
print(random.randint(1, 10))      # Випадкове число від 1 до 10
print(random.choice(['a', 'b', 'c']))  # Випадковий елемент
\`\`\`

**datetime** — робота з датами:
\`\`\`python
from datetime import datetime, date
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
\`\`\`

**os** — робота з операційною системою:
\`\`\`python
import os
print(os.getcwd())  # Поточна директорія
\`\`\`

**json** — робота з JSON (вивчимо детальніше пізніше):
\`\`\`python
import json
data = {"name": "Олександр", "age": 15}
json_str = json.dumps(data)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Створення та використання модуля",
      code: `# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

# main.py
import calculator

result1 = calculator.add(10, 5)
result2 = calculator.multiply(3, 4)
print(f"10 + 5 = {result1}")
print(f"3 * 4 = {result2}")`,
      explanation: "Демонструє створення власного модуля та його використання."
    },
    {
      title: "Приклад 2: Використання стандартної бібліотеки",
      code: `import math
import random
from datetime import datetime

# Математика
print(f"Квадратний корінь з 16: {math.sqrt(16)}")
print(f"Число π: {math.pi:.2f}")

# Випадкові числа
print(f"Випадкове число: {random.randint(1, 100)}")
print(f"Випадковий вибір: {random.choice(['яблуко', 'банан', 'апельсин'])}")

# Дата та час
now = datetime.now()
print(f"Поточний час: {now.strftime('%Y-%m-%d %H:%M:%S')}")`,
      explanation: "Показує використання різних модулів стандартної бібліотеки."
    },
    {
      title: "Приклад 3: Різні способи імпорту",
      code: `# Різні способи імпорту math
import math
result1 = math.sqrt(16)

import math as m
result2 = m.sqrt(16)

from math import sqrt
result3 = sqrt(16)

from math import sqrt as квадратний_корінь
result4 = квадратний_корінь(16)

# Всі дають однаковий результат
print(result1, result2, result3, result4)  # 4.0 4.0 4.0 4.0`,
      explanation: "Демонструє різні способи імпорту модулів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Імпорт модуля, якого немає",
      explanation: "Якщо модуль не знайдено, виникне ImportError.",
      correctApproach: "Переконайтеся, що модуль існує та знаходиться в правильній директорії."
    },
    {
      mistake: "Циклічні імпорти",
      explanation: "Модуль A імпортує модуль B, а модуль B імпортує модуль A — це викличе проблеми.",
      correctApproach: "Уникайте циклічних залежностей між модулями."
    },
    {
      mistake: "Використання from module import *",
      explanation: "Це імпортує все, що може призвести до конфліктів імен.",
      correctApproach: "Імпортуйте конкретні функції: from module import function1, function2"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Модулі** — файли .py з кодом
2. **Імпорт** — різні способи імпортування модулів
3. **Власні модулі** — створення та використання
4. **Пакети** — організація модулів у папки
5. **Стандартна бібліотека** — math, random, datetime, os, json

Модулі допомагають організувати код та робити його багаторазовим!`,
  
  practiceTask: {
    title: "Створення бібліотеки утиліт",
    description: "Створіть власний модуль з корисними функціями",
    problemStatement: `Створіть модуль utils.py з функціями:
1. format_name(first, last) — форматує ім'я "Ім'я Прізвище"
2. calculate_discount(price, percent) — обчислює ціну зі знижкою
3. is_valid_email(email) — перевіряє базову валідацію email
4. generate_id(prefix="ID") — генерує унікальний ID

Потім створіть main.py, який імпортує та використовує ці функції.`,
    inputFormat: "Створіть два файли: utils.py та main.py",
    outputFormat: `Приклад виведення:
Ім'я: Олександр Петренко
Ціна зі знижкою: 85.0
Email валідний: True
ID: ID-001`,
    examples: [
      {
        input: "format_name('Олександр', 'Петренко')",
        output: "Олександр Петренко",
        explanation: "Функція форматує повне ім'я"
      }
    ],
    solution: {
      code: `# utils.py
import random

def format_name(first, last):
    return f"{first} {last}"

def calculate_discount(price, percent):
    discount = price * (percent / 100)
    return price - discount

def is_valid_email(email):
    return "@" in email and "." in email.split("@")[1]

def generate_id(prefix="ID"):
    number = random.randint(1, 999)
    return f"{prefix}-{number:03d}"

# main.py
from utils import format_name, calculate_discount, is_valid_email, generate_id

name = format_name("Олександр", "Петренко")
print(f"Ім'я: {name}")

price = calculate_discount(100, 15)
print(f"Ціна зі знижкою: {price}")

valid = is_valid_email("student@example.com")
print(f"Email валідний: {valid}")

id = generate_id()
print(f"ID: {id}")`,
      explanation: "Рішення демонструє створення модуля з функціями та їх використання в іншому файлі."
    },
    hints: [
      "Створіть utils.py з функціями",
      "Використовуйте from utils import ... для імпорту",
      "Використовуйте random для генерації ID"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке модуль в Python?",
        options: ["Функція", "Файл .py з кодом", "Змінна", "Клас"],
        correctAnswer: 1,
        explanation: "Модуль — це файл з розширенням .py, який містить Python код."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: from math import sqrt; print(sqrt(16))?",
        options: ["4.0", "4", "math.sqrt(16)", "Помилку"],
        correctAnswer: 0,
        explanation: "from math import sqrt дозволяє використовувати sqrt без math., результат 4.0 (float)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який файл потрібен для створення пакету?",
        options: ["package.py", "__init__.py", "main.py", "index.py"],
        correctAnswer: 1,
        explanation: "__init__.py (може бути порожнім) вказує Python, що папка є пакетом."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
