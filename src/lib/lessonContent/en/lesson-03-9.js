/**
 * Lesson 03-9: Higher-order functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_03_9 = {
  lessonId: "lesson-03-9",
  moduleId: "module-03",
  order: 9,
  title: "Higher-order functions",
  
  learningObjectives: [
    "Understand what higher-order functions are",
    "Deepen knowledge about map(), filter()",
    "Use reduce() to fold data",
    "Combine higher-order functions",
    "Creating your own higher-order functions",
    "Apply a functional programming style"
  ],
  
  prerequisites: ["lesson-03-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are higher-order functions?",
        content: `Higher-Order Functions are functions that:
1. Take other functions as arguments
2. Or return functions as a result

**Examples of higher-order functions in Python:**

- \`map()\` - applies a function to each element
- \`filter()\` - filters elements by a condition
- \`reduce()\` - reduces a sequence to a single value
- \`sorted()\` - sorts with a key function
- \`max()\`, \`min()\` - with a key function

**Advantages of higher-order functions:**

- More declarative code (describing "what" rather than "how")
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
        title: "map() - more details",
        content: `\`map()\` applies a function to each element of an iterable object.

**Syntax:**

\`\`\`python
map(function, iterable, ...)
\`\`\`

**Examples:**

\`\`\`python
# From lambda
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
# [1, 4, 9, 16, 25]

# With a regular function
def square(x):
    return x ** 2

squared = list(map(square, numbers))
# [1, 4, 9, 16, 25]

# With several iterable objects
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

# With methods
texts = ["  Hello  ", "  world  ", "  python  "]
cleaned = list(map(str.strip, texts))
# ["Hello", "world", "python"]
\`\`\`

**Important:** <IC0><> returns an iterator, so you need <> to get the list<IC1>.

**Practical examples:**

\`\`\`python
# Type Conversion
strings = ["1", "2", "3", "4", "5"]
numbers = list(map(int, strings))
# [1, 2, 3, 4, 5]

# String processing
names = ["Oleksandr", "Maria", "Ivan"]
capitalized = list(map(str.capitalize, names))
# ["Oleksandr", "Maria", "Ivan"]

# Calculations with multiple lists
prices = [100, 200, 300]
quantities = [2, 3, 4]
totals = list(map(lambda p, q: p * q, prices, quantities))
# [200, 600, 1200]
\`\`\``
      },
      {
        title: "filter() - more details",
        content: `\`filter()\` filters elements, leaving only those for which the function returns \`True\`.

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

# Filtering with normal function
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

# Dictionary filtering
users = [
    {"name": "Oleksandr", "age": 20},
    {"name": "Maria", "age": 25},
    {"name": "Ivan", "age": 18}
]
adults = list(filter(lambda user: user["age"] >= 18, users))
# [{"name": "Oleksandr", "age": 20}, {"name": "Maria", "age": 25}, {"name": "Ivan", "age": 18}]
\`\`\``
      },
      {
        title: "reduce() - data convolution",
        content: `\`reduce()\` folds a sequence into a single value by applying a function to the elements sequentially.

**Syntax:**

\`\`\`python
from functools import reduce

reduce(function, iterable, initializer)
\`\`\`

**Important:** In Python 3, \`reduce()\` has been moved to the \`functools\` module.

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

# Maximum search
max_num = reduce(lambda x, y: x if x > y else y, numbers)
# 5

# Concatenation of strings
words = ["Hello", "world", "Python"]
sentence = reduce(lambda x, y: x + " " + y, words)
# "Hello world Python"
\`\`\`

**With an initial value (initializer):**

\`\`\`python
from functools import reduce

# Sum with initial value
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

# Calculating the average (using reduce)
numbers = [10, 20, 30, 40, 50]
total = reduce(lambda x, y: x + y, numbers)
average = total / len(numbers)
# 30.0

# Dictionary merging
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = reduce(lambda x, y: {**x, **y}, dicts)
# {"a": 1, "b": 2, "c": 3}

# The longest line
words = ["Python", "is", "great", "for", "programming"]
longest = reduce(lambda x, y: x if len(x) > len(y) else y, words)
# "programming"
\`\`\``
      },
      {
        title: "Combining higher-order functions",
        content: `You can combine \`map()\`, \`filter()\`, and \`reduce()\` for complex operations.

**Example 1: Filtering and transformation**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# We filter even numbers, then raise them to the square
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# [4, 16, 36, 64, 100]
\`\`\`

**Example 2: Transformation and Filtering**

\`\`\`python
words = ["  python  ", "  java  ", "  c++  ", "  javascript  "]

# We clean the lines, then filter the short ones
cleaned_long = list(filter(lambda x: len(x) > 3, map(str.strip, words)))
# ["python", "javascript"]
\`\`\`

**Example 3: Comprehensive processing**

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# We filter numbers > 5, square them, then sum them
result = reduce(
    lambda x, y: x + y,
    map(lambda x: x ** 2, filter(lambda x: x > 5, numbers))
)
# 36 + 49 + 64 + 81 + 100 = 330
\`\`\`

**Example 4: User Data Processing**

\`\`\`python
from functools import reduce

users = [
    {"name": "Oleksandr", "age": 20, "score": 85},
    {"name": "Maria", "age": 25, "score": 92},
    {"name": "Ivan", "age": 18, "score": 78},
    {"name": "Anna", "age": 22, "score": 95}
]

# We filter users with age >= 20, take the ratings, calculate the average
adult_scores = list(map(lambda u: u["score"], filter(lambda u: u["age"] >= 20, users)))
average_score = reduce(lambda x, y: x + y, adult_scores) / len(adult_scores)
# (85 + 92 + 95) / 3 = 90.67
\`\`\`

**Readability:**

For complex operations, it is sometimes better to break it down into steps:

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

**Example 2: Filtering and Transformation**

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
    lambda x: x ** 2        # Transformation: square
)
# [4, 16, 36, 64, 100]
\`\`\`

**Example 3: Composition of Functions**

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
        title: "Comparison with the imperative style",
        content: `Functional style (with higher-order functions) is often more readable than imperative (with loops).

**Example 1: Number processing**

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

**Example 2: String Processing**

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
- Simple transformations and filters
- When readability is important
- For data processing

**Imperative style:**
- Complex algorithms with many conditions
- When detailed control is needed
- For performance optimization

**Better to combine:**

\`\`\`python
# Complex operations - imperative
def process_data(data):
    result = []
    for item in data:
        if complex_condition(item):
            processed = complex_transformation(item)
            result.append(processed)
    return result

# Simple operations - functionally
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
\`\`\``
      },
      {
        title: "The bottom line",
        content: `In this lesson, we studied higher-order functions:

**Key concepts:**

1. **Higher-order functions**
   - Accept functions as arguments
   - Or return functions

2. **map()**
   - Applies a function to each element
   - Returns an iterator
   - For data transformation

3. **filter()**
   - Filters elements based on a condition
   - Returns an iterator
   - The function must return True/False

4. **reduce()**
   - Reduces a sequence to a single value
   - Requires import from functools
   - For data aggregation

5. **Combining**
   - You can combine map, filter, reduce
   - For complex operations
   - Sometimes it is better to break into steps

6. **Custom higher-order functions**
   - You can create functions that accept other functions
   - For reusing logic

**Advantages:**- More declarative code
- Less code
- Easier to read
- Functional style

**Disadvantages:**

- Can be harder to debug
- Sometimes less clear for beginners
- Can be slower for simple operations

**Next step:**

In the next lesson, we will consolidate all knowledge about functions in practice by creating different types of functions for real tasks.`
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
      explanation: "Demonstrates the use of map() with lambda to transform data."
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
      explanation: "Shows the use of filter() to filter elements based on different conditions."
    },
    {
      title: "reduce() for aggregation",
      code: `from funktools import redus

nambers = [1, 2, 3, 4, 5]
Total = redus(lambda ks, j: ks + j, nambers)
Print(Total) # 15

Product = Reduce(lambda ks, j: ks*j, numbers)
Print(product) # 120

# With initial value
total_with_init = redus(lambda ks, j: ks + j, nambers, 10)
print(total_with_init) # 25`,
      explanation: "Demonstrates the use of reduce() to fold a sequence into a single value."
    },
    {
      title: "Combining map, filter, reduce",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers, square them, sum them up
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
    Applies a function to a value several times
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
      title: "Composition of functions",
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
      explanation: "Shows the creation of a composition function to apply functions consistently."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting about list() for map() and filter()",
      explanation: "map() and filter() return iterators, not lists, so you need list().",
      correctApproach: `# Incorrect:
numbers = [1, 2, 3]
squared = map(lambda x: x ** 2, numbers)
print(squared)  # <map object> - not a list!

# Correct:
numbers = [1, 2, 3]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9] - list`
    },
    {
      mistake: "Forgetting to import reduce",
      explanation: "In Python 3, reduce() needs to be imported from functools.",
      correctApproach: `# Incorrect:
numbers = [1, 2, 3]
total = reduce(lambda x, y: x + y, numbers)  #  NameError!

# Correct:
from functools import reduce

numbers = [1, 2, 3]
total = reduce(lambda x, y: x + y, numbers)  #  Works`
    },
    {
      mistake: "The function in filter() does not return a boolean value",
      explanation: "The function in filter() must return True or False, otherwise the result may be unexpected.",
      correctApproach: `# Incorrect (works, but not obvious):
numbers = [0, 1, 2, 3, 4, 5]
result = list(filter(lambda x: x, numbers)) # Removes 0 (falsy)
# [1, 2, 3, 4, 5]

# Correct (explicitly):
numbers = [0, 1, 2, 3, 4, 5]
result = list(filter(lambda x: x > 0, numbers)) # Explicit condition
# [1, 2, 3, 4, 5]`
    },
    {
      mistake: "Complex nested calls are hard to read",
      explanation: "Very complex combinations of map/filter/reduce can be hard to read.",
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
  
  summary: `In this lesson, we studied higher-order functions:

1. What higher-order functions are
   - They take functions as arguments
   - Or return functions

2. map()
   - Applies a function to each element
   - For data transformation
   - Returns an iterator (requires list())

3. filter()
   - Filters elements based on a condition
   - The function must return True/False
   - Returns an iterator (requires list())

4. reduce()
   - Reduces a sequence to a single value
   - Requires import from functools
   - For data aggregation

5. Combining
   - You can combine map, filter, reduce
   - For complex operations
   - Sometimes it is better to break into steps

6. Custom higher-order functions
   - You can create functions that take other functions
   - For reusing logicHigher-order functions make code more declarative and readable!`,
  
  practiceTask: {
    title: "Data processing with higher-order functions",
    description: "Create a data processing program using map(), filter(), and reduce()",
    problemStatement: `Write a program with functions (from functools import reduce):

1. process_numbers(numbers) - sum of squares of even numbers
2. process_users(users) - names of users with age >= 18
3. calculate_statistics(numbers) - dictionary sum, product, max using reduce
4. process_texts(texts) - strip().upper()
5. complex_processing(data) - average of squares of numbers > 10

Read: a line of numbers; k users (name and age per line); m texts; a line of data for complex.

Input format:
1 2 3 4 5 6 7 8 9 10
3
Oleksandr 20
Maria 25
Ivan 17
3
  hello  
  world  
  python  
5 12 8 15 3 20 7`,
    outputFormat: `Sum of squares of even numbers: 220
Adult users: ['Oleksandr', 'Maria']
Statistics: {'sum': 55, 'product': 3628800, 'max': 10}
Processed texts: ['HELLO', 'WORLD', 'PYTHON']
Average of squares of numbers > 10: 256.3333333333333`,
    examples: [
      {
        input: `1 2 3 4 5 6 7 8 9 10
3
Oleksandr 20
Maria 25
Ivan 17
3
  hello  
  world  
  python  
5 12 8 15 3 20 7`,
        output: `Sum of squares of even numbers: 220
Adult users: ['Oleksandr', 'Maria']
Statistics: {'sum': 55, 'product': 3628800, 'max': 10}
Processed texts: ['HELLO', 'WORLD', 'PYTHON']
Average of squares of numbers > 10: 256.3333333333333`,
        explanation: "Even squares 4+16+...+100=220; average (144+225+400)/3"
      },
      {
        input: `2 3 4
2
Anna 18
Bogdan 16
2
 hi 
 bye 
11 12`,
        output: `Sum of squares of even numbers: 20
Adult users: ['Anna']
Statistics: {'sum': 9, 'product': 24, 'max': 4}
Processed texts: ['HI', 'BYE']
Average of squares of numbers > 10: 132.5`,
        explanation: "2^2+4^2=20; (121+144)/2=132.5"
      },
      {
        input: `1 1 1
1
Olya 30
1
test
20`,
        output: `Sum of squares of even numbers: 0
Adult users: ['Olya']
Statistics: {'sum': 3, 'product': 1, 'max': 1}
Processed texts: ['TEST']
Average of squares of numbers > 10: 400.0`,
        explanation: "No pairs - reduce on empty requires caution; use 0 if there are no pairs"
      }
    ],
    solution: {
      code: `from functools import reduce

def process_numbers(numbers):
    """Sum of squares of even numbers"""
    filtered = list(filter(lambda x: x % 2 == 0, numbers))
    if not filtered:
        return 0
    return reduce(lambda x, y: x + y, map(lambda x: x ** 2, filtered))

def process_users(users):
    """Names of adult users"""
    adults = filter(lambda u: u["age"] >= 18, users)
    return list(map(lambda u: u["name"], adults))

def calculate_statistics(numbers):
    """Statistics using reduce"""
    return {
        "sum": reduce(lambda x, y: x + y, numbers),
        "product": reduce(lambda x, y: x * y, numbers),
        "max": reduce(lambda x, y: x if x > y else y, numbers)
    }

def process_texts(texts):
    """strip and upper"""
    return list(map(lambda t: t.strip().upper(), texts))

def complex_processing(data):
    """Average of squares of numbers > 10"""
    squared_list = list(map(lambda x: x ** 2, filter(lambda x: x > 10, data)))
    if not squared_list:
        return 0
    total = reduce(lambda x, y: x + y, squared_list)
    return total / len(squared_list)

numbers = list(map(int, input().split()))
k = int(input())
users = []
for _ in range(k):
    parts = input().split()
    users.append({"name": parts[0], "age": int(parts[1])})
m = int(input())
texts = [input() for _ in range(m)]
data = list(map(int, input().split()))

print(f"Sum of squares of even numbers: {process_numbers(numbers)}")
print(f"Adult users: {process_users(users)}")
print(f"Statistics: {calculate_statistics(numbers)}")
print(f"Processed texts: {process_texts(texts)}")
print(f"Average of squares of numbers > 10: {complex_processing(data)}")`,
      explanation: "map/filter/reduce for processing; all data from stdin. An empty filter gives 0."
    },
    hints: [
      "Import reduce from functools",
      "If the list is empty after filtering - return 0",
      "Read users in a loop: name and age",
      "For the average, first list(), then sum/length"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a higher-order function?",
        options: [
          "A function that takes or returns other functions",
          "A function marked high priority by the OS",
          "A function that may only accept number inputs",
          "Any function that ships built into Python"
        ],
        correctAnswer: 0,
        explanation: "Higher-order means functions as inputs or outputs (map, filter, reduce). Priority, 'numbers only', or 'built-in' alone do not define it."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "You write map(str, [1, 2, 3]) and print the result. What do you see without list()?",
        options: [
          "A map iterator object, not a finished list",
          "The list ['1', '2', '3'] printed immediately",
          "A dictionary of index-to-value pairs",
          "A tuple ('1', '2', '3') of strings"
        ],
        correctAnswer: 0,
        explanation: "map returns a lazy iterator. You must wrap list(...) (or iterate) to materialize ['1','2','3']; it is not already a list, dict, or tuple."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nfrom functools import reduce\n\nnumbers = [1, 2, 3, 4, 5]\nresult = reduce(lambda x, y: x + y, numbers)\nprint(result)\n```",
        options: [
          "15",
          "5",
          "Error",
          "[1, 2, 3, 4, 5]"
        ],
        correctAnswer: 0,
        explanation: "reduce() collapses the list: 1+2=3, 3+3=6, 6+4=10, 10+5=15."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should reduce() be imported from in Python 3?",
        options: [
          "From the functools module",
          "From the itertools module",
          "From the collections module",
          "reduce() is already available without import"
        ],
        correctAnswer: 0,
        explanation: "In Python 3, reduce() has been moved to the functools module, so you need to import it: from functools import reduce."
      },
      {
        id: "q5",
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
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should the function passed to filter() return?",
        options: [
          "True or False",
          "Any value",
          "Only True",
          "Only False"
        ],
        correctAnswer: 0,
        explanation: "The function in filter() should return a boolean value (True or False). Elements for which the function returns True are kept in the result."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nfrom functools import reduce\n\nnumbers = [2, 3, 4]\nresult = reduce(lambda x, y: x * y, numbers, 5)\nprint(result)\n```",
        options: [
          "120",
          "24",
          "9",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "reduce() with an initial value of 5: 5*2=10, 10*3=30, 30*4=120."
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
        explanation: "Yes, you can combine these functions. For example: reduce(..., map(..., filter(...))). But for readability, sometimes it is better to break it into steps."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
