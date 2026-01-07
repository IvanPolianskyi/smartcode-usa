/**
 * Lesson 03-4: *args та **kwargs
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_4 = {
  lessonId: "lesson-03-4",
  moduleId: "module-03",
  order: 4,
  title: "*args та **kwargs",
  
  learningObjectives: [
    "Розуміти призначення *args та **kwargs",
    "Використовувати *args для роботи з довільною кількістю позиційних аргументів",
    "Використовувати **kwargs для роботи з довільною кількістю іменованих аргументів",
    "Комбінувати *args та **kwargs в одній функції",
    "Розуміти порядок параметрів при використанні *args та **kwargs"
  ],
  
  prerequisites: ["lesson-03-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ: навіщо потрібні *args та **kwargs?",
        content: `Іноді ми не знаємо заздалегідь, скільки аргументів буде передано в функцію. Наприклад, функція для обчислення суми чисел має працювати з будь-якою кількістю чисел.

**Проблема без *args:**

\`\`\`python
def calculate_sum(a, b):
    return a + b

# Це працює тільки для двох чисел
result = calculate_sum(5, 3)  # 8

# А що якщо потрібно додати 3, 4 або більше чисел?
# Потрібно створювати багато функцій або використовувати складні рішення
\`\`\`

**Рішення з *args:**

\`\`\`python
def calculate_sum(*args):
    return sum(args)

# Тепер працює з будь-якою кількістю чисел!
result1 = calculate_sum(5, 3)           # 8
result2 = calculate_sum(5, 3, 10, 2)    # 20
result3 = calculate_sum(1, 2, 3, 4, 5)  # 15
\`\`\`

**Аналогічно з **kwargs:**

Якщо потрібно приймати довільну кількість іменованих аргументів (наприклад, налаштування), використовуємо **kwargs.`
      },
      {
        title: "Що таке *args?",
        content: `\`*args\` дозволяє функції приймати довільну кількість позиційних аргументів. Аргументи збираються в кортеж (tuple).

**Синтаксис:**

\`\`\`python
def function_name(*args):
    # args - це кортеж з усіх переданих позиційних аргументів
    pass
\`\`\`

**Приклад:**

\`\`\`python
def print_numbers(*args):
    """
    Виводить усі передані числа
    """
    print(f"Отримано {len(args)} чисел:")
    for number in args:
        print(number)

# Використання
print_numbers(1, 2, 3)
# Виведе:
# Отримано 3 чисел:
# 1
# 2
# 3

print_numbers(10, 20, 30, 40, 50)
# Виведе:
# Отримано 5 чисел:
# 10
# 20
# 30
# 40
# 50
\`\`\`

**Важливо:**

1. **Назва "args" - це конвенція, можна використовувати будь-яку назву:**
\`\`\`python
def example(*numbers):  # Теж працює!
    return sum(numbers)

result = example(1, 2, 3, 4)  # 10
\`\`\`

2. ***args збирає аргументи в кортеж:**
\`\`\`python
def show_args(*args):
    print(f"Тип: {type(args)}")
    print(f"Значення: {args}")

show_args(1, 2, 3)
# Виведе:
# Тип: <class 'tuple'>
# Значення: (1, 2, 3)
\`\`\`

3. ***args може бути порожнім:**
\`\`\`python
def example(*args):
    if len(args) == 0:
        print("Аргументи не передані")
    else:
        print(f"Отримано {len(args)} аргументів")

example()  # Аргументи не передані
example(1, 2)  # Отримано 2 аргументів
\`\`\``
      },
      {
        title: "Практичні приклади з *args",
        content: `**Приклад 1: Обчислення середнього значення**

\`\`\`python
def calculate_average(*numbers):
    """
    Обчислює середнє значення з довільної кількості чисел
    """
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)

# Використання
avg1 = calculate_average(10, 20, 30)        # 20.0
avg2 = calculate_average(5, 15, 25, 35, 45)  # 25.0
avg3 = calculate_average(100)               # 100.0
\`\`\`

**Приклад 2: Пошук максимального значення**

\`\`\`python
def find_max(*numbers):
    """
    Знаходить максимальне значення серед переданих чисел
    """
    if len(numbers) == 0:
        return None
    return max(numbers)

# Використання
max1 = find_max(10, 5, 20, 15)      # 20
max2 = find_max(1, 2, 3, 4, 5, 6)   # 6
max3 = find_max(100)                # 100
\`\`\`

**Приклад 3: Об'єднання рядків**

\`\`\`python
def join_strings(*words, separator=" "):
    """
    Об'єднує рядки з опціональним роздільником
    """
    return separator.join(words)

# Використання
result1 = join_strings("Привіт", "світ", "Python")  # "Привіт світ Python"
result2 = join_strings("a", "b", "c", separator="-")  # "a-b-c"
result3 = join_strings("1", "2", "3", separator="")   # "123"
\`\`\`

**Приклад 4: Функція з обов'язковими та *args параметрами**

\`\`\`python
def create_message(title, *details):
    """
    Створює повідомлення з заголовком та деталями
    """
    message = f"Заголовок: {title}\\n"
    message += "Деталі:\\n"
    for i, detail in enumerate(details, 1):
        message += f"  {i}. {detail}\\n"
    return message

# Використання
msg1 = create_message("Важливо", "Перша деталь", "Друга деталь")
msg2 = create_message("Повідомлення", "Деталь 1", "Деталь 2", "Деталь 3")
\`\`\``
      },
      {
        title: "Що таке **kwargs?",
        content: `\`**kwargs\` дозволяє функції приймати довільну кількість іменованих аргументів. Аргументи збираються в словник (dictionary).

**Синтаксис:**

\`\`\`python
def function_name(**kwargs):
    # kwargs - це словник з усіх переданих іменованих аргументів
    pass
\`\`\`

**Приклад:**

\`\`\`python
def print_info(**kwargs):
    """
    Виводить усі передані іменовані аргументи
    """
    print("Отримано наступну інформацію:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

# Використання
print_info(name="Олександр", age=20, city="Київ")
# Виведе:
# Отримано наступну інформацію:
#   name: Олександр
#   age: 20
#   city: Київ

print_info(title="Програміст", experience=5, language="Python")
# Виведе:
# Отримано наступну інформацію:
#   title: Програміст
#   experience: 5
#   language: Python
\`\`\`

**Важливо:**

1. **Назва "kwargs" - це конвенція, можна використовувати будь-яку назву:**
\`\`\`python
def example(**options):  # Теж працює!
    return options

result = example(a=1, b=2, c=3)
\`\`\`

2. ****kwargs збирає аргументи в словник:**
\`\`\`python
def show_kwargs(**kwargs):
    print(f"Тип: {type(kwargs)}")
    print(f"Значення: {kwargs}")

show_kwargs(a=1, b=2, c=3)
# Виведе:
# Тип: <class 'dict'>
# Значення: {'a': 1, 'b': 2, 'c': 3}
\`\`\`

3. ****kwargs може бути порожнім:**
\`\`\`python
def example(**kwargs):
    if len(kwargs) == 0:
        print("Іменовані аргументи не передані")
    else:
        print(f"Отримано {len(kwargs)} іменованих аргументів")

example()  # Іменовані аргументи не передані
example(a=1, b=2)  # Отримано 2 іменованих аргументів
\`\`\`

4. **Доступ до значень через ключі:**
\`\`\`python
def check_user(**kwargs):
    if "name" in kwargs:
        print(f"Ім'я: {kwargs['name']}")
    if "age" in kwargs:
        print(f"Вік: {kwargs['age']}")

check_user(name="Олександр", age=20)
# Виведе:
# Ім'я: Олександр
# Вік: 20
\`\`\``
      },
      {
        title: "Практичні приклади з **kwargs",
        content: `**Приклад 1: Створення профілю користувача**

\`\`\`python
def create_profile(**info):
    """
    Створює профіль користувача з довільною інформацією
    """
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

# Використання
profile1 = create_profile(name="Олександр", age=20, city="Київ")
profile2 = create_profile(username="user1", email="user@example.com", role="admin")
profile3 = create_profile(title="Програміст", experience=5, skills=["Python", "JavaScript"])
\`\`\`

**Приклад 2: Налаштування з опціональними параметрами**

\`\`\`python
def configure_app(**settings):
    """
    Налаштовує додаток з опціональними параметрами
    """
    default_settings = {
        "theme": "light",
        "language": "uk",
        "notifications": True,
        "font_size": 14
    }
    
    # Оновлюємо налаштування за замовчуванням переданими значеннями
    default_settings.update(settings)
    
    return default_settings

# Використання
config1 = configure_app()  # Всі значення за замовчуванням
config2 = configure_app(theme="dark")  # Тільки тема змінена
config3 = configure_app(theme="dark", font_size=18, language="en")  # Кілька параметрів
\`\`\`

**Приклад 3: Фільтрація даних**

\`\`\`python
def filter_data(data, **filters):
    """
    Фільтрує дані за різними критеріями
    """
    filtered = []
    for item in data:
        match = True
        for key, value in filters.items():
            if item.get(key) != value:
                match = False
                break
        if match:
            filtered.append(item)
    return filtered

# Використання
users = [
    {"name": "Олександр", "age": 20, "city": "Київ"},
    {"name": "Марія", "age": 25, "city": "Львів"},
    {"name": "Іван", "age": 20, "city": "Київ"}
]

result1 = filter_data(users, age=20)  # Всі з віком 20
result2 = filter_data(users, city="Київ")  # Всі з Києва
result3 = filter_data(users, age=20, city="Київ")  # Вік 20 та з Києва
\`\`\`

**Приклад 4: Логування з метаданими**

\`\`\`python
def log_message(message, **metadata):
    """
    Логує повідомлення з додатковими метаданими
    """
    log_entry = f"Повідомлення: {message}"
    if metadata:
        log_entry += "\\nМетадані:"
        for key, value in metadata.items():
            log_entry += f"\\n  {key}: {value}"
    print(log_entry)

# Використання
log_message("Помилка підключення", level="error", timestamp="2024-01-15", user="admin")
log_message("Успішне підключення", level="info", user="user1")
\`\`\``
      },
      {
        title: "Комбінування *args та **kwargs",
        content: `Можна використовувати \`*args\` та \`**kwargs\` в одній функції! Це дає максимальну гнучкість.

**Правильний порядок параметрів:**

1. Спочатку звичайні параметри
2. Потім \`*args\`
3. Потім параметри зі значеннями за замовчуванням
4. Нарешті \`**kwargs\`

\`\`\`python
def example(required, *args, default="значення", **kwargs):
    """
    Правильний порядок параметрів
    """
    print(f"Обов'язковий: {required}")
    print(f"*args: {args}")
    print(f"За замовчуванням: {default}")
    print(f"**kwargs: {kwargs}")

# Використання
example("обов'язковий", 1, 2, 3, default="інше", a=1, b=2)
\`\`\`

**Приклад: Універсальна функція обробки даних**

\`\`\`python
def process_data(operation, *numbers, **options):
    """
    Обробляє числа з різними операціями та опціями
    """
    if operation == "sum":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    elif operation == "average":
        result = sum(numbers) / len(numbers) if numbers else 0
    else:
        result = None
    
    # Обробка опцій
    if "round" in options and options["round"]:
        result = round(result)
    
    if "format" in options:
        if options["format"] == "int":
            result = int(result)
    
    return result

# Використання
result1 = process_data("sum", 1, 2, 3, 4, 5)  # 15
result2 = process_data("average", 10, 20, 30, round=True)  # 20
result3 = process_data("multiply", 2, 3, 4, format="int")  # 24
\`\`\`

**Приклад: Створення HTML-тегів**

\`\`\`python
def create_tag(tag_name, *content, **attributes):
    """
    Створює HTML-тег з контентом та атрибутами
    """
    attrs = " ".join([f'{key}="{value}"' for key, value in attributes.items()])
    if attrs:
        attrs = " " + attrs
    
    content_str = "".join(str(item) for item in content)
    
    return f"<{tag_name}{attrs}>{content_str}</{tag_name}>"

# Використання
tag1 = create_tag("div", "Привіт", "світ", class="container", id="main")
# <div class="container" id="main">Привітсвіт</div>

tag2 = create_tag("a", "Посилання", href="https://example.com", target="_blank")
# <a href="https://example.com" target="_blank">Посилання</a>
\`\`\`

**Важливе правило:**

Після \`*args\` не можна використовувати позиційні параметри без значень за замовчуванням:

\`\`\`python
# Неправильно:
def example(*args, required_param):  #  Помилка!
    pass

# Правильно:
def example(*args, default_param="значення"):  # 
    pass

def example(required_param, *args, default_param="значення"):  # 
    pass
\`\`\``
      },
      {
        title: "Розпакування *args та **kwargs",
        content: `Можна не тільки збирати аргументи, але й розпаковувати їх при виклику функції!

**Розпакування *args:**

\`\`\`python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]

# Розпакування списку в аргументи
result = add(*numbers)  # Еквівалентно add(1, 2, 3)
print(result)  # 6

# Також працює з кортежами
numbers_tuple = (10, 20, 30)
result = add(*numbers_tuple)  # 60
\`\`\`

**Розпакування **kwargs:**

\`\`\`python
def greet(name, age, city):
    print(f"Привіт, {name}! Тобі {age} років. Ти з {city}.")

info = {
    "name": "Олександр",
    "age": 20,
    "city": "Київ"
}

# Розпакування словника в іменовані аргументи
greet(**info)  # Еквівалентно greet(name="Олександр", age=20, city="Київ")
\`\`\`

**Комбінування розпакування:**

\`\`\`python
def example(a, b, c, d, e):
    return a + b + c + d + e

args_list = [1, 2, 3]
kwargs_dict = {"d": 4, "e": 5}

# Комбінування позиційних та іменованих
result = example(*args_list, **kwargs_dict)  # 15
\`\`\`

**Практичний приклад: Делегування викликів**

\`\`\`python
def wrapper_function(*args, **kwargs):
    """
    Обгортка, яка передає аргументи в іншу функцію
    """
    print("Викликається обгортка")
    return original_function(*args, **kwargs)

def original_function(a, b, c=10):
    return a + b + c

# Використання
result = wrapper_function(1, 2, c=20)  # Передає аргументи далі
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили потужні інструменти для роботи з аргументами:

**Ключові концепції:**

1. **\`*args\`**
   - Збирає довільну кількість позиційних аргументів в кортеж
   - Назва "args" - конвенція, можна використовувати будь-яку
   - Дозволяє створювати гнучкі функції

2. **\`**kwargs\`**
   - Збирає довільну кількість іменованих аргументів в словник
   - Назва "kwargs" - конвенція, можна використовувати будь-яку
   - Дозволяє працювати з опціональними параметрами

3. **Комбінування**
   - Можна використовувати обидва в одній функції
   - Порядок: звичайні параметри → *args → параметри за замовчуванням → **kwargs
   - Після *args не можна використовувати позиційні без значень за замовчуванням

4. **Розпакування**
   - \`*список\` розпаковує список/кортеж в позиційні аргументи
   - \`**словник\` розпаковує словник в іменовані аргументи
   - Корисно для делегування викликів функцій

**Коли використовувати:**

- \`*args\` - коли кількість позиційних аргументів невідома
- \`**kwargs\` - коли потрібні опціональні іменовані параметри
- Комбінування - для максимальної гнучкості

**Наступний крок:**

У наступному уроці ми дізнаємося про методи об'єктів - як працювати з методами рядків, списків та інших об'єктів.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Базовий приклад *args",
      code: `def calculate_sum(*args):
    """
    Обчислює суму довільної кількості чисел
    """
    return sum(args)

# Використання
print(calculate_sum(1, 2, 3))        # 6
print(calculate_sum(10, 20, 30, 40))  # 100
print(calculate_sum(5))              # 5`,
      explanation: "Демонструє базове використання *args для роботи з довільною кількістю аргументів."
    },
    {
      title: "Базовий приклад **kwargs",
      code: `def print_info(**kwargs):
    """
    Виводить усі передані іменовані аргументи
    """
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Використання
print_info(name="Олександр", age=20, city="Київ")
print_info(title="Програміст", experience=5)`,
      explanation: "Показує базове використання **kwargs для роботи з іменованими аргументами."
    },
    {
      title: "Комбінування *args та **kwargs",
      code: `def process_data(operation, *numbers, **options):
    """
    Обробляє числа з різними операціями та опціями
    """
    if operation == "sum":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    else:
        result = None
    
    if "round" in options and options["round"]:
        result = round(result)
    
    return result

# Використання
print(process_data("sum", 1, 2, 3, 4))  # 10
print(process_data("multiply", 2, 3, 4, round=True))  # 24`,
      explanation: "Демонструє комбінування *args та **kwargs в одній функції."
    },
    {
      title: "Розпакування *args",
      code: `def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)  # Розпаковує список в аргументи
print(result)  # 6`,
      explanation: "Показує, як розпакувати список/кортеж в позиційні аргументи."
    },
    {
      title: "Розпакування **kwargs",
      code: `def greet(name, age, city):
    print(f"Привіт, {name}! Тобі {age} років. Ти з {city}.")

info = {"name": "Олександр", "age": 20, "city": "Київ"}
greet(**info)  # Розпаковує словник в іменовані аргументи`,
      explanation: "Демонструє розпакування словника в іменовані аргументи."
    },
    {
      title: "Функція з обов'язковими та опціональними параметрами",
      code: `def create_message(title, *details, **metadata):
    """
    Створює повідомлення з заголовком, деталями та метаданими
    """
    message = f"Заголовок: {title}\\n"
    if details:
        message += "Деталі:\\n"
        for detail in details:
            message += f"  - {detail}\\n"
    if metadata:
        message += "Метадані:\\n"
        for key, value in metadata.items():
            message += f"  {key}: {value}\\n"
    return message

# Використання
msg = create_message("Важливо", "Деталь 1", "Деталь 2", author="Admin", date="2024-01-15")
print(msg)`,
      explanation: "Практичний приклад функції, яка використовує звичайні параметри, *args та **kwargs."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неправильний порядок параметрів",
      explanation: "Початківці часто плутають порядок параметрів при використанні *args та **kwargs.",
      correctApproach: `# Неправильно:
def example(**kwargs, *args):  #  Помилка! **kwargs не може бути перед *args
    pass

# Правильно:
def example(*args, **kwargs):  #  Правильний порядок
    pass

# Або з обов'язковими параметрами:
def example(required, *args, default="значення", **kwargs):  # 
    pass`
    },
    {
      mistake: "Позиційний параметр після *args без значення за замовчуванням",
      explanation: "Після *args не можна використовувати позиційні параметри без значень за замовчуванням.",
      correctApproach: `# Неправильно:
def example(*args, required_param):  #  Помилка!
    pass

# Правильно:
def example(*args, default_param="значення"):  #  Зі значенням за замовчуванням
    pass

# Або обов'язковий параметр перед *args:
def example(required_param, *args):  # 
    pass`
    },
    {
      mistake: "Плутанина між *args та **kwargs",
      explanation: "Початківці часто плутають, коли використовувати *args, а коли **kwargs.",
      correctApproach: `# *args - для позиційних аргументів (збираються в кортеж)
def example(*args):
    print(args)  # (1, 2, 3)

example(1, 2, 3)  # Позиційні аргументи

# **kwargs - для іменованих аргументів (збираються в словник)
def example(**kwargs):
    print(kwargs)  # {'a': 1, 'b': 2}

example(a=1, b=2)  # Іменовані аргументи`
    },
    {
      mistake: "Забування про те, що *args та **kwargs можуть бути порожніми",
      explanation: "Початківці іноді не перевіряють, чи передані аргументи, що може призвести до помилок.",
      correctApproach: `# Правильно - перевірка наявності аргументів
def example(*args, **kwargs):
    if len(args) == 0:
        print("Позиційні аргументи не передані")
    else:
        print(f"Отримано {len(args)} позиційних аргументів")
    
    if len(kwargs) == 0:
        print("Іменовані аргументи не передані")
    else:
        print(f"Отримано {len(kwargs)} іменованих аргументів")

example()  # Обидва повідомлення про відсутність аргументів`
    }
  ],
  
  summary: `На цьому уроці ми вивчили *args та kwargs - потужні інструменти для роботи з аргументами:

1. \`*args\`
   - Збирає довільну кількість позиційних аргументів в кортеж
   - Дозволяє створювати гнучкі функції
   - Назва "args" - конвенція, можна використовувати будь-яку

2. \`kwargs\`
   - Збирає довільну кількість іменованих аргументів в словник
   - Корисно для опціональних параметрів та налаштувань
   - Назва "kwargs" - конвенція, можна використовувати будь-яку

3. Комбінування
   - Можна використовувати обидва в одній функції
   - Правильний порядок: звичайні → *args → за замовчуванням → kwargs
   - Після *args не можна використовувати позиційні без значень за замовчуванням

4. Розпакування
   - \`*список\` розпаковує в позиційні аргументи
   - \`словник\` розпаковує в іменовані аргументи
   - Корисно для делегування викликів

Ці інструменти роблять функції більш гнучкими та потужними!`,
  
  practiceTask: {
    title: "Універсальний калькулятор",
    description: "Створіть універсальний калькулятор, який працює з довільною кількістю чисел та опціями",
    problemStatement: `Напишіть програму з функціями для універсального калькулятора:

1. **calculate** - основна функція калькулятора
   - Параметри: operation (обов'язковий), *numbers (довільна кількість чисел), **options (опціональні налаштування)
   - Підтримувані операції: "add" (додавання), "multiply" (множення), "average" (середнє)
   - Опції: "round" (округлити результат), "format" (може бути "int" або "float")
   - Повертає результат обчислення

2. **format_result** - форматує результат
   - Параметри: result (число), **format_options (опції форматування)
   - Опції: "decimals" (кількість знаків після коми), "prefix" (префікс перед числом), "suffix" (суфікс після числа)
   - Повертає відформатований рядок

3. **display_calculation** - виводить інформацію про обчислення
   - Параметри: operation, *numbers, result, **info (додаткова інформація)
   - Виводить детальну інформацію про обчислення

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді.

Створіть кілька прикладів використання калькулятора з різними операціями та опціями.`,
    outputFormat: `Приклад виведення:
=== Обчислення ===
Операція: add
Числа: 10, 20, 30
Результат: 60
Форматування: 60`,
    examples: [
      {
        output: `=== Обчислення ===
Операція: add
Числа: 10, 20, 30
Результат: 60
Форматування: 60`,
        explanation: "Демонструє додавання чисел з опцією округлення."
      }
    ],
    solution: {
      code: `# Універсальний калькулятор

def calculate(operation, *numbers, **options):
    """
    Виконує математичні операції над довільною кількістю чисел
    """
    if len(numbers) == 0:
        return None
    
    if operation == "add":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    elif operation == "average":
        result = sum(numbers) / len(numbers)
    else:
        return None
    
    # Обробка опцій
    if "round" in options and options["round"]:
        result = round(result)
    
    if "format" in options:
        if options["format"] == "int":
            result = int(result)
        elif options["format"] == "float":
            result = float(result)
    
    return result

def format_result(result, **format_options):
    """
    Форматує результат з опціями
    """
    if result is None:
        return "Помилка"
    
    formatted = result
    
    # Обробка decimals
    if "decimals" in format_options:
        formatted = round(formatted, format_options["decimals"])
    
    # Додавання префіксу та суфіксу
    prefix = format_options.get("prefix", "")
    suffix = format_options.get("suffix", "")
    
    return f"{prefix}{formatted}{suffix}"

def display_calculation(operation, *numbers, result, **info):
    """
    Виводить детальну інформацію про обчислення
    """
    print("=== Обчислення ===")
    print(f"Операція: {operation}")
    print(f"Числа: {', '.join(str(n) for n in numbers)}")
    print(f"Результат: {result}")
    
    if info:
        print("Додаткова інформація:")
        for key, value in info.items():
            print(f"  {key}: {value}")
    
    # Форматування результату
    formatted = format_result(result)
    print(f"Форматування: {formatted}")
    print()

# Вводимо значення напряму в коді (не використовуємо input())

# Приклад 1: Додавання з округленням
result1 = calculate("add", 10, 20, 30, round=True)
display_calculation("add", 10, 20, 30, result=result1)

# Приклад 2: Множення з форматуванням
result2 = calculate("multiply", 2, 3, 4, format="int")
display_calculation("multiply", 2, 3, 4, result=result2, note="Множення трьох чисел")

# Приклад 3: Середнє значення з округленням та форматуванням
result3 = calculate("average", 10, 20, 30, 40, round=True, format="int")
display_calculation("average", 10, 20, 30, 40, result=result3, description="Середнє арифметичне")

# Приклад 4: Форматування з префіксом та суфіксом
result4 = calculate("add", 15, 25, 35)
formatted = format_result(result4, prefix="Сума: ", suffix=" грн", decimals=2)
print(f"Відформатований результат: {formatted}")`,
      explanation: "Рішення демонструє використання *args для довільної кількості чисел, **kwargs для опцій та комбінування обох підходів. Функції працюють гнучко з різними комбінаціями аргументів."
    },
    hints: [
      "Введіть значення напряму в коді - не використовуйте input()",
      "Функція calculate має обробляти різні операції та опції через **kwargs",
      "Використовуйте *numbers для прийняття довільної кількості чисел",
      "Перевіряйте наявність опцій в **kwargs перед використанням (наприклад, 'round' in options)",
      "Функція format_result має обробляти різні опції форматування",
      "Функція display_calculation має використовувати *numbers та **info для гнучкості",
      "Пам'ятайте про правильний порядок параметрів: обов'язкові → *args → **kwargs"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "Результат: 60",
        description: "Перевірка додавання трьох чисел"
      },
      {
        expectedOutput: "Результат: 24",
        description: "Перевірка множення трьох чисел"
      },
      {
        expectedOutput: "Результат: 20.0",
        description: "Перевірка обчислення середнього значення"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке *args?",
        options: [
          "Механізм для прийняття довільної кількості позиційних аргументів",
          "Механізм для прийняття довільної кількості іменованих аргументів",
          "Спеціальна змінна в Python",
          "Тип даних"
        ],
        correctAnswer: 0,
        explanation: "*args дозволяє функції приймати довільну кількість позиційних аргументів, які збираються в кортеж."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "У що збираються аргументи в **kwargs?",
        options: [
          "Словник (dictionary)",
          "Кортеж (tuple)",
          "Список (list)",
          "Множина (set)"
        ],
        correctAnswer: 0,
        explanation: "**kwargs збирає іменовані аргументи в словник, де ключі - це імена параметрів, а значення - передані значення."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef example(*args):\n    return len(args)\n\nprint(example(1, 2, 3, 4, 5))\n```",
        options: [
          "5",
          "Помилку",
          "0",
          "(1, 2, 3, 4, 5)"
        ],
        correctAnswer: 0,
        explanation: "Функція приймає 5 позиційних аргументів через *args, які збираються в кортеж. len(args) повертає 5."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який правильний порядок параметрів у функції?",
        options: [
          "обов'язкові → *args → параметри за замовчуванням → **kwargs",
          "*args → **kwargs → обов'язкові",
          "**kwargs → *args → обов'язкові",
          "Порядок не має значення"
        ],
        correctAnswer: 0,
        explanation: "Правильний порядок: спочатку обов'язкові параметри, потім *args, потім параметри зі значеннями за замовчуванням, і нарешті **kwargs."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef example(**kwargs):\n    if 'name' in kwargs:\n        return kwargs['name']\n    return 'Невідомо'\n\nprint(example(age=20, city='Київ'))\nprint(example(name='Олександр', age=20))\n```",
        options: [
          "Невідомо, потім Олександр",
          "Помилку",
          "Олександр, потім Невідомо",
          "Невідомо, потім Невідомо"
        ],
        correctAnswer: 0,
        explanation: "Перший виклик не містить 'name' в kwargs, тому повертається 'Невідомо'. Другий виклик містить 'name', тому повертається 'Олександр'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна використовувати іншу назву замість 'args' та 'kwargs'?",
        options: [
          "Так, це лише конвенція",
          "Ні, це зарезервовані слова",
          "Тільки для *args",
          "Тільки для **kwargs"
        ],
        correctAnswer: 0,
        explanation: "Назви 'args' та 'kwargs' - це лише конвенції. Можна використовувати будь-які назви, наприклад *numbers або **options."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef example(a, *args, **kwargs):\n    print(f'a={a}, args={args}, kwargs={kwargs}')\n\nexample(1, 2, 3, x=10, y=20)\n```",
        options: [
          "a=1, args=(2, 3), kwargs={'x': 10, 'y': 20}",
          "Помилку",
          "a=1, args=(1, 2, 3), kwargs={}",
          "a=1, args=(), kwargs={'x': 10, 'y': 20, '2': 3}"
        ],
        correctAnswer: 0,
        explanation: "a=1 (обов'язковий параметр), args=(2, 3) (позиційні аргументи після a), kwargs={'x': 10, 'y': 20} (іменовані аргументи)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Після *args можна використовувати позиційні параметри без значень за замовчуванням.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Ні, після *args можна використовувати тільки параметри зі значеннями за замовчуванням або **kwargs. Позиційні параметри без значень за замовчуванням мають бути перед *args."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
