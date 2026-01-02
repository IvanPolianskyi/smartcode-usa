/**
 * Lesson 05-5: Створення власних винятків
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_5 = {
  lessonId: "lesson-05-5",
  moduleId: "module-05",
  order: 5,
  title: "Створення власних винятків",
  
  learningObjectives: [
    "Створювати кастомні класи винятків",
    "Піднімати винятки (raise)",
    "Створювати ієрархію винятків",
    "Документувати винятки",
    "Розуміти коли створювати власні винятки"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-05-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Навіщо створювати власні винятки?",
        content: `**Власні винятки** дозволяють створювати специфічні помилки для вашої програми.

**Переваги:**
- ✅ Більш зрозумілі помилки
- ✅ Легше обробляти специфічні ситуації
- ✅ Краща організація коду
- ✅ Документація через назви класів

**Коли створювати:**
- Коли стандартні винятки не описують ситуацію
- Коли потрібна специфічна обробка помилок
- Для кращої читабельності коду

**Приклад:**
\`\`\`python
# Замість загального ValueError
raise ValueError("Невірне значення")

# Краще - специфічний виняток
raise InvalidAgeError("Вік не може бути від'ємним")
\`\`\``
      },
      {
        title: "Створення власного винятку",
        content: `**Базовий клас винятку:**

\`\`\`python
class MyCustomError(Exception):
    pass

# Використання
raise MyCustomError("Щось пішло не так!")
\`\`\`

**Виняток з повідомленням:**
\`\`\`python
class InvalidAgeError(Exception):
    def __init__(self, message="Вік має бути додатнім числом"):
        self.message = message
        super().__init__(self.message)

# Використання
raise InvalidAgeError("Вік не може бути від'ємним!")
\`\`\`

**Приклад: Валідація віку**
\`\`\`python
class InvalidAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("Вік не може бути від'ємним!")
    if age > 150:
        raise InvalidAgeError("Вік не може бути більше 150!")
    return age

try:
    age = set_age(-5)
except InvalidAgeError as e:
    print(f"Помилка: {e}")
\`\`\``
      },
      {
        title: "raise - підняття винятків",
        content: `**raise** - ключове слово для підняття (виклику) винятків.

**Синтаксис:**
\`\`\`python
raise ТипВинятку("Повідомлення")
\`\`\`

**Приклади:**
\`\`\`python
# Підняти стандартний виняток
raise ValueError("Невірне значення")

# Підняти власний виняток
raise InvalidAgeError("Вік не може бути від'ємним")

# Підняти виняток без повідомлення
raise InvalidAgeError()
\`\`\`

**Використання в функціях:**
\`\`\`python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Ділення на нуль неможливе!")
    return a / b

try:
    result = divide(10, 0)
except ZeroDivisionError as e:
    print(f"Помилка: {e}")
\`\`\`

**Перепідняття винятку:**
\`\`\`python
try:
    # якийсь код
    pass
except ValueError:
    print("Обробка помилки")
    raise  # Перепіднімаємо виняток далі
\`\`\``
      },
      {
        title: "Ієрархія власних винятків",
        content: `Можна створювати ієрархію винятків (один виняток успадковується від іншого):

\`\`\`python
class FileError(Exception):
    """Базовий клас для помилок файлів"""
    pass

class FileNotFoundError(FileError):
    """Файл не знайдено"""
    pass

class FilePermissionError(FileError):
    """Немає доступу до файлу"""
    pass

# Використання
try:
    # код
    pass
except FilePermissionError:
    print("Помилка доступу")
except FileError:  # Ловить всі помилки файлів
    print("Помилка файлу")
\`\`\`

**Переваги ієрархії:**
- Можна обробляти всі помилки одного типу
- Краща організація коду
- Легше розширювати

**Приклад: Система валідації**
\`\`\`python
class ValidationError(Exception):
    """Базовий клас для помилок валідації"""
    pass

class InvalidEmailError(ValidationError):
    """Невірний email"""
    pass

class InvalidPasswordError(ValidationError):
    """Невірний пароль"""
    pass

# Обробка всіх помилок валідації
try:
    validate_user(email, password)
except ValidationError as e:
    print(f"Помилка валідації: {e}")
\`\`\``
      },
      {
        title: "Документація винятків",
        content: `**Документація** - важлива частина власних винятків.

\`\`\`python
class InvalidAgeError(Exception):
    """
    Виняток для невалідного віку.
    
    Виникає коли вік не відповідає вимогам:
    - Вік < 0
    - Вік > 150
    """
    def __init__(self, age, message="Вік має бути від 0 до 150"):
        self.age = age
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return f"{self.message}. Отримано: {self.age}"

# Використання
try:
    age = -5
    if age < 0:
        raise InvalidAgeError(age)
except InvalidAgeError as e:
    print(e)  # Використовує __str__
\`\`\`

**Кращі практики:**
- Додавай docstring до класу винятку
- Використовуй зрозумілі назви
- Додавай корисну інформацію в повідомлення
- Створюй ієрархію для пов'язаних винятків`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий власний виняток",
      code: `# Створення власного винятку
class InvalidAgeError(Exception):
    pass

# Використання
raise InvalidAgeError("Вік не може бути від'ємним!")`,
      explanation: "Демонструє створення простого власного винятку."
    },
    {
      title: "Приклад 2: Виняток з повідомленням",
      code: `# Виняток з кастомним повідомленням
class InvalidEmailError(Exception):
    def __init__(self, email):
        self.email = email
        self.message = f"Невірний email: {email}"
        super().__init__(self.message)

raise InvalidEmailError("test@")`,
      explanation: "Показує створення винятку з кастомним повідомленням."
    },
    {
      title: "Приклад 3: Ієрархія винятків",
      code: `# Ієрархія винятків
class FileError(Exception):
    pass

class FileNotFoundError(FileError):
    pass

# Обробка
try:
    raise FileNotFoundError("Файл не знайдено")
except FileError:
    print("Помилка файлу")`,
      explanation: "Демонструє створення ієрархії винятків."
    },
    {
      title: "Приклад 4: Використання raise",
      code: `# Підняття винятку в функції
def validate_age(age):
    if age < 0:
        raise ValueError("Вік не може бути від'ємним!")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"Помилка: {e}")`,
      explanation: "Показує використання raise для підняття винятків."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Створювати винятки для стандартних ситуацій",
      explanation: "Не потрібно створювати власний виняток якщо стандартний підходить.",
      correctApproach: "Використовуй стандартні винятки (ValueError, TypeError) коли можливо"
    },
    {
      mistake: "Не документувати власні винятки",
      explanation: "Без документації важко зрозуміти коли та як використовувати виняток.",
      correctApproach: "Завжди додавай docstring до класу винятку"
    },
    {
      mistake: "Створювати занадто багато винятків",
      explanation: "Занадто багато винятків ускладнює код.",
      correctApproach: "Створюй винятки тільки коли дійсно потрібно"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Власні винятки** - створення кастомних класів винятків
2. **raise** - підняття винятків
3. **Ієрархія винятків** - успадкування від базових класів
4. **Документація** - docstring та корисні повідомлення
5. **Кращі практики** - коли створювати власні винятки

Тепер ви вмієте створювати власні винятки для кращої обробки помилок у ваших програмах!

Наступний урок - практика з файловими задачами!`,
  
  practiceTask: {
    title: "Система валідації з власними винятками",
    description: "Створіть систему валідації з використанням власних винятків",
    problemStatement: `Напишіть програму, яка:
1. Створює клас InvalidInputError (успадковується від Exception)
2. Створює функцію validate_number(number), яка:
   - Перевіряє чи number > 0
   - Якщо number <= 0, піднімає InvalidInputError з повідомленням "Число має бути додатнім"
3. Викликає validate_number з різними значеннями (5, -3, 0)
4. Обробляє винятки та виводить повідомлення`,
    inputFormat: "Програма використовує фіксовані значення",
    outputFormat: `Приклад виведення:
Число 5 валідне
Помилка: Число має бути додатнім
Помилка: Число має бути додатнім`,
    examples: [
      {
        input: "numbers = [5, -3, 0]",
        output: `Число 5 валідне
Помилка: Число має бути додатнім
Помилка: Число має бути додатнім`,
        explanation: "Програма валідує числа та обробляє власні винятки"
      }
    ],
    solution: {
      code: `# Система валідації з власними винятками
class InvalidInputError(Exception):
    pass

def validate_number(number):
    if number <= 0:
        raise InvalidInputError("Число має бути додатнім")
    return True

# Тестування
numbers = [5, -3, 0]
for num in numbers:
    try:
        validate_number(num)
        print(f"Число {num} валідне")
    except InvalidInputError as e:
        print(f"Помилка: {e}")`,
      explanation: "Рішення створює власний виняток InvalidInputError та використовує його для валідації чисел."
    },
    hints: [
      "Створіть клас InvalidInputError(Exception)",
      "Використовуйте raise InvalidInputError() для підняття винятку",
      "Перевіряйте чи number > 0",
      "Обробляйте InvalidInputError в try/except",
      "Використовуйте цикл for для перевірки кількох чисел"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Від якого класу мають успадковуватися власні винятки?",
        options: [
          "Exception",
          "Error",
          "BaseException",
          "Будь-якого"
        ],
        correctAnswer: 0,
        explanation: "Власні винятки мають успадковуватися від Exception."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nclass MyError(Exception):\n    pass\nraise MyError('Помилка!')\n```",
        options: [
          "Підніме виняток MyError з повідомленням 'Помилка!'",
          "Створить клас MyError",
          "Нічого",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Код створює клас MyError та піднімає виняток з повідомленням."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке ключове слово використовується для підняття винятку?",
        options: [
          "raise",
          "throw",
          "error",
          "exception"
        ],
        correctAnswer: 0,
        explanation: "raise - ключове слово для підняття винятків в Python."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще створювати власні винятки?",
        options: [
          "Коли стандартні винятки не описують ситуацію",
          "Завжди",
          "Ніколи",
          "Тільки для складних програм"
        ],
        correctAnswer: 0,
        explanation: "Власні винятки краще створювати коли стандартні не описують специфічну ситуацію."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass MyError(Exception):\n    pass\ntry:\n    raise MyError('Тест')\nexcept MyError as e:\n    print(f'Помилка: {e}')\n```",
        options: [
          "Помилка: Тест",
          "Тест",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Код піднімає MyError з повідомленням 'Тест', яке обробляється та виводиться."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
