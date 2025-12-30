/**
 * Lesson 3-4: Lambda функції та функції вищого порядку
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson3_4 = {
  lessonId: "lesson-3-4",
  moduleId: "module-3",
  order: 4,
  title: "Lambda функції та функції вищого порядку",
  
  learningObjectives: [
    "Створювати lambda функції",
    "Використовувати map(), filter(), reduce()",
    "Застосовувати функції як об'єкти",
    "Працювати з декораторами (базово)"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-3-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Lambda функції",
        content: `Lambda — це анонімна функція (без імені), яка може містити тільки один вираз.

**Синтаксис:**
\`\`\`python
lambda параметри: вираз
\`\`\`

**Порівняння зі звичайною функцією:**
\`\`\`python
# Звичайна функція
def add(a, b):
    return a + b

# Lambda функція
add = lambda a, b: a + b

# Обидві працюють однаково
print(add(5, 3))  # 8
\`\`\`

**Коли використовувати lambda:**
- Короткі, одноразові функції
- Як аргументи для інших функцій (map, filter, sorted)
- Не для складних операцій

**Приклади:**
\`\`\`python
# Квадрат числа
square = lambda x: x ** 2
print(square(5))  # 25

# Перевірка парності
is_even = lambda x: x % 2 == 0
print(is_even(4))  # True

# Множення двох чисел
multiply = lambda x, y: x * y
print(multiply(3, 4))  # 12
\`\`\``
      },
      {
        title: "Функція map()",
        content: `map() застосовує функцію до кожного елемента послідовності.

**Синтаксис:**
\`\`\`python
map(функція, послідовність)
\`\`\`

**Приклади:**
\`\`\`python
# Зі звичайною функцією
def square(x):
    return x ** 2

numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# З lambda
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Перетворення рядків
words = ["hello", "world", "python"]
uppercase = list(map(str.upper, words))
print(uppercase)  # ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

**Еквівалент списковому включенню:**
\`\`\`python
# map
squared = list(map(lambda x: x ** 2, numbers))

# Спискове включення (частіше використовується)
squared = [x ** 2 for x in numbers]
\`\`\``
      },
      {
        title: "Функція filter()",
        content: `filter() фільтрує послідовність, залишаючи тільки елементи, для яких функція повертає True.

**Синтаксис:**
\`\`\`python
filter(функція, послідовність)
\`\`\`

**Приклади:**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Тільки парні числа
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Тільки числа більше 5
large = list(filter(lambda x: x > 5, numbers))
print(large)  # [6, 7, 8, 9, 10]

# Еквівалент списковому включенню
evens = [x for x in numbers if x % 2 == 0]
\`\`\``
      },
      {
        title: "Функція reduce()",
        content: `reduce() (з модуля functools) застосовує функцію до елементів послідовності, зводячи їх до одного значення.

**Синтаксис:**
\`\`\`python
from functools import reduce
reduce(функція, послідовність, початкове_значення)
\`\`\`

**Приклади:**
\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Сума всіх чисел
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

# Добуток всіх чисел
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# З початковим значенням
total = reduce(lambda x, y: x + y, numbers, 10)
print(total)  # 25 (10 + 15)
\`\`\``
      },
      {
        title: "Функції як об'єкти",
        content: `У Python функції — це об'єкти першого класу, їх можна:
- Присвоювати змінним
- Передавати як аргументи
- Повертати з функцій
- Зберігати у структурах даних

\`\`\`python
def greet(name):
    return f"Привіт, {name}!"

# Присвоєння
my_func = greet
print(my_func("Олександр"))  # Привіт, Олександр!

# Передача як аргумент
def call_function(func, arg):
    return func(arg)

result = call_function(greet, "Марія")
print(result)  # Привіт, Марія!

# Зберігання у словнику
operations = {
    "add": lambda x, y: x + y,
    "multiply": lambda x, y: x * y
}

print(operations["add"](5, 3))  # 8
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Lambda функції",
      code: `# Різні lambda функції
square = lambda x: x ** 2
is_positive = lambda x: x > 0
get_length = lambda s: len(s)

print(square(5))           # 25
print(is_positive(-3))     # False
print(get_length("Hello")) # 5`,
      explanation: "Демонструє створення та використання lambda функцій."
    },
    {
      title: "Приклад 2: map() та filter()",
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Квадрати всіх чисел
squares = list(map(lambda x: x ** 2, numbers))
print(f"Квадрати: {squares}")

# Тільки парні числа
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Парні: {evens}")

# Квадрати парних чисел
squares_evens = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
print(f"Квадрати парних: {squares_evens}")`,
      explanation: "Показує використання map() та filter() з lambda функціями."
    },
    {
      title: "Приклад 3: reduce()",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Сума
total = reduce(lambda x, y: x + y, numbers)
print(f"Сума: {total}")

# Максимум
maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(f"Максимум: {maximum}")`,
      explanation: "Демонструє використання reduce() для зведення послідовності до одного значення."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання lambda для складних операцій",
      explanation: "Lambda призначені для простих виразів, не для складних блоків коду.",
      correctApproach: "Використовуйте звичайні функції для складних операцій."
    },
    {
      mistake: "Забути конвертувати map/filter в список",
      explanation: "map() та filter() повертають ітератори, не списки.",
      correctApproach: "Використовуйте list(map(...)) або list(filter(...))."
    },
    {
      mistake: "Плутанина між map та filter",
      explanation: "map() перетворює елементи, filter() відбирає елементи.",
      correctApproach: "map() для перетворення, filter() для фільтрації."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Lambda функції** — анонімні функції для коротких операцій
2. **map()** — застосовує функцію до кожного елемента
3. **filter()** — фільтрує елементи за умовою
4. **reduce()** — зводить послідовність до одного значення
5. **Функції як об'єкти** — можна передавати та зберігати

Ці інструменти роблять код функціональним та елегантним!`,
  
  practiceTask: {
    title: "Обробка даних з функціями вищого порядку",
    description: "Створіть програму для обробки списків з використанням map, filter, reduce",
    problemStatement: `Напишіть програму, яка:
1. Має список чисел від 1 до 20
2. Використовує map() для обчислення квадратів
3. Використовує filter() для відбору парних чисел
4. Використовує reduce() для обчислення суми
5. Комбінує операції (наприклад, сума квадратів парних чисел)`,
    inputFormat: "Програма працює з попередньо заданим списком",
    outputFormat: `Приклад виведення:
Числа: [1, 2, 3, ..., 20]
Квадрати: [1, 4, 9, ..., 400]
Парні: [2, 4, 6, ..., 20]
Сума парних: 110
Сума квадратів парних: 1540`,
    examples: [
      {
        input: "numbers = [1, 2, 3, ..., 20]",
        output: `Парні: [2, 4, 6, ..., 20]
Сума парних: 110`,
        explanation: "Програма використовує функції вищого порядку для обробки даних"
      }
    ],
    solution: {
      code: `from functools import reduce

numbers = list(range(1, 21))

# Квадрати всіх чисел
squares = list(map(lambda x: x ** 2, numbers))
print(f"Квадрати: {squares[:5]}...")  # Перші 5

# Парні числа
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Парні: {evens}")

# Сума парних
sum_evens = reduce(lambda x, y: x + y, evens)
print(f"Сума парних: {sum_evens}")

# Сума квадратів парних чисел
squares_evens = list(map(lambda x: x ** 2, evens))
sum_squares_evens = reduce(lambda x, y: x + y, squares_evens)
print(f"Сума квадратів парних: {sum_squares_evens}")

# Альтернатива зі списковими включеннями (частіше використовується)
evens_alt = [x for x in numbers if x % 2 == 0]
squares_evens_alt = [x ** 2 for x in evens_alt]
sum_alt = sum(squares_evens_alt)
print(f"Альтернативний спосіб: {sum_alt}")`,
      explanation: "Рішення демонструє використання map(), filter(), reduce() та їх комбінування."
    },
    hints: [
      "Використовуйте range(1, 21) для створення списку",
      "map() для перетворення, filter() для відбору, reduce() для зведення",
      "Не забудьте імпортувати reduce з functools"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке lambda функція?",
        options: ["Звичайна функція", "Анонімна функція", "Метод класу", "Змінна"],
        correctAnswer: 1,
        explanation: "Lambda це анонімна (без імені) функція, яка може містити тільки один вираз."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: list(map(lambda x: x*2, [1,2,3]))?",
        options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "Помилку"],
        correctAnswer: 1,
        explanation: "map() застосовує lambda x: x*2 до кожного елемента: [1*2, 2*2, 3*2] = [2, 4, 6]."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить filter()?",
        options: ["Перетворює елементи", "Відбирає елементи", "Зводить до одного значення", "Сортує"],
        correctAnswer: 1,
        explanation: "filter() відбирає (фільтрує) елементи, для яких функція повертає True."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}


