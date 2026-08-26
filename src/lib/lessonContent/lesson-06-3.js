/**
 * Lesson 06-3: Декоратори класів та методів
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_3 = {
  lessonId: "lesson-06-3",
  moduleId: "module-06",
  order: 3,
  title: "Декоратори класів та методів",

  learningObjectives: [
    "Використовувати @property для керованого доступу до атрибутів",
    "Розрізняти @staticmethod і @classmethod",
    "Застосовувати власні декоратори до методів класу",
    "Розуміти ідею декораторів класів"
  ],

  prerequisites: ["lesson-06-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Вбудовані декоратори методів",
        content: `У класах Python часто зустрічаються три вбудовані декоратори:

1. **@property** — дозволяє звертатися до методу як до атрибута (\`obj.name\` замість \`obj.name()\`)
2. **@staticmethod** — метод без \`self\` і \`cls\`, логічно пов'язаний із класом
3. **@classmethod** — метод, що отримує клас (\`cls\`) замість екземпляра

\`\`\`python
class Demo:
    @property
    def label(self):
        return "demo"

    @staticmethod
    def ping():
        return "pong"

    @classmethod
    def create(cls):
        return cls()

d = Demo()
print(d.label)       # demo  (без дужок!)
print(Demo.ping())   # pong
print(Demo.create()) # <Demo object ...>
\`\`\`

Усі троє — звичайні декоратори, лише вже визначені в мові.`
      },
      {
        title: "@property: геттери і сеттери",
        content: `\`@property\` перетворює метод на атрибут лише для читання (або з контрольованим записом).

\`\`\`python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Вік не може бути від'ємним")
        self._age = value

    @property
    def is_adult(self):
        return self._age >= 18

p = Person("Оля", 20)
print(p.name)       # Оля
print(p.is_adult)   # True
p.age = 21          # через setter
\`\`\`

**Навіщо:**
- Приховати внутрішнє поле (\`_age\`)
- Додати валідацію при зміні
- Обчислити похідне значення (\`is_adult\`) без дужок у виклику`
      },
      {
        title: "@staticmethod vs @classmethod",
        content: `**@staticmethod** — звичайна функція в просторі імен класу. Не отримує ні екземпляр, ні клас.

\`\`\`python
class MathUtils:
    @staticmethod
    def clamp(value, low, high):
        return max(low, min(high, value))

print(MathUtils.clamp(15, 0, 10))  # 10
\`\`\`

**@classmethod** — перший аргумент \`cls\` (сам клас). Зручно для альтернативних конструкторів.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, data):
        name, age = data.split(",")
        return cls(name.strip(), int(age.strip()))

p = Person.from_string("Тарас, 17")
print(p.name, p.age)  # Тарас 17
\`\`\`

**Коли що:**
- \`staticmethod\` — утиліта, якій не потрібен стан класу/екземпляра
- \`classmethod\` — фабрики, робота з \`cls\`, наслідування альтернативних конструкторів`
      },
      {
        title: "Власні декоратори для методів",
        content: `Власний декоратор працює з методами так само, як із функціями. Пам'ятайте: перший аргумент методу — \`self\`.

\`\`\`python
from functools import wraps

def log_method(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        print(f"{self.__class__.__name__}.{func.__name__}")
        return func(self, *args, **kwargs)
    return wrapper

class Counter:
    def __init__(self):
        self.value = 0

    @log_method
    def inc(self):
        self.value += 1
        return self.value

c = Counter()
print(c.inc())
# Counter.inc
# 1
\`\`\`

Можна лишити \`*args, **kwargs\` без явного \`self\` — тоді \`self\` просто опиниться в \`args[0]\`. Явний \`self\` читабельніший для методів екземпляра.`
      },
      {
        title: "Декоратори класів (коротко)",
        content: `Декоратор класу приймає клас і повертає клас (той самий або новий).

\`\`\`python
def add_repr(cls):
    def __repr__(self):
        attrs = ", ".join(f"{k}={v!r}" for k, v in self.__dict__.items())
        return f"{cls.__name__}({attrs})"
    cls.__repr__ = __repr__
    return cls

@add_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

print(Point(1, 2))  # Point(x=1, y=2)
\`\`\`

**Ідея:** додати методи, зареєструвати клас, обгорнути всі методи тощо — без зміни тіла класу вручну.

Декоратори класів рідше потрібні новачкам, ніж \`@property\` / \`@classmethod\`, але концепція та сама: \`Point = add_repr(Point)\`.`
      },
      {
        title: "Поєднання property і логіки класу",
        content: `Типовий навчальний приклад — модель з обчислюваними властивостями:

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

    @classmethod
    def square(cls, side):
        return cls(side, side)

    @staticmethod
    def is_valid(width, height):
        return width > 0 and height > 0

r = Rectangle.square(4)
print(r.area)         # 16
print(r.perimeter)    # 16
print(Rectangle.is_valid(4, 4))  # True
\`\`\`

Тут видно різницю:
- \`area\` — як атрибут
- \`square\` — альтернативний конструктор через \`cls\`
- \`is_valid\` — утиліта без \`self\``
      }
    ]
  },

  codeExamples: [
    {
      title: "property для is_adult",
      code: `class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @property
    def is_adult(self):
        return self._age >= 18

p = Person("Ірина", 19)
print(p.name, p.is_adult)`,
      explanation: "is_adult обчислюється при зверненні як до атрибута, без дужок."
    },
    {
      title: "classmethod як конструктор",
      code: `class User:
    def __init__(self, login):
        self.login = login

    @classmethod
    def guest(cls):
        return cls("guest")

u = User.guest()
print(u.login)  # guest`,
      explanation: "classmethod отримує cls і створює екземпляр альтернативним способом."
    },
    {
      title: "staticmethod-утиліта",
      code: `class TextTools:
    @staticmethod
    def normalize(s):
        return s.strip().lower()

print(TextTools.normalize("  Hello "))  # hello`,
      explanation: "staticmethod не потребує self — це функція в просторі імен класу."
    },
    {
      title: "Декоратор класу add_repr",
      code: `def add_repr(cls):
    def __repr__(self):
        return f"{cls.__name__}(**{self.__dict__})"
    cls.__repr__ = __repr__
    return cls

@add_repr
class Box:
    def __init__(self, size):
        self.size = size

print(Box(10))`,
      explanation: "Декоратор класу додає метод __repr__ і повертає змінений клас."
    }
  ],

  commonMistakes: [
    {
      mistake: "Викликати property з дужками: p.is_adult()",
      explanation: "property вже є атрибутом; дужки призведуть до TypeError (bool не викликається).",
      correctApproach: "Пишіть p.is_adult без дужок"
    },
    {
      mistake: "Оголосити @staticmethod з параметром self",
      explanation: "staticmethod не отримує екземпляр — self стане звичайним обов'язковим аргументом.",
      correctApproach: "Для staticmethod не додавайте self/cls; для методів екземпляра — залишайте self"
    },
    {
      mistake: "Плутати classmethod і staticmethod",
      explanation: "classmethod потрібен, коли створюєте екземпляр через cls або читаєте атрибути класу.",
      correctApproach: "Альтернативний конструктор → @classmethod; чиста утиліта → @staticmethod"
    },
    {
      mistake: "Забути return cls у декораторі класу",
      explanation: "Без return ім'я класу стане None після застосування декоратора.",
      correctApproach: "Завжди повертайте клас: return cls"
    }
  ],

  summary: `На цьому уроці ми розглянули декоратори в контексті класів:

1. @property — методи як атрибути, геттери/сеттери, обчислювані поля
2. @staticmethod — утиліти без self/cls
3. @classmethod — робота з cls, альтернативні конструктори
4. Власні декоратори методів — той самий wrapping, часто з явним self
5. Декоратори класів — Class = decorator(Class), наприклад додавання __repr__

У наступному (практичному) уроці закріпимо все на складніших задачах: retry, cache, комбінування декораторів.`,

  practiceTask: {
    title: "Клас Person з @property",
    description: "Створіть клас із властивостями name, age та is_adult",
    problemStatement: `Створіть клас **Person** з:

1. \`__init__(self, name, age)\` — зберігає \`_name\` і \`_age\`
2. \`@property name\` — повертає ім'я
3. \`@property age\` — повертає вік
4. \`@property is_adult\` — \`True\`, якщо вік ≥ 18, інакше \`False\`

Зчитайте зі stdin ім'я та вік (два рядки). Створіть \`Person\` і виведіть три рядки:

\`\`\`
Ім'я: <name>
Вік: <age>
Дорослий: <True|False>
\`\`\`

Формат вводу:
Оля
20`,
    outputFormat: `Ім'я: Оля
Вік: 20
Дорослий: True`,
    examples: [
      {
        input: `Оля
20`,
        output: `Ім'я: Оля
Вік: 20
Дорослий: True`,
        explanation: "Вік 20 ≥ 18, тому is_adult = True"
      },
      {
        input: `Тарас
17`,
        output: `Ім'я: Тарас
Вік: 17
Дорослий: False`,
        explanation: "Вік 17 < 18, тому is_adult = False"
      },
      {
        input: `Марія
18`,
        output: `Ім'я: Марія
Вік: 18
Дорослий: True`,
        explanation: "Межа: рівно 18 років вважається дорослим"
      }
    ],
    solution: {
      code: `class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @property
    def is_adult(self):
        return self._age >= 18

name = input().strip()
age = int(input().strip())
person = Person(name, age)
print(f"Ім'я: {person.name}")
print(f"Вік: {person.age}")
print(f"Дорослий: {person.is_adult}")`,
      explanation: "Три @property дають доступ без дужок. is_adult обчислюється з _age >= 18."
    },
    hints: [
      "Зберігайте поля як _name і _age",
      "Звертайтеся до властивостей без дужок: person.name",
      "is_adult — це return self._age >= 18",
      "Вік зчитуйте через int(input().strip())"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно звернутися до @property is_adult?",
        options: [
          "obj.is_adult()",
          "obj.is_adult",
          "obj.@is_adult",
          "is_adult(obj)"
        ],
        correctAnswer: 1,
        explanation: "property використовується як атрибут — без дужок."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "@classmethod отримує екземпляр як перший аргумент self.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. @classmethod отримує клас як перший аргумент cls."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого зручний @classmethod?",
        options: [
          "Лише для прискорення коду",
          "Для альтернативних конструкторів через cls",
          "Тільки для приватних полів",
          "Замість import"
        ],
        correctAnswer: 1,
        explanation: "classmethod часто використовують як фабрику: cls(...)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що поверне Person('Аня', 16).is_adult, якщо is_adult = age >= 18?",
        options: [
          "True",
          "False",
          "16",
          "None"
        ],
        correctAnswer: 1,
        explanation: "16 < 18, тому властивість повертає False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чим @staticmethod відрізняється від звичайного методу?",
        options: [
          "Він завжди швидший",
          "Не отримує автоматично self або cls",
          "Може існувати лише один у класі",
          "Не можна викликати через клас"
        ],
        correctAnswer: 1,
        explanation: "staticmethod — функція в просторі імен класу без прив'язки до екземпляра чи класу."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Декоратор класу приймає клас і повинен повернути клас.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Інакше ім'я класу після @decorator стане None або іншим значенням."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Який запис еквівалентний @add_repr над class Point: ...?",
        options: [
          "Point = add_repr(Point)",
          "Point = add_repr()",
          "add_repr = Point(add_repr)",
          "Point(add_repr)"
        ],
        correctAnswer: 0,
        explanation: "@add_repr для класу означає Point = add_repr(Point)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як додати setter до property age?",
        options: [
          "@age.setter над методом age",
          "@property.setter(age)",
          "@staticmethod age",
          "@classmethod age"
        ],
        correctAnswer: 0,
        explanation: "Після @property def age використовують @age.setter def age(self, value)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
