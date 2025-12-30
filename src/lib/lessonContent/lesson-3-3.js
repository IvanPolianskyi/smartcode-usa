/**
 * Lesson 3-3: Аргументи: *args та **kwargs
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson3_3 = {
  lessonId: "lesson-3-3",
  moduleId: "module-3",
  order: 3,
  title: "Аргументи: *args та **kwargs",
  
  learningObjectives: [
    "Використовувати *args для змінної кількості аргументів",
    "Застосовувати **kwargs для ключових аргументів",
    "Комбінувати різні типи аргументів",
    "Розпаковувати аргументи"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-3-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке *args?",
        content: `*args дозволяє функції приймати будь-яку кількість позиційних аргументів.

**Синтаксис:**
\`\`\`python
def my_function(*args):
    # args це кортеж всіх аргументів
    for arg in args:
        print(arg)

my_function(1, 2, 3)  # Виведе: 1, 2, 3
my_function("a", "b")  # Виведе: a, b
\`\`\`

**Практичний приклад:**
\`\`\`python
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))        # 6
print(sum_all(10, 20, 30, 40))  # 100
\`\`\`

**Комбінування зі звичайними параметрами:**
\`\`\`python
def greet(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet("Привіт", "Олександр", "Марія", "Дмитро")
# Привіт, Олександр!
# Привіт, Марія!
# Привіт, Дмитро!
\`\`\``
      },
      {
        title: "Що таке **kwargs?",
        content: `**kwargs дозволяє функції приймати будь-яку кількість ключових аргументів.

**Синтаксис:**
\`\`\`python
def my_function(**kwargs):
    # kwargs це словник всіх ключових аргументів
    for key, value in kwargs.items():
        print(f"{key}: {value}")

my_function(name="Олександр", age=15, city="Київ")
# name: Олександр
# age: 15
# city: Київ
\`\`\`

**Практичний приклад:**
\`\`\`python
def create_student(**info):
    student = {}
    for key, value in info.items():
        student[key] = value
    return student

student = create_student(
    name="Олександр",
    age=15,
    grade=9,
    city="Київ"
)
print(student)
\`\`\``
      },
      {
        title: "Комбінування *args та **kwargs",
        content: `Можна використовувати обидва разом:

\`\`\`python
def my_function(required, *args, **kwargs):
    print(f"Обов'язковий: {required}")
    print(f"Позиційні: {args}")
    print(f"Ключові: {kwargs}")

my_function("обов'язковий", 1, 2, 3, name="Олександр", age=15)
# Обов'язковий: обов'язковий
# Позиційні: (1, 2, 3)
# Ключові: {'name': 'Олександр', 'age': 15}
\`\`\`

**Порядок параметрів:**
1. Звичайні параметри
2. *args
3. Параметри за замовчуванням
4. **kwargs

\`\`\`python
def func(a, b, *args, default=10, **kwargs):
    pass
\`\`\``
      },
      {
        title: "Розпакування аргументів",
        content: `Можна розпаковувати списки та словники при виклику функції:

**Розпакування списку:**
\`\`\`python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)  # Еквівалентно add(1, 2, 3)
print(result)  # 6
\`\`\`

**Розпакування словника:**
\`\`\`python
def create_student(name, age, grade):
    return {"ім'я": name, "вік": age, "клас": grade}

info = {"name": "Олександр", "age": 15, "grade": 9}
student = create_student(**info)
print(student)
\`\`\`

**Комбінування:**
\`\`\`python
def func(a, b, c, d=10):
    print(a, b, c, d)

args = [1, 2, 3]
kwargs = {"d": 20}
func(*args, **kwargs)  # 1 2 3 20
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Використання *args",
      code: `# Функція для обчислення середнього
def average(*numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

print(average(10, 20, 30))        # 20.0
print(average(5, 15, 25, 35, 45))  # 25.0
print(average(100))                # 100.0`,
      explanation: "Демонструє використання *args для прийняття змінної кількості аргументів."
    },
    {
      title: "Приклад 2: Використання **kwargs",
      code: `# Функція для створення профілю
def create_profile(**info):
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

student = create_profile(
    name="Олександр",
    age=15,
    city="Київ",
    hobby="програмування"
)
print(student)`,
      explanation: "Показує використання **kwargs для гнучкого створення об'єктів."
    },
    {
      title: "Приклад 3: Розпакування",
      code: `# Розпакування при виклику
def greet(name, greeting="Привіт"):
    print(f"{greeting}, {name}!")

# Зі списку
args = ["Олександр"]
greet(*args)

# Зі словника
kwargs = {"name": "Марія", "greeting": "Доброго дня"}
greet(**kwargs)`,
      explanation: "Демонструє розпакування аргументів при виклику функції."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неправильний порядок параметрів",
      explanation: "Порядок має бути: звичайні, *args, параметри за замовчуванням, **kwargs.",
      correctApproach: "Дотримуйтеся правильного порядку: def func(a, *args, b=10, **kwargs):"
    },
    {
      mistake: "Плутанина між *args та **kwargs",
      explanation: "*args для позиційних аргументів (кортеж), **kwargs для ключових (словник).",
      correctApproach: "*args приймає позиційні аргументи, **kwargs приймає ключові аргументи."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. ***args** — змінна кількість позиційних аргументів (кортеж)
2. ****kwargs** — змінна кількість ключових аргументів (словник)
3. **Комбінування** — можна використовувати обидва разом
4. **Розпакування** — * для списків, ** для словників

*args та **kwargs роблять функції гнучкішими!`,
  
  practiceTask: {
    title: "Універсальна функція обчислення",
    description: "Створіть функції з використанням *args та **kwargs",
    problemStatement: `Напишіть функції:
1. calculate(*numbers, operation="sum") — обчислює суму, добуток або середнє чисел
2. create_person(**info) — створює словник з інформацією про людину
3. print_info(title, *items, **details) — виводить інформацію з заголовком, списком та деталями`,
    inputFormat: "Функції викликаються з різними аргументами",
    outputFormat: `Приклад виведення:
Сума: 15
Добуток: 120
Середнє: 5.0
Особа: {'ім'я': 'Олександр', 'вік': 15}
=== Заголовок ===
• Елемент 1
• Елемент 2
Деталі: ключ1=значення1`,
    examples: [
      {
        input: "calculate(1,2,3,4,5, operation='sum')",
        output: "Сума: 15",
        explanation: "Функція використовує *args для чисел та kwargs для операції"
      }
    ],
    solution: {
      code: `def calculate(*numbers, operation="sum"):
    if not numbers:
        return 0
    
    if operation == "sum":
        return sum(numbers)
    elif operation == "product":
        result = 1
        for num in numbers:
            result *= num
        return result
    elif operation == "average":
        return sum(numbers) / len(numbers)
    return 0

def create_person(**info):
    return info

def print_info(title, *items, **details):
    print(f"=== {title} ===")
    for item in items:
        print(f"• {item}")
    if details:
        print("Деталі:", end=" ")
        for key, value in details.items():
            print(f"{key}={value}", end=" ")
        print()

# Використання
print(f"Сума: {calculate(1, 2, 3, 4, 5, operation='sum')}")
print(f"Добуток: {calculate(2, 3, 4, operation='product')}")
print(f"Середнє: {calculate(10, 20, 30, operation='average')}")

person = create_person(ім'я="Олександр", вік=15)
print(f"Особа: {person}")

print_info("Заголовок", "Елемент 1", "Елемент 2", ключ1="значення1", ключ2="значення2")`,
      explanation: "Рішення демонструє використання *args та **kwargs для створення гнучких функцій."
    },
    hints: [
      "Використовуйте *args для змінної кількості чисел",
      "Використовуйте **kwargs для операції та деталей",
      "Перевіряйте operation через if/elif"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке *args?",
        options: ["Кортеж позиційних аргументів", "Словник ключових аргументів", "Список аргументів", "Змінна"],
        correctAnswer: 0,
        explanation: "*args це кортеж всіх позиційних аргументів, переданих у функцію."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: def func(**kwargs): print(kwargs); func(a=1, b=2)?",
        options: ["{'a': 1, 'b': 2}", "[1, 2]", "(1, 2)", "Помилку"],
        correctAnswer: 0,
        explanation: "**kwargs збирає ключові аргументи в словник: {'a': 1, 'b': 2}."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який правильний порядок параметрів?",
        options: ["def func(*args, a, **kwargs)", "def func(a, *args, **kwargs)", "def func(**kwargs, *args, a)", "def func(a, **kwargs, *args)"],
        correctAnswer: 1,
        explanation: "Правильний порядок: звичайні параметри, *args, параметри за замовчуванням, **kwargs."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}


