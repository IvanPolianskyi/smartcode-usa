/**
 * Lesson 05-1: Error Handling: try / except / finally
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_05_1 = {
  lessonId: "lesson-05-1",
  moduleId: "module-05",
  order: 1,
  title: "Error Handling: try / except / finally",

  learningObjectives: [
    "Understand what exceptions are and why to handle them",
    "Use try / except blocks to catch errors",
    "Apply else after a successful try",
    "Use finally for code that must always run",
    "Choose when to catch an error and when to let the program stop"
  ],

  prerequisites: ["lesson-04-8"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What are exceptions?",
        content: `While a program runs, **errors** (exceptions) can occur. If you do not handle them, the program crashes.

**Example without handling:**

\`\`\`python
number = int("abc")  # ValueError — the program stops
print("This line will never run")
\`\`\`

**Why handle errors?**

1. **Stability** — the program does not crash on an expected error
2. **Clear messages** — the user sees what went wrong
3. **Recovery** — you can offer to retry input or continue
4. **Resources** — you can properly close files, connections, etc.

**Analogy:** imagine opening a door. If the key does not fit — that is an error. Instead of “breaking,” you can try another key or report the problem.`
      },
      {
        title: "The try / except block",
        content: `The main error-handling construct in Python is \`try\` / \`except\`.

**Syntax:**

\`\`\`python
try:
    # Code that may raise an error
    risky_code()
except SomeError:
    # What to do if an error occurs
    handle_error()
\`\`\`

**Example:**

\`\`\`python
try:
    number = int(input("Enter a number: "))
    print(f"You entered: {number}")
except ValueError:
    print("That is not a number! Try again.")
\`\`\`

**How it works:**

1. Python runs the code in the \`try\` block
2. If there is no error — \`except\` is skipped
3. If a matching exception occurs — control moves to \`except\`
4. The program continues after the block

**Important:** catch only errors you can actually handle. Do not hide everything silently — bugs become hard to find.`
      },
      {
        title: "The else block",
        content: `The \`else\` block runs **only if** \`try\` had no exceptions.

\`\`\`python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Division by zero!")
else:
    print(f"Result: {result}")  # Runs only on success
\`\`\`

**Why else?**

- Separate “success” code from code that may raise
- Make intent clearer: “if all is ok — do this”

\`\`\`python
try:
    value = int(input())
except ValueError:
    print("Input error")
else:
    print(f"Square: {value ** 2}")
\`\`\`

In this example, squaring happens only after a successful conversion.`
      },
      {
        title: "The finally block",
        content: `The \`finally\` block **always** runs — after success and after an error (even if there was a \`return\` in \`try\`/\`except\`).

\`\`\`python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("This line always runs")
\`\`\`

**Typical uses of finally:**

1. Closing files and connections
2. Releasing resources
3. Messaging that the operation finished
4. Logging that a step finished

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error")
finally:
    print("Done")  # Prints after error handling
\`\`\`

**Execution order:** \`try\` → (\`except\` or \`else\`) → \`finally\`.`
      },
      {
        title: "Full try / except / else / finally construct",
        content: `You can combine all parts:

\`\`\`python
try:
    a = int(input())
    b = int(input())
    result = a / b
except ValueError:
    print("Integers are required")
except ZeroDivisionError:
    print("Division by zero is not allowed")
else:
    print(f"Result: {result}")
finally:
    print("Calculation finished")
\`\`\`

**Block order rules:**

1. \`try\` — required
2. One or more \`except\`
3. \`else\` — only after all \`except\`
4. \`finally\` — always last

**When to use which:**

| Block | When |
|------|------|
| try | Code where an error may occur |
| except | Handling a specific error (or several) |
| else | Actions only on success |
| finally | Required cleanup / final message |`
      },
      {
        title: "When to catch errors and when not to",
        content: `Not every error should be caught.

**Catch when:**

- The error is expected (bad user input)
- You can offer an alternative or retry
- You need to keep the program running

**Do not catch “everything” when:**

- It is an internal logic bug (better fix the code)
- You do not know what to do with the error
- Empty \`except:\` or \`except Exception:\` without a message hides bugs

\`\`\`python
# Bad — hides all errors
try:
    do_something()
except:
    pass

# Better — a specific error and a clear message
try:
    do_something()
except ValueError as e:
    print(f"Invalid value: {e}")
\`\`\`

**Principle:** handle what you can respond to reasonably; let the rest surface or propagate up the call stack.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Basic try / except",
      code: `try:
    number = int("42")
    print(number)
except ValueError:
    print("Could not convert to a number")`,
      explanation: "If the string is valid, except does not run. On error — a message is printed."
    },
    {
      title: "try with else",
      code: `try:
    value = int("10")
except ValueError:
    print("Error")
else:
    print(f"Success: {value * 2}")`,
      explanation: "The else block runs only after a successful try."
    },
    {
      title: "try / except / finally",
      code: `try:
    result = 10 / 2
    print(result)
except ZeroDivisionError:
    print("Division by zero")
finally:
    print("Done")`,
      explanation: "finally always runs — on success and on error."
    },
    {
      title: "Safe division with the full construct",
      code: `a = 10
b = 0
try:
    result = a / b
except ZeroDivisionError:
    print("Error: division by zero")
else:
    print(result)
finally:
    print("Done")`,
      explanation: "Shows except, no else on error, and a required finally."
    }
  ],

  commonMistakes: [
    {
      mistake: "Empty except without a message",
      explanation: "except: pass hides errors and makes debugging harder.",
      correctApproach: `try:
    risky()
except ValueError as e:
    print(f"Error: {e}")`
    },
    {
      mistake: "Code in finally that depends on try succeeding",
      explanation: "finally always runs, so variables from try may be undefined.",
      correctApproach: "In finally only clean up resources or print general messages; handle the result in else."
    },
    {
      mistake: "Forgetting that after except the program continues",
      explanation: "After handling, execution continues — that is normal, but plan the logic.",
      correctApproach: "After except set a default or return / continue if continuing is unsafe."
    },
    {
      mistake: "Catching errors where you should fix the code",
      explanation: "try/except does not replace checking indexes and types in your own logic.",
      correctApproach: "Write correct code first; use except for expected failures (input, files, network)."
    }
  ],

  summary: `In this lesson we covered error-handling basics:

1. Exceptions — events that interrupt normal program flow
2. try / except — catching and handling errors
3. else — code only after a successful try
4. finally — code that always runs
5. When to catch errors — only expected situations with a clear response

In the next lesson we will look at specific Python exception types.`,

  practiceTask: {
    title: "Safe division with finally",
    description: "Write a program that divides two numbers and always reports completion",
    problemStatement: `Read two integers a and b from stdin.
Compute a / b in a try block.

- If division succeeds — print the result (as float, e.g. 5.0)
- If b is 0 — print: Error: division by zero
- In the finally block always print: Done

Use try / except / else / finally.`,
    outputFormat: `5.0
Done`,
    examples: [
      {
        input: `10
2`,
        output: `5.0
Done`,
        explanation: "Successful division; finally prints Done"
      },
      {
        input: `10
0`,
        output: `Error: division by zero
Done`,
        explanation: "ZeroDivisionError; else does not run"
      },
      {
        input: `9
3`,
        output: `3.0
Done`,
        explanation: "9/3 = 3.0, then finally"
      }
    ],
    solution: {
      code: `a = int(input())
b = int(input())
try:
    result = a / b
except ZeroDivisionError:
    print("Error: division by zero")
else:
    print(result)
finally:
    print("Done")`,
      explanation: "try divides; except catches zero; else prints the result; finally always prints Done."
    },
    hints: [
      "Read a and b via int(input())",
      "Catch ZeroDivisionError",
      "Print the result in else",
      "print(\"Done\") must be in finally"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which block always runs — after success and after an error?",
        options: ["else", "except", "finally", "try"],
        correctAnswer: 2,
        explanation: "finally always runs, whether or not there was an error."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When does the else block run in try/except/else?",
        options: [
          "Always",
          "Only if try had no exception",
          "Only if there was an exception",
          "Before the try block"
        ],
        correctAnswer: 1,
        explanation: "else runs only after try completes successfully."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ntry:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"Error\")\nfinally:\n    print(\"End\")\n```",
        options: [
          "Error\nEnd",
          "End",
          "Error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "except prints Error, then finally prints End."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Empty except: pass is a good practice for hiding all errors.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. It hides bugs and makes debugging harder."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the correct block order?",
        options: [
          "try → finally → except → else",
          "try → except → else → finally",
          "except → try → else → finally",
          "try → else → except → finally"
        ],
        correctAnswer: 1,
        explanation: "First try, then except, then else, and finally last."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why handle exceptions?",
        options: [
          "So the program does not crash on expected errors",
          "So the code runs faster",
          "So you do not write functions",
          "So you disable syntax errors"
        ],
        correctAnswer: 0,
        explanation: "Exception handling makes a program more resilient to expected failures."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A try block can be used without except if there is finally.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. try/finally without except is allowed — for guaranteed resource cleanup."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
