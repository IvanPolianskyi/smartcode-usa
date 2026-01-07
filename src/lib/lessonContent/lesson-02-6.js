/**
 * Lesson 02-6: List comprehensions та генератори списків
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_6 = {
  lessonId: "lesson-02-6",
  moduleId: "module-02",
  order: 6,
  title: "List comprehensions та генератори списків",
  
  learningObjectives: [
    "Створювати list comprehensions",
    "Використовувати умовні включення",
    "Вкладені list comprehensions",
    "Оптимізувати код з використанням comprehensions"
  ],
  
  prerequisites: ["lesson-02-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке List Comprehension?",
        content: `**List Comprehension** (спискове включення) - це компактний спосіб створення списків в Python.

**Звичайний спосіб (з циклом):**
\`\`\`python
squares = []
for x in range(5):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`

**З List Comprehension:**
\`\`\`python
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`

**Переваги:**
- Коротший та читабельніший код
- Швидший за звичайний цикл
- Більш "pythonic" стиль

**Синтаксис:**
\`\`\`python
[вираз for елемент in послідовність]
\`\`\`

**Як це працює:**
1. Береться кожен елемент з послідовності
2. Застосовується вираз
3. Результат додається до списку`
      },
      {
        title: "Базові приклади",
        content: `**Приклад 1: Квадрати чисел**
\`\`\`python
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

**Приклад 2: Подвоєння чисел**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print(doubled)  # [2, 4, 6, 8, 10]
\`\`\`

**Приклад 3: Великі літери**
\`\`\`python
words = ["hello", "world", "python"]
uppercase = [word.upper() for word in words]
print(uppercase)  # ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

**Приклад 4: Довжини слів**
\`\`\`python
words = ["apple", "banana", "cherry"]
lengths = [len(word) for word in words]
print(lengths)  # [5, 6, 6]
\`\`\``
      },
      {
        title: "List Comprehension з умовами (if)",
        content: `Можна додати умову для фільтрації елементів.

**Синтаксис:**
\`\`\`python
[вираз for елемент in послідовність if умова]
\`\`\`

**Приклад 1: Тільки парні числа**
\`\`\`python
even_numbers = [x for x in range(10) if x % 2 == 0]
print(even_numbers)  # [0, 2, 4, 6, 8]
\`\`\`

**Еквівалентний цикл:**
\`\`\`python
even_numbers = []
for x in range(10):
    if x % 2 == 0:
        even_numbers.append(x)
\`\`\`

**Приклад 2: Слова довші за 5 символів**
\`\`\`python
words = ["apple", "banana", "cat", "dog", "elephant"]
long_words = [word for word in words if len(word) > 5]
print(long_words)  # ['banana', 'elephant']
\`\`\`

**Приклад 3: Додатні числа**
\`\`\`python
numbers = [-5, -2, 0, 3, 7, -1, 9]
positive = [x for x in numbers if x > 0]
print(positive)  # [3, 7, 9]
\`\`\``
      },
      {
        title: "List Comprehension з if-else",
        content: `Можна використовувати тернарний оператор для умовного виразу.

**Синтаксис:**
\`\`\`python
[вираз1 if умова else вираз2 for елемент in послідовність]
\`\`\`

**Приклад 1: Парні/непарні**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
labels = ["парне" if x % 2 == 0 else "непарне" for x in numbers]
print(labels)  # ['непарне', 'парне', 'непарне', 'парне', 'непарне', 'парне']
\`\`\`

**Приклад 2: Позитивні/негативні**
\`\`\`python
numbers = [-5, -2, 0, 3, 7]
abs_values = [x if x >= 0 else -x for x in numbers]
print(abs_values)  # [5, 2, 0, 3, 7]
\`\`\`

**Приклад 3: Оцінки**
\`\`\`python
scores = [85, 92, 78, 96, 65]
grades = ["Відмінно" if s >= 90 else "Добре" if s >= 70 else "Потрібно покращити" for s in scores]
print(grades)
\`\`\``
      },
      {
        title: "Вкладені List Comprehensions",
        content: `Можна використовувати вкладені comprehensions для складніших структур.

**Приклад 1: Таблиця множення**
\`\`\`python
multiplication_table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(multiplication_table)
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
\`\`\`

**Еквівалентний код:**
\`\`\`python
multiplication_table = []
for i in range(1, 4):
    row = []
    for j in range(1, 4):
        row.append(i * j)
    multiplication_table.append(row)
\`\`\`

**Приклад 2: Плоска структура**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [element for row in matrix for element in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

**Приклад 3: Фільтрація вкладених структур**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
even = [element for row in matrix for element in row if element % 2 == 0]
print(even)  # [2, 4, 6, 8]
\`\`\``
      },
      {
        title: "Порівняння з циклами",
        content: `**Коли використовувати List Comprehension:**
- Для простого створення списків
- Для фільтрації та перетворення
- Коли код має бути компактним

**Коли використовувати звичайні цикли:**
- Для складних операцій
- Коли потрібні побічні ефекти (print, break, continue)
- Коли код має бути більш читабельним

**Приклад: Складні операції**
\`\`\`python
# List Comprehension - погано для складних операцій
result = [complex_function(x) for x in data if condition(x) and another_condition(x)]

# Звичайний цикл - краще для складних операцій
result = []
for x in data:
    if condition(x) and another_condition(x):
        result.append(complex_function(x))
\`\`\`

**Правило:** Якщо List Comprehension стає важко читати, використовуй звичайний цикл!`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Квадрати парних чисел**
\`\`\`python
squares_of_evens = [x ** 2 for x in range(10) if x % 2 == 0]
print(squares_of_evens)  # [0, 4, 16, 36, 64]
\`\`\`

**Приклад 2: Перші літери слів**
\`\`\`python
words = ["apple", "banana", "cherry"]
first_letters = [word[0] for word in words]
print(first_letters)  # ['a', 'b', 'c']
\`\`\`

**Приклад 3: Конвертація типів**
\`\`\`python
strings = ["1", "2", "3", "4", "5"]
numbers = [int(s) for s in strings]
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

**Приклад 4: Унікальні елементи (з умовою)**
\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4, 5]
unique = [x for i, x in enumerate(numbers) if x not in numbers[:i]]
print(unique)  # [1, 2, 3, 4, 5]
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий List Comprehension",
      code: `# Квадрати чисел від 0 до 9
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`,
      explanation: "Демонструє базовий синтаксис list comprehension для створення списку квадратів."
    },
    {
      title: "Приклад 2: З умовою (if)",
      code: `# Тільки парні числа
even = [x for x in range(10) if x % 2 == 0]
print(even)  # [0, 2, 4, 6, 8]`,
      explanation: "Показує використання if для фільтрації елементів у list comprehension."
    },
    {
      title: "Приклад 3: З if-else",
      code: `# Парні/непарні мітки
numbers = [1, 2, 3, 4, 5]
labels = ["парне" if x % 2 == 0 else "непарне" for x in numbers]
print(labels)  # ['непарне', 'парне', 'непарне', 'парне', 'непарне']`,
      explanation: "Демонструє використання тернарного оператора в list comprehension."
    },
    {
      title: "Приклад 4: Вкладений List Comprehension",
      code: `# Таблиця множення 3x3
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(table)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`,
      explanation: "Показує як створювати двовимірні структури за допомогою вкладених comprehensions."
    },
    {
      title: "Приклад 5: Перетворення рядків",
      code: `# Великі літери з фільтрацією
words = ["apple", "banana", "cat", "dog"]
long_uppercase = [word.upper() for word in words if len(word) > 3]
print(long_uppercase)  # ['APPLE', 'BANANA']`,
      explanation: "Демонструє комбінацію перетворення та фільтрації в одному comprehension."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неправильний порядок if-else",
      explanation: "В list comprehension if-else має бути перед for, а не після.",
      correctApproach: "[вираз1 if умова else вираз2 for елемент in послідовність]"
    },
    {
      mistake: "Занадто складні comprehensions",
      explanation: "Якщо list comprehension стає важко читати, краще використати звичайний цикл.",
      correctApproach: "Використовуй list comprehension для простих операцій, цикл - для складних"
    },
    {
      mistake: "Плутанина з вкладеними comprehensions",
      explanation: "Порядок вкладених comprehensions має відповідати порядку вкладених циклів.",
      correctApproach: "Читай зліва направо: [внутрішній for ... зовнішній for]"
    },
    {
      mistake: "Використання break/continue",
      explanation: "В list comprehension не можна використовувати break або continue.",
      correctApproach: "Для break/continue використовуй звичайний цикл"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. List Comprehension - компактний спосіб створення списків
2. Базовий синтаксис - [вираз for елемент in послідовність]
3. З умовою (if) - фільтрація елементів
4. З if-else - умовні вирази
5. Вкладені comprehensions - для складних структур
6. Порівняння з циклами - коли що використовувати
7. Практичні застосування - перетворення, фільтрація, створення структур

Тепер ви вмієте створювати списки ефективно та елегантно!

Наступний урок - практика з алгоритмічними задачами!`,
  
  practiceTask: {
    title: "Обробка даних студентів",
    description: "Створіть програму для обробки оцінок студентів з використанням list comprehensions",
    problemStatement: `Напишіть програму, яка:
1. Має список оцінок: grades = [85, 92, 78, 96, 65, 88, 75, 90, 55, 87]
2. Використовує list comprehensions для:
   - Створення списку квадратів оцінок
   - Фільтрації оцінок >= 70 (тільки прохідні)
   - Створення списку міток: "Відмінно" (>=90), "Добре" (70-89), "Потрібно покращити" (<70)
   - Знаходження оцінок у діапазоні 80-90
3. Виводить всі результати`,
    outputFormat: `Приклад виведення:
Квадрати оцінок: [7225, 8464, 6084, 9216, 4225, 7744, 5625, 8100, 3025, 7569]
Прохідні оцінки: [85, 92, 78, 96, 88, 75, 90, 87]
Мітки: ['Добре', 'Відмінно', 'Добре', 'Відмінно', 'Потрібно покращити', 'Добре', 'Добре', 'Відмінно', 'Потрібно покращити', 'Добре']
Оцінки 80-90: [85, 88, 90, 87]`,
    examples: [
      {
        output: `Квадрати оцінок: [7225, 8464, 6084, 9216, 4225, 7744, 5625, 8100, 3025, 7569]
Прохідні оцінки: [85, 92, 78, 96, 88, 75, 90, 87]
Мітки: ['Добре', 'Відмінно', 'Добре', 'Відмінно', 'Потрібно покращити', 'Добре', 'Добре', 'Відмінно', 'Потрібно покращити', 'Добре']
Оцінки 80-90: [85, 88, 90, 87]`,
        explanation: "Програма використовує різні типи list comprehensions для обробки даних"
      }
    ],
    solution: {
      code: `# Обробка даних студентів
grades = [85, 92, 78, 96, 65, 88, 75, 90, 55, 87]

# Квадрати оцінок
squares = [g ** 2 for g in grades]
print(f"Квадрати оцінок: {squares}")

# Прохідні оцінки (>= 70)
passing = [g for g in grades if g >= 70]
print(f"Прохідні оцінки: {passing}")

# Мітки
labels = ["Відмінно" if g >= 90 else "Добре" if g >= 70 else "Потрібно покращити" for g in grades]
print(f"Мітки: {labels}")

# Оцінки в діапазоні 80-90
in_range = [g for g in grades if 80 <= g <= 90]
print(f"Оцінки 80-90: {in_range}")`,
      explanation: "Рішення використовує різні типи list comprehensions: базовий, з if, з if-else, та з діапазоном."
    },
    hints: [
      "Використовуйте [g ** 2 for g in grades] для квадратів",
      "Використовуйте [g for g in grades if g >= 70] для фільтрації",
      "Використовуйте тернарний оператор для міток: 'A' if умова else 'B' if умова2 else 'C'",
      "Використовуйте [g for g in grades if 80 <= g <= 90] для діапазону",
      "Пам'ятайте про правильний порядок: вираз if умова else вираз2 for елемент in послідовність"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що створить цей код?\n\n```python\nsquares = [x ** 2 for x in range(5)]\n```",
        options: [
          "[0, 1, 4, 9, 16]",
          "[1, 4, 9, 16, 25]",
          "[0, 1, 2, 3, 4]",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "range(5) дає 0,1,2,3,4, квадрати: 0,1,4,9,16."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що створить цей код?\n\n```python\neven = [x for x in range(10) if x % 2 == 0]\n```",
        options: [
          "[0, 2, 4, 6, 8]",
          "[1, 3, 5, 7, 9]",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "if x % 2 == 0 фільтрує тільки парні числа: 0,2,4,6,8."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що створить цей код?\n\n```python\nlabels = [\"парне\" if x % 2 == 0 else \"непарне\" for x in [1, 2, 3]]\n```",
        options: [
          "['непарне', 'парне', 'непарне']",
          "['парне', 'непарне', 'парне']",
          "[1, 2, 3]",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "1 непарне, 2 парне, 3 непарне."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який правильний синтаксис list comprehension з умовою?",
        options: [
          "[вираз for елемент in послідовність if умова]",
          "[вираз if умова for елемент in послідовність]",
          "[for елемент in послідовність if умова вираз]",
          "[if умова вираз for елемент in послідовність]"
        ],
        correctAnswer: 0,
        explanation: "Правильний порядок: вираз for елемент in послідовність if умова"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що створить цей код?\n\n```python\ntable = [[i * j for j in range(2)] for i in range(2)]\n```",
        options: [
          "[[0, 0], [0, 1]]",
          "[[0, 1], [0, 2]]",
          "[[1, 2], [2, 4]]",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "i=0: [0*0, 0*1] = [0,0], i=1: [1*0, 1*1] = [0,1]"
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати list comprehension замість циклу?",
        options: [
          "Завжди",
          "Для простих операцій створення/фільтрації списків",
          "Для складних операцій з break/continue",
          "Ніколи"
        ],
        correctAnswer: 1,
        explanation: "List comprehension краще для простих операцій. Для складних операцій з break/continue використовуй цикл."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
