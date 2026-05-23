/**
 * Lesson 02-3: The for loop and range()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_3 = {
  lessonId: "lesson-02-3",
  moduleId: "module-02",
  order: 3,
  title: "The for loop and range()",
  
  learningObjectives: [
    "Use the for loop for iteration",
    "Apply the range() function",
    "Iterate over sequences",
    "Work with enumerate() and zip()"
  ],
  
  prerequisites: ["lesson-02-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is a for loop?",
        content: `The **for** loop is used to iterate (go through) sequences: lists, strings, tuples, and more.

**Syntax:**
\`\`\`python
for element in sequence:
    # code for each element
    action
\`\`\`

**How it works:**
1. Python takes the first element from the sequence
2. Assigns it to the variable (after for)
3. Runs the code inside the loop
4. Moves to the next element
5. Repeats until all elements are processed

**Example:**
\`\`\`python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)
\`\`\`

**Output:**
\`\`\`
apple
banana
orange
\`\`\``
      },
      {
        title: "for with lists",
        content: `**Iterating over a list:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    print(f"Number: {number}")
\`\`\`

**With indices (using range):**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")
\`\`\`

**Using enumerate (better approach):**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

for index, value in enumerate(numbers):
    print(f"Index {index}: {value}")
\`\`\`

**enumerate** returns pairs (index, value), which is very convenient!`
      },
      {
        title: "The range() function",
        content: `**range()** creates a sequence of numbers. It's most often used with for.

**Syntax:**
- \`range(stop)\` - from 0 to stop-1
- \`range(start, stop)\` - from start to stop-1
- \`range(start, stop, step)\` - from start to stop-1 with step

**Examples:**
\`\`\`python
# range(5) - 0, 1, 2, 3, 4
for i in range(5):
    print(i)

# range(2, 7) - 2, 3, 4, 5, 6
for i in range(2, 7):
    print(i)

# range(0, 10, 2) - 0, 2, 4, 6, 8
for i in range(0, 10, 2):
    print(i)
\`\`\`

**Important:** range() does not include the last number (stop), only up to it!

**Converting to a list:**
\`\`\`python
numbers = list(range(5))
print(numbers)  # [0, 1, 2, 3, 4]
\`\`\``
      },
      {
        title: "for with strings",
        content: `Strings are also sequences, so you can iterate over characters:

\`\`\`python
word = "Python"

for letter in word:
    print(letter)
\`\`\`

**Output:**
\`\`\`
P
y
t
h
o
n
\`\`\`

**With indices:**
\`\`\`python
word = "Python"

for i, letter in enumerate(word):
    print(f"Position {i}: {letter}")
\`\`\`

**Output:**
\`\`\`
Position 0: P
Position 1: y
Position 2: t
Position 3: h
Position 4: o
Position 5: n
\`\`\``
      },
      {
        title: "for with dictionaries",
        content: `**Iterating over keys:**
\`\`\`python
student = {"name": "Ivan", "age": 15, "grade": 9}

for key in student:
    print(f"{key}: {student[key]}")
\`\`\`

**Using .keys():**
\`\`\`python
for key in student.keys():
    print(key)
\`\`\`

**Iterating over values:**
\`\`\`python
for value in student.values():
    print(value)
\`\`\`

**Iterating over key-value pairs:**
\`\`\`python
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\`

**items()** returns key-value pairs - this is the most convenient way!`
      },
      {
        title: "enumerate() - index and value",
        content: `**enumerate()** adds indices to a sequence:

\`\`\`python
fruits = ["apple", "banana", "orange"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

**Output:**
\`\`\`
0: apple
1: banana
2: orange
\`\`\`

**Starting from a different number:**
\`\`\`python
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
\`\`\`

**When to use it:**
- When you need both index and value
- For numbering elements
- For tracking position`
      },
      {
        title: "zip() - combining sequences",
        content: `**zip()** combines several sequences together:

\`\`\`python
names = ["Ivan", "Maria", "Peter"]
ages = [15, 16, 14]

for name, age in zip(names, ages):
    print(f"{name} - {age} years old")
\`\`\`

**Output:**
\`\`\`
Ivan - 15 years old
Maria - 16 years old
Peter - 14 years old
\`\`\`

**Important:** zip() stops when the shortest sequence ends.

**When to use it:**
- When you need to process several lists at once
- For creating pairs of values
- For combining data`
      },
      {
        title: "for with else",
        content: `Like while, **for** can use **else**:

\`\`\`python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    if number == 10:
        print("Found 10!")
        break
else:
    print("10 not found")
\`\`\`

**else runs only if the loop finished normally (not via break).**

**Useful for search:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
target = 10

for number in numbers:
    if number == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found in the list")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: for with a list",
      code: `# Iterating over a list
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)`,
      explanation: "Demonstrates basic iteration over a list using for."
    },
    {
      title: "Example 2: range()",
      code: `# Using range()
for i in range(5):
    print(f"Number: {i}")

# range with step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8`,
      explanation: "Shows using range() to create sequences of numbers."
    },
    {
      title: "Example 3: enumerate()",
      code: `# Using enumerate
fruits = ["apple", "banana", "orange"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")`,
      explanation: "Demonstrates how to get both index and value using enumerate()."
    },
    {
      title: "Example 4: zip()",
      code: `# Combining lists
names = ["Ivan", "Maria"]
ages = [15, 16]

for name, age in zip(names, ages):
    print(f"{name} - {age} years old")`,
      explanation: "Shows how to combine several lists using zip()."
    },
    {
      title: "Example 5: for with a dictionary",
      code: `# Iterating over a dictionary
student = {"name": "Ivan", "age": 15}

for key, value in student.items():
    print(f"{key}: {value}")`,
      explanation: "Demonstrates iterating over key-value pairs in a dictionary."
    },
    {
      title: "Example 6: Calculating a sum",
      code: `# Sum of numbers in a list
numbers = [1, 2, 3, 4, 5]
total = 0

for number in numbers:
    total += number

print(f"Sum: {total}")`,
      explanation: "Shows how to use for to calculate a sum."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing range() and a list",
      explanation: "range(5) is not [0,1,2,3,4], it's a generator. For a list use list(range(5)).",
      correctApproach: "range() can be used directly in for, but for a list use list(range())"
    },
    {
      mistake: "range() includes the last number",
      explanation: "range(5) creates 0,1,2,3,4 (does not include 5).",
      correctApproach: "Remember: range(stop) creates numbers from 0 to stop-1"
    },
    {
      mistake: "Forgetting enumerate() when you need an index",
      explanation: "You don't need to use range(len(list)) when you can use enumerate().",
      correctApproach: "Use enumerate() instead of range(len()) to get index and value"
    },
    {
      mistake: "Incorrect use of zip()",
      explanation: "zip() stops when the shortest sequence ends.",
      correctApproach: "Make sure all sequences in zip() have the same length, or handle different lengths"
    }
  ],
  
  summary: `In this lesson we learned:

1. The for loop - for iterating over sequences
2. range() - creating sequences of numbers
3. Iterating over lists - a simple way to process data
4. Iterating over strings - character by character
5. Iterating over dictionaries - over keys, values, and pairs
6. enumerate() - getting index and value
7. zip() - combining several sequences
8. for with else - handling after loop completion

Now you know how to iterate over data efficiently!

Next lesson - break, continue, and else in loops!`,
  
  practiceTask: {
    title: "Student grade analysis",
    description: "Create a program to analyze student grades",
    problemStatement: `Write a program that:
1. Has a list of grades: grades = [85, 92, 78, 96, 88, 75, 90]
2. Uses a for loop to:
   - Print each grade with its index (use enumerate)
   - Count the number of grades
   - Calculate the average grade
   - Find the maximum and minimum grade
3. Print all results`,
    outputFormat: `Example output:
Grade 0: 85
Grade 1: 92
Grade 2: 78
Grade 3: 96
Grade 4: 88
Grade 5: 75
Grade 6: 90
Number of grades: 7
Average grade: 86.57
Maximum grade: 96
Minimum grade: 75`,
    examples: [
      {
        output: `Grade 0: 85
Grade 1: 92
Grade 2: 78
Grade 3: 96
Grade 4: 88
Grade 5: 75
Grade 6: 90
Number of grades: 7
Average grade: 86.57
Maximum grade: 96
Minimum grade: 75`,
        explanation: "The program analyzes all grades and calculates statistics"
      }
    ],
    solution: {
      code: `# Student grade analysis
grades = [85, 92, 78, 96, 88, 75, 90]

# Print grades with indices
for index, grade in enumerate(grades):
    print("Grade " + str(index) + ": " + str(grade))

# Count grades
count = len(grades)
print("Number of grades: " + str(count))

# Calculate sum and average
total = 0
for grade in grades:
    total += grade

average = total / count
# Format to 2 decimal places
average_str = str(round(average, 2))
print("Average grade: " + average_str)

# Find maximum and minimum
max_grade = grades[0]
min_grade = grades[0]

for grade in grades:
    if grade > max_grade:
        max_grade = grade
    if grade < min_grade:
        min_grade = grade

print("Maximum grade: " + str(max_grade))
print("Minimum grade: " + str(min_grade))`,
      explanation: "The solution uses for with enumerate for output, for to calculate the sum, and for to find max/min."
    },
    hints: [
      "Use enumerate() to get index and value",
      "Use for to calculate the sum of all grades",
      "Average = sum / count",
      "For max/min compare each grade with the current max/min",
      "Use :.2f to format the average to 2 decimal places"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nfor i in range(3):\n    print(i)\n```",
        options: [
          "0\n1\n2",
          "1\n2\n3",
          "0\n1\n2\n3",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "range(3) creates 0, 1, 2 (does not include 3)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nfruits = ['apple', 'banana']\nfor fruit in fruits:\n    print(fruit)\n```",
        options: [
          "apple\nbanana",
          "0\n1",
          "apple banana",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "for iterates over list elements, so 'apple' and 'banana' are printed."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nfor i, letter in enumerate('Hi'):\n    print(f'{i}: {letter}')\n```",
        options: [
          "0: H\n1: i",
          "H\ni",
          "0\n1",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "enumerate() returns pairs (index, value), so '0: H' and '1: i' are printed."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does range(5) create?",
        options: [
          "[0, 1, 2, 3, 4, 5]",
          "[0, 1, 2, 3, 4]",
          "[1, 2, 3, 4, 5]",
          "A generator of numbers 0-4"
        ],
        correctAnswer: 3,
        explanation: "range(5) creates a generator of numbers from 0 to 4 (does not include 5)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nnames = ['Ivan', 'Maria']\nages = [15, 16, 17]\nfor name, age in zip(names, ages):\n    print(f'{name}: {age}')\n```",
        options: [
          "Ivan: 15\nMaria: 16",
          "Ivan: 15\nMaria: 16\n17",
          "An error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "zip() stops when the shortest sequence ends (names has 2 elements)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you get both index and value in a for loop?",
        options: [
          "for i in range(len(list)):",
          "for i, value in enumerate(list):",
          "for value in list:",
          "All options are correct"
        ],
        correctAnswer: 1,
        explanation: "enumerate() is the best way to get both index and value at once."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
