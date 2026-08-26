/**
 * Lesson 05-3: Creating Custom Exceptions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_05_3 = {
  lessonId: "lesson-05-3",
  moduleId: "module-05",
  order: 3,
  title: "Creating Custom Exceptions",

  learningObjectives: [
    "Create custom exception classes based on Exception",
    "Raise exceptions with raise",
    "Build a hierarchy of domain exceptions",
    "Use raise from for a cause chain",
    "Document custom exceptions with a docstring"
  ],

  prerequisites: ["lesson-05-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Why do we need custom exceptions?",
        content: `Standard types (\`ValueError\`, \`TypeError\`…) are universal, but in real programs it is more convenient to have **names from your domain**.

**Real-life examples:**

- \`InsufficientFundsError\` - not enough money on the account
- \`InvalidEmailError\` - invalid email
- \`BookAlreadyExistsError\` - book already in the catalog

**Advantages:**

1. Code reads like business language
2. You can catch specifically “your” errors without mixing them with unrelated ValueError
3. Easier to build a hierarchy (base \`AppError\` + concrete subclasses)
4. Easier to test and document an API

\`\`\`python
# Less clear
raise ValueError("Insufficient funds")

# Clearer for banking logic
raise InsufficientFundsError("Insufficient funds")
\`\`\``
      },
      {
        title: "Creating an exception class",
        content: `A minimal custom exception is a class that inherits \`Exception\`:

\`\`\`python
class AgeError(Exception):
    """Error related to the user's age."""
    pass
\`\`\`

**With a default message or extra fields:**

\`\`\`python
class AgeError(Exception):
    def __init__(self, age, message="Invalid age"):
        self.age = age
        self.message = message
        super().__init__(f"{message}: {age}")
\`\`\`

**Usage:**

\`\`\`python
raise AgeError(-3)
# AgeError: Invalid age: -3

raise AgeError(150, "Age is too large")
\`\`\`

Always inherit from \`Exception\` (or from your base domain class), not from \`BaseException\`.`
      },
      {
        title: "raise - raising an exception",
        content: `The \`raise\` keyword creates (or re-raises) an exception.

\`\`\`python
def set_age(age):
    if age < 0:
        raise AgeError("Age cannot be negative")
    if age > 120:
        raise AgeError("Age is too large")
    return age
\`\`\`

**raise variants:**

\`\`\`python
raise AgeError("Message")     # new exception
raise AgeError()                   # without text (better with text)
raise                              # re-raise current (only inside except)
\`\`\`

**Re-raise:**

\`\`\`python
try:
    risky()
except AgeError:
    print("Logging age error")
    raise  # propagate further
\`\`\`

Raise exceptions **early** (fail fast) as soon as you detect an invalid state.`
      },
      {
        title: "Exception hierarchy",
        content: `It is convenient to have a base module class and concrete subclasses:

\`\`\`python
class ValidationError(Exception):
    """Base validation exception."""
    pass

class AgeValidationError(ValidationError):
    """Age validation error."""
    pass

class EmailValidationError(ValidationError):
    """Email validation error."""
    pass
\`\`\`

**Hierarchy advantage:**

\`\`\`python
try:
    register_user(name, age, email)
except AgeValidationError as e:
    print(f"Age: {e}")
except EmailValidationError as e:
    print(f"Email: {e}")
except ValidationError as e:
    print(f"Other validation: {e}")
\`\`\`

You can handle specifics or catch **all** validation errors with one block via the base class.

**Rule:** name the base class briefly and clearly (\`BankError\`, \`ParseError\`), subclasses - descriptively.`
      },
      {
        title: "raise from - cause chain",
        content: `Sometimes an inner error (for example, \`ValueError\`) should become your domain error. \`raise ... from ...\` keeps the cause:

\`\`\`python
class ConfigError(Exception):
    pass

def load_port(text):
    try:
        return int(text)
    except ValueError as e:
        raise ConfigError("Port must be an integer") from e
\`\`\`

In the traceback you will see:

- \`ConfigError\` - what happened at your logic level
- \`ValueError\` - the root cause

**raise from None** - opposite, hide the inner cause (use rarely):

\`\`\`python
raise ConfigError("Invalid port") from None
\`\`\`

For learning and most applied tasks prefer \`raise NewError(...) from e\`.`
      },
      {
        title: "Documentation and style",
        content: `**Naming convention:** \`Error\` suffix (\`NotFoundError\`, \`PermissionError\` in your module - with a unique prefix so you do not confuse them with standards).

**Docstring is required for public exceptions:**

\`\`\`python
class BookError(Exception):
    """Base exception for the library system."""
    pass

class BookNotFoundError(BookError):
    """Book was not found in the catalog."""
    pass
\`\`\`

**Typical function template:**

\`\`\`python
def add_book(title, catalog):
    """
    Adds a book to the catalog.

    Raises:
        BookError: if the title is empty or the book already exists
    """
    if not title.strip():
        raise BookError("Title cannot be empty")
    if title in catalog:
        raise BookError(f"Book '{title}' already exists")
    catalog.add(title)
\`\`\`

This way users of your function immediately see which exceptions to expect.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Simple custom exception",
      code: `class AgeError(Exception):
    """Age error."""
    pass

def check_age(age):
    if age < 0:
        raise AgeError("Age cannot be negative")
    print(f"Age {age} accepted")

try:
    check_age(-1)
except AgeError as e:
    print(f"Error: {e}")`,
      explanation: "Class from Exception + raise + except with as e."
    },
    {
      title: "Exception hierarchy",
      code: `class AppError(Exception):
    pass

class NotFoundError(AppError):
    pass

class PermissionDeniedError(AppError):
    pass

try:
    raise NotFoundError("User not found")
except AppError as e:
    print(f"Domain error: {e}")`,
      explanation: "except AppError catches all subclasses."
    },
    {
      title: "raise from",
      code: `class ParseError(Exception):
    pass

def parse_int(text):
    try:
        return int(text)
    except ValueError as e:
        raise ParseError(f"Could not parse '{text}'") from e

try:
    parse_int("abc")
except ParseError as e:
    print(e)
    print(f"Cause: {e.__cause__}")`,
      explanation: "Keeps the chain: ParseError caused by ValueError."
    },
    {
      title: "Exception with extra fields",
      code: `class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Need {amount}, only have {balance}"
        )

try:
    raise InsufficientFundsError(100, 250)
except InsufficientFundsError as e:
    print(e)
    print(e.balance, e.amount)`,
      explanation: "Custom attributes help handle the error programmatically."
    }
  ],

  commonMistakes: [
    {
      mistake: "Inheriting from BaseException",
      explanation: "BaseException includes KeyboardInterrupt and SystemExit - rarely worth catching with business errors.",
      correctApproach: "Inherit from Exception or from your base *Error."
    },
    {
      mistake: "raise a string: raise \"error\"",
      explanation: "In modern Python you do not do that - you need an exception instance.",
      correctApproach: "raise MyError(\"error\")"
    },
    {
      mistake: "One giant exception for everything",
      explanation: "Without a hierarchy it is hard to react differently to different situations.",
      correctApproach: "Base class + several concrete subclasses by scenario."
    },
    {
      mistake: "Swallowing a custom exception with a bare except Exception",
      explanation: "Then the point of a custom type is lost - nobody handles it deliberately.",
      correctApproach: "except MyError as e: ... and only then a general Exception if needed."
    }
  ],

  summary: `In this lesson we learned to create custom exceptions:

1. class MyError(Exception) - minimal template
2. raise - raising a domain error
3. Hierarchy - base class and concrete subclasses
4. raise from - keeping the root cause
5. Docstring and naming with the Error suffix

Next - assert and data validation.`,

  practiceTask: {
    title: "Age validation with AgeError",
    description: "Create a custom exception and an age-checking function",
    problemStatement: `1. Create class AgeError(Exception)
2. Write function check_age(age):
   - if age < 0 - raise AgeError("Age cannot be negative")
   - if age > 120 - raise AgeError("Age is too large")
   - otherwise print: Age {age} accepted
3. Read n, then n integers (ages). For each call check_age in try/except.
4. On AgeError print: Error: {message}`,
    outputFormat: `Age 25 accepted
Error: Age cannot be negative
Error: Age is too large`,
    examples: [
      {
        input: `3
25
-5
150`,
        output: `Age 25 accepted
Error: Age cannot be negative
Error: Age is too large`,
        explanation: "Success, negative age, age too large"
      },
      {
        input: `2
0
120`,
        output: `Age 0 accepted
Age 120 accepted`,
        explanation: "Boundary values 0 and 120 are allowed"
      },
      {
        input: `2
121
-1`,
        output: `Error: Age is too large
Error: Age cannot be negative`,
        explanation: "Both values outside the range"
      }
    ],
    solution: {
      code: `class AgeError(Exception):
    pass

def check_age(age):
    if age < 0:
        raise AgeError("Age cannot be negative")
    if age > 120:
        raise AgeError("Age is too large")
    print(f"Age {age} accepted")

n = int(input())
for _ in range(n):
    age = int(input())
    try:
        check_age(age)
    except AgeError as e:
        print(f"Error: {e}")`,
      explanation: "Custom AgeError is raised in check_age and caught in the loop."
    },
    hints: [
      "class AgeError(Exception): pass",
      "Check age < 0 first, then age > 120",
      "Read n and loop for _ in range(n)",
      "except AgeError as e: print(f\"Error: {e}\")"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which class do custom exceptions usually inherit from?",
        options: ["object", "Exception", "BaseException", "Error"],
        correctAnswer: 1,
        explanation: "Standard practice is to inherit from Exception."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does raise MyError(\"text\") do?",
        options: [
          "Raises a MyError exception",
          "Prints text",
          "Ignores the error",
          "Creates a function"
        ],
        correctAnswer: 0,
        explanation: "raise creates and raises the given exception."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens?\n\n```python\nclass E(Exception):\n    pass\n\ntry:\n    raise E(\"oops\")\nexcept E as e:\n    print(e)\n```",
        options: ["Prints oops", "Program crashes", "Nothing", "SyntaxError"],
        correctAnswer: 0,
        explanation: "Exception is caught; print(e) outputs the message."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "raise NewError(\"...\") from e stores the root cause in __cause__.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. That is exactly what raise from is for."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why build an exception hierarchy?",
        options: [
          "To catch groups of related errors via a base class",
          "To speed up Python",
          "To avoid functions",
          "It is required by syntax"
        ],
        correctAnswer: 0,
        explanation: "A base class lets you handle all subclasses with one except."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Best name for an “insufficient funds” exception?",
        options: [
          "InsufficientFundsError",
          "error1",
          "Exception2",
          "problem"
        ],
        correctAnswer: 0,
        explanation: "A descriptive name with the Error suffix is the accepted style."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "In modern Python it is correct to write raise \"just a string\".",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. You need an exception class instance."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
