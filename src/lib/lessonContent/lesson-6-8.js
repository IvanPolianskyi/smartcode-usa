/**
 * Lesson 6-8: Статичні та класові методи
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_8 = {
  lessonId: "lesson-6-8",
  moduleId: "module-6",
  order: 8,
  title: "Статичні та класові методи",
  
  learningObjectives: [
    "Розуміти різницю між статичними та класовими методами",
    "Використовувати @staticmethod",
    "Застосовувати @classmethod",
    "Вибирати правильний тип методу",
    "Застосовувати на практиці"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-6-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд типів методів",
        content: `**У Python є три типи методів:**

1. **Методи екземпляра** — працюють з об'єктом (self)
2. **Методи класу (@classmethod)** — працюють з класом (cls)
3. **Статичні методи (@staticmethod)** — незалежні функції

**Порівняння:**

| Тип | Перший параметр | Доступ до об'єкта | Доступ до класу | Використання |
|-----|----------------|-------------------|-----------------|--------------|
| Метод екземпляра | \`self\` | ✅ Так | ❌ Ні | Робота з об'єктом |
| @classmethod | \`cls\` | ❌ Ні | ✅ Так | Робота з класом |
| @staticmethod | Немає | ❌ Ні | ❌ Ні | Утилітарні функції |

**Коли який використовувати?**
- **Метод екземпляра** — коли потрібен доступ до об'єкта
- **@classmethod** — коли потрібен доступ до класу або альтернативні конструктори
- **@staticmethod** — коли не потрібен доступ ні до об'єкта, ні до класу`
      },
      {
        title: "@classmethod детально",
        content: `**@classmethod** — метод, який працює з класом, а не з об'єктом.

**Основні випадки використання:**

**1. Альтернативні конструктори:**
\`\`\`python
class Point:
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
    
    @classmethod
    def from_polar(cls, radius, angle):
        """Створює точку з полярних координат."""
        import math
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)
        return cls(x, y)

# Різні способи створення
p1 = Point(3, 4)
p2 = Point.from_tuple((5, 6))
p3 = Point.origin()
p4 = Point.from_polar(5, 0.785)
\`\`\`

**2. Робота з атрибутами класу:**
\`\`\`python
class Student:
    total_students = 0
    
    def __init__(self, name):
        self.name = name
        Student.total_students += 1
    
    @classmethod
    def get_total(cls):
        return cls.total_students
    
    @classmethod
    def reset_counter(cls):
        cls.total_students = 0

print(Student.get_total())  # 0
Student("Олександр")
print(Student.get_total())  # 1
\`\`\`

**3. Фабричні методи:**
\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    @classmethod
    def create_dog(cls, name):
        return cls(f"Собака {name}")
    
    @classmethod
    def create_cat(cls, name):
        return cls(f"Кіт {name}")

dog = Animal.create_dog("Рекс")
cat = Animal.create_cat("Мурка")
\`\`\``
      },
      {
        title: "@staticmethod детально",
        content: `**@staticmethod** — метод, який не потребує self або cls.

**Основні випадки використання:**

**1. Утилітарні функції:**
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
print(MathUtils.is_even(10))  # True
\`\`\`

**2. Валідація:**
\`\`\`python
class EmailValidator:
    @staticmethod
    def is_valid(email):
        return "@" in email and "." in email
    
    @staticmethod
    def normalize(email):
        return email.lower().strip()

if EmailValidator.is_valid("test@example.com"):
    normalized = EmailValidator.normalize("TEST@EXAMPLE.COM")
\`\`\`

**3. Конвертація:**
\`\`\`python
class TemperatureConverter:
    @staticmethod
    def celsius_to_fahrenheit(celsius):
        return celsius * 9/5 + 32
    
    @staticmethod
    def fahrenheit_to_celsius(fahrenheit):
        return (fahrenheit - 32) * 5/9

temp_f = TemperatureConverter.celsius_to_fahrenheit(25)
temp_c = TemperatureConverter.fahrenheit_to_celsius(77)
\`\`\`

**Коли використовувати:**
- Функції, логічно пов'язані з класом
- Не потребують доступу до об'єкта або класу
- Можна викликати без створення об'єкта`
      },
      {
        title: "Порівняння та вибір",
        content: `**Коли використовувати @classmethod:**
- Альтернативні конструктори
- Робота з атрибутами класу
- Фабричні методи
- Методи, які потребують доступу до класу

**Коли використовувати @staticmethod:**
- Утилітарні функції
- Валідація
- Конвертація
- Функції, які не потребують доступу до класу або об'єкта

**Приклад з усіма типами:**
\`\`\`python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    def is_today(self):  # Метод екземпляра
        from datetime import datetime
        today = datetime.now()
        return (self.year == today.year and 
                self.month == today.month and 
                self.day == today.day)
    
    @classmethod
    def today(cls):  # Альтернативний конструктор
        from datetime import datetime
        now = datetime.now()
        return cls(now.year, now.month, now.day)
    
    @staticmethod
    def is_leap_year(year):  # Утилітарна функція
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

date1 = Date(2024, 1, 15)
date2 = Date.today()  # @classmethod
print(Date.is_leap_year(2024))  # @staticmethod
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Система обліку замовлень**
\`\`\`python
class Order:
    order_count = 0
    
    def __init__(self, customer, items):
        self.customer = customer
        self.items = items
        Order.order_count += 1
        self.order_id = Order.order_count
    
    @classmethod
    def get_total_orders(cls):
        return cls.order_count
    
    @classmethod
    def create_empty(cls, customer):
        return cls(customer, [])
    
    @staticmethod
    def calculate_total(items):
        return sum(item['price'] * item['quantity'] for item in items)

order1 = Order("Олександр", [{"name": "Книга", "price": 100, "quantity": 2}])
order2 = Order.create_empty("Марія")
total = Order.calculate_total(order1.items)
\`\`\`

**Приклад 2: Валідація даних**
\`\`\`python
class UserValidator:
    @staticmethod
    def is_valid_email(email):
        return "@" in email and "." in email.split("@")[1]
    
    @staticmethod
    def is_valid_age(age):
        return 0 <= age <= 150
    
    @staticmethod
    def normalize_username(username):
        return username.lower().strip()

if UserValidator.is_valid_email("test@example.com"):
    username = UserValidator.normalize_username("  USERNAME  ")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Альтернативні конструктори",
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    @classmethod
    def from_tuple(cls, coords):
        return cls(coords[0], coords[1])
    
    @classmethod
    def origin(cls):
        return cls(0, 0)
    
    def __str__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(3, 4)
p2 = Point.from_tuple((5, 6))
p3 = Point.origin()
print(p1, p2, p3)`,
      explanation: "Демонструє альтернативні конструктори через @classmethod."
    },
    {
      title: "Приклад 2: Утилітарні функції",
      code: `class StringUtils:
    @staticmethod
    def reverse(text):
        return text[::-1]
    
    @staticmethod
    def is_palindrome(text):
        cleaned = text.lower().replace(" ", "")
        return cleaned == cleaned[::-1]

text = "А роза упала на лапу Азора"
print(StringUtils.reverse(text))
print(StringUtils.is_palindrome(text))`,
      explanation: "Показує використання @staticmethod для утилітарних функцій."
    },
    {
      title: "Приклад 3: Комбінація всіх типів",
      code: `class BankAccount:
    interest_rate = 0.05  # Атрибут класу
    
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):  # Метод екземпляра
        self.balance += amount
    
    @classmethod
    def set_interest_rate(cls, rate):
        cls.interest_rate = rate
    
    @classmethod
    def create_premium(cls, owner):
        account = cls(owner, 10000)
        cls.set_interest_rate(0.1)
        return account
    
    @staticmethod
    def calculate_interest(principal, rate, years):
        return principal * rate * years

account = BankAccount.create_premium("Олександр")
interest = BankAccount.calculate_interest(1000, 0.05, 2)`,
      explanation: "Демонструє комбінацію всіх типів методів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання @classmethod замість @staticmethod",
      explanation: "Якщо метод не потребує доступу до класу, використання @classmethod зайве.",
      correctApproach: "Використовуйте @staticmethod для незалежних функцій, @classmethod тільки коли потрібен доступ до класу."
    },
    {
      mistake: "Використання @staticmethod замість звичайної функції",
      explanation: "Якщо функція не пов'язана з класом, краще зробити її звичайною функцією поза класом.",
      correctApproach: "Використовуйте @staticmethod тільки якщо функція логічно належить класу."
    },
    {
      mistake: "Забути cls в @classmethod",
      explanation: "Без cls не можна отримати доступ до класу та його атрибутів.",
      correctApproach: "Завжди використовуйте cls як перший параметр в @classmethod."
    }
  ],
  
  summary: `На цьому уроці ми детально вивчили:

1. **@classmethod** — працює з класом (cls)
2. **@staticmethod** — незалежні функції
3. **Альтернативні конструктори** — через @classmethod
4. **Утилітарні функції** — через @staticmethod
5. **Вибір правильного типу** — залежить від потреб

**Коли використовувати:**
- @classmethod — альтернативні конструктори, робота з класом
- @staticmethod — утилітарні функції, валідація, конвертація

**Важливо:**
- cls для @classmethod
- Нічого для @staticmethod
- Вибирайте правильний тип залежно від потреб

Правильний вибір типу методу робить код більш зрозумілим та ефективним!`,
  
  practiceTask: {
    title: "Створення класу з різними типами методів",
    description: "Створіть клас з методами екземпляра, класу та статичними",
    problemStatement: `Створіть клас Time з різними типами методів:

**Атрибути:**
- hours, minutes, seconds

**Методи екземпляра:**
- __init__(hours, minutes, seconds) — конструктор з валідацією
- add_seconds(seconds) — додає секунди
- to_seconds() — конвертує в секунди
- __str__() — повертає "HH:MM:SS"

**@classmethod:**
- from_seconds(total_seconds) — створює Time з загальної кількості секунд
- midnight() — створює Time(0, 0, 0)
- noon() — створює Time(12, 0, 0)

**@staticmethod:**
- is_valid_time(hours, minutes, seconds) — перевіряє валідність
- time_difference(time1, time2) — обчислює різницю в секундах

**Вимоги:**
- Валідуйте hours (0-23), minutes (0-59), seconds (0-59)
- Використовуйте @staticmethod для валідації
- Використовуйте @classmethod для альтернативних конструкторів

**Створіть об'єкти різними способами та продемонструйте всі методи.**`,
    inputFormat: "Створіть клас та об'єкти",
    outputFormat: `Приклад виведення:
12:30:45
Після додавання 30 секунд: 12:31:15
З секунд: 3661 -> 01:01:01
Північ: 00:00:00
Полудень: 12:00:00`,
    examples: [
      {
        input: "Time.from_seconds(3661)",
        output: "Time(1, 1, 1)",
        explanation: "Демонстрація альтернативного конструктора"
      }
    ],
    solution: {
      code: `class Time:
    def __init__(self, hours, minutes, seconds):
        if not Time.is_valid_time(hours, minutes, seconds):
            raise ValueError("Некоректний час!")
        self.hours = hours
        self.minutes = minutes
        self.seconds = seconds
    
    def add_seconds(self, seconds):
        """Додає секунди до часу."""
        total = self.to_seconds() + seconds
        # Обробка переповнення
        total = total % (24 * 3600)  # Обмежуємо до 24 годин
        return Time.from_seconds(total)
    
    def to_seconds(self):
        """Конвертує час в секунди."""
        return self.hours * 3600 + self.minutes * 60 + self.seconds
    
    def __str__(self):
        return f"{self.hours:02d}:{self.minutes:02d}:{self.seconds:02d}"
    
    @classmethod
    def from_seconds(cls, total_seconds):
        """Створює Time з загальної кількості секунд."""
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        return cls(hours, minutes, seconds)
    
    @classmethod
    def midnight(cls):
        """Створює час півночі."""
        return cls(0, 0, 0)
    
    @classmethod
    def noon(cls):
        """Створює час полудня."""
        return cls(12, 0, 0)
    
    @staticmethod
    def is_valid_time(hours, minutes, seconds):
        """Перевіряє валідність часу."""
        return (0 <= hours <= 23 and 
                0 <= minutes <= 59 and 
                0 <= seconds <= 59)
    
    @staticmethod
    def time_difference(time1, time2):
        """Обчислює різницю між двома часами в секундах."""
        return abs(time1.to_seconds() - time2.to_seconds())

# Використання
time1 = Time(12, 30, 45)
print(time1)

time2 = time1.add_seconds(30)
print(f"Після додавання 30 секунд: {time2}")

time3 = Time.from_seconds(3661)
print(f"З секунд: 3661 -> {time3}")

midnight = Time.midnight()
noon = Time.noon()
print(f"Північ: {midnight}")
print(f"Полудень: {noon}")

# Використання staticmethod
diff = Time.time_difference(time1, time2)
print(f"Різниця: {diff} секунд")`,
      explanation: "Рішення демонструє всі типи методів в одному класі."
    },
    hints: [
      "Використовуйте @staticmethod для валідації",
      "Використовуйте @classmethod для альтернативних конструкторів",
      "Для from_seconds обчислюйте hours, minutes, seconds з total_seconds",
      "Не забудьте форматування для __str__ (02d для двозначних чисел)"
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
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати @staticmethod?",
        options: ["Коли потрібен доступ до об'єкта", "Коли не потрібен доступ ні до об'єкта, ні до класу", "Коли потрібен доступ до класу", "Завжди"],
        correctAnswer: 1,
        explanation: "@staticmethod використовується для утилітарних функцій, які не потребують доступу до об'єкта або класу."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: @classmethod def f(cls): return cls; print(A.f())?",
        options: ["<class '__main__.A'>", "Помилку", "None", "A"],
        correctAnswer: 0,
        explanation: "@classmethod повертає cls, який є посиланням на клас A."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

