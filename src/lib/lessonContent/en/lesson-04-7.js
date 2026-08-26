/**
 * Lesson 04-7: Abstract Classes and Interfaces
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_7 = {
  lessonId: "lesson-04-7",
  moduleId: "module-04",
  order: 7,
  title: "Abstract Classes and Interfaces",

  learningObjectives: [
    "Use abstract base classes",
    "Implement interfaces",
    "Apply the ABC module",
    "Create contracts for classes"
  ],

  prerequisites: ["lesson-04-6"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What are abstract classes?",
        content: `**An abstract class** is a class that cannot be instantiated (you cannot create objects from it) and that defines an interface for child classes.

**Why abstract classes are useful:**
-  Define a contract for child classes
-  Guarantee that child classes implement certain methods
-  Provide a shared interface
-  Catch mistakes during development

**In Python, abstract classes are created using the ABC module (Abstract Base Classes).**

**Example without abstract classes (the problem):**

\`\`\`python
class Shape:
    def area(self):
        pass  # What should go here? There is no general formula

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    # Forgot to implement area()! The error appears only at runtime

circle = Circle(5)
print(circle.area())  # None - the error is not obvious
\`\`\`

**With abstract classes:**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    # Forgot to implement area()

# Error when trying to create an object:
# circle = Circle(5)  # TypeError: Can't instantiate abstract class
\`\`\``
      },
      {
        title: "Creating abstract classes",
        content: `**Syntax for creating an abstract class:**

\`\`\`python
from abc import ABC, abstractmethod

class ClassName(ABC):
    @abstractmethod
    def abstract_method(self):
        pass
\`\`\`

**Example: Abstract class for shapes**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Calculates the area of the shape"""
        pass

    @abstractmethod
    def perimeter(self):
        """Calculates the perimeter of the shape"""
        pass

    # Regular method (not abstract)
    def describe(self):
        return f"This is a shape with area {self.area()}"

# You cannot create an object of an abstract class
# shape = Shape()  # TypeError!
\`\`\`

**Rules:**
- An abstract class inherits from ABC
- Abstract methods are marked with @abstractmethod
- You cannot create an object of an abstract class
- Child classes MUST implement all abstract methods`
      },
      {
        title: "Implementing abstract classes",
        content: `**Child classes must implement all abstract methods:**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14 * self.radius

# Now you can create objects
rect = Rectangle(5, 3)
circle = Circle(4)

print(f"Rectangle area: {rect.area()}")  # 15
print(f"Circle area: {circle.area()}")  # 50.24
\`\`\`

**What happens if you do not implement a method:**

\`\`\`python
class Triangle(Shape):
    def __init__(self, a, b, c):
        self.a = a
        self.b = b
        self.c = c

    def area(self):
        # Heron's formula
        s = (self.a + self.b + self.c) / 2
        return (s * (s - self.a) * (s - self.b) * (s - self.c)) ** 0.5

    # Forgot to implement perimeter()

# triangle = Triangle(3, 4, 5)  # TypeError: Can't instantiate abstract class Triangle
\`\`\``
      },
      {
        title: "Abstract properties",
        content: `**You can create abstract properties:**

\`\`\`python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @property
    @abstractmethod
    def max_speed(self):
        """Maximum speed of the vehicle"""
        pass

    @abstractmethod
    def start(self):
        """Start the vehicle"""
        pass

class Car(Vehicle):
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self._max_speed = 200

    @property
    def max_speed(self):
        return self._max_speed

    def start(self):
        return f"{self.brand} {self.model} started"

car = Car("Toyota", "Camry")
print(car.max_speed)  # 200
print(car.start())  # Toyota Camry started
\`\`\`

**Note:** When creating abstract properties, the @abstractmethod decorator must be last.`
      },
      {
        title: "Interfaces in Python",
        content: `**Python has no built-in interface concept, but abstract classes can be used as interfaces.**

**Example: Interface for payment methods**

\`\`\`python
from abc import ABC, abstractmethod

class PaymentInterface(ABC):
    """Interface for all payment methods"""

    @abstractmethod
    def process_payment(self, amount):
        """Process a payment"""
        pass

    @abstractmethod
    def refund(self, amount):
        """Refund money"""
        pass

class CreditCardPayment(PaymentInterface):
    def __init__(self, card_number):
        self.card_number = card_number

    def process_payment(self, amount):
        return f"Paid {amount} USD with card {self.card_number[-4:]}"

    def refund(self, amount):
        return f"Refunded {amount} USD to card {self.card_number[-4:]}"

class PayPalPayment(PaymentInterface):
    def __init__(self, email):
        self.email = email

    def process_payment(self, amount):
        return f"Paid {amount} USD via PayPal ({self.email})"

    def refund(self, amount):
        return f"Refunded {amount} USD to PayPal ({self.email})"

# The function accepts any PaymentInterface object
def handle_payment(payment: PaymentInterface, amount):
    print(payment.process_payment(amount))

card = CreditCardPayment("1234-5678-9012-3456")
paypal = PayPalPayment("user@example.com")

handle_payment(card, 1000)
handle_payment(paypal, 500)
\`\`\``
      },
      {
        title: "Combining abstract and regular methods",
        content: `**An abstract class can have both abstract and regular methods:**

\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # Abstract method - MUST be implemented
    @abstractmethod
    def make_sound(self):
        pass

    # Regular method - already implemented
    def get_info(self):
        return f"{self.name}, {self.age} years old"

    # Regular method that uses an abstract one
    def introduce(self):
        print(f"Hello! I am {self.name}!")
        print(self.make_sound())

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self.breed = breed

    def make_sound(self):
        return "Woof-woof!"

class Cat(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)

    def make_sound(self):
        return "Meow!"

dog = Dog("Rex", 3, "Labrador")
cat = Cat("Murka", 2)

dog.introduce()
# Hello! I am Rex!
# Woof-woof!

cat.introduce()
# Hello! I am Murka!
# Meow!
\`\`\``
      },
      {
        title: "Practical example: Data storage system",
        content: `**A full example with abstract classes:**

\`\`\`python
from abc import ABC, abstractmethod
from typing import Any, Optional

class DataStorage(ABC):
    """Abstract class for data storages"""

    @abstractmethod
    def save(self, key: str, value: Any) -> bool:
        """Save data"""
        pass

    @abstractmethod
    def load(self, key: str) -> Optional[Any]:
        """Load data"""
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        """Delete data"""
        pass

    def exists(self, key: str) -> bool:
        """Check whether data exists (implemented)"""
        return self.load(key) is not None

class MemoryStorage(DataStorage):
    """In-memory storage"""

    def __init__(self):
        self.data = {}

    def save(self, key: str, value: Any) -> bool:
        self.data[key] = value
        return True

    def load(self, key: str) -> Optional[Any]:
        return self.data.get(key)

    def delete(self, key: str) -> bool:
        if key in self.data:
            del self.data[key]
            return True
        return False

class FileStorage(DataStorage):
    """File-based storage"""

    def __init__(self, directory):
        self.directory = directory

    def save(self, key: str, value: Any) -> bool:
        # Simplified implementation
        print(f"Saved {key} to file {self.directory}/{key}.txt")
        return True

    def load(self, key: str) -> Optional[Any]:
        print(f"Loaded {key} from file {self.directory}/{key}.txt")
        return "data from file"

    def delete(self, key: str) -> bool:
        print(f"Deleted file {self.directory}/{key}.txt")
        return True

# Usage
def demo_storage(storage: DataStorage):
    storage.save("user1", {"name": "Alex", "age": 20})
    print(f"user1 exists: {storage.exists('user1')}")
    data = storage.load("user1")
    print(f"Data: {data}")
    storage.delete("user1")
    print(f"user1 exists after deletion: {storage.exists('user1')}")

print("=== Memory Storage ===")
memory = MemoryStorage()
demo_storage(memory)

print("\\n=== File Storage ===")
files = FileStorage("/data")
demo_storage(files)
\`\`\``
      }
    ]
  },

  codeExamples: [
    {
      title: "Example 1: Simple abstract class",
      code: `# Simple abstract class
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof-woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# animal = Animal()  # Error!
dog = Dog()
cat = Cat()

print(dog.speak())  # Woof-woof!
print(cat.speak())  # Meow!`,
      explanation: "Demonstrates creating a simple abstract class and implementing it."
    },
    {
      title: "Example 2: Abstract class with properties",
      code: `# Abstract class with properties
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, name):
        self.name = name

    @property
    @abstractmethod
    def salary(self):
        pass

    @abstractmethod
    def get_bonus(self):
        pass

class Developer(Employee):
    def __init__(self, name, base_salary):
        super().__init__(name)
        self._salary = base_salary

    @property
    def salary(self):
        return self._salary

    def get_bonus(self):
        return self._salary * 0.2

dev = Developer("Alex", 50000)
print(f"{dev.name}: {dev.salary} USD, bonus: {dev.get_bonus()} USD")`,
      explanation: "Shows using abstract properties."
    },
    {
      title: "Example 3: Logging interface",
      code: `# Logging interface
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, message):
        pass

    @abstractmethod
    def error(self, message):
        pass

class ConsoleLogger(Logger):
    def log(self, message):
        print(f"[LOG] {message}")

    def error(self, message):
        print(f"[ERROR] {message}")

class FileLogger(Logger):
    def __init__(self, filename):
        self.filename = filename

    def log(self, message):
        print(f"[LOG to {self.filename}] {message}")

    def error(self, message):
        print(f"[ERROR to {self.filename}] {message}")

def process_data(logger: Logger):
    logger.log("Starting processing")
    logger.log("Processing data...")
    logger.error("An error occurred!")

console = ConsoleLogger()
file = FileLogger("app.log")

process_data(console)
print()
process_data(file)`,
      explanation: "Demonstrates using abstract classes as interfaces."
    },
    {
      title: "Example 4: Abstract class with partial implementation",
      code: `# Abstract class with partial implementation
from abc import ABC, abstractmethod

class DatabaseConnection(ABC):
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connected = False

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def disconnect(self):
        pass

    @abstractmethod
    def execute(self, query):
        pass

    def is_connected(self):
        return self.connected

class MySQLConnection(DatabaseConnection):
    def connect(self):
        print(f"Connecting to MySQL {self.host}:{self.port}")
        self.connected = True

    def disconnect(self):
        print("Disconnecting from MySQL")
        self.connected = False

    def execute(self, query):
        if self.connected:
            print(f"Executing MySQL query: {query}")
        else:
            print("Error: not connected")

db = MySQLConnection("localhost", 3306)
print(f"Connected: {db.is_connected()}")
db.connect()
print(f"Connected: {db.is_connected()}")
db.execute("SELECT * FROM users")
db.disconnect()`,
      explanation: "Shows combining abstract and regular methods."
    }
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to inherit from ABC",
      explanation: "To create an abstract class, you need to inherit from ABC.",
      correctApproach: "class MyClass(ABC): ..."
    },
    {
      mistake: "Not implementing all abstract methods",
      explanation: "A child class must implement ALL abstract methods of the parent class.",
      correctApproach: "Make sure you implemented every method marked with @abstractmethod"
    },
    {
      mistake: "Trying to create an object of an abstract class",
      explanation: "You cannot create objects of abstract classes.",
      correctApproach: "Create objects only of concrete (non-abstract) classes"
    },
    {
      mistake: "Wrong decorator order for properties",
      explanation: "@abstractmethod must be the last decorator.",
      correctApproach: "@property \\n @abstractmethod \\n def method(self): ..."
    }
  ],

  summary: `In this lesson we learned:

1. Abstract classes - classes that cannot be instantiated
2. The ABC module - for creating abstract classes
3. @abstractmethod - decorator for abstract methods
4. Abstract properties - using @property with @abstractmethod
5. Interfaces - abstract classes as contracts
6. Combining - abstract and regular methods together

Now you can create contracts for classes and guarantee correct implementation!

Next lesson - composition vs inheritance!`,

  practiceTask: {
    title: "File processing system with abstract classes",
    description: "Create a system for processing different file types",
    problemStatement: `Write a program that:
1. Creates an abstract class FileProcessor with methods read(), write(content), get_extension(), and process()
2. Creates TextFileProcessor (.txt) and JSONFileProcessor (.json)
3. Reads a text file name and a JSON file name from stdin
4. Calls process() for both (with a --- line between them)

Input format:
data.txt
config.json`,
    outputFormat: `Reading text file: data.txt
Writing to text file: data.txt
Extension: .txt
---
Reading JSON file: config.json
Writing to JSON file: config.json
Extension: .json`,
    examples: [
      {
        input: `data.txt
config.json`,
        output: `Reading text file: data.txt
Writing to text file: data.txt
Extension: .txt
---
Reading JSON file: config.json
Writing to JSON file: config.json
Extension: .json`,
        explanation: "Processing data.txt and config.json"
      },
      {
        input: `notes.txt
settings.json`,
        output: `Reading text file: notes.txt
Writing to text file: notes.txt
Extension: .txt
---
Reading JSON file: settings.json
Writing to JSON file: settings.json
Extension: .json`,
        explanation: "Other file names from stdin"
      },
      {
        input: `log.txt
api.json`,
        output: `Reading text file: log.txt
Writing to text file: log.txt
Extension: .txt
---
Reading JSON file: api.json
Writing to JSON file: api.json
Extension: .json`,
        explanation: "log.txt and api.json"
      }
    ],
    solution: {
      code: `from abc import ABC, abstractmethod

class FileProcessor(ABC):
    def __init__(self, filename):
        self.filename = filename

    @abstractmethod
    def read(self):
        pass

    @abstractmethod
    def write(self, content):
        pass

    @abstractmethod
    def get_extension(self):
        pass

    def process(self):
        print(self.read())
        print(self.write("data"))
        print(f"Extension: {self.get_extension()}")

class TextFileProcessor(FileProcessor):
    def read(self):
        return f"Reading text file: {self.filename}"

    def write(self, content):
        return f"Writing to text file: {self.filename}"

    def get_extension(self):
        return ".txt"

class JSONFileProcessor(FileProcessor):
    def read(self):
        return f"Reading JSON file: {self.filename}"

    def write(self, content):
        return f"Writing to JSON file: {self.filename}"

    def get_extension(self):
        return ".json"

txt_name = input().strip()
json_name = input().strip()

txt_processor = TextFileProcessor(txt_name)
txt_processor.process()
print("---")
json_processor = JSONFileProcessor(json_name)
json_processor.process()`,
      explanation: "Abstract FileProcessor and two subclasses; file names are read from stdin."
    },
    hints: [
      "Import ABC and abstractmethod from the abc module",
      "Read two lines with input()",
      "Child classes must implement all abstract methods",
      "Print --- between the process() calls"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is an abstract class?",
        options: [
          "A class that cannot be instantiated and that defines an interface",
          "A class without methods",
          "A class with private attributes",
          "A static class"
        ],
        correctAnswer: 0,
        explanation: "An abstract class cannot be instantiated and defines a contract for child classes."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens when you try to create an object?\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nshape = Shape()\n```",
        options: [
          "TypeError: cannot create an object of an abstract class",
          "The object is created successfully",
          "None",
          "SyntaxError"
        ],
        correctAnswer: 0,
        explanation: "You cannot create objects of abstract classes."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which decorator is used for abstract methods?",
        options: [
          "@abstractmethod",
          "@abstract",
          "@virtual",
          "@interface"
        ],
        correctAnswer: 0,
        explanation: "@abstractmethod is the decorator for marking abstract methods."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Is this code correct?\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass A(ABC):\n    @abstractmethod\n    def method(self):\n        pass\n\nclass B(A):\n    pass\n\nb = B()\n```",
        options: [
          "No, class B does not implement the abstract method",
          "Yes, the code is correct",
          "No, invalid syntax",
          "Yes, but method() will return None"
        ],
        correctAnswer: 0,
        explanation: "Class B must implement method(), otherwise you cannot create an object."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What must an abstract class inherit from?",
        options: [
          "ABC",
          "object",
          "abstractclass",
          "Interface"
        ],
        correctAnswer: 0,
        explanation: "An abstract class must inherit from ABC (Abstract Base Class)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is wrong with this code?\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Test(ABC):\n    @abstractmethod\n    @property\n    def value(self):\n        pass\n```",
        options: [
          "Wrong decorator order; @abstractmethod must be last",
          "Everything is correct",
          "You cannot combine @abstractmethod and @property",
          "A return is required"
        ],
        correctAnswer: 0,
        explanation: "@abstractmethod must be the last decorator: @property \\n @abstractmethod."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
