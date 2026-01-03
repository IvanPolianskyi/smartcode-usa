/**
 * Lesson 06-4: Наслідування
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_4 = {
  lessonId: "lesson-06-4",
  moduleId: "module-06",
  order: 4,
  title: "Наслідування",
  
  learningObjectives: [
    "Створювати дочірні класи",
    "Перевизначати методи",
    "Використовувати super()",
    "Розуміти MRO (Method Resolution Order)"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-06-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке наслідування?",
        content: `**Наслідування** - це механізм ООП, який дозволяє створювати нові класи на основі існуючих.

**Аналогія:**
Уявіть тварину. Всі тварини мають спільні властивості (ім'я, вік) та дії (їсти, спати). Але собака має додаткові властивості (порода) та дії (гавкати), а кіт - інші (мурчати).

**Переваги наслідування:**
- ✅ Повторне використання коду
- ✅ Розширення функціональності
- ✅ Логічна організація класів
- ✅ Легше підтримувати код

**Термінологія:**
- **Базовий клас (батьківський, суперклас)** - клас, від якого наслідуються інші
- **Дочірній клас (підклас)** - клас, який наслідує від базового
- **Перевизначення** - зміна методу батьківського класу в дочірньому

**Синтаксис:**

\`\`\`python
class ДочірнійКлас(БазовийКлас):
    # нові атрибути та методи
    pass
\`\`\``
      },
      {
        title: "Просте наслідування",
        content: `**Приклад: Базовий клас Animal та дочірній клас Dog**

\`\`\`python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def eat(self):
        print(f"{self.name} їсть")
    
    def sleep(self):
        print(f"{self.name} спить")
    
    def get_info(self):
        return f"{self.name}, {self.age} років"

# Дочірній клас Dog наслідує від Animal
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Викликаємо конструктор батьківського класу
        self.breed = breed
    
    def bark(self):
        print(f"{self.name} гавкає: Гав-гав!")

# Створюємо об'єкти
animal = Animal("Тварина", 5)
dog = Dog("Рекс", 3, "Лабрадор")

animal.eat()        # Тварина їсть
dog.eat()           # Рекс їсть (успадкований метод)
dog.bark()          # Рекс гавкає: Гав-гав! (власний метод)
print(dog.get_info())  # Рекс, 3 років (успадкований метод)
\`\`\`

**Що успадковується:**
- ✅ Всі методи базового класу
- ✅ Всі атрибути (якщо вони встановлені в __init__)

**Що можна додати:**
- ✅ Нові атрибути
- ✅ Нові методи
- ✅ Перевизначити існуючі методи`
      },
      {
        title: "super() - виклик батьківського класу",
        content: `**super()** - функція для доступу до методів батьківського класу.

**Навіщо потрібен super():**
- Викликати методи батьківського класу
- Не дублювати код
- Правильно ініціалізувати об'єкт

**Синтаксис:**

\`\`\`python
class ДочірнійКлас(БазовийКлас):
    def __init__(self, параметри):
        super().__init__(параметри_базового)  # Виклик батьківського __init__
        # додаткові атрибути
\`\`\`

**Приклад:**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"Привіт, мене звати {self.name}")

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Викликаємо __init__ батьківського класу
        self.student_id = student_id
    
    def introduce(self):
        super().introduce()  # Викликаємо метод батьківського класу
        print(f"Мій студентський ID: {self.student_id}")

student = Student("Олексій", 20, "ST123")
student.introduce()
# Виведе:
# Привіт, мене звати Олексій
# Мій студентський ID: ST123
\`\`\``
      },
      {
        title: "Перевизначення методів",
        content: `**Перевизначення** - це зміна реалізації методу батьківського класу в дочірньому.

**Приклад:**

\`\`\`python
class Shape:
    def __init__(self, name):
        self.name = name
    
    def area(self):
        return 0  # Базовий метод
    
    def get_info(self):
        return f"{self.name}, площа: {self.area()}"

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Прямокутник")
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height  # Перевизначений метод

class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Коло")
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2  # Перевизначений метод

# Використання
rect = Rectangle(5, 3)
circle = Circle(4)

print(rect.get_info())   # Прямокутник, площа: 15
print(circle.get_info()) # Коло, площа: 50.24
\`\`\`

**Важливо:**
- Дочірній клас може перевизначити будь-який метод батьківського
- Можна викликати батьківський метод через super()
- Перевизначений метод замінює батьківський для об'єктів дочірнього класу`
      },
      {
        title: "Множинне наслідування",
        content: `**Множинне наслідування** - клас може наслідувати від кількох батьківських класів.

**Синтаксис:**

\`\`\`python
class ДочірнійКлас(Батьківський1, Батьківський2):
    pass
\`\`\`

**Приклад:**

\`\`\`python
class Flyable:
    def fly(self):
        print("Літає")

class Swimmable:
    def swim(self):
        print("Плаває")

class Duck(Flyable, Swimmable):
    def quack(self):
        print("Кря-кря")

duck = Duck()
duck.fly()    # Літає (від Flyable)
duck.swim()   # Плаває (від Swimmable)
duck.quack()  # Кря-кря (власний метод)
\`\`\`

**MRO (Method Resolution Order):**
Python визначає порядок пошуку методів при множинному наслідуванні. Використовується алгоритм C3.

**Перевірка MRO:**

\`\`\`python
print(Duck.__mro__)
# Показує порядок пошуку методів
\`\`\``
      },
      {
        title: "Практичний приклад: Ієрархія транспортних засобів",
        content: `**Повний приклад з наслідуванням:**

\`\`\`python
class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
        self.speed = 0
    
    def start(self):
        print(f"{self.brand} {self.model} запущено")
    
    def stop(self):
        print(f"{self.brand} {self.model} зупинено")
        self.speed = 0
    
    def get_info(self):
        return f"{self.brand} {self.model} {self.year}"

class Car(Vehicle):
    def __init__(self, brand, model, year, doors):
        super().__init__(brand, model, year)
        self.doors = doors
    
    def honk(self):
        print("Біп-біп!")

class Motorcycle(Vehicle):
    def __init__(self, brand, model, year, has_sidecar):
        super().__init__(brand, model, year)
        self.has_sidecar = has_sidecar
    
    def wheelie(self):
        print("Виконує вілі!")

# Використання
car = Car("Toyota", "Camry", 2020, 4)
motorcycle = Motorcycle("Yamaha", "R1", 2021, False)

car.start()           # Toyota Camry запущено (успадковано)
car.honk()            # Біп-біп! (власний метод)
print(car.get_info()) # Toyota Camry 2020 (успадковано)

motorcycle.start()    # Yamaha R1 запущено (успадковано)
motorcycle.wheelie()  # Виконує вілі! (власний метод)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Просте наслідування",
      code: `# Просте наслідування
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} видає звук")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    
    def speak(self):
        print(f"{self.name} гавкає: Гав-гав!")

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name)
    
    def speak(self):
        print(f"{self.name} мявкає: Мяу!")

dog = Dog("Рекс", "Лабрадор")
cat = Cat("Мурка")

dog.speak()  # Рекс гавкає: Гав-гав!
cat.speak()  # Мурка мявкає: Мяу!`,
      explanation: "Демонструє просте наслідування з перевизначенням методу speak."
    },
    {
      title: "Приклад 2: Використання super()",
      code: `# Використання super()
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_info(self):
        return f"{self.name}, зарплата: {self.salary}"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department
    
    def get_info(self):
        base_info = super().get_info()
        return f"{base_info}, відділ: {self.department}"

manager = Manager("Олексій", 50000, "IT")
print(manager.get_info())  # Олексій, зарплата: 50000, відділ: IT`,
      explanation: "Показує використання super() для виклику методів батьківського класу."
    },
    {
      title: "Приклад 3: Множинне наслідування",
      code: `# Множинне наслідування
class Reader:
    def read(self):
        print("Читає книгу")

class Writer:
    def write(self):
        print("Пише книгу")

class Author(Reader, Writer):
    def __init__(self, name):
        self.name = name
    
    def create_book(self):
        print(f"{self.name} створює книгу")

author = Author("Тарас Шевченко")
author.read()      # Читає книгу (від Reader)
author.write()     # Пише книгу (від Writer)
author.create_book()  # Тарас Шевченко створює книгу (власний метод)`,
      explanation: "Демонструє множинне наслідування від двох батьківських класів."
    },
    {
      title: "Приклад 4: Ієрархія класів",
      code: `# Ієрархія класів
class Shape:
    def __init__(self, name):
        self.name = name
    
    def area(self):
        return 0

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

rect = Rectangle(5, 3)
square = Square(4)

print(f"{rect.name}, площа: {rect.area()}")   # Прямокутник, площа: 15
print(f"{square.name}, площа: {square.area()}")  # Квадрат, площа: 16`,
      explanation: "Показує багаторівневе наслідування: Shape -> Rectangle -> Square."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати super().__init__()",
      explanation: "Без super().__init__() атрибути батьківського класу не будуть ініціалізовані.",
      correctApproach: "Завжди викликай super().__init__() в __init__ дочірнього класу"
    },
    {
      mistake: "Плутати порядок параметрів у super()",
      explanation: "Параметри для super().__init__() мають відповідати параметрам батьківського __init__.",
      correctApproach: "Передавай правильні параметри: super().__init__(name, age)"
    },
    {
      mistake: "Не використовувати super() при перевизначенні",
      explanation: "Якщо потрібна функціональність батьківського методу, використовуй super().",
      correctApproach: "Використовуй super().method() для виклику батьківського методу"
    },
    {
      mistake: "Створювати занадто глибоку ієрархію",
      explanation: "Занадто глибока ієрархія ускладнює код.",
      correctApproach: "Використовуй наслідування обдумано, уникай занадто глибоких ієрархій"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Наслідування** - створення нових класів на основі існуючих
2. **Базовий клас** - клас, від якого наслідуються інші
3. **Дочірній клас** - клас, який наслідує від базового
4. **super()** - функція для доступу до методів батьківського класу
5. **Перевизначення** - зміна реалізації методу в дочірньому класі
6. **Множинне наслідування** - наслідування від кількох класів

Тепер ви вмієте створювати ієрархії класів та повторно використовувати код!

Наступний урок - поліморфізм!`,
  
  practiceTask: {
    title: "Ієрархія класів для бібліотеки",
    description: "Створіть ієрархію класів для представлення книг у бібліотеці",
    problemStatement: `Напишіть програму, яка:
1. Створює базовий клас Book з:
   - Атрибутами: title, author, pages
   - Методом get_info() - повертає інформацію про книгу
2. Створює дочірній клас EBook(Book) з:
   - Додатковим атрибутом: file_size (в МБ)
   - Перевизначеним get_info() - додає інформацію про розмір файлу
3. Створює дочірній клас AudioBook(Book) з:
   - Додатковим атрибутом: duration (в хвилинах)
   - Перевизначеним get_info() - додає інформацію про тривалість
4. Створює об'єкти та виводить інформацію`,
    outputFormat: `Приклад виведення:
Книга: "1984", автор: Дж. Оруелл, 328 сторінок
Електронна книга: "1984", автор: Дж. Оруелл, 328 сторінок, розмір: 2.5 МБ
Аудіокнига: "1984", автор: Дж. Оруелл, 328 сторінок, тривалість: 480 хв`,
    examples: [
      {
        output: `Книга: "1984", автор: Дж. Оруелл, 328 сторінок
Електронна книга: "1984", автор: Дж. Оруелл, 328 сторінок, розмір: 2.5 МБ
Аудіокнига: "1984", автор: Дж. Оруелл, 328 сторінок, тривалість: 480 хв`,
        explanation: "Програма демонструє наслідування та перевизначення методів"
      }
    ],
    solution: {
      code: `# Ієрархія класів для бібліотеки
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    def get_info(self):
        return f'Книга: "{self.title}", автор: {self.author}, {self.pages} сторінок'

class EBook(Book):
    def __init__(self, title, author, pages, file_size):
        super().__init__(title, author, pages)
        self.file_size = file_size
    
    def get_info(self):
        base_info = super().get_info()
        return f"Електронна {base_info.lower()}, розмір: {self.file_size} МБ"

class AudioBook(Book):
    def __init__(self, title, author, pages, duration):
        super().__init__(title, author, pages)
        self.duration = duration
    
    def get_info(self):
        base_info = super().get_info()
        return f"Аудіо{base_info.lower()}, тривалість: {self.duration} хв"

# Створюємо об'єкти
book = Book("1984", "Дж. Оруелл", 328)
ebook = EBook("1984", "Дж. Оруелл", 328, 2.5)
audiobook = AudioBook("1984", "Дж. Оруелл", 328, 480)

print(book.get_info())
print(ebook.get_info())
print(audiobook.get_info())`,
      explanation: "Рішення використовує наслідування, super() та перевизначення методів для створення ієрархії класів."
    },
    hints: [
      "Використовуй super().__init__() для виклику конструктора батьківського класу",
      "Перевизначай get_info() в дочірніх класах",
      "Використовуй super().get_info() для отримання базової інформації",
      "Додавай специфічну інформацію в дочірніх класах",
      "Не забудь про self у всіх методах"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке наслідування в ООП?",
        options: [
          "Створення нових класів на основі існуючих",
          "Приховування даних",
          "Створення об'єктів",
          "Виклик функцій"
        ],
        correctAnswer: 0,
        explanation: "Наслідування - це створення нових класів на основі існуючих класів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass A:\n    def method(self):\n        print('A')\n\nclass B(A):\n    def method(self):\n        print('B')\n\nb = B()\nb.method()\n```",
        options: [
          "B",
          "A",
          "A B",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Метод method перевизначений в класі B, тому виводиться 'B'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить super()?",
        options: [
          "Дозволяє викликати методи батьківського класу",
          "Створює новий об'єкт",
          "Видаляє атрибути",
          "Блокує доступ"
        ],
        correctAnswer: 0,
        explanation: "super() дозволяє викликати методи батьківського класу."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи правильний цей код?\n\n```python\nclass Parent:\n    def __init__(self, x):\n        self.x = x\n\nclass Child(Parent):\n    def __init__(self, x, y):\n        super().__init__(x)\n        self.y = y\n```",
        options: [
          "Так, код правильний",
          "Ні, потрібен self в super()",
          "Ні, super() не можна використовувати",
          "Ні, неправильний синтаксис"
        ],
        correctAnswer: 0,
        explanation: "Код правильний, super().__init__(x) викликає конструктор батьківського класу."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке перевизначення методу?",
        options: [
          "Зміна реалізації методу батьківського класу в дочірньому",
          "Видалення методу",
          "Створення нового класу",
          "Виклик методу"
        ],
        correctAnswer: 0,
        explanation: "Перевизначення - це зміна реалізації методу батьківського класу в дочірньому."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nclass Parent:\n    def __init__(self, name):\n        self.name = name\n\nclass Child(Parent):\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n```",
        options: [
          "Не викликається super().__init__()",
          "Неправильний синтаксис",
          "Немає помилок",
          "Потрібен return"
        ],
        correctAnswer: 0,
        explanation: "Краще викликати super().__init__(name) замість дублювання коду."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
