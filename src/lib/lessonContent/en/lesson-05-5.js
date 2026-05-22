/**
 * Lesson 05-5: Practice: error handling in programs
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_05_5 = {
  lessonId: "lesson-05-5",
  moduleId: "module-05",
  order: 5,
  title: "Practice: error handling in programs",
  
  learningObjectives: [
    "Create a program with error handling",
    "Implement data validation",
    "Handle different types of errors",
    "Create a reliable program"
  ],
  
  prerequisites: ["lesson-05-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Principles of error handling",
        content: `**Key principles of error handling:**

1. **Input validation** - check the data before processing
2. **Specific messages** - show clear error messages
3. **Processing at different levels** - handle errors where appropriate
4. **Logging** - error log for debugging
5. **Recovery** - try to restore the program when possible

**Example: Basic Error Handling Structure**

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
        # Handle validation errors
        print(f"Validation error: {e}")
        return None
    except Exception as e:
        # Handling unexpected errors
        print(f"Unknown error: {e}")
        return None
\`\`\``
      },
      {
        title: "Practical example: Calculator with error handling",
        content: `**Let's create a calculator with full error handling:**

\`\`\`python
class CalculatorError(Exception):
    """Calculator base exception"""
    pass

class DivisionByZeroError(CalculatorError):
    """Division by zero error"""
    pass

class InvalidInputError(CalculatorError):
    """Incorrect input error"""
    pass

def safe_calculate(operation, a, b):
    """
    Safe execution of mathematical operations
    """
    try:
        # Validation of input data
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise InvalidInputError("Both arguments must be numbers")
        
        # Execution of the operation
        if operation == '+':
            return a + b
        elif operation == '-':
            return a - b
        elif operation == '*':
            return a * b
        elif operation == '/':
            if b == 0:
                raise DivisionByZeroError("Division by zero is not possible!")
            return a / b
        otherwise:
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
result = safe_calculate('+', 10, 5) # 15
result = safe_calculate('/', 10, 0) # None (error handling)
\`\`\``
      },
      {
        title: "Practical example: Working with files",
        content: `**Let's create a function for safe work with files:**

\`\`\`python
import os

class FileError(Exception):
    """Basic file exception"""
    pass

class FileNotFoundError(FileError):
    """File not found"""
    pass

class FilePermissionError(FileError):
    """Cannot access file"""
    pass

def safe_read_file(filename):
    """
    Safely reads the file with all error handling
    """
    try:
        # Checking the existence of the file
        if not os.path.exists(filename):
            raise FileNotFoundError(f"File '{filename}' not found")
        
        # Check access
        if not os.access(filename, os.R_OK):
            raise FilePermissionError(f"No access to file '{filename}'")
        
        # Reading the file
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
        print(f"Encoding error: Failed to decode file")
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
        title: "Practical example: Validation of user input",
        content: `**Let's create a user input validation system:**

\`\`\`python
class ValidationError(Exception):
    """Basic Validation Exception"""
    pass

class AgeValidationError(ValidationError):
    """Age validation error"""
    pass

class EmailValidationError(ValidationError):
    """Email validation error"""
    pass

def validate_age(age):
    """Age Validation"""
    if not isinstance(age, int):
        raise AgeValidationError("Age must be an integer")
    if age < 0:
        raise AgeValidationError("Age cannot be negative")
    if age > 120:
        raise AgeValidationError("Age cannot be greater than 120")
    return True

def validate_email(email):
    """Email validation"""
    if not isinstance(email, str):
        raise EmailValidationError("Email must be a string")
    if '@' not in email:
        raise EmailValidationError("Email must contain the @ symbol")
    if '.' not in email.split('@')[1]:
        raise EmailValidationError("Email has wrong format")
    return True

def register_user(name, age, email):
    """
    User registration with validation
    """
    try:
        # Age validation
        validate_age(age)
        
        # Email validation
        validate_email(email)
        
        # Name validation
        if not isinstance(name, str) or len(name) == 0:
            raise ValidationError("Name must be a non-empty string")
        
        # Create user
        user = {
            "name": name,
            "age": age,
            "email": email
        }
        
        print(f"User {name} successfully registered!")
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
user = register_user("Oleksiy", 25, "oleksiy@example.com")
\`\`\``
      },
      {
        title: "Complex example: Account management system",
        content: `**Let's create a bank account management system:**

\`\`\`python
class BankError(Exception):
    """Basic exception for banking transactions"""
    pass

class InsufficientFundsError(BankError):
    """Insufficient funds"""
    pass

class InvalidAmountError(BankError):
    """Incorrect amount"""
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
        """Account replenishment"""
        try:
            if not isinstance(amount, (int, float)):
                raise InvalidAmountError("Amount must be a number")
            if amount <= 0:
                raise InvalidAmountError("Amount must be positive")
            
            self.balance += amount
            print(f"Replenished {amount} UAH. New balance: {self.balance} UAH")
            return self.balance
            
        except InvalidAmountError as e:
            print(f"Error: {e}")
            return None
    
    def withdraw(self, amount):
        """Withdrawal from account"""
        try:
            if not isinstance(amount, (int, float)):
                raise InvalidAmountError("Amount must be a number")
            if amount <= 0:
                raise InvalidAmountError("Amount must be positive")
            if amount > self.balance:
                raise InsufficientFundsError(
                    f"Insufficient funds. Balance: {self.balance} UAH, "
                    f"requested: {amount} UAH"
                )
            
            self.balance -= amount
            print(f"Withdrawn {amount} UAH. New balance: {self.balance} UAH")
            return self.balance
            
        except InsufficientFundsError as e:
            print(f"Error: {e}")
            return None
        except InvalidAmountError as e:
            print(f"Error: {e}")
            return None
    
    def get_balance(self):
        """Receiving balance"""
        return self.balance

# Usage
account = BankAccount("12345", "Aleksii", 1000)
account.deposit(500)
account.withdraw(200)
account.withdraw(2000) # Error: insufficient funds
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
        otherwise:
            raise CalculatorError(f"Unknown operation: {operation}")
    except CalculatorError as e:
        print(f"Error: {e}")
        return None

result = safe_calculate('+', 10, 5)`,
      explanation: "Demonstrates a calculator with handling of various types of errors."
    },
    {
      title: "Example 2: Safe work with files",
      code: `# Safe work with files
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
      explanation: "Shows safe handling of files with error handling."
    },
    {
      title: "Example 3: Validation of user input",
      code: `# Validate user input
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

validate_user_input("Oleksiy", 25, "oleksiy@example.com")`,
      explanation: "Demonstrates user input validation with error handling."
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
account.withdraw(1000) # Error`,
      explanation: "Shows the bank account class with error handling."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not validate data at the entrance",
      explanation: "Without validation, the program can receive incorrect data and work incorrectly.",
      correctApproach: "Always validate input before processing"
    },
    {
      mistake: "Hide errors without messages",
      explanation: "Without messages, the user will not understand what went wrong.",
      correctApproach: "Always show clear error messages"
    },
    {
      mistake: "Treat all errors equally",
      explanation: "Different types of errors require different handling.",
      correctApproach: "Handle different types of errors separately, use exception hierarchy"
    },
    {
      mistake: "Do not log critical errors",
      explanation: "Without logging in, it is difficult to debug the application and understand problems.",
      correctApproach: "Log all critical errors for further analysis"
    }
  ],
  
  summary: `In this lesson we learned:

1. Principles of error handling - validation, specific messages, logging
2. Practical examples - calculator, working with files, input validation
3. Complex systems - bank accounts with full error processing
4. Reliable code - creating programs that correctly handle errors

Now you know how to create robust programs with proper error handling!

This concludes Module 7 - Error and Exception Handling!`,
  
  practiceTask: {
    title: "Creating a simple program with error handling",
    description: "Create a simple program to add books with error handling",
    problemStatement: `Write a program that:
1. Creates a custom BookError exception
2. Creates a function add_book(title, author), which:
   - Validates that title and author are not empty
   - Checks that a book with this title has not yet been added (use a dictionary for storage)
   - Adds the book and displays a success message
   - Handles errors and displays understandable messages
3. Uses try/except to handle errors
4. Calls the function with different test values`,
    outputFormat: `Output example:
The book "Harry Potter" has been added successfully
Error: Book title cannot be empty
Error: The book 'Harry Potter' already exists`,
    examples: [
      {
        output: "Book 'Harry Potter' added successfully\\nError: Book name cannot be empty\\nError: Book 'Harry Potter' already exists",
        explanation: "The program handles different cases: successful addition, empty name and duplicate"
      }
    ],
    solution: {
      code: `# A simple program to add books with error handling

# Custom exception
class BookError(Exception):
    """Exception for errors with books"""
    pass

# Dictionary for storing books
books = {}

def add_book(title, author):
    """Adds a workbook with validation and error handling"""
    try:
        # Name validation
        if not title or len(title.strip()) == 0:
            raise ValueError("Book name cannot be empty")
        
        # Author validation
        if not author or len(author.strip()) == 0:
            raise ValueError("Author cannot be empty")
        
        # Duplicate check
        if title in books:
            raise BookError(f"Book '{title}' already exists")
        
        # Adding a book
        books[title] = author
        print(f"Book '{title}' added successfully")
        return True
        
    except ValueError as e:
        print(f"Error: {e}")
        return False
    except BookError as e:
        print(f"Error: {e}")
        return False
    except Exception as e:
        print(f"Unknown error: {e}")
        return False

# Testing
add_book("Harry Potter", "J. Rowling")
add_book("", "Author")
add_book("Harry Potter", "Other Author")`,
      explanation: "The solution creates a simple function to add books with validation and error handling via a custom exception."
    },
    hints: [
      "Create a BookError class that inherits from Exception",
      "Use a dictionary to store books (key - title, meaning - author)",
      "Validate data before adding a book",
      "Check if the book is in the dictionary before adding",
      "Use try/except to handle different types of errors"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which principle of error handling is most important?",
        options: [
          "Validation at the entrance",
          "Execution speed",
          "Minimum code",
          "No comments"
        ],
        correctAnswer: 0,
        explanation: "Validation at the entrance is one of the most important principles, as it prevents the processing of incorrect data."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to show specific error messages?",
        options: [
          "So that the user understands what went wrong",
          "To make the code run faster",
          "To take up less memory",
          "There are no benefits"
        ],
        correctAnswer: 0,
        explanation: "Specific messages help the user understand the problem and fix it."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What's wrong with this code?\\n\\n```python\\ndef process(data):\\n try:\\n result = data / 0\\n except:\\n pass\\n```",
        options: [
          "An empty except hides errors",
          "Incorrect try syntax",
          "Incorrect except syntax",
          "Everything is correct"
        ],
        correctAnswer: 0,
        explanation: "An empty except with pass hides errors without a message, making debugging difficult."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is it best to use an exception hierarchy?",
        options: [
          "When you want to handle different types of errors differently",
          "When you need faster code",
          "When less memory is needed",
          "Never"
        ],
        correctAnswer: 0,
        explanation: "The exception hierarchy allows you to handle different types of errors at different levels (specific and general)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is data validation?",
        options: [
          "Check input data for correctness",
          "Saving data to a file",
          "Deleting data",
          "Data sorting"
        ],
        correctAnswer: 0,
        explanation: "Data validation is a check of input data for correctness before processing."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
