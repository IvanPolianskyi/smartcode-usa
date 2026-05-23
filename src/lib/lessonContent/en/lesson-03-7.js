/**
 * Lesson 03-7: Variable scope
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_7 = {
  lessonId: "lesson-03-7",
  moduleId: "module-03",
  order: 7,
  title: "Variable scope",
  
  learningObjectives: [
    "Understand what variable scope is",
    "Apply the LEGB rule for name lookup",
    "Distinguish local and global variables",
    "Use the global keyword",
    "Understand nested functions",
    "Use globals() and locals() for debugging"
  ],
  
  prerequisites: ["lesson-03-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is scope?",
        content: `Scope defines where in your code a variable can be used. When you create a variable in Python, it lives in a namespace, and Python uses scope rules to decide which variable you mean.

**Simple example:**

\`\`\`python
x = 25  # Global variable

def printer():
    x = 50  # Local variable
    return x

print(x)        # 25 (global)
print(printer())  # 50 (local)
\`\`\`

**How does Python find a variable?**

Python uses the **LEGB** rule:
- **L** - Local
- **E** - Enclosing
- **G** - Global
- **B** - Built-in

Python searches in that order and stops at the first match.`
      },
      {
        title: "The LEGB rule",
        content: `**L: Local**
- Names inside a function
- Function parameters
- Variables assigned inside the function

\`\`\`python
def example():
    x = 10
    return x
# x is not available here
\`\`\`

**E: Enclosing**
- Names from outer functions (nested functions)

\`\`\`python
def outer():
    x = "outer"
    def inner():
        print(x)
    inner()
outer()  # "outer"
\`\`\`

**G: Global**
- Names at module (file) level

\`\`\`python
x = "global"
def example():
    print(x)
example()  # "global"
\`\`\`

**B: Built-in**
- Built-in names like \`len\`, \`print\`, \`range\`

\`\`\`python
result = len([1, 2, 3])
\`\`\`

Search order: Local → Enclosing → Global → Built-in.`
      },
      {
        title: "Local variables",
        content: `Variables defined inside a function are local and only visible there.

\`\`\`python
x = 50

def func(x):
    print(f'x is {x}')
    x = 2
    print(f'Changed local x to {x}')

func(x)
print(f'x is still {x}')
\`\`\`

**Output:**
\`\`\`
x is 50
Changed local x to 2
x is still 50
\`\`\`

**Important:**

1. **Locals do not change globals by default:**
\`\`\`python
x = 10
def change_x():
    x = 20
change_x()
print(x)  # 10
\`\`\`

2. **Assignment makes a name local:**
\`\`\`python
def example():
    print(x)  # UnboundLocalError if x is assigned below
    x = 5
\`\`\`

3. **Parameters are local:**
\`\`\`python
def example(param):
    param = 10
    return param
\`\`\``
      },
      {
        title: "Global variables",
        content: `Global variables are defined at module level.

**Reading globals:**

\`\`\`python
x = 50
def read_global():
    print(x)
read_global()  # 50
\`\`\`

**Changing globals - use \`global\`:**

\`\`\`python
x = 50

def change_global():
    global x
    print('Using global x!')
    print(f'global x is: {x}')
    x = 2
    print(f'Changed global x to {x}')

print(f'Before: {x}')
change_global()
print(f'After: {x}')
\`\`\`

**Multiple globals:**

\`\`\`python
x, y, z = 10, 20, 30

def change_globals():
    global x, y, z
    x, y, z = 100, 200, 300
\`\`\`

**When to use global:**

- Counters, module-level settings
- Prefer passing values as parameters when you can`
      },
      {
        title: "Nested functions (Enclosing)",
        content: `An inner function can use variables from the outer function.

\`\`\`python
name = 'This is a global name'

def greet():
    name = 'Sammy'
    def hello():
        print('Hello ' + name)
    hello()

greet()  # Hello Sammy
print(name)  # global unchanged
\`\`\`

**Search order:** local (inner) → enclosing (outer) → global → built-in.

\`\`\`python
x = "global"
def outer():
    x = "outer"
    def middle():
        x = "middle"
        def inner():
            print(x)
        inner()
    middle()
outer()  # "middle"
\`\`\`

**nonlocal - change enclosing variable:**

\`\`\`python
def outer():
    x = "outer"
    def inner():
        nonlocal x
        x = "changed in inner"
        print(f"Inner: {x}")
    print(f"Before: {x}")
    inner()
    print(f"After: {x}")

outer()
\`\`\``
      },
      {
        title: "Built-in names",
        content: `Built-in names are always available.

\`\`\`python
print("Hello")
length = len([1, 2, 3])
numbers = range(10)
\`\`\`

**Do not shadow built-ins:**

\`\`\`python
len = 10  # Shadows built-in len
result = len([1, 2, 3])  # Error!
\`\`\`

\`\`\`python
import builtins
print(dir(builtins))
\`\`\``
      },
      {
        title: "globals() and locals()",
        content: `\`globals()\` returns a dict of global names; \`locals()\` returns local names in the current scope.

\`\`\`python
x = 10
y = 20

def example():
    z = 30
    print("Globals keys:", list(globals().keys())[:5])
    print("Locals keys:", list(locals().keys()))

example()
\`\`\`

\`\`\`python
def check_variable(name):
    if name in globals():
        print(f"{name} is global: {globals()[name]}")
    else:
        print(f"{name} is not global")

x = 10
check_variable("x")
\`\`\`

Useful for debugging scope issues.`
      },
      {
        title: "Practical examples and tips",
        content: `**Counter with global:**

\`\`\`python
counter = 0

def increment():
    global counter
    counter += 1
    return counter

def reset():
    global counter
    counter = 0
\`\`\`

**Closure:**

\`\`\`python
def create_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = create_multiplier(2)
print(double(5))  # 10
\`\`\`

**Tips:**

1. Prefer parameters over globals when possible
2. Use local variables inside functions
3. Use nested functions to organize related code
4. Never shadow built-in names like len, str, list`
      },
      {
        title: "Summary",
        content: `In this lesson we learned variable scope:

**Key concepts:**

1. **Scope** - where a name is visible; LEGB lookup order
2. **Local** - inside functions; assignment creates locals
3. **Global** - module level; use \`global\` to assign inside a function
4. **Enclosing** - outer function names; use \`nonlocal\` to assign
5. **Built-in** - do not shadow standard names
6. **globals() / locals()** - inspect namespaces

**Next step:**

In the next lesson we will learn about recursion - when a function calls itself.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Local vs global variables",
      code: `x = 50

def func(x):
    print(f'x is {x}')
    x = 2
    print(f'Changed local x to {x}')

func(x)
print(f'x is still {x}')`,
      explanation: "Local assignment does not change the global x."
    },
    {
      title: "Using global",
      code: `x = 50

def change_global():
    global x
    x = 2
    print(f'Changed global x to {x}')

print(f'Before: {x}')
change_global()
print(f'After: {x}')`,
      explanation: "global lets you assign to a module-level variable inside a function."
    },
    {
      title: "Nested functions",
      code: `name = 'Global name'

def greet():
    name = 'Sammy'
    def hello():
        print('Hello ' + name)
    hello()

greet()
print(name)`,
      explanation: "inner() uses name from the enclosing greet() function."
    },
    {
      title: "Using nonlocal",
      code: `def outer():
    x = "outer"
    def inner():
        nonlocal x
        x = "changed in inner"
        print(f"Inner: {x}")
    print(f"Before: {x}")
    inner()
    print(f"After: {x}")

outer()`,
      explanation: "nonlocal updates x in the enclosing function, not the global scope."
    },
    {
      title: "globals() and locals()",
      code: `x = 10
y = 20

def example():
    a = 1
    b = 2
    print("Local variables:", list(locals().keys()))
    print("Global x:", globals()['x'])

example()`,
      explanation: "Inspecting local and global namespaces."
    },
    {
      title: "Closure",
      code: `def create_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = create_multiplier(2)
print(double(5))`,
      explanation: "Inner function remembers n from the outer function."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Changing a global without global",
      explanation: "Assignment inside a function creates a local unless you declare global.",
      correctApproach: `def change():
    global x
    x = 20`
    },
    {
      mistake: "UnboundLocalError",
      explanation: "If you assign to a name in a function, Python treats it as local for the whole function.",
      correctApproach: `Use global x before assignment, or use a different local name.`
    },
    {
      mistake: "Confusing global and nonlocal",
      explanation: "global is for module-level names; nonlocal is for enclosing function names.",
      correctApproach: `global x  # module level
nonlocal x  # outer function's x`
    },
    {
      mistake: "Shadowing built-in names",
      explanation: "Assigning to len or str breaks built-in behavior.",
      correctApproach: `my_length = 10
result = len([1, 2, 3])`
    }
  ],
  
  summary: `In this lesson we learned variable scope:

1. Scope and LEGB (Local, Enclosing, Global, Built-in)
2. Local variables inside functions
3. global keyword for module-level assignment
4. nonlocal for enclosing scope assignment
5. Closures and nested functions
6. globals() and locals() for debugging

Understanding scope helps you write clearer, more predictable code!`,
  
  practiceTask: {
    title: "Working with variable scope",
    description: "Create functions that demonstrate local, global, nested, and closure scope",
    problemStatement: `Write a program demonstrating scope:

1. **local_example** - local variable does not change global x
2. **global_counter** - increment(), reset(), get_count() using global counter
3. **nested_example** - outer() with inner() using enclosing variable
4. **closure_example** - create_adder(n) returns a function that adds n

**Important:** Do not use input(). Assign values in code.

Print results for each example.`,
    outputFormat: `Example output:
Local variable: 20
Global variable: 10
Counter: 0
Counter after increment: 1
Counter after reset: 0
Outer: outer_value
Inner: outer_value
Adder(5) with n=3: 8`,
    examples: [
      {
        output: `Local variable: 20
Global variable: 10
Counter: 0
Counter after increment: 1
Counter after reset: 0`,
        explanation: "Local vs global and counter behavior."
      }
    ],
    solution: {
      code: `# Working with variable scope

x = 10
counter = 0

def local_example():
    x = 20
    return x

def increment():
    global counter
    counter += 1
    return counter

def reset():
    global counter
    counter = 0

def get_count():
    return counter

def outer():
    outer_var = "outer_value"
    def inner():
        print(f"Inner: {outer_var}")
    print(f"Outer: {outer_var}")
    inner()
    return inner

def create_adder(n):
    def adder(x):
        return x + n
    return adder

def create_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

local_x = local_example()
print(f"Local variable: {local_x}")
print(f"Global variable: {x}")

print()

print(f"Counter: {get_count()}")
increment()
print(f"Counter after increment: {get_count()}")
increment()
print(f"Counter after another increment: {get_count()}")
reset()
print(f"Counter after reset: {get_count()}")

print()

outer()

print()

adder_3 = create_adder(3)
adder_7 = create_adder(7)
print(f"Adder(5) with n=3: {adder_3(5)}")
print(f"Adder(5) with n=7: {adder_7(5)}")

multiplier_2 = create_multiplier(2)
multiplier_5 = create_multiplier(5)
print(f"Multiplier(4) with n=2: {multiplier_2(4)}")
print(f"Multiplier(4) with n=5: {multiplier_5(4)}")`,
      explanation: "Demonstrates local vs global, global counter, enclosing scope in nested functions, and closures."
    },
    hints: [
      "Assign values in code - do not use input()",
      "Use global counter inside increment and reset",
      "local_example's x is separate from module-level x",
      "Inner functions can read enclosing variables without nonlocal",
      "Use nonlocal only if you need to assign to an enclosing variable"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "Local variable: 20",
        description: "Checking local variables"
      },
      {
        expectedOutput: "Counter after increment: 1",
        description: "Checking global counter"
      },
      {
        expectedOutput: "Adder(5) with n=3: 8",
        description: "Checking closure"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does LEGB stand for?",
        options: [
          "Local, Enclosing, Global, Built-in - name lookup order",
          "Linear, Exponential, Geometric, Binary variables",
          "Local, Export, Global, Base variables",
          "It is not an acronym"
        ],
        correctAnswer: 0,
        explanation: "LEGB is Python's order for finding names: Local, Enclosing, Global, Built-in."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you change a global variable inside a function without the global keyword?",
        options: [
          "No - you need global to assign to a global name",
          "Yes - always",
          "Only for reading",
          "Only for some data types"
        ],
        correctAnswer: 0,
        explanation: "Without global, assignment creates a new local variable instead of updating the global."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 10\n\ndef func():\n    x = 20\n    print(x)\n\nfunc()\nprint(x)\n```",
        options: [
          "20, then 10",
          "10, then 20",
          "10, then 10",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "func() prints local 20; global x stays 10."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a closure?",
        options: [
          "A function that remembers variables from an enclosing scope",
          "A way to close a program",
          "A Python data type",
          "A syntax error"
        ],
        correctAnswer: 0,
        explanation: "A closure keeps references to variables from an outer function after that function returns."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 10\n\ndef outer():\n    x = 20\n    def inner():\n        print(x)\n    inner()\n\nouter()\nprint(x)\n```",
        options: [
          "20, then 10",
          "10, then 20",
          "10, then 10",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "inner() uses x=20 from outer(); global x is still 10."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When should you use nonlocal instead of global?",
        options: [
          "When changing a variable in an enclosing function, not a global",
          "When changing a global variable",
          "When creating a new local variable",
          "nonlocal does not exist in Python"
        ],
        correctAnswer: 0,
        explanation: "nonlocal targets the nearest enclosing scope; global targets module-level names."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 10\n\ndef func():\n    global x\n    x = 20\n    print(x)\n\nfunc()\nprint(x)\n```",
        options: [
          "20, then 20",
          "10, then 20",
          "20, then 10",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "global x makes both assignments refer to the module-level x, so both prints are 20."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Local variables are accessible outside the function where they are defined.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Local variables exist only inside the function where they are defined."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
