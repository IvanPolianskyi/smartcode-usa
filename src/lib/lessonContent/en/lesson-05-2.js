/**
 * Lesson 05-2: Exception Types and Error Handling
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_05_2 = {
  lessonId: "lesson-05-2",
  moduleId: "module-05",
  order: 2,
  title: "Exception Types and Error Handling",

  learningObjectives: [
    "Distinguish common Python exception types",
    "Handle ValueError, TypeError, ZeroDivisionError, IndexError, KeyError, and FileNotFoundError",
    "Catch several error types in one or more except blocks",
    "Use except Exception and as e to access the message",
    "Prefer specific except blocks over overly general ones"
  ],

  prerequisites: ["lesson-05-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Exception hierarchy in Python",
        content: `In Python almost all errors are classes that inherit from \`BaseException\`. For normal handling, \`Exception\` and its subclasses matter most.

**Simplified scheme:**

\`\`\`
BaseException
 └── Exception
      ├── ValueError
      ├── TypeError
      ├── ZeroDivisionError
      ├── IndexError
      ├── KeyError
      ├── FileNotFoundError
      └── ... many others
\`\`\`

**Why this matters:**

- \`except ValueError\` catches only ValueError (and its subclasses)
- \`except Exception\` catches almost all “ordinary” errors
- \`except:\` without a type even catches KeyboardInterrupt — almost always a bad idea

Remember: the more **specific** the except, the clearer the program behavior.`
      },
      {
        title: "ValueError, TypeError, ZeroDivisionError",
        content: `**ValueError** — the value has the right type, but invalid content.

\`\`\`python
int("hello")      # ValueError
int("3.14")       # ValueError (int needs a whole-number form)
\`\`\`

**TypeError** — an operation was applied to an object of the wrong type.

\`\`\`python
"5" + 5           # TypeError
len(10)           # TypeError
\`\`\`

**ZeroDivisionError** — division or modulo by zero.

\`\`\`python
10 / 0            # ZeroDivisionError
10 % 0            # ZeroDivisionError
\`\`\`

**Handling example:**

\`\`\`python
try:
    a = int(input())
    b = int(input())
    print(a / b)
except ValueError:
    print("Integers are required")
except ZeroDivisionError:
    print("Division by zero")
\`\`\``
      },
      {
        title: "IndexError, KeyError, FileNotFoundError",
        content: `**IndexError** — index outside a sequence.

\`\`\`python
nums = [1, 2, 3]
print(nums[10])   # IndexError
\`\`\`

**KeyError** — key missing from a dictionary.

\`\`\`python
user = {"name": "Olya"}
print(user["age"])  # KeyError
\`\`\`

**FileNotFoundError** — file or path does not exist.

\`\`\`python
open("no_such_file.txt")  # FileNotFoundError
\`\`\`

**Safer alternatives (sometimes better than except):**

\`\`\`python
# Instead of KeyError
age = user.get("age", 0)

# Instead of IndexError — check length
if index < len(nums):
    print(nums[index])
\`\`\`

But except is still useful when the error may occur deeper in the code or when working with files.`
      },
      {
        title: "Multiple types in except and block order",
        content: `You can catch several types in one block:

\`\`\`python
try:
    process(data)
except (ValueError, TypeError) as e:
    print(f"Data problem: {e}")
\`\`\`

Or in separate blocks — when the reaction differs:

\`\`\`python
try:
    items = [10, 20, 30]
    index = int(input())
    print(items[index])
except ValueError:
    print("Index must be a number")
except IndexError:
    print("No such element")
\`\`\`

**Important about order:**

Put **specific** types first, then more general ones.

\`\`\`python
# Correct
except ValueError:
    ...
except Exception:
    ...

# Wrong — ValueError never reaches here
# if Exception is above
except Exception:
    ...
except ValueError:
    ...
\`\`\``
      },
      {
        title: "except Exception and as e",
        content: `\`as e\` stores the exception object — you can read the message:

\`\`\`python
try:
    int("abc")
except ValueError as e:
    print(type(e))   # <class 'ValueError'>
    print(e)         # invalid literal for int() with base 10: 'abc'
    print(str(e))    # the same message as a string
\`\`\`

**except Exception** — a safety net for unexpected errors:

\`\`\`python
try:
    risky_operation()
except ValueError as e:
    print(f"Validation: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
\`\`\`

**When to use Exception:**

- At the program boundary (CLI, request handler) to show a friendly message
- With mandatory logging of details

**When NOT to use it as the only except:**

- Inside library functions instead of specific types
- Without \`as e\` and without any message`
      },
      {
        title: "Practical tips for choosing a type",
        content: `**Quick cheat sheet:**

| Situation | Typical exception |
|----------|-----------------|
| \`int("x")\`, bad format | ValueError |
| \`"a" + 1\`, wrong type | TypeError |
| \`n / 0\` | ZeroDivisionError |
| \`list[i]\` out of range | IndexError |
| \`dict[key]\` missing key | KeyError |
| \`open\` of a missing file | FileNotFoundError |

**Combined handling example:**

\`\`\`python
data = {"a": 10, "b": 0}
key = input()
try:
    print(100 / data[key])
except KeyError:
    print("Error: KeyError")
except ZeroDivisionError:
    print("Error: ZeroDivisionError")
except Exception as e:
    print(f"Other error: {type(e).__name__}")
\`\`\`

In the next lesson we will learn to create **custom** exception classes for domain logic.`
      }
    ]
  },

  codeExamples: [
    {
      title: "ValueError and ZeroDivisionError",
      code: `try:
    a = int("10")
    b = int("0")
    print(a / b)
except ValueError:
    print("Error: ValueError")
except ZeroDivisionError:
    print("Error: ZeroDivisionError")`,
      explanation: "First successful int(), then ZeroDivisionError on division."
    },
    {
      title: "IndexError and KeyError",
      code: `nums = [1, 2, 3]
user = {"name": "Ivan"}
try:
    print(nums[5])
except IndexError as e:
    print(f"List: {e}")
try:
    print(user["age"])
except KeyError as e:
    print(f"Dict: missing key {e}")`,
      explanation: "Shows typical collection access errors."
    },
    {
      title: "Several types in one except",
      code: `try:
    value = int("hello")
except (ValueError, TypeError) as e:
    print(f"Data problem: {e}")`,
      explanation: "One handler for several related errors."
    },
    {
      title: "except Exception as a fallback",
      code: `try:
    result = 10 / int("2")
    print(result)
except ValueError:
    print("Not a number")
except Exception as e:
    print(f"Other: {type(e).__name__}: {e}")`,
      explanation: "Specific ValueError first, then general Exception."
    }
  ],

  commonMistakes: [
    {
      mistake: "Overly general except first",
      explanation: "If except Exception is above ValueError, the specific block never runs.",
      correctApproach: "Specific types first, Exception at the end."
    },
    {
      mistake: "Confusing ValueError and TypeError",
      explanation: "ValueError — bad value of the right type; TypeError — operation with the wrong type.",
      correctApproach: "int('x') → ValueError; 'a' + 1 → TypeError."
    },
    {
      mistake: "Ignoring the exception message",
      explanation: "Without as e, users and developers do not see details.",
      correctApproach: "except SomeError as e: print(e) or log str(e)."
    },
    {
      mistake: "Catching FileNotFoundError with a bare except",
      explanation: "You might accidentally hide PermissionError or other file problems.",
      correctApproach: "except FileNotFoundError as e: ... and handle other file errors separately if needed."
    }
  ],

  summary: `In this lesson we studied exception types:

1. ValueError, TypeError, ZeroDivisionError — value, type, and division errors
2. IndexError, KeyError, FileNotFoundError — data and file access
3. Several types in one except — (A, B) as e
4. except Exception — fallback after specific blocks
5. as e — access to the error message

Next — creating custom exceptions for business logic.`,

  practiceTask: {
    title: "Calculator with different error types",
    description: "Handle ValueError and ZeroDivisionError in a simple calculator",
    problemStatement: `Read three lines from stdin:
1. first number (as a string)
2. operation: one character +, -, *, or /
3. second number (as a string)

Convert the numbers with float() and perform the operation.

- On success print the result
- On conversion error print: Error: ValueError
- On division by zero print: Error: ZeroDivisionError
- On unknown operation print: Error: unknown operation`,
    outputFormat: `5.0`,
    examples: [
      {
        input: `10
/
2`,
        output: `5.0`,
        explanation: "Successful division 10/2"
      },
      {
        input: `10
/
0`,
        output: `Error: ZeroDivisionError`,
        explanation: "Division by zero"
      },
      {
        input: `abc
+
1`,
        output: `Error: ValueError`,
        explanation: "Invalid first number"
      }
    ],
    solution: {
      code: `a_str = input()
op = input()
b_str = input()
try:
    a = float(a_str)
    b = float(b_str)
    if op == "+":
        print(a + b)
    elif op == "-":
        print(a - b)
    elif op == "*":
        print(a * b)
    elif op == "/":
        print(a / b)
    else:
        print("Error: unknown operation")
except ValueError:
    print("Error: ValueError")
except ZeroDivisionError:
    print("Error: ZeroDivisionError")`,
      explanation: "float() may raise ValueError; division by 0 — ZeroDivisionError."
    },
    hints: [
      "Read three lines: number, operation, number",
      "Use float() for conversion",
      "Handle ValueError and ZeroDivisionError separately",
      "For an unknown operation you do not need except — use a regular else"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which exception occurs with int(\"abc\")?",
        options: ["TypeError", "ValueError", "IndexError", "KeyError"],
        correctAnswer: 1,
        explanation: "The string has type str, but the value is unsuitable for int — ValueError."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does except (ValueError, TypeError) as e mean?",
        options: [
          "Catches both types in one block",
          "Catches only ValueError",
          "Creates a new exception",
          "It is a syntax error"
        ],
        correctAnswer: 0,
        explanation: "A tuple of types lets you handle several exceptions the same way."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndata = {\"x\": 1}\ntry:\n    print(data[\"y\"])\nexcept KeyError:\n    print(\"missing key\")\n```",
        options: ["1", "missing key", "KeyError", "None"],
        correctAnswer: 1,
        explanation: "Key \"y\" is missing — except KeyError runs."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "except Exception should be placed before except ValueError.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Specific types first; otherwise the general block catches everything."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which exception for nums[10] when len(nums) == 3?",
        options: ["KeyError", "ValueError", "IndexError", "TypeError"],
        correctAnswer: 2,
        explanation: "Index outside the list — IndexError."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is as e used for in except?",
        options: [
          "To get the exception object and its message",
          "To ignore the error",
          "To change the error type",
          "To stop the program"
        ],
        correctAnswer: 0,
        explanation: "as e gives access to the message and exception type."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "FileNotFoundError occurs when open() cannot find a file.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. It is the standard exception for a missing file."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "\"hello\" + 5 raises:",
        options: ["ValueError", "TypeError", "IndexError", "ZeroDivisionError"],
        correctAnswer: 1,
        explanation: "Incompatible types for + — TypeError."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
