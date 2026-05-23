/**
 * Lesson 00-2: Variables and data types: int, float, str, bool
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_2 = {
  lessonId: "lesson-00-2",
  moduleId: "module-00",
  order: 2,
  title: "Variables and data types: int, float, str, bool",
  
  learningObjectives: [
    "Understand the concept of variables",
    "Learn basic data types: int, float, str, bool",
    "Convert between types",
    "Use variables in programs"
  ],
  
  prerequisites: ["lesson-00-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Numbers and variables in Python",
        content: `In this lesson we learn about numbers in Python and how to work with them.

**What we will cover:**

1. Number types in Python
2. Basic arithmetic operations
3. Regular vs integer division
4. Variable assignment in Python`
      },
      {
        title: "Number types",
        content: `Python has different "types" of numbers (numeric literals). We focus on **integers** and **floating point numbers**.

**Integers (int):**
Whole numbers, positive or negative. Examples: 2, -2, 1000.

**Floating point (float):**
Numbers with a decimal point or exponential notation (e). Examples: 2.0, -2.1, 4E2 (4 × 10²).

**Number types:**
1. Examples: 1, 2, -5, 1000 — type: int
2. Examples: 1.2, -0.5, 2e2, 3E2 — type: float

Throughout this course we mainly work with integers or simple floats.`
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

**Note:** \`//\` is floor division — it drops the decimal part without rounding and returns an integer.

**Modulo (%):**
\`\`\`python
7 % 4
# Result: 3
\`\`\`

\`%\` returns the remainder. 4 fits into 7 once with remainder 3.

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
\`\`\`python
2 + 10 * 10 + 3
# Result: 105 (multiplication first)
\`\`\`

**Parentheses:**
\`\`\`python
(2 + 10) * (10 + 3)
# Result: 156
\`\`\``
      },
      {
        title: "Variable assignment",
        content: `After using numbers as a calculator, let's assign names and create variables.

**Basic assignment:**

We use a single \`=\` to assign values:

\`\`\`python
a = 5
print(a)      # 5
print(a + a)  # 10
\`\`\`

**Reassignment:**

\`\`\`python
a = 5
print(a)  # 5
a = 10
print(a)  # 10
\`\`\`

**Using the variable in reassignment:**

\`\`\`python
a = 5
a = a + 1
print(a)  # 6
\`\`\`

**Augmented assignment:**

\`\`\`python
a = 5
a += 1
print(a)  # 6

a -= 2
print(a)  # 4

a *= 3
print(a)  # 12

a /= 2
print(a)  # 6.0
\`\`\``
      },
      {
        title: "Variable naming rules",
        content: `Variable names must follow these rules:

**Rules:**
\`\`\`python
# Cannot start with a digit
   -  OK: name1, age_2
   -  Not OK: 1name, 2age

# No spaces — use _
   -  OK: my_name, user_age
   -  Not OK: my name, user age

# No special characters in names
   - Forbidden: :'",<>/?|\\()!@#$%^&*~-+
   -  OK: user_name, total_sum

# Prefer lowercase_with_underscores (PEP8)
   -  OK: user_name, total_count

# Avoid single-letter l, O, I (confused with 1 and 0)

# Avoid reserved words: list, str, int, float, def, class, etc.
\`\`\`

**Good examples:**
\`\`\`python
user_name = "Alex"
user_age = 16
total_score = 100
is_student = True
\`\`\``
      },
      {
        title: "Dynamic typing",
        content: `Python uses **dynamic typing** — you can reassign variables to different types. This is flexible compared to **static typing** in some other languages.

\`\`\`python
x = 5
print(type(x))  # <class 'int'>

x = "Hello"
print(type(x))  # <class 'str'>

x = [1, 2, 3]
print(type(x))  # <class 'list'>
\`\`\`

**Pros:** easy to use, faster development  
**Cons:** unexpected type errors if you are not careful`
      },
      {
        title: "Checking variable types",
        content: `Use the built-in \`type()\` function:

\`\`\`python
age = 16
print(type(age))  # <class 'int'>

price = 99.99
print(type(price))  # <class 'float'>

name = "Alex"
print(type(name))  # <class 'str'>

is_student = True
print(type(is_student))  # <class 'bool'>

numbers = [1, 2, 3]
print(type(numbers))  # <class 'list'>

user = {"name": "Alex", "age": 16}
print(type(user))  # <class 'dict'>
\`\`\`

**Type conversion:**

\`\`\`python
x = "5"
x_int = int(x)
print(x_int, type(x_int))  # 5 <class 'int'>

y = "3.14"
y_float = float(y)
print(y_float, type(y_float))  # 3.14 <class 'float'>

z = 42
z_str = str(z)
print(z_str, type(z_str))  # 42 <class 'str'>
\`\`\``
      },
      {
        title: "Practical example",
        content: `A simple program using variables:

\`\`\`python
price_per_item = 25.50
quantity = 3
discount = 0.1

subtotal = price_per_item * quantity
discount_amount = subtotal * discount
total = subtotal - discount_amount

print("Price per item:", price_per_item)
print("Quantity:", quantity)
print("Subtotal:", subtotal)
print("Discount:", discount_amount)
print("Total:", total)
\`\`\`

Variables make calculations clearer and easier to read.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Arithmetic operations",
      code: `print(2 + 1)
print(2 - 1)
print(2 * 2)
print(3 / 2)
print(7 // 4)
print(7 % 4)
print(2 ** 3)
print(4 ** 0.5)`,
      explanation: "Demonstrates basic arithmetic in Python."
    },
    {
      title: "Example 2: Variable assignment",
      code: `age = 16
name = "Alex"
score = 95.5
is_student = True

print("Name:", name)
print("Age:", age)
print("Score:", score)
print("Student:", is_student)`,
      explanation: "Creating variables of different types and using them."
    },
    {
      title: "Example 3: Reassignment and augmented operators",
      code: `x = 5
print("Initial:", x)
x = 10
print("After reassignment:", x)
x += 5
print("After += 5:", x)
x -= 3
print("After -= 3:", x)
x *= 2
print("After *= 2:", x)
x /= 4
print("After /= 4:", x)`,
      explanation: "Reassignment and +=, -=, *=, /= operators."
    },
    {
      title: "Example 4: Checking types",
      code: `age = 16
price = 99.99
name = "Alex"
is_active = True

print("age:", age, ", type:", type(age))
print("price:", price, ", type:", type(price))
print("name:", name, ", type:", type(name))
print("is_active:", is_active, ", type:", type(is_active))`,
      explanation: "Using type() to inspect variable types."
    },
    {
      title: "Example 5: Type conversion",
      code: `number_str = "42"
number_int = int(number_str)
print("String converted to int:", number_int)

float_str = "3.14"
float_num = float(float_str)
print("String converted to float:", float_num)

number = 100
number_str = str(number)
print("Number as string:", number_str)`,
      explanation: "Converting between str, int, and float."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing = and ==",
      explanation: "= is assignment; == is comparison (covered later).",
      correctApproach: "Use = for assignment: x = 5."
    },
    {
      mistake: "Invalid variable names",
      explanation: "Names cannot start with a digit or contain spaces.",
      correctApproach: "Use user_name, age_1 — not 1age or user name."
    },
    {
      mistake: "Confusing / and //",
      explanation: "/ returns float; // returns integer division.",
      correctApproach: "7 / 4 = 1.75; 7 // 4 = 1."
    },
    {
      mistake: "Using reserved words",
      explanation: "Words like list, str, int are reserved.",
      correctApproach: "Use my_list, user_str, number_int instead."
    }
  ],
  
  summary: `In this lesson we covered:

1. Number types — int and float
2. Arithmetic — +, -, *, /, //, %, **
3. Variable assignment with =
4. Naming rules
5. Dynamic typing
6. type() function
7. Type conversion — int(), float(), str()

Next lesson — lists.`,
  
  practiceTask: {
    title: "Personal expense calculator",
    description: "Build a program to calculate personal expenses",
    problemStatement: `Write a program that:
1. Stores prices of three items in variables
2. Computes the subtotal
3. Applies a 15% discount
4. Prints subtotal and final amount`,
    outputFormat: `Example output:
Item 1 price: 100.0
Item 2 price: 50.0
Item 3 price: 75.0
Subtotal: 225.0
Discount (15%): 33.75
Total: 191.25`,
    examples: [
      {
        output: `Item 1 price: 100.0
Item 2 price: 50.0
Item 3 price: 75.0
Subtotal: 225.0
Discount (15%): 33.75
Total: 191.25`,
        explanation: "The program sums prices, applies discount, and prints results"
      }
    ],
    solution: {
      code: `price1 = 100.0
price2 = 50.0
price3 = 75.0

subtotal = price1 + price2 + price3
discount_percent = 0.15
discount_amount = subtotal * discount_percent
total = subtotal - discount_amount

print("Item 1 price:", price1)
print("Item 2 price:", price2)
print("Item 3 price:", price3)
print("Subtotal:", subtotal)
print("Discount (15%):", discount_amount)
print("Total:", total)`,
      explanation: "Variables store prices; arithmetic computes subtotal, discount, and total."
    },
    hints: [
      "Create three variables for item prices",
      "Use + for the subtotal",
      "Discount = subtotal * 0.15",
      "Total = subtotal - discount",
      "Use print() with multiple arguments"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of 7 // 4?",
        options: ["1.75", "1", "2", "3"],
        correctAnswer: 1,
        explanation: "// is floor division, so 7 // 4 = 1."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of 7 % 4?",
        options: ["1.75", "1", "3", "4"],
        correctAnswer: 2,
        explanation: "% is the remainder: 7 ÷ 4 leaves remainder 3."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 5\nx += 3\nprint(x)\n```",
        options: ["5", "8", "53", "An error"],
        correctAnswer: 1,
        explanation: "x += 3 is the same as x = x + 3, so the result is 8."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which variable name is valid?",
        options: ["user-name", "user name", "user_name", "1user"],
        correctAnswer: 2,
        explanation: "Names cannot have spaces, hyphens, or start with a digit."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What type does x = 3.14 have?",
        options: ["int", "float", "str", "bool"],
        correctAnswer: 1,
        explanation: "Numbers with a decimal point are float."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: 'What does this print?\n\n```python\nx = "5"\ny = int(x)\nprint(y + 1)\n```',
        options: ["51", "6", "An error", "5"],
        correctAnswer: 1,
        explanation: "'5' becomes int 5, then + 1 gives 6."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the result of 2 ** 3?",
        options: ["5", "6", "8", "9"],
        correctAnswer: 2,
        explanation: "** is exponentiation: 2³ = 8."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
