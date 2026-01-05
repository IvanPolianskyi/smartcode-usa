/**
 * Lesson 03-6: Lambda-функції
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_6 = {
  lessonId: "lesson-03-6",
  moduleId: "module-03",
  order: 6,
  title: "Lambda-функції",
  
  learningObjectives: [
    "Розуміти, що таке lambda-функції та коли їх використовувати",
    "Використовувати функцію map() для застосування функції до всіх елементів",
    "Використовувати функцію filter() для фільтрації елементів",
    "Комбінувати lambda з map() та filter()",
    "Розуміти переваги та обмеження lambda-функцій"
  ],
  
  prerequisites: ["lesson-03-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке lambda-функції?",
        content: `Lambda-функції (також називаються анонімними функціями) - це спосіб створювати короткі функції без використання ключового слова \`def\`.

**Основна ідея:**

Замість створення повної функції:
\`\`\`python
def square(x):
    return x ** 2
\`\`\`

Можна створити lambda-функцію:
\`\`\`python
square = lambda x: x ** 2
\`\`\`

**Синтаксис:**

\`\`\`python
lambda аргументи: вираз
\`\`\`

**Приклад:**

\`\`\`python
# Звичайна функція
def add(a, b):
    return a + b

# Lambda-функція
add = lambda a, b: a + b

# Обидва працюють однаково
print(add(5, 3))  # 8
\`\`\`

**Ключові особливості:**

1. **Lambda - це вираз, а не блок коду**
   - Може містити тільки один вираз
   - Не може містити кілька рядків або складну логіку

2. **Анонімність**
   - Lambda-функції не потребують імені (хоча можна присвоїти змінній)
   - Часто використовуються безпосередньо в коді

3. **Коли використовувати:**
   - Для простих функцій, які використовуються один раз
   - З функціями \`map()\`, \`filter()\`, \`sorted()\`
   - Для коротких операцій, які не потребують повного визначення функції`
      },
      {
        title: "Функція map()",
        content: `Функція \`map()\` застосовує функцію до кожного елемента ітерованого об'єкта (наприклад, списку) та повертає ітератор з результатами.

**Синтаксис:**

\`\`\`python
map(function, iterable)
\`\`\`

**Приклад зі звичайною функцією:**

\`\`\`python
def square(x):
    return x ** 2

numbers = [1, 2, 3, 4, 5]
squared = map(square, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]
\`\`\`

**Приклад з lambda:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x ** 2, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]
\`\`\`

**Важливо:** \`map()\` повертає ітератор, тому для отримання списку потрібно використати \`list()\`.

**Більш складні приклади:**

\`\`\`python
# Перетворення рядків
names = ["олександр", "марія", "іван"]
capitalized = list(map(lambda name: name.capitalize(), names))
# ["Олександр", "Марія", "Іван"]

# Обчислення з кількома списками
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# Застосування методу
texts = ["  привіт  ", "  світ  ", "  python  "]
cleaned = list(map(lambda text: text.strip().upper(), texts))
# ["ПРИВІТ", "СВІТ", "PYTHON"]
\`\`\`

**Переваги map():**

- Більш читабельний код для простих операцій
- Функціональний стиль програмування
- Можна застосувати одну функцію до багатьох елементів одночасно`
      },
      {
        title: "Функція filter()",
        content: `Функція \`filter()\` фільтрує елементи ітерованого об'єкта, залишаючи тільки ті, для яких функція повертає \`True\`.

**Синтаксис:**

\`\`\`python
filter(function, iterable)
\`\`\`

**Важливо:** Функція має повертати \`True\` або \`False\` (булеве значення).

**Приклад зі звичайною функцією:**

\`\`\`python
def is_even(num):
    return num % 2 == 0

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = filter(is_even, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]
\`\`\`

**Приклад з lambda:**

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]
\`\`\`

**Важливо:** \`filter()\` також повертає ітератор, тому для отримання списку потрібно використати \`list()\`.

**Більш складні приклади:**

\`\`\`python
# Фільтрація рядків за довжиною
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]

# Фільтрація чисел за умовою
numbers = [10, 15, 20, 25, 30, 35, 40]
large_numbers = list(filter(lambda x: x > 20, numbers))
# [25, 30, 35, 40]

# Фільтрація за наявністю підрядка
texts = ["Python", "Java", "JavaScript", "C++", "Pythonista"]
python_texts = list(filter(lambda text: "Python" in text, texts))
# ["Python", "Pythonista"]

# Фільтрація за кількома умовами
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = list(filter(lambda x: x % 2 == 0 and x > 5, numbers))
# [6, 8, 10]
\`\`\`

**Переваги filter():**

- Зручно для фільтрації даних
- Функціональний стиль програмування
- Більш читабельний код для простих умов`
      },
      {
        title: "Комбінування lambda з map() та filter()",
        content: `Можна комбінувати \`map()\` та \`filter()\` для складніших операцій.

**Приклад 1: Фільтрація та перетворення**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Спочатку фільтруємо парні числа, потім підносимо до квадрату
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# [4, 16, 36, 64, 100]
\`\`\`

**Приклад 2: Перетворення та фільтрація**

\`\`\`python
words = ["  python  ", "  java  ", "  c++  ", "  javascript  "]

# Спочатку очищаємо, потім фільтруємо короткі слова
cleaned_long = list(filter(lambda x: len(x) > 3, map(lambda x: x.strip(), words)))
# ["python", "javascript"]
\`\`\`

**Приклад 3: Комплексна обробка**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Фільтруємо числа > 5, потім множимо на 2
result = list(map(lambda x: x * 2, filter(lambda x: x > 5, numbers)))
# [12, 14, 16, 18, 20]
\`\`\`

**Альтернатива зі списковими включеннями:**

Для багатьох випадків спискові включення (list comprehensions) можуть бути більш читабельними:

\`\`\`python
# Замість map + filter
numbers = [1, 2, 3, 4, 5]
result = [x ** 2 for x in numbers if x % 2 == 0]

# Еквівалентно:
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
\`\`\`

**Коли використовувати що:**

- **map() + filter() + lambda** - для функціонального стилю, коли потрібно передати функцію як аргумент
- **Спискові включення** - часто більш читабельні для простих операцій`
      },
      {
        title: "Lambda з кількома аргументами",
        content: `Lambda-функції можуть приймати кілька аргументів.

**Приклад з двома аргументами:**

\`\`\`python
# Додавання двох чисел
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Множення
multiply = lambda x, y: x * y
print(multiply(4, 5))  # 20
\`\`\`

**Приклад з map() та кількома списками:**

\`\`\`python
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]

# Додаємо відповідні елементи
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# Множимо
products = list(map(lambda x, y: x * y, numbers1, numbers2))
# [10, 40, 90]
\`\`\`

**Приклад з трьома аргументами:**

\`\`\`python
# Обчислення середнього з трьох чисел
average = lambda a, b, c: (a + b + c) / 3
print(average(10, 20, 30))  # 20.0

# Використання з map()
a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]
averages = list(map(lambda x, y, z: (x + y + z) / 3, a, b, c))
# [4.0, 5.0, 6.0]
\`\`\`

**Важливо:** Кількість аргументів у lambda має відповідати кількості ітерованих об'єктів у map().`
      },
      {
        title: "Обмеження lambda-функцій",
        content: `Lambda-функції мають обмеження, які важливо розуміти:

**1. Тільки один вираз**

Lambda може містити тільки один вираз, не може містити кілька рядків:

\`\`\`python
# Неправильно:
complex_func = lambda x: 
    if x > 0:
        return x * 2
    else:
        return x  #  Помилка!

# Правильно - використати звичайну функцію:
def complex_func(x):
    if x > 0:
        return x * 2
    else:
        return x
\`\`\`

**2. Не можна використовувати присвоєння**

\`\`\`python
# Неправильно:
assign = lambda x: y = x + 1  #  Помилка!

# Правильно:
def assign(x):
    y = x + 1
    return y
\`\`\`

**3. Не можна використовувати return**

\`return\` не потрібен у lambda, результат виразу автоматично повертається:

\`\`\`python
# Неправильно:
square = lambda x: return x ** 2  #  Помилка!

# Правильно:
square = lambda x: x ** 2
\`\`\`

**4. Обмежена читабельність для складних операцій**

Для складних операцій краще використовувати звичайні функції:

\`\`\`python
# Складніше читати:
result = list(map(lambda x: x.strip().upper().replace("PYTHON", "JAVA") if len(x) > 5 else x.lower(), texts))

# Краще:
def process_text(text):
    if len(text) > 5:
        return text.strip().upper().replace("PYTHON", "JAVA")
    else:
        return text.lower()

result = list(map(process_text, texts))
\`\`\`

**Коли НЕ використовувати lambda:**

- Для складних функцій з багатьма рядками
- Коли потрібна читабельність
- Для функцій, які використовуються багато разів (краще створити звичайну функцію)`
      },
      {
        title: "Lambda з іншими функціями",
        content: `Lambda-функції часто використовуються з іншими вбудованими функціями Python.

**1. sorted() - сортування**

\`\`\`python
# Сортування за довжиною
words = ["Python", "is", "great", "for", "programming"]
sorted_words = sorted(words, key=lambda x: len(x))
# ["is", "for", "great", "Python", "programming"]

# Сортування за другим елементом
pairs = [(1, 3), (2, 1), (3, 2)]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
# [(2, 1), (3, 2), (1, 3)]
\`\`\`

**2. max() та min() - з key**

\`\`\`python
words = ["Python", "is", "great", "for", "programming"]

# Найдовше слово
longest = max(words, key=lambda x: len(x))  # "programming"

# Найкоротше слово
shortest = min(words, key=lambda x: len(x))  # "is"
\`\`\`

**3. Використання в методах об'єктів**

\`\`\`python
# З методами списків
numbers = [1, 2, 3, 4, 5]
# (хоча для цього краще використовувати map)

# З функціями вищого порядку (вивчимо пізніше)
\`\`\`

**Практичний приклад:**

\`\`\`python
# Сортування користувачів за віком
users = [
    {"name": "Олександр", "age": 20},
    {"name": "Марія", "age": 25},
    {"name": "Іван", "age": 18}
]

sorted_users = sorted(users, key=lambda user: user["age"])
# [{"name": "Іван", "age": 18}, {"name": "Олександр", "age": 20}, {"name": "Марія", "age": 25}]
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили lambda-функції та їх використання:

**Ключові концепції:**

1. **Lambda-функції**
   - Анонімні функції без ключового слова \`def\`
   - Синтаксис: \`lambda аргументи: вираз\`
   - Можуть містити тільки один вираз

2. **map()**
   - Застосовує функцію до кожного елемента
   - Повертає ітератор
   - Зручно для перетворення даних

3. **filter()**
   - Фільтрує елементи за умовою
   - Залишає тільки ті, для яких функція повертає \`True\`
   - Повертає ітератор

4. **Комбінування**
   - Можна комбінувати \`map()\` та \`filter()\`
   - Lambda робить код компактнішим
   - Для складних операцій краще використовувати звичайні функції

5. **Обмеження**
   - Тільки один вираз
   - Не можна використовувати присвоєння
   - Обмежена читабельність для складних операцій

**Коли використовувати:**

- Для простих операцій, які використовуються один раз
- З \`map()\`, \`filter()\`, \`sorted()\`
- Для коротких перетворень даних

**Коли НЕ використовувати:**

-  Для складних функцій з багатьма рядками
-  Коли потрібна максимальна читабельність
-  Для функцій, які використовуються багато разів

**Наступний крок:**

У наступному уроці ми дізнаємося про область видимості змінних - як Python знаходить змінні в коді.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Базовий приклад lambda",
      code: `# Звичайна функція
def square(x):
    return x ** 2

# Lambda-функція
square_lambda = lambda x: x ** 2

# Обидва працюють однаково
print(square(5))        # 25
print(square_lambda(5))  # 25`,
      explanation: "Демонструє базовий синтаксис lambda-функцій та їх еквівалентність звичайним функціям."
    },
    {
      title: "map() з lambda",
      code: `numbers = [1, 2, 3, 4, 5]

# Застосовуємо lambda до кожного елемента
squared = map(lambda x: x ** 2, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]

# Перетворення рядків
names = ["олександр", "марія", "іван"]
capitalized = list(map(lambda name: name.capitalize(), names))
# ["Олександр", "Марія", "Іван"]`,
      explanation: "Показує використання map() з lambda для застосування функції до всіх елементів списку."
    },
    {
      title: "filter() з lambda",
      code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Фільтруємо парні числа
evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]

# Фільтруємо слова за довжиною
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]`,
      explanation: "Демонструє використання filter() з lambda для фільтрації елементів за умовою."
    },
    {
      title: "Комбінування map() та filter()",
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Спочатку фільтруємо парні, потім підносимо до квадрату
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
print(even_squared)  # [4, 16, 36, 64, 100]`,
      explanation: "Показує, як комбінувати map() та filter() з lambda для складніших операцій."
    },
    {
      title: "Lambda з кількома аргументами",
      code: `# Lambda з двома аргументами
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Використання з map() та кількома списками
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
print(sums)  # [11, 22, 33]`,
      explanation: "Демонструє lambda-функції з кількома аргументами та їх використання з map()."
    },
    {
      title: "Lambda з sorted()",
      code: `# Сортування за довжиною
words = ["Python", "is", "great", "for", "programming"]
sorted_words = sorted(words, key=lambda x: len(x))
# ["is", "for", "great", "Python", "programming"]

# Сортування словників за значенням
users = [{"name": "Олександр", "age": 20}, {"name": "Марія", "age": 25}]
sorted_users = sorted(users, key=lambda user: user["age"])
# [{"name": "Олександр", "age": 20}, {"name": "Марія", "age": 25}]`,
      explanation: "Показує використання lambda з функцією sorted() для сортування за кастомним ключем."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання return в lambda",
      explanation: "Початківці часто намагаються використати return в lambda, але це не потрібно.",
      correctApproach: `# Неправильно:
square = lambda x: return x ** 2  #  Помилка!

# Правильно:
square = lambda x: x ** 2 Результат виразу автоматично повертається`
    },
    {
      mistake: "Спроба використати кілька рядків в lambda",
      explanation: "Lambda може містити тільки один вираз, не кілька рядків.",
      correctApproach: `# Неправильно:
complex_func = lambda x: 
    if x > 0:
        return x * 2
    else:
        return x  #  Помилка!

# Правильно - використати звичайну функцію:
def complex_func(x):
    if x > 0:
        return x * 2
    else:
        return x`
    },
    {
      mistake: "Забування про list() для map() та filter()",
      explanation: "map() та filter() повертають ітератори, а не списки, тому потрібно використати list().",
      correctApproach: `# Неправильно (якщо потрібен список):
numbers = [1, 2, 3]
squared = map(lambda x: x ** 2, numbers)
print(squared)  # <map object at 0x...> - не список!

# Правильно:
numbers = [1, 2, 3]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9] - список`
    },
    {
      mistake: "Використання lambda для складних операцій",
      explanation: "Lambda краще використовувати для простих операцій. Для складних краще звичайні функції.",
      correctApproach: `# Складніше читати:
result = list(map(lambda x: x.strip().upper().replace("PYTHON", "JAVA") if len(x) > 5 else x.lower(), texts))

# Краще:
def process_text(text):
    if len(text) > 5:
        return text.strip().upper().replace("PYTHON", "JAVA")
    else:
        return text.lower()

result = list(map(process_text, texts))  # Більш читабельно`
    }
  ],
  
  summary: `На цьому уроці ми вивчили lambda-функції та їх використання:

1. Lambda-функції
   - Анонімні функції без \`def\`
   - Синтаксис: \`lambda аргументи: вираз\`
   - Можуть містити тільки один вираз

2. map()
   - Застосовує функцію до кожного елемента
   - Повертає ітератор (потрібен list() для списку)
   - Зручно для перетворення даних

3. filter()
   - Фільтрує елементи за умовою
   - Залишає тільки ті, для яких функція повертає True
   - Повертає ітератор (потрібен list() для списку)

4. Комбінування
   - Можна комбінувати map() та filter()
   - Lambda робить код компактнішим
   - Для складних операцій краще звичайні функції

5. Обмеження
   - Тільки один вираз
   - Не можна використовувати return
   - Обмежена читабельність для складних операцій

Lambda-функції - потужний інструмент для функціонального програмування в Python!`,
  
  practiceTask: {
    title: "Обробка даних з використанням lambda, map та filter",
    description: "Створіть функції для обробки даних, використовуючи lambda, map() та filter()",
    problemStatement: `Напишіть програму для обробки даних користувачів та чисел:

1. **process_numbers** - обробляє список чисел
   - Параметри: numbers (список чисел)
   - Використовує map() та lambda для піднесення всіх чисел до квадрату
   - Повертає список квадратів

2. **filter_even** - фільтрує парні числа
   - Параметри: numbers (список чисел)
   - Використовує filter() та lambda для фільтрації парних чисел
   - Повертає список парних чисел

3. **process_names** - обробляє імена
   - Параметри: names (список рядків з іменами)
   - Використовує map() та lambda для форматування імен (перша літера велика, решта малі)
   - Повертає список відформатованих імен

4. **filter_long_words** - фільтрує довгі слова
   - Параметри: words (список рядків), min_length (мінімальна довжина, за замовчуванням 5)
   - Використовує filter() та lambda для фільтрації слів довших за min_length
   - Повертає список довгих слів

5. **complex_processing** - комплексна обробка
   - Параметри: numbers (список чисел)
   - Спочатку фільтрує парні числа, потім підносить їх до квадрату
   - Використовує комбінування filter() та map() з lambda
   - Повертає список квадратів парних чисел

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді.

Створіть кілька прикладів використання всіх функцій.`,
    inputFormat: `Введіть значення напряму в коді:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
names = ["олександр", "марія", "іван", "анна"]

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Приклад виведення:
Квадрати чисел: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Парні числа: [2, 4, 6, 8, 10]
Відформатовані імена: ['Олександр', 'Марія', 'Іван', 'Анна']
Довгі слова: ['Олександр', 'Марія']
Квадрати парних чисел: [4, 16, 36, 64, 100]`,
    examples: [
      {
        input: "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        output: `Квадрати чисел: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Парні числа: [2, 4, 6, 8, 10]
Квадрати парних чисел: [4, 16, 36, 64, 100]`,
        explanation: "Демонструє обробку чисел: квадрати, фільтрація парних, комплексна обробка."
      },
      {
        input: 'names = ["олександр", "марія", "іван", "анна"]',
        output: `Відформатовані імена: ['Олександр', 'Марія', 'Іван', 'Анна']
Довгі слова (min_length=5): ['Олександр', 'Марія']`,
        explanation: "Демонструє обробку імен: форматування та фільтрація за довжиною."
      },
      {
        input: 'words = ["Python", "is", "great", "for", "programming"], min_length=4',
        output: `Довгі слова: ['Python', 'great', 'programming']`,
        explanation: "Приклад фільтрації слів за мінімальною довжиною."
      }
    ],
    solution: {
      code: `# Обробка даних з використанням lambda, map та filter

def process_numbers(numbers):
    """
    Підносить всі числа до квадрату
    """
    squared = list(map(lambda x: x ** 2, numbers))
    return squared

def filter_even(numbers):
    """
    Фільтрує парні числа
    """
    evens = list(filter(lambda x: x % 2 == 0, numbers))
    return evens

def process_names(names):
    """
    Форматує імена (перша літера велика)
    """
    formatted = list(map(lambda name: name.capitalize(), names))
    return formatted

def filter_long_words(words, min_length=5):
    """
    Фільтрує слова довші за min_length
    """
    long_words = list(filter(lambda word: len(word) >= min_length, words))
    return long_words

def complex_processing(numbers):
    """
    Фільтрує парні числа та підносить їх до квадрату
    """
    # Спочатку фільтруємо парні, потім підносимо до квадрату
    result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
    return result

# Вводимо значення напряму в коді (не використовуємо input())

# Приклад 1: Обробка чисел
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squared = process_numbers(numbers)
print(f"Квадрати чисел: {squared}")

evens = filter_even(numbers)
print(f"Парні числа: {evens}")

complex_result = complex_processing(numbers)
print(f"Квадрати парних чисел: {complex_result}")

print()

# Приклад 2: Обробка імен
names = ["олександр", "марія", "іван", "анна"]

formatted_names = process_names(names)
print(f"Відформатовані імена: {formatted_names}")

long_names = filter_long_words(formatted_names, min_length=5)
print(f"Довгі імена (min_length=5): {long_names}")

print()

# Приклад 3: Додатковий приклад зі словами
words = ["Python", "is", "great", "for", "programming"]
long_words = filter_long_words(words, min_length=4)
print(f"Довгі слова (min_length=4): {long_words}")

print()

# Приклад 4: Комплексна обробка з різними операціями
numbers2 = [5, 10, 15, 20, 25, 30]

# Фільтруємо числа > 15, потім множимо на 2
filtered_multiplied = list(map(lambda x: x * 2, filter(lambda x: x > 15, numbers2)))
print(f"Числа > 15, помножені на 2: {filtered_multiplied}")`,
      explanation: "Рішення демонструє використання lambda-функцій з map() та filter() для різних операцій обробки даних. Всі функції використовують lambda для компактного коду та функціонального стилю програмування."
    },
    hints: [
      "Введіть значення напряму в коді - не використовуйте input()",
      "Використовуйте map() з lambda для застосування функції до всіх елементів",
      "Використовуйте filter() з lambda для фільтрації елементів за умовою",
      "Пам'ятайте: map() та filter() повертають ітератори, потрібен list() для отримання списку",
      "Для комплексної обробки спочатку filter(), потім map()",
      "Lambda може приймати параметри зі значеннями за замовчуванням через зовнішню функцію",
      "Використовуйте lambda для простих операцій, для складних краще звичайні функції",
      "Перевірте, що lambda повертає правильний тип даних (для filter() - True/False)"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: [[1, 2, 3, 4, 5]],
        expectedOutput: "[1, 4, 9, 16, 25]",
        description: "Перевірка піднесення чисел до квадрату"
      },
      {
        input: [[1, 2, 3, 4, 5, 6]],
        expectedOutput: "[2, 4, 6]",
        description: "Перевірка фільтрації парних чисел"
      },
      {
        input: [["олександр", "марія"]],
        expectedOutput: "['Олександр', 'Марія']",
        description: "Перевірка форматування імен"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке lambda-функція?",
        options: [
          "Анонімна функція, яка може містити тільки один вираз",
          "Звичайна функція з ключовим словом def",
          "Метод об'єкта",
          "Тип даних"
        ],
        correctAnswer: 0,
        explanation: "Lambda-функція - це анонімна функція, яка може містити тільки один вираз. Вона створюється без ключового слова def."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає функція map()?",
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
        question: "Що виведе цей код?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x ** 2, numbers))\nprint(squared)\n```",
        options: [
          "[1, 4, 9, 16, 25]",
          "[1, 2, 3, 4, 5]",
          "Помилку",
          "<map object>"
        ],
        correctAnswer: 0,
        explanation: "map() застосовує lambda x: x ** 2 до кожного елемента, підносячи його до квадрату. list() перетворює ітератор у список [1, 4, 9, 16, 25]."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить функція filter()?",
        options: [
          "Фільтрує елементи, залишаючи тільки ті, для яких функція повертає True",
          "Сортує елементи",
          "Перетворює елементи",
          "Додає елементи"
        ],
        correctAnswer: 0,
        explanation: "filter() фільтрує елементи ітерованого об'єкта, залишаючи тільки ті, для яких передана функція повертає True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens)\n```",
        options: [
          "[0, 2, 4, 6, 8, 10]",
          "[1, 3, 5, 7, 9]",
          "Помилку",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        ],
        correctAnswer: 0,
        explanation: "filter() залишає тільки парні числа (x % 2 == 0), тому результат [0, 2, 4, 6, 8, 10]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна використовувати return в lambda-функції?",
        options: [
          "Ні, return не потрібен, результат виразу автоматично повертається",
          "Так, обов'язково потрібен return",
          "Тільки для складних lambda",
          "Залежить від версії Python"
        ],
        correctAnswer: 0,
        explanation: "В lambda-функції return не потрібен і викличе помилку. Результат виразу автоматично повертається."
      },
      {
        id: "q7",
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
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Lambda-функції можуть містити кілька рядків коду.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Ні, lambda-функції можуть містити тільки один вираз. Для кількох рядків потрібно використовувати звичайну функцію з def."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
