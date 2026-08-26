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
    "Use conditional inclusions",
    "Write nested list comprehensions",
    "Optimize code with comprehensions"
  ],
  
  prerequisites: ["lesson-02-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is a List Comprehension?",
        content: `A **List Comprehension** is a compact way to create lists in Python.

**Usual way (with a loop):**
\`\`\`python
squares = []
for x in range(5):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`

**With a List Comprehension:**
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
[expression for item in sequence]
\`\`\`

**How it works:**
1. Take each item from the sequence
2. Apply the expression
3. Add the result to the list`
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
        title: "List Comprehension with conditions (if)",
        content: `You can add a condition to filter items.

**Syntax:**
\`\`\`python
[expression for item in sequence if condition]
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
        title: "List Comprehension with if-else",
        content: `You can use a ternary operator for a conditional expression.

**Syntax:**
\`\`\`python
[expression1 if condition else expression2 for item in sequence]
\`\`\`

**Example 1: Even/odd**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
labels = ["even" if x % 2 == 0 else "odd" for x in numbers]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd', 'even']
\`\`\`

**Example 2: Positive/negative**
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
        title: "Nested List Comprehensions",
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

**Example 2: Flat structure**
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
        content: `**When to use a List Comprehension:**
- For simple list creation
- For filtering and transforming
- When code should be compact

**When to use regular loops:**
- For complex operations
- When you need side effects (print, break, continue)
- When code should be more readable

**Example: Complex operations**
\`\`\`python
# List Comprehension - bad for complex operations
result = [complex_function(x) for x in data if condition(x) and another_condition(x)]

# Regular loop - better for complex operations
result = []
for x in data:
    if condition(x) and another_condition(x):
        result.append(complex_function(x))
\`\`\`

**Rule:** If a List Comprehension becomes hard to read, use a regular loop!`
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
      title: "Example 1: Basic List Comprehension",
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
      explanation: "Shows using if to filter items in a list comprehension."
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
      title: "Example 4: Nested List Comprehension",
      code: `# 3x3 multiplication table
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(table)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`,
      explanation: "Shows how to create two-dimensional structures with nested comprehensions."
    },
    {
      title: "Example 5: Transforming strings",
      code: `# Uppercase with filtering
words = ["apple", "banana", "cat", "dog"]
long_uppercase = [word.upper() for word in words if len(word) > 3]
print(long_uppercase)  # ['APPLE', 'BANANA']`,
      explanation: "Demonstrates combining transformation and filtering in one comprehension."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Wrong if-else order",
      explanation: "In a list comprehension, if-else goes before for, not after.",
      correctApproach: "[expression1 if condition else expression2 for item in sequence]"
    },
    {
      mistake: "Overly complex comprehensions",
      explanation: "If a list comprehension becomes hard to read, prefer a regular loop.",
      correctApproach: "Use list comprehensions for simple operations, loops for complex ones"
    },
    {
      mistake: "Confusion with nested comprehensions",
      explanation: "The order of nested comprehensions should match nested loops.",
      correctApproach: "Read left to right: [inner for ... outer for]"
    },
    {
      mistake: "Trying to use break/continue",
      explanation: "You cannot use break or continue in a list comprehension.",
      correctApproach: "For break/continue use a regular loop"
    }
  ],
  
  summary: `In this lesson we learned:

1. List Comprehension - a compact way to create lists
2. Basic syntax - [expression for item in sequence]
3. With a condition (if) - filtering items
4. With if-else - conditional expressions
5. Nested comprehensions - for complex structures
6. Comparison with loops - when to use which
7. Practical uses - transforming, filtering, building structures

You can now create lists efficiently and elegantly!

Next lesson - practice with algorithmic problems!`,
  
  practiceTask: {
    title: "Student data processing",
    description: "Create a program that processes student grades using list comprehensions",
    problemStatement: `Write a program that:
1. Reads grades on one line separated by spaces
2. Uses list comprehensions for:
   - Squares of grades
   - Filtering grades >= 70
   - Labels: "Excellent" (>=90), "Good" (70-89), "Needs improvement" (<70)
   - Grades in the range 80-90 inclusive
3. Prints all results

Input format:
85 92 78 96 65 88 75 90 55 87`,
    outputFormat: `Grade squares: [7225, 8464, 6084, 9216, 4225, 7744, 5625, 8100, 3025, 7569]
Passing grades: [85, 92, 78, 96, 88, 75, 90, 87]
Labels: ['Good', 'Excellent', 'Good', 'Excellent', 'Needs improvement', 'Good', 'Good', 'Excellent', 'Needs improvement', 'Good']
Grades 80-90: [85, 88, 90, 87]`,
    examples: [
      {
        input: `85 92 78 96 65 88 75 90 55 87`,
        output: `Grade squares: [7225, 8464, 6084, 9216, 4225, 7744, 5625, 8100, 3025, 7569]
Passing grades: [85, 92, 78, 96, 88, 75, 90, 87]
Labels: ['Good', 'Excellent', 'Good', 'Excellent', 'Needs improvement', 'Good', 'Good', 'Excellent', 'Needs improvement', 'Good']
Grades 80-90: [85, 88, 90, 87]`,
        explanation: "Different list comprehensions process all 10 grades"
      },
      {
        input: `90 70 50`,
        output: `Grade squares: [8100, 4900, 2500]
Passing grades: [90, 70]
Labels: ['Excellent', 'Good', 'Needs improvement']
Grades 80-90: [90]`,
        explanation: "Three grades — one in each label category"
      },
      {
        input: `80 85 90`,
        output: `Grade squares: [6400, 7225, 8100]
Passing grades: [80, 85, 90]
Labels: ['Good', 'Good', 'Excellent']
Grades 80-90: [80, 85, 90]`,
        explanation: "All grades are in range 80-90 and passing"
      }
    ],
    solution: {
      code: `grades = list(map(int, input().split()))

squares = [g ** 2 for g in grades]
print(f"Grade squares: {squares}")

passing = [g for g in grades if g >= 70]
print(f"Passing grades: {passing}")

labels = ["Excellent" if g >= 90 else "Good" if g >= 70 else "Needs improvement" for g in grades]
print(f"Labels: {labels}")

in_range = [g for g in grades if 80 <= g <= 90]
print(f"Grades 80-90: {in_range}")`,
      explanation: "Read grades from stdin and apply different list comprehensions."
    },
    hints: [
      "Read: grades = list(map(int, input().split()))",
      "Squares: [g ** 2 for g in grades]",
      "Filter: [g for g in grades if g >= 70]",
      "Labels with a ternary operator in a comprehension"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code create?\n\n```python\nsquares = [x ** 2 for x in range(5)]\n```",
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
        question: "What does this code create?\n\n```python\neven = [x for x in range(10) if x % 2 == 0]\n```",
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
        question: "What does this code create?\n\n```python\nlabels = [\"even\" if x % 2 == 0 else \"odd\" for x in [1, 2, 3]]\n```",
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
          "[expression for item in sequence if condition]",
          "[expression if condition for item in sequence]",
          "[for item in sequence if condition expression]",
          "[if condition expression for item in sequence]"
        ],
        correctAnswer: 0,
        explanation: "Correct order: expression for item in sequence if condition"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code create?\n\n```python\ntable = [[i * j for j in range(2)] for i in range(2)]\n```",
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
        question: "When is it better to use a list comprehension instead of a loop?",
        options: [
          "Always",
          "For simple list creation/filtering operations",
          "For complex operations with break/continue",
          "Never"
        ],
        correctAnswer: 1,
        explanation: "List comprehensions are better for simple operations. For complex ones with break/continue, use a loop."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
