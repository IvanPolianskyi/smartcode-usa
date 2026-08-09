/**
 * Lesson 03-10: Практика написання функцій
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_10 = {
  lessonId: "lesson-03-10",
  moduleId: "module-03",
  order: 10,
  title: "Практика: написання функцій",
  
  learningObjectives: [
    "Закріпити всі вивчені концепції про функції",
    "Створювати складні функції для реальних задач",
    "Застосовувати різні техніки програмування",
    "Практикуватися у написанні чистого коду",
    "Готуватися до створення проектів"
  ],
  
  prerequisites: ["lesson-03-9"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого матеріалу",
        content: `На цьому уроці ми закріпимо всі знання про функції, які вивчили в модулі 03:

**Що ми вивчили:**

1. **Оголошення та виклик функцій**
   - Синтаксис \`def\`
   - Виклик функцій
   - Параметри та аргументи

2. **Параметри, return, None**
   - Позиційні та іменовані аргументи
   - Значення за замовчуванням
   - Повернення значень

3. ***args та **kwargs**
   - Довільна кількість аргументів
   - Розпакування

4. **Методи об'єктів**
   - Робота з рядками, списками, словниками
   - Ланцюжок методів

5. **Lambda-функції**
   - Анонімні функції
   - Використання з map(), filter()

6. **Область видимості**
   - Локальні та глобальні змінні
   - Правило LEGB
   - Замикання

7. **Рекурсія**
   - Базовий випадок
   - Рекурсивний випадок

8. **Функції вищого порядку**
   - map(), filter(), reduce()
   - Комбінування функцій

**На цьому уроці:**
- Практикуємося у написанні функцій
- Створюємо складніші функції
- Застосовуємо всі вивчені техніки`
      },
      {
        title: "Принципи написання хороших функцій",
        content: `**1. Одна функція - одна відповідальність**

Функція має робити одну річ і робити її добре.

\`\`\`python
#  Погано: функція робить багато речей
def process_user_data(user):
    # Валідація
    if not user.get("name"):
        return None
    # Обробка
    user["name"] = user["name"].capitalize()
    # Збереження
    save_to_database(user)
    # Відправка email
    send_email(user["email"])

#  Добре: кожна функція робить одну річ
def validate_user(user):
    return user.get("name") is not None

def format_user_name(user):
    user["name"] = user["name"].capitalize()
    return user

def save_user(user):
    save_to_database(user)

def notify_user(user):
    send_email(user["email"])
\`\`\`

**2. Чіткі імена функцій**

Ім'я функції має чітко описувати, що вона робить.

\`\`\`python
#  Погано
def func(x):
    return x * 2

def process(data):
    # Що саме обробляє?
    pass

#  Добре
def double_number(x):
    return x * 2

def calculate_total_price(items):
    # Зрозуміло, що обчислює загальну ціну
    pass
\`\`\`

**3. Docstrings**

Додавайте опис функції.

\`\`\`python
def calculate_discount(price, discount_percent):
    """
    Обчислює ціну зі знижкою
    
    Args:
        price: Початкова ціна
        discount_percent: Відсоток знижки (0-100)
    
    Returns:
        Ціна зі знижкою
    """
    return price * (1 - discount_percent / 100)
\`\`\`

**4. Обробка помилок**

Перевіряйте вхідні дані та обробляйте помилки.

\`\`\`python
def divide(a, b):
    """
    Ділить a на b
    """
    if b == 0:
        return None  # Або викинути виняток
    return a / b
\`\`\`

**5. Використовуйте значення за замовчуванням**

Робіть функції гнучкішими.

\`\`\`python
def greet(name, greeting="Привіт"):
    """
    Вітає користувача
    """
    return f"{greeting}, {name}!"

greet("Олександр")  # "Привіт, Олександр!"
greet("Олександр", "Доброго ранку")  # "Доброго ранку, Олександр!"
\`\`\``
      },
      {
        title: "Практичні приклади складних функцій",
        content: `**Приклад 1: Обробка замовлень**

\`\`\`python
def calculate_order_total(items, tax_rate=0.2, discount=0):
    """
    Обчислює загальну суму замовлення
    
    Args:
        items: Список товарів, кожен з 'price' та 'quantity'
        tax_rate: Ставка податку (за замовчуванням 20%)
        discount: Знижка у відсотках (0-100)
    
    Returns:
        Загальна сума замовлення
    """
    # Обчислюємо підсумок без податку
    subtotal = sum(item["price"] * item["quantity"] for item in items)
    
    # Застосовуємо знижку
    if discount > 0:
        subtotal = subtotal * (1 - discount / 100)
    
    # Додаємо податок
    total = subtotal * (1 + tax_rate)
    
    return round(total, 2)

# Використання
items = [
    {"price": 100, "quantity": 2},
    {"price": 50, "quantity": 3}
]
total = calculate_order_total(items, tax_rate=0.2, discount=10)
print(f"Загальна сума: {total}")
\`\`\`

**Приклад 2: Валідація та форматування даних**

\`\`\`python
def validate_and_format_user(user_data):
    """
    Валідує та форматує дані користувача
    
    Args:
        user_data: Словник з даними користувача
    
    Returns:
        Відформатований словник або None, якщо валідація не пройдена
    """
    # Перевірка обов'язкових полів
    required_fields = ["name", "email", "age"]
    for field in required_fields:
        if field not in user_data:
            return None
    
    # Валідація віку
    if not isinstance(user_data["age"], int) or user_data["age"] < 0:
        return None
    
    # Валідація email (проста перевірка)
    if "@" not in user_data["email"]:
        return None
    
    # Форматування
    formatted = {
        "name": user_data["name"].strip().capitalize(),
        "email": user_data["email"].strip().lower(),
        "age": user_data["age"]
    }
    
    return formatted

# Використання
user = {
    "name": "  олександр  ",
    "email": "  USER@EXAMPLE.COM  ",
    "age": 20
}
formatted_user = validate_and_format_user(user)
\`\`\`

**Приклад 3: Робота зі структурами даних**

\`\`\`python
def analyze_sales(sales_data):
    """
    Аналізує дані про продажі
    
    Args:
        sales_data: Список словників з 'product', 'quantity', 'price'
    
    Returns:
        Словник зі статистикою
    """
    if not sales_data:
        return {
            "total_revenue": 0,
            "total_quantity": 0,
            "average_price": 0,
            "top_product": None
        }
    
    # Обчислюємо загальний дохід
    total_revenue = sum(item["quantity"] * item["price"] for item in sales_data)
    
    # Обчислюємо загальну кількість
    total_quantity = sum(item["quantity"] for item in sales_data)
    
    # Середня ціна
    average_price = total_revenue / total_quantity if total_quantity > 0 else 0
    
    # Найпопулярніший товар
    product_quantities = {}
    for item in sales_data:
        product = item["product"]
        product_quantities[product] = product_quantities.get(product, 0) + item["quantity"]
    
    top_product = max(product_quantities.items(), key=lambda x: x[1])[0] if product_quantities else None
    
    return {
        "total_revenue": round(total_revenue, 2),
        "total_quantity": total_quantity,
        "average_price": round(average_price, 2),
        "top_product": top_product
    }
\`\`\``
      },
      {
        title: "Комбінування технік",
        content: `**Приклад: Система обробки текстів**

\`\`\`python
from functools import reduce

def process_text_pipeline(texts, *processors):
    """
    Обробляє тексти через послідовність функцій
    
    Args:
        texts: Список рядків
        *processors: Функції обробки (застосовуються послідовно)
    
    Returns:
        Оброблені тексти
    """
    result = texts
    for processor in processors:
        result = list(map(processor, result))
    return result

# Функції обробки
def clean_text(text):
    return text.strip()

def capitalize_text(text):
    return text.capitalize()

def remove_short(text):
    return text if len(text) > 3 else None

# Використання
texts = ["  привіт  ", "  світ  ", "  python  "]
processed = process_text_pipeline(
    texts,
    clean_text,
    capitalize_text,
    lambda x: x.upper() if x else None
)
# Фільтруємо None
final = list(filter(lambda x: x is not None, processed))
\`\`\`

**Приклад: Рекурсивна обробка вкладених структур**

\`\`\`python
def flatten_list(nested_list):
    """
    Розгортає вкладений список в плоский
    
    Args:
        nested_list: Можливо вкладений список
    
    Returns:
        Плоский список
    """
    result = []
    for item in nested_list:
        if isinstance(item, list):
            # Рекурсивно обробляємо вкладений список
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result

# Використання
nested = [1, [2, 3], [4, [5, 6]], 7]
flat = flatten_list(nested)
# [1, 2, 3, 4, 5, 6, 7]
\`\`\`

**Приклад: Функції вищого порядку з валідацією**

\`\`\`python
from functools import reduce

def safe_reduce(func, iterable, initial=None):
    """
    Безпечна версія reduce з перевірками
    
    Args:
        func: Функція для згортки
        iterable: Ітерований об'єкт
        initial: Початкове значення
    
    Returns:
        Результат згортки або None, якщо помилка
    """
    if not iterable:
        return initial
    
    try:
        if initial is not None:
            return reduce(func, iterable, initial)
        else:
            return reduce(func, iterable)
    except Exception:
        return None

# Використання
numbers = [1, 2, 3, 4, 5]
total = safe_reduce(lambda x, y: x + y, numbers)
# 15
\`\`\``
      },
      {
        title: "Поради для практики",
        content: `**1. Почніть з простого**

Спочатку напишіть просту версію, потім покращуйте.

\`\`\`python
# Версія 1: Проста
def add_numbers(a, b):
    return a + b

# Версія 2: З валідацією
def add_numbers(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a + b

# Версія 3: З документацією
def add_numbers(a, b):
    """
    Додає два числа
    
    Args:
        a: Перше число
        b: Друге число
    
    Returns:
        Сума чисел або None, якщо помилка
    """
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a + b
\`\`\`

**2. Тестуйте функції**

Перевіряйте функції на різних вхідних даних.

\`\`\`python
def test_function():
    # Тест 1: Нормальний випадок
    result = add_numbers(5, 3)
    print(f"5 + 3 = {result}")  # Очікуємо 8
    
    # Тест 2: З нулем
    result = add_numbers(5, 0)
    print(f"5 + 0 = {result}")  # Очікуємо 5
    
    # Тест 3: З від'ємними числами
    result = add_numbers(-5, 3)
    print(f"-5 + 3 = {result}")  # Очікуємо -2
    
    # Тест 4: З некоректними даними
    result = add_numbers("5", 3)
    print(f"'5' + 3 = {result}")  # Очікуємо None
\`\`\`

**3. Розбивайте складні задачі**

Складну задачу розбивайте на менші функції.

\`\`\`python
# Замість однієї великої функції
def process_order(order):
    # 100 рядків коду...
    pass

# Краще: кілька маленьких функцій
def validate_order(order):
    # Валідація
    pass

def calculate_prices(order):
    # Обчислення цін
    pass

def apply_discounts(order):
    # Застосування знижок
    pass

def process_order(order):
    if not validate_order(order):
        return None
    calculate_prices(order)
    apply_discounts(order)
    return order
\`\`\`

**4. Використовуйте типізацію (якщо можливо)**

Додавайте підказки типів для кращої читабельності.

\`\`\`python
def calculate_total(items: list, tax_rate: float = 0.2) -> float:
    """
    Обчислює загальну суму
    
    Args:
        items: Список товарів
        tax_rate: Ставка податку
    
    Returns:
        Загальна сума
    """
    subtotal = sum(item["price"] for item in items)
    return subtotal * (1 + tax_rate)
\`\`\`

**5. Думайте про повторне використання**

Створюйте функції, які можна використовувати в різних місцях.

\`\`\`python
#  Добре: можна використати в різних місцях
def format_currency(amount, currency="UAH"):
    return f"{amount} {currency}"

#  Погано: прив'язано до конкретного контексту
def print_price_for_product_123(price):
    print(f"Ціна: {price} грн")
\`\`\``
      },
      {
        title: "Підсумок модуля 03",
        content: `Ми вивчили багато про функції в Python:

Основні концепції:

1. Оголошення та виклик функцій
2. Параметри, аргументи, return
3. Позиційні та іменовані аргументи
4. *args та **kwargs
5. Методи об'єктів
6. Lambda-функції
7. Область видимості змінних
8. Рекурсія
9. Функції вищого порядку

Навички:

- Створювати функції для різних задач
- Використовувати різні техніки програмування
- Писати чистий та читабельний код
- Комбінувати різні концепції

Наступні кроки:

- Практикуйтеся у написанні функцій
- Створюйте власні проекти
- Вивчайте нові модулі курсу
- Застосовуйте знання на практиці

Пам'ятайте:

- Одна функція - одна відповідальність
- Чіткі імена функцій
- Документація (docstrings)
- Тестування функцій
- Повторне використання коду

Вітаємо з завершенням модуля 03! Ви тепер маєте міцну основу для роботи з функціями в Python.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Складна функція з валідацією",
      code: `def calculate_discount(price, discount_percent, min_price=0):
    """
    Обчислює ціну зі знижкою з валідацією
    
    Args:
        price: Початкова ціна
        discount_percent: Відсоток знижки (0-100)
        min_price: Мінімальна ціна після знижки
    
    Returns:
        Ціна зі знижкою або None, якщо помилка
    """
    # Валідація
    if not isinstance(price, (int, float)) or price < 0:
        return None
    if not isinstance(discount_percent, (int, float)):
        return None
    if discount_percent < 0 or discount_percent > 100:
        return None
    
    # Обчислення
    discounted_price = price * (1 - discount_percent / 100)
    
    # Перевірка мінімальної ціни
    if discounted_price < min_price:
        return min_price
    
    return round(discounted_price, 2)

# Використання
result = calculate_discount(100, 20, min_price=50)
print(result)  # 80.0`,
      explanation: "Демонструє створення функції з валідацією вхідних даних, обробкою помилок та документацією."
    },
    {
      title: "Комбінування технік",
      code: `from functools import reduce

def process_numbers(numbers, operations):
    """
    Обробляє числа через послідовність операцій
    
    Args:
        numbers: Список чисел
        operations: Список функцій обробки
    
    Returns:
        Оброблені числа
    """
    result = numbers
    for operation in operations:
        result = list(map(operation, result))
    return result

# Використання
numbers = [1, 2, 3, 4, 5]
processed = process_numbers(
    numbers,
    [lambda x: x * 2, lambda x: x + 1, lambda x: x ** 2]
)
print(processed)  # [9, 25, 49, 81, 121]`,
      explanation: "Показує комбінування різних технік: функції вищого порядку, lambda, map()."
    },
    {
      title: "Рекурсивна обробка",
      code: `def count_items(nested_structure):
    """
    Рахує кількість елементів у вкладеній структурі
    """
    if isinstance(nested_structure, list):
        return sum(count_items(item) for item in nested_structure)
    else:
        return 1

# Використання
nested = [1, [2, 3], [4, [5, 6]], 7]
count = count_items(nested)
print(count)  # 7`,
      explanation: "Демонструє рекурсивну обробку вкладених структур даних."
    },
    {
      title: "Функція з кількома параметрами",
      code: `def format_report(data, title="Звіт", format_type="short", include_summary=True):
    """
    Форматує звіт з різними опціями
    
    Args:
        data: Дані для звіту
        title: Заголовок звіту
        format_type: Тип форматування ('short' або 'full')
        include_summary: Чи включати підсумок
    
    Returns:
        Відформатований звіт
    """
    report = f"=== {title} ===\\n"
    
    if format_type == "full":
        for item in data:
            report += f"  - {item}\\n"
    else:
        report += f"  Кількість елементів: {len(data)}\\n"
    
    if include_summary:
        report += f"\\nПідсумок: {len(data)} елементів"
    
    return report

# Використання
data = ["Елемент 1", "Елемент 2", "Елемент 3"]
report = format_report(data, title="Мій звіт", format_type="full")
print(report)`,
      explanation: "Показує функцію з багатьма параметрами та значеннями за замовчуванням."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Функція робить занадто багато речей",
      explanation: "Початківці часто створюють функції, які виконують багато різних завдань.",
      correctApproach: `# Неправильно:
def process_user(user):
    # Валідація
    if not user.get("name"):
        return None
    # Форматування
    user["name"] = user["name"].capitalize()
    # Збереження
    save_to_db(user)
    # Відправка email
    send_email(user["email"])

# Правильно: розбити на окремі функції
def validate_user(user):
    return user.get("name") is not None

def format_user(user):
    user["name"] = user["name"].capitalize()
    return user

def process_user(user):
    if not validate_user(user):
        return None
    formatted = format_user(user)
    save_to_db(formatted)
    send_email(formatted["email"])`
    },
    {
      mistake: "Нечіткі імена функцій",
      explanation: "Імена функцій мають чітко описувати, що вони роблять.",
      correctApproach: `# Неправильно:
def func(x):
    return x * 2

def process(data):
    # Що саме обробляє?
    pass

# Правильно:
def double_number(x):
    return x * 2

def calculate_total_price(items):
    # Зрозуміло, що обчислює загальну ціну
    total = sum(item["price"] for item in items)
    return total`
    },
    {
      mistake: "Відсутність валідації",
      explanation: "Функції мають перевіряти вхідні дані перед обробкою.",
      correctApproach: `# Неправильно:
def divide(a, b):
    return a / b  # Може викликати помилку, якщо b = 0

# Правильно:
def divide(a, b):
    if b == 0:
        return None  # Або викинути виняток
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return None
    return a / b`
    },
    {
      mistake: "Відсутність документації",
      explanation: "Функції без docstrings важко зрозуміти та використовувати.",
      correctApproach: `# Неправильно:
def calculate(x, y, z):
    return x * y + z

# Правильно:
def calculate_total_with_tax(price, quantity, tax_rate):
    """
    Обчислює загальну суму з податком
    
    Args:
        price: Ціна за одиницю
        quantity: Кількість
        tax_rate: Ставка податку (0-1)
    
    Returns:
        Загальна сума з податком
    """
    subtotal = price * quantity
    return subtotal * (1 + tax_rate)`
    }
  ],
  
  summary: `На цьому уроці ми закріпили всі знання про функції:

Принципи хороших функцій:

1. Одна функція - одна відповідальність
   - Функція має робити одну річ добре

2. Чіткі імена
   - Ім'я має описувати призначення функції

3. Документація
   - Docstrings допомагають зрозуміти функцію

4. Валідація
   - Перевіряйте вхідні дані

5. Гнучкість
   - Використовуйте значення за замовчуванням

Практичні поради:

- Почніть з простої версії
- Тестуйте функції
- Розбивайте складні задачі
- Думайте про повторне використання

Вивчені концепції:

 Оголошення та виклик функцій
 Параметри, return, None
 Позиційні та іменовані аргументи
 *args та kwargs
 Методи об'єктів
 Lambda-функції
 Область видимості
 Рекурсія
 Функції вищого порядку

Вітаємо з завершенням модуля 03! Ви тепер готові створювати складніші програми!`,
  
  practiceTask: {
    title: "Система управління бібліотекою",
    description: "Створіть систему управління бібліотекою з використанням всіх вивчених концепцій",
    problemStatement: `Створіть систему з функціями:

1. add_book(library, title, author, year=None, isbn=None)
2. find_books(library, **criteria)
3. calculate_statistics(library)
4. format_book_info(book, format_type="short")
5. get_books_by_author(library, author)
6. remove_book(library, isbn)

Зчитайте n книг (title;author;year;isbn), автора для пошуку, isbn для видалення.
Додайте книги, виведіть знайдені, статистику, формати, список автора, результат видалення.

Формат вводу:
3
Python для початківців;Олександр Петренко;2023;978-1234567890
Поглиблений Python;Олександр Петренко;2024;978-1234567891
Основи програмування;Марія Іваненко;2020;978-1234567892
Олександр Петренко
978-1234567890`,
    outputFormat: `Книга додана: True
Знайдені книги автора 'Олександр Петренко': 2
- Python для початківців (2023)
- Поглиблений Python (2024)
Статистика бібліотеки:
Загальна кількість книг: 3
Кількість авторів: 2
Найстаріша книга: 2020
Найновіша книга: 2024
Коротке форматування: Python для початківців (2023)
Повне форматування:
Назва: Python для початківців
Автор: Олександр Петренко
Рік: 2023
ISBN: 978-1234567890
Книги автора 'Олександр Петренко': ['Python для початківців', 'Поглиблений Python']
Книга видалена: True
Кількість книг після видалення: 2`,
    examples: [
      {
        input: `3
Python для початківців;Олександр Петренко;2023;978-1234567890
Поглиблений Python;Олександр Петренко;2024;978-1234567891
Основи програмування;Марія Іваненко;2020;978-1234567892
Олександр Петренко
978-1234567890`,
        output: `Книга додана: True
Знайдені книги автора 'Олександр Петренко': 2
- Python для початківців (2023)
- Поглиблений Python (2024)
Статистика бібліотеки:
Загальна кількість книг: 3
Кількість авторів: 2
Найстаріша книга: 2020
Найновіша книга: 2024
Коротке форматування: Python для початківців (2023)
Повне форматування:
Назва: Python для початківців
Автор: Олександр Петренко
Рік: 2023
ISBN: 978-1234567890
Книги автора 'Олександр Петренко': ['Python для початківців', 'Поглиблений Python']
Книга видалена: True
Кількість книг після видалення: 2`,
        explanation: "Три книги, пошук автора, видалення першої за ISBN"
      },
      {
        input: `2
Книга А;Автор А;2010;isbn-1
Книга Б;Автор Б;2015;isbn-2
Автор А
isbn-2`,
        output: `Книга додана: True
Знайдені книги автора 'Автор А': 1
- Книга А (2010)
Статистика бібліотеки:
Загальна кількість книг: 2
Кількість авторів: 2
Найстаріша книга: 2010
Найновіша книга: 2015
Коротке форматування: Книга А (2010)
Повне форматування:
Назва: Книга А
Автор: Автор А
Рік: 2010
ISBN: isbn-1
Книги автора 'Автор А': ['Книга А']
Книга видалена: True
Кількість книг після видалення: 1`,
        explanation: "Видаляється друга книга; форматування першої"
      },
      {
        input: `1
Alone;Solo;1999;x-1
Solo
missing`,
        output: `Книга додана: True
Знайдені книги автора 'Solo': 1
- Alone (1999)
Статистика бібліотеки:
Загальна кількість книг: 1
Кількість авторів: 1
Найстаріша книга: 1999
Найновіша книга: 1999
Коротке форматування: Alone (1999)
Повне форматування:
Назва: Alone
Автор: Solo
Рік: 1999
ISBN: x-1
Книги автора 'Solo': ['Alone']
Книга видалена: False
Кількість книг після видалення: 1`,
        explanation: "ISBN missing не знайдено — видалення False"
      }
    ],
    solution: {
      code: `from functools import reduce

def add_book(library, title, author, year=None, isbn=None):
    """Додає книгу до бібліотеки"""
    if not title or not author:
        return False
    if year is not None and (not isinstance(year, int) or year < 0):
        return False
    book = {
        "title": title.strip(),
        "author": author.strip(),
        "year": year,
        "isbn": isbn
    }
    if "books" not in library:
        library["books"] = []
    library["books"].append(book)
    return True

def find_books(library, **criteria):
    """Знаходить книги за критеріями"""
    if "books" not in library:
        return []
    books = library["books"]
    if "author" in criteria:
        books = list(filter(lambda b: b.get("author", "").lower() == criteria["author"].lower(), books))
    if "year" in criteria:
        books = list(filter(lambda b: b.get("year") == criteria["year"], books))
    if "min_year" in criteria:
        books = list(filter(lambda b: b.get("year") is not None and b.get("year") >= criteria["min_year"], books))
    if "max_year" in criteria:
        books = list(filter(lambda b: b.get("year") is not None and b.get("year") <= criteria["max_year"], books))
    return books

def calculate_statistics(library):
    """Обчислює статистику бібліотеки"""
    if "books" not in library or len(library["books"]) == 0:
        return {"total_books": 0, "total_authors": 0, "oldest_year": None, "newest_year": None}
    books = library["books"]
    authors = set(book.get("author", "") for book in books if book.get("author"))
    years = [book.get("year") for book in books if book.get("year") is not None]
    if years:
        oldest_year = reduce(lambda a, b: a if a < b else b, years)
        newest_year = reduce(lambda a, b: a if a > b else b, years)
    else:
        oldest_year = None
        newest_year = None
    return {
        "total_books": len(books),
        "total_authors": len(authors),
        "oldest_year": oldest_year,
        "newest_year": newest_year
    }

def format_book_info(book, format_type="short"):
    """Форматує інформацію про книгу"""
    if format_type == "short":
        return f"{book.get('title', 'Невідома')} ({book.get('year', '?')})"
    title = book.get("title", "Невідома")
    author = book.get("author", "Невідомий")
    year = book.get("year", "?")
    isbn = book.get("isbn") if book.get("isbn") else "Немає"
    return f"Назва: {title}\\nАвтор: {author}\\nРік: {year}\\nISBN: {isbn}"

def get_books_by_author(library, author):
    """Список назв книг автора"""
    if "books" not in library:
        return []
    author_books = filter(lambda b: b.get("author", "").lower() == author.lower(), library["books"])
    return list(map(lambda b: b.get("title", ""), author_books))

def remove_book(library, isbn):
    """Видаляє книгу за ISBN"""
    if "books" not in library:
        return False
    for i, book in enumerate(library["books"]):
        if book.get("isbn") == isbn:
            library["books"].pop(i)
            return True
    return False

n = int(input())
library = {}
first_result = None
for _ in range(n):
    title, author, year, isbn = input().strip().split(";")
    result = add_book(library, title, author, int(year), isbn)
    if first_result is None:
        first_result = result

search_author = input().strip()
remove_isbn = input().strip()

print(f"Книга додана: {first_result}")
found = find_books(library, author=search_author)
print(f"Знайдені книги автора '{search_author}': {len(found)}")
for book in found:
    print(f"- {format_book_info(book)}")

stats = calculate_statistics(library)
print("Статистика бібліотеки:")
print(f"Загальна кількість книг: {stats['total_books']}")
print(f"Кількість авторів: {stats['total_authors']}")
print(f"Найстаріша книга: {stats['oldest_year']}")
print(f"Найновіша книга: {stats['newest_year']}")

book = library["books"][0]
print(f"Коротке форматування: {format_book_info(book, 'short')}")
print("Повне форматування:")
for line in format_book_info(book, "full").split("\\n"):
    print(line)

author_books = get_books_by_author(library, search_author)
print(f"Книги автора '{search_author}': {author_books}")

removed = remove_book(library, remove_isbn)
print(f"Книга видалена: {removed}")
print(f"Кількість книг після видалення: {len(library['books'])}")`,
      explanation: "Повна бібліотечна система на функціях; книги та операції з stdin."
    },
    hints: [
      "Зчитайте n книг у форматі title;author;year;isbn",
      "Використовуйте **criteria у find_books",
      "Для повного форматування розділюйте рядок по \\\\n",
      "remove_book шукає isbn і робить pop"
    ],
    difficulty: "advanced"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який принцип є найважливішим при написанні функцій?",
        options: [
          "Одна функція - одна відповідальність",
          "Функція має бути якомога довшою",
          "Функція має робити багато речей",
          "Функція не потребує документації"
        ],
        correctAnswer: 0,
        explanation: "Одна функція - одна відповідальність - це ключовий принцип. Функція має робити одну річ і робити її добре."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи потрібна валідація вхідних даних у функціях?",
        options: [
          "Так, це важливо для надійності",
          "Ні, це не потрібно",
          "Тільки для складних функцій",
          "Тільки для функцій з багатьма параметрами"
        ],
        correctAnswer: 0,
        explanation: "Так, валідація вхідних даних важлива для надійності функції. Вона допомагає уникнути помилок та неочікуваної поведінки."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що краще: одна велика функція або кілька маленьких?",
        options: [
          "Кілька маленьких функцій з чіткою відповідальністю",
          "Одна велика функція",
          "Залежить від ситуації, але зазвичай краще розбити",
          "Обидва варіанти однакові"
        ],
        correctAnswer: 2,
        explanation: "Залежить від ситуації, але зазвичай краще розбити складну функцію на кілька маленьких з чіткою відповідальністю. Це робить код більш читабельним та підтримуваним."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке docstring?",
        options: [
          "Документація функції, написана в потрійних лапках",
          "Назва функції",
          "Параметри функції",
          "Тип повернення функції"
        ],
        correctAnswer: 0,
        explanation: "Docstring - це документація функції, написана в потрійних лапках (\"\"\"). Вона описує, що робить функція, які параметри приймає та що повертає."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи потрібно тестувати функції?",
        options: [
          "Так, це допомагає переконатися, що функція працює правильно",
          "Ні, це не потрібно",
          "Тільки для складних функцій",
          "Тільки перед релізом"
        ],
        correctAnswer: 0,
        explanation: "Так, тестування функцій важливе. Воно допомагає переконатися, що функція працює правильно на різних вхідних даних та допомагає знайти помилки раніше."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як краще називати функції?",
        options: [
          "Чітко та описово, щоб зрозуміти призначення",
          "Коротко, щоб менше друкувати",
          "Абревіатурами",
          "Будь-як, головне коротко"
        ],
        correctAnswer: 0,
        explanation: "Функції краще називати чітко та описово, щоб з назви було зрозуміло, що функція робить. Наприклад, calculate_total_price краще за calc або func."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи можна комбінувати різні техніки програмування в одній функції?",
        options: [
          "Так, це часто потрібно для складних задач",
          "Ні, це завжди погано",
          "Тільки для простих функцій",
          "Тільки для рекурсивних функцій"
        ],
        correctAnswer: 0,
        explanation: "Так, можна та часто потрібно комбінувати різні техніки (map, filter, reduce, рекурсію, методи об'єктів) в одній функції для розв'язання складних задач."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Функції мають бути максимально універсальними та придатними для повторного використання.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, функції мають бути універсальними та придатними для повторного використання, коли це можливо. Це робить код більш модульним та зменшує дублювання."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
