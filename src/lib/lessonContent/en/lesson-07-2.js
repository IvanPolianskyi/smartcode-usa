/**
 * Lesson 07-2: Generator expressions and yield
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_07_2 = {
  lessonId: "lesson-07-2",
  moduleId: "module-07",
  order: 2,
  title: "Generator expressions and yield",

  learningObjectives: [
    "Create generator expressions",
    "Use yield from to delegate generators",
    "Work with infinite generators",
    "Optimize code with generators"
  ],

  prerequisites: ["lesson-07-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Generator expressions",
        content: `Generator expressions are a compact way to create generators, similar to list comprehensions, but with parentheses instead of square brackets.

**Syntax:**

\`\`\`python
# List comprehension (creates a list)
[expression for item in sequence]

# Generator expression (creates a generator)
(expression for item in sequence)
\`\`\`

**Comparison:**

\`\`\`python
# List comprehension — creates the whole list
squares_list = [x**2 for x in range(10)]
print(squares_list)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression — creates a generator
squares_gen = (x**2 for x in range(10))
print(squares_gen)  # <generator object <genexpr> at 0x...>
print(list(squares_gen))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

**Advantages of generator expressions:**

1. **Compactness** — shorter syntax
2. **Memory savings** — does not create a list
3. **Lazy evaluation** — values are produced only when needed

**When to use:**

- When you need a one-shot generator
- When you do not need to store all values
- When passing into functions that work with iterators`
      },
      {
        title: "Generator expression examples",
        content: `**Example 1: Squares**

\`\`\`python
# Generator expression
squares = (x**2 for x in range(10))

# Usage
for square in squares:
    print(square)
# Prints: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81
\`\`\`

**Example 2: Filtering with a condition**

\`\`\`python
# Even numbers
evens = (x for x in range(20) if x % 2 == 0)

for num in evens:
    print(num)
# Prints: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
\`\`\`

**Example 3: Transforming data**

\`\`\`python
# Convert strings to uppercase
words = ['hello', 'world', 'python']
upper_words = (word.upper() for word in words)

for word in upper_words:
    print(word)
# Prints: HELLO, WORLD, PYTHON
\`\`\`

**Example 4: Nested generator expressions**

\`\`\`python
# Products of number pairs
products = (x * y for x in range(3) for y in range(3))

for product in products:
    print(product)
# Prints: 0, 0, 0, 0, 1, 2, 0, 2, 4
\`\`\`

**Example 5: Using with functions**

\`\`\`python
# Generator expression as an argument
total = sum(x**2 for x in range(10))
print(total)  # 285

# Maximum value
max_value = max(x * 2 for x in range(10))
print(max_value)  # 18
\`\`\`
`
      },
      {
        title: "yield from — delegating generators",
        content: `\`yield from\` lets you delegate value production to another generator. This is useful for composing generators.

**Syntax:**

\`\`\`python
def generator1():
    yield from generator2()  # Delegates generation to generator2
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
    yield from numbers()      # Yields 1, 2, 3
    yield from more_numbers() # Yields 4, 5

for num in all_numbers():
    print(num)
# Prints: 1, 2, 3, 4, 5
\`\`\`

**Example 2: Delegating to range()**

\`\`\`python
def count_to_ten():
    yield from range(1, 6)   # 1, 2, 3, 4, 5
    yield from range(6, 11) # 6, 7, 8, 9, 10

for num in count_to_ten():
    print(num)
# Prints: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
\`\`\`

**Example 3: Composing several generators**

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
# Prints: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
\`\`\`

**Advantages of yield from:**

1. **Readability** — cleaner code
2. **Composition** — easy to combine generators
3. **Delegation** — hand control to another generator
4. **Optimization** — more efficient than manually calling next()`
      },
      {
        title: "Infinite generators",
        content: `Generators can produce values forever! That is one of their most powerful features.

**Example 1: Infinite counter**

\`\`\`python
def infinite_counter(start=0):
    """Generates numbers from start to infinity"""
    while True:
        yield start
        start += 1

# Usage (with a limit!)
counter = infinite_counter()
for i, num in enumerate(counter):
    if i >= 10:  # Limit to 10 values
        break
    print(num)
# Prints: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
\`\`\`

**Example 2: Infinite Fibonacci**

\`\`\`python
def infinite_fibonacci():
    """Generates Fibonacci numbers forever"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Usage
fib = infinite_fibonacci()
for i in range(10):
    print(next(fib))
# Prints: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Example 3: Infinite powers of two**

\`\`\`python
def powers_of_two():
    """Generates powers of two forever"""
    power = 1
    while True:
        yield power
        power *= 2

# Usage
powers = powers_of_two()
for i in range(8):
    print(next(powers))
# Prints: 1, 2, 4, 8, 16, 32, 64, 128
\`\`\`

**Important:** Always limit infinite generators, or the program will hang!
`
      },
      {
        title: "Optimization with generators",
        content: `Generators help optimize code, especially with large data volumes.

**Example 1: Processing a large file**

\`\`\`python
# Without a generator (loads the whole file into memory)
def read_file_all(filename):
    with open(filename, 'r') as f:
        return f.readlines()  # Loads all lines

# With a generator (processes one line at a time)
def read_file_lines(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()  # Yields one line at a time

# Usage
for line in read_file_lines('large_file.txt'):
    process(line)  # Process one line at a time
\`\`\`

**Example 2: Filtering and transforming**

\`\`\`python
# Without a generator (creates intermediate lists)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squared = [x**2 for x in numbers]
filtered = [x for x in squared if x % 2 == 0]
result = sum(filtered)

# With a generator (no intermediate lists)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = sum(x**2 for x in numbers if (x**2) % 2 == 0)
\`\`\`

**Example 3: Data processing pipeline**

\`\`\`python
def read_numbers():
    """Yields numbers"""
    for i in range(100):
        yield i

def square(numbers):
    """Squares each value"""
    for num in numbers:
        yield num ** 2

def filter_even(numbers):
    """Filters even values"""
    for num in numbers:
        if num % 2 == 0:
            yield num

# Compose generators
pipeline = filter_even(square(read_numbers()))
for num in pipeline:
    print(num)
\`\`\`

**Advantages:**

1. **Memory savings** — no intermediate lists
2. **Speed** — process one element at a time
3. **Flexibility** — easy to combine operations`
      },
      {
        title: "Practical tips",
        content: `**When to use generator expressions:**

 For one-shot use
 As function arguments (sum, max, min)
 For large data volumes
 When you do not need access to all values

**When to use generator functions:**

 For more complex logic
 When you need to use it more than once
 For recursive generators
 When you need documentation

**When to use yield from:**

 For composing generators
 For delegating generation
 For simplifying code

**Avoid:**

 Converting generators to lists unnecessarily
 Reusing the same generator (create new ones)
 Infinite generators without limits
 Overly complex generator expressions (prefer a function)`
      },
      {
        title: "Summary",
        content: `In this lesson we learned advanced generator features:

**Key concepts:**

1. **Generator expressions** — compact syntax for creating generators
2. **yield from** — delegate generation to another generator
3. **Infinite generators** — generators with no end (use limits!)
4. **Optimization** — use generators to save memory

**Syntax:**

\`\`\`python
# Generator expression
gen = (x**2 for x in range(10))

# yield from
def generator():
    yield from other_generator()
\`\`\`

**Next step:**

In the next lesson we will learn about iterators and the iteration protocol in Python.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Generator expression",
      code: `# Generator expression for squares
squares = (x**2 for x in range(10))

# Usage
for square in squares:
    print(square)
# Prints: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81`,
      explanation: "A compact way to create a generator of number squares."
    },
    {
      title: "Generator expression with a condition",
      code: `# Even numbers
evens = (x for x in range(20) if x % 2 == 0)

for num in evens:
    print(num)
# Prints: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18`,
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
# Prints: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,
      explanation: "Shows yield from for composing generators."
    },
    {
      title: "Infinite generator",
      code: `def infinite_counter(start=0):
    while True:
        yield start
        start += 1

# Usage with a limit
counter = infinite_counter()
for i in range(10):
    print(next(counter))
# Prints: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`,
      explanation: "An infinite generator that yields numbers forever. Always limit its use."
    },
    {
      title: "Generator expression as an argument",
      code: `# Use a generator expression as an argument
total = sum(x**2 for x in range(10))
print(total)  # 285

max_value = max(x * 2 for x in range(10))
print(max_value)  # 18`,
      explanation: "Generator expressions can be used directly as function arguments."
    }
  ],

  commonMistakes: [
    {
      mistake: "Confusing generator expressions with list comprehensions",
      explanation: "Parentheses create a generator; square brackets create a list.",
      correctApproach: `# Generator (parentheses)
gen = (x**2 for x in range(10))

# List (square brackets)
lst = [x**2 for x in range(10)]`
    },
    {
      mistake: "Using an infinite generator without a limit",
      explanation: "Infinite generators can hang the program if not limited.",
      correctApproach: `# Incorrect:
def infinite():
    while True:
        yield 1

for num in infinite():  # Hangs!
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
    yield from 5  # Error! 5 is not iterable

# Correct:
def gen():
    yield from range(5)  # range() is iterable`
    },
    {
      mistake: "Converting a generator expression to a list unnecessarily",
      explanation: "If you do not need access to all values, keep the generator.",
      correctApproach: `# Incorrect (if you do not need a list):
gen = (x**2 for x in range(1000000))
lst = list(gen)  # Lose the generator advantages

# Correct:
gen = (x**2 for x in range(1000000))
for square in gen:  # Process one by one
    process(square)`
    }
  ],

  summary: `In this lesson we learned advanced generator features:

1. Generator expressions — compact syntax (x**2 for x in range(10))
2. yield from — delegate generation to other generators
3. Infinite generators — generators with no end (use limits!)
4. Optimization — use generators to save memory and improve speed

Generator expressions and yield from make working with generators even more powerful and convenient.`,

  practiceTask: {
    title: "Generator expressions and yield from",
    description: "Create generators using generator expressions and yield from",
    problemStatement: `Create a program that:

1. Uses a generator expression for cubes from 1 to cube_n
2. Defines combine_ranges(start1, end1, start2, end2) with yield from
3. Defines infinite_evens() — the first even_count even numbers
4. Computes the sum of squares from 1 to square_n

Input format:
10
1 4 10 13
10
20`,
    outputFormat: `=== Number cubes ===
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
=== Combined ranges ===
1
2
3
10
11
12
=== First even numbers ===
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
        input: `10
1 4 10 13
10
20`,
        output: `=== Number cubes ===
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
=== Combined ranges ===
1
2
3
10
11
12
=== First even numbers ===
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
        explanation: "Full set: cubes 1..10, two ranges, 10 evens, sum up to 20"
      },
      {
        input: `3
1 3 5 7
4
5`,
        output: `=== Number cubes ===
1
8
27
=== Combined ranges ===
1
2
5
6
=== First even numbers ===
0
2
4
6

=== Sum of squares from 1 to 5 ===
55`,
        explanation: "Smaller parameters"
      },
      {
        input: `2
0 2 8 10
3
3`,
        output: `=== Number cubes ===
1
8
=== Combined ranges ===
0
1
8
9
=== First even numbers ===
0
2
4

=== Sum of squares from 1 to 3 ===
14`,
        explanation: "Cubes 1..2 and sum of squares 1+4+9=14"
      }
    ],
    solution: {
      code: `def combine_ranges(start1, end1, start2, end2):
    """Yields numbers from two ranges"""
    yield from range(start1, end1)
    yield from range(start2, end2)

def infinite_evens():
    """Yields even numbers forever"""
    num = 0
    while True:
        yield num
        num += 2

cube_n = int(input())
s1, e1, s2, e2 = map(int, input().split())
even_count = int(input())
square_n = int(input())

print("=== Number cubes ===")
cubes = (x**3 for x in range(1, cube_n + 1))
for cube in cubes:
    print(cube)

print("=== Combined ranges ===")
for num in combine_ranges(s1, e1, s2, e2):
    print(num)

print("=== First even numbers ===")
evens = infinite_evens()
for i in range(even_count):
    print(next(evens))

print()
print(f"=== Sum of squares from 1 to {square_n} ===")
total = sum(x**2 for x in range(1, square_n + 1))
print(total)`,
      explanation: "Parameters from stdin; generator expressions, yield from, and an infinite generator."
    },
    hints: [
      "Read cube_n, four range bounds, even_count, square_n",
      "Generator expression: (x**3 for x in range(1, cube_n + 1))",
      "yield from range(...)",
      "Limit infinite_evens with range(even_count)"
    ],
    difficulty: "intermediate"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which syntax is used for generator expressions?",
        options: [
          "Parentheses: (x**2 for x in range(10))",
          "Square brackets: [x**2 for x in range(10)]",
          "Curly braces: {x**2 for x in range(10)}",
          "No brackets: x**2 for x in range(10)"
        ],
        correctAnswer: 0,
        explanation: "Generator expressions use parentheses. Square brackets create a list comprehension."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does yield from do?",
        options: [
          "Delegates generation to another generator",
          "Finishes the generator",
          "Creates a list",
          "Raises an error"
        ],
        correctAnswer: 0,
        explanation: "yield from delegates value production to another generator or iterable."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code create?\n\n```python\nsquares = (x**2 for x in range(5))\nprint(type(squares))\n```",
        options: [
          "<class 'generator'>",
          "<class 'list'>",
          "<class 'tuple'>",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "A generator expression creates a generator object, not a list."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you create an infinite generator?",
        options: [
          "Yes, but you must limit its use",
          "No, it is impossible",
          "Only with yield from",
          "Only with generator expressions"
        ],
        correctAnswer: 0,
        explanation: "Yes, with while True — but always limit usage or the program will hang."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndef gen1():\n    yield from range(3)\n\ndef gen2():\n    yield from range(3, 6)\n\ndef all():\n    yield from gen1()\n    yield from gen2()\n\nfor x in all():\n    print(x)\n```",
        options: [
          "0, 1, 2, 3, 4, 5",
          "3, 4, 5, 0, 1, 2",
          "An error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "yield from first yields from gen1() (0, 1, 2), then from gen2() (3, 4, 5)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is it better to use generator expressions instead of generator functions?",
        options: [
          "For simple one-shot generators",
          "For complex generators with many conditions",
          "For recursive generators",
          "When documentation is needed"
        ],
        correctAnswer: 0,
        explanation: "Generator expressions are best for simple one-shot generators. Prefer functions for more complex logic."
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
        explanation: "True. For example: sum(x**2 for x in range(10))."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens if you use an infinite generator without a limit?",
        options: [
          "The program hangs",
          "An error is raised",
          "The generator stops automatically",
          "It returns None"
        ],
        correctAnswer: 0,
        explanation: "An unlimited infinite generator causes an infinite loop and hangs the program."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
