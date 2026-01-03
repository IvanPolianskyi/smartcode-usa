/**
 * Lesson 06-1: Основи ООП: класи та об'єкти
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_1 = {
  lessonId: "lesson-06-1",
  moduleId: "module-06",
  order: 1,
  title: "Основи ООП: класи та об'єкти",
  
  learningObjectives: [
    "Створювати класи",
    "Створювати об'єкти (екземпляри)",
    "Розуміти атрибути та методи",
    "Використовувати конструктор __init__"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-04-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке об'єктно-орієнтоване програмування?",
        content: `**Об'єктно-орієнтоване програмування (ООП)** - це спосіб організації коду, де ми групуємо дані та функції разом у об'єкти.

**Аналогія з реальним світом:**
Уявіть автомобіль. Автомобіль має:
- **Властивості (атрибути)**: колір, марка, швидкість
- **Дії (методи)**: їхати, гальмувати, сигналити

У Python ми можемо створити "шаблон" автомобіля (клас) та створювати конкретні автомобілі (об'єкти).

**Основні поняття ООП:**
1. **Клас** - шаблон або опис об'єкта
2. **Об'єкт (екземпляр)** - конкретний приклад класу
3. **Атрибут** - змінна, що належить об'єкту
4. **Метод** - функція, що належить об'єкту

**Чому ООП корисне?**
- ✅ Організація коду
- ✅ Повторне використання
- ✅ Легше підтримувати
- ✅ Моделювання реального світу`
      },
      {
        title: "Створення класу",
        content: `**Синтаксис створення класу:**

\`\`\`python
class НазваКласу:
    # атрибути та методи класу
    pass
\`\`\`

**Приклад: Клас для представлення собаки**

\`\`\`python
class Dog:
    pass
\`\`\`

Це найпростіший клас. Він поки що нічого не робить, але ми можемо створити об'єкти цього класу.

**Створення об'єкта (екземпляра):**

\`\`\`python
# Створюємо об'єкт класу Dog
my_dog = Dog()
print(my_dog)  # <__main__.Dog object at 0x...>
\`\`\`

**Додавання атрибутів:**

\`\`\`python
class Dog:
    pass

# Створюємо об'єкт
my_dog = Dog()

# Додаємо атрибути
my_dog.name = "Рекс"
my_dog.age = 3
my_dog.breed = "Лабрадор"

print(my_dog.name)   # Рекс
print(my_dog.age)    # 3
print(my_dog.breed)  # Лабрадор
\`\`\``
      },
      {
        title: "Конструктор __init__",
        content: `**__init__** - це спеціальний метод, який викликається автоматично при створенні об'єкта.

**Синтаксис:**

\`\`\`python
class НазваКласу:
    def __init__(self, параметр1, параметр2):
        self.атрибут1 = параметр1
        self.атрибут2 = параметр2
\`\`\`

**self** - це посилання на сам об'єкт. Завжди перший параметр у методах класу.

**Приклад: Клас Dog з __init__**

\`\`\`python
class Dog:
    def __init__(self, name, age, breed):
        self.name = name
        self.age = age
        self.breed = breed

# Створюємо об'єкти
dog1 = Dog("Рекс", 3, "Лабрадор")
dog2 = Dog("Барбос", 5, "Овчарка")

print(dog1.name)   # Рекс
print(dog2.name)    # Барбос
print(dog1.age)     # 3
print(dog2.age)     # 5
\`\`\`

**Переваги __init__:**
- ✅ Автоматична ініціалізація
- ✅ Гарантія, що об'єкт має всі необхідні атрибути
- ✅ Зручніше створювати об'єкти`
      },
      {
        title: "Методи класу",
        content: `**Метод** - це функція, що належить об'єкту. Вона завжди має параметр **self**.

**Синтаксис:**

\`\`\`python
class НазваКласу:
    def метод(self, параметри):
        # код методу
        pass
\`\`\`

**Приклад: Клас Dog з методами**

\`\`\`python
class Dog:
    def __init__(self, name, age, breed):
        self.name = name
        self.age = age
        self.breed = breed
    
    def bark(self):
        print(f"{self.name} гавкає: Гав-гав!")
    
    def get_info(self):
        return f"{self.name}, {self.age} років, порода: {self.breed}"
    
    def have_birthday(self):
        self.age += 1
        print(f"{self.name} тепер {self.age} років!")

# Створюємо об'єкт
my_dog = Dog("Рекс", 3, "Лабрадор")

# Викликаємо методи
my_dog.bark()                    # Рекс гавкає: Гав-гав!
print(my_dog.get_info())         # Рекс, 3 років, порода: Лабрадор
my_dog.have_birthday()           # Рекс тепер 4 років!
\`\`\`

**Важливо:**
- Методи завжди мають 'self' як перший параметр
- 'self' дозволяє доступ до атрибутів об'єкта
- Методи викликаються через об'єкт: 'об'єкт.метод()'`
      },
      {
        title: "Практичний приклад: Клас Student",
        content: `**Створимо клас для представлення студента:**

\`\`\`python
class Student:
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade
        self.subjects = []  # Початковий порожній список
    
    def add_subject(self, subject):
        self.subjects.append(subject)
        print(f"{self.name} додав предмет: {subject}")
    
    def get_info(self):
        info = f"Студент: {self.name}, {self.age} років, клас: {self.grade}"
        if self.subjects:
            subjects_str = ', '.join(self.subjects)
            info += f"\\nПредмети: {subjects_str}"
        return info
    
    def study(self, subject):
        print(f"{self.name} вивчає {subject}")

# Створюємо студентів
student1 = Student("Олексій", 15, 9)
student2 = Student("Марія", 16, 10)

# Додаємо предмети
student1.add_subject("Математика")
student1.add_subject("Фізика")
student2.add_subject("Історія")

# Викликаємо методи
print(student1.get_info())
student1.study("Математика")
\`\`\`

**Результат:**
\`\`\`
Олексій додав предмет: Математика
Олексій додав предмет: Фізика
Марія додав предмет: Історія
Студент: Олексій, 15 років, клас: 9
Предмети: Математика, Фізика
Олексій вивчає Математика
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий клас",
      code: `# Створення простого класу
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"Привіт, мене звати {self.name}, мені {self.age} років")

# Створюємо об'єкти
person1 = Person("Олена", 20)
person2 = Person("Іван", 25)

# Викликаємо метод
person1.introduce()  # Привіт, мене звати Олена, мені 20 років
person2.introduce()  # Привіт, мене звати Іван, мені 25 років`,
      explanation: "Демонструє базовий клас з конструктором та методом."
    },
    {
      title: "Приклад 2: Клас Rectangle (Прямокутник)",
      code: `# Клас для представлення прямокутника
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    def get_info(self):
        return f"Прямокутник: ширина={self.width}, висота={self.height}"

# Створюємо прямокутники
rect1 = Rectangle(5, 3)
rect2 = Rectangle(10, 4)

print(rect1.get_info())
print(f"Площа: {rect1.area()}")
print(f"Периметр: {rect1.perimeter()}")`,
      explanation: "Показує клас з методами, що обчислюють значення."
    },
    {
      title: "Приклад 3: Клас Book (Книга)",
      code: `# Клас для представлення книги
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
        self.is_read = False
    
    def read(self):
        if not self.is_read:
            self.is_read = True
            print(f"Ви прочитали '{self.title}'")
        else:
            print(f"Ви вже читали '{self.title}'")
    
    def get_info(self):
        status = "прочитана" if self.is_read else "не прочитана"
        return f"'{self.title}' від {self.author}, {self.pages} сторінок ({status})"

# Створюємо книги
book1 = Book("Гаррі Поттер", "Дж. Роулінг", 320)
book2 = Book("Війна і мир", "Л. Толстой", 1200)

print(book1.get_info())
book1.read()
print(book1.get_info())`,
      explanation: "Демонструє клас з булевим атрибутом та умовною логікою в методах."
    },
    {
      title: "Приклад 4: Клас BankAccount (Банківський рахунок)",
      code: `# Клас для представлення банківського рахунку
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.balance = initial_balance
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Поповнено {amount} грн. Баланс: {self.balance} грн")
        else:
            print("Сума має бути додатньою!")
    
    def withdraw(self, amount):
        if amount > 0:
            if amount <= self.balance:
                self.balance -= amount
                print(f"Знято {amount} грн. Баланс: {self.balance} грн")
            else:
                print("Недостатньо коштів!")
        else:
            print("Сума має бути додатньою!")
    
    def get_balance(self):
        return self.balance

# Створюємо рахунок
account = BankAccount("Олексій", 1000)
account.deposit(500)
account.withdraw(200)
print(f"Поточний баланс: {account.get_balance()} грн")`,
      explanation: "Показує клас з методами, що змінюють стан об'єкта та перевіряють умови."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути про self в методах",
      explanation: "self - обов'язковий перший параметр у всіх методах класу.",
      correctApproach: "Завжди додавай self як перший параметр: def method(self, ...)"
    },
    {
      mistake: "Забути викликати __init__ при створенні об'єкта",
      explanation: "__init__ викликається автоматично, не потрібно викликати його вручну.",
      correctApproach: "Просто створюй об'єкт: obj = ClassName(параметри) - __init__ викличеться автоматично"
    },
    {
      mistake: "Плутати клас та об'єкт",
      explanation: "Клас - це шаблон, об'єкт - це конкретний екземпляр класу.",
      correctApproach: "Спочатку створюй клас, потім створюй об'єкти цього класу"
    },
    {
      mistake: "Не ініціалізувати атрибути в __init__",
      explanation: "Атрибути, які потрібні об'єкту, мають бути ініціалізовані в __init__.",
      correctApproach: "Визначай всі необхідні атрибути в __init__: self.атрибут = значення"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **ООП** - спосіб організації коду через об'єкти
2. **Клас** - шаблон для створення об'єктів
3. **Об'єкт (екземпляр)** - конкретний приклад класу
4. **__init__** - конструктор, що викликається при створенні об'єкта
5. **self** - посилання на сам об'єкт
6. **Атрибути** - змінні, що належать об'єкту
7. **Методи** - функції, що належать об'єкту

Тепер ви вмієте створювати класи та об'єкти в Python!

Наступний урок - атрибути та методи класу!`,
  
  practiceTask: {
    title: "Створення класу Car (Автомобіль)",
    description: "Створіть клас для представлення автомобіля",
    problemStatement: `Напишіть програму, яка:
1. Створює клас Car з атрибутами:
   - brand (марка)
   - model (модель)
   - year (рік)
   - speed (швидкість, початково 0)
2. Додає методи:
   - accelerate(amount) - збільшує швидкість на amount
   - brake(amount) - зменшує швидкість на amount (не менше 0)
   - get_info() - повертає інформацію про автомобіль
3. Створює 2 об'єкти та тестує методи`,
    outputFormat: `Приклад виведення:
Автомобіль: Toyota Camry 2020, швидкість: 0 км/год
Автомобіль: Toyota Camry 2020, швидкість: 50 км/год
Автомобіль: Toyota Camry 2020, швидкість: 30 км/год`,
    examples: [
      {
        output: `Автомобіль: Toyota Camry 2020, швидкість: 0 км/год
Автомобіль: Toyota Camry 2020, швидкість: 50 км/год
Автомобіль: Toyota Camry 2020, швидкість: 30 км/год`,
        explanation: "Програма створює клас Car та демонструє роботу з методами"
      }
    ],
    solution: {
      code: `# Клас Car
class Car:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
        self.speed = 0
    
    def accelerate(self, amount):
        self.speed += amount
    
    def brake(self, amount):
        self.speed -= amount
        if self.speed < 0:
            self.speed = 0
    
    def get_info(self):
        return f"Автомобіль: {self.brand} {self.model} {self.year}, швидкість: {self.speed} км/год"

# Створюємо об'єкти
car1 = Car("Toyota", "Camry", 2020)
car2 = Car("BMW", "X5", 2021)

# Тестуємо
print(car1.get_info())
car1.accelerate(50)
print(car1.get_info())
car1.brake(20)
print(car1.get_info())`,
      explanation: "Рішення використовує клас з __init__, методами та атрибутами для управління станом об'єкта."
    },
    hints: [
      "Використовуй __init__ для ініціалізації атрибутів",
      "Не забудь про self у всіх методах",
      "У методі brake перевіряй, щоб швидкість не була від'ємною",
      "Метод get_info повертає рядок з інформацією",
      "Використовуй f-strings для форматування"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке клас в Python?",
        options: [
          "Шаблон для створення об'єктів",
          "Змінна",
          "Функція",
          "Модуль"
        ],
        correctAnswer: 0,
        explanation: "Клас - це шаблон або опис, за яким створюються об'єкти."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Person:\n    def __init__(self, name):\n        self.name = name\n\np = Person('Олексій')\nprint(p.name)\n```",
        options: [
          "Олексій",
          "name",
          "Помилку",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Код створює об'єкт Person з ім'ям 'Олексій' та виводить його."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод викликається автоматично при створенні об'єкта?",
        options: [
          "__init__",
          "__str__",
          "__main__",
          "constructor"
        ],
        correctAnswer: 0,
        explanation: "__init__ - це конструктор, який викликається автоматично при створенні об'єкта."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nclass Dog:\n    def bark(name):\n        print(f'{name} гавкає')\n```",
        options: [
          "Відсутній параметр self",
          "Неправильна назва методу",
          "Неправильний синтаксис print",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "У методах класу завжди має бути параметр self як перший параметр."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке self в методах класу?",
        options: [
          "Посилання на сам об'єкт",
          "Назва класу",
          "Змінна",
          "Функція"
        ],
        correctAnswer: 0,
        explanation: "self - це посилання на конкретний об'єкт, для якого викликається метод."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки об'єктів створюється в цьому коді?\n\n```python\nclass Book:\n    def __init__(self, title):\n        self.title = title\n\nbook1 = Book('Книга 1')\nbook2 = Book('Книга 2')\nbook3 = Book('Книга 1')\n```",
        options: [
          "3",
          "2",
          "1",
          "0"
        ],
        correctAnswer: 0,
        explanation: "Створюється 3 об'єкти класу Book, навіть якщо деякі мають однакові значення атрибутів."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}