/**
 * Lesson 03-4: *args and **kwargs
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_03_4 = {
  lessonId: "lesson-03-4",
  moduleId: "module-03",
  order: 4,
  title: "*args and **kwargs",
  
  learningObjectives: [
    "Understand the purpose of *args and **kwargs",
    "Use *args to work with an arbitrary number of positional arguments",
    "Use **kwargs to work with an arbitrary number of named arguments",
    "Combine *args and **kwargs in one function",
    "Understand the order of parameters when using *args and **kwargs"
  ],
  
  prerequisites: ["lesson-03-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction: why are *args and **kwargs needed?",
        content: `Sometimes we do not know in advance how many arguments will be passed to a function. For example, a function for calculating the sum of numbers must work with any number of numbers.

**Problem without *args:**\`\`\`python
def calculate_sum(a, b):
    return a + b

# This works only for two numbers
result = calculate_sum(5, 3)  # 8

# What if you need to add 3, 4, or more numbers?
# It is necessary to create many functions or use complex solutions
\`\`\`

**Solution with *args:**\`\`\`python
def calculate_sum(*args):
    return sum(args)

# Now works with any number of numbers!
result1 = calculate_sum(5, 3)           # 8
result2 = calculate_sum(5, 3, 10, 2)    # 20
result3 = calculate_sum(1, 2, 3, 4, 5)  # 15
\`\`\`

**Similarly with **kwargs:**

If you need to accept an arbitrary number of keyword arguments (for example, settings), we use **kwargs.`
      },
      {
        title: "What is *args?",
        content: `\`*args\` allows a function to accept an arbitrary number of positional arguments. The arguments are collected into a tuple.

**Syntax:**\`\`\`python
def function_name(*args):
    # args is a tuple of all the passed positional arguments
    pass
\`\`\`

**Example:**\`\`\`python
def print_numbers(*args):
    """Outputs all transmitted numbers"""
    print(f"Received {len(args)} numbers:")
    for number in args:
        print(number)

# Usage
print_numbers(1, 2, 3)
# Will output:
# Received 3 numbers:
# 1
# 2
# 3

print_numbers(10, 20, 30, 40, 50)
# Will output:
# Received 5 numbers:
# 10
# 20
# 30
# 40
# 50
\`\`\`

**Important:**

1. **The name "args" is a convention, you can use any name:**\`\`\`python
def example(*numbers):  # It works too!
    return sum(numbers)

result = example(1, 2, 3, 4)  # 10
\`\`\`2. ***args collects arguments into a tuple:**\`\`\`python
def show_args(*args):
    print(f"Type: {type(args)}")
    print(f"Value: {args}")

show_args(1, 2, 3)
# Will output:
# Type: <class 'tuple'>
# Values: (1, 2, 3)
\`\`\`3. ***args can be empty:**\`\`\`python
def example(*args):
    if len(args) == 0:
        print("Arguments not provided")
    else:
        print(f"Received {len(args)} arguments")

example()  # Arguments not provided
example(1, 2)  # 2 arguments received
\`\`\``
      },
      {
        title: "Practical examples with *args",
        content: `**Example 1: Calculating the average value**\`\`\`python
def calculate_average(*numbers):
    """Calculates the average value from an arbitrary number of numbers"""
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)

# Usage
avg1 = calculate_average(10, 20, 30)        # 20.0
avg2 = calculate_average(5, 15, 25, 35, 45)  # 25.0
avg3 = calculate_average(100)               # 100.0
\`\`\`

**Example 2: Finding the maximum value**\`\`\`python
def find_max(*numbers):
    """Finds the maximum value among the given numbers"""
    if len(numbers) == 0:
        return None
    return max(numbers)

# Usage
max1 = find_max(10, 5, 20, 15)      # 20
max2 = find_max(1, 2, 3, 4, 5, 6)   # 6
max3 = find_max(100)                # 100
\`\`\`

**Example 3: Concatenation of strings**\`\`\`python
def join_strings(*words, separator=" "):
    """Joins strings with an optional separator"""
    return separator.join(words)

# Usage
result1 = join_strings("Hello", "world", "Python")  # "Hello world Python"
result2 = join_strings("a", "b", "c", separator="-")  # "a-b-c"
result3 = join_strings("1", "2", "3", separator="")   # "123"
\`\`\`

**Example 4: Function with mandatory and *args parameters**\`\`\`python
def create_message(title, *details):
    """Creates a message with a title and details"""
    message = f"Title: {title}\n"
    message += "Details:
"
    for i, detail in enumerate(details, 1):
        message += f"  {i}. {detail}\\n"
    return message

# Usage
msg1 = create_message("Important", "First part", "Second detail")
msg2 = create_message("Message", "Part 1", "Part 2", "Part 3")
\`\`\``
      },
      {
        title: "What is **kwargs?",
        content: `\`**kwargs\` allows a function to accept an arbitrary number of named arguments. The arguments are collected into a dictionary.

**Syntax:**\`\`\`python
def function_name(**kwargs):
    # kwargs is a dictionary of all passed named arguments
    pass
\`\`\`

**Example:**\`\`\`python
def print_info(**kwargs):
    """Prints all passed named arguments"""
    print("The following information has been received:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

# Usage
print_info(name="Oleksandr", age=20, city="Kyiv")
# Will output:
# The following information has been received:
#   name: Oleksandr
#   age: 20
#   city: Kyiv

print_info(title="Programmer", experience=5, language="Python")
# Will output:
# The following information has been received:
#   title: Programmer
#   experience: 5
#   language: Python
\`\`\`

**Important:**

1. **The name "kwargs" is a convention, you can use any name:**\`\`\`python
def example(**options):  # It works too!
    return options

result = example(a=1, b=2, c=3)
\`\`\`

2. ****kwargs collects arguments into a dictionary:**\`\`\`python
def show_kwargs(**kwargs):
    print(f"Type: {type(kwargs)}")
    print(f"Value: {kwargs}")

show_kwargs(a=1, b=2, c=3)
# Will output:
# Type: <class 'dict'>
# Value: {'a': 1, 'b': 2, 'c': 3}
\`\`\`3. ****kwargs can be empty:**\`\`\`python
def example(**kwargs):
    if len(kwargs) == 0:
        print("Named arguments were not passed")
    else:
        print(f"Received {len(kwargs)} named arguments")

example()  # Named arguments were not passed
example(a=1, b=2)  # Received 2 named arguments
\`\`\`4. **Access to values through keys:**\`\`\`python
def check_user(**kwargs):
    if "name" in kwargs:
        print(f"Name: {kwargs['name']}")
    if "age" in kwargs:
        print(f"Age: {kwargs['age']}")

check_user(name="Oleksandr", age=20)
# Will output:
# Name: Oleksandr
# Age: 20
\`\`\``
      },
      {
        title: "Practical examples with **kwargs",
        content: `**Example 1: Creating a user profile**\`\`\`python
def create_profile(**info):
    """Creates a user profile with arbitrary information"""
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

# Usage
profile1 = create_profile(name="Oleksandr", age=20, city="Kyiv")
profile2 = create_profile(username="user1", email="user@example.com", role="admin")
profile3 = create_profile(title="Programmer", experience=5, skills=["Python", "JavaScript"])
\`\`\`

**Example 2: Configuration with optional parameters**\`\`\`python
def configure_app(**settings):
    """Configures the application with optional parameters"""
    default_settings = {
        "theme": "light",
        "language": "uk",
        "notifications": True,
        "font_size": 14
    }
    
    # Updating default settings with the provided values
    default_settings.update(settings)
    
    return default_settings

# Usage
config1 = configure_app()  # All default values
config2 = configure_app(theme="dark")  # Only the topic has been changed
config3 = configure_app(theme="dark", font_size=18, language="en")  # Several parameters
\`\`\`

**Example 3: Data Filtering**\`\`\`python
def filter_data(data, **filters):
    """Filters data by various criteria"""
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
    {"name": "Oleksandr", "age": 20, "city": "Kyiv"},
    {"name": "Maria", "age": 25, "city": "Lviv"},
    {"name": "Ivan", "age": 20, "city": "Kyiv"}
]

result1 = filter_data(users, age=20)  # All aged 20
result2 = filter_data(users, city="Kyiv")  # Everyone is from Kyiv
result3 = filter_data(users, age=20, city="Kyiv")  # 20 years old and from Kyiv
\`\`\`

**Example 4: Logging with metadata**\`\`\`python
def log_message(message, **metadata):
    """Logs a message with additional metadata"""
    log_entry = f"Message: {message}"
    if metadata:
        log_entry += "
Metadata:"
        for key, value in metadata.items():
            log_entry += f"\\n  {key}: {value}"
    print(log_entry)

# Usage
log_message("Connection error", level="error", timestamp="2024-01-15", user="admin")
log_message("Successful connection", level="info", user="user1")
\`\`\``
      },
      {
        title: "Combining *args and **kwargs",
        content: `You can use \`*args\` and \`**kwargs\` in one function! This gives maximum flexibility.

**Correct order of parameters:**

1. First, regular parameters
2. Then \`*args\`
3. Then parameters with default values
4. Finally \`**kwargs\`\`\`\`python
def example(required, *args, default="meaning", **kwargs):
    """Correct order of parameters"""
    print(f"Mandatory: {required}")
    print(f"*args: {args}")
    print(f"By default: {default}")
    print(f"**kwargs: {kwargs}")

# Usage
example("mandatory", 1, 2, 3, default="other", a=1, b=2)
\`\`\`

**Example: Universal Data Processing Function**\`\`\`python
def process_data(operation, *numbers, **options):
    """Processes numbers with different operations and options"""
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
    
    # Processing options
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

**Example: Creating HTML tags**\`\`\`python
def create_tag(tag_name, *content, **attributes):
    """Creates an HTML tag with content and attributes"""
    attrs = " ".join([f'{key}="{value}"' for key, value in attributes.items()])
    if attrs:
        attrs = " " + attrs
    
    content_str = "".join(str(item) for item in content)
    
    return f"<{tag_name}{attrs}>{content_str}</{tag_name}>"

# Usage
tag1 = create_tag("div", "Hello", "world", class="container", id="main")
# <div class="container" id="main">Hello world</div>

tag2 = create_tag("a", "Link", href="https://example.com", target="_blank")
# <a href="https://example.com" target="_blank">Link</a>
\`\`\`

**Important rule:**

After \`*args\` you cannot use positional parameters without default values:

\`\`\`python
# Incorrect:
def example(*args, required_param):  #  Error!
    pass

# Correct:
def example(*args, default_param="meaning"):  # 
    pass

def example(required_param, *args, default_param="meaning"):  # 
    pass
\`\`\``
      },
      {
        title: "Unpacking *args and **kwargs",
        content: `You can not only collect arguments, but also unpack them when calling a function!

**Unpacking *args:**\`\`\`python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]

# Unpacking a list into arguments
result = add(*numbers)  # Equivalent to add(1, 2, 3)
print(result)  # 6

# Also works with tuples
numbers_tuple = (10, 20, 30)
result = add(*numbers_tuple)  # 60
\`\`\`

**Unpacking **kwargs:**\`\`\`python
def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

info = {
    "name": "Oleksandr",
    "age": 20,
    "city": "Kyiv"
}

# Unpacking a dictionary into named arguments
greet(**info)  # Equivalent to greet(name="Oleksandr", age=20, city="Kyiv")
\`\`\`

**Combining unpacking:**\`\`\`python
def example(a, b, c, d, e):
    return a + b + c + d + e

args_list = [1, 2, 3]
kwargs_dict = {"d": 4, "e": 5}

# Combining positional and named
result = example(*args_list, **kwargs_dict)  # 15
\`\`\`

**Practical example: Delegation of calls**\`\`\`python
def wrapper_function(*args, **kwargs):
    """A wrapper that passes arguments to another function"""
    print("A wrapper is called")
    return original_function(*args, **kwargs)

def original_function(a, b, c=10):
    return a + b + c

# Usage
result = wrapper_function(1, 2, c=20)  # Passes the arguments further
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson, we studied powerful tools for working with arguments:

**Key Concepts:**

1. **\`*args\`**
   - Collects an arbitrary number of positional arguments into a tuple
   - The name "args" is a convention, any name can be used
   - Allows creating flexible functions

2. **\`**kwargs\`**
   - Collects an arbitrary number of keyword arguments into a dictionary
   - The name "kwargs" is a convention, any name can be used
   - Allows working with optional parameters

3. **Combining**
   - Both can be used in a single function
   - Order: regular parameters → *args → default parameters → **kwargs
   - After *args, positional parameters without default values cannot be used4. **Unpacking**
   - \`*list\` unpacks a list/tuple into positional arguments
   - \`**dictionary\` unpacks a dictionary into keyword arguments
   - Useful for delegating function calls

**When to use:**

- \`*args\` - when the number of positional arguments is unknown
- \`**kwargs\` - when optional named parameters are needed
- Combining - for maximum flexibility

**Next step:**

In the next lesson, we will learn about object methods - how to work with methods of strings, lists, and other objects.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Basic example of *args",
      code: `def calculate_sum(*args):
    """
    Calculates the sum of an arbitrary number of numbers
    """
    return sum(args)

# Usage
print(calculate_sum(1, 2, 3))        # 6
print(calculate_sum(10, 20, 30, 40))  # 100
print(calculate_sum(5))              # 5`,
      explanation: "Demonstrates the basic use of *args for working with an arbitrary number of arguments."
    },
    {
      title: "Basic example of **kwargs",
      code: `def print_info(**kwargs):
    """
    Prints all passed named arguments
    """
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Usage
print_info(name="Oleksandr", age=20, city="Kyiv")
print_info(title="Programmer", experience=5)`,
      explanation: "Shows the basic use of **kwargs for working with named arguments."
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
      explanation: "Demonstrates combining *args and **kwargs in a single function."
    },
    {
      title: "Unpacking *args",
      code: `def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)  # Unpacks the list into arguments
print(result)  # 6`,
      explanation: "Shows how to unpack a list/tuple into positional arguments."
    },
    {
      title: "Unpacking **kwargs",
      code: `def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

info = {"name": "Oleksandr", "age": 20, "city": "Kyiv"}
greet(**info)  # Unpacks the dictionary into keyword arguments`,
      explanation: "Demonstrates unpacking a dictionary into named arguments."
    },
    {
      title: "Function with mandatory and optional parameters",
      code: `def create_message(title, *details, **metadata):
    """
    Creates a message with a title, details, and metadata
    """
    message = f"Title: {title}\n"
    if details:
        message += "Details:\n"
        for detail in details:
            message += f"  - {detail}\n"
    if metadata:
        message += "Metadata:\n"
        for key, value in metadata.items():
            message += f"  {key}: {value}\n"
    return message

# Usage
msg = create_message("Important", "Detail 1", "Detail 2", author="Admin", date="2024-01-15")
print(msg)`,
      explanation: "A practical example of a function that uses regular parameters, *args, and **kwargs."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Incorrect order of parameters",
      explanation: "Beginners often confuse the order of parameters when using *args and **kwargs.",
      correctApproach: `# Incorrect:
def example(**kwargs, *args):  #  Error! **kwargs cannot come before *args
    pass

# Correct:
def example(*args, **kwargs):  #  Correct order
    pass

# Or with required parameters:
def example(required, *args, default="value", **kwargs):  # 
    pass`
    },
    {
      mistake: "A positional parameter after *args without a default value",
      explanation: "After *args, you cannot use positional parameters without default values.",
      correctApproach: `# Incorrect:
def example(*args, required_param):  #  Error!
    pass

# Correct:
def example(*args, default_param="value"):  #  With default value
    pass

# Or required parameter before *args:
def example(required_param, *args):  # 
    pass`
    },
    {
      mistake: "Confusion between *args and **kwargs",
      explanation: "Beginners often get confused about when to use *args and when to use **kwargs.",
      correctApproach: `# *args - for positional arguments (assembled in a tuple)
def example(*args):
    print(args)  # (1, 2, 3)

example(1, 2, 3) # Positional arguments

# **kwargs - for named arguments (collected in the dictionary)
def example(**kwargs):
    print(kwargs)  # {'a': 1, 'b': 2}

example(a=1, b=2) # Named arguments`
    },
    {
      mistake: "Forgetting that *args and **kwargs can be empty",
      explanation: "Beginners sometimes do not check whether the arguments are passed, which can lead to errors.",
      correctApproach: `# Correct - checking for the presence of arguments
def example(*args, **kwargs):
    if len(args) == 0:
        print("Positional arguments were not passed")
    else:
        print(f"Received {len(args)} positional arguments")
    
    if len(kwargs) == 0:
        print("Named arguments were not passed")
    else:
        print(f"Received {len(kwargs)} named arguments")

example()  # Both messages about the absence of arguments`
    }
  ],
  
  summary: `In this lesson we studied *args and kwargs - powerful tools for working with arguments:

1. *args
   - Collects an arbitrary number of positional arguments into a tuple
   - Allows creating flexible functions
   - The name "args" is a convention, you can use any

2. **kwargs
   - Collects an arbitrary number of named arguments into a dictionary
   - Useful for optional parameters and settings
   - The name "kwargs" is a convention, you can use any

3. Combining
   - You can use both in one function
   - Correct order: normal → *args → default → kwargs
   - After *args you cannot use positional arguments without default values4. Unpacking
   - \`*list\` unpacks into positional arguments
   - \`dictionary\` unpacks into keyword arguments
   - Useful for delegating calls

These tools make functions more flexible and powerful!`,
  
  practiceTask: {
    title: "Universal calculator",
    description: "Create a universal calculator that works with any number of numbers and options",
    problemStatement: `Write a program with functions:

1. calculate(operation, *numbers, **options) - "add", "multiply", "average"; round option
2. format_result(result, **format_options) - prefix, suffix
3. display_calculation(operation, *numbers, result, **info) - prints calculation block

Read: operation, n, n numbers, round_flag (True/False), prefix, suffix.

Input format:
add
3
10
20
30
True
Sum: 
 UAH`,
    outputFormat: `=== Calculation ===
Operation: add
Numbers: 10, 20, 30
Result: 60
Formatting: 60

Formatted result: Sum: 60 UAH`,
    examples: [
      {
        input: `add
3
10
20
30
True
Sum: 
 UAH`,
        output: `=== Calculation ===
Operation: add
Numbers: 10, 20, 30
Result: 60
Formatting: 60

Formatted result: Sum: 60 UAH`,
        explanation: "Addition with rounding and prefix/suffix"
      },
      {
        input: `multiply
3
2
3
4
False
-
-`,
        output: `=== Calculation ===
Operation: multiply
Numbers: 2, 3, 4
Result: 24
Formatting: 24

Formatted result: 24`,
        explanation: "Multiplication 2*3*4 = 24; '-' means an empty prefix/suffix"
      },
      {
        input: `average
4
10
20
30
40
True
Average: 
-`,
        output: `=== Calculation ===
Operation: average
Numbers: 10, 20, 30, 40
Result: 25
Formatting: 25

Formatted result: Average: 25`,
        explanation: "Average 25 with prefix; '-' = empty suffix"
      }
    ],
    solution: {
      code: `def calculate(operation, *numbers, **options):
    """Performs an operation on an arbitrary number of numbers"""
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
    if options.get("round"):
        result = round(result)
    return result

def format_result(result, **format_options):
    """Formats the result with options"""
    if result is None:
        return "Error"
    prefix = format_options.get("prefix", "")
    suffix = format_options.get("suffix", "")
    return f"{prefix}{result}{suffix}"

def display_calculation(operation, *numbers, result, **info):
    """Displays detailed information about the calculation"""
    print("=== Calculation ===")
    print(f"Operation: {operation}")
    print(f"Numbers: {', '.join(str(n) for n in numbers)}")
    print(f"Result: {result}")
    if info:
        print("Additional information:")
        for key, value in info.items():
            print(f"  {key}: {value}")
    print(f"Formatting: {format_result(result)}")
    print()

operation = input().strip()
n = int(input())
numbers = [int(input()) for _ in range(n)]
round_flag = input().strip() == "True"
prefix = input()
suffix = input()
if prefix.strip() == "-":
    prefix = ""
if suffix.strip() == "-":
    suffix = ""

result = calculate(operation, *numbers, round=round_flag)
display_calculation(operation, *numbers, result=result)
formatted = format_result(result, prefix=prefix, suffix=suffix)
print(f"Formatted result: {formatted}")`,
      explanation: "We use *args/**kwargs; we read the operation and numbers from stdin. '-' in prefix/suffix means an empty string."
    },
    hints: [
      "Determine calculate with *numbers and **options",
      "Read operation, n and numbers through input()",
      "round_flag = input().strip() == \"True\"",
      "Remember the order: required → *args → **kwargs"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is *args?",
        options: [
          "A mechanism for accepting an arbitrary number of positional arguments",
          "Mechanism for accepting an arbitrary number of named arguments",
          "Special variable in Python",
          "Data type"
        ],
        correctAnswer: 0,
        explanation: "*args allows a function to accept an arbitrary number of positional arguments, which are collected into a tuple."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What are the arguments collected in **kwargs?",
        options: [
          "Dictionary",
          "Tuple",
          "List",
          "Set"
        ],
        correctAnswer: 0,
        explanation: "**kwargs collects named arguments into a dictionary, where the keys are the parameter names and the values are the passed values."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef example(*args):\n    return len(args)\n\nprint(example(1, 2, 3, 4, 5))\n```",
        options: [
          "5",
          "Error",
          "0",
          "(1, 2, 3, 4, 5)"
        ],
        correctAnswer: 0,
        explanation: "The function takes 5 positional arguments through *args, which are collected into a tuple. len(args) returns 5."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the correct order of parameters in a function?",
        options: [
          "mandatory → *args → default parameters → **kwargs",
          "*args → **kwargs → required",
          "**kwargs → *args → mandatory",
          "The order does not matter"
        ],
        correctAnswer: 0,
        explanation: "The correct order: first required parameters, then *args, then parameters with default values, and finally **kwargs."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef example(**kwargs):\n    if 'name' in kwargs:\n        return kwargs['name']\n    return 'Unknown'\n\nprint(example(age=20, city='Kyiv'))\nprint(example(name='Alexander', age=20))\n```",
        options: [
          "Unknown, then Oleksandr",
          "Error",
          "Oleksandr, then Unknown",
          "Unknown, then Unknown"
        ],
        correctAnswer: 0,
        explanation: "The first call does not contain 'name' in kwargs, so 'Unknown' is returned. The second call contains 'name', so 'Alexander' is returned."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Is it possible to use a different name instead of 'args' and 'kwargs'?",
        options: [
          "Yes, this is just a convention",
          "No, these are reserved words",
          "Only for *args",
          "Only for **kwargs"
        ],
        correctAnswer: 0,
        explanation: "The names 'args' and 'kwargs' are just conventions. You can use any names, for example *numbers or **options."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\ndef example(a, *args, **kwargs):\n    print(f'a={a}, args={args}, kwargs={kwargs}')\n\nexample(1, 2, 3, x=10, y=20)\n```",
        options: [
          "a=1, args=(2, 3), kwargs={'x': 10, 'y': 20}",
          "Error",
          "a=1, args=(1, 2, 3), kwargs={}",
          "a=1, args=(), kwargs={'x': 10, 'y': 20, '2': 3}"
        ],
        correctAnswer: 0,
        explanation: "a=1 (mandatory parameter), args=(2, 3) (positional arguments after a), kwargs={'x': 10, 'y': 20} (named arguments)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "After *args, you can use positional parameters without default values.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "No, after *args you can only use parameters with default values or **kwargs. Positional parameters without default values must come before *args."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
