/**
 * Lesson 02-4: break, continue, else in loops and useful operators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_4 = {
  lessonId: "lesson-02-4",
  moduleId: "module-02",
  order: 4,
  title: "break, continue, else in loops",
  
  learningObjectives: [
    "Use break to exit a loop",
    "Apply continue to skip an iteration",
    "Understand else in loops",
    "Use useful operators: in, not in, min, max"
  ],
  
  prerequisites: ["lesson-02-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "break and continue in for",
        content: `**break** and **continue** work the same way in for as in while.

**break - exiting the loop:**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number == 7:
        print("Found 7, exiting!")
        break
    print(number)
\`\`\`

**Output:**
\`\`\`
1
2
3
4
5
6
Found 7, exiting!
\`\`\`

**continue - skipping an iteration:**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number % 2 == 0:  # if even
        continue  # skip
    print(number)  # print only odds
\`\`\`

**Output:**
\`\`\`
1
3
5
7
9
\`\`\``
      },
      {
        title: "else in for loops",
        content: `**else** in a for loop runs only if the loop finished normally (not via break).

**Search example:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
target = 10

for number in numbers:
    if number == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found in the list")
\`\`\`

**Output:**
\`\`\`
10 not found in the list
\`\`\`

**If found:**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
target = 3

for number in numbers:
    if number == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found in the list")
\`\`\`

**Output:**
\`\`\`
Found 3!
\`\`\`

**Important:** else runs only if break did NOT run!`
      },
      {
        title: "The in operator",
        content: `The **in** operator checks whether an item is in a sequence.

**Syntax:**
\`\`\`python
item in sequence  # returns True or False
\`\`\`

**Examples:**
\`\`\`python
# Check in a list
fruits = ["apple", "banana", "orange"]
print("apple" in fruits)  # True
print("grape" in fruits)  # False

# Check in a string
text = "Python"
print("P" in text)  # True
print("x" in text)  # False

# Check in a dictionary (by keys)
student = {"name": "Ivan", "age": 15}
print("name" in student)  # True
print("Ivan" in student)  # False (checks keys, not values)
\`\`\`

**Using with if:**
\`\`\`python
fruits = ["apple", "banana", "orange"]

if "apple" in fruits:
    print("Apple is in the list!")
else:
    print("Apple is not there")
\`\`\``
      },
      {
        title: "The not in operator",
        content: `The **not in** operator checks whether an item is NOT in a sequence.

**Syntax:**
\`\`\`python
item not in sequence  # returns True if absent
\`\`\`

**Examples:**
\`\`\`python
fruits = ["apple", "banana", "orange"]

print("grape" not in fruits)  # True (absent)
print("apple" not in fruits)  # False (present)

# Using with if
if "grape" not in fruits:
    print("No grape, adding...")
    fruits.append("grape")
\`\`\`

**When to use:**
- To check that an item is absent
- When adding new items
- For filtering`
      },
      {
        title: "The min() and max() functions",
        content: `**min()** and **max()** find the minimum and maximum values.

**Syntax:**
\`\`\`python
min(sequence)  # minimum value
max(sequence)  # maximum value
\`\`\`

**Examples:**
\`\`\`python
# With a list of numbers
numbers = [5, 2, 8, 1, 9, 3]
print(min(numbers))  # 1
print(max(numbers))  # 9

# With a string (by ASCII codes)
text = "Python"
print(min(text))  # 'P' (smallest character)
print(max(text))  # 'y' (largest character)

# With several arguments
print(min(5, 2, 8))  # 2
print(max(5, 2, 8))  # 8
\`\`\`

**Practical use:**
\`\`\`python
grades = [85, 92, 78, 96, 88]
print(f"Best grade: {max(grades)}")
print(f"Worst grade: {min(grades)}")
\`\`\``
      },
      {
        title: "Combining break, continue, else",
        content: `You can combine break, continue, and else for complex tasks.

**Example: Finding the first even number**
\`\`\`python
numbers = [1, 3, 5, 8, 9, 11]

for number in numbers:
    if number % 2 == 0:
        print(f"Found first even number: {number}")
        break
else:
    print("No even numbers found")
\`\`\`

**Example: Filtering and processing**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number < 3:
        continue  # skip small numbers
    if number > 8:
        break  # exit if greater than 8
    print(number * 2)  # double
\`\`\`

**Output:**
\`\`\`
6
8
10
12
14
16
\`\`\``
      },
      {
        title: "Practical tips",
        content: `**When to use break:**
- When you found what you were looking for
- When you reached your goal and do not need to continue
- For optimization (do not process all items)

**When to use continue:**
- When you need to skip the current iteration
- For filtering data
- For processing only certain values

**When to use else:**
- To confirm the loop finished normally
- To handle the "not found" case
- For an alternative action after the loop

**Optimization:**
- Use break for early exit
- Use continue to skip unneeded iterations
- Use in/not in instead of loops to check membership`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: break in for",
      code: `# Search with break
numbers = [1, 2, 3, 4, 5, 6, 7]

for number in numbers:
    if number == 5:
        print("Found 5!")
        break
    print(number)`,
      explanation: "Demonstrates early exit from a for loop with break."
    },
    {
      title: "Example 2: continue in for",
      code: `# Filtering with continue
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number % 2 == 0:
        continue  # skip evens
    print(number)  # print only odds`,
      explanation: "Shows how to skip certain iterations with continue."
    },
    {
      title: "Example 3: else in for",
      code: `# Search with else
numbers = [1, 2, 3, 4, 5]
target = 10

for number in numbers:
    if number == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found")`,
      explanation: "Demonstrates using else to handle the 'not found' case."
    },
    {
      title: "Example 4: The in operator",
      code: `# Membership check
fruits = ["apple", "banana", "orange"]

if "apple" in fruits:
    print("Apple is in the list!")

# Check in a string
text = "Python"
if "Py" in text:
    print("'Py' found in the string")`,
      explanation: "Shows using the in operator to check membership."
    },
    {
      title: "Example 5: min() and max()",
      code: `# Finding minimum and maximum
grades = [85, 92, 78, 96, 88]

print(f"Best grade: {max(grades)}")
print(f"Worst grade: {min(grades)}")`,
      explanation: "Demonstrates using min() and max() to find extreme values."
    },
    {
      title: "Example 6: Combining break, continue, else",
      code: `# Complex logic
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number < 3:
        continue  # skip
    if number > 7:
        break  # exit
    print(number)
else:
    print("Loop finished normally")`,
      explanation: "Shows combining break, continue, and else in one loop."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing break and continue",
      explanation: "break exits the loop completely; continue only skips the current iteration.",
      correctApproach: "break = exit the loop, continue = skip current iteration, keep looping"
    },
    {
      mistake: "Misunderstanding else in loops",
      explanation: "else runs only if the loop finished normally (not via break).",
      correctApproach: "else in a loop = 'if the loop finished without break'"
    },
    {
      mistake: "Using a loop instead of in",
      explanation: "To check membership, prefer in over a loop.",
      correctApproach: "Use 'item in sequence' instead of a loop for membership checks"
    },
    {
      mistake: "Forgetting about min() and max()",
      explanation: "Ready-made functions exist for finding min/max; you do not need to write a loop.",
      correctApproach: "Use min() and max() instead of writing your own loop"
    }
  ],
  
  summary: `In this lesson we learned:

1. break in for - early exit from a loop
2. continue in for - skip the current iteration
3. else in loops - run code after normal completion
4. The in operator - check membership
5. The not in operator - check absence
6. min() and max() - find minimum and maximum
7. Combining tools - break, continue, else together

You can now control loops effectively and use useful operators!

Next lesson - nested loops and conditions!`,
  
  practiceTask: {
    title: "Password validation system",
    description: "Create a program that checks password strength",
    problemStatement: `Write a program that:
1. Has a list of forbidden passwords: forbidden = ["123456", "password", "qwerty"]
2. Reads a password from input
3. Checks the password:
   - If the password is in forbidden: "Password is forbidden!"
   - Else if length < 6: "Password is too short!"
   - Else if it has no digits: "Password must contain digits!"
   - Else: "Password accepted!"
4. Use the in operator, a for loop, and break to search for digits

Input format:
MyPass123`,
    outputFormat: `Checking password: MyPass123
Password accepted!`,
    examples: [
      {
        input: `MyPass123`,
        output: `Checking password: MyPass123
Password accepted!`,
        explanation: "Long password with digits, not in the forbidden list"
      },
      {
        input: `password`,
        output: `Checking password: password
Password is forbidden!`,
        explanation: "Password is in the forbidden list"
      },
      {
        input: `abc`,
        output: `Checking password: abc
Password is too short!`,
        explanation: "Length 3 < 6"
      }
    ],
    solution: {
      code: `forbidden = ["123456", "password", "qwerty"]
test_password = input().strip()

print(f"Checking password: {test_password}")

if test_password in forbidden:
    print("Password is forbidden!")
elif len(test_password) < 6:
    print("Password is too short!")
else:
    has_digit = False
    for char in test_password:
        if char.isdigit():
            has_digit = True
            break

    if not has_digit:
        print("Password must contain digits!")
    else:
        print("Password accepted!")`,
      explanation: "Read the password from stdin and check with in, len, and a loop with break for digits."
    },
    hints: [
      "Read the password: test_password = input().strip()",
      "Check 'password in forbidden'",
      "Use len() for length",
      "Search for digits with a for loop, char.isdigit(), and break"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nfor n in numbers:\n    if n == 3:\n        break\n    print(n)\n```",
        options: [
          "1\n2",
          "1\n2\n3",
          "1\n2\n3\n4\n5",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "It prints 1, 2. When n == 3, break runs and the loop stops."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nfor n in numbers:\n    if n % 2 == 0:\n        continue\n    print(n)\n```",
        options: [
          "1\n3\n5",
          "2\n4",
          "1\n2\n3\n4\n5",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "continue skips even numbers, so only odds print: 1, 3, 5."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nnumbers = [1, 2, 3]\nfor n in numbers:\n    if n == 10:\n        break\nelse:\n    print('Not found')\n```",
        options: [
          "Not found",
          "Nothing",
          "1\n2\n3",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "10 was not found, break did not run, so the else block runs."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does 'a' in 'Python' return?",
        options: [
          "True",
          "False",
          "An error",
          "None"
        ],
        correctAnswer: 1,
        explanation: "'a' is not in the string 'Python', so it returns False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nnumbers = [5, 2, 8, 1, 9]\nprint(max(numbers))\n```",
        options: [
          "9",
          "1",
          "8",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "max() finds the maximum value in the list, which is 9."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When does else run in a for loop?",
        options: [
          "Always after the loop",
          "Only if break did not run",
          "Only if break did run",
          "Never"
        ],
        correctAnswer: 1,
        explanation: "else in a loop runs only if the loop finished normally (break did not run)."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
