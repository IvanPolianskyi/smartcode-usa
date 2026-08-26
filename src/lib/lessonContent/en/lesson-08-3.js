/** 
* Lesson 08-3: The functools module 
* Full educational content*/

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_08_3 = {
  lessonId: "lesson-08-3",
  moduleId: "module-08",
  order: 3,
  title: "The functools module",
  
  learningObjectives: [
    "Use functools to work with functions",
    "Apply partial for partial application",
    "Use reduce to concatenate sequences",
    "Apply lru_cache to cache results"
  ],
  
  prerequisites: ["lesson-08-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to the functools module",
        content: `The \`functools\` module provides functions for working with higher-order functions and functional programming. 

**Main Features:** 

1. **partial** - partial application of the function 
2. **reduce** - convolution of the sequence to one value 
3. **lru_cache** - caching of function results 
4. **wraps** - saving function metadata (for decorators) 

**Module import:** 

\`\`\`python 
from functools import partial, reduce, lru_cache, wraps 
\`\`\``
      },
      {
        title: "partial - partial application",
        content: `\`partial\` allows you to "fix" part of the function's arguments by creating a new function with fewer parameters. 

**Base example:** 

\`\`\`python 
from functools import partial 

def multiply(x, y): 
return x * y 

# We create a new function where x is always 2 
double = partial(multiply, 2) 
print(double(5)) # 10 (2 * 5) 
print(double(7)) # 14 (2 * 7) 
\`\`\` 

**Practical example: Function with many parameters** 

\`\`\`python 
from functools import partial 

def greet(greeting, name, punctuation): 
return f'{greeting}, {name}{punctuation}' 

# We create a function with a fixed greeting 
say_hello = partial(greet, 'Hello', punctuation='!') 
print(say_hello('Alexander')) # Hello, Alexander! 

# We create a function with a fixed name 
greet_alex = partial(greet, name='Alexander', punctuation='!') 
print(greet_alex('Congratulations')) # Greetings, Alexander! 
\`\`\`
**Use with functions that accept functions:** 

\`\`\`python 
from functools import partial 

# Function for filtering 
def is_greater_than(value, threshold): 
return value > threshold 

# We create a function to check "more than 10" 
is_big = partial(is_greater_than, threshold=10) 

numbers = [5, 15, 8, 20, 3, 12] 
big_numbers = list(filter(is_big, numbers)) 
print(big_numbers) # [15, 20, 12] 
\`\`\` 

**Advantages of partial:** 

- **Reusability** - you can create specialized functions 
- **Readability** - the code becomes more declarative 
- **Flexibility** - can be combined with other functions`
      },
      {
        title: "reduce - sequence convolution",
        content: `\`reduce\` collapses a sequence to a single value by applying the function sequentially to the elements. 

**Syntax:** 

\`\`\`python 
from functools import reduce 

reduce(function, sequence, initial_value) 
\`\`\` 

**Basic example: Sum of numbers** 

\`\`\`python 
from functools import reduce 

numbers = [1, 2, 3, 4, 5] 

# Sum of all numbers 
total = reduce(lambda x, y: x + y, numbers) 
print(total) # 15 

# With initial value 
total = reduce(lambda x, y: x + y, numbers, 10) 
print(total) # 25 (10 + 15) 
\`\`\` 

**Example: Product of numbers** 

\`\`\`python 
from functools import reduce 

numbers = [2, 3, 4] 

# Product 
product = reduce(lambda x, y: x * y, numbers) 
print(product) # 24 (2 * 3 * 4) 
\`\`\` 

**Example: Finding the maximum** 

\`\`\`python 
from functools import reduce 

numbers = [3, 7, 2, 9, 1] 

# Maximum 
maximum = reduce(lambda x, y: x if x > y else y, numbers) 
print(maximum) # 9 
\`\`\`
**Example: String Concatenation** 

\`\`\`python 
from functools import reduce 

words = ['Python', 'is', 'great'] 

# Merge with spaces 
sentence = reduce(lambda x, y: x + ' ' + y, words) 
print(sentence) # Python is great 
\`\`\` 

**Practical example: Factorial calculation** 

\`\`\`python 
from functools import reduce 

def factorial(n): 
return reduce(lambda x, y: x * y, range(1, n + 1)) 

print(factorial(5)) # 120 (1 * 2 * 3 * 4 * 5) 
\`\`\` 

**Important:** In Python 3+, reduce has been moved to the functools module. In Python 2, it was a built-in function.`
      },
      {
        title: "lru_cache - caching of results",
        content: `\`lru_cache\` (Least Recently Used cache) - decorator for caching function results. This avoids repeated calculations. 

**Base example:** 

\`\`\`python 
from functools import lru_cache 
import time 

@lru_cache(maxsize=128) 
def slow_function(n): 
time.sleep(0.1) # Simulate heavy computation 
return n * 2 

# The first call is slow 
start = time.time() 
result1 = slow_function(5) 
print(f'Time: {time.time() - start:.2f}s') # ~0.1s 

# Second call with the same argument - fast (from cache) 
start = time.time() 
result2 = slow_function(5) 
print(f'Time: {time.time() - start:.2f}s') # ~0.00s 
\`\`\` 

**lru_cache parameters:** 

- **maxsize** - the maximum number of results in the cache (None = no limits) 
- **typed** - whether to distinguish between different types (True/False) 

\`\`\`python 
from functools import lru_cache 

@lru_cache(maxsize=32) 
def fibonacci(n): 
if n < 2: 
return n
return fibonacci(n-1) + fibonacci(n-2) 

# Without caching it would be very slow! 
print(fibonacci(35)) # Fast thanks to caching 
\`\`\` 

**Checking cache statistics:** 

\`\`\`python 
from functools import lru_cache 

@lru_cache(maxsize=128) 
def cached_function(n): 
return n * 2 

cached_function(5) 
cached_function(10) 

# Cache statistics 
print(cached_function.cache_info()) 
# CacheInfo(hits=0, misses=2, maxsize=128, currsize=2) 
\`\`\` 

**Clean cache:** 

\`\`\`python 
from functools import lru_cache 

@lru_cache(maxsize=128) 
def cached_function(n): 
return n * 2 

cached_function(5) 
cached_function.cache_clear() # Clear the cache 
\`\`\` 

**When to use lru_cache:** 

- Functions with heavy calculations 
- Functions that are called with the same arguments 
- Recursive functions (like fibonacci) 
- Functions that make queries to a database or API`
      },
      {
        title: "wraps - save metadata",
        content: `\`wraps\` - a decorator for saving metadata of the original function when creating decorators. 

**Problem without wraps:** 

\`\`\`python 
def my_decorator(func): 
def wrapper(*args, **kwargs): 
return func(*args, **kwargs) 
return wrapper 

@my_decorator 
def greet(name): 
"""Hello function""" 
return f'Hello, {name}!' 

print(greet.__name__) # wrapper (not greet!) 
print(greet.__doc__) # None (not "Greeting Function"!) 
\`\`\` 

**Solution with wraps:** 

\`\`\`python 
from functools import wraps 

def my_decorator(func): 
@wraps(func) 
def wrapper(*args, **kwargs): 
return func(*args, **kwargs) 
return wrapper 

@my_decorator 
def greet(name): 
"""Hello function""" 
return f'Hello, {name}!' 

print(greet.__name__) # greet 
print(greet.__doc__) # Greeting function 
\`\`\` 

**Practical example: Decorator with logging** 

\`\`\`python
from functools import wraps 

def log_function(func): 
@wraps(func) 
def wrapper(*args, **kwargs): 
print(f'Called by {func.__name__}') 
result = func(*args, **kwargs) 
print(f'{func.__name__} completed') 
return result 
return wrapper 

@log_function 
def calculate(x, y): 
"""Computes the sum of two numbers""" 
return x + y 

print(calculate.__name__) # calculate 
print(calculate.__doc__) # Calculates the sum of two numbers 
\`\`\``
      },
      {
        title: "Combining functools functions",
        content: `You can combine different functions of functools for complex tasks. 

**Example: Cached function with partial** 

\`\`\`python 
from functools import lru_cache, partial 

@lru_cache(maxsize=128) 
def power(base, exponent): 
return base ** exponent 

# We create a function for squares 
square = partial(power, exponent=2) 

print(square(5)) # 25 
print(square(5)) # Quick from the cache! 
\`\`\` 

**Example: reduce with lambda and partial** 

\`\`\`python 
from functools import reduce, partial 

# Function for multiplication 
multiply = lambda x, y: x * y 

# We calculate the factorial 
def factorial(n): 
return reduce(multiply, range(1, n + 1)) 

print(factorial(5)) # 120 
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson, we studied the functools module: 

**Key Features:** 

1. **partial** - partial application of the function 
2. **reduce** - convolution of the sequence to one value 
3. **lru_cache** - caching of function results 
4. **wraps** - save metadata in decorators 

**Advantages:** 

- **Efficiency** - caching and optimization 
- **Flexibility** - partial application 
- **Functional programming** - reduce for convolution 

**When to use:** 

- **partial** - when you need to create a specialized function 
- **reduce** - when you want to collapse the sequence 
- **lru_cache** - when the function is called with the same arguments 
- **wraps** - always in decorators to preserve metadata 

**Next step:** 

In the next lesson, we'll learn how to use JSON to store and share data.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: partial for specialization",
      code: `from functools import partial

def multiply(x, y):
    return x * y

double = partial(multiply, 2)
print(double(5))  # 10`,
      explanation: "We use partial to create a double function that always multiplies by 2."
    },
    {
      title: "Example 2: reduce for sum",
      code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15`,
      explanation: "We use reduce to calculate the sum of all the numbers in the list."
    },
    {
      title: "Example 3: lru_cache for optimization",
      code: `from functools import lru_cache 

@lru_cache(maxsize=128) 
def fibonacci(n): 
if n < 2: 
return n 
return fibonacci(n-1) + fibonacci(n-2) 

print(fibonacci(35)) # Fast thanks to caching`,
      explanation: "We use lru_cache to cache the results of the recursive fibonacci function."
    },
    {
      title: "Example 4: wraps for decorators",
      code: `from functools import wraps 

def my_decorator(func): 
@wraps(func) 
def wrapper(*args, **kwargs): 
return func(*args, **kwargs) 
return wrapper 

@my_decorator 
def greet(name): 
"""Congratulate someone""" 
return f'Hello, {name}!' 

print(greet.__name__) # greet`,
      explanation: "We use wraps to save metadata of the original function in the decorator."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to import reduce from functools",
      explanation: "In Python 3+, reduce is not a built-in function, it must be imported from functools.",
      correctApproach: "Always import: from functools import reduce"
    },
    {
      mistake: "Using lru_cache for functions with unhashed arguments",
      explanation: "lru_cache only works with hashed arguments (numbers, strings, tuples).",
      correctApproach: "Do not use lru_cache for functions that take lists or dictionaries as arguments."
    },
    {
      mistake: "Forget to use wraps in decorators",
      explanation: "Without wraps, the decorator loses the metadata of the original function (name, docstring).",
      correctApproach: "Always use @wraps(func) in decorators."
    }
  ],
  
  summary: `In this lesson, we studied the functools module: 

1. partial - partial application of the function 
2. reduce - sequence convolution 
3. lru_cache - caching of results 
4. wraps - preservation of metadata 

functools helps you write more efficient and functional code!`,
  
  practiceTask: {
    title: "Creating a cached calculator",
    description: "Use lru_cache and partial to create an efficient calculator",
    problemStatement: `Create a calculation system: 
1. Power(base, exponent) function from @lru_cache 
2. square and cube through partial 
3. Read n and calculate the squares and cubes of the numbers from 1 to n 
4. Display cache statistics 

Input format: 
3`,
    outputFormat: `Squares: [1, 4, 9] 
Cubes: [1, 8, 27] 
Cache statistics: CacheInfo(hits=0, misses=6, maxsize=128, currsize=6)`,
    examples: [
      {
        input: `3`,
        output: `Squares: [1, 4, 9] 
Cubes: [1, 8, 27] 
Cache statistics: CacheInfo(hits=0, misses=6, maxsize=128, currsize=6)`,
        explanation: "6 unique power challenges (3 squares + 3 cubes)"
      },
      {
        input: `1`,
        output: `Squares: [1] 
Cubes: [1] 
Cache statistics: CacheInfo(hits=0, misses=2, maxsize=128, currsize=2)`,
        explanation: "Two challenges: 1² and 1³"
      },
      {
        input: `5`,
        output: `Squares: [1, 4, 9, 16, 25] 
Cubes: [1, 8, 27, 64, 125] 
Cache statistics: CacheInfo(hits=0, misses=10, maxsize=128, currsize=10)`,
        explanation: "10 unique challenges for n=5"
      }
    ],
    solution: {
      code: `from functools import lru_cache, partial

@lru_cache(maxsize=128)
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

n = int(input())
numbers = list(range(1, n + 1))
squares = [square(x) for x in numbers]
cubes = [cube(x) for x in numbers]

print(f'Squares: {squares}')
print(f'Cubes: {cubes}')
info = power.cache_info()
print(f'Cache statistics: CacheInfo(hits={info.hits}, misses={info.misses}, maxsize={info.maxsize}, currsize={info.currsize})')`,
      explanation: "lru_cache + partial; n from stdin; We output cache_info explicitly for a stable format."
    },
    hints: [
      "Read n = int(input())",
      "@lru_cache on power",
      "square = partial(power, exponent=2)",
      "Output cache_info() after calculations"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does partial do?",
        options: [
          "Partially applies a function, capturing part of the arguments",
          "Caches function results",
          "Collapses the sequence",
          "Stores metadata"
        ],
        correctAnswer: 0,
        explanation: "partial allows you to capture part of a function's arguments by creating a new function."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does reduce do?",
        options: [
          "Collapses a sequence to a single value",
          "Caches the results",
          "Partially applies a function",
          "Filters items"
        ],
        correctAnswer: 0,
        explanation: "reduce collapses a sequence by applying the function sequentially to the elements."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Why do you need wraps in decorators?",
        options: [
          "For caching",
          "To preserve the metadata of the original function",
          "For partial use",
          "For folding"
        ],
        correctAnswer: 1,
        explanation: "wraps stores the metadata (name, docstring) of the original function in the decorator."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does LRU mean in lru_cache?",
        options: [
          "Least Recently Used",
          "Last Recorded Update",
          "Least Required Usage",
          "Last Recent Update"
        ],
        correctAnswer: 0,
        explanation: "LRU stands for Least Recently Used."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "In Python 3+, reduce is a built-in function.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. In Python 3+, reduce has been moved to the functools module, must be imported."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
