/**
 * Lesson 04-6: Dataclasses
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_6 = {
  lessonId: "lesson-04-6",
  moduleId: "module-04",
  order: 6,
  title: "Dataclasses",
  
  learningObjectives: [
    "Use dataclasses to simplify classes",
    "Automatically generate methods",
    "Apply the dataclass decorator",
    "Work with fields and default values"
  ],
  
  prerequisites: ["lesson-04-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are Dataclasses?",
        content: `**Dataclasses** are a special decorator in Python (since version 3.7) that automatically generates methods for classes that mainly store data.

**The problem without dataclasses:**

\`\`\`python
class Person:
    def __init__(self, name, age, city):
        self.name = name
        self.age = age
        self.city = city
    
    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age}, city='{self.city}')"
    
    def __eq__(self, other):
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age and self.city == other.city
\`\`\`

**With dataclasses:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    city: str
\`\`\`

**Benefits of dataclasses:**
- Less code
- Automatic generation of __init__, __repr__, __eq__
- Field type annotations
- Default values
- Convenient data handling`
      },
      {
        title: "Basics of using dataclasses",
        content: `**Creating a simple dataclass:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    pages: int
    price: float

# Creating an object
book = Book("1984", "George Orwell", 328, 250.50)

print(book)  # Book(title='1984', author='George Orwell', pages=328, price=250.5)
print(book.title)  # 1984

# Comparison
book2 = Book("1984", "George Orwell", 328, 250.50)
print(book == book2)  # True - automatic field comparison
\`\`\`

**What is generated automatically:**
- \`__init__\` - constructor
- \`__repr__\` - string representation
- \`__eq__\` - equality comparison

**Note:** Types (str, int, float) are annotations and are not required at runtime, but they are recommended for readability.`
      },
      {
        title: "Default values",
        content: `**Dataclasses support default values:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float
    quantity: int = 1  # Default value
    discount: float = 0.0  # Default value
    
    def total_price(self):
        return self.price * self.quantity * (1 - self.discount)

# Can create without specifying quantity and discount
product1 = Product("Laptop", 25000)
print(product1)  # Product(name='Laptop', price=25000, quantity=1, discount=0.0)

# Or specify all fields
product2 = Product("Phone", 15000, 2, 0.1)
print(product2)  # Product(name='Phone', price=15000, quantity=2, discount=0.1)
print(product2.total_price())  # 27000.0
\`\`\`

**Rules:**
- Fields without default values must come first
- Fields with default values come after them`
      },
      {
        title: "@dataclass decorator parameters",
        content: `**@dataclass** accepts several parameters for configuration:

\`\`\`python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

# frozen=True makes the object immutable
point = Point(3, 4)
# point.x = 5  # Error! FrozenInstanceError
\`\`\`

**Main parameters:**

\`\`\`python
@dataclass(
    init=True,       # Generate __init__ (default True)
    repr=True,       # Generate __repr__ (default True)
    eq=True,         # Generate __eq__ (default True)
    order=False,     # Generate __lt__, __le__, __gt__, __ge__
    frozen=False     # Make the object immutable
)
class Example:
    field: str
\`\`\`

**Example with order=True:**

\`\`\`python
from dataclasses import dataclass

@dataclass(order=True)
class Student:
    name: str
    grade: float

students = [
    Student("Alex", 4.5),
    Student("Maria", 4.8),
    Student("Ivan", 4.2)
]

# Can sort
students.sort()
for s in students:
    print(s)
# Student(name='Ivan', grade=4.2)
# Student(name='Alex', grade=4.5)
# Student(name='Maria', grade=4.8)
\`\`\``
      },
      {
        title: "field() and complex default values",
        content: `**For complex default values (lists, dictionaries) you need to use field():**

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    age: int
    grades: list = field(default_factory=list)  # Correct!
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def average(self):
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)

# Each student has their own grades list
student1 = Student("Alex", 15)
student2 = Student("Maria", 16)

student1.add_grade(5)
student1.add_grade(4)
student2.add_grade(5)

print(student1.grades)  # [5, 4]
print(student2.grades)  # [5]
print(student1.average())  # 4.5
\`\`\`

**Why is field(default_factory) needed?**

\`\`\`python
# WRONG!
@dataclass
class Wrong:
    items: list = []  # All objects will share one list!

# CORRECT!
@dataclass
class Correct:
    items: list = field(default_factory=list)  # Each object has its own list
\`\`\`

**field() parameters:**
- \`default\` - simple default value
- \`default_factory\` - function to create the value
- \`init\` - include field in __init__
- \`repr\` - include field in __repr__`
      },
      {
        title: "Post-init processing",
        content: `**__post_init__** is a method called after __init__ for additional processing:

\`\`\`python
from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float
    area: float = 0
    
    def __post_init__(self):
        # Calculate area after initialization
        self.area = self.width * self.height

rect = Rectangle(5, 3)
print(rect)  # Rectangle(width=5, height=3, area=15)
\`\`\`

**Example with validation:**

\`\`\`python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    
    def __post_init__(self):
        # Validation in __post_init__
        if self.age < 0:
            raise ValueError("Age cannot be negative!")
        if not self.name:
            raise ValueError("Name cannot be empty!")

# Correct
person1 = Person("Alex", 20)

# Error
try:
    person2 = Person("", 20)
except ValueError as e:
    print(e)  # Name cannot be empty!
\`\`\``
      },
      {
        title: "Practical example: Product management system",
        content: `**Full example of using dataclasses:**

\`\`\`python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    name: str
    price: float
    quantity: int = 1
    
    def total_value(self):
        return self.price * self.quantity

@dataclass
class Store:
    name: str
    products: List[Product] = field(default_factory=list)
    
    def add_product(self, product: Product):
        self.products.append(product)
    
    def total_inventory_value(self):
        return sum(p.total_value() for p in self.products)
    
    def get_product_by_name(self, name: str):
        for product in self.products:
            if product.name == name:
                return product
        return None

# Usage
store = Store("TechMart")

# Add products
store.add_product(Product("Laptop", 25000, 5))
store.add_product(Product("Mouse", 500, 20))
store.add_product(Product("Keyboard", 1500, 10))

print(f"Store: {store.name}")
print(f"Products: {len(store.products)}")
print(f"Total value: {store.total_inventory_value()} USD")

# Find product
laptop = store.get_product_by_name("Laptop")
if laptop:
    print(f"\\nFound: {laptop.name}")
    print(f"Price: {laptop.price} USD")
    print(f"Quantity: {laptop.quantity}")
    print(f"Total value: {laptop.total_value()} USD")
\`\`\`

**Output:**
\`\`\`
Store: TechMart
Products: 3
Total value: 150000 USD

Found: Laptop
Price: 25000 USD
Quantity: 5
Total value: 125000 USD
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Simple dataclass",
      code: `# Simple dataclass
from dataclasses import dataclass

@dataclass
class Car:
    brand: str
    model: str
    year: int
    price: float

car1 = Car("Toyota", "Camry", 2020, 500000)
car2 = Car("BMW", "X5", 2021, 1200000)

print(car1)  # Car(brand='Toyota', model='Camry', year=2020, price=500000)
print(car1 == car2)  # False
print(car1.brand)  # Toyota`,
      explanation: "Demonstrates creating a simple dataclass with automatic method generation."
    },
    {
      title: "Example 2: Default values",
      code: `# Default values
from dataclasses import dataclass

@dataclass
class Task:
    title: str
    description: str = ""
    completed: bool = False
    priority: int = 1
    
    def mark_completed(self):
        self.completed = True

task1 = Task("Learn dataclasses")
task2 = Task("Build a project", "Create a web app", False, 3)

print(task1)
task1.mark_completed()
print(f"Task completed: {task1.completed}")`,
      explanation: "Shows using default values in a dataclass."
    },
    {
      title: "Example 3: field() for lists",
      code: `# field() for complex types
from dataclasses import dataclass, field
from typing import List

@dataclass
class Playlist:
    name: str
    songs: List[str] = field(default_factory=list)
    
    def add_song(self, song: str):
        self.songs.append(song)
    
    def count(self):
        return len(self.songs)

playlist1 = Playlist("Favorites")
playlist2 = Playlist("Work")

playlist1.add_song("Song 1")
playlist1.add_song("Song 2")
playlist2.add_song("Song 3")

print(f"{playlist1.name}: {playlist1.count()} songs")
print(f"{playlist2.name}: {playlist2.count()} songs")`,
      explanation: "Demonstrates using field(default_factory) for lists and other mutable types."
    },
    {
      title: "Example 4: frozen dataclass",
      code: `# frozen dataclass (immutable)
from dataclasses import dataclass

@dataclass(frozen=True)
class Coordinates:
    latitude: float
    longitude: float
    
    def distance_to(self, other):
        # Simplified formula for the example
        dx = self.latitude - other.latitude
        dy = self.longitude - other.longitude
        return (dx**2 + dy**2) ** 0.5

coord1 = Coordinates(40.7128, -74.0060)  # New York
coord2 = Coordinates(34.0522, -118.2437)  # Los Angeles

print(coord1)
print(f"Distance: {coord1.distance_to(coord2):.2f}")

# coord1.latitude = 41.0  # Error! FrozenInstanceError`,
      explanation: "Shows using frozen=True to create immutable objects."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using [] or {} as default values",
      explanation: "Mutable objects (lists, dictionaries) will be shared across all instances.",
      correctApproach: "Use field(default_factory=list) or field(default_factory=dict)"
    },
    {
      mistake: "Modifying a frozen dataclass",
      explanation: "If a dataclass has frozen=True, it cannot be modified.",
      correctApproach: "Create a new object instead of modifying a frozen object"
    },
    {
      mistake: "Mixing up field order with and without defaults",
      explanation: "Fields without default values must come first.",
      correctApproach: "Declare fields without defaults first, then fields with defaults"
    },
    {
      mistake: "Forgetting type annotations",
      explanation: "Dataclass requires type annotations for all fields.",
      correctApproach: "Always specify types: name: str, age: int, etc."
    }
  ],
  
  summary: `In this lesson we learned:

1. Dataclasses - a decorator to simplify data-storing classes
2. @dataclass - automatically generates __init__, __repr__, __eq__
3. Default values - can be specified for fields
4. field() - for complex default values (lists, dictionaries)
5. Decorator parameters - frozen, order, init, repr, eq
6. __post_init__ - additional processing after initialization

You can now create data classes quickly and conveniently!

Next lesson - abstract classes and interfaces!`,
  
  practiceTask: {
    title: "Library management system with dataclasses",
    description: "Create a library management system using dataclasses",
    problemStatement: `Write a program that:
1. Creates a Book dataclass with fields:
   - title: str
   - author: str
   - isbn: str
   - is_available: bool = True
2. Creates a Library dataclass with fields:
   - name: str
   - books: List[Book] (use field(default_factory))
3. Adds methods to Library:
   - add_book(book) - adds a book
   - borrow_book(isbn) - borrows a book (is_available = False)
   - return_book(isbn) - returns a book (is_available = True)
   - available_books_count() - count of available books
4. Creates a library, adds several books, and tests the methods`,
    outputFormat: `Example output:
Library: Central
Added: "1984" by George Orwell
Added: "Moby Dick" by Herman Melville
Available books: 2
Borrowed: "1984"
Available books: 1
Returned: "1984"
Available books: 2`,
    examples: [
      {
        output: `Library: Central
Added: "1984" by George Orwell
Added: "Moby Dick" by Herman Melville
Available books: 2
Borrowed: "1984"
Available books: 1
Returned: "1984"
Available books: 2`,
        explanation: "The program demonstrates working with dataclasses for library management"
      }
    ],
    solution: {
      code: `# Library management system
from dataclasses import dataclass, field
from typing import List

@dataclass
class Book:
    title: str
    author: str
    isbn: str
    is_available: bool = True

@dataclass
class Library:
    name: str
    books: List[Book] = field(default_factory=list)
    
    def add_book(self, book: Book):
        self.books.append(book)
        print(f'Added: "{book.title}" by {book.author}')
    
    def borrow_book(self, isbn: str):
        for book in self.books:
            if book.isbn == isbn and book.is_available:
                book.is_available = False
                print(f'Borrowed: "{book.title}"')
                return
        print(f"Book with ISBN {isbn} is not available")
    
    def return_book(self, isbn: str):
        for book in self.books:
            if book.isbn == isbn:
                book.is_available = True
                print(f'Returned: "{book.title}"')
                return
        print(f"Book with ISBN {isbn} not found")
    
    def available_books_count(self):
        return sum(1 for book in self.books if book.is_available)

# Create library
library = Library("Central")
print(f"Library: {library.name}")

# Add books
book1 = Book("1984", "George Orwell", "978-0-452-28423-4")
book2 = Book("Moby Dick", "Herman Melville", "978-0-14-243724-7")

library.add_book(book1)
library.add_book(book2)

# Test methods
print(f"Available books: {library.available_books_count()}")
library.borrow_book("978-0-452-28423-4")
print(f"Available books: {library.available_books_count()}")
library.return_book("978-0-452-28423-4")
print(f"Available books: {library.available_books_count()}")`,
      explanation: "The solution uses dataclasses to create Book and Library classes with automatic method generation."
    },
    hints: [
      "Use @dataclass for both classes",
      "For the books list use field(default_factory=list)",
      "Add typing import for List[Book]",
      "Methods can be added like in regular classes",
      "Check is_available when borrowing a book"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a dataclass in Python?",
        options: [
          "A decorator for automatic generation of data class methods",
          "A data type",
          "A function",
          "A module"
        ],
        correctAnswer: 0,
        explanation: "A dataclass is a decorator that automatically generates methods for classes that store data."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Which methods are automatically generated for a dataclass by default?\n\n```python\n@dataclass\nclass Person:\n    name: str\n    age: int\n```",
        options: [
          "__init__, __repr__, __eq__",
          "Only __init__",
          "__init__, __str__",
          "All methods"
        ],
        correctAnswer: 0,
        explanation: "By default, dataclass generates __init__, __repr__, and __eq__."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you correctly specify a list as a default value in a dataclass?",
        options: [
          "items: list = field(default_factory=list)",
          "items: list = []",
          "items = []",
          "items: list()"
        ],
        correctAnswer: 0,
        explanation: "For mutable objects (lists, dictionaries) you need to use field(default_factory)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does the frozen=True parameter do?\n\n```python\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int\n```",
        options: [
          "Makes the object immutable",
          "Freezes execution",
          "Makes the class static",
          "Does nothing"
        ],
        correctAnswer: 0,
        explanation: "frozen=True makes the object immutable — you cannot change its attributes."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is the __post_init__ method called?",
        options: [
          "After __init__",
          "Before __init__",
          "Instead of __init__",
          "Never"
        ],
        correctAnswer: 0,
        explanation: "__post_init__ is called automatically after __init__ for additional processing."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is wrong with this code?\n\n```python\n@dataclass\nclass Test:\n    items: list = []\n```",
        options: [
          "All objects will share one list",
          "Incorrect syntax",
          "No errors",
          "List type is required"
        ],
        correctAnswer: 0,
        explanation: "Mutable objects like [] will be shared across all instances. Use field(default_factory=list)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

