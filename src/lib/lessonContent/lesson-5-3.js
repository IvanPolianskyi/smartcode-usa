/**
 * Lesson 5-3: Наслідування
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_3 = {
  lessonId: "lesson-5-3",
  moduleId: "module-5",
  order: 3,
  title: "Наслідування",
  
  learningObjectives: [
    "Створювати дочірні класи",
    "Перевизначати методи",
    "Використовувати super()",
    "Розуміти MRO (Method Resolution Order)"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-5-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке наслідування?",
        content: `**Наслідування** — механізм, який дозволяє створювати нові класи на основі існуючих.

**Базовий клас (батьківський)** — клас, від якого наслідуються інші.
**Дочірній клас** — клас, який наслідує від базового.

**Переваги:**
- **Повторне використання коду** — не треба дублювати
- **Організація** — логічна ієрархія
- **Розширюваність** — легко додавати новий функціонал

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Якась тварина"

class Dog(Animal):  # Dog наслідує від Animal
    def speak(self):
        return f"{self.name} каже: Гав-гав!"

dog = Dog("Рекс")
print(dog.speak())  # Рекс каже: Гав-гав!
\`\`\``
      },
      {
        title: "Перевизначення методів",
        content: `Дочірній клас може **перевизначити** методи батьківського класу:

\`\`\`python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start(self):
        return "Транспорт запущено"
    
    def info(self):
        return f"{self.brand} {self.model}"

class Car(Vehicle):
    def start(self):  # Перевизначення методу
        return f"{self.brand} {self.model} заведено!"

class Bicycle(Vehicle):
    def start(self):  # Перевизначення методу
        return "Велосипед готовий до поїздки!"

car = Car("Toyota", "Camry")
bike = Bicycle("Giant", "Escape")

print(car.start())  # Toyota Camry заведено!
print(bike.start())  # Велосипед готовий до поїздки!
\`\`\``
      },
      {
        title: "super() - виклик батьківського методу",
        content: `**super()** — дозволяє викликати методи батьківського класу.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Я {self.name}, мені {self.age} років"

class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)  # Виклик батьківського __init__
        self.course = course
    
    def introduce(self):
        base_intro = super().introduce()  # Виклик батьківського методу
        return f"{base_intro}, вивчаю {self.course}"

student = Student("Олександр", 15, "Python")
print(student.introduce())
# Я Олександр, мені 15 років, вивчаю Python
\`\`\`

**Чому super()?**
- Не потрібно знати ім'я батьківського класу
- Працює з множинним наслідуванням
- Більш гнучкий підхід`
      },
      {
        title: "Множинне наслідування",
        content: `Python підтримує **множинне наслідування** — клас може наслідувати від кількох класів.

\`\`\`python
class Flyable:
    def fly(self):
        return "Літаю"

class Swimmable:
    def swim(self):
        return "Плаваю"

class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name

duck = Duck("Дональд")
print(duck.fly())   # Літаю
print(duck.swim())  # Плаваю
\`\`\`

**MRO (Method Resolution Order)** — порядок пошуку методів:
\`\`\`python
print(Duck.__mro__)
# (<class '__main__.Duck'>, <class '__main__.Flyable'>, <class '__main__.Swimmable'>, <class 'object'>)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове наслідування",
      code: `class Shape:
    def __init__(self, color):
        self.color = color
    
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, color, width, height):
        super().__init__(color)
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2

rect = Rectangle("червоний", 5, 3)
circle = Circle("синій", 4)

print(f"Прямокутник: {rect.area()}")
print(f"Коло: {circle.area()}")`,
      explanation: "Демонструє наслідування з перевизначенням методів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати super().__init__()",
      explanation: "Без super() батьківський клас не ініціалізується.",
      correctApproach: "Завжди викликайте super().__init__() в дочірньому класі."
    }
  ],
  
  summary: `Наслідування дозволяє створювати нові класи на основі існуючих, перевизначати методи та використовувати super() для доступу до батьківських методів.`,
  
  practiceTask: {
    title: "Ієрархія транспортних засобів",
    description: "Створіть ієрархію класів транспортних засобів",
    problemStatement: `Створіть базовий клас Vehicle та дочірні класи Car, Bicycle, Motorcycle з використанням наслідування та super().`,
    solution: {
      code: `class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
    
    def start(self):
        return "Транспорт запущено"
    
    def info(self):
        return f"{self.brand} {self.model} ({self.year})"

class Car(Vehicle):
    def __init__(self, brand, model, year, doors):
        super().__init__(brand, model, year)
        self.doors = doors
    
    def start(self):
        return f"{self.brand} {self.model} заведено!"

class Bicycle(Vehicle):
    def start(self):
        return "Велосипед готовий!"

car = Car("Toyota", "Camry", 2023, 4)
print(car.start())
print(car.info())`,
      explanation: "Демонстрація наслідування з super()."
    },
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке наслідування?",
        options: ["Копіювання коду", "Створення нових класів на основі існуючих", "Видалення класів", "Зміна імені класу"],
        correctAnswer: 1,
        explanation: "Наслідування дозволяє створювати нові класи на основі існуючих."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

