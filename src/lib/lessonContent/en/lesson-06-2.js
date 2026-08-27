/**
 * Lesson 06-2: Creating your own decorators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_06_2 = {
  lessonId: "lesson-06-2",
  moduleId: "module-06",
  order: 2,
  title: "Creating your own decorators",

  learningObjectives: [
    "Preserve function metadata with functools.wraps",
    "Write universal wrappers with *args and **kwargs",
    "Create decorators with arguments (decorator factories)",
    "Understand the stacking order of multiple decorators"
  ],

  prerequisites: ["lesson-06-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "The metadata loss problem",
        content: `After wrapping, a function "forgets" its name and docstring - \`wrapper\` metadata appears instead.

\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@log_calls
def greet(name):
    """Greets the user"""
    return f"Hello, {name}!"

print(greet.__name__)  # wrapper  ← expected greet
print(greet.__doc__)   # None     ← docstring is gone
\`\`\`

This hurts debugging, auto-documentation, and tools like \`help()\`.`
      },
      {
        title: "functools.wraps",
        content: `\`@wraps(func)\` copies the original function's metadata onto the wrapper.

\`\`\`python
from functools import wraps

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def greet(name):
    """Greets the user"""
    return f"Hello, {name}!"

print(greet.__name__)  # greet
print(greet.__doc__)   # Greets the user
\`\`\`

**Course rule:** in your own decorators, almost always put \`@wraps(func)\` on \`wrapper\`.

\`wraps\` also preserves \`__module__\`, \`__annotations__\`, and adds \`__wrapped__\` - a reference to the original.`
      },
      {
        title: "*args and **kwargs in decorators",
        content: `A universal wrapper accepts any arguments and forwards them:

\`\`\`python
from functools import wraps

def debug(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"args={args}, kwargs={kwargs}")
        return func(*args, **kwargs)
    return wrapper

@debug
def add(a, b, scale=1):
    return (a + b) * scale

print(add(2, 3))           # args=(2, 3), kwargs={}
print(add(2, 3, scale=10)) # args=(2, 3), kwargs={'scale': 10}
\`\`\`

**Explanation:**
- \`*args\` - a tuple of positional arguments
- \`**kwargs\` - a dictionary of keyword arguments
- \`func(*args, **kwargs)\` - "unpacks" them back into a call

Without this, the decorator would work only with one fixed signature.`
      },
      {
        title: "Decorators with arguments (factories)",
        content: `Sometimes a decorator needs parameters: \`@repeat(3)\`, \`@retry(max_attempts=5)\`. Then you need a **factory**: a function that takes parameters and returns the real decorator.

**Three nesting levels:**

1. Outer function - takes parameters (\`times\`)
2. Middle - takes \`func\` (this is the decorator)
3. Inner \`wrapper\` - runs on every call

\`\`\`python
from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last = None
            for _ in range(times):
                last = func(*args, **kwargs)
            return last
        return wrapper
    return decorator

@repeat(3)
def beep():
    print("Beep!")

beep()
# Beep!
# Beep!
# Beep!
\`\`\`

**Equivalent without @:**

\`\`\`python
beep = repeat(3)(beep)
#         ↑        ↑
#    factory   decorator
\`\`\`

First \`repeat(3)\` returns \`decorator\`, then \`decorator(beep)\` returns \`wrapper\`.`
      },
      {
        title: "Stacking decorators",
        content: `Multiple \`@\` lines are applied **bottom-up** (from the function upward), and at call time they run **top-down**.

\`\`\`python
from functools import wraps

def bold(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"**{func(*args, **kwargs)}**"
    return wrapper

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@bold
@shout
def greet(name):
    return f"hello, {name}"

print(greet("olga"))  # **HELLO, OLGA**
\`\`\`

**Application order (at definition):**
1. First \`shout\` (closest to \`def\`)
2. Then \`bold\`

That is: \`greet = bold(shout(greet))\`.

**Call order:** outer \`bold\` first, then \`shout\` inside it, then the original.`
      },
      {
        title: "A practical factory template",
        content: `A ready template for a parameterized decorator:

\`\`\`python
from functools import wraps

def my_decorator(option=True):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if option:
                print(f"Before {func.__name__}")
            result = func(*args, **kwargs)
            if option:
                print(f"After {func.__name__}")
            return result
        return wrapper
    return decorator

@my_decorator(option=True)
def work():
    print("Work")

work()
\`\`\`

**Tips:**
- Always use \`@wraps(func)\`
- Always \`return\` the result of \`func\`
- Document the factory parameters
- Do not mix parameter logic and \`wrapper\` logic unnecessarily - keep the levels clear`
      }
    ]
  },

  codeExamples: [
    {
      title: "wraps preserves the name",
      code: `from functools import wraps

def trace(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@trace
def compute(x):
    """Computes the square"""
    return x * x

print(compute.__name__)
print(compute.__doc__)`,
      explanation: "Without @wraps the name would be wrapper; with wraps it is compute."
    },
    {
      title: "The repeat factory",
      code: `from functools import wraps

def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(times):
                print(f"Attempt {i + 1}")
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(2)
def hello(name):
    print(f"Hello, {name}!")

hello("Taras")`,
      explanation: "repeat(2) returns a decorator; @repeat(2) applies it to hello."
    },
    {
      title: "Stacking shout and add_bang",
      code: `from functools import wraps

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

def add_bang(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) + "!"
    return wrapper

@add_bang
@shout
def echo(text):
    return text

print(echo("python"))  # PYTHON!`,
      explanation: "First shout uppercases, then add_bang appends '!'"
    },
    {
      title: "Decorator with a named parameter",
      code: `from functools import wraps

def prefix(text):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(text)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@prefix("[INFO]")
def report(msg):
    print(msg)

report("Server started")`,
      explanation: "The prefix factory takes a string and returns a logging decorator."
    }
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to call the factory: writing @repeat instead of @repeat(3)",
      explanation: "Without parentheses Python passes the function as times, not as func - the structure breaks.",
      correctApproach: "For a parameterized decorator always write @repeat(3) or @repeat(times=3)"
    },
    {
      mistake: "Skipping @wraps(func)",
      explanation: "Metadata (__name__, __doc__) will point at wrapper.",
      correctApproach: "Import wraps and put @wraps(func) above def wrapper"
    },
    {
      mistake: "Misunderstanding stacking order",
      explanation: "People think the top @ is applied first at definition time.",
      correctApproach: "Remember: definition bottom-up, call top-down. f = outer(inner(f))"
    },
    {
      mistake: "Returning decorator instead of wrapper from the middle level",
      explanation: "The factory must return decorator, decorator must return wrapper, wrapper must return func's result.",
      correctApproach: "Check three returns: return wrapper / return decorator / return result"
    }
  ],

  summary: `In this lesson we learned how to build reliable custom decorators:

1. functools.wraps - preserves name, docstring, and other metadata
2. *args/**kwargs - universal argument forwarding
3. Decorator factories - three levels for parameters like @repeat(3)
4. Stacking - multiple @ lines apply bottom-up
5. Template - wraps + wrapper + always return the result

Next we will cover @property, @staticmethod, @classmethod, and class decorators.`,

  practiceTask: {
    title: "Stack of shout and add_bang decorators",
    description: "Create two decorators with wraps and apply them together",
    problemStatement: `Create two decorators with \`functools.wraps\`:

1. **shout** - returns the function result in UPPERCASE
2. **add_bang** - appends \`!\` to the function result

Apply them like this:
\`\`\`python
@add_bang
@shout
def echo(text):
    return text
\`\`\`

Read a string from stdin and print \`echo(text)\`.

Input format:
python`,
    outputFormat: `PYTHON!`,
    examples: [
      {
        input: `python`,
        output: `PYTHON!`,
        explanation: "First shout → PYTHON, then add_bang → PYTHON!"
      },
      {
        input: `Hello`,
        output: `HELLO!`,
        explanation: "Case is normalized, then an exclamation mark is added"
      },
      {
        input: `SmartCode`,
        output: `SMARTCODE!`,
        explanation: "Check with mixed case"
      }
    ],
    solution: {
      code: `from functools import wraps

def shout(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

def add_bang(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) + "!"
    return wrapper

@add_bang
@shout
def echo(text):
    return text

text = input().strip()
print(echo(text))`,
      explanation: "echo = add_bang(shout(echo)): first upper, then '!'. wraps keeps the name echo."
    },
    hints: [
      "Import wraps: from functools import wraps",
      "Order: @add_bang on top, @shout closer to def",
      "shout should call .upper() on the result",
      "add_bang appends the string '!' to the result"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why do we need functools.wraps?",
        options: [
          "To speed up the function call",
          "To preserve the original function's metadata on the wrapper",
          "To forbid *args",
          "To automatically cache the result"
        ],
        correctAnswer: 1,
        explanation: "@wraps(func) copies __name__, __doc__, and other attributes onto wrapper."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is equivalent to @repeat(3) above def f(): ...?",
        options: [
          "f = repeat(f)(3)",
          "f = repeat(3)(f)",
          "f = repeat(3, f)",
          "f = repeat()(3)(f)"
        ],
        correctAnswer: 1,
        explanation: "First the factory repeat(3) returns a decorator, then it is applied to f."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "When stacking @a @b def f(): we get f = a(b(f)).",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. The lower decorator is applied first, the upper one second."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How many function levels are usually needed for a parameterized decorator?",
        options: [
          "One",
          "Two",
          "Three",
          "Four"
        ],
        correctAnswer: 2,
        explanation: "Factory (parameters) → decorator (func) → wrapper (call) - three levels."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this print?\n\n@add_bang\n@shout\ndef echo(t):\n    return t\n\n# shout → upper, add_bang → +'!'\nprint(echo('hi'))",
        options: [
          "HI!",
          "!HI",
          "hi!",
          "Hi!"
        ],
        correctAnswer: 0,
        explanation: "First shout makes 'HI', then add_bang adds '!' → 'HI!'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens if you write @repeat instead of @repeat(3) for a factory?",
        options: [
          "It works like @repeat(1)",
          "The function itself becomes times - the decorator breaks",
          "Python ignores the decorator",
          "times=0 is substituted automatically"
        ],
        correctAnswer: 1,
        explanation: "Without calling the factory, the function lands in the times parameter and the three-level structure collapses."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "*args in a wrapper is a dictionary of keyword arguments.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. *args is a tuple of positional args; **kwargs is the keyword dictionary."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which import is needed for @wraps?",
        options: [
          "from functools import wraps",
          "from typing import wraps",
          "import wraps",
          "from decorators import wraps"
        ],
        correctAnswer: 0,
        explanation: "wraps lives in the standard library: from functools import wraps."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
