/**
 * Lesson 04-5: Polymorphism
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_5 = {
  lessonId: "lesson-04-5",
  moduleId: "module-04",
  order: 5,
  title: "Polymorphism",

  learningObjectives: [
    "Explain what polymorphism means in OOP",
    "Apply polymorphism through method overriding",
    "Understand duck typing in Python (“if it walks like a duck...”)",
    "Process collections of different objects with one interface",
    "Write flexible code without unnecessary type checks"
  ],

  prerequisites: ["lesson-04-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is polymorphism?",
        content: `**Polymorphism** (from Greek — “many forms”) means: **one interface — different behavior**.

You call the same method (\`speak()\`, \`area()\`, \`draw()\`), and objects of different classes respond in their own way.

\`\`\`python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

animals = [Dog(), Cat()]
for animal in animals:
    print(animal.speak())
\`\`\`

The loop **does not know** the concrete type — it only cares that the object has \`speak()\`.

**Why is this powerful?**

1. Code becomes shorter and more flexible
2. Easy to add a new class without changing the loop
3. Fewer \`if/elif\` chains like “if dog — this, if cat — that”

Polymorphism is closely tied to inheritance, but in Python it often works **even without a shared parent** — thanks to duck typing.`
      },
      {
        title: "Polymorphism through inheritance",
        content: `Classic OOP approach: a shared parent class (or interface) and overridden methods.

\`\`\`python
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14 * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

shapes = [Circle(5), Rectangle(4, 3)]
for shape in shapes:
    print(shape.area())
\`\`\`

Outside code works with a “shape” in general. Calculation details live inside each class.

That is polymorphism: \`shape.area()\` looks the same; the result depends on the real object type.`
      },
      {
        title: "Duck typing in Python",
        content: `Python follows the principle:

> *If it walks like a duck and quacks like a duck, it is a duck.*

That is, **behavior** matters (having the needed methods), not official inheritance from \`Duck\`.

\`\`\`python
class Duck:
    def quack(self):
        print("Quack!")

class Person:
    def quack(self):
        print("I am imitating a duck!")

def make_it_quack(thing):
    thing.quack()

make_it_quack(Duck())
make_it_quack(Person())  # works too!
\`\`\`

\`Person\` does **not** inherit \`Duck\`, but has a \`quack\` method — and that is enough.

**Pros of duck typing:**

- Fewer rigid hierarchies
- Faster prototyping
- Convenient for small scripts and Pythonic style

**Cons:**

- Errors may show up only at runtime
- You need tests and clear method names

In larger systems people sometimes add abstract base classes (lesson 04-7) for clearer contracts.`
      },
      {
        title: "Polymorphism in practice",
        content: `Consider payment methods:

\`\`\`python
class CashPayment:
    def pay(self, amount):
        print(f"Cash: paid {amount} USD")

class CardPayment:
    def pay(self, amount):
        print(f"Card: paid {amount} USD")

class OnlinePayment:
    def pay(self, amount):
        print(f"Online: paid {amount} USD")

def checkout(payment, amount):
    payment.pay(amount)

for method in [CashPayment(), CardPayment(), OnlinePayment()]:
    checkout(method, 250)
\`\`\`

Function \`checkout\` does not change when a new payment method appears — just add a class with method \`pay\`.

**Anti-pattern without polymorphism:**

\`\`\`python
def checkout(kind, amount):
    if kind == "cash":
        print(...)
    elif kind == "card":
        print(...)
    elif kind == "online":
        print(...)
\`\`\`

Every new method inflates \`if/elif\`. With polymorphism, extension is local — in the new class.`
      },
      {
        title: "Built-in polymorphism in Python",
        content: `You have already used polymorphism without calling it that!

\`\`\`python
print(len("text"))      # string length
print(len([1, 2, 3]))    # list length
print(len({"a": 1}))     # number of keys

print(3 + 4)             # number addition
print("Hello, " + "World")  # string concatenation
\`\`\`

One operator / one function — different behavior depending on type.

Same with \`for\`: any iterable object works in a loop.

\`\`\`python
for item in [1, 2, 3]:
    print(item)

for char in "hi":
    print(char)
\`\`\`

When you design your classes, ask: *“What shared method will make them interchangeable?”*`
      },
      {
        title: "Tips and typical scenarios",
        content: `**1. Align method names**  
If all “payers” have \`pay\`, not \`pay\`/\`do_pay\`/\`execute\`, polymorphism works naturally.

**2. Do not overuse \`isinstance\`**  
Sometimes a type check is needed, but often it is better to just call the method.

\`\`\`python
# More flexible:
obj.render()

# More rigid (sometimes justified):
if isinstance(obj, Button):
    obj.render()
\`\`\`

**3. Document the expected interface**  
Even without ABC, write in a docstring: “\`handler\` must have method \`handle(event)\`.”

**4. Test with different implementations**  
Check polymorphic code with several classes to catch missing methods.

Next lesson — **dataclasses**: how to describe data classes quickly with minimal boilerplate.`
      }
    ]
  },

  codeExamples: [
    {
      title: "One loop — different speak()",
      code: `class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Cow:
    def speak(self):
        return "Moo!"

for animal in [Dog(), Cat(), Cow()]:
    print(animal.speak())`,
      explanation: "The loop is the same; behavior depends on the concrete object."
    },
    {
      title: "Shape polymorphism",
      code: `class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14 * self.r * self.r

class Square:
    def __init__(self, a):
        self.a = a
    def area(self):
        return self.a * self.a

shapes = [Circle(2), Square(3)]
total = sum(s.area() for s in shapes)
print(total)`,
      explanation: "sum works with any objects that have area()."
    },
    {
      title: "Duck typing without a shared parent",
      code: `class FileExporter:
    def export(self):
        print("Export to file")

class ApiExporter:
    def export(self):
        print("Export via API")

def run_export(exporter):
    exporter.export()

run_export(FileExporter())
run_export(ApiExporter())`,
      explanation: "Having method export is enough — an official hierarchy is optional."
    },
    {
      title: "Extending without changing client code",
      code: `class NotifyEmail:
    def send(self, text):
        print(f"Email: {text}")

class NotifySMS:
    def send(self, text):
        print(f"SMS: {text}")

# New channel — old notify_all code stays unchanged
class NotifyPush:
    def send(self, text):
        print(f"Push: {text}")

def notify_all(channels, text):
    for ch in channels:
        ch.send(text)

notify_all([NotifyEmail(), NotifySMS(), NotifyPush()], "Lesson complete")`,
      explanation: "Added NotifyPush, and function notify_all stayed the same."
    }
  ],

  commonMistakes: [
    {
      mistake: "Different method names in “similar” classes",
      explanation: "If one class has speak() and another make_sound(), a shared loop breaks.",
      correctApproach: "Agree on one interface: all implementations with the same method name"
    },
    {
      mistake: "Instead of polymorphism — a long if/elif chain by type",
      explanation: "Every new type requires editing the central function.",
      correctApproach: "Move behavior into class methods and call them the same way"
    },
    {
      mistake: "Thinking polymorphism is only possible with inheritance",
      explanation: "In Python, duck typing allows polymorphism by presence of methods.",
      correctApproach: "Inheritance is a convenient way, but not the only one in Python"
    },
    {
      mistake: "Ignoring a missing method until runtime",
      explanation: "AttributeError appears only when the method is called.",
      correctApproach: "Cover polymorphic paths with tests or use ABC (later)"
    }
  ],

  summary: `In this lesson we studied polymorphism:

1. One interface — different object behavior
2. Inheritance + override — the classic path
3. Duck typing — polymorphism by behavior in Python
4. Collections of different objects are processed the same way
5. Fewer if/elif, more extensibility

Next — dataclasses for quickly creating data classes.`,

  practiceTask: {
    title: "Shape areas",
    description: "Compute areas of different shapes through a shared area() method",
    problemStatement: `Write a program that:
1. Declares a Circle class with __init__(self, r) and area(self) = 3.14 * r * r
2. Declares a Rectangle class with __init__(self, w, h) and area(self) = w * h
3. Declares a Square class with __init__(self, a) and area(self) = a * a
4. Reads three data blocks:
   - line "circle" and radius (float/int)
   - line "rect", width and height
   - line "square" and side
5. Creates the matching objects and for each prints:
   {Name}: {area}
   where names are: Circle, Rectangle, Square
   Print the area as-is (for circle with 3.14).

Input format:
circle
5
rect
4
3
square
6`,
    outputFormat: `Circle: 78.5
Rectangle: 12
Square: 36`,
    examples: [
      {
        input: `circle
5
rect
4
3
square
6`,
        output: `Circle: 78.5
Rectangle: 12
Square: 36`,
        explanation: "3.14*25=78.5; 4*3=12; 6*6=36"
      },
      {
        input: `circle
2
rect
10
2
square
3`,
        output: `Circle: 12.56
Rectangle: 20
Square: 9`,
        explanation: "3.14*4=12.56; 10*2=20; 3*3=9"
      },
      {
        input: `circle
1
rect
5
5
square
4`,
        output: `Circle: 3.14
Rectangle: 25
Square: 16`,
        explanation: "3.14*1=3.14; 5*5=25; 4*4=16"
      }
    ],
    solution: {
      code: `class Circle:
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14 * self.r * self.r

class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

class Square:
    def __init__(self, a):
        self.a = a

    def area(self):
        return self.a * self.a

input()  # circle
r = float(input())
input()  # rect
w = float(input())
h = float(input())
input()  # square
a = float(input())

shapes = [
    ("Circle", Circle(r)),
    ("Rectangle", Rectangle(w, h)),
    ("Square", Square(a)),
]

for name, shape in shapes:
    result = shape.area()
    if result == int(result):
        result = int(result)
    print(f"{name}: {result}")`,
      explanation: "All shapes have area(); the loop prints results polymorphically. Whole values print without .0."
    },
    hints: [
      "Use constant 3.14 for the circle",
      "Read labels circle/rect/square via input(), even if you do not check them",
      "For whole areas you can convert float → int when the value is whole",
      "The main point — call shape.area() the same way for all"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is polymorphism?",
        options: [
          "One interface (method) — different behavior in different classes",
          "Saving data to a file",
          "Deleting unused variables",
          "Compiling code to bytecode"
        ],
        correctAnswer: 0,
        explanation: "Polymorphism lets you call the same methods on different types with different results."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "In Python, polymorphism is possible even without a shared parent class.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, thanks to duck typing what matters is having the method, not the hierarchy."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass A:\n    def f(self):\n        return 1\nclass B:\n    def f(self):\n        return 2\nprint([x.f() for x in [A(), B()]])\n```",
        options: [
          "[1, 2]",
          "[1, 1]",
          "Error",
          "[2, 2]"
        ],
        correctAnswer: 0,
        explanation: "Both objects have f(), but return different values."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the duck typing principle describe?",
        options: [
          "An object’s behavior (methods) matters more than its official type",
          "All classes must inherit object manually",
          "Methods can only be called through super()",
          "Polymorphism is forbidden in Python"
        ],
        correctAnswer: 0,
        explanation: "If an object has the needed methods — you can use it."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Why is this code convenient to extend?\n\n```python\ndef process(items):\n    for item in items:\n        item.run()\n```",
        options: [
          "You can add a new class with method run() without changing process",
          "It only works with lists of numbers",
          "It forbids new classes",
          "It always calls only one parent method"
        ],
        correctAnswer: 0,
        explanation: "process depends only on having run() — classic polymorphism."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which example is already polymorphism in built-in Python?",
        options: [
          "len() works for both a string and a list",
          "The def keyword",
          "The assignment operator =",
          "The # comment"
        ],
        correctAnswer: 0,
        explanation: "len() is one interface for different types."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Long if/elif chains by object type are often a sign that polymorphism should be used.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, it is better to spread behavior across class methods."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is needed for duck typing between classes PaymentA and PaymentB?",
        options: [
          "The same required method (for example, pay) in both classes",
          "Mandatory inheritance from ABC",
          "The same number of attributes",
          "The file name payment.py"
        ],
        correctAnswer: 0,
        explanation: "Agreed behavior is enough — a shared method with the expected meaning."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
