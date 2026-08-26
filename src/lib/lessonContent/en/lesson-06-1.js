/**
 * Lesson 06-1: Introduction to decorators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_06_1 = {
  lessonId: "lesson-06-1",
  moduleId: "module-06",
  order: 1,
  title: "Introduction to decorators",

  learningObjectives: [
    "Understand functions as first-class objects",
    "Explain the idea of wrapping a function",
    "Use the @decorator syntax and manual assignment",
    "Create simple decorators for logging and timing"
  ],

  prerequisites: ["lesson-05-5"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Functions as first-class objects",
        content: `In Python, functions are ordinary objects. You can pass them as arguments, store them in variables, and return them from other functions. Decorators are built on this property.

**What does "first-class" mean?**

1. A function can be assigned to a variable
2. A function can be passed as an argument
3. A function can be returned from another function
4. A function can be stored in lists and dictionaries

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# Assign the function to a variable (no call!)
say_hi = greet
print(say_hi("Olga"))  # Hello, Olga!

# Pass a function as an argument
def call_twice(func, value):
    print(func(value))
    print(func(value))

call_twice(greet, "Maxim")
\`\`\`

**Important:** \`greet\` is a reference to the function, while \`greet()\` is a call. Without parentheses, you work with the function object itself.`
      },
      {
        title: "The idea of wrapping",
        content: `A decorator is a function that takes another function and returns a new one (a "wrapper") that adds behavior before and/or after the original call.

**How it works:**

1. Take the original function \`func\`
2. Create a \`wrapper\` that calls \`func\`
3. Add your own code before and after the call (log, timer, check…)
4. Return \`wrapper\` instead of the original

\`\`\`python
def simple_wrapper(func):
    def wrapper():
        print("Before call")
        func()
        print("After call")
    return wrapper

def hello():
    print("Hello!")

# Manual wrapping
hello = simple_wrapper(hello)
hello()
# Before call
# Hello!
# After call
\`\`\`

The original \`hello\` body is not changed - we only replace the name with a new wrapper function.`
      },
      {
        title: "@decorator syntax vs manual assignment",
        content: `The \`@\` symbol is syntactic sugar. Both variants below are equivalent.

**Manual assignment:**

\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Call: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

def add(a, b):
    return a + b

add = log_calls(add)
print(add(2, 3))  # Call: add → 5
\`\`\`

**With @ syntax:**

\`\`\`python
@log_calls
def add(a, b):
    return a + b

print(add(2, 3))  # same result
\`\`\`

Python reads \`@log_calls\` as: "define the function, then do \`add = log_calls(add)\`".

**Rules:**
- \`@\` goes directly above \`def\`
- The decorator must return a callable (usually a function)
- One \`@\` means one wrap; you can stack several \`@\` lines (more in the next lesson)`
      },
      {
        title: "A simple logging decorator",
        content: `The most common first decorator logs calls.

\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Start: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"End: {func.__name__}")
        return result
    return wrapper

@log_calls
def greet(name):
    print(f"Hello, {name}!")

greet("Andriy")
# Start: greet
# Hello, Andriy!
# End: greet
\`\`\`

**Why \`*args\` and \`**kwargs\`?**

So the wrapper works with any number of positional and keyword arguments. Otherwise the decorator would be tied to a single signature.`
      },
      {
        title: "The idea of a timing decorator",
        content: `A decorator can measure how long a function takes - useful for optimization.

\`\`\`python
import time

def measure_time(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__}: {elapsed:.4f} s")
        return result
    return wrapper

@measure_time
def slow_sum(n):
    return sum(range(n))

print(slow_sum(1_000_000))
\`\`\`

**Remember:**
- A decorator does not replace the function's logic - it extends it
- Always return the result of \`func(...)\`, otherwise you get \`None\`
- In practice tasks, time is often read from stdin instead of \`time.time()\` so the output is predictable`
      },
      {
        title: "When decorators are appropriate",
        content: `Decorators are convenient when the same "wrapper" should apply to many functions:

1. **Logging** - who called the function and when
2. **Profiling** - how long execution took
3. **Access checks** - whether the user is authorized
4. **Validation** - whether arguments are valid

**For now, focus on:**
- Understanding that \`@decorator\` = \`func = decorator(func)\`
- Being able to write a simple \`wrapper\` with logs
- Not confusing a function definition with a call

In the next lesson we will add \`functools.wraps\`, decorator factories, and stacking multiple \`@\` lines.`
      }
    ]
  },

  codeExamples: [
    {
      title: "A function as a value",
      code: `def square(x):
    return x * x

operations = [square, abs, str]
for op in operations:
    print(op(5))
# 25
# 5
# 5`,
      explanation: "Functions are stored in a list and called like ordinary objects."
    },
    {
      title: "Manual wrapping",
      code: `def announce(func):
    def wrapper(name):
        print("Greeting coming up")
        func(name)
        print("Done")
    return wrapper

def hello(name):
    print(f"Welcome, {name}!")

hello = announce(hello)
hello("Maria")`,
      explanation: "Equivalent to @announce without using the @ symbol."
    },
    {
      title: "Decorator with @",
      code: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Call: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def multiply(a, b):
    return a * b

print(multiply(4, 5))`,
      explanation: "The @log_calls sugar replaces the manual multiply = log_calls(multiply)."
    },
    {
      title: "Logging start and end",
      code: `def border(func):
    def wrapper(*args, **kwargs):
        print(f"Start: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"End: {func.__name__}")
        return result
    return wrapper

@border
def say(msg):
    print(msg)

say("Python!")`,
      explanation: "Typical pattern: message before the call, the call, message after."
    }
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to return wrapper from the decorator",
      explanation: "If the decorator returns nothing, the function name becomes None and the call raises TypeError.",
      correctApproach: "Always end the decorator with: return wrapper"
    },
    {
      mistake: "Forgetting to return the result of func()",
      explanation: "Without return, the original function's result is lost - outer code receives None.",
      correctApproach: "Write: result = func(*args, **kwargs); return result"
    },
    {
      mistake: "Confusing greet and greet()",
      explanation: "A decorator takes the function object, not the result of calling it.",
      correctApproach: "Pass greet without parentheses: decorate(greet), not decorate(greet())"
    },
    {
      mistake: "Hard-coding wrapper arguments",
      explanation: "wrapper(a, b) will not work for functions with a different number of parameters.",
      correctApproach: "Use def wrapper(*args, **kwargs)"
    }
  ],

  summary: `In this lesson we learned the basics of decorators:

1. Functions are first-class objects: you can pass, store, and return them
2. Wrapping - a decorator wraps a function with new behavior
3. @decorator - syntactic sugar for func = decorator(func)
4. Simple scenarios - call logging and timing
5. *args/**kwargs - make the wrapper universal

Next we will learn how to preserve metadata with functools.wraps and create parameterized decorators.`,

  practiceTask: {
    title: "Call logging decorator",
    description: "Create a decorator that prints the start and end of a function call",
    problemStatement: `Create a **log_calls** decorator that:
1. Before calling the function, prints \`Start: <function_name>\`
2. Calls the original function
3. After the call, prints \`End: <function_name>\`
4. Returns the function's result

Apply the decorator to \`greet(name)\`, which prints \`Hello, <name>!\`.

Read the name from stdin and call \`greet(name)\`.

Input format:
Alexander`,
    outputFormat: `Start: greet
Hello, Alexander!
End: greet`,
    examples: [
      {
        input: `Alexander`,
        output: `Start: greet
Hello, Alexander!
End: greet`,
        explanation: "The decorator wraps greet and prints the call boundaries"
      },
      {
        input: `Maria`,
        output: `Start: greet
Hello, Maria!
End: greet`,
        explanation: "Same behavior for another name"
      },
      {
        input: `Igor`,
        output: `Start: greet
Hello, Igor!
End: greet`,
        explanation: "Check with a third name"
      }
    ],
    solution: {
      code: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Start: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"End: {func.__name__}")
        return result
    return wrapper

@log_calls
def greet(name):
    print(f"Hello, {name}!")

name = input().strip()
greet(name)`,
      explanation: "log_calls returns wrapper; @log_calls is equivalent to greet = log_calls(greet). The name is read from stdin."
    },
    hints: [
      "The decorator must return the inner wrapper function",
      "Use func.__name__ for the function name",
      "Don't forget return wrapper at the end of the decorator",
      "Apply @log_calls directly above def greet"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does it mean that functions in Python are first-class objects?",
        options: [
          "They are always faster than loops",
          "They can be passed, stored, and returned like ordinary values",
          "They exist only inside classes",
          "They cannot be assigned to variables"
        ],
        correctAnswer: 1,
        explanation: "Functions are full objects: you pass them as arguments, store them in variables, and return them from other functions."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Writing @decorator above def f(): is equivalent to f = decorator(f).",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. The @ syntax is sugar for manually assigning the wrapped function."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\ndef wrap(f):\n    def w():\n        print('A')\n        f()\n        print('B')\n    return w\n\n@wrap\ndef hi():\n    print('Hi')\n\nhi()",
        options: [
          "Hi",
          "A\nHi\nB",
          "A\nB",
          "B\nHi\nA"
        ],
        correctAnswer: 1,
        explanation: "First the wrapper prints A, then it calls hi (Hi), then it prints B."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why do wrappers usually use *args and **kwargs?",
        options: [
          "To make the function faster",
          "So the wrapper works with different numbers of arguments",
          "To remove the function's parameters",
          "It is required Python syntax"
        ],
        correctAnswer: 1,
        explanation: "*args and **kwargs make the decorator work with different signatures."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does a decorator return if you forget return wrapper?",
        options: [
          "The original function",
          "An empty string",
          "None",
          "A list of arguments"
        ],
        correctAnswer: 2,
        explanation: "A function without return returns None - the decorated name becomes None."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Which line is equivalent to @log above def add(a, b): ...?",
        options: [
          "add = log(add)",
          "add = log()",
          "log = add(log)",
          "add(log)"
        ],
        correctAnswer: 0,
        explanation: "@log means add = log(add) after the function is defined."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A decorator must change the source code of the function body.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. A decorator replaces the name with a wrapper without editing the original function body."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
