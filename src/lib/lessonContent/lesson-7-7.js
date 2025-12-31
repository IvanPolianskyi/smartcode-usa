/**
 * Lesson 7-7: functools
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_7 = {
  lessonId: "lesson-7-7",
  moduleId: "module-7",
  order: 7,
  title: "functools",
  
  learningObjectives: [
    "Використовувати functools для функцій",
    "Застосовувати декоратори",
    "Використовувати partial та reduce",
    "Кешувати результати функцій",
    "Розуміти переваги functools"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-7-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке functools?",
        content: `**functools** — модуль для роботи з функціями та функціональним програмуванням.

**Імпорт:**
\`\`\`python
from functools import partial, reduce, lru_cache, wraps
\`\`\`

**Основні функції:**
- \`partial()\` — часткове застосування функції
- \`reduce()\` — зведення послідовності до одного значення
- \`lru_cache()\` — кешування результатів
- \`wraps()\` — збереження метаданих функції

**Переваги:**
- ✅ Оптимізація функцій
- ✅ Кешування результатів
- ✅ Функціональне програмування`
      },
      {
        title: "partial — часткове застосування",
        content: `**partial()** — створює нову функцію з частково застосованими аргументами.

**Приклад:**
\`\`\`python
from functools import partial

def multiply(x, y):
    return x * y

# Створюємо нову функцію з фіксованим першим аргументом
double = partial(multiply, 2)
print(double(5))  # 10 (2 * 5)

triple = partial(multiply, 3)
print(triple(5))  # 15 (3 * 5)
\`\`\`

**Практичний приклад:**
\`\`\`python
from functools import partial

def power(base, exponent):
    return base ** exponent

# Функція для квадрата
square = partial(power, exponent=2)
print(square(5))  # 25

# Функція для куба
cube = partial(power, exponent=3)
print(cube(5))  # 125
\`\`\`

**З функціями з багатьма параметрами:**
\`\`\`python
from functools import partial

def greet(greeting, name, punctuation):
    return f"{greeting}, {name}{punctuation}"

# Фіксуємо greeting та punctuation
say_hello = partial(greet, "Привіт", punctuation="!")
print(say_hello("Олександр"))  # Привіт, Олександр!
\`\`\``
      },
      {
        title: "reduce — зведення послідовності",
        content: `**reduce()** — зводить послідовність до одного значення.

**Синтаксис:**
\`\`\`python
from functools import reduce

reduce(function, sequence, initial)
\`\`\`

**Приклади:**
\`\`\`python
from functools import reduce

# Сума чисел
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

# З початковим значенням
total = reduce(lambda x, y: x + y, numbers, 10)
print(total)  # 25 (10 + 15)

# Добуток
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# Максимум
maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(maximum)  # 5
\`\`\`

**Порівняння з циклом:**
\`\`\`python
from functools import reduce

# З reduce
total = reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])

# Еквівалентний цикл
total = 0
for num in [1, 2, 3, 4, 5]:
    total += num
\`\`\``
      },
      {
        title: "lru_cache — кешування",
        content: `**lru_cache()** — кешує результати функції (Least Recently Used).

**Приклад:**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Перший виклик — обчислює
print(fibonacci(30))  # Обчислює

# Другий виклик — з кешу
print(fibonacci(30))  # Швидко з кешу!
\`\`\`

**Без кешування (повільно):**
\`\`\`python
def fibonacci_slow(n):
    if n < 2:
        return n
    return fibonacci_slow(n-1) + fibonacci_slow(n-2)

# Дуже повільно для великих n
\`\`\`

**З кешуванням (швидко):**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)  # Необмежений кеш
def fibonacci_fast(n):
    if n < 2:
        return n
    return fibonacci_fast(n-1) + fibonacci_fast(n-2)

# Швидко навіть для великих n
\`\`\`

**Параметри:**
- \`maxsize\` — розмір кешу (None = необмежений)
- \`typed\` — чи розрізняти типи (True/False)`
      },
      {
        title: "wraps — збереження метаданих",
        content: `**wraps()** — зберігає метадані оригінальної функції в декораторі.

**Проблема без wraps:**
\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def my_function():
    """Ця функція робить щось."""
    pass

print(my_function.__name__)  # wrapper (не my_function!)
print(my_function.__doc__)   # None (втрачено!)
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
def my_function():
    """Ця функція робить щось."""
    pass

print(my_function.__name__)  # my_function (збережено!)
print(my_function.__doc__)   # Ця функція робить щось. (збережено!)
\`\`\`

**Приклад з декоратором:**
\`\`\`python
from functools import wraps
import time

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} виконано за {end - start:.4f} секунд")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(0.1)
    return "Готово"

slow_function()  # slow_function виконано за 0.1000 секунд
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Створення спеціалізованих функцій**
\`\`\`python
from functools import partial

def send_email(to, subject, body):
    print(f"Відправка email до {to}")
    print(f"Тема: {subject}")
    print(f"Тіло: {body}")

# Спеціалізовані функції
send_notification = partial(send_email, subject="Сповіщення")
send_alert = partial(send_email, subject="Тривога!")

send_notification("user@example.com", "Нове повідомлення")
send_alert("admin@example.com", "Помилка!")
\`\`\`

**Приклад 2: Обчислення статистики**
\`\`\`python
from functools import reduce

def calculate_stats(numbers):
    total = reduce(lambda x, y: x + y, numbers)
    count = len(numbers)
    average = total / count
    
    maximum = reduce(lambda x, y: x if x > y else y, numbers)
    minimum = reduce(lambda x, y: x if x < y else y, numbers)
    
    return {
        'total': total,
        'average': average,
        'max': maximum,
        'min': minimum
    }

stats = calculate_stats([1, 2, 3, 4, 5])
print(stats)
\`\`\`

**Приклад 3: Кешування складних обчислень**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=256)
def expensive_calculation(n):
    # Симуляція складного обчислення
    result = sum(i**2 for i in range(n))
    return result

# Перший виклик — обчислює
result1 = expensive_calculation(1000)

# Другий виклик — з кешу (швидко!)
result2 = expensive_calculation(1000)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: partial",
      code: `from functools import partial

def multiply(x, y):
    return x * y

double = partial(multiply, 2)
print(double(5))  # 10

triple = partial(multiply, 3)
print(triple(5))  # 15`,
      explanation: "Демонструє використання partial для створення спеціалізованих функцій."
    },
    {
      title: "Приклад 2: reduce",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]

total = reduce(lambda x, y: x + y, numbers)
print(f"Сума: {total}")

product = reduce(lambda x, y: x * y, numbers)
print(f"Добуток: {product}")`,
      explanation: "Показує використання reduce для зведення послідовності."
    },
    {
      title: "Приклад 3: lru_cache",
      code: `from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(30))  # Швидко завдяки кешуванню`,
      explanation: "Демонструє кешування результатів з lru_cache."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати wraps в декораторах",
      explanation: "Без wraps втрачаються метадані функції (__name__, __doc__), що ускладнює відлагодження.",
      correctApproach: "Завжди використовуйте @wraps(func) в декораторах для збереження метаданих."
    },
    {
      mistake: "Використання reduce замість вбудованих функцій",
      explanation: "Для простих операцій (sum, max, min) краще використовувати вбудовані функції.",
      correctApproach: "Використовуйте reduce для складних операцій, sum/max/min для простих."
    },
    {
      mistake: "Занадто великий maxsize в lru_cache",
      explanation: "Занадто великий кеш може споживати багато пам'яті.",
      correctApproach: "Встановлюйте розумний maxsize (128, 256) або None для необмеженого, якщо потрібно."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **functools** — модуль для роботи з функціями
2. **partial()** — часткове застосування функції
3. **reduce()** — зведення послідовності до одного значення
4. **lru_cache()** — кешування результатів функції
5. **wraps()** — збереження метаданих функції

**Переваги:**
- Оптимізація функцій
- Кешування результатів
- Функціональне програмування
- Збереження метаданих

**Коли використовувати:**
- partial — для створення спеціалізованих функцій
- reduce — для зведення послідовності
- lru_cache — для кешування складних обчислень
- wraps — завжди в декораторах

**Важливо:**
- Використовуйте wraps в декораторах
- reduce для складних операцій, sum/max/min для простих
- Розумний maxsize для lru_cache

functools — потужний інструмент для оптимізації та роботи з функціями!`,
  
  practiceTask: {
    title: "Створення оптимізованих функцій",
    description: "Створіть функції з використанням functools",
    problemStatement: `Створіть набір оптимізованих функцій з використанням functools:

**Функції:**
1. Створіть функції з partial:
   - power_of_2(n) — обчислює 2^n
   - power_of_3(n) — обчислює 3^n
   - greet_hello(name) — привітання "Привіт, [name]!"
   - greet_goodbye(name) — прощання "До побачення, [name]!"

2. Створіть функції з reduce:
   - calculate_sum(numbers) — сума чисел
   - calculate_product(numbers) — добуток чисел
   - find_max(numbers) — максимум
   - concatenate_strings(strings) — об'єднання рядків

3. Створіть функції з lru_cache:
   - cached_factorial(n) — факторіал з кешуванням
   - cached_power(base, exponent) — степінь з кешуванням

4. Створіть декоратор з wraps:
   - @count_calls — підраховує кількість викликів функції
   - Зберігає метадані оригінальної функції

**Створіть функції та продемонструйте роботу.**`,
    inputFormat: "Створіть модуль з функціями",
    outputFormat: `Приклад виведення:
=== partial ===
2^5 = 32
3^5 = 243
Привіт, Олександр!

=== reduce ===
Сума: 15
Добуток: 120
Максимум: 5

=== lru_cache ===
Факторіал 10: 3628800 (з кешу)

=== Декоратор ===
Функція викликана 3 рази`,
    examples: [
      {
        input: "Використання функцій",
        output: "Всі функції працюють коректно",
        explanation: "Демонстрація functools"
      }
    ],
    solution: {
      code: `from functools import partial, reduce, lru_cache, wraps

# ===== PARTIAL =====
def power(base, exponent):
    """Піднесення до степеня."""
    return base ** exponent

power_of_2 = partial(power, 2)
power_of_3 = partial(power, 3)

def greet(greeting, name):
    """Привітання."""
    return f"{greeting}, {name}!"

greet_hello = partial(greet, "Привіт")
greet_goodbye = partial(greet, "До побачення")

# ===== REDUCE =====
def calculate_sum(numbers):
    """Обчислює суму чисел."""
    return reduce(lambda x, y: x + y, numbers)

def calculate_product(numbers):
    """Обчислює добуток чисел."""
    return reduce(lambda x, y: x * y, numbers)

def find_max(numbers):
    """Знаходить максимум."""
    return reduce(lambda x, y: x if x > y else y, numbers)

def concatenate_strings(strings):
    """Об'єднує рядки."""
    return reduce(lambda x, y: x + " " + y, strings)

# ===== LRU_CACHE =====
@lru_cache(maxsize=128)
def cached_factorial(n):
    """Обчислює факторіал з кешуванням."""
    if n <= 1:
        return 1
    return n * cached_factorial(n - 1)

@lru_cache(maxsize=256)
def cached_power(base, exponent):
    """Обчислює степінь з кешуванням."""
    return base ** exponent

# ===== ДЕКОРАТОР З WRAPS =====
def count_calls(func):
    """Декоратор для підрахунку викликів."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.call_count += 1
        return func(*args, **kwargs)
    wrapper.call_count = 0
    return wrapper

@count_calls
def example_function(x):
    """Приклад функції."""
    return x * 2

def демонстрація():
    """Демонстрація роботи функцій."""
    print("=== partial ===\\n")
    print(f"2^5 = {power_of_2(5)}")
    print(f"3^5 = {power_of_3(5)}")
    print(greet_hello("Олександр"))
    print(greet_goodbye("Олександр"))
    
    print("\\n=== reduce ===\\n")
    numbers = [1, 2, 3, 4, 5]
    print(f"Сума: {calculate_sum(numbers)}")
    print(f"Добуток: {calculate_product(numbers)}")
    print(f"Максимум: {find_max(numbers)}")
    
    strings = ["Привіт", "світ", "Python"]
    print(f"Об'єднання: {concatenate_strings(strings)}")
    
    print("\\n=== lru_cache ===\\n")
    # Перший виклик — обчислює
    result1 = cached_factorial(10)
    print(f"Факторіал 10: {result1} (обчислено)")
    
    # Другий виклик — з кешу
    result2 = cached_factorial(10)
    print(f"Факторіал 10: {result2} (з кешу)")
    
    print(f"2^10 = {cached_power(2, 10)}")
    print(f"3^5 = {cached_power(3, 5)}")
    
    print("\\n=== Декоратор ===\\n")
    example_function(5)
    example_function(10)
    example_function(15)
    print(f"Функція {example_function.__name__} викликана {example_function.call_count} разів")
    print(f"Документація: {example_function.__doc__}")

if __name__ == "__main__":
    демонстрація()`,
      explanation: "Рішення демонструє використання всіх основних функцій functools."
    },
    hints: [
      "Використовуйте partial для створення спеціалізованих функцій",
      "Використовуйте reduce для зведення послідовності",
      "Використовуйте @lru_cache для кешування",
      "Використовуйте @wraps в декораторах"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке partial?",
        options: ["Декоратор", "Часткове застосування функції", "Кешування", "Зведення"],
        correctAnswer: 1,
        explanation: "partial створює нову функцію з частково застосованими аргументами."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: from functools import reduce; print(reduce(lambda x,y: x+y, [1,2,3]))?",
        options: ["6", "Помилку", "None", "3"],
        correctAnswer: 0,
        explanation: "reduce зводить послідовність [1,2,3] до суми: 1+2+3=6."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого використовується wraps?",
        options: ["Кешування", "Збереження метаданих функції", "Зведення", "Часткове застосування"],
        correctAnswer: 1,
        explanation: "wraps зберігає метадані (__name__, __doc__) оригінальної функції в декораторі."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

