/**
 * Lesson 3-2: Область видимості та глобальні змінні
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson3_2 = {
  lessonId: "lesson-3-2",
  moduleId: "module-3",
  order: 2,
  title: "Область видимості та глобальні змінні",
  
  learningObjectives: [
    "Розуміти локальну та глобальну область видимості",
    "Використовувати ключове слово global",
    "Уникати конфліктів імен",
    "Працювати з nonlocal"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-3-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Локальна область видимості",
        content: `Змінні, створені всередині функції, є **локальними** — вони існують тільки всередині функції:

\`\`\`python
def my_function():
    x = 10  # Локальна змінна
    print(x)

my_function()
print(x)  # Помилка! x не існує поза функцією
\`\`\`

**Кожна функція має свою область видимості:**
\`\`\`python
def func1():
    x = 10
    print(f"func1: x = {x}")

def func2():
    x = 20  # Це інша змінна x!
    print(f"func2: x = {x}")

func1()  # func1: x = 10
func2()  # func2: x = 20
\`\`\``
      },
      {
        title: "Глобальна область видимості",
        content: `Змінні, створені поза функціями, є **глобальними**:

\`\`\`python
x = 10  # Глобальна змінна

def my_function():
    print(x)  # Можна читати глобальну змінну

my_function()  # 10
\`\`\`

**Але не можна змінювати без global:**
\`\`\`python
x = 10

def my_function():
    x = 20  # Це створює НОВУ локальну змінну!
    print(f"Всередині: {x}")

my_function()  # Всередині: 20
print(f"Ззовні: {x}")  # Ззовні: 10 (не змінилася!)
\`\`\``
      },
      {
        title: "Ключове слово global",
        content: `Щоб змінити глобальну змінну всередині функції, використовуйте **global**:

\`\`\`python
counter = 0  # Глобальна змінна

def increment():
    global counter
    counter += 1
    print(f"Лічильник: {counter}")

increment()  # Лічильник: 1
increment()  # Лічильник: 2
print(counter)  # 2
\`\`\`

**Коли використовувати global:**
- Коли потрібно змінити глобальну змінну
- Для лічильників, налаштувань
- **Але краще уникати** — передавайте значення через параметри та return

**Кращий підхід:**
\`\`\`python
# Замість global
counter = 0

def increment(counter):
    return counter + 1

counter = increment(counter)
\`\`\``
      },
      {
        title: "Ключове слово nonlocal",
        content: `**nonlocal** використовується для зміни змінної у зовнішній функції (не глобальній):

\`\`\`python
def outer():
    x = 10  # Змінна зовнішньої функції
    
    def inner():
        nonlocal x
        x = 20  # Змінює x зовнішньої функції
        print(f"Всередині inner: {x}")
    
    inner()
    print(f"У outer: {x}")

outer()  # Всередині inner: 20, У outer: 20
\`\`\`

**nonlocal vs global:**
- **global** — для глобальних змінних (рівень модуля)
- **nonlocal** — для змінних зовнішньої функції (замикання)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Локальна область видимості",
      code: `# Кожна функція має свою область видимості
def func1():
    x = 10
    print(f"func1: x = {x}")

def func2():
    x = 20
    print(f"func2: x = {x}")

func1()  # func1: x = 10
func2()  # func2: x = 20
# x з func1 не доступна в func2`,
      explanation: "Демонструє, що кожна функція має свою локальну область видимості."
    },
    {
      title: "Приклад 2: Використання global",
      code: `# Лічильник з використанням global
counter = 0

def increment():
    global counter
    counter += 1
    return counter

print(increment())  # 1
print(increment())  # 2
print(counter)      # 2`,
      explanation: "Показує використання global для зміни глобальної змінної."
    },
    {
      title: "Приклад 3: Кращий підхід без global",
      code: `# Краще передавати значення через параметри
def increment(counter):
    return counter + 1

counter = 0
counter = increment(counter)
counter = increment(counter)
print(counter)  # 2`,
      explanation: "Демонструє кращий підхід без використання global."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба змінити глобальну змінну без global",
      explanation: "x = 20 всередині функції створює нову локальну змінну, не змінює глобальну.",
      correctApproach: "Використовуйте global x перед зміною, або краще передавайте значення через параметри."
    },
    {
      mistake: "Плутанина між global та nonlocal",
      explanation: "global для глобальних змінних, nonlocal для змінних зовнішньої функції.",
      correctApproach: "Використовуйте global для змінних модуля, nonlocal для змінних у вкладених функціях."
    },
    {
      mistake: "Надмірне використання global",
      explanation: "Глобальні змінні ускладнюють код та можуть призвести до помилок.",
      correctApproach: "Передавайте дані через параметри та повертайте через return."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Локальна область** — змінні всередині функції
2. **Глобальна область** — змінні поза функціями
3. **global** — для зміни глобальних змінних
4. **nonlocal** — для зміни змінних зовнішньої функції

Розуміння області видимості допомагає уникнути багатьох помилок!`,
  
  practiceTask: {
    title: "Лічильник з функціями",
    description: "Створіть систему лічильників з використанням різних підходів",
    problemStatement: `Напишіть програму з функціями:
1. create_counter() — створює лічильник (починає з 0)
2. increment_counter(counter) — збільшує лічильник на 1 (повертає нове значення)
3. reset_counter() — скидає глобальний лічильник до 0
4. show_counter(counter) — показує значення лічильника`,
    inputFormat: "Функції викликаються послідовно",
    outputFormat: `Приклад виведення:
Лічильник: 0
Після збільшення: 1
Після ще одного: 2
Після скидання: 0`,
    examples: [
      {
        input: "counter = 0, increment двічі, reset",
        output: `Лічильник: 0 → 1 → 2 → 0`,
        explanation: "Програма демонструє роботу з лічильником"
      }
    ],
    solution: {
      code: `# Система лічильників
global_counter = 0

def create_counter():
    return 0

def increment_counter(counter):
    return counter + 1

def reset_counter():
    global global_counter
    global_counter = 0
    return global_counter

def show_counter(counter):
    print(f"Лічильник: {counter}")

# Використання
counter = create_counter()
show_counter(counter)

counter = increment_counter(counter)
show_counter(counter)

counter = increment_counter(counter)
show_counter(counter)

reset_counter()
show_counter(global_counter)`,
      explanation: "Рішення демонструє роботу з лічильниками з використанням параметрів та global."
    },
    hints: [
      "Використовуйте return для повернення нового значення лічильника",
      "Для reset використовуйте global",
      "Передавайте лічильник як параметр"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке локальна область видимості?",
        options: ["Змінні поза функціями", "Змінні всередині функції", "Глобальні змінні", "Всі змінні"],
        correctAnswer: 1,
        explanation: "Локальна область видимості — це змінні, створені всередині функції."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 10\ndef func():\n    x = 20\nfunc()\nprint(x)\n```",
        options: ["10", "20", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "x = 20 всередині func() створює локальну змінну, глобальна x залишається 10."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке ключове слово використовується для зміни глобальної змінної?",
        options: ["local", "global", "nonlocal", "var"],
        correctAnswer: 1,
        explanation: "global використовується для зміни глобальної змінної всередині функції."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}


