/**
 * Lesson 02-1: Conditional statements: if / elif / else
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_1 = {
  lessonId: "lesson-02-1",
  moduleId: "module-02",
  order: 1,
  title: "Conditional statements: if / elif / else",
  
  learningObjectives: [
    "Understand conditional statement logic",
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
        content: `Conditional statements let a program make decisions based on different conditions. It's like saying:
- "If it rains, take an umbrella"
- "If it's sunny, wear sunglasses"
- "Otherwise, wear regular clothes"

**What makes Python special?**
Python uses indentation instead of curly braces {}. This makes code more readable and cleaner.

**Key differences from other languages:**
1. No curly braces {} — use a colon : and indentation
2. No parentheses () around the condition (though you can use them)
3. No semicolon ; at the end of lines
4. Indentation matters — it defines the structure of the code`
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
- A colon : always follows the condition
- Code inside if/elif/else must be indented (usually 4 spaces)
- elif and else are optional — you can use only if
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
        content: `**1. Simple if** — only one check:
\`\`\`python
if condition:
    action
\`\`\`

**2. if with else** — two alternatives:
\`\`\`python
if condition:
    action1
else:
    action2
\`\`\`

**3. if with elif and else** — many conditions:
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
        content: `When you need to do one thing or another:

\`\`\`python
age = 15

if age >= 18:
    print("You are an adult!")
else:
    print("You are a minor")
\`\`\`

**When to use it:**
- When there are two alternatives
- When you need to handle both cases

**Example:**
\`\`\`python
password = "secret123"

if password == "secret123":
    print("Access granted")
else:
    print("Wrong password")
\`\`\``
      },
      {
        title: "Nested conditions",
        content: `You can nest if inside another if:

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

**When to use it:**
- When you need to check an additional condition inside the main one
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

Python uses indentation to define the structure of code. This means spaces matter.

**Rules:**
1. After a colon : there is always an indent
2. Usually 4 spaces are used (or 1 tab)
3. All lines at the same indent level belong to the same block
4. Incorrect indentation will cause an error!

**Correct:**
\`\`\`python
if True:
    print("This is inside if")
    print("This is also inside if")
print("This is outside if")
\`\`\`

**Incorrect:**
\`\`\`python
if True:
print("Error! No indentation")
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
      code: `# Multiple conditions
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
      explanation: "Shows how to nest if inside another if for complex checks."
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
    print("Cannot drive")`,
      explanation: "Demonstrates combining conditional statements with logical operators."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting the colon after the condition",
      explanation: "After if, elif, and else there must always be a colon :",
      correctApproach: "Always write: if condition: (with a colon)"
    },
    {
      mistake: "Incorrect indentation",
      explanation: "Code inside if/elif/else must be indented. Without indentation you'll get an error.",
      correctApproach: "Use 4 spaces for indentation after the colon"
    },
    {
      mistake: "Confusing elif and else",
      explanation: "elif checks an additional condition; else runs when all conditions are False.",
      correctApproach: "elif = 'else if', else = 'otherwise' (no condition)"
    },
    {
      mistake: "Using = instead of == in conditions",
      explanation: "= is assignment, == is comparison. Conditions need ==.",
      correctApproach: "In conditions always use == for comparison"
    }
  ],
  
  summary: `In this lesson we learned:

1. Conditional statements — if, elif, else for making decisions
2. Python syntax — colon : and indentation instead of braces
3. Simple if — for one condition
4. if with else — for two alternatives
5. if with elif — for many conditions
6. Nested conditions — if inside if
7. Indentation — the importance of correct indentation in Python

Now you can create programs that make decisions based on different conditions!

Next lesson — the while loop for repeating actions!`,
  
  practiceTask: {
    title: "Student grading system",
    description: "Create a program to grade several students based on their scores",
    problemStatement: `Write a program that:
1. Creates 4 variables with student scores:
   - score_1 = 95
   - score_2 = 85
   - score_3 = 65
   - score_4 = 55
2. For each score uses if/else to check:
   - If score >= 60: prints "passed"
   - If score < 60: prints "failed"
3. For each student prints:
   - The score and the result (passed/failed)`,
    outputFormat: `Example output:
Student 1:
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
        explanation: "The program processes 4 different scores and prints the result (passed/failed) for each student"
      }
    ],
    solution: {
      code: `# Student grading system
score_1 = 95
score_2 = 85
score_3 = 65
score_4 = 55

# Process first student
print("Student 1:")
print("Score: " + str(score_1))
if score_1 >= 60:
    print("passed")
else:
    print("failed")
print()

# Process second student
print("Student 2:")
print("Score: " + str(score_2))
if score_2 >= 60:
    print("passed")
else:
    print("failed")
print()

# Process third student
print("Student 3:")
print("Score: " + str(score_3))
if score_3 >= 60:
    print("passed")
else:
    print("failed")
print()

# Process fourth student
print("Student 4:")
print("Score: " + str(score_4))
if score_4 >= 60:
    print("passed")
else:
    print("failed")`,
      explanation: "The solution uses simple if/else to check whether score >= 60 (passed) or < 60 (failed)."
    },
    hints: [
      "Create 4 variables: score_1, score_2, score_3, score_4",
      "Use if/else to check whether score >= 60",
      "If score >= 60: print 'passed'",
      "If score < 60: print 'failed'",
      "Repeat the code for each student (score_1, score_2, score_3, score_4)"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 10\nif x > 5:\n    print('Greater than 5')\nprint('End')\n```",
        options: [
          "Greater than 5\nEnd",
          "End",
          "Greater than 5",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The condition x > 5 is True, so print('Greater than 5') runs, then print('End') runs outside if."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nage = 15\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')\n```",
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
        question: "What will this code print?\n\n```python\nscore = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('F')\n```",
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
        explanation: "In Python, a colon : always follows if, elif, and else"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 5\ny = 10\nif x > 3:\n    if y > 5:\n        print('Both conditions True')\n    else:\n        print('Only first condition True')\nelse:\n    print('First condition False')\n```",
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
