/**
 * Lesson 02-1: Conditional statements if / elif / else
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_02_1 = {
  lessonId: "lesson-02-1",
  moduleId: "module-02",
  order: 1,
  title: "Conditional statements if / elif / else",
  
  learningObjectives: [
    "Understand the logic of conditional statements",
    "Use if, elif, else",
    "Work with nested conditions",
    "Apply the ternary operator"
  ],
  
  prerequisites: ["lesson-01-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to conditional statements",
        content: `Conditional statements let a program make decisions based on different conditions. It is like saying:
- "If it is raining, take an umbrella"
- "If it is sunny, wear sunglasses"
- "Otherwise, wear normal clothes"

**Why is Python special?**
Python uses indentation instead of curly braces {}. This makes code more readable and cleaner.

**Key differences between Python and other languages:**
1. No curly braces {} - use a colon : and indentation
2. No parentheses () required around the condition (though you can use them)
3. No semicolon ; at the end of lines
4. Indentation matters - it defines the structure of the code`
      },
      {
        title: "if/elif/else syntax",
        content: `**Basic structure:**

\`\`\`python
if condition1:
    # code that runs if condition1 is True
    action1
elif condition2:
    # code that runs if condition1 is False but condition2 is True
    action2
else:
    # code that runs if all conditions are False
    action3
\`\`\`

**Important:**
- Always put a colon : after the condition
- Code inside if/elif/else must be indented (usually 4 spaces)
- elif and else are optional; you can use only if
- You can have many elif blocks after one if

**Example:**
\`\`\`python
score = 85

if score >= 90:
    print("Excellent!")
elif score >= 70:
    print("Good!")
elif score >= 50:
    print("Satisfactory")
else:
    print("Needs improvement")
\`\`\``
      },
      {
        title: "Types of conditional constructs",
        content: `**1. Simple if** - only one check:
\`\`\`python
if condition:
    action
\`\`\`

**2. if with else** - two alternatives:
\`\`\`python
if condition:
    action1
else:
    action2
\`\`\`

**3. if with elif and else** - many conditions:
\`\`\`python
if condition1:
    action1
elif condition2:
    action2
elif condition3:
    action3
else:
    action4
\`\`\`

**Important:**
- Python checks conditions from top to bottom
- As soon as a True condition is found, its code runs and the rest is skipped
- else runs only if all conditions are False`
      },
      {
        title: "if with else",
        content: `When you need to run one action or another:

\`\`\`python
age = 15

if age >= 18:
    print("You are an adult!")
else:
    print("You are a minor")
\`\`\`

**When to use:**
- When there are two alternatives
- When you need to handle both cases

**Example:**
\`\`\`python
password = "secret123"

if password == "secret123":
    print("Access granted")
else:
    print("Incorrect password")
\`\`\``
      },
      {
        title: "Nested conditions",
        content: `You can nest an if inside another if:

\`\`\`python
age = 20
has_license = True

if age >= 18:
    if has_license:
        print("You can drive a car")
    else:
        print("You need a license")
else:
    print("Too young to drive")
\`\`\`

**When to use:**
- When you need an extra check inside the main one
- For complex logical checks

**Alternative with and:**
\`\`\`python
age = 20
has_license = True

if age >= 18 and has_license:
    print("You can drive a car")
elif age >= 18:
    print("You need a license")
else:
    print("Too young to drive")
\`\`\``
      },
      {
        title: "Indentation in Python",
        content: `**Indentation is very important in Python!**

Python uses indentation to define code structure. That means spaces matter.

**Rules:**
1. After a colon : there is always an indented block
2. Usually use 4 spaces (or 1 tab)
3. All lines at the same indentation level belong to the same block
4. Incorrect indentation causes an error!

**Correct:**
\`\`\`python
if True:
    print("This is inside the if")
    print("This is also inside the if")
print("This is outside the if")
\`\`\`

**Incorrect:**
\`\`\`python
if True:
print("Error! Missing indentation")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Simple if",
      code: `# Checking a condition
x = 10

if x > 5:
    print("x is greater than 5")
    print("Condition met!")`,
      explanation: "Demonstrates a basic if with indentation. Code inside if runs only if the condition is True."
    },
    {
      title: "Example 2: if with else",
      code: `# Two alternatives
age = 15

if age >= 18:
    print("You are an adult!")
else:
    print("You are a minor")`,
      explanation: "Shows using else to handle the alternative case."
    },
    {
      title: "Example 3: if with elif",
      code: `# Many conditions
score = 85

if score >= 90:
    print("Excellent!")
elif score >= 80:
    print("Good!")
elif score >= 70:
    print("Satisfactory")
else:
    print("Needs improvement")`,
      explanation: "Demonstrates using elif to check several conditions in order."
    },
    {
      title: "Example 4: Nested conditions",
      code: `# Nested if
age = 20
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("You need a license")
else:
    print("Too young")`,
      explanation: "Shows how to nest an if inside another if for complex checks."
    },
    {
      title: "Example 5: Combining with logical operators",
      code: `# Using and and or
age = 20
has_license = True
has_insurance = False

if age >= 18 and has_license:
    if has_insurance:
        print("You can go!")
    else:
        print("You need insurance")
else:
    print("You cannot drive")`,
      explanation: "Demonstrates combining conditional statements with logical operators."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting the colon after the condition",
      explanation: "After if, elif, else there must always be a colon :",
      correctApproach: "Always write: if condition: (with a colon)"
    },
    {
      mistake: "Incorrect indentation",
      explanation: "Code inside if/elif/else must be indented. Without indentation you get an error.",
      correctApproach: "Use 4 spaces for indentation after the colon"
    },
    {
      mistake: "Confusing elif and else",
      explanation: "elif checks an additional condition; else runs if all conditions are False.",
      correctApproach: "elif = 'else if', else = 'otherwise' (no condition)"
    },
    {
      mistake: "Using = instead of == in conditions",
      explanation: "= is assignment, == is comparison. Conditions need ==.",
      correctApproach: "In conditions always use == for comparison"
    }
  ],
  
  summary: `In this lesson we learned:

1. Conditional statements - if, elif, else for making decisions
2. Python syntax - colon : and indentation instead of braces
3. Simple if - for one condition
4. if with else - for two alternatives
5. if with elif - for many conditions
6. Nested conditions - if inside if
7. Indentation - why correct indentation matters in Python

You can now write programs that make decisions based on different conditions!

Next lesson - while loops for repeating actions!`,
  
  practiceTask: {
    title: "Student grading system",
    description: "Create a program that grades several students based on their scores",
    problemStatement: `Write a program that:
1. Reads the number of students n
2. Reads n scores (one per line)
3. For each score uses if/else:
   - If score >= 60: print "passed"
   - If score < 60: print "failed"
4. For each student print the number, score, and result

Input format:
4
95
85
65
55`,
    outputFormat: `Student 1:
Score: 95
passed

Student 2:
Score: 85
passed

Student 3:
Score: 65
passed

Student 4:
Score: 55
failed`,
    examples: [
      {
        input: `4
95
85
65
55`,
        output: `Student 1:
Score: 95
passed

Student 2:
Score: 85
passed

Student 3:
Score: 65
passed

Student 4:
Score: 55
failed`,
        explanation: "Three students passed (>= 60), one failed"
      },
      {
        input: `2
60
59`,
        output: `Student 1:
Score: 60
passed

Student 2:
Score: 59
failed`,
        explanation: "Passing boundary: 60 - passed, 59 - failed"
      },
      {
        input: `3
100
0
75`,
        output: `Student 1:
Score: 100
passed

Student 2:
Score: 0
failed

Student 3:
Score: 75
passed`,
        explanation: "Edge values 100 and 0 plus a mid score of 75"
      }
    ],
    solution: {
      code: `n = int(input())

for i in range(1, n + 1):
    score = int(input())
    print(f"Student {i}:")
    print(f"Score: {score}")
    if score >= 60:
        print("passed")
    else:
        print("failed")
    if i < n:
        print()`,
      explanation: "Read n scores and for each check with if/else: >= 60 - passed."
    },
    hints: [
      "Read n = int(input()), then scores in a loop",
      "Use if/else to check score >= 60",
      "Print a blank line between students",
      "Number students from 1 to n"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 10\nif x > 5:\n    print('Greater than 5')\nprint('End')\n```",
        options: [
          "Greater than 5\nEnd",
          "End",
          "Greater than 5",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The condition x > 5 is True, so print('Greater than 5') runs, then print('End') outside the if."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 15\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')\n```",
        options: [
          "Adult",
          "Minor",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "age = 15 is less than 18, so the condition is False and the else block runs."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nscore = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('F')\n```",
        options: [
          "A",
          "B",
          "C",
          "F"
        ],
        correctAnswer: 1,
        explanation: "score = 85 >= 80, so the first elif block runs and prints 'B'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What must come after an if condition in Python?",
        options: [
          "A colon :",
          "A semicolon ;",
          "A curly brace {",
          "A closing parenthesis )"
        ],
        correctAnswer: 0,
        explanation: "In Python, if, elif, and else are always followed by a colon :"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 5\ny = 10\nif x > 3:\n    if y > 5:\n        print('Both conditions True')\n    else:\n        print('Only first condition True')\nelse:\n    print('First condition False')\n```",
        options: [
          "Both conditions True",
          "Only first condition True",
          "First condition False",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "x > 3 is True (5 > 3), so we enter the first if. y > 5 is also True (10 > 5), so the inner if runs."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How many elif blocks can you use after one if?",
        options: [
          "Only one",
          "Two",
          "As many as you want",
          "None"
        ],
        correctAnswer: 2,
        explanation: "You can use as many elif blocks as you want after one if."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
