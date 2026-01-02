/**
 * Lesson 05-4: Наслідування
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_4 = {
  lessonId: "lesson-05-4",
  moduleId: "module-05",
  order: 4,
  title: "Наслідування",
  
  learningObjectives: [
    "Розуміти концепцію наслідування в ООП",
    "Створювати дочірні класи",
    "Перевизначати методи батьківського класу",
    "Використовувати super() для доступу до батьківського класу",
    "Розуміти MRO (Method Resolution Order)",
    "Працювати з множинним наслідуванням"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-05-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке наслідування?",
        content: `**Наслідування** — це один з основних принципів об'єктно-орієнтованого програмування, який дозволяє створювати нові класи на основі існуючих.

**Визначення:**
Наслідування — це механізм, за допомогою якого дочірній клас (підклас) успадковує атрибути та методи батьківського класу (суперкласу).

**Основні ідеї:**
- ✅ **Повторне використання коду** — не потрібно дублювати код
- ✅ **Розширення функціональності** — можна додавати нові методи та атрибути
- ✅ **Перевизначення** — можна змінювати поведінку успадкованих методів
- ✅ **Ієрархія класів** — створюється логічна структура класів

**Аналогія:**
Уявіть сім'ю:
- Батько має певні характеристики (клас-батько)
- Діти успадковують ці характеристики (дочірні класи)
- Діти можуть мати свої унікальні риси (додаткові методи)
- Діти можуть поводитися інакше, ніж батьки (перевизначення методів)

**Базовий синтаксис:**
\`\`\`python
class БатьківськийКлас:
    # атрибути та методи батьківського класу
    pass

class ДочірнійКлас(БатьківськийКлас):
    # атрибути та методи дочірнього класу
    pass
\`\`\`
`
      },
      {
        title: "Простий приклад наслідування",
        content: `Розглянемо простий приклад з тваринами:

\`\`\`python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def make_sound(self):
        return "Якась тварина видає звук"
    
    def get_info(self):
        return f"{self.name}, {self.age} років"

class Dog(Animal):
    def make_sound(self):
        return "Гав-гав!"

class Cat(Animal):
    def make_sound(self):
        return "Мяу-мяу!"

# Використання
dog = Dog("Рекс", 3)
cat = Cat("Мурка", 2)

print(dog.get_info())  # Рекс, 3 років (успадкований метод)
print(dog.make_sound())  # Гав-гав! (перевизначений метод)

print(cat.get_info())  # Мурка, 2 роки (успадкований метод)
print(cat.make_sound())  # Мяу-мяу! (перевизначений метод)
\`\`\`

**Що відбувається:**
1. Клас \`Animal\` — батьківський клас з методами \`__init__\`, \`make_sound\`, \`get_info\`
2. Клас \`Dog\` успадковує від \`Animal\` і перевизначає \`make_sound\`
3. Клас \`Cat\` успадковує від \`Animal\` і перевизначає \`make_sound\`
4. Обидва дочірні класи мають доступ до \`get_info\` без дублювання коду
`
      },
      {
        title: "Перевизначення методів",
        content: `**Перевизначення методів** — це створення методу в дочірньому класі з тією ж назвою, що й у батьківському класі.

**Коли використовувати:**
- Коли потрібно змінити поведінку успадкованого методу
- Коли потрібно додати специфічну логіку для дочірнього класу

**Приклад:**

\`\`\`python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start(self):
        return "Транспортний засіб запущено"
    
    def get_info(self):
        return f"{self.brand} {self.model}"

class Car(Vehicle):
    def start(self):
        return f"{self.brand} {self.model}: Двигун запущено, ключ повернуто"

class Bicycle(Vehicle):
    def start(self):
        return f"{self.brand} {self.model}: Почали крутити педалі"

# Використання
car = Car("Toyota", "Camry")
bike = Bicycle("Trek", "Mountain")

print(car.start())  # Toyota Camry: Двигун запущено, ключ повернуто
print(bike.start())  # Trek Mountain: Почали крутити педалі
\`\`\`

**Важливо:**
- Перевизначений метод повністю замінює метод батьківського класу
- Якщо потрібно викликати метод батьківського класу, використовуйте \`super()\`
`
      },
      {
        title: "Використання super()",
        content: `**super()** — це функція, яка дозволяє отримати доступ до методів батьківського класу.

**Коли використовувати:**
- Коли потрібно розширити функціональність батьківського методу
- Коли потрібно викликати конструктор батьківського класу
- Коли потрібно використати логіку батьківського класу та додати свою

**Приклад 1: Виклик конструктора батьківського класу**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Мене звати {self.name}, мені {self.age} років"

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Викликаємо конструктор батьківського класу
        self.student_id = student_id
    
    def introduce(self):
        base_intro = super().introduce()  # Викликаємо метод батьківського класу
        return f"{base_intro}. Мій студентський ID: {self.student_id}"

# Використання
student = Student("Олександр", 20, "ST12345")
print(student.introduce())
# Мене звати Олександр, мені 20 років. Мій студентський ID: ST12345
\`\`\`

**Приклад 2: Розширення функціональності**

\`\`\`python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def calculate_bonus(self):
        return self.salary * 0.1  # 10% бонус

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size
    
    def calculate_bonus(self):
        base_bonus = super().calculate_bonus()  # Базовий бонус
        team_bonus = self.team_size * 100  # Додатковий бонус за команду
        return base_bonus + team_bonus

# Використання
manager = Manager("Марія", 50000, 5)
print(f"Бонус: {manager.calculate_bonus()}")  # 5000 + 500 = 5500
\`\`\`

**Переваги super():**
- ✅ Не потрібно вказувати ім'я батьківського класу
- ✅ Працює з множинним наслідуванням
- ✅ Легше підтримувати код
`
      },
      {
        title: "MRO (Method Resolution Order)",
        content: `**MRO (Method Resolution Order)** — це порядок, в якому Python шукає методи та атрибути в ієрархії класів.

**Як працює MRO:**
1. Python шукає метод у поточному класі
2. Якщо не знайдено, шукає в батьківських класах
3. Використовує алгоритм C3 для визначення порядку

**Перевірка MRO:**

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

class D(B, C):
    pass

# Перевірка MRO
print(D.__mro__)
# (<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)

d = D()
print(d.method())  # B (перший у MRO)
\`\`\`

**Алгоритм C3:**
- Забезпечує послідовний порядок пошуку
- Запобігає проблемам з множинним наслідуванням
- Гарантує, що батьківський клас не перевіряється двічі

**Приклад з super():**

\`\`\`python
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return f"B -> {super().method()}"

class C(A):
    def method(self):
        return f"C -> {super().method()}"

class D(B, C):
    def method(self):
        return f"D -> {super().method()}"

d = D()
print(d.method())
# D -> B -> C -> A
\`\`\`
`
      },
      {
        title: "Множинне наслідування",
        content: `**Множинне наслідування** — це можливість класу успадковувати від кількох батьківських класів одночасно.

**Синтаксис:**
\`\`\`python
class Клас1:
    pass

class Клас2:
    pass

class ДочірнійКлас(Клас1, Клас2):
    pass
\`\`\`

**Приклад: Права доступу**

\`\`\`python
class Readable:
    def read(self):
        return "Читаю дані"

class Writable:
    def write(self, data):
        return f"Записую: {data}"

class ReadWriteFile(Readable, Writable):
    def __init__(self, filename):
        self.filename = filename
    
    def get_info(self):
        return f"Файл {self.filename} підтримує читання та запис"

# Використання
file = ReadWriteFile("data.txt")
print(file.read())  # Читаю дані
print(file.write("Hello"))  # Записую: Hello
print(file.get_info())  # Файл data.txt підтримує читання та запис
\`\`\`

**Приклад: Mixin-класи**

\`\`\`python
class LoggerMixin:
    def log(self, message):
        print(f"[LOG] {message}")

class TimestampMixin:
    def get_timestamp(self):
        from datetime import datetime
        return datetime.now().isoformat()

class Database(LoggerMixin, TimestampMixin):
    def save(self, data):
        self.log(f"Saving data at {self.get_timestamp()}")
        return "Data saved"

db = Database()
db.save("test")  # [LOG] Saving data at 2024-01-15T10:30:00
\`\`\`

**Важливо:**
- Множинне наслідування може бути складним
- Використовуйте його обережно
- MRO допомагає визначити порядок пошуку методів
`
      },
      {
        title: "Перевірка типу та isinstance()",
        content: `**isinstance()** — функція для перевірки, чи є об'єкт екземпляром класу або його підкласу.

**Синтаксис:**
\`\`\`python
isinstance(об'єкт, клас)
\`\`\`

**Приклад:**

\`\`\`python
class Animal:
    pass

class Dog(Animal):
    pass

class Cat(Animal):
    pass

dog = Dog()
cat = Cat()

print(isinstance(dog, Dog))  # True
print(isinstance(dog, Animal))  # True (Dog успадковує від Animal)
print(isinstance(dog, Cat))  # False

print(isinstance(cat, Animal))  # True
print(isinstance(cat, Dog))  # False
\`\`\`

**issubclass()** — перевірка, чи є клас підкласом іншого класу:

\`\`\`python
print(issubclass(Dog, Animal))  # True
print(issubclass(Cat, Animal))  # True
print(issubclass(Dog, Cat))  # False
\`\`\`

**Використання в поліморфізмі:**

\`\`\`python
def process_animal(animal):
    if isinstance(animal, Animal):
        return f"Обробляю тварину: {type(animal).__name__}"
    else:
        return "Це не тварина"

print(process_animal(dog))  # Обробляю тварину: Dog
print(process_animal(cat))  # Обробляю тварину: Cat
\`\`\`
`
      },
      {
        title: "Кращі практики",
        content: `**Рекомендації для роботи з наслідуванням:**

1. ✅ **Використовуйте наслідування для справжніх відносин "is-a"**
   - Dog is an Animal ✅
   - Car is a Vehicle ✅
   - Student is a Person ✅

2. ✅ **Уникайте глибоких ієрархій**
   - Краще 2-3 рівні, ніж 5-6
   - Глибокі ієрархії важко підтримувати

3. ✅ **Використовуйте super() замість прямого виклику батьківського класу**
   - \`super().method()\` ✅
   - \`ParentClass.method(self)\` ❌ (уникайте)

4. ✅ **Документуйте перевизначені методи**
   - Пояснюйте, чому метод перевизначено
   - Вказуйте зміни в поведінці

5. ✅ **Множинне наслідування — обережно**
   - Використовуйте для mixin-класів
   - Уникайте складних ієрархій

6. ✅ **Перевіряйте типи за потреби**
   - Використовуйте \`isinstance()\` для перевірки
   - Не перевіряйте типи занадто часто (порушує поліморфізм)

**Антипатерни:**

❌ **God Object** — клас, який робить занадто багато
❌ **Deep Inheritance** — занадто глибока ієрархія
❌ **Inappropriate Inheritance** — наслідування для відносин "has-a" замість "is-a"
`
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
        raise NotImplementedError("Підклас повинен реалізувати цей метод")
    
    def get_info(self):
        return f"Фігура кольору {self.color}"

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

# Використання
rect = Rectangle("червоний", 5, 3)
circle = Circle("синій", 4)

print(rect.get_info())  # Фігура кольору червоний
print(f"Площа прямокутника: {rect.area()}")  # 15

print(circle.get_info())  # Фігура кольору синій
print(f"Площа кола: {circle.area()}")  # 50.26544`,
      explanation: "Демонструє базове наслідування з перевизначенням методів та використанням super()"
    },
    {
      title: "Приклад 2: Множинне наслідування",
      code: `class Flyable:
    def fly(self):
        return "Літаю"

class Swimmable:
    def swim(self):
        return "Плаваю"

class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name
    
    def quack(self):
        return "Кря-кря!"

duck = Duck("Дональд")
print(duck.fly())  # Літаю
print(duck.swim())  # Плаваю
print(duck.quack())  # Кря-кря!

# Перевірка MRO
print(Duck.__mro__)
# (<class '__main__.Duck'>, <class '__main__.Flyable'>, 
#  <class '__main__.Swimmable'>, <class 'object'>)`,
      explanation: "Показує множинне наслідування та MRO"
    },
    {
      title: "Приклад 3: Розширення функціональності",
      code: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return f"Поповнено на {amount}. Баланс: {self._balance}"
        return "Сума має бути додатною"
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return f"Знято {amount}. Баланс: {self._balance}"
        return "Недостатньо коштів або некоректна сума"
    
    def get_balance(self):
        return self._balance

class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate
    
    def add_interest(self):
        interest = self._balance * self.interest_rate
        self._balance += interest
        return f"Додано відсотки: {interest}. Новий баланс: {self._balance}"
    
    def withdraw(self, amount):
        # Додаткова перевірка для ощадного рахунку
        if amount > self._balance * 0.9:
            return "Не можна зняти більше 90% балансу"
        return super().withdraw(amount)

# Використання
savings = SavingsAccount("Іван", 1000, 0.03)
print(savings.deposit(500))  # Поповнено на 500. Баланс: 1500
print(savings.add_interest())  # Додано відсотки: 45.0. Новий баланс: 1545.0
print(savings.withdraw(1400))  # Не можна зняти більше 90% балансу
print(savings.withdraw(1000))  # Знято 1000. Баланс: 545.0`,
      explanation: "Демонструє розширення функціональності через наслідування з додатковими обмеженнями"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забувають викликати super().__init__()",
      explanation: "Якщо дочірній клас має свій __init__, але не викликає super().__init__(), атрибути батьківського класу не будуть ініціалізовані.",
      correctApproach: "Завжди викликайте super().__init__() у конструкторі дочірнього класу, якщо батьківський клас має __init__."
    },
    {
      mistake: "Прямий виклик батьківського класу замість super()",
      explanation: "Використання ParentClass.method(self) замість super().method() може призвести до проблем з множинним наслідуванням.",
      correctApproach: "Використовуйте super() для доступу до методів батьківського класу."
    },
    {
      mistake: "Наслідування для відносин 'has-a' замість 'is-a'",
      explanation: "Наслідування слід використовувати тільки для відносин 'is-a' (Car is a Vehicle), а не 'has-a' (Car has an Engine).",
      correctApproach: "Для відносин 'has-a' використовуйте композицію (створення об'єкта всередині іншого), а не наслідування."
    },
    {
      mistake: "Занадто глибока ієрархія наслідування",
      explanation: "Ієрархія з 5+ рівнями наслідування стає важкою для розуміння та підтримки.",
      correctApproach: "Обмежте глибину ієрархії до 2-3 рівнів. Розгляньте композицію як альтернативу."
    }
  ],
  
  summary: `Підсумок уроку "Наслідування"

На цьому уроці ми вивчили:

**Основні концепції:**
- ✅ Наслідування дозволяє створювати нові класи на основі існуючих
- ✅ Дочірні класи успадковують атрибути та методи батьківських класів
- ✅ Методи можна перевизначати в дочірніх класах
- ✅ super() дозволяє отримати доступ до методів батьківського класу

**Ключові навички:**
- Створення дочірніх класів
- Перевизначення методів
- Використання super() для розширення функціональності
- Робота з множинним наслідуванням
- Розуміння MRO (Method Resolution Order)

**Кращі практики:**
- Використовуйте наслідування для відносин "is-a"
- Уникайте глибоких ієрархій
- Завжди викликайте super().__init__() у конструкторі
- Використовуйте super() замість прямого виклику батьківського класу

**Наступні кроки:**
На наступному уроці ми вивчимо поліморфізм — ще один важливий принцип ООП, який тісно пов'язаний з наслідуванням.`,
  
  practiceTask: {
    title: "Система управління транспортними засобами",
    description: "Створіть систему класів для різних типів транспортних засобів з використанням наслідування",
    problemStatement: "Створіть ієрархію класів для транспортних засобів. Базовий клас Vehicle має містити загальні атрибути (brand, model, year) та методи (start, stop, get_info). Створіть дочірні класи Car та Motorcycle, які успадковують від Vehicle та додають специфічну функціональність. Car має мати метод honk(), а Motorcycle — метод wheelie(). Також створіть клас ElectricCar, який успадковує від Car та додає методи charge() та get_battery_level().",
    inputFormat: "Програма не приймає вхідні дані. Всі значення задаються безпосередньо в коді.",
    outputFormat: "Програма має вивести інформацію про різні транспортні засоби та продемонструвати роботу всіх методів.",
    examples: [
      {
        input: "",
        output: `Toyota Camry 2020 запущено
Toyota Camry 2020 зупинено
Toyota Camry 2020: Бі-біп!
Honda CBR 2021 запущено
Honda CBR 2021 зупинено
Honda CBR 2021: Виконую вілі!
Tesla Model 3 2023 запущено
Tesla Model 3 2023: Бі-біп!
Tesla Model 3 2023: Заряджаюся...
Рівень батареї: 85%`
      }
    ],
    solution: {
      code: `class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
    
    def start(self):
        return f"{self.brand} {self.model} {self.year} запущено"
    
    def stop(self):
        return f"{self.brand} {self.model} {self.year} зупинено"
    
    def get_info(self):
        return f"{self.brand} {self.model} {self.year}"

class Car(Vehicle):
    def honk(self):
        return f"{self.brand} {self.model} {self.year}: Бі-біп!"

class Motorcycle(Vehicle):
    def wheelie(self):
        return f"{self.brand} {self.model} {self.year}: Виконую вілі!"

class ElectricCar(Car):
    def __init__(self, brand, model, year, battery_level=100):
        super().__init__(brand, model, year)
        self.battery_level = battery_level
    
    def charge(self):
        if self.battery_level < 100:
            self.battery_level = min(100, self.battery_level + 10)
        return f"{self.brand} {self.model} {self.year}: Заряджаюся..."
    
    def get_battery_level(self):
        return f"Рівень батареї: {self.battery_level}%"

# Демонстрація
car = Car("Toyota", "Camry", 2020)
print(car.start())
print(car.stop())
print(car.honk())

motorcycle = Motorcycle("Honda", "CBR", 2021)
print(motorcycle.start())
print(motorcycle.stop())
print(motorcycle.wheelie())

electric_car = ElectricCar("Tesla", "Model 3", 2023, 85)
print(electric_car.start())
print(electric_car.honk())
print(electric_car.charge())
print(electric_car.get_battery_level())`,
      explanation: "Створено ієрархію класів: Vehicle (базовий) → Car/Motorcycle (дочірні) → ElectricCar (успадковує від Car). Кожен клас додає свою функціональність, використовуючи super() для доступу до методів батьківського класу."
    },
    hints: [
      "Почніть з базового класу Vehicle з методами start(), stop(), get_info()",
      "Створіть Car та Motorcycle, які успадковують від Vehicle",
      "Додайте специфічні методи honk() для Car та wheelie() для Motorcycle",
      "ElectricCar має успадковувати від Car, а не від Vehicle",
      "Використовуйте super().__init__() у конструкторі ElectricCar",
      "Додайте атрибут battery_level для ElectricCar"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: [],
        expectedOutput: "",
        explanation: "Перевірка створення об'єктів та виклику методів"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке наслідування в ООП?",
        options: [
          "Механізм створення об'єктів",
          "Механізм, за допомогою якого дочірній клас успадковує атрибути та методи батьківського класу",
          "Механізм приховування даних",
          "Механізм обробки помилок"
        ],
        correctAnswer: 1,
        explanation: "Наслідування — це механізм, за допомогою якого дочірній клас (підклас) успадковує атрибути та методи батьківського класу (суперкласу)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно створити дочірній клас в Python?",
        options: [
          "class Child(Parent):",
          "class Child extends Parent:",
          "class Child implements Parent:",
          "class Child : Parent"
        ],
        correctAnswer: 0,
        explanation: "В Python дочірній клас створюється за допомогою синтаксису class Child(Parent):, де Parent — це батьківський клас."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить функція super()?",
        options: [
          "Створює новий об'єкт",
          "Дозволяє отримати доступ до методів батьківського класу",
          "Видаляє батьківський клас",
          "Перевіряє тип об'єкта"
        ],
        correctAnswer: 1,
        explanation: "super() дозволяє отримати доступ до методів та атрибутів батьківського класу, особливо корисно для виклику конструктора або методів батьківського класу."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке MRO?",
        options: [
          "Method Return Order",
          "Method Resolution Order — порядок пошуку методів в ієрархії класів",
          "Multiple Return Object",
          "Method Reference Object"
        ],
        correctAnswer: 1,
        explanation: "MRO (Method Resolution Order) — це порядок, в якому Python шукає методи та атрибути в ієрархії класів при множинному наслідуванні."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що виведе цей код?\n\n```python\nclass A:\n    def method(self):\n        return 'A'\n\nclass B(A):\n    def method(self):\n        return 'B'\n\nclass C(B):\n    pass\n\nc = C()\nprint(c.method())\n```",
        options: [
          "'A'",
          "'B'",
          "'C'",
          "Помилка"
        ],
        correctAnswer: 1,
        explanation: "Клас C успадковує від B, який перевизначає method() і повертає 'B'. Оскільки C не перевизначає method(), використовується метод з B."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що виведе цей код?\n\n```python\nclass Parent:\n    def __init__(self, name):\n        self.name = name\n\nclass Child(Parent):\n    def __init__(self, name, age):\n        super().__init__(name)\n        self.age = age\n\nchild = Child('Олександр', 20)\nprint(child.name, child.age)\n```",
        options: [
          "Олександр 20",
          "Помилка: name не визначено",
          "None 20",
          "Помилка: не можна викликати super()"
        ],
        correctAnswer: 0,
        explanation: "super().__init__(name) викликає конструктор батьківського класу, який встановлює self.name. Потім встановлюється self.age. Результат: 'Олександр 20'."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка перевага використання super() замість прямого виклику батьківського класу?",
        options: [
          "super() працює швидше",
          "super() автоматично визначає батьківський клас і працює з множинним наслідуванням",
          "super() не потребує параметрів",
          "super() завжди повертає None"
        ],
        correctAnswer: 1,
        explanation: "super() автоматично визначає батьківський клас згідно з MRO і правильно працює з множинним наслідуванням, на відміну від прямого виклику ParentClass.method(self)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке перевизначення методу?",
        options: [
          "Видалення методу з батьківського класу",
          "Створення методу в дочірньому класі з тією ж назвою, що й у батьківському класі",
          "Додавання нового методу до батьківського класу",
          "Копіювання методу в інший клас"
        ],
        correctAnswer: 1,
        explanation: "Перевизначення методу — це створення методу в дочірньому класі з тією ж назвою, що й у батьківському класі, що дозволяє змінити поведінку для дочірнього класу."
      },
      {
        id: "q9",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що виведе цей код?\n\n```python\nclass A:\n    def method(self):\n        return 'A'\n\nclass B(A):\n    def method(self):\n        return f'B -> {super().method()}'\n\nclass C(A):\n    def method(self):\n        return f'C -> {super().method()}'\n\nclass D(B, C):\n    def method(self):\n        return f'D -> {super().method()}'\n\nd = D()\nprint(d.method())\n```",
        options: [
          "D -> B -> A",
          "D -> B -> C -> A",
          "D -> C -> A",
          "Помилка"
        ],
        correctAnswer: 1,
        explanation: "Згідно з MRO для D(B, C), порядок: D → B → C → A. super() у B викликає метод з C (наступний у MRO), а не з A."
      },
      {
        id: "q10",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли слід використовувати наслідування?",
        options: [
          "Завжди, коли потрібно повторно використати код",
          "Тільки для відносин 'is-a' (наприклад, Car is a Vehicle)",
          "Тільки для відносин 'has-a' (наприклад, Car has an Engine)",
          "Тільки для статичних методів"
        ],
        correctAnswer: 1,
        explanation: "Наслідування слід використовувати для відносин 'is-a', коли дочірній клас є різновидом батьківського класу. Для відносин 'has-a' краще використовувати композицію."
      },
      {
        id: "q11",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке множинне наслідування?",
        options: [
          "Створення кількох об'єктів одного класу",
          "Можливість класу успадковувати від кількох батьківських класів одночасно",
          "Створення кількох методів з однаковою назвою",
          "Використання кількох конструкторів"
        ],
        correctAnswer: 1,
        explanation: "Множинне наслідування — це можливість класу успадковувати від кількох батьківських класів одночасно, наприклад: class D(A, B, C):"
      },
      {
        id: "q12",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що перевіряє функція isinstance(obj, Class)?",
        options: [
          "Чи є obj класом Class",
          "Чи є obj екземпляром Class або його підкласу",
          "Чи є Class підкласом obj",
          "Чи має obj метод Class"
        ],
        correctAnswer: 1,
        explanation: "isinstance(obj, Class) перевіряє, чи є obj екземпляром класу Class або будь-якого його підкласу. Наприклад, isinstance(dog, Animal) поверне True, якщо Dog успадковує від Animal."
      }
    ],
    timeLimit: 15,
    passingScore: 75
  }
}
