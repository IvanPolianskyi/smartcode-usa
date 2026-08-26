/**
 * Lesson 05-4: Assert and Data Validation
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_05_4 = {
  lessonId: "lesson-05-4",
  moduleId: "module-05",
  order: 4,
  title: "Assert and Data Validation",

  learningObjectives: [
    "Use assert to check internal assumptions",
    "Understand the difference between assert and raise ValueError",
    "Validate input data at the program boundary",
    "Write validation functions with clear messages",
    "Choose the right tool: assert for development, exceptions for an API contract"
  ],

  prerequisites: ["lesson-05-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is assert?",
        content: `\`assert\` is a short way to say: “I am sure this condition is true; if not - it is a bug.”

**Syntax:**

\`\`\`python
assert condition
assert condition, "Error message"
\`\`\`

**Example:**

\`\`\`python
def average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    return sum(numbers) / len(numbers)

print(average([10, 20, 30]))  # 20.0
# average([])  → AssertionError: List cannot be empty
\`\`\`

If the condition is \`False\`, Python raises \`AssertionError\`.

**Idea:** assert documents **internal invariants** - things that “should never happen” if the code is correct.`
      },
      {
        title: "How AssertionError works",
        content: `\`\`\`python
x = 5
assert x > 0          # ok
assert x < 0, "x must be negative"  # AssertionError
\`\`\`

**Important feature:** running with optimization (\`python -O\`) **disables** assert!

\`\`\`bash
python -O script.py   # all asserts are ignored
\`\`\`

Therefore you **must not** rely on assert for:

- checking user input
- security (access rights, passwords)
- business rules in production

Use \`raise ValueError\` / custom exceptions for that.

Assert is a tool for **development and testing assumptions**, not a public function contract for external data.`
      },
      {
        title: "Data validation",
        content: `**Validation** is checking that data is correct **before** the main processing.

**Typical checks:**

- type (\`isinstance\`)
- range (age 0-120, score 0-100)
- format (email contains \`@\`)
- required fields (string is not empty)
- consistency between fields

\`\`\`python
def validate_score(score):
    if not isinstance(score, int):
        raise ValueError("Score must be an integer")
    if score < 0 or score > 100:
        raise ValueError("Score must be between 0 and 100")
    return score
\`\`\`

**“Validate at the entrance” principle:** the earlier you reject bad data, the fewer bugs deeper in the code.`
      },
      {
        title: "assert vs raise ValueError",
        content: `This is the key distinction of the lesson.

| | assert | raise ValueError / custom Error |
|--|--------|-----------------------------------|
| Purpose | Developer’s internal assumptions | Contract for external/input data |
| Disabled by -O | Yes | No |
| Typical exception | AssertionError | ValueError, TypeError, YourError |
| User-facing message | Usually no | Yes |

\`\`\`python
# For user input - raise
def set_username(name):
    if not name.strip():
        raise ValueError("Name cannot be empty")
    return name.strip()

# For internal logic after validation - assert
def _normalize(scores):
    assert all(0 <= s <= 100 for s in scores)
    return [s / 100 for s in scores]
\`\`\`

**SmartCode rule:** at the system boundary (stdin, API, form) - \`raise\`; inside after checks - you may use \`assert\`.`
      },
      {
        title: "Practical validation patterns",
        content: `**1. Validator function that returns a value or raises:**

\`\`\`python
def require_positive(n, name="value"):
    if not isinstance(n, (int, float)):
        raise TypeError(f"{name} must be a number")
    if n <= 0:
        raise ValueError(f"{name} must be positive")
    return n
\`\`\`

**2. Validating a dict / record:**

\`\`\`python
def validate_user(data):
    if "name" not in data or not data["name"]:
        raise ValueError("name field is required")
    age = data.get("age")
    if not isinstance(age, int) or age < 0:
        raise ValueError("Invalid age")
    return data
\`\`\`

**3. assert for postconditions:**

\`\`\`python
def clamp(value, low, high):
    result = max(low, min(high, value))
    assert low <= result <= high
    return result
\`\`\`

Combine: outside - clear \`ValueError\`, inside - \`assert\` on invariants.`
      },
      {
        title: "Common mistakes and good messages",
        content: `**Bad messages:**

\`\`\`python
raise ValueError("error")
assert False
\`\`\`

**Better messages:**

\`\`\`python
raise ValueError("Score must be between 0 and 100, got: 150")
assert len(items) > 0, "items cannot be empty before average()"
\`\`\`

**What a message should include:**

1. Which field / value is wrong
2. Which constraint was violated
3. When possible - the actual value

\`\`\`python
def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError(
            f"Score must be between 0 and 100, got: {score}"
        )
    return score
\`\`\`

In the practice task you will validate scores with \`ValueError\` - the right approach for user input.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Basic assert",
      code: `def square_root(x):
    assert x >= 0, "x cannot be negative"
    return x ** 0.5

print(square_root(9))  # 3.0`,
      explanation: "assert checks an internal precondition of the function."
    },
    {
      title: "Validation via ValueError",
      code: `def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError("Score must be between 0 and 100")
    return score

try:
    print(validate_score(85))
    validate_score(150)
except ValueError as e:
    print(f"Error: {e}")`,
      explanation: "For external data use raise ValueError."
    },
    {
      title: "assert after validation",
      code: `def process_scores(scores):
    if not scores:
        raise ValueError("Score list is empty")
    cleaned = [int(s) for s in scores]
    assert all(0 <= s <= 100 for s in cleaned)
    return sum(cleaned) / len(cleaned)

print(process_scores([80, 90, 100]))`,
      explanation: "First the contract via ValueError, then assert on the invariant."
    },
    {
      title: "Message with the actual value",
      code: `def require_in_range(value, low, high):
    if value < low or value > high:
        raise ValueError(
            f"Expected [{low}; {high}], got: {value}"
        )
    return value

print(require_in_range(50, 0, 100))`,
      explanation: "A detailed message makes fixing the error easier."
    }
  ],

  commonMistakes: [
    {
      mistake: "Validating user input with assert",
      explanation: "assert can be disabled with -O, so the check disappears in production.",
      correctApproach: "For stdin/API use raise ValueError or a custom exception."
    },
    {
      mistake: "assert without a message",
      explanation: "AssertionError without text is hard to diagnose.",
      correctApproach: "assert condition, \"what exactly was violated\""
    },
    {
      mistake: "Overly vague ValueError message",
      explanation: "\"bad data\" does not help the user fix the input.",
      correctApproach: "State the field, range, and actual value."
    },
    {
      mistake: "Validating deep inside instead of at the entrance",
      explanation: "Bad data passes through several layers and breaks logic unclearly.",
      correctApproach: "Check data immediately at the system boundary."
    }
  ],

  summary: `In this lesson we studied assert and validation:

1. assert - checking internal assumptions (can be disabled with -O)
2. AssertionError - result of a failed assert
3. Validate at the entrance - protection from bad data
4. raise ValueError - the right tool for an external contract
5. Clear messages - key to convenient error handling

In the next lesson we will reinforce everything in a combined practice task.`,

  practiceTask: {
    title: "Score validation",
    description: "Check scores in the range 0-100 using ValueError",
    problemStatement: `Write function validate_score(score):
- if score < 0 or score > 100 - raise ValueError("Score must be between 0 and 100")
- otherwise return score

Read n, then n integers.
For each:
- call validate_score in try/except
- on success print: OK: {score}
- on ValueError print: Error: {message}

Do not use assert for this task - you need raise ValueError (input validation).`,
    outputFormat: `OK: 85
Error: Score must be between 0 and 100
Error: Score must be between 0 and 100`,
    examples: [
      {
        input: `3
85
-1
101`,
        output: `OK: 85
Error: Score must be between 0 and 100
Error: Score must be between 0 and 100`,
        explanation: "One valid score and two out of range"
      },
      {
        input: `2
0
100`,
        output: `OK: 0
OK: 100`,
        explanation: "Range boundaries inclusive"
      },
      {
        input: `2
50
200`,
        output: `OK: 50
Error: Score must be between 0 and 100`,
        explanation: "Success and a value that is too large"
      }
    ],
    solution: {
      code: `def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError("Score must be between 0 and 100")
    return score

n = int(input())
for _ in range(n):
    score = int(input())
    try:
        validate_score(score)
        print(f"OK: {score}")
    except ValueError as e:
        print(f"Error: {e}")`,
      explanation: "Validation via raise ValueError - the right approach for stdin data."
    },
    hints: [
      "In validate_score use raise ValueError, not assert",
      "Range: 0 <= score <= 100",
      "Read n and loop over scores",
      "Success format: OK: {score}"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which exception does a failed assert raise?",
        options: ["ValueError", "TypeError", "AssertionError", "RuntimeError"],
        correctAnswer: 2,
        explanation: "A failed assert always gives AssertionError."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why should you not validate user input with assert?",
        options: [
          "Because assert can be disabled with python -O",
          "Because assert does not exist in Python",
          "Because assert only works with strings",
          "Because assert is slower than if"
        ],
        correctAnswer: 0,
        explanation: "With -O all asserts are removed, so the check disappears."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens?\n\n```python\nassert 1 == 2, \"not ok\"\n```",
        options: [
          "AssertionError with message \"not ok\"",
          "ValueError",
          "Nothing",
          "Prints \"not ok\""
        ],
        correctAnswer: 0,
        explanation: "Condition is false - AssertionError is raised with the text."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "For checking a score from stdin, raise ValueError is better than assert.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. External data is a contract via ordinary exceptions."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is data validation?",
        options: [
          "Checking that data is correct before processing",
          "Sorting a list",
          "Deleting a file",
          "Compiling a program"
        ],
        correctAnswer: 0,
        explanation: "Validation checks that data meets the rules."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where is assert best placed?",
        options: [
          "For internal invariants after validation",
          "Instead of all ifs in the program",
          "For passwords and access rights",
          "Only in finally"
        ],
        correctAnswer: 0,
        explanation: "Assert fits internal assumptions, not security or input."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A ValueError message should explain what exactly is wrong.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. A clear message helps fix the data."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which syntax is correct?",
        options: [
          "assert x > 0, \"x must be positive\"",
          "assert(x > 0) else \"error\"",
          "assert: x > 0",
          "check x > 0"
        ],
        correctAnswer: 0,
        explanation: "Standard syntax: assert condition, message."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
