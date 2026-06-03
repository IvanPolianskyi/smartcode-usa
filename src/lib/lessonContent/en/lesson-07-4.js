/**
 * Lesson 07-4: Practice: generators in action
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_07_4 = {
  lessonId: "lesson-07-4",
  moduleId: "module-07",
  order: 4,
  title: "Practice: generators in action",
  
  learningObjectives: [
    "Reinforce knowledge of generators and iterators",
    "Build complex generators for real tasks",
    "Optimize code with generators",
    "Combine different generator techniques"
  ],
  
  prerequisites: ["lesson-07-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Review of what you learned",
        content: `In this lesson we reinforce everything from module 07 about generators:

What we covered:
1. Introduction to generators - what they are, yield, benefits
2. Generator expressions and yield from - compact syntax, delegation
3. Iterators and the iteration protocol - __iter__(), __next__(), custom iterators
4. Practical examples - different ways to use generators

Goals of this lesson:
- Combine all concepts
- Build more complex generators
- Solve practical problems
- Improve your programming skills

**Remember:** you can iterate a generator only **once**; to reuse it, create a new one or store results in list().`
      },
      {
        title: "Common generator mistakes",
        content: `- **Second pass:** \`gen = (x for x in data); list(gen); list(gen)\` → the second list is empty
- **Forgetting yield:** a function with return instead of yield is not a generator
- **Excessive list():** \`list(huge_generator)\` removes the memory-saving benefit
- **Mixing return and yield** in one function — harder to read; split them instead

**When list() is better:** you need indexing or multiple passes over the same data.`
      },
      {
        title: "Problem 1: Data processing generator",
        content: `**Task:** Create a generator that processes a list of numbers and yields only those that satisfy a condition.

**Solution:**

\`\`\`python
def filter_numbers(numbers, condition):
    """
    Yields numbers that satisfy the condition
    """
    for num in numbers:
        if condition(num):
            yield num

# Usage
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Even numbers
evens = filter_numbers(numbers, lambda x: x % 2 == 0)
print(list(evens))  # [2, 4, 6, 8, 10]

# Numbers greater than 5
large = filter_numbers(numbers, lambda x: x > 5)
print(list(large))  # [6, 7, 8, 9, 10]
\`\`\`

**Improved version with a generator expression:**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = (x for x in numbers if x % 2 == 0)
print(list(evens))  # [2, 4, 6, 8, 10]
\`\`\`
`
      },
      {
        title: "Problem 2: Combining sequences",
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
print(list(combined))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

**Alternative without yield from:**

\`\`\`python
def combine_sequences(*sequences):
    for seq in sequences:
        for item in seq:
            yield item
\`\`\`
`
      },
      {
        title: "Problem 3: Batch processing generator",
        content: `**Task:** Create a generator that processes data in batches.

**Solution:**

\`\`\`python
def batch_processor(items, batch_size):
    """
    Processes items in batches of the given size
    """
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == batch_size:
            yield batch
            batch = []
    if batch:
        yield batch

# Usage
numbers = list(range(1, 11))  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for batch in batch_processor(numbers, 3):
    print(batch)
# Prints:
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]
# [10]
\`\`\`

**Practical use:**

\`\`\`python
large_list = list(range(1000))

for batch in batch_processor(large_list, 100):
    process_batch(batch)  # Process 100 items at a time
\`\`\`
`
      },
      {
        title: "Problem 5: Composing generators",
        content: `**Task:** Build a pipeline of several generators for data processing.

**Solution:**

\`\`\`python
def read_numbers(limit):
    """Generates numbers"""
    for i in range(limit):
        yield i

def square(numbers):
    """Squares each number"""
    for num in numbers:
        yield num ** 2

def filter_even(numbers):
    """Keeps even numbers"""
    for num in numbers:
        if num % 2 == 0:
            yield num

def multiply(numbers, factor):
    """Multiplies by factor"""
    for num in numbers:
        yield num * factor

# Compose generators
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
# Prints: 0, 8, 32, 72, 128, 200
# Explanation: squares of even numbers, multiplied by 2
\`\`\`

**Benefits of this approach:**

1. **Modularity** - each generator does one job
2. **Memory efficiency** - process one element at a time
3. **Flexibility** - easy to add or remove steps
4. **Readability** - code is easy to follow`
      },
      {
        title: "Practical tips",
        content: `**When to use generators:**

 **Large data** - when you should not load everything into memory
 **Streaming** - when data is processed one element at a time
 **Infinite sequences** - when values are generated without end
 **Processing pipelines** - when data passes through several steps
 **Memory savings** - when efficiency matters

**Best practices:**

1. **Use generator expressions** for simple cases
2. **Use generator functions** for more complex logic
3. **Use yield from** to compose generators
4. **Limit infinite generators** when using them
5. **Do not convert to list** unless needed
6. **Document generators** like regular functions

**Avoid:**

 Converting generators to lists without need
 Using the same generator twice (create new ones)
 Infinite generators without limits
 Overly complex generator expressions (prefer a function)`
      },
      {
        title: "Module summary",
        content: `In this module we learned generators and iterators:

**Key concepts:**

1. **Generators** - functions with yield that produce values one at a time
2. **Generator expressions** - compact syntax (x**2 for x in range(10))
3. **yield from** - delegate generation to other generators
4. **Iterators** - objects with __iter__() and __next__()
5. **Iteration protocol** - rules for iterable objects

**Benefits:**

- Memory efficiency
- Speed (lazy evaluation)
- Infinite sequences
- Simple, readable code

**Applications:**

- Processing large files
- Data pipelines
- Custom iterators
- Code optimization

Generators and iterators are powerful tools for efficient, elegant Python code!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Composing generators",
      code: `def read_numbers(limit):
    for i in range(limit):
        yield i

def square(numbers):
    for num in numbers:
        yield num ** 2

def filter_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            yield num

pipeline = filter_even(square(read_numbers(10)))
for result in pipeline:
    print(result)
# Prints: 0, 4, 16, 36, 64`,
      explanation: "Demonstrates composing generators into a data processing pipeline."
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

numbers = list(range(1, 11))
for batch in batch_processor(numbers, 3):
    print(batch)
# Prints: [1, 2, 3], [4, 5, 6], [7, 8, 9], [10]`,
      explanation: "A generator for batch processing, useful for large datasets."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Converting generators to lists unnecessarily",
      explanation: "This loses the memory benefits of generators.",
      correctApproach: `# Wrong (if you do not need a list):
gen = (x**2 for x in range(1000000))
lst = list(gen)  # Loses benefits

# Right:
gen = (x**2 for x in range(1000000))
for square in gen:
    process(square)`
    },
    {
      mistake: "Using a generator more than once",
      explanation: "A generator is exhausted after the first use.",
      correctApproach: `# Wrong:
gen = (x**2 for x in range(10))
list1 = list(gen)
list2 = list(gen)  # Empty!

# Right:
numbers = range(10)
list1 = list(x**2 for x in numbers)
list2 = list(x**2 for x in numbers)`
    }
  ],
  
  summary: `In this practice lesson we:

1. Reinforced knowledge - reviewed generators and iterators
2. Built complex generators - filtering, batching, composition
3. Solved practical problems - real usage scenarios
4. Learned best practices - when and how to use generators

You can now confidently create and use generators and iterators in your projects!`,
  
  practiceTask: {
    title: "Building a data processing pipeline",
    description: "Create a system of generators to process data through several steps",
    problemStatement: `Create a data processing pipeline with these steps:

1. **read_numbers(limit)** - generator that yields numbers from 0 to limit-1

2. **square(numbers)** - generator that squares each number

3. **filter_positive(numbers)** - generator that keeps only positive numbers (greater than 0)

4. **multiply(numbers, factor)** - generator that multiplies each number by factor

5. **limit_results(numbers, max_count)** - generator that limits the number of results

**Task:**
- Create all generators
- Combine them: read → square → filter_positive → multiply(2) → limit(5)
- Print processing results for limit=10

**Requirements:**
- Each generator takes the previous generator as an argument
- Use yield to create generators
- Hard-code values in the code (do not use input())`,
    outputFormat: `Example output:

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
        explanation: "Shows the pipeline: numbers are generated, squared, filtered, multiplied, and limited."
      }
    ],
    solution: {
      code: `# 1. Number generator
def read_numbers(limit):
    """Generates numbers from 0 to limit-1"""
    for i in range(limit):
        yield i

# 2. Square generator
def square(numbers):
    """Squares each number"""
    for num in numbers:
        yield num ** 2

# 3. Filter generator
def filter_positive(numbers):
    """Keeps only positive numbers"""
    for num in numbers:
        if num > 0:
            yield num

# 4. Multiply generator
def multiply(numbers, factor):
    """Multiplies each number by factor"""
    for num in numbers:
        yield num * factor

# 5. Limit generator
def limit_results(numbers, max_count):
    """Limits the number of results"""
    count = 0
    for num in numbers:
        if count >= max_count:
            break
        yield num
        count += 1

# Build the pipeline
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

for i, result in enumerate(pipeline, 1):
    print(f"Result {i}: {result}")`,
      explanation: "The solution builds a pipeline of five generators that process data sequentially. Each generator takes the previous one as input and processes one element at a time, saving memory."
    },
    hints: [
      "Start with read_numbers — it simply yields numbers",
      "square takes numbers as an argument and loops with for",
      "filter_positive checks num > 0 before yield",
      "multiply multiplies num by factor before yield",
      "limit_results keeps a counter and stops at max_count",
      "Chain generators by passing one into another"
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
          "A sequence of generators that process data in order",
          "A list of generators",
          "A single generator",
          "A function for generators"
        ],
        correctAnswer: 0,
        explanation: "A generator pipeline is a chain where each step processes output from the previous one."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the main benefit of generators in a pipeline?",
        options: [
          "Memory savings and one-element-at-a-time processing",
          "Execution speed",
          "Code simplicity",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Generators in a pipeline save memory, process lazily, and keep code simple."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "When should you use generator functions instead of generator expressions?",
        options: [
          "For more complex logic with many conditions",
          "For simple transforms",
          "Always use expressions",
          "Never use functions"
        ],
        correctAnswer: 0,
        explanation: "Generator functions are better for complex logic when expressions become unreadable."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Generators can be used to process nested data structures.",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 0,
        explanation: "True. Generators can use yield from recursively, e.g. to flatten nested lists."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens after a generator is fully consumed?",
        options: [
          "The next next() raises StopIteration",
          "It returns None forever without an exception",
          "The generator restarts itself",
          "MemoryError always"
        ],
        correctAnswer: 0,
        explanation: "After the last yield the generator ends with StopIteration."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
