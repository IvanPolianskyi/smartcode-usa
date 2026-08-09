/**
 * Lesson 03-5: Методи об'єктів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_5 = {
  lessonId: "lesson-03-5",
  moduleId: "module-03",
  order: 5,
  title: "Методи об'єктів",
  
  learningObjectives: [
    "Розуміти, що таке методи об'єктів",
    "Використовувати методи рядків (strings)",
    "Використовувати методи списків (lists)",
    "Використовувати методи словників (dictionaries)",
    "Розуміти різницю між методами та функціями",
    "Використовувати help() для отримання довідки про методи"
  ],
  
  prerequisites: ["lesson-03-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке методи?",
        content: `Методи - це функції, які "прив'язані" до об'єктів. Вони виконують дії над конкретним об'єктом.

**Основна відмінність між функціями та методами:**

- **Функція:** \`function_name(argument)\` - викликається самостійно
- **Метод:** \`object.method_name(argument)\` - викликається через об'єкт

**Синтаксис виклику методу:**

\`\`\`python
object.method(arg1, arg2, ...)
\`\`\`

**Приклад:**

\`\`\`python
# Функція
result = len("Привіт")  # len() - це функція

# Метод
text = "Привіт"
result = text.upper()  # upper() - це метод рядка
\`\`\`

**Важливо:**

- Методи працюють з конкретним об'єктом
- Різні типи об'єктів мають різні методи
- Методи можуть змінювати об'єкт або повертати нове значення`
      },
      {
        title: "Методи рядків (Strings)",
        content: `Рядки в Python мають багато корисних методів для роботи з текстом.

**Основні методи:**

1. **\`upper()\`** - перетворює рядок у верхній регістр
\`\`\`python
text = "Привіт, світ!"
result = text.upper()  # "ПРИВІТ, СВІТ!"
\`\`\`

2. **\`lower()\`** - перетворює рядок у нижній регістр
\`\`\`python
text = "ПРИВІТ, СВІТ!"
result = text.lower()  # "привіт, світ!"
\`\`\`

3. **\`capitalize()\`** - робить першу літеру великою
\`\`\`python
text = "привіт, світ!"
result = text.capitalize()  # "Привіт, світ!"
\`\`\`

4. **\`title()\`** - робить першу літеру кожного слова великою
\`\`\`python
text = "привіт світ python"
result = text.title()  # "Привіт Світ Python"
\`\`\`

5. **\`strip()\`** - видаляє пробіли на початку та в кінці
\`\`\`python
text = "  Привіт, світ!  "
result = text.strip()  # "Привіт, світ!"
\`\`\`

6. **\`replace(old, new)\`** - замінює частину рядка
\`\`\`python
text = "Привіт, світ!"
result = text.replace("світ", "Python")  # "Привіт, Python!"
\`\`\`

7. **\`split(separator)\`** - розділяє рядок на список
\`\`\`python
text = "Привіт, світ, Python"
result = text.split(", ")  # ["Привіт", "світ", "Python"]
\`\`\`

8. **\`join(iterable)\`** - об'єднує елементи списку в рядок
\`\`\`python
words = ["Привіт", "світ", "Python"]
result = ", ".join(words)  # "Привіт, світ, Python"
\`\`\`

9. **\`find(substring)\`** - знаходить позицію підрядка (повертає -1, якщо не знайдено)
\`\`\`python
text = "Привіт, світ!"
position = text.find("світ")  # 9
position = text.find("Python")  # -1 (не знайдено)
\`\`\`

10. **\`count(substring)\`** - рахує кількість входжень підрядка
\`\`\`python
text = "Привіт, привіт, світ!"
count = text.count("привіт")  # 2
\`\`\`

**Важливо:** Методи рядків не змінюють оригінальний рядок, вони повертають новий!
\`\`\`python
text = "Привіт"
text.upper()  # Не змінює text
print(text)  # "Привіт" (не змінився)

# Щоб зберегти зміни:
text = text.upper()  # Тепер text = "ПРИВІТ"
\`\`\``
      },
      {
        title: "Методи списків (Lists)",
        content: `Списки мають методи для додавання, видалення та модифікації елементів.

**Основні методи:**

1. **\`append(item)\`** - додає елемент в кінець списку
\`\`\`python
numbers = [1, 2, 3]
numbers.append(4)  # [1, 2, 3, 4]
\`\`\`

2. **\`insert(index, item)\`** - вставляє елемент на позицію
\`\`\`python
numbers = [1, 2, 3]
numbers.insert(1, 10)  # [1, 10, 2, 3]
\`\`\`

3. **\`remove(item)\`** - видаляє перше входження елемента
\`\`\`python
numbers = [1, 2, 3, 2]
numbers.remove(2)  # [1, 3, 2] (видалено перше входження)
\`\`\`

4. **\`pop(index)\`** - видаляє та повертає елемент за індексом (за замовчуванням останній)
\`\`\`python
numbers = [1, 2, 3, 4]
last = numbers.pop()  # last = 4, numbers = [1, 2, 3]
first = numbers.pop(0)  # first = 1, numbers = [2, 3]
\`\`\`

5. **\`extend(iterable)\`** - додає всі елементи з іншого списку
\`\`\`python
numbers = [1, 2, 3]
numbers.extend([4, 5, 6])  # [1, 2, 3, 4, 5, 6]
\`\`\`

6. **\`count(item)\`** - рахує кількість входжень елемента
\`\`\`python
numbers = [1, 2, 2, 3, 2]
count = numbers.count(2)  # 3
\`\`\`

7. **\`index(item)\`** - знаходить індекс першого входження елемента
\`\`\`python
numbers = [10, 20, 30, 20]
index = numbers.index(20)  # 1
\`\`\`

8. **\`sort()\`** - сортує список на місці (змінює оригінальний список)
\`\`\`python
numbers = [3, 1, 4, 1, 5]
numbers.sort()  # [1, 1, 3, 4, 5] (змінився оригінальний список)
\`\`\`

9. **\`reverse()\`** - змінює порядок елементів на зворотний
\`\`\`python
numbers = [1, 2, 3, 4]
numbers.reverse()  # [4, 3, 2, 1] (змінився оригінальний список)
\`\`\`

**Важливо:** Деякі методи списків змінюють оригінальний список (append, insert, remove, pop, sort, reverse), а інші повертають нове значення (count, index).`
      },
      {
        title: "Методи словників (Dictionaries)",
        content: `Словники мають методи для роботи з ключами та значеннями.

**Основні методи:**

1. **\`keys()\`** - повертає всі ключі
\`\`\`python
person = {"name": "Олександр", "age": 20, "city": "Київ"}
keys = person.keys()  # dict_keys(['name', 'age', 'city'])
# Можна перетворити в список:
keys_list = list(person.keys())  # ['name', 'age', 'city']
\`\`\`

2. **\`values()\`** - повертає всі значення
\`\`\`python
person = {"name": "Олександр", "age": 20, "city": "Київ"}
values = person.values()  # dict_values(['Олександр', 20, 'Київ'])
\`\`\`

3. **\`items()\`** - повертає пари ключ-значення
\`\`\`python
person = {"name": "Олександр", "age": 20, "city": "Київ"}
items = person.items()  # dict_items([('name', 'Олександр'), ('age', 20), ('city', 'Київ')])
\`\`\`

4. **\`get(key, default)\`** - отримує значення за ключем (без помилки, якщо ключа немає)
\`\`\`python
person = {"name": "Олександр", "age": 20}
name = person.get("name")  # "Олександр"
email = person.get("email", "Не вказано")  # "Не вказано" (якщо ключа немає)
\`\`\`

5. **\`pop(key, default)\`** - видаляє та повертає значення за ключем
\`\`\`python
person = {"name": "Олександр", "age": 20, "city": "Київ"}
age = person.pop("age")  # age = 20, person = {"name": "Олександр", "city": "Київ"}
\`\`\`

6. **\`update(other_dict)\`** - оновлює словник значеннями з іншого словника
\`\`\`python
person = {"name": "Олександр", "age": 20}
person.update({"city": "Київ", "age": 21})  # {"name": "Олександр", "age": 21, "city": "Київ"}
\`\`\`

7. **\`clear()\`** - видаляє всі елементи
\`\`\`python
person = {"name": "Олександр", "age": 20}
person.clear()  # {}
\`\`\`

8. **\`copy()\`** - створює копію словника
\`\`\`python
person = {"name": "Олександр", "age": 20}
person_copy = person.copy()  # Нова копія
\`\`\``
      },
      {
        title: "Ланцюжок методів",
        content: `Можна викликати методи один за одним, якщо попередній метод повертає об'єкт з наступним методом.

**Приклад з рядками:**

\`\`\`python
text = "  привіт, світ!  "
result = text.strip().upper().replace("СВІТ", "PYTHON")
# Спочатку strip() → "привіт, світ!"
# Потім upper() → "ПРИВІТ, СВІТ!"
# Потім replace() → "ПРИВІТ, PYTHON!"
\`\`\`

**Важливо:** Ланцюжок працює, якщо кожен метод повертає об'єкт того ж типу або об'єкт з потрібним методом.

**Приклад:**

\`\`\`python
# Працює, бо split() повертає список, а join() - метод рядка
text = "Привіт, світ, Python"
words = text.split(", ")  # ["Привіт", "світ", "Python"]
result = ", ".join(words).upper()  # "ПРИВІТ, СВІТ, PYTHON"
\`\`\`

**Не працює:**

\`\`\`python
# Не працює, бо append() не повертає список
numbers = [1, 2, 3]
numbers.append(4).append(5)  #  Помилка! append() повертає None
\`\`\``
      },
      {
        title: "Отримання довідки про методи",
        content: `У Python є кілька способів дізнатися про методи об'єкта:

**1. Функція help():**

\`\`\`python
help(str.upper)  # Довідка про метод upper() для рядків
help(list.append)  # Довідка про метод append() для списків
\`\`\`

**2. Функція dir():**

\`\`\`python
# Показує всі методи та атрибути об'єкта
methods = dir("Привіт")  # Список всіх методів рядка
methods = dir([1, 2, 3])  # Список всіх методів списку
\`\`\`

**3. Використання автодоповнення в IDE:**

Більшість сучасних IDE (наприклад, VS Code, PyCharm) показують доступні методи при введенні крапки після об'єкта.

**Приклад використання help():**

\`\`\`python
# Довідка про метод count() для рядків
help(str.count)
# Виведе:
# count(...)
#     S.count(sub[, start[, end]]) -> int
#     
#     Return the number of non-overlapping occurrences of substring sub in
#     string S[start:end].  Optional arguments start and end are
#     interpreted as in slice notation.
\`\`\`

**Практичний приклад:**

\`\`\`python
# Дізнаємося про метод split()
help(str.split)
# Потім використовуємо його:
text = "Привіт, світ, Python"
words = text.split(", ")  # ["Привіт", "світ", "Python"]
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Обробка тексту**

\`\`\`python
def process_text(text):
    """
    Обробляє текст: видаляє пробіли, робить першу літеру великою
    """
    processed = text.strip().capitalize()
    return processed

# Використання
result = process_text("  привіт, світ!  ")  # "Привіт, світ!"
\`\`\`

**Приклад 2: Робота зі списком користувачів**

\`\`\`python
def manage_users():
    """
    Демонструє роботу з методами списків
    """
    users = ["Олександр", "Марія"]
    
    # Додаємо користувачів
    users.append("Іван")
    users.insert(0, "Анна")
    
    # Перевіряємо кількість
    count = users.count("Олександр")
    
    # Сортуємо
    users.sort()
    
    return users

# Використання
users = manage_users()  # ["Анна", "Іван", "Марія", "Олександр"]
\`\`\`

**Приклад 3: Обробка даних користувача**

\`\`\`python
def process_user_data(user_dict):
    """
    Обробляє дані користувача
    """
    # Отримуємо ключі
    keys = list(user_dict.keys())
    
    # Оновлюємо дані
    user_dict.update({"last_login": "2024-01-15"})
    
    # Перевіряємо наявність ключа
    email = user_dict.get("email", "Не вказано")
    
    return user_dict, email

# Використання
user = {"name": "Олександр", "age": 20}
updated_user, email = process_user_data(user)
\`\`\`

**Приклад 4: Комплексна обробка тексту**

\`\`\`python
def format_text(text):
    """
    Форматує текст: видаляє пробіли, замінює слова, об'єднує
    """
    # Видаляємо пробіли та перетворюємо в список слів
    words = text.strip().split()
    
    # Замінюємо слова
    words = [word.replace("світ", "Python") for word in words]
    
    # Об'єднуємо назад
    result = " ".join(words).title()
    
    return result

# Використання
text = "  привіт світ програміст  "
result = format_text(text)  # "Привіт Python Програміст"
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили методи об'єктів:

**Ключові концепції:**

1. **Методи vs Функції**
   - Методи прив'язані до об'єктів: \`object.method()\`
   - Функції викликаються самостійно: \`function()\`

2. **Методи рядків**
   - Не змінюють оригінальний рядок
   - Повертають новий рядок
   - Приклади: upper(), lower(), strip(), replace(), split(), join()

3. **Методи списків**
   - Багато методів змінюють оригінальний список
   - Приклади: append(), insert(), remove(), pop(), sort(), reverse()

4. **Методи словників**
   - Працюють з ключами та значеннями
   - Приклади: keys(), values(), items(), get(), pop(), update()

5. **Ланцюжок методів**
   - Можна викликати методи один за одним
   - Працює, якщо кожен метод повертає об'єкт з наступним методом

6. **Довідка**
   - \`help()\` - отримати довідку про метод
   - \`dir()\` - побачити всі методи об'єкта

**Важливо пам'ятати:**

- Деякі методи змінюють об'єкт (in-place), інші повертають нове значення
- Методи рядків не змінюють оригінальний рядок
- Методи списків часто змінюють оригінальний список
- Використовуйте help() для дослідження нових методів

**Наступний крок:**

У наступному уроці ми дізнаємося про lambda-функції - короткі анонімні функції для швидких операцій.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Методи рядків",
      code: `text = "  привіт, світ!  "

# Видаляємо пробіли
cleaned = text.strip()  # "привіт, світ!"

# Перетворюємо в верхній регістр
upper_text = cleaned.upper()  # "ПРИВІТ, СВІТ!"

# Замінюємо слово
replaced = cleaned.replace("світ", "Python")  # "привіт, Python!"

# Розділяємо на слова
words = cleaned.split(", ")  # ["привіт", "світ!"]`,
      explanation: "Демонструє основні методи рядків: strip(), upper(), replace(), split()."
    },
    {
      title: "Методи списків",
      code: `numbers = [1, 2, 3]

# Додаємо елементи
numbers.append(4)  # [1, 2, 3, 4]
numbers.insert(0, 0)  # [0, 1, 2, 3, 4]

# Видаляємо елементи
numbers.remove(2)  # [0, 1, 3, 4]
last = numbers.pop()  # last = 4, numbers = [0, 1, 3]

# Сортуємо
numbers.sort()  # [0, 1, 3]`,
      explanation: "Показує основні методи списків: append(), insert(), remove(), pop(), sort()."
    },
    {
      title: "Методи словників",
      code: `person = {"name": "Олександр", "age": 20}

# Отримуємо ключі та значення
keys = list(person.keys())  # ['name', 'age']
values = list(person.values())  # ['Олександр', 20]

# Безпечне отримання значення
email = person.get("email", "Не вказано")  # "Не вказано"

# Оновлюємо словник
person.update({"city": "Київ", "age": 21})  # {"name": "Олександр", "age": 21, "city": "Київ"}`,
      explanation: "Демонструє основні методи словників: keys(), values(), get(), update()."
    },
    {
      title: "Ланцюжок методів",
      code: `text = "  привіт, світ!  "

# Викликаємо методи один за одним
result = text.strip().upper().replace("СВІТ", "PYTHON")
# Спочатку strip() → "привіт, світ!"
# Потім upper() → "ПРИВІТ, СВІТ!"
# Потім replace() → "ПРИВІТ, PYTHON!"`,
      explanation: "Показує, як можна викликати методи рядків один за одним (ланцюжок методів)."
    },
    {
      title: "Отримання довідки",
      code: `# Довідка про метод
help(str.upper)

# Всі методи об'єкта
methods = dir("Привіт")  # Список всіх методів рядка
print(methods)`,
      explanation: "Демонструє використання help() та dir() для отримання інформації про методи."
    },
    {
      title: "Практичний приклад: обробка тексту",
      code: `def format_user_input(text):
    """
    Форматує введений користувачем текст
    """
    # Видаляємо пробіли та робимо першу літеру великою
    formatted = text.strip().capitalize()
    
    # Замінюємо слова
    formatted = formatted.replace("привіт", "Вітаю")
    
    return formatted

# Використання
result = format_user_input("  привіт, світ!  ")  # "Вітаю, світ!"`,
      explanation: "Практичний приклад використання методів рядків для обробки тексту."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба змінити рядок через метод",
      explanation: "Початківці часто забувають, що методи рядків не змінюють оригінальний рядок.",
      correctApproach: `# Неправильно:
text = "Привіт"
text.upper()  # Не змінює text
print(text)  # Все ще "Привіт"

# Правильно:
text = "Привіт"
text = text.upper()  # Тепер text = "ПРИВІТ"
print(text)  # "ПРИВІТ"`
    },
    {
      mistake: "Плутанина між методами та функціями",
      explanation: "Початківці іноді плутають синтаксис виклику методів та функцій.",
      correctApproach: `# Функція - викликається самостійно
length = len("Привіт")  # len() - функція

# Метод - викликається через об'єкт
text = "Привіт"
upper_text = text.upper()  # upper() - метод рядка`
    },
    {
      mistake: "Ланцюжок методів, які не повертають об'єкт",
      explanation: "Спроба викликати метод після методу, який повертає None або інший тип.",
      correctApproach: `# Неправильно:
numbers = [1, 2, 3]
numbers.append(4).append(5)  #  append() повертає None

# Правильно:
numbers = [1, 2, 3]
numbers.append(4)
numbers.append(5)  #  Окремі виклики

# Або для рядків (які повертають новий рядок):
text = "Привіт".upper().replace("ПРИВІТ", "Вітаю")  #  Працює`
    },
    {
      mistake: "Використання методу на неправильному типі",
      explanation: "Спроба викликати метод, який не існує для даного типу об'єкта.",
      correctApproach: `# Неправильно:
number = 123
number.append(4)  #  Числа не мають методу append()

# Правильно:
numbers = [123]  # Список
numbers.append(4)  #  Працює

# Або для рядків:
text = "123"
text = text + "4"  #  Конкатенація рядків`
    }
  ],
  
  summary: `На цьому уроці ми вивчили методи об'єктів:

1. Що таке методи
   - Методи - це функції, прив'язані до об'єктів
   - Синтаксис: \`object.method()\`
   - Відрізняються від функцій тим, що викликаються через об'єкт

2. Методи рядків
   - Не змінюють оригінальний рядок
   - Приклади: upper(), lower(), strip(), replace(), split(), join()
   - Повертають новий рядок

3. Методи списків
   - Багато методів змінюють оригінальний список
   - Приклади: append(), insert(), remove(), pop(), sort(), reverse()
   - Деякі повертають значення (count, index)

4. Методи словників
   - Працюють з ключами та значеннями
   - Приклади: keys(), values(), items(), get(), pop(), update()

5. Ланцюжок методів
   - Можна викликати методи один за одним
   - Працює, якщо кожен метод повертає об'єкт з наступним методом

6. Довідка
   - help() - отримати довідку про метод
   - dir() - побачити всі методи об'єкта

Методи - це потужний інструмент для роботи з об'єктами в Python!`,
  
  practiceTask: {
    title: "Система обробки текстових даних",
    description: "Створіть функції для обробки текстових даних, використовуючи методи рядків, списків та словників",
    problemStatement: `Напишіть програму з функціями:

1. clean_text(text) — strip + capitalize
2. process_words(words) — без дублікатів, відсортовані
3. create_word_count(text) — словник {слово: кількість} з оригінального тексту (strip + split)
4. format_user_data(user_data) — capitalize name, lower email, додає role="user", status="active"

Зчитайте рядок тексту, ім'я та email. Виведіть очищений текст, оброблені слова, підрахунок і дані користувача.

Формат вводу:
  привіт світ привіт python  
олександр
USER@EXAMPLE.COM`,
    outputFormat: `Очищений текст: Привіт світ привіт python
Оброблені слова: ['python', 'Привіт', 'привіт', 'світ']
Підрахунок слів: {'привіт': 2, 'світ': 1, 'python': 1}
Дані користувача: {'name': 'Олександр', 'email': 'user@example.com', 'role': 'user', 'status': 'active'}`,
    examples: [
      {
        input: `  привіт світ привіт python  
олександр
USER@EXAMPLE.COM`,
        output: `Очищений текст: Привіт світ привіт python
Оброблені слова: ['python', 'Привіт', 'привіт', 'світ']
Підрахунок слів: {'привіт': 2, 'світ': 1, 'python': 1}
Дані користувача: {'name': 'Олександр', 'email': 'user@example.com', 'role': 'user', 'status': 'active'}`,
        explanation: "capitalize змінює лише першу літеру всього рядка; підрахунок з оригінальних слів"
      },
      {
        input: `Python Python код
марія
Maria@Mail.COM`,
        output: `Очищений текст: Python python код
Оброблені слова: ['Python', 'python', 'код']
Підрахунок слів: {'Python': 2, 'код': 1}
Дані користувача: {'name': 'Марія', 'email': 'maria@mail.com', 'role': 'user', 'status': 'active'}`,
        explanation: "Два Python у підрахунку; після capitalize друге слово стає python"
      },
      {
        input: `один два
іван
IVAN@TEST.UA`,
        output: `Очищений текст: Один два
Оброблені слова: ['Один', 'два']
Підрахунок слів: {'один': 1, 'два': 1}
Дані користувача: {'name': 'Іван', 'email': 'ivan@test.ua', 'role': 'user', 'status': 'active'}`,
        explanation: "Підрахунок зберігає регістр оригінальних слів"
      }
    ],
    solution: {
      code: `def clean_text(text):
    """Очищає текст: strip та capitalize"""
    return text.strip().capitalize()

def process_words(words):
    """Видаляє дублікати та сортує слова"""
    unique_words = []
    for word in words:
        if word not in unique_words:
            unique_words.append(word)
    unique_words.sort()
    return unique_words

def create_word_count(text):
    """Створює словник з підрахунком слів"""
    words = text.strip().split()
    word_count = {}
    for word in words:
        word_count[word] = word_count.get(word, 0) + 1
    return word_count

def format_user_data(user_data):
    """Форматує дані користувача"""
    formatted = user_data.copy()
    if "name" in formatted:
        formatted["name"] = formatted["name"].capitalize()
    if "email" in formatted:
        formatted["email"] = formatted["email"].lower()
    if "role" not in formatted:
        formatted["role"] = "user"
    if "status" not in formatted:
        formatted["status"] = "active"
    return formatted

text = input()
name = input().strip()
email = input().strip()

cleaned = clean_text(text)
print(f"Очищений текст: {cleaned}")

processed = process_words(cleaned.split())
print(f"Оброблені слова: {processed}")

word_count = create_word_count(text)
print(f"Підрахунок слів: {word_count}")

formatted_data = format_user_data({"name": name, "email": email})
print(f"Дані користувача: {formatted_data}")`,
      explanation: "Методи рядків/списків/словників у функціях; вхідні дані з stdin."
    },
    hints: [
      "Використовуйте strip(), capitalize(), split(), lower()",
      "Підрахунок робіть з оригінального text.strip().split()",
      "Для унікальних слів перевіряйте not in перед append",
      "format_user_data має додати role та status за замовчуванням"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке метод об'єкта?",
        options: [
          "Функція, прив'язана до об'єкта, яка викликається через об'єкт",
          "Змінна всередині об'єкта",
          "Тип даних",
          "Оператор Python"
        ],
        correctAnswer: 0,
        explanation: "Метод - це функція, яка прив'язана до об'єкта та викликається через об'єкт за допомогою синтаксису object.method()."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи змінюють методи рядків оригінальний рядок?",
        options: [
          "Ні, вони повертають новий рядок",
          "Так, вони змінюють оригінальний рядок",
          "Залежить від методу",
          "Тільки деякі методи"
        ],
        correctAnswer: 0,
        explanation: "Методи рядків не змінюють оригінальний рядок, вони завжди повертають новий рядок. Це тому, що рядки в Python є незмінними (immutable)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\ntext = \"  Привіт, світ!  \"\nresult = text.strip().upper()\nprint(result)\n```",
        options: [
          "ПРИВІТ, СВІТ!",
          "  ПРИВІТ, СВІТ!  ",
          "Привіт, світ!",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Спочатку strip() видаляє пробіли → 'Привіт, світ!', потім upper() перетворює в верхній регістр → 'ПРИВІТ, СВІТ!'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод списку додає елемент в кінець?",
        options: [
          "append()",
          "add()",
          "insert()",
          "extend()"
        ],
        correctAnswer: 0,
        explanation: "append() додає елемент в кінець списку. insert() вставляє на позицію, extend() додає всі елементи з іншого списку."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nnumbers = [3, 1, 4, 1, 5]\nnumbers.sort()\nprint(numbers)\n```",
        options: [
          "[1, 1, 3, 4, 5]",
          "[3, 1, 4, 1, 5]",
          "None",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "sort() сортує список на місці (змінює оригінальний список), тому numbers стане [1, 1, 3, 4, 5]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод словника повертає всі ключі?",
        options: [
          "keys()",
          "get()",
          "items()",
          "values()"
        ],
        correctAnswer: 0,
        explanation: "keys() повертає всі ключі словника. values() повертає значення, items() повертає пари ключ-значення, get() отримує значення за ключем."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nperson = {\"name\": \"Олександр\", \"age\": 20}\nemail = person.get(\"email\", \"Не вказано\")\nprint(email)\n```",
        options: [
          "Не вказано",
          "Помилку",
          "None",
          "email"
        ],
        correctAnswer: 0,
        explanation: "get() повертає значення за ключем, або значення за замовчуванням, якщо ключа немає. Оскільки 'email' немає в словнику, повертається 'Не вказано'."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Можна викликати методи один за одним (ланцюжок методів), якщо кожен метод повертає об'єкт з наступним методом.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, ланцюжок методів працює, якщо кожен метод повертає об'єкт того ж типу або об'єкт з потрібним методом. Наприклад, text.strip().upper() працює, бо обидва методи повертають рядок."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
