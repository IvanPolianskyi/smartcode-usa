/**
 * Lesson 02-3: The for loop and the range() function
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_3 = {
  lessonId: "lesson-02-3",
  moduleId: "module-02",
  order: 3,
  title: "The for loop and the range() function",
  
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
        content: `A **for** loop is used to iterate (walk through) sequences: lists, strings, tuples, and more.

**Syntax:**
\`\`\`python
for item in sequence:
    # code for each item
    action
\`\`\`

**How it works:**
1. Python takes the first item from the sequence
2. Assigns it to the variable (after for)
3. Runs the code inside the loop
4. Moves to the next item
5. Repeats until there are no more items

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

**With indexes (using range):**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")
\`\`\`

**Using enumerate (better solution):**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

for index, value in enumerate(numbers):
    print(f"Index {index}: {value}")
\`\`\`

**enumerate** returns (index, value) pairs, which is very convenient!`
      },
      {
        title: "The range() function",
        content: `**range()** creates a sequence of numbers. It is most often used with for.

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

**With indexes:**
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

**items()** returns (key, value) pairs - this is the most convenient way!`
      },
      {
        title: "enumerate() - index and value",
        content: `**enumerate()** adds indexes to a sequence:

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

**Starting from another number:**
\`\`\`python
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
\`\`\`

**When to use:**
- When you need both the index and the value
- For numbering items
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

**When to use:**
- When you need to process several lists at once
- For creating value pairs
- For combining data`
      },
      {
        title: "for with else",
        content: `Just like with while, you can use **else** with for:

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

**Useful for searching:**
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
      explanation: "Demonstrates basic iteration over a list with for."
    },
    {
      title: "Example 2: range()",
      code: `# Using range()
for i in range(5):
    print(f"Number: {i}")

# range with a step
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
      explanation: "Demonstrates how to get both index and value with enumerate()."
    },
    {
      title: "Example 4: zip()",
      code: `# Combining lists
names = ["Ivan", "Maria"]
ages = [15, 16]

for name, age in zip(names, ages):
    print(f"{name} - {age} years old")`,
      explanation: "Shows how to combine several lists with zip()."
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
      title: "Example 6: Computing a sum",
      code: `# Sum of numbers in a list
numbers = [1, 2, 3, 4, 5]
total = 0

for number in numbers:
    total += number

print(f"Sum: {total}")`,
      explanation: "Shows how to use for to compute a sum."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing range() with a list",
      explanation: "range(5) is not [0,1,2,3,4], it is a generator. For a list you need list(range(5)).",
      correctApproach: "range() can be used directly in for, but for a list use list(range())"
    },
    {
      mistake: "Thinking range() includes the last number",
      explanation: "range(5) creates 0,1,2,3,4 (does not include 5).",
      correctApproach: "Remember: range(stop) creates numbers from 0 to stop-1"
    },
    {
      mistake: "Forgetting enumerate() when you need an index",
      explanation: "You do not need range(len(list)) when you can use enumerate().",
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
4. Iterating over strings - by characters
5. Iterating over dictionaries - by keys, values, pairs
6. enumerate() - getting index and value
7. zip() - combining several sequences
8. for with else - handling after loop completion

You can now iterate over data efficiently!

Next lesson - break, continue, and else in loops!`,
  
  practiceTask: {
    title: "Student grade analysis",
    description: "Create a program that analyzes student grades",
    problemStatement: `Write a program that:
1. Reads the number of grades n, then n grades (one per line)
2. Uses for and enumerate to print each grade with its index
3. Computes count, average (2 decimal places), maximum, and minimum
4. Prints all results

Input format:
7
85
92
78
96
88
75
90`,
    outputFormat: `Grade 0: 85
Grade 1: 92
Grade 2: 78
Grade 3: 96
Grade 4: 88
Grade 5: 75
Grade 6: 90
Number of grades: 7
Average grade: 86.29
Maximum grade: 96
Minimum grade: 75`,
    examples: [
      {
        input: `7
85
92
78
96
88
75
90`,
        output: `Grade 0: 85
Grade 1: 92
Grade 2: 78
Grade 3: 96
Grade 4: 88
Grade 5: 75
Grade 6: 90
Number of grades: 7
Average grade: 86.29
Maximum grade: 96
Minimum grade: 75`,
        explanation: "Average 604/7 = 86.29, max=96, min=75"
      },
      {
        input: `3
100
80
90`,
        output: `Grade 0: 100
Grade 1: 80
Grade 2: 90
Number of grades: 3
Average grade: 90.00
Maximum grade: 100
Minimum grade: 80`,
        explanation: "Average (100+80+90)/3 = 90.00"
      },
      {
        input: `1
55`,
        output: `Grade 0: 55
Number of grades: 1
Average grade: 55.00
Maximum grade: 55
Minimum grade: 55`,
        explanation: "One grade — it is the average, max, and min"
      }
    ],
    solution: {
      code: `n = int(input())
grades = []
for _ in range(n):
    grades.append(int(input()))

for index, grade in enumerate(grades):
    print(f"Grade {index}: {grade}")

count = len(grades)
print(f"Number of grades: {count}")

total = 0
for grade in grades:
    total += grade

average = total / count
print(f"Average grade: {average:.2f}")

max_grade = grades[0]
min_grade = grades[0]
for grade in grades:
    if grade > max_grade:
        max_grade = grade
    if grade < min_grade:
        min_grade = grade

print(f"Maximum grade: {max_grade}")
print(f"Minimum grade: {min_grade}")`,
      explanation: "Read grades from stdin, print with enumerate, compute average with :.2f and max/min in a loop."
    },
    hints: [
      "Read n, then n grades into a list",
      "Use enumerate() for index and value",
      "Average = sum / count, format :.2f",
      "For max/min compare each grade in a for loop"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nfor i in range(3):\n    print(i)\n```",
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
        question: "What does this code print?\n\n```python\nfruits = ['apple', 'banana']\nfor fruit in fruits:\n    print(fruit)\n```",
        options: [
          "apple\nbanana",
          "0\n1",
          "apple banana",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "for iterates over list items, so it prints 'apple' and 'banana'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nfor i, letter in enumerate('Hi'):\n    print(f'{i}: {letter}')\n```",
        options: [
          "0: H\n1: i",
          "H\ni",
          "0\n1",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "enumerate() returns (index, value) pairs, so it prints '0: H' and '1: i'."
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
        question: "What does this code print?\n\n```python\nnames = ['Ivan', 'Maria']\nages = [15, 16, 17]\nfor name, age in zip(names, ages):\n    print(f'{name}: {age}')\n```",
        options: [
          "Ivan: 15\nMaria: 16",
          "Ivan: 15\nMaria: 16\n17",
          "An error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "zip() stops when the shortest sequence ends (names has 2 items)."
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
