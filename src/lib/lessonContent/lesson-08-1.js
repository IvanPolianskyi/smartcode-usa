/**
 * Lesson 08-1: Модуль collections
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_1 = {
  lessonId: "lesson-08-1",
  moduleId: "module-08",
  order: 1,
  title: "Модуль collections",
  
  learningObjectives: [
    "Використовувати namedtuple для створення іменованих кортежів",
    "Застосовувати deque для ефективних черг",
    "Використовувати Counter для підрахунку елементів",
    "Працювати з defaultdict для словників зі значеннями за замовчуванням"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-07-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до модуля collections",
        content: `Модуль \`collections\` надає спеціалізовані контейнери даних, які є альтернативою стандартним типам Python (list, dict, tuple, set).

**Чому collections?**

Стандартні типи даних Python чудові, але іноді нам потрібні більш спеціалізовані структури для конкретних задач. Модуль collections надає такі структури.

**Основні типи з collections:**

1. **namedtuple** — кортежі з іменованими полями
2. **deque** — двостороння черга (double-ended queue)
3. **Counter** — підрахунок елементів
4. **defaultdict** — словник зі значеннями за замовчуванням
5. **OrderedDict** — словник, який зберігає порядок вставки

**Імпорт модуля:**

\`\`\`python
from collections import namedtuple, deque, Counter, defaultdict, OrderedDict
\`\`\``
      },
      {
        title: "namedtuple - іменовані кортежі",
        content: `\`namedtuple\` дозволяє створити кортеж з іменованими полями. Це зручніше, ніж звичайні кортежі, де потрібно пам'ятати індекси.

**Створення namedtuple:**

\`\`\`python
from collections import namedtuple

# Створюємо клас Point з полями x та y
Point = namedtuple('Point', ['x', 'y'])

# Створюємо екземпляр
p1 = Point(1, 2)
print(p1.x)  # 1
print(p1.y)  # 2
print(p1)    # Point(x=1, y=2)
\`\`\`

**Переваги namedtuple:**

1. **Читабельність** — можна використовувати імена замість індексів
2. **Незмінність** — як і звичайні кортежі, namedtuple незмінні
3. **Легкість** — займають менше пам'яті, ніж класи
4. **Зручність** — можна використовувати як звичайні кортежі

**Приклад: Структура даних для студента**

\`\`\`python
from collections import namedtuple

Student = namedtuple('Student', ['name', 'age', 'grade'])

student1 = Student('Олександр', 20, 95)
student2 = Student('Марія', 19, 88)

print(student1.name)   # Олександр
print(student1.age)    # 20
print(student1.grade)  # 95

# Можна використовувати як кортеж
print(student1[0])  # Олександр
print(student1[1])  # 20
\`\`\`

**Методи namedtuple:**

\`\`\`python
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)

# _asdict() - перетворює в словник
print(p._asdict())  # {'x': 3, 'y': 4}

# _replace() - створює новий namedtuple з заміненими значеннями
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)
\`\`\``
      },
      {
        title: "deque - двостороння черга",
        content: `\`deque\` (double-ended queue) — це оптимізована черга, яка дозволяє додавати та видаляти елементи з обох кінців.

**Чому deque замість list?**

- **Швидкість** — додавання/видалення з кінців O(1) замість O(n) у списку
- **Ефективність** — оптимізована для операцій з кінцями

**Створення та використання:**

\`\`\`python
from collections import deque

# Створюємо deque
d = deque([1, 2, 3])
print(d)  # deque([1, 2, 3])

# Додаємо зліва
d.appendleft(0)
print(d)  # deque([0, 1, 2, 3])

# Додаємо справа
d.append(4)
print(d)  # deque([0, 1, 2, 3, 4])

# Видаляємо зліва
left = d.popleft()
print(left)  # 0
print(d)     # deque([1, 2, 3, 4])

# Видаляємо справа
right = d.pop()
print(right)  # 4
print(d)      # deque([1, 2, 3])
\`\`\`

**Корисні методи:**

\`\`\`python
d = deque([1, 2, 3])

# extend() - додає кілька елементів
d.extend([4, 5])
print(d)  # deque([1, 2, 3, 4, 5])

# extendleft() - додає зліва (у зворотному порядку!)
d.extendleft([0, -1])
print(d)  # deque([-1, 0, 1, 2, 3, 4, 5])

# rotate() - обертає deque
d.rotate(2)  # переміщує 2 елементи з кінця на початок
print(d)  # deque([4, 5, -1, 0, 1, 2, 3])
\`\`\`

**Практичний приклад: Черга завдань**

\`\`\`python
from collections import deque

# Черга завдань
tasks = deque()

# Додаємо завдання
tasks.append('Завдання 1')
tasks.append('Завдання 2')
tasks.append('Завдання 3')

# Обробляємо завдання (FIFO - First In First Out)
while tasks:
    task = tasks.popleft()
    print(f'Обробляю: {task}')
\`\`\``
      },
      {
        title: "Counter - підрахунок елементів",
        content: `\`Counter\` — це словник для підрахунку хешованих об'єктів. Він автоматично підраховує кількість входжень кожного елемента.

**Створення Counter:**

\`\`\`python
from collections import Counter

# Зі списку
words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
counter = Counter(words)
print(counter)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})

# З рядка
text = "hello world"
char_counter = Counter(text)
print(char_counter)  # Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})
\`\`\`

**Основні методи:**

\`\`\`python
c = Counter(['a', 'b', 'c', 'a', 'b', 'a'])

# most_common() - найчастіші елементи
print(c.most_common(2))  # [('a', 3), ('b', 2)]

# Отримання значення
print(c['a'])  # 3
print(c['d'])  # 0 (не викликає помилку!)

# Оновлення
c.update(['a', 'b', 'd'])
print(c)  # Counter({'a': 4, 'b': 3, 'c': 1, 'd': 1})

# Видалення
c.subtract(['a', 'b'])
print(c)  # Counter({'a': 3, 'b': 2, 'c': 1, 'd': 1})
\`\`\`

**Практичний приклад: Аналіз тексту**

\`\`\`python
from collections import Counter

text = "Python is great. Python is powerful. Python is fun."

# Розбиваємо на слова
words = text.lower().replace('.', '').split()

# Підраховуємо
word_count = Counter(words)
print(word_count.most_common(3))
# [('python', 3), ('is', 3), ('great', 1)]
\`\`\`

**Арифметичні операції:**

\`\`\`python
c1 = Counter(['a', 'b', 'c'])
c2 = Counter(['a', 'b', 'b'])

# Додавання
print(c1 + c2)  # Counter({'b': 3, 'a': 2, 'c': 1})

# Віднімання
print(c1 - c2)  # Counter({'c': 1, 'a': 1})

# Перетин (мінімум)
print(c1 & c2)  # Counter({'a': 1, 'b': 1})

# Об'єднання (максимум)
print(c1 | c2)  # Counter({'a': 1, 'b': 2, 'c': 1})
\`\`\``
      },
      {
        title: "defaultdict - словник зі значеннями за замовчуванням",
        content: `\`defaultdict\` — це словник, який автоматично створює нові записи зі значенням за замовчуванням, якщо ключ не існує.

**Проблема зі звичайним dict:**

\`\`\`python
# Помилка, якщо ключ не існує
d = {}
d['key'] += 1  # KeyError!
\`\`\`

**Рішення з defaultdict:**

\`\`\`python
from collections import defaultdict

# Створюємо defaultdict з int (за замовчуванням 0)
d = defaultdict(int)
d['key'] += 1  # Працює! Автоматично створює ключ зі значенням 0
print(d['key'])  # 1
print(d['new_key'])  # 0 (автоматично створено)
\`\`\`

**Різні типи за замовчуванням:**

\`\`\`python
from collections import defaultdict

# int - за замовчуванням 0
d1 = defaultdict(int)
d1['count'] += 1

# list - за замовчуванням []
d2 = defaultdict(list)
d2['items'].append('apple')
d2['items'].append('banana')

# set - за замовчуванням set()
d3 = defaultdict(set)
d3['numbers'].add(1)
d3['numbers'].add(2)

# str - за замовчуванням ''
d4 = defaultdict(str)
d4['text'] += 'hello'
\`\`\`

**Власна функція за замовчуванням:**

\`\`\`python
from collections import defaultdict

# Функція, яка повертає значення за замовчуванням
def default_value():
    return 'Невідомо'

d = defaultdict(default_value)
print(d['name'])  # 'Невідомо'
\`\`\`

**Практичний приклад: Групування даних**

\`\`\`python
from collections import defaultdict

# Групуємо студентів за курсом
students = [
    ('Олександр', 'Python'),
    ('Марія', 'Python'),
    ('Іван', 'JavaScript'),
    ('Олена', 'Python'),
    ('Петро', 'JavaScript')
]

# Створюємо defaultdict зі списком
courses = defaultdict(list)

# Групуємо
for name, course in students:
    courses[course].append(name)

print(dict(courses))
# {'Python': ['Олександр', 'Марія', 'Олена'], 
#  'JavaScript': ['Іван', 'Петро']}
\`\`\``
      },
      {
        title: "OrderedDict - словник з порядком",
        content: `\`OrderedDict\` — це словник, який зберігає порядок вставки елементів.

**Важливо:** У Python 3.7+ звичайний \`dict\` також зберігає порядок, тому \`OrderedDict\` менш актуальний, але все ще корисний для сумісності та додаткових методів.

**Створення та використання:**

\`\`\`python
from collections import OrderedDict

# Створюємо OrderedDict
od = OrderedDict()
od['first'] = 1
od['second'] = 2
od['third'] = 3

print(list(od.keys()))  # ['first', 'second', 'third']

# Переміщення елемента в кінець
od.move_to_end('first')
print(list(od.keys()))  # ['second', 'third', 'first']
\`\`\`

**Практичний приклад: Кеш з обмеженою ємністю**

\`\`\`python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        if key in self.cache:
            # Переміщуємо в кінець (найновіший)
            self.cache.move_to_end(key)
            return self.cache[key]
        return None
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Видаляємо найстаріший (перший)
            self.cache.popitem(last=False)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили модуль collections:

**Ключові типи:**

1. **namedtuple** — кортежі з іменованими полями для кращої читабельності
2. **deque** — двостороння черга для швидких операцій з кінцями
3. **Counter** — автоматичний підрахунок елементів
4. **defaultdict** — словник зі значеннями за замовчуванням
5. **OrderedDict** — словник, який зберігає порядок

**Коли використовувати:**

- **namedtuple** — коли потрібна легка структура даних з іменованими полями
- **deque** — коли потрібні швидкі операції з обох кінців
- **Counter** — коли потрібно підрахувати елементи
- **defaultdict** — коли потрібно уникнути перевірок на існування ключів
- **OrderedDict** — коли порядок важливий (хоча в Python 3.7+ dict теж зберігає порядок)

**Наступний крок:**

У наступному уроці ми вивчимо модуль itertools для роботи з ітераторами та комбінаторикою.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: namedtuple для координат",
      code: `from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)

print(p.x)  # 3
print(p.y)  # 4
print(p)    # Point(x=3, y=4)`,
      explanation: "Створюємо namedtuple для представлення точки з координатами x та y."
    },
    {
      title: "Приклад 2: deque як черга",
      code: `from collections import deque

queue = deque()
queue.append('Завдання 1')
queue.append('Завдання 2')
queue.append('Завдання 3')

# Обробляємо в порядку додавання
while queue:
    task = queue.popleft()
    print(f'Обробляю: {task}')`,
      explanation: "Використовуємо deque як чергу (FIFO) для обробки завдань."
    },
    {
      title: "Приклад 3: Counter для підрахунку слів",
      code: `from collections import Counter

text = "python is great python is powerful"
words = text.split()

counter = Counter(words)
print(counter.most_common(2))
# [('python', 2), ('is', 2)]`,
      explanation: "Використовуємо Counter для підрахунку кількості входжень слів у тексті."
    },
    {
      title: "Приклад 4: defaultdict для групування",
      code: `from collections import defaultdict

data = [('a', 1), ('b', 2), ('a', 3), ('c', 4)]
grouped = defaultdict(list)

for key, value in data:
    grouped[key].append(value)

print(dict(grouped))
# {'a': [1, 3], 'b': [2], 'c': [4]}`,
      explanation: "Використовуємо defaultdict для автоматичного групування даних за ключами."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між namedtuple та класом",
      explanation: "namedtuple — це не клас, а функція, яка створює клас. Не можна додавати методи напряму.",
      correctApproach: "Використовуйте namedtuple для простих структур даних. Для складнішої логіки використовуйте звичайні класи."
    },
    {
      mistake: "Забути, що Counter повертає 0 для неіснуючих ключів",
      explanation: "Counter не викликає KeyError для неіснуючих ключів, а повертає 0.",
      correctApproach: "Використовуйте 'key' in counter для перевірки існування, якщо 0 може бути валідним значенням."
    },
    {
      mistake: "Неправильне використання extendleft()",
      explanation: "extendleft() додає елементи у зворотному порядку, що може бути неочевидним.",
      correctApproach: "Пам'ятайте, що extendleft([1, 2, 3]) додасть [3, 2, 1] зліва."
    }
  ],
  
  summary: `На цьому уроці ми вивчили модуль collections:

1. **namedtuple** — кортежі з іменованими полями для кращої читабельності
2. **deque** — двостороння черга для швидких операцій
3. **Counter** — автоматичний підрахунок елементів
4. **defaultdict** — словник зі значеннями за замовчуванням
5. **OrderedDict** — словник, який зберігає порядок

Ці структури даних допомагають писати більш ефективний та читабельний код!`,
  
  practiceTask: {
    title: "Створення системи підрахунку голосів",
    description: "Використайте Counter та defaultdict для підрахунку голосів на виборах",
    problemStatement: `Створіть систему підрахунку голосів:
1. Використайте Counter для підрахунку голосів за кожного кандидата
2. Використайте defaultdict для зберігання голосів за регіонами
3. Виведіть переможця та статистику за регіонами

Дані:
- Голоси: ['Іван', 'Марія', 'Іван', 'Петро', 'Марія', 'Іван']
- Регіони: ['Київ', 'Львів', 'Київ', 'Одеса', 'Львів', 'Київ']`,
    inputFormat: "Два списки: голоси та регіони",
    outputFormat: `Переможець: Іван (3 голоси)
Статистика за регіонами:
Київ: {'Іван': 2, 'Петро': 1}
Львів: {'Марія': 2}
Одеса: {'Марія': 1}`,
    examples: [
      {
        input: "votes = ['Іван', 'Марія', 'Іван']\nregions = ['Київ', 'Львів', 'Київ']",
        output: `Переможець: Іван (2 голоси)
Статистика за регіонами:
Київ: {'Іван': 2}
Львів: {'Марія': 1}`,
        explanation: "Використовуємо Counter для загального підрахунку та defaultdict для групування за регіонами"
      }
    ],
    solution: {
      code: `from collections import Counter, defaultdict

votes = ['Іван', 'Марія', 'Іван', 'Петро', 'Марія', 'Іван']
regions = ['Київ', 'Львів', 'Київ', 'Одеса', 'Львів', 'Київ']

# Загальний підрахунок
vote_counter = Counter(votes)
winner, votes_count = vote_counter.most_common(1)[0]
print(f'Переможець: {winner} ({votes_count} голоси)')

# Підрахунок за регіонами
regional_votes = defaultdict(Counter)
for vote, region in zip(votes, regions):
    regional_votes[region][vote] += 1

print('Статистика за регіонами:')
for region, votes in regional_votes.items():
    print(f'{region}: {dict(votes)}')`,
      explanation: "Використовуємо Counter для загального підрахунку та defaultdict з Counter для групування за регіонами."
    },
    hints: [
      "Використайте Counter для підрахунку голосів",
      "Використайте defaultdict(Counter) для групування за регіонами",
      "most_common(1) повертає найчастіший елемент",
      "zip() допомагає об'єднати два списки"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке namedtuple?",
        options: [
          "Кортеж з іменованими полями",
          "Словник з порядком",
          "Черга з двома кінцями",
          "Підрахунок елементів"
        ],
        correctAnswer: 0,
        explanation: "namedtuple дозволяє створити кортеж з іменованими полями для кращої читабельності."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка операція швидша в deque порівняно зі списком?",
        options: [
          "Додавання елементів з обох кінців",
          "Доступ до елементів за індексом",
          "Пошук елемента",
          "Сортування"
        ],
        correctAnswer: 0,
        explanation: "deque оптимізований для операцій з кінцями (append, appendleft, pop, popleft) - O(1)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що поверне Counter(['a', 'b', 'a'])['c']?",
        options: [
          "KeyError",
          "0",
          "None",
          "Помилку"
        ],
        correctAnswer: 1,
        explanation: "Counter повертає 0 для неіснуючих ключів, а не викликає KeyError."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить defaultdict?",
        options: [
          "Автоматично створює значення за замовчуванням для нових ключів",
          "Зберігає порядок вставки",
          "Підраховує елементи",
          "Створює іменовані кортежі"
        ],
        correctAnswer: 0,
        explanation: "defaultdict автоматично створює нові записи зі значенням за замовчуванням, якщо ключ не існує."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У Python 3.7+ звичайний dict також зберігає порядок вставки.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Починаючи з Python 3.7, звичайний dict гарантовано зберігає порядок вставки."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
