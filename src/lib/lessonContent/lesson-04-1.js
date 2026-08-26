/**
 * Lesson 04-1: Основи ООП: класи та об'єкти
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_1 = {
  lessonId: "lesson-04-1",
  moduleId: "module-04",
  order: 1,
  title: "Основи ООП: класи та об'єкти",

  learningObjectives: [
    "Пояснити, що таке клас і чим він відрізняється від об'єкта",
    "Оголошувати власні класи за допомогою ключового слова class",
    "Створювати екземпляри (об'єкти) класу",
    "Використовувати конструктор __init__ для ініціалізації атрибутів",
    "Розуміти роль параметра self у методах екземпляра"
  ],

  prerequisites: ["lesson-03-10"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке ООП?",
        content: `**Об'єктно-орієнтоване програмування (ООП)** - підхід, у якому програма будується навколо **об'єктів**: сутностей, що поєднують дані та поведінку.

Досі ми працювали зі змінними, списками й функціями окремо. В ООП ми об'єднуємо їх у логічні «коробки».

**Аналогія з реального життя:**

Уявіть автомобіль:
- **Дані (атрибути):** колір, марка, швидкість, рівень палива
- **Поведінка (методи):** їхати, гальмувати, сигналити

В Python автомобіль можна описати як **клас** \`Car\`, а конкретну Toyota чи BMW - як **об'єкти** цього класу.

**Навіщо ООП?**

1. **Організація коду** - пов'язані дані й дії живуть разом
2. **Повторне використання** - один клас → багато об'єктів
3. **Масштабованість** - легше розширювати великі програми
4. **Моделювання** - код ближчий до реальних сутностей

**Чотири стовпи ООП** (на них ми будемо опиратися в модулі):

1. **Інкапсуляція** - приховування внутрішніх деталей
2. **Наслідування** - створення нових класів на базі існуючих
3. **Поліморфізм** - один інтерфейс, різна поведінка
4. **Абстракція** - виділення головного, ігнорування деталей

У цьому уроці зосередимось на фундаменті: **класи, об'єкти, \`__init__\` і \`self\`**.`
      },
      {
        title: "Клас vs об'єкт",
        content: `**Клас** - це креслення (шаблон). **Об'єкт** (екземпляр) - конкретна річ, створена за цим кресленням.

\`\`\`python
# Клас - шаблон
class Dog:
    pass

# Об'єкти - конкретні екземпляри
dog1 = Dog()
dog2 = Dog()

print(type(dog1))  # <class '__main__.Dog'>
print(dog1 is dog2)  # False - різні об'єкти
\`\`\`

**Важливо:**

| Поняття | Що це | Приклад |
|---------|--------|---------|
| Клас | Опис / шаблон | \`class Student:\` |
| Об'єкт (екземпляр) | Конкретний екземпляр | \`s = Student()\` |
| Атрибут | Дані об'єкта | \`s.name\` |
| Метод | Функція всередині класу | \`s.greet()\` |

Один клас може породити **скільки завгодно** об'єктів - кожен зі своїми даними.`
      },
      {
        title: "Створення класу та конструктор __init__",
        content: `Клас оголошується ключовим словом \`class\`. Ім'я класу зазвичай пишуть у стилі **PascalCase** (\`Student\`, \`BankAccount\`).

**Конструктор \`__init__\`** викликається автоматично під час створення об'єкта. У ньому задають початкові атрибути.

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

student = Student("Олена", 20)
print(student.name)  # Олена
print(student.age)   # 20
\`\`\`

**Що відбувається крок за кроком:**

1. Python створює новий порожній об'єкт
2. Викликається \`__init__(self, "Олена", 20)\`
3. \`self\` - посилання на **цей** новий об'єкт
4. Атрибути \`name\` і \`age\` зберігаються в об'єкті
5. Змінна \`student\` отримує посилання на готовий об'єкт

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(3, 4)
p2 = Point(0, 0)
print(p1.x, p1.y)  # 3 4
print(p2.x, p2.y)  # 0 0
\`\`\`

**Правила \`__init__\`:**

- Перший параметр завжди \`self\`
- \`__init__\` **не повертає** значення через \`return\` (окрім \`None\`)
- Атрибути створюють через \`self.назва = значення\``
      },
      {
        title: "Параметр self",
        content: `**\`self\`** - це посилання на поточний екземпляр класу. Через нього методи «бачать» атрибути саме **цього** об'єкта.

\`\`\`python
class Cat:
    def __init__(self, name):
        self.name = name

    def meow(self):
        print(f"{self.name} каже: Мяу!")

cat1 = Cat("Мурка")
cat2 = Cat("Сніжок")

cat1.meow()  # Мурка каже: Мяу!
cat2.meow()  # Сніжок каже: Мяу!
\`\`\`

Коли ви пишете \`cat1.meow()\`, Python фактично викликає \`Cat.meow(cat1)\` - тобто передає об'єкт як \`self\` автоматично.

**Типові помилки з self:**

\`\`\`python
# Неправильно - забули self у визначенні методу
class Demo:
    def greet():  # TypeError при виклику
        print("Привіт")

# Неправильно - забули self. перед атрибутом
class Demo:
    def __init__(self, name):
        name = name  # локальна змінна, не атрибут!
\`\`\`

**Запам'ятайте:** \`self\` - це «я» об'єкта. Без нього методи не знають, з чиїми даними працювати.`
      },
      {
        title: "Атрибути та прості методи",
        content: `**Атрибути екземпляра** - дані конкретного об'єкта. **Методи** - функції, визначені всередині класу.

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

    def describe(self):
        print(f"Прямокутник {self.width}x{self.height}")
        print(f"Площа: {self.area()}")
        print(f"Периметр: {self.perimeter()}")

rect = Rectangle(4, 3)
rect.describe()
\`\`\`

**Можна змінювати атрибути після створення:**

\`\`\`python
rect.width = 10
print(rect.area())  # 30
\`\`\`

**Клас як «фабрика» об'єктів:**

\`\`\`python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def info(self):
        return f'"{self.title}" - {self.author} ({self.pages} стор.)'

books = [
    Book("Кобзар", "Т. Шевченко", 400),
    Book("1984", "Дж. Оруелл", 328),
]

for book in books:
    print(book.info())
\`\`\`

Так ми вже моделюємо реальні сутності - а не просто купу окремих змінних.`
      },
      {
        title: "Практичні поради для початківців",
        content: `**1. Називайте класи іменниками, методи - дієсловами**

\`\`\`python
class User:          # іменник
    def login(self): # дієслово
        pass
\`\`\`

**2. Тримайте \`__init__\` простим** - лише збережіть початкові дані, складну логіку виносьте в методи.

**3. Один клас - одна відповідальність**

Не робіть клас \`EverythingManager\`. Краще окремо \`Student\`, \`Course\`, \`GradeBook\`.

**4. Перевіряйте тип об'єкта**

\`\`\`python
student = Student("Іван", 19)
print(isinstance(student, Student))  # True
\`\`\`

**5. Порівняння з функціональним підходом**

Без ООП:
\`\`\`python
name = "Олена"
age = 20
def greet(name, age):
    print(f"{name}, {age}")
\`\`\`

З ООП:
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def greet(self):
        print(f"{self.name}, {self.age}")
\`\`\`

ООП зручніше, коли даних і дій багато і вони належать одній сутності.

У наступному уроці глибше розберемо **атрибути класу vs екземпляра** та типи методів.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Простий клас Person",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Привіт, мене звати {self.name}!")
        print(f"Мені {self.age} років.")

person = Person("Андрій", 25)
person.introduce()`,
      explanation: "Створюємо клас з конструктором і методом. Об'єкт зберігає свої name та age."
    },
    {
      title: "Кілька екземплярів одного класу",
      code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} ({self.breed}) каже: Гав!")

dog1 = Dog("Рекс", "вівчарка")
dog2 = Dog("Лакі", "лабрадор")

dog1.bark()
dog2.bark()`,
      explanation: "Один клас - два незалежні об'єкти з різними атрибутами."
    },
    {
      title: "Клас з обчислювальним методом",
      code: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

    def diameter(self):
        return self.radius * 2

c = Circle(5)
print(f"Радіус: {c.radius}")
print(f"Діаметр: {c.diameter()}")
print(f"Площа: {c.area()}")`,
      explanation: "Методи використовують self.radius для обчислень на основі даних об'єкта."
    },
    {
      title: "Зміна атрибутів після створення",
      code: `class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1

    def show(self):
        print(f"Поточне значення: {self.value}")

counter = Counter(10)
counter.show()
counter.increment()
counter.increment()
counter.show()`,
      explanation: "Методи можуть змінювати стан об'єкта через self."
    }
  ],

  commonMistakes: [
    {
      mistake: "Забути self у методі або конструкторі",
      explanation: "Без self Python не передасть посилання на екземпляр - отримаєте TypeError.",
      correctApproach: `class Demo:
    def __init__(self, value):
        self.value = value

    def show(self):
        print(self.value)`
    },
    {
      mistake: "Створити локальну змінну замість атрибута",
      explanation: "Якщо написати name = name без self., атрибут об'єкта не з'явиться.",
      correctApproach: `# Правильно:
self.name = name

# Неправильно:
name = name  # лише локальна змінна`
    },
    {
      mistake: "Викликати метод без дужок або без об'єкта",
      explanation: "Метод належить екземпляру; потрібен об'єкт і дужки виклику.",
      correctApproach: `student = Student("Оля", 18)
student.greet()  # правильно
# Student.greet() без аргумента - помилка`
    },
    {
      mistake: "Очікувати, що __init__ поверне значення",
      explanation: "__init__ ініціалізує об'єкт і завжди неявно повертає None.",
      correctApproach: `student = Student("Оля", 18)  # конструктор не повертає дані
# дані беруть з атрибутів: student.name`
    }
  ],

  summary: `На цьому уроці ми вивчили основи ООП:

1. Клас - шаблон, об'єкт - конкретний екземпляр
2. class - ключове слово для оголошення класу
3. __init__ - конструктор для початкових атрибутів
4. self - посилання на поточний екземпляр
5. Атрибути зберігають стан, методи описують поведінку

Це фундамент усього модуля ООП. Далі - глибше про атрибути та методи класу.`,

  practiceTask: {
    title: "Профіль студента",
    description: "Створіть клас Student і виведіть інформацію про студента з вводу",
    problemStatement: `Напишіть програму, яка:
1. Оголошує клас Student з конструктором __init__(self, name, age, course)
2. Має метод info(self), який виводить три рядки:
   - Студент: {name}
   - Вік: {age}
   - Курс: {course}
3. Зчитує з stdin три рядки: ім'я, вік (ціле число), назву курсу
4. Створює об'єкт Student і викликає info()

Формат вводу:
Марія
18
Python`,
    outputFormat: `Студент: Марія
Вік: 18
Курс: Python`,
    examples: [
      {
        input: `Марія
18
Python`,
        output: `Студент: Марія
Вік: 18
Курс: Python`,
        explanation: "Створено студента Марія, 18 років, курс Python"
      },
      {
        input: `Іван
21
JavaScript`,
        output: `Студент: Іван
Вік: 21
Курс: JavaScript`,
        explanation: "Створено студента Іван на курсі JavaScript"
      },
      {
        input: `Оксана
19
Data Science`,
        output: `Студент: Оксана
Вік: 19
Курс: Data Science`,
        explanation: "Створено студентку Оксана на курсі Data Science"
      }
    ],
    solution: {
      code: `class Student:
    def __init__(self, name, age, course):
        self.name = name
        self.age = age
        self.course = course

    def info(self):
        print(f"Студент: {self.name}")
        print(f"Вік: {self.age}")
        print(f"Курс: {self.course}")

name = input().strip()
age = int(input())
course = input().strip()

student = Student(name, age, course)
student.info()`,
      explanation: "Клас Student зберігає атрибути через self. Читаємо три рядки з stdin, створюємо об'єкт і викликаємо info()."
    },
    hints: [
      "Спочатку оголосіть class Student з __init__ і методом info",
      "name = input().strip(), age = int(input()), course = input().strip()",
      "Створіть об'єкт: student = Student(name, age, course)",
      "Не забудьте self у кожному методі"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке клас у Python?",
        options: [
          "Шаблон (креслення) для створення об'єктів",
          "Конкретний екземпляр у пам'яті",
          "Вбудована функція для виводу",
          "Тип циклу"
        ],
        correctAnswer: 0,
        explanation: "Клас - це шаблон. Об'єкти створюються на його основі."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке ключове слово використовується для оголошення класу?",
        options: [
          "class",
          "def",
          "object",
          "struct"
        ],
        correctAnswer: 0,
        explanation: "Класи оголошують через ключове слово class."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Метод __init__ викликається автоматично під час створення об'єкта.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, __init__ - конструктор, він запускається при Student(...)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Box:\n    def __init__(self, value):\n        self.value = value\n\nb = Box(10)\nprint(b.value)\n```",
        options: [
          "10",
          "value",
          "None",
          "Помилка"
        ],
        correctAnswer: 0,
        explanation: "Атрибут value встановлено в __init__ і дорівнює 10."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого потрібен параметр self?",
        options: [
          "Це посилання на поточний екземпляр класу",
          "Це ключове слово для створення класу",
          "Це тип даних для рядків",
          "Це обов'язкова назва будь-якої змінної"
        ],
        correctAnswer: 0,
        explanation: "self дозволяє методам працювати з атрибутами конкретного об'єкта."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(f\"{self.name}: Гав!\")\n\nDog(\"Рекс\").bark()\n```",
        options: [
          "Рекс: Гав!",
          "Гав!",
          "None",
          "Помилка"
        ],
        correctAnswer: 0,
        explanation: "Створюється об'єкт з name='Рекс' і одразу викликається bark()."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чим об'єкт відрізняється від класу?",
        options: [
          "Об'єкт - конкретний екземпляр, створений за шаблоном класу",
          "Об'єкт і клас - одне й те саме",
          "Клас існує лише під час виконання програми",
          "Об'єкт не може мати методів"
        ],
        correctAnswer: 0,
        explanation: "Клас - шаблон; об'єкт - конкретна реалізація цього шаблону."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Один клас може використовуватися для створення багатьох незалежних об'єктів.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Саме так: один шаблон - багато екземплярів зі своїми даними."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
