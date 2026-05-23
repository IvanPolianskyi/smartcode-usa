/**
 * Lesson 04-8: Composition vs inheritance
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_8 = {
  lessonId: "lesson-04-8",
  moduleId: "module-04",
  order: 8,
  title: "Composition vs inheritance",
  
  learningObjectives: [
    "Understand the difference between composition and inheritance",
    "Choose the right approach",
    "Apply composition",
    "Avoid inheritance problems"
  ],
  
  prerequisites: ["lesson-04-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Inheritance vs composition",
        content: `**Two main ways to reuse code:**

1. **Inheritance** - "is-a" relationship (IS-A)
   - A class inherits behavior from a parent class
   - Example: Dog IS-A Animal

2. **Composition** - "has-a" relationship (HAS-A)
   - A class contains instances of other classes
   - Example: Car HAS-A Engine

**Design principle:**
> "Favor composition over inheritance" (Gang of Four)

**Why?**
- More flexibility
- Easier to change behavior
- Less coupling
- Avoid multiple inheritance problems

**When to use what:**
- **Inheritance**: when there is a clear "is-a" relationship
- **Composition**: when there is a "has-a" relationship or flexibility is needed`
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
        print("Wheel rotating")

# Problem: Car cannot inherit from both
# Have to duplicate code or create a complex hierarchy
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
            print("Car is driving")
            print("Wheels rotating")
        else:
            print("Start the engine first!")

car = Car()
car.drive()  # Start the engine first!
car.start_engine()
car.drive()
# Engine started
# Car is driving
# Wheels rotating
\`\`\`

**Problems:**
- Duplication of Engine and Wheel code
- Hard to add new components
- Rigid structure`
      },
      {
        title: "Example with composition",
        content: `**Better implementation through composition:**

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
        print(f"Wheel {self.size}\" rotating")

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
- Easy to replace engine or wheels
- Can create different combinations
- Code is better organized`
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

2. **A single type hierarchy is needed:**

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

# Can work with all shapes the same way
shapes = [Circle(5), Rectangle(4, 3)]
for shape in shapes:
    print(f"Area: {shape.area()}")
\`\`\`

3. **Polymorphism is needed**`
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
        print(f"[{self.size}\" screen] {content}")

class Phone:  # Phone HAS-A Battery and Screen
    def __init__(self, model):
        self.model = model
        self.battery = Battery(100)  # Composition
        self.screen = Screen(6.1)    # Composition
    
    def use(self):
        if self.battery.use(10):
            self.screen.display("Phone is working")
        else:
            print("Battery depleted!")

phone = Phone("iPhone")
phone.use()
\`\`\`

2. **Flexibility is needed:**

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

3. **You need to avoid deep hierarchies**`
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
d.method()  # B - but it's not obvious!
\`\`\`

**3. Liskov substitution principle violation:**

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
# You'd have to create FlyingSwimmingCharacter...
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
    SMSNotification("Code: 1234", "+1234567890")
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
      explanation: "Inheritance creates tight coupling and can complicate code.",
      correctApproach: "Consider composition first; use inheritance only when there is a clear IS-A relationship"
    },
    {
      mistake: "Creating deep inheritance hierarchies",
      explanation: "Deep hierarchies are hard to maintain and understand.",
      correctApproach: "Limit inheritance depth to 2-3 levels, use composition"
    },
    {
      mistake: "Using inheritance only for code reuse",
      explanation: "Inheritance is not meant only for reusing code.",
      correctApproach: "For code reuse, composition is often better"
    },
    {
      mistake: "Ignoring the Liskov substitution principle",
      explanation: "A child class must fully replace the parent.",
      correctApproach: "Make sure the child class can be used instead of the parent"
    }
  ],
  
  summary: `In this lesson we learned:

1. Inheritance - "is-a" relationship (IS-A), for type hierarchies
2. Composition - "has-a" relationship (HAS-A), for flexibility
3. Principle - favor composition over inheritance
4. When to use inheritance - clear IS-A relationships
5. When to use composition - HAS-A relationships, flexibility
6. Inheritance problems - fragility, diamond, deep hierarchies

You now understand how to organize code and choose between approaches!

Congratulations on completing the "Object-Oriented Programming" module!`,
  
  practiceTask: {
    title: "Robot system with composition",
    description: "Create a robot system using composition",
    problemStatement: `Write a program that:
1. Creates component classes:
   - Sensor(type) - with detect() method
   - Motor(power) - with move() method
   - Battery(capacity) - with use(amount) and charge() methods
2. Creates a Robot class that:
   - Uses composition for components
   - Has operate() method - uses all components
   - Checks battery charge before operating
3. Creates several robots with different components`,
    outputFormat: `Example output:
Robot-1:
Sensor camera detected obstacle
Motor 100W moving
Battery: 90%
---
Robot-2:
Sensor radar detected obstacle
Motor 200W moving
Battery: 80%`,
    examples: [
      {
        output: `Robot-1:
Sensor camera detected obstacle
Motor 100W moving
Battery: 90%
---
Robot-2:
Sensor radar detected obstacle
Motor 200W moving
Battery: 80%`,
        explanation: "The program demonstrates composition for creating a flexible robot system"
      }
    ],
    solution: {
      code: `# Robot system with composition
class Sensor:
    def __init__(self, sensor_type):
        self.type = sensor_type
    
    def detect(self):
        print(f"Sensor {self.type} detected obstacle")

class Motor:
    def __init__(self, power):
        self.power = power
    
    def move(self):
        print(f"Motor {self.power}W moving")
    
    def get_energy_consumption(self):
        # Higher power motor uses more energy
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
        self.sensor = sensor    # Composition
        self.motor = motor      # Composition
        self.battery = battery  # Composition
    
    def operate(self):
        print(f"{self.name}:")
        energy_needed = self.motor.get_energy_consumption()
        if self.battery.use(energy_needed):
            self.sensor.detect()
            self.motor.move()
            print(f"Battery: {self.battery.get_percentage()}%")
        else:
            print("Battery depleted!")

# Create robots with different components
robot1 = Robot("Robot-1", 
               Sensor("camera"), 
               Motor(100), 
               Battery(100))

robot2 = Robot("Robot-2", 
               Sensor("radar"), 
               Motor(200), 
               Battery(100))

robot1.operate()
print("---")
robot2.operate()`,
      explanation: "The solution uses composition to create a flexible system where a robot is built from different components. A higher-power motor uses more energy."
    },
    hints: [
      "Create separate classes for Sensor, Motor, Battery",
      "In Robot use composition - store component objects",
      "Check battery charge before use",
      "Each robot has its own component instances",
      "The operate() method calls all component methods"
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
        explanation: "Inheritance expresses an 'is-a' relationship (IS-A), composition expresses a 'has-a' relationship (HAS-A)."
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
        question: "When is composition better to use?",
        options: [
          "When flexibility is needed and there is a HAS-A relationship",
          "Always",
          "Never",
          "Only for complex classes"
        ],
        correctAnswer: 0,
        explanation: "Composition is better when flexibility is needed and there is a 'has-a' relationship."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Is inheritance appropriate here?\n\n```python\nclass Animal:\n    def eat(self):\n        pass\n\nclass Dog(Animal):\n    def bark(self):\n        pass\n```",
        options: [
          "Yes, Dog IS-A Animal",
          "No, use composition",
          "No, incorrect syntax",
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
          "Difficulty maintaining and understanding code",
          "Slow execution",
          "More memory usage",
          "Syntax errors"
        ],
        correctAnswer: 0,
        explanation: "Deep inheritance hierarchies are hard to maintain and understand."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is the problem with this approach?\n\n```python\nclass A:\n    pass\n\nclass B(A):\n    pass\n\nclass C(B):\n    pass\n\nclass D(C):\n    pass\n\nclass E(D):\n    pass\n```",
        options: [
          "Inheritance hierarchy is too deep",
          "Incorrect syntax",
          "No problems",
          "Need composition instead of any inheritance"
        ],
        correctAnswer: 0,
        explanation: "A hierarchy with 5 levels is too deep and hard to maintain."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

