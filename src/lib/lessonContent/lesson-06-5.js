/**
 * Lesson 06-5: Поліморфізм
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_5 = {
  lessonId: "lesson-06-5",
  moduleId: "module-06",
  order: 5,
  title: "Поліморфізм",
  
  learningObjectives: [
    "Розуміти поліморфізм",
    "Реалізовувати поліморфізм в Python",
    "Застосовувати duck typing",
    "Використовувати поліморфізм на практиці"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-06-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке поліморфізм?",
        content: `**Поліморфізм** - це здатність об'єктів різних класів реагувати на один і той самий метод по-різному.

**Аналогія:**
Уявіть різні транспортні засоби: автомобіль, велосипед, літак. Всі вони можуть "рухатися", але кожен робить це по-своєму. Це поліморфізм - одна дія, різні реалізації.

**Переваги поліморфізму:**
- ✅ Гнучкість коду
- ✅ Легше додавати нові типи
- ✅ Уніфікований інтерфейс
- ✅ Код стає більш читабельним

**Типи поліморфізму:**
1. **Поліморфізм через наслідування** - різні класи мають однаковий метод
2. **Duck typing** - "якщо щось ходить як качка і крякає як качка, то це качка"
3. **Поліморфізм через інтерфейси** - різні класи реалізують однакові методи`
      },
      {
        title: "Поліморфізм через наслідування",
        content: `**Поліморфізм через наслідування** - коли різні дочірні класи перевизначають метод батьківського класу.

**Приклад:**

\`\`\`python
class Animal:
    def speak(self):
        print("Тварина видає звук")

class Dog(Animal):
    def speak(self):
        print("Гав-гав!")

class Cat(Animal):
    def speak(self):
        print("Мяу!")

class Cow(Animal):
    def speak(self):
        print("Му-му!")

# Функція, яка працює з будь-якою твариною
def make_animal_speak(animal):
    animal.speak()

# Створюємо різні тварини
dog = Dog()
cat = Cat()
cow = Cow()

# Викликаємо одну функцію для різних об'єктів
make_animal_speak(dog)  # Гав-гав!
make_animal_speak(cat)  # Мяу!
make_animal_speak(cow)  # Му-му!
\`\`\`

**Ключова ідея:**
- Всі об'єкти мають метод 'speak()'
- Кожен клас реалізує його по-своєму
- Функція 'make_animal_speak()' працює з будь-якою твариною
- Не потрібно знати конкретний тип об'єкта`
      },
      {
        title: "Duck Typing",
        content: `**Duck Typing** - концепція Python: "якщо об'єкт має потрібний метод, він підходить".

**Філософія:**
> "Якщо щось ходить як качка, плаває як качка і крякає як качка, то це, ймовірно, качка"

**Приклад:**

\`\`\`python
class Dog:
    def speak(self):
        print("Гав-гав!")

class Robot:
    def speak(self):
        print("Біп-біп!")

class Person:
    def speak(self):
        print("Привіт!")

# Функція працює з будь-яким об'єктом, що має метод speak()
def make_speak(obj):
    obj.speak()

# Всі ці об'єкти можуть "говорити"
dog = Dog()
robot = Robot()
person = Person()

make_speak(dog)    # Гав-гав!
make_speak(robot)  # Біп-біп!
make_speak(person) # Привіт!
\`\`\`

**Переваги Duck Typing:**
- ✅ Не потрібно наслідування
- ✅ Гнучкість - будь-який об'єкт з потрібним методом підходить
- ✅ Простота - не потрібні інтерфейси або абстрактні класи`
      },
      {
        title: "Поліморфізм у практичних задачах",
        content: `**Приклад: Обчислення площі різних фігур**

\`\`\`python
class Shape:
    def area(self):
        raise NotImplementedError("Потрібно реалізувати area()")

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    
    def area(self):
        return 0.5 * self.base * self.height

# Функція працює з будь-якою фігурою
def print_area(shape):
    print(f"Площа: {shape.area()}")

# Створюємо різні фігури
shapes = [
    Rectangle(5, 3),
    Circle(4),
    Triangle(6, 4)
]

# Виводимо площі всіх фігур
for shape in shapes:
    print_area(shape)
# Виведе:
# Площа: 15
# Площа: 50.24
# Площа: 12.0
\`\`\`

**Ключові моменти:**
- Всі фігури мають метод 'area()'
- Кожна фігура обчислює площу по-своєму
- Функція 'print_area()' працює з будь-якою фігурою
- Не потрібно перевіряти тип об'єкта`
      },
      {
        title: "Поліморфізм з операторами",
        content: `**Поліморфізм можна застосовувати з операторами через магічні методи.**

**Приклад:**

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        # Перевизначення оператора +
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Використовуємо оператор +
print(v3)     # Vector(4, 6)
\`\`\`

**Магічні методи для поліморфізму:**
- '__add__' - оператор +
- '__sub__' - оператор -
- '__mul__' - оператор *
- '__str__' - перетворення в рядок
- '__len__' - функція len()
- '__eq__' - оператор ==

**Примітка:** Детальніше про магічні методи ми вивчимо в наступних модулях.`
      },
      {
        title: "Практичний приклад: Система платіжних методів",
        content: `**Повний приклад з поліморфізмом:**

\`\`\`python
class PaymentMethod:
    def pay(self, amount):
        raise NotImplementedError("Потрібно реалізувати pay()")

class CreditCard(PaymentMethod):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def pay(self, amount):
        print(f"Оплата {amount} грн карткою {self.card_number[-4:]}")

class PayPal(PaymentMethod):
    def __init__(self, email):
        self.email = email
    
    def pay(self, amount):
        print(f"Оплата {amount} грн через PayPal ({self.email})")

class Cash(PaymentMethod):
    def pay(self, amount):
        print(f"Оплата {amount} грн готівкою")

# Функція для обробки платежу
def process_payment(payment_method, amount):
    payment_method.pay(amount)

# Різні способи оплати
card = CreditCard("1234-5678-9012-3456")
paypal = PayPal("user@example.com")
cash = Cash()

# Обробляємо платежі різними методами
process_payment(card, 1000)    # Оплата 1000 грн карткою 3456
process_payment(paypal, 500)   # Оплата 500 грн через PayPal (user@example.com)
process_payment(cash, 200)     # Оплата 200 грн готівкою
\`\`\`

**Переваги:**
- Легко додати новий спосіб оплати
- Код обробки платежів не змінюється
- Уніфікований інтерфейс для всіх методів`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Поліморфізм через наслідування",
      code: `# Поліморфізм через наслідування
class Vehicle:
    def move(self):
        print("Транспорт рухається")

class Car(Vehicle):
    def move(self):
        print("Автомобіль їде по дорозі")

class Airplane(Vehicle):
    def move(self):
        print("Літак летить в небі")

class Boat(Vehicle):
    def move(self):
        print("Човен пливе по воді")

def travel(vehicle):
    vehicle.move()

vehicles = [Car(), Airplane(), Boat()]
for v in vehicles:
    travel(v)`,
      explanation: "Демонструє поліморфізм через наслідування - різні класи реалізують move() по-різному."
    },
    {
      title: "Приклад 2: Duck Typing",
      code: `# Duck Typing
class Dog:
    def make_sound(self):
        return "Гав-гав!"

class Cat:
    def make_sound(self):
        return "Мяу!"

class Clock:
    def make_sound(self):
        return "Тік-так!"

# Функція працює з будь-яким об'єктом, що має make_sound()
def get_sound(obj):
    return obj.make_sound()

objects = [Dog(), Cat(), Clock()]
for obj in objects:
    print(get_sound(obj))`,
      explanation: "Показує Duck Typing - будь-який об'єкт з методом make_sound() підходить."
    },
    {
      title: "Приклад 3: Поліморфізм з обчисленнями",
      code: `# Поліморфізм з обчисленнями
class Calculator:
    def calculate(self, a, b):
        raise NotImplementedError

class Adder(Calculator):
    def calculate(self, a, b):
        return a + b

class Multiplier(Calculator):
    def calculate(self, a, b):
        return a * b

class Subtractor(Calculator):
    def calculate(self, a, b):
        return a - b

def perform_calculation(calc, a, b):
    return calc.calculate(a, b)

adder = Adder()
multiplier = Multiplier()
subtractor = Subtractor()

print(perform_calculation(adder, 5, 3))        # 8
print(perform_calculation(multiplier, 5, 3))  # 15
print(perform_calculation(subtractor, 5, 3))  # 2`,
      explanation: "Демонструє поліморфізм для різних типів обчислень."
    },
    {
      title: "Приклад 4: Поліморфізм у реальному застосуванні",
      code: `# Поліморфізм у реальному застосуванні
class MediaPlayer:
    def play(self):
        raise NotImplementedError

class AudioPlayer(MediaPlayer):
    def __init__(self, file):
        self.file = file
    
    def play(self):
        print(f"Відтворюється аудіо: {self.file}")

class VideoPlayer(MediaPlayer):
    def __init__(self, file):
        self.file = file
    
    def play(self):
        print(f"Відтворюється відео: {self.file}")

class ImageViewer(MediaPlayer):
    def __init__(self, file):
        self.file = file
    
    def play(self):
        print(f"Відображається зображення: {self.file}")

def play_media(media):
    media.play()

# Створюємо різні медіа
media_list = [
    AudioPlayer("song.mp3"),
    VideoPlayer("movie.mp4"),
    ImageViewer("photo.jpg")
]

# Відтворюємо всі медіа
for media in media_list:
    play_media(media)`,
      explanation: "Показує практичне застосування поліморфізму для роботи з різними типами медіа."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не реалізувати потрібні методи",
      explanation: "Для поліморфізму всі об'єкти мають мати потрібні методи.",
      correctApproach: "Переконайся, що всі класи реалізують потрібні методи для поліморфізму"
    },
    {
      mistake: "Перевіряти тип об'єкта перед викликом",
      explanation: "Поліморфізм дозволяє не перевіряти тип - просто викликай метод.",
      correctApproach: "Не перевіряй тип, просто викликай метод - поліморфізм обробить це"
    },
    {
      mistake: "Використовувати різні назви методів",
      explanation: "Для поліморфізму методи мають мати однакові назви.",
      correctApproach: "Використовуй однакові назви методів у різних класах для поліморфізму"
    },
    {
      mistake: "Забувати про Duck Typing",
      explanation: "У Python не обов'язково наслідування - достатньо мати потрібний метод.",
      correctApproach: "Використовуй Duck Typing - якщо об'єкт має потрібний метод, він підходить"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Поліморфізм** - здатність об'єктів різних класів реагувати на один метод по-різному
2. **Поліморфізм через наслідування** - різні дочірні класи перевизначають метод
3. **Duck Typing** - "якщо об'єкт має потрібний метод, він підходить"
4. **Практичне застосування** - уніфікований інтерфейс для різних типів об'єктів
5. **Переваги** - гнучкість, простота додавання нових типів, читабельність коду

Тепер ви розумієте всі основні принципи ООП:
- **Інкапсуляція** - приховування даних
- **Наслідування** - повторне використання коду
- **Поліморфізм** - різні реалізації одного інтерфейсу

Вітаємо з завершенням модуля про ООП! 🎉`,
  
  practiceTask: {
    title: "Система рендерингу з поліморфізмом",
    description: "Створіть систему рендерингу різних типів об'єктів",
    problemStatement: `Напишіть програму, яка:
1. Створює базовий клас Renderable з методом render()
2. Створює дочірні класи:
   - Text(text) - виводить текст
   - Image(filename) - виводить інформацію про зображення
   - Button(label) - виводить інформацію про кнопку
3. Створює функцію render_all(objects), яка виводить всі об'єкти
4. Створює список різних об'єктів та виводить їх`,
    outputFormat: `Приклад виведення:
Рендериться текст: "Привіт, світ!"
Рендериться зображення: photo.jpg
Рендериться кнопка: "Натисни мене"`,
    examples: [
      {
        output: `Рендериться текст: "Привіт, світ!"
Рендериться зображення: photo.jpg
Рендериться кнопка: "Натисни мене"`,
        explanation: "Програма демонструє поліморфізм для рендерингу різних типів об'єктів"
      }
    ],
    solution: {
      code: `# Система рендерингу з поліморфізмом
class Renderable:
    def render(self):
        raise NotImplementedError("Потрібно реалізувати render()")

class Text(Renderable):
    def __init__(self, text):
        self.text = text
    
    def render(self):
        print(f'Рендериться текст: "{self.text}"')

class Image(Renderable):
    def __init__(self, filename):
        self.filename = filename
    
    def render(self):
        print(f"Рендериться зображення: {self.filename}")

class Button(Renderable):
    def __init__(self, label):
        self.label = label
    
    def render(self):
        print(f'Рендериться кнопка: "{self.label}"')

def render_all(objects):
    for obj in objects:
        obj.render()

# Створюємо різні об'єкти
objects = [
    Text("Привіт, світ!"),
    Image("photo.jpg"),
    Button("Натисни мене")
]

# Рендеримо всі об'єкти
render_all(objects)`,
      explanation: "Рішення використовує поліморфізм для рендерингу різних типів об'єктів через єдиний інтерфейс."
    },
    hints: [
      "Створи базовий клас Renderable з методом render()",
      "Кожен дочірній клас має перевизначити render()",
      "Функція render_all() працює з будь-яким об'єктом, що має render()",
      "Використовуй поліморфізм - не перевіряй типи",
      "Всі об'єкти мають однакову назву методу render()"
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
          "Здатність об'єктів різних класів реагувати на один метод по-різному",
          "Приховування даних",
          "Створення нових класів",
          "Виклик функцій"
        ],
        correctAnswer: 0,
        explanation: "Поліморфізм - це здатність об'єктів різних класів реагувати на один метод по-різному."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass A:\n    def method(self):\n        print('A')\n\nclass B:\n    def method(self):\n        print('B')\n\ndef call_method(obj):\n    obj.method()\n\ncall_method(A())\ncall_method(B())\n```",
        options: [
          "A\nB",
          "A\nA",
          "B\nB",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Це Duck Typing - функція працює з будь-яким об'єктом, що має method()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке Duck Typing?",
        options: [
          "Концепція: якщо об'єкт має потрібний метод, він підходить",
          "Створення качок в коді",
          "Тип даних",
          "Оператор"
        ],
        correctAnswer: 0,
        explanation: "Duck Typing - це концепція Python: якщо об'єкт має потрібний метод, він підходить."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи правильний цей код для поліморфізму?\n\n```python\nclass Shape:\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def area(self):\n        return 3.14 * self.radius ** 2\n\ndef print_area(shape):\n    print(shape.area())\n```",
        options: [
          "Так, це правильний поліморфізм",
          "Ні, потрібен return",
          "Ні, неправильний синтаксис",
          "Ні, потрібно перевіряти тип"
        ],
        correctAnswer: 0,
        explanation: "Код правильний - це поліморфізм через наслідування."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка перевага поліморфізму?",
        options: [
          "Гнучкість коду та легкість додавання нових типів",
          "Швидкість виконання",
          "Менше пам'яті",
          "Простіший синтаксис"
        ],
        correctAnswer: 0,
        explanation: "Поліморфізм дає гнучкість коду та полегшує додавання нових типів."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом для поліморфізму?\n\n```python\nclass Dog:\n    def speak(self):\n        print('Гав')\n\nclass Cat:\n    def make_sound(self):\n        print('Мяу')\n\ndef make_speak(animal):\n    animal.speak()\n```",
        options: [
          "Різні назви методів (speak vs make_sound)",
          "Неправильний синтаксис",
          "Немає помилок",
          "Потрібен return"
        ],
        correctAnswer: 0,
        explanation: "Для поліморфізму методи мають мати однакові назви - тут speak() та make_sound()."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
