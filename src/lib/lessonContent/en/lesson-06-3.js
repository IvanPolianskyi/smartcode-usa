/**
 * Lesson 06-3: Class and method decorators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_06_3 = {
  lessonId: "lesson-06-3",
  moduleId: "module-06",
  order: 3,
  title: "Class and method decorators",

  learningObjectives: [
    "Use @property for controlled attribute access",
    "Distinguish @staticmethod and @classmethod",
    "Apply custom decorators to class methods",
    "Understand the idea of class decorators"
  ],

  prerequisites: ["lesson-06-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Built-in method decorators",
        content: `In Python classes you often see three built-in decorators:

1. **@property** — lets you access a method like an attribute (\`obj.name\` instead of \`obj.name()\`)
2. **@staticmethod** — a method without \`self\` or \`cls\`, logically tied to the class
3. **@classmethod** — a method that receives the class (\`cls\`) instead of an instance

\`\`\`python
class Demo:
    @property
    def label(self):
        return "demo"

    @staticmethod
    def ping():
        return "pong"

    @classmethod
    def create(cls):
        return cls()

d = Demo()
print(d.label)       # demo  (no parentheses!)
print(Demo.ping())   # pong
print(Demo.create()) # <Demo object ...>
\`\`\`

All three are ordinary decorators — just ones already defined by the language.`
      },
      {
        title: "@property: getters and setters",
        content: `\`@property\` turns a method into a read-only attribute (or one with controlled writes).

\`\`\`python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

    @property
    def is_adult(self):
        return self._age >= 18

p = Person("Olga", 20)
print(p.name)       # Olga
print(p.is_adult)   # True
p.age = 21          # via setter
\`\`\`

**Why use it:**
- Hide an internal field (\`_age\`)
- Add validation on change
- Compute a derived value (\`is_adult\`) without call parentheses`
      },
      {
        title: "@staticmethod vs @classmethod",
        content: `**@staticmethod** — an ordinary function in the class namespace. It receives neither the instance nor the class.

\`\`\`python
class MathUtils:
    @staticmethod
    def clamp(value, low, high):
        return max(low, min(high, value))

print(MathUtils.clamp(15, 0, 10))  # 10
\`\`\`

**@classmethod** — first argument is \`cls\` (the class itself). Convenient for alternative constructors.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, data):
        name, age = data.split(",")
        return cls(name.strip(), int(age.strip()))

p = Person.from_string("Taras, 17")
print(p.name, p.age)  # Taras 17
\`\`\`

**When to use which:**
- \`staticmethod\` — a utility that needs no class/instance state
- \`classmethod\` — factories, working with \`cls\`, inheritable alternative constructors`
      },
      {
        title: "Custom decorators for methods",
        content: `A custom decorator works with methods the same way as with functions. Remember: the first method argument is \`self\`.

\`\`\`python
from functools import wraps

def log_method(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        print(f"{self.__class__.__name__}.{func.__name__}")
        return func(self, *args, **kwargs)
    return wrapper

class Counter:
    def __init__(self):
        self.value = 0

    @log_method
    def inc(self):
        self.value += 1
        return self.value

c = Counter()
print(c.inc())
# Counter.inc
# 1
\`\`\`

You can keep \`*args, **kwargs\` without an explicit \`self\` — then \`self\` simply lands in \`args[0]\`. Explicit \`self\` is more readable for instance methods.`
      },
      {
        title: "Class decorators (briefly)",
        content: `A class decorator takes a class and returns a class (the same one or a new one).

\`\`\`python
def add_repr(cls):
    def __repr__(self):
        attrs = ", ".join(f"{k}={v!r}" for k, v in self.__dict__.items())
        return f"{cls.__name__}({attrs})"
    cls.__repr__ = __repr__
    return cls

@add_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

print(Point(1, 2))  # Point(x=1, y=2)
\`\`\`

**Idea:** add methods, register the class, wrap all methods, and so on — without editing the class body by hand.

Class decorators are less common for beginners than \`@property\` / \`@classmethod\`, but the concept is the same: \`Point = add_repr(Point)\`.`
      },
      {
        title: "Combining property with class logic",
        content: `A typical teaching example is a model with computed properties:

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

    @classmethod
    def square(cls, side):
        return cls(side, side)

    @staticmethod
    def is_valid(width, height):
        return width > 0 and height > 0

r = Rectangle.square(4)
print(r.area)         # 16
print(r.perimeter)    # 16
print(Rectangle.is_valid(4, 4))  # True
\`\`\`

Here you can see the difference:
- \`area\` — like an attribute
- \`square\` — an alternative constructor via \`cls\`
- \`is_valid\` — a utility without \`self\``
      }
    ]
  },

  codeExamples: [
    {
      title: "property for is_adult",
      code: `class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @property
    def is_adult(self):
        return self._age >= 18

p = Person("Iryna", 19)
print(p.name, p.is_adult)`,
      explanation: "is_adult is computed when accessed as an attribute, without parentheses."
    },
    {
      title: "classmethod as a constructor",
      code: `class User:
    def __init__(self, login):
        self.login = login

    @classmethod
    def guest(cls):
        return cls("guest")

u = User.guest()
print(u.login)  # guest`,
      explanation: "classmethod receives cls and creates an instance in an alternative way."
    },
    {
      title: "staticmethod utility",
      code: `class TextTools:
    @staticmethod
    def normalize(s):
        return s.strip().lower()

print(TextTools.normalize("  Hello "))  # hello`,
      explanation: "staticmethod does not need self — it is a function in the class namespace."
    },
    {
      title: "Class decorator add_repr",
      code: `def add_repr(cls):
    def __repr__(self):
        return f"{cls.__name__}(**{self.__dict__})"
    cls.__repr__ = __repr__
    return cls

@add_repr
class Box:
    def __init__(self, size):
        self.size = size

print(Box(10))`,
      explanation: "The class decorator adds __repr__ and returns the modified class."
    }
  ],

  commonMistakes: [
    {
      mistake: "Calling a property with parentheses: p.is_adult()",
      explanation: "A property is already an attribute; parentheses cause TypeError (bool is not callable).",
      correctApproach: "Write p.is_adult without parentheses"
    },
    {
      mistake: "Declaring @staticmethod with a self parameter",
      explanation: "staticmethod does not receive an instance — self becomes an ordinary required argument.",
      correctApproach: "Do not add self/cls for staticmethod; keep self for instance methods"
    },
    {
      mistake: "Confusing classmethod and staticmethod",
      explanation: "classmethod is needed when you create an instance via cls or read class attributes.",
      correctApproach: "Alternative constructor → @classmethod; pure utility → @staticmethod"
    },
    {
      mistake: "Forgetting return cls in a class decorator",
      explanation: "Without return, the class name becomes None after the decorator is applied.",
      correctApproach: "Always return the class: return cls"
    }
  ],

  summary: `In this lesson we looked at decorators in the context of classes:

1. @property — methods as attributes, getters/setters, computed fields
2. @staticmethod — utilities without self/cls
3. @classmethod — working with cls, alternative constructors
4. Custom method decorators — the same wrapping, often with explicit self
5. Class decorators — Class = decorator(Class), for example adding __repr__

In the next (practice) lesson we will reinforce everything on harder tasks: retry, cache, combining decorators.`,

  practiceTask: {
    title: "Person class with @property",
    description: "Create a class with name, age, and is_adult properties",
    problemStatement: `Create a **Person** class with:

1. \`__init__(self, name, age)\` — stores \`_name\` and \`_age\`
2. \`@property name\` — returns the name
3. \`@property age\` — returns the age
4. \`@property is_adult\` — \`True\` if age ≥ 18, otherwise \`False\`

Read a name and age from stdin (two lines). Create a \`Person\` and print three lines:

\`\`\`
Name: <name>
Age: <age>
Adult: <True|False>
\`\`\`

Input format:
Olga
20`,
    outputFormat: `Name: Olga
Age: 20
Adult: True`,
    examples: [
      {
        input: `Olga
20`,
        output: `Name: Olga
Age: 20
Adult: True`,
        explanation: "Age 20 ≥ 18, so is_adult = True"
      },
      {
        input: `Taras
17`,
        output: `Name: Taras
Age: 17
Adult: False`,
        explanation: "Age 17 < 18, so is_adult = False"
      },
      {
        input: `Maria
18`,
        output: `Name: Maria
Age: 18
Adult: True`,
        explanation: "Boundary: exactly 18 is considered an adult"
      }
    ],
    solution: {
      code: `class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @property
    def is_adult(self):
        return self._age >= 18

name = input().strip()
age = int(input().strip())
person = Person(name, age)
print(f"Name: {person.name}")
print(f"Age: {person.age}")
print(f"Adult: {person.is_adult}")`,
      explanation: "Three @property attributes give access without parentheses. is_adult is computed as _age >= 18."
    },
    hints: [
      "Store fields as _name and _age",
      "Access properties without parentheses: person.name",
      "is_adult is return self._age >= 18",
      "Read age with int(input().strip())"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you correctly access an @property named is_adult?",
        options: [
          "obj.is_adult()",
          "obj.is_adult",
          "obj.@is_adult",
          "is_adult(obj)"
        ],
        correctAnswer: 1,
        explanation: "A property is used like an attribute — without parentheses."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "@classmethod receives the instance as the first argument self.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. @classmethod receives the class as the first argument cls."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is @classmethod convenient for?",
        options: [
          "Only for speeding up code",
          "For alternative constructors via cls",
          "Only for private fields",
          "As a replacement for import"
        ],
        correctAnswer: 1,
        explanation: "classmethod is often used as a factory: cls(...)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does Person('Anya', 16).is_adult return if is_adult = age >= 18?",
        options: [
          "True",
          "False",
          "16",
          "None"
        ],
        correctAnswer: 1,
        explanation: "16 < 18, so the property returns False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How does @staticmethod differ from a normal method?",
        options: [
          "It is always faster",
          "It does not automatically receive self or cls",
          "Only one can exist in a class",
          "It cannot be called through the class"
        ],
        correctAnswer: 1,
        explanation: "staticmethod is a function in the class namespace with no binding to instance or class."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A class decorator takes a class and must return a class.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Otherwise the class name after @decorator becomes None or another value."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Which form is equivalent to @add_repr above class Point: ...?",
        options: [
          "Point = add_repr(Point)",
          "Point = add_repr()",
          "add_repr = Point(add_repr)",
          "Point(add_repr)"
        ],
        correctAnswer: 0,
        explanation: "@add_repr on a class means Point = add_repr(Point)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you add a setter to a property named age?",
        options: [
          "@age.setter above the age method",
          "@property.setter(age)",
          "@staticmethod age",
          "@classmethod age"
        ],
        correctAnswer: 0,
        explanation: "After @property def age you use @age.setter def age(self, value)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
