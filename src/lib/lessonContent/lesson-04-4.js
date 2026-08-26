/**
 * Lesson 04-4: Наслідування
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_4 = {
  lessonId: "lesson-04-4",
  moduleId: "module-04",
  order: 4,
  title: "Наслідування",

  learningObjectives: [
    "Створювати дочірні класи на основі батьківських",
    "Розуміти, які атрибути й методи успадковуються",
    "Перевизначати (override) методи в дочірньому класі",
    "Використовувати super() для виклику батьківської логіки",
    "Пояснити базову ідею порядку пошуку методів (MRO)"
  ],

  prerequisites: ["lesson-04-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке наслідування?",
        content: `**Наслідування** дозволяє створити новий клас на основі існуючого, **перейнявши** його атрибути та методи.

- **Батьківський клас (parent / base / superclass)** — вихідний шаблон
- **Дочірній клас (child / derived / subclass)** — розширення або спеціалізація

**Аналогія:** «Транспорт» → «Автомобіль» → «Електромобіль». Кожен наступний рівень додає деталі, але зберігає спільне.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} видає звук")

class Dog(Animal):  # Dog наслідує Animal
    def speak(self):
        print(f"{self.name} каже: Гав!")

dog = Dog("Рекс")
dog.speak()  # Рекс каже: Гав!
\`\`\`

**Навіщо наслідування?**

1. Уникати дублювання коду
2. Будувати ієрархії («є різновидом»)
3. Розширювати поведінку без зміни базового класу

**Важливо:** наслідування має сенс, коли між класами є зв'язок *«є»* (Dog **є** Animal), а не просто *«має»* (Car **має** Engine — це вже композиція, урок 04-8).`
      },
      {
        title: "Синтаксис і успадкування членів",
        content: `Дочірній клас вказують у дужках після імені:

\`\`\`python
class Parent:
    def greet(self):
        print("Привіт від Parent")

class Child(Parent):
    pass

c = Child()
c.greet()  # Привіт від Parent
\`\`\`

Дочірній клас отримує:

- методи батька
- логіку \`__init__\` (якщо не перевизначено)
- атрибути класу батька

\`\`\`python
class Employee:
    company = "SmartCode"

    def __init__(self, name):
        self.name = name

    def info(self):
        print(f"{self.name} @ {self.company}")

class Developer(Employee):
    def __init__(self, name, language):
        super().__init__(name)
        self.language = language

    def info(self):
        super().info()
        print(f"Мова: {self.language}")

dev = Developer("Оля", "Python")
dev.info()
\`\`\`

\`isinstance(dev, Developer)\` → \`True\`  
\`isinstance(dev, Employee)\` → \`True\` — дочірній об'єкт **також є** екземпляром батька.`
      },
      {
        title: "Перевизначення методів (override)",
        content: `**Перевизначення** — оголошення в дочірньому класі методу з тим самим ім'ям, що й у батька. Нова версія **замінює** стару для дочірніх об'єктів.

\`\`\`python
class Bird:
    def move(self):
        print("Літає")

class Penguin(Bird):
    def move(self):
        print("Плавает і ходить")

Bird().move()      # Літає
Penguin().move()   # Плавает і ходить
\`\`\`

Це основа поліморфізму (наступний урок): однаковий виклик \`move()\`, різна поведінка.

**Коли перевизначати:**

- потрібна спеціалізована поведінка
- батьківська реалізація не підходить «як є»

**Коли не варто:**

- якщо можна просто додати новий метод без заміни старого`
      },
      {
        title: "super() — виклик батьківської реалізації",
        content: `Часто дочірній клас хоче **розширити**, а не повністю замінити логіку батька. Для цього використовують \`super()\`.

\`\`\`python
class Person:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"Я {self.name}")

class Student(Person):
    def __init__(self, name, course):
        super().__init__(name)  # ініціалізація батька
        self.course = course

    def introduce(self):
        super().introduce()
        print(f"Я вивчаю {self.course}")

s = Student("Іван", "Python")
s.introduce()
# Я Іван
# Я вивчаю Python
\`\`\`

**Чому не писати \`Person.__init__(self, name)\` напряму?**

\`super()\` коректніше працює зі складною ієрархією та множинним наслідуванням. Це сучасний стандарт Python.

\`\`\`python
class Logger:
    def log(self, msg):
        print(f"[LOG] {msg}")

class AppLogger(Logger):
    def log(self, msg):
        super().log(msg)
        print(f"[APP] {msg}")
\`\`\``
      },
      {
        title: "Коротко про MRO",
        content: `**MRO (Method Resolution Order)** — порядок, у якому Python шукає методи й атрибути в ієрархії класів.

\`\`\`python
class A:
    def who(self):
        print("A")

class B(A):
    def who(self):
        print("B")

class C(B):
    pass

C().who()  # B
print(C.__mro__)
# (<class 'C'>, <class 'B'>, <class 'A'>, <class 'object'>)
\`\`\`

Пошук іде зліва направо по MRO: спочатку \`C\`, потім \`B\`, далі \`A\`, потім базовий \`object\`.

Для початку достатньо пам'ятати:

1. Python шукає метод спочатку в самому класі
2. Потім у батьках за MRO
3. \`super()\` йде **наступним** класом у цьому порядку

Множинне наслідування (\`class C(A, B)\`) можливе, але на старті краще тримати ієрархії простими.`
      },
      {
        title: "Практичний приклад: ієрархія фігур",
        content: `\`\`\`python
class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        return 0

    def describe(self):
        print(f"{self.name}: площа = {self.area()}")

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Прямокутник")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
        self.name = "Квадрат"

shapes = [Rectangle(4, 3), Square(5)]
for shape in shapes:
    shape.describe()
\`\`\`

\`Square\` наслідує \`Rectangle\`, а той — \`Shape\`. Кожен рівень додає спеціалізацію, не копіюючи код площі прямокутника.

У наступному уроці саме такі ієрархії стануть основою **поліморфізму**.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Базове наслідування",
      code: `class Vehicle:
    def __init__(self, brand):
        self.brand = brand

    def start(self):
        print(f"{self.brand} заводиться")

class Car(Vehicle):
    def honk(self):
        print("Бі-біп!")

car = Car("Toyota")
car.start()
car.honk()`,
      explanation: "Car отримує start() від Vehicle і додає власний honk()."
    },
    {
      title: "Перевизначення speak",
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} видає звук")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} каже: Мяу!")

Cat("Мурка").speak()`,
      explanation: "Метод speak у Cat замінює версію з Animal."
    },
    {
      title: "super() у конструкторі",
      code: `class Person:
    def __init__(self, name):
        self.name = name

class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

    def info(self):
        print(f"{self.name} викладає {self.subject}")

Teacher("Анна", "Python").info()`,
      explanation: "super().__init__ ініціалізує частину стану в батьківському класі."
    },
    {
      title: "Ланцюжок наслідування",
      code: `class A:
    def step(self):
        return "A"

class B(A):
    def step(self):
        return super().step() + "-B"

class C(B):
    def step(self):
        return super().step() + "-C"

print(C().step())  # A-B-C`,
      explanation: "Кожен рівень додає свій фрагмент через super()."
    }
  ],

  commonMistakes: [
    {
      mistake: "Забути викликати super().__init__",
      explanation: "Без ініціалізації батька дочірній об'єкт може не мати потрібних атрибутів.",
      correctApproach: `class Child(Parent):
    def __init__(self, name, extra):
        super().__init__(name)
        self.extra = extra`
    },
    {
      mistake: "Наслідувати «щоб було», без зв'язку «є різновидом»",
      explanation: "Наприклад, Car(Engine) — погана модель: автомобіль не є двигуном.",
      correctApproach: "Використовуйте наслідування для is-a; для has-a — композицію"
    },
    {
      mistake: "Перевизначити метод і втратити корисну логіку батька",
      explanation: "Іноді повна заміна гірша за розширення через super().",
      correctApproach: "Викличте super().method() і додайте свою логіку"
    },
    {
      mistake: "Плутати ім'я батьківського класу в дужках",
      explanation: "class Dog: Animal — синтаксична помилка; потрібно class Dog(Animal):",
      correctApproach: "class Dog(Animal):"
    }
  ],

  summary: `На цьому уроці ми вивчили наслідування:

1. Дочірній клас успадковує поведінку батька
2. Override дозволяє спеціалізувати методи
3. super() викликає батьківську реалізацію
4. isinstance працює і для батьківських типів
5. MRO визначає порядок пошуку методів

Далі — поліморфізм: однакова форма виклику, різна поведінка.`,

  practiceTask: {
    title: "Тварини та звуки",
    description: "Створіть ієрархію Animal → Dog/Cat з перевизначенням speak",
    problemStatement: `Напишіть програму, яка:
1. Оголошує клас Animal з __init__(self, name) та методом speak(self),
   який друкує: {name} видає звук
2. Оголошує Dog(Animal), який перевизначає speak:
   {name} каже: Гав!
3. Оголошує Cat(Animal), який перевизначає speak:
   {name} каже: Мяу!
4. Зчитує два рядки: тип1, ім'я1, потім тип2, ім'я2
   (тип — це dog або cat у нижньому регістрі)
5. Створює відповідні об'єкти і викликає speak() для кожного

Формат вводу:
dog
Рекс
cat
Мурка`,
    outputFormat: `Рекс каже: Гав!
Мурка каже: Мяу!`,
    examples: [
      {
        input: `dog
Рекс
cat
Мурка`,
        output: `Рекс каже: Гав!
Мурка каже: Мяу!`,
        explanation: "Собака і кіт з перевизначеними speak"
      },
      {
        input: `cat
Сніжок
dog
Бобік`,
        output: `Сніжок каже: Мяу!
Бобік каже: Гав!`,
        explanation: "Спочатку кіт, потім собака"
      },
      {
        input: `dog
Лакі
dog
Джек`,
        output: `Лакі каже: Гав!
Джек каже: Гав!`,
        explanation: "Два собаки"
      }
    ],
    solution: {
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} видає звук")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} каже: Гав!")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} каже: Мяу!")

def create_animal(kind, name):
    if kind == "dog":
        return Dog(name)
    return Cat(name)

kind1 = input().strip()
name1 = input().strip()
kind2 = input().strip()
name2 = input().strip()

create_animal(kind1, name1).speak()
create_animal(kind2, name2).speak()`,
      explanation: "Dog і Cat наслідують Animal і перевизначають speak(). Тип зчитується з stdin."
    },
    hints: [
      "Синтаксис: class Dog(Animal):",
      "У speak використовуйте self.name",
      "Читайте чотири рядки послідовно",
      "Порівнюйте kind з рядками 'dog' і 'cat'"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке наслідування?",
        options: [
          "Створення нового класу на основі існуючого з успадкуванням членів",
          "Видалення методів батьківського класу",
          "Копіювання файлів проєкту",
          "Перетворення int у str"
        ],
        correctAnswer: 0,
        explanation: "Наслідування дозволяє дочірньому класу перейняти атрибути й методи батька."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n```python\nclass A:\n    def hi(self):\n        print(\"A\")\nclass B(A):\n    pass\nB().hi()\n```",
        options: [
          "A",
          "B",
          "Помилка",
          "None"
        ],
        correctAnswer: 0,
        explanation: "B не перевизначає hi, тому викликається версія з A."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Для чого використовують super()?",
        options: [
          "Щоб викликати метод батьківського класу",
          "Щоб створити суперкористувача",
          "Щоб прискорити програму",
          "Щоб видалити об'єкт"
        ],
        correctAnswer: 0,
        explanation: "super() дає доступ до реалізації з батьківського класу (за MRO)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Якщо Dog наслідує Animal, то isinstance(Dog('x'), Animal) поверне True.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Дочірній екземпляр також є екземпляром батьківського типу."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n```python\nclass A:\n    def f(self):\n        return 1\nclass B(A):\n    def f(self):\n        return super().f() + 2\nprint(B().f())\n```",
        options: [
          "3",
          "1",
          "2",
          "Помилка"
        ],
        correctAnswer: 0,
        explanation: "super().f() повертає 1, плюс 2 дає 3."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає перевизначення методу (override)?",
        options: [
          "Оголошення в дочірньому класі методу з тим самим ім'ям, що замінює батьківський",
          "Видалення батьківського класу",
          "Створення двох однакових класів",
          "Імпорт модуля двічі"
        ],
        correctAnswer: 0,
        explanation: "Override замінює поведінку методу для дочірніх екземплярів."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "MRO визначає порядок, у якому Python шукає методи в ієрархії класів.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, Method Resolution Order задає послідовність пошуку."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
