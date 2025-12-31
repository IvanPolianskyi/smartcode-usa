/**
 * Lesson 6-5: Наслідування
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_5 = {
  lessonId: "lesson-6-5",
  moduleId: "module-6",
  order: 5,
  title: "Наслідування",
  
  learningObjectives: [
    "Створювати дочірні класи",
    "Перевизначати методи",
    "Використовувати super()",
    "Розуміти MRO (Method Resolution Order)",
    "Застосовувати наслідування на практиці"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-6-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке наслідування?",
        content: `**Наслідування** — механізм, який дозволяє створювати нові класи на основі існуючих.

**Термінологія:**
- **Базовий клас (батьківський, суперклас)** — клас, від якого наслідуються інші
- **Дочірній клас (підклас)** — клас, який наслідує від базового

**Переваги:**
- ✅ **Повторне використання коду** — не треба дублювати
- ✅ **Організація** — логічна ієрархія
- ✅ **Розширюваність** — легко додавати новий функціонал
- ✅ **Поліморфізм** — різні класи можуть використовувати один інтерфейс

**Аналогія:**
Тварина (базовий клас) → Собака, Кіт, Птах (дочірні класи)
Всі мають спільні властивості (ім'я, вік), але різні поведінки (звук)

**Синтаксис:**
\`\`\`python
class Animal:  # Базовий клас
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
        title: "Базове наслідування",
        content: `**Приклад: Транспортні засоби**
\`\`\`python
class Vehicle:  # Базовий клас
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start(self):
        return "Транспорт запущено"
    
    def info(self):
        return f"{self.brand} {self.model}"

class Car(Vehicle):  # Car наслідує від Vehicle
    def __init__(self, brand, model, doors):
        super().__init__(brand, model)  # Виклик батьківського __init__
        self.doors = doors
    
    def start(self):  # Перевизначення методу
        return f"{self.brand} {self.model} заведено!"

class Bicycle(Vehicle):  # Bicycle наслідує від Vehicle
    def start(self):  # Перевизначення методу
        return "Велосипед готовий до поїздки!"

car = Car("Toyota", "Camry", 4)
bike = Bicycle("Giant", "Escape")

print(car.start())  # Toyota Camry заведено!
print(bike.start())  # Велосипед готовий до поїздки!
print(car.info())    # Toyota Camry (успадкований метод)
\`\`\`

**Що успадковується:**
- Всі методи базового класу
- Всі атрибути базового класу
- Можливість перевизначити методи
- Можливість додати нові методи та атрибути`
      },
      {
        title: "super() - виклик батьківського методу",
        content: `**super()** — дозволяє викликати методи батьківського класу.

**Чому super()?**
- Не потрібно знати ім'я батьківського класу
- Працює з множинним наслідуванням
- Більш гнучкий підхід

**Приклад:**
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

**Без super() (не рекомендується):**
\`\`\`python
class Student(Person):
    def __init__(self, name, age, course):
        Person.__init__(self, name, age)  # Теж працює, але менш гнучко
        self.course = course
\`\`\`

**Переваги super():**
- Працює з множинним наслідуванням
- Не потрібно знати ім'я батьківського класу
- Легше рефакторити код`
      },
      {
        title: "Перевизначення методів",
        content: `**Перевизначення (override)** — заміна методу батьківського класу в дочірньому.

\`\`\`python
class Shape:
    def area(self):
        return 0
    
    def info(self):
        return "Фігура"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):  # Перевизначення методу
        return self.width * self.height
    
    def info(self):  # Перевизначення методу
        return f"Прямокутник {self.width}x{self.height}"

rect = Rectangle(5, 3)
print(rect.area())  # 15 (використовується метод з Rectangle)
print(rect.info())  # Прямокутник 5x3
\`\`\`

**Коли перевизначати:**
- Коли потрібна інша реалізація для дочірнього класу
- Коли потрібно розширити функціональність батьківського методу
- Коли потрібна специфічна поведінка`
      },
      {
        title: "Множинне наслідування",
        content: `**Множинне наслідування** — клас може наслідувати від кількох класів.

\`\`\`python
class Flyable:
    def fly(self):
        return "Літаю"

class Swimmable:
    def swim(self):
        return "Плаваю"

class Duck(Flyable, Swimmable):  # Наслідує від обох
    def __init__(self, name):
        self.name = name

duck = Duck("Дональд")
print(duck.fly())   # Літаю
print(duck.swim())  # Плаваю
\`\`\`

**MRO (Method Resolution Order)** — порядок пошуку методів:
\`\`\`python
print(Duck.__mro__)
# (<class '__main__.Duck'>, <class '__main__.Flyable'>, 
#  <class '__main__.Swimmable'>, <class 'object'>)
\`\`\`

**Правила MRO:**
1. Спочатку шукає в поточному класі
2. Потім в батьківських класах (зліва направо)
3. Потім в батьківських батьківських класах
4. І так далі до object

**Коли використовувати:**
- Mixin класи (додавання функціональності)
- Реалізація інтерфейсів
- Комбінування поведінки

**Обережно:** Множинне наслідування може ускладнити код!`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Ієрархія фігур**
\`\`\`python
class Shape:
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

print(rect.area())  # 15
print(circle.area())  # 50.27...
\`\`\`

**Приклад 2: Ієрархія співробітників**
\`\`\`python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_info(self):
        return f"{self.name}: {self.salary} грн"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department
    
    def get_info(self):
        base = super().get_info()
        return f"{base}, керує відділом {self.department}"

manager = Manager("Олександр", 50000, "IT")
print(manager.get_info())
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
    },
    {
      title: "Приклад 2: Використання super()",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Я {self.name}, мені {self.age} років"

class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)
        self.course = course
    
    def introduce(self):
        base_intro = super().introduce()
        return f"{base_intro}, вивчаю {self.course}"

student = Student("Олександр", 15, "Python")
print(student.introduce())`,
      explanation: "Показує використання super() для виклику батьківських методів."
    },
    {
      title: "Приклад 3: Множинне наслідування",
      code: `class Flyable:
    def fly(self):
        return "Літаю"

class Swimmable:
    def swim(self):
        return "Плаваю"

class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name

duck = Duck("Дональд")
print(duck.fly())
print(duck.swim())
print(Duck.__mro__)`,
      explanation: "Демонструє множинне наслідування та MRO."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути викликати super().__init__()",
      explanation: "Без super() батьківський клас не ініціалізується, атрибути батьківського класу не будуть встановлені.",
      correctApproach: "Завжди викликайте super().__init__(...) в дочірньому класі для ініціалізації батьківського класу."
    },
    {
      mistake: "Плутанина з порядком параметрів в super()",
      explanation: "super().__init__() приймає ті самі параметри, що й батьківський __init__, крім self.",
      correctApproach: "Передавайте правильні параметри: super().__init__(name, age) якщо батьківський __init__(self, name, age)."
    },
    {
      mistake: "Занадто глибоке наслідування",
      explanation: "Занадто багато рівнів наслідування ускладнює код та зменшує читабельність.",
      correctApproach: "Уникайте більше 2-3 рівнів наслідування. Використовуйте композицію замість глибокого наслідування."
    },
    {
      mistake: "Не використовувати super() при множинному наслідуванні",
      explanation: "Без super() при множинному наслідуванні може виникнути проблема з ініціалізацією.",
      correctApproach: "Завжди використовуйте super() для правильної роботи з множинним наслідуванням."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Наслідування** — створення нових класів на основі існуючих
2. **Базовий клас** — клас, від якого наслідуються інші
3. **Дочірній клас** — клас, який наслідує від базового
4. **super()** — виклик методів батьківського класу
5. **Перевизначення** — заміна методу в дочірньому класі
6. **MRO** — порядок пошуку методів при множинному наслідуванні

**Переваги:**
- Повторне використання коду
- Логічна організація
- Розширюваність
- Поліморфізм

**Важливо:**
- Завжди викликайте super().__init__() в дочірньому класі
- Використовуйте super() для виклику батьківських методів
- Уникайте занадто глибокого наслідування

Наслідування дозволяє створювати логічні ієрархії класів!`,
  
  practiceTask: {
    title: "Ієрархія транспортних засобів",
    description: "Створіть ієрархію класів транспортних засобів з використанням наслідування",
    problemStatement: `Створіть ієрархію транспортних засобів:

**Базовий клас Vehicle:**
- Атрибути: brand, model, year
- Методи: start(), stop(), info()
- Конструктор: __init__(brand, model, year)

**Дочірній клас Car (наслідує від Vehicle):**
- Додаткові атрибути: doors, fuel_type
- Перевизначити: start() — повертає "Автомобіль заведено!"
- Додати метод: honk() — повертає "Біп-біп!"

**Дочірній клас Bicycle (наслідує від Vehicle):**
- Додаткові атрибути: gears
- Перевизначити: start() — повертає "Велосипед готовий!"
- Додати метод: ring_bell() — повертає "Дзень-дзень!"

**Дочірній клас Motorcycle (наслідує від Vehicle):**
- Додаткові атрибути: engine_size
- Перевизначити: start() — повертає "Мотоцикл заведено!"
- Додати метод: wheelie() — повертає "Виконано вілі!"

**Вимоги:**
- Використовуйте super() для виклику батьківського __init__
- Всі дочірні класи мають викликати super().__init__()
- Створіть об'єкти кожного типу та продемонструйте роботу

**Створіть кілька об'єктів та продемонструйте всі методи.**`,
    inputFormat: "Створіть ієрархію класів",
    outputFormat: `Приклад виведення:
Toyota Camry (2023) - Автомобіль заведено!
Giant Escape (2022) - Велосипед готовий!
Yamaha R1 (2023) - Мотоцикл заведено!`,
    examples: [
      {
        input: "Створення об'єктів різних типів",
        output: "Всі методи працюють коректно",
        explanation: "Демонстрація наслідування та поліморфізму"
      }
    ],
    solution: {
      code: `class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
    
    def start(self):
        return "Транспорт запущено"
    
    def stop(self):
        return "Транспорт зупинено"
    
    def info(self):
        return f"{self.brand} {self.model} ({self.year})"

class Car(Vehicle):
    def __init__(self, brand, model, year, doors, fuel_type):
        super().__init__(brand, model, year)
        self.doors = doors
        self.fuel_type = fuel_type
    
    def start(self):
        return "Автомобіль заведено!"
    
    def honk(self):
        return "Біп-біп!"

class Bicycle(Vehicle):
    def __init__(self, brand, model, year, gears):
        super().__init__(brand, model, year)
        self.gears = gears
    
    def start(self):
        return "Велосипед готовий!"
    
    def ring_bell(self):
        return "Дзень-дзень!"

class Motorcycle(Vehicle):
    def __init__(self, brand, model, year, engine_size):
        super().__init__(brand, model, year)
        self.engine_size = engine_size
    
    def start(self):
        return "Мотоцикл заведено!"
    
    def wheelie(self):
        return "Виконано вілі!"

# Створення об'єктів
car = Car("Toyota", "Camry", 2023, 4, "бензин")
bike = Bicycle("Giant", "Escape", 2022, 21)
motorcycle = Motorcycle("Yamaha", "R1", 2023, 1000)

# Демонстрація
print(f"{car.info()} - {car.start()}")
print(f"{car.honk()}")

print(f"\\n{bike.info()} - {bike.start()}")
print(f"{bike.ring_bell()}")

print(f"\\n{motorcycle.info()} - {motorcycle.start()}")
print(f"{motorcycle.wheelie()}")

# Поліморфізм
vehicles = [car, bike, motorcycle]
print("\\n=== Поліморфізм ===")
for vehicle in vehicles:
    print(f"{vehicle.info()}: {vehicle.start()}")`,
      explanation: "Рішення демонструє повну ієрархію з наслідуванням, перевизначенням методів та поліморфізмом."
    },
    hints: [
      "Використовуйте super().__init__() для виклику батьківського конструктора",
      "Перевизначте start() в кожному дочірньому класі",
      "Додайте унікальні методи для кожного типу транспорту",
      "Використовуйте поліморфізм для демонстрації"
    ],
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
        explanation: "Наслідування дозволяє створювати нові класи на основі існуючих, успадковуючи їх методи та атрибути."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: def x(self): return 1; class B(A): def x(self): return 2; b=B(); print(b.x())?",
        options: ["1", "2", "Помилку", "None"],
        correctAnswer: 1,
        explanation: "B перевизначає метод x(), тому використовується версія з B, яка повертає 2."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке super()?",
        options: ["Клас", "Функція для виклику батьківських методів", "Метод", "Атрибут"],
        correctAnswer: 1,
        explanation: "super() дозволяє викликати методи батьківського класу, особливо корисне для __init__."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке MRO?",
        options: ["Метод", "Порядок пошуку методів", "Клас", "Атрибут"],
        correctAnswer: 1,
        explanation: "MRO (Method Resolution Order) — це порядок, в якому Python шукає методи при множинному наслідуванні."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
