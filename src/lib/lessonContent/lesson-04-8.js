/**
 * Lesson 04-8: Композиція vs наслідування
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_8 = {
  lessonId: "lesson-04-8",
  moduleId: "module-04",
  order: 8,
  title: "Композиція vs наслідування",
  
  learningObjectives: [
    "Розуміти різницю між композицією та наслідуванням",
    "Вибирати правильний підхід",
    "Застосовувати композицію",
    "Уникати проблем наслідування"
  ],
  
  prerequisites: ["lesson-04-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Наслідування vs Композиція",
        content: `**Два основні способи повторного використання коду:**

1. **Наслідування (Inheritance)** - "є" відношення (IS-A)
   - Клас успадковує поведінку від батьківського класу
   - Приклад: Dog IS-A Animal

2. **Композиція (Composition)** - "має" відношення (HAS-A)
   - Клас містить екземпляри інших класів
   - Приклад: Car HAS-A Engine

**Принцип проектування:**
> "Віддавайте перевагу композиції над наслідуванням" (Gang of Four)

**Чому?**
-  Більша гнучкість
-  Легше змінювати поведінку
-  Менше зв'язаності
-  Уникнення проблем множинного наслідування

**Коли використовувати що:**
- **Наслідування**: коли є чітке "є" відношення
- **Композиція**: коли є "має" відношення або потрібна гнучкість`
      },
      {
        title: "Приклад з наслідуванням",
        content: `**Класична реалізація через наслідування:**

\`\`\`python
class Engine:
    def start(self):
        print("Двигун запущено")
    
    def stop(self):
        print("Двигун зупинено")

class Wheel:
    def rotate(self):
        print("Колесо обертається")

# Проблема: Car не може наслідуватися від обох
# Доводиться дублювати код або робити складну ієрархію
class Car:
    def __init__(self):
        self.engine_started = False
    
    def start_engine(self):
        print("Двигун запущено")
        self.engine_started = True
    
    def stop_engine(self):
        print("Двигун зупинено")
        self.engine_started = False
    
    def drive(self):
        if self.engine_started:
            print("Автомобіль їде")
            print("Колеса обертаються")
        else:
            print("Спочатку запустіть двигун!")

car = Car()
car.drive()  # Спочатку запустіть двигун!
car.start_engine()
car.drive()
# Двигун запущено
# Автомобіль їде
# Колеса обертаються
\`\`\`

**Проблеми:**
- Дублювання коду Engine та Wheel
- Складно додати нові компоненти
- Жорстка структура`
      },
      {
        title: "Приклад з композицією",
        content: `**Краща реалізація через композицію:**

\`\`\`python
class Engine:
    def __init__(self, power):
        self.power = power
        self.running = False
    
    def start(self):
        self.running = True
        print(f"Двигун {self.power} к.с. запущено")
    
    def stop(self):
        self.running = False
        print("Двигун зупинено")

class Wheel:
    def __init__(self, size):
        self.size = size
    
    def rotate(self):
        print(f"Колесо {self.size}\" обертається")

class Car:
    def __init__(self, brand, engine_power, wheel_size):
        self.brand = brand
        self.engine = Engine(engine_power)  # Композиція!
        self.wheels = [Wheel(wheel_size) for _ in range(4)]  # Композиція!
    
    def start(self):
        self.engine.start()
    
    def drive(self):
        if self.engine.running:
            print(f"{self.brand} їде")
            for wheel in self.wheels:
                wheel.rotate()
        else:
            print("Спочатку запустіть двигун!")
    
    def stop(self):
        self.engine.stop()

# Використання
car = Car("Toyota", 150, 17)
car.drive()  # Спочатку запустіть двигун!
car.start()
car.drive()
car.stop()
\`\`\`

**Переваги:**
-  Легко замінити двигун або колеса
-  Можна створити різні комбінації
-  Код краще організований`
      },
      {
        title: "Коли використовувати наслідування",
        content: `**Наслідування доречне коли:**

1. **Є чітке "є" відношення:**

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def eat(self):
        print(f"{self.name} їсть")

class Dog(Animal):  # Dog IS-A Animal 
    def bark(self):
        print(f"{self.name} гавкає")

class Cat(Animal):  # Cat IS-A Animal 
    def meow(self):
        print(f"{self.name} мявкає")

dog = Dog("Рекс")
dog.eat()   # Успадковано
dog.bark()  # Власний метод
\`\`\`

2. **Потрібна єдина ієрархія типів:**

\`\`\`python
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

# Можна працювати з усіма фігурами однаково
shapes = [Circle(5), Rectangle(4, 3)]
for shape in shapes:
    print(f"Площа: {shape.area()}")
\`\`\`

3. **Потрібен поліморфізм**`
      },
      {
        title: "Коли використовувати композицію",
        content: `**Композиція доречна коли:**

1. **Є "має" відношення:**

\`\`\`python
class Battery:
    def __init__(self, capacity):
        self.capacity = capacity
        self.charge = capacity
    
    def use(self, amount):
        self.charge = max(0, self.charge - amount)
        return self.charge > 0

class Screen:
    def __init__(self, size):
        self.size = size
    
    def display(self, content):
        print(f"[{self.size}\" screen] {content}")

class Phone:  # Phone HAS-A Battery and Screen
    def __init__(self, model):
        self.model = model
        self.battery = Battery(100)  # Композиція
        self.screen = Screen(6.1)    # Композиція
    
    def use(self):
        if self.battery.use(10):
            self.screen.display("Телефон працює")
        else:
            print("Батарея розряджена!")

phone = Phone("iPhone")
phone.use()
\`\`\`

2. **Потрібна гнучкість:**

\`\`\`python
class Logger:
    def log(self, message):
        print(f"[LOG] {message}")

class Database:
    def save(self, data):
        print(f"Збережено: {data}")

class UserService:
    def __init__(self, logger, database):
        self.logger = logger  # Можна замінити на інший logger
        self.database = database  # Можна замінити на іншу БД
    
    def create_user(self, name):
        self.logger.log(f"Створення користувача {name}")
        self.database.save({"name": name})
        self.logger.log("Користувача створено")

# Легко замінити компоненти
service = UserService(Logger(), Database())
service.create_user("Олексій")
\`\`\`

3. **Потрібно уникнути глибокої ієрархії**`
      },
      {
        title: "Проблеми наслідування",
        content: `**Типові проблеми з наслідуванням:**

**1. Проблема крихкого базового класу:**

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
        self.energy = 100
    
    def move(self):
        self.energy -= 10
        print(f"{self.name} рухається. Енергія: {self.energy}")

class Bird(Animal):
    def fly(self):
        self.move()  # Залежить від реалізації move
        self.move()  # Політ витрачає вдвічі більше
        print(f"{self.name} летить")

# Якщо змінити move() в Animal, Bird може зламатися!
\`\`\`

**2. Проблема ромбу (множинне наслідування):**

\`\`\`python
class A:
    def method(self):
        print("A")

class B(A):
    def method(self):
        print("B")

class C(A):
    def method(self):
        print("C")

class D(B, C):  # Яку method викликати?
    pass

d = D()
d.method()  # B - але це не очевидно!
\`\`\`

**3. Порушення принципу підстановки Лісков:**

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Square(Rectangle):  # Square IS-A Rectangle?
    def __init__(self, side):
        super().__init__(side, side)
    
    # Проблема: квадрат не може змінювати width і height незалежно
\`\`\``
      },
      {
        title: "Практичний приклад: Система персонажів гри",
        content: `**Порівняння підходів:**

**Погано (тільки наслідування):**

\`\`\`python
class Character:
    def move(self):
        print("Рухається")

class FlyingCharacter(Character):
    def fly(self):
        print("Летить")

class SwimmingCharacter(Character):
    def swim(self):
        print("Плаває")

# Що якщо потрібен персонаж, що може літати І плавати?
# Доведеться створювати FlyingSwimmingCharacter...
\`\`\`

**Добре (композиція):**

\`\`\`python
class MovementCapability:
    def move(self):
        print("Рухається")

class FlyingCapability:
    def fly(self):
        print("Летить")

class SwimmingCapability:
    def swim(self):
        print("Плаває")

class Character:
    def __init__(self, name, *capabilities):
        self.name = name
        self.capabilities = capabilities
    
    def perform_action(self, action_name):
        for capability in self.capabilities:
            if hasattr(capability, action_name):
                method = getattr(capability, action_name)
                method()
                return
        print(f"{self.name} не може {action_name}")

# Легко створювати різні комбінації!
bird = Character("Птах", 
                MovementCapability(), 
                FlyingCapability())

fish = Character("Риба", 
                MovementCapability(), 
                SwimmingCapability())

duck = Character("Качка", 
                MovementCapability(), 
                FlyingCapability(), 
                SwimmingCapability())

bird.perform_action("fly")   # Летить
fish.perform_action("swim")  # Плаває
duck.perform_action("fly")   # Летить
duck.perform_action("swim")  # Плаває
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Композиція для компонентів",
      code: `# Композиція для компонентів
class Processor:
    def __init__(self, cores):
        self.cores = cores
    
    def process(self):
        print(f"Обробка на {self.cores} ядрах")

class Memory:
    def __init__(self, size):
        self.size = size
    
    def store(self, data):
        print(f"Зберігання {data} в {self.size}GB RAM")

class Computer:
    def __init__(self, processor, memory):
        self.processor = processor  # Композиція
        self.memory = memory         # Композиція
    
    def run_program(self, program):
        self.processor.process()
        self.memory.store(program)

# Легко створювати різні конфігурації
gaming_pc = Computer(Processor(8), Memory(16))
office_pc = Computer(Processor(4), Memory(8))

gaming_pc.run_program("Гра")`,
      explanation: "Демонструє композицію для гнучкої побудови об'єктів."
    },
    {
      title: "Приклад 2: Наслідування для типів",
      code: `# Наслідування для типів
class Notification:
    def __init__(self, message):
        self.message = message
    
    def send(self):
        raise NotImplementedError

class EmailNotification(Notification):
    def __init__(self, message, email):
        super().__init__(message)
        self.email = email
    
    def send(self):
        print(f"Email на {self.email}: {self.message}")

class SMSNotification(Notification):
    def __init__(self, message, phone):
        super().__init__(message)
        self.phone = phone
    
    def send(self):
        print(f"SMS на {self.phone}: {self.message}")

# Поліморфізм працює добре
notifications = [
    EmailNotification("Привіт!", "user@example.com"),
    SMSNotification("Код: 1234", "+380123456789")
]

for notif in notifications:
    notif.send()`,
      explanation: "Показує доречне використання наслідування для типової ієрархії."
    },
    {
      title: "Приклад 3: Композиція замість множинного наслідування",
      code: `# Композиція замість множинного наслідування
class Saveable:
    def save(self, filename):
        print(f"Збережено в {filename}")

class Printable:
    def print_content(self):
        print("Друк...")

class Document:
    def __init__(self, title):
        self.title = title
        self.saveable = Saveable()    # Композиція
        self.printable = Printable()  # Композиція
    
    def save(self, filename):
        self.saveable.save(filename)
    
    def print_doc(self):
        print(f"Документ: {self.title}")
        self.printable.print_content()

doc = Document("Звіт")
doc.save("report.pdf")
doc.print_doc()`,
      explanation: "Демонструє використання композиції замість складного множинного наслідування."
    },
    {
      title: "Приклад 4: Змішаний підхід",
      code: `# Змішаний підхід
class Engine:
    def __init__(self, power):
        self.power = power
    
    def start(self):
        print(f"Двигун {self.power} к.с. запущено")

class Vehicle:
    def __init__(self, brand):
        self.brand = brand
    
    def describe(self):
        return f"Транспорт: {self.brand}"

class Car(Vehicle):  # Наслідування (Car IS-A Vehicle)
    def __init__(self, brand, engine_power):
        super().__init__(brand)
        self.engine = Engine(engine_power)  # Композиція (Car HAS-A Engine)
    
    def start(self):
        print(f"{self.brand}:")
        self.engine.start()

class Motorcycle(Vehicle):  # Наслідування
    def __init__(self, brand, engine_power):
        super().__init__(brand)
        self.engine = Engine(engine_power)  # Композиція
    
    def start(self):
        print(f"{self.brand} (мотоцикл):")
        self.engine.start()

car = Car("Toyota", 150)
bike = Motorcycle("Yamaha", 100)

car.start()
bike.start()`,
      explanation: "Показує поєднання наслідування та композиції в одному дизайні."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Завжди використовувати наслідування",
      explanation: "Наслідування створює жорстку зв'язаність і може ускладнити код.",
      correctApproach: "Спочатку розглядай композицію, наслідування - тільки якщо є чітке IS-A відношення"
    },
    {
      mistake: "Створювати глибокі ієрархії наслідування",
      explanation: "Глибокі ієрархії важко підтримувати і розуміти.",
      correctApproach: "Обмежуй глибину наслідування до 2-3 рівнів, використовуй композицію"
    },
    {
      mistake: "Використовувати наслідування для повторного використання коду",
      explanation: "Наслідування не призначене тільки для повторного використання коду.",
      correctApproach: "Для повторного використання коду краще використовувати композицію"
    },
    {
      mistake: "Ігнорувати принцип підстановки Лісков",
      explanation: "Дочірній клас має повністю замінювати батьківський.",
      correctApproach: "Переконайся, що дочірній клас може використовуватися замість батьківського"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. Наслідування - "є" відношення (IS-A), для ієрархій типів
2. Композиція - "має" відношення (HAS-A), для гнучкості
3. Принцип - віддавай перевагу композиції над наслідуванням
4. Коли використовувати наслідування - чіткі IS-A відношення
5. Коли використовувати композицію - HAS-A відношення, гнучкість
6. Проблеми наслідування - крихкість, ромб, глибокі ієрархії

Тепер ви розумієте, як правильно організовувати код та вибирати між підходами!

Вітаємо з завершенням модуля "Об'єктно-орієнтоване програмування"!`,
  
  practiceTask: {
    title: "Система роботів з композицією",
    description: "Створіть систему роботів використовуючи композицію",
    problemStatement: `Напишіть програму, яка:
1. Створює класи Sensor(type), Motor(power), Battery(capacity)
2. Створює клас Robot з композицією компонентів і методом operate()
3. Витрата енергії мотора: power // 10
4. Зчитує роботів зі stdin і викликає operate() для кожного (між ними ---)

Формат вводу:
- число n
- n рядків: name sensor_type power capacity`,
    outputFormat: `Робот-1:
Сенсор camera виявив перешкоду
Мотор 100W рухається
Батарея: 90%
---
Робот-2:
Сенсор radar виявив перешкоду
Мотор 200W рухається
Батарея: 80%`,
    examples: [
      {
        input: `2
Робот-1 camera 100 100
Робот-2 radar 200 100`,
        output: `Робот-1:
Сенсор camera виявив перешкоду
Мотор 100W рухається
Батарея: 90%
---
Робот-2:
Сенсор radar виявив перешкоду
Мотор 200W рухається
Батарея: 80%`,
        explanation: "Витрата 10 і 20 одиниць з батареї 100 → 90% і 80%"
      },
      {
        input: `1
Бот lidar 50 100`,
        output: `Бот:
Сенсор lidar виявив перешкоду
Мотор 50W рухається
Батарея: 95%`,
        explanation: "Один робот, витрата 5 → 95%"
      },
      {
        input: `2
A cam 10 100
B sonar 0 100`,
        output: `A:
Сенсор cam виявив перешкоду
Мотор 10W рухається
Батарея: 99%
---
B:
Сенсор sonar виявив перешкоду
Мотор 0W рухається
Батарея: 100%`,
        explanation: "Витрата 1 і 0 відсотків відповідно"
      }
    ],
    solution: {
      code: `class Sensor:
    def __init__(self, sensor_type):
        self.type = sensor_type

    def detect(self):
        print(f"Сенсор {self.type} виявив перешкоду")

class Motor:
    def __init__(self, power):
        self.power = power

    def move(self):
        print(f"Мотор {self.power}W рухається")

    def get_energy_consumption(self):
        return self.power // 10

class Battery:
    def __init__(self, capacity):
        self.capacity = capacity
        self.charge = capacity

    def use(self, amount):
        if self.charge >= amount:
            self.charge -= amount
            return True
        return False

    def get_percentage(self):
        return int((self.charge / self.capacity) * 100)

class Robot:
    def __init__(self, name, sensor, motor, battery):
        self.name = name
        self.sensor = sensor
        self.motor = motor
        self.battery = battery

    def operate(self):
        print(f"{self.name}:")
        energy_needed = self.motor.get_energy_consumption()
        if self.battery.use(energy_needed):
            self.sensor.detect()
            self.motor.move()
            print(f"Батарея: {self.battery.get_percentage()}%")
        else:
            print("Батарея розряджена!")

n = int(input())
robots = []
for _ in range(n):
    parts = input().split()
    name = parts[0]
    sensor_type = parts[1]
    power = int(parts[2])
    capacity = int(parts[3])
    robots.append(Robot(name, Sensor(sensor_type), Motor(power), Battery(capacity)))

for i, robot in enumerate(robots):
    if i > 0:
        print("---")
    robot.operate()`,
      explanation: "Композиція Sensor/Motor/Battery у Robot; параметри роботів читаємо з stdin."
    },
    hints: [
      "Зчитайте n = int(input()), потім n рядків параметрів",
      "Витрата енергії: power // 10",
      "Між роботами виводьте ---",
      "Метод operate() використовує всі компоненти"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між наслідуванням та композицією?",
        options: [
          "Наслідування - 'є', композиція - 'має'",
          "Наслідування швидше за композицію",
          "Композиція складніша за наслідування",
          "Немає різниці"
        ],
        correctAnswer: 0,
        explanation: "Наслідування виражає 'є' відношення (IS-A), композиція - 'має' відношення (HAS-A)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Який підхід використано в цьому коді?\n\n```python\nclass Car:\n    def __init__(self):\n        self.engine = Engine()\n        self.wheels = [Wheel() for _ in range(4)]\n```",
        options: [
          "Композиція",
          "Наслідування",
          "Поліморфізм",
          "Інкапсуляція"
        ],
        correctAnswer: 0,
        explanation: "Car містить (має) Engine та Wheels - це композиція."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли краще використовувати композицію?",
        options: [
          "Коли потрібна гнучкість та є HAS-A відношення",
          "Завжди",
          "Ніколи",
          "Тільки для складних класів"
        ],
        correctAnswer: 0,
        explanation: "Композиція краща коли потрібна гнучкість та є 'має' відношення."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи доречне тут наслідування?\n\n```python\nclass Animal:\n    def eat(self):\n        pass\n\nclass Dog(Animal):\n    def bark(self):\n        pass\n```",
        options: [
          "Так, Dog IS-A Animal",
          "Ні, треба композицію",
          "Ні, неправильний синтаксис",
          "Так, але тільки для простих класів"
        ],
        correctAnswer: 0,
        explanation: "Dog є Animal (IS-A), тому наслідування доречне."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка головна проблема глибокого наслідування?",
        options: [
          "Складність підтримки та розуміння коду",
          "Повільне виконання",
          "Більше пам'яті",
          "Помилки синтаксису"
        ],
        correctAnswer: 0,
        explanation: "Глибокі ієрархії наслідування важко підтримувати та розуміти."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Яка проблема з цим підходом?\n\n```python\nclass A:\n    pass\n\nclass B(A):\n    pass\n\nclass C(B):\n    pass\n\nclass D(C):\n    pass\n\nclass E(D):\n    pass\n```",
        options: [
          "Занадто глибока ієрархія наслідування",
          "Неправильний синтаксис",
          "Немає проблем",
          "Потрібна композиція замість будь-якого наслідування"
        ],
        correctAnswer: 0,
        explanation: "Ієрархія з 5 рівнів занадто глибока і важка для підтримки."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

