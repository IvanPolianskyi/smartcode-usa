/**
 * Lesson 3-1: Створення функцій
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson3_1 = {
  lessonId: "lesson-3-1",
  moduleId: "module-3",
  order: 1,
  title: "Створення функцій",
  
  learningObjectives: [
    "Оголошувати та викликати функції",
    "Передавати аргументи у функції",
    "Повертати значення з функцій",
    "Розуміти параметри за замовчуванням"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-2-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке функції?",
        content: `Функція — це блок коду, який виконує певну задачу та може бути викликаний багато разів.

**Чому використовувати функції?**
- **Повторне використання** — один раз написав, використовуй скрізь
- **Організація коду** — код стає читабельнішим
- **Легше тестувати** — можна тестувати окремо
- **Легше підтримувати** — зміни в одному місці

**Базовий синтаксис:**
\`\`\`python
def назва_функції():
    # код функції
    return результат
\`\`\``
      },
      {
        title: "Створення та виклик функції",
        content: `**Проста функція:**
\`\`\`python
def greet():
    print("Привіт, світ!")

# Виклик функції
greet()  # Виведе: Привіт, світ!
\`\`\`

**Функція з параметрами:**
\`\`\`python
def greet(name):
    print(f"Привіт, {name}!")

greet("Олександр")  # Привіт, Олександр!
greet("Марія")      # Привіт, Марія!
\`\`\`

**Функція з поверненням значення:**
\`\`\`python
def add(a, b):
    result = a + b
    return result

sum_result = add(5, 3)
print(sum_result)  # 8
\`\`\`

**Короткий запис:**
\`\`\`python
def add(a, b):
    return a + b
\`\`\``
      },
      {
        title: "Параметри за замовчуванням",
        content: `Можна вказати значення за замовчуванням для параметрів:

\`\`\`python
def greet(name, greeting="Привіт"):
    print(f"{greeting}, {name}!")

greet("Олександр")              # Привіт, Олександр!
greet("Олександр", "Доброго дня")  # Доброго дня, Олександр!
\`\`\`

**Важливо:** Параметри зі значеннями за замовчуванням мають бути після параметрів без них!

\`\`\`python
# Правильно
def func(a, b=10):
    pass

# Неправильно
def func(a=10, b):  # Помилка!
    pass
\`\`\`

**Кілька параметрів за замовчуванням:**
\`\`\`python
def create_student(name, age=15, grade=9, city="Київ"):
    return {
        "ім'я": name,
        "вік": age,
        "клас": grade,
        "місто": city
    }

student1 = create_student("Олександр")
student2 = create_student("Марія", age=16, city="Львів")
\`\`\``
      },
      {
        title: "Повернення значень",
        content: `**return** — повертає значення та завершує функцію:

\`\`\`python
def calculate_area(length, width):
    area = length * width
    return area

result = calculate_area(5, 3)
print(result)  # 15
\`\`\`

**Повернення кількох значень:**
\`\`\`python
def get_name_age():
    name = "Олександр"
    age = 15
    return name, age  # Повертає кортеж

name, age = get_name_age()
print(f"{name}, {age} років")  # Олександр, 15 років
\`\`\`

**Функція без return:**
\`\`\`python
def print_info(name):
    print(f"Ім'я: {name}")

result = print_info("Олександр")
print(result)  # None (функція нічого не повертає)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Проста функція",
      code: `# Функція для обчислення площі прямокутника
def calculate_rectangle_area(length, width):
    area = length * width
    return area

# Використання
area1 = calculate_rectangle_area(5, 3)
area2 = calculate_rectangle_area(10, 7)
print(f"Площа 1: {area1}")  # 15
print(f"Площа 2: {area2}")  # 70`,
      explanation: "Демонструє створення та виклик функції з параметрами."
    },
    {
      title: "Приклад 2: Параметри за замовчуванням",
      code: `# Функція з параметрами за замовчуванням
def create_greeting(name, greeting="Привіт", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

# Використання
msg1 = create_greeting("Олександр")
msg2 = create_greeting("Марія", "Доброго дня")
msg3 = create_greeting("Дмитро", "Вітаю", ".")
print(msg1)  # Привіт, Олександр!
print(msg2)  # Доброго дня, Марія!
print(msg3)  # Вітаю, Дмитро.`,
      explanation: "Показує використання параметрів за замовчуванням."
    },
    {
      title: "Приклад 3: Повернення кількох значень",
      code: `# Функція, яка повертає кілька значень
def calculate_stats(numbers):
    total = sum(numbers)
    count = len(numbers)
    average = total / count if count > 0 else 0
    maximum = max(numbers) if numbers else 0
    minimum = min(numbers) if numbers else 0
    return total, average, maximum, minimum

scores = [85, 92, 78, 95, 88]
total, avg, max_score, min_score = calculate_stats(scores)
print(f"Всього: {total}, Середній: {avg:.2f}, Макс: {max_score}, Мін: {min_score}")`,
      explanation: "Демонструє повернення кількох значень з функції."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати функцію",
      explanation: "def greet(): print('Hello') тільки визначає функцію, не викликає її.",
      correctApproach: "Після визначення функції викличте її: greet()"
    },
    {
      mistake: "Неправильний порядок параметрів",
      explanation: "Параметри зі значеннями за замовчуванням мають бути після параметрів без них.",
      correctApproach: "def func(a, b=10): правильно, def func(a=10, b): неправильно"
    },
    {
      mistake: "Плутанина між print() та return",
      explanation: "print() виводить на екран, return повертає значення. Функція може робити обидва.",
      correctApproach: "Використовуйте return для повернення значень, print() для виведення."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Створення функцій** — def назва_функції():
2. **Параметри** — передача даних у функцію
3. **Повернення значень** — return
4. **Параметри за замовчуванням** — def func(param=default)

Функції — це основа модульного програмування!`,
  
  practiceTask: {
    title: "Бібліотека функцій",
    description: "Створіть набір корисних функцій",
    problemStatement: `Напишіть програму з функціями:
1. calculate_circle_area(radius) — обчислює площу кола
2. calculate_triangle_area(base, height) — обчислює площу трикутника
3. is_even(number) — перевіряє, чи число парне
4. get_grade(score) — повертає оцінку за балом (90+="Відмінно", 75+="Добре", 60+="Задовільно", інакше="Незадовільно")
5. create_student_card(name, age, grade) — створює картку студента`,
    inputFormat: "Функції викликаються з різними параметрами",
    outputFormat: `Приклад виведення:
Площа кола (r=5): 78.54
Площа трикутника (b=10, h=5): 25.0
Число 8 парне: True
Оцінка за 85 балів: Добре
Студент: Олександр, 15 років, 9 клас`,
    examples: [
      {
        input: "calculate_circle_area(5), is_even(8), get_grade(85)",
        output: `Площа кола: 78.54
Парне: True
Оцінка: Добре`,
        explanation: "Програма використовує різні функції для обчислень"
      }
    ],
    solution: {
      code: `import math

def calculate_circle_area(radius):
    return math.pi * radius ** 2

def calculate_triangle_area(base, height):
    return 0.5 * base * height

def is_even(number):
    return number % 2 == 0

def get_grade(score):
    if score >= 90:
        return "Відмінно"
    elif score >= 75:
        return "Добре"
    elif score >= 60:
        return "Задовільно"
    else:
        return "Незадовільно"

def create_student_card(name, age, grade):
    return f"Студент: {name}, {age} років, {grade} клас"

# Використання
print(f"Площа кола (r=5): {calculate_circle_area(5):.2f}")
print(f"Площа трикутника (b=10, h=5): {calculate_triangle_area(10, 5)}")
print(f"Число 8 парне: {is_even(8)}")
print(f"Оцінка за 85 балів: {get_grade(85)}")
print(create_student_card("Олександр", 15, 9))`,
      explanation: "Рішення демонструє створення різних функцій з різними типами повернення."
    },
    hints: [
      "Використовуйте math.pi для числа π",
      "Парність перевіряється через number % 2 == 0",
      "Використовуйте if/elif/else для get_grade()"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке ключове слово використовується для створення функції?",
        options: ["function", "def", "func", "create"],
        correctAnswer: 1,
        explanation: "def використовується для визначення функції в Python."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(3, 4)\nprint(result)\n```",
        options: ["7", "a + b", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "Функція add(3, 4) повертає 3 + 4 = 7."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне функція без return?",
        options: ["0", "None", "Помилку", "Пустий рядок"],
        correctAnswer: 1,
        explanation: "Функція без return повертає None."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: def greet(name='Гість'): print(f'Привіт, {name}!'); greet()?",
        options: ["Привіт, name!", "Привіт, Гість!", "Помилку", "Нічого"],
        correctAnswer: 1,
        explanation: "Параметр name має значення за замовчуванням 'Гість', тому виведе 'Привіт, Гість!'."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}


