/**
 * Lesson 04-8: Composition vs Inheritance
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_04_8 = {
  lessonId: "lesson-04-8",
  moduleId: "module-04",
  order: 8,
  title: "Composition vs Inheritance",

  learningObjectives: [
    "Understand the difference between composition and inheritance",
    "Choose the right approach",
    "Apply composition",
    "Avoid inheritance pitfalls"
  ],

  prerequisites: ["lesson-04-7"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Inheritance vs Composition",
        content: `**Two main ways to reuse code:**

1. **Inheritance** - an "is-a" relationship (IS-A)
   - A class inherits behavior from a parent class
   - Example: Dog IS-A Animal

2. **Composition** - a "has-a" relationship (HAS-A)
   - A class contains instances of other classes
   - Example: Car HAS-A Engine

**Design principle:**
> "Prefer composition over inheritance" (Gang of Four)

**Why?**
-  Greater flexibility
-  Easier to change behavior
-  Less coupling
-  Avoids multiple inheritance problems

**When to use which:**
- **Inheritance**: when there is a clear "is-a" relationship
- **Composition**: when there is a "has-a" relationship or you need flexibility`
      },
      {
        title: "Example with inheritance",
        content: `**Classic implementation through inheritance:**

\`\`\`python
class Engine:
    def start(self):
        print("Engine started")

    def stop(self):
        print("Engine stopped")

class Wheel:
    def rotate(self):
        print("Wheel is rotating")

# Problem: Car cannot inherit from both
# You have to duplicate code or build a complex hierarchy
class Car:
    def __init__(self):
        self.engine_started = False

    def start_engine(self):
        print("Engine started")
        self.engine_started = True

    def stop_engine(self):
        print("Engine stopped")
        self.engine_started = False

    def drive(self):
        if self.engine_started:
            print("The car is driving")
            print("Wheels are rotating")
        else:
            print("Start the engine first!")

car = Car()
car.drive()  # Start the engine first!
car.start_engine()
car.drive()
# Engine started
# The car is driving
# Wheels are rotating
\`\`\`

**Problems:**
- Code duplication of Engine and Wheel
- Hard to add new components
- Rigid structure`
      },
      {
        title: "Example with composition",
        content: `**A better implementation through composition:**

\`\`\`python
class Engine:
    def __init__(self, power):
        self.power = power
        self.running = False

    def start(self):
        self.running = True
        print(f"Engine {self.power} hp started")

    def stop(self):
        self.running = False
        print("Engine stopped")

class Wheel:
    def __init__(self, size):
        self.size = size

    def rotate(self):
        print(f"Wheel {self.size}\\" is rotating")

class Car:
    def __init__(self, brand, engine_power, wheel_size):
        self.brand = brand
        self.engine = Engine(engine_power)  # Composition!
        self.wheels = [Wheel(wheel_size) for _ in range(4)]  # Composition!

    def start(self):
        self.engine.start()

    def drive(self):
        if self.engine.running:
            print(f"{self.brand} is driving")
            for wheel in self.wheels:
                wheel.rotate()
        else:
            print("Start the engine first!")

    def stop(self):
        self.engine.stop()

# Usage
car = Car("Toyota", 150, 17)
car.drive()  # Start the engine first!
car.start()
car.drive()
car.stop()
\`\`\`

**Benefits:**
-  Easy to replace the engine or wheels
-  You can create different combinations
-  Code is better organized`
      },
      {
        title: "When to use inheritance",
        content: `**Inheritance is appropriate when:**

1. **There is a clear "is-a" relationship:**

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating")

class Dog(Animal):  # Dog IS-A Animal
    def bark(self):
        print(f"{self.name} is barking")

class Cat(Animal):  # Cat IS-A Animal
    def meow(self):
        print(f"{self.name} is meowing")

dog = Dog("Rex")
dog.eat()   # Inherited
dog.bark()  # Own method
\`\`\`

2. **You need a unified type hierarchy:**

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

# You can work with all shapes the same way
shapes = [Circle(5), Rectangle(4, 3)]
for shape in shapes:
    print(f"Area: {shape.area()}")
\`\`\`

3. **You need polymorphism**`
      },
      {
        title: "When to use composition",
        content: `**Composition is appropriate when:**

1. **There is a "has-a" relationship:**

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
        print(f"[{self.size}\\" screen] {content}")

class Phone:  # Phone HAS-A Battery and Screen
    def __init__(self, model):
        self.model = model
        self.battery = Battery(100)  # Composition
        self.screen = Screen(6.1)    # Composition

    def use(self):
        if self.battery.use(10):
            self.screen.display("Phone is working")
        else:
            print("Battery is dead!")

phone = Phone("iPhone")
phone.use()
\`\`\`

2. **You need flexibility:**

\`\`\`python
class Logger:
    def log(self, message):
        print(f"[LOG] {message}")

class Database:
    def save(self, data):
        print(f"Saved: {data}")

class UserService:
    def __init__(self, logger, database):
        self.logger = logger  # Can be replaced with another logger
        self.database = database  # Can be replaced with another DB

    def create_user(self, name):
        self.logger.log(f"Creating user {name}")
        self.database.save({"name": name})
        self.logger.log("User created")

# Easy to replace components
service = UserService(Logger(), Database())
service.create_user("Alex")
\`\`\`

3. **You need to avoid a deep hierarchy**`
      },
      {
        title: "Problems with inheritance",
        content: `**Typical problems with inheritance:**

**1. Fragile base class problem:**

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
        self.energy = 100

    def move(self):
        self.energy -= 10
        print(f"{self.name} is moving. Energy: {self.energy}")

class Bird(Animal):
    def fly(self):
        self.move()  # Depends on move implementation
        self.move()  # Flying costs twice as much
        print(f"{self.name} is flying")

# If you change move() in Animal, Bird may break!
\`\`\`

**2. Diamond problem (multiple inheritance):**

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

class D(B, C):  # Which method to call?
    pass

d = D()
d.method()  # B - but that is not obvious!
\`\`\`

**3. Violating the Liskov Substitution Principle:**

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

    # Problem: a square cannot change width and height independently
\`\`\``
      },
      {
        title: "Practical example: Game character system",
        content: `**Comparing approaches:**

**Bad (inheritance only):**

\`\`\`python
class Character:
    def move(self):
        print("Moving")

class FlyingCharacter(Character):
    def fly(self):
        print("Flying")

class SwimmingCharacter(Character):
    def swim(self):
        print("Swimming")

# What if you need a character that can fly AND swim?
# You would have to create FlyingSwimmingCharacter...
\`\`\`

**Good (composition):**

\`\`\`python
class MovementCapability:
    def move(self):
        print("Moving")

class FlyingCapability:
    def fly(self):
        print("Flying")

class SwimmingCapability:
    def swim(self):
        print("Swimming")

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
        print(f"{self.name} cannot {action_name}")

# Easy to create different combinations!
bird = Character("Bird",
                MovementCapability(),
                FlyingCapability())

fish = Character("Fish",
                MovementCapability(),
                SwimmingCapability())

duck = Character("Duck",
                MovementCapability(),
                FlyingCapability(),
                SwimmingCapability())

bird.perform_action("fly")   # Flying
fish.perform_action("swim")  # Swimming
duck.perform_action("fly")   # Flying
duck.perform_action("swim")  # Swimming
\`\`\``
      }
    ]
  },

  codeExamples: [
    {
      title: "Example 1: Composition for components",
      code: `# Composition for components
class Processor:
    def __init__(self, cores):
        self.cores = cores

    def process(self):
        print(f"Processing on {self.cores} cores")

class Memory:
    def __init__(self, size):
        self.size = size

    def store(self, data):
        print(f"Storing {data} in {self.size}GB RAM")

class Computer:
    def __init__(self, processor, memory):
        self.processor = processor  # Composition
        self.memory = memory         # Composition

    def run_program(self, program):
        self.processor.process()
        self.memory.store(program)

# Easy to create different configurations
gaming_pc = Computer(Processor(8), Memory(16))
office_pc = Computer(Processor(4), Memory(8))

gaming_pc.run_program("Game")`,
      explanation: "Demonstrates composition for flexible object construction."
    },
    {
      title: "Example 2: Inheritance for types",
      code: `# Inheritance for types
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
        print(f"Email to {self.email}: {self.message}")

class SMSNotification(Notification):
    def __init__(self, message, phone):
        super().__init__(message)
        self.phone = phone

    def send(self):
        print(f"SMS to {self.phone}: {self.message}")

# Polymorphism works well
notifications = [
    EmailNotification("Hello!", "user@example.com"),
    SMSNotification("Code: 1234", "+380123456789")
]

for notif in notifications:
    notif.send()`,
      explanation: "Shows appropriate use of inheritance for a type hierarchy."
    },
    {
      title: "Example 3: Composition instead of multiple inheritance",
      code: `# Composition instead of multiple inheritance
class Saveable:
    def save(self, filename):
        print(f"Saved to {filename}")

class Printable:
    def print_content(self):
        print("Printing...")

class Document:
    def __init__(self, title):
        self.title = title
        self.saveable = Saveable()    # Composition
        self.printable = Printable()  # Composition

    def save(self, filename):
        self.saveable.save(filename)

    def print_doc(self):
        print(f"Document: {self.title}")
        self.printable.print_content()

doc = Document("Report")
doc.save("report.pdf")
doc.print_doc()`,
      explanation: "Demonstrates using composition instead of complex multiple inheritance."
    },
    {
      title: "Example 4: Mixed approach",
      code: `# Mixed approach
class Engine:
    def __init__(self, power):
        self.power = power

    def start(self):
        print(f"Engine {self.power} hp started")

class Vehicle:
    def __init__(self, brand):
        self.brand = brand

    def describe(self):
        return f"Vehicle: {self.brand}"

class Car(Vehicle):  # Inheritance (Car IS-A Vehicle)
    def __init__(self, brand, engine_power):
        super().__init__(brand)
        self.engine = Engine(engine_power)  # Composition (Car HAS-A Engine)

    def start(self):
        print(f"{self.brand}:")
        self.engine.start()

class Motorcycle(Vehicle):  # Inheritance
    def __init__(self, brand, engine_power):
        super().__init__(brand)
        self.engine = Engine(engine_power)  # Composition

    def start(self):
        print(f"{self.brand} (motorcycle):")
        self.engine.start()

car = Car("Toyota", 150)
bike = Motorcycle("Yamaha", 100)

car.start()
bike.start()`,
      explanation: "Shows combining inheritance and composition in one design."
    }
  ],

  commonMistakes: [
    {
      mistake: "Always using inheritance",
      explanation: "Inheritance creates tight coupling and can complicate the code.",
      correctApproach: "Consider composition first; use inheritance only when there is a clear IS-A relationship"
    },
    {
      mistake: "Creating deep inheritance hierarchies",
      explanation: "Deep hierarchies are hard to maintain and understand.",
      correctApproach: "Limit inheritance depth to 2-3 levels and use composition"
    },
    {
      mistake: "Using inheritance only for code reuse",
      explanation: "Inheritance is not meant only for reusing code.",
      correctApproach: "For code reuse, prefer composition"
    },
    {
      mistake: "Ignoring the Liskov Substitution Principle",
      explanation: "A child class must be fully substitutable for the parent.",
      correctApproach: "Make sure the child class can be used in place of the parent"
    }
  ],

  summary: `In this lesson we learned:

1. Inheritance - an "is-a" relationship (IS-A), for type hierarchies
2. Composition - a "has-a" relationship (HAS-A), for flexibility
3. Principle - prefer composition over inheritance
4. When to use inheritance - clear IS-A relationships
5. When to use composition - HAS-A relationships, flexibility
6. Inheritance problems - fragility, diamond problem, deep hierarchies

Now you understand how to organize code properly and choose between approaches!

Congratulations on completing the "Object-Oriented Programming" module!`,

  practiceTask: {
    title: "Robot system with composition",
    description: "Create a robot system using composition",
    problemStatement: `Write a program that:
1. Creates classes Sensor(type), Motor(power), Battery(capacity)
2. Creates a Robot class with composition of components and an operate() method
3. Motor energy consumption: power // 10
4. Reads robots from stdin and calls operate() for each (with --- between them)

Input format:
- number n
- n lines: name sensor_type power capacity`,
    outputFormat: `Robot-1:
Sensor camera detected an obstacle
Motor 100W is moving
Battery: 90%
---
Robot-2:
Sensor radar detected an obstacle
Motor 200W is moving
Battery: 80%`,
    examples: [
      {
        input: `2
Robot-1 camera 100 100
Robot-2 radar 200 100`,
        output: `Robot-1:
Sensor camera detected an obstacle
Motor 100W is moving
Battery: 90%
---
Robot-2:
Sensor radar detected an obstacle
Motor 200W is moving
Battery: 80%`,
        explanation: "Consumption of 10 and 20 units from battery 100 → 90% and 80%"
      },
      {
        input: `1
Bot lidar 50 100`,
        output: `Bot:
Sensor lidar detected an obstacle
Motor 50W is moving
Battery: 95%`,
        explanation: "One robot, consumption 5 → 95%"
      },
      {
        input: `2
A cam 10 100
B sonar 0 100`,
        output: `A:
Sensor cam detected an obstacle
Motor 10W is moving
Battery: 99%
---
B:
Sensor sonar detected an obstacle
Motor 0W is moving
Battery: 100%`,
        explanation: "Consumption of 1 and 0 percent respectively"
      }
    ],
    solution: {
      code: `class Sensor:
    def __init__(self, sensor_type):
        self.type = sensor_type

    def detect(self):
        print(f"Sensor {self.type} detected an obstacle")

class Motor:
    def __init__(self, power):
        self.power = power

    def move(self):
        print(f"Motor {self.power}W is moving")

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
            print(f"Battery: {self.battery.get_percentage()}%")
        else:
            print("Battery is dead!")

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
      explanation: "Composition of Sensor/Motor/Battery in Robot; robot parameters are read from stdin."
    },
    hints: [
      "Read n = int(input()), then n lines of parameters",
      "Energy consumption: power // 10",
      "Print --- between robots",
      "The operate() method uses all components"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between inheritance and composition?",
        options: [
          "Inheritance is 'is-a', composition is 'has-a'",
          "Inheritance is faster than composition",
          "Composition is more complex than inheritance",
          "There is no difference"
        ],
        correctAnswer: 0,
        explanation: "Inheritance expresses an 'is-a' relationship (IS-A), composition a 'has-a' relationship (HAS-A)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Which approach is used in this code?\n\n```python\nclass Car:\n    def __init__(self):\n        self.engine = Engine()\n        self.wheels = [Wheel() for _ in range(4)]\n```",
        options: [
          "Composition",
          "Inheritance",
          "Polymorphism",
          "Encapsulation"
        ],
        correctAnswer: 0,
        explanation: "Car contains (has) Engine and Wheels - this is composition."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is composition usually the better design choice?",
        options: [
          "When the relationship is HAS-A and you want swappable parts",
          "Always — inheritance should never be used",
          "Never — prefer deep inheritance trees instead",
          "Only when a class already has 20+ methods"
        ],
        correctAnswer: 0,
        explanation: "Composition fits HAS-A (a Car has an Engine) and keeps parts replaceable. 'Always'/'never' extremes and 'only if huge' miss the relationship test."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Is inheritance appropriate here?\n\n```python\nclass Animal:\n    def eat(self):\n        pass\n\nclass Dog(Animal):\n    def bark(self):\n        pass\n```",
        options: [
          "Yes, Dog IS-A Animal",
          "No, composition is needed",
          "No, invalid syntax",
          "Yes, but only for simple classes"
        ],
        correctAnswer: 0,
        explanation: "Dog is an Animal (IS-A), so inheritance is appropriate."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main problem with deep inheritance?",
        options: [
          "The hierarchy becomes hard to reason about and change",
          "Python suddenly runs several times slower",
          "Each level doubles the object's RAM usage",
          "Deeper trees always cause SyntaxError"
        ],
        correctAnswer: 0,
        explanation: "Deep chains hurt clarity and maintenance when behavior is spread across many parents. Speed, memory, and syntax errors are not the usual main issue."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is the problem with this approach?\n\n```python\nclass A:\n    pass\n\nclass B(A):\n    pass\n\nclass C(B):\n    pass\n\nclass D(C):\n    pass\n\nclass E(D):\n    pass\n```",
        options: [
          "Inheritance hierarchy is too deep",
          "Invalid syntax",
          "There are no problems",
          "Composition is required instead of any inheritance"
        ],
        correctAnswer: 0,
        explanation: "A hierarchy with 5 levels is too deep and hard to maintain."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
