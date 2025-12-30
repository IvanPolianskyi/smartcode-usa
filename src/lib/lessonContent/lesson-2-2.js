/**
 * Lesson 2-2: Цикли for та while
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson2_2 = {
  lessonId: "lesson-2-2",
  moduleId: "module-2",
  order: 2,
  title: "Цикли for та while",
  
  learningObjectives: [
    "Використовувати цикл for для ітерації",
    "Застосовувати цикл while для умовного повторення",
    "Контролювати виконання циклів (break, continue)",
    "Працювати з вкладеними циклами"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-2-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Цикл for",
        content: `Цикл for використовується для повторення коду певну кількість разів.

**Синтаксис:**
\`\`\`python
for змінна in послідовність:
    # код, який виконується
\`\`\`

**Приклади:**
\`\`\`python
# Ітерація по рядку
for char in "Python":
    print(char)
# Виведе: P, y, t, h, o, n

# Ітерація по списку
fruits = ["яблуко", "банан", "апельсин"]
for fruit in fruits:
    print(fruit)

# Ітерація з range()
for i in range(5):
    print(i)
# Виведе: 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)
# Виведе: 1, 2, 3, 4, 5

for i in range(0, 10, 2):
    print(i)
# Виведе: 0, 2, 4, 6, 8 (крок 2)
\`\`\`

**Функція range():**
- \`range(n)\` — від 0 до n-1
- \`range(start, stop)\` — від start до stop-1
- \`range(start, stop, step)\` — з кроком step`
      },
      {
        title: "Цикл while",
        content: `Цикл while виконується, поки умова True.

**Синтаксис:**
\`\`\`python
while умова:
    # код, який виконується
\`\`\`

**Приклади:**
\`\`\`python
# Простий цикл
count = 0
while count < 5:
    print(count)
    count += 1
# Виведе: 0, 1, 2, 3, 4

# Цикл з введенням
password = ""
while password != "secret":
    password = input("Введіть пароль: ")
print("Пароль правильний!")

# Нескінченний цикл (з break)
while True:
    user_input = input("Введіть 'quit' для виходу: ")
    if user_input == "quit":
        break
    print(f"Ви ввели: {user_input}")
\`\`\`

**Важливо:** Переконайтеся, що умова змінюється, інакше цикл буде нескінченним!`
      },
      {
        title: "break та continue",
        content: `**break** — виходить з циклу одразу
\`\`\`python
for i in range(10):
    if i == 5:
        break
    print(i)
# Виведе: 0, 1, 2, 3, 4 (зупиниться на 5)
\`\`\`

**continue** — пропускає поточну ітерацію
\`\`\`python
for i in range(10):
    if i % 2 == 0:
        continue  # Пропустити парні числа
    print(i)
# Виведе: 1, 3, 5, 7, 9 (тільки непарні)
\`\`\`

**Практичний приклад:**
\`\`\`python
# Пошук першого парного числа
numbers = [1, 3, 5, 8, 9, 10]
for num in numbers:
    if num % 2 == 0:
        print(f"Знайдено парне число: {num}")
        break
\`\`\``
      },
      {
        title: "Вкладені цикли",
        content: `Цикли можна вкладати один в один:

\`\`\`python
# Таблиця множення
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} * {j} = {i * j}")
    print()  # Порожній рядок між таблицями

# Виведе:
# 1 * 1 = 1
# 1 * 2 = 2
# 1 * 3 = 3
# 
# 2 * 1 = 2
# 2 * 2 = 4
# 2 * 3 = 6
# ...

# break у вкладених циклах
for i in range(3):
    for j in range(3):
        if j == 1:
            break  # Вийде тільки з внутрішнього циклу
        print(f"i={i}, j={j}")
\`\`\`

**Важливо:** break виходить тільки з найближчого циклу!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Цикл for з range",
      code: `# Виведення чисел від 1 до 10
for i in range(1, 11):
    print(i)

# Парні числа від 2 до 20
for i in range(2, 21, 2):
    print(i)`,
      explanation: "Демонструє використання range() з різними параметрами."
    },
    {
      title: "Приклад 2: Цикл while з умовою",
      code: `# Підрахунок до 10
count = 1
while count <= 10:
    print(count)
    count += 1

# Введення до правильного значення
number = 0
while number < 1 or number > 100:
    number = int(input("Введіть число від 1 до 100: "))
print(f"Ви ввели: {number}")`,
      explanation: "Показує використання while для умовного повторення."
    },
    {
      title: "Приклад 3: break та continue",
      code: `# Пошук першого дільника
number = 12
for i in range(2, number):
    if number % i == 0:
        print(f"Знайдено дільник: {i}")
        break

# Виведення непарних чисел
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i)`,
      explanation: "Демонструє використання break та continue."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Нескінченний цикл while",
      explanation: "Якщо умова while завжди True і не змінюється, цикл буде виконуватися вічно.",
      correctApproach: "Завжди переконайтеся, що змінна в умові змінюється всередині циклу."
    },
    {
      mistake: "Плутанина між for та while",
      explanation: "for використовується коли знаємо кількість ітерацій, while — коли залежить від умови.",
      correctApproach: "Використовуйте for для ітерації по послідовностях, while для умовного повторення."
    },
    {
      mistake: "Забути збільшити лічильник у while",
      explanation: "Якщо не збільшити лічильник, цикл стане нескінченним.",
      correctApproach: "Завжди змінюйте змінну, яка використовується в умові while."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Цикл for** — для ітерації по послідовностях та range()
2. **Цикл while** — для умовного повторення
3. **break** — вихід з циклу
4. **continue** — пропуск ітерації
5. **Вкладені цикли** — цикли всередині циклів

Цикли — це потужний інструмент для автоматизації повторюваних дій!`,
  
  practiceTask: {
    title: "Генератор таблиці множення",
    description: "Створіть програму для генерації таблиці множення",
    problemStatement: `Напишіть програму, яка:
1. Запитує число від користувача (від 1 до 10)
2. Генерує таблицю множення для цього числа (від 1 до 10)
3. Виводить результат у форматі: "5 * 3 = 15"
4. Дозволяє згенерувати кілька таблиць підряд`,
    inputFormat: "Користувач вводить число через input()",
    outputFormat: `Приклад виведення:
Введіть число для таблиці множення: 5
5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
...
5 * 10 = 50`,
    examples: [
      {
        input: "number = 5",
        output: `5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25
5 * 6 = 30
5 * 7 = 35
5 * 8 = 40
5 * 9 = 45
5 * 10 = 50`,
        explanation: "Програма використовує цикл for для генерації таблиці"
      }
    ],
    solution: {
      code: `# Генератор таблиці множення
while True:
    try:
        number = int(input("Введіть число для таблиці множення (1-10): "))
        
        if number < 1 or number > 10:
            print("Число має бути від 1 до 10!")
            continue
        
        print(f"\nТаблиця множення для {number}:")
        for i in range(1, 11):
            result = number * i
            print(f"{number} * {i} = {result}")
        
        again = input("\nЗгенерувати ще одну таблицю? (так/ні): ").lower()
        if again != "так":
            break
            
    except ValueError:
        print("Помилка! Введіть правильне число.")`,
      explanation: "Рішення використовує цикл for для генерації таблиці та while для повторення."
    },
    hints: [
      "Використовуйте for i in range(1, 11) для чисел від 1 до 10",
      "Обчислюйте результат як number * i",
      "Використовуйте while True для можливості генерації кількох таблиць"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Скільки разів виконається цикл: for i in range(5)?",
        options: ["4", "5", "6", "Помилку"],
        correctAnswer: 1,
        explanation: "range(5) генерує числа 0, 1, 2, 3, 4 — це 5 ітерацій."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(3):\n    if i == 1:\n        continue\n    print(i)\n```",
        options: ["0, 1, 2", "0, 2", "1, 2", "0"],
        correctAnswer: 1,
        explanation: "continue пропускає ітерацію коли i == 1, тому виведе 0 та 2."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить break у циклі?",
        options: ["Пропускає ітерацію", "Вихід з циклу", "Продовжує цикл", "Нічого"],
        correctAnswer: 1,
        explanation: "break одразу виходить з циклу, не виконуючи решту коду."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: range(2, 6)?",
        options: ["[2, 3, 4, 5, 6]", "[2, 3, 4, 5]", "[0, 1, 2, 3, 4, 5]", "Помилку"],
        correctAnswer: 1,
        explanation: "range(2, 6) генерує числа від 2 до 5 (не включаючи 6)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Який цикл краще використати, коли не знаємо скільки разів потрібно повторити?",
        options: ["for", "while", "обидва однаково", "залежить"],
        correctAnswer: 1,
        explanation: "while краще для ситуацій, коли кількість ітерацій залежить від умови."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


