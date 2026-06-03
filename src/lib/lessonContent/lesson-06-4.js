/**
 * Lesson 06-4: Практика: задачі з декораторами
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_4 = {
  lessonId: "lesson-06-4",
  moduleId: "module-06",
  order: 4,
  title: "Практика: задачі з декораторами",
  
  learningObjectives: [
    "Закріпити знання про декоратори",
    "Створювати складні декоратори",
    "Комбінувати різні декоратори",
    "Розв'язувати практичні задачі"
  ],
  
  prerequisites: ["lesson-06-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого",
        content: `На цьому уроці ми закріпимо всі знання з модуля 06 про декоратори:

Що ми вивчили:
1. Вступ до декораторів - що таке декоратори та як їх використовувати
2. Створення власних декораторів - functools.wraps, декоратори з параметрами
3. Декоратори класів та методів - @property, @staticmethod, @classmethod
4. Практичні приклади - логування, вимірювання часу, валідація

Мета цього уроку:
- Об'єднати всі концепції
- Створити складніші декоратори
- Розв'язати практичні задачі
- Покращити навички програмування`
      },
      {
        title: "Задача 1: Декоратор для повторення виконання",
        content: `**Завдання:** Створіть декоратор, який повторює виконання функції задану кількість разів.

**Рішення:**

\`\`\`python
from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                result = func(*args, **kwargs)
                results.append(result)
            return results[-1]  # Повертаємо останній результат
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f'Привіт, {name}!')
    return f'Привіт, {name}!'

greet('Олександр')
# Привіт, Олександр!
# Привіт, Олександр!
# Привіт, Олександр!
\`\`\`

**Покращена версія з можливістю повернути всі результати:**

\`\`\`python
def repeat(times, return_all=False):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                result = func(*args, **kwargs)
                results.append(result)
            return results if return_all else results[-1]
        return wrapper
    return decorator
\`\`\``
      },
      {
        title: "Задача 2: Декоратор для обробки помилок",
        content: `**Завдання:** Створіть декоратор, який обробляє помилки та повторює виконання при невдачі.

**Рішення:**

\`\`\`python
from functools import wraps
import time

def retry(max_attempts=3, delay=1, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts:
                        print(f'Спроба {attempt} невдала: {e}. Повтор через {delay}с...')
                        time.sleep(delay)
                    else:
                        print(f'Всі {max_attempts} спроби невдалі')
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
def risky_function():
    import random
    if random.random() < 0.7:  # 70% шанс помилки
        raise ValueError('Випадкова помилка!')
    return 'Успіх!'

result = risky_function()
print(result)
\`\`\``
      },
      {
        title: "Задача 3: Декоратор для кешування результатів",
        content: `**Завдання:** Створіть декоратор для кешування результатів функцій (мемоізація).

**Рішення:**

\`\`\`python
from functools import wraps

def cache(func):
    cache_dict = {}
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Створюємо ключ з аргументів
        key = str(args) + str(sorted(kwargs.items()))
        
        if key in cache_dict:
            print(f'Використовуємо кеш для {func.__name__}')
            return cache_dict[key]
        
        result = func(*args, **kwargs)
        cache_dict[key] = result
        print(f'Обчислено та збережено в кеш для {func.__name__}')
        return result
    
    # Додаємо метод для очищення кешу
    wrapper.clear_cache = lambda: cache_dict.clear()
    wrapper.cache_info = lambda: {
        'size': len(cache_dict),
        'keys': list(cache_dict.keys())
    }
    
    return wrapper

@cache
def fibonacci(n):
    """Обчислює n-те число Фібоначчі"""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # Обчислює
print(fibonacci(10))  # Використовує кеш
print(fibonacci.cache_info())  # Інформація про кеш
\`\`\``
      },
      {
        title: "Задача 4: Декоратор для обмеження швидкості викликів",
        content: `**Завдання:** Створіть декоратор, який обмежує кількість викликів функції за певний час.

**Рішення:**

\`\`\`python
from functools import wraps
import time
from collections import deque

def rate_limit(max_calls, period):
    """Обмежує кількість викликів за період часу"""
    def decorator(func):
        calls = deque()
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Видаляємо старі виклики
            while calls and calls[0] < now - period:
                calls.popleft()
            
            if len(calls) >= max_calls:
                wait_time = period - (now - calls[0])
                raise Exception(f'Перевищено ліміт. Зачекайте {wait_time:.2f} секунд')
            
            calls.append(now)
            return func(*args, **kwargs)
        
        return wrapper
    return decorator

@rate_limit(max_calls=3, period=10)
def api_call():
    print('API виклик виконано')
    return 'Success'

# Перші 3 виклики працюють
for i in range(3):
    api_call()

# 4-й виклик викличе помилку
try:
    api_call()
except Exception as e:
    print(e)
\`\`\``
      },
      {
        title: "Задача 5: Комбінування декораторів",
        content: `**Завдання:** Створіть функцію з кількома декораторами для комплексної обробки.

**Рішення:**

\`\`\`python
from functools import wraps
import time
import datetime

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f'[{timestamp}] Викликається {func.__name__}')
        result = func(*args, **kwargs)
        print(f'[{timestamp}] {func.__name__} завершено')
        return result
    return wrapper

def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'{func.__name__} виконався за {end - start:.4f} секунд')
        return result
    return wrapper

def cache(func):
    cache_dict = {}
    @wraps(func)
    def wrapper(*args, **kwargs):
        key = str(args) + str(sorted(kwargs.items()))
        if key in cache_dict:
            print(f'Використовується кеш для {func.__name__}')
            return cache_dict[key]
        result = func(*args, **kwargs)
        cache_dict[key] = result
        return result
    return wrapper

@log_calls
@measure_time
@cache
def expensive_calculation(n):
    """Обчислює суму квадратів"""
    return sum(i ** 2 for i in range(n))

result1 = expensive_calculation(1000000)  # Обчислює, логує, вимірює
result2 = expensive_calculation(1000000)  # Використовує кеш, логує
\`\`\`

**Порядок виконання:**
1. Спочатку застосовується @cache (найближчий до функції)
2. Потім @measure_time
3. Потім @log_calls (найдальший)
4. При виклику: спочатку log, потім measure, потім cache, потім функція`
      },
      {
        title: "Практичні поради",
        content: `**Коли використовувати декоратори:**

1. **Логування** - коли потрібно відстежувати виклики функцій
2. **Вимірювання продуктивності** - для оптимізації коду
3. **Кешування** - для дорогих обчислень
4. **Валідація** - для перевірки вхідних даних
5. **Обробка помилок** - для централізованої обробки
6. **Авторизація** - для перевірки прав доступу
7. **Обмеження швидкості** - для API та веб-додатків

**Найкращі практики:**

 Завжди використовуйте \`@wraps(func)\` для збереження метаданих
 Документуйте декоратори
 Обробляйте помилки у декораторах
 Використовуйте *args та **kwargs для гнучкості
 Тестуйте декоратори окремо
 Не робіть декоратори занадто складними

**Уникайте:**

 Декораторів, які змінюють сигнатуру функції
 Декораторів з побічними ефектами (якщо не потрібно)
 Занадто багатьох вкладених декораторів
 Декораторів без документації`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Комплексний декоратор",
      code: `from functools import wraps
import time

def smart_decorator(log=True, measure=True):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if log:
                print(f'Викликається {func.__name__}')
            if measure:
                start = time.time()
            
            result = func(*args, **kwargs)
            
            if measure:
                end = time.time()
                print(f'Виконано за {end - start:.4f}с')
            return result
        return wrapper
    return decorator

@smart_decorator(log=True, measure=True)
def calculate(n):
    return sum(range(n))

calculate(1000000)`,
      explanation: "Демонструє декоратор з параметрами для гнучкого налаштування поведінки."
    },
    {
      title: "Приклад 2: Декоратор з обробкою помилок",
      code: `from functools import wraps

def handle_errors(default_value=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                print(f'Помилка у {func.__name__}: {e}')
                return default_value
        return wrapper
    return decorator

@handle_errors(default_value=0)
def divide(a, b):
    return a / b

print(divide(10, 2))  # 5.0
print(divide(10, 0))   # 0 (повертає default_value)`,
      explanation: "Показує декоратор для обробки помилок з значенням за замовчуванням."
    },
    {
      title: "Приклад 3: Декоратор для класу",
      code: `def add_repr(cls):
    def __repr__(self):
        attrs = ', '.join(f'{k}={v}' for k, v in self.__dict__.items())
        return f'{self.__class__.__name__}({attrs})'
    
    cls.__repr__ = __repr__
    return cls

@add_repr
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person('Олександр', 15)
print(p)  # Person(name=Олександр, age=15)`,
      explanation: "Демонструє декоратор, який додає метод __repr__ до класу."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати @wraps у складних декораторах",
      explanation: "Без @wraps функція втрачає метадані, що ускладнює відлагодження.",
      correctApproach: "Завжди використовуйте @wraps(func) у всіх декораторах."
    },
    {
      mistake: "Забувати повертати результат у wrapper",
      explanation: "Якщо wrapper не повертає результат func(), функція поверне None.",
      correctApproach: "Завжди повертайте результат: return func(*args, **kwargs)"
    },
    {
      mistake: "Не обробляти помилки у декораторах",
      explanation: "Помилки у декораторах можуть приховати реальні помилки функції.",
      correctApproach: "Обробляйте помилки обережно, не приховуючи важливі винятки."
    },
    {
      mistake: "Занадто складні декоратори",
      explanation: "Складні декоратори важко тестувати та підтримувати.",
      correctApproach: "Розбивайте складні декоратори на простіші або використовуйте композицію."
    }
  ],
  
  summary: `На цьому практичному уроці ми:

1. Закріпили знання - повторили всі концепції декораторів
2. Створили складні декоратори - repeat, retry, cache, rate_limit
3. Комбінували декоратори - логування, вимірювання, кешування
4. Розв'язали практичні задачі - реальні сценарії використання
5. Вивчили найкращі практики - коли та як використовувати декоратори

Тепер ви впевнено можете створювати та використовувати декоратори у своїх проектах!`,
  
  practiceTask: {
    title: "Створення простих декораторів",
    description: "Створіть два простих декоратори для логування та авторизації",
    problemStatement: `Створіть два простих декоратори:

1. **@log_function** - логує виклик функції з її ім'ям та часом
2. **@require_auth** - перевіряє, чи користувач авторизований (симуляція)

**Крок 1:** Створіть декоратор @log_function, який:
- Виводить повідомлення перед викликом функції
- Виводить повідомлення після виклику функції
- Показує ім'я функції та час

**Крок 2:** Створіть декоратор @require_auth, який:
- Перевіряє глобальну змінну is_authenticated
- Якщо False, виводить повідомлення "Потрібна авторизація!" та не викликає функцію
- Якщо True, викликає функцію нормально

**Крок 3:** Створіть дві функції:
- get_secret_data() - потребує авторизації, повертає "Секретні дані"
- get_public_data() - публічна, повертає "Публічні дані"

**Крок 4:** Протестуйте:
- Викликайте get_secret_data() без авторизації (має вивести повідомлення)
- Встановіть is_authenticated = True
- Викликайте get_secret_data() знову (має працювати)
- Викликайте get_public_data() (має працювати завжди)`,
    outputFormat: `Приклад виводу програми:
=== Тест 1: Без авторизації ===
[10:30:45] Викликається get_secret_data
Потрібна авторизація!
Результат: None

=== Тест 2: З авторизацією ===
[10:30:46] Викликається get_secret_data
[10:30:46] get_secret_data завершено
Результат: Секретні дані

=== Тест 3: Публічна функція ===
[10:30:47] Викликається get_public_data
[10:30:47] get_public_data завершено
Результат: Публічні дані`,
    validation: {
      exactLineCount: true,
      lineRules: [
        { pattern: /=== тест 1: без авторизації ===/ },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] викликається get_secret_data/ },
        { pattern: /потрібна авторизація!/ },
        { pattern: /результат: none/ },
        { pattern: /=== тест 2: з авторизацією ===/ },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] викликається get_secret_data/ },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] get_secret_data завершено/ },
        { pattern: /результат: секретні дані/ },
        { pattern: /=== тест 3: публічна функція ===/ },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] викликається get_public_data/ },
        { pattern: /\[\d{2}:\d{2}:\d{2}\] get_public_data завершено/ },
        { pattern: /результат: публічні дані/ }
      ]
    },
    examples: [
      {
        output: `=== Тест 1: Без авторизації ===
[10:30:45] Викликається get_secret_data
Потрібна авторизація!
Результат: None

=== Тест 2: З авторизацією ===
[10:30:46] Викликається get_secret_data
[10:30:46] get_secret_data завершено
Результат: Секретні дані

=== Тест 3: Публічна функція ===
[10:30:47] Викликається get_public_data
[10:30:47] get_public_data завершено
Результат: Публічні дані`,
        explanation: "Повний вивід програми з усіма тестами. Зверніть увагу: коли функція блокується через відсутність авторизації, повідомлення 'завершено' не виводиться."
      }
    ],
    solution: {
      code: `from functools import wraps
import datetime

# Глобальна змінна для авторизації
is_authenticated = False

def require_auth(func):
    """Перевіряє авторизацію"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        global is_authenticated
        if not is_authenticated:
            print("Потрібна авторизація!")
            return None
        return func(*args, **kwargs)
    return wrapper

def log_function(func):
    """Логує виклик функції"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Отримуємо поточний час
        time_str = datetime.datetime.now().strftime("%H:%M:%S")
        
        # Логуємо перед викликом
        print(f"[{time_str}] Викликається {func.__name__}")
        
        # Викликаємо функцію
        result = func(*args, **kwargs)
        
        # Логуємо після виклику тільки якщо функція реально виконалася
        # (якщо result не None, значить функція виконалася)
        if result is not None:
            time_str = datetime.datetime.now().strftime("%H:%M:%S")
            print(f"[{time_str}] {func.__name__} завершено")
        
        return result
    return wrapper

# Створюємо функції з декораторами
# Важливо: require_auth має бути всередині log_function
@log_function
@require_auth
def get_secret_data():
    return "Секретні дані"

@log_function
def get_public_data():
    return "Публічні дані"

# Тестування
print("=== Тест 1: Без авторизації ===")
result = get_secret_data()
print(f"Результат: {result}")
print()
print("=== Тест 2: З авторизацією ===")
is_authenticated = True
result = get_secret_data()
print(f"Результат: {result}")
print()
print("=== Тест 3: Публічна функція ===")
result = get_public_data()
print(f"Результат: {result}")`,
      explanation: "Простий приклад двох декораторів: один для логування, інший для перевірки авторизації. Порядок декораторів важливий: @log_function зовні, @require_auth всередині. Використовуємо @wraps для збереження метаданих функції."
    },
    hints: [
      "Почніть з простого декоратора @log_function - він просто виводить повідомлення до та після виклику",
      "Для @require_auth використовуйте global is_authenticated для доступу до глобальної змінної",
      "Якщо авторизація не пройдена, просто виведіть повідомлення та поверніть None",
      "Не забудьте використати @wraps(func) в обох декораторах",
      "Можна застосувати обидва декоратори до однієї функції: @log_function @require_auth"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка основна мета використання декораторів?",
        options: [
          "Збільшити швидкість",
          "Додати функціональність без зміни коду",
          "Зменшити розмір коду",
          "Видалити функції"
        ],
        correctAnswer: 1,
        explanation: "Основна мета декораторів - додати функціональність до функцій без зміни їх оригінального коду."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить @wraps у декораторі?",
        options: [
          "Прискорює функцію",
          "Зберігає метадані оригінальної функції",
          "Видаляє функцію",
          "Кешує результати"
        ],
        correctAnswer: 1,
        explanation: "@wraps зберігає ім'я, документацію та інші метадані оригінальної функції."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як створити декоратор, який приймає параметри?",
        options: [
          "def decorator(param): return func",
          "Потрібна додаткова обгортка",
          "Неможливо",
          "Використати lambda"
        ],
        correctAnswer: 1,
        explanation: "Потрібна додаткова обгортка: функція, яка приймає параметри та повертає декоратор."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "У якому порядку виконуються декоратори @decorator1 @decorator2?",
        options: [
          "decorator1, потім decorator2, потім функція",
          "decorator2, потім decorator1, потім функція",
          "Одночасно",
          "Випадковий"
        ],
        correctAnswer: 0,
        explanation: "Декоратори виконуються зверху вниз: спочатку decorator1, потім decorator2, потім функція."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке мемоізація?",
        options: [
          "Кешування результатів функцій",
          "Видалення функцій",
          "Оптимізація пам'яті",
          "Шифрування"
        ],
        correctAnswer: 0,
        explanation: "Мемоізація - це техніка кешування результатів функцій для уникнення повторних обчислень."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Декоратори можна застосовувати тільки до функцій.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Декоратори можна застосовувати до функцій, методів та класів."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
