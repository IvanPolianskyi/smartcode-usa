/**
 * Lesson 07-2: Generator expressions and yield
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_07_2 = {
  lessonId: "lesson-07-2",
  moduleId: "module-07",
  order: 2,
  title: "Generating expressions and yield",
  
  learningObjectives: [
    "Create generator expressions",
    "Use yield from to delegate generators",
    "Work with infinite generators",
    "Optimize code using generators"
  ],
  
  prerequisites: ["lesson-07-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Generating expressions",
        content: `Generator expressions are a compact way of creating generators, similar to list comprehensions, but with parentheses instead of square brackets.

**Syntax:**

\`\`\`python
# List comprehension (creates a list)
[expression for element in sequence]

# Generator expression (creates a generator)
(expression for element in sequence)
\`\`\`

**Comparison:**

\`\`\`python
# List comprehension - creates the entire list
squares_list = [x**2 for x in range(10)]
print(squares_list) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression - creates a generator
squares_gen = (x**2 for x in range(10))
print(squares_gen) # <generator object <genexpr> at 0x...>
print(list(squares_gen)) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

**Advantages of generator expressions:**

1. **Compactness** - shorter syntax
2. **Save memory** - does not create a list
3. **Lazy evaluation** - values are generated only when needed

**When to use:**

- When a disposable generator is needed
- When you don't need to store all values
- For passing to functions that work with iterators`
      },
      {
        title: "Examples of generator expressions",
        content: `**Example 1: Squares of numbers**

\`\`\`python
# Generating an expression
squares = (x**2 for x in range(10))

# Usage
for square in squares:
    print(square)
# Outputs: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81
\`\`\`

**Example 2: Filtering with a condition**

\`\`\`python
# Even numbers
evens = (x for x in range(20) if x % 2 == 0)

for num in evens:
    print(num)
# Outputs: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
\`\`\`

**Example 3: Data transformation**

\`\`\`python
# Convert strings to upper case
words = ['hello', 'world', 'python']
upper_words = (word.upper() for word in words)

for word in upper_words:
    print(word)
# Outputs: HELLO, WORLD, PYTHON
\`\`\`

**Example 4: Nested generator expressions**

\`\`\`python
# Product of pairs of numbers
products = (x * y for x in range(3) for y in range(3))

for product in products:
    print(product)
# Outputs: 0, 0, 0, 0, 1, 2, 0, 2, 4
\`\`\`

**Example 5: Using with Functions**

\`\`\`python
# Generate expression as an argument
total = sum(x**2 for x in range(10))
print(total) # 285

# Maximum value
max_value = max(x * 2 for x in range(10))
print(max_value) # 18
\`\`\``
      },
      {
        title: "yield from - delegation of generators",
        content: `\\\`yield from\\\` allows you to delegate the generation of values ​​to another generator. This is useful for composing generators.

**Syntax:**

\`\`\`python
def generator1():
    yield from generator2() # Delegates generation to generator2
\`\`\`

**Example 1: Simple delegation**

\`\`\`python
def numbers():
    yield 1
    yield 2
    yield 3

def more_numbers():
    yield 4
    yield 5

def all_numbers():
    yield from numbers() # Generates 1, 2, 3
    yield from more_numbers() # Generates 4, 5

for num in all_numbers():
    print(num)
# Outputs: 1, 2, 3, 4, 5
\`\`\`

**Example 2: Delegation with range()**

\`\`\`python
def count_to_ten():
    yield from range(1, 6) # 1, 2, 3, 4, 5
    yield from range(6, 11) # 6, 7, 8, 9, 10

for num in count_to_ten():
    print(num)
# Outputs: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
\`\`\`

**Example 3: Composition of several generators**

\`\`\`python
def first_half():
    yield from range(1, 6)

def second_half():
    yield from range(6, 11)

def full_range():
    yield from first_half()
    yield from second_half()

for num in full_range():
    print(num)
# Outputs: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
\`\`\`

**Advantages yield from:**

1. **Readability** - the code becomes cleaner
2. **Composition** - easy to combine generators
3. **Delegation** - transfer of control to another generator
4. **Optimization** - more efficient than manually calling next()`
      },
      {
        title: "Infinite generators",
        content: `Generators can generate values ​​infinitely! This is one of their most powerful capabilities.

**Example 1: An infinite counter**

\`\`\`python
def infinite_counter(start=0):
    """Generates numbers from start to infinity"""
    while True:
        yield start
        start += 1

# Usage (with restrictions!)
counter = infinite_counter()
for i, num in enumerate(counter):
    if i >= 10: # Limit to 10 values
        break
    print(num)
# Outputs: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
\`\`\`

**Example 2: Infinite Fibonacci Numbers**

\`\`\`python
def infinite_fibonacci():
    """Generates Fibonacci numbers infinitely"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Usage
fib = infinite_fibonacci()
for i in range(10):
    print(next(fib))
# Outputs: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Example 3: Infinite powers of two**

\`\`\`python
def powers_of_two():
    """Generates powers of two infinitely"""
    power = 1
    while True:
        yield power
        power *= 2

# Usage
powers = powers_of_two()
for i in range(8):
    print(next(powers))
# Outputs: 1, 2, 4, 8, 16, 32, 64, 128
\`\`\`

**Important:** Always limit infinite generators or the program will freeze!`
      },
      {
        title: "Optimization with generators",
        content: `Generators allow you to optimize the code, especially when working with large amounts of data.

**Example 1: Processing a large file**

\`\`\`python
# No generator (loads the entire file into memory)
def read_file_all(filename):
    with open(filename, 'r') as f:
        return f.readlines() # Loads all lines

# With a generator (processes one line at a time)
def read_file_lines(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip() # Generates one line at a time

# Usage
for line in read_file_lines('large_file.txt'):
    process(line) # We process one line at a time
\`\`\`

**Example 2: Filtering and Transforming**

\`\`\`python
# No generator (creates intermediate lists)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squared = [x**2 for x in numbers]
filtered = [x for x in squared if x % 2 == 0]
result = sum(filtered)

# With generator (no intermediate lists)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = sum(x**2 for x in numbers if (x**2) % 2 == 0)
\`\`\`

**Example 3: Data processing pipeline**

\`\`\`python
def read_numbers():
    """Generates numbers"""
    for i in range(100):
        yield i

def square(numbers):
    """Squaring"""
    for number in numbers:
        yield number ** 2

def filter_even(numbers):
    """Filters couples"""
    for number in numbers:
        if num % 2 == 0:
            yield num

# Composition of generators
pipeline = filter_even(square(read_numbers()))
for num in pipeline:
    print(num)
\`\`\`

**Advantages:**

1. **Save memory** - does not create intermediate lists
2. **Speed** - processing one element at a time
3. **Flexibility** - easy to combine operations`
      },
      {
        title: "Practical advice",
        content: `**When to use generator expressions:**

 For single use
 As function arguments (sum, max, min)
 For large amounts of data
 When access to all values is not required

**When to use generator functions:**

 For more complex logic
 When you need to use several times
 For recursive generators
 When documentation is required

**When to use yield from:**

 For the composition of generators
 For generation delegation
 To simplify the code

**Avoid:**

 Converting generators to lists is unnecessary
 Using generators multiple times (create new ones)
 Infinite generators with no limits
 Complex generator expressions (better function)`
      },
      {
        title: "Result",
        content: `In this lesson, we studied the advanced capabilities of generators:

**Key Concepts:**

1. **Generator expressions** - a compact syntax for creating generators
2. **yield from** - delegation of generation to another generator
3. **Infinite generators** - generators without end (with limits!)
4. **Optimization** - use of generators to save memory

**Syntax:**

\`\`\`python
# Generating an expression
gen = (x**2 for x in range(10))

# yield from
def generator():
    yield from other_generator()
\`\`\`

**Next step:**

In the next lesson, we will learn about iterators and the iteration protocol in Python.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Generating expression",
      code: `# Generator expression for squares
squares = (x**2 for x in range(10))

# Usage
for square in squares:
    print(square)
# Outputs: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81`,
      explanation: "A compact way to create a number square generator."
    },
    {
      title: "Generating an expression with a condition",
      code: `# Even numbers
evens = (x for x in range(20) if x % 2 == 0)

for num in evens:
    print(num)
# Outputs: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18`,
      explanation: "A generator expression with a condition for filtering values."
    },
    {
      title: "yield from",
      code: `def first_numbers():
    yield from range(1, 6)

def last_numbers():
    yield from range(6, 11)

def all_numbers():
    yield from first_numbers()
    yield from last_numbers()

for num in all_numbers():
    print(num)
# Outputs: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,
      explanation: "Demonstrates the use of yield from for composing generators."
    },
    {
      title: "Infinite generator",
      code: `def infinite_counter(start=0):
    while True:
        yield start
        start += 1

# Use with restrictions
counter = infinite_counter()
for i in range(10):
    print(next(counter))
# Outputs: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`,
      explanation: "An infinite generator that generates numbers without end. It is important to limit its use."
    },
    {
      title: "Generating an expression as an argument",
      code: `# Using a generator expression as an argument
total = sum(x**2 for x in range(10))
print(total) # 285

max_value = max(x * 2 for x in range(10))
print(max_value) # 18`,
      explanation: "Generator expressions can be used directly as function arguments."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusion between generator expressions and list comprehensions",
      explanation: "Round brackets create a generator, square brackets create a list.",
      correctApproach: `# Generator (round brackets)
gen = (x**2 for x in range(10))

# List (square brackets)
lst = [x**2 for x in range(10)]`
    },
    {
      mistake: "Attempting to use an infinite generator with no limit",
      explanation: "Infinite generators can freeze the program if not limited.",
      correctApproach: `# Incorrect:
def infinite():
    while True:
        yield 1

for num in infinite(): # Hang!
    print(num)

# Correct:
for i, num in enumerate(infinite()):
    if i >= 10:
        break
    print(num)`
    },
    {
      mistake: "Using yield from with non-iterable objects",
      explanation: "yield from works only with iterable objects.",
      correctApproach: `# Incorrect:
def gen():
    yield from 5 # Error! 5 is not iterable

# Correct:
def gen():
    yield from range(5) # range() is iterable`
    },
    {
      mistake: "Converting a generator expression to a list is unnecessary",
      explanation: "If you don't need access to all the values, it's better to leave the generator.",
      correctApproach: `# False (if no list is needed):
gen = (x**2 for x in range(1000000))
lst = list(gen) # We lose the advantages of the generator

# Correct:
gen = (x**2 for x in range(1000000))
for square in gen: # We process one at a time
    process(square)`
    }
  ],
  
  summary: `In this lesson, we studied the advanced capabilities of generators:

1. Generator expressions - compact syntax (x2 for x in range(10))
2. yield from - delegation of generation to other generators
3. Infinite generators - generators without end (with limits!)
4. Optimization - use of generators to save memory and speed

Generator expressions and yield from make working with generators even more powerful and convenient.`,
  
  practiceTask: {
    title: "Generating expressions and yield from",
    description: "Create generators using generator expressions and yield from",
    problemStatement: `Create a program with the following tasks:

1. **Use a generator expression** to create a generator that generates cubes of numbers from 1 to 10
   - Use the syntax: (x**3 for x in range(1, 11))

2. **Create a generator function** using yield from:
   - The function \\\`combine_ranges(start1, end1, start2, end2)\\\` should generate numbers from two ranges
   - Use yield from to delegate range() generation

3. **Create an infinite generator** of even numbers:
   - The \\\`infinite_evens()\\\` function should generate even numbers infinitely
   - Limit the output to the first 10 values

4. **Use a generator expression** to calculate the sum of the squares of the numbers from 1 to 20

**Requirements:**
- Use generator expressions where possible
- Use yield from to compose generators
- Don't forget to cap the infinite generator
- Enter values directly in code (don't use input())`,
    outputFormat: `Output example:

=== Cubes of numbers ===
1
8
27
64
125
216
343
512
729
1000
=== Combined Ranges ===
1
2
3
10
11
12
=== First 10 even numbers ===
0
2
4
6
8
10
12
14
16
18
=== Sum of squares from 1 to 20 ===
2870`,
    examples: [
      {
        output: `=== Cubes of numbers ===
1
8
27
64
125
216
343
512
729
1000
=== Combined Ranges ===
1
2
3
10
11
12
=== First 10 even numbers ===
0
2
4
6
8
10
12
14
16
18

=== Sum of squares from 1 to 20 ===
2870`,
        explanation: "Demonstrates how all generators work: generator expressions, yield from, infinite generator, and use with functions."
      }
    ],
    solution: {
      code: `# 1. Generating expression for cubes
print("=== Cubes of numbers ===")
cubes = (x**3 for x in range(1, 11))
for cube in cubes:
    print(cube)

# 2. Generator function with yield from
def combine_ranges(start1, end1, start2, end2):
    """
    Generates numbers from two ranges
    """
    yield from range(start1, end1)
    yield from range(start2, end2)

print("=== Combined ranges ===")
for num in combine_ranges(1, 4, 10, 13):
    print(num)

# 3. Infinite generator of even numbers
def infinite_evens():
    """
    Generates even numbers infinitely
    """
    num = 0
    while True:
        yield num
        num += 2
print("=== First 10 even numbers ===")
evens = infinite_evens()
for i in range(10):
    print(next(evens))

# 4. Generating expression for the sum of squares
print()
print("=== Sum of squares from 1 to 20 ===")
total = sum(x**2 for x in range(1, 21))
print(total)`,
      explanation: "The solution demonstrates different ways to use generators: generator expressions for cubes and sums of squares, yield from for composition of ranges, and an infinite generator with a limit."
    },
    hints: [
      "Use parentheses for generator expressions: (x**3 for x in range(1, 11))",
      "For yield from use: yield from range(start, end)",
      "An infinite generator requires a while True and a limit when used",
      "A generator expression can be used directly as an argument to sum()",
      "Don't forget to loop the infinite generator with range(10)"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the syntax used for generator expressions?",
        options: [
          "Round brackets: (x**2 for x in range(10))",
          "Square brackets: [x**2 for x in range(10)]",
          "Curly brackets: {x**2 for x in range(10)}",
          "Without parentheses: x**2 for x in range(10)"
        ],
        correctAnswer: 0,
        explanation: "Generator expressions use parentheses. Square brackets create list comprehension."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does yield from do?",
        options: [
          "Delegates generation to another generator",
          "Completes the generator",
          "Creates a list",
          "Causes an error"
        ],
        correctAnswer: 0,
        explanation: "yield from delegates the generation of values ​​to another generator or iterable object."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code produce?\\n\\n```python\\nsquares = (x**2 for x in range(5))\\nprint(type(squares))\\n```",
        options: [
          "<class 'generator'>",
          "<class 'list'>",
          "<class 'tuple'>",
          "mistake"
        ],
        correctAnswer: 0,
        explanation: "A generator expression creates an object of type generator, not a list."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Is it possible to create an infinite generator?",
        options: [
          "Yes, but you need to limit its use",
          "No, it's impossible",
          "Only with yield from",
          "Only with generator expressions"
        ],
        correctAnswer: 0,
        explanation: "Yes, you can create an infinite generator with while True, but it is important to limit its use, otherwise the program will freeze."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\\n\\n```python\\ndef gen1():\\n yield from range(3)\\n\\ndef gen2():\\n yield from range(3, 6)\\n\\ndef all():\\n yield from gen1()\\n yield from gen2()\\n\\nfor x in all():\\n print(x)\\n```",
        options: [
          "0, 1, 2, 3, 4, 5",
          "3, 4, 5, 0, 1, 2",
          "mistake",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "yield from first generates the value from gen1() (0, 1, 2), then from gen2() (3, 4, 5)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is it better to use generator expressions instead of generator functions?",
        options: [
          "For simple disposable generators",
          "For complex generators with many conditions",
          "For recursive generators",
          "When documentation is required"
        ],
        correctAnswer: 0,
        explanation: "Generator expressions are best used for simple one-time generators. For more complex logic, functions are better."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A generator expression can be used as a function argument.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "True. Generator expressions can be used directly as function arguments, for example: sum(x**2 for x in range(10))."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens if you use an infinite generator with no limit?",
        options: [
          "The program will hang",
          "An error will occur",
          "The generator will stop automatically",
          "Will return None"
        ],
        correctAnswer: 0,
        explanation: "An infinite generator without a limit will lead to an infinite loop and the program will hang."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

