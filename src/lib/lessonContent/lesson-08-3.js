/**
 * Lesson 08-3: Модуль functools
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_3 = {
  lessonId: "lesson-08-3",
  moduleId: "module-08",
  order: 3,
  title: "Модуль functools",
  
  learningObjectives: [
    "Використовувати functools для роботи з функціями",
    "Застосовувати partial для часткового застосування",
    "Використовувати reduce для згортки послідовностей",
    "Застосовувати lru_cache для кешування результатів"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-08-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до модуля functools",
        content: `Модуль \`functools\` надає функції для роботи з функціями вищого порядку та функціонального програмування.

**Основні функції:**

1. **partial** — часткове застосування функції
2. **reduce** — згортка послідовності до одного значення
3. **lru_cache** — кешування результатів функції
4. **wraps** — збереження метаданих функції (для декораторів)

**Імпорт модуля:**

\`\`\`python
from functools import partial, reduce, lru_cache, wraps
\`\`\``
      },
      {
        title: "partial - часткове застосування",
        content: `\`partial\` дозволяє "зафіксувати" частину аргументів функції, створивши нову функцію з меншою кількістю параметрів.

**Базовий приклад:**

\`\`\`python
from functools import partial

def multiply(x, y):
    return x * y

# Створюємо нову функцію, де x завжди 2
double = partial(multiply, 2)
print(double(5))  # 10 (2 * 5)
print(double(7))  # 14 (2 * 7)
\`\`\`

**Практичний приклад: Функція з багатьма параметрами**

\`\`\`python
from functools import partial

def greet(greeting, name, punctuation):
    return f'{greeting}, {name}{punctuation}'

# Створюємо функцію з фіксованим привітанням
say_hello = partial(greet, 'Привіт', punctuation='!')
print(say_hello('Олександр'))  # Привіт, Олександр!

# Створюємо функцію з фіксованим ім'ям
greet_alex = partial(greet, name='Олександр', punctuation='!')
print(greet_alex('Вітаю'))  # Вітаю, Олександр!
\`\`\`

**Використання з функціями, які приймають функції:**

\`\`\`python
from functools import partial

# Функція для фільтрації
def is_greater_than(value, threshold):
    return value > threshold

# Створюємо функцію для перевірки "більше 10"
is_big = partial(is_greater_than, threshold=10)

numbers = [5, 15, 8, 20, 3, 12]
big_numbers = list(filter(is_big, numbers))
print(big_numbers)  # [15, 20, 12]
\`\`\`

**Переваги partial:**

- **Повторне використання** — можна створювати спеціалізовані функції
- **Читабельність** — код стає більш декларативним
- **Гнучкість** — можна комбінувати з іншими функціями`
      },
      {
        title: "reduce - згортка послідовності",
        content: `\`reduce\` згортає послідовність до одного значення, застосовуючи функцію послідовно до елементів.

**Синтаксис:**

\`\`\`python
from functools import reduce

reduce(функція, послідовність, початкове_значення)
\`\`\`

**Базовий приклад: Сума чисел**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Сума всіх чисел
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

# З початковим значенням
total = reduce(lambda x, y: x + y, numbers, 10)
print(total)  # 25 (10 + 15)
\`\`\`

**Приклад: Добуток чисел**

\`\`\`python
from functools import reduce

numbers = [2, 3, 4]

# Добуток
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 24 (2 * 3 * 4)
\`\`\`

**Приклад: Пошук максимуму**

\`\`\`python
from functools import reduce

numbers = [3, 7, 2, 9, 1]

# Максимум
maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(maximum)  # 9
\`\`\`

**Приклад: Об'єднання рядків**

\`\`\`python
from functools import reduce

words = ['Python', 'is', 'great']

# Об'єднання з пробілами
sentence = reduce(lambda x, y: x + ' ' + y, words)
print(sentence)  # Python is great
\`\`\`

**Практичний приклад: Обчислення факторіалу**

\`\`\`python
from functools import reduce

def factorial(n):
    return reduce(lambda x, y: x * y, range(1, n + 1))

print(factorial(5))  # 120 (1 * 2 * 3 * 4 * 5)
\`\`\`

**Важливо:** У Python 3+ reduce переміщено в модуль functools. У Python 2 він був вбудованою функцією.`
      },
      {
        title: "lru_cache - кешування результатів",
        content: `\`lru_cache\` (Least Recently Used cache) — декоратор для кешування результатів функції. Це дозволяє уникнути повторних обчислень.

**Базовий приклад:**

\`\`\`python
from functools import lru_cache
import time

@lru_cache(maxsize=128)
def slow_function(n):
    time.sleep(0.1)  # Симуляція важкого обчислення
    return n * 2

# Перший виклик — повільний
start = time.time()
result1 = slow_function(5)
print(f'Час: {time.time() - start:.2f}с')  # ~0.1с

# Другий виклик з тим самим аргументом — швидкий (з кешу)
start = time.time()
result2 = slow_function(5)
print(f'Час: {time.time() - start:.2f}с')  # ~0.00с
\`\`\`

**Параметри lru_cache:**

- **maxsize** — максимальна кількість результатів у кеші (None = без обмежень)
- **typed** — чи розрізняти різні типи (True/False)

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=32)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Без кешування це було б дуже повільно!
print(fibonacci(35))  # Швидко завдяки кешуванню
\`\`\`

**Перевірка статистики кешу:**

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)
def cached_function(n):
    return n * 2

cached_function(5)
cached_function(10)

# Статистика кешу
print(cached_function.cache_info())
# CacheInfo(hits=0, misses=2, maxsize=128, currsize=2)
\`\`\`

**Очищення кешу:**

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)
def cached_function(n):
    return n * 2

cached_function(5)
cached_function.cache_clear()  # Очищаємо кеш
\`\`\`

**Коли використовувати lru_cache:**

- Функції з важкими обчисленнями
- Функції, які викликаються з тими самими аргументами
- Рекурсивні функції (як fibonacci)
- Функції, які роблять запити до бази даних або API`
      },
      {
        title: "wraps - збереження метаданих",
        content: `\`wraps\` — декоратор для збереження метаданих оригінальної функції при створенні декораторів.

**Проблема без wraps:**

\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Функція привітання"""
    return f'Привіт, {name}!'

print(greet.__name__)  # wrapper (не greet!)
print(greet.__doc__)   # None (не "Функція привітання"!)
\`\`\`

**Рішення з wraps:**

\`\`\`python
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Функція привітання"""
    return f'Привіт, {name}!'

print(greet.__name__)  # greet ✓
print(greet.__doc__)   # Функція привітання ✓
\`\`\`

**Практичний приклад: Декоратор з логуванням**

\`\`\`python
from functools import wraps

def log_function(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f'Викликається {func.__name__}')
        result = func(*args, **kwargs)
        print(f'{func.__name__} завершено')
        return result
    return wrapper

@log_function
def calculate(x, y):
    """Обчислює суму двох чисел"""
    return x + y

print(calculate.__name__)  # calculate
print(calculate.__doc__)   # Обчислює суму двох чисел
\`\`\``
      },
      {
        title: "Комбінування функцій functools",
        content: `Можна комбінувати різні функції functools для складних задач.

**Приклад: Кешована функція з partial**

\`\`\`python
from functools import lru_cache, partial

@lru_cache(maxsize=128)
def power(base, exponent):
    return base ** exponent

# Створюємо функцію для квадратів
square = partial(power, exponent=2)

print(square(5))  # 25
print(square(5))  # Швидко з кешу!
\`\`\`

**Приклад: reduce з lambda та partial**

\`\`\`python
from functools import reduce, partial

# Функція для множення
multiply = lambda x, y: x * y

# Обчислюємо факторіал
def factorial(n):
    return reduce(multiply, range(1, n + 1))

print(factorial(5))  # 120
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили модуль functools:

**Ключові функції:**

1. **partial** — часткове застосування функції
2. **reduce** — згортка послідовності до одного значення
3. **lru_cache** — кешування результатів функції
4. **wraps** — збереження метаданих у декораторах

**Переваги:**

- **Ефективність** — кешування та оптимізація
- **Гнучкість** — часткове застосування
- **Функціональне програмування** — reduce для згортки

**Коли використовувати:**

- **partial** — коли потрібно створити спеціалізовану функцію
- **reduce** — коли потрібно згорнути послідовність
- **lru_cache** — коли функція викликається з тими самими аргументами
- **wraps** — завжди в декораторах для збереження метаданих

**Наступний крок:**

У наступному уроці ми вивчимо роботу з JSON для зберігання та обміну даними.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: partial для спеціалізації",
      code: `from functools import partial

def multiply(x, y):
    return x * y

double = partial(multiply, 2)
print(double(5))  # 10`,
      explanation: "Використовуємо partial для створення функції double, яка завжди множить на 2."
    },
    {
      title: "Приклад 2: reduce для суми",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15`,
      explanation: "Використовуємо reduce для обчислення суми всіх чисел у списку."
    },
    {
      title: "Приклад 3: lru_cache для оптимізації",
      code: `from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(35))  # Швидко завдяки кешуванню`,
      explanation: "Використовуємо lru_cache для кешування результатів рекурсивної функції fibonacci."
    },
    {
      title: "Приклад 4: wraps для декораторів",
      code: `from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Привітати когось"""
    return f'Привіт, {name}!'

print(greet.__name__)  # greet`,
      explanation: "Використовуємо wraps для збереження метаданих оригінальної функції в декораторі."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути імпортувати reduce з functools",
      explanation: "У Python 3+ reduce не є вбудованою функцією, потрібно імпортувати з functools.",
      correctApproach: "Завжди імпортуйте: from functools import reduce"
    },
    {
      mistake: "Використання lru_cache для функцій з нехешованими аргументами",
      explanation: "lru_cache працює тільки з хешованими аргументами (числа, рядки, кортежі).",
      correctApproach: "Не використовуйте lru_cache для функцій, які приймають списки або словники як аргументи."
    },
    {
      mistake: "Забути використати wraps у декораторах",
      explanation: "Без wraps декоратор втрачає метадані оригінальної функції (ім'я, docstring).",
      correctApproach: "Завжди використовуйте @wraps(func) у декораторах."
    }
  ],
  
  summary: `На цьому уроці ми вивчили модуль functools:

1. **partial** — часткове застосування функції
2. **reduce** — згортка послідовності
3. **lru_cache** — кешування результатів
4. **wraps** — збереження метаданих

functools допомагає писати більш ефективний та функціональний код!`,
  
  practiceTask: {
    title: "Створення кешованого калькулятора",
    description: "Використайте lru_cache та partial для створення ефективного калькулятора",
    problemStatement: `Створіть систему обчислень:
1. Створіть функцію power(base, exponent) з кешуванням
2. Використайте partial для створення функцій square та cube
3. Обчисліть квадрати та куби чисел від 1 до 10
4. Покажіть статистику кешу

Функції:
- square(n) = n²
- cube(n) = n³`,
    inputFormat: "Числа від 1 до 10",
    outputFormat: `Квадрати: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Куби: [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]
Статистика кешу: CacheInfo(hits=..., misses=...)`,
    examples: [
      {
        input: "numbers = [1, 2, 3]",
        output: `Квадрати: [1, 4, 9]
Куби: [1, 8, 27]`,
        explanation: "Використовуємо lru_cache для кешування та partial для створення спеціалізованих функцій."
      }
    ],
    solution: {
      code: `from functools import lru_cache, partial

@lru_cache(maxsize=128)
def power(base, exponent):
    return base ** exponent

# Створюємо спеціалізовані функції
square = partial(power, exponent=2)
cube = partial(power, exponent=3)

# Обчислюємо квадрати та куби
numbers = list(range(1, 11))
squares = [square(n) for n in numbers]
cubes = [cube(n) for n in numbers]

print(f'Квадрати: {squares}')
print(f'Куби: {cubes}')
print(f'Статистика кешу: {power.cache_info()}')`,
      explanation: "Використовуємо lru_cache для кешування результатів power та partial для створення square та cube."
    },
    hints: [
      "Використайте @lru_cache для функції power",
      "Використайте partial для створення square та cube",
      "Використайте list comprehension для обчислення",
      "Перевірте статистику кешу через cache_info()"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить partial?",
        options: [
          "Частково застосовує функцію, фіксуючи частину аргументів",
          "Кешує результати функції",
          "Згортає послідовність",
          "Зберігає метадані"
        ],
        correctAnswer: 0,
        explanation: "partial дозволяє зафіксувати частину аргументів функції, створивши нову функцію."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить reduce?",
        options: [
          "Згортає послідовність до одного значення",
          "Кешує результати",
          "Частково застосовує функцію",
          "Фільтрує елементи"
        ],
        correctAnswer: 0,
        explanation: "reduce згортає послідовність, застосовуючи функцію послідовно до елементів."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чому потрібен wraps у декораторах?",
        options: [
          "Для кешування",
          "Для збереження метаданих оригінальної функції",
          "Для часткового застосування",
          "Для згортки"
        ],
        correctAnswer: 1,
        explanation: "wraps зберігає метадані (ім'я, docstring) оригінальної функції в декораторі."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає LRU в lru_cache?",
        options: [
          "Least Recently Used",
          "Last Recorded Update",
          "Least Required Usage",
          "Last Recent Update"
        ],
        correctAnswer: 0,
        explanation: "LRU означає Least Recently Used — найменш нещодавно використаний."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У Python 3+ reduce є вбудованою функцією.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. У Python 3+ reduce переміщено в модуль functools, потрібно імпортувати."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
