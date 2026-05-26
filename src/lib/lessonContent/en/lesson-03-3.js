/**
 * Lesson 03-3: Positional and keyword arguments
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_3 = {
  lessonId: "lesson-03-3",
  moduleId: "module-03",
  order: 3,
  title: "Positional and keyword arguments",
  
  learningObjectives: [
    "Understand the difference between positional and keyword arguments",
    "Use positional arguments correctly",
    "Apply keyword arguments for readability",
    "Combine positional and keyword arguments",
    "Understand argument order and usage rules"
  ],
  
  prerequisites: ["lesson-03-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Positional arguments",
        content: `Positional arguments are arguments passed to a function in the same order as the parameters are defined.

**How it works:**

\`\`\`python
def greet(name, age, city):
    """
    name, age, city - parameters
    """
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

# Positional arguments are passed in order
greet("Alex", 20, "London")
# "Alex" → name
# 20 → age
# "London" → city
\`\`\`

**Important:** Order matters!

\`\`\`python
def calculate(a, b, operation):
    if operation == "add":
        return a + b
    elif operation == "multiply":
        return a * b
    else:
        return a - b

# Correct order
result1 = calculate(5, 3, "add")  # 5 + 3 = 8

# Wrong order - you get an unexpected result!
result2 = calculate("add", 5, 3)  # Error or unexpected result
\`\`\`

**Advantages of positional arguments:**
- Short syntax
- Quick to write for simple functions
- Convenient when the order is logical

**Disadvantages:**
- You need to remember parameter order
- Easy to mix up the order
- Less readable for functions with many parameters`
      },
      {
        title: "Keyword arguments",
        content: `Keyword arguments are arguments passed with the parameter name specified.

**Syntax:**

\`\`\`python
def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

# Keyword arguments
greet(name="Alex", age=20, city="London")
greet(age=20, city="London", name="Alex")  # Order does not matter!
\`\`\`

**Advantages of keyword arguments:**

1. **Readability:**
\`\`\`python
def create_user(username, email, age, is_active, role):
    # Create user
    pass

# With keyword arguments - it's clear what each value means
create_user(
    username="john_doe",
    email="john@example.com",
    age=25,
    is_active=True,
    role="admin"
)
\`\`\`

2. **Order does not matter:**
\`\`\`python
def calculate(price, discount, tax):
    return price * (1 - discount) * (1 + tax)

# All these calls are equivalent:
result1 = calculate(price=100, discount=0.1, tax=0.2)
result2 = calculate(discount=0.1, tax=0.2, price=100)
result3 = calculate(tax=0.2, price=100, discount=0.1)
\`\`\`

3. **Fewer mistakes:**
\`\`\`python
def send_email(to, subject, body, from_address):
    # Send email
    pass

# With keyword arguments it's hard to mix things up
send_email(
    to="user@example.com",
    subject="Hello",
    body="This is a message",
    from_address="sender@example.com"
)
\`\`\``
      },
      {
        title: "Combining positional and keyword arguments",
        content: `You can combine positional and keyword arguments in a single function call!

**Rule:** Positional arguments first, then keyword arguments.

\`\`\`python
def greet(name, age, city, country):
    print(f"Hello, {name}! You are {age} years old. You are from {city}, {country}.")

# Combining
greet("Alex", 20, city="London", country="USA")
# "Alex" and 20 are positional
# city and country are keyword
\`\`\`

**Important rule:**

You cannot use positional arguments after a keyword argument!

\`\`\`python
def example(a, b, c, d):
    pass

# Correct:
example(1, 2, c=3, d=4)
example(1, b=2, c=3, d=4)
example(a=1, b=2, c=3, d=4)

# Incorrect:
example(1, 2, c=3, 4)        # Error! No positional after keyword
example(1, b=2, 3, d=4)      # Error!
\`\`\`

**Practical example:**

\`\`\`python
def format_date(day, month, year, separator="/", format_type="short"):
    """
    Formats a date
    """
    if format_type == "short":
        return f"{day}{separator}{month}{separator}{year}"
    else:
        months = ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"]
        return f"{day} {months[month-1]} {year}"

# Usage
date1 = format_date(15, 3, 2024)  # All positional
date2 = format_date(15, 3, 2024, separator="-")  # Combining
date3 = format_date(15, 3, 2024, format_type="long")  # Combining
date4 = format_date(15, 3, year=2024, separator=".")  # Combining
\`\`\``
      },
      {
        title: "Default values",
        content: `Parameters can have default values. This lets you skip arguments for those parameters.

**Syntax:**

\`\`\`python
def function_name(param1, param2=default_value):
    # Function code
    pass
\`\`\`

**Example:**

\`\`\`python
def greet(name, greeting="Hello"):
    """
    greeting has default value "Hello"
    """
    print(f"{greeting}, {name}!")

# Can call with one argument
greet("Alex")  # Prints: Hello, Alex!

# Or with two
greet("Alex", "Good morning")  # Prints: Good morning, Alex!
\`\`\`

**Parameter order rule:**

Parameters with default values must come after parameters without default values.

\`\`\`python
# Correct:
def example(a, b, c=10, d=20):
    pass

# Incorrect:
def example(a=10, b, c):  # Error!
    pass
\`\`\`

**Practical examples:**

\`\`\`python
# Example 1: Function with multiple default values
def create_message(text, prefix="Message:", suffix="", uppercase=False):
    """
    Creates a message with optional parameters
    """
    message = f"{prefix} {text} {suffix}".strip()
    if uppercase:
        message = message.upper()
    return message

# Usage
msg1 = create_message("Hello")  # "Message: Hello"
msg2 = create_message("Hello", prefix="Alert:")  # "Alert: Hello"
msg3 = create_message("Hello", uppercase=True)  # "MESSAGE: HELLO"
msg4 = create_message("Hello", suffix="(important)", uppercase=True)
\`\`\`

\`\`\`python
# Example 2: Math operations
def power(base, exponent=2):
    """
    Raises a number to a power
    Default is square
    """
    return base ** exponent

# Usage
print(power(5))      # 25 (5²)
print(power(5, 3))   # 125 (5³)
print(power(2, 10))  # 1024 (2¹⁰)
\`\`\`

\`\`\`python
# Example 3: Text formatting
def format_text(text, width=80, align="left", fill_char=" "):
    """
    Formats text with various parameters
    """
    if align == "left":
        return text.ljust(width, fill_char)
    elif align == "right":
        return text.rjust(width, fill_char)
    else:  # center
        return text.center(width, fill_char)

# Usage
text = "Hello"
print(format_text(text))                    # Default formatting
print(format_text(text, width=20))          # Width 20
print(format_text(text, align="center"))    # Centered
print(format_text(text, fill_char="*"))     # Fill with asterisks
\`\`\``
      },
      {
        title: "When to use positional vs keyword arguments",
        content: `**Use positional arguments when:**

1. **The function has 1-2 parameters:**
\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)  # Positional is enough
\`\`\`

2. **Parameter order is obvious:**
\`\`\`python
def calculate_distance(x1, y1, x2, y2):
    return ((x2 - x1)**2 + (y2 - y1)**2)**0.5

distance = calculate_distance(0, 0, 3, 4)  # Coordinates in order
\`\`\`

**Use keyword arguments when:**

1. **The function has many parameters:**
\`\`\`python
def create_user(username, email, age, is_active, role, created_at, last_login):
    # Create user
    pass

# With keyword arguments it's much clearer
create_user(
    username="john",
    email="john@example.com",
    age=25,
    is_active=True,
    role="admin",
    created_at="2024-01-01",
    last_login="2024-01-15"
)
\`\`\`

2. **Parameters have default values:**
\`\`\`python
def send_email(to, subject, body, from_address="noreply@example.com", cc=None):
    # Send email
    pass

# Convenient to use keyword for optional parameters
send_email(
    to="user@example.com",
    subject="Hello",
    body="Message",
    cc="manager@example.com"  # Only this differs from default
)
\`\`\`

3. **Readability is needed:**
\`\`\`python
def format_currency(amount, currency="USD", decimals=2, symbol=True):
    # Format currency
    pass

# With keyword arguments it's clear what each value means
format_currency(1000, currency="USD", decimals=2, symbol=True)
\`\`\`

**Combine when appropriate:**

\`\`\`python
def process_data(data, format="json", validate=True, save=False, output_file=None):
    # Process data
    pass

# First parameter (data) is positional (required)
# The rest are keyword (optional)
process_data(my_data, format="xml", save=True, output_file="result.xml")
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: User profile function**

\`\`\`python
def create_profile(name, age, city="Not specified", country="USA", bio=""):
    """
    Creates a user profile
    """
    profile = {
        "name": name,
        "age": age,
        "city": city,
        "country": country,
        "bio": bio
    }
    return profile

# Different ways to call
profile1 = create_profile("Alex", 20)  # Required only
profile2 = create_profile("Maria", 22, city="London")  # With extra parameter
profile3 = create_profile("Alex", 20, city="London", bio="Programmer")  # All values
profile4 = create_profile("Maria", 22, bio="Developer", city="London")  # Order doesn't matter
\`\`\`

**Example 2: Discount calculation function**

\`\`\`python
def calculate_price(original_price, discount=0, tax=0.2, currency="USD"):
    """
    Calculates final price with discount and tax
    """
    price_after_discount = original_price * (1 - discount)
    final_price = price_after_discount * (1 + tax)
    
    return {
        "original": original_price,
        "after_discount": price_after_discount,
        "final": final_price,
        "currency": currency
    }

# Usage
price1 = calculate_price(1000)  # Base price only
price2 = calculate_price(1000, discount=0.1)  # 10% discount
price3 = calculate_price(1000, discount=0.15, tax=0.0)  # No tax
price4 = calculate_price(1000, currency="USD", discount=0.2)  # With currency
\`\`\`

**Example 3: Text formatting function**

\`\`\`python
def format_text(text, max_length=50, ellipsis="...", align="left"):
    """
    Formats text with length limit
    """
    if len(text) > max_length:
        text = text[:max_length - len(ellipsis)] + ellipsis
    
    if align == "left":
        return text.ljust(max_length)
    elif align == "right":
        return text.rjust(max_length)
    else:  # center
        return text.center(max_length)

# Usage
text = "Very long text that needs to be truncated"
formatted1 = format_text(text)  # Default formatting
formatted2 = format_text(text, max_length=30)  # Shorter
formatted3 = format_text(text, align="center", ellipsis="…")  # Centered with different ellipsis
\`\`\`

**Example 4: Combining positional and keyword arguments**

\`\`\`python
def send_notification(message, recipient, priority="normal", urgent=False, timestamp=None):
    """
    Sends a notification
    """
    notification = {
        "message": message,
        "recipient": recipient,
        "priority": priority,
        "urgent": urgent,
        "timestamp": timestamp
    }
    return notification

# Combining
notif1 = send_notification("Hello", "user@example.com")  # Required only
notif2 = send_notification("Important!", "user@example.com", priority="high", urgent=True)
notif3 = send_notification("Message", recipient="user@example.com", urgent=True)
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned:

**Key concepts:**

1. **Positional arguments**
   - Passed in order
   - Order matters
   - Convenient for simple functions

2. **Keyword arguments**
   - Passed with parameter names
   - Order does not matter
   - Improve readability

3. **Combining**
   - Positional first, then keyword
   - No positional after keyword

4. **Default values**
   - Parameters can have default values
   - Parameters with defaults must come after those without

**Rules:**

- Use positional for simple functions (1-2 parameters)
- Use keyword for complex functions (many parameters)
- Combine when appropriate
- Default values make functions more flexible

**Next step:**

In the next lesson we'll learn about *args and **kwargs - powerful tools for working with any number of arguments.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Positional arguments",
      code: `def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

# Order matters
greet("Alex", 20, "London")  # Correct
greet("London", "Alex", 20)  # Wrong - mixed up order`,
      explanation: "Demonstrates positional arguments where order is critical."
    },
    {
      title: "Keyword arguments",
      code: `def greet(name, age, city):
    print(f"Hello, {name}! You are {age} years old. You are from {city}.")

# Order does not matter
greet(name="Alex", age=20, city="London")
greet(city="London", name="Alex", age=20)  # Same result`,
      explanation: "Shows that with keyword arguments order does not matter."
    },
    {
      title: "Combining positional and keyword arguments",
      code: `def calculate(a, b, operation="add", round_result=False):
    if operation == "add":
        result = a + b
    elif operation == "multiply":
        result = a * b
    else:
        result = a - b
    
    if round_result:
        return round(result)
    return result

# Combining
print(calculate(5, 3))  # Positional
print(calculate(5, 3, operation="multiply"))  # Combining
print(calculate(5, 3, round_result=True))  # Combining`,
      explanation: "Demonstrates combining positional and keyword arguments in one call."
    },
    {
      title: "Default values",
      code: `def power(base, exponent=2):
    return base ** exponent

# Using default value
print(power(5))      # 25 (5²)
print(power(5, 3))   # 125 (5³)

# With keyword argument
print(power(2, exponent=10))  # 1024`,
      explanation: "Shows parameters with default values."
    },
    {
      title: "Practical example: date formatting",
      code: `def format_date(day, month, year, separator="/", format_type="short"):
    if format_type == "short":
        return f"{day}{separator}{month}{separator}{year}"
    else:
        months = ["January", "February", "March", "April"]
        return f"{day} {months[month-1]} {year}"

# Different ways to call
print(format_date(15, 3, 2024))
print(format_date(15, 3, 2024, separator="-"))
print(format_date(15, 3, 2024, format_type="long"))`,
      explanation: "Practical example of a function with default parameters and keyword arguments."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Mixed up order of positional arguments",
      explanation: "Beginners often mix up the order of positional arguments, especially when parameters have similar types.",
      correctApproach: `# Wrong:
def calculate(price, discount, tax):
    return price * (1 - discount) * (1 + tax)

result = calculate(0.1, 100, 0.2)  # Mixed up order

# Correct:
result = calculate(100, 0.1, 0.2)  # Correct order

# Or use keyword arguments:
result = calculate(price=100, discount=0.1, tax=0.2)  # Impossible to mix up`
    },
    {
      mistake: "Positional argument after keyword argument",
      explanation: "You cannot use positional arguments after a keyword argument.",
      correctApproach: `# Wrong:
def example(a, b, c, d):
    pass

example(1, 2, c=3, 4)  # Error! No positional after keyword

# Correct:
example(1, 2, c=3, d=4)  # All after keyword are also keyword
example(1, 2, 3, d=4)   # Positional before keyword`
    },
    {
      mistake: "Default parameters before non-default parameters",
      explanation: "Parameters with default values must come after parameters without default values.",
      correctApproach: `# Wrong:
def example(a=10, b, c):  # Error!
    pass

# Correct:
def example(a, b, c=10):  # Default parameters at the end
    pass

# Or all with defaults:
def example(a=1, b=2, c=3):  # Also correct
    pass`
    },
    {
      mistake: "Not using keyword arguments for readability",
      explanation: "For functions with many parameters, keyword arguments improve readability.",
      correctApproach: `# Hard to read:
def create_user(username, email, age, is_active, role, created_at):
    pass

create_user("john", "john@example.com", 25, True, "admin", "2024-01-01")  # Hard to understand

# Better:
create_user(
    username="john",
    email="john@example.com",
    age=25,
    is_active=True,
    role="admin",
    created_at="2024-01-01"
)  # Clear what each value means`
    }
  ],
  
  summary: `In this lesson we learned about positional and keyword arguments:

1. Positional arguments
   - Passed in parameter order
   - Order matters
   - Convenient for simple functions

2. Keyword arguments
   - Passed with parameter names
   - Order does not matter
   - Improve code readability

3. Combining
   - Positional first, then keyword
   - No positional after keyword

4. Default values
   - Parameters can have default values
   - Parameters with defaults must come after those without

5. When to use what
   - Positional for simple functions (1-2 parameters)
   - Keyword for complex functions (many parameters)
   - Combine when appropriate

This knowledge will help you write more readable and flexible code!`,
  
  practiceTask: {
    title: "User settings system",
    description: "Create functions for working with user settings using positional and keyword arguments",
    problemStatement: `Write a program that contains functions for working with user settings:

1. **create_user_settings** - creates user settings
   - Parameters: username (required), theme (default "light"), language (default "en"), notifications (default True), font_size (default 14)
   - Returns a dictionary of settings

2. **update_settings** - updates settings
   - Parameters: settings (settings dictionary), theme, language, notifications, font_size (all optional)
   - Updates only passed parameters
   - Returns the updated dictionary

3. **display_settings** - displays settings
   - Parameters: settings (dictionary), format (default "short")
   - If format="short" - prints short format
   - If format="full" - prints full format with descriptions

**Important:** Do not use the input() function. Enter values directly in the code.

Use different ways to call functions:
- Positional arguments only
- Keyword arguments only
- Combining positional and keyword arguments

Create several users with different settings and display them.`,
    outputFormat: `Example output:
=== User Settings ===
User: user1
Theme: dark
Language: en
Notifications: Enabled
Font size: 16`,
    examples: [
      {
        output: `=== User Settings (short format) ===
User: user1
Theme: light
Language: en
Notifications: Enabled
Font size: 14

=== User Settings (short format) ===
User: user2
Theme: dark
Language: en
Notifications: Enabled
Font size: 14

=== User Settings (full format) ===
User: user3
Interface theme: dark
Interface language: en
Notifications: Disabled
Font size: 16

=== User Settings (short format) ===
User: user4
Theme: dark
Language: en
Notifications: Disabled
Font size: 18

=== Updated Settings ===
User: user2
Theme: light
Language: en
Notifications: Enabled
Font size: 20`,
        explanation: "Demonstrates creating settings with different parameters and displaying in different formats."
      }
    ],
    solution: {
      code: `# User settings system

def create_user_settings(username, theme="light", language="en", notifications=True, font_size=14):
    """
    Creates user settings
    """
    settings = {
        "username": username,
        "theme": theme,
        "language": language,
        "notifications": notifications,
        "font_size": font_size
    }
    return settings

def update_settings(settings, theme=None, language=None, notifications=None, font_size=None):
    """
    Updates user settings
    Updates only passed parameters
    """
    if theme is not None:
        settings["theme"] = theme
    if language is not None:
        settings["language"] = language
    if notifications is not None:
        settings["notifications"] = notifications
    if font_size is not None:
        settings["font_size"] = font_size
    return settings

def display_settings(settings, format="short", header=None):
    """
    Displays user settings
    """
    if header:
        print(header)
    elif format == "short":
        print("=== User Settings (short format) ===")
    else:  # full
        print("=== User Settings (full format) ===")
    
    if format == "short":
        print(f"User: {settings['username']}")
        print(f"Theme: {settings['theme']}")
        print(f"Language: {settings['language']}")
        status = "Enabled" if settings['notifications'] else "Disabled"
        print(f"Notifications: {status}")
        print(f"Font size: {settings['font_size']}")
    else:  # full
        print(f"User: {settings['username']}")
        print(f"Interface theme: {settings['theme']}")
        print(f"Interface language: {settings['language']}")
        status = "Enabled" if settings['notifications'] else "Disabled"
        print(f"Notifications: {status}")
        print(f"Font size: {settings['font_size']}")
    print()

# Enter values directly in code (do not use input())

# Example 1: Required parameter only (defaults are used)
user1 = create_user_settings("user1")
display_settings(user1)

# Example 2: Positional arguments
user2 = create_user_settings("user2", "dark", "en")
display_settings(user2)

# Example 3: Keyword arguments (order doesn't matter)
user3 = create_user_settings(
    username="user3",
    font_size=16,
    theme="dark",
    language="en",
    notifications=False
)
display_settings(user3, format="full")

# Example 4: Combining positional and keyword arguments
user4 = create_user_settings("user4", "dark", notifications=False, font_size=18)
display_settings(user4)

# Example 5: Updating settings
updated_user2 = update_settings(user2, theme="light", font_size=20)
display_settings(updated_user2, format="short", header="=== Updated Settings ===")`,
      explanation: "The solution demonstrates positional and keyword arguments, default values, and combining different call styles."
    },
    hints: [
      "Enter values directly in code - do not use input()",
      "create_user_settings has one required parameter (username) and several with default values",
      "update_settings should check if a parameter is not None before updating",
      "display_settings should print different formats depending on the format parameter",
      "Try different call styles: positional only, keyword only, combining",
      "Use keyword arguments for readability, especially with many parameters"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "Theme: light",
        description: "Checking default values"
      },
      {
        expectedOutput: "Language: en",
        description: "Checking positional arguments"
      },
      {
        expectedOutput: "Font size: 16",
        description: "Checking all parameters"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a positional argument?",
        options: [
          "An argument passed in parameter order",
          "An argument with a parameter name",
          "An argument with a default value",
          "An argument that is not required"
        ],
        correctAnswer: 0,
        explanation: "A positional argument is passed in the order parameters are defined in the function. For example, in def add(a, b): the call add(5, 3) means 5 → a, 3 → b."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Does order matter for keyword arguments?",
        options: [
          "No, order does not matter",
          "Yes, order always matters",
          "It depends on the function",
          "Only for some data types"
        ],
        correctAnswer: 0,
        explanation: "For keyword arguments order does not matter because each argument has a parameter name. greet(name=\"Alex\", age=20) and greet(age=20, name=\"Alex\") are equivalent."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef greet(name, greeting=\"Hello\"):\n    print(f\"{greeting}, {name}!\")\n\ngreet(\"Alex\")\ngreet(\"Alex\", \"Good morning\")\n```",
        options: [
          "Hello, Alex!, then Good morning, Alex!",
          "An error",
          "Only Hello, Alex!",
          "Only Good morning, Alex!"
        ],
        correctAnswer: 0,
        explanation: "The first call uses the default value for greeting (\"Hello\"), the second call passes its own value (\"Good morning\")."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you use a positional argument after a keyword argument?",
        options: [
          "No, it will cause an error",
          "Yes, it works normally",
          "Only if the parameter has a default value",
          "Only for some data types"
        ],
        correctAnswer: 0,
        explanation: "You cannot use positional arguments after a keyword argument. This causes a SyntaxError. Rule: all positional first, then all keyword."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef calculate(a, b, operation=\"add\"):\n    if operation == \"add\":\n        return a + b\n    elif operation == \"multiply\":\n        return a * b\n    else:\n        return a - b\n\nprint(calculate(5, 3))\nprint(calculate(5, 3, operation=\"multiply\"))\n```",
        options: [
          "8, then 15",
          "15, then 8",
          "An error",
          "8, then 8"
        ],
        correctAnswer: 0,
        explanation: "The first call uses the default \"add\" (5 + 3 = 8), the second call uses \"multiply\" (5 * 3 = 15)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should parameters with default values be placed?",
        options: [
          "After parameters without default values",
          "Before parameters without default values",
          "It doesn't matter",
          "Only at the end of the function"
        ],
        correctAnswer: 0,
        explanation: "Parameters with default values must come after parameters without default values. This is a Python rule to avoid ambiguity."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\ndef example(a, b, c=10, d=20):\n    return a + b + c + d\n\nprint(example(1, 2))\nprint(example(1, 2, 3))\nprint(example(1, 2, d=30))\n```",
        options: [
          "33, 26, 43",
          "An error",
          "33, 33, 33",
          "26, 26, 26"
        ],
        correctAnswer: 0,
        explanation: "First: 1 + 2 + 10 + 20 = 33. Second: 1 + 2 + 3 + 20 = 26 (c=3 replaces default). Third: 1 + 2 + 10 + 30 = 43 (d=30 replaces default)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Keyword arguments are always better than positional arguments.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Not always. For simple functions with 1-2 parameters, positional arguments are often more convenient and shorter. Keyword arguments are better for complex functions with many parameters."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
