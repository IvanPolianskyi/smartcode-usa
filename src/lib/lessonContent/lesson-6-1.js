/**
 * Lesson 6-1: Основи ООП: класи та об'єкти
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_1 = {
  lessonId: "lesson-6-1",
  moduleId: "module-6",
  order: 1,
  title: "Основи ООП: класи та об'єкти",
  
  learningObjectives: [
    "Створювати класи",
    "Створювати об'єкти (екземпляри)",
    "Розуміти атрибути та методи",
    "Використовувати конструктор __init__",
    "Розуміти концепцію ООП"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-5-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке ООП?",
        content: `**ООП (Об'єктно-Орієнтоване Програмування)** — парадигма програмування, яка організує код навколо об'єктів.

**Основні концепції ООП:**
1. **Класи** — шаблони для створення об'єктів
2. **Об'єкти** — конкретні екземпляри класів
3. **Інкапсуляція** — приховування деталей реалізації
4. **Наслідування** — створення нових класів на основі існуючих
5. **Поліморфізм** — різні об'єкти можуть реагувати на одну команду по-різному

**Аналогія:**
- **Клас** = форма для печива (шаблон)
- **Об'єкт** = конкретне печиво (екземпляр)
- **Атрибути** = властивості (наприклад, колір, форма)
- **Методи** = дії (наприклад, "випікати", "прикрашати")

**Приклад з життя:**
- Клас: \`Student\` (студент)
- Об'єкти: Олександр (студент), Марія (студент), Дмитро (студент)
- Атрибути: ім'я, вік, курс
- Методи: вчитися(), здавати_екзамен()`
      },
      {
        title: "Що таке клас?",
        content: `**Клас** — це шаблон (blueprint) для створення об'єктів.

**Створення класу:**
\`\`\`python
class Student:
    pass  # Порожній клас
\`\`\`

**Клас з атрибутами та методами:**
\`\`\`python
class Student:
    # Атрибути класу (спільні для всіх об'єктів)
    school = "SmartCode Academy"
    
    # Метод (функція всередині класу)
    def introduce(self):
        return f"Привіт, я студент {self.school}"
\`\`\`

**Що може містити клас:**
- **Атрибути** — дані (змінні)
- **Методи** — функції (дії)
- **Конструктор** — спеціальний метод для ініціалізації

**Важливо:** Клас — це лише опис, він не виконує дії сам по собі. Для роботи потрібно створити об'єкт!`
      },
      {
        title: "Що таке об'єкт?",
        content: `**Об'єкт (екземпляр)** — це конкретний приклад класу.

**Створення об'єкта:**
\`\`\`python
class Student:
    pass

# Створення об'єктів
student1 = Student()  # student1 — це об'єкт класу Student
student2 = Student()  # student2 — це інший об'єкт класу Student
\`\`\`

**Кожен об'єкт унікальний:**
\`\`\`python
student1 = Student()
student2 = Student()

print(student1)  # <__main__.Student object at 0x...>
print(student2)  # <__main__.Student object at 0x...>
print(student1 == student2)  # False (різні об'єкти)
\`\`\`

**Атрибути об'єкта:**
\`\`\`python
student1 = Student()
student1.name = "Олександр"  # Додаємо атрибут об'єкту
student1.age = 15

student2 = Student()
student2.name = "Марія"
student2.age = 16

print(student1.name)  # Олександр
print(student2.name)  # Марія
\`\`\`

**Важливо:** Кожен об'єкт має свої власні атрибути, незалежні від інших об'єктів!`
      },
      {
        title: "Конструктор __init__",
        content: `**__init__** — спеціальний метод, який автоматично викликається при створенні об'єкта.

**Синтаксис:**
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Створено студента: {name}")

# При створенні об'єкта автоматично викликається __init__
student = Student("Олександр", 15)
# Виведе: Створено студента: Олександр
\`\`\`

**Що таке self?**
- \`self\` — посилання на поточний об'єкт
- Завжди перший параметр методів
- Python автоматично передає self
- Через self ми отримуємо доступ до атрибутів об'єкта

**Приклад:**
\`\`\`python
class Student:
    def __init__(self, name, age, course):
        self.name = name      # self.name — атрибут об'єкта
        self.age = age        # self.age — атрибут об'єкта
        self.course = course  # self.course — атрибут об'єкта

student1 = Student("Олександр", 15, "Python")
student2 = Student("Марія", 16, "Python")

print(student1.name)   # Олександр
print(student2.name)   # Марія
print(student1.course)  # Python
\`\`\`

**Значення за замовчуванням:**
\`\`\`python
class Student:
    def __init__(self, name, age=15, course="Python"):
        self.name = name
        self.age = age
        self.course = course

# Можна не вказувати всі параметри
student1 = Student("Олександр")  # age=15, course="Python"
student2 = Student("Марія", 16)  # course="Python"
student3 = Student("Дмитро", 15, "Web")
\`\`\``
      },
      {
        title: "Методи класу",
        content: `**Методи** — це функції всередині класу, які працюють з об'єктами.

**Створення методу:**
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):  # Метод завжди приймає self
        return f"Привіт, я {self.name}, мені {self.age} років"
    
    def have_birthday(self):
        self.age += 1
        print(f"{self.name} тепер {self.age} років!")

# Використання
student = Student("Олександр", 15)
print(student.introduce())  # Привіт, я Олександр, мені 15 років
student.have_birthday()     # Олександр тепер 16 років!
\`\`\`

**Важливо:**
- Методи завжди приймають \`self\` як перший параметр
- Викликаються через об'єкт: \`obj.method()\`
- Мають доступ до атрибутів об'єкта через \`self\`

**Приклад з кількома методами:**
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        """Поповнити рахунок."""
        self.balance += amount
        print(f"Додано {amount}. Баланс: {self.balance}")
    
    def withdraw(self, amount):
        """Зняти з рахунку."""
        if amount <= self.balance:
            self.balance -= amount
            print(f"Знято {amount}. Баланс: {self.balance}")
        else:
            print("Недостатньо коштів!")
    
    def get_balance(self):
        """Отримати баланс."""
        return self.balance

account = BankAccount("Олександр", 1000)
account.deposit(500)   # Додано 500. Баланс: 1500
account.withdraw(200)  # Знято 200. Баланс: 1300
print(account.get_balance())  # 1300
\`\`\``
      },
      {
        title: "Атрибути класу vs атрибути екземпляра",
        content: `**Атрибути екземпляра** — унікальні для кожного об'єкта:
\`\`\`python
class Student:
    def __init__(self, name):
        self.name = name  # Атрибут екземпляра

student1 = Student("Олександр")
student2 = Student("Марія")
print(student1.name)  # Олександр
print(student2.name)  # Марія
\`\`\`

**Атрибути класу** — спільні для всіх об'єктів:
\`\`\`python
class Student:
    school = "SmartCode Academy"  # Атрибут класу
    
    def __init__(self, name):
        self.name = name

student1 = Student("Олександр")
student2 = Student("Марія")

print(student1.school)  # SmartCode Academy
print(student2.school)  # SmartCode Academy
print(Student.school)   # SmartCode Academy (доступ через клас)
\`\`\`

**Коли використовувати:**
- **Атрибути екземпляра** — для унікальних даних кожного об'єкта
- **Атрибути класу** — для спільних даних всіх об'єктів

**Приклад:**
\`\`\`python
class Student:
    total_students = 0  # Атрибут класу (лічильник)
    
    def __init__(self, name):
        self.name = name  # Атрибут екземпляра
        Student.total_students += 1  # Збільшуємо лічильник

student1 = Student("Олександр")
student2 = Student("Марія")

print(Student.total_students)  # 2
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий клас",
      code: `class Student:
    def __init__(self, name, age, course):
        self.name = name
        self.age = age
        self.course = course
    
    def introduce(self):
        return f"Я {self.name}, {self.age} років, вивчаю {self.course}"
    
    def get_info(self):
        return {
            "name": self.name,
            "age": self.age,
            "course": self.course
        }

# Створення об'єктів
student1 = Student("Олександр", 15, "Python")
student2 = Student("Марія", 16, "Python")

print(student1.introduce())
print(student2.get_info())`,
      explanation: "Демонструє базовий клас з конструктором та методами."
    },
    {
      title: "Приклад 2: Атрибути класу",
      code: `class Student:
    school = "SmartCode Academy"  # Атрибут класу
    total_students = 0
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Student.total_students += 1
    
    def introduce(self):
        return f"Я {self.name}, навчаюся в {Student.school}"

student1 = Student("Олександр", 15)
student2 = Student("Марія", 16)

print(student1.introduce())
print(f"Всього студентів: {Student.total_students}")`,
      explanation: "Показує атрибути класу та підрахунок об'єктів."
    },
    {
      title: "Приклад 3: Складніший клас",
      code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Додано {amount}. Баланс: {self.balance}")
        else:
            print("Сума має бути додатньою!")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            print(f"Знято {amount}. Баланс: {self.balance}")
        else:
            print("Недостатньо коштів або невірна сума!")
    
    def get_balance(self):
        return self.balance
    
    def __str__(self):
        return f"Рахунок {self.owner}: {self.balance} грн"

account = BankAccount("Олександр", 1000)
account.deposit(500)
account.withdraw(200)
print(account)`,
      explanation: "Демонструє клас з бізнес-логікою та валідацією."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути self в методах",
      explanation: "Без self Python не знає, з яким об'єктом працювати. Метод не зможе отримати доступ до атрибутів об'єкта.",
      correctApproach: "Завжди додавайте self як перший параметр методів: def method(self, ...):"
    },
    {
      mistake: "Плутанина між атрибутами класу та екземпляра",
      explanation: "Атрибути класу спільні для всіх об'єктів, атрибути екземпляра унікальні для кожного об'єкта.",
      correctApproach: "self.attr для екземпляра, ClassName.attr або cls.attr для класу."
    },
    {
      mistake: "Виклик методу без self",
      explanation: "Методи завжди викликаються через об'єкт: obj.method(), не Class.method().",
      correctApproach: "student.introduce(), а не Student.introduce(student)."
    },
    {
      mistake: "Забути викликати __init__ при наслідуванні",
      explanation: "При створенні дочірнього класу потрібно викликати super().__init__() для ініціалізації батьківського класу.",
      correctApproach: "У дочірньому класі викликайте super().__init__(...) в __init__ методі."
    },
    {
      mistake: "Спроба використати атрибут до його створення",
      explanation: "Якщо атрибут не створено в __init__, спроба доступу викличе AttributeError.",
      correctApproach: "Завжди ініціалізуйте всі атрибути в __init__ методі."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **ООП** — парадигма програмування навколо об'єктів
2. **Класи** — шаблони для створення об'єктів
3. **Об'єкти** — конкретні екземпляри класів
4. **__init__** — конструктор, ініціалізує об'єкт
5. **self** — посилання на поточний об'єкт
6. **Методи** — функції всередині класу
7. **Атрибути** — дані об'єкта (екземпляра або класу)

**Основні принципи:**
- Клас = шаблон, Об'єкт = конкретний приклад
- self завжди перший параметр методів
- __init__ викликається автоматично при створенні об'єкта
- Атрибути екземпляра унікальні, атрибути класу спільні

ООП допомагає організувати код та моделювати реальний світ!`,
  
  practiceTask: {
    title: "Створення класу Book",
    description: "Створіть клас для представлення книги з методами та атрибутами",
    problemStatement: `Створіть клас Book з наступними вимогами:

**Атрибути:**
- title (назва) — обов'язковий
- author (автор) — обов'язковий
- year (рік видання) — обов'язковий
- pages (кількість сторінок) — обов'язковий
- is_read (чи прочитана) — за замовчуванням False
- rating (оцінка) — за замовчуванням None

**Методи:**
- __init__(title, author, year, pages) — конструктор
- read() — позначає книгу як прочитану
- set_rating(rating) — встановлює оцінку (від 1 до 10)
- get_info() — повертає словник з інформацією про книгу
- is_long() — повертає True, якщо більше 300 сторінок
- __str__() — повертає рядкове представлення книги

**Додатково:**
- Створіть атрибут класу total_books = 0
- Збільшуйте total_books при створенні нової книги
- Створіть метод класу get_total_books() для отримання загальної кількості

**Створіть кілька об'єктів та продемонструйте роботу всіх методів.**`,
    inputFormat: "Створіть клас та об'єкти в коді",
    outputFormat: `Приклад виведення:
Книга: "Python Basics" (Олександр, 2024) - 250 сторінок
Прочитана: False
Довга книга: False
Оцінка: None

Після читання:
Книгу 'Python Basics' прочитано!
Прочитана: True
Оцінка: 8

Всього книг: 2`,
    examples: [
      {
        input: "Створення об'єкта Book",
        output: "Об'єкт створено, методи працюють",
        explanation: "Демонстрація роботи з класом та об'єктами"
      }
    ],
    solution: {
      code: `class Book:
    total_books = 0  # Атрибут класу
    
    def __init__(self, title, author, year, pages):
        self.title = title
        self.author = author
        self.year = year
        self.pages = pages
        self.is_read = False
        self.rating = None
        Book.total_books += 1  # Збільшуємо лічильник
    
    def read(self):
        """Позначає книгу як прочитану."""
        self.is_read = True
        print(f"Книгу '{self.title}' прочитано!")
    
    def set_rating(self, rating):
        """Встановлює оцінку книги (від 1 до 10)."""
        if 1 <= rating <= 10:
            self.rating = rating
            print(f"Оцінка встановлена: {rating}")
        else:
            print("Оцінка має бути від 1 до 10!")
    
    def get_info(self):
        """Повертає інформацію про книгу."""
        return {
            "title": self.title,
            "author": self.author,
            "year": self.year,
            "pages": self.pages,
            "is_read": self.is_read,
            "rating": self.rating
        }
    
    def is_long(self):
        """Перевіряє, чи книга довга (>300 сторінок)."""
        return self.pages > 300
    
    def __str__(self):
        """Рядкове представлення книги."""
        status = "прочитана" if self.is_read else "не прочитана"
        rating_text = f", оцінка: {self.rating}" if self.rating else ""
        return f'"{self.title}" ({self.author}, {self.year}) - {self.pages} сторінок, {status}{rating_text}'
    
    @classmethod
    def get_total_books(cls):
        """Повертає загальну кількість книг."""
        return cls.total_books

# Створення об'єктів
book1 = Book("Python Basics", "Олександр", 2024, 250)
book2 = Book("Advanced Python", "Марія", 2024, 450)

# Використання методів
print(book1)
print(f"Довга книга: {book1.is_long()}")

book1.read()
book1.set_rating(8)
print(book1)

print(f"\\n{book2.title}: {book2.pages} сторінок")
print(f"Довга книга: {book2.is_long()}")

# Використання методу класу
print(f"\\nВсього книг: {Book.get_total_books()}")`,
      explanation: "Рішення демонструє повний клас з усіма вимогами, включаючи атрибути класу та методи."
    },
    hints: [
      "Використовуйте self для доступу до атрибутів",
      "Методи повинні приймати self як перший параметр",
      "is_long() повертає булеве значення",
      "Використовуйте @classmethod для методу класу",
      "Не забудьте збільшувати total_books в __init__"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке клас?",
        options: ["Конкретний об'єкт", "Шаблон для створення об'єктів", "Функція", "Змінна"],
        correctAnswer: 1,
        explanation: "Клас — це шаблон (blueprint) для створення об'єктів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: x=1; a=A(); print(a.x)?",
        options: ["1", "Помилку", "None", "A"],
        correctAnswer: 0,
        explanation: "a.x звертається до атрибута x об'єкта a, який успадковує значення 1 від класу."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке self?",
        options: ["Ключове слово", "Посилання на поточний об'єкт", "Метод", "Клас"],
        correctAnswer: 1,
        explanation: "self — це посилання на поточний об'єкт, завжди перший параметр методів."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class S: def __init__(self, n): self.n=n; s=S('test'); print(s.n)?",
        options: ["test", "Помилку", "None", "S"],
        correctAnswer: 0,
        explanation: "__init__ встановлює self.n = 'test', тому s.n поверне 'test'."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли викликається __init__?",
        options: ["При визначенні класу", "При створенні об'єкта", "При виклику методу", "Ніколи"],
        correctAnswer: 1,
        explanation: "__init__ автоматично викликається при створенні об'єкта: obj = ClassName()."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
