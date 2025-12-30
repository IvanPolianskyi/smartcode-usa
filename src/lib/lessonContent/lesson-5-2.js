/**
 * Lesson 5-2: Методи та властивості
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_2 = {
  lessonId: "lesson-5-2",
  moduleId: "module-5",
  order: 2,
  title: "Методи та властивості",
  
  learningObjectives: [
    "Створювати методи екземпляра",
    "Використовувати методи класу (@classmethod)",
    "Застосовувати статичні методи (@staticmethod)",
    "Використовувати property декоратор"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-5-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
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

**Важливо:** Методи екземпляра завжди приймають \`self\` як перший параметр.`
      },
      {
        title: "Методи класу (@classmethod)",
        content: `**@classmethod** — метод, який працює з класом, а не з об'єктом.

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
    def create_from_string(cls, data_string):
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

**Коли використовувати:**
- Альтернативні конструктори
- Робота з атрибутами класу
- Фабричні методи`
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

# Виклик без створення об'єкта
result = MathUtils.add(5, 3)  # 8
result2 = MathUtils.multiply(4, 2)  # 8

# Або через об'єкт
utils = MathUtils()
result3 = utils.add(10, 5)  # 15
\`\`\`

**Коли використовувати:**
- Утилітарні функції, пов'язані з класом
- Функції, які не потребують доступу до self або cls
- Логіка, яка логічно належить класу, але не залежить від стану`
      },
      {
        title: "Property декоратор",
        content: `**@property** — перетворює метод в атрибут, який можна читати як змінну.

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius  # Приватний атрибут
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним")
        self._radius = value
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.radius)  # 5 (викликається метод, але виглядає як атрибут)
print(circle.area)    # 78.54 (обчислюється автоматично)

circle.radius = 10    # Викликається setter
print(circle.area)    # 314.159
\`\`\`

**Переваги:**
- Валідація при встановленні значення
- Обчислення на льоту
- Інкапсуляція (приховування внутрішньої реалізації)`
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
      title: "Приклад 2: Property",
      code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Температура не може бути нижче абсолютного нуля")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(f"{temp.celsius}°C = {temp.fahrenheit}°F")
temp.celsius = 30
print(f"Нова температура: {temp.celsius}°C")`,
      explanation: "Показує використання property для валідації та обчислень."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутанина між @classmethod та @staticmethod",
      explanation: "@classmethod отримує cls, @staticmethod не отримує ні self, ні cls.",
      correctApproach: "Використовуйте @classmethod для роботи з класом, @staticmethod для утиліт."
    },
    {
      mistake: "Забути @property перед getter",
      explanation: "Без @property метод не можна викликати як атрибут.",
      correctApproach: "Завжди додавайте @property перед getter методом."
    },
    {
      mistake: "Використання @classmethod замість @staticmethod",
      explanation: "Якщо метод не потребує доступу до класу, використовуйте @staticmethod.",
      correctApproach: "@staticmethod для незалежних функцій, @classmethod для роботи з класом."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Методи екземпляра** — працюють з об'єктом (self)
2. **@classmethod** — працюють з класом (cls)
3. **@staticmethod** — незалежні функції
4. **@property** — методи як атрибути
5. **@setter** — валідація при встановленні значення

Різні типи методів для різних потреб!`,
  
  practiceTask: {
    title: "Клас Rectangle з різними методами",
    description: "Створіть клас з методами різних типів",
    problemStatement: `Створіть клас Rectangle з наступними вимогами:

**Атрибути:**
- width (ширина)
- height (висота)

**Методи екземпляра:**
- area() — повертає площу
- perimeter() — повертає периметр

**@classmethod:**
- create_square(side) — створює квадрат (width == height)

**@staticmethod:**
- is_valid(width, height) — перевіряє, чи додатні значення

**@property:**
- area (тільки для читання) — повертає площу
- is_square — True, якщо це квадрат`,
    inputFormat: "Створіть клас та продемонструйте всі методи",
    outputFormat: `Приклад виведення:
Прямокутник: 5x3
Площа: 15
Периметр: 16
Це квадрат: False`,
    examples: [
      {
        input: "Створення прямокутника та квадрата",
        output: "Всі методи працюють коректно",
        explanation: "Демонстрація різних типів методів"
      }
    ],
    solution: {
      code: `class Rectangle:
    def __init__(self, width, height):
        if not Rectangle.is_valid(width, height):
            raise ValueError("Ширина та висота мають бути додатніми")
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    @classmethod
    def create_square(cls, side):
        return cls(side, side)
    
    @staticmethod
    def is_valid(width, height):
        return width > 0 and height > 0
    
    @property
    def area_property(self):
        return self.width * self.height
    
    @property
    def is_square(self):
        return self.width == self.height
    
    def __str__(self):
        shape = "квадрат" if self.is_square else "прямокутник"
        return f"{shape}: {self.width}x{self.height}"

# Використання
rect = Rectangle(5, 3)
print(rect)
print(f"Площа (метод): {rect.area()}")
print(f"Площа (property): {rect.area_property}")
print(f"Периметр: {rect.perimeter()}")
print(f"Це квадрат: {rect.is_square}")

# Створення квадрата через classmethod
square = Rectangle.create_square(4)
print(f"\\n{square}")
print(f"Це квадрат: {square.is_square}")

# Використання staticmethod
print(f"\\nВалідність (5, 3): {Rectangle.is_valid(5, 3)}")
print(f"Валідність (-1, 3): {Rectangle.is_valid(-1, 3)}")`,
      explanation: "Рішення демонструє всі типи методів та property в одному класі."
    },
    hints: [
      "Використовуйте @classmethod для альтернативного конструктора",
      "@staticmethod для валідації",
      "@property для обчислюваних атрибутів"
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
        question: "Для чого використовується @property?",
        options: ["Створення методів", "Перетворення методів в атрибути", "Валідація", "Всі вище"],
        correctAnswer: 3,
        explanation: "@property дозволяє викликати метод як атрибут, з можливістю валідації через setter."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

