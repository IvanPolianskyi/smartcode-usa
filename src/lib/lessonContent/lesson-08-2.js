/**
 * Lesson 08-2: Модуль itertools
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_2 = {
  lessonId: "lesson-08-2",
  moduleId: "module-08",
  order: 2,
  title: "Модуль itertools",
  
  learningObjectives: [
    "Використовувати itertools для створення ітераторів",
    "Застосовувати комбінації та перестановки",
    "Працювати з групуванням та циклічними ітераторами",
    "Створювати ефективні ітератори для складних задач"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-08-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до модуля itertools",
        content: `Модуль \`itertools\` надає набір функцій для створення та роботи з ітераторами. Він допомагає писати ефективний код для обробки послідовностей.

**Чому itertools?**

- **Ефективність** — працює з ітераторами, не створюючи проміжні списки
- **Потужність** — багато готових функцій для складних задач
- **Читабельність** — код стає більш декларативним

**Основні категорії функцій:**

1. **Безкінечні ітератори** — cycle, repeat, count
2. **Комбінаторика** — combinations, permutations, product
3. **Групування** — groupby
4. **Фільтрація** — filterfalse, takewhile, dropwhile
5. **Об'єднання** — chain, zip_longest

**Імпорт модуля:**

\`\`\`python
from itertools import cycle, repeat, count, combinations, permutations, groupby, chain
\`\`\``
      },
      {
        title: "Безкінечні ітератори",
        content: `**cycle() — циклічне повторення**

\`\`\`python
from itertools import cycle

# Повторює послідовність безкінечно
colors = cycle(['червоний', 'зелений', 'синій'])

for i, color in enumerate(colors):
    print(color)
    if i >= 5:
        break
# червоний, зелений, синій, червоний, зелений, синій
\`\`\`

**repeat() — повторення значення**

\`\`\`python
from itertools import repeat

# Повторює значення n разів
for num in repeat(5, 3):
    print(num)
# 5, 5, 5

# Безкінечне повторення (якщо не вказати кількість)
for num in repeat(10):
    print(num)  # 10, 10, 10, ... (безкінечно)
    break  # Зупиняємо, щоб не зависнути
\`\`\`

**count() — лічильник**

\`\`\`python
from itertools import count

# Починає з 0, крок 1
for num in count():
    print(num)
    if num >= 5:
        break
# 0, 1, 2, 3, 4, 5

# З початковим значенням та кроком
for num in count(10, 2):
    print(num)
    if num >= 16:
        break
# 10, 12, 14, 16
\`\`\`

**Практичний приклад: Створення ID**

\`\`\`python
from itertools import count

# Генератор унікальних ID
id_generator = count(1)

def get_next_id():
    return next(id_generator)

print(get_next_id())  # 1
print(get_next_id())  # 2
print(get_next_id())  # 3
\`\`\``
      },
      {
        title: "Комбінаторика: combinations та permutations",
        content: `**combinations() — комбінації**

Комбінації — це вибір елементів, де порядок не важливий.

\`\`\`python
from itertools import combinations

# Всі комбінації з 3 елементів по 2
items = ['a', 'b', 'c']
combs = combinations(items, 2)
print(list(combs))
# [('a', 'b'), ('a', 'c'), ('b', 'c')]

# Комбінації з 4 елементів по 3
numbers = [1, 2, 3, 4]
combs = combinations(numbers, 3)
print(list(combs))
# [(1, 2, 3), (1, 2, 4), (1, 3, 4), (2, 3, 4)]
\`\`\`

**permutations() — перестановки**

Перестановки — це вибір елементів, де порядок важливий.

\`\`\`python
from itertools import permutations

# Всі перестановки з 3 елементів по 2
items = ['a', 'b', 'c']
perms = permutations(items, 2)
print(list(perms))
# [('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]

# Всі перестановки (без вказання довжини)
perms = permutations(['x', 'y'])
print(list(perms))
# [('x', 'y'), ('y', 'x')]
\`\`\`

**product() — декартів добуток**

\`\`\`python
from itertools import product

# Декартів добуток двох послідовностей
colors = ['червоний', 'синій']
sizes = ['S', 'M', 'L']

prods = product(colors, sizes)
print(list(prods))
# [('червоний', 'S'), ('червоний', 'M'), ('червоний', 'L'),
#  ('синій', 'S'), ('синій', 'M'), ('синій', 'L')]

# З повторенням
prods = product([0, 1], repeat=3)
print(list(prods))
# [(0, 0, 0), (0, 0, 1), (0, 1, 0), (0, 1, 1),
#  (1, 0, 0), (1, 0, 1), (1, 1, 0), (1, 1, 1)]
\`\`\`

**Практичний приклад: Генерація паролів**

\`\`\`python
from itertools import product

# Генерація всіх можливих 3-символьних паролів
chars = 'abc'
passwords = product(chars, repeat=3)

for pwd in list(passwords)[:5]:  # Перші 5
    print(''.join(pwd))
# aaa, aab, aac, aba, abb
\`\`\``
      },
      {
        title: "Групування: groupby",
        content: `\`groupby()\` групує послідовні елементи з однаковим ключем.

**Важливо:** Елементи повинні бути відсортовані за ключем!

\`\`\`python
from itertools import groupby

# Групуємо за значенням
data = [1, 1, 2, 2, 2, 3, 3, 3, 3]

for key, group in groupby(data):
    print(f'{key}: {list(group)}')
# 1: [1, 1]
# 2: [2, 2, 2]
# 3: [3, 3, 3, 3]
\`\`\`

**Групування за функцією:**

\`\`\`python
from itertools import groupby

# Групуємо слова за довжиною
words = ['apple', 'bat', 'cat', 'dog', 'elephant', 'fox']

# Спочатку сортуємо!
words_sorted = sorted(words, key=len)

for length, group in groupby(words_sorted, key=len):
    print(f'Довжина {length}: {list(group)}')
# Довжина 3: ['bat', 'cat', 'dog', 'fox']
# Довжина 5: ['apple']
# Довжина 8: ['elephant']
\`\`\`

**Практичний приклад: Групування студентів за оцінкою**

\`\`\`python
from itertools import groupby

students = [
    ('Олександр', 95),
    ('Марія', 88),
    ('Іван', 95),
    ('Олена', 88),
    ('Петро', 90)
]

# Сортуємо за оцінкою
students_sorted = sorted(students, key=lambda x: x[1])

# Групуємо
for grade, group in groupby(students_sorted, key=lambda x: x[1]):
    names = [name for name, _ in group]
    print(f'Оцінка {grade}: {names}')
# Оцінка 88: ['Марія', 'Олена']
# Оцінка 90: ['Петро']
# Оцінка 95: ['Олександр', 'Іван']
\`\`\``
      },
      {
        title: "Об'єднання та фільтрація",
        content: `**chain() — об'єднання ітераторів**

\`\`\`python
from itertools import chain

# Об'єднує кілька послідовностей
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

combined = chain(list1, list2, list3)
print(list(combined))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# З unpacking
lists = [[1, 2], [3, 4], [5, 6]]
combined = chain(*lists)
print(list(combined))
# [1, 2, 3, 4, 5, 6]
\`\`\`

**zip_longest() — zip з заповненням**

\`\`\`python
from itertools import zip_longest

# Звичайний zip обрізає до найкоротшої послідовності
list1 = [1, 2, 3]
list2 = ['a', 'b']
print(list(zip(list1, list2)))
# [(1, 'a'), (2, 'b')]

# zip_longest заповнює None
print(list(zip_longest(list1, list2)))
# [(1, 'a'), (2, 'b'), (3, None)]

# З власним значенням заповнення
print(list(zip_longest(list1, list2, fillvalue='-')))
# [(1, 'a'), (2, 'b'), (3, '-')]
\`\`\`

**takewhile() та dropwhile() — умовна фільтрація**

\`\`\`python
from itertools import takewhile, dropwhile

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Беремо елементи, поки умова True
small = takewhile(lambda x: x < 5, numbers)
print(list(small))
# [1, 2, 3, 4]

# Пропускаємо елементи, поки умова True
skipped = dropwhile(lambda x: x < 5, numbers)
print(list(skipped))
# [5, 6, 7, 8, 9, 10]
\`\`\`

**filterfalse() — фільтрація хибних значень**

\`\`\`python
from itertools import filterfalse

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Беремо тільки непарні (фільтруємо парні)
odd = filterfalse(lambda x: x % 2 == 0, numbers)
print(list(odd))
# [1, 3, 5, 7, 9]
\`\`\``
      },
      {
        title: "Комбінування функцій itertools",
        content: `Можна комбінувати різні функції itertools для складних задач.

**Приклад: Всі можливі комбінації з обмеженням**

\`\`\`python
from itertools import combinations, chain

# Всі комбінації різних розмірів
items = ['a', 'b', 'c', 'd']

# Комбінації по 2 та по 3
combs_2 = combinations(items, 2)
combs_3 = combinations(items, 3)

# Об'єднуємо
all_combs = chain(combs_2, combs_3)
print(list(all_combs))
# [('a', 'b'), ('a', 'c'), ..., ('a', 'b', 'c'), ...]
\`\`\`

**Приклад: Обробка даних з групуванням**

\`\`\`python
from itertools import groupby, chain

# Дані з різних джерел
data1 = [1, 1, 2, 2]
data2 = [2, 3, 3, 4]

# Об'єднуємо та сортуємо
combined = sorted(chain(data1, data2))

# Групуємо
for key, group in groupby(combined):
    count = len(list(group))
    print(f'{key}: {count} разів')
# 1: 2 разів
# 2: 3 разів
# 3: 2 разів
# 4: 1 разів
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили модуль itertools:

**Ключові функції:**

1. **Безкінечні ітератори** — cycle, repeat, count
2. **Комбінаторика** — combinations, permutations, product
3. **Групування** — groupby (потрібна сортування!)
4. **Об'єднання** — chain, zip_longest
5. **Фільтрація** — takewhile, dropwhile, filterfalse

**Переваги:**

- Ефективність — працює з ітераторами
- Потужність — багато готових функцій
- Читабельність — декларативний код

**Важливо пам'ятати:**

- groupby потребує відсортованих даних
- Безкінечні ітератори можуть зависнути програму
- itertools працює з ітераторами, не створюючи списки

**Наступний крок:**

У наступному уроці ми вивчимо модуль functools для роботи з функціями.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: cycle для чергування",
      code: `from itertools import cycle

colors = cycle(['червоний', 'зелений', 'синій'])
for i in range(5):
    print(next(colors))
# червоний, зелений, синій, червоний, зелений`,
      explanation: "Використовуємо cycle для безкінечного повторення послідовності."
    },
    {
      title: "Приклад 2: combinations для вибору",
      code: `from itertools import combinations

items = ['a', 'b', 'c', 'd']
combs = combinations(items, 2)
print(list(combs))
# [('a', 'b'), ('a', 'c'), ('a', 'd'), ('b', 'c'), ('b', 'd'), ('c', 'd')]`,
      explanation: "Генеруємо всі можливі комбінації з 4 елементів по 2."
    },
    {
      title: "Приклад 3: groupby для групування",
      code: `from itertools import groupby

data = [1, 1, 2, 2, 2, 3]
for key, group in groupby(data):
    print(f'{key}: {len(list(group))}')
# 1: 2
# 2: 3
# 3: 1`,
      explanation: "Групуємо елементи за значенням та підраховуємо кількість."
    },
    {
      title: "Приклад 4: chain для об'єднання",
      code: `from itertools import chain

list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = chain(list1, list2)
print(list(combined))
# [1, 2, 3, 4, 5, 6]`,
      explanation: "Об'єднуємо кілька послідовностей в одну."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути відсортувати дані перед groupby",
      explanation: "groupby працює тільки з послідовними елементами, тому дані повинні бути відсортовані.",
      correctApproach: "Завжди сортуйте дані перед використанням groupby: sorted(data, key=...)"
    },
    {
      mistake: "Використання безкінечних ітераторів без обмеження",
      explanation: "cycle, repeat, count можуть працювати безкінечно, що зависне програму.",
      correctApproach: "Використовуйте break або takewhile для обмеження кількості ітерацій."
    },
    {
      mistake: "Плутанина між combinations та permutations",
      explanation: "combinations — порядок не важливий, permutations — порядок важливий.",
      correctApproach: "Використовуйте combinations для вибору, permutations для впорядкованих послідовностей."
    }
  ],
  
  summary: `На цьому уроці ми вивчили модуль itertools:

1. **Безкінечні ітератори** — cycle, repeat, count
2. **Комбінаторика** — combinations, permutations, product
3. **Групування** — groupby (потрібна сортування!)
4. **Об'єднання** — chain, zip_longest
5. **Фільтрація** — takewhile, dropwhile, filterfalse

itertools допомагає писати ефективний та елегантний код для роботи з послідовностями!`,
  
  practiceTask: {
    title: "Генерація всіх можливих паролів",
    description: "Використайте product для генерації всіх можливих комбінацій",
    problemStatement: `Створіть функцію, яка генерує всі можливі паролі заданої довжини:
1. Використайте product для генерації комбінацій
2. Обмежте виведення першими 10 паролями
3. Підрахуйте загальну кількість можливих паролів

Символи: 'abc'
Довжина: 3`,
    inputFormat: "Символи та довжина пароля",
    outputFormat: `Перші 10 паролів:
aaa
aab
aac
aba
abb
abc
aca
acb
acc
baa

Загальна кількість: 27`,
    examples: [
      {
        input: "chars = 'ab', length = 2",
        output: `Перші 10 паролів:
aa
ab
ba
bb

Загальна кількість: 4`,
        explanation: "Використовуємо product з repeat для генерації всіх комбінацій."
      }
    ],
    solution: {
      code: `from itertools import product

def generate_passwords(chars, length):
    passwords = product(chars, repeat=length)
    password_list = list(passwords)
    
    print('Перші 10 паролів:')
    for pwd in password_list[:10]:
        print(''.join(pwd))
    
    print(f'\\nЗагальна кількість: {len(password_list)}')

generate_passwords('abc', 3)`,
      explanation: "Використовуємо product з repeat для генерації всіх можливих комбінацій символів заданої довжини."
    },
    hints: [
      "Використайте product з параметром repeat",
      "Перетворіть кортежі в рядки за допомогою join",
      "Обмежте виведення першими 10 елементами",
      "Підрахуйте загальну кількість через len()"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить cycle()?",
        options: [
          "Повторює послідовність безкінечно",
          "Підраховує елементи",
          "Групує елементи",
          "Фільтрує елементи"
        ],
        correctAnswer: 0,
        explanation: "cycle() повторює послідовність безкінечно в циклі."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між combinations та permutations?",
        options: [
          "combinations — порядок не важливий, permutations — важливий",
          "combinations — порядок важливий, permutations — не важливий",
          "Немає різниці",
          "combinations швидший"
        ],
        correctAnswer: 0,
        explanation: "combinations — вибір без урахування порядку, permutations — з урахуванням порядку."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що потрібно зробити перед використанням groupby?",
        options: [
          "Нічого",
          "Відсортувати дані",
          "Перетворити в список",
          "Фільтрувати дані"
        ],
        correctAnswer: 1,
        explanation: "groupby працює тільки з послідовними елементами, тому дані повинні бути відсортовані."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить chain()?",
        options: [
          "Об'єднує кілька послідовностей",
          "Групує елементи",
          "Фільтрує елементи",
          "Сортує елементи"
        ],
        correctAnswer: 0,
        explanation: "chain() об'єднує кілька ітераторів в один."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "itertools працює з ітераторами, не створюючи проміжні списки.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. itertools працює з ітераторами, що економить пам'ять."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
