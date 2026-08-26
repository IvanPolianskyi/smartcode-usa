/**
 * Lesson 04-4: Inheritance
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_4 = {
  lessonId: "lesson-04-4",
  moduleId: "module-04",
  order: 4,
  title: "Inheritance",

  learningObjectives: [
    "Create child classes based on parent classes",
    "Understand which attributes and methods are inherited",
    "Override methods in a child class",
    "Use super() to call parent logic",
    "Explain the basic idea of method resolution order (MRO)"
  ],

  prerequisites: ["lesson-04-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is inheritance?",
        content: `**Inheritance** lets you create a new class based on an existing one, **taking over** its attributes and methods.

- **Parent class (parent / base / superclass)** — the original template
- **Child class (child / derived / subclass)** — an extension or specialization

**Analogy:** “Transport” → “Car” → “Electric car.” Each next level adds details but keeps what is shared.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):  # Dog inherits Animal
    def speak(self):
        print(f"{self.name} says: Woof!")

dog = Dog("Rex")
dog.speak()  # Rex says: Woof!
\`\`\`

**Why inheritance?**

1. Avoid code duplication
2. Build hierarchies (“is a kind of”)
3. Extend behavior without changing the base class

**Important:** inheritance makes sense when classes have an *“is-a”* relationship (Dog **is an** Animal), not just *“has-a”* (Car **has an** Engine — that is composition, lesson 04-8).`
      },
      {
        title: "Syntax and inherited members",
        content: `Put the parent class in parentheses after the name:

\`\`\`python
class Parent:
    def greet(self):
        print("Hello from Parent")

class Child(Parent):
    pass

c = Child()
c.greet()  # Hello from Parent
\`\`\`

The child class receives:

- parent methods
- \`__init__\` logic (if not overridden)
- parent class attributes

\`\`\`python
class Employee:
    company = "SmartCode"

    def __init__(self, name):
        self.name = name

    def info(self):
        print(f"{self.name} @ {self.company}")

class Developer(Employee):
    def __init__(self, name, language):
        super().__init__(name)
        self.language = language

    def info(self):
        super().info()
        print(f"Language: {self.language}")

dev = Developer("Olya", "Python")
dev.info()
\`\`\`

\`isinstance(dev, Developer)\` → \`True\`  
\`isinstance(dev, Employee)\` → \`True\` — a child object **is also** an instance of the parent.`
      },
      {
        title: "Method overriding",
        content: `**Overriding** means declaring in the child class a method with the same name as in the parent. The new version **replaces** the old one for child objects.

\`\`\`python
class Bird:
    def move(self):
        print("Flies")

class Penguin(Bird):
    def move(self):
        print("Swims and walks")

Bird().move()      # Flies
Penguin().move()   # Swims and walks
\`\`\`

This is the basis of polymorphism (next lesson): the same \`move()\` call, different behavior.

**When to override:**

- you need specialized behavior
- the parent implementation does not fit “as is”

**When not to:**

- if you can simply add a new method without replacing the old one`
      },
      {
        title: "super() — calling the parent implementation",
        content: `Often a child class wants to **extend**, not fully replace, parent logic. Use \`super()\` for that.

\`\`\`python
class Person:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"I am {self.name}")

class Student(Person):
    def __init__(self, name, course):
        super().__init__(name)  # parent initialization
        self.course = course

    def introduce(self):
        super().introduce()
        print(f"I study {self.course}")

s = Student("Ivan", "Python")
s.introduce()
# I am Ivan
# I study Python
\`\`\`

**Why not write \`Person.__init__(self, name)\` directly?**

\`super()\` works more correctly with complex hierarchies and multiple inheritance. It is the modern Python standard.

\`\`\`python
class Logger:
    def log(self, msg):
        print(f"[LOG] {msg}")

class AppLogger(Logger):
    def log(self, msg):
        super().log(msg)
        print(f"[APP] {msg}")
\`\`\``
      },
      {
        title: "Briefly about MRO",
        content: `**MRO (Method Resolution Order)** is the order in which Python looks up methods and attributes in a class hierarchy.

\`\`\`python
class A:
    def who(self):
        print("A")

class B(A):
    def who(self):
        print("B")

class C(B):
    pass

C().who()  # B
print(C.__mro__)
# (<class 'C'>, <class 'B'>, <class 'A'>, <class 'object'>)
\`\`\`

Lookup goes left to right along the MRO: first \`C\`, then \`B\`, then \`A\`, then base \`object\`.

For starters, remember:

1. Python looks for a method first in the class itself
2. Then in parents by MRO
3. \`super()\` goes to the **next** class in that order

Multiple inheritance (\`class C(A, B)\`) is possible, but early on it is better to keep hierarchies simple.`
      },
      {
        title: "Practical example: shape hierarchy",
        content: `\`\`\`python
class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        return 0

    def describe(self):
        print(f"{self.name}: area = {self.area()}")

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
        self.name = "Square"

shapes = [Rectangle(4, 3), Square(5)]
for shape in shapes:
    shape.describe()
\`\`\`

\`Square\` inherits \`Rectangle\`, which inherits \`Shape\`. Each level adds specialization without copying the rectangle area code.

In the next lesson such hierarchies become the basis of **polymorphism**.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Basic inheritance",
      code: `class Vehicle:
    def __init__(self, brand):
        self.brand = brand

    def start(self):
        print(f"{self.brand} starts")

class Car(Vehicle):
    def honk(self):
        print("Beep-beep!")

car = Car("Toyota")
car.start()
car.honk()`,
      explanation: "Car gets start() from Vehicle and adds its own honk()."
    },
    {
      title: "Overriding speak",
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} says: Meow!")

Cat("Mittens").speak()`,
      explanation: "The speak method in Cat replaces the Animal version."
    },
    {
      title: "super() in the constructor",
      code: `class Person:
    def __init__(self, name):
        self.name = name

class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

    def info(self):
        print(f"{self.name} teaches {self.subject}")

Teacher("Anna", "Python").info()`,
      explanation: "super().__init__ initializes part of the state in the parent class."
    },
    {
      title: "Inheritance chain",
      code: `class A:
    def step(self):
        return "A"

class B(A):
    def step(self):
        return super().step() + "-B"

class C(B):
    def step(self):
        return super().step() + "-C"

print(C().step())  # A-B-C`,
      explanation: "Each level adds its fragment through super()."
    }
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to call super().__init__",
      explanation: "Without parent initialization, the child object may lack required attributes.",
      correctApproach: `class Child(Parent):
    def __init__(self, name, extra):
        super().__init__(name)
        self.extra = extra`
    },
    {
      mistake: "Inheriting “just because,” without an is-a relationship",
      explanation: "For example, Car(Engine) is a bad model: a car is not an engine.",
      correctApproach: "Use inheritance for is-a; for has-a use composition"
    },
    {
      mistake: "Overriding a method and losing useful parent logic",
      explanation: "Sometimes a full replacement is worse than extending via super().",
      correctApproach: "Call super().method() and add your own logic"
    },
    {
      mistake: "Confusing the parent class name in parentheses",
      explanation: "class Dog: Animal is a syntax error; you need class Dog(Animal):",
      correctApproach: "class Dog(Animal):"
    }
  ],

  summary: `In this lesson we studied inheritance:

1. A child class inherits parent behavior
2. Override lets you specialize methods
3. super() calls the parent implementation
4. isinstance also works for parent types
5. MRO defines the method lookup order

Next — polymorphism: the same call shape, different behavior.`,

  practiceTask: {
    title: "Animals and sounds",
    description: "Create an Animal → Dog/Cat hierarchy with speak overridden",
    problemStatement: `Write a program that:
1. Declares an Animal class with __init__(self, name) and method speak(self),
   which prints: {name} makes a sound
2. Declares Dog(Animal), which overrides speak:
   {name} says: Woof!
3. Declares Cat(Animal), which overrides speak:
   {name} says: Meow!
4. Reads two pairs: kind1, name1, then kind2, name2
   (kind is dog or cat in lowercase)
5. Creates the matching objects and calls speak() for each

Input format:
dog
Rex
cat
Mittens`,
    outputFormat: `Rex says: Woof!
Mittens says: Meow!`,
    examples: [
      {
        input: `dog
Rex
cat
Mittens`,
        output: `Rex says: Woof!
Mittens says: Meow!`,
        explanation: "Dog and cat with overridden speak"
      },
      {
        input: `cat
Snowball
dog
Bobby`,
        output: `Snowball says: Meow!
Bobby says: Woof!`,
        explanation: "Cat first, then dog"
      },
      {
        input: `dog
Lucky
dog
Jack`,
        output: `Lucky says: Woof!
Jack says: Woof!`,
        explanation: "Two dogs"
      }
    ],
    solution: {
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} says: Woof!")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} says: Meow!")

def create_animal(kind, name):
    if kind == "dog":
        return Dog(name)
    return Cat(name)

kind1 = input().strip()
name1 = input().strip()
kind2 = input().strip()
name2 = input().strip()

create_animal(kind1, name1).speak()
create_animal(kind2, name2).speak()`,
      explanation: "Dog and Cat inherit Animal and override speak(). Kind is read from stdin."
    },
    hints: [
      "Syntax: class Dog(Animal):",
      "In speak use self.name",
      "Read four lines in sequence",
      "Compare kind with the strings 'dog' and 'cat'"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is inheritance?",
        options: [
          "Creating a new class based on an existing one and inheriting members",
          "Deleting parent class methods",
          "Copying project files",
          "Converting int to str"
        ],
        correctAnswer: 0,
        explanation: "Inheritance lets a child class take over parent attributes and methods."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass A:\n    def hi(self):\n        print(\"A\")\nclass B(A):\n    pass\nB().hi()\n```",
        options: [
          "A",
          "B",
          "Error",
          "None"
        ],
        correctAnswer: 0,
        explanation: "B does not override hi, so the version from A is called."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is super() used for?",
        options: [
          "To call a parent class method",
          "To create a superuser",
          "To speed up the program",
          "To delete an object"
        ],
        correctAnswer: 0,
        explanation: "super() gives access to the parent class implementation (via MRO)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "If Dog inherits Animal, then isinstance(Dog('x'), Animal) returns True.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "A child instance is also an instance of the parent type."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass A:\n    def f(self):\n        return 1\nclass B(A):\n    def f(self):\n        return super().f() + 2\nprint(B().f())\n```",
        options: [
          "3",
          "1",
          "2",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "super().f() returns 1, plus 2 gives 3."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does method overriding mean?",
        options: [
          "Declaring in a child class a method with the same name that replaces the parent one",
          "Deleting the parent class",
          "Creating two identical classes",
          "Importing a module twice"
        ],
        correctAnswer: 0,
        explanation: "Override replaces method behavior for child instances."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "MRO defines the order in which Python looks up methods in a class hierarchy.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, Method Resolution Order sets the lookup sequence."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
