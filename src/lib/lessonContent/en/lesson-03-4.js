/**
 * Lesson 03-4: *args and **kwargs
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_4 = {
  lessonId: "lesson-03-4",
  moduleId: "module-03",
  order: 4,
  title: "*args and **kwargs",
  
  learningObjectives: [
    "Understand the purpose of *args and **kwargs",
    "Use *args to work with any number of positional arguments",
    "Use **kwargs to work with any number of keyword arguments",
    "Combine *args and **kwargs in a single function",
    "Understand parameter order when using *args and **kwargs"
  ],
  
  prerequisites: ["lesson-03-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction: why do we need *args and **kwargs?",
        content: `Sometimes we do not know in advance how many arguments will be passed to a function. For example, a function that calculates the sum of numbers should work with any number of values.

**The problem without *args:**

\`\`\`python
def calculate_sum(a, b):
    return a + b

# This only works for two numbers
result = calculate_sum(5, 3)  # 8

# What if you need to add 3, 4, or more numbers?
# You would need many functions or awkward workarounds
\`\`\`

**The solution with *args:**

\`\`\`python
def calculate_sum(*args):
    return sum(args)

# Now it works with any number of values!
result1 = calculate_sum(5, 3)           # 8
result2 = calculate_sum(5, 3, 10, 2)    # 20
result3 = calculate_sum(1, 2, 3, 4, 5)  # 15
\`\`\`

**Similarly with **kwargs:**

When you need to accept any number of keyword arguments (for example, settings), use **kwargs.`
      },
      {
        title: "What is *args?",
        content: `\`*args\` lets a function accept any number of positional arguments. The arguments are collected into a tuple.

**Syntax:**

\`\`\`python
def function_name(*args):
    # args is a tuple of all passed positional arguments
    pass
\`\`\`

**Example:**

\`\`\`python
def print_numbers(*args):
    """
    Prints all passed numbers
    """
    print(f"Received {len(args)} numbers:")
    for number in args:
        print(number)

# Usage
print_numbers(1, 2, 3)
# Output:
# Received 3 numbers:
# 1
# 2
# 3

print_numbers(10, 20, 30, 40, 50)
# Output:
# Received 5 numbers:
# 10
# 20
# 30
# 40
# 50
\`\`\`

**Important:**

1. **The name "args" is a convention — you can use any name:**
\`\`\`python
def example(*numbers):  # Works too!
    return sum(numbers)

result = example(1, 2, 3, 4)  # 10
\`\`\`

2. ***args collects arguments into a tuple:**
\`\`\`python
def show_args(*args):
    print(f"Type: {type(args)}")
    print(f"Value: {args}")

show_args(1, 2, 3)
# Output:
# Type: <class 'tuple'>
# Value: (1, 2, 3)
\`\`\`

3. ***args can be empty:**
\`\`\`python
def example(*args):
    if len(args) == 0:
        print("No arguments passed")
    else:
        print(f"Received {len(args)} arguments")

example()  # No arguments passed
example(1, 2)  # Received 2 arguments
\`\`\``
      },
      {
        title: "Practical examples with *args",
        content: `**Example 1: Calculating the average**

\`\`\`python
def calculate_average(*numbers):
    """
    Computes the average of any number of values
    """
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)

# Usage
avg1 = calculate_average(10, 20, 30)        # 20.0
avg2 = calculate_average(5, 15, 25, 35, 45)  # 25.0
avg3 = calculate_average(100)               # 100.0
\`\`\`

**Example 2: Finding the maximum**

\`\`\`python
def find_max(*numbers):
    """
    Finds the maximum among the passed numbers
    """
    if len(numbers) == 0:
        return None
    return max(numbers)

# Usage
max1 = find_max(10, 5, 20, 15)      # 20
max2 = find_max(1, 2, 3, 4, 5, 6)   # 6
max3 = find_max(100)                # 100
\`\`\`

**Example 3: Joining strings**

\`\`\`python
def join_strings(*words, separator=" "):
    """
    Joins strings with an optional separator
    """
    return separator.join(words)

# Usage
result1 = join_strings("Hello", "world", "Python")  # "Hello world Python"
result2 = join_strings("a", "b", "c", separator="-")  # "a-b-c"
result3 = join_strings("1", "2", "3", separator="")   # "123"
\`\`\`

**Example 4: Required parameters and *args**

\`\`\`python
def create_message(title, *details):
    """
    Creates a message with a title and details
    """
    message = f"Title: {title}\\n"
    message += "Details:\\n"
    for i, detail in enumerate(details, 1):
        message += f"  {i}. {detail}\\n"
    return message

# Usage
msg1 = create_message("Important", "First detail", "Second detail")
msg2 = create_message("Notice", "Detail 1", "Detail 2", "Detail 3")
\`\`\``
      },
      {
        title: "What is **kwargs?",
        content: `\`**kwargs\` lets a function accept any number of keyword arguments. The arguments are collected into a dictionary.

**Syntax:**

\`\`\`python
def function_name(**kwargs):
    # kwargs is a dict of all passed keyword arguments
    pass
\`\`\`

**Example:**

\`\`\`python
def print_info(**kwargs):
    """
    Prints all passed keyword arguments
    """
    print("Received the following information:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

# Usage
print_info(name="Alex", age=20, city="London")
# Output:
# Received the following information:
#   name: Alex
#   age: 20
#   city: London

print_info(title="Developer", experience=5, language="Python")
# Output:
# Received the following information:
#   title: Developer
#   experience: 5
#   language: Python
\`\`\`

**Important:**

1. **The name "kwargs" is a convention — you can use any name:**
\`\`\`python
def example(**options):  # Works too!
    return options

result = example(a=1, b=2, c=3)
\`\`\`

2. ****kwargs collects arguments into a dictionary:**
\`\`\`python
def show_kwargs(**kwargs):
    print(f"Type: {type(kwargs)}")
    print(f"Value: {kwargs}")

show_kwargs(a=1, b=2, c=3)
# Output:
# Type: <class 'dict'>
# Value: {'a': 1, 'b': 2, 'c': 3}
\`\`\`

3. ****kwargs can be empty:**
\`\`\`python
def example(**kwargs):
    if len(kwargs) == 0:
        print("No keyword arguments passed")
    else:
        print(f"Received {len(kwargs)} keyword arguments")

example()  # No keyword arguments passed
example(a=1, b=2)  # Received 2 keyword arguments
\`\`\`

4. **Access values by keys:**
\`\`\`python
def check_user(**kwargs):
    if "name" in kwargs:
        print(f"Name: {kwargs['name']}")
    if "age" in kwargs:
        print(f"Age: {kwargs['age']}")

check_user(name="Alex", age=20)
# Output:
# Name: Alex
# Age: 20
\`\`\``
      },
      {
        title: "Practical examples with **kwargs",
        content: `**Example 1: Creating a user profile**

\`\`\`python
def create_profile(**info):
    """
    Creates a user profile with arbitrary information
    """
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

# Usage
profile1 = create_profile(name="Alex", age=20, city="London")
profile2 = create_profile(username="user1", email="user@example.com", role="admin")
profile3 = create_profile(title="Developer", experience=5, skills=["Python", "JavaScript"])
\`\`\`

**Example 2: Settings with optional parameters**

\`\`\`python
def configure_app(**settings):
    """
    Configures an app with optional parameters
    """
    default_settings = {
        "theme": "light",
        "language": "en",
        "notifications": True,
        "font_size": 14
    }
    
    # Update defaults with passed values
    default_settings.update(settings)
    
    return default_settings

# Usage
config1 = configure_app()  # All defaults
config2 = configure_app(theme="dark")  # Only theme changed
config3 = configure_app(theme="dark", font_size=18, language="en")  # Several options
\`\`\`

**Example 3: Filtering data**

\`\`\`python
def filter_data(data, **filters):
    """
    Filters data by various criteria
    """
    filtered = []
    for item in data:
        match = True
        for key, value in filters.items():
            if item.get(key) != value:
                match = False
                break
        if match:
            filtered.append(item)
    return filtered

# Usage
users = [
    {"name": "Alex", "age": 20, "city": "London"},
    {"name": "Maria", "age": 25, "city": "Manchester"},
    {"name": "John", "age": 20, "city": "London"}
]

result1 = filter_data(users, age=20)  # Everyone aged 20
result2 = filter_data(users, city="London")  # Everyone in London
result3 = filter_data(users, age=20, city="London")  # Age 20 and in London
\`\`\`

**Example 4: Logging with metadata**

\`\`\`python
def log_message(message, **metadata):
    """
    Logs a message with additional metadata
    """
    log_entry = f"Message: {message}"
    if metadata:
        log_entry += "\\nMetadata:"
        for key, value in metadata.items():
            log_entry += f"\\n  {key}: {value}"
    print(log_entry)

# Usage
log_message("Connection error", level="error", timestamp="2024-01-15", user="admin")
log_message("Connection successful", level="info", user="user1")
\`\`\``
      },
      {
        title: "Combining *args and **kwargs",
        content: `You can use \`*args\` and \`**kwargs\` in the same function for maximum flexibility.

**Correct parameter order:**

1. Regular parameters first
2. Then \`*args\`
3. Then parameters with default values
4. Finally \`**kwargs\`

\`\`\`python
def example(required, *args, default="value", **kwargs):
    """
    Correct parameter order
    """
    print(f"Required: {required}")
    print(f"*args: {args}")
    print(f"Default: {default}")
    print(f"**kwargs: {kwargs}")

# Usage
example("required", 1, 2, 3, default="other", a=1, b=2)
\`\`\`

**Example: Universal data processing**

\`\`\`python
def process_data(operation, *numbers, **options):
    """
    Processes numbers with different operations and options
    """
    if operation == "sum":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    elif operation == "average":
        result = sum(numbers) / len(numbers) if numbers else 0
    else:
        result = None
    
    # Handle options
    if "round" in options and options["round"]:
        result = round(result)
    
    if "format" in options:
        if options["format"] == "int":
            result = int(result)
    
    return result

# Usage
result1 = process_data("sum", 1, 2, 3, 4, 5)  # 15
result2 = process_data("average", 10, 20, 30, round=True)  # 20
result3 = process_data("multiply", 2, 3, 4, format="int")  # 24
\`\`\`

**Example: Creating HTML tags**

\`\`\`python
def create_tag(tag_name, *content, **attributes):
    """
    Creates an HTML tag with content and attributes
    """
    attrs = " ".join([f'{key}="{value}"' for key, value in attributes.items()])
    if attrs:
        attrs = " " + attrs
    
    content_str = "".join(str(item) for item in content)
    
    return f"<{tag_name}{attrs}>{content_str}</{tag_name}>"

# Usage
tag1 = create_tag("div", "Hello", "world", class="container", id="main")
# <div class="container" id="main">Helloworld</div>

tag2 = create_tag("a", "Link", href="https://example.com", target="_blank")
# <a href="https://example.com" target="_blank">Link</a>
\`\`\`

**Important rule:**

After \`*args\` you cannot use positional parameters without default values:

\`\`\`python
# Wrong:
def example(*args, required_param):  # Error!
    pass

# Correct:
def example(*args, default_param="value"):
    pass

def example(required_param, *args, default_param="value"):
    pass
\`\`\``
      },
      {
        title: "Unpacking *args and **kwargs",
        content: `You can not only collect arguments but also unpack them when calling a function!

**Unpacking *args:**

\`\`\`python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]

# Unpack a list into arguments
result = add(*numbers)  # Same as add(1, 2, 3)
print(result)  # 6

# Also works with tuples
numbers_tuple = (10, 20, 30)
result = add(*numbers_tuple)  # 60
\`\`\`

**Unpacking **kwargs:**

\`\`\`python
def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

info = {
    "name": "Alex",
    "age": 20,
    "city": "London"
}

# Unpack a dict into keyword arguments
greet(**info)  # Same as greet(name="Alex", age=20, city="London")
\`\`\`

**Combining unpacking:**

\`\`\`python
def example(a, b, c, d, e):
    return a + b + c + d + e

args_list = [1, 2, 3]
kwargs_dict = {"d": 4, "e": 5}

# Combine positional and keyword arguments
result = example(*args_list, **kwargs_dict)  # 15
\`\`\`

**Practical example: delegating calls**

\`\`\`python
def wrapper_function(*args, **kwargs):
    """
    Wrapper that forwards arguments to another function
    """
    print("Calling wrapper")
    return original_function(*args, **kwargs)

def original_function(a, b, c=10):
    return a + b + c

# Usage
result = wrapper_function(1, 2, c=20)  # Forwards arguments
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned powerful tools for working with arguments:

**Key concepts:**

1. **\`*args\`**
   - Collects any number of positional arguments into a tuple
   - The name "args" is a convention — any name works
   - Lets you build flexible functions

2. **\`**kwargs\`**
   - Collects any number of keyword arguments into a dictionary
   - The name "kwargs" is a convention — any name works
   - Useful for optional parameters and settings

3. **Combining**
   - Both can be used in one function
   - Order: regular parameters → *args → defaults → **kwargs
   - After *args you cannot use positional parameters without defaults

4. **Unpacking**
   - \`*list\` unpacks a list/tuple into positional arguments
   - \`**dict\` unpacks a dict into keyword arguments
   - Useful for delegating function calls

**When to use:**

- \`*args\` — when the number of positional arguments is unknown
- \`**kwargs\` — when you need optional keyword parameters
- Combining both — for maximum flexibility

**Next step:**

In the next lesson we will learn about object methods — how to work with string, list, and other object methods.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Basic *args example",
      code: `def calculate_sum(*args):
    """
    Computes the sum of any number of values
    """
    return sum(args)

# Usage
print(calculate_sum(1, 2, 3))        # 6
print(calculate_sum(10, 20, 30, 40))  # 100
print(calculate_sum(5))              # 5`,
      explanation: "Demonstrates basic use of *args to work with any number of arguments."
    },
    {
      title: "Basic **kwargs example",
      code: `def print_info(**kwargs):
    """
    Prints all passed keyword arguments
    """
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Usage
print_info(name="Alex", age=20, city="London")
print_info(title="Developer", experience=5)`,
      explanation: "Shows basic use of **kwargs for keyword arguments."
    },
    {
      title: "Combining *args and **kwargs",
      code: `def process_data(operation, *numbers, **options):
    """
    Processes numbers with different operations and options
    """
    if operation == "sum":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    else:
        result = None
    
    if "round" in options and options["round"]:
        result = round(result)
    
    return result

# Usage
print(process_data("sum", 1, 2, 3, 4))  # 10
print(process_data("multiply", 2, 3, 4, round=True))  # 24`,
      explanation: "Demonstrates combining *args and **kwargs in one function."
    },
    {
      title: "Unpacking *args",
      code: `def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)  # Unpacks list into arguments
print(result)  # 6`,
      explanation: "Shows how to unpack a list or tuple into positional arguments."
    },
    {
      title: "Unpacking **kwargs",
      code: `def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

info = {"name": "Alex", "age": 20, "city": "London"}
greet(**info)  # Unpacks dict into keyword arguments`,
      explanation: "Demonstrates unpacking a dictionary into keyword arguments."
    },
    {
      title: "Required and optional parameters",
      code: `def create_message(title, *details, **metadata):
    """
    Creates a message with title, details, and metadata
    """
    message = f"Title: {title}\\n"
    if details:
        message += "Details:\\n"
        for detail in details:
            message += f"  - {detail}\\n"
    if metadata:
        message += "Metadata:\\n"
        for key, value in metadata.items():
            message += f"  {key}: {value}\\n"
    return message

# Usage
msg = create_message("Important", "Detail 1", "Detail 2", author="Admin", date="2024-01-15")
print(msg)`,
      explanation: "Practical example using regular parameters, *args, and **kwargs together."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Wrong parameter order",
      explanation: "Beginners often confuse parameter order when using *args and **kwargs.",
      correctApproach: `# Wrong:
def example(**kwargs, *args):  # Error! **kwargs cannot come before *args
    pass

# Correct:
def example(*args, **kwargs):
    pass

# Or with required parameters:
def example(required, *args, default="value", **kwargs):
    pass`
    },
    {
      mistake: "Positional parameter after *args without a default",
      explanation: "After *args you cannot use positional parameters without default values.",
      correctApproach: `# Wrong:
def example(*args, required_param):  # Error!
    pass

# Correct:
def example(*args, default_param="value"):
    pass

# Or put required parameter before *args:
def example(required_param, *args):
    pass`
    },
    {
      mistake: "Confusing *args and **kwargs",
      explanation: "Beginners often mix up when to use *args versus **kwargs.",
      correctApproach: `# *args — positional arguments (collected in a tuple)
def example(*args):
    print(args)  # (1, 2, 3)

example(1, 2, 3)

# **kwargs — keyword arguments (collected in a dict)
def example(**kwargs):
    print(kwargs)  # {'a': 1, 'b': 2}

example(a=1, b=2)`
    },
    {
      mistake: "Forgetting that *args and **kwargs can be empty",
      explanation: "Sometimes beginners do not check whether arguments were passed, which can cause errors.",
      correctApproach: `# Correct — check for arguments
def example(*args, **kwargs):
    if len(args) == 0:
        print("No positional arguments passed")
    else:
        print(f"Received {len(args)} positional arguments")
    
    if len(kwargs) == 0:
        print("No keyword arguments passed")
    else:
        print(f"Received {len(kwargs)} keyword arguments")

example()  # Both messages about missing arguments`
    }
  ],
  
  summary: `In this lesson we learned *args and **kwargs — powerful tools for working with arguments:

1. \`*args\`
   - Collects any number of positional arguments into a tuple
   - Lets you build flexible functions
   - The name "args" is a convention — any name works

2. \`**kwargs\`
   - Collects any number of keyword arguments into a dictionary
   - Useful for optional parameters and settings
   - The name "kwargs" is a convention — any name works

3. Combining
   - Both can be used in one function
   - Correct order: regular → *args → defaults → **kwargs
   - After *args you cannot use positional parameters without defaults

4. Unpacking
   - \`*list\` unpacks into positional arguments
   - \`**dict\` unpacks into keyword arguments
   - Useful for delegating calls

These tools make functions more flexible and powerful!`,
  
  practiceTask: {
    title: "Universal calculator",
    description: "Create a universal calculator that works with any number of values and options",
    problemStatement: `Write a program with functions for a universal calculator:

1. **calculate** — main calculator function
   - Parameters: operation (required), *numbers (any number of values), **options (optional settings)
   - Supported operations: "add", "multiply", "average"
   - Options: "round" (round the result), "format" ("int" or "float")
   - Returns the computed result

2. **format_result** — formats the result
   - Parameters: result (number), **format_options (formatting options)
   - Options: "decimals" (decimal places), "prefix" (before the number), "suffix" (after the number)
   - Returns a formatted string

3. **display_calculation** — prints calculation details
   - Parameters: operation, *numbers, result, **info (extra information)
   - Prints detailed information about the calculation

**Important:** Do not use input(). Assign values directly in code.

Create several examples using the calculator with different operations and options.`,
    outputFormat: `Example output:
=== Calculation ===
Operation: add
Numbers: 10, 20, 30
Result: 60
Formatted: 60`,
    examples: [
      {
        output: `=== Calculation ===
Operation: add
Numbers: 10, 20, 30
Result: 60
Formatted: 60`,
        explanation: "Demonstrates adding numbers with rounding option."
      }
    ],
    solution: {
      code: `# Universal calculator

def calculate(operation, *numbers, **options):
    """
    Performs math operations on any number of values
    """
    if len(numbers) == 0:
        return None
    
    if operation == "add":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    elif operation == "average":
        result = sum(numbers) / len(numbers)
    else:
        return None
    
    # Handle options
    if "round" in options and options["round"]:
        result = round(result)
    
    if "format" in options:
        if options["format"] == "int":
            result = int(result)
        elif options["format"] == "float":
            result = float(result)
    
    return result

def format_result(result, **format_options):
    """
    Formats the result with options
    """
    if result is None:
        return "Error"
    
    formatted = result
    
    if "decimals" in format_options:
        formatted = round(formatted, format_options["decimals"])
    
    prefix = format_options.get("prefix", "")
    suffix = format_options.get("suffix", "")
    
    return f"{prefix}{formatted}{suffix}"

def display_calculation(operation, *numbers, result, **info):
    """
    Prints detailed calculation information
    """
    print("=== Calculation ===")
    print(f"Operation: {operation}")
    print(f"Numbers: {', '.join(str(n) for n in numbers)}")
    print(f"Result: {result}")
    
    if info:
        print("Additional information:")
        for key, value in info.items():
            print(f"  {key}: {value}")
    
    formatted = format_result(result)
    print(f"Formatted: {formatted}")
    print()

# Assign values directly in code (do not use input())

# Example 1: Addition with rounding
result1 = calculate("add", 10, 20, 30, round=True)
display_calculation("add", 10, 20, 30, result=result1)

# Example 2: Multiplication with formatting
result2 = calculate("multiply", 2, 3, 4, format="int")
display_calculation("multiply", 2, 3, 4, result=result2, note="Multiplying three numbers")

# Example 3: Average with rounding and formatting
result3 = calculate("average", 10, 20, 30, 40, round=True, format="int")
display_calculation("average", 10, 20, 30, 40, result=result3, description="Arithmetic mean")

# Example 4: Formatting with prefix and suffix
result4 = calculate("add", 15, 25, 35)
formatted = format_result(result4, prefix="Sum: ", suffix=" units", decimals=2)
print(f"Formatted result: {formatted}")`,
      explanation: "The solution uses *args for any number of values, **kwargs for options, and combines both approaches. Functions work flexibly with different argument combinations."
    },
    hints: [
      "Assign values directly in code — do not use input()",
      "The calculate function should handle operations and options via **kwargs",
      "Use *numbers to accept any number of values",
      "Check for options in **kwargs before using them (e.g. 'round' in options)",
      "format_result should handle different formatting options",
      "display_calculation should use *numbers and **info for flexibility",
      "Remember parameter order: required → *args → **kwargs"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "Result: 60",
        description: "Checking addition of three numbers"
      },
      {
        expectedOutput: "Result: 24",
        description: "Checking multiplication of three numbers"
      },
      {
        expectedOutput: "Result: 20.0",
        description: "Checking average calculation"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is *args?",
        options: [
          "A mechanism for accepting any number of positional arguments",
          "A mechanism for accepting any number of keyword arguments",
          "A special variable in Python",
          "A data type"
        ],
        correctAnswer: 0,
        explanation: "*args lets a function accept any number of positional arguments, collected into a tuple."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What do **kwargs arguments get collected into?",
        options: [
          "Dictionary",
          "Tuple",
          "List",
          "Set"
        ],
        correctAnswer: 0,
        explanation: "**kwargs collects keyword arguments into a dictionary where keys are parameter names and values are the passed values."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef example(*args):\n    return len(args)\n\nprint(example(1, 2, 3, 4, 5))\n```",
        options: [
          "5",
          "An error",
          "0",
          "(1, 2, 3, 4, 5)"
        ],
        correctAnswer: 0,
        explanation: "The function receives 5 positional arguments via *args, collected into a tuple. len(args) returns 5."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the correct parameter order in a function?",
        options: [
          "required → *args → defaults → **kwargs",
          "*args → **kwargs → required",
          "**kwargs → *args → required",
          "Order does not matter"
        ],
        correctAnswer: 0,
        explanation: "Correct order: required parameters first, then *args, then parameters with defaults, and finally **kwargs."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef example(**kwargs):\n    if 'name' in kwargs:\n        return kwargs['name']\n    return 'Unknown'\n\nprint(example(age=20, city='London'))\nprint(example(name='Alex', age=20))\n```",
        options: [
          "Unknown, then Alex",
          "An error",
          "Alex, then Unknown",
          "Unknown, then Unknown"
        ],
        correctAnswer: 0,
        explanation: "The first call has no 'name' in kwargs, so it returns 'Unknown'. The second call has 'name', so it returns 'Alex'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you use names other than 'args' and 'kwargs'?",
        options: [
          "Yes, they are only conventions",
          "No, they are reserved words",
          "Only for *args",
          "Only for **kwargs"
        ],
        correctAnswer: 0,
        explanation: "The names 'args' and 'kwargs' are conventions only. You can use any names, e.g. *numbers or **options."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef example(a, *args, **kwargs):\n    print(f'a={a}, args={args}, kwargs={kwargs}')\n\nexample(1, 2, 3, x=10, y=20)\n```",
        options: [
          "a=1, args=(2, 3), kwargs={'x': 10, 'y': 20}",
          "An error",
          "a=1, args=(1, 2, 3), kwargs={}",
          "a=1, args=(), kwargs={'x': 10, 'y': 20, '2': 3}"
        ],
        correctAnswer: 0,
        explanation: "a=1 (required), args=(2, 3) (positional after a), kwargs={'x': 10, 'y': 20} (keyword arguments)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "After *args you can use positional parameters without default values.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "No. After *args you can only use parameters with defaults or **kwargs. Positional parameters without defaults must come before *args."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
