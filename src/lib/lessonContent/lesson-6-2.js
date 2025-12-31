/**
 * Lesson 6-2: Атрибути та методи класу
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_2 = {
  lessonId: "lesson-6-2",
  moduleId: "module-6",
  order: 2,
  title: "Атрибути та методи класу",
  
  learningObjectives: [
    "Створювати методи екземпляра",
    "Використовувати методи класу (@classmethod)",
    "Застосовувати статичні методи (@staticmethod)",
    "Розуміти різницю між типами методів",
    "Працювати з атрибутами класу та екземпляра"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-6-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Типи методів в Python",
        content: `**У Python є три типи методів:**

1. **Методи екземпляра** — працюють з конкретним об'єктом
2. **Методи класу (@classmethod)** — працюють з класом
3. **Статичні методи (@staticmethod)** — незалежні функції

**Коли який використовувати?**
- **Метод екземпляра** — коли потрібен доступ до об'єкта (self)
- **@classmethod** — коли потрібен доступ до класу (cls) або альтернативні конструктори
- **@staticmethod** — коли не потрібен доступ ні до об'єкта, ні до класу`
      },
      {
        title: "Методи екземпляра",
        content: `**Методи екземпляра** — працюють з конкретним об'єктом (завжди мають self).

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):  # Метод екземпляра
        return f"Я {self.name}, мені {self.age} років"
    
    def have_birthday(self):  # Метод екземпляра
        self.age += 1

student = Student("Олександр", 15)
print(student.introduce())  # Виклик методу екземпляра
\`\`\`

**Характеристики:**
- Завжди приймають \`self\` як перший параметр
- Мають доступ до атрибутів об'єкта через \`self\`
- Викликаються через об'єкт: \`obj.method()\`
- Найпоширеніший тип методів

**Приклад:**
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):  # Метод екземпляра
        self.balance += amount
    
    def withdraw(self, amount):  # Метод екземпляра
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("Недостатньо коштів!")

account = BankAccount("Олександр", 1000)
account.deposit(500)  # Виклик методу екземпляра
\`\`\``
      },
      {
        title: "Методи класу (@classmethod)",
        content: `**@classmethod** — метод, який працює з класом, а не з об'єктом.

\`\`\`python
class Student:
    total_students = 0  # Атрибут класу
    
    def __init__(self, name):
        self.name = name
        Student.total_students += 1
    
    @classmethod
    def get_total(cls):  # cls — посилання на клас
        return cls.total_students
    
    @classmethod
    def create_from_string(cls, data_string):
        # Альтернативний конструктор
        # "Олександр,15" -> Student("Олександр", 15)
        name, age = data_string.split(",")
        return cls(name, int(age))

# Використання
print(Student.get_total())  # 0
student1 = Student("Олександр")
print(Student.get_total())  # 1

student2 = Student.create_from_string("Марія,16")
print(student2.name)  # Марія
\`\`\`

**Характеристики:**
- Приймає \`cls\` (посилання на клас) як перший параметр
- Має доступ до атрибутів класу
- Може викликатися через клас або об'єкт
- Використовується для альтернативних конструкторів

**Коли використовувати:**
- Альтернативні конструктори
- Робота з атрибутами класу
- Фабричні методи
- Методи, які потребують доступу до класу`
      },
      {
        title: "Статичні методи (@staticmethod)",
        content: `**@staticmethod** — метод, який не потребує self або cls.

\`\`\`python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b
    
    @staticmethod
    def multiply(a, b):
        return a * b
    
    @staticmethod
    def is_even(number):
        return number % 2 == 0

# Виклик без створення об'єкта
result = MathUtils.add(5, 3)  # 8
result2 = MathUtils.multiply(4, 2)  # 8
print(MathUtils.is_even(10))  # True

# Або через об'єкт
utils = MathUtils()
result3 = utils.add(10, 5)  # 15
\`\`\`

**Характеристики:**
- Не приймає \`self\` або \`cls\`
- Не має доступу до об'єкта або класу
- Може викликатися через клас або об'єкт
- Працює як звичайна функція, але логічно належить класу

**Коли використовувати:**
- Утилітарні функції, пов'язані з класом
- Функції, які не потребують доступу до self або cls
- Логіка, яка логічно належить класу, але не залежить від стану

**Приклад:**
\`\`\`python
class DateUtils:
    @staticmethod
    def is_valid_date(year, month, day):
        """Перевіряє, чи дата валідна."""
        if month < 1 or month > 12:
            return False
        if day < 1 or day > 31:
            return False
        return True
    
    @staticmethod
    def is_leap_year(year):
        """Перевіряє, чи рік високосний."""
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

print(DateUtils.is_valid_date(2024, 2, 29))  # True
print(DateUtils.is_leap_year(2024))  # True
\`\`\``
      },
      {
        title: "Порівняння типів методів",
        content: `**Порівняння:**

| Тип | Перший параметр | Доступ до об'єкта | Доступ до класу | Використання |
|-----|----------------|-------------------|-----------------|--------------|
| Метод екземпляра | \`self\` | ✅ Так | ❌ Ні | Робота з об'єктом |
| @classmethod | \`cls\` | ❌ Ні | ✅ Так | Робота з класом |
| @staticmethod | Немає | ❌ Ні | ❌ Ні | Утилітарні функції |

**Приклад всіх типів в одному класі:**
\`\`\`python
class Student:
    school = "SmartCode Academy"  # Атрибут класу
    total = 0
    
    def __init__(self, name, age):
        self.name = name  # Атрибут екземпляра
        self.age = age
        Student.total += 1
    
    def introduce(self):  # Метод екземпляра
        return f"Я {self.name}, навчаюся в {Student.school}"
    
    @classmethod
    def get_total(cls):  # Метод класу
        return cls.total
    
    @classmethod
    def create_default(cls):  # Альтернативний конструктор
        return cls("Новий студент", 15)
    
    @staticmethod
    def is_adult(age):  # Статичний метод
        return age >= 18

student1 = Student("Олександр", 15)
print(student1.introduce())  # Метод екземпляра
print(f"Всього студентів: {Student.get_total()}")  # Метод класу
print(f"Дорослий: {Student.is_adult(20)}")  # Статичний метод
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
print(Student.school)   # SmartCode Academy
\`\`\`

**Зміна атрибутів:**
\`\`\`python
class Student:
    school = "SmartCode Academy"
    
    def __init__(self, name):
        self.name = name

student1 = Student("Олександр")
student2 = Student("Марія")

# Зміна атрибута класу впливає на всі об'єкти
Student.school = "Нова школа"
print(student1.school)  # Нова школа
print(student2.school)  # Нова школа

# Але якщо змінити через об'єкт, створюється новий атрибут екземпляра
student1.school = "Інша школа"
print(student1.school)  # Інша школа
print(student2.school)  # Нова школа (не змінився!)
\`\`\`

**Коли використовувати:**
- **Атрибути екземпляра** — для унікальних даних кожного об'єкта
- **Атрибути класу** — для спільних даних, констант, лічильників`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Різні типи методів",
      code: `class Student:
    school = "SmartCode Academy"
    total = 0
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Student.total += 1
    
    def introduce(self):  # Метод екземпляра
        return f"Я {self.name}, навчаюся в {Student.school}"
    
    @classmethod
    def get_total(cls):
        return cls.total
    
    @classmethod
    def create_default(cls):
        return cls("Новий студент", 15)
    
    @staticmethod
    def is_adult(age):
        return age >= 18

student1 = Student("Олександр", 15)
print(student1.introduce())
print(f"Всього студентів: {Student.get_total()}")
print(f"Дорослий: {Student.is_adult(20)}")`,
      explanation: "Демонструє всі типи методів в одному класі."
    },
    {
      title: "Приклад 2: Альтернативний конструктор",
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    @classmethod
    def from_tuple(cls, coords):
        """Створює точку з кортежу."""
        return cls(coords[0], coords[1])
    
    @classmethod
    def origin(cls):
        """Створює точку в початку координат."""
        return cls(0, 0)
    
    def __str__(self):
        return f"Point({self.x}, {self.y})"

# Різні способи створення
p1 = Point(3, 4)
p2 = Point.from_tuple((5, 6))
p3 = Point.origin()

print(p1)  # Point(3, 4)
print(p2)  # Point(5, 6)
print(p3)  # Point(0, 0)`,
      explanation: "Показує використання @classmethod для альтернативних конструкторів."
    },
    {
      title: "Приклад 3: Статичні методи для утиліт",
      code: `class StringUtils:
    @staticmethod
    def reverse(text):
        return text[::-1]
    
    @staticmethod
    def is_palindrome(text):
        cleaned = text.lower().replace(" ", "")
        return cleaned == cleaned[::-1]
    
    @staticmethod
    def count_words(text):
        return len(text.split())

text = "А роза упала на лапу Азора"
print(StringUtils.reverse(text))
print(StringUtils.is_palindrome(text))
print(StringUtils.count_words(text))`,
      explanation: "Демонструє використання @staticmethod для утилітарних функцій."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між @classmethod та @staticmethod",
      explanation: "@classmethod отримує cls, @staticmethod не отримує ні self, ні cls. Легко переплутати, коли використовувати.",
      correctApproach: "Використовуйте @classmethod для роботи з класом (альтернативні конструктори, доступ до атрибутів класу), @staticmethod для утиліт, які не потребують доступу до класу або об'єкта."
    },
    {
      mistake: "Використання @classmethod замість @staticmethod",
      explanation: "Якщо метод не потребує доступу до класу, використання @classmethod зайве.",
      correctApproach: "@staticmethod для незалежних функцій, @classmethod для роботи з класом."
    },
    {
      mistake: "Зміна атрибута класу через об'єкт",
      explanation: "Якщо змінити атрибут класу через об'єкт (obj.attr = value), створюється новий атрибут екземпляра, а не змінюється атрибут класу.",
      correctApproach: "Змінюйте атрибути класу через клас: ClassName.attr = value, а не через об'єкт."
    },
    {
      mistake: "Забути cls в @classmethod",
      explanation: "Без cls не можна отримати доступ до класу та його атрибутів.",
      correctApproach: "Завжди використовуйте cls як перший параметр в @classmethod: @classmethod def method(cls, ...):"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Методи екземпляра** — працюють з об'єктом (self)
2. **@classmethod** — працюють з класом (cls)
3. **@staticmethod** — незалежні функції
4. **Атрибути екземпляра** — унікальні для кожного об'єкта
5. **Атрибути класу** — спільні для всіх об'єктів

**Коли використовувати:**
- Метод екземпляра — для роботи з об'єктом
- @classmethod — для альтернативних конструкторів, роботи з класом
- @staticmethod — для утилітарних функцій

**Важливо:**
- self — для методів екземпляра
- cls — для методів класу
- Нічого — для статичних методів

Різні типи методів для різних потреб!`,
  
  practiceTask: {
    title: "Клас Rectangle з різними методами",
    description: "Створіть клас з методами різних типів",
    problemStatement: `Створіть клас Rectangle з наступними вимогами:

**Атрибути:**
- width (ширина) — атрибут екземпляра
- height (висота) — атрибут екземпляра
- total_rectangles (загальна кількість) — атрибут класу

**Методи екземпляра:**
- area() — повертає площу
- perimeter() — повертає периметр
- is_square() — повертає True, якщо це квадрат

**@classmethod:**
- create_square(side) — створює квадрат (width == height)
- get_total() — повертає загальну кількість прямокутників

**@staticmethod:**
- is_valid(width, height) — перевіряє, чи додатні значення
- compare_areas(rect1, rect2) — порівнює площі двох прямокутників

**Додатково:**
- Використовуйте @staticmethod для валідації в __init__
- Збільшуйте total_rectangles при створенні нового об'єкта

**Створіть кілька об'єктів та продемонструйте роботу всіх методів.**`,
    inputFormat: "Створіть клас та продемонструйте всі методи",
    outputFormat: `Приклад виведення:
Прямокутник: 5x3
Площа: 15
Периметр: 16
Це квадрат: False

Квадрат: 4x4
Площа: 16
Це квадрат: True

Всього прямокутників: 2`,
    examples: [
      {
        input: "Створення прямокутника та квадрата",
        output: "Всі методи працюють коректно",
        explanation: "Демонстрація різних типів методів"
      }
    ],
    solution: {
      code: `class Rectangle:
    total_rectangles = 0  # Атрибут класу
    
    def __init__(self, width, height):
        if not Rectangle.is_valid(width, height):
            raise ValueError("Ширина та висота мають бути додатніми")
        self.width = width
        self.height = height
        Rectangle.total_rectangles += 1
    
    def area(self):  # Метод екземпляра
        return self.width * self.height
    
    def perimeter(self):  # Метод екземпляра
        return 2 * (self.width + self.height)
    
    def is_square(self):  # Метод екземпляра
        return self.width == self.height
    
    @classmethod
    def create_square(cls, side):
        """Альтернативний конструктор для квадрата."""
        return cls(side, side)
    
    @classmethod
    def get_total(cls):
        """Повертає загальну кількість прямокутників."""
        return cls.total_rectangles
    
    @staticmethod
    def is_valid(width, height):
        """Перевіряє, чи значення валідні."""
        return width > 0 and height > 0
    
    @staticmethod
    def compare_areas(rect1, rect2):
        """Порівнює площі двох прямокутників."""
        area1 = rect1.area()
        area2 = rect2.area()
        if area1 > area2:
            return f"Перший прямокутник більший ({area1} > {area2})"
        elif area2 > area1:
            return f"Другий прямокутник більший ({area2} > {area1})"
        else:
            return f"Прямокутники рівні ({area1} = {area2})"
    
    def __str__(self):
        shape = "квадрат" if self.is_square() else "прямокутник"
        return f"{shape}: {self.width}x{self.height}"

# Використання
rect = Rectangle(5, 3)
print(rect)
print(f"Площа: {rect.area()}")
print(f"Периметр: {rect.perimeter()}")
print(f"Це квадрат: {rect.is_square()}")

# Створення квадрата через classmethod
square = Rectangle.create_square(4)
print(f"\\n{square}")
print(f"Площа: {square.area()}")
print(f"Це квадрат: {square.is_square()}")

# Використання staticmethod
print(f"\\nВалідність (5, 3): {Rectangle.is_valid(5, 3)}")
print(f"Валідність (-1, 3): {Rectangle.is_valid(-1, 3)}")

# Порівняння площ
print(f"\\n{Rectangle.compare_areas(rect, square)}")

# Використання classmethod
print(f"\\nВсього прямокутників: {Rectangle.get_total()}")`,
      explanation: "Рішення демонструє всі типи методів та атрибутів в одному класі."
    },
    hints: [
      "Використовуйте @classmethod для альтернативного конструктора",
      "@staticmethod для валідації та утиліт",
      "Збільшуйте total_rectangles в __init__",
      "Використовуйте self для методів екземпляра"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр отримує @classmethod?",
        options: ["self", "cls", "obj", "Ніякого"],
        correctAnswer: 1,
        explanation: "@classmethod отримує cls (посилання на клас) як перший параметр."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: @staticmethod def add(a,b): return a+b; Math.add(2,3)?",
        options: ["5", "Помилку", "None", "add"],
        correctAnswer: 0,
        explanation: "@staticmethod дозволяє викликати метод без створення об'єкта, результат 2+3=5."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між атрибутом класу та екземпляра?",
        options: ["Немає різниці", "Атрибут класу спільний для всіх об'єктів", "Атрибут екземпляра спільний", "Всі однакові"],
        correctAnswer: 1,
        explanation: "Атрибут класу спільний для всіх об'єктів, атрибут екземпляра унікальний для кожного об'єкта."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати @staticmethod?",
        options: ["Завжди", "Коли потрібен доступ до об'єкта", "Коли не потрібен доступ ні до об'єкта, ні до класу", "Ніколи"],
        correctAnswer: 2,
        explanation: "@staticmethod використовується для утилітарних функцій, які не потребують доступу до об'єкта або класу."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
