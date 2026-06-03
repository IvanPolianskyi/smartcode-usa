/**
 * Lesson 07-1: Introduction to generators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_07_1 = {
  lessonId: "lesson-07-1",
  moduleId: "module-07",
  order: 1,
  title: "Introduction to generators",
  
  learningObjectives: [
    "Understand what generators are and why they are needed",
    "Create generator functions using yield",
    "Use generators to save memory",
    "Understand the difference between regular functions and generators"
  ],
  
  prerequisites: ["lesson-06-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are generators?",
        content: `Generators are a special type of function in Python that allow you to create iterators in a more elegant and efficient way.

**Problem Generators Solve:**

Imagine you need to create a list with a million numbers. A common approach is:

\`\`\`python
# We create a list with a million numbers
numbers = [x for x in range(1000000)]
# This takes a lot of memory!
\`\`\`

**Solutions - generators:**

Generators do not create all values at once. They generate values "on the fly" (lazy evaluation) when they are needed.

**Advantages of generators:**

1. **Memory saving** - do not store all values in memory
2. **Speed** - do not waste time creating all the values at once
3. **Infinite sequences** - can generate an infinite number of values
4. **Simplicity** - easier to write and read code

**Analogy:**

Think of a normal function as a factory that produces all goods at once and stores them in a warehouse. A generator is a factory that produces goods only when they are ordered.`
      },
      {
        title: "Creating a generator function",
        content: `A generator function looks like a regular function, but uses the \`\`yield'' keyword instead of \`\`return''.

**Basic syntax:**

\`\`\`python
def generator_name():
    yield value1
    yield value2
    yield value3
\`\`\`

**The first generator:**

\`\`\`python
def simple_generator():
    yield 1
    yield 2
    yield 3

# Usage
gen = simple_generator()
print(next(gen)) # Outputs: 1
print(next(gen)) # Output: 2
print(next(gen)) # Output: 3
\`\`\`

**Key Difference:**

- **return** - completes the function and returns the value
- **yield** - suspends the function, returns a value, but preserves the state to continue

**Important:** When you call a generator function, it is not executed immediately. It returns a generator object that can be used to get values.`
      },
      {
        title: "Use of generators",
        content: `Generators can be used in several ways:

**1. function next():**

\`\`\`python
def count_to_three():
    yield 1
    yield 2
    yield 3

gen = count_to_three()
print(next(gen)) # 1
print(next(gen)) # 2
print(next(gen)) # 3
print(next(gen)) # Error: StopIteration
\`\`\`

**2. The for loop (most often):**

\`\`\`python
def count_to_three():
    yield 1
    yield 2
    yield 3

# Automatically calls next() and handles StopIteration
for number in count_to_three():
    print(number)
# Outputs:
#1
# 2
#3
\`\`\`

**3. The list() function (transformation into a list):**

\`\`\`python
def count_to_three():
    yield 1
    yield 2
    yield 3

# We turn the generator into a list
numbers = list(count_to_three())
print(numbers) # [1, 2, 3]
\`\`\`

**Caution:** Converting a generator to a list loses the benefits of the generator (saving memory)!`
      },
      {
        title: "Comparison of normal function and generator",
        content: `Let's compare two approaches to creating a sequence of numbers:

**Normal function (creates a list):**

\`\`\`python
def create_numbers(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

# Creates the entire list at once
numbers = create_numbers(1000000)
# Takes up a lot of memory!
\`\`\`

**Generating function:**

\`\`\`python
def generate_numbers(n):
    for i in range(n):
        yield i

# Does not create a list, only a generator
gen = generate_numbers(1000000)
# Takes up almost no memory!

# We get values one by one
for number in gen:
    print(number) # Print numbers one at a time
    # You can stop at any time
\`\`\`

**Key Differences:**

| Normal function | Generator |
|------------------|-----------|
| Creates all values at once | Generates values one at a time |
| Takes up a lot of memory Saves memory |
| Returns a list of | Returns the generator |
| Uses return | Uses yield |
| Complete | It is performed step by step |
| Can't be stopped | You can stop at any time`
      },
      {
        title: "Practical examples of generators",
        content: `**Example 1: Even number generator**

\`\`\`python
def even_numbers(limit):
    """Generates even numbers up to limit"""
    for i in range(0, limit, 2):
        yield i

# Usage
for num in even_numbers(10):
    print(num)
# Outputs: 0, 2, 4, 6, 8
\`\`\`

**Example 2: Fibonacci number generator**

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
# Outputs: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**Example 3: Power-of-two generator**

\`\`\`python
def powers_of_two(limit):
    """Generates powers of two to limit"""
    power = 1
    while power <= limit:
        yield power
        power *= 2

# Usage
for num in powers_of_two(100):
    print(num)
# Outputs: 1, 2, 4, 8, 16, 32, 64
\`\`\`

**Example 4: Generator with condition**

\`\`\`python
def numbers_divisible_by(n, limit):
    """Generates numbers that are divisible by n"""
    for i in range(limit):
        if i % n == 0:
            yield i

# Usage
for num in numbers_divisible_by(3, 20):
    print(num)
# Outputs: 0, 3, 6, 9, 12, 15, 18
\`\`\``
      },
      {
        title: "When to use generators?",
        content: `**Use generators when:**

1. **Large amounts of data** - when you need to process a lot of data, but not all at once
2. **Infinite sequences** - when you need to generate values without end
3. **Memory saving** - when the efficiency of memory use is important
4. **Stream processing** - when data is processed one element at a time
5. **Creating iterators** - when you need to create your own iterator

**Do not use generators when:**

1. **Need access to all values at once** - then a list is better
2. **Random access required** - generators do not support indexing
3. **You need to use the value several times** - the generator is exhausted after the first use

**Practical example:**

\`\`\`python
# We read a large file line by line (generator)
def read_file_lines(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# We process the file line by line without loading the entire file into memory
for line in read_file_lines('large_file.txt'):
    process(line) # We process one line at a time
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we learned the basics of generators:

**Key Concepts:**

1. **Generators** are a special type of functions that generate values one at a time
2. **yield** is the keyword for generating generators
3. **Memory savings** - generators do not store all values in memory
4. **Lazy evaluation** - values are generated only when needed

**Syntax:**

\`\`\`python
def generator_function():
    yield value
\`\`\`

**Usage:**

- \`next(gen)\` - get the next value
- \`for value in gen:\` - iterate over the generator
- \`list(gen)\` - convert to a list (loses benefits)

**Next step:**

In the next lesson, we will learn about generator expressions and more complex examples of using yield.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "A simple generator",
      code: `def simple_generator():
    yield 1
    yield 2
    yield 3

# Usage
gen = simple_generator()
print(next(gen)) # 1
print(next(gen)) # 2
print(next(gen)) # 3`,
      explanation: "The simplest example of a generator that generates three values."
    },
    {
      title: "Generator in the for loop",
      code: `def count_to_five():
    for i in range(1, 6):
        yield i

# Use in a loop
for number in count_to_five():
    print(number)
# Outputs: 1, 2, 3, 4, 5`,
      explanation: "A generator that uses a for loop to generate values. The most convenient way to use generators."
    },
    {
      title: "Even number generator",
      code: `def even_numbers(limit):
    """Generates even numbers up to limit"""
    for i in range(0, limit, 2):
        yield i

# Usage
for num in even_numbers(10):
    print(num)
# Outputs: 0, 2, 4, 6, 8`,
      explanation: "A generator with a parameter that generates even numbers up to a given limit."
    },
    {
      title: "Comparison with list",
      code: `# Normal function (creates a list)
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
numbers_list = create_list(1000) # Creates the entire list
gen = generate_numbers(1000) # Generates only the generator`,
      explanation: "Demonstrates the difference between creating a list and a generator. The generator saves memory."
    },
    {
      title: "A generator with a condition",
      code: `def divisible_by(n, limit):
    """Generates numbers that are divisible by n"""
    for i in range(limit):
        if i % n == 0:
            yield i

# Usage
for num in divisible_by(3, 20):
    print(num)
# Outputs: 0, 3, 6, 9, 12, 15, 18`,
      explanation: "A generator that uses a condition to filter values."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusion between return and yield",
      explanation: "Beginners often use return instead of yield in generators.",
      correctApproach: `# Incorrect:
def generator():
    return 1 # This is a regular function, not a generator

# Correct:
def generator():
    yield 1 # This is a generator`
    },
    {
      mistake: "Attempting to use the generator multiple times",
      explanation: "The generator runs out after the first use.",
      correctApproach: `# Incorrect:
gen = count_to_three()
list1 = list(gen) # Uses the generator
list2 = list(gen) # Empty list! The generator is already exhausted

# Correct:
gen1 = count_to_three()
gen2 = count_to_three() # Create a new generator
list1 = list(gen1)
list2 = list(gen2)`
    },
    {
      mistake: "Forgetting that the generator is not executed immediately",
      explanation: "Calling the generator function does not execute the code, but only creates the generator object.",
      correctApproach: `# Misunderstanding:
def generator():
    print("Running")
    yield 1

gen = generator() # Will not output anything! The function has not yet been executed
print(next(gen)) # Now execute and output: "Executing" and "1"`
    },
    {
      mistake: "Converting a generator to a list is unnecessary",
      explanation: "Converting a generator to a list loses the benefits of a generator (saving memory).",
      correctApproach: `# False (unless access to all values is required):
gen = generate_numbers(1000000)
numbers = list(gen) # We lose the advantages of the generator

# Correct:
gen = generate_numbers(1000000)
for number in gen: # We process one at a time
    process(number)`
    }
  ],
  
  summary: `In this lesson, we learned the basics of generators:

1. What are generators - a special type of functions that generate values one at a time
2. Yield syntax - how to create generator functions
3. Using generators - through next(), the for loop, or list()
4. The advantages of generators are memory savings, speed, and the ability to create endless sequences
5. Comparison with normal functions - when to use generators

Generators are a powerful tool for working with large amounts of data and creating efficient iterators.`,
  
  practiceTask: {
    title: "Creation of generators",
    description: "Create multiple generators for different sequences",
    problemStatement: `Create three generator functions:

1. **square_numbers(n)** - generates squares of numbers from 1 to n
   - Example: for n=5 should generate: 1, 4, 9, 16, 25

2. **countdown(start)** - generates numbers from start to 1 (inclusive)
   - Example: for start=5 should generate: 5, 4, 3, 2, 1

3. **multiples_of(m, limit)** - generates multiples of m up to limit
   - Example: for m=3, limit=20 should generate: 3, 6, 9, 12, 15, 18

**Requirements:**
- Use yield to create generators
- Each function must have a docstring with a description
- Test each generator by outputting the value through a for loop

**Note:** Do not use input(). Enter values directly in the code for testing.`,
    outputFormat: `Output example:

=== Squares of numbers ===
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

=== Multiple numbers ===
3
6
9
12
15
18`,
    examples: [
      {
        output: `=== Squares of numbers ===
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

=== Multiple numbers ===
3
6
9
12
15
18`,
        explanation: "Demonstrates the operation of all three generators with different parameters."
      }
    ],
    solution: {
      code: `# Number square generator
def square_numbers(n):
    """
    Generates squares of numbers from 1 to n
    """
    for i in range(1, n + 1):
        yield i ** 2

# Countdown generator
def countdown(start):
    """
    Generates numbers from start to 1 (inclusive)
    """
    for i in range(start, 0, -1):
        yield i

# Multiple number generator
def multiples_of(m, limit):
    """
    Generates multiples of m up to limit
    """
    for i in range(m, limit, m):
        yield i

# Testing
print("=== Squares of numbers ===")
for num in square_numbers(5):
    print(num)
print()
print("=== Countdown ===")
for num in countdown(5):
    print(num)
print()
print("=== Multiple numbers ===")
for num in multiples_of(3, 20):
    print(num)`,
      explanation: "The solution creates three generator functions using yield. Each function generates values one at a time, saving memory. We use the for loop to iterate through the generators."
    },
    hints: [
      "Use yield instead of return to create generators",
      "For square_numbers use a for loop with range(1, n+1) and square",
      "For countdown use range(start, 0, -1) to count down",
      "For multiples_of, use range(m, limit, m) to generate multiples",
      "Don't forget to add a docstring to each function"
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
          "A special type of function that generates values one at a time",
          "List with all values",
          "A variable that stores a value",
          "Operator for loops"
        ],
        correctAnswer: 0,
        explanation: "A generator is a special type of function that uses yield to generate values one at a time without generating all the values at once."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What keyword is used to create generators?",
        options: [
          "yield",
          "return",
          "generate",
          "create"
        ],
        correctAnswer: 0,
        explanation: "The yield keyword is used to create generators. It suspends the execution of the function and returns a value."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main advantage of generators?",
        options: [
          "Saving memory",
          "Execution speed",
          "Code simplicity",
          "All the listed options"
        ],
        correctAnswer: 3,
        explanation: "Generators have many advantages: saving memory, speed (lazy evaluation), code simplicity and the ability to create infinite sequences."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\\n\\n```python\\ndef gen():\\n yield 1\\n yield 2\\n\\ngen = gen()\\nprint(next(gen))\\nprint(next(gen))\\n```",
        options: [
          "1, then 2",
          "2, then 1",
          "Error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "The generator generates values one at a time. The first next() will return 1, the second next() will return 2."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between yield and return?",
        options: [
          "yield suspends the function and saves the state, return terminates the function",
          "return suspends the function, yield terminates",
          "There is no difference",
          "yield only works with numbers"
        ],
        correctAnswer: 0,
        explanation: "yield suspends function execution, returns a value, and saves the state to continue. return completes the function and returns the value."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What happens if next() is called after the generator is exhausted?",
        options: [
          "A StopIteration error will occur",
          "Will return None",
          "Returns the last value",
          "Will continue from the first value"
        ],
        correctAnswer: 0,
        explanation: "When the generator is exhausted (all values have been generated), calling next() will throw a StopIteration exception."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can the generator be used multiple times?",
        options: [
          "No, the generator runs out after the first use",
          "Yes, you can use it many times",
          "Only if converted into a list",
          "Only for infinite generators"
        ],
        correctAnswer: 0,
        explanation: "The generator runs out after the first use. To reuse, you need to create a new generator."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "The generator function is executed immediately when called.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "False. The generator function is not executed immediately. It returns a generator object that is executed when calling next() or in a for loop."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

