/**
 * Lesson 5-1: Класи та об'єкти
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_1 = {
  lessonId: "lesson-5-1",
  moduleId: "module-5",
  order: 1,
  title: "Класи та об'єкти",
  
  learningObjectives: [
    "Створювати класи",
    "Створювати об'єкти (екземпляри)",
    "Розуміти атрибути та методи",
    "Використовувати конструктор __init__"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-4-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке класи та об'єкти?",
        content: `**Клас** — це шаблон (blueprint) для створення об'єктів.
**Об'єкт** — це конкретний екземпляр класу.

**Аналогія:** Клас = форма для печива, Об'єкт = конкретне печиво

**Приклад:**
- Клас: \`Student\` (студент)
- Об'єкти: Олександр (студент), Марія (студент), Дмитро (студент)

**Чому ООП?**
- **Організація коду** — логічне групування
- **Повторне використання** — один клас, багато об'єктів
- **Моделювання реального світу** — об'єкти як в житті`
      },
      {
        title: "Створення класу",
        content: `**Базовий клас:**
\`\`\`python
class Student:
    pass  # Порожній клас

# Створення об'єкта
student1 = Student()
student2 = Student()
\`\`\`

**Клас з атрибутами:**
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Створення об'єктів
student1 = Student("Олександр", 15)
student2 = Student("Марія", 16)

print(student1.name)  # Олександр
print(student2.age)   # 16
\`\`\`

**Що таке self?**
- \`self\` — посилання на поточний об'єкт
- Завжди перший параметр методів
- Python автоматично передає self`
      },
      {
        title: "Конструктор __init__",
        content: `**__init__** — спеціальний метод, який викликається при створенні об'єкта.

\`\`\`python
class Student:
    def __init__(self, name, age, course):
        self.name = name
        self.age = age
        self.course = course
        print(f"Створено студента: {name}")

# При створенні об'єкта автоматично викликається __init__
student = Student("Олександр", 15, "Python")
# Виведе: Створено студента: Олександр
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
        content: `**Методи** — функції всередині класу, які працюють з об'єктами.

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Привіт, я {self.name}, мені {self.age} років"
    
    def have_birthday(self):
        self.age += 1
        print(f"{self.name} тепер {self.age} років!")

# Використання
student = Student("Олександр", 15)
print(student.introduce())  # Привіт, я Олександр, мені 15 років
student.have_birthday()     # Олександр тепер 16 років!
\`\`\`

**Важливо:** Методи завжди приймають \`self\` як перший параметр!`
      },
      {
        title: "Атрибути класу та екземпляра",
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
print(Student.school)  # SmartCode Academy
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
    school = "SmartCode Academy"
    total_students = 0
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Student.total_students += 1
    
    @classmethod
    def get_total_students(cls):
        return cls.total_students

student1 = Student("Олександр", 15)
student2 = Student("Марія", 16)

print(f"Школа: {Student.school}")
print(f"Всього студентів: {Student.get_total_students()}")`,
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

account = BankAccount("Олександр", 1000)
account.deposit(500)
account.withdraw(200)
print(f"Поточний баланс: {account.get_balance()}")`,
      explanation: "Демонструє клас з бізнес-логікою та валідацією."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути self в методах",
      explanation: "Без self Python не знає, з яким об'єктом працювати.",
      correctApproach: "Завжди додавайте self як перший параметр методів."
    },
    {
      mistake: "Плутанина між атрибутами класу та екземпляра",
      explanation: "Атрибути класу спільні, атрибути екземпляра унікальні.",
      correctApproach: "self.attr для екземпляра, ClassName.attr або cls.attr для класу."
    },
    {
      mistake: "Виклик методу без self",
      explanation: "Методи завжди викликаються через об'єкт: obj.method(), не Class.method().",
      correctApproach: "student.introduce(), а не Student.introduce(student)."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Класи** — шаблони для створення об'єктів
2. **Об'єкти** — конкретні екземпляри класів
3. **__init__** — конструктор, ініціалізує об'єкт
4. **self** — посилання на поточний об'єкт
5. **Методи** — функції всередині класу
6. **Атрибути** — дані об'єкта (екземпляра або класу)

ООП допомагає організувати код та моделювати реальний світ!`,
  
  practiceTask: {
    title: "Створення класу Book",
    description: "Створіть клас для представлення книги",
    problemStatement: `Створіть клас Book з наступними вимогами:

**Атрибути:**
- title (назва)
- author (автор)
- year (рік видання)
- pages (кількість сторінок)
- is_read (чи прочитана, за замовчуванням False)

**Методи:**
- __init__(title, author, year, pages) — конструктор
- read() — позначає книгу як прочитану
- get_info() — повертає інформацію про книгу
- is_long() — повертає True, якщо більше 300 сторінок

**Створіть кілька об'єктів та продемонструйте роботу методів.**`,
    inputFormat: "Створіть клас та об'єкти в коді",
    outputFormat: `Приклад виведення:
Книга: "Python Basics"
Автор: Олександр
Рік: 2024
Сторінок: 250
Прочитана: False
Довга книга: False`,
    examples: [
      {
        input: "Створення об'єкта Book",
        output: "Об'єкт створено, методи працюють",
        explanation: "Демонстрація роботи з класом та об'єктами"
      }
    ],
    solution: {
      code: `class Book:
    def __init__(self, title, author, year, pages):
        self.title = title
        self.author = author
        self.year = year
        self.pages = pages
        self.is_read = False
    
    def read(self):
        self.is_read = True
        print(f"Книгу '{self.title}' прочитано!")
    
    def get_info(self):
        return {
            "title": self.title,
            "author": self.author,
            "year": self.year,
            "pages": self.pages,
            "is_read": self.is_read
        }
    
    def is_long(self):
        return self.pages > 300
    
    def __str__(self):
        status = "прочитана" if self.is_read else "не прочитана"
        return f'"{self.title}" ({self.author}, {self.year}) - {status}'

# Створення об'єктів
book1 = Book("Python Basics", "Олександр", 2024, 250)
book2 = Book("Advanced Python", "Марія", 2024, 450)

# Використання методів
print(book1)
print(f"Довга книга: {book1.is_long()}")

book1.read()
print(book1)

print(f"\\n{book2.title}: {book2.pages} сторінок")
print(f"Довга книга: {book2.is_long()}")`,
      explanation: "Рішення демонструє повний клас з усіма вимогами та використання об'єктів."
    },
    hints: [
      "Використовуйте self для доступу до атрибутів",
      "Методи повинні приймати self як перший параметр",
      "is_long() повертає булеве значення"
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
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

