/**
 * Lesson 05-2: Атрибути та методи класу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_2 = {
  lessonId: "lesson-05-2",
  moduleId: "module-05",
  order: 2,
  title: "Атрибути та методи класу",
  
  learningObjectives: [
    "Розуміти різницю між типами методів",
    "Створювати методи екземпляра",
    "Використовувати методи класу (@classmethod)",
    "Застосовувати статичні методи (@staticmethod)",
    "Вибирати правильний тип методу для задачі"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-05-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Типи методів у Python",
        content: `У Python є три типи методів:

1. **Методи екземпляра** — працюють з конкретним об'єктом
2. **Методи класу** (@classmethod) — працюють з класом
3. **Статичні методи** (@staticmethod) — не потребують доступу до класу або об'єкта

**Коли використовувати який тип:**

- **Методи екземпляра** — коли потрібен доступ до атрибутів об'єкта
- **Методи класу** — коли потрібен доступ до класу або створення альтернативних конструкторів
- **Статичні методи** — коли метод логічно пов'язаний з класом, але не потребує доступу до класу або об'єкта`
      },
      {
        title: "Методи екземпляра",
        content: `**Методи екземпляра** — це звичайні методи, які ми вже вивчили. Вони працюють з конкретним об'єктом.

**Характеристики:**
- Перший параметр завжди \`self\`
- Мають доступ до атрибутів об'єкта через \`self\`
- Викликаються через об'єкт: \`об'єкт.метод()\`

**Приклад:**

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grades = []
    
    def add_grade(self, grade):
        """Метод екземпляра - працює з конкретним студентом"""
        self.grades.append(grade)
    
    def get_average(self):
        """Метод екземпляра - обчислює середній бал конкретного студента"""
        if len(self.grades) == 0:
            return 0
        return sum(self.grades) / len(self.grades)

# Використання
student = Student("Олександр", 20)
student.add_grade(85)
student.add_grade(90)
print(student.get_average())  # 87.5
\`\`\`

**Важливо:**
- Методи екземпляра мають доступ до всіх атрибутів об'єкта
- Кожен об'єкт має свої власні значення атрибутів
- Методи працюють з даними конкретного об'єкта`
      },
      {
        title: "Методи класу (@classmethod)",
        content: `**Методи класу** — це методи, які працюють з класом, а не з конкретним об'єктом.

**Характеристики:**
- Перший параметр завжди \`cls\` (посилання на клас)
- Мають доступ до атрибутів класу
- Викликаються через клас: \`Клас.метод()\` або через об'єкт: \`об'єкт.метод()\`
- Декоратор \`@classmethod\`

**Використання:**
1. **Альтернативні конструктори** — створення об'єктів різними способами
2. **Робота з атрибутами класу** — зміна атрибутів, які однакові для всіх об'єктів
3. **Фабричні методи** — створення об'єктів з різними параметрами

**Приклад:**

\`\`\`python
class Student:
    school = "Університет"  # Атрибут класу
    total_students = 0
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Student.total_students += 1  # Збільшуємо лічильник
    
    @classmethod
    def from_string(cls, student_string):
        """Альтернативний конструктор - створює студента з рядка"""
        name, age = student_string.split(",")
        return cls(name.strip(), int(age.strip()))
    
    @classmethod
    def change_school(cls, new_school):
        """Змінює назву школи для всіх студентів"""
        cls.school = new_school
    
    @classmethod
    def get_total_students(cls):
        """Повертає загальну кількість студентів"""
        return cls.total_students

# Звичайне створення
student1 = Student("Олександр", 20)

# Альтернативний конструктор
student2 = Student.from_string("Марія, 19")

print(Student.get_total_students())  # 2
print(Student.school)  # Університет

# Змінюємо школу для всіх
Student.change_school("Технічний університет")
print(student1.school)  # Технічний університет
print(student2.school)  # Технічний університет
\`\`\`

**Важливо:**
- \`cls\` — це посилання на клас (аналогічно до \`self\` для об'єкта)
- Методи класу можуть створювати нові об'єкти через \`cls(...)\`
- Зміни в атрибутах класу впливають на всі об'єкти`
      },
      {
        title: "Статичні методи (@staticmethod)",
        content: `**Статичні методи** — це методи, які не потребують доступу до класу або об'єкта.

**Характеристики:**
- Не мають доступу до \`self\` або \`cls\`
- Не можуть змінювати атрибути класу або об'єкта
- Викликаються через клас: \`Клас.метод()\` або через об'єкт: \`об'єкт.метод()\`
- Декоратор \`@staticmethod\`

**Використання:**
- Допоміжні функції, логічно пов'язані з класом
- Утилітарні функції
- Функції, які не потребують доступу до стану об'єкта

**Приклад:**

\`\`\`python
class MathUtils:
    @staticmethod
    def add(a, b):
        """Статичний метод - не потребує доступу до класу"""
        return a + b
    
    @staticmethod
    def multiply(a, b):
        """Статичний метод"""
        return a * b
    
    @staticmethod
    def is_even(number):
        """Перевіряє, чи число парне"""
        return number % 2 == 0

# Виклик через клас
result1 = MathUtils.add(5, 3)  # 8
result2 = MathUtils.multiply(4, 5)  # 20
print(MathUtils.is_even(10))  # True

# Можна викликати через об'єкт (але не рекомендується)
obj = MathUtils()
result3 = obj.add(2, 2)  # 4
\`\`\`

**Практичний приклад:**

\`\`\`python
class DateUtils:
    @staticmethod
    def is_valid_date(day, month, year):
        """Перевіряє, чи дата валідна"""
        if month < 1 or month > 12:
            return False
        if day < 1:
            return False
        
        days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if month == 2 and year % 4 == 0:  # Високосний рік
            days_in_month[1] = 29
        
        return day <= days_in_month[month - 1]
    
    @staticmethod
    def format_date(day, month, year):
        """Форматує дату"""
        return f"{day:02d}.{month:02d}.{year}"

# Використання
print(DateUtils.is_valid_date(29, 2, 2024))  # True (високосний рік)
print(DateUtils.is_valid_date(29, 2, 2023))  # False
print(DateUtils.format_date(5, 3, 2024))  # 05.03.2024
\`\`\`

**Важливо:**
- Статичні методи не мають доступу до \`self\` або \`cls\`
- Вони працюють як звичайні функції, але логічно пов'язані з класом
- Корисно для утилітарних функцій`
      },
      {
        title: "Порівняння типів методів",
        content: `**Порівняльна таблиця:**

| Характеристика | Метод екземпляра | Метод класу | Статичний метод |
|----------------|------------------|-------------|-----------------|
| Перший параметр | \`self\` | \`cls\` | Немає |
| Доступ до об'єкта | ✅ Так | ❌ Ні | ❌ Ні |
| Доступ до класу | ✅ Так (через self) | ✅ Так | ❌ Ні |
| Декоратор | Не потрібен | \`@classmethod\` | \`@staticmethod\` |
| Виклик через об'єкт | ✅ Так | ✅ Так | ✅ Так (не рекомендується) |
| Виклик через клас | ❌ Ні | ✅ Так | ✅ Так |

**Приклад з усіма типами:**

\`\`\`python
class Calculator:
    # Атрибут класу
    operation_count = 0
    
    def __init__(self, name):
        self.name = name
    
    # Метод екземпляра
    def add(self, a, b):
        """Додає два числа"""
        Calculator.operation_count += 1
        return a + b
    
    # Метод класу
    @classmethod
    def get_operation_count(cls):
        """Повертає кількість операцій"""
        return cls.operation_count
    
    @classmethod
    def reset_count(cls):
        """Скидає лічильник операцій"""
        cls.operation_count = 0
    
    # Статичний метод
    @staticmethod
    def is_number(value):
        """Перевіряє, чи значення є числом"""
        return isinstance(value, (int, float))

# Використання
calc = Calculator("Мій калькулятор")

# Метод екземпляра
result = calc.add(5, 3)  # 8

# Метод класу
print(Calculator.get_operation_count())  # 1

# Статичний метод
print(Calculator.is_number(5))  # True
print(Calculator.is_number("5"))  # False
\`\`\`

**Коли використовувати:**

- **Метод екземпляра** — коли потрібен доступ до атрибутів об'єкта
- **Метод класу** — коли потрібен доступ до класу або альтернативний конструктор
- **Статичний метод** — коли метод логічно пов'язаний з класом, але не потребує доступу до стану`
      },
      {
        title: "Практичний приклад: клас BankAccount",
        content: `**Комплексний приклад з усіма типами методів:**

\`\`\`python
class BankAccount:
    # Атрибути класу
    bank_name = "Національний банк"
    total_accounts = 0
    interest_rate = 0.05  # 5% річних
    
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.balance = initial_balance
        self.account_number = BankAccount.total_accounts + 1
        BankAccount.total_accounts += 1
    
    # Метод екземпляра
    def deposit(self, amount):
        """Поповнює рахунок"""
        if amount > 0:
            self.balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        """Знімає кошти"""
        if 0 < amount <= self.balance:
            self.balance -= amount
            return True
        return False
    
    def get_balance(self):
        """Повертає баланс"""
        return self.balance
    
    # Метод класу
    @classmethod
    def create_with_bonus(cls, owner, bonus=100):
        """Альтернативний конструктор - створює рахунок з бонусом"""
        return cls(owner, bonus)
    
    @classmethod
    def change_interest_rate(cls, new_rate):
        """Змінює процентну ставку для всіх рахунків"""
        cls.interest_rate = new_rate
    
    @classmethod
    def get_total_accounts(cls):
        """Повертає загальну кількість рахунків"""
        return cls.total_accounts
    
    # Статичний метод
    @staticmethod
    def validate_amount(amount):
        """Перевіряє, чи сума валідна"""
        return isinstance(amount, (int, float)) and amount > 0
    
    @staticmethod
    def calculate_interest(principal, rate, years):
        """Обчислює відсотки"""
        return principal * rate * years

# Використання
# Звичайне створення
account1 = BankAccount("Олександр", 1000)

# Альтернативний конструктор
account2 = BankAccount.create_with_bonus("Марія", 200)

# Методи екземпляра
account1.deposit(500)
account1.withdraw(200)

# Методи класу
print(f"Загальна кількість рахунків: {BankAccount.get_total_accounts()}")
BankAccount.change_interest_rate(0.06)

# Статичні методи
if BankAccount.validate_amount(100):
    account1.deposit(100)

interest = BankAccount.calculate_interest(1000, 0.05, 2)
print(f"Відсотки: {interest}")  # 100.0
\`\`\`

**Що ми бачимо:**
- Методи екземпляра працюють з конкретним рахунком
- Методи класу працюють з класом (загальна кількість, процентна ставка)
- Статичні методи — допоміжні функції, які не потребують доступу до стану`
      },
      {
        title: "Підсумок",
        content: `**Що ми вивчили:**

1. ✅ **Методи екземпляра** — працюють з конкретним об'єктом (self)
2. ✅ **Методи класу** (@classmethod) — працюють з класом (cls)
3. ✅ **Статичні методи** (@staticmethod) — не потребують доступу до стану

**Ключові відмінності:**

| Тип методу | Параметр | Доступ до об'єкта | Доступ до класу |
|------------|----------|-------------------|-----------------|
| Екземпляра | \`self\` | ✅ | ✅ |
| Класу | \`cls\` | ❌ | ✅ |
| Статичний | Немає | ❌ | ❌ |

**Коли використовувати:**
- **Метод екземпляра** — для роботи з даними об'єкта
- **Метод класу** — для альтернативних конструкторів або роботи з класом
- **Статичний метод** — для утилітарних функцій, логічно пов'язаних з класом

**Наступні кроки:**
- Вивчимо інкапсуляцію та модифікатори доступу
- Дізнаємося про наслідування
- Вивчимо поліморфізм

Тепер ви розумієте різницю між типами методів та можете вибирати правильний тип для вашої задачі!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Метод екземпляра",
      code: `class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []
    
    def add_grade(self, grade):
        """Метод екземпляра - працює з конкретним студентом"""
        self.grades.append(grade)

student = Student("Олександр")
student.add_grade(85)`,
      explanation: "Демонструє метод екземпляра, який працює з атрибутами конкретного об'єкта через self."
    },
    {
      title: "Метод класу (@classmethod)",
      code: `class Student:
    total_students = 0
    
    def __init__(self, name):
        self.name = name
        Student.total_students += 1
    
    @classmethod
    def from_string(cls, student_string):
        """Альтернативний конструктор"""
        name, age = student_string.split(",")
        return cls(name.strip(), int(age.strip()))
    
    @classmethod
    def get_total(cls):
        return cls.total_students

# Альтернативний конструктор
student = Student.from_string("Олександр, 20")
print(Student.get_total())  # 1`,
      explanation: "Показує методи класу з альтернативним конструктором та доступом до атрибутів класу."
    },
    {
      title: "Статичний метод (@staticmethod)",
      code: `class MathUtils:
    @staticmethod
    def add(a, b):
        """Статичний метод - не потребує доступу до класу"""
        return a + b
    
    @staticmethod
    def is_even(number):
        return number % 2 == 0

# Виклик через клас
result = MathUtils.add(5, 3)  # 8
print(MathUtils.is_even(10))  # True`,
      explanation: "Демонструє статичні методи, які не потребують доступу до класу або об'єкта."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутають self та cls",
      explanation: "Важливо розуміти різницю: self — це об'єкт, cls — це клас.",
      correctApproach: `# Метод екземпляра - використовує self
class Student:
    def get_name(self):
        return self.name

# Метод класу - використовує cls
class Student:
    @classmethod
    def get_total(cls):
        return cls.total_students`
    },
    {
      mistake: "Використовують статичні методи, коли потрібен доступ до об'єкта",
      explanation: "Якщо метод потребує доступу до атрибутів об'єкта, він має бути методом екземпляра.",
      correctApproach: `# Неправильно:
class Student:
    @staticmethod
    def get_name(student):  # Потрібно передавати об'єкт
        return student.name

# Правильно:
class Student:
    def get_name(self):  # Метод екземпляра
        return self.name`
    },
    {
      mistake: "Забувають декоратор @classmethod або @staticmethod",
      explanation: "Без декоратора метод вважається методом екземпляра.",
      correctApproach: `# Неправильно:
class Student:
    def get_total(self):  # Це метод екземпляра, а не класу
        return Student.total_students

# Правильно:
class Student:
    @classmethod
    def get_total(cls):  # Метод класу
        return cls.total_students`
    },
    {
      mistake: "Використовують cls замість self у методах екземпляра",
      explanation: "У методах екземпляра завжди використовується self, а не cls.",
      correctApproach: `# Неправильно:
class Student:
    def get_name(cls):  # Помилка! Має бути self
        return cls.name

# Правильно:
class Student:
    def get_name(self):  # self для методів екземпляра
        return self.name`
    }
  ],
  
  summary: `На цьому уроці ми вивчили різні типи методів у Python:

**Типи методів:**

1. **Методи екземпляра**
   - Перший параметр: \`self\`
   - Працюють з конкретним об'єктом
   - Мають доступ до атрибутів об'єкта

2. **Методи класу** (@classmethod)
   - Перший параметр: \`cls\`
   - Працюють з класом
   - Використовуються для альтернативних конструкторів
   - Мають доступ до атрибутів класу

3. **Статичні методи** (@staticmethod)
   - Не мають параметрів self або cls
   - Не потребують доступу до стану
   - Використовуються для утилітарних функцій

**Ключові моменти:**
- self — посилання на об'єкт
- cls — посилання на клас
- Декоратори @classmethod та @staticmethod обов'язкові
- Правильний вибір типу методу робить код більш зрозумілим та ефективним

**Коли використовувати:**
- Метод екземпляра — для роботи з даними об'єкта
- Метод класу — для альтернативних конструкторів або роботи з класом
- Статичний метод — для утилітарних функцій

Тепер ви можете правильно вибирати тип методу для вашої задачі!`,
  
  practiceTask: {
    title: "Клас Product з різними типами методів",
    description: "Створіть клас Product з методами екземпляра, класу та статичними методами",
    problemStatement: `Створіть клас Product з наступними вимогами:

1. **Атрибути класу:**
   - \`store_name\` = "Онлайн магазин"
   - \`total_products\` = 0 (лічильник продуктів)

2. **Атрибути об'єкта (в __init__):**
   - \`name\` — назва продукту
   - \`price\` — ціна
   - \`quantity\` — кількість на складі

3. **Методи екземпляра:**
   - \`get_total_value()\` — повертає загальну вартість (price * quantity)
   - \`apply_discount(percent)\` — застосовує знижку до ціни (зменшує price на percent%)
   - \`is_available()\` — повертає True, якщо quantity > 0

4. **Методи класу (@classmethod):**
   - \`from_string(cls, product_string)\` — альтернативний конструктор, створює продукт з рядка формату "назва,ціна,кількість"
   - \`get_total_products(cls)\` — повертає загальну кількість продуктів
   - \`change_store_name(cls, new_name)\` — змінює назву магазину для всіх продуктів

5. **Статичні методи (@staticmethod):**
   - \`validate_price(price)\` — перевіряє, чи ціна валідна (більше 0)
   - \`format_price(price)\` — форматує ціну у форматі "XXX.XX грн"

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді.

Створіть кілька об'єктів Product різними способами та продемонструйте роботу всіх методів.`,
    inputFormat: `Введіть значення напряму в коді:
name = "Ноутбук"
price = 25000
quantity = 5

product_string = "Телефон,15000,10"

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Приклад виведення:
Загальна вартість: 125000 грн
Продукт доступний: True
Ціна після знижки: 22500.0 грн
Загальна кількість продуктів: 2
Назва магазину: Новий магазин
Ціна валідна: True
Відформатована ціна: 25000.00 грн`,
    examples: [
      {
        input: "name = 'Ноутбук', price = 25000, quantity = 5",
        output: `Загальна вартість: 125000 грн
Продукт доступний: True
Ціна після знижки: 22500.0 грн
Загальна кількість продуктів: 1
Назва магазину: Онлайн магазин`,
        explanation: "Демонструє створення об'єкта та виклик методів екземпляра та класу."
      },
      {
        input: "product_string = 'Телефон,15000,10'",
        output: `Продукт створено з рядка: Телефон, 15000, 10
Загальна вартість: 150000 грн
Загальна кількість продуктів: 2`,
        explanation: "Демонструє альтернативний конструктор from_string() та статичні методи."
      }
    ],
    solution: {
      code: `# Клас Product з різними типами методів

class Product:
    # Атрибути класу
    store_name = "Онлайн магазин"
    total_products = 0
    
    def __init__(self, name, price, quantity):
        # Атрибути об'єкта
        self.name = name
        self.price = price
        self.quantity = quantity
        Product.total_products += 1
    
    # Методи екземпляра
    def get_total_value(self):
        """Повертає загальну вартість"""
        return self.price * self.quantity
    
    def apply_discount(self, percent):
        """Застосовує знижку до ціни"""
        if 0 <= percent <= 100:
            self.price = self.price * (1 - percent / 100)
            return True
        return False
    
    def is_available(self):
        """Перевіряє, чи продукт доступний"""
        return self.quantity > 0
    
    # Методи класу
    @classmethod
    def from_string(cls, product_string):
        """Альтернативний конструктор - створює продукт з рядка"""
        parts = product_string.split(",")
        if len(parts) == 3:
            name = parts[0].strip()
            price = float(parts[1].strip())
            quantity = int(parts[2].strip())
            return cls(name, price, quantity)
        else:
            raise ValueError("Невірний формат рядка")
    
    @classmethod
    def get_total_products(cls):
        """Повертає загальну кількість продуктів"""
        return cls.total_products
    
    @classmethod
    def change_store_name(cls, new_name):
        """Змінює назву магазину для всіх продуктів"""
        cls.store_name = new_name
    
    # Статичні методи
    @staticmethod
    def validate_price(price):
        """Перевіряє, чи ціна валідна"""
        return isinstance(price, (int, float)) and price > 0
    
    @staticmethod
    def format_price(price):
        """Форматує ціну у форматі 'XXX.XX грн'"""
        return f"{price:.2f} грн"

# Вводимо значення напряму в коді (не використовуємо input())

# Створюємо продукт звичайним способом
product1 = Product("Ноутбук", 25000, 5)

# Методи екземпляра
print(f"Загальна вартість: {product1.get_total_value()} грн")
print(f"Продукт доступний: {product1.is_available()}")
product1.apply_discount(10)
print(f"Ціна після знижки: {product1.price} грн")

# Методи класу
print(f"Загальна кількість продуктів: {Product.get_total_products()}")
Product.change_store_name("Новий магазин")
print(f"Назва магазину: {Product.store_name}")

print()

# Альтернативний конструктор
product_string = "Телефон,15000,10"
product2 = Product.from_string(product_string)
print(f"Продукт створено з рядка: {product2.name}, {product2.price}, {product2.quantity}")
print(f"Загальна вартість: {product2.get_total_value()} грн")
print(f"Загальна кількість продуктів: {Product.get_total_products()}")

print()

# Статичні методи
print(f"Ціна валідна: {Product.validate_price(25000)}")
print(f"Відформатована ціна: {Product.format_price(25000)}")
print(f"Ціна валідна (від'ємна): {Product.validate_price(-100)}")`,
      explanation: "Рішення демонструє всі три типи методів: методи екземпляра для роботи з конкретним продуктом, методи класу для роботи з класом та альтернативних конструкторів, статичні методи для утилітарних функцій."
    },
    hints: [
      "Введіть значення напряму в коді - не використовуйте input()",
      "Методи екземпляра мають self як перший параметр",
      "Методи класу мають @classmethod декоратор та cls як перший параметр",
      "Статичні методи мають @staticmethod декоратор та не мають self або cls",
      "Альтернативний конструктор from_string() має розбити рядок та створити об'єкт через cls()",
      "Для зміни атрибута класу використовуйте cls.атрибут = нове_значення",
      "Статичні методи не мають доступу до self або cls, вони працюють як звичайні функції"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: ['"Ноутбук"', '25000', '5'],
        expectedOutput: "125000",
        description: "Перевірка методу get_total_value()"
      },
      {
        input: ['"Телефон,15000,10"'],
        expectedOutput: "Телефон",
        description: "Перевірка альтернативного конструктора from_string()"
      },
      {
        input: ['25000'],
        expectedOutput: "True",
        description: "Перевірка статичного методу validate_price()"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр має метод екземпляра?",
        options: [
          "self",
          "cls",
          "Немає параметрів",
          "obj"
        ],
        correctAnswer: 0,
        explanation: "Метод екземпляра завжди має self як перший параметр. self — це посилання на поточний об'єкт."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який декоратор використовується для методів класу?",
        options: [
          "@classmethod",
          "@staticmethod",
          "@instancemethod",
          "Декоратор не потрібен"
        ],
        correctAnswer: 0,
        explanation: "Методи класу позначаються декоратором @classmethod. Перший параметр таких методів — cls (посилання на клас)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке cls у методах класу?",
        options: [
          "Посилання на клас",
          "Посилання на об'єкт",
          "Назва методу",
          "Декоратор"
        ],
        correctAnswer: 0,
        explanation: "cls — це посилання на клас (аналогічно до self для об'єкта). Він завжди є першим параметром методів класу."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи мають статичні методи доступ до self або cls?",
        options: [
          "Ні, не мають",
          "Так, мають доступ до self",
          "Так, мають доступ до cls",
          "Так, мають доступ до обох"
        ],
        correctAnswer: 0,
        explanation: "Статичні методи не мають доступу до self або cls. Вони працюють як звичайні функції, але логічно пов'язані з класом."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nclass Calculator:\n    count = 0\n    \n    @classmethod\n    def increment(cls):\n        cls.count += 1\n        return cls.count\n\nprint(Calculator.increment())\n```",
        options: [
          "1",
          "0",
          "Помилка",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Метод класу increment() збільшує атрибут класу count на 1 та повертає його значення. Результат: 1."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати статичні методи?",
        options: [
          "Коли метод логічно пов'язаний з класом, але не потребує доступу до стану",
          "Коли потрібен доступ до атрибутів об'єкта",
          "Коли потрібен доступ до атрибутів класу",
          "Завжди"
        ],
        correctAnswer: 0,
        explanation: "Статичні методи використовуються для утилітарних функцій, які логічно пов'язані з класом, але не потребують доступу до стану об'єкта або класу."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Методи класу можуть створювати нові об'єкти через cls().",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Так, методи класу можуть створювати нові об'єкти через cls(). Це часто використовується для альтернативних конструкторів."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно викликати статичний метод?",
        options: [
          "Клас.метод() або об'єкт.метод()",
          "Тільки об'єкт.метод()",
          "Тільки Клас.метод()",
          "Метод() безпосередньо"
        ],
        correctAnswer: 0,
        explanation: "Статичні методи можна викликати як через клас (Клас.метод()), так і через об'єкт (об'єкт.метод()), але краще викликати через клас."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
