/**
 * Lesson 02-5: Nested loops and conditions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_5 = {
  lessonId: "lesson-02-5",
  moduleId: "module-02",
  order: 5,
  title: "Nested loops and conditions",
  
  learningObjectives: [
    "Create nested loops",
    "Combine loops with conditions",
    "Understand nested loop complexity",
    "Optimize nested constructs"
  ],
  
  prerequisites: ["lesson-02-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are nested loops?",
        content: `Nested loops are loops inside other loops. They let you process two-dimensional data structures.

**Syntax:**
\`\`\`python
for outer_element in outer_sequence:
    for inner_element in inner_sequence:
        # code for each pair
        action
\`\`\`

**Example: Multiplication table**
\`\`\`python
for i in range(1, 4):  # 1, 2, 3
    for j in range(1, 4):  # 1, 2, 3
        print(f"{i} x {j} = {i * j}")
\`\`\`

**Output:**
\`\`\`
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
\`\`\`

**How it works:**
- The outer loop runs 3 times (i = 1, 2, 3)
- For each i, the inner loop runs 3 times (j = 1, 2, 3)
- Total: 3 × 3 = 9 iterations`
      },
      {
        title: "Nested loops with conditions",
        content: `You can combine nested loops with conditions for more complex logic.

**Example: Finding pairs of numbers**
\`\`\`python
numbers1 = [1, 2, 3, 4]
numbers2 = [2, 4, 6, 8]

for num1 in numbers1:
    for num2 in numbers2:
        if num1 + num2 == 6:
            print(f"Found pair: {num1} + {num2} = 6")
\`\`\`

**Output:**
\`\`\`
Found pair: 2 + 4 = 6
Found pair: 4 + 2 = 6
\`\`\`

**Example: Filtering**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix:
    for element in row:
        if element % 2 == 0:  # only even
            print(element)
\`\`\`

**Output:**
\`\`\`
2
4
6
8
\`\`\``
      },
      {
        title: "Working with two-dimensional lists",
        content: `Nested loops are ideal for working with matrices (two-dimensional lists).

**Example: Traversing a matrix**
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")
\`\`\`

**Alternative with enumerate:**
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for i, row in enumerate(matrix):
    for j, element in enumerate(row):
        print(f"matrix[{i}][{j}] = {element}")
\`\`\`

**Example: Sum of all elements**
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
total = 0

for row in matrix:
    for element in row:
        total += element

print(f"Sum of all elements: {total}")
\`\`\``
      },
      {
        title: "break and continue in nested loops",
        content: `**break** exits only the nearest (innermost) loop.

**Example: break in the inner loop**
\`\`\`python
for i in range(3):
    for j in range(3):
        if j == 1:
            break  # exits only the inner loop
        print(f"i={i}, j={j}")
\`\`\`

**Output:**
\`\`\`
i=0, j=0
i=1, j=0
i=2, j=0
\`\`\`

**To exit both loops, use a flag:**
\`\`\`python
found = False
for i in range(3):
    if found:
        break
    for j in range(3):
        if i == 1 and j == 1:
            found = True
            break
        print(f"i={i}, j={j}")
\`\`\`

**continue** also works only for the nearest loop:
\`\`\`python
for i in range(3):
    for j in range(3):
        if j == 1:
            continue  # skips only the current inner iteration
        print(f"i={i}, j={j}")
\`\`\``
      },
      {
        title: "Optimizing nested loops",
        content: `**Complexity:** Nested loops can be slow for large datasets.

**Example: O(n²) complexity**
\`\`\`python
# For a list with n elements, n × n operations are performed
numbers = [1, 2, 3, 4, 5]

for i in numbers:
    for j in numbers:
        print(f"{i}, {j}")  # 25 operations (5 × 5)
\`\`\`

**Optimization: Avoid unnecessary iterations**
\`\`\`python
# Instead of checking all pairs
numbers = [1, 2, 3, 4, 5]

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):  # start from i+1
        print(f"{numbers[i]}, {numbers[j]}")
\`\`\`

**When to use nested loops:**
- For processing two-dimensional structures
- For comparing all pairs of elements
- For creating combinations

**When to avoid them:**
- If you can use a single loop
- For large datasets (look for alternatives)
- If built-in functions exist (for example, itertools)`
      },
      {
        title: "Practical examples",
        content: `**Example 1: Finding duplicates**
\`\`\`python
numbers = [1, 2, 3, 2, 4, 3, 5]
duplicates = []

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        if numbers[i] == numbers[j] and numbers[i] not in duplicates:
            duplicates.append(numbers[i])

print(f"Duplicates: {duplicates}")
\`\`\`

**Example 2: Creating a table**
\`\`\`python
# 5x5 multiplication table
for i in range(1, 6):
    row = []
    for j in range(1, 6):
        row.append(i * j)
    print(row)
\`\`\`

**Example 3: Processing nested data**
\`\`\`python
students = [
    {"name": "Ivan", "grades": [85, 90, 88]},
    {"name": "Maria", "grades": [92, 87, 95]}
]

for student in students:
    print(f"{student['name']}:")
    for grade in student["grades"]:
        print(f"  - {grade}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Multiplication table",
      code: `# 3x3 multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")`,
      explanation: "Demonstrates basic nested loops for creating a multiplication table."
    },
    {
      title: "Example 2: Traversing a matrix",
      code: `# Traversing a two-dimensional list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix:
    for element in row:
        print(element)`,
      explanation: "Shows how to traverse a two-dimensional list using nested loops."
    },
    {
      title: "Example 3: Nested loops with conditions",
      code: `# Finding pairs of numbers
numbers1 = [1, 2, 3]
numbers2 = [2, 4, 6]

for num1 in numbers1:
    for num2 in numbers2:
        if num1 * 2 == num2:
            print(f"{num1} * 2 = {num2}")`,
      explanation: "Demonstrates combining nested loops with conditions."
    },
    {
      title: "Example 4: break in nested loops",
      code: `# break only in the inner loop
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(f"i={i}, j={j}")`,
      explanation: "Shows that break exits only the nearest (inner) loop."
    },
    {
      title: "Example 5: Optimization - avoiding duplicates",
      code: `# Check only unique pairs
numbers = [1, 2, 3, 4]

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        print(f"{numbers[i]}, {numbers[j]}")`,
      explanation: "Demonstrates optimization - checking only unique pairs without repetition."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "break exits all loops",
      explanation: "break exits only the nearest loop, not all nested loops.",
      correctApproach: "To exit all loops, use a flag or a function"
    },
    {
      mistake: "Too many nested loops",
      explanation: "Nested loops have high complexity (O(n²) or more).",
      correctApproach: "Look for alternatives: a single loop, built-in functions, algorithm optimization"
    },
    {
      mistake: "Confusion with indices",
      explanation: "In nested loops it's easy to mix up indices i and j.",
      correctApproach: "Use clear variable names: row, col or i, j with comments"
    },
    {
      mistake: "Non-optimal structure",
      explanation: "Sometimes you can get by with one loop instead of nested loops.",
      correctApproach: "Check whether nested loops are really needed, or if you can simplify"
    }
  ],
  
  summary: `In this lesson we learned:

1. Nested loops - loops inside loops
2. Tables and matrices - processing two-dimensional structures
3. Nested loops with conditions - complex checks
4. break and continue - behavior in nested loops
5. Optimization - how to reduce complexity
6. Practical uses - search, filtering, data processing

Now you know how to work with complex data structures!

Next lesson - list comprehensions for creating lists!`,
  
  practiceTask: {
    title: "Finding common elements",
    description: "Create a program to find common elements in two lists",
    problemStatement: `Write a program that:
1. Has two lists: list1 = [1, 2, 3, 4, 5] and list2 = [3, 4, 5, 6, 7]
2. Uses nested loops to find common elements
3. Stores common elements in a list common
4. Prints the common elements
5. Additionally: counts the number of common elements`,
    outputFormat: `Example output:
Common elements: [3, 4, 5]
Number of common elements: 3`,
    examples: [
      {
        output: `Common elements: [3, 4, 5]
Number of common elements: 3`,
        explanation: "Finds three common elements"
      }
    ],
    solution: {
      code: `# Finding common elements
list1 = [1, 2, 3, 4, 5]
list2 = [3, 4, 5, 6, 7]
common = []

# Nested loops for comparison
for element1 in list1:
    for element2 in list2:
        if element1 == element2:
            # Check if already added (to avoid duplicates)
            if element1 not in common:
                common.append(element1)

print(f"Common elements: {common}")
print(f"Number of common elements: {len(common)}")`,
      explanation: "The solution uses nested loops to compare all elements from both lists and stores common ones."
    },
    hints: [
      "Use two for loops - one for list1, one for list2",
      "Compare element1 == element2",
      "Check whether the element is already in common before adding",
      "Use len() to count the number",
      "Use 'not in' to check absence in the list"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "How many times will print run in this code?\n\n```python\nfor i in range(2):\n    for j in range(3):\n        print('Hello')\n```",
        options: [
          "2",
          "3",
          "5",
          "6"
        ],
        correctAnswer: 3,
        explanation: "Outer loop 2 times, inner loop 3 times, total 2 × 3 = 6 times."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nfor i in range(2):\n    for j in range(2):\n        if j == 1:\n            break\n        print(f'i={i}, j={j}')\n```",
        options: [
          "i=0, j=0\ni=1, j=0",
          "i=0, j=0\ni=0, j=1\ni=1, j=0\ni=1, j=1",
          "i=0, j=0",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "break exits only the inner loop, so for each i only j=0 is printed."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does break do in nested loops?",
        options: [
          "Exits all loops",
          "Exits only the nearest loop",
          "Skips the current iteration",
          "Stops the entire program"
        ],
        correctAnswer: 1,
        explanation: "break exits only the nearest (innermost) loop, not all of them."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nmatrix = [[1, 2], [3, 4]]\ntotal = 0\nfor row in matrix:\n    for element in row:\n        total += element\nprint(total)\n```",
        options: [
          "10",
          "4",
          "6",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "Sum of all elements: 1 + 2 + 3 + 4 = 10."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the complexity of nested loops for a list with n elements?",
        options: [
          "O(n)",
          "O(n²)",
          "O(log n)",
          "O(1)"
        ],
        correctAnswer: 1,
        explanation: "Nested loops have O(n²) complexity - for each element all others are checked."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
