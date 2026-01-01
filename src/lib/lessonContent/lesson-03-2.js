/**
 * Lesson 03-2: Параметри, return, None
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_2 = {
  lessonId: "lesson-03-2",
  moduleId: "module-03",
  order: 2,
  title: "Параметри, return, None",
  
  learningObjectives: [
    "Розуміти різницю між параметрами та аргументами",
    "Використовувати return для повернення значень",
    "Розуміти None та його використання",
    "Створювати функції з різними типами повернення",
    "Працювати з функціями, які не повертають значення"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-03-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Параметри vs Аргументи: детальніше",
        content: `У попередньому уроці ми вже згадували про параметри та аргументи. Тепер розберемо це детальніше!

**Параметри** — це змінні, які вказані в визначенні функції (після \`def\`).

**Аргументи** — це конкретні значення, які передаються в функцію при її виклику.

**Приклад:**

\`\`\`python
# Параметри: a та b (в визначенні функції)
def add_numbers(a, b):
    return a + b

# Аргументи: 5 та 3 (при виклику функції)
result = add_numbers(5, 3)
\`\`\`

**Важливо:**

- Параметри — це "заглушки", які показують, які дані функція очікує
- Аргументи — це реальні значення, які передаються в функцію
- Кількість аргументів має відповідати кількості параметрів (якщо не використовуються спеціальні техніки)

**Приклад з різними типами:**

\`\`\`python
def greet(name, age):
    """
    name та age — це параметри
    """
    print(f"Привіт, {name}! Тобі {age} років.")

# При виклику:
greet("Олександр", 20)
# "Олександр" та 20 — це аргументи
\`\`\``
      },
      {
        title: "Return: детальніше",
        content: `Ключове слово \`return\` — це один з найважливіших інструментів у функціях. Воно повертає значення з функції.

**Основне використання return:**

\`\`\`python
def calculate_sum(a, b):
    result = a + b
    return result  # Повертає значення

# Використання
total = calculate_sum(5, 3)  # total = 8
print(total)  # Виведе: 8
\`\`\`

**Return завершує виконання функції:**

Як тільки Python зустрічає \`return\`, він:
1. Повертає значення
2. **Негайно завершує виконання функції**
3. Всі рядки після \`return\` не виконуються

\`\`\`python
def example():
    print("Це виконається")
    return 10
    print("Це НЕ виконається!")  # Цей рядок ніколи не виконається

result = example()
# Виведе: Це виконається
# result = 10
\`\`\`

**Return без значення:**

Якщо після \`return\` нічого не написано, функція повертає \`None\`:

\`\`\`python
def do_something():
    print("Щось робимо...")
    return  # Повертає None

result = do_something()
print(result)  # Виведе: None
\`\`\``
      },
      {
        title: "Множинні return в одній функції",
        content: `У функції може бути кілька операторів \`return\`. Який з них виконається, залежить від умов.

**Приклад з умовою:**

\`\`\`python
def check_number(num):
    """
    Перевіряє число та повертає різні значення
    """
    if num > 0:
        return "Додатне число"
    elif num < 0:
        return "Від'ємне число"
    else:
        return "Нуль"

# Використання
print(check_number(5))   # Виведе: Додатне число
print(check_number(-3))  # Виведе: Від'ємне число
print(check_number(0))   # Виведе: Нуль
\`\`\`

**Важливо:** Після виконання першого \`return\` функція завершується, інші \`return\` не виконуються.

**Приклад: перевірка парності**

\`\`\`python
def is_even(number):
    """
    Перевіряє, чи число парне
    """
    if number % 2 == 0:
        return True
    return False  # Виконається тільки якщо число непарне

# Використання
print(is_even(4))   # True
print(is_even(5))   # False
\`\`\`

**Альтернативний варіант (коротший):**

\`\`\`python
def is_even(number):
    """
    Більш компактний варіант
    """
    return number % 2 == 0  # Повертає True або False безпосередньо

print(is_even(4))   # True
print(is_even(5))   # False
\`\`\``
      },
      {
        title: "Повернення кількох значень",
        content: `Функція може повертати кілька значень одночасно! Для цього використовується кортеж (tuple).

**Синтаксис:**

\`\`\`python
def function_name():
    return value1, value2, value3
\`\`\`

**Приклад: функція, яка повертає два значення**

\`\`\`python
def divide_with_remainder(a, b):
    """
    Ділить a на b та повертає частку та залишок
    """
    quotient = a // b      # Ціла частина ділення
    remainder = a % b      # Залишок від ділення
    return quotient, remainder

# Використання
result = divide_with_remainder(17, 5)
print(result)  # Виведе: (3, 2)
print(type(result))  # Виведе: <class 'tuple'>

# Можна розпакувати в окремі змінні
quotient, remainder = divide_with_remainder(17, 5)
print(f"Частка: {quotient}, Залишок: {remainder}")
# Виведе: Частка: 3, Залишок: 2
\`\`\`

**Приклад: обчислення координат**

\`\`\`python
def calculate_coordinates(x, y, offset):
    """
    Обчислює нові координати після зміщення
    """
    new_x = x + offset
    new_y = y + offset
    return new_x, new_y

# Використання
x, y = calculate_coordinates(10, 20, 5)
print(f"Нові координати: ({x}, {y})")  # Виведе: Нові координати: (15, 25)
\`\`\`

**Приклад: обчислення статистики**

\`\`\`python
def calculate_stats(numbers):
    """
    Обчислює мінімум, максимум та середнє значення
    """
    minimum = min(numbers)
    maximum = max(numbers)
    average = sum(numbers) / len(numbers)
    return minimum, maximum, average

# Використання
nums = [10, 20, 30, 40, 50]
min_val, max_val, avg_val = calculate_stats(nums)
print(f"Мін: {min_val}, Макс: {max_val}, Середнє: {avg_val}")
# Виведе: Мін: 10, Макс: 50, Середнє: 30.0
\`\`\``
      },
      {
        title: "None: що це таке?",
        content: `\`None\` — це спеціальне значення в Python, яке означає "нічого" або "відсутність значення".

**Коли функція повертає None?**

1. **Якщо функція не має return:**
\`\`\`python
def do_something():
    print("Щось робимо...")
    # Немає return

result = do_something()
print(result)  # Виведе: None
\`\`\`

2. **Якщо return без значення:**
\`\`\`python
def do_something():
    print("Щось робимо...")
    return  # Повертає None

result = do_something()
print(result)  # Виведе: None
\`\`\`

3. **Якщо явно повертаємо None:**
\`\`\`python
def find_item(items, target):
    """
    Шукає елемент у списку
    Повертає None, якщо не знайдено
    """
    for item in items:
        if item == target:
            return item
    return None  # Явно повертаємо None

# Використання
items = [1, 2, 3, 4, 5]
result = find_item(items, 6)
print(result)  # Виведе: None
\`\`\`

**Перевірка на None:**

\`\`\`python
def get_value():
    return None

result = get_value()

# Перевірка
if result is None:
    print("Значення відсутнє")
else:
    print(f"Значення: {result}")

# Або
if result == None:  # Теж працює, але краще використовувати 'is'
    print("Значення відсутнє")
\`\`\`

**Важливо:**

- \`None\` — це не те саме, що \`0\`, \`False\` або порожній рядок \`""\`
- \`None\` — це окремий тип даних (\`NoneType\`)
- Для перевірки на \`None\` краще використовувати \`is None\` або \`is not None\``
      },
      {
        title: "Функції без return",
        content: `Функції, які не мають \`return\` або мають \`return\` без значення, автоматично повертають \`None\`.

**Коли це корисно?**

1. **Функції, які тільки виводять інформацію:**
\`\`\`python
def print_info(name, age):
    """
    Виводить інформацію про користувача
    Не повертає значення (повертає None)
    """
    print(f"Ім'я: {name}")
    print(f"Вік: {age}")

result = print_info("Олександр", 20)
# Виведе:
# Ім'я: Олександр
# Вік: 20
print(result)  # Виведе: None
\`\`\`

2. **Функції, які змінюють глобальні змінні (пізніше вивчимо):**
\`\`\`python
counter = 0

def increment_counter():
    """
    Збільшує лічильник
    """
    global counter
    counter += 1
    # Не повертає значення, тільки змінює глобальну змінну

increment_counter()
print(counter)  # Виведе: 1
\`\`\`

3. **Функції для виконання дій:**
\`\`\`python
def display_menu():
    """
    Виводить меню
    """
    print("1. Додати")
    print("2. Видалити")
    print("3. Вийти")

display_menu()  # Просто виводить меню, не повертає значення
\`\`\`

**Важливо розуміти:**

- Функції з \`print()\` корисні для виведення інформації
- Функції з \`return\` корисні для обчислень та отримання результатів
- Обидва підходи правильні, залежить від завдання`
      },
      {
        title: "Типи повернення функцій",
        content: `Функції можуть повертати різні типи даних. Python не вимагає вказувати тип повернення (на відміну від деяких інших мов), але це корисно розуміти.

**Різні типи повернення:**

\`\`\`python
# Повертає число (int)
def add(a, b):
    return a + b

# Повертає рядок (str)
def greet(name):
    return f"Привіт, {name}!"

# Повертає булеве значення (bool)
def is_even(num):
    return num % 2 == 0

# Повертає список (list)
def create_numbers():
    return [1, 2, 3, 4, 5]

# Повертає кортеж (tuple)
def get_coordinates():
    return (10, 20)

# Повертає None
def do_nothing():
    pass  # pass означає "нічого не роби"
\`\`\`

**Приклад з різними типами:**

\`\`\`python
# Число
def calculate_area(width, height):
    return width * height

# Булеве значення
def can_vote(age):
    return age >= 18

# Рядок
def format_name(first, last):
    return f"{first} {last}".title()

# Список
def get_even_numbers(limit):
    evens = []
    for i in range(2, limit + 1, 2):
        evens.append(i)
    return evens

# Використання
area = calculate_area(5, 3)        # int: 15
voting = can_vote(20)              # bool: True
name = format_name("олександр", "петренко")  # str: "Олександр Петренко"
numbers = get_even_numbers(10)     # list: [2, 4, 6, 8, 10]
\`\`\`

**Важливо:**

- Функція може повертати різні типи в різних ситуаціях (але це не завжди добре)
- Краще, щоб функція завжди повертала один тип
- Тип повернення залежить від завдання функції`
      },
      {
        title: "Практичні приклади",
        content: `Давайте розглянемо кілька практичних прикладів, які демонструють різні способи використання return:

**Приклад 1: Функція пошуку**

\`\`\`python
def find_max(numbers):
    """
    Знаходить максимальне число у списку
    Повертає None, якщо список порожній
    """
    if len(numbers) == 0:
        return None
    
    maximum = numbers[0]
    for num in numbers:
        if num > maximum:
            maximum = num
    return maximum

# Використання
nums = [10, 5, 20, 15, 30]
max_num = find_max(nums)
print(f"Максимум: {max_num}")  # Виведе: Максимум: 30

empty = []
result = find_max(empty)
if result is None:
    print("Список порожній")
\`\`\`

**Приклад 2: Функція валідації**

\`\`\`python
def validate_email(email):
    """
    Перевіряє, чи email містить символ @
    Повертає True, якщо валідний, False — якщо ні
    """
    if "@" in email:
        return True
    return False

# Використання
email1 = "user@example.com"
email2 = "invalid-email"

print(validate_email(email1))  # True
print(validate_email(email2))  # False
\`\`\`

**Приклад 3: Функція обчислення з множинними return**

\`\`\`python
def get_grade(score):
    """
    Визначає оцінку за балом
    """
    if score >= 90:
        return "Відмінно"
    elif score >= 75:
        return "Добре"
    elif score >= 60:
        return "Задовільно"
    else:
        return "Незадовільно"

# Використання
print(get_grade(95))  # Відмінно
print(get_grade(80))  # Добре
print(get_grade(50))  # Незадовільно
\`\`\`

**Приклад 4: Функція, яка повертає кілька значень**

\`\`\`python
def analyze_number(num):
    """
    Аналізує число та повертає кілька характеристик
    """
    is_even = num % 2 == 0
    is_positive = num > 0
    square = num ** 2
    
    return is_even, is_positive, square

# Використання
even, positive, squared = analyze_number(5)
print(f"Парне: {even}, Додатне: {positive}, Квадрат: {squared}")
# Виведе: Парне: False, Додатне: True, Квадрат: 25
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми детально вивчили:

**Ключові концепції:**

1. **Параметри vs Аргументи**
   - Параметри — в визначенні функції
   - Аргументи — при виклику функції

2. **Return**
   - Повертає значення з функції
   - Завершує виконання функції
   - Може бути кілька return в одній функції

3. **None**
   - Спеціальне значення "нічого"
   - Повертається, якщо функція не має return
   - Використовується для позначення відсутності значення

4. **Типи повернення**
   - Функції можуть повертати різні типи даних
   - Можна повертати кілька значень (через кортеж)

**Правила:**

- Використовуйте return для обчислень
- Використовуйте print() для виведення
- Перевіряйте на None за допомогою \`is None\`
- Функції без return повертають None

**Наступний крок:**

У наступному уроці ми дізнаємося про позиційні та іменовані аргументи, що дозволить гнучкіше працювати з функціями.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Параметри та аргументи",
      code: `# Параметри: a та b
def multiply(a, b):
    return a * b

# Аргументи: 5 та 3
result = multiply(5, 3)
print(result)  # Виведе: 15`,
      explanation: "Демонструє різницю між параметрами (a, b) та аргументами (5, 3)."
    },
    {
      title: "Return завершує функцію",
      code: `def example():
    print("Перший рядок")
    return 10
    print("Цей рядок не виконається")

result = example()
print(result)`,
      explanation: "Показує, що після return функція завершується, наступні рядки не виконуються."
    },
    {
      title: "Множинні return",
      code: `def check_positive(num):
    if num > 0:
        return "Додатне"
    elif num < 0:
        return "Від'ємне"
    else:
        return "Нуль"

print(check_positive(5))   # Додатне
print(check_positive(-3))   # Від'ємне
print(check_positive(0))    # Нуль`,
      explanation: "Демонструє використання кількох return в одній функції залежно від умов."
    },
    {
      title: "Повернення кількох значень",
      code: `def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"Частка: {q}, Залишок: {r}")`,
      explanation: "Показує, як повернути кілька значень одночасно через кортеж."
    },
    {
      title: "None як значення за замовчуванням",
      code: `def find_item(items, target):
    for item in items:
        if item == target:
            return item
    return None  # Якщо не знайдено

result = find_item([1, 2, 3], 5)
if result is None:
    print("Не знайдено")`,
      explanation: "Демонструє використання None для позначення відсутності результату."
    },
    {
      title: "Функція без return",
      code: `def print_info(name):
    print(f"Ім'я: {name}")

result = print_info("Олександр")
print(result)  # Виведе: None`,
      explanation: "Показує, що функції без return автоматично повертають None."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між параметрами та аргументами",
      explanation: "Початківці часто плутають терміни 'параметр' та 'аргумент'.",
      correctApproach: `# Параметри — це змінні в визначенні функції
def add(a, b):  # a та b — це параметри
    return a + b

# Аргументи — це значення при виклику
result = add(5, 3)  # 5 та 3 — це аргументи`
    },
    {
      mistake: "Очікування значення від функції з print()",
      explanation: "Багато початківців очікують, що функція з print() поверне значення.",
      correctApproach: `# Неправильно (якщо потрібно зберегти результат):
def calculate(a, b):
    print(a + b)  # Тільки виводить, не повертає

# Правильно:
def calculate(a, b):
    return a + b  # Повертає значення`
    },
    {
      mistake: "Забування про None",
      explanation: "Початківці не враховують, що функції без return повертають None.",
      correctApproach: `# Функція без return повертає None
def do_something():
    print("Щось робимо")

result = do_something()  # result буде None
# Перевірка:
if result is None:
    print("Функція не повернула значення")`
    },
    {
      mistake: "Код після return",
      explanation: "Початківці іноді додають код після return, не розуміючи, що він не виконається.",
      correctApproach: `# Неправильно:
def example():
    return 10
    print("Це не виконається!")  # Цей рядок ніколи не виконається

# Правильно:
def example():
    print("Це виконається")
    return 10  # return має бути останнім, якщо потрібно виконати попередній код`
    }
  ],
  
  summary: `На цьому уроці ми детально вивчили параметри, return та None:

1. **Параметри vs Аргументи**
   - Параметри — змінні в визначенні функції
   - Аргументи — значення при виклику функції

2. **Return**
   - Повертає значення з функції
   - Завершує виконання функції
   - Може бути кілька return (залежно від умов)
   - Може повертати кілька значень (через кортеж)

3. **None**
   - Спеціальне значення "нічого"
   - Повертається функціями без return
   - Використовується для позначення відсутності результату

4. **Типи повернення**
   - Функції можуть повертати різні типи даних
   - Важливо розуміти, який тип повертає функція

Ці знання допоможуть створювати більш ефективні та зрозумілі функції!`,
  
  practiceTask: {
    title: "Система оцінювання студентів",
    description: "Створіть функції для обчислення та аналізу оцінок студентів",
    problemStatement: `Напишіть програму, яка містить функції для:

1. **Обчислення середнього балу** — функція приймає три оцінки та повертає середнє значення
2. **Визначення оцінки за буквою** — функція приймає середній бал та повертає оцінку ("Відмінно", "Добре", "Задовільно", "Незадовільно")
3. **Перевірка, чи студент здав** — функція приймає середній бал та повертає True, якщо >= 60, інакше False
4. **Аналіз студента** — функція приймає три оцінки та повертає кортеж: (середній_бал, оцінка_за_буквою, чи_здав)

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді (наприклад: grade1 = 85, grade2 = 90, grade3 = 88).

Кожна функція має:
- Приймати необхідні параметри
- Використовувати return для повернення результатів
- Мати docstring з описом
- Обробляти різні випадки

Після створення функцій, викличте їх з конкретними значеннями та виведіть результати.`,
    inputFormat: `Введіть значення напряму в коді:
grade1 = 85
grade2 = 90
grade3 = 88

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Приклад виведення:
Середній бал: 87.67
Оцінка: Добре
Студент здав: True
Аналіз: (87.67, 'Добре', True)`,
    examples: [
      {
        input: "grade1 = 85, grade2 = 90, grade3 = 88",
        output: `Середній бал: 87.67
Оцінка: Добре
Студент здав: True
Аналіз: (87.67, 'Добре', True)`,
        explanation: "Демонструє обчислення середнього балу та визначення оцінки."
      },
      {
        input: "grade1 = 55, grade2 = 50, grade3 = 60",
        output: `Середній бал: 55.0
Оцінка: Незадовільно
Студент здав: False
Аналіз: (55.0, 'Незадовільно', False)`,
        explanation: "Приклад з низькими оцінками, коли студент не здав."
      },
      {
        input: "grade1 = 95, grade2 = 98, grade3 = 97",
        output: `Середній бал: 96.67
Оцінка: Відмінно
Студент здав: True
Аналіз: (96.67, 'Відмінно', True)`,
        explanation: "Приклад з високими оцінками для відмінної оцінки."
      }
    ],
    solution: {
      code: `# Система оцінювання студентів

def calculate_average(grade1, grade2, grade3):
    """
    Обчислює середній бал з трьох оцінок
    """
    total = grade1 + grade2 + grade3
    average = total / 3
    return round(average, 2)

def get_letter_grade(average):
    """
    Визначає оцінку за буквою на основі середнього балу
    """
    if average >= 90:
        return "Відмінно"
    elif average >= 75:
        return "Добре"
    elif average >= 60:
        return "Задовільно"
    else:
        return "Незадовільно"

def has_passed(average):
    """
    Перевіряє, чи студент здав (середній бал >= 60)
    """
    return average >= 60

def analyze_student(grade1, grade2, grade3):
    """
    Аналізує студента та повертає кортеж з результатами
    """
    avg = calculate_average(grade1, grade2, grade3)
    letter = get_letter_grade(avg)
    passed = has_passed(avg)
    return avg, letter, passed

# Вводимо значення напряму в коді (не використовуємо input())
grade1 = 85
grade2 = 90
grade3 = 88

# Обчислюємо середній бал
average = calculate_average(grade1, grade2, grade3)
print(f"Середній бал: {average}")

# Визначаємо оцінку
letter_grade = get_letter_grade(average)
print(f"Оцінка: {letter_grade}")

# Перевіряємо, чи здав
passed = has_passed(average)
print(f"Студент здав: {passed}")

# Повний аналіз
analysis = analyze_student(grade1, grade2, grade3)
print(f"Аналіз: {analysis}")`,
      explanation: "Рішення створює чотири функції: обчислення середнього, визначення оцінки, перевірка здачі та повний аналіз. Функція analyze_student демонструє повернення кількох значень через кортеж."
    },
    hints: [
      "Введіть значення напряму в коді (grade1, grade2, grade3) - не використовуйте input()",
      "Функція calculate_average має додати три оцінки та розділити на 3",
      "Функція get_letter_grade має використовувати if/elif/else для визначення оцінки",
      "Функція has_passed має повертати True або False",
      "Функція analyze_student має викликати інші функції та повернути кортеж",
      "Використовуйте return для повернення значень з усіх функцій"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: ["85", "90", "88"],
        expectedOutput: "Середній бал: 87.67",
        description: "Перевірка обчислення середнього балу"
      },
      {
        input: ["95", "98", "97"],
        expectedOutput: "Оцінка: Відмінно",
        description: "Перевірка визначення оцінки 'Відмінно'"
      },
      {
        input: ["55", "50", "60"],
        expectedOutput: "Студент здав: False",
        description: "Перевірка, що студент не здав з низькими оцінками"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке параметр функції?",
        options: [
          "Змінна в визначенні функції, яка приймає значення при виклику",
          "Значення, яке передається при виклику функції",
          "Результат роботи функції",
          "Назва функції"
        ],
        correctAnswer: 0,
        explanation: "Параметр — це змінна в визначенні функції (наприклад, def add(a, b):). Аргумент — це значення, яке передається при виклику (наприклад, add(5, 3))."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає функція без return?",
        options: [
          "None",
          "0",
          "False",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Функція без return автоматично повертає None — спеціальне значення, яке означає 'нічого'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef example():\n    print(\"Перший\")\n    return 10\n    print(\"Другий\")\n\nresult = example()\nprint(result)\n```",
        options: [
          "Перший, потім 10",
          "Перший, Другий, потім 10",
          "Тільки 10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Після return функція завершується, тому 'Другий' не виведеться. Виведеться 'Перший', потім 10."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як повернути кілька значень з функції?",
        options: [
          "Через кортеж: return value1, value2",
          "Через список: return [value1, value2]",
          "Обидва варіанти працюють",
          "Неможливо повернути кілька значень"
        ],
        correctAnswer: 2,
        explanation: "Можна повернути кілька значень через кортеж (return a, b) або через список (return [a, b]). Кортеж частіше використовується для цього."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef divide(a, b):\n    quotient = a // b\n    remainder = a % b\n    return quotient, remainder\n\nq, r = divide(17, 5)\nprint(f\"{q}, {r}\")\n```",
        options: [
          "3, 2",
          "(3, 2)",
          "17, 5",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Функція повертає кортеж (3, 2), який розпаковується в змінні q та r. Виведеться '3, 2'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як краще перевірити, чи значення дорівнює None?",
        options: [
          "value is None",
          "value == None",
          "Обидва варіанти працюють однаково",
          "value != None"
        ],
        correctAnswer: 0,
        explanation: "Краще використовувати 'is None' або 'is not None', оскільки це перевіряє ідентичність об'єкта, а не тільки значення."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ndef check(num):\n    if num > 0:\n        return \"Додатне\"\n    return \"Не додатне\"\n\nprint(check(5))\nprint(check(-3))\n```",
        options: [
          "Додатне, потім Не додатне",
          "Додатне, потім Додатне",
          "Не додатне, потім Не додатне",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Для 5 умова num > 0 True, тому повертається 'Додатне'. Для -3 умова False, тому виконується другий return 'Не додатне'."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Функція може мати кілька операторів return.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, функція може мати кілька return. Який з них виконається, залежить від умов та логіки функції."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
