/**
 * Lesson 03-9: Higher-order functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_9 = {
  lessonId: "lesson-03-9",
  moduleId: "module-03",
  order: 9,
  title: "Higher-order functions",
  
  learningObjectives: [
    "Understand what higher-order functions are",
    "Deepen knowledge of map() and filter()",
    "Use reduce() to fold data",
    "Combine higher-order functions",
    "Create your own higher-order functions",
    "Apply functional programming style"
  ],
  
  prerequisites: ["lesson-03-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are higher-order functions?",
        content: `Higher-order functions are functions that:
1. Take other functions as arguments
2. Or return functions as a result

**Examples of higher-order functions in Python:**

- \`map()\` - applies a function to each element
- \`filter()\` - filters elements by a condition
- \`reduce()\` - folds a sequence into a single value
- \`sorted()\` - sorts with a key function
- \`max()\`, \`min()\` - with a key function

**Benefits of higher-order functions:**

- More declarative code (we describe "what", not "how")
- Less code
- Easier to read and maintain
- Functional programming style

**Example:**

\`\`\`python
# Without higher-order functions (imperative style)
numbers = [1, 2, 3, 4, 5]
squared = []
for num in numbers:
    squared.append(num ** 2)

# With higher-order functions (functional style)
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
\`\`\``
      },
      {
        title: "map() in detail",
        content: `\`map()\` applies a function to each element of an iterable object.

**Syntax:**

\`\`\`python
map(function, iterable, ...)
\`\`\`

**Examples:**

\`\`\`python
# With lambda
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
# [1, 4, 9, 16, 25]

# With a regular function
def square(x):
    return x ** 2

squared = list(map(square, numbers))
# [1, 4, 9, 16, 25]

# With multiple iterables
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# With methods
texts = ["  hello  ", "  world  ", "  python  "]
cleaned = list(map(str.strip, texts))
# ["hello", "world", "python"]
\`\`\`

**Important:** \`map()\` returns an iterator, so you need \`list()\` to get a list.

**Practical examples:**

\`\`\`python
# Type conversion
strings = ["1", "2", "3", "4", "5"]
numbers = list(map(int, strings))
# [1, 2, 3, 4, 5]

# String processing
names = ["alex", "maria", "ivan"]
capitalized = list(map(str.capitalize, names))
# ["Alex", "Maria", "Ivan"]

# Calculations with multiple lists
prices = [100, 200, 300]
quantities = [2, 3, 4]
totals = list(map(lambda p, q: p * q, prices, quantities))
# [200, 600, 1200]
\`\`\``
      },
      {
        title: "filter() in detail",
        content: `\`filter()\` filters elements, keeping only those for which the function returns \`True\`.

**Syntax:**

\`\`\`python
filter(function, iterable)
\`\`\`

**Examples:**

\`\`\`python
# Filtering even numbers
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [0, 2, 4, 6, 8, 10]

# Filtering by length
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]

# Filtering with a regular function
def is_positive(n):
    return n > 0

numbers = [-5, -2, 0, 3, 7, -1, 10]
positives = list(filter(is_positive, numbers))
# [3, 7, 10]

# Filtering None values
values = [1, None, 2, None, 3, None, 4]
non_none = list(filter(lambda x: x is not None, values))
# [1, 2, 3, 4]

# Or simpler:
non_none = list(filter(None, values))  # filter(None, ...) removes "falsy" values
# [1, 2, 3, 4]
\`\`\`

**Important:** The function must return a boolean value (\`True\` or \`False\`).

**Practical examples:**

\`\`\`python
# Filtering by multiple conditions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = list(filter(lambda x: x % 2 == 0 and x > 5, numbers))
# [6, 8, 10]

# Filtering strings by substring presence
texts = ["Python", "Java", "JavaScript", "C++", "Pythonista"]
python_texts = list(filter(lambda text: "Python" in text, texts))
# ["Python", "Pythonista"]

# Filtering dictionaries
users = [
    {"name": "Alex", "age": 20},
    {"name": "Maria", "age": 25},
    {"name": "Ivan", "age": 18}
]
adults = list(filter(lambda user: user["age"] >= 18, users))
# [{"name": "Alex", "age": 20}, {"name": "Maria", "age": 25}, {"name": "Ivan", "age": 18}]
\`\`\``
      },
      {
        title: "reduce() - folding data",
        content: `\`reduce()\` folds a sequence into a single value by applying a function to elements sequentially.

**Syntax:**

\`\`\`python
from functools import reduce

reduce(function, iterable, initializer)
\`\`\`

**Important:** In Python 3, \`reduce()\` was moved to the \`functools\` module.

**How reduce() works:**

1. Takes the first two elements
2. Applies the function to them
3. Takes the result and the next element
4. Repeats until the end

**Examples:**

\`\`\`python
from functools import reduce

# Sum of numbers
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
# 15 (1+2=3, 3+3=6, 6+4=10, 10+5=15)

# Product of numbers
product = reduce(lambda x, y: x * y, numbers)
# 120 (1*2=2, 2*3=6, 6*4=24, 24*5=120)

# Finding the maximum
max_num = reduce(lambda x, y: x if x > y else y, numbers)
# 5

# Joining strings
words = ["Hello", "world", "Python"]
sentence = reduce(lambda x, y: x + " " + y, words)
# "Hello world Python"
\`\`\`

**With an initial value (initializer):**

\`\`\`python
from functools import reduce

# Sum with an initial value
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers, 10)
# 25 (10+1=11, 11+2=13, 13+3=16, 16+4=20, 20+5=25)

# Product with an initial value
product = reduce(lambda x, y: x * y, numbers, 2)
# 240 (2*1=2, 2*2=4, 4*3=12, 12*4=48, 48*5=240)
\`\`\`

**Practical examples:**

\`\`\`python
from functools import reduce

# Calculating the average (via reduce)
numbers = [10, 20, 30, 40, 50]
total = reduce(lambda x, y: x + y, numbers)
average = total / len(numbers)
# 30.0

# Merging dictionaries
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = reduce(lambda x, y: {**x, **y}, dicts)
# {"a": 1, "b": 2, "c": 3}

# Longest string
words = ["Python", "is", "great", "for", "programming"]
longest = reduce(lambda x, y: x if len(x) > len(y) else y, words)
# "programming"
\`\`\``
      },
      {
        title: "Combining higher-order functions",
        content: `You can combine \`map()\`, \`filter()\`, and \`reduce()\` for complex operations.

**Example 1: Filtering and transforming**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers, then square them
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# [4, 16, 36, 64, 100]
\`\`\`

**Example 2: Transforming and filtering**

\`\`\`python
words = ["  python  ", "  java  ", "  c++  ", "  javascript  "]

# Clean strings, then filter short ones
cleaned_long = list(filter(lambda x: len(x) > 3, map(str.strip, words)))
# ["python", "javascript"]
\`\`\`

**Example 3: Complex processing**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter numbers > 5, square them, then sum
result = reduce(
    lambda x, y: x + y,
    map(lambda x: x ** 2, filter(lambda x: x > 5, numbers))
)
# 36 + 49 + 64 + 81 + 100 = 330
\`\`\`

**Example 4: Processing user data**

\`\`\`python
from functools import reduce

users = [
    {"name": "Alex", "age": 20, "score": 85},
    {"name": "Maria", "age": 25, "score": 92},
    {"name": "Ivan", "age": 18, "score": 78},
    {"name": "Anna", "age": 22, "score": 95}
]

# Filter users with age >= 20, get scores, calculate average
adult_scores = list(map(lambda u: u["score"], filter(lambda u: u["age"] >= 20, users)))
average_score = reduce(lambda x, y: x + y, adult_scores) / len(adult_scores)
# (85 + 92 + 95) / 3 = 90.67
\`\`\`

**Readability:**

For complex operations, it's sometimes better to break them into steps:

\`\`\`python
# Hard to read:
result = reduce(lambda x, y: x + y, map(lambda x: x ** 2, filter(lambda x: x > 5, numbers)))

# Better:
filtered = filter(lambda x: x > 5, numbers)
squared = map(lambda x: x ** 2, filtered)
result = reduce(lambda x, y: x + y, squared)
\`\`\``
      },
      {
        title: "Creating your own higher-order functions",
        content: `You can create your own higher-order functions that take other functions as arguments.

**Example 1: Applying a function multiple times**

\`\`\`python
def apply_times(func, value, times):
    """
    Applies a function to a value multiple times
    """
    result = value
    for _ in range(times):
        result = func(result)
    return result

# Usage
def double(x):
    return x * 2

result = apply_times(double, 3, 4)
# 3 → 6 → 12 → 24 → 48
print(result)  # 48
\`\`\`

**Example 2: Filtering and transforming**

\`\`\`python
def filter_and_map(items, filter_func, map_func):
    """
    Filters elements and applies a transformation function
    """
    filtered = filter(filter_func, items)
    return list(map(map_func, filtered))

# Usage
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = filter_and_map(
    numbers,
    lambda x: x % 2 == 0,  # Filter: even numbers
    lambda x: x ** 2        # Transform: square
)
# [4, 16, 36, 64, 100]
\`\`\`

**Example 3: Function composition**

\`\`\`python
def compose(*functions):
    """
    Creates a composition of functions
    """
    def composed(value):
        result = value
        for func in functions:
            result = func(result)
        return result
    return composed

# Usage
def add_one(x):
    return x + 1

def multiply_two(x):
    return x * 2

def square(x):
    return x ** 2

# Composition: square(multiply_two(add_one(x)))
composed = compose(add_one, multiply_two, square)
result = composed(3)
# 3 → 4 → 8 → 64
print(result)  # 64
\`\`\`

**Example 4: A function that returns a function**

\`\`\`python
def create_multiplier(n):
    """
    Creates a function that multiplies by n
    """
    def multiplier(x):
        return x * n
    return multiplier

# Usage
double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
\`\`\``
      },
      {
        title: "Comparison with imperative style",
        content: `Functional style (with higher-order functions) is often more readable than imperative style (with loops).

**Example 1: Processing numbers**

Imperative style:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = []
for num in numbers:
    if num % 2 == 0:
        result.append(num ** 2)
\`\`\`

Functional style:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
\`\`\`

**Example 2: Processing strings**

Imperative style:
\`\`\`python
words = ["  python  ", "  java  ", "  c++  "]
result = []
for word in words:
    cleaned = word.strip()
    if len(cleaned) > 2:
        result.append(cleaned.upper())
\`\`\`

Functional style:
\`\`\`python
words = ["  python  ", "  java  ", "  c++  "]
result = list(map(str.upper, filter(lambda x: len(x) > 2, map(str.strip, words))))
\`\`\`

**When to use which:**

 **Functional style:**
- Simple transformations and filtering
- When readability matters
- For data processing

 **Imperative style:**
- Complex algorithms with many conditions
- When you need fine-grained control
- For performance optimization

**Best to combine both:**

\`\`\`python
# Complex operations — imperative
def process_data(data):
    result = []
    for item in data:
        if complex_condition(item):
            processed = complex_transformation(item)
            result.append(processed)
    return result

# Simple operations — functional
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned about higher-order functions:

**Key concepts:**

1. **Higher-order functions**
   - Take functions as arguments
   - Or return functions

2. **map()**
   - Applies a function to each element
   - Returns an iterator
   - For transforming data

3. **filter()**
   - Filters elements by a condition
   - Returns an iterator
   - The function must return True/False

4. **reduce()**
   - Folds a sequence into a single value
   - Requires import from functools
   - For aggregating data

5. **Combining**
   - You can combine map, filter, reduce
   - For complex operations
   - Sometimes it's better to break into steps

6. **Custom higher-order functions**
   - You can create functions that take other functions
   - For reusing logic

**Benefits:**

- More declarative code
- Less code
- Easier to read
- Functional style

**Drawbacks:**

- Can be harder to debug
- Sometimes less clear for beginners
- Can be slower for simple operations

**Next step:**

In the next lesson we will reinforce everything we learned about functions in practice by creating different types of functions for real-world tasks.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "map() with lambda",
      code: `numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# With multiple lists
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
print(sums)  # [11, 22, 33]`,
      explanation: "Demonstrates using map() with lambda to transform data."
    },
    {
      title: "filter() with conditions",
      code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [0, 2, 4, 6, 8, 10]

# Filtering by length
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
print(long_words)  # ["Python", "great", "programming"]`,
      explanation: "Shows using filter() to filter elements by different conditions."
    },
    {
      title: "reduce() for aggregation",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120

# With an initial value
total_with_init = reduce(lambda x, y: x + y, numbers, 10)
print(total_with_init)  # 25`,
      explanation: "Demonstrates using reduce() to fold a sequence into a single value."
    },
    {
      title: "Combining map, filter, reduce",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter evens, square them, sum
result = reduce(
    lambda x, y: x + y,
    map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers))
)
print(result)  # 220 (4 + 16 + 36 + 64 + 100)`,
      explanation: "Shows how to combine map(), filter(), and reduce() for complex operations."
    },
    {
      title: "Custom higher-order function",
      code: `def apply_times(func, value, times):
    """
    Applies a function to a value multiple times
    """
    result = value
    for _ in range(times):
        result = func(result)
    return result

def double(x):
    return x * 2

result = apply_times(double, 3, 4)
print(result)  # 48`,
      explanation: "Demonstrates creating a custom higher-order function that takes a function as an argument."
    },
    {
      title: "Function composition",
      code: `def compose(*functions):
    """
    Creates a composition of functions
    """
    def composed(value):
        result = value
        for func in functions:
            result = func(result)
        return result
    return composed

def add_one(x):
    return x + 1

def multiply_two(x):
    return x * 2

composed = compose(add_one, multiply_two)
result = composed(3)  # (3 + 1) * 2 = 8
print(result)`,
      explanation: "Shows creating a composition function for applying functions sequentially."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting list() for map() and filter()",
      explanation: "map() and filter() return iterators, not lists, so you need list().",
      correctApproach: `# Incorrect:
numbers = [1, 2, 3]
squared = map(lambda x: x ** 2, numbers)
print(squared)  # <map object> - not a list!

# Correct:
numbers = [1, 2, 3]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9] - a list`
    },
    {
      mistake: "Forgetting to import reduce",
      explanation: "In Python 3, reduce() must be imported from functools.",
      correctApproach: `# Incorrect:
numbers = [1, 2, 3]
total = reduce(lambda x, y: x + y, numbers)  #  NameError!

# Correct:
from functools import reduce

numbers = [1, 2, 3]
total = reduce(lambda x, y: x + y, numbers)  #  Works`
    },
    {
      mistake: "Function in filter() does not return a boolean",
      explanation: "The function in filter() must return True or False, otherwise the result may be unexpected.",
      correctApproach: `# Incorrect (works, but not obvious):
numbers = [0, 1, 2, 3, 4, 5]
result = list(filter(lambda x: x, numbers))  # Removes 0 (falsy)
# [1, 2, 3, 4, 5]

# Correct (explicit):
numbers = [0, 1, 2, 3, 4, 5]
result = list(filter(lambda x: x > 0, numbers))  # Explicit condition
# [1, 2, 3, 4, 5]`
    },
    {
      mistake: "Complex nested calls are hard to read",
      explanation: "Very complex combinations of map/filter/reduce can be difficult to read.",
      correctApproach: `# Hard to read:
result = reduce(lambda x, y: x + y, map(lambda x: x ** 2, filter(lambda x: x > 5, numbers)))

# Better:
filtered = filter(lambda x: x > 5, numbers)
squared = map(lambda x: x ** 2, filtered)
result = reduce(lambda x, y: x + y, squared)

# Or for simple cases, use list comprehensions:
result = sum(x ** 2 for x in numbers if x > 5)`
    }
  ],
  
  summary: `In this lesson we learned about higher-order functions:

1. What higher-order functions are
   - Take functions as arguments
   - Or return functions

2. map()
   - Applies a function to each element
   - For transforming data
   - Returns an iterator (list() is needed)

3. filter()
   - Filters elements by a condition
   - The function must return True/False
   - Returns an iterator (list() is needed)

4. reduce()
   - Folds a sequence into a single value
   - Requires import from functools
   - For aggregating data

5. Combining
   - You can combine map, filter, reduce
   - For complex operations
   - Sometimes it's better to break into steps

6. Custom higher-order functions
   - You can create functions that take other functions
   - For reusing logic

Higher-order functions make code more declarative and readable!`,
  
  practiceTask: {
    title: "Data processing with higher-order functions",
    description: "Create a program to process data using map(), filter(), and reduce()",
    problemStatement: `Write a program to process user and product data:

1. **process_numbers** - processing numbers
   - Parameters: numbers (list of numbers)
   - Uses map() to square values
   - Uses filter() to filter even numbers
   - Uses reduce() to calculate the sum
   - Returns the result

2. **process_users** - processing user data
   - Parameters: users (list of dictionaries with user data)
   - Uses filter() to filter users with age >= 18
   - Uses map() to get user names
   - Returns a list of adult user names

3. **calculate_statistics** - calculating statistics
   - Parameters: numbers (list of numbers)
   - Uses reduce() to calculate the sum
   - Uses reduce() to calculate the product
   - Uses reduce() to find the maximum
   - Returns a dictionary with statistics

4. **process_texts** - processing texts
   - Parameters: texts (list of strings)
   - Uses map() to clean (strip) and convert to upper case
   - Uses filter() to filter long words (len > 5)
   - Returns processed texts

5. **complex_processing** - complex processing
   - Parameters: data (list of numbers)
   - Combines filter(), map(), and reduce()
   - Filters numbers > 10, squares them, calculates the average
   - Returns the result

**Important:** Do not use the input() function. Enter values directly in the code.

Create usage examples for all functions and print the results.`,
    outputFormat: `Example output:
Sum of squares of even numbers: 220
Adult users: ['Alex', 'Maria']
Statistics: {'sum': 55, 'product': 3628800, 'max': 10}
Processed texts: ['HELLO', 'WORLD', 'PYTHON']
Average of squares of numbers > 10: 169.0`,
    examples: [
      {
        output: `Sum of squares of even numbers: 220
Statistics: {'sum': 55, 'product': 3628800, 'max': 10}
Average of squares of numbers > 10: 0.0`,
        explanation: "Demonstrates number processing: filtering, transforming, and aggregating."
      }
    ],
    solution: {
      code: `# Data processing with higher-order functions

from functools import reduce

def process_numbers(numbers):
    """
    Processes numbers: filters evens, squares them, sums
    """
    filtered = filter(lambda x: x % 2 == 0, numbers)
    squared = map(lambda x: x ** 2, filtered)
    total = reduce(lambda x, y: x + y, squared)
    return total

def process_users(users):
    """
    Processes users: filters adults, returns names
    """
    adults = filter(lambda u: u["age"] >= 18, users)
    names = map(lambda u: u["name"], adults)
    return list(names)

def calculate_statistics(numbers):
    """
    Calculates statistics: sum, product, maximum
    """
    stats = {
        "sum": reduce(lambda x, y: x + y, numbers),
        "product": reduce(lambda x, y: x * y, numbers),
        "max": reduce(lambda x, y: x if x > y else y, numbers)
    }
    return stats

def process_texts(texts):
    """
    Processes texts: cleans and converts to upper case
    """
    cleaned = map(lambda t: t.strip().upper(), texts)
    return list(cleaned)

def complex_processing(data):
    """
    Complex processing: filters > 10, squares, calculates average
    """
    filtered = filter(lambda x: x > 10, data)
    squared = map(lambda x: x ** 2, filtered)
    squared_list = list(squared)
    
    if len(squared_list) == 0:
        return 0
    
    total = reduce(lambda x, y: x + y, squared_list)
    average = total / len(squared_list)
    return average

# Enter values directly in the code (do not use input())

# Example 1: Processing numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result1 = process_numbers(numbers)
print(f"Sum of squares of even numbers: {result1}")

# Example 2: Processing users
users = [
    {"name": "Alex", "age": 20},
    {"name": "Maria", "age": 25},
    {"name": "Ivan", "age": 17}
]
adult_names = process_users(users)
print(f"Adult users: {adult_names}")

# Example 3: Statistics
stats = calculate_statistics(numbers)
print(f"Statistics: {stats}")

# Example 4: Processing texts
texts = ["  hello  ", "  world  ", "  python  "]
processed_texts = process_texts(texts)
print(f"Processed texts: {processed_texts}")

# Example 5: Complex processing
data = [5, 12, 8, 15, 3, 20, 7]
avg = complex_processing(data)
print(f"Average of squares of numbers > 10: {avg}")

# Additional example: combining in one line
numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result2 = reduce(
    lambda x, y: x + y,
    map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers2))
)
print(f"Alternative approach: {result2}")`,
      explanation: "The solution demonstrates using map(), filter(), and reduce() for different types of data processing. Each function shows different aspects of higher-order functions: transformation, filtering, and aggregation."
    },
    hints: [
      "Enter values directly in the code — do not use input()",
      "Don't forget to import reduce from functools: from functools import reduce",
      "map() and filter() return iterators; use list() for lists",
      "reduce() folds a sequence into a single value",
      "For complex processing, use filter() first, then map(), then reduce()",
      "The function in filter() must return True/False",
      "You can combine functions in one line or break into steps for readability",
      "To calculate the average, first get a list, then compute the sum and divide by the count"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "220",
        description: "Checking number processing"
      },
      {
        expectedOutput: "['Alex', 'Maria']",
        description: "Checking user processing"
      },
      {
        expectedOutput: "{'sum': 15",
        description: "Checking statistics calculation"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a higher-order function?",
        options: [
          "A function that takes other functions as arguments or returns functions",
          "A function with high priority",
          "A function that works only with numbers",
          "A built-in Python function"
        ],
        correctAnswer: 0,
        explanation: "A higher-order function is a function that takes other functions as arguments or returns functions as a result. Examples: map(), filter(), reduce()."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does map() return?",
        options: [
          "An iterator",
          "A list",
          "A dictionary",
          "A tuple"
        ],
        correctAnswer: 0,
        explanation: "map() returns an iterator. To get a list, use list(map(...))."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nfrom functools import reduce\n\nnumbers = [1, 2, 3, 4, 5]\nresult = reduce(lambda x, y: x + y, numbers)\nprint(result)\n```",
        options: [
          "15",
          "5",
          "An error",
          "[1, 2, 3, 4, 5]"
        ],
        correctAnswer: 0,
        explanation: "reduce() folds the list: 1+2=3, 3+3=6, 6+4=10, 10+5=15."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where do you need to import reduce() from in Python 3?",
        options: [
          "From the functools module",
          "From the itertools module",
          "From the collections module",
          "reduce() is already available without import"
        ],
        correctAnswer: 0,
        explanation: "In Python 3, reduce() was moved to the functools module, so you need to import it: from functools import reduce."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nnumbers = [1, 2, 3, 4, 5, 6]\nresult = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))\nprint(result)\n```",
        options: [
          "[4, 16, 36]",
          "[1, 4, 9, 16, 25, 36]",
          "[2, 4, 6]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "First filter() keeps even numbers [2, 4, 6], then map() squares them [4, 16, 36]."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What must the function passed to filter() return?",
        options: [
          "True or False",
          "Any value",
          "Only True",
          "Only False"
        ],
        correctAnswer: 0,
        explanation: "The function in filter() must return a boolean value (True or False). Elements for which the function returns True remain in the result."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nfrom functools import reduce\n\nnumbers = [2, 3, 4]\nresult = reduce(lambda x, y: x * y, numbers, 5)\nprint(result)\n```",
        options: [
          "120",
          "24",
          "9",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "reduce() with initial value 5: 5*2=10, 10*3=30, 30*4=120."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can combine map(), filter(), and reduce() for complex operations.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "Yes, you can combine these functions. For example: reduce(..., map(..., filter(...))). But for readability, it's sometimes better to break into steps."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
