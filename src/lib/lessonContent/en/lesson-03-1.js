/**
 * Lesson 03-1: Functions: declaration and calling
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_1 = {
  lessonId: "lesson-03-1",
  moduleId: "module-03",
  order: 1,
  title: "Functions: declaration and calling",
  
  learningObjectives: [
    "Understand what functions are and why they are needed",
    "Declare functions using the def keyword",
    "Call functions and pass arguments",
    "Understand the difference between print() and return",
    "Create functions with parameters"
  ],
  
  prerequisites: ["lesson-02-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to functions",
        content: `Functions are one of the most important tools in programming! They let us organize code, avoid repetition, and build more complex programs.

**What is a function?**

A function is a block of code that performs a specific task. You can call a function many times without rewriting the code again.

**Why do we need functions?**

1. **Avoiding repetition** — instead of writing the same code many times, you write it once inside a function
2. **Organizing code** — functions help break a complex program into smaller, understandable parts
3. **Reusability** — once you write a function, you can use it in different places in your program
4. **Easier testing** — you can test individual parts of the program

**Real-life example:**

Imagine you're making breakfast. Instead of describing the whole process every time ("take eggs, crack them, add salt, fry..."), you simply say: "Make scrambled eggs!" — that's a function!

**In Python we have already used functions:**

\`\`\`python
# We have already used all of these functions:
print("Hello!")           # print() function
len("Python")              # len() function
input("Enter a number: ")  # input() function
\`\`\`

Now we'll learn to create our own functions!`
      },
      {
        title: "Function syntax: the def keyword",
        content: `To create a function in Python, we use the \`def\` keyword (short for "define").

**Basic syntax:**

\`\`\`python
def function_name():
    """
    Function documentation (docstring)
    Describes what the function does
    """
    # Function code
    # All lines must be indented
\`\`\`

**Important rules:**

1. **def** — keyword for creating a function
2. **Function name** — should be descriptive (for example, \`calculate_sum\`, not \`f\`)
3. **Parentheses ()** — required, even if the function takes no parameters
4. **Colon :** — a colon is required after the parentheses
5. **Indentation** — all code inside the function must be indented (usually 4 spaces)
6. **Docstring** — function description (optional, but very useful)

**First function:**

\`\`\`python
def say_hello():
    """
    A function that prints a greeting
    """
    print("Hello, world!")

# Calling the function
say_hello()  # Output: Hello, world!
\`\`\`

**Attention!** Don't forget the parentheses when calling a function:
- \`say_hello()\` — correct (calls the function)
- \`say_hello\` — incorrect (just a reference to the function, does not call it)`
      },
      {
        title: "Calling a function",
        content: `After you create a function, you need to **call** it for it to run.

**How to call a function:**

Simply write the function name with parentheses:

\`\`\`python
def say_hello():
    print("Hello!")

# Calling the function
say_hello()  # Output: Hello!
say_hello()  # Can be called many times
say_hello()  # Output: Hello! (each time)
\`\`\`

**Order of execution:**

1. Python first **defines** the function (reads the code from \`def\` to the end of the function)
2. Then, when it encounters a **call** to the function, it runs the code inside it

\`\`\`python
# Step 1: Defining the function
def greet():
    print("Welcome!")

# Step 2: Calling the function
greet()  # Now the code inside the function runs
\`\`\`

**Important:** A function must be defined **before** it is called!`
      },
      {
        title: "Functions with parameters",
        content: `Functions can accept **parameters** (arguments) — values passed into the function to work with.

**Syntax for a function with parameters:**

\`\`\`python
def function_name(parameter1, parameter2):
    # Using parameters
    # function code
\`\`\`

**Example: greeting function with a name**

\`\`\`python
def greet(name):
    """
    Greets the user by name
    """
    print(f"Hello, {name}!")

# Calling the function with an argument
greet("Alex")   # Output: Hello, Alex!
greet("Maria")  # Output: Hello, Maria!
\`\`\`

**Example: addition function**

\`\`\`python
def add_numbers(a, b):
    """
    Adds two numbers
    """
    result = a + b
    print(f"{a} + {b} = {result}")

# Calling the function
add_numbers(5, 3)     # Output: 5 + 3 = 8
add_numbers(10, 20)   # Output: 10 + 20 = 30
\`\`\`

**Parameters vs Arguments:**

- **Parameters** — variables in the function definition (\`def add_numbers(a, b):\`)
- **Arguments** — values passed when calling the function (\`add_numbers(5, 3)\`)

In this example:
- \`a\` and \`b\` are parameters
- \`5\` and \`3\` are arguments`
      },
      {
        title: "print() vs return: an important difference",
        content: `This is one of the most important topics! Many beginners confuse \`print()\` and \`return\`.

**print() — displays on screen:**

\`\`\`python
def print_result(num1, num2):
    result = num1 + num2
    print(result)  # Simply displays on screen

# Calling the function
print_result(5, 3)  # Output: 8

# But the result CANNOT be saved!
total = print_result(5, 3)  # total will be None!
print(total)  # Output: None
\`\`\`

**return — returns a value:**

\`\`\`python
def calculate_sum(num1, num2):
    result = num1 + num2
    return result  # Returns the value

# Calling the function
calculate_sum(5, 3)  # Returns 8, but prints nothing

# Now the result CAN be saved!
total = calculate_sum(5, 3)
print(total)  # Output: 8

# Can be used in other calculations
double = calculate_sum(5, 3) * 2
print(double)  # Output: 16
\`\`\`

**Key difference:**

| print() | return |
|---------|--------|
| Displays a value on screen | Returns a value from the function |
| Result cannot be saved | Result can be saved |
| Used for display | Used for calculations |

**When to use which:**

- **print()** — when you need to simply show something to the user
- **return** — when you need to get a result for further work

**Example of both approaches:**

\`\`\`python
# Function with print() — only displays
def show_sum(a, b):
    print(a + b)

# Function with return — returns a value
def get_sum(a, b):
    return a + b

# Usage
show_sum(5, 3)          # Output: 8
result = get_sum(5, 3)  # Saves 8 in a variable
print(result)           # Output: 8
\`\`\``
      },
      {
        title: "Practical function examples",
        content: `Let's look at several practical function examples:

**Example 1: Function to check if a number is even**

\`\`\`python
def is_even(number):
    """
    Checks if a number is even
    Returns True if even, False otherwise
    """
    return number % 2 == 0

# Usage
print(is_even(4))   # True
print(is_even(5))   # False
print(is_even(10))  # True
\`\`\`

**Example 2: Function to calculate rectangle area**

\`\`\`python
def rectangle_area(width, height):
    """
    Calculates the area of a rectangle
    """
    area = width * height
    return area

# Usage
area1 = rectangle_area(5, 3)
print(f"Rectangle area: {area1}")  # Output: Rectangle area: 15

area2 = rectangle_area(10, 7)
print(f"Rectangle area: {area2}")  # Output: Rectangle area: 70
\`\`\`

**Example 3: Function to format a name**

\`\`\`python
def format_name(first_name, last_name):
    """
    Formats a full name
    """
    full_name = f"{first_name} {last_name}"
    return full_name.title()  # First letter capitalized

# Usage
name1 = format_name("alex", "smith")
print(name1)  # Output: Alex Smith

name2 = format_name("maria", "johnson")
print(name2)  # Output: Maria Johnson
\`\`\`

**Example 4: Function to calculate average**

\`\`\`python
def average(num1, num2, num3):
    """
    Calculates the arithmetic mean of three numbers
    """
    total = num1 + num2 + num3
    avg = total / 3
    return avg

# Usage
avg1 = average(10, 20, 30)
print(f"Average: {avg1}")  # Output: Average: 20.0

avg2 = average(5, 15, 25)
print(f"Average: {avg2}")  # Output: Average: 15.0
\`\`\``
      },
      {
        title: "Interaction between functions",
        content: `Functions can use the results of other functions! This is a very powerful capability.

**Example: functions that work together**

\`\`\`python
def add(a, b):
    """Adds two numbers"""
    return a + b

def multiply(a, b):
    """Multiplies two numbers"""
    return a * b

def calculate_total(x, y, z):
    """
    Calculates: (x + y) * z
    Uses other functions
    """
    sum_result = add(x, y)  # Call the add function
    total = multiply(sum_result, z)  # Call the multiply function
    return total

# Usage
result = calculate_total(2, 3, 4)
print(result)  # Output: 20
# Explanation: (2 + 3) * 4 = 5 * 4 = 20
\`\`\`

**Example: more complex interaction**

\`\`\`python
def square(number):
    """Squares a number"""
    return number ** 2

def is_positive(number):
    """Checks if a number is positive"""
    return number > 0

def process_number(num):
    """
    If the number is positive, returns its square
    Otherwise returns 0
    """
    if is_positive(num):
        return square(num)
    else:
        return 0

# Usage
print(process_number(5))   # Output: 25 (5 > 0, so 5² = 25)
print(process_number(-3))  # Output: 0 (-3 is not positive)
print(process_number(4))   # Output: 16 (4 > 0, so 4² = 16)
\`\`\`

**Benefits of this approach:**

1. **Modularity** — each function performs one task
2. **Readability** — code is easier to understand
3. **Reusability** — functions can be used in different places
4. **Testing** — easier to test individual parts`
      },
      {
        title: "Summary",
        content: `In this lesson we learned the basics of functions:

**Key concepts:**

1. **def** — keyword for creating a function
2. **Parameters** — variables in the function definition
3. **Arguments** — values passed when calling the function
4. **print()** — displays on screen, does not return a value
5. **return** — returns a value from the function
6. **Function call** — running function code via \`function_name()\`

**Rules:**

- A function must be defined before it is called
- Don't forget parentheses when calling a function
- Use \`return\` if you need to get a result
- Name functions with descriptive names
- Add a docstring to describe the function

**Next step:**

In the next lesson we'll learn more about parameters, \`return\`, and the special value \`None\`.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Simple function without parameters",
      code: `def say_hello():
    """
    A function that prints a greeting
    """
    print("Hello, world!")

# Calling the function
say_hello()`,
      explanation: "This is the simplest function. It takes no parameters and simply prints text."
    },
    {
      title: "Function with one parameter",
      code: `def greet(name):
    """
    Greets the user by name
    """
    print(f"Hello, {name}!")

# Calling the function with different arguments
greet("Alex")
greet("Maria")`,
      explanation: "The function takes one parameter name and uses it to create a greeting."
    },
    {
      title: "Function with return",
      code: `def add_numbers(a, b):
    """
    Adds two numbers and returns the result
    """
    result = a + b
    return result

# Calling the function and saving the result
sum_result = add_numbers(5, 3)
print(f"Sum: {sum_result}")`,
      explanation: "The function uses return to return a result that can be saved in a variable."
    },
    {
      title: "Comparing print() and return",
      code: `# Function with print()
def show_sum(a, b):
    print(a + b)

# Function with return
def get_sum(a, b):
    return a + b

# Usage
show_sum(5, 3)          # Output: 8
result = get_sum(5, 3)  # Saves 8
print(f"Result: {result}")`,
      explanation: "Demonstrates the difference between print() (displays) and return (returns a value)."
    },
    {
      title: "Even number check function",
      code: `def is_even(number):
    """
    Checks if a number is even
    """
    return number % 2 == 0

# Usage
print(is_even(4))   # True
print(is_even(5))   # False`,
      explanation: "The function uses the % operator (modulo) to check if a number is even."
    },
    {
      title: "Function interaction",
      code: `def square(number):
    """Squares a number"""
    return number ** 2

def add(a, b):
    """Adds two numbers"""
    return a + b

def calculate(a, b):
    """Calculates (a + b)²"""
    sum_result = add(a, b)
    return square(sum_result)

# Usage
result = calculate(3, 4)
print(result)  # Output: 49 (because (3+4)² = 7² = 49)`,
      explanation: "Shows how functions can use the results of other functions."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting parentheses when calling a function",
      explanation: "Many beginners forget parentheses when calling a function.",
      correctApproach: `# Incorrect:
greet  # This is just a reference to the function, does not call it

# Correct:
greet()  # Calls the function`
    },
    {
      mistake: "Confusing print() and return",
      explanation: "Beginners often use print() instead of return when they need to return a value.",
      correctApproach: `# Incorrect (if you need to save the result):
def add(a, b):
    print(a + b)  # Cannot save the result

# Correct:
def add(a, b):
    return a + b  # Can save the result`
    },
    {
      mistake: "Missing indentation inside a function",
      explanation: "All code inside a function must be indented.",
      correctApproach: `# Incorrect:
def greet():
print("Hello!")  # Error! No indentation

# Correct:
def greet():
    print("Hello!")  # Correct indentation (4 spaces)`
    },
    {
      mistake: "Calling a function before it is defined",
      explanation: "Python executes code top to bottom, so a function must be defined before it is called.",
      correctApproach: `# Incorrect:
greet()  # Error! Function is not defined yet

def greet():
    print("Hello!")

# Correct:
def greet():
    print("Hello!")

greet()  # Now the function is already defined`
    }
  ],
  
  summary: `In this lesson we learned the basics of functions:

1. What functions are — blocks of code that perform a specific task
2. def syntax — how to create functions using the def keyword
3. Parameters and arguments — how to pass data into functions
4. print() vs return — important difference between displaying and returning values
5. Calling functions — how to use functions you create
6. Function interaction — how functions can use other functions

Functions are the foundation of code organization in Python. They let you write cleaner, more understandable, and reusable code.`,
  
  practiceTask: {
    title: "Function calculator",
    description: "Create a set of functions for performing mathematical operations",
    problemStatement: `Write a program that contains functions for:
1. Adding two numbers
2. Subtracting two numbers
3. Multiplying two numbers
4. Dividing two numbers
5. Calculating the arithmetic mean of three numbers

**Important:** Do not use the input() function. Enter values directly in the code (for example: num1 = 10, num2 = 5).

Each function must:
- Accept the required parameters
- Calculate the result
- Return the result using return
- Have a docstring with a description

After creating the functions, call them with different values and print the results.`,
    outputFormat: `Example output:
Sum of 10 and 5: 15
Difference of 10 and 5: 5
Product of 10 and 5: 50
Quotient of 10 and 5: 2.0
Average of 10, 5, 15: 10.0`,
    examples: [
      {
        output: `Sum of 10 and 5: 15
Difference of 10 and 5: 5
Product of 10 and 5: 50
Quotient of 10 and 5: 2.0
Average of 10, 5, 15: 10.0`,
        explanation: "Demonstrates all mathematical operations through functions."
      }
    ],
    solution: {
      code: `# Function calculator

# Addition function
def add(a, b):
    """
    Adds two numbers
    """
    return a + b

# Subtraction function
def subtract(a, b):
    """
    Subtracts the second number from the first
    """
    return a - b

# Multiplication function
def multiply(a, b):
    """
    Multiplies two numbers
    """
    return a * b

# Division function
def divide(a, b):
    """
    Divides the first number by the second
    """
    return a / b

# Average calculation function
def average(num1, num2, num3):
    """
    Calculates the arithmetic mean of three numbers
    """
    total = num1 + num2 + num3
    return total / 3

# Enter values directly in the code (do not use input())
num1 = 10
num2 = 5
num3 = 15

# Call functions and print results
print(f"Sum of {num1} and {num2}: {add(num1, num2)}")
print(f"Difference of {num1} and {num2}: {subtract(num1, num2)}")
print(f"Product of {num1} and {num2}: {multiply(num1, num2)}")
print(f"Quotient of {num1} and {num2}: {divide(num1, num2)}")
print(f"Average of {num1}, {num2}, {num3}: {average(num1, num2, num3)}")`,
      explanation: "The solution creates five functions for mathematical operations. Each function accepts parameters, calculates a result, and returns it using return. Then the functions are called with specific values."
    },
    hints: [
      "Enter values directly in the code (num1, num2, num3) — do not use input()",
      "Each function must accept parameters and return a result via return",
      "Use return, not print(), to return a value",
      "The average function must add three numbers and divide by 3",
      "Don't forget parentheses when calling functions"
    ],
    difficulty: "beginner",
    testCases: [
      {
        expectedOutput: "Sum of 10 and 5: 15",
        description: "Checking the addition function"
      },
      {
        expectedOutput: "Average of 20, 4, 12: 12.0",
        description: "Checking the average calculation function"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a function in Python?",
        options: [
          "A block of code that performs a specific task and can be called many times",
          "A variable that stores a value",
          "An operator for comparing values",
          "A data type for storing text"
        ],
        correctAnswer: 0,
        explanation: "A function is a block of code that performs a specific task. It can be called many times without rewriting the code again."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which keyword is used to create a function?",
        options: [
          "def",
          "function",
          "create",
          "make"
        ],
        correctAnswer: 0,
        explanation: "The def keyword (short for 'define') is used to create a function in Python."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between print() and return?",
        options: [
          "print() displays on screen, return returns a value from the function",
          "print() returns a value, return displays on screen",
          "There is no difference, they do the same thing",
          "print() works only with numbers, return works only with text"
        ],
        correctAnswer: 0,
        explanation: "print() displays a value on screen but does not return it. return returns a value from the function that can be saved in a variable."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nresult = greet(\"Alex\")\nprint(result)\n```",
        options: [
          "Hello, Alex!",
          "None",
          "Error",
          "greet"
        ],
        correctAnswer: 0,
        explanation: "The greet function returns a greeting string. This value is saved in result and displayed on screen."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a function parameter?",
        options: [
          "A variable in the function definition that receives a value when called",
          "A value passed when calling the function",
          "The result of the function's work",
          "The name of the function"
        ],
        correctAnswer: 0,
        explanation: "A parameter is a variable in the function definition (for example, def add(a, b):). An argument is a value passed when calling (for example, add(5, 3))."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef add(a, b):\n    print(a + b)\n\nresult = add(5, 3)\nprint(result)\n```",
        options: [
          "8, then None",
          "8, then 8",
          "Error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "The add function uses print(), so it prints 8. But since the function has no return, it returns None, which is saved in result."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why are functions useful?",
        options: [
          "All of the listed options",
          "They help avoid repeating code",
          "They organize code into smaller parts",
          "They can be used many times"
        ],
        correctAnswer: 0,
        explanation: "Functions are useful for many reasons: they help avoid repetition, organize code, can be used many times, and make testing easier."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A function must be defined before it is called.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, Python executes code top to bottom, so a function must be defined (def) before it can be called."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
