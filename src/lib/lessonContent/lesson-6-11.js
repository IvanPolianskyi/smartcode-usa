/**
 * Lesson 6-11: Композиція vs наслідування
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson6_11 = {
  lessonId: "lesson-6-11",
  moduleId: "module-6",
  order: 11,
  title: "Композиція vs наслідування",
  
  learningObjectives: [
    "Розуміти різницю між композицією та наслідуванням",
    "Вибирати правильний підхід",
    "Застосовувати композицію",
    "Уникати проблем наслідування",
    "Розуміти принцип 'Favor composition over inheritance'"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-6-10"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке композиція?",
        content: `**Композиція** — включення одного об'єкта в інший як частину.

**Ідея:** "Має" замість "Є"

**Приклад:**
\`\`\`python
class Engine:
    def start(self):
        return "Двигун запущено"

class Car:
    def __init__(self):
        self.engine = Engine()  # Композиція: Car "має" Engine
    
    def start(self):
        return self.engine.start()

car = Car()
print(car.start())  # Двигун запущено
\`\`\`

**Характеристики:**
- Об'єкт містить інший об'єкт
- "Має" відношення (has-a)
- Більш гнучкий підхід
- Можна змінювати компоненти

**Переваги:**
- ✅ Гнучкість — легко замінити компонент
- ✅ Менше залежностей
- ✅ Легше тестувати
- ✅ Уникає проблем наслідування`
      },
      {
        title: "Що таке наслідування?",
        content: `**Наслідування** — створення нового класу на основі існуючого.

**Ідея:** "Є" відношення (is-a)

**Приклад:**
\`\`\`python
class Vehicle:
    def start(self):
        return "Транспорт запущено"

class Car(Vehicle):  # Наслідування: Car "є" Vehicle
    def start(self):
        return "Автомобіль заведено!"

car = Car()
print(car.start())  # Автомобіль заведено!
\`\`\`

**Характеристики:**
- Клас наслідує від іншого класу
- "Є" відношення (is-a)
- Тісний зв'язок між класами
- Менша гнучкість

**Коли використовувати:**
- Справжнє "є" відношення
- Логічна ієрархія
- Спільна поведінка`
      },
      {
        title: "Порівняння: композиція vs наслідування",
        content: `**Наслідування (is-a):**
\`\`\`python
class Animal:
    def speak(self):
        pass

class Dog(Animal):  # Dog "є" Animal
    def speak(self):
        return "Гав!"
\`\`\`

**Композиція (has-a):**
\`\`\`python
class Engine:
    def start(self):
        return "Двигун запущено"

class Car:
    def __init__(self):
        self.engine = Engine()  # Car "має" Engine
\`\`\`

**Порівняння:**

| Аспект | Наслідування | Композиція |
|--------|-------------|------------|
| Відношення | "Є" (is-a) | "Має" (has-a) |
| Зв'язок | Тісний | Слабкий |
| Гнучкість | Менша | Більша |
| Заміна компонентів | Складно | Легко |
| Тестування | Складніше | Легше |

**Правило:** "Favor composition over inheritance" (Віддавайте перевагу композиції перед наслідуванням)`
      },
      {
        title: "Коли використовувати наслідування?",
        content: `**Наслідування використовуйте коли:**

**1. Справжнє "є" відношення:**
\`\`\`python
class Animal:
    pass

class Dog(Animal):  # Dog "є" Animal - правильно
    pass

class Car(Animal):  # Car "є" Animal - неправильно!
    pass
\`\`\`

**2. Логічна ієрархія:**
\`\`\`python
class Employee:
    def work(self):
        return "Працюю"

class Manager(Employee):  # Manager "є" Employee
    def work(self):
        return "Керую командою"
\`\`\`

**3. Спільна поведінка:**
\`\`\`python
class Shape:
    def area(self):
        return 0

class Rectangle(Shape):  # Rectangle "є" Shape
    def area(self):
        return self.width * self.height
\`\`\`

**Коли НЕ використовувати:**
- Коли відношення "має" (has-a), а не "є" (is-a)
- Коли потрібна гнучкість
- Коли ієрархія стає складною`
      },
      {
        title: "Коли використовувати композицію?",
        content: `**Композицію використовуйте коли:**

**1. "Має" відношення:**
\`\`\`python
class Engine:
    def start(self):
        return "Двигун запущено"

class Car:
    def __init__(self):
        self.engine = Engine()  # Car "має" Engine
\`\`\`

**2. Потрібна гнучкість:**
\`\`\`python
class Database:
    def save(self, data):
        return f"Збережено в БД: {data}"

class FileStorage:
    def save(self, data):
        return f"Збережено в файл: {data}"

class DataManager:
    def __init__(self, storage):
        self.storage = storage  # Можна змінити storage
    
    def save_data(self, data):
        return self.storage.save(data)

# Можна легко змінити storage
manager1 = DataManager(Database())
manager2 = DataManager(FileStorage())
\`\`\`

**3. Уникання складної ієрархії:**
\`\`\`python
# Замість складної ієрархії:
# Animal -> Mammal -> Dog -> Puppy

# Використовуйте композицію:
class Dog:
    def __init__(self, age):
        self.age = age
        self.behavior = PuppyBehavior() if age < 1 else AdultBehavior()
\`\`\`

**Переваги композиції:**
- Легше замінити компонент
- Менше залежностей
- Легше тестувати
- Більш гнучкий код`
      },
      {
        title: "Проблеми наслідування",
        content: `**1. Тісний зв'язок:**
\`\`\`python
class Vehicle:
    def start(self):
        return "Запущено"

class Car(Vehicle):
    def start(self):
        return "Автомобіль заведено"

# Якщо змінити Vehicle.start(), це може вплинути на Car
\`\`\`

**2. Складна ієрархія:**
\`\`\`python
# Занадто багато рівнів наслідування
class Animal:
    pass

class Mammal(Animal):
    pass

class Dog(Mammal):
    pass

class Puppy(Dog):  # Занадто глибоко!
    pass
\`\`\`

**3. Diamond Problem (при множинному наслідуванні):**
\`\`\`python
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):  # Який method() використати?
    pass
\`\`\`

**4. Важко змінити поведінку:**
\`\`\`python
# Якщо потрібно змінити поведінку, треба створити новий клас
# або змінити батьківський клас (що може вплинути на інші)
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Композиція замість наслідування**
\`\`\`python
# Наслідування (менш гнучко):
class ElectricCar(Car):
    def charge(self):
        return "Зарядка"

# Композиція (більш гнучко):
class Car:
    def __init__(self, engine):
        self.engine = engine  # Можна передати ElectricEngine або GasEngine

class ElectricEngine:
    def start(self):
        return "Електричний двигун запущено"
    
    def charge(self):
        return "Зарядка"

class GasEngine:
    def start(self):
        return "Бензиновий двигун запущено"

electric_car = Car(ElectricEngine())
gas_car = Car(GasEngine())
\`\`\`

**Приклад 2: Стратегія через композицію**
\`\`\`python
class PaymentStrategy:
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        return f"Оплачено {amount} карткою"

class PayPalPayment(PaymentStrategy):
    def pay(self, amount):
        return f"Оплачено {amount} через PayPal"

class Order:
    def __init__(self, payment_strategy):
        self.payment_strategy = payment_strategy  # Композиція
    
    def process_payment(self, amount):
        return self.payment_strategy.pay(amount)

# Можна легко змінити стратегію
order1 = Order(CreditCardPayment())
order2 = Order(PayPalPayment())
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Наслідування (is-a)",
      code: `class Animal:
    def speak(self):
        return "Звук тварини"

class Dog(Animal):  # Dog "є" Animal
    def speak(self):
        return "Гав-гав!"

class Cat(Animal):  # Cat "є" Animal
    def speak(self):
        return "Мяу!"

dog = Dog()
cat = Cat()
print(dog.speak())
print(cat.speak())`,
      explanation: "Демонструє наслідування для справжнього 'є' відношення."
    },
    {
      title: "Приклад 2: Композиція (has-a)",
      code: `class Engine:
    def start(self):
        return "Двигун запущено"

class Car:
    def __init__(self):
        self.engine = Engine()  # Car "має" Engine
    
    def start(self):
        return self.engine.start()

car = Car()
print(car.start())`,
      explanation: "Показує композицію для 'має' відношення."
    },
    {
      title: "Приклад 3: Композиція для гнучкості",
      code: `class Storage:
    def save(self, data):
        pass

class FileStorage(Storage):
    def save(self, data):
        return f"Збережено в файл: {data}"

class DatabaseStorage(Storage):
    def save(self, data):
        return f"Збережено в БД: {data}"

class DataManager:
    def __init__(self, storage):
        self.storage = storage  # Композиція - легко змінити
    
    def save_data(self, data):
        return self.storage.save(data)

# Можна легко змінити storage
manager = DataManager(FileStorage())
print(manager.save_data("test"))`,
      explanation: "Демонструє композицію для гнучкості та заміни компонентів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання наслідування замість композиції",
      explanation: "Використання наслідування для 'має' відношення створює тісний зв'язок та зменшує гнучкість.",
      correctApproach: "Якщо відношення 'має' (has-a), використовуйте композицію. Наслідування тільки для 'є' (is-a)."
    },
    {
      mistake: "Занадто глибока ієрархія наслідування",
      explanation: "Занадто багато рівнів наслідування ускладнює код та зменшує гнучкість.",
      correctApproach: "Уникайте більше 2-3 рівнів наслідування. Використовуйте композицію для складних відношень."
    },
    {
      mistake: "Не розуміти різницю між 'є' та 'має'",
      explanation: "Плутанина між 'є' (is-a) та 'має' (has-a) призводить до неправильного вибору підходу.",
      correctApproach: "Якщо можна сказати 'X є Y' — наслідування. Якщо 'X має Y' — композиція."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Композиція** — "має" відношення (has-a)
2. **Наслідування** — "є" відношення (is-a)
3. **Порівняння** — коли що використовувати
4. **Проблеми наслідування** — тісний зв'язок, складна ієрархія
5. **Переваги композиції** — гнучкість, легше тестувати

**Правило:** "Favor composition over inheritance"

**Коли наслідування:**
- Справжнє "є" відношення
- Логічна ієрархія
- Спільна поведінка

**Коли композиція:**
- "Має" відношення
- Потрібна гнучкість
- Уникання складної ієрархії

**Важливо:**
- Розумійте різницю між "є" та "має"
- Уникайте занадто глибокого наслідування
- Віддавайте перевагу композиції, коли можливо

Правильний вибір підходу робить код більш гнучким та підтримуваним!`,
  
  practiceTask: {
    title: "Створення системи з композицією та наслідуванням",
    description: "Створіть систему, демонструючи правильне використання обох підходів",
    problemStatement: `Створіть систему обробки замовлень, демонструючи композицію та наслідування:

**Частина 1: Наслідування (is-a)**
Створіть ієрархію співробітників:
- Employee (базовий клас)
  - Атрибути: name, employee_id
  - Методи: work(), get_info()
- Manager (наслідує від Employee)
  - Додатковий атрибут: department
  - Перевизначити: work() — "Керую командою"
- Developer (наслідує від Employee)
  - Додатковий атрибут: programming_language
  - Перевизначити: work() — "Пишу код"

**Частина 2: Композиція (has-a)**
Створіть систему обробки замовлень:
- PaymentMethod (абстрактний клас)
  - Абстрактний метод: process_payment(amount)
- CreditCardPayment, PayPalPayment (реалізують PaymentMethod)
- Order (має PaymentMethod через композицію)
  - Атрибути: order_id, items, payment_method
  - Методи: add_item(), process_payment()

**Вимоги:**
- Використовуйте наслідування для Employee ієрархії (справжнє "є")
- Використовуйте композицію для Order (Order "має" PaymentMethod)
- Покажіть, як можна легко змінити payment_method в Order

**Створіть об'єкти та продемонструйте обидва підходи.**`,
    inputFormat: "Створіть ієрархію та систему з композицією",
    outputFormat: `Приклад виведення:
=== Наслідування (is-a) ===
Менеджер Олександр: Керую командою
Розробник Марія: Пишу код

=== Композиція (has-a) ===
Замовлення #1: Оплачено 1000 грн карткою
Замовлення #2: Оплачено 500 грн через PayPal`,
    examples: [
      {
        input: "Створення співробітників та замовлень",
        output: "Демонстрація обох підходів",
        explanation: "Показує правильне використання наслідування та композиції"
      }
    ],
    solution: {
      code: `from abc import ABC, abstractmethod

# ===== НАСЛІДУВАННЯ (is-a) =====
class Employee:
    def __init__(self, name, employee_id):
        self.name = name
        self.employee_id = employee_id
    
    def work(self):
        return "Працюю"
    
    def get_info(self):
        return f"{self.name} (ID: {self.employee_id})"

class Manager(Employee):  # Manager "є" Employee
    def __init__(self, name, employee_id, department):
        super().__init__(name, employee_id)
        self.department = department
    
    def work(self):
        return "Керую командою"
    
    def get_info(self):
        base = super().get_info()
        return f"Менеджер {base}, Відділ: {self.department}"

class Developer(Employee):  # Developer "є" Employee
    def __init__(self, name, employee_id, programming_language):
        super().__init__(name, employee_id)
        self.programming_language = programming_language
    
    def work(self):
        return "Пишу код"
    
    def get_info(self):
        base = super().get_info()
        return f"Розробник {base}, Мова: {self.programming_language}"

# ===== КОМПОЗИЦІЯ (has-a) =====
class PaymentMethod(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardPayment(PaymentMethod):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def process_payment(self, amount):
        return f"Оплачено {amount} грн карткою {self.card_number}"

class PayPalPayment(PaymentMethod):
    def __init__(self, email):
        self.email = email
    
    def process_payment(self, amount):
        return f"Оплачено {amount} грн через PayPal ({self.email})"

class Order:
    order_counter = 0
    
    def __init__(self, payment_method):  # Композиція: Order "має" PaymentMethod
        Order.order_counter += 1
        self.order_id = Order.order_counter
        self.items = []
        self.payment_method = payment_method  # Композиція!
    
    def add_item(self, item, price):
        self.items.append({"item": item, "price": price})
    
    def get_total(self):
        return sum(item["price"] for item in self.items)
    
    def process_payment(self):
        total = self.get_total()
        return self.payment_method.process_payment(total)
    
    def change_payment_method(self, new_payment_method):
        """Легко змінити метод оплати (перевага композиції!)."""
        self.payment_method = new_payment_method

# ===== ДЕМОНСТРАЦІЯ =====
print("=== Наслідування (is-a) ===")
manager = Manager("Олександр", "M001", "IT")
developer = Developer("Марія", "D001", "Python")

print(f"{manager.get_info()}: {manager.work()}")
print(f"{developer.get_info()}: {developer.work()}")

print("\\n=== Композиція (has-a) ===")
# Створення замовлень з різними методами оплати
order1 = Order(CreditCardPayment("1234-5678"))
order1.add_item("Книга", 500)
order1.add_item("Курс", 500)
print(f"Замовлення #{order1.order_id}: {order1.process_payment()}")

order2 = Order(PayPalPayment("user@example.com"))
order2.add_item("Книга", 500)
print(f"Замовлення #{order2.order_id}: {order2.process_payment()}")

# Демонстрація гнучкості композиції
print("\\n=== Гнучкість композиції ===")
order1.change_payment_method(PayPalPayment("new@example.com"))
print(f"Замовлення #{order1.order_id} (змінено метод): {order1.process_payment()}")`,
      explanation: "Рішення демонструє правильне використання наслідування для 'є' відношення та композиції для 'має' відношення."
    },
    hints: [
      "Використовуйте наслідування для Employee ієрархії (справжнє 'є')",
      "Використовуйте композицію для Order (Order 'має' PaymentMethod)",
      "Покажіть, як можна легко змінити payment_method",
      "Використовуйте абстрактний клас для PaymentMethod"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке композиція?",
        options: ["Наслідування", "Включення одного об'єкта в інший", "Копіювання", "Видалення"],
        correctAnswer: 1,
        explanation: "Композиція — це включення одного об'єкта в інший як частину ('має' відношення)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати наслідування?",
        options: ["Завжди", "Для 'має' відношення", "Для 'є' відношення", "Ніколи"],
        correctAnswer: 2,
        explanation: "Наслідування використовується для 'є' (is-a) відношення, коли дочірній клас справді є батьківським."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який принцип рекомендується в ООП?",
        options: ["Favor inheritance over composition", "Favor composition over inheritance", "Тільки наслідування", "Тільки композиція"],
        correctAnswer: 1,
        explanation: "Рекомендується 'Favor composition over inheritance' — віддавати перевагу композиції перед наслідуванням."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

