/**
 * Lesson 04-3: Encapsulation and Access Modifiers
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_04_3 = {
  lessonId: "lesson-04-3",
  moduleId: "module-04",
  order: 3,
  title: "Encapsulation and Access Modifiers",

  learningObjectives: [
    "Explain the idea of encapsulation and why to hide internal details",
    "Use public, “protected” (_), and “private” (__) attributes",
    "Understand name mangling for double-underscore attributes",
    "Create controlled access with getter/setter methods",
    "Get familiar with the @property decorator"
  ],

  prerequisites: ["lesson-04-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is encapsulation?",
        content: `**Encapsulation** is an OOP principle where an object’s internal data is **hidden**, and only a safe “public” behavior is available from the outside.

Think of an ATM: you press buttons (public interface), but you do not reach into the cash-dispensing mechanism with your hands.

**Why is this needed?**

1. **Data protection** — prevent setting a negative price or age -5
2. **Flexibility** — you can change the internal implementation without breaking outside code
3. **Cleaner API** — users of the class see only what they need

\`\`\`python
# Without control — dangerous
class Account:
    def __init__(self, balance):
        self.balance = balance

acc = Account(100)
acc.balance = -1000000  # anyone can break the state
\`\`\`

With encapsulation we limit direct access and allow changes only through checked methods.`
      },
      {
        title: "Public, protected, and private in Python",
        content: `Python has **no real** access modifiers like Java (\`private\`, \`protected\`). There are **conventions** and a name-mangling mechanism.

**1. Public** — ordinary names (\`name\`, \`balance\`)
Accessible from everywhere.

**2. “Protected”** — one leading underscore (\`_balance\`)
A signal: “this is an internal detail; do not touch from outside.” Python does **not** block access.

\`\`\`python
class User:
    def __init__(self, name):
        self.name = name       # public
        self._id = 42          # “protected” by convention
\`\`\`

**3. “Private”** — two underscores (\`__balance\`)
Python rewrites the attribute name (**name mangling**): \`__balance\` becomes \`_ClassName__balance\`.

\`\`\`python
class Vault:
    def __init__(self, secret):
        self.__secret = secret

    def reveal(self):
        return self.__secret

v = Vault("key")
print(v.reveal())       # key
# print(v.__secret)     # AttributeError
print(v._Vault__secret) # key — technically available, but you should not do this
\`\`\`

| Notation | Meaning | “Protection” level |
|----------|---------|--------------------|
| \`value\` | public | open |
| \`_value\` | protected (convention) | weak |
| \`__value\` | private (mangling) | stronger, but not absolute |

Python follows the philosophy: *“we are all adults”* — conventions matter more than hard bans.`
      },
      {
        title: "Getter and setter methods",
        content: `A classic control approach is **getter** and **setter** methods.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.__price = 0
        self.set_price(price)

    def get_price(self):
        return self.__price

    def set_price(self, price):
        if price < 0:
            raise ValueError("Price cannot be negative")
        self.__price = price

p = Product("Headphones", 1500)
print(p.get_price())  # 1500
p.set_price(1800)
print(p.get_price())  # 1800
# p.set_price(-10)    # ValueError
\`\`\`

**Advantages:**

- Validation on write
- Ability to log changes
- Ability to compute values “on the fly”

**Downside of getter/setter style:** the code becomes verbose (\`get_x()\` / \`set_x()\`). In Python, \`@property\` is more common.`
      },
      {
        title: "The @property decorator",
        content: `**\`@property\`** lets you access a method like an attribute: \`obj.price\` instead of \`obj.get_price()\`.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value

p = Product("Monitor", 8000)
print(p.price)   # read via getter
p.price = 8500   # write via setter
print(p.price)
\`\`\`

**Read-only (no setter):**

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def area(self):
        return 3.14 * self._radius ** 2

c = Circle(5)
print(c.area)   # 78.5
# c.area = 10   # AttributeError — no setter
\`\`\`

\`@property\` is the idiomatic Python way to encapsulate: convenient syntax + access control.`
      },
      {
        title: "Practical example: temperature",
        content: `Store temperature internally in Celsius, and expose convenient properties outside:

\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius  # goes through the setter

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

t = Temperature(25)
print(t.celsius)      # 25
print(t.fahrenheit)   # 77.0
t.celsius = 30
print(t.fahrenheit)   # 86.0
\`\`\`

Users of the class do not need to know how data is stored — they work with a clean interface.

**SmartCode recommendations:**

1. Start with public attributes if validation is not needed
2. Add \`_\` / \`__\` and \`property\` when rules appear
3. Do not make everything “private” — hide only what is truly internal`
      }
    ]
  },

  codeExamples: [
    {
      title: "Private attribute and access method",
      code: `class Wallet:
    def __init__(self, money):
        self.__money = money

    def get_money(self):
        return self.__money

    def add(self, amount):
        if amount > 0:
            self.__money += amount

w = Wallet(100)
w.add(50)
print(w.get_money())  # 150`,
      explanation: "__money is hidden; change only through controlled methods."
    },
    {
      title: "Property with validation",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0 or value > 150:
            raise ValueError("Invalid age")
        self._age = value

p = Person("Oleg", 30)
print(p.age)
p.age = 31
print(p.age)`,
      explanation: "From outside, age looks like an attribute, but it goes through the setter check."
    },
    {
      title: "Read-only",
      code: `class Order:
    def __init__(self, items):
        self._items = list(items)

    @property
    def items(self):
        return tuple(self._items)

    @property
    def total_count(self):
        return len(self._items)

order = Order(["A", "B", "C"])
print(order.items)
print(order.total_count)`,
      explanation: "items and total_count are readable without directly breaking the internal list."
    },
    {
      title: "Protected by convention",
      code: `class Engine:
    def __init__(self, power):
        self._power = power  # internal detail

    def status(self):
        print(f"Power: {self._power} hp")

e = Engine(150)
e.status()
# Technically e._power is accessible,
# but by convention it is not changed from outside.`,
      explanation: "A single underscore is a signal to other developers."
    }
  ],

  commonMistakes: [
    {
      mistake: "Thinking __ is completely inaccessible",
      explanation: "Name mangling can be bypassed via _ClassName__attr. It is a convention plus friction, not a vault.",
      correctApproach: "Use __ to avoid accidental name collisions, not as absolute protection"
    },
    {
      mistake: "Making all attributes private without need",
      explanation: "Over-encapsulation makes code harder without real benefits.",
      correctApproach: "Hide only data that needs control or is internal implementation"
    },
    {
      mistake: "Forgetting a setter and being surprised by AttributeError",
      explanation: "If there is only @property without @x.setter, assignment is forbidden.",
      correctApproach: "Add @price.setter if writing should be allowed"
    },
    {
      mistake: "Storing in a property another public attribute with the same name",
      explanation: "Infinite recursion: self.price inside property price calls the property again.",
      correctApproach: "Store in self._price, and name the property price"
    }
  ],

  summary: `In this lesson we studied encapsulation:

1. Encapsulation hides internal details and protects state
2. _attr — “do not touch” by convention (protected)
3. __attr — name mangling (conditional private)
4. Getter/setter — classic access control
5. @property — the convenient Pythonic way

Next — inheritance: how to create new classes based on existing ones.`,

  practiceTask: {
    title: "Product with controlled price",
    description: "Implement a Product class with a private price and access methods",
    problemStatement: `Write a program that:
1. Declares a Product class
2. In __init__(self, name, price) stores name (publicly) and __price (privately)
3. Has methods:
   - get_price(self) — returns __price
   - set_price(self, price) — if price > 0, sets __price; otherwise leaves it unchanged
   - info(self) — prints:
     Product: {name}
     Price: {price}
4. Reads name, initial price, new price
5. Creates Product, prints info(), calls set_price(new_price), then info() again

Input format:
Laptop
25000
30000`,
    outputFormat: `Product: Laptop
Price: 25000
Product: Laptop
Price: 30000`,
    examples: [
      {
        input: `Laptop
25000
30000`,
        output: `Product: Laptop
Price: 25000
Product: Laptop
Price: 30000`,
        explanation: "Price updated from 25000 to 30000"
      },
      {
        input: `Mouse
500
-10`,
        output: `Product: Mouse
Price: 500
Product: Mouse
Price: 500`,
        explanation: "Negative price is ignored; remains 500"
      },
      {
        input: `Keyboard
1200
990`,
        output: `Product: Keyboard
Price: 1200
Product: Keyboard
Price: 990`,
        explanation: "Price reduced to 990"
      }
    ],
    solution: {
      code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.__price = price

    def get_price(self):
        return self.__price

    def set_price(self, price):
        if price > 0:
            self.__price = price

    def info(self):
        print(f"Product: {self.name}")
        print(f"Price: {self.__price}")

name = input().strip()
price = int(input())
new_price = int(input())

product = Product(name, price)
product.info()
product.set_price(new_price)
product.info()`,
      explanation: "Private __price is changed only through set_price with a price > 0 check."
    },
    hints: [
      "Store the price as self.__price",
      "In set_price check if price > 0",
      "info() should print two lines each time",
      "After set_price call info() again"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is encapsulation?",
        options: [
          "Hiding internal details and controlling access to data",
          "Creating child classes",
          "Calling one function many times",
          "Converting data types"
        ],
        correctAnswer: 0,
        explanation: "Encapsulation combines data with behavior and limits direct access to internal state."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does a leading underscore (_value) mean?",
        options: [
          "Convention: the attribute is internal (protected)",
          "The attribute is completely inaccessible",
          "The attribute is deleted automatically",
          "It is a syntax error"
        ],
        correctAnswer: 0,
        explanation: "_value is a signal to developers not to use the attribute from outside."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "In Python, attribute __secret truly cannot be read in any way.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 1,
        explanation: "False: via name mangling it is available as _ClassName__secret."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens?\n\n```python\nclass A:\n    def __init__(self):\n        self.__x = 1\n\nprint(A().__x)\n```",
        options: [
          "AttributeError",
          "1",
          "None",
          "SyntaxError"
        ],
        correctAnswer: 0,
        explanation: "External direct access to __x raises AttributeError because of mangling."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is @property needed?",
        options: [
          "To access a method like an attribute with optional validation",
          "To create a new class",
          "To delete an object",
          "To import a module"
        ],
        correctAnswer: 0,
        explanation: "@property gives convenient syntax obj.x with getter/setter logic."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass P:\n    def __init__(self, v):\n        self._v = v\n    @property\n    def v(self):\n        return self._v\n\nprint(P(7).v)\n```",
        options: [
          "7",
          "None",
          "Error",
          "_v"
        ],
        correctAnswer: 0,
        explanation: "Accessing .v calls the property getter and returns 7."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A setter lets you validate a value before storing it on the object.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, setters are often written exactly for validation."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How does Python transform the name __value inside class Demo?",
        options: [
          "_Demo__value",
          "__value__",
          "Demo.value",
          "private_value"
        ],
        correctAnswer: 0,
        explanation: "Name mangling adds _ClassName before the __attribute."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
