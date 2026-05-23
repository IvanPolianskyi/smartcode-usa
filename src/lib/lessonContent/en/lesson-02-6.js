/**
 * Lesson 02-6: List comprehensions and list generators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_6 = {
  lessonId: "lesson-02-6",
  moduleId: "module-02",
  order: 6,
  title: "List comprehensions and list generators",
  
  learningObjectives: [
    "Create list comprehensions",
    "Use conditional comprehensions",
    "Work with nested list comprehensions",
    "Optimize code using comprehensions"
  ],
  
  prerequisites: ["lesson-02-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is a list comprehension?",
        content: `**List comprehension** is a compact way to create lists in Python.

**Traditional approach (with a loop):**
\`\`\`python
squares = []
for x in range(5):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`

**With list comprehension:**
\`\`\`python
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`

**Advantages:**
- Shorter and more readable code
- Faster than a regular loop
- More "pythonic" style

**Syntax:**
\`\`\`python
[expression for element in sequence]
\`\`\`

**How it works:**
1. Each element is taken from the sequence
2. The expression is applied
3. The result is added to the list`
      },
      {
        title: "Basic examples",
        content: `**Example 1: Squares of numbers**
\`\`\`python
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

**Example 2: Doubling numbers**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print(doubled)  # [2, 4, 6, 8, 10]
\`\`\`

**Example 3: Uppercase letters**
\`\`\`python
words = ["hello", "world", "python"]
uppercase = [word.upper() for word in words]
print(uppercase)  # ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

**Example 4: Word lengths**
\`\`\`python
words = ["apple", "banana", "cherry"]
lengths = [len(word) for word in words]
print(lengths)  # [5, 6, 6]
\`\`\``
      },
      {
        title: "List comprehension with conditions (if)",
        content: `You can add a condition to filter elements.

**Syntax:**
\`\`\`python
[expression for element in sequence if condition]
\`\`\`

**Example 1: Only even numbers**
\`\`\`python
even_numbers = [x for x in range(10) if x % 2 == 0]
print(even_numbers)  # [0, 2, 4, 6, 8]
\`\`\`

**Equivalent loop:**
\`\`\`python
even_numbers = []
for x in range(10):
    if x % 2 == 0:
        even_numbers.append(x)
\`\`\`

**Example 2: Words longer than 5 characters**
\`\`\`python
words = ["apple", "banana", "cat", "dog", "elephant"]
long_words = [word for word in words if len(word) > 5]
print(long_words)  # ['banana', 'elephant']
\`\`\`

**Example 3: Positive numbers**
\`\`\`python
numbers = [-5, -2, 0, 3, 7, -1, 9]
positive = [x for x in numbers if x > 0]
print(positive)  # [3, 7, 9]
\`\`\``
      },
      {
        title: "List comprehension with if-else",
        content: `You can use a ternary operator for a conditional expression.

**Syntax:**
\`\`\`python
[expr1 if condition else expr2 for element in sequence]
\`\`\`

**Example 1: Even/odd labels**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
labels = ["even" if x % 2 == 0 else "odd" for x in numbers]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd', 'even']
\`\`\`

**Example 2: Absolute values**
\`\`\`python
numbers = [-5, -2, 0, 3, 7]
abs_values = [x if x >= 0 else -x for x in numbers]
print(abs_values)  # [5, 2, 0, 3, 7]
\`\`\`

**Example 3: Grades**
\`\`\`python
scores = [85, 92, 78, 96, 65]
grades = ["Excellent" if s >= 90 else "Good" if s >= 70 else "Needs improvement" for s in scores]
print(grades)
\`\`\``
      },
      {
        title: "Nested list comprehensions",
        content: `You can use nested comprehensions for more complex structures.

**Example 1: Multiplication table**
\`\`\`python
multiplication_table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(multiplication_table)
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
\`\`\`

**Equivalent code:**
\`\`\`python
multiplication_table = []
for i in range(1, 4):
    row = []
    for j in range(1, 4):
        row.append(i * j)
    multiplication_table.append(row)
\`\`\`

**Example 2: Flattening a structure**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [element for row in matrix for element in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

**Example 3: Filtering nested structures**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
even = [element for row in matrix for element in row if element % 2 == 0]
print(even)  # [2, 4, 6, 8]
\`\`\``
      },
      {
        title: "Comparison with loops",
        content: `**When to use list comprehension:**
- For simple list creation
- For filtering and transforming
- When code should be compact

**When to use regular loops:**
- For complex operations
- When side effects are needed (print, break, continue)
- When code should be more readable

**Example: Complex operations**
\`\`\`python
# List comprehension - poor for complex operations
result = [complex_function(x) for x in data if condition(x) and another_condition(x)]

# Regular loop - better for complex operations
result = []
for x in data:
    if condition(x) and another_condition(x):
        result.append(complex_function(x))
\`\`\`

**Rule:** If a list comprehension becomes hard to read, use a regular loop!`
      },
      {
        title: "Practical examples",
        content: `**Example 1: Squares of even numbers**
\`\`\`python
squares_of_evens = [x ** 2 for x in range(10) if x % 2 == 0]
print(squares_of_evens)  # [0, 4, 16, 36, 64]
\`\`\`

**Example 2: First letters of words**
\`\`\`python
words = ["apple", "banana", "cherry"]
first_letters = [word[0] for word in words]
print(first_letters)  # ['a', 'b', 'c']
\`\`\`

**Example 3: Type conversion**
\`\`\`python
strings = ["1", "2", "3", "4", "5"]
numbers = [int(s) for s in strings]
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

**Example 4: Unique elements (with a condition)**
\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4, 5]
unique = [x for i, x in enumerate(numbers) if x not in numbers[:i]]
print(unique)  # [1, 2, 3, 4, 5]
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Basic list comprehension",
      code: `# Squares of numbers from 0 to 9
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`,
      explanation: "Demonstrates basic list comprehension syntax for creating a list of squares."
    },
    {
      title: "Example 2: With a condition (if)",
      code: `# Only even numbers
even = [x for x in range(10) if x % 2 == 0]
print(even)  # [0, 2, 4, 6, 8]`,
      explanation: "Shows using if to filter elements in a list comprehension."
    },
    {
      title: "Example 3: With if-else",
      code: `# Even/odd labels
numbers = [1, 2, 3, 4, 5]
labels = ["even" if x % 2 == 0 else "odd" for x in numbers]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd']`,
      explanation: "Demonstrates using a ternary operator in a list comprehension."
    },
    {
      title: "Example 4: Nested list comprehension",
      code: `# 3x3 multiplication table
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(table)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`,
      explanation: "Shows how to create two-dimensional structures using nested comprehensions."
    },
    {
      title: "Example 5: String transformation",
      code: `# Uppercase with filtering
words = ["apple", "banana", "cat", "dog"]
long_uppercase = [word.upper() for word in words if len(word) > 3]
print(long_uppercase)  # ['APPLE', 'BANANA']`,
      explanation: "Demonstrates combining transformation and filtering in one comprehension."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Wrong order of if-else",
      explanation: "In a list comprehension, if-else must come before for, not after.",
      correctApproach: "[expr1 if condition else expr2 for element in sequence]"
    },
    {
      mistake: "Overly complex comprehensions",
      explanation: "If a list comprehension becomes hard to read, a regular loop is better.",
      correctApproach: "Use list comprehension for simple operations; use a loop for complex ones"
    },
    {
      mistake: "Confusion with nested comprehensions",
      explanation: "The order of nested comprehensions should match the order of nested loops.",
      correctApproach: "Read left to right: [inner for ... outer for]"
    },
    {
      mistake: "Using break/continue",
      explanation: "You cannot use break or continue in a list comprehension.",
      correctApproach: "Use a regular loop for break/continue"
    }
  ],
  
  summary: `In this lesson we learned:

1. List comprehension — a compact way to create lists
2. Basic syntax — [expression for element in sequence]
3. With a condition (if) — filtering elements
4. With if-else — conditional expressions
5. Nested comprehensions — for complex structures
6. Comparison with loops — when to use which
7. Practical uses — transformation, filtering, creating structures

Now you can create lists efficiently and elegantly!

Next lesson — practice with algorithmic problems!`,
  
  practiceTask: {
    title: "Processing student grades",
    description: "Create a program to process student grades using list comprehensions",
    problemStatement: `Write a program that:
1. Has a list of grades: grades = [85, 92, 78, 96, 65, 88, 75, 90, 55, 87]
2. Uses list comprehensions to:
   - Create a list of squared grades
   - Filter grades >= 70 (passing only)
   - Create a list of labels: "Excellent" (>=90), "Good" (70-89), "Needs improvement" (<70)
   - Find grades in the range 80-90
3. Print all results`,
    outputFormat: `Example output:
Squared grades: [7225, 8464, 6084, 9216, 4225, 7744, 5625, 8100, 3025, 7569]
Passing grades: [85, 92, 78, 96, 88, 75, 90, 87]
Labels: ['Good', 'Excellent', 'Good', 'Excellent', 'Needs improvement', 'Good', 'Good', 'Excellent', 'Needs improvement', 'Good']
Grades 80-90: [85, 88, 90, 87]`,
    examples: [
      {
        output: `Squared grades: [7225, 8464, 6084, 9216, 4225, 7744, 5625, 8100, 3025, 7569]
Passing grades: [85, 92, 78, 96, 88, 75, 90, 87]
Labels: ['Good', 'Excellent', 'Good', 'Excellent', 'Needs improvement', 'Good', 'Good', 'Excellent', 'Needs improvement', 'Good']
Grades 80-90: [85, 88, 90, 87]`,
        explanation: "The program uses different types of list comprehensions to process data"
      }
    ],
    solution: {
      code: `# Processing student grades
grades = [85, 92, 78, 96, 65, 88, 75, 90, 55, 87]

# Squared grades
squares = [g ** 2 for g in grades]
print(f"Squared grades: {squares}")

# Passing grades (>= 70)
passing = [g for g in grades if g >= 70]
print(f"Passing grades: {passing}")

# Labels
labels = ["Excellent" if g >= 90 else "Good" if g >= 70 else "Needs improvement" for g in grades]
print(f"Labels: {labels}")

# Grades in the range 80-90
in_range = [g for g in grades if 80 <= g <= 90]
print(f"Grades 80-90: {in_range}")`,
      explanation: "The solution uses different types of list comprehensions: basic, with if, with if-else, and with a range."
    },
    hints: [
      "Use [g ** 2 for g in grades] for squares",
      "Use [g for g in grades if g >= 70] for filtering",
      "Use a ternary operator for labels: 'A' if condition else 'B' if condition2 else 'C'",
      "Use [g for g in grades if 80 <= g <= 90] for the range",
      "Remember the correct order: expression if condition else expression2 for element in sequence"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code create?\n\n```python\nsquares = [x ** 2 for x in range(5)]\n```",
        options: [
          "[0, 1, 4, 9, 16]",
          "[1, 4, 9, 16, 25]",
          "[0, 1, 2, 3, 4]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "range(5) gives 0,1,2,3,4; squares: 0,1,4,9,16."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code create?\n\n```python\neven = [x for x in range(10) if x % 2 == 0]\n```",
        options: [
          "[0, 2, 4, 6, 8]",
          "[1, 3, 5, 7, 9]",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "if x % 2 == 0 filters only even numbers: 0,2,4,6,8."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code create?\n\n```python\nlabels = [\"even\" if x % 2 == 0 else \"odd\" for x in [1, 2, 3]]\n```",
        options: [
          "['odd', 'even', 'odd']",
          "['even', 'odd', 'even']",
          "[1, 2, 3]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "1 is odd, 2 is even, 3 is odd."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the correct syntax for a list comprehension with a condition?",
        options: [
          "[expression for element in sequence if condition]",
          "[expression if condition for element in sequence]",
          "[for element in sequence if condition expression]",
          "[if condition expression for element in sequence]"
        ],
        correctAnswer: 0,
        explanation: "Correct order: expression for element in sequence if condition"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code create?\n\n```python\ntable = [[i * j for j in range(2)] for i in range(2)]\n```",
        options: [
          "[[0, 0], [0, 1]]",
          "[[0, 1], [0, 2]]",
          "[[1, 2], [2, 4]]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "i=0: [0*0, 0*1] = [0,0], i=1: [1*0, 1*1] = [0,1]"
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is it better to use list comprehension instead of a loop?",
        options: [
          "Always",
          "For simple list creation/filtering operations",
          "For complex operations with break/continue",
          "Never"
        ],
        correctAnswer: 1,
        explanation: "List comprehension is better for simple operations. For complex operations with break/continue, use a loop."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
