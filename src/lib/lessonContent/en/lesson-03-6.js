/**
 * Lesson 03-6: Lambda functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_03_6 = {
  lessonId: "lesson-03-6",
  moduleId: "module-03",
  order: 6,
  title: "Lambda functions",
  
  learningObjectives: [
    "Understand what lambda functions are and when to use them",
    "Use the map() function to apply the function to all elements",
    "Use the filter() function to filter elements",
    "Combine lambda with map() and filter()",
    "Understand the benefits and limitations of lambda functions"
  ],
  
  prerequisites: ["lesson-03-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are lambda functions?",
        content: `Lambda functions (also called anonymous functions) are a way to create short functions without using the \`def\` keyword.

**Main idea:**

Instead of creating a complete function:

\`\`\`python
def square(x):
    return x ** 2
\`\`\`

You can create a lambda function:

\`\`\`python
square = lambda x: x ** 2
\`\`\`

**Syntax:**

\`\`\`python
lambda arguments: expression
\`\`\`

**Example:**

\`\`\`python
# Regular function
def add(a, b):
    return a + b

# Lambda function
add = lambda a, b: a + b

# Both work the same
print(add(5, 3))  # 8
\`\`\`

**Key Features:**

1. **Lambda is an expression, not a block of code**
   - Can contain only a single expression
   - Cannot contain multiple lines or complex logic

2. **Anonymity**
   - Lambda functions do not require a name (although they can be assigned to a variable)
   - Often used directly in the code

3. **When to use:**
   - For simple functions that are used once
   - With functions \`map()\`, \`filter()\`, \`sorted()\`
   - For short operations that do not require a full function definition`
      },
      {
        title: "map() function",
        content: `The \`map()\` function applies a function to each element of an iterable object (for example, a list) and returns an iterator with the results.

**Syntax:**

\`\`\`python
map(function, iterable)
\`\`\`

**Example with a regular function:**

\`\`\`python
def square(x):
    return x ** 2

numbers = [1, 2, 3, 4, 5]
squared = map(square, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]
\`\`\`

**Example with lambda:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x ** 2, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]
\`\`\`

**Important:** \`map()\` returns an iterator, so to get a list you need to use \`list()\`.

**More complex examples:**

\`\`\`python
# String transformations
names = ["Oleksandr", "Maria", "Ivan"]
capitalized = list(map(lambda name: name.capitalize(), names))
# ["Oleksandr", "Maria", "Ivan"]

# Calculations with multiple lists
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# Application of the method
texts = ["  Hello  ", "  world  ", "  python  "]
cleaned = list(map(lambda text: text.strip().upper(), texts))
# ["HELLO", "WORLD", "PYTHON"]
\`\`\`

**Advantages of map():**

- More readable code for simple operations
- Functional programming style
- You can apply one function to many elements at the same time`
      },
      {
        title: "filter() function",
        content: `The function \`IC0\` filters elements of an iterable object, leaving only those for which the function returns \`IC1\`.

**Syntax:**

\`\`\`python
filter(function, iterable)
\`\`\`

**Important:** The function must return \`True\` or \`False\` (a boolean value).

**Example with a regular function:**

\`\`\`python
def is_even(num):
    return num % 2 == 0

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = filter(is_even, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]
\`\`\`

**Example with lambda:**

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]
\`\`\`

**Important:** \`filter()\` also returns an iterator, so to get a list you need to use \`list()\`.

**More complex examples:**

\`\`\`python
# Filtering rows by length
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]

# Filtering numbers by convention
numbers = [10, 15, 20, 25, 30, 35, 40]
large_numbers = list(filter(lambda x: x > 20, numbers))
# [25, 30, 35, 40]

# Filtering by substring presence
texts = ["Python", "Java", "JavaScript", "C++", "Pythonista"]
python_texts = list(filter(lambda text: "Python" in text, texts))
# ["Python", "Pythonista"]

# Filtering by multiple conditions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = list(filter(lambda x: x % 2 == 0 and x > 5, numbers))
# [6, 8, 10]
\`\`\`

**Advantages of filter():**

- Convenient for filtering data
- Functional programming style
- More readable code for simple conditions`
      },
      {
        title: "Combining lambda with map() and filter()",
        content: `You can combine \`map()\` and \`filter()\` for more complex operations.

**Example 1: Filtering and transformation**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# First, filter the even numbers, then bring them to the square
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# [4, 16, 36, 64, 100]
\`\`\`

**Example 2: Transformation and Filtering**

\`\`\`python
words = ["  python  ", "  java  ", "  c++  ", "  javascript  "]

# First we clean, then we filter short words
cleaned_long = list(filter(lambda x: len(x) > 3, map(lambda x: x.strip(), words)))
# ["python", "javascript"]
\`\`\`

**Example 3: Comprehensive processing**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# We filter numbers > 5, then multiply by 2
result = list(map(lambda x: x * 2, filter(lambda x: x > 5, numbers)))
# [12, 14, 16, 18, 20]
\`\`\`

**An alternative with list comprehensions:**

In many cases, list comprehensions can be more readable:

\`\`\`python
# Instead of map + filter
numbers = [1, 2, 3, 4, 5]
result = [x ** 2 for x in numbers if x % 2 == 0]

# Equivalent to:
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
\`\`\`

**When to use what:**

- **map() + filter() + lambda** - for a functional style when you want to pass a function as an argument
- **List inclusions** - often more readable for simple operations`
      },
      {
        title: "Lambda with several arguments",
        content: `Lambda functions can take multiple arguments.

**Example with two arguments:**

\`\`\`python
# Adding two numbers
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Multiplication
multiply = lambda x, y: x * y
print(multiply(4, 5))  # 20
\`\`\`

**Example with map() and multiple lists:**

\`\`\`python
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]

# We add the corresponding elements
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# We multiply
products = list(map(lambda x, y: x * y, numbers1, numbers2))
# [10, 40, 90]
\`\`\`

**Example with three arguments:**

\`\`\`python
# Calculating the average of three numbers
average = lambda a, b, c: (a + b + c) / 3
print(average(10, 20, 30))  # 20.0

# Using with map()
a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]
averages = list(map(lambda x, y, z: (x + y + z) / 3, a, b, c))
# [4.0, 5.0, 6.0]
\`\`\`

**Important:** The number of arguments in a lambda must match the number of iterable objects in map().`
      },
      {
        title: "Limitations of lambda functions",
        content: `Lambda functions have limitations that are important to understand:

**1. Only one expression**

A Lambda can contain only one expression, it cannot contain multiple lines:

\`\`\`python
# Incorrect:
complex_func = lambda x: 
    if x > 0:
        return x * 2
    else:
        return x  #  Error!

# Correct - use a regular function:
def complex_func(x):
    if x > 0:
        return x * 2
    else:
        return x
\`\`\`

**2. Assignment cannot be used**

\`\`\`python
# Incorrect:
assign = lambda x: y = x + 1  #  Error!

# Correct:
def assign(x):
    y = x + 1
    return y
\`\`\`

**3. Cannot use return**

\`return\` is not needed in Lambda, the result of the expression is automatically returned:

\`\`\`python
# Incorrect:
square = lambda x: return x ** 2  #  Error!

# Correct:
square = lambda x: x ** 2
\`\`\`

**4. Limited readability for complex operations**

For complex operations, it is better to use regular functions:

\`\`\`python
# Harder to read:
result = list(map(lambda x: x.strip().upper().replace("PYTHON", "JAVA") if len(x) > 5 else x.lower(), texts))

# Better:
def process_text(text):
    if len(text) > 5:
        return text.strip().upper().replace("PYTHON", "JAVA")
    else:
        return text.lower()

result = list(map(process_text, texts))
\`\`\`

**When NOT to use lambda:**

- For complex functions with many lines
- When readability is needed
- For functions that are used many times (it's better to create a regular function)`
      },
      {
        title: "Lambda with other functions",
        content: `Lambda functions are often used with other built-in Python functions.

**1. sorted() - sorting**

\`\`\`python
# Sorting by length
words = ["Python", "is", "great", "for", "programming"]
sorted_words = sorted(words, key=lambda x: len(x))
# ["is", "for", "great", "Python", "programming"]

# Sorting by the second element
pairs = [(1, 3), (2, 1), (3, 2)]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
# [(2, 1), (3, 2), (1, 3)]
\`\`\`

**2. max() and min() - with key**

\`\`\`python
words = ["Python", "is", "great", "for", "programming"]

# The longest word
longest = max(words, key=lambda x: len(x))  # "programming"

# The shortest word
shortest = min(words, key=lambda x: len(x))  # "is"
\`\`\`

**3. Use in object methods**

\`\`\`python
# With list methods
numbers = [1, 2, 3, 4, 5]
# (although it is better to use map for this)

# With higher-order functions (we will study later)
\`\`\`

**Practical example:**

\`\`\`python
# Sorting users by age
users = [
    {"name": "Oleksandr", "age": 20},
    {"name": "Maria", "age": 25},
    {"name": "Ivan", "age": 18}
]

sorted_users = sorted(users, key=lambda user: user["age"])
# [{"name": "Ivan", "age": 18}, {"name": "Oleksandr", "age": 20}, {"name": "Maria", "age": 25}]
\`\`\``
      },
      {
        title: "The bottom line",
        content: `In this lesson, we studied lambda functions and their usage:

**Key Concepts:**

1. **Lambda Functions**
   - Anonymous functions without the keyword \`def\`
   - Syntax: \`lambda arguments: expression\`
   - Can contain only one expression

2. **map()**
   - Applies a function to each element
   - Returns an iterator
   - Convenient for data transformation

3. **filter()**
   - Filters elements based on a condition
   - Keeps only those for which the function returns \`True\`
   - Returns an iterator

4. **Combining**
   - Can combine \`map()\` and \`filter()\`
   - Lambda makes code more compact
   - For complex operations, it's better to use regular functions

5. **Limitations**
   - Only one expression
   - Cannot use assignment
   - Limited readability for complex operations

**When to use:**- For simple operations that are used once
- From \`map()\`, \`filter()\`, \`sorted()\`
- For short data transformations

**When NOT to use:**

- For complex functions with many lines
- When maximum readability is needed
- For functions that are used many times

**Next step:**

In the next lesson, we will learn about variable scope - how Python finds variables in the code.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Basic example of lambda",
      code: `# Regular function
def square(x):
    return x ** 2

# Lambda function
square_lambda = lambda x: x ** 2

# Both work the same
print(square(5))        # 25
print(square_lambda(5))  # 25`,
      explanation: "Demonstrates the basic syntax of lambda functions and their equivalence to regular functions."
    },
    {
      title: "map() with lambda",
      code: `numbers = [1, 2, 3, 4, 5]

# Apply lambda to each element
squared = map(lambda x: x ** 2, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]

# String conversion
names = ["oleksandr", "maria", "ivan"]
capitalized = list(map(lambda name: name.capitalize(), names))
# ["Oleksandr", "Maria", "Ivan"]`,
      explanation: "Shows the use of map() with lambda to apply a function to all elements of a list."
    },
    {
      title: "filter() with lambda",
      code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers
evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]

# Filter words by length
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]`,
      explanation: "Demonstrates the use of filter() with lambda to filter elements based on a condition."
    },
    {
      title: "Combining map() and filter()",
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# First we filter the even numbers, then square them
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
print(even_squared)  # [4, 16, 36, 64, 100]`,
      explanation: "Shows how to combine map() and filter() with lambda for more complex operations."
    },
    {
      title: "Lambda with several arguments",
      code: `# Lambda with two arguments
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Using with map() and multiple lists
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
print(sums)  # [11, 22, 33]`,
      explanation: "Demonstrates lambda functions with multiple arguments and their use with map()."
    },
    {
      title: "Lambda with sorted()",
      code: `# Sorting by length
words = ["Python", "is", "great", "for", "programming"]
sorted_words = sorted(words, key=lambda x: len(x))
# ["is", "for", "great", "Python", "programming"]

# Sorting dictionaries by value
users = [{"name": "Oleksandr", "age": 20}, {"name": "Mariya", "age": 25}]
sorted_users = sorted(users, key=lambda user: user["age"])
# [{"name": "Oleksandr", "age": 20}, {"name": "Mariya", "age": 25}]`,
      explanation: "Shows the use of lambda with the sorted() function to sort by a custom key."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using return in lambda",
      explanation: "Beginners often try to use return in a lambda, but it is not necessary.",
      correctApproach: `# Incorrect:
square = lambda x: return x ** 2  # Error!

# Correct:
square = lambda x: x ** 2 The result of the expression is returned automatically`
    },
    {
      mistake: "Attempt to use multiple lines in a lambda",
      explanation: "A lambda can contain only one expression, not multiple lines.",
      correctApproach: `# Incorrect:
complex_func = lambda x: 
    if x > 0:
        return x * 2
    else:
        return x  #  Error!

# Correct - use a regular function:
def complex_func(x):
    if x > 0:
        return x * 2
    else:
        return x`
    },
    {
      mistake: "Forgetting about list() for map() and filter()",
      explanation: "map() and filter() return iterators, not lists, so you need to use list().",
      correctApproach: `# Incorrect (if a list is needed):
numbers = [1, 2, 3]
squared = map(lambda x: x ** 2, numbers)
print(squared)  # <map object at 0x...> - not a list!

# Correct:
numbers = [1, 2, 3]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9] - list`
    },
    {
      mistake: "Using lambda for complex operations",
      explanation: "It is better to use lambda for simple operations. For complex ones, regular functions are better.",
      correctApproach: `# Harder to read:
result = list(map(lambda x: x.strip().upper().replace("PYTHON", "JAVA") if len(x) > 5 else x.lower(), texts))

# Better:
def process_text(text):
    if len(text) > 5:
        return text.strip().upper().replace("PYTHON", "JAVA")
    else:
        return text.lower()

result = list(map(process_text, texts))  # More readable`
    }
  ],
  
  summary: `In this lesson, we studied lambda functions and their usage:

1. Lambda functions
   - Anonymous functions without \`def\`
   - Syntax: \`lambda arguments: expression\`
   - Can contain only one expression

2. map()
   - Applies a function to each element
   - Returns an iterator (list() is needed for a list)
   - Convenient for data transformation

3. filter()
   - Filters elements based on a condition
   - Keeps only those for which the function returns True
   - Returns an iterator (list() is needed for a list)

4. Combining
   - map() and filter() can be combined
   - Lambda makes the code more compact
   - For complex operations, regular functions are better

5. Limitations
   - Only one expression
   - Cannot use return
   - Limited readability for complex operationsLambda functions are a powerful tool for functional programming in Python!`,
  
  practiceTask: {
    title: "Data processing using lambda, map, and filter",
    description: "Create functions for data processing using lambda, map(), and filter()",
    problemStatement: `Write a program with functions:

1. process_numbers(numbers) - map + lambda: squares
2. filter_even(numbers) - filter + lambda: even
3. process_names(names) - map + lambda: capitalize
4. filter_long_words(words, min_length=5) - words with len >= min_length
5. complex_processing(numbers) - squares of even numbers

Read a line of numbers and a line of names (separated by space), then min_length.
Print squares, evens, squares of evens, formatted names, and long names.

Input format:
1 2 3 4 5 6 7 8 9 10
oleksandr mariya ivan anna
5`,
    outputFormat: `Squares of numbers: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Even numbers: [2, 4, 6, 8, 10]
Squares of even numbers: [4, 16, 36, 64, 100]
Formatted names: ['Oleksandr', 'Maria', 'Ivan', 'Anna']
Long names (min_length=5): ['Oleksandr', 'Maria']`,
    examples: [
      {
        input: `1 2 3 4 5 6 7 8 9 10
Oleksandr Maria Ivan Anna
5`,
        output: `Squares of numbers: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Even numbers: [2, 4, 6, 8, 10]
Squares of even numbers: [4, 16, 36, 64, 100]
Formatted names: ['Oleksandr', 'Maria', 'Ivan', 'Anna']
Long names (min_length=5): ['Oleksandr', 'Maria']`,
        explanation: "Basic set 1..10 and names with min_length=5"
      },
      {
        input: `2 4 5
ian bohdan ava
4`,
        output: `Squares of numbers: [4, 16, 25]
Even numbers: [2, 4]
Squares of even numbers: [4, 16]
Formatted names: ['Ian', 'Bohdan', 'Ava']
Long names (min_length=4): ['Bohdan']`,
        explanation: "Bohdan has a length >= 4"
      },
      {
        input: `3 6 9
cat dog
3`,
        output: `Squares of numbers: [9, 36, 81]
Even numbers: [6]
Squares of even numbers: [36]
Formatted names: ['Cat', 'Dog']
Long names (min_length=3): ['Cat', 'Dog']`,
        explanation: "Both names are 3 letters long"
      }
    ],
    solution: {
      code: `def process_numbers(numbers):
    """Raises all numbers to the square"""
    return list(map(lambda x: x ** 2, numbers))

def filter_even(numbers):
    """Filters even numbers"""
    return list(filter(lambda x: x % 2 == 0, numbers))

def process_names(names):
    """Formats names (first letter capitalized)"""
    return list(map(lambda name: name.capitalize(), names))

def filter_long_words(words, min_length=5):
    """Filters words longer than or equal to min_length"""
    return list(filter(lambda word: len(word) >= min_length, words))

def complex_processing(numbers):
    """Squares of even numbers"""
    return list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))

numbers = list(map(int, input().split()))
names = input().split()
min_length = int(input())

print(f"Squares of numbers: {process_numbers(numbers)}")
print(f"Even numbers: {filter_even(numbers)}")
print(f"Squares of even numbers: {complex_processing(numbers)}")

formatted_names = process_names(names)
print(f"Formatted names: {formatted_names}")
print(f"Long names (min_length={min_length}): {filter_long_words(formatted_names, min_length=min_length)}")`,
      explanation: "lambda with map/filter in functions; data is read from stdin."
    },
    hints: [
      "map() and filter() return iterators - wrap them in list()",
      "Read numbers and names using input().split()",
      "For complex_processing first filter, then map",
      "Pass min_length to filter_long_words"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a lambda function?",
        options: [
          "A one-expression anonymous function (no def)",
          "A normal multi-line function using def",
          "A method that only exists on objects",
          "A separate built-in data type like list"
        ],
        correctAnswer: 0,
        explanation: "lambda makes a small nameless function from one expression. Multi-line logic needs def; lambdas are not methods or a new data type."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the map() function return?",
        options: [
          "Iterator",
          "List",
          "Dictionary",
          "Tuple"
        ],
        correctAnswer: 0,
        explanation: "map() returns an iterator. To get a list, you need to use list(map(...))."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x ** 2, numbers))\nprint(squared)\n```",
        options: [
          "[1, 4, 9, 16, 25]",
          "[1, 2, 3, 4, 5]",
          "Error",
          "<map object>"
        ],
        correctAnswer: 0,
        explanation: "map() applies lambda x: x ** 2 to each element, raising it to the square. list() converts the iterator into a list [1, 4, 9, 16, 25]."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the filter() function do?",
        options: [
          "Keeps items where the test function is True",
          "Sorts the iterable into ascending order",
          "Maps each item to a transformed value",
          "Appends extra items onto the iterable"
        ],
        correctAnswer: 0,
        explanation: "filter() keeps elements for which the callback is True. Sorting is sorted(), transforming is map(), and filter never adds items."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nnumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens)\n```",
        options: [
          "[0, 2, 4, 6, 8, 10]",
          "[1, 3, 5, 7, 9]",
          "Error",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        ],
        correctAnswer: 0,
        explanation: "filter() leaves only even numbers (x % 2 == 0), so the result is [0, 2, 4, 6, 8, 10]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you use return inside a lambda?",
        options: [
          "No — the expression value is returned automatically",
          "Yes — every lambda must include return",
          "Only when the lambda spans multiple lines",
          "Only in Python 3.11 and newer versions"
        ],
        correctAnswer: 0,
        explanation: "A lambda body is one expression whose value is the result. Writing return inside it is a SyntaxError; version and 'complex' lambdas do not change that."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nnumbers = [1, 2, 3, 4, 5, 6]\nresult = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))\nprint(result)\n```",
        options: [
          "[4, 16, 36]",
          "[1, 4, 9, 16, 25, 36]",
          "[2, 4, 6]",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "First, filter() leaves the even numbers [2, 4, 6], then map() squares them [4, 16, 36]."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Lambda functions can contain multiple lines of code.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "No, lambda functions can contain only one expression. For multiple lines, you need to use a regular function with def."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
