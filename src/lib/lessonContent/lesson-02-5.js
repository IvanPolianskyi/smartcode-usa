/**
 * Lesson 02-5: Вкладені цикли та умови
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_5 = {
  lessonId: "lesson-02-5",
  moduleId: "module-02",
  order: 5,
  title: "Вкладені цикли та умови",
  
  learningObjectives: [
    "Створювати вкладені цикли",
    "Комбінувати цикли з умовами",
    "Розуміти складність вкладених циклів",
    "Оптимізувати вкладені конструкції"
  ],
  
  prerequisites: ["lesson-02-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке вкладені цикли?",
        content: `Вкладені цикли - це цикли всередині інших циклів. Це дозволяє обробляти двовимірні структури даних.

**Синтаксис:**
\`\`\`python
for зовнішній_елемент in зовнішня_послідовність:
    for внутрішній_елемент in внутрішня_послідовність:
        # код для кожної пари
        дія
\`\`\`

**Приклад: Таблиця множення**
\`\`\`python
for i in range(1, 4):  # 1, 2, 3
    for j in range(1, 4):  # 1, 2, 3
        print(f"{i} x {j} = {i * j}")
\`\`\`

**Виведення:**
\`\`\`
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
\`\`\`

**Як це працює:**
- Зовнішній цикл виконується 3 рази (i = 1, 2, 3)
- Для кожного i внутрішній цикл виконується 3 рази (j = 1, 2, 3)
- Всього: 3 × 3 = 9 ітерацій`
      },
      {
        title: "Вкладені цикли з умовами",
        content: `Можна комбінувати вкладені цикли з умовами для складнішої логіки.

**Приклад: Пошук пар чисел**
\`\`\`python
numbers1 = [1, 2, 3, 4]
numbers2 = [2, 4, 6, 8]

for num1 in numbers1:
    for num2 in numbers2:
        if num1 + num2 == 6:
            print(f"Знайдено пару: {num1} + {num2} = 6")
\`\`\`

**Виведення:**
\`\`\`
Знайдено пару: 2 + 4 = 6
Знайдено пару: 4 + 2 = 6
\`\`\`

**Приклад: Фільтрація**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix:
    for element in row:
        if element % 2 == 0:  # тільки парні
            print(element)
\`\`\`

**Виведення:**
\`\`\`
2
4
6
8
\`\`\``
      },
      {
        title: "Робота з двовимірними списками",
        content: `Вкладені цикли ідеально підходять для роботи з матрицями (двовимірними списками).

**Приклад: Обхід матриці**
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")
\`\`\`

**Альтернатива з enumerate:**
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for i, row in enumerate(matrix):
    for j, element in enumerate(row):
        print(f"matrix[{i}][{j}] = {element}")
\`\`\`

**Приклад: Сума всіх елементів**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
total = 0

for row in matrix:
    for element in row:
        total += element

print(f"Сума всіх елементів: {total}")
\`\`\``
      },
      {
        title: "break та continue у вкладених циклах",
        content: `**break** виходить тільки з найближчого циклу (внутрішнього).

**Приклад: break у внутрішньому циклі**
\`\`\`python
for i in range(3):
    for j in range(3):
        if j == 1:
            break  # виходить тільки з внутрішнього циклу
        print(f"i={i}, j={j}")
\`\`\`

**Виведення:**
\`\`\`
i=0, j=0
i=1, j=0
i=2, j=0
\`\`\`

**Для виходу з обох циклів використовуй прапорець:**
\`\`\`python
found = False
for i in range(3):
    if found:
        break
    for j in range(3):
        if i == 1 and j == 1:
            found = True
            break
        print(f"i={i}, j={j}")
\`\`\`

**continue** також працює тільки для найближчого циклу:
\`\`\`python
for i in range(3):
    for j in range(3):
        if j == 1:
            continue  # пропускає тільки поточну ітерацію внутрішнього циклу
        print(f"i={i}, j={j}")
\`\`\``
      },
      {
        title: "Оптимізація вкладених циклів",
        content: `**Складність:** Вкладені цикли можуть бути повільними для великих даних.

**Приклад: O(n²) складність**
\`\`\`python
# Для списку з n елементів виконується n × n операцій
numbers = [1, 2, 3, 4, 5]

for i in numbers:
    for j in numbers:
        print(f"{i}, {j}")  # 25 операцій (5 × 5)
\`\`\`

**Оптимізація: Уникай зайвих ітерацій**
\`\`\`python
# Замість перевірки всіх пар
numbers = [1, 2, 3, 4, 5]

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):  # починаємо з i+1
        print(f"{numbers[i]}, {numbers[j]}")
\`\`\`

**Коли використовувати вкладені цикли:**
- Для обробки двовимірних структур
- Для порівняння всіх пар елементів
- Для створення комбінацій

**Коли уникати:**
- Якщо можна використати один цикл
- Для великих даних (шукай альтернативи)
- Якщо є готові функції (наприклад, itertools)`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Пошук дублікатів**
\`\`\`python
numbers = [1, 2, 3, 2, 4, 3, 5]
duplicates = []

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        if numbers[i] == numbers[j] and numbers[i] not in duplicates:
            duplicates.append(numbers[i])

print(f"Дублікати: {duplicates}")
\`\`\`

**Приклад 2: Створення таблиці**
\`\`\`python
# Таблиця множення 5x5
for i in range(1, 6):
    row = []
    for j in range(1, 6):
        row.append(i * j)
    print(row)
\`\`\`

**Приклад 3: Обробка вкладених даних**
\`\`\`python
students = [
    {"ім'я": "Іван", "оцінки": [85, 90, 88]},
    {"ім'я": "Марія", "оцінки": [92, 87, 95]}
]

for student in students:
    print(f"{student['ім'я']}:")
    for grade in student["оцінки"]:
        print(f"  - {grade}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Таблиця множення",
      code: `# Таблиця множення 3x3
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")`,
      explanation: "Демонструє базові вкладені цикли для створення таблиці множення."
    },
    {
      title: "Приклад 2: Обхід матриці",
      code: `# Обхід двовимірного списку
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix:
    for element in row:
        print(element)`,
      explanation: "Показує як обходити двовимірний список за допомогою вкладених циклів."
    },
    {
      title: "Приклад 3: Вкладені цикли з умовами",
      code: `# Пошук пар чисел
numbers1 = [1, 2, 3]
numbers2 = [2, 4, 6]

for num1 in numbers1:
    for num2 in numbers2:
        if num1 * 2 == num2:
            print(f"{num1} * 2 = {num2}")`,
      explanation: "Демонструє комбінацію вкладених циклів з умовами."
    },
    {
      title: "Приклад 4: break у вкладених циклах",
      code: `# break тільки у внутрішньому циклі
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(f"i={i}, j={j}")`,
      explanation: "Показує що break виходить тільки з найближчого (внутрішнього) циклу."
    },
    {
      title: "Приклад 5: Оптимізація - уникнення дублікатів",
      code: `# Перевірка тільки унікальних пар
numbers = [1, 2, 3, 4]

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        print(f"{numbers[i]}, {numbers[j]}")`,
      explanation: "Демонструє оптимізацію - перевірка тільки унікальних пар без повторень."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "break виходить з усіх циклів",
      explanation: "break виходить тільки з найближчого циклу, не з усіх вкладених.",
      correctApproach: "Для виходу з усіх циклів використовуй прапорець (flag) або функцію"
    },
    {
      mistake: "Занадто багато вкладених циклів",
      explanation: "Вкладені цикли мають високу складність (O(n²) або більше).",
      correctApproach: "Шукай альтернативи: один цикл, готові функції, оптимізація алгоритму"
    },
    {
      mistake: "Плутанина з індексами",
      explanation: "У вкладених циклах легко заплутатися з індексами i та j.",
      correctApproach: "Використовуй зрозумілі назви змінних: row, col або i, j з коментарями"
    },
    {
      mistake: "Неоптимальна структура",
      explanation: "Іноді можна обійтися одним циклом замість вкладених.",
      correctApproach: "Перевіряй чи дійсно потрібні вкладені цикли, чи можна спростити"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. Вкладені цикли - цикли всередині циклів
2. Таблиці та матриці - обробка двовимірних структур
3. Вкладені цикли з умовами - складні перевірки
4. break та continue - поведінка у вкладених циклах
5. Оптимізація - як зменшити складність
6. Практичні застосування - пошук, фільтрація, обробка даних

Тепер ви вмієте працювати зі складними структурами даних!

Наступний урок - list comprehensions для створення списків!`,
  
  practiceTask: {
    title: "Пошук спільних елементів",
    description: "Створіть програму для знаходження спільних елементів у двох списках",
    problemStatement: `Напишіть програму, яка:
1. Має два списки: list1 = [1, 2, 3, 4, 5] та list2 = [3, 4, 5, 6, 7]
2. Використовує вкладені цикли для знаходження спільних елементів
3. Зберігає спільні елементи у список common
4. Виводить спільні елементи
5. Додатково: підраховує кількість спільних елементів`,
    inputFormat: "Програма використовує фіксовані списки",
    outputFormat: `Приклад виведення:
Спільні елементи: [3, 4, 5]
Кількість спільних елементів: 3`,
    examples: [
      {
        input: "list1 = [1, 2, 3, 4, 5], list2 = [3, 4, 5, 6, 7]",
        output: `Спільні елементи: [3, 4, 5]
Кількість спільних елементів: 3`,
        explanation: "Знаходить три спільні елементи"
      },
      {
        input: "list1 = [1, 2, 3], list2 = [3, 4, 5]",
        output: `Спільні елементи: [3]
Кількість спільних елементів: 1`,
        explanation: "Знаходить тільки один спільний елемент"
      }
    ],
    solution: {
      code: `# Пошук спільних елементів
list1 = [1, 2, 3, 4, 5]
list2 = [3, 4, 5, 6, 7]
common = []

# Вкладені цикли для порівняння
for element1 in list1:
    for element2 in list2:
        if element1 == element2:
            # Перевірка чи вже додано (щоб уникнути дублікатів)
            if element1 not in common:
                common.append(element1)

print(f"Спільні елементи: {common}")
print(f"Кількість спільних елементів: {len(common)}")`,
      explanation: "Рішення використовує вкладені цикли для порівняння всіх елементів з обох списків та зберігає спільні."
    },
    hints: [
      "Використовуйте два for цикли - один для list1, один для list2",
      "Порівнюйте element1 == element2",
      "Перевіряйте чи елемент вже в common перед додаванням",
      "Використовуйте len() для підрахунку кількості",
      "Використовуйте 'not in' для перевірки відсутності в списку"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки разів виконається print у цьому коді?\n\n```python\nfor i in range(2):\n    for j in range(3):\n        print('Hello')\n```",
        options: [
          "2",
          "3",
          "5",
          "6"
        ],
        correctAnswer: 3,
        explanation: "Зовнішній цикл 2 рази, внутрішній 3 рази, всього 2 × 3 = 6 разів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfor i in range(2):\n    for j in range(2):\n        if j == 1:\n            break\n        print(f'i={i}, j={j}')\n```",
        options: [
          "i=0, j=0\ni=1, j=0",
          "i=0, j=0\ni=0, j=1\ni=1, j=0\ni=1, j=1",
          "i=0, j=0",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "break виходить тільки з внутрішнього циклу, тому для кожного i друкується тільки j=0."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить break у вкладених циклах?",
        options: [
          "Виходить з усіх циклів",
          "Виходить тільки з найближчого циклу",
          "Пропускає поточну ітерацію",
          "Зупиняє всю програму"
        ],
        correctAnswer: 1,
        explanation: "break виходить тільки з найближчого (внутрішнього) циклу, не з усіх."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nmatrix = [[1, 2], [3, 4]]\ntotal = 0\nfor row in matrix:\n    for element in row:\n        total += element\nprint(total)\n```",
        options: [
          "10",
          "4",
          "6",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Сума всіх елементів: 1 + 2 + 3 + 4 = 10."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка складність вкладених циклів для списку з n елементів?",
        options: [
          "O(n)",
          "O(n²)",
          "O(log n)",
          "O(1)"
        ],
        correctAnswer: 1,
        explanation: "Вкладені цикли мають складність O(n²) - для кожного елемента перевіряються всі інші."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
