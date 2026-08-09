/**
 * Lesson 03-9: Функції вищого порядку
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_9 = {
  lessonId: "lesson-03-9",
  moduleId: "module-03",
  order: 9,
  title: "Функції вищого порядку",
  
  learningObjectives: [
    "Розуміти, що таке функції вищого порядку",
    "Поглибити знання про map(), filter()",
    "Використовувати reduce() для згортки даних",
    "Комбінувати функції вищого порядку",
    "Створювати власні функції вищого порядку",
    "Застосовувати функціональний стиль програмування"
  ],
  
  prerequisites: ["lesson-03-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке функції вищого порядку?",
        content: `Функції вищого порядку (Higher-Order Functions) - це функції, які:
1. Приймають інші функції як аргументи
2. Або повертають функції як результат

**Приклади функцій вищого порядку в Python:**

- \`map()\` - застосовує функцію до кожного елемента
- \`filter()\` - фільтрує елементи за умовою
- \`reduce()\` - згортає послідовність в одне значення
- \`sorted()\` - сортує з функцією key
- \`max()\`, \`min()\` - з функцією key

**Переваги функцій вищого порядку:**

- Більш декларативний код (описуємо "що", а не "як")
- Менше коду
- Легше читати та підтримувати
- Функціональний стиль програмування

**Приклад:**

\`\`\`python
# Без функцій вищого порядку (імперативний стиль)
numbers = [1, 2, 3, 4, 5]
squared = []
for num in numbers:
    squared.append(num ** 2)

# З функціями вищого порядку (функціональний стиль)
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
\`\`\``
      },
      {
        title: "map() - детальніше",
        content: `\`map()\` застосовує функцію до кожного елемента ітерованого об'єкта.

**Синтаксис:**

\`\`\`python
map(function, iterable, ...)
\`\`\`

**Приклади:**

\`\`\`python
# З lambda
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
# [1, 4, 9, 16, 25]

# Зі звичайною функцією
def square(x):
    return x ** 2

squared = list(map(square, numbers))
# [1, 4, 9, 16, 25]

# З кількома ітерованими об'єктами
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# З методами
texts = ["  привіт  ", "  світ  ", "  python  "]
cleaned = list(map(str.strip, texts))
# ["привіт", "світ", "python"]
\`\`\`

**Важливо:** \`map()\` повертає ітератор, тому для отримання списку потрібно \`list()\`.

**Практичні приклади:**

\`\`\`python
# Перетворення типів
strings = ["1", "2", "3", "4", "5"]
numbers = list(map(int, strings))
# [1, 2, 3, 4, 5]

# Обробка рядків
names = ["олександр", "марія", "іван"]
capitalized = list(map(str.capitalize, names))
# ["Олександр", "Марія", "Іван"]

# Обчислення з кількома списками
prices = [100, 200, 300]
quantities = [2, 3, 4]
totals = list(map(lambda p, q: p * q, prices, quantities))
# [200, 600, 1200]
\`\`\``
      },
      {
        title: "filter() - детальніше",
        content: `\`filter()\` фільтрує елементи, залишаючи тільки ті, для яких функція повертає \`True\`.

**Синтаксис:**

\`\`\`python
filter(function, iterable)
\`\`\`

**Приклади:**

\`\`\`python
# Фільтрація парних чисел
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [0, 2, 4, 6, 8, 10]

# Фільтрація за довжиною
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]

# Фільтрація зі звичайною функцією
def is_positive(n):
    return n > 0

numbers = [-5, -2, 0, 3, 7, -1, 10]
positives = list(filter(is_positive, numbers))
# [3, 7, 10]

# Фільтрація None значень
values = [1, None, 2, None, 3, None, 4]
non_none = list(filter(lambda x: x is not None, values))
# [1, 2, 3, 4]

# Або простіше:
non_none = list(filter(None, values))  # filter(None, ...) видаляє "falsy" значення
# [1, 2, 3, 4]
\`\`\`

**Важливо:** Функція має повертати булеве значення (\`True\` або \`False\`).

**Практичні приклади:**

\`\`\`python
# Фільтрація за кількома умовами
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = list(filter(lambda x: x % 2 == 0 and x > 5, numbers))
# [6, 8, 10]

# Фільтрація рядків за наявністю підрядка
texts = ["Python", "Java", "JavaScript", "C++", "Pythonista"]
python_texts = list(filter(lambda text: "Python" in text, texts))
# ["Python", "Pythonista"]

# Фільтрація словників
users = [
    {"name": "Олександр", "age": 20},
    {"name": "Марія", "age": 25},
    {"name": "Іван", "age": 18}
]
adults = list(filter(lambda user: user["age"] >= 18, users))
# [{"name": "Олександр", "age": 20}, {"name": "Марія", "age": 25}, {"name": "Іван", "age": 18}]
\`\`\``
      },
      {
        title: "reduce() - згортка даних",
        content: `\`reduce()\` згортає послідовність в одне значення, застосовуючи функцію до елементів послідовно.

**Синтаксис:**

\`\`\`python
from functools import reduce

reduce(function, iterable, initializer)
\`\`\`

**Важливо:** В Python 3 \`reduce()\` переміщено в модуль \`functools\`.

**Як працює reduce():**

1. Бере перші два елементи
2. Застосовує функцію до них
3. Бере результат та наступний елемент
4. Повторює до кінця

**Приклади:**

\`\`\`python
from functools import reduce

# Сума чисел
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
# 15 (1+2=3, 3+3=6, 6+4=10, 10+5=15)

# Добуток чисел
product = reduce(lambda x, y: x * y, numbers)
# 120 (1*2=2, 2*3=6, 6*4=24, 24*5=120)

# Пошук максимуму
max_num = reduce(lambda x, y: x if x > y else y, numbers)
# 5

# Об'єднання рядків
words = ["Привіт", "світ", "Python"]
sentence = reduce(lambda x, y: x + " " + y, words)
# "Привіт світ Python"
\`\`\`

**З початковим значенням (initializer):**

\`\`\`python
from functools import reduce

# Сума з початковим значенням
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers, 10)
# 25 (10+1=11, 11+2=13, 13+3=16, 16+4=20, 20+5=25)

# Добуток з початковим значенням
product = reduce(lambda x, y: x * y, numbers, 2)
# 240 (2*1=2, 2*2=4, 4*3=12, 12*4=48, 48*5=240)
\`\`\`

**Практичні приклади:**

\`\`\`python
from functools import reduce

# Обчислення середнього (через reduce)
numbers = [10, 20, 30, 40, 50]
total = reduce(lambda x, y: x + y, numbers)
average = total / len(numbers)
# 30.0

# Об'єднання словників
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = reduce(lambda x, y: {**x, **y}, dicts)
# {"a": 1, "b": 2, "c": 3}

# Найдовший рядок
words = ["Python", "is", "great", "for", "programming"]
longest = reduce(lambda x, y: x if len(x) > len(y) else y, words)
# "programming"
\`\`\``
      },
      {
        title: "Комбінування функцій вищого порядку",
        content: `Можна комбінувати \`map()\`, \`filter()\` та \`reduce()\` для складних операцій.

**Приклад 1: Фільтрація та перетворення**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Фільтруємо парні числа, потім підносимо до квадрату
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# [4, 16, 36, 64, 100]
\`\`\`

**Приклад 2: Перетворення та фільтрація**

\`\`\`python
words = ["  python  ", "  java  ", "  c++  ", "  javascript  "]

# Очищаємо рядки, потім фільтруємо короткі
cleaned_long = list(filter(lambda x: len(x) > 3, map(str.strip, words)))
# ["python", "javascript"]
\`\`\`

**Приклад 3: Комплексна обробка**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Фільтруємо числа > 5, підносимо до квадрату, потім сумуємо
result = reduce(
    lambda x, y: x + y,
    map(lambda x: x ** 2, filter(lambda x: x > 5, numbers))
)
# 36 + 49 + 64 + 81 + 100 = 330
\`\`\`

**Приклад 4: Обробка даних користувачів**

\`\`\`python
from functools import reduce

users = [
    {"name": "Олександр", "age": 20, "score": 85},
    {"name": "Марія", "age": 25, "score": 92},
    {"name": "Іван", "age": 18, "score": 78},
    {"name": "Анна", "age": 22, "score": 95}
]

# Фільтруємо користувачів з віком >= 20, беремо оцінки, обчислюємо середнє
adult_scores = list(map(lambda u: u["score"], filter(lambda u: u["age"] >= 20, users)))
average_score = reduce(lambda x, y: x + y, adult_scores) / len(adult_scores)
# (85 + 92 + 95) / 3 = 90.67
\`\`\`

**Читабельність:**

Для складних операцій іноді краще розбити на кроки:

\`\`\`python
# Важко читати:
result = reduce(lambda x, y: x + y, map(lambda x: x ** 2, filter(lambda x: x > 5, numbers)))

# Краще:
filtered = filter(lambda x: x > 5, numbers)
squared = map(lambda x: x ** 2, filtered)
result = reduce(lambda x, y: x + y, squared)
\`\`\``
      },
      {
        title: "Створення власних функцій вищого порядку",
        content: `Можна створювати власні функції вищого порядку, які приймають інші функції як аргументи.

**Приклад 1: Застосування функції кілька разів**

\`\`\`python
def apply_times(func, value, times):
    """
    Застосовує функцію до значення кілька разів
    """
    result = value
    for _ in range(times):
        result = func(result)
    return result

# Використання
def double(x):
    return x * 2

result = apply_times(double, 3, 4)
# 3 → 6 → 12 → 24 → 48
print(result)  # 48
\`\`\`

**Приклад 2: Фільтрація та перетворення**

\`\`\`python
def filter_and_map(items, filter_func, map_func):
    """
    Фільтрує елементи та застосовує функцію перетворення
    """
    filtered = filter(filter_func, items)
    return list(map(map_func, filtered))

# Використання
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = filter_and_map(
    numbers,
    lambda x: x % 2 == 0,  # Фільтр: парні числа
    lambda x: x ** 2        # Перетворення: квадрат
)
# [4, 16, 36, 64, 100]
\`\`\`

**Приклад 3: Композиція функцій**

\`\`\`python
def compose(*functions):
    """
    Створює композицію функцій
    """
    def composed(value):
        result = value
        for func in functions:
            result = func(result)
        return result
    return composed

# Використання
def add_one(x):
    return x + 1

def multiply_two(x):
    return x * 2

def square(x):
    return x ** 2

# Композиція: square(multiply_two(add_one(x)))
composed = compose(add_one, multiply_two, square)
result = composed(3)
# 3 → 4 → 8 → 64
print(result)  # 64
\`\`\`

**Приклад 4: Функція, яка повертає функцію**

\`\`\`python
def create_multiplier(n):
    """
    Створює функцію, яка множить на n
    """
    def multiplier(x):
        return x * n
    return multiplier

# Використання
double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
\`\`\``
      },
      {
        title: "Порівняння з імперативним стилем",
        content: `Функціональний стиль (з функціями вищого порядку) часто більш читабельний за імперативний (з циклами).

**Приклад 1: Обробка чисел**

Імперативний стиль:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = []
for num in numbers:
    if num % 2 == 0:
        result.append(num ** 2)
\`\`\`

Функціональний стиль:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
\`\`\`

**Приклад 2: Обробка рядків**

Імперативний стиль:
\`\`\`python
words = ["  python  ", "  java  ", "  c++  "]
result = []
for word in words:
    cleaned = word.strip()
    if len(cleaned) > 2:
        result.append(cleaned.upper())
\`\`\`

Функціональний стиль:
\`\`\`python
words = ["  python  ", "  java  ", "  c++  "]
result = list(map(str.upper, filter(lambda x: len(x) > 2, map(str.strip, words))))
\`\`\`

**Коли використовувати що:**

 **Функціональний стиль:**
- Прості перетворення та фільтрації
- Коли важлива читабельність
- Для обробки даних

 **Імперативний стиль:**
- Складні алгоритми з багатьма умовами
- Коли потрібен детальний контроль
- Для оптимізації продуктивності

**Краще комбінувати:**

\`\`\`python
# Складні операції - імперативно
def process_data(data):
    result = []
    for item in data:
        if complex_condition(item):
            processed = complex_transformation(item)
            result.append(processed)
    return result

# Прості операції - функціонально
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили функції вищого порядку:

**Ключові концепції:**

1. **Функції вищого порядку**
   - Приймають функції як аргументи
   - Або повертають функції

2. **map()**
   - Застосовує функцію до кожного елемента
   - Повертає ітератор
   - Для перетворення даних

3. **filter()**
   - Фільтрує елементи за умовою
   - Повертає ітератор
   - Функція має повертати True/False

4. **reduce()**
   - Згортає послідовність в одне значення
   - Потребує імпорту з functools
   - Для агрегації даних

5. **Комбінування**
   - Можна комбінувати map, filter, reduce
   - Для складних операцій
   - Іноді краще розбити на кроки

6. **Власні функції вищого порядку**
   - Можна створювати функції, які приймають інші функції
   - Для повторного використання логіки

**Переваги:**

- Більш декларативний код
- Менше коду
- Легше читати
- Функціональний стиль

**Недоліки:**

- Може бути важче налагоджувати
- Іноді менш зрозуміло для початківців
- Може бути повільніше для простих операцій

**Наступний крок:**

У наступному уроці ми закріпимо всі знання про функції на практиці, створюючи різні типи функцій для реальних задач.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "map() з lambda",
      code: `numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# З кількома списками
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
print(sums)  # [11, 22, 33]`,
      explanation: "Демонструє використання map() з lambda для перетворення даних."
    },
    {
      title: "filter() з умовами",
      code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [0, 2, 4, 6, 8, 10]

# Фільтрація за довжиною
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
print(long_words)  # ["Python", "great", "programming"]`,
      explanation: "Показує використання filter() для фільтрації елементів за різними умовами."
    },
    {
      title: "reduce() для агрегації",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# З початковим значенням
total_with_init = reduce(lambda x, y: x + y, numbers, 10)
print(total_with_init)  # 25`,
      explanation: "Демонструє використання reduce() для згортки послідовності в одне значення."
    },
    {
      title: "Комбінування map, filter, reduce",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Фільтруємо парні, підносимо до квадрату, сумуємо
result = reduce(
    lambda x, y: x + y,
    map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers))
)
print(result)  # 220 (4 + 16 + 36 + 64 + 100)`,
      explanation: "Показує, як комбінувати map(), filter() та reduce() для складних операцій."
    },
    {
      title: "Власна функція вищого порядку",
      code: `def apply_times(func, value, times):
    """
    Застосовує функцію до значення кілька разів
    """
    result = value
    for _ in range(times):
        result = func(result)
    return result

def double(x):
    return x * 2

result = apply_times(double, 3, 4)
print(result)  # 48`,
      explanation: "Демонструє створення власної функції вищого порядку, яка приймає функцію як аргумент."
    },
    {
      title: "Композиція функцій",
      code: `def compose(*functions):
    """
    Створює композицію функцій
    """
    def composed(value):
        result = value
        for func in functions:
            result = func(result)
        return result
    return composed

def add_one(x):
    return x + 1

def multiply_two(x):
    return x * 2

composed = compose(add_one, multiply_two)
result = composed(3)  # (3 + 1) * 2 = 8
print(result)`,
      explanation: "Показує створення функції композиції для послідовного застосування функцій."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забування про list() для map() та filter()",
      explanation: "map() та filter() повертають ітератори, а не списки, тому потрібно list().",
      correctApproach: `# Неправильно:
numbers = [1, 2, 3]
squared = map(lambda x: x ** 2, numbers)
print(squared)  # <map object> - не список!

# Правильно:
numbers = [1, 2, 3]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9] - список`
    },
    {
      mistake: "Забування імпорту reduce",
      explanation: "В Python 3 reduce() потрібно імпортувати з functools.",
      correctApproach: `# Неправильно:
numbers = [1, 2, 3]
total = reduce(lambda x, y: x + y, numbers)  #  NameError!

# Правильно:
from functools import reduce

numbers = [1, 2, 3]
total = reduce(lambda x, y: x + y, numbers)  #  Працює`
    },
    {
      mistake: "Функція в filter() не повертає булеве значення",
      explanation: "Функція в filter() має повертати True або False, інакше результат може бути неочікуваним.",
      correctApproach: `# Неправильно (працює, але неочевидно):
numbers = [0, 1, 2, 3, 4, 5]
result = list(filter(lambda x: x, numbers))  # Видаляє 0 (falsy)
# [1, 2, 3, 4, 5]

# Правильно (явно):
numbers = [0, 1, 2, 3, 4, 5]
result = list(filter(lambda x: x > 0, numbers))  # Явна умова
# [1, 2, 3, 4, 5]`
    },
    {
      mistake: "Складні вкладені виклики важко читати",
      explanation: "Дуже складні комбінації map/filter/reduce можуть бути важкими для читання.",
      correctApproach: `# Важко читати:
result = reduce(lambda x, y: x + y, map(lambda x: x ** 2, filter(lambda x: x > 5, numbers)))

# Краще:
filtered = filter(lambda x: x > 5, numbers)
squared = map(lambda x: x ** 2, filtered)
result = reduce(lambda x, y: x + y, squared)

# Або для простих випадків використати спискові включення:
result = sum(x ** 2 for x in numbers if x > 5)`
    }
  ],
  
  summary: `На цьому уроці ми вивчили функції вищого порядку:

1. Що таке функції вищого порядку
   - Приймають функції як аргументи
   - Або повертають функції

2. map()
   - Застосовує функцію до кожного елемента
   - Для перетворення даних
   - Повертає ітератор (потрібен list())

3. filter()
   - Фільтрує елементи за умовою
   - Функція має повертати True/False
   - Повертає ітератор (потрібен list())

4. reduce()
   - Згортає послідовність в одне значення
   - Потребує імпорту з functools
   - Для агрегації даних

5. Комбінування
   - Можна комбінувати map, filter, reduce
   - Для складних операцій
   - Іноді краще розбити на кроки

6. Власні функції вищого порядку
   - Можна створювати функції, які приймають інші функції
   - Для повторного використання логіки

Функції вищого порядку роблять код більш декларативним та читабельним!`,
  
  practiceTask: {
    title: "Обробка даних з функціями вищого порядку",
    description: "Створіть програму для обробки даних, використовуючи map(), filter() та reduce()",
    problemStatement: `Напишіть програму з функціями (from functools import reduce):

1. process_numbers(numbers) — сума квадратів парних
2. process_users(users) — імена користувачів з age >= 18
3. calculate_statistics(numbers) — словник sum, product, max через reduce
4. process_texts(texts) — strip().upper()
5. complex_processing(data) — середнє квадратів чисел > 10

Зчитайте: рядок чисел; k користувачів (ім'я і вік на рядку); m текстів; рядок data для complex.

Формат вводу:
1 2 3 4 5 6 7 8 9 10
3
Олександр 20
Марія 25
Іван 17
3
  привіт  
  світ  
  python  
5 12 8 15 3 20 7`,
    outputFormat: `Сума квадратів парних чисел: 220
Дорослі користувачі: ['Олександр', 'Марія']
Статистика: {'sum': 55, 'product': 3628800, 'max': 10}
Оброблені тексти: ['ПРИВІТ', 'СВІТ', 'PYTHON']
Середнє квадратів чисел > 10: 256.3333333333333`,
    examples: [
      {
        input: `1 2 3 4 5 6 7 8 9 10
3
Олександр 20
Марія 25
Іван 17
3
  привіт  
  світ  
  python  
5 12 8 15 3 20 7`,
        output: `Сума квадратів парних чисел: 220
Дорослі користувачі: ['Олександр', 'Марія']
Статистика: {'sum': 55, 'product': 3628800, 'max': 10}
Оброблені тексти: ['ПРИВІТ', 'СВІТ', 'PYTHON']
Середнє квадратів чисел > 10: 256.3333333333333`,
        explanation: "Парні квадрати 4+16+...+100=220; середнє (144+225+400)/3"
      },
      {
        input: `2 3 4
2
Анна 18
Богдан 16
2
 hi 
 bye 
11 12`,
        output: `Сума квадратів парних чисел: 20
Дорослі користувачі: ['Анна']
Статистика: {'sum': 9, 'product': 24, 'max': 4}
Оброблені тексти: ['HI', 'BYE']
Середнє квадратів чисел > 10: 132.5`,
        explanation: "2^2+4^2=20; (121+144)/2=132.5"
      },
      {
        input: `1 1 1
1
Оля 30
1
test
20`,
        output: `Сума квадратів парних чисел: 0
Дорослі користувачі: ['Оля']
Статистика: {'sum': 3, 'product': 1, 'max': 1}
Оброблені тексти: ['TEST']
Середнє квадратів чисел > 10: 400.0`,
        explanation: "Немає парних — reduce на порожньому потребує обережності; використайте 0 якщо немає парних"
      }
    ],
    solution: {
      code: `from functools import reduce

def process_numbers(numbers):
    """Сума квадратів парних чисел"""
    filtered = list(filter(lambda x: x % 2 == 0, numbers))
    if not filtered:
        return 0
    return reduce(lambda x, y: x + y, map(lambda x: x ** 2, filtered))

def process_users(users):
    """Імена дорослих користувачів"""
    adults = filter(lambda u: u["age"] >= 18, users)
    return list(map(lambda u: u["name"], adults))

def calculate_statistics(numbers):
    """Статистика через reduce"""
    return {
        "sum": reduce(lambda x, y: x + y, numbers),
        "product": reduce(lambda x, y: x * y, numbers),
        "max": reduce(lambda x, y: x if x > y else y, numbers)
    }

def process_texts(texts):
    """strip та upper"""
    return list(map(lambda t: t.strip().upper(), texts))

def complex_processing(data):
    """Середнє квадратів чисел > 10"""
    squared_list = list(map(lambda x: x ** 2, filter(lambda x: x > 10, data)))
    if not squared_list:
        return 0
    total = reduce(lambda x, y: x + y, squared_list)
    return total / len(squared_list)

numbers = list(map(int, input().split()))
k = int(input())
users = []
for _ in range(k):
    parts = input().split()
    users.append({"name": parts[0], "age": int(parts[1])})
m = int(input())
texts = [input() for _ in range(m)]
data = list(map(int, input().split()))

print(f"Сума квадратів парних чисел: {process_numbers(numbers)}")
print(f"Дорослі користувачі: {process_users(users)}")
print(f"Статистика: {calculate_statistics(numbers)}")
print(f"Оброблені тексти: {process_texts(texts)}")
print(f"Середнє квадратів чисел > 10: {complex_processing(data)}")`,
      explanation: "map/filter/reduce для обробки; усі дані з stdin. Порожній filter дає 0."
    },
    hints: [
      "Імпортуйте reduce з functools",
      "Якщо після filter список порожній — поверніть 0",
      "Зчитайте користувачів циклом: ім'я та вік",
      "Для середнього спочатку list(), потім сума/довжина"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке функція вищого порядку?",
        options: [
          "Функція, яка приймає інші функції як аргументи або повертає функції",
          "Функція з високим пріоритетом",
          "Функція, яка працює тільки з числами",
          "Вбудована функція Python"
        ],
        correctAnswer: 0,
        explanation: "Функція вищого порядку - це функція, яка приймає інші функції як аргументи або повертає функції як результат. Приклади: map(), filter(), reduce()."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає map()?",
        options: [
          "Ітератор",
          "Список",
          "Словник",
          "Кортеж"
        ],
        correctAnswer: 0,
        explanation: "map() повертає ітератор. Для отримання списку потрібно використати list(map(...))."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfrom functools import reduce\n\nnumbers = [1, 2, 3, 4, 5]\nresult = reduce(lambda x, y: x + y, numbers)\nprint(result)\n```",
        options: [
          "15",
          "5",
          "Помилку",
          "[1, 2, 3, 4, 5]"
        ],
        correctAnswer: 0,
        explanation: "reduce() згортає список: 1+2=3, 3+3=6, 6+4=10, 10+5=15."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Звідки потрібно імпортувати reduce() в Python 3?",
        options: [
          "З модуля functools",
          "З модуля itertools",
          "З модуля collections",
          "reduce() вже доступний без імпорту"
        ],
        correctAnswer: 0,
        explanation: "В Python 3 reduce() переміщено в модуль functools, тому потрібно імпортувати: from functools import reduce."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [1, 2, 3, 4, 5, 6]\nresult = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))\nprint(result)\n```",
        options: [
          "[4, 16, 36]",
          "[1, 4, 9, 16, 25, 36]",
          "[2, 4, 6]",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Спочатку filter() залишає парні числа [2, 4, 6], потім map() підносить їх до квадрату [4, 16, 36]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що має повертати функція, передана в filter()?",
        options: [
          "True або False",
          "Будь-яке значення",
          "Тільки True",
          "Тільки False"
        ],
        correctAnswer: 0,
        explanation: "Функція в filter() має повертати булеве значення (True або False). Елементи, для яких функція повертає True, залишаються в результаті."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nfrom functools import reduce\n\nnumbers = [2, 3, 4]\nresult = reduce(lambda x, y: x * y, numbers, 5)\nprint(result)\n```",
        options: [
          "120",
          "24",
          "9",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "reduce() з початковим значенням 5: 5*2=10, 10*3=30, 30*4=120."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Можна комбінувати map(), filter() та reduce() для складних операцій.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, можна комбінувати ці функції. Наприклад: reduce(..., map(..., filter(...))). Але для читабельності іноді краще розбити на кроки."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
