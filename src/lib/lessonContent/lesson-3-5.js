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
    "Імпортувати модулі",
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
        content: `Модуль — це файл з розширенням .py, який містить код Python.

**Чому використовувати модулі?**
- **Організація коду** — розділення на логічні частини
- **Повторне використання** — можна використовувати в різних проектах
- **Уникання конфліктів** — кожен модуль має свою область видимості
- **Легше підтримувати** — зміни в одному місці

**Створення модуля:**
Створіть файл \`math_utils.py\`:
\`\`\`python
# math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159
\`\`\``
      },
      {
        title: "Імпортування модулів",
        content: `**Різні способи імпорту:**

\`\`\`python
# Імпорт всього модуля
import math
result = math.sqrt(16)  # 4.0

# Імпорт конкретної функції
from math import sqrt
result = sqrt(16)  # 4.0

# Імпорт зі зміною імені
from math import sqrt as square_root
result = square_root(16)

# Імпорт кількох функцій
from math import sqrt, pi, sin

# Імпорт всього (не рекомендується)
from math import *
result = sqrt(16)  # Працює, але не рекомендується
\`\`\`

**Власні модулі:**
\`\`\`python
# У файлі main.py
import math_utils

result = math_utils.add(5, 3)
print(result)  # 8

# Або
from math_utils import add, multiply
result = add(5, 3)
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
print(math.sin(math.pi/2))  # 1.0
\`\`\`

**random** — випадкові числа:
\`\`\`python
import random
print(random.randint(1, 10))  # Випадкове число від 1 до 10
print(random.choice(["a", "b", "c"]))  # Випадковий елемент
\`\`\`

**datetime** — робота з датами:
\`\`\`python
from datetime import datetime
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
\`\`\`

**os** — робота з операційною системою:
\`\`\`python
import os
print(os.getcwd())  # Поточна директорія
\`\`\``
      },
      {
        title: "Пакети",
        content: `Пакет — це директорія, яка містить модулі та файл \`__init__.py\`.

**Структура пакету:**
\`\`\`
my_package/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py
\`\`\`

**Використання:**
\`\`\`python
# Імпорт модуля з пакету
from my_package import module1
from my_package.module2 import function_name

# Імпорт з підпакету
from my_package.subpackage import module3
\`\`\`

**Файл __init__.py:**
Може бути порожнім або містити код ініціалізації пакету:
\`\`\`python
# __init__.py
from .module1 import function1
from .module2 import function2

__all__ = ['function1', 'function2']
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Створення та використання модуля",
      code: `# Файл: calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

# Файл: main.py
import calculator

result1 = calculator.add(10, 5)
result2 = calculator.subtract(10, 5)
print(f"Додавання: {result1}, Віднімання: {result2}")`,
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
random_num = random.randint(1, 100)
print(f"Випадкове число: {random_num}")

# Дата та час
now = datetime.now()
print(f"Поточна дата: {now.strftime('%Y-%m-%d %H:%M:%S')}")`,
      explanation: "Показує використання різних модулів стандартної бібліотеки."
    },
    {
      title: "Приклад 3: Створення пакету",
      code: `# Структура:
# my_utils/
#     __init__.py
#     math_utils.py
#     string_utils.py

# math_utils.py
def square(x):
    return x ** 2

# string_utils.py
def uppercase(text):
    return text.upper()

# Використання
from my_utils.math_utils import square
from my_utils.string_utils import uppercase

print(square(5))           # 25
print(uppercase("hello"))  # HELLO`,
      explanation: "Демонструє створення та використання пакету."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Імпорт модуля, який не існує",
      explanation: "Якщо модуль не знайдено, виникне ImportError.",
      correctApproach: "Переконайтеся, що файл модуля існує та знаходиться в правильній директорії."
    },
    {
      mistake: "Циклічні імпорти",
      explanation: "Модуль A імпортує модуль B, а модуль B імпортує модуль A — це викличе проблеми.",
      correctApproach: "Уникайте циклічних залежностей між модулями."
    },
    {
      mistake: "Використання from module import *",
      explanation: "Це імпортує все, що може призвести до конфліктів імен.",
      correctApproach: "Імпортуйте конкретні функції або використовуйте import module."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Модулі** — файли .py з кодом Python
2. **Імпортування** — import, from ... import
3. **Стандартна бібліотека** — math, random, datetime, os та інші
4. **Пакети** — директорії з модулями та __init__.py

Модулі та пакети — основа організації великих проектів!`,
  
  practiceTask: {
    title: "Створення власної бібліотеки",
    description: "Створіть власний модуль з корисними функціями",
    problemStatement: `Створіть модуль utils.py з функціями:
1. calculate_statistics(numbers) — обчислює суму, середнє, макс, мін
2. format_text(text, style="normal") — форматує текст (upper, lower, title)
3. is_prime(number) — перевіряє, чи число просте
4. generate_password(length=8) — генерує випадковий пароль

Потім створіть main.py, який імпортує та використовує ці функції`,
    inputFormat: "Створіть два файли: utils.py та main.py",
    outputFormat: `Приклад виведення:
Статистика: Сума=15, Середнє=5.0, Макс=10, Мін=1
Текст: HELLO WORLD
Число 7 просте: True
Пароль: aB3dE5fG`,
    examples: [
      {
        input: "numbers = [1, 3, 5, 7, 10]",
        output: `Сума: 26, Середнє: 5.2, Макс: 10, Мін: 1`,
        explanation: "Модуль містить функції для обробки даних"
      }
    ],
    solution: {
      code: `# utils.py
import random
import string

def calculate_statistics(numbers):
    if not numbers:
        return None
    return {
        "сума": sum(numbers),
        "середнє": sum(numbers) / len(numbers),
        "макс": max(numbers),
        "мін": min(numbers)
    }

def format_text(text, style="normal"):
    if style == "upper":
        return text.upper()
    elif style == "lower":
        return text.lower()
    elif style == "title":
        return text.title()
    return text

def is_prime(number):
    if number < 2:
        return False
    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return False
    return True

def generate_password(length=8):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

# main.py
from utils import calculate_statistics, format_text, is_prime, generate_password

numbers = [1, 3, 5, 7, 10]
stats = calculate_statistics(numbers)
print(f"Статистика: {stats}")

text = format_text("hello world", "upper")
print(f"Текст: {text}")

print(f"Число 7 просте: {is_prime(7)}")
print(f"Пароль: {generate_password(8)}")`,
      explanation: "Рішення демонструє створення модуля з корисними функціями та їх використання."
    },
    hints: [
      "Створіть файл utils.py з функціями",
      "Використовуйте import для стандартних модулів (random, string)",
      "У main.py імпортуйте функції з utils"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як імпортувати функцію sqrt з модуля math?",
        options: ["import sqrt from math", "from math import sqrt", "import math.sqrt", "math.import(sqrt)"],
        correctAnswer: 1,
        explanation: "Правильний синтаксис: from math import sqrt"
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: import math; print(math.sqrt(9))?",
        options: ["3", "3.0", "9", "Помилку"],
        correctAnswer: 1,
        explanation: "math.sqrt() завжди повертає float, тому 3.0."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що має містити директорія, щоб бути пакетом?",
        options: ["package.py", "__init__.py", "init.py", "Нічого"],
        correctAnswer: 1,
        explanation: "Пакет має містити файл __init__.py (може бути порожнім)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

