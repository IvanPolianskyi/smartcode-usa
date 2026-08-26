/**
 * Lesson 04-1: OOP Basics: Classes and Objects
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_1 = {
  lessonId: "lesson-04-1",
  moduleId: "module-04",
  order: 1,
  title: "OOP Basics: Classes and Objects",

  learningObjectives: [
    "Explain what a class is and how it differs from an object",
    "Declare your own classes with the class keyword",
    "Create instances (objects) of a class",
    "Use the __init__ constructor to initialize attributes",
    "Understand the role of the self parameter in instance methods"
  ],

  prerequisites: ["lesson-03-10"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is OOP?",
        content: `**Object-oriented programming (OOP)** is an approach where a program is built around **objects**: entities that combine data and behavior.

Until now we worked with variables, lists, and functions separately. In OOP we group them into logical “boxes.”

**Real-life analogy:**

Imagine a car:
- **Data (attributes):** color, brand, speed, fuel level
- **Behavior (methods):** drive, brake, honk

In Python a car can be described as a **class** \`Car\`, and a specific Toyota or BMW as **objects** of that class.

**Why OOP?**

1. **Code organization** - related data and actions live together
2. **Reuse** - one class → many objects
3. **Scalability** - easier to grow large programs
4. **Modeling** - code stays closer to real-world entities

**Four pillars of OOP** (we will build on them in this module):

1. **Encapsulation** - hiding internal details
2. **Inheritance** - creating new classes based on existing ones
3. **Polymorphism** - one interface, different behavior
4. **Abstraction** - focusing on what matters, ignoring details

In this lesson we focus on the foundation: **classes, objects, \`__init__\`, and \`self\`**.`
      },
      {
        title: "Class vs object",
        content: `A **class** is a blueprint (template). An **object** (instance) is a concrete thing created from that blueprint.

\`\`\`python
# Class - template
class Dog:
    pass

# Objects - concrete instances
dog1 = Dog()
dog2 = Dog()

print(type(dog1))  # <class '__main__.Dog'>
print(dog1 is dog2)  # False - different objects
\`\`\`

**Important:**

| Concept | What it is | Example |
|---------|------------|---------|
| Class | Description / template | \`class Student:\` |
| Object (instance) | Concrete instance | \`s = Student()\` |
| Attribute | Object data | \`s.name\` |
| Method | Function inside a class | \`s.greet()\` |

One class can produce **as many** objects as you need - each with its own data.`
      },
      {
        title: "Creating a class and the __init__ constructor",
        content: `A class is declared with the \`class\` keyword. Class names are usually written in **PascalCase** (\`Student\`, \`BankAccount\`).

The **\`__init__\` constructor** runs automatically when an object is created. This is where you set initial attributes.

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

student = Student("Elena", 20)
print(student.name)  # Elena
print(student.age)   # 20
\`\`\`

**What happens step by step:**

1. Python creates a new empty object
2. \`__init__(self, "Elena", 20)\` is called
3. \`self\` is a reference to **this** new object
4. Attributes \`name\` and \`age\` are stored on the object
5. Variable \`student\` gets a reference to the finished object

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(3, 4)
p2 = Point(0, 0)
print(p1.x, p1.y)  # 3 4
print(p2.x, p2.y)  # 0 0
\`\`\`

**Rules for \`__init__\`:**

- The first parameter is always \`self\`
- \`__init__\` does **not** return a value via \`return\` (except \`None\`)
- Attributes are created with \`self.name = value\``
      },
      {
        title: "The self parameter",
        content: `**\`self\`** is a reference to the current class instance. Through it, methods “see” the attributes of **this** object.

\`\`\`python
class Cat:
    def __init__(self, name):
        self.name = name

    def meow(self):
        print(f"{self.name} says: Meow!")

cat1 = Cat("Mittens")
cat2 = Cat("Snowball")

cat1.meow()  # Mittens says: Meow!
cat2.meow()  # Snowball says: Meow!
\`\`\`

When you write \`cat1.meow()\`, Python actually calls \`Cat.meow(cat1)\` - it passes the object as \`self\` automatically.

**Common mistakes with self:**

\`\`\`python
# Wrong - forgot self in the method definition
class Demo:
    def greet():  # TypeError when called
        print("Hello")

# Wrong - forgot self. before the attribute
class Demo:
    def __init__(self, name):
        name = name  # local variable, not an attribute!
\`\`\`

**Remember:** \`self\` is the object’s “I.” Without it, methods do not know whose data to use.`
      },
      {
        title: "Attributes and simple methods",
        content: `**Instance attributes** are data belonging to a specific object. **Methods** are functions defined inside a class.

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

    def describe(self):
        print(f"Rectangle {self.width}x{self.height}")
        print(f"Area: {self.area()}")
        print(f"Perimeter: {self.perimeter()}")

rect = Rectangle(4, 3)
rect.describe()
\`\`\`

**You can change attributes after creation:**

\`\`\`python
rect.width = 10
print(rect.area())  # 30
\`\`\`

**A class as an object “factory”:**

\`\`\`python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def info(self):
        return f'"{self.title}" - {self.author} ({self.pages} pp.)'

books = [
    Book("Kobzar", "T. Shevchenko", 400),
    Book("1984", "G. Orwell", 328),
]

for book in books:
    print(book.info())
\`\`\`

This way we model real entities - not just a pile of separate variables.`
      },
      {
        title: "Practical tips for beginners",
        content: `**1. Name classes with nouns, methods with verbs**

\`\`\`python
class User:          # noun
    def login(self): # verb
        pass
\`\`\`

**2. Keep \`__init__\` simple** - only store initial data; put complex logic in methods.

**3. One class - one responsibility**

Do not make an \`EverythingManager\` class. Prefer separate \`Student\`, \`Course\`, \`GradeBook\`.

**4. Check the object type**

\`\`\`python
student = Student("Ivan", 19)
print(isinstance(student, Student))  # True
\`\`\`

**5. Comparison with a functional approach**

Without OOP:
\`\`\`python
name = "Elena"
age = 20
def greet(name, age):
    print(f"{name}, {age}")
\`\`\`

With OOP:
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def greet(self):
        print(f"{self.name}, {self.age}")
\`\`\`

OOP is more convenient when there is a lot of data and behavior belonging to one entity.

In the next lesson we will dig deeper into **class vs instance attributes** and method types.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Simple Person class",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hi, my name is {self.name}!")
        print(f"I am {self.age} years old.")

person = Person("Andrew", 25)
person.introduce()`,
      explanation: "We create a class with a constructor and a method. The object stores its own name and age."
    },
    {
      title: "Several instances of one class",
      code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} ({self.breed}) says: Woof!")

dog1 = Dog("Rex", "shepherd")
dog2 = Dog("Lucky", "labrador")

dog1.bark()
dog2.bark()`,
      explanation: "One class - two independent objects with different attributes."
    },
    {
      title: "Class with a computed method",
      code: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

    def diameter(self):
        return self.radius * 2

c = Circle(5)
print(f"Radius: {c.radius}")
print(f"Diameter: {c.diameter()}")
print(f"Area: {c.area()}")`,
      explanation: "Methods use self.radius for calculations based on the object’s data."
    },
    {
      title: "Changing attributes after creation",
      code: `class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1

    def show(self):
        print(f"Current value: {self.value}")

counter = Counter(10)
counter.show()
counter.increment()
counter.increment()
counter.show()`,
      explanation: "Methods can change the object’s state through self."
    }
  ],

  commonMistakes: [
    {
      mistake: "Forgetting self in a method or constructor",
      explanation: "Without self, Python will not pass a reference to the instance - you get a TypeError.",
      correctApproach: `class Demo:
    def __init__(self, value):
        self.value = value

    def show(self):
        print(self.value)`
    },
    {
      mistake: "Creating a local variable instead of an attribute",
      explanation: "If you write name = name without self., the object attribute never appears.",
      correctApproach: `# Correct:
self.name = name

# Incorrect:
name = name  # local variable only`
    },
    {
      mistake: "Calling a method without parentheses or without an object",
      explanation: "A method belongs to an instance; you need an object and call parentheses.",
      correctApproach: `student = Student("Olya", 18)
student.greet()  # correct
# Student.greet() without an argument - error`
    },
    {
      mistake: "Expecting __init__ to return a value",
      explanation: "__init__ initializes the object and always implicitly returns None.",
      correctApproach: `student = Student("Olya", 18)  # constructor does not return data
# get data from attributes: student.name`
    }
  ],

  summary: `In this lesson we covered OOP basics:

1. A class is a template; an object is a concrete instance
2. class - the keyword for declaring a class
3. __init__ - the constructor for initial attributes
4. self - a reference to the current instance
5. Attributes store state; methods describe behavior

This is the foundation of the entire OOP module. Next - a deeper look at attributes and class methods.`,

  practiceTask: {
    title: "Student profile",
    description: "Create a Student class and print student information from input",
    problemStatement: `Write a program that:
1. Declares a Student class with constructor __init__(self, name, age, course)
2. Has a method info(self) that prints three lines:
   - Student: {name}
   - Age: {age}
   - Course: {course}
3. Reads three lines from stdin: name, age (integer), course name
4. Creates a Student object and calls info()

Input format:
Maria
18
Python`,
    outputFormat: `Student: Maria
Age: 18
Course: Python`,
    examples: [
      {
        input: `Maria
18
Python`,
        output: `Student: Maria
Age: 18
Course: Python`,
        explanation: "Created student Maria, age 18, course Python"
      },
      {
        input: `Ivan
21
JavaScript`,
        output: `Student: Ivan
Age: 21
Course: JavaScript`,
        explanation: "Created student Ivan on the JavaScript course"
      },
      {
        input: `Oksana
19
Data Science`,
        output: `Student: Oksana
Age: 19
Course: Data Science`,
        explanation: "Created student Oksana on the Data Science course"
      }
    ],
    solution: {
      code: `class Student:
    def __init__(self, name, age, course):
        self.name = name
        self.age = age
        self.course = course

    def info(self):
        print(f"Student: {self.name}")
        print(f"Age: {self.age}")
        print(f"Course: {self.course}")

name = input().strip()
age = int(input())
course = input().strip()

student = Student(name, age, course)
student.info()`,
      explanation: "The Student class stores attributes via self. Read three lines from stdin, create an object, and call info()."
    },
    hints: [
      "First declare class Student with __init__ and method info",
      "name = input().strip(), age = int(input()), course = input().strip()",
      "Create the object: student = Student(name, age, course)",
      "Do not forget self in every method"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a class in Python?",
        options: [
          "A template (blueprint) for creating objects",
          "A concrete instance in memory",
          "A built-in function for printing",
          "A type of loop"
        ],
        correctAnswer: 0,
        explanation: "A class is a template. Objects are created from it."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which keyword is used to declare a class?",
        options: [
          "class",
          "def",
          "object",
          "struct"
        ],
        correctAnswer: 0,
        explanation: "Classes are declared with the class keyword."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "The __init__ method is called automatically when an object is created.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, __init__ is the constructor; it runs when you write Student(...)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass Box:\n    def __init__(self, value):\n        self.value = value\n\nb = Box(10)\nprint(b.value)\n```",
        options: [
          "10",
          "value",
          "None",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "The value attribute is set in __init__ and equals 10."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the self parameter for?",
        options: [
          "It is a reference to the current class instance",
          "It is a keyword for creating a class",
          "It is a data type for strings",
          "It is a required name for any variable"
        ],
        correctAnswer: 0,
        explanation: "self lets methods work with the attributes of a specific object."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(f\"{self.name}: Woof!\")\n\nDog(\"Rex\").bark()\n```",
        options: [
          "Rex: Woof!",
          "Woof!",
          "None",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "An object with name='Rex' is created and bark() is called immediately."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How does an object differ from a class?",
        options: [
          "An object is a concrete instance created from a class template",
          "Object and class are the same thing",
          "A class exists only while the program runs",
          "An object cannot have methods"
        ],
        correctAnswer: 0,
        explanation: "A class is a template; an object is a concrete realization of that template."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "One class can be used to create many independent objects.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Exactly: one template - many instances with their own data."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
