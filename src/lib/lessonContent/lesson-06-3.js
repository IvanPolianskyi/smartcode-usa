/**
 * Lesson 06-3: Інкапсуляція та модифікатори доступу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_3 = {
  lessonId: "lesson-06-3",
  moduleId: "module-06",
  order: 3,
  title: "Інкапсуляція та модифікатори доступу",
  
  learningObjectives: [
    "Розуміти концепцію інкапсуляції",
    "Використовувати публічні та приватні атрибути",
    "Застосовувати property декоратор",
    "Контролювати доступ до даних"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-06-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке інкапсуляція?",
        content: `**Інкапсуляція** - це принцип ООП, який означає приховування внутрішньої реалізації об'єкта та контроль доступу до його даних.



**Аналогія:**
Уявіть автомобіль. Ви не знаєте як працює двигун всередині, але можете керувати автомобілем через кермо, педалі та перемикачі. Це інкапсуляція - внутрішня робота прихована, але є публічний інтерфейс для керування.

**Переваги інкапсуляції:**
- ✅ Захист даних від некоректного використання
- ✅ Контроль над змінами стану об'єкта
- ✅ Можливість змінити реалізацію без зміни інтерфейсу
- ✅ Краща організація коду

**У Python:**
- Публічні атрибути - доступні ззовні
- Приватні атрибути - починаються з '__' (два підкреслення)
- Захищені атрибути - починаються з '_' (одне підкреслення)`
      },
      {
        title: "Публічні атрибути",
        content: `**Публічні атрибути** - доступні ззовні класу без обмежень.

**Приклад:**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name      # Публічний атрибут
        self.age = age        # Публічний атрибут

person = Person("Олексій", 20)
print(person.name)  # Олексій - доступ відкритий
print(person.age)   # 20 - доступ відкритий

# Можна змінити безпосередньо
person.age = -5  # Некоректне значення, але Python дозволяє
print(person.age)  # -5
\`\`\`

**Проблема:** Можна встановити некоректні значення (наприклад, від'ємний вік).

**Рішення:** Використовувати приватні атрибути та методи для контролю.`
      },
      {
        title: "Приватні атрибути",
        content: `**Приватні атрибути** - починаються з '__' (два підкреслення) і не доступні ззовні класу.



**Синтаксис:**

\`\`\`python
class НазваКласу:
    def __init__(self):
        self.__приватний_атрибут = значення
\`\`\`

**Приклад: Захист від некоректних значень**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.__age = age  # Приватний атрибут
    
    def get_age(self):
        return self.__age
    
    def set_age(self, age):
        if age >= 0 and age <= 150:
            self.__age = age
        else:
            print("Вік має бути від 0 до 150!")

person = Person("Олексій", 20)
print(person.name)        # Олексій - доступний
print(person.get_age())   # 20 - доступ через метод
# print(person.__age)     # Помилка! Атрибут приватний

person.set_age(25)        # ОК
person.set_age(-5)        # Вік має бути від 0 до 150!
print(person.get_age())   # 25 - значення не змінилося
\`\`\`

**Важливо:**
- '__age' - приватний атрибут (не доступний ззовні)
- Доступ тільки через методи 'get_age()' та 'set_age()'
- Можна додати перевірки в 'set_age()'`
      },
      {
        title: "Property декоратор",
        content: `**@property** - декоратор, який дозволяє використовувати методи як атрибути.



**Синтаксис:**

\`\`\`python
class НазваКласу:
    @property
    def атрибут(self):
        return self.__приватний_атрибут
    
    @атрибут.setter
    def атрибут(self, значення):
        # валідація та встановлення
        self.__приватний_атрибут = значення
\`\`\`

**Приклад: Використання property**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.__age = age
    
    @property
    def age(self):
        return self.__age
    
    @age.setter
    def age(self, value):
        if value >= 0 and value <= 150:
            self.__age = value
        else:
            raise ValueError("Вік має бути від 0 до 150!")

person = Person("Олексій", 20)
print(person.age)      # 20 - використовується як атрибут
person.age = 25        # Встановлення через property
print(person.age)     # 25

try:
    person.age = -5    # Викличе ValueError
except ValueError as e:
    print(e)          # Вік має бути від 0 до 150!
\`\`\`

**Переваги property:**
- ✅ Використання як звичайний атрибут
- ✅ Автоматична валідація при встановленні
- ✅ Можна додати логіку при читанні/записі
- ✅ Зручніший синтаксис ніж get/set методи`
      },
      {
        title: "Захищені атрибути",
        content: `**Захищені атрибути** - починаються з '_' (одне підкреслення). Це конвенція, що означає "не використовуй ззовні".

**Приклад:**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name      # Публічний
        self._age = age       # Захищений (конвенція)
        self.__id = 123       # Приватний
    
    def get_info(self):
        return f"{self.name}, {self._age} років"

person = Person("Олексій", 20)
print(person.name)    # Олексій - доступний
print(person._age)    # 20 - технічно доступний, але не рекомендується
# print(person.__id)  # Помилка! Приватний
\`\`\`

**Різниця:**
- 'name' - публічний (використовуй як хочеш)
- '_age' - захищений (не використовуй ззовні, але Python дозволяє)
- '__id' - приватний (Python блокує доступ ззовні)

**Коли використовувати:**
- '_' - для внутрішніх атрибутів, які можуть змінитися
- '__' - для справді приватних даних, які не повинні бути доступні`
      },
      {
        title: "Практичний приклад: Клас BankAccount",
        content: `**Повний приклад з інкапсуляцією:**

\`\`\`python
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.__balance = initial_balance  # Приватний
        self._transaction_count = 0        # Захищений
    
    @property
    def balance(self):
        return self.__balance
    
    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Баланс не може бути від'ємним!")
        self.__balance = value
        self._transaction_count += 1
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount  # Використовуємо property
            return self.balance
        else:
            raise ValueError("Сума має бути додатньою!")
    
    def withdraw(self, amount):
        if amount > 0:
            if amount <= self.balance:
                self.balance -= amount
                return self.balance
            else:
                raise ValueError("Недостатньо коштів!")
        else:
            raise ValueError("Сума має бути додатньою!")
    
    def get_info(self):
        return f"Власник: {self.owner}, Баланс: {self.balance} грн"

# Використання
account = BankAccount("Олексій", 1000)
print(account.get_info())  # Власник: Олексій, Баланс: 1000 грн

account.deposit(500)
print(account.balance)     # 1500 - через property

# account.__balance = 10000  # Не спрацює як очікується
# account.balance = -100    # ValueError: Баланс не може бути від'ємним!
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Приватні атрибути",
      code: `# Приватні атрибути
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.__grade = grade  # Приватний
    
    def get_grade(self):
        return self.__grade
    
    def set_grade(self, grade):
        if 1 <= grade <= 12:
            self.__grade = grade
        else:
            print("Оцінка має бути від 1 до 12!")

student = Student("Олексій", 5)
print(student.get_grade())  # 5
student.set_grade(10)
print(student.get_grade())  # 10
student.set_grade(15)      # Оцінка має бути від 1 до 12!`,
      explanation: "Демонструє використання приватних атрибутів з методами get/set."
    },
    {
      title: "Приклад 2: Property декоратор",
      code: `# Property декоратор
class Temperature:
    def __init__(self, celsius):
        self.__celsius = celsius
    
    @property
    def celsius(self):
        return self.__celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Температура не може бути нижче абсолютного нуля!")
        self.__celsius = value
    
    @property
    def fahrenheit(self):
        return self.__celsius * 9/5 + 32

temp = Temperature(25)
print(f"{temp.celsius}°C = {temp.fahrenheit}°F")  # 25°C = 77.0°F
temp.celsius = 30
print(f"{temp.celsius}°C")  # 30°C`,
      explanation: "Показує використання @property для читання та запису з валідацією."
    },
    {
      title: "Приклад 3: Захищені атрибути",
      code: `# Захищені атрибути
class Car:
    def __init__(self, brand, model):
        self.brand = brand          # Публічний
        self.model = model          # Публічний
        self._mileage = 0           # Захищений
        self.__engine_status = "off" # Приватний
    
    def start_engine(self):
        self.__engine_status = "on"
        print("Двигун запущено")
    
    def drive(self, km):
        if self.__engine_status == "on":
            self._mileage += km
            print(f"Проїхали {km} км. Пробіг: {self._mileage} км")
        else:
            print("Спочатку запустіть двигун!")

car = Car("Toyota", "Camry")
car.start_engine()
car.drive(100)  # Проїхали 100 км. Пробіг: 100 км`,
      explanation: "Демонструє різницю між публічними, захищеними та приватними атрибутами."
    },
    {
      title: "Приклад 4: Повна інкапсуляція",
      code: `# Повна інкапсуляція
class Rectangle:
    def __init__(self, width, height):
        self.__width = width
        self.__height = height
    
    @property
    def width(self):
        return self.__width
    
    @width.setter
    def width(self, value):
        if value > 0:
            self.__width = value
        else:
            raise ValueError("Ширина має бути додатньою!")
    
    @property
    def height(self):
        return self.__height
    
    @height.setter
    def height(self, value):
        if value > 0:
            self.__height = value
        else:
            raise ValueError("Висота має бути додатньою!")
    
    @property
    def area(self):
        return self.__width * self.__height
    
    @property
    def perimeter(self):
        return 2 * (self.__width + self.__height)

rect = Rectangle(5, 3)
print(f"Площа: {rect.area}")        # Площа: 15
print(f"Периметр: {rect.perimeter}") # Периметр: 16
rect.width = 10
print(f"Нова площа: {rect.area}")    # Нова площа: 30`,
      explanation: "Показує повну інкапсуляцію з property для всіх атрибутів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутати _ та __",
      explanation: "_ - захищений (конвенція), __ - приватний (Python блокує доступ).",
      correctApproach: "Використовуй _ для захищених, __ для приватних атрибутів"
    },
    {
      mistake: "Забути про self в property методах",
      explanation: "Property методи також мають self як перший параметр.",
      correctApproach: "Завжди використовуй self в property методах: @property def attr(self): return self.__attr"
    },
    {
      mistake: "Намагатися отримати доступ до приватного атрибута ззовні",
      explanation: "Приватні атрибути (__attr) не доступні ззовні класу.",
      correctApproach: "Використовуй методи або property для доступу до приватних атрибутів"
    },
    {
      mistake: "Не використовувати валідацію в setter",
      explanation: "Setter - ідеальне місце для перевірки коректності даних.",
      correctApproach: "Завжди додавай валідацію в setter методах"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Інкапсуляція** - приховування внутрішньої реалізації та контроль доступу
2. **Публічні атрибути** - доступні ззовні без обмежень
3. **Приватні атрибути** - починаються з __, не доступні ззовні
4. **Захищені атрибути** - починаються з _, конвенція про невикористання ззовні
5. **@property** - декоратор для використання методів як атрибутів
6. **Валідація даних** - перевірка коректності через setter

Тепер ви вмієте захищати дані та контролювати доступ до них!

Наступний урок - наслідування!`,
  
  practiceTask: {
    title: "Клас Product з інкапсуляцією",
    description: "Створіть клас Product з повною інкапсуляцією",
    problemStatement: `Напишіть програму, яка:
1. Створює клас Product з:
   - Приватними атрибутами: __name, __price, __quantity
   - Property для name (тільки читання)
   - Property для price з валідацією (ціна > 0)
   - Property для quantity з валідацією (кількість >= 0)
   - Методом get_total_value() - повертає price * quantity
2. Створює об'єкт та тестує всі property
3. Перевіряє валідацію при некоректних значеннях`,
    outputFormat: `Приклад виведення:
Товар: Ноутбук, Ціна: 25000, Кількість: 2
Загальна вартість: 50000
Помилка: Ціна має бути додатньою!`,
    examples: [
      {
        output: `Товар: Ноутбук, Ціна: 25000, Кількість: 2
Загальна вартість: 50000
Помилка: Ціна має бути додатньою!`,
        explanation: "Програма демонструє інкапсуляцію з property та валідацією"
      }
    ],
    solution: {
      code: `# Клас Product з інкапсуляцією
class Product:
    def __init__(self, name, price, quantity):
        self.__name = name
        self.__price = price if price > 0 else 0
        self.__quantity = quantity if quantity >= 0 else 0
    
    @property
    def name(self):
        return self.__name
    
    @property
    def price(self):
        return self.__price
    
    @price.setter
    def price(self, value):
        if value > 0:
            self.__price = value
        else:
            raise ValueError("Ціна має бути додатньою!")
    
    @property
    def quantity(self):
        return self.__quantity
    
    @quantity.setter
    def quantity(self, value):
        if value >= 0:
            self.__quantity = value
        else:
            raise ValueError("Кількість не може бути від'ємною!")
    
    def get_total_value(self):
        return self.__price * self.__quantity
    
    def get_info(self):
        return f"Товар: {self.__name}, Ціна: {self.__price}, Кількість: {self.__quantity}"

# Створюємо об'єкт
product = Product("Ноутбук", 25000, 2)
print(product.get_info())
print(f"Загальна вартість: {product.get_total_value()}")

# Тестуємо валідацію
try:
    product.price = -1000
except ValueError as e:
    print(f"Помилка: {e}")`,
      explanation: "Рішення використовує приватні атрибути, property з валідацією та методи для роботи з продуктом."
    },
    hints: [
      "Використовуй __ для приватних атрибутів",
      "name має бути тільки для читання (без setter)",
      "Додай валідацію в price та quantity setters",
      "Використовуй raise ValueError для помилок",
      "Обробляй помилки через try/except"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як позначаються приватні атрибути в Python?",
        options: [
          "Починаються з __ (два підкреслення)",
          "Починаються з _ (одне підкреслення)",
          "Починаються з private",
          "Не мають спеціального позначення"
        ],
        correctAnswer: 0,
        explanation: "Приватні атрибути починаються з __ (два підкреслення)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Test:\n    def __init__(self):\n        self.__value = 10\n\nt = Test()\nprint(t.__value)\n```",
        options: [
          "Помилку AttributeError",
          "10",
          "None",
          "0"
        ],
        correctAnswer: 0,
        explanation: "Приватні атрибути не доступні ззовні класу, тому буде помилка."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить декоратор @property?",
        options: [
          "Дозволяє використовувати метод як атрибут",
          "Робить метод приватним",
          "Робить метод статичним",
          "Блокує доступ до методу"
        ],
        correctAnswer: 0,
        explanation: "@property дозволяє використовувати метод як звичайний атрибут."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи правильний цей код?\n\n```python\nclass Test:\n    def __init__(self):\n        self.__value = 10\n    \n    @property\n    def value(self):\n        return self.__value\n\nt = Test()\nprint(t.value)\n```",
        options: [
          "Так, виведе 10",
          "Ні, потрібен setter",
          "Ні, __value недоступний",
          "Ні, неправильний синтаксис"
        ],
        correctAnswer: 0,
        explanation: "Код правильний, property дозволяє читати приватний атрибут."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між _ та __ в назвах атрибутів?",
        options: [
          "_ - конвенція, __ - Python блокує доступ",
          "_ - приватний, __ - публічний",
          "Немає різниці",
          "_ - для методів, __ - для атрибутів"
        ],
        correctAnswer: 0,
        explanation: "_ - це конвенція (захищений), __ - Python справді блокує доступ (приватний)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що не так з цим кодом?\n\n```python\nclass Test:\n    @property\n    def value(self, new_value):\n        self.__value = new_value\n```",
        options: [
          "Property getter не має приймати параметрів крім self",
          "Потрібен декоратор @value.setter",
          "Потрібен __init__",
          "Все правильно"
        ],
        correctAnswer: 0,
        explanation: "Property getter (@property) не приймає параметрів. Для запису потрібен окремий setter."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}