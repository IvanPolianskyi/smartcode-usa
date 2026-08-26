/** 
* Lesson 07-4: Practice: generators in practice 
* Full educational content*/

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
- Improve programming skills 

**Remember:** the generator can only be passed **once**; for reuse, create a new one or save in list().`
      },
      {
        title: "Typical mistakes with generators",
        content: `- **Second pass:** \`gen = (x for x in data); list(gen); list(gen)\` → the second list is empty 
- **Forget yield:** a function with return instead of yield is not a generator 
- **Excessive list():** \`list(huge_generator)\` removes the advantage of saving memory 
- **Mixing return and yield** in one function makes it difficult to read; better to separate 

**When list is better:** Access by index or multiple passes over the same data is required.`
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

**Alternative solution with generator expression:** 

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
**Memory saving** - when efficiency is important 

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

1. **Generators** - functions with yield that generate values one at a time 
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
    problemStatement: `Create a pipeline: 
read_numbers → square → filter_positive → multiply(factor) → limit_results(max_count) 

Read from stdin: limit factor max_count 
Pipeline: numbers 0..limit-1 → square → >0 → *factor → first max_count 

Input format: 
10 2 5`,
    outputFormat: `=== Data processing pipeline === 
Result 1: 2 
Result 2: 8 
Result 3: 18 
Result 4: 32 
Result 5: 50`,
    examples: [
      {
        input: `10 2 5`,
        output: `=== Data processing pipeline === 
Result 1: 2 
Result 2: 8 
Result 3: 18 
Result 4: 32 
Result 5: 50`,
        explanation: "1²*2, 2²*2, … limited to 5 results"
      },
      {
        input: `5 3 3`,
        output: `=== Data processing pipeline === 
Result 1: 3 
Result 2: 12 
Result 3: 27`,
        explanation: "factor=3, max_count=3"
      },
      {
        input: `4 1 2`,
        output: `=== Data processing pipeline === 
Result 1: 1 
Result 2: 4`,
        explanation: "factor=1, only 2 results"
      }
    ],
    solution: {
      code: `def read_numbers(limit):
    """Generates numbers from 0 to limit-1"""
    for i in range(limit):
        yield i

def square(numbers):
    """Squaring each number"""
    for num in numbers:
        yield num ** 2

def filter_positive(numbers):
    """Filters only positive numbers"""
    for num in numbers:
        if num > 0:
            yield num

def multiply(numbers, factor):
    """Multiplies each number by factor"""
    for num in numbers:
        yield num * factor

def limit_results(numbers, max_count):
    """Limits the number of results"""
    count = 0
    for num in numbers:
        if count >= max_count:
            break
        yield num
        count += 1

limit, factor, max_count = map(int, input().split())

print("=== Data processing pipeline ===")
pipeline = limit_results(
    multiply(
        filter_positive(
            square(
                read_numbers(limit)
            )
        ),
        factor
    ),
    max_count
)

for i, result in enumerate(pipeline, 1):
    print(f"Result {i}: {result}")`,
      explanation: "A pipeline of five generators; limit, factor, max_count from stdin."
    },
    hints: [
      "Read three numbers: limit, factor, max_count",
      "Each generator takes the previous one as an argument",
      "filter_positive only passes num > 0",
      "limit_results stops after max_count items"
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
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What happens after the generator is completely consumed?",
        options: [
          "The next next() will call StopIteration",
          "Will return None forever without exception",
          "The generator will restart itself",
          "MemoryError error always"
        ],
        correctAnswer: 0,
        explanation: "After the last yield, the generator terminates with StopIteration."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
