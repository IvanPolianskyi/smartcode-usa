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
    "Understand what functions are and why they matter",
    "Declare functions with the def keyword",
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
        content: `Functions are one of the most important tools in programming! They help you organize code, avoid repetition, and build more complex programs.

**What is a function?**

A function is a block of code that performs a specific task. You can call a function many times without rewriting the code.

**Why do we need functions?**

1. **Avoid repetition** - instead of writing the same code many times, you write it once inside a function
2. **Organize code** - functions help break a complex program into smaller, clearer parts
3. **Reuse** - once you write a function, you can use it in different places
4. **Easier testing** - you can check individual parts of the program

**Real-life example:**

Imagine you are making breakfast. Instead of describing the whole process every time ("take eggs, crack them, add salt, fry..."), you simply say: "Make scrambled eggs!" - that is a function!

**In Python we already use functions:**

\`\`\`python
# We have already used all of these functions:
print("Hello!")           # the print() function
len("Python")              # the len() function
input("Enter a number: ")   # the input() function
\`\`\`

Now we will learn to create our own functions!`
      },
      {
        title: "Function syntax: the def keyword",
        content: `To create a function in Python, use the keyword \`def\` (short for "define").

**Basic syntax:**

\`\`\`python
def function_name():
    """
    Function documentation (docstring)
    Describes what the function does
    """
    # Function body
    # All lines must be indented
\`\`\`

**Important rules:**

1. **def** - the keyword for creating a function
2. **Function name** - should be descriptive (for example, \`calculate_sum\`, not \`f\`)
3. **Parentheses ()** - required, even if the function takes no parameters
4. **Colon :** - required after the parentheses
5. **Indentation** - all code inside the function must be indented (usually 4 spaces)
6. **Docstring** - a description of the function (optional, but very useful)

**First function:**

\`\`\`python
def say_hello():
    """
    Function that prints a greeting
    """
    print("Hello, world!")

# Call the function
say_hello()  # Prints: Hello, world!
\`\`\`

**Watch out!** Do not forget the parentheses when calling a function:
- \`say_hello()\` - correct (calls the function)
- \`say_hello\` - incorrect (just a reference to the function; does not call it)`
      },
      {
        title: "Calling a function",
        content: `After you create a function, you need to **call** it so that it runs.

**How to call a function:**

Simply write the function name with parentheses:

\`\`\`python
def say_hello():
    print("Hello!")

# Call the function
say_hello()  # Prints: Hello!
say_hello()  # You can call it many times
say_hello()  # Prints: Hello! (each time)
\`\`\`

**Order of execution:**

1. Python first **defines** the function (reads the code from \`def\` to the end of the function)
2. Then, when it meets a **call**, it runs the code inside the function

\`\`\`python
# Step 1: Define the function
def greet():
    print("Welcome!")

# Step 2: Call the function
greet()  # Now the code inside the function runs
\`\`\`

**Important:** A function must be defined **before** it is called!`
      },
      {
        title: "Functions with parameters",
        content: `Functions can take **parameters** (arguments) - values passed into the function to work with.

**Syntax of a function with parameters:**

\`\`\`python
def function_name(parameter1, parameter2):
    # Use the parameters
    # function body
\`\`\`

**Example: greeting function with a name**

\`\`\`python
def greet(name):
    """
    Greets the user by name
    """
    print(f"Hello, {name}!")

# Call with an argument
greet("Alexander")  # Prints: Hello, Alexander!
greet("Maria")      # Prints: Hello, Maria!
\`\`\`

**Example: addition function**

\`\`\`python
def add_numbers(a, b):
    """
    Adds two numbers
    """
    result = a + b
    print(f"{a} + {b} = {result}")

# Call the function
add_numbers(5, 3)    # Prints: 5 + 3 = 8
add_numbers(10, 20) # Prints: 10 + 20 = 30
\`\`\`

**Parameters vs Arguments:**

- **Parameters** - variables in the function definition (\`def add_numbers(a, b):\`)
- **Arguments** - values passed when calling (\`add_numbers(5, 3)\`)

In this example:
- \`a\` and \`b\` are parameters
- \`5\` and \`3\` are arguments`
      },
      {
        title: "print() vs return: an important difference",
        content: `This is one of the most important topics! Many beginners confuse \`print()\` and \`return\`.

**print() - displays on the screen:**

\`\`\`python
def print_result(num1, num2):
    result = num1 + num2
    print(result)  # Only prints to the screen

# Call the function
print_result(5, 3)  # Prints: 8

# But the result CANNOT be saved!
total = print_result(5, 3)  # total will be None!
print(total)  # Prints: None
\`\`\`

**return - returns a value:**

\`\`\`python
def calculate_sum(num1, num2):
    result = num1 + num2
    return result  # Returns the value

# Call the function
calculate_sum(5, 3)  # Returns 8, but prints nothing

# Now the result CAN be saved!
total = calculate_sum(5, 3)
print(total)  # Prints: 8

# You can use it in other calculations
double = calculate_sum(5, 3) * 2
print(double)  # Prints: 16
\`\`\`

**Key difference:**

| print() | return |
|---------|--------|
| Displays a value on the screen | Returns a value from the function |
| You cannot save the result | You can save the result |
| Used for display | Used for calculations |

**When to use which:**

- **print()** - when you just need to show something to the user
- **return** - when you need a result for further work

**Example of both approaches:**

\`\`\`python
# Function with print() - only displays
def show_sum(a, b):
    print(a + b)

# Function with return - returns a value
def get_sum(a, b):
    return a + b

# Usage
show_sum(5, 3)        # Prints: 8
result = get_sum(5, 3)  # Saves 8 in a variable
print(result)         # Prints: 8
\`\`\``
      },
      {
        title: "Practical function examples",
        content: `Let's look at several practical function examples:

**Example 1: Check if a number is even**

\`\`\`python
def is_even(number):
    """
    Checks whether a number is even
    Returns True if even, False otherwise
    """
    return number % 2 == 0

# Usage
print(is_even(4))   # True
print(is_even(5))   # False
print(is_even(10))  # True
\`\`\`

**Example 2: Rectangle area**

\`\`\`python
def rectangle_area(width, height):
    """
    Calculates the area of a rectangle
    """
    area = width * height
    return area

# Usage
area1 = rectangle_area(5, 3)
print(f"Rectangle area: {area1}")  # Prints: Rectangle area: 15

area2 = rectangle_area(10, 7)
print(f"Rectangle area: {area2}")  # Prints: Rectangle area: 70
\`\`\`

**Example 3: Format a name**

\`\`\`python
def format_name(first_name, last_name):
    """
    Formats a full name
    """
    full_name = f"{first_name} {last_name}"
    return full_name.title()  # Capitalize each word

# Usage
name1 = format_name("alexander", "petrenko")
print(name1)  # Prints: Alexander Petrenko

name2 = format_name("maria", "ivanenko")
print(name2)  # Prints: Maria Ivanenko
\`\`\`

**Example 4: Average of three numbers**

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
print(f"Average value: {avg1}")  # Prints: Average value: 20.0

avg2 = average(5, 15, 25)
print(f"Average value: {avg2}")  # Prints: Average value: 15.0
\`\`\``
      },
      {
        title: "Functions working together",
        content: `Functions can use the results of other functions! That is a powerful capability.

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
    sum_result = add(x, y)  # Call add
    total = multiply(sum_result, z)  # Call multiply
    return total

# Usage
result = calculate_total(2, 3, 4)
print(result)  # Prints: 20
# Explanation: (2 + 3) * 4 = 5 * 4 = 20
\`\`\`

**Example: more complex interaction**

\`\`\`python
def square(number):
    """Squares a number"""
    return number ** 2

def is_positive(number):
    """Checks whether a number is positive"""
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
print(process_number(5))   # Prints: 25 (5 > 0, so 5² = 25)
print(process_number(-3))  # Prints: 0 (-3 is not positive)
print(process_number(4))   # Prints: 16 (4 > 0, so 4² = 16)
\`\`\`

**Benefits of this approach:**

1. **Modularity** - each function does one job
2. **Readability** - the code is easier to understand
3. **Reuse** - functions can be used in different places
4. **Testing** - it is easier to check individual parts`
      },
      {
        title: "Summary",
        content: `In this lesson we learned the basics of functions:

**Key concepts:**

1. **def** - the keyword for creating a function
2. **Parameters** - variables in the function definition
3. **Arguments** - values passed when calling
4. **print()** - displays on the screen, does not return a value
5. **return** - returns a value from the function
6. **Function call** - running the function code with \`function_name()\`

**Rules:**

- A function must be defined before it is called
- Do not forget parentheses when calling a function
- Use \`return\` when you need a result
- Give functions descriptive names
- Add a docstring to describe the function

**Next step:**

In the next lesson we will learn more about parameters, \`return\`, and the special value \`None\`.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Simple function without parameters",
      code: `def say_hello():
    """
    Function that prints a greeting
    """
    print("Hello, world!")

# Call the function
say_hello()`,
      explanation: "This is the simplest function. It takes no parameters and just prints text."
    },
    {
      title: "Function with one parameter",
      code: `def greet(name):
    """
    Greets the user by name
    """
    print(f"Hello, {name}!")

# Call with different arguments
greet("Alexander")
greet("Maria")`,
      explanation: "The function takes one parameter name and uses it to build a greeting."
    },
    {
      title: "Function with return",
      code: `def add_numbers(a, b):
    """
    Adds two numbers and returns the result
    """
    result = a + b
    return result

# Call and save the result
sum_result = add_numbers(5, 3)
print(f"Sum: {sum_result}")`,
      explanation: "The function uses return so the result can be saved in a variable."
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
show_sum(5, 3)        # Prints: 8
result = get_sum(5, 3)  # Saves 8
print(f"Result: {result}")`,
      explanation: "Shows the difference between print() (displays) and return (returns a value)."
    },
    {
      title: "Even-number check",
      code: `def is_even(number):
    """
    Checks whether a number is even
    """
    return number % 2 == 0

# Usage
print(is_even(4))   # True
print(is_even(5))   # False`,
      explanation: "The function uses the % operator (remainder) to check whether a number is even."
    },
    {
      title: "Functions working together",
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
print(result)  # Prints: 49 because (3+4)² = 7² = 49`,
      explanation: "Shows how functions can use the results of other functions."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting parentheses when calling a function",
      explanation: "Many beginners forget parentheses when calling a function.",
      correctApproach: `# Incorrect:
greet  # This is just a reference; it does not call the function

# Correct:
greet()  # Calls the function`
    },
    {
      mistake: "Confusing print() and return",
      explanation: "Beginners often use print() instead of return when they need to return a value.",
      correctApproach: `# Incorrect (if you need to save the result):
def add(a, b):
    print(a + b)  # You cannot save the result

# Correct:
def add(a, b):
    return a + b  # You can save the result`
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
      explanation: "Python runs code top to bottom, so a function must be defined before it is called.",
      correctApproach: `# Incorrect:
greet()  # Error! The function is not defined yet

def greet():
    print("Hello!")

# Correct:
def greet():
    print("Hello!")

greet()  # Now the function is already defined`
    }
  ],
  
  summary: `In this lesson we learned the basics of functions:

1. What functions are - blocks of code that perform a specific task
2. def syntax - how to create functions with the def keyword
3. Parameters and arguments - how to pass data into functions
4. print() vs return - the important difference between displaying and returning values
5. Calling functions - how to use the functions you create
6. Functions working together - how functions can use other functions

Functions are the foundation of organizing code in Python. They help you write cleaner, clearer, and more reusable code.`,
  
  practiceTask: {
    title: "Function calculator",
    description: "Create a set of functions for mathematical operations",
    problemStatement: `Write a program with these functions:
1. add(a, b) - addition
2. subtract(a, b) - subtraction
3. multiply(a, b) - multiplication
4. divide(a, b) - division
5. average(num1, num2, num3) - arithmetic mean of three numbers

Each function must take parameters, return a result with return, and have a docstring.

Read three numbers num1, num2, num3 from input and call all functions.

Input format:
10
5
15`,
    outputFormat: `Sum of 10 and 5: 15
Difference of 10 and 5: 5
Product of 10 and 5: 50
Quotient of 10 and 5: 2.0
Average of 10, 5, 15: 10.0`,
    examples: [
      {
        input: `10
5
15`,
        output: `Sum of 10 and 5: 15
Difference of 10 and 5: 5
Product of 10 and 5: 50
Quotient of 10 and 5: 2.0
Average of 10, 5, 15: 10.0`,
        explanation: "Basic operations for 10, 5 and the average with 15"
      },
      {
        input: `20
4
12`,
        output: `Sum of 20 and 4: 24
Difference of 20 and 4: 16
Product of 20 and 4: 80
Quotient of 20 and 4: 5.0
Average of 20, 4, 12: 12.0`,
        explanation: "Average (20+4+12)/3 = 12.0"
      },
      {
        input: `9
3
6`,
        output: `Sum of 9 and 3: 12
Difference of 9 and 3: 6
Product of 9 and 3: 27
Quotient of 9 and 3: 3.0
Average of 9, 3, 6: 6.0`,
        explanation: "Division 9/3 = 3.0, average 6.0"
      }
    ],
    solution: {
      code: `def add(a, b):
    """Adds two numbers"""
    return a + b

def subtract(a, b):
    """Subtracts the second number from the first"""
    return a - b

def multiply(a, b):
    """Multiplies two numbers"""
    return a * b

def divide(a, b):
    """Divides the first number by the second"""
    return a / b

def average(num1, num2, num3):
    """Calculates the arithmetic mean of three numbers"""
    return (num1 + num2 + num3) / 3

num1 = int(input())
num2 = int(input())
num3 = int(input())

print(f"Sum of {num1} and {num2}: {add(num1, num2)}")
print(f"Difference of {num1} and {num2}: {subtract(num1, num2)}")
print(f"Product of {num1} and {num2}: {multiply(num1, num2)}")
print(f"Quotient of {num1} and {num2}: {divide(num1, num2)}")
print(f"Average of {num1}, {num2}, {num3}: {average(num1, num2, num3)}")`,
      explanation: "Declare five functions with return, read three numbers from stdin, and print the results of the calls."
    },
    hints: [
      "Define the functions with return first, then read input()",
      "num1 = int(input()), num2 = int(input()), num3 = int(input())",
      "The average function adds three numbers and divides by 3",
      "Do not forget parentheses when calling functions"
    ],
    difficulty: "beginner"
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
        explanation: "A function is a block of code that performs a specific task. You can call it many times without rewriting the code."
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
        explanation: "The keyword def (short for 'define') is used to create a function in Python."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between print() and return?",
        options: [
          "print() displays on the screen, return returns a value from the function",
          "print() returns a value, return displays on the screen",
          "There is no difference; they do the same thing",
          "print() works only with numbers, return only with text"
        ],
        correctAnswer: 0,
        explanation: "print() displays a value on the screen but does not return it. return returns a value from the function that you can save in a variable."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nresult = greet(\"Alexander\")\nprint(result)\n```",
        options: [
          "Hello, Alexander!",
          "None",
          "Error",
          "greet"
        ],
        correctAnswer: 0,
        explanation: "The greet function returns a greeting string. That value is stored in result and printed."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a function parameter?",
        options: [
          "A variable in the function definition that receives a value when called",
          "A value passed when calling the function",
          "The result of the function",
          "The name of the function"
        ],
        correctAnswer: 0,
        explanation: "A parameter is a variable in the function definition (for example, def add(a, b):). An argument is the value passed when calling (for example, add(5, 3))."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndef add(a, b):\n    print(a + b)\n\nresult = add(5, 3)\nprint(result)\n```",
        options: [
          "8, then None",
          "8, then 8",
          "Error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "The add function uses print(), so it prints 8. Because the function has no return, it returns None, which is stored in result."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why are functions useful?",
        options: [
          "All of the above",
          "They help avoid repeating code",
          "They organize code into smaller parts",
          "They can be used many times"
        ],
        correctAnswer: 0,
        explanation: "Functions are useful for many reasons: they avoid repetition, organize code, can be reused, and make testing easier."
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
        explanation: "Yes - Python runs code top to bottom, so a function must be defined (def) before you call it."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
