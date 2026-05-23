/**
 * Lesson 03-2: Parameters, return, None
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_2 = {
  lessonId: "lesson-03-2",
  moduleId: "module-03",
  order: 2,
  title: "Parameters, return, None",
  
  learningObjectives: [
    "Understand the difference between parameters and arguments",
    "Use return to send values back from functions",
    "Understand None and how it is used",
    "Create functions with different return types",
    "Work with functions that do not return a value"
  ],
  
  prerequisites: ["lesson-03-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Parameters vs Arguments: in detail",
        content: `In the previous lesson we already mentioned parameters and arguments. Now let's look at this in more detail!

**Parameters** are variables listed in a function definition (after \`def\`).

**Arguments** are the actual values passed to a function when it is called.

**Example:**

\`\`\`python
# Parameters: a and b (in the function definition)
def add_numbers(a, b):
    return a + b

# Arguments: 5 and 3 (when calling the function)
result = add_numbers(5, 3)
\`\`\`

**Important:**

- Parameters are "placeholders" that show what data the function expects
- Arguments are the real values passed into the function
- The number of arguments must match the number of parameters (unless special techniques are used)

**Example with different types:**

\`\`\`python
def greet(name, age):
    """
    name and age are parameters
    """
    print(f"Hello, {name}! You are {age} years old.")

# When calling:
greet("Alex", 20)
# "Alex" and 20 are arguments
\`\`\``
      },
      {
        title: "Return: in detail",
        content: `The \`return\` keyword is one of the most important tools in functions. It sends a value back from the function.

**Basic use of return:**

\`\`\`python
def calculate_sum(a, b):
    result = a + b
    return result  # Returns the value

# Usage
total = calculate_sum(5, 3)  # total = 8
print(total)  # Output: 8
\`\`\`

**Return ends function execution:**

As soon as Python reaches \`return\`, it:
1. Returns the value
2. **Immediately stops executing the function**
3. All lines after \`return\` are not executed

\`\`\`python
def example():
    print("This will run")
    return 10
    print("This will NOT run!")  # This line will never execute

result = example()
# Output: This will run
# result = 10
\`\`\`

**Return without a value:**

If nothing is written after \`return\`, the function returns \`None\`:

\`\`\`python
def do_something():
    print("Doing something...")
    return  # Returns None

result = do_something()
print(result)  # Output: None
\`\`\``
      },
      {
        title: "Multiple return statements in one function",
        content: `A function can have several \`return\` statements. Which one runs depends on the conditions.

**Example with a condition:**

\`\`\`python
def check_number(num):
    """
    Checks a number and returns different values
    """
    if num > 0:
        return "Positive number"
    elif num < 0:
        return "Negative number"
    else:
        return "Zero"

# Usage
print(check_number(5))   # Output: Positive number
print(check_number(-3))  # Output: Negative number
print(check_number(0))   # Output: Zero
\`\`\`

**Important:** After the first \`return\` runs, the function ends and the other \`return\` statements do not execute.

**Example: checking if a number is even**

\`\`\`python
def is_even(number):
    """
    Checks whether a number is even
    """
    if number % 2 == 0:
        return True
    return False  # Runs only if the number is odd

# Usage
print(is_even(4))   # True
print(is_even(5))   # False
\`\`\`

**Alternative (shorter):**

\`\`\`python
def is_even(number):
    """
    More compact version
    """
    return number % 2 == 0  # Returns True or False directly

print(is_even(4))   # True
print(is_even(5))   # False
\`\`\``
      },
      {
        title: "Returning multiple values",
        content: `A function can return several values at once! For this, a tuple is used.

**Syntax:**

\`\`\`python
def function_name():
    return value1, value2, value3
\`\`\`

**Example: a function that returns two values**

\`\`\`python
def divide_with_remainder(a, b):
    """
    Divides a by b and returns the quotient and remainder
    """
    quotient = a // b      # Integer division
    remainder = a % b      # Remainder
    return quotient, remainder

# Usage
result = divide_with_remainder(17, 5)
print(result)  # Output: (3, 2)
print(type(result))  # Output: <class 'tuple'>

# You can unpack into separate variables
quotient, remainder = divide_with_remainder(17, 5)
print(f"Quotient: {quotient}, Remainder: {remainder}")
# Output: Quotient: 3, Remainder: 2
\`\`\`

**Example: calculating coordinates**

\`\`\`python
def calculate_coordinates(x, y, offset):
    """
    Calculates new coordinates after an offset
    """
    new_x = x + offset
    new_y = y + offset
    return new_x, new_y

# Usage
x, y = calculate_coordinates(10, 20, 5)
print(f"New coordinates: ({x}, {y})")  # Output: New coordinates: (15, 25)
\`\`\`

**Example: calculating statistics**

\`\`\`python
def calculate_stats(numbers):
    """
    Calculates minimum, maximum, and average
    """
    minimum = min(numbers)
    maximum = max(numbers)
    average = sum(numbers) / len(numbers)
    return minimum, maximum, average

# Usage
nums = [10, 20, 30, 40, 50]
min_val, max_val, avg_val = calculate_stats(nums)
print(f"Min: {min_val}, Max: {max_val}, Average: {avg_val}")
# Output: Min: 10, Max: 50, Average: 30.0
\`\`\``
      },
      {
        title: "None: what is it?",
        content: `\`None\` is a special value in Python that means "nothing" or "absence of a value".

**When does a function return None?**

1. **If the function has no return:**
\`\`\`python
def do_something():
    print("Doing something...")
    # No return

result = do_something()
print(result)  # Output: None
\`\`\`

2. **If return has no value:**
\`\`\`python
def do_something():
    print("Doing something...")
    return  # Returns None

result = do_something()
print(result)  # Output: None
\`\`\`

3. **If we explicitly return None:**
\`\`\`python
def find_item(items, target):
    """
    Searches for an item in a list
    Returns None if not found
    """
    for item in items:
        if item == target:
            return item
    return None  # Explicitly return None

# Usage
items = [1, 2, 3, 4, 5]
result = find_item(items, 6)
print(result)  # Output: None
\`\`\`

**Checking for None:**

\`\`\`python
def get_value():
    return None

result = get_value()

# Check
if result is None:
    print("No value")
else:
    print(f"Value: {result}")

# Or
if result == None:  # Also works, but 'is' is better
    print("No value")
\`\`\`

**Important:**

- \`None\` is not the same as \`0\`, \`False\`, or an empty string \`""\`
- \`None\` is its own data type (\`NoneType\`)
- For checking \`None\`, it is better to use \`is None\` or \`is not None\``
      },
      {
        title: "Functions without return",
        content: `Functions that have no \`return\` or have \`return\` without a value automatically return \`None\`.

**When is this useful?**

1. **Functions that only print information:**
\`\`\`python
def print_info(name, age):
    """
    Prints user information
    Does not return a value (returns None)
    """
    print(f"Name: {name}")
    print(f"Age: {age}")

result = print_info("Alex", 20)
# Output:
# Name: Alex
# Age: 20
print(result)  # Output: None
\`\`\`

2. **Functions that change global variables (we will learn this later):**
\`\`\`python
counter = 0

def increment_counter():
    """
    Increments the counter
    """
    global counter
    counter += 1
    # Does not return a value, only changes the global variable

increment_counter()
print(counter)  # Output: 1
\`\`\`

3. **Functions for performing actions:**
\`\`\`python
def display_menu():
    """
    Displays a menu
    """
    print("1. Add")
    print("2. Delete")
    print("3. Exit")

display_menu()  # Just prints the menu, does not return a value
\`\`\`

**Important to understand:**

- Functions with \`print()\` are useful for displaying information
- Functions with \`return\` are useful for calculations and getting results
- Both approaches are valid — it depends on the task`
      },
      {
        title: "Function return types",
        content: `Functions can return different data types. Python does not require you to specify a return type (unlike some other languages), but it is useful to understand this.

**Different return types:**

\`\`\`python
# Returns a number (int)
def add(a, b):
    return a + b

# Returns a string (str)
def greet(name):
    return f"Hello, {name}!"

# Returns a boolean (bool)
def is_even(num):
    return num % 2 == 0

# Returns a list (list)
def create_numbers():
    return [1, 2, 3, 4, 5]

# Returns a tuple (tuple)
def get_coordinates():
    return (10, 20)

# Returns None
def do_nothing():
    pass  # pass means "do nothing"
\`\`\`

**Example with different types:**

\`\`\`python
# Number
def calculate_area(width, height):
    return width * height

# Boolean
def can_vote(age):
    return age >= 18

# String
def format_name(first, last):
    return f"{first} {last}".title()

# List
def get_even_numbers(limit):
    evens = []
    for i in range(2, limit + 1, 2):
        evens.append(i)
    return evens

# Usage
area = calculate_area(5, 3)        # int: 15
voting = can_vote(20)              # bool: True
name = format_name("alex", "smith")  # str: "Alex Smith"
numbers = get_even_numbers(10)     # list: [2, 4, 6, 8, 10]
\`\`\`

**Important:**

- A function can return different types in different situations (but this is not always good)
- It is better if a function always returns the same type
- The return type depends on what the function is meant to do`
      },
      {
        title: "Practical examples",
        content: `Let's look at several practical examples that demonstrate different ways to use return:

**Example 1: Search function**

\`\`\`python
def find_max(numbers):
    """
    Finds the maximum number in a list
    Returns None if the list is empty
    """
    if len(numbers) == 0:
        return None
    
    maximum = numbers[0]
    for num in numbers:
        if num > maximum:
            maximum = num
    return maximum

# Usage
nums = [10, 5, 20, 15, 30]
max_num = find_max(nums)
print(f"Maximum: {max_num}")  # Output: Maximum: 30

empty = []
result = find_max(empty)
if result is None:
    print("List is empty")
\`\`\`

**Example 2: Validation function**

\`\`\`python
def validate_email(email):
    """
    Checks whether an email contains the @ symbol
    Returns True if valid, False otherwise
    """
    if "@" in email:
        return True
    return False

# Usage
email1 = "user@example.com"
email2 = "invalid-email"

print(validate_email(email1))  # True
print(validate_email(email2))  # False
\`\`\`

**Example 3: Calculation function with multiple return statements**

\`\`\`python
def get_grade(score):
    """
    Determines a grade based on a score
    """
    if score >= 90:
        return "Excellent"
    elif score >= 75:
        return "Good"
    elif score >= 60:
        return "Satisfactory"
    else:
        return "Unsatisfactory"

# Usage
print(get_grade(95))  # Excellent
print(get_grade(80))  # Good
print(get_grade(50))  # Unsatisfactory
\`\`\`

**Example 4: Function that returns multiple values**

\`\`\`python
def analyze_number(num):
    """
    Analyzes a number and returns several characteristics
    """
    is_even = num % 2 == 0
    is_positive = num > 0
    square = num ** 2
    
    return is_even, is_positive, square

# Usage
even, positive, squared = analyze_number(5)
print(f"Even: {even}, Positive: {positive}, Square: {squared}")
# Output: Even: False, Positive: True, Square: 25
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we studied in detail:

**Key concepts:**

1. **Parameters vs Arguments**
   - Parameters — in the function definition
   - Arguments — when calling the function

2. **Return**
   - Sends a value back from the function
   - Ends function execution
   - There can be several return statements in one function

3. **None**
   - A special value meaning "nothing"
   - Returned if a function has no return
   - Used to indicate the absence of a value

4. **Return types**
   - Functions can return different data types
   - You can return multiple values (via a tuple)

**Rules:**

- Use return for calculations
- Use print() for output
- Check for None using \`is None\`
- Functions without return return None

**Next step:**

In the next lesson we will learn about positional and keyword arguments, which will let you work with functions more flexibly.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Parameters and arguments",
      code: `# Parameters: a and b
def multiply(a, b):
    return a * b

# Arguments: 5 and 3
result = multiply(5, 3)
print(result)  # Output: 15`,
      explanation: "Demonstrates the difference between parameters (a, b) and arguments (5, 3)."
    },
    {
      title: "Return ends the function",
      code: `def example():
    print("First line")
    return 10
    print("This line will not run")

result = example()
print(result)`,
      explanation: "Shows that after return the function ends and the following lines are not executed."
    },
    {
      title: "Multiple return statements",
      code: `def check_positive(num):
    if num > 0:
        return "Positive"
    elif num < 0:
        return "Negative"
    else:
        return "Zero"

print(check_positive(5))   # Positive
print(check_positive(-3))   # Negative
print(check_positive(0))    # Zero`,
      explanation: "Demonstrates using several return statements in one function depending on conditions."
    },
    {
      title: "Returning multiple values",
      code: `def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"Quotient: {q}, Remainder: {r}")`,
      explanation: "Shows how to return several values at once via a tuple."
    },
    {
      title: "None as a default value",
      code: `def find_item(items, target):
    for item in items:
        if item == target:
            return item
    return None  # If not found

result = find_item([1, 2, 3], 5)
if result is None:
    print("Not found")`,
      explanation: "Demonstrates using None to indicate the absence of a result."
    },
    {
      title: "Function without return",
      code: `def print_info(name):
    print(f"Name: {name}")

result = print_info("Alex")
print(result)  # Output: None`,
      explanation: "Shows that functions without return automatically return None."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing parameters and arguments",
      explanation: "Beginners often mix up the terms 'parameter' and 'argument'.",
      correctApproach: `# Parameters are variables in the function definition
def add(a, b):  # a and b are parameters
    return a + b

# Arguments are values when calling the function
result = add(5, 3)  # 5 and 3 are arguments`
    },
    {
      mistake: "Expecting a value from a function that uses print()",
      explanation: "Many beginners expect a function with print() to return a value.",
      correctApproach: `# Wrong (if you need to save the result):
def calculate(a, b):
    print(a + b)  # Only prints, does not return

# Correct:
def calculate(a, b):
    return a + b  # Returns the value`
    },
    {
      mistake: "Forgetting about None",
      explanation: "Beginners do not account for the fact that functions without return return None.",
      correctApproach: `# A function without return returns None
def do_something():
    print("Doing something")

result = do_something()  # result will be None
# Check:
if result is None:
    print("The function did not return a value")`
    },
    {
      mistake: "Code after return",
      explanation: "Beginners sometimes add code after return without understanding that it will not run.",
      correctApproach: `# Wrong:
def example():
    return 10
    print("This will not run!")  # This line will never execute

# Correct:
def example():
    print("This will run")
    return 10  # return should be last if you need the previous code to run`
    }
  ],
  
  summary: `In this lesson we studied parameters, return, and None in detail:

1. Parameters vs Arguments
   - Parameters — variables in the function definition
   - Arguments — values when calling the function

2. Return
   - Sends a value back from the function
   - Ends function execution
   - There can be several return statements (depending on conditions)
   - Can return multiple values (via a tuple)

3. None
   - A special value meaning "nothing"
   - Returned by functions without return
   - Used to indicate the absence of a result

4. Return types
   - Functions can return different data types
   - It is important to understand which type a function returns

This knowledge will help you create more effective and clear functions!`,
  
  practiceTask: {
    title: "Student grading system",
    description: "Create functions to calculate and analyze student grades",
    problemStatement: `Write a program that contains functions for:

1. **Calculating the average score** — a function takes three grades and returns the average
2. **Determining a letter grade** — a function takes the average score and returns a grade ("Excellent", "Good", "Satisfactory", "Unsatisfactory")
3. **Checking whether a student passed** — a function takes the average score and returns True if >= 60, otherwise False
4. **Student analysis** — a function takes three grades and returns a tuple: (average_score, letter_grade, passed)

**Important:** Do not use the input() function. Enter values directly in the code (for example: grade1 = 85, grade2 = 90, grade3 = 88).

Each function must:
- Accept the required parameters
- Use return to send back results
- Have a docstring with a description
- Handle different cases

After creating the functions, call them with specific values and print the results.`,
    outputFormat: `Example output:
Average score: 87.67
Grade: Good
Student passed: True
Analysis: (87.67, 'Good', True)`,
    examples: [
      {
        output: `Average score: 87.67
Grade: Good
Student passed: True
Analysis: (87.67, 'Good', True)`,
        explanation: "Demonstrates calculating the average score and determining the grade."
      }
    ],
    solution: {
      code: `# Student grading system

def calculate_average(grade1, grade2, grade3):
    """
    Calculates the average score from three grades
    """
    total = grade1 + grade2 + grade3
    average = total / 3
    return round(average, 2)

def get_letter_grade(average):
    """
    Determines a letter grade based on the average score
    """
    if average >= 90:
        return "Excellent"
    elif average >= 75:
        return "Good"
    elif average >= 60:
        return "Satisfactory"
    else:
        return "Unsatisfactory"

def has_passed(average):
    """
    Checks whether the student passed (average score >= 60)
    """
    return average >= 60

def analyze_student(grade1, grade2, grade3):
    """
    Analyzes a student and returns a tuple with the results
    """
    avg = calculate_average(grade1, grade2, grade3)
    letter = get_letter_grade(avg)
    passed = has_passed(avg)
    return avg, letter, passed

# Enter values directly in the code (do not use input())
grade1 = 85
grade2 = 90
grade3 = 88

# Calculate the average score
average = calculate_average(grade1, grade2, grade3)
print(f"Average score: {average}")

# Determine the grade
letter_grade = get_letter_grade(average)
print(f"Grade: {letter_grade}")

# Check whether the student passed
passed = has_passed(average)
print(f"Student passed: {passed}")

# Full analysis
analysis = analyze_student(grade1, grade2, grade3)
print(f"Analysis: {analysis}")`,
      explanation: "The solution creates four functions: calculating the average, determining the grade, checking whether the student passed, and full analysis. The analyze_student function demonstrates returning multiple values via a tuple."
    },
    hints: [
      "Enter values directly in the code (grade1, grade2, grade3) — do not use input()",
      "The calculate_average function should add three grades and divide by 3",
      "The get_letter_grade function should use if/elif/else to determine the grade",
      "The has_passed function should return True or False",
      "The analyze_student function should call other functions and return a tuple",
      "Use return to send values back from all functions"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "Average score: 87.67",
        description: "Checking average score calculation"
      },
      {
        expectedOutput: "Grade: Excellent",
        description: "Checking 'Excellent' grade determination"
      },
      {
        expectedOutput: "Student passed: False",
        description: "Checking that a student did not pass with low grades"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a function parameter?",
        options: [
          "A variable in the function definition that receives a value when the function is called",
          "A value passed when calling the function",
          "The result of the function",
          "The name of the function"
        ],
        correctAnswer: 0,
        explanation: "A parameter is a variable in the function definition (for example, def add(a, b):). An argument is a value passed when calling the function (for example, add(5, 3))."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does a function without return return?",
        options: [
          "None",
          "0",
          "False",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "A function without return automatically returns None — a special value that means 'nothing'."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef example():\n    print(\"First\")\n    return 10\n    print(\"Second\")\n\nresult = example()\nprint(result)\n```",
        options: [
          "First, then 10",
          "First, Second, then 10",
          "Only 10",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "After return the function ends, so 'Second' will not be printed. The output will be 'First', then 10."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you return multiple values from a function?",
        options: [
          "Via a tuple: return value1, value2",
          "Via a list: return [value1, value2]",
          "Both options work",
          "It is impossible to return multiple values"
        ],
        correctAnswer: 2,
        explanation: "You can return multiple values via a tuple (return a, b) or via a list (return [a, b]). A tuple is more commonly used for this."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef divide(a, b):\n    quotient = a // b\n    remainder = a % b\n    return quotient, remainder\n\nq, r = divide(17, 5)\nprint(f\"{q}, {r}\")\n```",
        options: [
          "3, 2",
          "(3, 2)",
          "17, 5",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The function returns a tuple (3, 2), which is unpacked into variables q and r. The output will be '3, 2'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the best way to check whether a value equals None?",
        options: [
          "value is None",
          "value == None",
          "Both options work the same way",
          "value != None"
        ],
        correctAnswer: 0,
        explanation: "It is better to use 'is None' or 'is not None', because this checks object identity, not just value."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef check(num):\n    if num > 0:\n        return \"Positive\"\n    return \"Not positive\"\n\nprint(check(5))\nprint(check(-3))\n```",
        options: [
          "Positive, then Not positive",
          "Positive, then Positive",
          "Not positive, then Not positive",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "For 5 the condition num > 0 is True, so 'Positive' is returned. For -3 the condition is False, so the second return 'Not positive' runs."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A function can have multiple return statements.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, a function can have multiple return statements. Which one runs depends on the conditions and the logic of the function."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
