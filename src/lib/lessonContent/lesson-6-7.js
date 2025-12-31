/**
 * Lesson 6-7: Магічні методи (__str__, __len__ тощо)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_7 = {
  lessonId: "lesson-6-7",
  moduleId: "module-6",
  order: 7,
  title: "Магічні методи (__str__, __len__ тощо)",
  
  learningObjectives: [
    "Використовувати __str__ та __repr__",
    "Реалізовувати оператори (__add__, __eq__)",
    "Створювати контекстні менеджери",
    "Використовувати __getitem__, __setitem__",
    "Розуміти призначення магічних методів"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-6-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке магічні методи?",
        content: `**Магічні методи (dunder methods)** — спеціальні методи, які починаються та закінчуються подвійним підкресленням (__).

**Приклади:**
- \`__init__\` — конструктор
- \`__str__\` — рядкове представлення
- \`__len__\` — довжина об'єкта
- \`__add__\` — оператор +

**Особливості:**
- Викликаються автоматично Python
- Дозволяють налаштувати поведінку об'єктів
- Роблять об'єкти більш "природними" у використанні

**Аналогія:**
Магічні методи — це "інструкції" для Python, як обробляти ваші об'єкти в різних ситуаціях.

**Приклад:**
\`\`\`python
class Student:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        return f"Студент: {self.name}"

student = Student("Олександр")
print(student)  # Викликається __str__ автоматично
# Виведе: Студент: Олександр
\`\`\``
      },
      {
        title: "__str__ та __repr__",
        content: `**__str__** — рядкове представлення для користувача (читабельне).
**__repr__** — технічне представлення для розробника (однозначне).

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Студент {self.name}, {self.age} років"
    
    def __repr__(self):
        return f"Student('{self.name}', {self.age})"

student = Student("Олександр", 15)
print(str(student))   # Студент Олександр, 15 років (__str__)
print(repr(student))  # Student('Олександр', 15) (__repr__)
print(student)        # Студент Олександр, 15 років (використовує __str__)
\`\`\`

**Коли використовується:**
- \`__str__\` — при print(), str(), f-рядках
- \`__repr__\` — при repr(), в інтерактивному режимі, для відлагодження

**Рекомендація:**
- \`__str__\` — зрозуміле для користувача
- \`__repr__\` — однозначне, бажано можна скопіювати та виконати для створення об'єкта`
      },
      {
        title: "Оператори (__add__, __eq__, __lt__)",
        content: `**Магічні методи** дозволяють використовувати оператори з об'єктами.

**Арифметичні оператори:**
\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Викликається __add__
print(v3)  # Vector(4, 6)
\`\`\`

**Оператори порівняння:**
\`\`\`python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    
    def __eq__(self, other):
        return self.score == other.score
    
    def __lt__(self, other):
        return self.score < other.score
    
    def __le__(self, other):
        return self.score <= other.score

student1 = Student("Олександр", 85)
student2 = Student("Марія", 92)

print(student1 < student2)  # True (викликається __lt__)
print(student1 == student2)  # False (викликається __eq__)
\`\`\`

**Поширені оператори:**
- \`__add__\` — +
- \`__sub__\` — -
- \`__mul__\` — *
- \`__truediv__\` — /
- \`__eq__\` — ==
- \`__lt__\` — <
- \`__le__\` — <=
- \`__gt__\` — >
- \`__ge__\` — >=`
      },
      {
        title: "__len__ та __bool__",
        content: `**__len__** — повертає довжину об'єкта (для len()).
**__bool__** — повертає булеве значення (для if, while).

\`\`\`python
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item):
        self.items.append(item)
    
    def __len__(self):
        return len(self.items)
    
    def __bool__(self):
        return len(self.items) > 0
    
    def __str__(self):
        return f"Кошик з {len(self.items)} товарами"

cart = ShoppingCart()
print(len(cart))  # 0 (викликається __len__)
print(bool(cart))  # False (викликається __bool__)

if cart:  # Викликається __bool__
    print("Кошик не порожній")
else:
    print("Кошик порожній")

cart.add_item("Книга")
print(len(cart))  # 1
print(bool(cart))  # True
\`\`\`

**Важливо:**
- Якщо немає \`__bool__\`, Python використовує \`__len__\`
- Якщо немає обох, завжди True`
      },
      {
        title: "__getitem__ та __setitem__",
        content: `**__getitem__** — доступ до елементів через індекс (obj[key]).
**__setitem__** — встановлення елементів через індекс (obj[key] = value).

\`\`\`python
class MyList:
    def __init__(self):
        self._items = []
    
    def __getitem__(self, index):
        return self._items[index]
    
    def __setitem__(self, index, value):
        self._items[index] = value
    
    def append(self, item):
        self._items.append(item)
    
    def __len__(self):
        return len(self._items)
    
    def __str__(self):
        return str(self._items)

my_list = MyList()
my_list.append(1)
my_list.append(2)
my_list.append(3)

print(my_list[0])  # 1 (викликається __getitem__)
my_list[1] = 20     # Викликається __setitem__
print(my_list)      # [1, 20, 3]
\`\`\`

**Приклад зі словником:**
\`\`\`python
class Config:
    def __init__(self):
        self._data = {}
    
    def __getitem__(self, key):
        return self._data.get(key, None)
    
    def __setitem__(self, key, value):
        self._data[key] = value

config = Config()
config["name"] = "Олександр"
print(config["name"])  # Олександр
\`\`\``
      },
      {
        title: "Контекстні менеджери (__enter__, __exit__)",
        content: `**__enter__** та **__exit__** — для створення контекстних менеджерів (with).

\`\`\`python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode, encoding="utf-8")
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        return False  # Не приховуємо помилки

# Використання
with FileManager("data.txt", "w") as file:
    file.write("Привіт!")
# Файл автоматично закриється
\`\`\`

**Параметри __exit__:**
- \`exc_type\` — тип винятку (або None)
- \`exc_val\` — значення винятку (або None)
- \`exc_tb\` — traceback (або None)

**Повернення False** — не приховує помилки (рекомендовано)
**Повернення True** — приховує помилки (обережно!)`
      },
      {
        title: "Інші корисні магічні методи",
        content: `**__call__** — дозволяє викликати об'єкт як функцію:
\`\`\`python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor
    
    def __call__(self, number):
        return number * self.factor

multiply_by_5 = Multiplier(5)
print(multiply_by_5(10))  # 50 (об'єкт викликається як функція)
\`\`\`

**__iter__ та __next__** — для ітераторів:
\`\`\`python
class Countdown:
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1
\`\`\`

**__contains__** — для оператора in:
\`\`\`python
class MyContainer:
    def __init__(self, items):
        self.items = items
    
    def __contains__(self, item):
        return item in self.items

container = MyContainer([1, 2, 3])
print(2 in container)  # True (викликається __contains__)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: __str__ та __repr__",
      code: `class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Студент {self.name}, {self.age} років"
    
    def __repr__(self):
        return f"Student('{self.name}', {self.age})"

student = Student("Олександр", 15)
print(str(student))   # Студент Олександр, 15 років
print(repr(student))  # Student('Олександр', 15)
print(student)        # Студент Олександр, 15 років`,
      explanation: "Демонструє різницю між __str__ та __repr__."
    },
    {
      title: "Приклад 2: Оператори",
      code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2
print(v3)  # Vector(4, 6)
print(v1 == v2)  # False`,
      explanation: "Показує реалізацію операторів через магічні методи."
    },
    {
      title: "Приклад 3: __len__ та __bool__",
      code: `class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item):
        self.items.append(item)
    
    def __len__(self):
        return len(self.items)
    
    def __bool__(self):
        return len(self.items) > 0

cart = ShoppingCart()
print(len(cart))  # 0
print(bool(cart))  # False
cart.add_item("Книга")
print(len(cart))  # 1`,
      explanation: "Демонструє __len__ та __bool__."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між __str__ та __repr__",
      explanation: "__str__ для користувача, __repr__ для розробника. Часто плутають призначення.",
      correctApproach: "Використовуйте __str__ для зручного виведення, __repr__ для технічного (бажано однозначного)."
    },
    {
      mistake: "Не повертати правильний тип в __len__",
      explanation: "__len__ має повертати int, не float або інший тип.",
      correctApproach: "Завжди повертайте int з __len__: return len(self.items)."
    },
    {
      mistake: "Забути про __bool__",
      explanation: "Без __bool__ Python використовує __len__, що може дати неочікувану поведінку.",
      correctApproach: "Якщо потрібна специфічна логіка для bool(), реалізуйте __bool__."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Магічні методи** — спеціальні методи з __
2. **__str__ та __repr__** — рядкове представлення
3. **Оператори** — __add__, __eq__, __lt__ тощо
4. **__len__ та __bool__** — довжина та булеве значення
5. **__getitem__ та __setitem__** — доступ через індекс
6. **Контекстні менеджери** — __enter__, __exit__
7. **Інші методи** — __call__, __iter__, __next__, __contains__

**Призначення:**
- Роблять об'єкти більш "природними"
- Дозволяють використовувати стандартні оператори
- Налаштовують поведінку об'єктів

**Важливо:**
- __str__ для користувача, __repr__ для розробника
- Оператори мають повертати правильні типи
- Контекстні менеджери для управління ресурсами

Магічні методи роблять об'єкти більш зручними у використанні!`,
  
  practiceTask: {
    title: "Створення класу з магічними методами",
    description: "Створіть клас з різними магічними методами",
    problemStatement: `Створіть клас Fraction (дріб) з магічними методами:

**Атрибути:**
- numerator (чисельник)
- denominator (знаменник)

**Магічні методи:**
- __init__(numerator, denominator) — конструктор з валідацією (знаменник != 0)
- __str__() — повертає "numerator/denominator" (наприклад, "3/4")
- __repr__() — повертає "Fraction(numerator, denominator)"
- __add__(other) — додавання дробів
- __sub__(other) — віднімання дробів
- __mul__(other) — множення дробів
- __eq__(other) — порівняння на рівність
- __lt__(other) — порівняння (<)
- __float__() — конвертація в float

**Формула додавання:** (a/b) + (c/d) = (ad + bc) / bd
**Формула віднімання:** (a/b) - (c/d) = (ad - bc) / bd
**Формула множення:** (a/b) * (c/d) = ac / bd

**Створіть кілька дробів та продемонструйте всі операції.**`,
    inputFormat: "Створіть клас та об'єкти",
    outputFormat: `Приклад виведення:
1/2 + 1/3 = 5/6
1/2 - 1/3 = 1/6
1/2 * 1/3 = 1/6
1/2 == 2/4: True
1/2 < 2/3: True`,
    examples: [
      {
        input: "Fraction(1, 2) + Fraction(1, 3)",
        output: "Fraction(5, 6)",
        explanation: "Демонстрація магічних методів для арифметичних операцій"
      }
    ],
    solution: {
      code: `class Fraction:
    def __init__(self, numerator, denominator):
        if denominator == 0:
            raise ValueError("Знаменник не може бути нулем!")
        self.numerator = numerator
        self.denominator = denominator
    
    def __str__(self):
        return f"{self.numerator}/{self.denominator}"
    
    def __repr__(self):
        return f"Fraction({self.numerator}, {self.denominator})"
    
    def __add__(self, other):
        new_num = self.numerator * other.denominator + other.numerator * self.denominator
        new_den = self.denominator * other.denominator
        return Fraction(new_num, new_den)
    
    def __sub__(self, other):
        new_num = self.numerator * other.denominator - other.numerator * self.denominator
        new_den = self.denominator * other.denominator
        return Fraction(new_num, new_den)
    
    def __mul__(self, other):
        new_num = self.numerator * other.numerator
        new_den = self.denominator * other.denominator
        return Fraction(new_num, new_den)
    
    def __eq__(self, other):
        return self.numerator * other.denominator == other.numerator * self.denominator
    
    def __lt__(self, other):
        return self.numerator * other.denominator < other.numerator * self.denominator
    
    def __float__(self):
        return self.numerator / self.denominator

# Використання
f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
f3 = Fraction(2, 4)

print(f"{f1} + {f2} = {f1 + f2}")
print(f"{f1} - {f2} = {f1 - f2}")
print(f"{f1} * {f2} = {f1 * f2}")
print(f"{f1} == {f3}: {f1 == f3}")
print(f"{f1} < {f2}: {f1 < f2}")
print(f"float({f1}) = {float(f1)}")`,
      explanation: "Рішення демонструє повну реалізацію класу Fraction з магічними методами."
    },
    hints: [
      "Використовуйте математичні формули для операцій з дробами",
      "Валідуйте знаменник в __init__",
      "Для порівняння використовуйте перехресне множення",
      "Не забудьте про __float__ для конвертації"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод викликається при print(obj)?",
        options: ["__repr__", "__str__", "__print__", "__display__"],
        correctAnswer: 1,
        explanation: "print() викликає __str__ для рядкового представлення об'єкта."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: def __add__(self, o): return 5; a=A(); print(a + a)?",
        options: ["5", "Помилку", "None", "A"],
        correctAnswer: 0,
        explanation: "__add__ викликається при використанні оператора +, повертає 5."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод викликається при len(obj)?",
        options: ["__length__", "__len__", "__size__", "__count__"],
        correctAnswer: 1,
        explanation: "len() викликає __len__ для отримання довжини об'єкта."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

