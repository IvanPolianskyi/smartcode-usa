/**
 * Lesson 04-4: Підняття винятків з raise
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_4 = {
  lessonId: "lesson-04-4",
  moduleId: "module-04",
  order: 4,
  title: "Підняття винятків з raise",
  
  learningObjectives: [
    "Піднімати винятки за допомогою raise",
    "Використовувати raise зі стандартними винятками",
    "Піднімати винятки в функціях",
    "Перепіднімати винятки",
    "Розуміти коли використовувати raise"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-04-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Навіщо піднімати винятки?",
        content: `**raise** дозволяє вам самому викликати помилки в програмі.

**Коли використовувати:**
- Коли потрібно перевірити дані перед обробкою
- Коли функція отримала некоректні аргументи
- Коли потрібно зупинити виконання при помилці
- Для кращої обробки помилок у функціях

**Приклад:**
\`\`\`python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Не можна ділити на нуль!")
    return a / b

# Використання
try:
    result = divide(10, 0)
except ZeroDivisionError as e:
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
# Підняти ValueError
raise ValueError("Невірне значення")

# Підняти TypeError
raise TypeError("Очікувався число")

# Підняти ZeroDivisionError
raise ZeroDivisionError("Не можна ділити на нуль!")
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
        title: "Стандартні винятки для raise",
        content: `Можна піднімати стандартні винятки Python:

**ValueError** - для некоректних значень:
\`\`\`python
def set_age(age):
    if age < 0:
        raise ValueError("Вік не може бути від'ємним!")
    if age > 150:
        raise ValueError("Вік не може бути більше 150!")
    return age

try:
    age = set_age(-5)
except ValueError as e:
    print(f"Помилка: {e}")
\`\`\`

**TypeError** - для некоректних типів:
\`\`\`python
def add_numbers(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Аргументи мають бути числами!")
    return a + b
\`\`\`

**ZeroDivisionError** - для ділення на нуль:
\`\`\`python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Не можна ділити на нуль!")
    return a / b
\`\`\`

**Кращі практики:**
- Використовуй стандартні винятки коли можливо
- Додавай зрозумілі повідомлення
- Перевіряй дані перед обробкою
- Використовуй відповідний тип винятку`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Підняття ValueError",
      code: `# Підняття ValueError
def validate_age(age):
    if age < 0:
        raise ValueError("Вік не може бути від'ємним!")
    if age > 150:
        raise ValueError("Вік не може бути більше 150!")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"Помилка: {e}")`,
      explanation: "Демонструє підняття ValueError для некоректних значень."
    },
    {
      title: "Приклад 2: Підняття TypeError",
      code: `# Підняття TypeError
def add_numbers(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Аргументи мають бути числами!")
    return a + b

try:
    result = add_numbers("5", 10)
except TypeError as e:
    print(f"Помилка: {e}")`,
      explanation: "Показує підняття TypeError для некоректних типів."
    },
    {
      title: "Приклад 3: Підняття ZeroDivisionError",
      code: `# Підняття ZeroDivisionError
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Не можна ділити на нуль!")
    return a / b

try:
    result = divide(10, 0)
except ZeroDivisionError as e:
    print(f"Помилка: {e}")`,
      explanation: "Демонструє підняття ZeroDivisionError для ділення на нуль."
    },
    {
      title: "Приклад 4: Перепідняття винятку",
      code: `# Перепідняття винятку
def process_number(num):
    try:
        if num < 0:
            raise ValueError("Число має бути додатнім")
    except ValueError:
        print("Обробка помилки")
        raise  # Перепіднімаємо виняток далі

try:
    process_number(-5)
except ValueError as e:
    print(f"Помилка: {e}")`,
      explanation: "Показує перепідняття винятку за допомогою raise без аргументів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Піднімати винятки без повідомлення",
      explanation: "Винятки без повідомлення важко зрозуміти та обробити.",
      correctApproach: "Завжди додавай зрозуміле повідомлення до raise: raise ValueError('Повідомлення')"
    },
    {
      mistake: "Піднімати неправильний тип винятку",
      explanation: "Використання неправильного типу винятку ускладнює обробку помилок.",
      correctApproach: "Використовуй відповідний тип: ValueError для значень, TypeError для типів, ZeroDivisionError для ділення на нуль"
    },
    {
      mistake: "Забути обробити піднятий виняток",
      explanation: "Якщо виняток не оброблений, програма завершиться з помилкою.",
      correctApproach: "Завжди обробляй винятки через try/except або документуй що функція може підняти виняток"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **raise** - ключове слово для підняття винятків
2. **Стандартні винятки** - ValueError, TypeError, ZeroDivisionError
3. **Підняття в функціях** - перевірка даних та підняття винятків
4. **Перепідняття** - raise без аргументів для передачі винятку далі
5. **Кращі практики** - використання відповідних типів винятків

Тепер ви вмієте піднімати винятки для кращої обробки помилок у ваших програмах!

Наступний урок - практика з файловими задачами!`,
  
  practiceTask: {
    title: "Система валідації з raise",
    description: "Створіть систему валідації з використанням raise",
    problemStatement: `Напишіть програму, яка:
1. Створює функцію validate_number(number), яка:
   - Перевіряє чи number > 0
   - Якщо number <= 0, піднімає ValueError з повідомленням "Число має бути додатнім"
2. Викликає validate_number з різними значеннями (5, -3, 0)
3. Обробляє винятки та виводить повідомлення`,
    outputFormat: `Приклад виведення:
Число 5 валідне
Помилка: Число має бути додатнім
Помилка: Число має бути додатнім`,
    examples: [
      {
        output: `Число 5 валідне
Помилка: Число має бути додатнім
Помилка: Число має бути додатнім`,
        explanation: "Програма валідує числа та обробляє винятки через raise"
      }
    ],
    solution: {
      code: `# Система валідації з raise
def validate_number(number):
    if number <= 0:
        raise ValueError("Число має бути додатнім")
    return True

# Тестування
numbers = [5, -3, 0]
for num in numbers:
    try:
        validate_number(num)
        print(f"Число {num} валідне")
    except ValueError as e:
        print(f"Помилка: {e}")`,
      explanation: "Рішення використовує raise ValueError для підняття винятку при невалідних значеннях."
    },
    hints: [
      "Використовуйте raise ValueError() для підняття винятку",
      "Перевіряйте чи number > 0",
      "Обробляйте ValueError в try/except",
      "Використовуйте цикл for для перевірки кількох чисел",
      "Додайте зрозуміле повідомлення до raise"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип винятку краще використати, коли функція отримала аргумент неправильного типу (наприклад, рядок замість числа)?",
        options: [
          "TypeError",
          "ValueError",
          "ZeroDivisionError",
          "FileNotFoundError"
        ],
        correctAnswer: 0,
        explanation: "TypeError використовується коли аргумент має неправильний тип."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться, якщо виконати цей код без try/except?\n\n```python\ndef validate_age(age):\n    if age < 0:\n        raise ValueError('Вік не може бути від\'ємним!')\n    return age\n\nvalidate_age(-5)\n```",
        options: [
          "Програма завершиться з помилкою ValueError",
          "Програма виведе 'Вік не може бути від'ємним!'",
          "Програма продовжить виконання",
          "Нічого не станеться"
        ],
        correctAnswer: 0,
        explanation: "Якщо виняток не оброблений через try/except, програма завершиться з помилкою."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати raise в функції?",
        options: [
          "Коли потрібно перевірити дані перед обробкою",
          "Коли потрібно вивести текст",
          "Коли потрібно закрити файл",
          "Коли потрібно створити змінну"
        ],
        correctAnswer: 0,
        explanation: "raise використовується для перевірки даних та сигналізації про помилки."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef check_number(num):\n    if not isinstance(num, int):\n        raise TypeError('Очікувалося число')\n    return num\n\ntry:\n    check_number('5')\nexcept TypeError as e:\n    print(f'Помилка: {e}')\n```",
        options: [
          "Помилка: Очікувалося число",
          "5",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "Код піднімає TypeError для рядка '5', який обробляється та виводиться."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає 'перепідняття винятку' з raise без аргументів?",
        options: [
          "Передати виняток далі, не обробляючи його",
          "Створити новий виняток",
          "Обробити виняток",
          "Видалити виняток"
        ],
        correctAnswer: 0,
        explanation: "raise без аргументів перепіднімає поточний виняток далі по стеку викликів."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Який тип винятку буде піднято в цьому коді?\n\n```python\ndef divide(a, b):\n    if b == 0:\n        raise ZeroDivisionError('Не можна ділити на нуль!')\n    return a / b\n```",
        options: [
          "ZeroDivisionError",
          "ValueError",
          "TypeError",
          "FileNotFoundError"
        ],
        correctAnswer: 0,
        explanation: "Код піднімає ZeroDivisionError для ділення на нуль."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
