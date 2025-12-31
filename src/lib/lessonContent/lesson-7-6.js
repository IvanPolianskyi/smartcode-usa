/**
 * Lesson 7-6: itertools
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_6 = {
  lessonId: "lesson-7-6",
  moduleId: "module-7",
  order: 6,
  title: "itertools",
  
  learningObjectives: [
    "Використовувати itertools для ітерації",
    "Застосовувати комбінації та перестановки",
    "Працювати з групуванням",
    "Створювати ефективні ітератори",
    "Розуміти переваги itertools"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-7-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке itertools?",
        content: `**itertools** — модуль для створення та роботи з ітераторами.

**Імпорт:**
\`\`\`python
import itertools
\`\`\`

**Основні функції:**
- \`count()\` — нескінченний лічильник
- \`cycle()\` — циклічне повторення
- \`repeat()\` — повторення значення
- \`chain()\` — об'єднання ітераторів
- \`combinations()\` — комбінації
- \`permutations()\` — перестановки
- \`groupby()\` — групування

**Переваги:**
- ✅ Ефективність (lazy evaluation)
- ✅ Економія пам'яті
- ✅ Зручний синтаксис`
      },
      {
        title: "Базові ітератори",
        content: `**count() — нескінченний лічильник:**
\`\`\`python
import itertools

# Лічильник від 0
for i in itertools.count():
    print(i)
    if i >= 5:
        break  # 0, 1, 2, 3, 4, 5

# Лічильник з початком та кроком
for i in itertools.count(10, 2):
    print(i)
    if i >= 20:
        break  # 10, 12, 14, 16, 18, 20
\`\`\`

**cycle() — циклічне повторення:**
\`\`\`python
import itertools

colors = ['червоний', 'синій', 'зелений']
for i, color in enumerate(itertools.cycle(colors)):
    print(color)
    if i >= 5:
        break
# червоний, синій, зелений, червоний, синій, зелений
\`\`\`

**repeat() — повторення значення:**
\`\`\`python
import itertools

# Повторює значення нескінченно
for i, value in enumerate(itertools.repeat('hello')):
    print(value)
    if i >= 3:
        break  # hello, hello, hello, hello

# Повторює певну кількість разів
for value in itertools.repeat('hi', 3):
    print(value)  # hi, hi, hi
\`\`\`

**chain() — об'єднання ітераторів:**
\`\`\`python
import itertools

list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

for item in itertools.chain(list1, list2, list3):
    print(item)  # 1, 2, 3, 4, 5, 6, 7, 8, 9
\`\`\``
      },
      {
        title: "Комбінації та перестановки",
        content: `**combinations() — комбінації (порядок не важливий):**
\`\`\`python
import itertools

items = ['A', 'B', 'C']

# Комбінації по 2
for combo in itertools.combinations(items, 2):
    print(combo)
# ('A', 'B'), ('A', 'C'), ('B', 'C')

# Всі комбінації різних розмірів
for r in range(1, len(items) + 1):
    for combo in itertools.combinations(items, r):
        print(combo)
\`\`\`

**permutations() — перестановки (порядок важливий):**
\`\`\`python
import itertools

items = ['A', 'B', 'C']

# Перестановки по 2
for perm in itertools.permutations(items, 2):
    print(perm)
# ('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')

# Всі перестановки
for perm in itertools.permutations(items):
    print(perm)
# ('A', 'B', 'C'), ('A', 'C', 'B'), ('B', 'A', 'C'), ...
\`\`\`

**product() — декартів добуток:**
\`\`\`python
import itertools

colors = ['червоний', 'синій']
sizes = ['S', 'M', 'L']

# Всі комбінації
for combo in itertools.product(colors, sizes):
    print(combo)
# ('червоний', 'S'), ('червоний', 'M'), ('червоний', 'L'), ...
\`\`\``
      },
      {
        title: "Групування та фільтрація",
        content: `**groupby() — групування елементів:**
\`\`\`python
import itertools

data = [1, 1, 2, 2, 2, 3, 3, 4]

# Групування (потрібно сортування!)
for key, group in itertools.groupby(data):
    print(f"{key}: {list(group)}")
# 1: [1, 1]
# 2: [2, 2, 2]
# 3: [3, 3]
# 4: [4]
\`\`\`

**Групування за ключем:**
\`\`\`python
import itertools

students = [
    ('Олександр', 'Python'),
    ('Марія', 'Python'),
    ('Дмитро', 'Web'),
    ('Анна', 'Web')
]

# Сортування перед групуванням
students.sort(key=lambda x: x[1])

for course, group in itertools.groupby(students, key=lambda x: x[1]):
    names = [name for name, _ in group]
    print(f"{course}: {names}")
# Python: ['Олександр', 'Марія']
# Web: ['Дмитро', 'Анна']
\`\`\`

**takewhile() та dropwhile() — фільтрація:**
\`\`\`python
import itertools

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Бере елементи, поки умова True
small = list(itertools.takewhile(lambda x: x < 5, numbers))
print(small)  # [1, 2, 3, 4]

# Пропускає елементи, поки умова True
large = list(itertools.dropwhile(lambda x: x < 5, numbers))
print(large)  # [5, 6, 7, 8, 9, 10]
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Генерація паролів**
\`\`\`python
import itertools
import string

def generate_passwords(length=4):
    """Генерує всі можливі паролі заданої довжини."""
    chars = string.ascii_lowercase
    for password in itertools.product(chars, repeat=length):
        yield ''.join(password)

# Перші 10 паролів
for i, pwd in enumerate(generate_passwords(3)):
    print(pwd)
    if i >= 9:
        break
\`\`\`

**Приклад 2: Розбиття на групи**
\`\`\`python
import itertools

def chunk(iterable, size):
    """Розбиває ітератор на групи заданого розміру."""
    it = iter(iterable)
    while True:
        chunk = list(itertools.islice(it, size))
        if not chunk:
            break
        yield chunk

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for group in chunk(numbers, 3):
    print(group)
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]
# [10]
\`\`\`

**Приклад 3: Комбінації для тестування**
\`\`\`python
import itertools

# Тестування різних комбінацій параметрів
params = {
    'method': ['GET', 'POST'],
    'timeout': [5, 10, 30],
    'retry': [True, False]
}

keys = list(params.keys())
values = list(params.values())

for combo in itertools.product(*values):
    config = dict(zip(keys, combo))
    print(config)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові ітератори",
      code: `import itertools

# Лічильник
for i in itertools.count(0, 2):
    print(i)
    if i >= 10:
        break

# Циклічне повторення
colors = ['червоний', 'синій']
for i, color in enumerate(itertools.cycle(colors)):
    print(color)
    if i >= 3:
        break`,
      explanation: "Демонструє count() та cycle()."
    },
    {
      title: "Приклад 2: Комбінації",
      code: `import itertools

items = ['A', 'B', 'C']

# Комбінації
for combo in itertools.combinations(items, 2):
    print(combo)

# Перестановки
for perm in itertools.permutations(items, 2):
    print(perm)`,
      explanation: "Показує combinations() та permutations()."
    },
    {
      title: "Приклад 3: Групування",
      code: `import itertools

data = [1, 1, 2, 2, 2, 3, 3]

for key, group in itertools.groupby(data):
    print(f"{key}: {list(group)}")`,
      explanation: "Демонструє groupby()."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути сортувати перед groupby()",
      explanation: "groupby() групує тільки послідовні елементи, тому потрібне сортування.",
      correctApproach: "Завжди сортуйте дані перед groupby(): sorted(data) або data.sort()."
    },
    {
      mistake: "Використання itertools для малих списків",
      explanation: "Для малих списків звичайні цикли можуть бути простішими та швидшими.",
      correctApproach: "Використовуйте itertools для великих даних або складних ітерацій."
    },
    {
      mistake: "Не розуміти різницю між combinations та permutations",
      explanation: "combinations — порядок не важливий, permutations — порядок важливий.",
      correctApproach: "Використовуйте combinations для вибору, permutations для впорядкування."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **itertools** — модуль для роботи з ітераторами
2. **count()** — нескінченний лічильник
3. **cycle()** — циклічне повторення
4. **repeat()** — повторення значення
5. **chain()** — об'єднання ітераторів
6. **combinations()** — комбінації (порядок не важливий)
7. **permutations()** — перестановки (порядок важливий)
8. **product()** — декартів добуток
9. **groupby()** — групування елементів
10. **takewhile()/dropwhile()** — фільтрація

**Переваги:**
- Ефективність (lazy evaluation)
- Економія пам'яті
- Зручний синтаксис

**Важливо:**
- Сортуйте перед groupby()
- combinations — порядок не важливий
- permutations — порядок важливий

itertools — потужний інструмент для роботи з ітераторами!`,
  
  practiceTask: {
    title: "Створення утиліт з itertools",
    description: "Створіть утиліти з використанням itertools",
    problemStatement: `Створіть набір утиліт з використанням itertools:

**Функції:**
1. generate_combinations(items, size) — всі комбінації
   - Повертає всі комбінації заданого розміру

2. generate_permutations(items, size) — всі перестановки
   - Повертає всі перестановки заданого розміру

3. chunk_data(data, size) — розбиття на групи
   - Розбиває дані на групи заданого розміру
   - Використовуйте islice()

4. group_by_key(data, key_func) — групування за ключем
   - Групує дані за ключем
   - Використовуйте groupby()

5. generate_product(*iterables) — декартів добуток
   - Генерує всі комбінації з кількох ітераторів

6. infinite_counter(start, step) — нескінченний лічильник
   - Генерує числа з заданим кроком
   - Використовуйте count()

**Створіть утиліти та продемонструйте роботу.**`,
    inputFormat: "Створіть модуль з функціями",
    outputFormat: `Приклад виведення:
Комбінації ['A', 'B', 'C'] по 2:
('A', 'B'), ('A', 'C'), ('B', 'C')

Перестановки ['A', 'B'] по 2:
('A', 'B'), ('B', 'A')

Групи по 3:
[1, 2, 3], [4, 5, 6], [7, 8, 9]`,
    examples: [
      {
        input: "Використання утиліт",
        output: "Всі функції працюють коректно",
        explanation: "Демонстрація itertools"
      }
    ],
    solution: {
      code: `import itertools

def generate_combinations(items, size):
    """Генерує всі комбінації заданого розміру."""
    return list(itertools.combinations(items, size))

def generate_permutations(items, size):
    """Генерує всі перестановки заданого розміру."""
    return list(itertools.permutations(items, size))

def chunk_data(data, size):
    """Розбиває дані на групи заданого розміру."""
    it = iter(data)
    chunks = []
    while True:
        chunk = list(itertools.islice(it, size))
        if not chunk:
            break
        chunks.append(chunk)
    return chunks

def group_by_key(data, key_func):
    """Групує дані за ключем."""
    # Сортування перед групуванням
    sorted_data = sorted(data, key=key_func)
    
    groups = {}
    for key, group in itertools.groupby(sorted_data, key=key_func):
        groups[key] = list(group)
    
    return groups

def generate_product(*iterables):
    """Генерує декартів добуток."""
    return list(itertools.product(*iterables))

def infinite_counter(start, step):
    """Генерує нескінченний лічильник."""
    return itertools.count(start, step)

def демонстрація():
    """Демонстрація роботи утиліт."""
    print("=== Утиліти itertools ===\\n")
    
    # Комбінації
    items = ['A', 'B', 'C']
    combos = generate_combinations(items, 2)
    print(f"Комбінації {items} по 2:")
    for combo in combos:
        print(f"  {combo}")
    
    # Перестановки
    perms = generate_permutations(['A', 'B'], 2)
    print(f"\\nПерестановки ['A', 'B'] по 2:")
    for perm in perms:
        print(f"  {perm}")
    
    # Розбиття на групи
    numbers = list(range(1, 10))
    chunks = chunk_data(numbers, 3)
    print(f"\\nГрупи по 3 з {numbers}:")
    for chunk in chunks:
        print(f"  {chunk}")
    
    # Групування
    students = [
        ('Олександр', 'Python'),
        ('Марія', 'Python'),
        ('Дмитро', 'Web'),
        ('Анна', 'Web')
    ]
    grouped = group_by_key(students, key_func=lambda x: x[1])
    print(f"\\nГрупування студентів:")
    for course, students_list in grouped.items():
        names = [name for name, _ in students_list]
        print(f"  {course}: {names}")
    
    # Декартів добуток
    colors = ['червоний', 'синій']
    sizes = ['S', 'M']
    products = generate_product(colors, sizes)
    print(f"\\nДекартів добуток {colors} x {sizes}:")
    for product in products:
        print(f"  {product}")
    
    # Нескінченний лічильник
    print(f"\\nНескінченний лічильник (0, 2):")
    counter = infinite_counter(0, 2)
    for i, num in enumerate(counter):
        print(f"  {num}", end=" ")
        if i >= 4:
            break
    print()

if __name__ == "__main__":
    демонстрація()`,
      explanation: "Рішення демонструє використання різних функцій itertools."
    },
    hints: [
      "Використовуйте itertools.combinations() для комбінацій",
      "Використовуйте itertools.permutations() для перестановок",
      "Використовуйте itertools.islice() для розбиття на групи",
      "Сортуйте перед groupby()"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке itertools?",
        options: ["Модуль для ітераторів", "Модуль для списків", "Модуль для словників", "Модуль для множин"],
        correctAnswer: 0,
        explanation: "itertools — модуль для створення та роботи з ітераторами."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між combinations та permutations?",
        options: ["Немає різниці", "combinations — порядок важливий, permutations — ні", "permutations — порядок важливий, combinations — ні", "Обидва однакові"],
        correctAnswer: 2,
        explanation: "permutations враховує порядок, combinations — ні."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: import itertools; print(list(itertools.repeat('hi', 3)))?",
        options: ["['hi', 'hi', 'hi']", "['hi']", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "itertools.repeat('hi', 3) повторює 'hi' 3 рази."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

