/**
 * Lesson 1-4: Введення та виведення даних
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson1_4 = {
  lessonId: "lesson-1-4",
  moduleId: "module-1",
  order: 4,
  title: "Введення та виведення даних",
  
  learningObjectives: [
    "Використовувати функцію print() для виведення",
    "Отримувати введення через input()",
    "Форматувати виведення за допомогою f-рядків",
    "Обробляти помилки введення"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-1-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Функція print()",
        content: `print() — це функція для виведення інформації на екран.

**Базове використання:**
\`\`\`python
print("Hello, World!")
print(42)
print(3.14)
\`\`\`

**Виведення кількох значень:**
\`\`\`python
name = "Олександр"
age = 15
print("Ім'я:", name, "Вік:", age)
# Виведе: Ім'я: Олександр Вік: 15
\`\`\`

**Параметри print():**
- \`sep\` — роздільник між значеннями (за замовчуванням пробіл)
- \`end\` — що додати в кінці (за замовчуванням новий рядок)

\`\`\`python
print("Hello", "World", sep="-")  # Hello-World
print("Перший рядок", end=" ")
print("Другий рядок")  # Перший рядок Другий рядок
\`\`\``
      },
      {
        title: "Форматування виведення (f-рядки)",
        content: `f-рядки (f-strings) — найкращий спосіб форматувати виведення в Python 3.6+.

**Синтаксис:**
\`\`\`python
name = "Олександр"
age = 15
print(f"Мене звати {name}, мені {age} років")
# Виведе: Мене звати Олександр, мені 15 років
\`\`\`

**Вираз всередині f-рядка:**
\`\`\`python
a = 10
b = 20
print(f"{a} + {b} = {a + b}")  # 10 + 20 = 30
\`\`\`

**Форматування чисел:**
\`\`\`python
pi = 3.14159
print(f"Число π: {pi:.2f}")  # Число π: 3.14
print(f"Відсоток: {0.75:.1%}")  # Відсоток: 75.0%
\`\`\`

**Вирівнювання:**
\`\`\`python
name = "Олександр"
print(f"|{name:>15}|")  # Вирівнювання вправо
print(f"|{name:<15}|")  # Вирівнювання вліво
print(f"|{name:^15}|")  # По центру
\`\`\``
      },
      {
        title: "Функція input()",
        content: `input() — функція для отримання введення від користувача.

**Базове використання:**
\`\`\`python
name = input("Введіть ваше ім'я: ")
print(f"Привіт, {name}!")
\`\`\`

**Важливо:** input() завжди повертає рядок (str)!

\`\`\`python
age = input("Скільки вам років? ")
print(type(age))  # <class 'str'>
# age це рядок "15", а не число 15!
\`\`\`

**Конвертація введення:**
\`\`\`python
# Для чисел
age = int(input("Скільки вам років? "))
height = float(input("Який ваш зріст (м)? "))

# Для булевих значень
is_student = input("Ви студент? (так/ні): ").lower() == "так"
\`\`\``
      },
      {
        title: "Обробка помилок введення",
        content: `Користувач може ввести неправильні дані. Потрібно обробляти помилки:

\`\`\`python
try:
    age = int(input("Скільки вам років? "))
    print(f"Вам {age} років")
except ValueError:
    print("Помилка! Будь ласка, введіть число.")
\`\`\`

**Повний приклад з повторенням:**
\`\`\`python
while True:
    try:
        age = int(input("Скільки вам років? "))
        if age > 0:
            break
        else:
            print("Вік має бути більше 0!")
    except ValueError:
        print("Помилка! Введіть правильне число.")

print(f"Вам {age} років")
\`\`\`

(Цикл while ми вивчимо детальніше в наступних уроках)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Просте введення та виведення",
      code: `# Отримання та виведення імені
name = input("Введіть ваше ім'я: ")
print(f"Привіт, {name}!")
print("Вітаю в Python!")`,
      explanation: "Базовий приклад використання input() та print()."
    },
    {
      title: "Приклад 2: Обчислення з введеними даними",
      code: `# Калькулятор
a = float(input("Введіть перше число: "))
b = float(input("Введіть друге число: "))

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")`,
      explanation: "Демонструє отримання числових даних та виконання обчислень."
    },
    {
      title: "Приклад 3: Обробка помилок",
      code: `# Безпечне отримання числа
try:
    age = int(input("Скільки вам років? "))
    print(f"Через 5 років вам буде {age + 5} років")
except ValueError:
    print("Помилка! Будь ласка, введіть правильне число.")`,
      explanation: "Показує, як обробляти помилки при неправильному введенні."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути конвертувати input() в число",
      explanation: "input() завжди повертає рядок. '5' + '3' = '53', а не 8.",
      correctApproach: "Завжди конвертуйте: int(input()) або float(input()) для чисел."
    },
    {
      mistake: "Не обробляти помилки введення",
      explanation: "Якщо користувач введе текст замість числа, програма впаде з помилкою.",
      correctApproach: "Використовуйте try/except для обробки помилок."
    },
    {
      mistake: "Плутанина між print() та return",
      explanation: "print() виводить на екран, return повертає значення з функції.",
      correctApproach: "Використовуйте print() для виведення, return для повернення значень."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **print()** — виведення інформації на екран
2. **f-рядки** — найкращий спосіб форматування виведення
3. **input()** — отримання введення від користувача
4. **Обробка помилок** — try/except для безпечного введення

Тепер ви можете створювати інтерактивні програми!`,
  
  practiceTask: {
    title: "Інтерактивний калькулятор",
    description: "Створіть програму, яка отримує дані від користувача",
    problemStatement: `Напишіть програму, яка:
1. Запитує ім'я користувача
2. Запитує два числа
3. Виконує всі базові операції (+, -, *, /)
4. Виводить результати у форматованому вигляді
5. Обробляє помилки введення`,
    inputFormat: "Програма запитує дані через input()",
    outputFormat: `Приклад виведення:
Привіт, Олександр!
Введіть перше число: 10
Введіть друге число: 5
Результати:
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2.0`,
    examples: [
      {
        input: "name='Олександр', a=10, b=5",
        output: `Привіт, Олександр!
Результати:
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2.0`,
        explanation: "Програма отримує дані від користувача та виконує обчислення"
      }
    ],
    solution: {
      code: `# Інтерактивний калькулятор
name = input("Введіть ваше ім'я: ")
print(f"Привіт, {name}!")

try:
    a = float(input("Введіть перше число: "))
    b = float(input("Введіть друге число: "))
    
    print("Результати:")
    print(f"{a} + {b} = {a + b}")
    print(f"{a} - {b} = {a - b}")
    print(f"{a} * {b} = {a * b}")
    print(f"{a} / {b} = {a / b}")
except ValueError:
    print("Помилка! Будь ласка, введіть правильні числа.")
except ZeroDivisionError:
    print("Помилка! Ділення на нуль неможливе.")`,
      explanation: "Рішення використовує input() для отримання даних, обробляє помилки та форматує виведення."
    },
    hints: [
      "Використовуйте float() для конвертації введення в число",
      "Використовуйте f-рядки для форматування виведення",
      "Додайте try/except для обробки помилок"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає функція input()?",
        options: ["int", "float", "str", "bool"],
        correctAnswer: 2,
        explanation: "input() завжди повертає рядок (str), навіть якщо введено число."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nname = 'Python'\nprint(f'Hello, {name}!')```",
        options: ["Hello, name!", "Hello, Python!", "f'Hello, {name}!'", "Помилку"],
        correctAnswer: 1,
        explanation: "f-рядок замінює {name} на значення змінної name."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як форматувати число з 2 знаками після коми в f-рядку?",
        options: ["{x:2}", "{x:.2f}", "{x:2f}", "{x,2}"],
        correctAnswer: 1,
        explanation: "{x:.2f} форматує число x з 2 знаками після коми."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться, якщо користувач введе 'abc' в цьому коді?\n\n```python\nage = int(input('Вік: '))\n```",
        options: ["age = 'abc'", "age = 0", "Помилка ValueError", "Нічого"],
        correctAnswer: 2,
        explanation: "int() не може конвертувати 'abc' в число, тому виникне ValueError."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр print() визначає, що додати в кінці?",
        options: ["sep", "end", "flush", "file"],
        correctAnswer: 1,
        explanation: "Параметр end визначає, що додати в кінці (за замовчуванням новий рядок)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}


