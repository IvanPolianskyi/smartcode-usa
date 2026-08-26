/**
 * Lesson 04-5: Поліморфізм
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_5 = {
  lessonId: "lesson-04-5",
  moduleId: "module-04",
  order: 5,
  title: "Поліморфізм",

  learningObjectives: [
    "Пояснити, що таке поліморфізм у ООП",
    "Застосовувати поліморфізм через перевизначення методів",
    "Розуміти duck typing у Python («якщо ходить як качка...»)",
    "Обробляти колекції різних об'єктів одним інтерфейсом",
    "Писати гнучкий код без зайвих перевірок типів"
  ],

  prerequisites: ["lesson-04-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке поліморфізм?",
        content: `**Поліморфізм** (з грецької — «багато форм») означає: **один інтерфейс — різна поведінка**.

Ви викликаєте той самий метод (\`speak()\`, \`area()\`, \`draw()\`), а об'єкти різних класів реагують по-своєму.

\`\`\`python
class Dog:
    def speak(self):
        return "Гав!"

class Cat:
    def speak(self):
        return "Мяу!"

animals = [Dog(), Cat()]
for animal in animals:
    print(animal.speak())
\`\`\`

Цикл **не знає** конкретний тип — йому важливо лише, що в об'єкта є \`speak()\`.

**Чому це потужно?**

1. Код стає коротшим і гнучкішим
2. Легко додати новий клас без зміни циклу
3. Менше \`if/elif\` на кшталт «якщо собака — так, якщо кіт — інакше»

Поліморфізм тісно пов'язаний з наслідуванням, але в Python він часто працює **і без спільного батька** — завдяки duck typing.`
      },
      {
        title: "Поліморфізм через наслідування",
        content: `Класичний ООП-підхід: спільний батьківський клас (або інтерфейс) і перевизначені методи.

\`\`\`python
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14 * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

shapes = [Circle(5), Rectangle(4, 3)]
for shape in shapes:
    print(shape.area())
\`\`\`

Зовнішній код працює з «фігурою» загалом. Деталі обчислення — всередині кожного класу.

Це і є поліморфізм: \`shape.area()\` виглядає однаково, результат залежить від реального типу об'єкта.`
      },
      {
        title: "Duck typing у Python",
        content: `Python дотримується принципу:

> *If it walks like a duck and quacks like a duck, it is a duck.*
> Якщо ходить як качка і крякає як качка — це качка.

Тобто важлива **поведінка** (наявність потрібних методів), а не офіційне наслідування від \`Duck\`.

\`\`\`python
class Duck:
    def quack(self):
        print("Кря!")

class Person:
    def quack(self):
        print("Я імітую качку!")

def make_it_quack(thing):
    thing.quack()

make_it_quack(Duck())
make_it_quack(Person())  # теж працює!
\`\`\`

\`Person\` **не** наслідує \`Duck\`, але має метод \`quack\` — і цього достатньо.

**Плюси duck typing:**

- Менше жорстких ієрархій
- Швидше прототипувати
- Зручно для невеликих скриптів і Python-стилю

**Мінуси:**

- Помилки можуть виявитися лише під час виконання
- Потрібні тести й зрозумілі імена методів

У великих системах інколи додають абстрактні базові класи (урок 04-7) для явніших контрактів.`
      },
      {
        title: "Поліморфізм на практиці",
        content: `Розглянемо платіжні методи:

\`\`\`python
class CashPayment:
    def pay(self, amount):
        print(f"Готівка: сплачено {amount} грн")

class CardPayment:
    def pay(self, amount):
        print(f"Картка: сплачено {amount} грн")

class OnlinePayment:
    def pay(self, amount):
        print(f"Онлайн: сплачено {amount} грн")

def checkout(payment, amount):
    payment.pay(amount)

for method in [CashPayment(), CardPayment(), OnlinePayment()]:
    checkout(method, 250)
\`\`\`

Функція \`checkout\` не змінюється, коли з'являється новий спосіб оплати — достатньо додати клас із методом \`pay\`.

**Антипатерн без поліморфізму:**

\`\`\`python
def checkout(kind, amount):
    if kind == "cash":
        print(...)
    elif kind == "card":
        print(...)
    elif kind == "online":
        print(...)
\`\`\`

Кожен новий спосіб роздуває \`if/elif\`. З поліморфізмом розширення локальне — у новому класі.`
      },
      {
        title: "Вбудований поліморфізм Python",
        content: `Ви вже користувались поліморфізмом, навіть не називаючи його так!

\`\`\`python
print(len("текст"))      # довжина рядка
print(len([1, 2, 3]))    # довжина списку
print(len({"a": 1}))     # кількість ключів

print(3 + 4)             # додавання чисел
print("Hello, " + "World")  # конкатенація рядків
\`\`\`

Один оператор / одна функція — різна поведінка залежно від типу.

Те саме з \`for\`: будь-який ітерований об'єкт працює в циклі.

\`\`\`python
for item in [1, 2, 3]:
    print(item)

for char in "hi":
    print(char)
\`\`\`

Коли ви проєктуєте свої класи, думайте: *«Який спільний метод зробить їх взаємозамінними?»*`
      },
      {
        title: "Поради та типові сценарії",
        content: `**1. Узгоджуйте імена методів**  
Якщо всі «платники» мають \`pay\`, а не \`pay\`/\`do_pay\`/\`execute\`, поліморфізм працює природно.

**2. Не зловживайте \`isinstance\`**  
Інколи перевірка типу потрібна, але часто краще просто викликати метод.

\`\`\`python
# Гнучкіше:
obj.render()

# Жорсткіше (іноді виправдано):
if isinstance(obj, Button):
    obj.render()
\`\`\`

**3. Документуйте очікуваний інтерфейс**  
Навіть без ABC варто писати в docstring: «\`handler\` має мати метод \`handle(event)\`».

**4. Тестуйте з різними реалізаціями**  
Поліморфний код перевіряйте кількома класами, щоб спіймати відсутні методи.

Наступний урок — **dataclasses**: як швидко описувати класи даних з мінімумом шаблонного коду.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Один цикл — різні speak()",
      code: `class Dog:
    def speak(self):
        return "Гав!"

class Cat:
    def speak(self):
        return "Мяу!"

class Cow:
    def speak(self):
        return "Муу!"

for animal in [Dog(), Cat(), Cow()]:
    print(animal.speak())`,
      explanation: "Цикл однаковий; поведінка залежить від конкретного об'єкта."
    },
    {
      title: "Поліморфізм фігур",
      code: `class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14 * self.r * self.r

class Square:
    def __init__(self, a):
        self.a = a
    def area(self):
        return self.a * self.a

shapes = [Circle(2), Square(3)]
total = sum(s.area() for s in shapes)
print(total)`,
      explanation: "sum працює з будь-якими об'єктами, що мають area()."
    },
    {
      title: "Duck typing без спільного батька",
      code: `class FileExporter:
    def export(self):
        print("Експорт у файл")

class ApiExporter:
    def export(self):
        print("Експорт через API")

def run_export(exporter):
    exporter.export()

run_export(FileExporter())
run_export(ApiExporter())`,
      explanation: "Достатньо наявності методу export — офіційна ієрархія не обов'язкова."
    },
    {
      title: "Розширення без зміни клієнтського коду",
      code: `class NotifyEmail:
    def send(self, text):
        print(f"Email: {text}")

class NotifySMS:
    def send(self, text):
        print(f"SMS: {text}")

# Новий канал — старий код notify_all не змінюємо
class NotifyPush:
    def send(self, text):
        print(f"Push: {text}")

def notify_all(channels, text):
    for ch in channels:
        ch.send(text)

notify_all([NotifyEmail(), NotifySMS(), NotifyPush()], "Урок завершено")`,
      explanation: "Додали NotifyPush, і функція notify_all лишилась тією ж."
    }
  ],

  commonMistakes: [
    {
      mistake: "Різні імена методів у «схожих» класах",
      explanation: "Якщо один клас має speak(), а інший make_sound(), спільний цикл ламається.",
      correctApproach: "Узгодьте єдиний інтерфейс: усі реалізації з одним ім'ям методу"
    },
    {
      mistake: "Замість поліморфізму — довгий ланцюг if/elif по типах",
      explanation: "Кожен новий тип вимагає правити центральну функцію.",
      correctApproach: "Винесіть поведінку в методи класів і викликайте їх однаково"
    },
    {
      mistake: "Вважати, що поліморфізм можливий лише з наслідуванням",
      explanation: "У Python duck typing дозволяє поліморфізм за наявністю методів.",
      correctApproach: "Наслідування — зручний спосіб, але не єдиний у Python"
    },
    {
      mistake: "Ігнорувати відсутність методу до запуску",
      explanation: "Помилка AttributeError з'явиться лише під час виклику.",
      correctApproach: "Покрийте поліморфні шляхи тестами або використайте ABC (пізніше)"
    }
  ],

  summary: `На цьому уроці ми вивчили поліморфізм:

1. Один інтерфейс — різна поведінка об'єктів
2. Наслідування + override — класичний шлях
3. Duck typing — поліморфізм за поведінкою в Python
4. Колекції різних об'єктів обробляються однаково
5. Менше if/elif, більше розширюваності

Далі — dataclasses для швидкого створення класів даних.`,

  practiceTask: {
    title: "Площі фігур",
    description: "Обчисліть площі різних фігур через спільний метод area()",
    problemStatement: `Напишіть програму, яка:
1. Оголошує клас Circle з __init__(self, r) та area(self) = 3.14 * r * r
2. Оголошує клас Rectangle з __init__(self, w, h) та area(self) = w * h
3. Оголошує клас Square з __init__(self, a) та area(self) = a * a
4. Зчитує три блоки даних:
   - рядок "circle" і радіус (float/int)
   - рядок "rect", ширина і висота
   - рядок "square" і сторона
5. Створює відповідні об'єкти і для кожного друкує:
   {Назва}: {площа}
   де назви: Коло, Прямокутник, Квадрат
   Площу виводити як є (для кола з 3.14).

Формат вводу:
circle
5
rect
4
3
square
6`,
    outputFormat: `Коло: 78.5
Прямокутник: 12
Квадрат: 36`,
    examples: [
      {
        input: `circle
5
rect
4
3
square
6`,
        output: `Коло: 78.5
Прямокутник: 12
Квадрат: 36`,
        explanation: "3.14*25=78.5; 4*3=12; 6*6=36"
      },
      {
        input: `circle
2
rect
10
2
square
3`,
        output: `Коло: 12.56
Прямокутник: 20
Квадрат: 9`,
        explanation: "3.14*4=12.56; 10*2=20; 3*3=9"
      },
      {
        input: `circle
1
rect
5
5
square
4`,
        output: `Коло: 3.14
Прямокутник: 25
Квадрат: 16`,
        explanation: "3.14*1=3.14; 5*5=25; 4*4=16"
      }
    ],
    solution: {
      code: `class Circle:
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14 * self.r * self.r

class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

class Square:
    def __init__(self, a):
        self.a = a

    def area(self):
        return self.a * self.a

input()  # circle
r = float(input())
input()  # rect
w = float(input())
h = float(input())
input()  # square
a = float(input())

shapes = [
    ("Коло", Circle(r)),
    ("Прямокутник", Rectangle(w, h)),
    ("Квадрат", Square(a)),
]

for name, shape in shapes:
    result = shape.area()
    if result == int(result):
        result = int(result)
    print(f"{name}: {result}")`,
      explanation: "Усі фігури мають area(); цикл друкує результати поліморфно. Цілі значення виводимо без .0."
    },
    hints: [
      "Використовуйте константу 3.14 для кола",
      "Читайте мітки circle/rect/square через input(), навіть якщо не перевіряєте їх",
      "Для виводу цілих площ можна перетворити float → int, якщо значення ціле",
      "Головне — викликати shape.area() однаково для всіх"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке поліморфізм?",
        options: [
          "Один інтерфейс (метод) — різна поведінка в різних класах",
          "Збереження даних у файлі",
          "Видалення невикористаних змінних",
          "Компіляція коду в байт-код"
        ],
        correctAnswer: 0,
        explanation: "Поліморфізм дозволяє викликати однакові методи на різних типах з різним результатом."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У Python поліморфізм можливий навіть без спільного батьківського класу.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, завдяки duck typing важлива наявність методу, а не ієрархія."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе код?\n\n```python\nclass A:\n    def f(self):\n        return 1\nclass B:\n    def f(self):\n        return 2\nprint([x.f() for x in [A(), B()]])\n```",
        options: [
          "[1, 2]",
          "[1, 1]",
          "Помилка",
          "[2, 2]"
        ],
        correctAnswer: 0,
        explanation: "Обидва об'єкти мають f(), але повертають різні значення."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що описує принцип duck typing?",
        options: [
          "Важлива поведінка об'єкта (методи), а не його офіційний тип",
          "Усі класи повинні наслідувати object вручну",
          "Методи можна викликати лише через super()",
          "Поліморфізм заборонений у Python"
        ],
        correctAnswer: 0,
        explanation: "Якщо об'єкт має потрібні методи — його можна використовувати."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чому цей код зручний для розширення?\n\n```python\ndef process(items):\n    for item in items:\n        item.run()\n```",
        options: [
          "Можна додати новий клас з методом run() без зміни process",
          "Він працює лише зі списками чисел",
          "Він забороняє нові класи",
          "Він завжди викликає лише один метод батька"
        ],
        correctAnswer: 0,
        explanation: "process залежить лише від наявності run() — класичний поліморфізм."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який приклад уже є поліморфізмом у вбудованому Python?",
        options: [
          "len() працює і для рядка, і для списку",
          "Ключове слово def",
          "Оператор присвоєння =",
          "Коментар #"
        ],
        correctAnswer: 0,
        explanation: "len() — один інтерфейс для різних типів."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Довгі if/elif за типом об'єкта — часто ознака, що варто застосувати поліморфізм.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, поведінку краще рознести по методах класів."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що потрібно для duck typing між класами PaymentA і PaymentB?",
        options: [
          "Однаковий потрібний метод (наприклад, pay) у обох класах",
          "Обов'язкове наслідування від ABC",
          "Однакова кількість атрибутів",
          "Ім'я файлу payment.py"
        ],
        correctAnswer: 0,
        explanation: "Достатньо узгодженої поведінки — спільного методу з очікуваною семантикою."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
