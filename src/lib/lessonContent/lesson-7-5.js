/**
 * Lesson 7-5: collections
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_5 = {
  lessonId: "lesson-7-5",
  moduleId: "module-7",
  order: 5,
  title: "collections",
  
  learningObjectives: [
    "Використовувати namedtuple, deque, Counter",
    "Застосовувати defaultdict",
    "Працювати з OrderedDict",
    "Використовувати спеціалізовані контейнери",
    "Розуміти переваги collections"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-7-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке collections?",
        content: `**collections** — модуль зі спеціалізованими контейнерами даних.

**Імпорт:**
\`\`\`python
from collections import namedtuple, deque, Counter, defaultdict, OrderedDict
\`\`\`

**Основні типи:**
- \`namedtuple\` — кортеж з іменованими полями
- \`deque\` — двостороння черга
- \`Counter\` — лічильник елементів
- \`defaultdict\` — словник зі значенням за замовчуванням
- \`OrderedDict\` — словник з порядком вставки

**Переваги:**
- ✅ Більш зручний синтаксис
- ✅ Оптимізована продуктивність
- ✅ Спеціалізовані структури даних`
      },
      {
        title: "namedtuple",
        content: `**namedtuple** — кортеж з іменованими полями.

**Створення:**
\`\`\`python
from collections import namedtuple

# Створення типу
Point = namedtuple('Point', ['x', 'y'])

# Створення об'єкта
p = Point(3, 4)
print(p.x)  # 3
print(p.y)  # 4
print(p[0])  # 3 (можна використовувати індекси)
\`\`\`

**Приклад:**
\`\`\`python
from collections import namedtuple

Student = namedtuple('Student', ['name', 'age', 'score'])

student1 = Student("Олександр", 15, 85)
student2 = Student("Марія", 16, 92)

print(student1.name)   # Олександр
print(student2.score)  # 92

# Незмінний (immutable)
# student1.age = 17  # AttributeError!
\`\`\`

**Переваги:**
- Більш читабельний код
- Доступ за ім'ям та індексом
- Легше, ніж клас
- Незмінний`
      },
      {
        title: "deque",
        content: `**deque** — двостороння черга (double-ended queue).

**Переваги над list:**
- Швидше додавання/видалення з обох кінців
- Оптимізована для черг

**Створення та використання:**
\`\`\`python
from collections import deque

# Створення
queue = deque([1, 2, 3])

# Додавання
queue.append(4)        # Додати справа
queue.appendleft(0)     # Додати зліва

# Видалення
right = queue.pop()     # Видалити справа
left = queue.popleft()  # Видалити зліва

print(queue)  # deque([1, 2, 3])
\`\`\`

**Приклад: черга завдань**
\`\`\`python
from collections import deque

tasks = deque()

# Додавання завдань
tasks.append("Завдання 1")
tasks.append("Завдання 2")
tasks.appendleft("Пріоритетне завдання")

# Обробка
while tasks:
    task = tasks.popleft()
    print(f"Обробка: {task}")
\`\`\``
      },
      {
        title: "Counter",
        content: `**Counter** — лічильник елементів.

**Створення:**
\`\`\`python
from collections import Counter

# Зі списку
counter = Counter([1, 2, 2, 3, 3, 3])
print(counter)  # Counter({3: 3, 2: 2, 1: 1})

# Зі рядка
text = "hello"
counter = Counter(text)
print(counter)  # Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})
\`\`\`

**Методи:**
\`\`\`python
from collections import Counter

counter = Counter(['a', 'b', 'c', 'a', 'b', 'a'])

print(counter['a'])           # 3
print(counter.most_common(2)) # [('a', 3), ('b', 2)]
print(counter.total())        # 6 (загальна кількість)
\`\`\`

**Приклад: підрахунок слів**
\`\`\`python
from collections import Counter

text = "python python java python java javascript"
words = text.split()
counter = Counter(words)

print(counter.most_common(3))
# [('python', 3), ('java', 2), ('javascript', 1)]
\`\`\``
      },
      {
        title: "defaultdict",
        content: `**defaultdict** — словник зі значенням за замовчуванням.

**Проблема зі звичайним dict:**
\`\`\`python
# Потрібно перевіряти існування ключа
data = {}
if 'key' not in data:
    data['key'] = []
data['key'].append(1)
\`\`\`

**Рішення з defaultdict:**
\`\`\`python
from collections import defaultdict

# Автоматично створює порожній список
data = defaultdict(list)
data['key'].append(1)  # Не потрібно перевіряти!
data['key'].append(2)

print(data['key'])  # [1, 2]
\`\`\`

**Різні типи за замовчуванням:**
\`\`\`python
from collections import defaultdict

# Список
lists = defaultdict(list)
lists['items'].append(1)

# Ціле число
counts = defaultdict(int)
counts['visits'] += 1

# Множина
sets = defaultdict(set)
sets['tags'].add('python')
\`\`\`

**Приклад: групування**
\`\`\`python
from collections import defaultdict

students = [
    ('Олександр', 'Python'),
    ('Марія', 'Python'),
    ('Дмитро', 'Web')
]

by_course = defaultdict(list)
for name, course in students:
    by_course[course].append(name)

print(dict(by_course))
# {'Python': ['Олександр', 'Марія'], 'Web': ['Дмитро']}
\`\`\``
      },
      {
        title: "OrderedDict",
        content: `**OrderedDict** — словник, який зберігає порядок вставки.

**У Python 3.7+ звичайний dict також зберігає порядок**, але OrderedDict має додаткові методи.

**Створення:**
\`\`\`python
from collections import OrderedDict

# Створення з порядком
od = OrderedDict()
od['first'] = 1
od['second'] = 2
od['third'] = 3

print(list(od.keys()))  # ['first', 'second', 'third']
\`\`\`

**Методи:**
\`\`\`python
from collections import OrderedDict

od = OrderedDict([('a', 1), ('b', 2), ('c', 3)])

# Перемістити в кінець
od.move_to_end('a')
print(list(od.keys()))  # ['b', 'c', 'a']

# Перемістити на початок
od.move_to_end('a', last=False)
print(list(od.keys()))  # ['a', 'b', 'c']
\`\`\`

**Коли використовувати:**
- Коли важливий порядок вставки
- Коли потрібні методи move_to_end()
- Для сумісності зі старими версіями Python`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: namedtuple",
      code: `from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)

print(f"Координати: ({p.x}, {p.y})")
print(f"X: {p[0]}, Y: {p[1]}")`,
      explanation: "Демонструє використання namedtuple."
    },
    {
      title: "Приклад 2: Counter",
      code: `from collections import Counter

text = "hello world"
counter = Counter(text)

print(f"Найчастіші символи: {counter.most_common(3)}")
print(f"Кількість 'l': {counter['l']}")`,
      explanation: "Показує підрахунок елементів з Counter."
    },
    {
      title: "Приклад 3: defaultdict",
      code: `from collections import defaultdict

data = defaultdict(list)
data['items'].append(1)
data['items'].append(2)

print(data['items'])  # [1, 2]
print(data['new'])    # [] (автоматично створено)`,
      explanation: "Демонструє defaultdict зі списком за замовчуванням."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання звичайного dict замість defaultdict",
      explanation: "Потрібно перевіряти існування ключа перед додаванням, що ускладнює код.",
      correctApproach: "Використовуйте defaultdict, коли потрібно автоматично створювати значення для нових ключів."
    },
    {
      mistake: "Плутанина між deque та list",
      explanation: "deque оптимізований для операцій з обох кінців, list для випадкового доступу.",
      correctApproach: "Використовуйте deque для черг (FIFO/LIFO), list для масивів з випадковим доступом."
    },
    {
      mistake: "Спроба змінити namedtuple",
      explanation: "namedtuple незмінний (immutable), не можна змінювати після створення.",
      correctApproach: "Створюйте новий namedtuple замість зміни існуючого, або використовуйте звичайний клас."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **collections** — модуль зі спеціалізованими контейнерами
2. **namedtuple** — кортеж з іменованими полями
3. **deque** — двостороння черга
4. **Counter** — лічильник елементів
5. **defaultdict** — словник зі значенням за замовчуванням
6. **OrderedDict** — словник з порядком вставки

**Переваги:**
- Більш зручний синтаксис
- Оптимізована продуктивність
- Спеціалізовані структури даних

**Коли використовувати:**
- namedtuple — для незмінних структур даних
- deque — для черг та стеків
- Counter — для підрахунку елементів
- defaultdict — для групування даних
- OrderedDict — коли важливий порядок

collections — потужні інструменти для роботи з даними!`,
  
  practiceTask: {
    title: "Створення системи аналізу даних",
    description: "Створіть систему аналізу з використанням collections",
    problemStatement: `Створіть систему аналізу даних з використанням collections:

**Частина 1: Використання namedtuple**
Створіть структуру для студентів:
- Student(name, age, course, score)
- Використовуйте для зберігання даних студентів

**Частина 2: Використання Counter**
Функції:
- count_courses(students) — підрахунок студентів за курсами
- count_by_age(students) — підрахунок за віком

**Частина 3: Використання defaultdict**
Функції:
- group_by_course(students) — групування студентів за курсами
- average_score_by_course(students) — середній бал за курсом

**Частина 4: Використання deque**
Створіть систему черги завдань:
- add_task(task, priority) — додати завдання
- process_tasks() — обробити завдання (спочатку пріоритетні)

**Створіть систему та продемонструйте роботу з усіма структурами.**`,
    inputFormat: "Створіть систему з використанням collections",
    outputFormat: `Приклад виведення:
=== Аналіз студентів ===
Студентів за курсами:
Python: 3
Web: 2

Групування:
Python: [Олександр, Марія, Дмитро]
Web: [Анна, Петро]

Середні бали:
Python: 87.3
Web: 82.5`,
    examples: [
      {
        input: "Аналіз даних студентів",
        output: "Система працює з усіма структурами",
        explanation: "Демонстрація collections"
      }
    ],
    solution: {
      code: `from collections import namedtuple, Counter, defaultdict, deque

# ===== NAMEDTUPLE =====
Student = namedtuple('Student', ['name', 'age', 'course', 'score'])

# ===== COUNTER =====
def count_courses(students):
    """Підрахунок студентів за курсами."""
    courses = [s.course for s in students]
    return Counter(courses)

def count_by_age(students):
    """Підрахунок студентів за віком."""
    ages = [s.age for s in students]
    return Counter(ages)

# ===== DEFAULTDICT =====
def group_by_course(students):
    """Групування студентів за курсами."""
    grouped = defaultdict(list)
    for student in students:
        grouped[student.course].append(student.name)
    return dict(grouped)

def average_score_by_course(students):
    """Середній бал за курсом."""
    scores = defaultdict(list)
    for student in students:
        scores[student.course].append(student.score)
    
    averages = {}
    for course, score_list in scores.items():
        averages[course] = sum(score_list) / len(score_list)
    
    return averages

# ===== DEQUE =====
class TaskQueue:
    def __init__(self):
        self.normal_tasks = deque()
        self.priority_tasks = deque()
    
    def add_task(self, task, priority=False):
        """Додає завдання до черги."""
        if priority:
            self.priority_tasks.append(task)
        else:
            self.normal_tasks.append(task)
    
    def process_tasks(self):
        """Обробляє завдання (спочатку пріоритетні)."""
        processed = []
        
        # Спочатку пріоритетні
        while self.priority_tasks:
            task = self.priority_tasks.popleft()
            processed.append(f"[ПРІОРИТЕТ] {task}")
        
        # Потім звичайні
        while self.normal_tasks:
            task = self.normal_tasks.popleft()
            processed.append(f"[ЗВИЧАЙНЕ] {task}")
        
        return processed

def демонстрація():
    """Демонстрація роботи системи."""
    # Створення студентів
    students = [
        Student("Олександр", 15, "Python", 85),
        Student("Марія", 16, "Python", 92),
        Student("Дмитро", 15, "Python", 85),
        Student("Анна", 16, "Web", 80),
        Student("Петро", 15, "Web", 85)
    ]
    
    print("=== Аналіз студентів ===\\n")
    
    # Підрахунок за курсами
    course_count = count_courses(students)
    print("Студентів за курсами:")
    for course, count in course_count.items():
        print(f"  {course}: {count}")
    
    # Групування
    grouped = group_by_course(students)
    print("\\nГрупування за курсами:")
    for course, names in grouped.items():
        print(f"  {course}: {names}")
    
    # Середні бали
    averages = average_score_by_course(students)
    print("\\nСередні бали за курсами:")
    for course, avg in averages.items():
        print(f"  {course}: {avg:.1f}")
    
    # Підрахунок за віком
    age_count = count_by_age(students)
    print("\\nСтудентів за віком:")
    for age, count in age_count.items():
        print(f"  {age} років: {count}")
    
    # Система черги завдань
    print("\\n=== Система черги завдань ===")
    queue = TaskQueue()
    queue.add_task("Завдання 1")
    queue.add_task("Завдання 2")
    queue.add_task("Важливе завдання", priority=True)
    queue.add_task("Завдання 3")
    
    processed = queue.process_tasks()
    print("Оброблені завдання:")
    for task in processed:
        print(f"  {task}")

if __name__ == "__main__":
    демонстрація()`,
      explanation: "Рішення демонструє використання всіх основних структур з collections."
    },
    hints: [
      "Використовуйте namedtuple для структури Student",
      "Використовуйте Counter для підрахунку",
      "Використовуйте defaultdict для групування",
      "Використовуйте deque для черги завдань"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке namedtuple?",
        options: ["Словник", "Кортеж з іменованими полями", "Список", "Множина"],
        correctAnswer: 1,
        explanation: "namedtuple — це кортеж з іменованими полями, що дозволяє доступ за ім'ям та індексом."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: from collections import Counter; c=Counter([1,2,2,3]); print(c[2])?",
        options: ["2", "1", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "Counter[2] повертає кількість входжень елемента 2, яка дорівнює 2."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати defaultdict?",
        options: ["Завжди", "Коли потрібно автоматично створювати значення для нових ключів", "Ніколи", "Тільки для списків"],
        correctAnswer: 1,
        explanation: "defaultdict використовується, коли потрібно автоматично створювати значення для нових ключів, уникаючи перевірок."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

