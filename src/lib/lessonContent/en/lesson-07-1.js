/**
 * Lesson 07-1: Introduction to generators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_07_1 = {
  lessonId: "lesson-07-1",
  moduleId: "module-07",
  order: 1,
  title: "Introduction to generators",

  learningObjectives: [
    "Understand what generators are and why they are useful",
    "Create generator functions with yield",
    "Use generators to save memory",
    "Understand the difference between ordinary functions and generators"
  ],

  prerequisites: ["lesson-06-4"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What are generators?",
        content: `Generators are a special kind of function in Python that let you create iterators in a more elegant and efficient way.

**The problem generators solve:**

Imagine you need a list of a million numbers. The ordinary approach:

\`\`\`python
# Create a list of a million numbers
numbers = [x for x in range(1000000)]
# This uses a lot of memory!
\`\`\`

**The solution - generators:**

Generators do not create all values at once. They produce values "on the fly" (lazy evaluation) when needed.

**Advantages of generators:**

1. **Memory savings** - they do not store all values in memory
2. **Speed** - they do not spend time creating every value up front
3. **Infinite sequences** - they can produce an unlimited number of values
4. **Simplicity** - easier to write and read

**Analogy:**

Think of an ordinary function as a factory that produces all goods at once and stores them in a warehouse. A generator is a factory that produces goods only when they are ordered.`
      },
      {
        title: "Creating a generator function",
        content: `A generator function looks like an ordinary function, but uses the keyword \`yield\` instead of \`return\`.

**Basic syntax:**

\`\`\`python
def generator_name():
    yield value1
    yield value2
    yield value3
\`\`\`

**First generator:**

\`\`\`python
def simple_generator():
    yield 1
    yield 2
    yield 3

# Usage
gen = simple_generator()
print(next(gen))  # Prints: 1
print(next(gen))  # Prints: 2
print(next(gen))  # Prints: 3
\`\`\`

**Key difference:**

- **return** - finishes the function and returns a value
- **yield** - pauses the function, returns a value, but keeps state so it can continue

**Important:** Calling a generator function does not run it immediately. It returns a generator object you can use to get values.`
      },
      {
        title: "Using generators",
        content: `Generators can be used in several ways:

**1. The next() function:**

\`\`\`python
def count_to_three():
    yield 1
    yield 2
    yield 3

gen = count_to_three()
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
print(next(gen))  # Error: StopIteration
\`\`\`

**2. A for loop (most common):**

\`\`\`python
def count_to_three():
    yield 1
    yield 2
    yield 3

# Automatically calls next() and handles StopIteration
for number in count_to_three():
    print(number)
# Prints:
# 1
# 2
# 3
\`\`\`

**3. The list() function (convert to a list):**

\`\`\`python
def count_to_three():
    yield 1
    yield 2
    yield 3

# Convert the generator to a list
numbers = list(count_to_three())
print(numbers)  # [1, 2, 3]
\`\`\`

**Caution:** Converting a generator to a list loses the generator's advantages (memory savings)!`
      },
      {
        title: "Comparing an ordinary function and a generator",
        content: `Let's compare two approaches for creating a sequence of numbers:

**Ordinary function (creates a list):**

\`\`\`python
def create_numbers(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

# Creates the whole list at once
numbers = create_numbers(1000000)
# Uses a lot of memory!
\`\`\`

**Generator function:**

\`\`\`python
def generate_numbers(n):
    for i in range(n):
        yield i

# Does not create a list - only a generator
gen = generate_numbers(1000000)
# Uses almost no memory!

# Get values one at a time
for number in gen:
    print(number)  # Prints numbers one by one
    # You can stop at any moment
\`\`\`

**Key differences:**

| Ordinary function | Generator |
|-------------------|-----------|
| Creates all values at once | Produces values one by one |
| Uses a lot of memory | Saves memory |
| Returns a list | Returns a generator |
| Uses return | Uses yield |
| Runs completely | Runs step by step |
| Cannot be stopped mid-way | Can be stopped at any moment |
`
      },
      {
        title: "Practical generator examples",
        content: `**Example 1: Even-number generator**

\`\`\`python
def even_numbers(limit):
    """Generates even numbers up to limit"""
    for i in range(0, limit, 2):
        yield i

# Usage
for num in even_numbers(10):
    print(num)
# Prints: 0, 2, 4, 6, 8
\`\`\`

**Example 2: Fibonacci generator**

\`\`\`python
def fibonacci(n):
    """Generates the first n Fibonacci numbers"""
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# Usage
for num in fibonacci(10):
    print(num)
# Prints: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Example 3: Powers of two**

\`\`\`python
def powers_of_two(limit):
    """Generates powers of two up to limit"""
    power = 1
    while power <= limit:
        yield power
        power *= 2

# Usage
for num in powers_of_two(100):
    print(num)
# Prints: 1, 2, 4, 8, 16, 32, 64
\`\`\`

**Example 4: Generator with a condition**

\`\`\`python
def numbers_divisible_by(n, limit):
    """Generates numbers divisible by n"""
    for i in range(limit):
        if i % n == 0:
            yield i

# Usage
for num in numbers_divisible_by(3, 20):
    print(num)
# Prints: 0, 3, 6, 9, 12, 15, 18
\`\`\`
`
      },
      {
        title: "When to use generators?",
        content: `**Use generators when:**

1. **Large data volumes** - you need to process a lot of data, but not all at once
2. **Infinite sequences** - you need to generate values without an end
3. **Memory savings** - memory efficiency matters
4. **Streaming** - data is processed one element at a time
5. **Custom iterators** - you need your own iterator

**Do not use generators when:**

1. **You need all values at once** - a list is better
2. **You need random access** - generators do not support indexing
3. **You need to reuse values** - a generator is exhausted after one pass

**Practical example:**

\`\`\`python
# Read a large file line by line (generator)
def read_file_lines(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# Process the file line by line without loading it all into memory
for line in read_file_lines('large_file.txt'):
    process(line)  # Process one line at a time
\`\`\`
`
      },
      {
        title: "Summary",
        content: `In this lesson we learned the basics of generators:

**Key concepts:**

1. **Generators** - special functions that produce values one by one
2. **yield** - the keyword for creating generators
3. **Memory savings** - generators do not store all values in memory
4. **Lazy evaluation** - values are produced only when needed

**Syntax:**

\`\`\`python
def generator_function():
    yield value
\`\`\`

**Usage:**

- \`next(gen)\` - get the next value
- \`for value in gen:\` - iterate over the generator
- \`list(gen)\` - convert to a list (loses the advantages)

**Next step:**

In the next lesson we will learn about generator expressions and more advanced uses of yield.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Simple generator",
      code: `def simple_generator():
    yield 1
    yield 2
    yield 3

# Usage
gen = simple_generator()
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3`,
      explanation: "The simplest generator example - it yields three values."
    },
    {
      title: "Generator in a for loop",
      code: `def count_to_five():
    for i in range(1, 6):
        yield i

# Use in a loop
for number in count_to_five():
    print(number)
# Prints: 1, 2, 3, 4, 5`,
      explanation: "A generator that uses a for loop to produce values. The most convenient way to use generators."
    },
    {
      title: "Even-number generator",
      code: `def even_numbers(limit):
    """Generates even numbers up to limit"""
    for i in range(0, limit, 2):
        yield i

# Usage
for num in even_numbers(10):
    print(num)
# Prints: 0, 2, 4, 6, 8`,
      explanation: "A parameterized generator that yields even numbers up to a given limit."
    },
    {
      title: "Comparison with a list",
      code: `# Ordinary function (creates a list)
def create_list(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

# Generator (does not create a list)
def generate_numbers(n):
    for i in range(n):
        yield i

# Usage
numbers_list = create_list(1000)  # Creates the whole list
gen = generate_numbers(1000)      # Creates only a generator`,
      explanation: "Shows the difference between creating a list and a generator. The generator saves memory."
    },
    {
      title: "Generator with a condition",
      code: `def divisible_by(n, limit):
    """Generates numbers divisible by n"""
    for i in range(limit):
        if i % n == 0:
            yield i

# Usage
for num in divisible_by(3, 20):
    print(num)
# Prints: 0, 3, 6, 9, 12, 15, 18`,
      explanation: "A generator that uses a condition to filter values."
    }
  ],

  commonMistakes: [
    {
      mistake: "Confusing return and yield",
      explanation: "Beginners often use return instead of yield in generators.",
      correctApproach: `# Incorrect:
def generator():
    return 1  # This is an ordinary function, not a generator

# Correct:
def generator():
    yield 1  # This is a generator`
    },
    {
      mistake: "Trying to reuse a generator",
      explanation: "A generator is exhausted after the first use.",
      correctApproach: `# Incorrect:
gen = count_to_three()
list1 = list(gen)  # Uses the generator
list2 = list(gen)  # Empty list! Generator already exhausted

# Correct:
gen1 = count_to_three()
gen2 = count_to_three()  # Create a new generator
list1 = list(gen1)
list2 = list(gen2)`
    },
    {
      mistake: "Forgetting that a generator does not run immediately",
      explanation: "Calling a generator function does not execute the code - it only creates a generator object.",
      correctApproach: `# Incorrect understanding:
def generator():
    print("Running")
    yield 1

gen = generator()  # Prints nothing! The function has not run yet
print(next(gen))   # Now it runs and prints: "Running" and "1"`
    },
    {
      mistake: "Converting a generator to a list unnecessarily",
      explanation: "Converting a generator to a list loses the generator advantages (memory savings).",
      correctApproach: `# Incorrect (if you do not need all values at once):
gen = generate_numbers(1000000)
numbers = list(gen)  # Lose the generator advantages

# Correct:
gen = generate_numbers(1000000)
for number in gen:  # Process one by one
    process(number)`
    }
  ],

  summary: `In this lesson we learned the basics of generators:

1. What generators are - special functions that produce values one by one
2. The yield syntax - how to create generator functions
3. Using generators - via next(), a for loop, or list()
4. Advantages - memory savings, speed, infinite sequences
5. Comparison with ordinary functions - when to use generators

Generators are a powerful tool for working with large data and building efficient iterators.`,

  practiceTask: {
    title: "Creating generators",
    description: "Create several generators for different sequences",
    problemStatement: `Create three generator functions:

1. **square_numbers(n)** - squares from 1 to n
2. **countdown(start)** - from start down to 1
3. **multiples_of(m, limit)** - multiples of m strictly less than limit

Read the parameters from stdin and print the results with for loops.

Input format:
5
5
3 20`,
    outputFormat: `=== Number squares ===
1
4
9
16
25

=== Countdown ===
5
4
3
2
1

=== Multiples ===
3
6
9
12
15
18`,
    examples: [
      {
        input: `5
5
3 20`,
        output: `=== Number squares ===
1
4
9
16
25

=== Countdown ===
5
4
3
2
1

=== Multiples ===
3
6
9
12
15
18`,
        explanation: "n=5, countdown=5, multiples of 3 below 20"
      },
      {
        input: `3
3
2 10`,
        output: `=== Number squares ===
1
4
9

=== Countdown ===
3
2
1

=== Multiples ===
2
4
6
8`,
        explanation: "Smaller parameters: squares 1..3, even numbers below 10"
      },
      {
        input: `1
1
5 15`,
        output: `=== Number squares ===
1

=== Countdown ===
1

=== Multiples ===
5
10`,
        explanation: "Minimal case with multiples of 5"
      }
    ],
    solution: {
      code: `def square_numbers(n):
    """Generates squares of numbers from 1 to n"""
    for i in range(1, n + 1):
        yield i ** 2

def countdown(start):
    """Generates numbers from start down to 1 (inclusive)"""
    for i in range(start, 0, -1):
        yield i

def multiples_of(m, limit):
    """Generates multiples of m below limit"""
    for i in range(m, limit, m):
        yield i

n = int(input())
start = int(input())
m, limit = map(int, input().split())

print("=== Number squares ===")
for num in square_numbers(n):
    print(num)
print()
print("=== Countdown ===")
for num in countdown(start):
    print(num)
print()
print("=== Multiples ===")
for num in multiples_of(m, limit):
    print(num)`,
      explanation: "Three generators with yield; parameters are read from stdin."
    },
    hints: [
      "Use yield instead of return",
      "Read n, start, then m and limit",
      "For multiples_of: range(m, limit, m)",
      "Print a blank line between output blocks"
    ],
    difficulty: "beginner"
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a generator in Python?",
        options: [
          "A special kind of function that produces values one by one",
          "A list that holds all values",
          "A variable that stores a value",
          "An operator for loops"
        ],
        correctAnswer: 0,
        explanation: "A generator is a special function that uses yield to produce values one by one without creating all of them at once."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which keyword is used to create generators?",
        options: [
          "yield",
          "return",
          "generate",
          "create"
        ],
        correctAnswer: 0,
        explanation: "The yield keyword creates generators. It pauses the function and returns a value."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main advantage of generators?",
        options: [
          "Memory savings",
          "Execution speed",
          "Code simplicity",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Generators offer memory savings, speed (lazy evaluation), simpler code, and infinite sequences."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndef gen():\n    yield 1\n    yield 2\n\ngen = gen()\nprint(next(gen))\nprint(next(gen))\n```",
        options: [
          "1, then 2",
          "2, then 1",
          "An error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "The generator yields values one by one. The first next() returns 1, the second returns 2."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How does yield differ from return?",
        options: [
          "yield pauses the function and keeps state; return finishes the function",
          "return pauses the function; yield finishes it",
          "There is no difference",
          "yield works only with numbers"
        ],
        correctAnswer: 0,
        explanation: "yield pauses execution, returns a value, and keeps state. return finishes the function and returns a value."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens if you call next() after a generator is exhausted?",
        options: [
          "A StopIteration error is raised",
          "It returns None",
          "It returns the last value",
          "It starts again from the first value"
        ],
        correctAnswer: 0,
        explanation: "When a generator is exhausted, next() raises StopIteration."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you reuse a generator multiple times?",
        options: [
          "No, a generator is exhausted after the first use",
          "Yes, you can use it many times",
          "Only if you convert it to a list",
          "Only for infinite generators"
        ],
        correctAnswer: 0,
        explanation: "A generator is exhausted after one use. To reuse it, create a new generator."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "A generator function runs immediately when called.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "False. A generator function returns a generator object; it runs when you call next() or iterate with for."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
