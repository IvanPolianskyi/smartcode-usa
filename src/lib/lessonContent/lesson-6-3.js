/**
 * Lesson 6-3: Конструктор __init__
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_3 = {
  lessonId: "lesson-6-3",
  moduleId: "module-6",
  order: 3,
  title: "Конструктор __init__",
  
  learningObjectives: [
    "Використовувати __init__ для ініціалізації",
    "Передавати параметри в конструктор",
    "Встановлювати початкові значення",
    "Створювати об'єкти з різними параметрами",
    "Використовувати значення за замовчуванням"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-6-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке __init__?",
        content: `**__init__** — спеціальний метод (конструктор), який автоматично викликається при створенні об'єкта.

**Основна мета:**
- Ініціалізувати атрибути об'єкта
- Встановити початкові значення
- Виконати початкову налаштування

**Синтаксис:**
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# При створенні об'єкта автоматично викликається __init__
student = Student("Олександр", 15)
\`\`\`

**Важливо:**
- __init__ НЕ створює об'єкт (це робить __new__)
- __init__ тільки ініціалізує вже створений об'єкт
- Завжди приймає self як перший параметр
- Може приймати будь-яку кількість параметрів`
      },
      {
        title: "Базове використання __init__",
        content: `**Приклад 1: Простий конструктор**
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Створено студента: {name}")

student = Student("Олександр", 15)
# Виведе: Створено студента: Олександр
\`\`\`

**Приклад 2: Конструктор з обчисленнями**
\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height  # Обчислюємо при створенні
        self.perimeter = 2 * (width + height)

rect = Rectangle(5, 3)
print(rect.area)  # 15
print(rect.perimeter)  # 16
\`\`\`

**Приклад 3: Конструктор з валідацією**
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("Баланс не може бути від'ємним!")
        self.owner = owner
        self.balance = balance
        print(f"Рахунок створено для {owner}")

account = BankAccount("Олександр", 1000)
\`\`\``
      },
      {
        title: "Параметри за замовчуванням",
        content: `**Значення за замовчуванням** дозволяють не вказувати всі параметри:

\`\`\`python
class Student:
    def __init__(self, name, age=15, course="Python"):
        self.name = name
        self.age = age
        self.course = course

# Різні способи створення
student1 = Student("Олександр")  # age=15, course="Python"
student2 = Student("Марія", 16)  # course="Python"
student3 = Student("Дмитро", 15, "Web")  # Всі параметри
\`\`\`

**Правила:**
- Параметри зі значеннями за замовчуванням мають бути після параметрів без них
- Можна вказувати параметри за ім'ям

**Приклад з іменованими параметрами:**
\`\`\`python
class Book:
    def __init__(self, title, author, year=2024, pages=100):
        self.title = title
        self.author = author
        self.year = year
        self.pages = pages

# Різні способи
book1 = Book("Python Basics", "Олександр")
book2 = Book("Python Basics", "Олександр", 2023)
book3 = Book("Python Basics", "Олександр", pages=250)
book4 = Book("Python Basics", "Олександр", year=2023, pages=250)
\`\`\``
      },
      {
        title: "Різні типи параметрів",
        content: `**1. Обов'язкові параметри:**
\`\`\`python
class Student:
    def __init__(self, name, age):  # Обидва обов'язкові
        self.name = name
        self.age = age

student = Student("Олександр", 15)  # Обидва потрібні
\`\`\`

**2. Параметри за замовчуванням:**
\`\`\`python
class Student:
    def __init__(self, name, age=15):  # age має значення за замовчуванням
        self.name = name
        self.age = age
\`\`\`

**3. *args (довільна кількість позиційних аргументів):**
\`\`\`python
class Student:
    def __init__(self, name, *grades):
        self.name = name
        self.grades = list(grades)

student = Student("Олександр", 85, 90, 92)
print(student.grades)  # [85, 90, 92]
\`\`\`

**4. **kwargs (довільна кількість іменованих аргументів):**
\`\`\`python
class Student:
    def __init__(self, name, **info):
        self.name = name
        for key, value in info.items():
            setattr(self, key, value)

student = Student("Олександр", age=15, course="Python", city="Київ")
print(student.age)  # 15
print(student.course)  # Python
\`\`\``
      },
      {
        title: "Виклик super().__init__()",
        content: `**При наслідуванні** потрібно викликати конструктор батьківського класу:

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)  # Виклик батьківського __init__
        self.course = course

student = Student("Олександр", 15, "Python")
print(student.name)  # Олександр
print(student.course)  # Python
\`\`\`

**Чому super()?**
- Не потрібно знати ім'я батьківського класу
- Працює з множинним наслідуванням
- Більш гнучкий підхід

**Без super():**
\`\`\`python
class Student(Person):
    def __init__(self, name, age, course):
        Person.__init__(self, name, age)  # Теж працює, але менш гнучко
        self.course = course
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Клас з множинними параметрами**
\`\`\`python
class Product:
    def __init__(self, name, price, category="General", discount=0):
        self.name = name
        self.price = price
        self.category = category
        self.discount = discount
        self.final_price = price * (1 - discount / 100)

product1 = Product("Книга", 100)
product2 = Product("Книга", 100, "Education", 10)
print(product2.final_price)  # 90.0
\`\`\`

**Приклад 2: Конструктор з валідацією та обчисленнями**
\`\`\`python
class Circle:
    def __init__(self, radius):
        if radius <= 0:
            raise ValueError("Радіус має бути додатнім!")
        self.radius = radius
        self.area = 3.14159 * radius ** 2
        self.circumference = 2 * 3.14159 * radius

circle = Circle(5)
print(circle.area)  # 78.54...
\`\`\`

**Приклад 3: Конструктор зі списком**
\`\`\`python
class ShoppingCart:
    def __init__(self, owner):
        self.owner = owner
        self.items = []  # Початковий порожній список
        self.total = 0

cart = ShoppingCart("Олександр")
cart.items.append("Книга")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий __init__",
      code: `class Student:
    def __init__(self, name, age, course):
        self.name = name
        self.age = age
        self.course = course
        print(f"Створено студента: {name}")

student = Student("Олександр", 15, "Python")
# Виведе: Створено студента: Олександр`,
      explanation: "Демонструє базовий конструктор з параметрами."
    },
    {
      title: "Приклад 2: Параметри за замовчуванням",
      code: `class Book:
    def __init__(self, title, author, year=2024, pages=100):
        self.title = title
        self.author = author
        self.year = year
        self.pages = pages

# Різні способи створення
book1 = Book("Python Basics", "Олександр")
book2 = Book("Python Basics", "Олександр", 2023)
book3 = Book("Python Basics", "Олександр", pages=250)

print(book1.year)  # 2024
print(book2.year)  # 2023
print(book3.pages)  # 250`,
      explanation: "Показує використання параметрів за замовчуванням."
    },
    {
      title: "Приклад 3: Конструктор з валідацією",
      code: `class BankAccount:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("Баланс не може бути від'ємним!")
        self.owner = owner
        self.balance = balance
    
    def __str__(self):
        return f"Рахунок {self.owner}: {self.balance} грн"

account = BankAccount("Олександр", 1000)
print(account)`,
      explanation: "Демонструє валідацію в конструкторі."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути self в __init__",
      explanation: "Без self не можна встановити атрибути об'єкта.",
      correctApproach: "Завжди використовуйте self як перший параметр: def __init__(self, ...):"
    },
    {
      mistake: "Параметри за замовчуванням перед обов'язковими",
      explanation: "Параметри зі значеннями за замовчуванням мають бути після обов'язкових.",
      correctApproach: "def __init__(self, required, optional=default): а не def __init__(self, optional=default, required):"
    },
    {
      mistake: "Не викликати super().__init__() при наслідуванні",
      explanation: "Без super() батьківський клас не ініціалізується, атрибути батьківського класу не будуть встановлені.",
      correctApproach: "Завжди викликайте super().__init__(...) в дочірньому класі."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **__init__** — конструктор, ініціалізує об'єкт
2. **Параметри** — можна передавати різну кількість параметрів
3. **Значення за замовчуванням** — для опціональних параметрів
4. ***args та **kwargs** — для довільної кількості аргументів
5. **super().__init__()** — виклик батьківського конструктора

**Важливо:**
- __init__ автоматично викликається при створенні об'єкта
- self завжди перший параметр
- Параметри за замовчуванням після обов'язкових
- Використовуйте super() при наслідуванні

Конструктор — це основа створення об'єктів!`,
  
  practiceTask: {
    title: "Створення класу з гнучким конструктором",
    description: "Створіть клас з різними способами ініціалізації",
    problemStatement: `Створіть клас Car з наступними вимогами:

**Обов'язкові параметри:**
- brand (марка)
- model (модель)

**Параметри за замовчуванням:**
- year (рік) — за замовчуванням поточний рік
- color (колір) — за замовчуванням "білий"
- price (ціна) — за замовчуванням 0

**Додаткові вимоги:**
- Використовуйте datetime для отримання поточного року
- Валідуйте, що year не більше поточного року
- Валідуйте, що price >= 0
- Обчислюйте вік автомобіля (поточний рік - year)
- Створіть метод get_info(), який повертає інформацію про автомобіль

**Створіть кілька автомобілів різними способами та продемонструйте роботу.**`,
    inputFormat: "Створіть клас та об'єкти",
    outputFormat: `Приклад виведення:
Марка: Toyota, Модель: Camry, Рік: 2023, Колір: білий, Ціна: 50000
Вік: 1 рік`,
    examples: [
      {
        input: "Car('Toyota', 'Camry')",
        output: "Автомобіль створено з параметрами за замовчуванням",
        explanation: "Демонстрація використання значень за замовчуванням"
      }
    ],
    solution: {
      code: `from datetime import datetime

class Car:
    def __init__(self, brand, model, year=None, color="білий", price=0):
        self.brand = brand
        self.model = model
        
        # Встановлюємо поточний рік, якщо не вказано
        current_year = datetime.now().year
        if year is None:
            year = current_year
        
        # Валідація року
        if year > current_year:
            raise ValueError(f"Рік не може бути більше {current_year}!")
        
        self.year = year
        self.color = color
        
        # Валідація ціни
        if price < 0:
            raise ValueError("Ціна не може бути від'ємною!")
        self.price = price
        
        # Обчислюємо вік
        self.age = current_year - year
    
    def get_info(self):
        """Повертає інформацію про автомобіль."""
        return {
            "brand": self.brand,
            "model": self.model,
            "year": self.year,
            "color": self.color,
            "price": self.price,
            "age": self.age
        }
    
    def __str__(self):
        return (f"Марка: {self.brand}, Модель: {self.model}, "
                f"Рік: {self.year}, Колір: {self.color}, Ціна: {self.price}, "
                f"Вік: {self.age} років")

# Різні способи створення
car1 = Car("Toyota", "Camry")
print(car1)

car2 = Car("Honda", "Civic", 2023)
print(car2)

car3 = Car("BMW", "X5", 2022, "чорний", 100000)
print(car3)

# З іменованими параметрами
car4 = Car("Mercedes", "E-Class", color="сірий", price=80000)
print(car4)`,
      explanation: "Рішення демонструє гнучкий конструктор з валідацією та обчисленнями."
    },
    hints: [
      "Використовуйте datetime.now().year для поточного року",
      "Перевіряйте year та price на валідність",
      "Обчислюйте вік в __init__",
      "Використовуйте None для параметра year, щоб встановити поточний рік"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли викликається __init__?",
        options: ["При визначенні класу", "При створенні об'єкта", "При виклику методу", "Ніколи"],
        correctAnswer: 1,
        explanation: "__init__ автоматично викликається при створенні об'єкта: obj = ClassName()."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: def __init__(self, x=1): self.x=x; a=A(); print(a.x)?",
        options: ["1", "Помилку", "None", "0"],
        correctAnswer: 0,
        explanation: "x має значення за замовчуванням 1, тому a.x поверне 1."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який порядок параметрів правильний?",
        options: ["def __init__(self, a=1, b):", "def __init__(self, b, a=1):", "def __init__(self, a, b=1):", "Всі правильні"],
        correctAnswer: 2,
        explanation: "Параметри зі значеннями за замовчуванням мають бути після обов'язкових параметрів."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
