/**
 * Lesson 6-6: Поліморфізм
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_6 = {
  lessonId: "lesson-6-6",
  moduleId: "module-6",
  order: 6,
  title: "Поліморфізм",
  
  learningObjectives: [
    "Розуміти поліморфізм",
    "Реалізовувати поліморфізм в Python",
    "Застосовувати duck typing",
    "Використовувати поліморфізм на практиці",
    "Розуміти переваги поліморфізму"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-6-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке поліморфізм?",
        content: `**Поліморфізм** — можливість об'єктів різних класів використовувати один інтерфейс.

**Ідея:** Різні об'єкти можуть реагувати на однакову команду по-різному.

**Аналогія:**
Всі тварини можуть "говорити", але кожна тварина робить це по-своєму:
- Собака каже "Гав-гав!"
- Кіт каже "Мяу!"
- Птах каже "Чік-чірик!"

**Приклад:**
\`\`\`python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав-гав!"

class Cat(Animal):
    def speak(self):
        return "Мяу!"

animals = [Dog(), Cat(), Dog()]
for animal in animals:
    print(animal.speak())  # Поліморфізм: різні об'єкти, одна команда
\`\`\`

**Переваги:**
- ✅ Гнучкість коду
- ✅ Легше додавати нові типи
- ✅ Один інтерфейс для різних об'єктів
- ✅ Менше дублювання коду`
      },
      {
        title: "Поліморфізм через наслідування",
        content: `**Класичний поліморфізм** — через наслідування та перевизначення методів.

\`\`\`python
class Shape:
    def area(self):
        return 0
    
    def perimeter(self):
        return 0

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Поліморфізм: різні об'єкти, один інтерфейс
shapes = [Rectangle(5, 3), Circle(4), Rectangle(2, 2)]

for shape in shapes:
    print(f"Площа: {shape.area()}, Периметр: {shape.perimeter()}")
    # Кожен об'єкт використовує свою реалізацію!
\`\`\`

**Ключова ідея:**
- Всі об'єкти мають однаковий інтерфейс (методи)
- Кожен об'єкт реалізує методи по-своєму
- Код, що працює з об'єктами, не знає про конкретні типи`
      },
      {
        title: "Duck Typing",
        content: `**"Якщо щось ходить як качка і крякає як качка, то це качка"**

Python використовує **duck typing** — тип об'єкта визначається методами, які він має.

\`\`\`python
class Dog:
    def speak(self):
        return "Гав!"

class Robot:
    def speak(self):
        return "Біп-біп!"

class Person:
    def speak(self):
        return "Привіт!"

def make_sound(thing):
    print(thing.speak())  # Не важливо, що це — важливо, що має speak()

make_sound(Dog())    # Гав!
make_sound(Robot())  # Біп-біп!
make_sound(Person()) # Привіт!
\`\`\`

**Переваги duck typing:**
- Не потрібно наслідування
- Більш гнучкий код
- Менше обмежень

**Приклад:**
\`\`\`python
class File:
    def read(self):
        return "Дані з файлу"

class Database:
    def read(self):
        return "Дані з бази"

class API:
    def read(self):
        return "Дані з API"

def process_data(source):
    data = source.read()  # Не важливо, що це — важливо, що має read()
    print(f"Обробка: {data}")

process_data(File())
process_data(Database())
process_data(API())
\`\`\``
      },
      {
        title: "Поліморфізм на практиці",
        content: `**Приклад 1: Система обробки платежів**
\`\`\`python
class PaymentMethod:
    def pay(self, amount):
        pass

class CreditCard(PaymentMethod):
    def pay(self, amount):
        return f"Оплачено {amount} грн карткою"

class PayPal(PaymentMethod):
    def pay(self, amount):
        return f"Оплачено {amount} грн через PayPal"

class BankTransfer(PaymentMethod):
    def pay(self, amount):
        return f"Переказ {amount} грн на рахунок"

def process_payment(method, amount):
    return method.pay(amount)  # Поліморфізм!

methods = [CreditCard(), PayPal(), BankTransfer()]
for method in methods:
    print(process_payment(method, 100))
\`\`\`

**Приклад 2: Система звітів**
\`\`\`python
class Report:
    def generate(self):
        pass

class PDFReport(Report):
    def generate(self):
        return "PDF звіт створено"

class HTMLReport(Report):
    def generate(self):
        return "HTML звіт створено"

class CSVReport(Report):
    def generate(self):
        return "CSV звіт створено"

def create_reports(reports):
    for report in reports:
        print(report.generate())  # Поліморфізм!

reports = [PDFReport(), HTMLReport(), CSVReport()]
create_reports(reports)
\`\`\``
      },
      {
        title: "Переваги поліморфізму",
        content: `**1. Гнучкість:**
\`\`\`python
# Можна легко додати новий тип
class NewPaymentMethod(PaymentMethod):
    def pay(self, amount):
        return f"Оплачено новим методом"

# Код, що використовує PaymentMethod, працює без змін!
\`\`\`

**2. Менше дублювання:**
\`\`\`python
# Замість:
def process_credit_card(amount): ...
def process_paypal(amount): ...
def process_bank(amount): ...

# Один функція для всіх:
def process_payment(method, amount):
    return method.pay(amount)
\`\`\`

**3. Легше тестувати:**
\`\`\`python
# Можна створити mock об'єкт для тестування
class MockPayment(PaymentMethod):
    def pay(self, amount):
        return "Тестова оплата"
\`\`\`

**4. Розширюваність:**
- Легко додавати нові типи
- Не потрібно змінювати існуючий код
- Відкритий для розширення, закритий для модифікації`
      },
      {
        title: "Поліморфізм vs жорстке кодування",
        content: `**Без поліморфізму (жорстке кодування):**
\`\`\`python
def process_payment(method_type, amount):
    if method_type == "credit_card":
        return f"Оплачено {amount} карткою"
    elif method_type == "paypal":
        return f"Оплачено {amount} через PayPal"
    elif method_type == "bank":
        return f"Переказ {amount}"
    # Потрібно додавати нові if для кожного типу!
\`\`\`

**З поліморфізмом (гнучке кодування):**
\`\`\`python
def process_payment(method, amount):
    return method.pay(amount)  # Працює для всіх типів!

# Додати новий тип — просто створити новий клас
\`\`\`

**Переваги поліморфізму:**
- ✅ Менше if/elif
- ✅ Легше додавати нові типи
- ✅ Більш читабельний код
- ✅ Менше помилок`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Класичний поліморфізм",
      code: `class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав-гав!"

class Cat(Animal):
    def speak(self):
        return "Мяу!"

def make_all_speak(animals):
    for animal in animals:
        print(animal.speak())

make_all_speak([Dog(), Cat(), Dog()])`,
      explanation: "Демонструє класичний поліморфізм через наслідування."
    },
    {
      title: "Приклад 2: Duck typing",
      code: `class Dog:
    def speak(self):
        return "Гав!"

class Robot:
    def speak(self):
        return "Біп-біп!"

def make_sound(thing):
    print(thing.speak())  # Не важливо, що це

make_sound(Dog())
make_sound(Robot())`,
      explanation: "Показує duck typing — важливі методи, а не тип."
    },
    {
      title: "Приклад 3: Поліморфізм з фігурами",
      code: `class Shape:
    def area(self):
        return 0

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
        return 3.14159 * self.radius ** 2

shapes = [Rectangle(5, 3), Circle(4), Rectangle(2, 2)]
total_area = sum(shape.area() for shape in shapes)
print(f"Загальна площа: {total_area}")`,
      explanation: "Демонструє поліморфізм для обчислення площі різних фігур."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Перевірка типу замість поліморфізму",
      explanation: "Використання isinstance() або type() для перевірки типу руйнує поліморфізм.",
      correctApproach: "Використовуйте поліморфізм — викликайте методи без перевірки типу. Якщо об'єкт має потрібний метод, він працюватиме."
    },
    {
      mistake: "Не використання спільного інтерфейсу",
      explanation: "Створення різних методів для різних типів замість використання спільного інтерфейсу.",
      correctApproach: "Використовуйте спільний інтерфейс (однакові назви методів) для різних класів."
    },
    {
      mistake: "Занадто багато if/elif для різних типів",
      explanation: "Якщо потрібно багато if для різних типів, це ознака того, що потрібен поліморфізм.",
      correctApproach: "Замініть if/elif на поліморфізм — створіть класи з однаковими методами."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Поліморфізм** — різні об'єкти, один інтерфейс
2. **Класичний поліморфізм** — через наслідування
3. **Duck typing** — важливі методи, а не тип
4. **Переваги** — гнучкість, розширюваність, менше дублювання
5. **Практичне застосування** — системи платежів, звітів, обробки даних

**Ключові принципи:**
- Один інтерфейс для різних об'єктів
- Кожен об'єкт реалізує методи по-своєму
- Код не залежить від конкретних типів

**Переваги:**
- Гнучкість
- Розширюваність
- Менше дублювання
- Легше підтримувати

Поліморфізм робить код більш гнучким та розширюваним!`,
  
  practiceTask: {
    title: "Система обробки медіа-файлів",
    description: "Створіть систему обробки різних типів медіа-файлів з використанням поліморфізму",
    problemStatement: `Створіть систему обробки медіа-файлів з поліморфізмом:

**Базовий клас MediaFile:**
- Атрибути: filename, size
- Методи: play(), get_info(), get_duration()

**Дочірні класи:**
- AudioFile (наслідує від MediaFile)
  - Додаткові атрибути: artist, bitrate
  - Перевизначити: play() — "Відтворення аудіо..."
  - Перевизначити: get_duration() — повертає рядок з тривалістю
  
- VideoFile (наслідує від MediaFile)
  - Додаткові атрибути: resolution, fps
  - Перевизначити: play() — "Відтворення відео..."
  - Перевизначити: get_duration() — повертає рядок з тривалістю

- ImageFile (наслідує від MediaFile)
  - Додаткові атрибути: width, height
  - Перевизначити: play() — "Відображення зображення..."
  - Перевизначити: get_duration() — повертає None (зображення не має тривалості)

**Функція для демонстрації поліморфізму:**
- process_media(files) — приймає список файлів різних типів
- Викликає play() та get_info() для кожного файлу
- Показує, як поліморфізм працює з різними типами

**Створіть об'єкти різних типів та продемонструйте поліморфізм.**`,
    inputFormat: "Створіть ієрархію класів та функцію",
    outputFormat: `Приклад виведення:
Відтворення аудіо: song.mp3
Інформація: song.mp3, 5MB, Artist: Олександр

Відтворення відео: video.mp4
Інформація: video.mp4, 100MB, 1920x1080

Відображення зображення: photo.jpg
Інформація: photo.jpg, 2MB, 800x600`,
    examples: [
      {
        input: "Список файлів різних типів",
        output: "Всі файли обробляються через один інтерфейс",
        explanation: "Демонстрація поліморфізму"
      }
    ],
    solution: {
      code: `class MediaFile:
    def __init__(self, filename, size):
        self.filename = filename
        self.size = size
    
    def play(self):
        return "Відтворення файлу..."
    
    def get_info(self):
        return f"{self.filename}, {self.size}"
    
    def get_duration(self):
        return "Невідома тривалість"

class AudioFile(MediaFile):
    def __init__(self, filename, size, artist, bitrate):
        super().__init__(filename, size)
        self.artist = artist
        self.bitrate = bitrate
    
    def play(self):
        return f"Відтворення аудіо: {self.filename}"
    
    def get_info(self):
        base = super().get_info()
        return f"{base}, Artist: {self.artist}, Bitrate: {self.bitrate} kbps"
    
    def get_duration(self):
        return "3:45"

class VideoFile(MediaFile):
    def __init__(self, filename, size, resolution, fps):
        super().__init__(filename, size)
        self.resolution = resolution
        self.fps = fps
    
    def play(self):
        return f"Відтворення відео: {self.filename}"
    
    def get_info(self):
        base = super().get_info()
        return f"{base}, Resolution: {self.resolution}, FPS: {self.fps}"
    
    def get_duration(self):
        return "10:30"

class ImageFile(MediaFile):
    def __init__(self, filename, size, width, height):
        super().__init__(filename, size)
        self.width = width
        self.height = height
    
    def play(self):
        return f"Відображення зображення: {self.filename}"
    
    def get_info(self):
        base = super().get_info()
        return f"{base}, Size: {self.width}x{self.height}"
    
    def get_duration(self):
        return None  # Зображення не має тривалості

def process_media(files):
    """Демонстрація поліморфізму."""
    for file in files:
        print(file.play())
        print(f"Інформація: {file.get_info()}")
        duration = file.get_duration()
        if duration:
            print(f"Тривалість: {duration}")
        print()

# Створення об'єктів
audio = AudioFile("song.mp3", "5MB", "Олександр", 320)
video = VideoFile("video.mp4", "100MB", "1920x1080", 30)
image = ImageFile("photo.jpg", "2MB", 800, 600)

# Демонстрація поліморфізму
files = [audio, video, image]
process_media(files)`,
      explanation: "Рішення демонструє повний поліморфізм з різними типами медіа-файлів."
    },
    hints: [
      "Використовуйте super() для виклику батьківських методів",
      "Перевизначте play() та get_duration() в кожному класі",
      "Створіть функцію, яка працює зі списком різних типів",
      "Покажіть, як один інтерфейс працює для різних об'єктів"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке поліморфізм?",
        options: ["Багато форм", "Можливість різних об'єктів використовувати один інтерфейс", "Створення класів", "Видалення методів"],
        correctAnswer: 1,
        explanation: "Поліморфізм — це можливість різних об'єктів реагувати на одну команду по-різному через один інтерфейс."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке duck typing?",
        options: ["Тип визначається методами", "Тип визначається наслідуванням", "Тип визначається атрибутами", "Тип визначається ім'ям"],
        correctAnswer: 0,
        explanation: "Duck typing — тип об'єкта визначається методами, які він має, а не явним типом або наслідуванням."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: def x(self): return 1; class B: def x(self): return 2; def f(obj): return obj.x(); print(f(A())); print(f(B()))?",
        options: ["1\\n2", "2\\n1", "Помилку", "1\\n1"],
        correctAnswer: 0,
        explanation: "Поліморфізм: функція f() працює з будь-яким об'єктом, що має метод x(). A().x() поверне 1, B().x() поверне 2."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
