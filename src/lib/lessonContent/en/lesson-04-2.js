/**
 * Lesson 04-2: Class Attributes and Methods
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_04_2 = {
  lessonId: "lesson-04-2",
  moduleId: "module-04",
  order: 2,
  title: "Class Attributes and Methods",

  learningObjectives: [
    "Distinguish instance attributes from class attributes",
    "Create and call instance methods",
    "Understand when a class attribute is shared by all objects",
    "Get a brief introduction to @classmethod and @staticmethod",
    "Use methods to change an object’s state"
  ],

  prerequisites: ["lesson-04-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Instance attributes vs class attributes",
        content: `In the previous lesson we stored data with \`self.name\` - these are **instance attributes**. They belong to a **specific** object.

**Class attributes** are declared directly in the class body (outside \`__init__\`). They are **shared** by all instances.

\`\`\`python
class Dog:
    species = "Canis familiaris"  # class attribute

    def __init__(self, name):
        self.name = name  # instance attribute

dog1 = Dog("Rex")
dog2 = Dog("Lucky")

print(dog1.name)      # Rex
print(dog2.name)      # Lucky
print(dog1.species)   # Canis familiaris
print(dog2.species)   # Canis familiaris
print(Dog.species)    # Canis familiaris
\`\`\`

**Comparison:**

| | Instance attribute | Class attribute |
|--|-------------------|-----------------|
| Where declared | in \`__init__\` via \`self\` | in the class body |
| Belongs to | one object | all objects of the class |
| Example | \`self.balance\` | \`Bank.bank_name\` |

**Watch out for mutable types as class attributes!**

\`\`\`python
class Team:
    members = []  # DANGEROUS - shared list!

    def __init__(self, name):
        self.name = name

    def add(self, person):
        self.members.append(person)

t1 = Team("A")
t2 = Team("B")
t1.add("Olya")
print(t2.members)  # ['Olya'] - surprise!
\`\`\`

Better keep lists as **instance attributes**: \`self.members = []\` in \`__init__\`.`
      },
      {
        title: "Instance methods",
        content: `An **instance method** is a regular class method with first parameter \`self\`. It works with a specific object’s data.

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False

    def get_balance(self):
        return self.balance

account = BankAccount("Maria", 1000)
account.deposit(500)
account.withdraw(200)
print(account.get_balance())  # 1300
\`\`\`

**Good practices:**

1. Name methods with verbs: \`deposit\`, \`calculate_total\`, \`reset\`
2. One method - one clear action
3. Change state through methods, not “from the outside at random” (though Python allows it)

\`\`\`python
# Possible, but worse for control:
account.balance = -100  # negative balance?

# Better through a method with checks:
account.withdraw(100)
\`\`\`

Methods can call other methods on the same object:

\`\`\`python
class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def is_square(self):
        return self.w == self.h

    def summary(self):
        kind = "square" if self.is_square() else "rectangle"
        return f"{kind}, area={self.area()}"
\`\`\``
      },
      {
        title: "Class attributes in practice",
        content: `Class attributes are handy for:

1. **Constants / shared settings**
2. **Counters of created objects**
3. **Default values shared by everyone**

\`\`\`python
class Student:
    school = "SmartCode Academy"
    count = 0

    def __init__(self, name):
        self.name = name
        Student.count += 1

    def info(self):
        print(f"{self.name} studies at {Student.school}")

s1 = Student("Ivan")
s2 = Student("Olya")
print(Student.count)  # 2
s1.info()
\`\`\`

**Reading vs overwriting:**

\`\`\`python
class Demo:
    value = 10

d = Demo()
print(d.value)   # 10 - reads the class attribute
d.value = 99     # creates an INSTANCE attribute!
print(Demo.value)  # 10 - class attribute unchanged
print(d.value)     # 99
\`\`\`

To change the class attribute itself, write through the class name: \`Demo.value = 20\`.`
      },
      {
        title: "Briefly: @classmethod and @staticmethod",
        content: `Besides instance methods, Python has two more types. At this stage it is enough to **understand the idea**; the main focus stays on instance methods.

**\`@classmethod\`** - receives the class (\`cls\`), not an instance. Often used as alternative constructors.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, year):
        age = 2026 - year
        return cls(name, age)

p = Person.from_birth_year("Elena", 2000)
print(p.age)  # 26
\`\`\`

**\`@staticmethod\`** - a regular function inside a class **without** \`self\` or \`cls\`. Logically related to the class, but does not use its state.

\`\`\`python
class MathHelper:
    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathHelper.is_even(4))  # True
\`\`\`

**When to use which:**

| Type | First argument | When |
|------|----------------|------|
| Instance method | \`self\` | working with object data (main case) |
| \`@classmethod\` | \`cls\` | factories / alternative constructors |
| \`@staticmethod\` | none | helper logic without state |

In practice **90%** of your early code will be instance methods.`
      },
      {
        title: "Example: a full class with different attributes",
        content: `Let’s put it together with an online store example:

\`\`\`python
class Product:
    store_name = "SmartShop"  # class attribute
    tax_rate = 0.2

    def __init__(self, title, price):
        self.title = title
        self.price = price

    def price_with_tax(self):
        return self.price * (1 + Product.tax_rate)

    def label(self):
        return f"[{Product.store_name}] {self.title}: {self.price_with_tax():.2f} USD"

p1 = Product("Keyboard", 1000)
p2 = Product("Mouse", 500)

print(p1.label())
print(p2.label())
print(Product.store_name)
\`\`\`

Here:
- \`store_name\`, \`tax_rate\` - shared by all products
- \`title\`, \`price\` - unique for each
- \`price_with_tax\`, \`label\` - instance methods

This split makes the code cleaner and clearer.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Class and instance attributes",
      code: `class Car:
    wheels = 4  # class attribute

    def __init__(self, brand, color):
        self.brand = brand
        self.color = color

    def describe(self):
        print(f"{self.color} {self.brand}, wheels: {Car.wheels}")

car1 = Car("Toyota", "Red")
car2 = Car("BMW", "Black")
car1.describe()
car2.describe()`,
      explanation: "wheels is shared by all cars; brand and color are unique."
    },
    {
      title: "Methods change state",
      code: `class Counter:
    def __init__(self):
        self.value = 0

    def inc(self, step=1):
        self.value += step

    def reset(self):
        self.value = 0

c = Counter()
c.inc()
c.inc(5)
print(c.value)  # 6
c.reset()
print(c.value)  # 0`,
      explanation: "Instance methods encapsulate changes to internal state."
    },
    {
      title: "Object counter via a class attribute",
      code: `class User:
    total = 0

    def __init__(self, username):
        self.username = username
        User.total += 1

u1 = User("anna")
u2 = User("bohdan")
u3 = User("katya")
print(User.total)  # 3
print(u1.username)`,
      explanation: "The class attribute total increases each time a User is created."
    },
    {
      title: "classmethod as an alternative constructor",
      code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        c = (f - 32) * 5 / 9
        return cls(c)

    def show(self):
        print(f"{self.celsius:.1f} °C")

t = Temperature.from_fahrenheit(68)
t.show()`,
      explanation: "from_fahrenheit creates a Temperature by working with the class via cls."
    }
  ],

  commonMistakes: [
    {
      mistake: "Shared list as a class attribute",
      explanation: "A mutable object in the class body is shared by all instances.",
      correctApproach: `class Team:
    def __init__(self, name):
        self.name = name
        self.members = []  # separate list for each object`
    },
    {
      mistake: "Confusing changing a class attribute through an instance",
      explanation: "Assignment d.value = x creates an instance attribute; it does not change the class one.",
      correctApproach: `Demo.value = 20  # change the class attribute
# or
d = Demo()
# reading d.value is OK; to change the class one - use Demo.value`
    },
    {
      mistake: "Calling an instance method without an object",
      explanation: "A method with self needs an instance.",
      correctApproach: `account = BankAccount("Olya", 100)
account.deposit(50)  # correct`
    },
    {
      mistake: "Overusing @staticmethod instead of ordinary functions",
      explanation: "If the logic is not related to the class, prefer a regular module function.",
      correctApproach: "Use staticmethod only when the logic conceptually belongs to the class but does not need state"
    }
  ],

  summary: `In this lesson we learned:

1. Instance attributes - unique data for each object
2. Class attributes - shared by all instances
3. Instance methods - the main way to work with state
4. Be careful with mutable class attributes (lists, dicts)
5. Briefly: @classmethod and @staticmethod

Next - encapsulation and controlling access to data.`,

  practiceTask: {
    title: "Bank account",
    description: "Implement a BankAccount class with deposit and withdraw methods",
    problemStatement: `Write a program that:
1. Declares a BankAccount class with class attribute bank_name = "SmartBank"
2. Constructor __init__(self, owner, balance) stores the owner and balance
3. Methods:
   - deposit(self, amount) - adds amount to the balance
   - withdraw(self, amount) - subtracts amount from the balance (no checks for this task)
   - status(self) - prints: {bank_name} | {owner}: {balance}
4. Reads from stdin: owner, starting balance, deposit amount, withdraw amount
5. Prints status() after creation, after deposit, and after withdraw

Input format:
Maria
1000
500
200`,
    outputFormat: `SmartBank | Maria: 1000
SmartBank | Maria: 1500
SmartBank | Maria: 1300`,
    examples: [
      {
        input: `Maria
1000
500
200`,
        output: `SmartBank | Maria: 1000
SmartBank | Maria: 1500
SmartBank | Maria: 1300`,
        explanation: "1000 → +500 = 1500 → -200 = 1300"
      },
      {
        input: `Igor
200
50
30`,
        output: `SmartBank | Igor: 200
SmartBank | Igor: 250
SmartBank | Igor: 220`,
        explanation: "200 → 250 → 220"
      },
      {
        input: `Olya
0
1000
100`,
        output: `SmartBank | Olya: 0
SmartBank | Olya: 1000
SmartBank | Olya: 900`,
        explanation: "Start at zero, deposit 1000, withdraw 100"
      }
    ],
    solution: {
      code: `class BankAccount:
    bank_name = "SmartBank"

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount

    def status(self):
        print(f"{BankAccount.bank_name} | {self.owner}: {self.balance}")

owner = input().strip()
balance = int(input())
deposit_amount = int(input())
withdraw_amount = int(input())

account = BankAccount(owner, balance)
account.status()
account.deposit(deposit_amount)
account.status()
account.withdraw(withdraw_amount)
account.status()`,
      explanation: "We use the class attribute bank_name and instance methods to change the balance."
    },
    hints: [
      "Declare bank_name in the class body, not in __init__",
      "In status use BankAccount.bank_name or self.bank_name",
      "Read 4 lines: owner, balance, deposit, withdraw",
      "Call status() three times at the right moments"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should per-object state like a student's name usually be set?",
        options: [
          "In __init__ with self.name = ...",
          "Only as a bare name outside the class body",
          "Only inside a @staticmethod helper",
          "Automatically when the module is imported"
        ],
        correctAnswer: 0,
        explanation: "Instance data is assigned on self in __init__. Module-level names and staticmethods do not create per-object attributes by themselves."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A class attribute is shared by all instances of that class.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, a class attribute belongs to the class and is available to all objects."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nclass A:\n    x = 5\n\na = A()\nprint(a.x)\nA.x = 9\nprint(a.x)\n```",
        options: [
          "5, then 9",
          "5, then 5",
          "Error",
          "9, then 9"
        ],
        correctAnswer: 0,
        explanation: "First it reads 5; after changing A.x everyone sees 9 (if there is no instance attribute)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is an instance method?",
        options: [
          "A method whose first arg is self for one object",
          "A plain function defined outside any class",
          "A method that must take zero parameters",
          "Another name for the @property decorator"
        ],
        correctAnswer: 0,
        explanation: "Instance methods take self and use that object's attributes. They are not free functions, zero-arg-only methods, or @property itself."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is wrong?\n\n```python\nclass Bag:\n    items = []\n    def add(self, x):\n        self.items.append(x)\n```",
        options: [
          "Class-level [] is shared by every Bag instance",
          "Lists never support the append method",
          "@staticmethod is required on every method",
          "The pattern is fine — no shared-state bug"
        ],
        correctAnswer: 0,
        explanation: "items = [] on the class is one shared list. Prefer self.items = [] in __init__. append works; staticmethod is unrelated; there is a real problem."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is @classmethod often used for?",
        options: [
          "As an alternative constructor (object factory)",
          "To print text to the screen",
          "To delete a class",
          "Instead of the class keyword"
        ],
        correctAnswer: 0,
        explanation: "classmethod is convenient for creating objects another way (for example, from_string)."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "@staticmethod receives self as its first argument.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 1,
        explanation: "False: staticmethod receives neither self nor cls."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
