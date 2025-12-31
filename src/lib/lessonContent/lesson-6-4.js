/**
 * Lesson 6-4: Інкапсуляція та модифікатори доступу
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_4 = {
  lessonId: "lesson-6-4",
  moduleId: "module-6",
  order: 4,
  title: "Інкапсуляція та модифікатори доступу",
  
  learningObjectives: [
    "Розуміти концепцію інкапсуляції",
    "Використовувати публічні та приватні атрибути",
    "Застосовувати property декоратор",
    "Контролювати доступ до даних",
    "Розуміти переваги інкапсуляції"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-6-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке інкапсуляція?",
        content: `**Інкапсуляція** — принцип ООП, який приховує внутрішню реалізацію та контролює доступ до даних.

**Основні ідеї:**
- Приховування деталей реалізації
- Контроль доступу до даних
- Захист від некоректного використання
- Зручний інтерфейс для роботи

**Аналогія:**
Автомобіль має багато внутрішніх деталей (двигун, коробка передач), але водій використовує тільки простий інтерфейс (кермо, педалі). Внутрішні деталі приховані.

**Переваги:**
- ✅ Захист даних від некоректних змін
- ✅ Можливість змінити реалізацію без впливу на код, що використовує клас
- ✅ Спрощення використання (не потрібно знати деталі)
- ✅ Легше підтримувати код`
      },
      {
        title: "Публічні та приватні атрибути",
        content: `**У Python немає справжніх приватних атрибутів**, але є конвенції:

**Публічні атрибути** (доступні ззовні):
\`\`\`python
class Student:
    def __init__(self, name):
        self.name = name  # Публічний атрибут

student = Student("Олександр")
print(student.name)  # Доступно ззовні
student.name = "Марія"  # Можна змінити
\`\`\`

**Приватні атрибути** (починаються з __):
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name  # Публічний
        self.__age = age  # Приватний (два підкреслення)

student = Student("Олександр", 15)
print(student.name)  # Олександр
# print(student.__age)  # AttributeError!
print(student._Student__age)  # 15 (але не рекомендується!)
\`\`\`

**Захищені атрибути** (одне підкреслення _):
\`\`\`python
class Student:
    def __init__(self, name):
        self.name = name  # Публічний
        self._internal_id = 123  # Захищений (конвенція)

# Технічно доступний, але за конвенцією не використовується ззовні
\`\`\`

**Конвенції:**
- Без підкреслення — публічний (використовуйте вільно)
- Одне підкреслення (_) — захищений (не використовуйте ззовні)
- Два підкреслення (__) — приватний (не використовуйте ззовні)`
      },
      {
        title: "Property декоратор",
        content: `**@property** — перетворює метод в атрибут, який можна читати як змінну.

**Базове використання:**
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius  # Приватний атрибут
    
    @property
    def radius(self):
        """Getter для radius."""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Setter для radius з валідацією."""
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним!")
        self._radius = value
    
    @property
    def area(self):
        """Обчислювана властивість."""
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.radius)  # 5 (викликається getter)
print(circle.area)    # 78.54 (обчислюється автоматично)

circle.radius = 10    # Викликається setter
print(circle.area)    # 314.159

# circle.radius = -5   # ValueError!
\`\`\`

**Переваги @property:**
- Валідація при встановленні значення
- Обчислення на льоту
- Інкапсуляція (приховування внутрішньої реалізації)
- Зручний синтаксис (як атрибут, а не метод)`
      },
      {
        title: "Getter та Setter",
        content: `**Getter** — метод для отримання значення.
**Setter** — метод для встановлення значення з валідацією.

**Без property (старий спосіб):**
\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    def get_celsius(self):  # Getter
        return self._celsius
    
    def set_celsius(self, value):  # Setter
        if value < -273.15:
            raise ValueError("Температура не може бути нижче абсолютного нуля!")
        self._celsius = value

temp = Temperature(25)
print(temp.get_celsius())  # 25
temp.set_celsius(30)  # Використання методів
\`\`\`

**З property (рекомендований спосіб):**
\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):  # Getter
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):  # Setter
        if value < -273.15:
            raise ValueError("Температура не може бути нижче абсолютного нуля!")
        self._celsius = value

temp = Temperature(25)
print(temp.celsius)  # 25 (як атрибут!)
temp.celsius = 30    # Як атрибут!
\`\`\`

**Переваги property:**
- Більш зручний синтаксис
- Виглядає як атрибут, але з валідацією
- Можна додати валідацію пізніше, не змінюючи код, що використовує клас`
      },
      {
        title: "Read-only property",
        content: `**Read-only property** — властивість тільки для читання (без setter).

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним!")
        self._radius = value
    
    @property
    def area(self):  # Тільки getter, без setter
        """Read-only property."""
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.area)  # 78.54
# circle.area = 100  # AttributeError! (немає setter)
\`\`\`

**Коли використовувати:**
- Обчислювані значення (площа, периметр)
- Значення, які не повинні змінюватися напряму
- Похідні дані з інших атрибутів`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Банківський рахунок з захистом**
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # Приватний баланс
    
    @property
    def balance(self):
        """Отримати баланс."""
        return self._balance
    
    def deposit(self, amount):
        """Поповнити рахунок."""
        if amount > 0:
            self._balance += amount
        else:
            raise ValueError("Сума має бути додатньою!")
    
    def withdraw(self, amount):
        """Зняти з рахунку."""
        if amount > 0 and amount <= self._balance:
            self._balance -= amount
        else:
            raise ValueError("Недостатньо коштів або невірна сума!")

account = BankAccount("Олександр", 1000)
print(account.balance)  # 1000
# account.balance = 2000  # AttributeError! (немає setter)
account.deposit(500)  # Тільки через метод
\`\`\`

**Приклад 2: Валідація через property**
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self._age = None
        self.age = age  # Використовуємо setter
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Вік не може бути від'ємним!")
        if value > 150:
            raise ValueError("Вік занадто великий!")
        self._age = value

student = Student("Олександр", 15)
# student.age = -5  # ValueError!
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове property",
      code: `class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним!")
        self._radius = value
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.radius)  # 5
print(circle.area)    # 78.54
circle.radius = 10
print(circle.area)    # 314.159`,
      explanation: "Демонструє базове використання property з getter та setter."
    },
    {
      title: "Приклад 2: Read-only property",
      code: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @property
    def area(self):
        """Read-only property."""
        return self.width * self.height
    
    @property
    def perimeter(self):
        """Read-only property."""
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(rect.area)  # 15
print(rect.perimeter)  # 16
# rect.area = 20  # AttributeError!`,
      explanation: "Показує read-only property для обчислюваних значень."
    },
    {
      title: "Приклад 3: Валідація через property",
      code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = None
        self.celsius = celsius  # Використовуємо setter
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Температура не може бути нижче абсолютного нуля!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(f"{temp.celsius}°C = {temp.fahrenheit}°F")
temp.celsius = 30
print(f"Нова температура: {temp.celsius}°C")`,
      explanation: "Демонструє валідацію через property setter."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання публічних атрибутів без валідації",
      explanation: "Прямий доступ до атрибутів дозволяє встановити некоректні значення.",
      correctApproach: "Використовуйте приватні атрибути (_attr) та property для контролю доступу."
    },
    {
      mistake: "Забути @property перед getter",
      explanation: "Без @property метод не можна викликати як атрибут.",
      correctApproach: "Завжди додавайте @property перед getter методом."
    },
    {
      mistake: "Спроба встановити read-only property",
      explanation: "Якщо немає setter, спроба встановити значення викличе AttributeError.",
      correctApproach: "Для read-only property не створюйте setter, або додайте setter з валідацією."
    },
    {
      mistake: "Використання __attr замість _attr",
      explanation: "__attr робить name mangling, що може ускладнити код. _attr достатньо для більшості випадків.",
      correctApproach: "Використовуйте _attr для приватних атрибутів, __attr тільки коли дійсно потрібно."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Інкапсуляція** — приховування деталей реалізації
2. **Публічні атрибути** — доступні ззовні (без підкреслення)
3. **Приватні атрибути** — приховані (__attr або _attr)
4. **@property** — перетворення методів в атрибути
5. **Getter та Setter** — контроль доступу до даних
6. **Read-only property** — тільки для читання

**Конвенції:**
- Без підкреслення — публічний
- Одне підкреслення (_) — захищений
- Два підкреслення (__) — приватний

**Переваги інкапсуляції:**
- Захист даних
- Валідація значень
- Гнучкість (можна змінити реалізацію)
- Простота використання

Інкапсуляція робить код безпечнішим та зручнішим!`,
  
  practiceTask: {
    title: "Створення класу з інкапсуляцією",
    description: "Створіть клас з приватним атрибутами та property",
    problemStatement: `Створіть клас BankAccount з повною інкапсуляцією:

**Приватні атрибути:**
- __balance (баланс) — приватний
- __owner (власник) — приватний
- __transaction_history (історія транзакцій) — приватний список

**Property:**
- balance — read-only (тільки getter)
- owner — read-only (тільки getter)
- transaction_count — read-only property, повертає кількість транзакцій

**Методи:**
- deposit(amount) — поповнити рахунок (додає в історію)
- withdraw(amount) — зняти з рахунку (додає в історію)
- get_transaction_history() — повертає копію історії (не сам список!)

**Вимоги:**
- Баланс не може бути від'ємним
- Суми мають бути додатніми
- Історія транзакцій не повинна бути доступна для зміни ззовні
- Використовуйте property для балансу та власника

**Створіть об'єкт та продемонструйте роботу.**`,
    inputFormat: "Створіть клас та об'єкт",
    outputFormat: `Приклад виведення:
Власник: Олександр
Баланс: 1000
Транзакцій: 0

Після операцій:
Баланс: 1300
Транзакцій: 2`,
    examples: [
      {
        input: "deposit(500), withdraw(200)",
        output: "Баланс оновлено, історія збережена",
        explanation: "Демонстрація інкапсуляції та property"
      }
    ],
    solution: {
      code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.__owner = owner  # Приватний
        self.__balance = balance  # Приватний
        self.__transaction_history = []  # Приватний
    
    @property
    def balance(self):
        """Read-only property для балансу."""
        return self.__balance
    
    @property
    def owner(self):
        """Read-only property для власника."""
        return self.__owner
    
    @property
    def transaction_count(self):
        """Read-only property для кількості транзакцій."""
        return len(self.__transaction_history)
    
    def deposit(self, amount):
        """Поповнити рахунок."""
        if amount <= 0:
            raise ValueError("Сума має бути додатньою!")
        self.__balance += amount
        self.__transaction_history.append(f"Поповнення: +{amount}")
        print(f"Додано {amount}. Баланс: {self.__balance}")
    
    def withdraw(self, amount):
        """Зняти з рахунку."""
        if amount <= 0:
            raise ValueError("Сума має бути додатньою!")
        if amount > self.__balance:
            raise ValueError("Недостатньо коштів!")
        self.__balance -= amount
        self.__transaction_history.append(f"Зняття: -{amount}")
        print(f"Знято {amount}. Баланс: {self.__balance}")
    
    def get_transaction_history(self):
        """Повертає копію історії транзакцій."""
        return self.__transaction_history.copy()  # Повертаємо копію!

# Використання
account = BankAccount("Олександр", 1000)
print(f"Власник: {account.owner}")
print(f"Баланс: {account.balance}")
print(f"Транзакцій: {account.transaction_count}")

account.deposit(500)
account.withdraw(200)

print(f"\\nБаланс: {account.balance}")
print(f"Транзакцій: {account.transaction_count}")

# Отримуємо історію
history = account.get_transaction_history()
print("\\nІсторія транзакцій:")
for transaction in history:
    print(f"  {transaction}")

# Спроба змінити баланс напряму - не працює
# account.balance = 2000  # AttributeError!
# account.__balance = 2000  # Не змінить справжній баланс!`,
      explanation: "Рішення демонструє повну інкапсуляцію з приватними атрибутами та property."
    },
    hints: [
      "Використовуйте __attr для приватних атрибутів",
      "Створіть property для балансу та власника (read-only)",
      "Повертайте копію історії, а не сам список",
      "Валідуйте суми в методах deposit та withdraw"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке інкапсуляція?",
        options: ["Приховування деталей реалізації", "Створення об'єктів", "Наслідування", "Поліморфізм"],
        correctAnswer: 0,
        explanation: "Інкапсуляція — це приховування деталей реалізації та контроль доступу до даних."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як позначити приватний атрибут в Python?",
        options: ["Без підкреслення", "Одне підкреслення (_)", "Два підкреслення (__)", "Три підкреслення (___)"],
        correctAnswer: 2,
        explanation: "Два підкреслення (__) роблять атрибут приватним через name mangling."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: class A: @property def x(self): return 5; a=A(); print(a.x)?",
        options: ["5", "Помилку", "None", "x"],
        correctAnswer: 0,
        explanation: "@property дозволяє викликати метод як атрибут, тому a.x поверне 5."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке read-only property?",
        options: ["Property без getter", "Property без setter", "Property без обох", "Property з обома"],
        correctAnswer: 1,
        explanation: "Read-only property має тільки getter, без setter, тому значення можна тільки читати."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
