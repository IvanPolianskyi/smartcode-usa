/**
 * Lesson 03-3: Позиційні та іменовані аргументи
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_3 = {
  lessonId: "lesson-03-3",
  moduleId: "module-03",
  order: 3,
  title: "Позиційні та іменовані аргументи",
  
  learningObjectives: [
    "Розуміти різницю між позиційними та іменованими аргументами",
    "Використовувати позиційні аргументи правильно",
    "Застосовувати іменовані аргументи для читабельності",
    "Комбінувати позиційні та іменовані аргументи",
    "Розуміти порядок аргументів та правила їх використання"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-03-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Позиційні аргументи",
        content: `Позиційні аргументи — це аргументи, які передаються в функцію у тому порядку, в якому вони визначені як параметри.

**Як це працює:**

\`\`\`python
def greet(name, age, city):
    """
    name, age, city — параметри
    """
    print(f"Привіт, {name}! Тобі {age} років. Ти з міста {city}.")

# Позиційні аргументи передаються по порядку
greet("Олександр", 20, "Київ")
# "Олександр" → name
# 20 → age
# "Київ" → city
\`\`\`

**Важливо:** Порядок має значення!

\`\`\`python
def calculate(a, b, operation):
    if operation == "add":
        return a + b
    elif operation == "multiply":
        return a * b
    else:
        return a - b

# Правильний порядок
result1 = calculate(5, 3, "add")  # 5 + 3 = 8

# Неправильний порядок — отримаємо неочікуваний результат!
result2 = calculate("add", 5, 3)  # Помилка або неочікуваний результат
\`\`\`

**Переваги позиційних аргументів:**
- Короткий синтаксис
- Швидко писати для простих функцій
- Зручно, коли порядок логічний

**Недоліки:**
- Потрібно пам'ятати порядок параметрів
- Легко переплутати порядок
- Менш читабельно для функцій з багатьма параметрами`
      },
      {
        title: "Іменовані аргументи (keyword arguments)",
        content: `Іменовані аргументи (keyword arguments) — це аргументи, які передаються з вказанням імені параметра.

**Синтаксис:**

\`\`\`python
def greet(name, age, city):
    print(f"Привіт, {name}! Тобі {age} років. Ти з міста {city}.")

# Іменовані аргументи
greet(name="Олександр", age=20, city="Київ")
greet(age=20, city="Київ", name="Олександр")  # Порядок не важливий!
\`\`\`

**Переваги іменованих аргументів:**

1. **Читабельність:**
\`\`\`python
def create_user(username, email, age, is_active, role):
    # Створення користувача
    pass

# З іменованими аргументами — зрозуміло, що означає кожне значення
create_user(
    username="john_doe",
    email="john@example.com",
    age=25,
    is_active=True,
    role="admin"
)
\`\`\`

2. **Порядок не важливий:**
\`\`\`python
def calculate(price, discount, tax):
    return price * (1 - discount) * (1 + tax)

# Всі ці виклики еквівалентні:
result1 = calculate(price=100, discount=0.1, tax=0.2)
result2 = calculate(discount=0.1, tax=0.2, price=100)
result3 = calculate(tax=0.2, price=100, discount=0.1)
\`\`\`

3. **Менше помилок:**
\`\`\`python
def send_email(to, subject, body, from_address):
    # Відправка email
    pass

# З іменованими аргументами важко переплутати
send_email(
    to="user@example.com",
    subject="Привіт",
    body="Це повідомлення",
    from_address="sender@example.com"
)
\`\`\``
      },
      {
        title: "Комбінування позиційних та іменованих аргументів",
        content: `Можна комбінувати позиційні та іменовані аргументи в одному виклику функції!

**Правило:** Спочатку позиційні, потім іменовані.

\`\`\`python
def greet(name, age, city, country):
    print(f"Привіт, {name}! Тобі {age} років. Ти з {city}, {country}.")

# Комбінування
greet("Олександр", 20, city="Київ", country="Україна")
# "Олександр" та 20 — позиційні
# city та country — іменовані
\`\`\`

**Важливе правило:**

Після іменованого аргументу не можна використовувати позиційні!

\`\`\`python
def example(a, b, c, d):
    pass

# Правильно:
example(1, 2, c=3, d=4)      # ✅
example(1, b=2, c=3, d=4)    # ✅
example(a=1, b=2, c=3, d=4)  # ✅

# Неправильно:
example(1, 2, c=3, 4)        # ❌ Помилка! Після іменованого не можна позиційний
example(1, b=2, 3, d=4)      # ❌ Помилка!
\`\`\`

**Практичний приклад:**

\`\`\`python
def format_date(day, month, year, separator="/", format_type="short"):
    """
    Форматує дату
    """
    if format_type == "short":
        return f"{day}{separator}{month}{separator}{year}"
    else:
        months = ["січня", "лютого", "березня", "квітня", "травня", "червня",
                 "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]
        return f"{day} {months[month-1]} {year} року"

# Використання
date1 = format_date(15, 3, 2024)  # Всі позиційні
date2 = format_date(15, 3, 2024, separator="-")  # Комбінування
date3 = format_date(15, 3, 2024, format_type="long")  # Комбінування
date4 = format_date(15, 3, year=2024, separator=".")  # Комбінування
\`\`\``
      },
      {
        title: "Значення за замовчуванням",
        content: `Параметри можуть мати значення за замовчуванням (default values). Це дозволяє не передавати аргументи для цих параметрів.

**Синтаксис:**

\`\`\`python
def function_name(param1, param2=default_value):
    # Код функції
    pass
\`\`\`

**Приклад:**

\`\`\`python
def greet(name, greeting="Привіт"):
    """
    greeting має значення за замовчуванням "Привіт"
    """
    print(f"{greeting}, {name}!")

# Можна викликати з одним аргументом
greet("Олександр")  # Виведе: Привіт, Олександр!

# Або з двома
greet("Олександр", "Доброго ранку")  # Виведе: Доброго ранку, Олександр!
\`\`\`

**Правило порядку параметрів:**

Параметри зі значеннями за замовчуванням мають бути після параметрів без значень за замовчуванням.

\`\`\`python
# Правильно:
def example(a, b, c=10, d=20):
    pass

# Неправильно:
def example(a=10, b, c):  # ❌ Помилка!
    pass
\`\`\`

**Практичні приклади:**

\`\`\`python
# Приклад 1: Функція з множинними значеннями за замовчуванням
def create_message(text, prefix="Повідомлення:", suffix="", uppercase=False):
    """
    Створює повідомлення з опціональними параметрами
    """
    message = f"{prefix} {text} {suffix}".strip()
    if uppercase:
        message = message.upper()
    return message

# Використання
msg1 = create_message("Привіт")  # "Повідомлення: Привіт"
msg2 = create_message("Привіт", prefix="Увага:")  # "Увага: Привіт"
msg3 = create_message("Привіт", uppercase=True)  # "ПОВІДОМЛЕННЯ: ПРИВІТ"
msg4 = create_message("Привіт", suffix="(важливо)", uppercase=True)
\`\`\`

\`\`\`python
# Приклад 2: Математичні операції
def power(base, exponent=2):
    """
    Підносить число до степеня
    За замовчуванням квадрат
    """
    return base ** exponent

# Використання
print(power(5))      # 25 (5²)
print(power(5, 3))   # 125 (5³)
print(power(2, 10))  # 1024 (2¹⁰)
\`\`\`

\`\`\`python
# Приклад 3: Форматування тексту
def format_text(text, width=80, align="left", fill_char=" "):
    """
    Форматує текст з різними параметрами
    """
    if align == "left":
        return text.ljust(width, fill_char)
    elif align == "right":
        return text.rjust(width, fill_char)
    else:  # center
        return text.center(width, fill_char)

# Використання
text = "Привіт"
print(format_text(text))                    # Звичайне форматування
print(format_text(text, width=20))          # Ширина 20
print(format_text(text, align="center"))    # По центру
print(format_text(text, fill_char="*"))     # Заповнення зірочками
\`\`\``
      },
      {
        title: "Коли використовувати позиційні, а коли іменовані?",
        content: `**Використовуйте позиційні аргументи, коли:**

1. **Функція має 1-2 параметри:**
\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)  # Позиційні достатньо
\`\`\`

2. **Порядок параметрів очевидний:**
\`\`\`python
def calculate_distance(x1, y1, x2, y2):
    return ((x2 - x1)**2 + (y2 - y1)**2)**0.5

distance = calculate_distance(0, 0, 3, 4)  # Координати по порядку
\`\`\`

**Використовуйте іменовані аргументи, коли:**

1. **Функція має багато параметрів:**
\`\`\`python
def create_user(username, email, age, is_active, role, created_at, last_login):
    # Створення користувача
    pass

# З іменованими аргументами набагато зрозуміліше
create_user(
    username="john",
    email="john@example.com",
    age=25,
    is_active=True,
    role="admin",
    created_at="2024-01-01",
    last_login="2024-01-15"
)
\`\`\`

2. **Параметри мають значення за замовчуванням:**
\`\`\`python
def send_email(to, subject, body, from_address="noreply@example.com", cc=None):
    # Відправка email
    pass

# Зручно використовувати іменовані для опціональних параметрів
send_email(
    to="user@example.com",
    subject="Привіт",
    body="Повідомлення",
    cc="manager@example.com"  # Тільки цей параметр відрізняється від замовчування
)
\`\`\`

3. **Потрібна читабельність:**
\`\`\`python
def format_currency(amount, currency="UAH", decimals=2, symbol=True):
    # Форматування валюти
    pass

# З іменованими аргументами зрозуміло, що означає кожне значення
format_currency(1000, currency="USD", decimals=2, symbol=True)
\`\`\`

**Комбінуйте, коли це доречно:**

\`\`\`python
def process_data(data, format="json", validate=True, save=False, output_file=None):
    # Обробка даних
    pass

# Перший параметр (data) — позиційний (обов'язковий)
# Решта — іменовані (опціональні)
process_data(my_data, format="xml", save=True, output_file="result.xml")
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Функція для створення профілю користувача**

\`\`\`python
def create_profile(name, age, city="Не вказано", country="Україна", bio=""):
    """
    Створює профіль користувача
    """
    profile = {
        "name": name,
        "age": age,
        "city": city,
        "country": country,
        "bio": bio
    }
    return profile

# Різні способи виклику
profile1 = create_profile("Олександр", 20)  # Тільки обов'язкові
profile2 = create_profile("Олександр", 20, city="Київ")  # З додатковим параметром
profile3 = create_profile("Олександр", 20, city="Київ", bio="Програміст")  # З усіма
profile4 = create_profile("Олександр", 20, bio="Програміст", city="Київ")  # Порядок не важливий
\`\`\`

**Приклад 2: Функція для обчислення знижки**

\`\`\`python
def calculate_price(original_price, discount=0, tax=0.2, currency="UAH"):
    """
    Обчислює фінальну ціну з урахуванням знижки та податку
    """
    price_after_discount = original_price * (1 - discount)
    final_price = price_after_discount * (1 + tax)
    
    return {
        "original": original_price,
        "after_discount": price_after_discount,
        "final": final_price,
        "currency": currency
    }

# Використання
price1 = calculate_price(1000)  # Тільки базова ціна
price2 = calculate_price(1000, discount=0.1)  # Зі знижкою 10%
price3 = calculate_price(1000, discount=0.15, tax=0.0)  # Без податку
price4 = calculate_price(1000, currency="USD", discount=0.2)  # З валютою
\`\`\`

**Приклад 3: Функція для форматування тексту**

\`\`\`python
def format_text(text, max_length=50, ellipsis="...", align="left"):
    """
    Форматує текст з обмеженням довжини
    """
    if len(text) > max_length:
        text = text[:max_length - len(ellipsis)] + ellipsis
    
    if align == "left":
        return text.ljust(max_length)
    elif align == "right":
        return text.rjust(max_length)
    else:  # center
        return text.center(max_length)

# Використання
text = "Дуже довгий текст, який потрібно обрізати"
formatted1 = format_text(text)  # Звичайне форматування
formatted2 = format_text(text, max_length=30)  # Коротший
formatted3 = format_text(text, align="center", ellipsis="…")  # По центру з іншим ellipsis
\`\`\`

**Приклад 4: Комбінування позиційних та іменованих**

\`\`\`python
def send_notification(message, recipient, priority="normal", urgent=False, timestamp=None):
    """
    Відправляє сповіщення
    """
    notification = {
        "message": message,
        "recipient": recipient,
        "priority": priority,
        "urgent": urgent,
        "timestamp": timestamp
    }
    return notification

# Комбінування
notif1 = send_notification("Привіт", "user@example.com")  # Тільки обов'язкові
notif2 = send_notification("Важливо!", "user@example.com", priority="high", urgent=True)
notif3 = send_notification("Повідомлення", recipient="user@example.com", urgent=True)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили:

**Ключові концепції:**

1. **Позиційні аргументи**
   - Передаються по порядку
   - Порядок має значення
   - Зручно для простих функцій

2. **Іменовані аргументи**
   - Передаються з іменами параметрів
   - Порядок не важливий
   - Підвищують читабельність

3. **Комбінування**
   - Спочатку позиційні, потім іменовані
   - Після іменованого не можна позиційний

4. **Значення за замовчуванням**
   - Параметри можуть мати значення за замовчуванням
   - Параметри зі значеннями за замовчуванням мають бути після параметрів без них

**Правила:**

- Використовуйте позиційні для простих функцій (1-2 параметри)
- Використовуйте іменовані для складних функцій (багато параметрів)
- Комбінуйте, коли це доречно
- Значення за замовчуванням роблять функції гнучкішими

**Наступний крок:**

У наступному уроці ми дізнаємося про *args та **kwargs — потужні інструменти для роботи з довільною кількістю аргументів.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Позиційні аргументи",
      code: `def greet(name, age, city):
    print(f"Привіт, {name}! Тобі {age} років. Ти з {city}.")

# Порядок має значення
greet("Олександр", 20, "Київ")  # Правильно
greet("Київ", "Олександр", 20)  # Неправильно - переплутано порядок`,
      explanation: "Демонструє використання позиційних аргументів, де порядок має критичне значення."
    },
    {
      title: "Іменовані аргументи",
      code: `def greet(name, age, city):
    print(f"Привіт, {name}! Тобі {age} років. Ти з {city}.")

# Порядок не важливий
greet(name="Олександр", age=20, city="Київ")
greet(city="Київ", name="Олександр", age=20)  # Те саме`,
      explanation: "Показує, що з іменованими аргументами порядок не має значення."
    },
    {
      title: "Комбінування позиційних та іменованих",
      code: `def calculate(a, b, operation="add", round_result=False):
    if operation == "add":
        result = a + b
    elif operation == "multiply":
        result = a * b
    else:
        result = a - b
    
    if round_result:
        return round(result)
    return result

# Комбінування
print(calculate(5, 3))  # Позиційні
print(calculate(5, 3, operation="multiply"))  # Комбінування
print(calculate(5, 3, round_result=True))  # Комбінування`,
      explanation: "Демонструє комбінування позиційних та іменованих аргументів в одному виклику."
    },
    {
      title: "Значення за замовчуванням",
      code: `def power(base, exponent=2):
    return base ** exponent

# Використання значення за замовчуванням
print(power(5))      # 25 (5²)
print(power(5, 3))   # 125 (5³)

# З іменованим аргументом
print(power(2, exponent=10))  # 1024`,
      explanation: "Показує використання параметрів зі значеннями за замовчуванням."
    },
    {
      title: "Практичний приклад: форматування дати",
      code: `def format_date(day, month, year, separator="/", format_type="short"):
    if format_type == "short":
        return f"{day}{separator}{month}{separator}{year}"
    else:
        months = ["січня", "лютого", "березня", "квітня"]
        return f"{day} {months[month-1]} {year} року"

# Різні способи виклику
print(format_date(15, 3, 2024))
print(format_date(15, 3, 2024, separator="-"))
print(format_date(15, 3, 2024, format_type="long"))`,
      explanation: "Практичний приклад функції з параметрами за замовчуванням та іменованими аргументами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Переплутаний порядок позиційних аргументів",
      explanation: "Початківці часто переплутують порядок позиційних аргументів, особливо коли параметри мають схожі типи.",
      correctApproach: `# Неправильно:
def calculate(price, discount, tax):
    return price * (1 - discount) * (1 + tax)

result = calculate(0.1, 100, 0.2)  # ❌ Переплутано порядок

# Правильно:
result = calculate(100, 0.1, 0.2)  # ✅ Правильний порядок

# Або використати іменовані:
result = calculate(price=100, discount=0.1, tax=0.2)  # ✅ Неможливо переплутати`
    },
    {
      mistake: "Позиційний аргумент після іменованого",
      explanation: "Після іменованого аргументу не можна використовувати позиційні аргументи.",
      correctApproach: `# Неправильно:
def example(a, b, c, d):
    pass

example(1, 2, c=3, 4)  # ❌ Помилка! Після іменованого не можна позиційний

# Правильно:
example(1, 2, c=3, d=4)  # ✅ Всі після іменованого теж іменовані
example(1, 2, 3, d=4)   # ✅ Позиційні перед іменованими`
    },
    {
      mistake: "Параметри зі значеннями за замовчуванням перед параметрами без них",
      explanation: "Параметри зі значеннями за замовчуванням мають бути після параметрів без значень за замовчуванням.",
      correctApproach: `# Неправильно:
def example(a=10, b, c):  # ❌ Помилка!
    pass

# Правильно:
def example(a, b, c=10):  # ✅ Параметри зі значеннями за замовчуванням в кінці
    pass

# Або всі зі значеннями за замовчуванням:
def example(a=1, b=2, c=3):  # ✅ Теж правильно
    pass`
    },
    {
      mistake: "Невикористання іменованих аргументів для читабельності",
      explanation: "Для функцій з багатьма параметрами краще використовувати іменовані аргументи для читабельності.",
      correctApproach: `# Важко читати:
def create_user(username, email, age, is_active, role, created_at):
    pass

create_user("john", "john@example.com", 25, True, "admin", "2024-01-01")  # ❌ Важко зрозуміти

# Краще:
create_user(
    username="john",
    email="john@example.com",
    age=25,
    is_active=True,
    role="admin",
    created_at="2024-01-01"
)  # ✅ Зрозуміло, що означає кожне значення`
    }
  ],
  
  summary: `На цьому уроці ми вивчили позиційні та іменовані аргументи:

1. **Позиційні аргументи**
   - Передаються по порядку параметрів
   - Порядок має значення
   - Зручно для простих функцій

2. **Іменовані аргументи**
   - Передаються з іменами параметрів
   - Порядок не важливий
   - Підвищують читабельність коду

3. **Комбінування**
   - Спочатку позиційні, потім іменовані
   - Після іменованого не можна використовувати позиційні

4. **Значення за замовчуванням**
   - Параметри можуть мати значення за замовчуванням
   - Параметри зі значеннями за замовчуванням мають бути після параметрів без них

5. **Коли що використовувати**
   - Позиційні для простих функцій (1-2 параметри)
   - Іменовані для складних функцій (багато параметрів)
   - Комбінуйте, коли це доречно

Ці знання допоможуть писати більш читабельний та гнучкий код!`,
  
  practiceTask: {
    title: "Система налаштувань користувача",
    description: "Створіть функції для роботи з налаштуваннями користувача, використовуючи позиційні та іменовані аргументи",
    problemStatement: `Напишіть програму, яка містить функції для роботи з налаштуваннями користувача:

1. **create_user_settings** — створює налаштування користувача
   - Параметри: username (обов'язковий), theme (за замовчуванням "light"), language (за замовчуванням "uk"), notifications (за замовчуванням True), font_size (за замовчуванням 14)
   - Повертає словник з налаштуваннями

2. **update_settings** — оновлює налаштування
   - Параметри: settings (словник налаштувань), theme, language, notifications, font_size (всі опціональні)
   - Оновлює тільки передані параметри
   - Повертає оновлений словник

3. **display_settings** — виводить налаштування
   - Параметри: settings (словник), format (за замовчуванням "short")
   - Якщо format="short" — виводить короткий формат
   - Якщо format="full" — виводить повний формат з описом

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді.

Використайте різні способи виклику функцій:
- Тільки позиційні аргументи
- Тільки іменовані аргументи
- Комбінування позиційних та іменованих

Створіть кілька користувачів з різними налаштуваннями та виведіть їх.`,
    inputFormat: `Введіть значення напряму в коді:
username = "user1"
theme = "dark"
language = "en"

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Приклад виведення:
=== Налаштування користувача ===
Користувач: user1
Тема: dark
Мова: en
Сповіщення: Увімкнено
Розмір шрифту: 16`,
    examples: [
      {
        input: "username = 'user1', theme = 'dark', language = 'en', font_size = 16",
        output: `=== Налаштування користувача (короткий формат) ===
Користувач: user1
Тема: dark
Мова: en
Сповіщення: Увімкнено
Розмір шрифту: 16

=== Налаштування користувача (повний формат) ===
Користувач: user1
Тема інтерфейсу: dark
Мова інтерфейсу: en
Сповіщення: Увімкнено
Розмір шрифту: 16`,
        explanation: "Демонструє створення налаштувань з різними параметрами та виведення в різних форматах."
      },
      {
        input: "username = 'user2' (тільки обов'язковий параметр)",
        output: `=== Налаштування користувача (короткий формат) ===
Користувач: user2
Тема: light
Мова: uk
Сповіщення: Увімкнено
Розмір шрифту: 14`,
        explanation: "Приклад з використанням значень за замовчуванням."
      },
      {
        input: "Оновлення налаштувань: theme = 'dark', font_size = 18",
        output: `=== Оновлені налаштування ===
Користувач: user2
Тема: dark
Мова: uk
Сповіщення: Увімкнено
Розмір шрифту: 18`,
        explanation: "Демонструє оновлення налаштувань з використанням іменованих аргументів."
      }
    ],
    solution: {
      code: `# Система налаштувань користувача

def create_user_settings(username, theme="light", language="uk", notifications=True, font_size=14):
    """
    Створює налаштування користувача
    """
    settings = {
        "username": username,
        "theme": theme,
        "language": language,
        "notifications": notifications,
        "font_size": font_size
    }
    return settings

def update_settings(settings, theme=None, language=None, notifications=None, font_size=None):
    """
    Оновлює налаштування користувача
    Оновлює тільки передані параметри
    """
    if theme is not None:
        settings["theme"] = theme
    if language is not None:
        settings["language"] = language
    if notifications is not None:
        settings["notifications"] = notifications
    if font_size is not None:
        settings["font_size"] = font_size
    return settings

def display_settings(settings, format="short"):
    """
    Виводить налаштування користувача
    """
    if format == "short":
        print("=== Налаштування користувача (короткий формат) ===")
        print(f"Користувач: {settings['username']}")
        print(f"Тема: {settings['theme']}")
        print(f"Мова: {settings['language']}")
        status = "Увімкнено" if settings['notifications'] else "Вимкнено"
        print(f"Сповіщення: {status}")
        print(f"Розмір шрифту: {settings['font_size']}")
    else:  # full
        print("=== Налаштування користувача (повний формат) ===")
        print(f"Користувач: {settings['username']}")
        print(f"Тема інтерфейсу: {settings['theme']}")
        print(f"Мова інтерфейсу: {settings['language']}")
        status = "Увімкнено" if settings['notifications'] else "Вимкнено"
        print(f"Сповіщення: {status}")
        print(f"Розмір шрифту: {settings['font_size']}")
    print()

# Вводимо значення напряму в коді (не використовуємо input())
# Приклад 1: Тільки обов'язковий параметр (використовуються значення за замовчуванням)
user1 = create_user_settings("user1")
display_settings(user1)

# Приклад 2: Позиційні аргументи
user2 = create_user_settings("user2", "dark", "en")
display_settings(user2)

# Приклад 3: Іменовані аргументи (порядок не важливий)
user3 = create_user_settings(
    username="user3",
    font_size=16,
    theme="dark",
    language="en",
    notifications=False
)
display_settings(user3, format="full")

# Приклад 4: Комбінування позиційних та іменованих
user4 = create_user_settings("user4", "dark", notifications=False, font_size=18)
display_settings(user4)

# Приклад 5: Оновлення налаштувань
updated_user2 = update_settings(user2, theme="light", font_size=20)
print("=== Оновлені налаштування ===")
display_settings(updated_user2, format="short")`,
      explanation: "Рішення демонструє використання позиційних та іменованих аргументів, значень за замовчуванням та комбінування різних способів виклику функцій."
    },
    hints: [
      "Введіть значення напряму в коді - не використовуйте input()",
      "Функція create_user_settings має один обов'язковий параметр (username) та кілька зі значеннями за замовчуванням",
      "Функція update_settings має перевіряти, чи параметр не None перед оновленням",
      "Функція display_settings має виводити різні формати залежно від параметра format",
      "Спробуйте використати різні способи виклику: тільки позиційні, тільки іменовані, комбінування",
      "Використовуйте іменовані аргументи для читабельності, особливо коли багато параметрів"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: ["user1"],
        expectedOutput: "Тема: light",
        description: "Перевірка значень за замовчуванням"
      },
      {
        input: ["user2", "dark", "en"],
        expectedOutput: "Мова: en",
        description: "Перевірка позиційних аргументів"
      },
      {
        input: ["user3", "dark", "en", false, 16],
        expectedOutput: "Розмір шрифту: 16",
        description: "Перевірка всіх параметрів"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке позиційний аргумент?",
        options: [
          "Аргумент, який передається по порядку параметрів",
          "Аргумент з іменем параметра",
          "Аргумент зі значенням за замовчуванням",
          "Аргумент, який не обов'язковий"
        ],
        correctAnswer: 0,
        explanation: "Позиційний аргумент передається в тому порядку, в якому параметри визначені в функції. Наприклад, у функції def add(a, b): виклик add(5, 3) означає, що 5 → a, 3 → b."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи важливий порядок для іменованих аргументів?",
        options: [
          "Ні, порядок не важливий",
          "Так, порядок завжди важливий",
          "Залежить від функції",
          "Тільки для деяких типів даних"
        ],
        correctAnswer: 0,
        explanation: "Для іменованих аргументів порядок не важливий, оскільки кожен аргумент має ім'я параметра. greet(name=\"Олександр\", age=20) та greet(age=20, name=\"Олександр\") — еквівалентні."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef greet(name, greeting=\"Привіт\"):\n    print(f\"{greeting}, {name}!\")\n\ngreet(\"Олександр\")\ngreet(\"Олександр\", \"Доброго ранку\")\n```",
        options: [
          "Привіт, Олександр!, потім Доброго ранку, Олександр!",
          "Помилку",
          "Тільки Привіт, Олександр!",
          "Тільки Доброго ранку, Олександр!"
        ],
        correctAnswer: 0,
        explanation: "Перший виклик використовує значення за замовчуванням для greeting (\"Привіт\"), другий виклик передає власне значення (\"Доброго ранку\")."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна використовувати позиційний аргумент після іменованого?",
        options: [
          "Ні, це викличе помилку",
          "Так, це працює нормально",
          "Тільки якщо параметр має значення за замовчуванням",
          "Тільки для деяких типів даних"
        ],
        correctAnswer: 0,
        explanation: "Після іменованого аргументу не можна використовувати позиційні аргументи. Це викличе SyntaxError. Правило: спочатку всі позиційні, потім всі іменовані."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef calculate(a, b, operation=\"add\"):\n    if operation == \"add\":\n        return a + b\n    elif operation == \"multiply\":\n        return a * b\n    else:\n        return a - b\n\nprint(calculate(5, 3))\nprint(calculate(5, 3, operation=\"multiply\"))\n```",
        options: [
          "8, потім 15",
          "15, потім 8",
          "Помилку",
          "8, потім 8"
        ],
        correctAnswer: 0,
        explanation: "Перший виклик використовує значення за замовчуванням \"add\" (5 + 3 = 8), другий виклик використовує \"multiply\" (5 * 3 = 15)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де мають бути параметри зі значеннями за замовчуванням?",
        options: [
          "Після параметрів без значень за замовчуванням",
          "Перед параметрами без значень за замовчуванням",
          "Не має значення",
          "Тільки в кінці функції"
        ],
        correctAnswer: 0,
        explanation: "Параметри зі значеннями за замовчуванням мають бути після параметрів без значень за замовчуванням. Це правило Python для уникнення неоднозначності."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef example(a, b, c=10, d=20):\n    return a + b + c + d\n\nprint(example(1, 2))\nprint(example(1, 2, 3))\nprint(example(1, 2, d=30))\n```",
        options: [
          "33, 26, 43",
          "Помилку",
          "33, 33, 33",
          "26, 26, 26"
        ],
        correctAnswer: 0,
        explanation: "Перший: 1 + 2 + 10 + 20 = 33. Другий: 1 + 2 + 3 + 20 = 26 (c=3 замінює значення за замовчуванням). Третій: 1 + 2 + 10 + 30 = 43 (d=30 замінює значення за замовчуванням)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Іменовані аргументи завжди кращі за позиційні.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Не завжди. Для простих функцій з 1-2 параметрами позиційні аргументи часто зручніші та коротші. Іменовані аргументи кращі для складних функцій з багатьма параметрами."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
