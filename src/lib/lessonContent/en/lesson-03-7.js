/**
 * Lesson 03-7: Scope of variables
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_03_7 = {
  lessonId: "lesson-03-7",
  moduleId: "module-03",
  order: 7,
  title: "Scope of variables",
  
  learningObjectives: [
    "Understand what variable scope is",
    "Apply the LEGB rule to find variables",
    "Distinguish between local and global variables",
    "Use the keyword global",
    "Understand working with nested functions",
    "Use globals() and locals() for diagnostics"
  ],
  
  prerequisites: ["lesson-03-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is the field of view?",
        content: `The scope defines where in the code a variable can be used. When you create a variable in Python, it is stored in a namespace, and Python uses the scope rules to determine which variable you mean.

**Simple example:**

\`\`\`python
x = 25  # Global variable

def printer():
    x = 50  # Local variable
    return x

print(x)        # Will output: 25 (global variable)
print(printer())  # Will print: 50 (local variable)
\`\`\`

**How does Python determine which variable to use?**

Python uses the LEGB rule for searching variables:
- **L** - Local
- **E** - Enclosing (nested functions)
- **G** - Global
- **B** - Built-in

Python searches for a variable in this order, stopping at the first one found.`
      },
      {
        title: "LEGB rule",
        content: `**LEGB** is an acronym that describes the order of variable lookup in Python:

**L: Local**
- Variables defined inside a function
- Function parameters
- Variables created within a function

\`\`\`python
def example():
    x = 10  # Local variable
    return x

# x is not available here (error if you try to use it)
\`\`\`

**E: Enclosing (Nested Functions)**
- Variables from functions that contain the current function
- Works for nested functions

\`\`\`python
def outer():
    x = "outer"  # Nested scope variable
    
    def inner():
        print(x)  # Uses x from outer()
    
    inner()

outer()  # Will display: "outer"
\`\`\`

**G: Global**
- Variables defined at the module (file) level
- Accessible anywhere within the module

\`\`\`python
x = "global"  # Global variable

def example():
    print(x)  # Uses a global x

example()  # Will display: "global"
\`\`\`

**B: Built-in (Built-in)**
- Built-in Python functions and variables
- For example: \`len\`, \`print\`, \`range\`, \`str\`, \`int\`

\`\`\`python
# len - built-in function
result = len([1, 2, 3])  # Uses the built-in len
\`\`\`

**Important:** Python searches for a variable in the following order: first Local, then Enclosing, then Global, and finally Built-in. If found, the search stops.`
      },
      {
        title: "Local variables",
        content: `Variables defined inside a function are called local. They are accessible only within that function.

**Example:**

\`\`\`python
x = 50  # Global variable

def func(x):
    """
    x here is a parameter (local variable)
    """
    print(f'x is {x}')  # Uses the parameter x
    x = 2  # Changes the local variable x
    print(f'Changed local x to {x}')

func(x)  # We pass the global x as an argument
print(f'x is still {x}')  # The global x has not changed
\`\`\`

**Conclusion:**
\`\`\`
x is 50
Changed local x to 2
x is still 50
\`\`\`

**Important points:**

1. **Local variables do not affect global ones:**
\`\`\`python
x = 10

def change_x():
    x = 20  # Creates a new local variable
    print(f"Inside function: {x}")

change_x()  # Will output: Inside function: 20
print(f"Outside function: {x}")  # Will output: Outside function: 10
\`\`\`

2. **Variables are created at the moment of assignment:**
\`\`\`python
def example():
    print(x)  #  Mistake! x is not yet locally defined
    x = 5     # x becomes a local variable

# Even if there is a global x, Python considers x to be local
# due to the assignment below, so an error occurs
\`\`\`

3. **Function parameters are local variables:**
\`\`\`python
def example(param):
    print(param)  # param is a local variable
    param = 10    # Changes the local variable
    return param

result = example(5)  # param = 5 inside the function
\`\`\``
      },
      {
        title: "Global variables",
        content: `Global variables are defined at the module (file) level and are accessible anywhere in the code.

**Reading global variables:**

\`\`\`python
x = 50  # Global variable

def read_global():
    print(x)  # You can read the global variable

read_global()  # Will output: 50
\`\`\`

**Changing Global Variables:**

To change a global variable inside a function, you need to use the keyword \`global\`:

\`\`\`python
x = 50  # Global variable

def change_global():
    global x  # We announce that x is global
    print('This function is now using the global x!')
    print(f'Because of global x is: {x}')
    x = 2  # Changes the global variable
    print(f'Ran change_global(), changed global x to {x}')

print(f'Before calling change_global(), x is: {x}')  # 50
change_global()
print(f'Value of x (outside of change_global()) is: {x}')  # 2
\`\`\`

**Conclusion:**
\`\`\`
Before calling change_global(), x is: 50
This function is now using the global x!
Because of global x is: 50
Ran change_global(), changed global x to 2
Value of x (outside of change_global()) is: 2
\`\`\`

**Several global variables:**

\`\`\`python
x = 10
y = 20
z = 30

def change_globals():
    global x, y, z  # You can announce several
    x = 100
    y = 200
    z = 300

change_globals()
print(x, y, z)  # 100 200 300
\`\`\`

**When to Use Global:**

- For meters, settings
- When you need to change the status at the module level
- It is better to avoid when it is possible to pass values through parameters`
      },
      {
        title: "Nested functions (Enclosing)",
        content: `When a function is defined inside another function, the inner function can use the variables of the outer function.

**Example:**

\`\`\`python
name = 'This is a global name'  # Global variable

def greet():
    """
    External function
    """
    name = 'Sammy'  # Nested scope variable
    
    def hello():
        """
        Internal function
        """
        print('Hello ' + name)  # Uses name from greet()
    
    hello()

greet()  # Outputs: Hello Sammy
print(name)  # Will output: This is a global name (the global did not change)
\`\`\`

**Search order:**

1. First searches in the local scope (hello)
2. Then in the nested scope (greet)
3. Then in the global scope
4. Finally in the built-in scope

**A more complex example:**

\`\`\`python
x = "global"

def outer():
    x = "outer"
    
    def middle():
        x = "middle"
        
        def inner():
            print(x)  # Uses x with middle()
        
        inner()
    
    middle()

outer()  # Will display: "middle"
\`\`\`

**nonlocal - changing a variable of an enclosing scope:**

If you need to change a variable from an enclosing scope (but not global), use \`nonlocal\`:

\`\`\`python
def outer():
    x = "outer"
    
    def inner():
        nonlocal x  # We announce that x is from the nested space
        x = "changed in inner"
        print(f"Inner: {x}")
    
    print(f"Before inner: {x}")  # outer
    inner()
    print(f"After inner: {x}")  # changed in inner

outer()
\`\`\`

**Conclusion:**
\`\`\`
Before inner: outer
Inner: changed in inner
After inner: changed in inner
\`\`\``
      },
      {
        title: "Built-in variables",
        content: `Built-in variables are functions and variables that are available in Python by default.

**Examples of built-in functions:**

\`\`\`python
# Built-in functions
print("Hello")      # print - built-in function
length = len([1, 2, 3])  # len - built-in function
numbers = range(10)  # range - built-in function
text = str(123)      # str - built-in function
\`\`\`

**Important: Do not override built-in names!**

\`\`\`python
# Incorrect:
len = 10  #  Overriding the built-in len function
result = len([1, 2, 3])  #  Error! len is now a number, not a function

# Correct:
my_length = 10  #  Using a different name
result = len([1, 2, 3])  #  len works as a function
\`\`\`

**Checking built-in variables:**

\`\`\`python
import builtins

# View all built-in names
print(dir(builtins))
\`\`\`

**Example of a conflict:**

\`\`\`python
# A global variable with the name of a built-in function
str = "This is not a str function!"

def example():
    # Let's try to use str as a function
    result = str(123)  #  Error! str is now a string, not a function

# Better:
my_string = "This is a line"
result = str(123)  #  str works as a function
\`\`\``
      },
      {
        title: "globals() and locals()",
        content: `Python provides functions to view the current global and local variables.

**globals()** - returns a dictionary of all global variables:

\`\`\`python
x = 10
y = 20

def example():
    z = 30
    print("Globals:", globals().keys())  # Shows the keys of global variables
    print("Locals:", locals().keys())    # Shows the keys of local variables

example()
\`\`\`

**locals()** - returns a dictionary with all local variables:

\`\`\`python
def example():
    a = 1
    b = 2
    c = 3
    
    print("Local variables:", locals())
    # Will output: {'a': 1, 'b': 2, 'c': 3, ...}

example()
\`\`\`

**Practical use:**

\`\`\`python
# Checking for the existence of a variable
def check_variable(name):
    if name in globals():
        print(f"{name} is a global variable")
        print(f"Value: {globals()[name]}")
    else:
        print(f"{name} is not a global variable")

x = 10
check_variable("x")  # x is a global variable, Value: 10
check_variable("y")  # y is not a global variable
\`\`\`

**Problem Diagnosis:**

\`\`\`python
def debug_scope():
    x = "local"
    print("Local variables:", list(locals().keys()))
    print("Global variables (sample):", [k for k in globals().keys() if not k.startswith('_')][:5])

debug_scope()
\`\`\`

**Important:**

- \`globals()\` and \`locals()\` return dictionaries
- These dictionaries can be modified (but it is not recommended)
- Useful for diagnostics and debugging`
      },
      {
        title: "Practical examples and advice",
        content: `**Example 1: Counter with a global variable**

\`\`\`python
counter = 0  # Global counter

def increment():
    global counter
    counter += 1
    return counter

def reset():
    global counter
    counter = 0

increment()  # 1
increment()  # 2
print(counter)  # 2
reset()
print(counter)  # 0
\`\`\`

**Example 2: Settings**

\`\`\`python
DEBUG = False  # Global setting

def set_debug(value):
    global DEBUG
    DEBUG = value

def log(message):
    if DEBUG:
        print(f"[DEBUG] {message}")

log("This will not be printed out")  # Will not be withdrawn
set_debug(True)
log("This will be displayed")  # [DEBUG] This will be printed
\`\`\`

**Example 3: Nested functions with closures**

\`\`\`python
def create_multiplier(n):
    """
    Creates a function that multiplies by n
    """
    def multiplier(x):
        return x * n  # Uses n from the outer function
    return multiplier

double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
\`\`\`

**Tips:**

1. **Avoid global variables when possible:**
   - It's better to pass values through parameters
   - Global variables make testing and maintenance more difficult

2. **Use local variables:**
   - Isolated within functions
   - Do not conflict with other parts of the code

3. **Use nested functions for organization:**
   - Help group related code
   - Create closures

4. **Do not override built-in names:**
   - Use different names for variables`
      },
      {
        title: "The bottom line",
        content: `In this lesson, we studied the scope of variables:

**Key Concepts:**

1. **Scope**
   - Determines where a variable can be used in the code
   - Python uses the LEGB rule to search for variables

2. **LEGB Rule**
   - **L** - Local: variables inside a function
   - **E** - Enclosing: variables from outer functions
   - **G** - Global: variables at the module level
   - **B** - Built-in: Python's built-in functions

3. **Local Variables**
   - Defined inside a function
   - Do not affect global variables
   - Created at the moment of assignment

4. **Global Variables**
   - Defined at the module level
   - Requires the keyword \`global\` to modify
   - Better to avoid when it can be passed through parameters5. **Nested Functions**
   - Can use variables from outer functions
   - To modify, the keyword \`nonlocal\` is needed
   - Create closures

6. **Diagnostics**
   - \`globals()\` - viewing global variables
   - \`locals()\` - viewing local variables

**Important Rules:**

- Python looks for a variable in LEGB order
- Local variables do not affect global ones without \`global\`
- Do not override built-in names
- Use local variables whenever possible

**Next Step:**

In the next lesson, we will learn about recursion - when a function calls itself.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Local and global variables",
      code: `x = 50  # Global variable

def func(x):
    print(f'x is {x}')  # Uses the parameter x
    x = 2  # Changes the local variable
    print(f'Changed local x to {x}')

func(x)
print(f'x is still {x}')  # Global x didn't change`,
      explanation: "Demonstrates the difference between local and global variables. A local variable does not affect the global one."
    },
    {
      title: "Using global",
      code: `x = 50 # Global Variable

def change_global():
    global x # We declare that x is a global
    x = 2 # Changes the global variable
    print(f'Changed global x to {x}')

print(f'Before: {x}')  # 50
change_global()
print(f'After: {x}')  # 2`,
      explanation: "Shows how to use the global keyword to modify a global variable inside a function."
    },
    {
      title: "Nested functions",
      code: `name = 'Global name'  # Global variable

def greet():
    name = 'Sammy'  # Nested scope variable
    
    def hello():
        print('Hello ' + name)  # Uses name from greet()
    
    hello()

greet()  # Will output: Hello Sammy
print(name)  # Will output: Global name`,
      explanation: "Demonstrates the use of variables from the enclosing scope in nested functions."
    },
    {
      title: "Using nonlocal",
      code: `def outer():
    x = "outer"
    
    def inner():
        nonlocal x  # Declare that x is from the enclosing scope
        x = "changed in inner"
        print(f"Inner: {x}")
    
    print(f"Before: {x}")  # outer
    inner()
    print(f"After: {x}")  # changed in inner

outer()`,
      explanation: "Shows the use of nonlocal to change a variable from an inner scope (but not global)."
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
      explanation: "Demonstrates the use of globals() and locals() to view current variables."
    },
    {
      title: "Closure",
      code: `def create_multiplier(n):
    """
    Creates a function that multiplies by n
    """
    def multiplier(x):
        return x * n # Uses n from an external function
    return multiplier

double = create_multiplier(2)
print(double(5))  # 10`,
      explanation: "A practical example of a closure is that an internal function 'remembers' a variable from an external function."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Attempt to change a global variable without global",
      explanation: "Beginners often try to change a global variable without the global keyword.",
      correctApproach: `# Incorrect:
x = 10

def change():
    x = 20  # Creates a new local variable, does not change the global one
    print(x)

change()  # 20
print(x)  # 10 (did not change!)

# Correct:
x = 10

def change():
    global x  # Declare global
    x = 20  # Now changes the global variable
    print(x)

change()  # 20
print(x)  # 20 (changed!)`
    },
    {
      mistake: "UnboundLocalError",
      explanation: "If there is an assignment to a variable in a function, Python considers it local, even if it is used before the assignment.",
      correctApproach: `# Incorrect:
x = 10

def example():
    print(x)  #  Error! x is considered local due to the assignment below
    x = 20

# Correct:
x = 10

def example():
    global x  #  Declare global
    print(x)  # 10
    x = 20

# Or:
x = 10

def example():
    local_x = x  #  First read the global
    print(local_x)  # 10
    local_x = 20  # Change the local`
    },
    {
      mistake: "Confusion between global and nonlocal",
      explanation: "Beginners get confused about when to use global and when to use nonlocal.",
      correctApproach: `# global - for variables at the module level
x = 10  # Global

def outer():
    def inner():
        global x  # Refers to the global x
        x = 20

# nonlocal - for variables from the nested scope
def outer():
    x = 10  # Nested scope
    
    def inner():
        nonlocal x  # Refers to x from outer()
        x = 20`
    },
    {
      mistake: "Overriding built-in names",
      explanation: "Beginners sometimes accidentally override built-in functions, which leads to errors.",
      correctApproach: `# Incorrect:
len = 10  #  Redefining the built-in function
result = len([1, 2, 3])  #  Error!

# Correct:
my_length = 10  #  Using a different name
result = len([1, 2, 3])  #  len works as a function`
    }
  ],
  
  summary: `In this lesson, we studied the scope of variables:

1. Scope
   - Determines where in the code a variable can be used
   - Python uses the LEGB rule to look up variables

2. LEGB Rule
   - L - Local: variables inside a function
   - E - Enclosing: variables from outer functions
   - G - Global: variables at the module level
   - B - Built-in: Python built-in functions

3. Local Variables
   - Defined inside a function
   - Do not affect globals without global

4. Global Variables
   - Defined at the module level
   - To modify, the global keyword is needed
   - Better to avoid when they can be passed as parameters

5. Nested Functions
   - Can use variables from outer functions
   - To modify, nonlocal is needed
   - Create closures6. Diagnostics
   - globals() - view global variables
   - locals() - view local variables

Understanding the scope helps to write more structured and predictable code!`,
  
  practiceTask: {
    title: "Working with the scope of variables",
    description: "Create functions that demonstrate different aspects of the scope of variables",
    problemStatement: `Write a program that demonstrates the scope:

1. local_example() - local x=20, global x does not change
2. increment / reset / get_count - global counter
3. outer()/inner() - nested functions
4. create_adder(n), create_multiplier(n) - closures

Input: initial counter not needed (start from 0); number of increments; n1, x1 for adder; n2, x2 for adder; n3, x3 for multiplier; n4, x4 for multiplier.
Global x = 10. Output demo of local variables, counter, outer/inner, and closures.

Input format:
2
3
5
7
5
2
4
5
4`,
    outputFormat: `Local variable: 20
Global variable: 10

Counter: 0
Counter after increment: 1
Counter after another increment: 2
Counter after reset: 0

Outer: outer_value
Inner: outer_value

Adder(5) with n=3: 8
Adder(5) with n=7: 12
Multiplier(4) with n=2: 8
Multiplier(4) with n=5: 20`,
    examples: [
      {
        input: `2
3
5
7
5
2
4
5
4`,
        output: `Local variable: 20
Global variable: 10

Counter: 0
Counter after increment: 1
Counter after another increment: 2
Counter after reset: 0

Outer: outer_value
Inner: outer_value

Adder(5) with n=3: 8
Adder(5) with n=7: 12
Multiplier(4) with n=2: 8
Multiplier(4) with n=5: 20`,
        explanation: "2 increments; adder(3)+5=8, adder(7)+5=12; *2 and *5"
      },
      {
        input: `1
1
10
2
10
3
3
4
3`,
        output: `Local variable: 20
Global variable: 10

Counter: 0
Counter after increment: 1
Counter after reset: 0

Outer: outer_value
Inner: outer_value

Adder(10) with n=1: 11
Adder(10) with n=2: 12
Multiplier(3) with n=3: 9
Multiplier(3) with n=4: 12`,
        explanation: "One increment; other values for closures"
      },
      {
        input: `3
10
1
20
2
5
2
6
2`,
        output: `Local variable: 20
Global variable: 10

Counter: 0
Counter after increment: 1
Counter after another increment: 2
Counter after another increment: 3
Counter after reset: 0

Outer: outer_value
Inner: outer_value

Adder(1) with n=10: 11
Adder(2) with n=20: 22
Multiplier(2) with n=5: 10
Multiplier(2) with n=6: 12`,
        explanation: "Three increments and other closure parameters"
      }
    ],
    solution: {
      code: `x = 10
counter = 0

def local_example():
    """Demonstrates local variables"""
    x = 20
    return x

def increment():
    """Increases the global counter"""
    global counter
    counter += 1
    return counter

def reset():
    """Resets the global counter"""
    global counter
    counter = 0

def get_count():
    """Returns the current counter value"""
    return counter

def outer():
    """Outer function with nested function"""
    outer_var = "outer_value"

    def inner():
        print(f"Inner: {outer_var}")

    print(f"Outer: {outer_var}")
    inner()

def create_adder(n):
    """Creates a function that adds n"""
    def adder(val):
        return val + n
    return adder

def create_multiplier(n):
    """Creates a function that multiplies by n"""
    def multiplier(val):
        return val * n
    return multiplier

inc_times = int(input())
n1 = int(input())
x1 = int(input())
n2 = int(input())
x2 = int(input())
n3 = int(input())
x3 = int(input())
n4 = int(input())
x4 = int(input())

print(f"Local variable: {local_example()}")
print(f"Global variable: {x}")
print()

print(f"Counter: {get_count()}")
for i in range(inc_times):
    increment()
    if i == 0:
        print(f"Counter after increment: {get_count()}")
    else:
        print(f"Counter after another increment: {get_count()}")
reset()
print(f"Counter after reset: {get_count()}")
print()

outer()
print()
print(f"Adder({x1}) with n={n1}: {create_adder(n1)(x1)}")
print(f"Adder({x2}) with n={n2}: {create_adder(n2)(x2)}")
print(f"Multiplier({x3}) with n={n3}: {create_multiplier(n3)(x3)}")
print(f"Multiplier({x4}) with n={n4}: {create_multiplier(n4)(x4)}")`,
      explanation: "Demonstration of local/global/nonlocal closures; closure parameters and the number of increments from stdin."
    },
    hints: [
      "To change the counter, use global",
      "Read the number of increments and closure parameters through input()",
      "A local x in a function does not change the global x",
      "create_adder returns an internal function"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Name x is used inside a nested function. In what order does Python search scopes?",
        options: [
          "Local → enclosing → global → built-in (LEGB)",
          "Global first, then local, skipping enclosing",
          "Built-in names only — user scopes are ignored",
          "Random order depending on the Python version"
        ],
        correctAnswer: 0,
        explanation: "LEGB means Local, Enclosing, Global, Built-in — Python checks those scopes in that order. It does not skip enclosing or search randomly."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Is it possible to change a global variable inside a function without the global keyword?",
        options: [
          "No, you need to use global",
          "Yes, it's always possible",
          "Read-only",
          "Only for certain types of data"
        ],
        correctAnswer: 0,
        explanation: "To change a global variable inside a function, you need to use the global keyword. Without it, Python will create a new local variable."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nx = 10\n\ndef func():\n    x = 20\n    print(x)\n\nfunc()\nprint(x)\n```",
        options: [
          "20, then 10",
          "10, then 20",
          "10, then 10",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "Inside func(), a local variable x=20 is created, so 20 is printed. The global x=10 has not changed, so 10 is printed outside."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a closure?",
        options: [
          "An inner function that keeps outer-scope variables",
          "A command that exits the whole program",
          "A built-in data type like dict or set",
          "Always a SyntaxError in Python code"
        ],
        correctAnswer: 0,
        explanation: "A closure is an inner function that still sees enclosing variables after the outer function returns. It is not 'closing' a program, a type, or an error."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nx = 10\n\ndef outer():\n    x = 20\n    def inner():\n        print(x)\n    inner()\n\nouter()\nprint(x)\n```",
        options: [
          "20, then 10",
          "10, then 20",
          "10, then 10",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "inner() uses x from the nested scope (outer), so it outputs 20. The global x=10 has not changed, so outside it outputs 10."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When should you use nonlocal instead of global?",
        options: [
          "When you need to change a variable from an enclosing scope (but not a global one)",
          "When you need to change a global variable",
          "When it is necessary to create a new local variable",
          "nonlocal does not exist in Python"
        ],
        correctAnswer: 0,
        explanation: "nonlocal is used to change a variable from an enclosing scope, but not a global one. global is used to change a global variable."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nx = 10\n\ndef func():\n    global x\n    x = 20\n    print(x)\n\nfunc()\nprint(x)\n```",
        options: [
          "20, then 20",
          "10, then 20",
          "20, then 10",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "global x declares that x is a global variable, so x = 20 changes the global variable. Both outputs show 20."
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
        explanation: "No, local variables are only accessible inside the function where they are defined. Outside the function, they are not accessible."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
