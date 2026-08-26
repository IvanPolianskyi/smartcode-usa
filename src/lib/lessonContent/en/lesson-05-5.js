/**
 * Lesson 05-5: Practice: Error Handling in Programs
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_05_5 = {
  lessonId: "lesson-05-5",
  moduleId: "module-05",
  order: 5,
  title: "Practice: Error Handling in Programs",

  learningObjectives: [
    "Build a program with error handling",
    "Implement data validation",
    "Handle different error types",
    "Create a reliable program"
  ],

  prerequisites: ["lesson-05-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Error handling principles",
        content: `**Key error-handling principles:**

1. **Validate at the entrance** - check data before processing
2. **Specific messages** - show clear error messages
3. **Handle at different levels** - handle errors where it makes sense
4. **Logging** - log errors for debugging
5. **Recovery** - try to keep the program running when possible

**Example: Basic error-handling structure**

\`\`\`python
def process_data(data):
    try:
        # Validation
        if not data:
            raise ValueError("Data cannot be empty")

        # Processing
        result = perform_operation(data)
        return result

    except ValueError as e:
        # Validation error handling
        print(f"Validation error: {e}")
        return None
    except Exception as e:
        # Unexpected error handling
        print(f"Unknown error: {e}")
        return None
\`\`\``
      },
      {
        title: "Practical example: Calculator with error handling",
        content: `**Build a calculator with full error handling:**

\`\`\`python
class CalculatorError(Exception):
    """Base calculator exception"""
    pass

class DivisionByZeroError(CalculatorError):
    """Division by zero error"""
    pass

class InvalidInputError(CalculatorError):
    """Invalid input error"""
    pass

def safe_calculate(operation, a, b):
    """
    Safely perform math operations
    """
    try:
        # Validate inputs
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise InvalidInputError("Both arguments must be numbers")

        # Perform operation
        if operation == '+':
            return a + b
        elif operation == '-':
            return a - b
        elif operation == '*':
            return a * b
        elif operation == '/':
            if b == 0:
                raise DivisionByZeroError("Division by zero is not allowed!")
            return a / b
        else:
            raise InvalidInputError(f"Unknown operation: {operation}")

    except DivisionByZeroError as e:
        print(f"Error: {e}")
        return None
    except InvalidInputError as e:
        print(f"Input error: {e}")
        return None
    except CalculatorError as e:
        print(f"Calculator error: {e}")
        return None
    except Exception as e:
        print(f"Unknown error: {e}")
        return None

# Usage
result = safe_calculate('+', 10, 5)  # 15
result = safe_calculate('/', 10, 0)  # None (error handled)
\`\`\``
      },
      {
        title: "Practical example: Working with files",
        content: `**Build a function for safe file work:**

\`\`\`python
import os

class FileError(Exception):
    """Base file-work exception"""
    pass

class FileNotFoundError(FileError):
    """File not found"""
    pass

class FilePermissionError(FileError):
    """No access to the file"""
    pass

def safe_read_file(filename):
    """
    Safely read a file with handling for all errors
    """
    try:
        # Check existence
        if not os.path.exists(filename):
            raise FileNotFoundError(f"File '{filename}' not found")

        # Check access
        if not os.access(filename, os.R_OK):
            raise FilePermissionError(f"No access to file '{filename}'")

        # Read file
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        return content

    except FileNotFoundError as e:
        print(f"Error: {e}")
        return None
    except FilePermissionError as e:
        print(f"Error: {e}")
        return None
    except UnicodeDecodeError as e:
        print(f"Encoding error: could not decode the file")
        return None
    except Exception as e:
        print(f"Unknown error: {e}")
        return None

# Usage
content = safe_read_file("data.txt")
if content:
    print(content)
\`\`\``
      },
      {
        title: "Practical example: Validating user input",
        content: `**Build a user-input validation system:**

\`\`\`python
class ValidationError(Exception):
    """Base validation exception"""
    pass

class AgeValidationError(ValidationError):
    """Age validation error"""
    pass

class EmailValidationError(ValidationError):
    """Email validation error"""
    pass

def validate_age(age):
    """Validate age"""
    if not isinstance(age, int):
        raise AgeValidationError("Age must be an integer")
    if age < 0:
        raise AgeValidationError("Age cannot be negative")
    if age > 120:
        raise AgeValidationError("Age cannot be greater than 120")
    return True

def validate_email(email):
    """Validate email"""
    if not isinstance(email, str):
        raise EmailValidationError("Email must be a string")
    if '@' not in email:
        raise EmailValidationError("Email must contain @")
    if '.' not in email.split('@')[1]:
        raise EmailValidationError("Email has an invalid format")
    return True

def register_user(name, age, email):
    """
    Register a user with validation
    """
    try:
        validate_age(age)
        validate_email(email)

        if not isinstance(name, str) or len(name) == 0:
            raise ValidationError("Name must be a non-empty string")

        user = {
            "name": name,
            "age": age,
            "email": email
        }

        print(f"User {name} registered successfully!")
        return user

    except AgeValidationError as e:
        print(f"Age validation error: {e}")
        return None
    except EmailValidationError as e:
        print(f"Email validation error: {e}")
        return None
    except ValidationError as e:
        print(f"Validation error: {e}")
        return None
    except Exception as e:
        print(f"Unknown error: {e}")
        return None

# Usage
user = register_user("Alex", 25, "alex@example.com")
\`\`\``
      },
      {
        title: "Combined example: Account management system",
        content: `**Build a bank account management system:**

\`\`\`python
class BankError(Exception):
    """Base bank operation exception"""
    pass

class InsufficientFundsError(BankError):
    """Insufficient funds"""
    pass

class InvalidAmountError(BankError):
    """Invalid amount"""
    pass

class AccountNotFoundError(BankError):
    """Account not found"""
    pass

class BankAccount:
    def __init__(self, account_number, owner, initial_balance=0):
        self.account_number = account_number
        self.owner = owner
        self.balance = initial_balance

    def deposit(self, amount):
        """Deposit to the account"""
        try:
            if not isinstance(amount, (int, float)):
                raise InvalidAmountError("Amount must be a number")
            if amount <= 0:
                raise InvalidAmountError("Amount must be positive")

            self.balance += amount
            print(f"Deposited {amount} USD. New balance: {self.balance} USD")
            return self.balance

        except InvalidAmountError as e:
            print(f"Error: {e}")
            return None

    def withdraw(self, amount):
        """Withdraw from the account"""
        try:
            if not isinstance(amount, (int, float)):
                raise InvalidAmountError("Amount must be a number")
            if amount <= 0:
                raise InvalidAmountError("Amount must be positive")
            if amount > self.balance:
                raise InsufficientFundsError(
                    f"Insufficient funds. Balance: {self.balance} USD, "
                    f"requested: {amount} USD"
                )

            self.balance -= amount
            print(f"Withdrew {amount} USD. New balance: {self.balance} USD")
            return self.balance

        except InsufficientFundsError as e:
            print(f"Error: {e}")
            return None
        except InvalidAmountError as e:
            print(f"Error: {e}")
            return None

    def get_balance(self):
        """Get balance"""
        return self.balance

# Usage
account = BankAccount("12345", "Alex", 1000)
account.deposit(500)
account.withdraw(200)
account.withdraw(2000)  # Error: insufficient funds
\`\`\``
      }
    ]
  },

  codeExamples: [
    {
      title: "Example 1: Calculator with error handling",
      code: `# Calculator with error handling
class CalculatorError(Exception):
    pass

def safe_calculate(operation, a, b):
    try:
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise CalculatorError("Arguments must be numbers")
        if operation == '+':
            return a + b
        elif operation == '/':
            if b == 0:
                raise CalculatorError("Division by zero!")
            return a / b
        else:
            raise CalculatorError(f"Unknown operation: {operation}")
    except CalculatorError as e:
        print(f"Error: {e}")
        return None

result = safe_calculate('+', 10, 5)`,
      explanation: "Demonstrates a calculator handling different error types."
    },
    {
      title: "Example 2: Safe file work",
      code: `# Safe file work
def safe_read_file(filename):
    try:
        if not os.path.exists(filename):
            raise FileNotFoundError(f"File '{filename}' not found")
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return None
    except Exception as e:
        print(f"Unknown error: {e}")
        return None

content = safe_read_file("data.txt")`,
      explanation: "Shows safe file work with error handling."
    },
    {
      title: "Example 3: Validating user input",
      code: `# Validating user input
class ValidationError(Exception):
    pass

def validate_user_input(name, age, email):
    try:
        if not name or len(name) == 0:
            raise ValidationError("Name cannot be empty")
        if not isinstance(age, int) or age < 18:
            raise ValidationError("Age must be at least 18")
        if '@' not in email:
            raise ValidationError("Email must contain @")
        return True
    except ValidationError as e:
        print(f"Validation error: {e}")
        return False

validate_user_input("Alex", 25, "alex@example.com")`,
      explanation: "Demonstrates validating user input with error handling."
    },
    {
      title: "Example 4: Bank account",
      code: `# Bank account with error handling
class InsufficientFundsError(Exception):
    pass

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        try:
            if amount > self.balance:
                raise InsufficientFundsError("Insufficient funds")
            self.balance -= amount
            return self.balance
        except InsufficientFundsError as e:
            print(f"Error: {e}")
            return None

account = BankAccount(1000)
account.withdraw(500)
account.withdraw(1000)  # Error`,
      explanation: "Shows a bank account class with error handling."
    }
  ],

  commonMistakes: [
    {
      mistake: "Not validating data at the entrance",
      explanation: "Without validation the program may get bad data and behave incorrectly.",
      correctApproach: "Always validate input data before processing"
    },
    {
      mistake: "Hiding errors without messages",
      explanation: "Without messages the user will not understand what went wrong.",
      correctApproach: "Always show clear error messages"
    },
    {
      mistake: "Handling all errors the same way",
      explanation: "Different error types need different handling.",
      correctApproach: "Handle different error types separately; use an exception hierarchy"
    },
    {
      mistake: "Not logging critical errors",
      explanation: "Without logging it is hard to debug and understand problems.",
      correctApproach: "Log all critical errors for later analysis"
    }
  ],

  summary: `In this lesson we learned:

1. Error-handling principles - validation, specific messages, logging
2. Practical examples - calculator, files, input validation
3. Combined systems - bank accounts with full error handling
4. Reliable code - building programs that handle errors correctly

Now you can create reliable programs with proper error handling!

This completes module 5 - Error Handling and Exceptions!`,

  practiceTask: {
    title: "Building a simple program with error handling",
    description: "Create a simple book-adding program with error handling",
    problemStatement: `Write a program that:
1. Creates a custom BookError exception
2. Creates function add_book(title, author) with validation and error handling
3. Reads from stdin n pairs (title, author) and calls add_book for each

Input format:
- number n
- for each book: a title line, then an author line
(empty title or author - validation error)`,
    outputFormat: `Book 'Harry Potter' added successfully
Error: Book title cannot be empty
Error: Book 'Harry Potter' already exists`,
    examples: [
      {
        input: `3
Harry Potter
J. Rowling

Author
Harry Potter
Another author`,
        output: `Book 'Harry Potter' added successfully
Error: Book title cannot be empty
Error: Book 'Harry Potter' already exists`,
        explanation: "Success, empty title, duplicate"
      },
      {
        input: `2
Kobzar
T. Shevchenko
Kobzar
Other`,
        output: `Book 'Kobzar' added successfully
Error: Book 'Kobzar' already exists`,
        explanation: "Second attempt with the same title - BookError"
      },
      {
        input: `2
Dune

1984
Orwell`,
        output: `Error: Author cannot be empty
Book '1984' added successfully`,
        explanation: "Empty author, then successful add"
      }
    ],
    solution: {
      code: `class BookError(Exception):
    pass

books = {}

def add_book(title, author):
    try:
        if not title or len(title.strip()) == 0:
            raise ValueError("Book title cannot be empty")
        if not author or len(author.strip()) == 0:
            raise ValueError("Author cannot be empty")
        if title in books:
            raise BookError(f"Book '{title}' already exists")
        books[title] = author
        print(f"Book '{title}' added successfully")
        return True
    except ValueError as e:
        print(f"Error: {e}")
        return False
    except BookError as e:
        print(f"Error: {e}")
        return False

n = int(input())
for _ in range(n):
    title = input()
    author = input()
    add_book(title, author)`,
      explanation: "Read title/author pairs from stdin and handle ValueError/BookError."
    },
    hints: [
      "Create class BookError from Exception",
      "Read n, then for each book two lines via input()",
      "An empty line is a validation error",
      "Duplicate title - BookError"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which error-handling principle is most important?",
        options: [
          "Validate at the entrance",
          "Execution speed",
          "Minimal code",
          "No comments"
        ],
        correctAnswer: 0,
        explanation: "Validate at the entrance is one of the most important principles because it prevents processing bad data."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to show specific error messages?",
        options: [
          "So the user understands what went wrong",
          "So the code runs faster",
          "So it uses less memory",
          "There are no advantages"
        ],
        correctAnswer: 0,
        explanation: "Specific messages help the user understand and fix the problem."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What is wrong with this code?\n\n```python\ndef process(data):\n    try:\n        result = data / 0\n    except:\n        pass\n```",
        options: [
          "Empty except hides errors",
          "Incorrect try syntax",
          "Incorrect except syntax",
          "Everything is correct"
        ],
        correctAnswer: 0,
        explanation: "Empty except with pass hides errors without a message, which makes debugging harder."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is an exception hierarchy better?",
        options: [
          "When you need to handle different error types differently",
          "When you need faster code",
          "When you need less memory",
          "Never"
        ],
        correctAnswer: 0,
        explanation: "An exception hierarchy lets you handle different error types at different levels (specific and general)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is data validation?",
        options: [
          "Checking that input data is correct",
          "Saving data to a file",
          "Deleting data",
          "Sorting data"
        ],
        correctAnswer: 0,
        explanation: "Data validation checks that input data is correct before processing."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
