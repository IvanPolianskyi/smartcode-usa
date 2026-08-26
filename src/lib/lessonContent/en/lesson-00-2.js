/**
 * Lesson 00-2: Variables and Data Types: int, float, str, bool
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_2 = {
  lessonId: "lesson-00-2",
  moduleId: "module-00",
  order: 2,
  title: "Variables and Data Types: int, float, str, bool",
  
  learningObjectives: [
    "Understand the concept of variables",
    "Learn the basic data types: int, float, str, bool",
    "Learn how to convert types",
    "Work with variables in programs"
  ],
  
  prerequisites: ["lesson-00-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Numbers and variables in Python",
        content: `In this lesson we will learn about numbers in Python and how to work with them.

**What we will learn:**

1. Number types in Python
2. Basic arithmetic operations
3. The difference between regular and floor division
4. Assigning variables in Python`
      },
      {
        title: "Number types",
        content: `Python has different "types" of numbers (numeric literals). We will focus on **integers** and **floating point numbers**.

**Integers (int):**
Integers are whole numbers, positive or negative. For example: 2, -2, 1000 are examples of integers.

**Floating point numbers (float):**
Floating point numbers in Python are distinguished by having a decimal point or using exponential notation (e) to define a number. For example: 2.0, -2.1 are floating point numbers. 4E2 (4 times 10 to the power of 2) is also an example of a floating point number in Python.

**Number types:**
1.
Examples: 1, 2, -5, 1000
Number type: int
2.
Examples: 1.2, -0.5, 2e2, 3E2
Number type: float

Throughout this course we will mainly work with integers or simple floating point numbers.`
      },
      {
        title: "Basic arithmetic operations",
        content: `Python can perform all basic math operations:

**Addition (+):**
\`\`\`python
2 + 1
# Result: 3
\`\`\`

**Subtraction (-):**
\`\`\`python
2 - 1
# Result: 1
\`\`\`

**Multiplication (*):**
\`\`\`python
2 * 2
# Result: 4
\`\`\`

**Division (/):**
\`\`\`python
3 / 2
# Result: 1.5
\`\`\`

**Floor division (//):**
\`\`\`python
7 // 4
# Result: 1
\`\`\`

**Important!** The \`//\` operator (two slashes) is called "floor division." It discards the decimal part without rounding and returns an integer.

**Modulo (%):**
\`\`\`python
7 % 4
# Result: 3
\`\`\`

The \`%\` (modulo) operator returns the remainder of division. 4 fits into 7 once, with a remainder of 3.

**Exponentiation (**):**
\`\`\`python
2 ** 3
# Result: 8 (2 to the power of 3)
\`\`\`

**Square root:**
\`\`\`python
4 ** 0.5
# Result: 2.0 (square root of 4)
\`\`\`

**Order of operations:**
Python follows the standard order of operations:
\`\`\`python
2 + 10 * 10 + 3
# Result: 105 (multiplication first, then addition)
\`\`\`

**Parentheses to change the order:**
\`\`\`python
(2 + 10) * (10 + 3)
# Result: 156 (parentheses first)
\`\`\``
      },
      {
        title: "Variable assignment",
        content: `Now that we have seen how to use numbers in Python like a calculator, let's look at how to assign names and create variables.

**Basic assignment:**

We use a single equals sign \`=\` to assign values to variables:

\`\`\`python
# Create a variable "a" and assign it the number 5
a = 5

# Now we can use a instead of the number 5
print(a)  # Prints: 5
print(a + a)  # Prints: 10
\`\`\`

**Reassignment:**

Python allows you to reassign variables:

\`\`\`python
a = 5
print(a)  # Prints: 5

a = 10
print(a)  # Prints: 10
\`\`\`

**Using variables in reassignment:**

\`\`\`python
a = 5
a = a + 1  # Now a = 6
print(a)  # Prints: 6
\`\`\`

**Shorthand operators:**

Python allows shorthand operators:

\`\`\`python
a = 5
a += 1  # Same as a = a + 1
print(a)  # Prints: 6

a -= 2  # Same as a = a - 2
print(a)  # Prints: 4

a *= 3  # Same as a = a * 3
print(a)  # Prints: 12

a /= 2  # Same as a = a / 2
print(a)  # Prints: 6.0
\`\`\``
      },
      {
        title: "Variable naming rules",
        content: `The names you use when creating variables must follow several rules:

**Rules:**
\`\`\`python
# Names cannot start with a number
   -  Correct: \`name1\`, \`age_2\`
   -  Incorrect: \`1name\`, \`2age\`

# Names cannot contain spaces; use _ instead
   -  Correct: \`my_name\`, \`user_age\`
   -  Incorrect: \`my name\`, \`user age\`

# Special characters are not allowed
   - Forbidden characters: \`:'",<>/?|\\()!@#$%^&*~-+\`
   -  Correct: \`user_name\`, \`total_sum\`
   -  Incorrect: \`user-name\`, \`total$sum\`

# Prefer lowercase with underscores (PEP8)
   -  Correct: \`user_name\`, \`total_count\`
   -  Incorrect: \`UserName\`, \`TotalCount\` (works, but not recommended)

# Avoid using 'l', 'O', 'I' as single-character names
   - They can be confused with '1' and '0'

# Avoid words that have special meaning in Python
   - Forbidden: \`list\`, \`str\`, \`int\`, \`float\`, \`def\`, \`class\`, etc.
\`\`\`
**Examples of good names:**
\`\`\`python
user_name = "Alexander"
user_age = 16
total_score = 100
is_student = True
\`\`\``
      },
      {
        title: "Dynamic typing",
        content: `Python uses **dynamic typing**, which means you can reassign variables to different data types. This makes Python very flexible with type assignment, unlike other languages that use **static typing**.

**Example:**

\`\`\`python
# First the variable holds a number
x = 5
print(type(x))  # <class 'int'>

# Then we can assign a string
x = "Hello"
print(type(x))  # <class 'str'>

# And then a list
x = [1, 2, 3]
print(type(x))  # <class 'list'>
\`\`\`

**Advantages of dynamic typing:**
-  Very easy to work with
-  Faster development time

**Disadvantages of dynamic typing:**
-  Can lead to unexpected errors
-  You need to be careful with data types`
      },
      {
        title: "Checking a variable's type",
        content: `You can check what type of object is assigned to a variable using Python's built-in \`type()\` function.

**Basic data types:**

\`\`\`python
# Integer (int)
age = 16
print(type(age))  # <class 'int'>

# Floating point number (float)
price = 99.99
print(type(price))  # <class 'float'>

# String (str)
name = "Alexander"
print(type(name))  # <class 'str'>

# Boolean (bool)
is_student = True
print(type(is_student))  # <class 'bool'>

# List (list)
numbers = [1, 2, 3]
print(type(numbers))  # <class 'list'>

# Dictionary (dict)
user = {"name": "Alexander", "age": 16}
print(type(user))  # <class 'dict'>
\`\`\`

**Type conversion:**

\`\`\`python
# Convert to integer
x = "5"
x_int = int(x)
print(x_int, type(x_int))  # 5 <class 'int'>

# Convert to floating point
y = "3.14"
y_float = float(y)
print(y_float, type(y_float))  # 3.14 <class 'float'>

# Convert to string
z = 42
z_str = str(z)
print(z_str, type(z_str))  # 42 <class 'str'>
\`\`\``
      },
      {
        title: "Practical example",
        content: `Let's create a simple program that demonstrates using variables:

\`\`\`python
# Program to calculate purchase cost
price_per_item = 25.50
quantity = 3
discount = 0.1  # 10% discount

# Calculate the total cost
subtotal = price_per_item * quantity
discount_amount = subtotal * discount
total = subtotal - discount_amount

# Print the result
print("Price per item:", price_per_item, "USD")
print("Quantity:", quantity)
print("Subtotal:", subtotal, "USD")
print("Discount:", discount_amount, "USD")
print("Amount due:", total, "USD")
\`\`\`

This example shows how variables make calculations more readable and easier to understand.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Arithmetic operations",
      code: `# Basic arithmetic operations
print(2 + 1)      # Addition: 3
print(2 - 1)      # Subtraction: 1
print(2 * 2)      # Multiplication: 4
print(3 / 2)      # Division: 1.5
print(7 // 4)     # Floor division: 1
print(7 % 4)      # Modulo: 3
print(2 ** 3)     # Exponentiation: 8
print(4 ** 0.5)   # Square root: 2.0`,
      explanation: "Demonstrates all the main arithmetic operations in Python."
    },
    {
      title: "Example 2: Variable assignment",
      code: `# Creating and using variables
age = 16
name = "Alexander"
score = 95.5
is_student = True

print("Name:", name)
print("Age:", age)
print("Score:", score)
print("Student:", is_student)`,
      explanation: "Shows how to create variables of different types and use them."
    },
    {
      title: "Example 3: Reassignment and shorthand operators",
      code: `# Reassignment
x = 5
print("Initial value:", x)

x = 10
print("After reassignment:", x)

# Shorthand operators
x += 5   # x = x + 5
print("After += 5:", x)

x -= 3   # x = x - 3
print("After -= 3:", x)

x *= 2   # x = x * 2
print("After *= 2:", x)

x /= 4   # x = x / 4
print("After /= 4:", x)`,
      explanation: "Demonstrates variable reassignment and shorthand operators."
    },
    {
      title: "Example 4: Checking types",
      code: `# Checking data types
age = 16
price = 99.99
name = "Alexander"
is_active = True

print("age:", age, ", type:", type(age))
print("price:", price, ", type:", type(price))
print("name:", name, ", type:", type(name))
print("is_active:", is_active, ", type:", type(is_active))`,
      explanation: "Shows how to use the type() function to determine a variable's type."
    },
    {
      title: "Example 5: Type conversion",
      code: `# Converting between types
number_str = "42"
number_int = int(number_str)
print("String '" + number_str + "' converted to number:", number_int)

float_str = "3.14"
float_num = float(float_str)
print("String '" + float_str + "' converted to float:", float_num)

number = 100
number_str = str(number)
print("Number", number, "converted to string: '" + number_str + "'")`,
      explanation: "Demonstrates conversion between different data types."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing = and ==",
      explanation: "The = operator is used for assignment, and == is used for comparison.",
      correctApproach: "Use = for assignment: x = 5. We will cover the == operator in later modules."
    },
    {
      mistake: "Invalid variable names",
      explanation: "Variable names cannot start with a number or contain spaces.",
      correctApproach: "Use valid names: user_name, age_1 (not 1age, user name)."
    },
    {
      mistake: "Confusing / and //",
      explanation: "The / operator performs regular division (returns a float), while // performs floor division.",
      correctApproach: "Use / for exact division: 7 / 4 = 1.75. Use // for floor division: 7 // 4 = 1."
    },
    {
      mistake: "Using reserved words",
      explanation: "Words like list, str, and int are reserved in Python.",
      correctApproach: "Use other names: my_list, user_str, number_int."
    }
  ],
  
  summary: `In this lesson we learned:

1. Number types — int (integers) and float (floating point)
2. Arithmetic operations — +, -, *, /, //, %, **
3. Variable assignment — using = to create variables
4. Naming rules — how to name variables correctly
5. Dynamic typing — Python allows changing variable types
6. The type() function — to determine a variable's type
7. Type conversion — int(), float(), str()

You now know the basics of working with numbers and variables in Python! Next lesson — lists.`,
  
  practiceTask: {
    title: "Personal expense calculator",
    description: "Create a program to calculate personal expenses",
    problemStatement: `Write a program that:
1. Reads the prices of three items (one number per line)
2. Calculates the total cost
3. Applies a 15% discount
4. Prints the subtotal and the final amount due

Input format:
100
50
75`,
    outputFormat: `Item 1 price: 100.0 USD
Item 2 price: 50.0 USD
Item 3 price: 75.0 USD
Subtotal: 225.0 USD
Discount (15%): 33.75 USD
Amount due: 191.25 USD`,
    examples: [
      {
        input: `100
50
75`,
        output: `Item 1 price: 100.0 USD
Item 2 price: 50.0 USD
Item 3 price: 75.0 USD
Subtotal: 225.0 USD
Discount (15%): 33.75 USD
Amount due: 191.25 USD`,
        explanation: "Subtotal 225.0, discount 15% = 33.75, amount due 191.25"
      },
      {
        input: `200
100
50`,
        output: `Item 1 price: 200.0 USD
Item 2 price: 100.0 USD
Item 3 price: 50.0 USD
Subtotal: 350.0 USD
Discount (15%): 52.5 USD
Amount due: 297.5 USD`,
        explanation: "Subtotal 350.0, discount 52.5, amount due 297.5"
      },
      {
        input: `10
20
30`,
        output: `Item 1 price: 10.0 USD
Item 2 price: 20.0 USD
Item 3 price: 30.0 USD
Subtotal: 60.0 USD
Discount (15%): 9.0 USD
Amount due: 51.0 USD`,
        explanation: "Subtotal 60.0, discount 9.0, amount due 51.0"
      }
    ],
    solution: {
      code: `# Personal expense calculator
price1 = float(input())
price2 = float(input())
price3 = float(input())

subtotal = price1 + price2 + price3
discount_amount = subtotal * 0.15
total = subtotal - discount_amount

print(f"Item 1 price: {price1} USD")
print(f"Item 2 price: {price2} USD")
print(f"Item 3 price: {price3} USD")
print(f"Subtotal: {subtotal} USD")
print(f"Discount (15%): {discount_amount} USD")
print(f"Amount due: {total} USD")`,
      explanation: "The solution reads three prices with input(), calculates the subtotal, applies a 15% discount, and prints the result."
    },
    hints: [
      "Read three prices with float(input())",
      "Use + to calculate the subtotal",
      "Discount = subtotal * 0.15",
      "Final amount = subtotal - discount",
      "Use f-strings for a consistent output format"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of the expression 7 // 4?",
        options: [
          "1.75",
          "1",
          "2",
          "3"
        ],
        correctAnswer: 1,
        explanation: "The // operator performs floor division, so 7 // 4 = 1 (without the decimal part)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of the expression 7 % 4?",
        options: [
          "1.75",
          "1",
          "3",
          "4"
        ],
        correctAnswer: 2,
        explanation: "The % operator returns the remainder of division. 7 divided by 4 is 1 with a remainder of 3."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 5\nx += 3\nprint(x)\n```",
        options: [
          "5",
          "8",
          "53",
          "An error"
        ],
        correctAnswer: 1,
        explanation: "The += operator adds a value to the variable. x += 3 is equivalent to x = x + 3, so the result is 8."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which variable name is valid?",
        options: [
          "user-name",
          "user name",
          "user_name",
          "1user"
        ],
        correctAnswer: 2,
        explanation: "Variable names cannot contain spaces, hyphens, or start with a number. The correct option is: user_name."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What type does the variable x = 3.14 have?",
        options: [
          "int",
          "float",
          "str",
          "bool"
        ],
        correctAnswer: 1,
        explanation: "Numbers with a decimal point have the float type in Python."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: 'What does this code print?\n\n```python\nx = "5"\ny = int(x)\nprint(y + 1)\n```',
        options: [
          "51",
          "6",
          "An error",
          "5"
        ],
        correctAnswer: 1,
        explanation: "First the string '5' is converted to the number 5, then 1 is added, resulting in 6."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of the expression 2 ** 3?",
        options: [
          "5",
          "6",
          "8",
          "9"
        ],
        correctAnswer: 2,
        explanation: "The ** operator performs exponentiation. 2 ** 3 = 2 * 2 * 2 = 8."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
