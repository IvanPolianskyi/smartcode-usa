/**
 * Lesson 06-2: Атрибути та методи класу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_2 = {
  lessonId: "lesson-06-2",
  moduleId: "module-06",
  order: 2,
  title: "Атрибути та методи класу",
  
  learningObjectives: [
    "Створювати методи екземпляра",
    "Використовувати методи класу (@classmethod)",
    "Застосовувати статичні методи (@staticmethod)",
    "Розуміти різницю між типами методів"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-06-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Типи методів у класах",
        content: `У Python є три типи методів:

1. **Методи екземпляра** - працюють з конкретним об'єктом
2. **Методи класу** - працюють з класом в цілому
3. **Статичні методи** - не потребують доступу до класу або об'єкта

**Методи екземпляра (instance methods):**
- Мають 'self' як перший параметр
- Працюють з атрибутами конкретного об'єкта
- Викликаються через об'єкт: 'obj.method()'

**Методи класу (class methods):**
- Мають 'cls' як перший параметр
- Позначаються декоратором '@classmethod'
- Працюють з класом, а не з об'єктом
- Викликаються через клас: 'Class.method()' або 'obj.method()'

**Статичні методи (static methods):**
- Не мають 'self' або 'cls'
- Позначаються декоратором '@staticmethod'
- Не мають доступу до класу або об'єкта
- Викликаються через клас або об'єкт`
      },
      {
        title: "Методи екземпляра",
        content: `**Методи екземпляра** - це звичайні методи, які ми вже вивчили.

**Приклад:**

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grades = []
    
    # Метод екземпляра
    def add_grade(self, grade):
        self.grades.append(grade)
    
    # Метод екземпляра
    def get_average(self):
        if len(self.grades) == 0:
            return 0
        return sum(self.grades) / len(self.grades)
    
    # Метод екземпляра
    def get_info(self):
        return f"{self.name}, {self.age} років, середній бал: {self.get_average()}"

# Використання
student = Student("Олексій", 15)
student.add_grade(5)
student.add_grade(4)
student.add_grade(5)

print(student.get_info())  # Олексій, 15 років, середній бал: 4.67
\`\`\`

**Особливості:**
- Завжди мають 'self' як перший параметр
- Мають доступ до всіх атрибутів об'єкта через 'self'
- Можуть змінювати стан об'єкта`
      },
      {
        title: "Методи класу (@classmethod)",
        content: `**Методи класу** використовуються для роботи з класом в цілому, а не з конкретним об'єктом.

**Синтаксис:**

\`\`\`python
class НазваКласу:
    @classmethod
    def метод_класу(cls, параметри):
        # код
        pass
\`\`\`

**Приклад: Створення об'єктів різними способами**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    @classmethod
    def from_birth_year(cls, name, birth_year):
        # Створює об'єкт на основі року народження
        current_year = 2024
        age = current_year - birth_year
        return cls(name, age)  # cls - це сам клас Person
    
    def get_info(self):
        return f"{self.name}, {self.age} років"

# Звичайний спосіб
person1 = Person("Олексій", 20)

# Через метод класу
person2 = Person.from_birth_year("Марія", 2005)

print(person1.get_info())  # Олексій, 20 років
print(person2.get_info())  # Марія, 19 років
\`\`\`

**Коли використовувати:**
- Коли потрібно створити об'єкт альтернативним способом
- Коли потрібна інформація про клас, а не про об'єкт
- Для підрахунку кількості створених об'єктів`
      },
      {
        title: "Статичні методи (@staticmethod)",
        content: `**Статичні методи** - це методи, які не потребують доступу до класу або об'єкта.

**Синтаксис:**

\`\`\`python
class НазваКласу:
    @staticmethod
    def статичний_метод(параметри):
        # код
        pass
\`\`\`

**Приклад: Допоміжні функції**

\`\`\`python
class MathHelper:
    @staticmethod
    def is_even(number):
        return number % 2 == 0
    
    @staticmethod
    def is_positive(number):
        return number > 0
    
    @staticmethod
    def max_of_three(a, b, c):
        return max(a, b, c)

# Виклик через клас
print(MathHelper.is_even(4))      # True
print(MathHelper.is_positive(-5)) # False
print(MathHelper.max_of_three(1, 5, 3))  # 5

# Можна викликати через об'єкт (якщо він є)
helper = MathHelper()
print(helper.is_even(7))  # False
\`\`\`

**Коли використовувати:**
- Для допоміжних функцій, пов'язаних з класом логічно
- Коли метод не потребує доступу до 'self' або 'cls'
- Для організації коду, пов'язаного з класом`
      },
      {
        title: "Порівняння типів методів",
        content: `**Порівняльна таблиця:**

| Тип методу | Декоратор | Перший параметр | Доступ до | Виклик |
|------------|-----------|-----------------|-----------|--------|
| Метод екземпляра | немає | 'self' | об'єкта | 'obj.method()' |
| Метод класу | '@classmethod' | 'cls' | класу | 'Class.method()' або 'obj.method()' |
| Статичний метод | '@staticmethod' | немає | немає | 'Class.method()' або 'obj.method()' |

**Практичний приклад:**

\`\`\`python
class Counter:
    total_count = 0  # Атрибут класу
    
    def __init__(self, name):
        self.name = name
        Counter.total_count += 1
        self.count = 0
    
    # Метод екземпляра
    def increment(self):
        self.count += 1
    
    # Метод класу
    @classmethod
    def get_total_count(cls):
        return cls.total_count
    
    # Статичний метод
    @staticmethod
    def is_valid_name(name):
        return len(name) > 0 and name.isalnum()

# Використання
if Counter.is_valid_name("counter1"):
    c1 = Counter("counter1")
    c2 = Counter("counter2")
    
    c1.increment()
    c1.increment()
    c2.increment()
    
    print(f"c1: {c1.count}")  # c1: 2
    print(f"c2: {c2.count}")  # c2: 1
    print(f"Всього створено: {Counter.get_total_count()}")  # Всього створено: 2
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Методи екземпляра",
      code: `# Методи екземпляра
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return self.balance
        else:
            return "Недостатньо коштів"
    
    def get_balance(self):
        return self.balance

account = BankAccount("Олексій", 1000)
print(account.deposit(500))   # 1500
print(account.withdraw(200))  # 1300
print(account.get_balance())   # 1300`,
      explanation: "Демонструє методи екземпляра, які працюють з конкретним об'єктом."
    },
    {
      title: "Приклад 2: Метод класу для альтернативного створення",
      code: `# Метод класу
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @classmethod
    def from_square(cls, side):
        # Створює квадрат (прямокутник з рівними сторонами)
        return cls(side, side)
    
    @classmethod
    def from_string(cls, dimensions):
        # Створює з рядка "5x3"
        width, height = map(int, dimensions.split('x'))
        return cls(width, height)
    
    def area(self):
        return self.width * self.height

# Різні способи створення
rect1 = Rectangle(5, 3)
rect2 = Rectangle.from_square(4)  # Квадрат 4x4
rect3 = Rectangle.from_string("6x2")

print(rect1.area())  # 15
print(rect2.area())  # 16
print(rect3.area())  # 12`,
      explanation: "Показує методи класу для альтернативних способів створення об'єктів."
    },
    {
      title: "Приклад 3: Статичні методи",
      code: `# Статичні методи
class StringUtils:
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

# Використання
print(StringUtils.reverse("Привіт"))  # тівірП
print(StringUtils.is_palindrome("Анна"))  # True
print(StringUtils.count_words("Привіт світ"))  # 2`,
      explanation: "Демонструє статичні методи для допоміжних функцій."
    },
    {
      title: "Приклад 4: Комбінація всіх типів методів",
      code: `# Комбінація всіх типів
class Student:
    total_students = 0
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grades = []
        Student.total_students += 1
    
    # Метод екземпляра
    def add_grade(self, grade):
        self.grades.append(grade)
    
    # Метод класу
    @classmethod
    def get_total_count(cls):
        return cls.total_students
    
    # Статичний метод
    @staticmethod
    def is_valid_grade(grade):
        return 1 <= grade <= 12

# Використання
student1 = Student("Олексій", 15)
student2 = Student("Марія", 16)

if Student.is_valid_grade(5):
    student1.add_grade(5)
if Student.is_valid_grade(12):
    student1.add_grade(12)

print(f"Всього студентів: {Student.get_total_count()}")  # Всього студентів: 2
print(f"Оцінки {student1.name}: {student1.grades}")  # Оцінки Олексій: [5, 12]`,
      explanation: "Показує комбінацію всіх трьох типів методів в одному класі."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутати @classmethod та @staticmethod",
      explanation: "@classmethod має доступ до класу через cls, @staticmethod - ні.",
      correctApproach: "Використовуй @classmethod коли потрібен доступ до класу, @staticmethod коли не потрібен"
    },
    {
      mistake: "Забути про cls в методах класу",
      explanation: "У методах класу перший параметр має називатися cls (або інша назва, але зазвичай cls).",
      correctApproach: "Завжди використовуй cls як перший параметр в @classmethod: @classmethod def method(cls, ...)"
    },
    {
      mistake: "Використовувати self в статичних методах",
      explanation: "Статичні методи не мають доступу до self або cls.",
      correctApproach: "Не використовуй self або cls в @staticmethod методах"
    },
    {
      mistake: "Використовувати @staticmethod замість звичайної функції",
      explanation: "Якщо функція не пов'язана з класом, краще зробити її звичайною функцією поза класом.",
      correctApproach: "Використовуй @staticmethod тільки коли функція логічно пов'язана з класом"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Методи екземпляра** - працюють з конкретним об'єктом (мають self)
2. **Методи класу** - працюють з класом (мають cls, позначені @classmethod)
3. **Статичні методи** - не потребують доступу до класу або об'єкта (позначені @staticmethod)
4. **Різниця між типами** - коли який тип використовувати
5. **Практичне застосування** - альтернативні конструктори, допоміжні функції

Тепер ви розумієте різні типи методів та коли їх використовувати!

Наступний урок - інкапсуляція та модифікатори доступу!`,
  
  practiceTask: {
    title: "Клас Calculator з різними типами методів",
    description: "Створіть клас Calculator з методами різних типів",
    problemStatement: `Напишіть програму, яка:
1. Створює клас Calculator з:
   - Атрибутом класу: operation_count = 0
   - Методом екземпляра: calculate(a, b, operation) - виконує операцію та збільшує operation_count
   - Методом класу: get_total_operations(cls) - повертає загальну кількість операцій
   - Статичним методом: is_valid_operation(op) - перевіряє чи операція валідна ('+', '-', '*', '/')
2. Створює 2 об'єкти та виконує операції
3. Виводить загальну кількість операцій`,
    outputFormat: `Приклад виведення:
Результат: 15
Результат: 5
Всього операцій: 2`,
    examples: [
      {
        output: `Результат: 15
Результат: 5
Всього операцій: 2`,
        explanation: "Програма демонструє роботу з методами різних типів"
      }
    ],
    solution: {
      code: `# Клас Calculator
class Calculator:
    operation_count = 0
    
    def __init__(self, name):
        self.name = name
    
    def calculate(self, a, b, operation):
        if not Calculator.is_valid_operation(operation):
            return "Невірна операція"
        
        Calculator.operation_count += 1
        
        if operation == '+':
            result = a + b
        elif operation == '-':
            result = a - b
        elif operation == '*':
            result = a * b
        elif operation == '/':
            if b == 0:
                return "Ділення на нуль!"
            result = a / b
        
        return result
    
    @classmethod
    def get_total_operations(cls):
        return cls.operation_count
    
    @staticmethod
    def is_valid_operation(operation):
        return operation in ['+', '-', '*', '/']

# Створюємо об'єкти
calc1 = Calculator("Калькулятор 1")
calc2 = Calculator("Калькулятор 2")

# Виконуємо операції
print(f"Результат: {calc1.calculate(10, 5, '+')}")
print(f"Результат: {calc2.calculate(10, 5, '-')}")
print(f"Всього операцій: {Calculator.get_total_operations()}")`,
      explanation: "Рішення використовує методи екземпляра, класу та статичний метод для роботи з калькулятором."
    },
    hints: [
      "Використовуй @classmethod для get_total_operations",
      "Використовуй @staticmethod для is_valid_operation",
      "Збільшуй operation_count у методі calculate",
      "Перевіряй валідність операції перед виконанням",
      "Обробляй ділення на нуль"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який декоратор використовується для методів класу?",
        options: [
          "@classmethod",
          "@staticmethod",
          "@instancemethod",
          "@method"
        ],
        correctAnswer: 0,
        explanation: "@classmethod - декоратор для методів класу."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Test:\n    count = 0\n    \n    def __init__(self):\n        Test.count += 1\n    \n    @classmethod\n    def get_count(cls):\n        return cls.count\n\nt1 = Test()\nt2 = Test()\nprint(Test.get_count())\n```",
        options: [
          "2",
          "0",
          "1",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Створюється 2 об'єкти, тому count = 2."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який перший параметр має метод класу?",
        options: [
          "cls",
          "self",
          "class",
          "Немає параметрів"
        ],
        correctAnswer: 0,
        explanation: "Методи класу мають cls як перший параметр."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи правильний цей код?\n\n```python\nclass Math:\n    @staticmethod\n    def add(a, b):\n        return a + b\n\nresult = Math.add(5, 3)\n```",
        options: [
          "Так, код правильний",
          "Ні, потрібен self",
          "Ні, потрібен cls",
          "Ні, статичні методи не можна викликати через клас"
        ],
        correctAnswer: 0,
        explanation: "Статичні методи можна викликати через клас без self або cls."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати статичний метод?",
        options: [
          "Коли метод не потребує доступу до класу або об'єкта",
          "Коли потрібен доступ до self",
          "Коли потрібен доступ до cls",
          "Коли потрібно змінити стан об'єкта"
        ],
        correctAnswer: 0,
        explanation: "Статичні методи використовуються коли не потрібен доступ до класу або об'єкта."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nclass Test:\n    @classmethod\n    def method(self):\n        return self.count\n```",
        options: [
          "Параметр має називатися cls, а не self",
          "Потрібен декоратор @staticmethod",
          "Потрібен return",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "У методах класу перший параметр зазвичай називається cls, а не self."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
