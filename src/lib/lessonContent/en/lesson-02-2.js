/**
 * Lesson 02-2: The while loop
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_2 = {
  lessonId: "lesson-02-2",
  moduleId: "module-02",
  order: 2,
  title: "The while loop",
  
  learningObjectives: [
    "Use the while loop",
    "Control loop exit conditions",
    "Avoid infinite loops",
    "Apply while to different tasks"
  ],
  
  prerequisites: ["lesson-02-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is a while loop?",
        content: `A **while** loop repeats code as long as the condition is **True**. It is like saying:
- "Keep going until I eat all the candy"
- "Keep going until I reach 10"
- "Keep going until I find the answer"

**Syntax:**
\`\`\`python
while condition:
    # code that repeats
    action
\`\`\`

**How it works:**
1. Python checks the condition
2. If the condition is True - it runs the code inside the loop
3. After running, it checks the condition again
4. It repeats while the condition is True
5. When the condition becomes False - it exits the loop`
      },
      {
        title: "Simple while example",
        content: `**Example 1: Counter**

\`\`\`python
x = 0

while x < 5:
    print(f"x equals {x}")
    x = x + 1  # or x += 1

print("Loop finished!")
\`\`\`

**What happens:**
- x starts at 0
- While x < 5, the loop runs
- Each iteration increases x by 1
- When x becomes 5, the condition is False and the loop stops

**Output:**
\`\`\`
x equals 0
x equals 1
x equals 2
x equals 3
x equals 4
Loop finished!
\`\`\`

**Important:** Do not forget to change the variable in the condition, or the loop will be infinite!`
      },
      {
        title: "while with else",
        content: `You can add **else** after while. The else code runs only if the loop finished normally (not via break).

\`\`\`python
x = 0

while x < 5:
    print(f"x = {x}")
    x += 1
else:
    print("Loop finished successfully!")
\`\`\`

**When to use else:**
- When you need to run code after a normal loop completion
- To confirm successful completion`
      },
      {
        title: "break - exiting the loop",
        content: `**break** lets you exit the loop early, even if the condition is still True.

\`\`\`python
x = 0

while x < 10:
    print(f"x = {x}")
    if x == 5:
        print("Reached 5, exiting!")
        break
    x += 1

print("After the loop")
\`\`\`

**Output:**
\`\`\`
x = 0
x = 1
x = 2
x = 3
x = 4
x = 5
Reached 5, exiting!
After the loop
\`\`\`

**When to use break:**
- When you found what you were looking for
- When you reached a certain condition and do not need to continue
- For early exit from a loop`
      },
      {
        title: "continue - skipping an iteration",
        content: `**continue** skips the rest of the current iteration and goes to the next condition check.

\`\`\`python
x = 0

while x < 10:
    x += 1
    if x % 2 == 0:  # if x is even
        continue  # skip the rest of the code
    print(f"x = {x} (odd)")

print("Loop finished")
\`\`\`

**Output:**
\`\`\`
x = 1 (odd)
x = 3 (odd)
x = 5 (odd)
x = 7 (odd)
x = 9 (odd)
Loop finished
\`\`\`

**When to use continue:**
- When you need to skip the current iteration
- For filtering data
- For processing only certain values`
      },
      {
        title: "Infinite loops",
        content: `**WARNING!** An infinite loop is when the condition is always True and the loop never ends.

\`\`\`python
while True:
    print("This will print forever!")
\`\`\`

**How to avoid infinite loops:**
1. Always change the variable in the loop condition
2. Make sure the condition will eventually become False
3. Use break to exit when needed

**Example of a correct condition:**
\`\`\`python
x = 0
while x < 10:  # condition will eventually become False
    print(x)
    x += 1  # we change x, so eventually x >= 10
\`\`\`

**Example of an incorrect condition:**
\`\`\`python
x = 0
while x < 10:  # condition never becomes False!
    print(x)
    # forgot to change x!
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Input until the correct value**

\`\`\`python
# Simulated input (in real code use input())
password = ""
attempts = 0

while password != "secret123" and attempts < 3:
    attempts += 1
    # password = input("Enter password: ")  # in a real program
    password = "wrong"  # for the example
    
    if password != "secret123":
        print(f"Incorrect password. Attempts left: {3 - attempts}")
    else:
        print("Password correct!")
\`\`\`

**Example 2: Computing a sum**

\`\`\`python
total = 0
number = 1

while number <= 10:
    total += number
    number += 1

print(f"Sum of numbers from 1 to 10: {total}")
\`\`\`

**Example 3: Finding the first even number**

\`\`\`python
numbers = [1, 3, 5, 8, 9, 11]
index = 0

while index < len(numbers):
    if numbers[index] % 2 == 0:
        print(f"Found even number: {numbers[index]}")
        break
    index += 1
else:
    print("No even numbers found")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Simple counter",
      code: `# Counter from 0 to 4
x = 0

while x < 5:
    print(f"x = {x}")
    x += 1  # increase x by 1

print("Loop finished!")`,
      explanation: "Demonstrates a basic while loop with a counter. It is important to change the variable in the condition."
    },
    {
      title: "Example 2: while with else",
      code: `# Loop with else
x = 0

while x < 5:
    print(f"x = {x}")
    x += 1
else:
    print("Loop finished successfully!")`,
      explanation: "Shows using else after while. else runs after normal loop completion."
    },
    {
      title: "Example 3: break to exit",
      code: `# Using break
x = 0

while x < 10:
    print(f"x = {x}")
    if x == 5:
        print("Reached 5, exiting!")
        break
    x += 1`,
      explanation: "Demonstrates early exit from a loop with break."
    },
    {
      title: "Example 4: continue to skip",
      code: `# Using continue
x = 0

while x < 10:
    x += 1
    if x % 2 == 0:  # if even
        continue  # skip
    print(f"{x} - odd")`,
      explanation: "Shows how to skip the current iteration with continue."
    },
    {
      title: "Example 5: Computing a sum",
      code: `# Sum of numbers from 1 to 10
total = 0
number = 1

while number <= 10:
    total += number
    number += 1

print(f"Sum: {total}")`,
      explanation: "Demonstrates using while to compute a sum of numbers."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Infinite loop",
      explanation: "If you do not change the variable in the condition, the loop runs forever.",
      correctApproach: "Always change the variable in the loop condition (for example, x += 1)"
    },
    {
      mistake: "Incorrect condition",
      explanation: "If the condition is always True, the loop never ends.",
      correctApproach: "Make sure the condition will eventually become False"
    },
    {
      mistake: "Forgetting break or continue",
      explanation: "Sometimes you need to exit early or skip an iteration.",
      correctApproach: "Use break to exit, continue to skip an iteration"
    },
    {
      mistake: "Confusing break and continue",
      explanation: "break exits the loop completely; continue only skips the current iteration.",
      correctApproach: "break = exit the loop, continue = skip the current iteration"
    }
  ],
  
  summary: `In this lesson we learned:

1. The while loop - repeats code while the condition is True
2. while syntax - while condition: with indentation
3. while with else - run code after normal completion
4. break - early exit from the loop
5. continue - skip the current iteration
6. Infinite loops - how to avoid them
7. Practical uses - counters, search, calculations

You can now use while to repeat actions!

Next lesson - the for loop for iterating over sequences!`,
  
  practiceTask: {
    title: "Guess the number game",
    description: "Create a \"Guess the number\" game with a limited number of attempts",
    problemStatement: `Write a program that:
1. Reads the secret number and the initial number of attempts
2. While attempts remain, reads a guess
3. Before checking, decreases attempts by 1 and prints "Attempts left: ..."
4. If guess == secret: "Congratulations! You guessed it!" and break
5. If guess < secret: "Too low!"
6. If guess > secret: "Too high!"

Input format:
7
5
5
9
7`,
    outputFormat: `Attempts left: 4
Too low!
Attempts left: 3
Too high!
Attempts left: 2
Congratulations! You guessed it!`,
    examples: [
      {
        input: `7
5
5
9
7`,
        output: `Attempts left: 4
Too low!
Attempts left: 3
Too high!
Attempts left: 2
Congratulations! You guessed it!`,
        explanation: "Guesses 5 and 9 are wrong, 7 is a hit"
      },
      {
        input: `10
3
10`,
        output: `Attempts left: 2
Congratulations! You guessed it!`,
        explanation: "Guessed correctly on the first try"
      },
      {
        input: `5
2
1
2`,
        output: `Attempts left: 1
Too low!
Attempts left: 0
Too low!`,
        explanation: "Both guesses are lower than the secret; attempts run out"
      }
    ],
    solution: {
      code: `secret_number = int(input())
attempts = int(input())

while attempts > 0:
    guess = int(input())
    attempts -= 1
    print(f"Attempts left: {attempts}")

    if guess == secret_number:
        print("Congratulations! You guessed it!")
        break
    elif guess < secret_number:
        print("Too low!")
    else:
        print("Too high!")`,
      explanation: "while decreases attempts, reads guess via input(), and compares with the secret; break on a correct guess."
    },
    hints: [
      "Read secret_number and attempts with input()",
      "In the while attempts > 0 loop, read guess = int(input())",
      "Decrease attempts first, then print the remaining count",
      "Use break when the guess is correct"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 0\nwhile x < 3:\n    print(x)\n    x += 1\n```",
        options: [
          "0\n1\n2",
          "0\n1\n2\n3",
          "1\n2\n3",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "x starts at 0; it prints 0, then 1, then 2. When x becomes 3, the condition is False and the loop stops."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 0\nwhile x < 5:\n    if x == 3:\n        break\n    print(x)\n    x += 1\n```",
        options: [
          "0\n1\n2",
          "0\n1\n2\n3",
          "0\n1\n2\n3\n4",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "It prints 0, 1, 2. When x == 3, break runs and the loop stops."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 0\nwhile x < 5:\n    x += 1\n    if x % 2 == 0:\n        continue\n    print(x)\n```",
        options: [
          "1\n3\n5",
          "0\n1\n2\n3\n4",
          "2\n4",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "x increases by 1; if even, continue skips print, so only odds print: 1, 3, 5."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does break do in a while loop?",
        options: [
          "Skips the current iteration",
          "Exits the loop",
          "Continues the loop",
          "Stops the entire program"
        ],
        correctAnswer: 1,
        explanation: "break exits the loop early, even if the condition is still True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does continue do in a while loop?",
        options: [
          "Skips the current iteration",
          "Exits the loop",
          "Stops the loop",
          "Restarts the loop from the beginning"
        ],
        correctAnswer: 0,
        explanation: "continue skips the current iteration and goes to the next condition check."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you avoid an infinite loop?",
        options: [
          "Always change the variable in the condition",
          "Use break",
          "Both options are correct",
          "You cannot avoid it"
        ],
        correctAnswer: 2,
        explanation: "You should always change the variable in the loop condition, or use break to exit."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
