/**
 * Lesson 07-2: Генераторні вирази та yield
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_2 = {
  lessonId: "lesson-07-2",
  moduleId: "module-07",
  order: 2,
  title: "Генераторні вирази та yield",
  
  learningObjectives: [
    "Створювати генераторні вирази (generator expressions)",
    "Використовувати yield from для делегування генераторів",
    "Працювати з нескінченними генераторами",
    "Оптимізувати код за допомогою генераторів"
  ],
  
  prerequisites: ["lesson-07-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Генераторні вирази",
        content: `Генераторні вирази - це компактний спосіб створення генераторів, схожий на list comprehensions, але з круглими дужками замість квадратних.

**Синтаксис:**

\`\`\`python
# List comprehension (створює список)
[вираз for елемент in послідовність]

# Generator expression (створює генератор)
(вираз for елемент in послідовність)
\`\`\`

**Порівняння:**

\`\`\`python
# List comprehension - створює весь список
squares_list = [x**2 for x in range(10)]
print(squares_list)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression - створює генератор
squares_gen = (x**2 for x in range(10))
print(squares_gen)  # <generator object <genexpr> at 0x...>
print(list(squares_gen))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

**Переваги генераторних виразів:**

1. **Компактність** - коротший синтаксис
2. **Економія пам'яті** - не створює список
3. **Lazy evaluation** - значення генеруються тільки коли потрібні

**Коли використовувати:**

- Коли потрібен генератор для одноразового використання
- Коли не потрібно зберігати всі значення
- Для передачі в функції, які працюють з ітераторами`
      },
      {
        title: "Приклади генераторних виразів",
        content: `**Приклад 1: Квадрати чисел**

\`\`\`python
# Генераторне вираз
squares = (x**2 for x in range(10))

# Використання
for square in squares:
    print(square)
# Виведе: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81
\`\`\`

**Приклад 2: Фільтрація з умовою**

\`\`\`python
# Парні числа
evens = (x for x in range(20) if x % 2 == 0)

for num in evens:
    print(num)
# Виведе: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
\`\`\`

**Приклад 3: Перетворення даних**

\`\`\`python
# Перетворення рядків у верхній регістр
words = ['hello', 'world', 'python']
upper_words = (word.upper() for word in words)

for word in upper_words:
    print(word)
# Виведе: HELLO, WORLD, PYTHON
\`\`\`

**Приклад 4: Вкладені генераторні вирази**

\`\`\`python
# Добуток пар чисел
products = (x * y for x in range(3) for y in range(3))

for product in products:
    print(product)
# Виведе: 0, 0, 0, 0, 1, 2, 0, 2, 4
\`\`\`

**Приклад 5: Використання з функціями**

\`\`\`python
# Генераторне вираз як аргумент
total = sum(x**2 for x in range(10))
print(total)  # 285

# Максимальне значення
max_value = max(x * 2 for x in range(10))
print(max_value)  # 18
\`\`\`
`
      },
      {
        title: "yield from - делегування генераторів",
        content: `\`yield from\` дозволяє делегувати генерацію значень іншому генератору. Це корисне для композиції генераторів.

**Синтаксис:**

\`\`\`python
def generator1():
    yield from generator2()  # Делегує генерацію generator2
\`\`\`

**Приклад 1: Просте делегування**

\`\`\`python
def numbers():
    yield 1
    yield 2
    yield 3

def more_numbers():
    yield 4
    yield 5

def all_numbers():
    yield from numbers()      # Генерує 1, 2, 3
    yield from more_numbers() # Генерує 4, 5

for num in all_numbers():
    print(num)
# Виведе: 1, 2, 3, 4, 5
\`\`\`

**Приклад 2: Делегування з range()**

\`\`\`python
def count_to_ten():
    yield from range(1, 6)   # 1, 2, 3, 4, 5
    yield from range(6, 11) # 6, 7, 8, 9, 10

for num in count_to_ten():
    print(num)
# Виведе: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
\`\`\`

**Приклад 3: Композиція кількох генераторів**

\`\`\`python
def first_half():
    yield from range(1, 6)

def second_half():
    yield from range(6, 11)

def full_range():
    yield from first_half()
    yield from second_half()

for num in full_range():
    print(num)
# Виведе: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
\`\`\`

**Переваги yield from:**

1. **Читабельність** - код стає чистішим
2. **Композиція** - легко комбінувати генератори
3. **Делегування** - передача контролю іншому генератору
4. **Оптимізація** - більш ефективне, ніж вручну викликати next()`
      },
      {
        title: "Нескінченні генератори",
        content: `Генератори можуть генерувати значення нескінченно! Це одна з їх найпотужніших можливостей.

**Приклад 1: Нескінченний лічильник**

\`\`\`python
def infinite_counter(start=0):
    """Генерує числа від start до нескінченності"""
    while True:
        yield start
        start += 1

# Використання (з обмеженням!)
counter = infinite_counter()
for i, num in enumerate(counter):
    if i >= 10:  # Обмежуємо до 10 значень
        break
    print(num)
# Виведе: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
\`\`\`

**Приклад 2: Нескінченні числа Фібоначчі**

\`\`\`python
def infinite_fibonacci():
    """Генерує числа Фібоначчі нескінченно"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Використання
fib = infinite_fibonacci()
for i in range(10):
    print(next(fib))
# Виведе: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Приклад 3: Нескінченні степені двійки**

\`\`\`python
def powers_of_two():
    """Генерує степені двійки нескінченно"""
    power = 1
    while True:
        yield power
        power *= 2

# Використання
powers = powers_of_two()
for i in range(8):
    print(next(powers))
# Виведе: 1, 2, 4, 8, 16, 32, 64, 128
\`\`\`

**Важливо:** Завжди обмежуйте нескінченні генератори, інакше програма зависне!
`
      },
      {
        title: "Оптимізація з генераторами",
        content: `Генератори дозволяють оптимізувати код, особливо при роботі з великими обсягами даних.

**Приклад 1: Обробка великого файлу**

\`\`\`python
# Без генератора (завантажує весь файл в пам'ять)
def read_file_all(filename):
    with open(filename, 'r') as f:
        return f.readlines()  # Завантажує всі рядки

# З генератором (обробляє по одному рядку)
def read_file_lines(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()  # Генерує по одному рядку

# Використання
for line in read_file_lines('large_file.txt'):
    process(line)  # Обробляємо по одному рядку
\`\`\`

**Приклад 2: Фільтрація та перетворення**

\`\`\`python
# Без генератора (створює проміжні списки)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squared = [x**2 for x in numbers]
filtered = [x for x in squared if x % 2 == 0]
result = sum(filtered)

# З генератором (без проміжних списків)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = sum(x**2 for x in numbers if (x**2) % 2 == 0)
\`\`\`

**Приклад 3: Пайплайн обробки даних**

\`\`\`python
def read_numbers():
    """Генерує числа"""
    for i in range(100):
        yield i

def square(numbers):
    """Підносить до квадрату"""
    for num in numbers:
        yield num ** 2

def filter_even(numbers):
    """Фільтрує парні"""
    for num in numbers:
        if num % 2 == 0:
            yield num

# Композиція генераторів
pipeline = filter_even(square(read_numbers()))
for num in pipeline:
    print(num)
\`\`\`

**Переваги:**

1. **Економія пам'яті** - не створює проміжні списки
2. **Швидкість** - обробка по одному елементу
3. **Гнучкість** - легко комбінувати операції`
      },
      {
        title: "Практичні поради",
        content: `**Коли використовувати генераторні вирази:**

 Для одноразового використання
 Як аргументи функцій (sum, max, min)
 Для великих обсягів даних
 Коли не потрібен доступ до всіх значень

**Коли використовувати генераторні функції:**

 Для складнішої логіки
 Коли потрібно використати кілька разів
 Для рекурсивних генераторів
 Коли потрібна документація

**Коли використовувати yield from:**

 Для композиції генераторів
 Для делегування генерації
 Для спрощення коду

**Уникайте:**

 Перетворення генераторів у списки без потреби
 Використання генераторів кілька разів (створюйте нові)
 Нескінченні генератори без обмежень
 Складні генераторні вирази (краще функція)`
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили розширені можливості генераторів:

**Ключові концепції:**

1. **Генераторні вирази** - компактний синтаксис для створення генераторів
2. **yield from** - делегування генерації іншому генератору
3. **Нескінченні генератори** - генератори без кінця (з обмеженнями!)
4. **Оптимізація** - використання генераторів для економії пам'яті

**Синтаксис:**

\`\`\`python
# Генераторне вираз
gen = (x**2 for x in range(10))

# yield from
def generator():
    yield from other_generator()
\`\`\`

**Наступний крок:**

У наступному уроці ми дізнаємося про ітератори та протокол ітерації в Python.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Генераторне вираз",
      code: `# Генераторне вираз для квадратів
squares = (x**2 for x in range(10))

# Використання
for square in squares:
    print(square)
# Виведе: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81`,
      explanation: "Компактний спосіб створення генератора квадратів чисел."
    },
    {
      title: "Генераторне вираз з умовою",
      code: `# Парні числа
evens = (x for x in range(20) if x % 2 == 0)

for num in evens:
    print(num)
# Виведе: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18`,
      explanation: "Генераторне вираз з умовою для фільтрації значень."
    },
    {
      title: "yield from",
      code: `def first_numbers():
    yield from range(1, 6)

def last_numbers():
    yield from range(6, 11)

def all_numbers():
    yield from first_numbers()
    yield from last_numbers()

for num in all_numbers():
    print(num)
# Виведе: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,
      explanation: "Демонструє використання yield from для композиції генераторів."
    },
    {
      title: "Нескінченний генератор",
      code: `def infinite_counter(start=0):
    while True:
        yield start
        start += 1

# Використання з обмеженням
counter = infinite_counter()
for i in range(10):
    print(next(counter))
# Виведе: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`,
      explanation: "Нескінченний генератор, який генерує числа без кінця. Важливо обмежувати його використання."
    },
    {
      title: "Генераторне вираз як аргумент",
      code: `# Використання генераторного виразу як аргументу
total = sum(x**2 for x in range(10))
print(total)  # 285

max_value = max(x * 2 for x in range(10))
print(max_value)  # 18`,
      explanation: "Генераторні вирази можна використовувати безпосередньо як аргументи функцій."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між генераторними виразами та list comprehensions",
      explanation: "Круглі дужки створюють генератор, квадратні - список.",
      correctApproach: `# Генератор (круглі дужки)
gen = (x**2 for x in range(10))

# Список (квадратні дужки)
lst = [x**2 for x in range(10)]`
    },
    {
      mistake: "Спроба використати нескінченний генератор без обмеження",
      explanation: "Нескінченні генератори можуть зависнути програму, якщо не обмежити їх.",
      correctApproach: `# Неправильно:
def infinite():
    while True:
        yield 1

for num in infinite():  # Зависне!
    print(num)

# Правильно:
for i, num in enumerate(infinite()):
    if i >= 10:
        break
    print(num)`
    },
    {
      mistake: "Використання yield from з неітерабельними об'єктами",
      explanation: "yield from працює тільки з ітерабельними об'єктами.",
      correctApproach: `# Неправильно:
def gen():
    yield from 5  # Помилка! 5 не ітерабельний

# Правильно:
def gen():
    yield from range(5)  # range() ітерабельний`
    },
    {
      mistake: "Перетворення генераторного виразу в список без потреби",
      explanation: "Якщо не потрібен доступ до всіх значень, краще залишити генератор.",
      correctApproach: `# Неправильно (якщо не потрібен список):
gen = (x**2 for x in range(1000000))
lst = list(gen)  # Втрачаємо переваги генератора

# Правильно:
gen = (x**2 for x in range(1000000))
for square in gen:  # Обробляємо по одному
    process(square)`
    }
  ],
  
  summary: `На цьому уроці ми вивчили розширені можливості генераторів:

1. Генераторні вирази - компактний синтаксис (x2 for x in range(10))
2. yield from - делегування генерації іншим генераторам
3. Нескінченні генератори - генератори без кінця (з обмеженнями!)
4. Оптимізація - використання генераторів для економії пам'яті та швидкості

Генераторні вирази та yield from роблять роботу з генераторами ще більш потужною та зручною.`,
  
  practiceTask: {
    title: "Генераторні вирази та yield from",
    description: "Створіть генератори з використанням генераторних виразів та yield from",
    problemStatement: `Створіть програму:

1. Генераторне вираз кубів від 1 до cube_n
2. combine_ranges(start1, end1, start2, end2) з yield from
3. infinite_evens() — перші even_count парних чисел
4. Сума квадратів від 1 до square_n

Формат вводу:
10
1 4 10 13
10
20`,
    outputFormat: `=== Куби чисел ===
1
8
27
64
125
216
343
512
729
1000
=== Комбіновані діапазони ===
1
2
3
10
11
12
=== Перші парні числа ===
0
2
4
6
8
10
12
14
16
18

=== Сума квадратів від 1 до 20 ===
2870`,
    examples: [
      {
        input: `10
1 4 10 13
10
20`,
        output: `=== Куби чисел ===
1
8
27
64
125
216
343
512
729
1000
=== Комбіновані діапазони ===
1
2
3
10
11
12
=== Перші парні числа ===
0
2
4
6
8
10
12
14
16
18

=== Сума квадратів від 1 до 20 ===
2870`,
        explanation: "Повний набір: куби 1..10, два діапазони, 10 парних, сума до 20"
      },
      {
        input: `3
1 3 5 7
4
5`,
        output: `=== Куби чисел ===
1
8
27
=== Комбіновані діапазони ===
1
2
5
6
=== Перші парні числа ===
0
2
4
6

=== Сума квадратів від 1 до 5 ===
55`,
        explanation: "Менші параметри"
      },
      {
        input: `2
0 2 8 10
3
3`,
        output: `=== Куби чисел ===
1
8
=== Комбіновані діапазони ===
0
1
8
9
=== Перші парні числа ===
0
2
4

=== Сума квадратів від 1 до 3 ===
14`,
        explanation: "Куби 1..2 і сума квадратів 1+4+9=14"
      }
    ],
    solution: {
      code: `def combine_ranges(start1, end1, start2, end2):
    """Генерує числа з двох діапазонів"""
    yield from range(start1, end1)
    yield from range(start2, end2)

def infinite_evens():
    """Генерує парні числа нескінченно"""
    num = 0
    while True:
        yield num
        num += 2

cube_n = int(input())
s1, e1, s2, e2 = map(int, input().split())
even_count = int(input())
square_n = int(input())

print("=== Куби чисел ===")
cubes = (x**3 for x in range(1, cube_n + 1))
for cube in cubes:
    print(cube)

print("=== Комбіновані діапазони ===")
for num in combine_ranges(s1, e1, s2, e2):
    print(num)

print("=== Перші парні числа ===")
evens = infinite_evens()
for i in range(even_count):
    print(next(evens))

print()
print(f"=== Сума квадратів від 1 до {square_n} ===")
total = sum(x**2 for x in range(1, square_n + 1))
print(total)`,
      explanation: "Параметри з stdin; генераторні вирази, yield from і нескінченний генератор."
    },
    hints: [
      "Зчитайте cube_n, чотири межі діапазонів, even_count, square_n",
      "Генераторний вираз: (x**3 for x in range(1, cube_n + 1))",
      "yield from range(...)",
      "Обмежте infinite_evens циклом range(even_count)"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який синтаксис використовується для генераторних виразів?",
        options: [
          "Круглі дужки: (x**2 for x in range(10))",
          "Квадратні дужки: [x**2 for x in range(10)]",
          "Фігурні дужки: {x**2 for x in range(10)}",
          "Без дужок: x**2 for x in range(10)"
        ],
        correctAnswer: 0,
        explanation: "Генераторні вирази використовують круглі дужки. Квадратні дужки створюють list comprehension."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить yield from?",
        options: [
          "Делегує генерацію іншому генератору",
          "Завершує генератор",
          "Створює список",
          "Викликає помилку"
        ],
        correctAnswer: 0,
        explanation: "yield from делегує генерацію значень іншому генератору або ітерабельному об'єкту."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що створить цей код?\n\n```python\nsquares = (x**2 for x in range(5))\nprint(type(squares))\n```",
        options: [
          "<class 'generator'>",
          "<class 'list'>",
          "<class 'tuple'>",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Генераторне вираз створює об'єкт типу generator, а не список."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна створити нескінченний генератор?",
        options: [
          "Так, але потрібно обмежити його використання",
          "Ні, це неможливо",
          "Тільки з yield from",
          "Тільки з генераторними виразами"
        ],
        correctAnswer: 0,
        explanation: "Так, можна створити нескінченний генератор з while True, але важливо обмежити його використання, інакше програма зависне."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef gen1():\n    yield from range(3)\n\ndef gen2():\n    yield from range(3, 6)\n\ndef all():\n    yield from gen1()\n    yield from gen2()\n\nfor x in all():\n    print(x)\n```",
        options: [
          "0, 1, 2, 3, 4, 5",
          "3, 4, 5, 0, 1, 2",
          "Помилку",
          "Нічого"
        ],
        correctAnswer: 0,
        explanation: "yield from спочатку генерує значення з gen1() (0, 1, 2), потім з gen2() (3, 4, 5)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати генераторні вирази замість генераторних функцій?",
        options: [
          "Для простих одноразових генераторів",
          "Для складних генераторів з багатьма умовами",
          "Для рекурсивних генераторів",
          "Коли потрібна документація"
        ],
        correctAnswer: 0,
        explanation: "Генераторні вирази краще використовувати для простих одноразових генераторів. Для складнішої логіки краще функції."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Генераторне вираз можна використати як аргумент функції.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "True. Генераторні вирази можна використовувати безпосередньо як аргументи функцій, наприклад: sum(x**2 for x in range(10))."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що станеться, якщо використати нескінченний генератор без обмеження?",
        options: [
          "Програма зависне",
          "Виникне помилка",
          "Генератор автоматично зупиниться",
          "Поверне None"
        ],
        correctAnswer: 0,
        explanation: "Нескінченний генератор без обмеження призведе до нескінченного циклу, і програма зависне."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

