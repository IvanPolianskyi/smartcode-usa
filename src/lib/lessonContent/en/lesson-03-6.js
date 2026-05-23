/**
 * Lesson 03-6: Lambda functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_03_6 = {
  lessonId: "lesson-03-6",
  moduleId: "module-03",
  order: 6,
  title: "Lambda functions",
  
  learningObjectives: [
    "Understand what lambda functions are and when to use them",
    "Use map() to apply a function to every element",
    "Use filter() to filter elements",
    "Combine lambda with map() and filter()",
    "Understand the advantages and limitations of lambda functions"
  ],
  
  prerequisites: ["lesson-03-5"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are lambda functions?",
        content: `Lambda functions (also called anonymous functions) let you create short functions without using \`def\`.

**Main idea:**

Instead of a full function:
\`\`\`python
def square(x):
    return x ** 2
\`\`\`

You can write:
\`\`\`python
square = lambda x: x ** 2
\`\`\`

**Syntax:**

\`\`\`python
lambda arguments: expression
\`\`\`

**Example:**

\`\`\`python
def add(a, b):
    return a + b

add = lambda a, b: a + b

print(add(5, 3))  # 8
\`\`\`

**Key features:**

1. **Lambda is an expression, not a block**
   - Only one expression allowed
   - No multiple lines or complex logic

2. **Anonymous**
   - No name required (though you can assign to a variable)
   - Often used inline

3. **When to use:**
   - Simple one-off operations
   - With \`map()\`, \`filter()\`, \`sorted()\`
   - Short transforms that do not need a full \`def\``
      },
      {
        title: "The map() function",
        content: `\`map()\` applies a function to each item in an iterable and returns an iterator of results.

**Syntax:**

\`\`\`python
map(function, iterable)
\`\`\`

**With a regular function:**

\`\`\`python
def square(x):
    return x ** 2

numbers = [1, 2, 3, 4, 5]
squared = map(square, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]
\`\`\`

**With lambda:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x ** 2, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]
\`\`\`

**Important:** \`map()\` returns an iterator - use \`list()\` to get a list.

**More examples:**

\`\`\`python
names = ["alex", "maria", "john"]
capitalized = list(map(lambda name: name.capitalize(), names))
# ["Alex", "Maria", "John"]

numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

texts = ["  hello  ", "  world  ", "  python  "]
cleaned = list(map(lambda text: text.strip().upper(), texts))
# ["HELLO", "WORLD", "PYTHON"]
\`\`\``
      },
      {
        title: "The filter() function",
        content: `\`filter()\` keeps only items for which the function returns \`True\`.

**Syntax:**

\`\`\`python
filter(function, iterable)
\`\`\`

The function must return \`True\` or \`False\`.

**With a regular function:**

\`\`\`python
def is_even(num):
    return num % 2 == 0

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = filter(is_even, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]
\`\`\`

**With lambda:**

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))  # [0, 2, 4, 6, 8, 10]
\`\`\`

**More examples:**

\`\`\`python
words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))
# ["Python", "great", "programming"]

numbers = [10, 15, 20, 25, 30, 35, 40]
large_numbers = list(filter(lambda x: x > 20, numbers))
# [25, 30, 35, 40]

texts = ["Python", "Java", "JavaScript", "C++", "Pythonista"]
python_texts = list(filter(lambda text: "Python" in text, texts))
# ["Python", "Pythonista"]

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = list(filter(lambda x: x % 2 == 0 and x > 5, numbers))
# [6, 8, 10]
\`\`\``
      },
      {
        title: "Combining lambda with map() and filter()",
        content: `You can chain \`map()\` and \`filter()\` for richer operations.

**Example 1: Filter then transform**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# [4, 16, 36, 64, 100]
\`\`\`

**Example 2: Transform then filter**

\`\`\`python
words = ["  python  ", "  java  ", "  c++  ", "  javascript  "]
cleaned_long = list(filter(lambda x: len(x) > 3, map(lambda x: x.strip(), words)))
# ["python", "javascript"]
\`\`\`

**Example 3: Complex pipeline**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = list(map(lambda x: x * 2, filter(lambda x: x > 5, numbers)))
# [12, 14, 16, 18, 20]
\`\`\`

**List comprehensions as an alternative:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]
result = [x ** 2 for x in numbers if x % 2 == 0]

# Equivalent to:
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
\`\`\`

**When to use what:**

- **map/filter + lambda** - functional style, passing functions as arguments
- **List comprehensions** - often clearer for simple cases`
      },
      {
        title: "Lambda with multiple arguments",
        content: `Lambda functions can take multiple arguments.

\`\`\`python
add = lambda a, b: a + b
print(add(5, 3))  # 8

multiply = lambda x, y: x * y
print(multiply(4, 5))  # 20
\`\`\`

**With map() and multiple iterables:**

\`\`\`python
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]

sums = list(map(lambda x, y: x + y, numbers1, numbers2))
# [11, 22, 33]

products = list(map(lambda x, y: x * y, numbers1, numbers2))
# [10, 40, 90]
\`\`\`

**Three arguments:**

\`\`\`python
average = lambda a, b, c: (a + b + c) / 3
print(average(10, 20, 30))  # 20.0

a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]
averages = list(map(lambda x, y, z: (x + y + z) / 3, a, b, c))
# [4.0, 5.0, 6.0]
\`\`\`

The number of lambda parameters must match the number of iterables passed to map().`
      },
      {
        title: "Limitations of lambda functions",
        content: `**1. Only one expression**

\`\`\`python
# Wrong:
complex_func = lambda x:
    if x > 0:
        return x * 2  # Error!

# Use def instead:
def complex_func(x):
    if x > 0:
        return x * 2
    else:
        return x
\`\`\`

**2. No assignment**

\`\`\`python
# Wrong:
assign = lambda x: y = x + 1  # Error!
\`\`\`

**3. No return keyword**

\`\`\`python
# Wrong:
square = lambda x: return x ** 2  # Error!

# Correct:
square = lambda x: x ** 2
\`\`\`

**4. Readability for complex logic**

Prefer a named function when logic grows:

\`\`\`python
def process_text(text):
    if len(text) > 5:
        return text.strip().upper().replace("PYTHON", "JAVA")
    else:
        return text.lower()

result = list(map(process_text, texts))
\`\`\`

**When NOT to use lambda:**

- Multi-line or complex logic
- When clarity matters most
- Functions reused many times`
      },
      {
        title: "Lambda with other built-ins",
        content: `**sorted() with key:**

\`\`\`python
words = ["Python", "is", "great", "for", "programming"]
sorted_words = sorted(words, key=lambda x: len(x))

pairs = [(1, 3), (2, 1), (3, 2)]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
\`\`\`

**max() and min():**

\`\`\`python
words = ["Python", "is", "great", "for", "programming"]
longest = max(words, key=lambda x: len(x))
shortest = min(words, key=lambda x: len(x))
\`\`\`

**Sorting users by age:**

\`\`\`python
users = [
    {"name": "Alex", "age": 20},
    {"name": "Maria", "age": 25},
    {"name": "John", "age": 18}
]

sorted_users = sorted(users, key=lambda user: user["age"])
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned lambda functions and their use with map() and filter():

**Key concepts:**

1. **Lambda** - \`lambda args: expression\`, single expression only
2. **map()** - apply a function to each element; returns an iterator
3. **filter()** - keep items where the function returns True
4. **Combining** - chain map and filter; use def for complex steps
5. **Limits** - no return, no assignment, one expression

**Next step:**

In the next lesson we will learn about variable scope - how Python finds names in your code.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Basic lambda example",
      code: `def square(x):
    return x ** 2

square_lambda = lambda x: x ** 2

print(square(5))
print(square_lambda(5))`,
      explanation: "Basic lambda syntax and equivalence to a def function."
    },
    {
      title: "map() with lambda",
      code: `numbers = [1, 2, 3, 4, 5]

squared = map(lambda x: x ** 2, numbers)
print(list(squared))

names = ["alex", "maria", "john"]
capitalized = list(map(lambda name: name.capitalize(), names))`,
      explanation: "Using map() with lambda to transform every element."
    },
    {
      title: "filter() with lambda",
      code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))

words = ["Python", "is", "great", "for", "programming"]
long_words = list(filter(lambda word: len(word) > 3, words))`,
      explanation: "Using filter() with lambda to keep items matching a condition."
    },
    {
      title: "Combining map() and filter()",
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even_squared = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
print(even_squared)`,
      explanation: "Filter evens, then square them."
    },
    {
      title: "Lambda with multiple arguments",
      code: `add = lambda a, b: a + b
print(add(5, 3))

numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
print(sums)`,
      explanation: "Lambda with two parameters and map() over two lists."
    },
    {
      title: "Lambda with sorted()",
      code: `words = ["Python", "is", "great", "for", "programming"]
sorted_words = sorted(words, key=lambda x: len(x))

users = [{"name": "Alex", "age": 20}, {"name": "Maria", "age": 25}]
sorted_users = sorted(users, key=lambda user: user["age"])`,
      explanation: "Using lambda as the key function in sorted()."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using return in lambda",
      explanation: "return is not allowed in lambda; the expression value is returned automatically.",
      correctApproach: `# Wrong:
square = lambda x: return x ** 2

# Correct:
square = lambda x: x ** 2`
    },
    {
      mistake: "Multiple lines in lambda",
      explanation: "Lambda can only contain a single expression.",
      correctApproach: `Use def for if/else blocks or multiple statements.`
    },
    {
      mistake: "Forgetting list() on map() and filter()",
      explanation: "map() and filter() return iterators, not lists.",
      correctApproach: `squared = list(map(lambda x: x ** 2, numbers))`
    },
    {
      mistake: "Lambda for complex operations",
      explanation: "Long lambdas are hard to read; use a named function instead.",
      correctApproach: `Define def process_text(text): ... then map(process_text, texts)`
    }
  ],
  
  summary: `In this lesson we learned lambda functions:

1. Lambda - anonymous one-expression functions
2. map() - transform each element (use list() for a list)
3. filter() - keep items where the predicate is True
4. Combining map and filter for pipelines
5. Limits - one expression, no return, prefer def when complex

Lambda functions are a useful tool for functional-style Python!`,
  
  practiceTask: {
    title: "Data processing with lambda, map, and filter",
    description: "Create functions that process data using lambda, map(), and filter()",
    problemStatement: `Write a program with these functions:

1. **process_numbers** - square all numbers with map() and lambda
2. **filter_even** - keep even numbers with filter() and lambda
3. **process_names** - capitalize names with map() and lambda
4. **filter_long_words** - words longer than min_length (default 5)
5. **complex_processing** - filter evens, then square them

**Important:** Do not use input(). Assign values in code.

Create several examples.`,
    outputFormat: `Example output:
Squared numbers: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Even numbers: [2, 4, 6, 8, 10]
Formatted names: ['Alex', 'Maria', 'John', 'Anna']
Squared evens: [4, 16, 36, 64, 100]`,
    examples: [
      {
        output: `Squared numbers: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Even numbers: [2, 4, 6, 8, 10]
Squared evens: [4, 16, 36, 64, 100]`,
        explanation: "Squaring, filtering evens, and combined processing."
      }
    ],
    solution: {
      code: `# Data processing with lambda, map, and filter

def process_numbers(numbers):
    return list(map(lambda x: x ** 2, numbers))

def filter_even(numbers):
    return list(filter(lambda x: x % 2 == 0, numbers))

def process_names(names):
    return list(map(lambda name: name.capitalize(), names))

def filter_long_words(words, min_length=5):
    return list(filter(lambda word: len(word) >= min_length, words))

def complex_processing(numbers):
    return list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squared = process_numbers(numbers)
print(f"Squared numbers: {squared}")

evens = filter_even(numbers)
print(f"Even numbers: {evens}")

complex_result = complex_processing(numbers)
print(f"Squared evens: {complex_result}")

print()

names = ["alex", "maria", "john", "anna"]
formatted_names = process_names(names)
print(f"Formatted names: {formatted_names}")

long_names = filter_long_words(formatted_names, min_length=5)
print(f"Long names (min_length=5): {long_names}")

print()

words = ["Python", "is", "great", "for", "programming"]
long_words = filter_long_words(words, min_length=4)
print(f"Long words (min_length=4): {long_words}")

print()

numbers2 = [5, 10, 15, 20, 25, 30]
filtered_multiplied = list(map(lambda x: x * 2, filter(lambda x: x > 15, numbers2)))
print(f"Numbers > 15, doubled: {filtered_multiplied}")`,
      explanation: "Uses lambda with map() and filter() for squaring, filtering, formatting, and chained operations."
    },
    hints: [
      "Assign values in code - do not use input()",
      "Wrap map() and filter() with list() to get a list",
      "For complex_processing: filter first, then map",
      "filter() lambdas must return True or False",
      "Use def for logic that is hard to read as a lambda"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        expectedOutput: "[1, 4, 9, 16, 25]",
        description: "Checking squaring"
      },
      {
        expectedOutput: "[2, 4, 6]",
        description: "Checking even filter"
      },
      {
        expectedOutput: "['Alex', 'Maria']",
        description: "Checking name formatting"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a lambda function?",
        options: [
          "An anonymous function that can contain only one expression",
          "A regular function defined with def",
          "An object method",
          "A data type"
        ],
        correctAnswer: 0,
        explanation: "A lambda is an anonymous function with a single expression, created without def."
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
        explanation: "map() returns an iterator. Use list(map(...)) to get a list."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x ** 2, numbers))\nprint(squared)\n```",
        options: [
          "[1, 4, 9, 16, 25]",
          "[1, 2, 3, 4, 5]",
          "An error",
          "<map object>"
        ],
        correctAnswer: 0,
        explanation: "Each element is squared; list() converts the iterator to [1, 4, 9, 16, 25]."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does filter() do?",
        options: [
          "Keeps elements for which the function returns True",
          "Sorts elements",
          "Transforms elements",
          "Adds elements"
        ],
        correctAnswer: 0,
        explanation: "filter() keeps only items where the given function returns True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nnumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens)\n```",
        options: [
          "[0, 2, 4, 6, 8, 10]",
          "[1, 3, 5, 7, 9]",
          "An error",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        ],
        correctAnswer: 0,
        explanation: "Only even numbers (x % 2 == 0) are kept."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you use return in a lambda function?",
        options: [
          "No - the expression value is returned automatically",
          "Yes - return is required",
          "Only for complex lambdas",
          "Depends on Python version"
        ],
        correctAnswer: 0,
        explanation: "return is not allowed in lambda and causes a syntax error."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nnumbers = [1, 2, 3, 4, 5, 6]\nresult = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))\nprint(result)\n```",
        options: [
          "[4, 16, 36]",
          "[1, 4, 9, 16, 25, 36]",
          "[2, 4, 6]",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "filter leaves [2, 4, 6]; map squares them to [4, 16, 36]."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Lambda functions can contain multiple lines of code.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Lambda allows only a single expression. Use def for multiple lines."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
