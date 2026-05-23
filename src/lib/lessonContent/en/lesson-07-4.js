/**
 * Lesson 07-4: Practice: generators in action
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_07_4 = {
  lessonId: "lesson-07-4",
  moduleId: "module-07",
  order: 4,
  title: "Practice: generators in practice",
  
  learningObjectives: [
    "Consolidate knowledge about generators and iterators",
    "Create complex generators for real problems",
    "Optimize code using generators",
    "Combine different techniques of working with generators"
  ],
  
  prerequisites: ["lesson-07-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Overview of the studied",
        content: `In this lesson, we will consolidate all knowledge from module 07 about generators:

What we learned:
1. Introduction to generators - what are generators, yield, advantages
2. Generating expressions and yield from - compact syntax, delegation
3. Iterators and iteration protocol - __iter__(), __next__(), creation of own iterators
4. Practical examples - different ways of using generators

The purpose of this lesson:
- Combine all concepts
- Create more complex generators
- Solve practical problems
- Improve programming skills`
      },
      {
        title: "Task 1: Generator for data processing",
        content: `**Assignment:** Create a generator that processes a list of numbers and returns only those that satisfy a condition.

**Solution:**

\`\`\`python
def filter_numbers(numbers, condition):
    """
    Generates numbers that satisfy the condition
    """
    for number in numbers:
        if condition(num):
            yield num

# Usage
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Even numbers
evens = filter_numbers(numbers, lambda x: x % 2 == 0)
print(list(evens)) # [2, 4, 6, 8, 10]

# Numbers greater than 5
large = filter_numbers(numbers, lambda x: x > 5)
print(list(large)) # [6, 7, 8, 9, 10]
\`\`\`

**Improved version with generator expression:**

\`\`\`python
# The same, but with a generator expression
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = (x for x in numbers if x % 2 == 0)
print(list(evens)) # [2, 4, 6, 8, 10]
\`\`\``
      },
      {
        title: "Task 2: Generator for combining sequences",
        content: `**Task:** Create a generator that combines several sequences into one.

**Solution:**

\`\`\`python
def combine_sequences(*sequences):
    """
    Combines several sequences into one
    """
    for seq in sequences:
        yield from seq

# Usage
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

combined = combine_sequences(list1, list2, list3)
print(list(combined)) # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

**An alternative solution with a generator expression:**

\`\`\`python
def combine_sequences(*sequences):
    for seq in sequences:
        for item in seq:
            yield item
\`\`\``
      },
      {
        title: "Task 3: Generator for batch processing",
        content: `**Task:** Create a generator that processes data in batches.

**Solution:**

\`\`\`python
def batch_processor(items, batch_size):
    """
    Processes elements in batches of a given size
    """
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == batch_size:
            yield batch
            batch = []
    # We return the balance, if there is one
    if batch:
        yield batch

# Usage
numbers = list(range(1, 11)) # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for batch in batch_processor(numbers, 3):
    print(batch)
# Outputs:
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]
# [10]
\`\`\`

**Practical application:**

\`\`\`python
# Batch processing of a large list
large_list = list(range(1000))

for batch in batch_processor(large_list, 100):
    process_batch(batch) # We process 100 elements
\`\`\``
      },
      {
        title: "Task 5: Composition of generators",
        content: `**Task:** Create a pipeline of several generators to process data.

**Solution:**

\`\`\`python
def read_numbers(limit):
    """Generates numbers"""
    for i in range(limit):
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

def multiply(numbers, factor):
    """Multiply by a factor"""
    for number in numbers:
        yield num * factor

# Composition of generators
pipeline = multiply(
    filter_even(
        square(
            read_numbers(10)
        )
    ),
    2
)

for result in pipeline:
    print(result)
# Outputs: 0, 8, 32, 72, 128, 200
# Explanation: Squares of even numbers multiplied by 2
\`\`\`

**Advantages of this approach:**

1. **Modularity** - each generator performs one task
2. **Memory savings** - processing one element at a time
3. **Flexibility** - easily add or remove steps
4. **Readability** - the code is easy to understand`
      },
      {
        title: "Practical advice",
        content: `**When to use generators:**

 **Large amounts of data** - when you don't need to load everything into memory
 **Stream processing** - when data is processed one element at a time
 **Infinite sequences** - when you need to generate values without end
 **Processing pipelines** - when you need to process data after several steps
 **Memory savings** - when efficiency is important

**Best practices:**

1. **Use generator expressions** for simple cases
2. **Use generator functions** for more complex logic
3. **Use yield from** to compose generators
4. **Limit infinite generators** when using
5. **Don't turn into a list** unnecessarily
6. **Document generators** just like functions

**Avoid:**

 Converting generators to lists is unnecessary
 Using generators multiple times (create new ones)
 Infinite generators with no limits
 Generator expressions are too complex (a function is better)`
      },
      {
        title: "Summary of the module",
        content: `In this module we studied generators and iterators:

**Key Concepts:**

1. **Generators** - functions with yield that generate values one by one
2. **Generator expressions** - compact syntax (x**2 for x in range(10))
3. **yield from** - delegation of generation to other generators
4. **Iterators** - objects with __iter__() and __next__()
5. **Iteration protocol** - rules for creating iterable objects

**Advantages:**

- Saving memory
- Speed (lazy evaluation)
- Ability to create endless sequences
- Code simplicity and readability

**Application:**

- Processing of large files
- Data processing pipelines
- Creation of own iterators
- Code optimization

Generators and iterators are powerful tools for creating efficient and elegant code in Python!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Composition of generators",
      code: `def read_numbers(limit):
    for i in range(limit):
        yield i

def square(numbers):
    for number in numbers:
        yield number ** 2

def filter_even(numbers):
    for number in numbers:
        if num % 2 == 0:
            yield num

# Composition
pipeline = filter_even(square(read_numbers(10)))
for result in pipeline:
    print(result)
# Outputs: 0, 4, 16, 36, 64`,
      explanation: "Demonstrates the composition of generators to create a data processing pipeline."
    },
    {
      title: "Batch processing",
      code: `def batch_processor(items, batch_size):
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == batch_size:
            yield batch
            batch = []
    if batch:
        yield batch

# Usage
numbers = list(range(1, 11))
for batch in batch_processor(numbers, 3):
    print(batch)
# Outputs: [1, 2, 3], [4, 5, 6], [7, 8, 9], [10]`,
      explanation: "Generator for processing data in batches, which is useful for large volumes of data."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Converting generators to lists is unnecessary",
      explanation: "This loses the advantages of generators (saving memory).",
      correctApproach: `# False (if no list is needed):
gen = (x**2 for x in range(1000000))
lst = list(gen) # We lose the benefits

# Correct:
gen = (x**2 for x in range(1000000))
for square in gen: # We process one at a time
    process(square)`
    },
    {
      mistake: "Using generators multiple times",
      explanation: "The generator runs out after the first use.",
      correctApproach: `# Incorrect:
gen = (x**2 for x in range(10))
list1 = list(gen) # Uses the generator
list2 = list(gen) # Empty!

# Correct:
numbers = range(10)
list1 = list(x**2 for x in numbers) # Create a new generator
list2 = list(x**2 for x in numbers) # Create a new generator`
    }
  ],
  
  summary: `In this practical lesson we will:

1. Consolidated knowledge - repeated all concepts of generators and iterators
2. We created complex generators - for data processing, batch processing, compositions
3. Solved practical problems - real scenarios of use
4. Learned best practices - when and how to use generators

Now you can confidently create and use generators and iterators in your projects!`,
  
  practiceTask: {
    title: "Creating a data processing pipeline",
    description: "Create a generator system for processing data in a few steps",
    problemStatement: `Create a data processing pipeline with the following steps:

1. **read_numbers(limit)** - a generator that generates numbers from 0 to limit-1

2. **square(numbers)** - a generator that raises each number to a square

3. **filter_positive(numbers)** - a generator that filters only positive numbers (more than 0)

4. **multiply(numbers, factor)** - a generator that multiplies each number by a factor

5. **limit_results(numbers, max_count)** - a generator that limits the number of results

**Task:**
- Create all generators
- Combine them into a pipeline: read → square → filter_positive → multiply(2) → limit(5)
- Output processing results for limit=10

**Requirements:**
- Each generator must take the previous generator as an argument
- Use yield to create generators
- Enter values directly in code (don't use input())`,
    outputFormat: `Output example:

=== Data processing pipeline ===
Result 1: 2
Result 2: 8
Result 3: 18
Result 4: 32
Result 5: 50`,
    examples: [
      {
        output: `=== Data processing pipeline ===
Result 1: 2
Result 2: 8
Result 3: 18
Result 4: 32
Result 5: 50`,
        explanation: "Demonstrates how the pipeline works: numbers are generated, squared, filtered, multiplied, and limited."
      }
    ],
    solution: {
      code: `# 1. Number generator
def read_numbers(limit):
    """Generates numbers from 0 to limit-1"""
    for i in range(limit):
        yield i

# 2. Generator of squares
def square(numbers):
    """Squaring each number"""
    for number in numbers:
        yield number ** 2

# 3. Filter generator
def filter_positive(numbers):
    """Filters only positive numbers"""
    for number in numbers:
        if num > 0:
            yield num

# 4. Multiplication generator
def multiply(numbers, factor):
    """Multiplies each number by factor"""
    for number in numbers:
        yield num * factor

# 5. Limit generator
def limit_results(numbers, max_count):
    """Limits the number of results"""
    count = 0
    for number in numbers:
        if count >= max_count:
            break
        yield num
        count += 1

# We create a pipeline
print("=== Data processing pipeline ===")
pipeline = limit_results(
    multiply(
        filter_positive(
            square(
                read_numbers(10)
            )
        ),
        2
    ),
    5
)

# Output the results
for i, result in enumerate(pipeline, 1):
    print(f"Result {i}: {result}")`,
      explanation: "The solution creates a pipeline of five generators that process data sequentially. Each generator takes the previous one as an argument and processes the data one element at a time, saving memory."
    },
    hints: [
      "Start with read_numbers - it just generates numbers via yield",
      "square takes numbers as an argument and uses a for loop to iterate",
      "filter_positive checks for the condition num > 0 before yield",
      "multiply multiplies num by factor before yield",
      "limit_results keeps a counter and stops when max_count is reached",
      "Combine generators into a pipeline, passing one to another"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a generator pipeline?",
        options: [
          "A sequence of generators that process data in turn",
          "List of generators",
          "One generator",
          "Function for generators"
        ],
        correctAnswer: 0,
        explanation: "A pipeline of generators is a sequence of generators where each one processes data from the previous one, creating an efficient processing system."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main advantage of using generators in a pipeline?",
        options: [
          "Saving memory and processing one element at a time",
          "Execution speed",
          "Code simplicity",
          "All the listed options"
        ],
        correctAnswer: 3,
        explanation: "Generators in the pipeline have many advantages: saving memory, processing one element at a time, speed and simplicity of the code."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When is it better to use generator functions instead of generator expressions?",
        options: [
          "For more complex logic with many conditions",
          "For simple transformations",
          "Always use expressions",
          "Never use functions"
        ],
        correctAnswer: 0,
        explanation: "Generator functions are best used for more complex logic when generator expressions become unreadable."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Generators can be used to handle nested data structures.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "True. Generators can be used recursively with yield from to handle nested structures, for example to align lists."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
