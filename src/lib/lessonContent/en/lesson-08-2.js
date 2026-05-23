/**
 * Lesson 08-2: The itertools module
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_08_2 = {
  lessonId: "lesson-08-2",
  moduleId: "module-08",
  order: 2,
  title: "itertools module",
  
  learningObjectives: [
    "Use itertools to create iterators",
    "Apply combinations and permutations",
    "Work with grouping and loop iterators",
    "Create efficient iterators for complex tasks"
  ],
  
  prerequisites: ["lesson-08-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to the itertools module",
        content: `The \\\`itertools\\\` module provides a set of functions for creating and working with iterators. It helps you write efficient sequence processing code.

**Why itertools?**

- **Efficiency** - works with iterators without creating intermediate lists
- **Power** - many ready-made functions for complex tasks
- **Readability** - the code becomes more declarative

**Main categories of functions:**

1. **Infinite iterators** - cycle, repeat, count
2. **Combinatorics** - combinations, permutations, product
3. **Grouping** - groupby
4. **Filtering** - filterfalse, takewhile, dropwhile
5. **Unification** - chain, zip_longest

**Module import:**

\`\`\`python
from itertools import cycle, repeat, count, combinations, permutations, groupby, chain
\`\`\``
      },
      {
        title: "Infinite iterators",
        content: `**cycle() - cyclic repetition**

\`\`\`python
from itertools import cycle

# Repeats the sequence endlessly
colors = cycle(['red', 'green', 'blue'])

for i, color in enumerate(colors):
    print(color)
    if i >= 5:
        break
# red, green, blue, red, green, blue
\`\`\`

**repeat() - repeating the value**

\`\`\`python
from itertools import repeat

# Repeats the value n times
for num in repeat(5, 3):
    print(num)
# 5, 5, 5

# Repeat endlessly (if no count is specified)
for num in repeat(10):
    print(num) # 10, 10, 10, ... (infinitely)
    break # We stop so as not to hang
\`\`\`

**count() - counter**

\`\`\`python
from itertools import count

# Starts at 0, step 1
for num in count():
    print(num)
    if num >= 5:
        break
# 0, 1, 2, 3, 4, 5

# With initial value and step
for num in count(10, 2):
    print(num)
    if num >= 16:
        break
# 10, 12, 14, 16
\`\`\`

**Practical example: Creating an ID**

\`\`\`python
from itertools import count

# Generator of unique IDs
id_generator = count(1)

def get_next_id():
    return next(id_generator)

print(get_next_id()) # 1
print(get_next_id()) # 2
print(get_next_id()) # 3
\`\`\``
      },
      {
        title: "Combinatorics: combinations and permutations",
        content: `**combinations() - combinations**

Combinations are a selection of elements where the order is not important.

\`\`\`python
from itertools import combinations

# All combinations of 3 elements of 2
items = ['a', 'b', 'c']
combs = combinations(items, 2)
print(list(combs))
# [('a', 'b'), ('a', 'c'), ('b', 'c')]

# Combinations of 4 elements of 3
numbers = [1, 2, 3, 4]
combs = combinations(numbers, 3)
print(list(combs))
# [(1, 2, 3), (1, 2, 4), (1, 3, 4), (2, 3, 4)]
\`\`\`

**permutations() - permutations**

Permutations are the selection of elements where order is important.

\`\`\`python
from itertools import permutations

# All permutations of 3 elements by 2
items = ['a', 'b', 'c']
perms = permutations(items, 2)
print(list(perms))
# [('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]

# All permutations (without specifying the length)
perms = permutations(['x', 'y'])
print(list(perms))
# [('x', 'y'), ('y', 'x')]
\`\`\`

**product() - Cartesian product**

\`\`\`python
from itertools import product

# Cartesian product of two sequences
colors = ['red', 'blue']
sizes = ['S', 'M', 'L']

prods = product(colors, sizes)
print(list(prods))
# [('red', 'S'), ('red', 'M'), ('red', 'L'),
# ('blue', 'S'), ('blue', 'M'), ('blue', 'L')]

# With repetition
prods = product([0, 1], repeat=3)
print(list(prods))
# [(0, 0, 0), (0, 0, 1), (0, 1, 0), (0, 1, 1),
# (1, 0, 0), (1, 0, 1), (1, 1, 0), (1, 1, 1)]
\`\`\`

**Practical example: Password generation**

\`\`\`python
from itertools import product

# Generation of all possible 3-character passwords
chars = 'abc'
passwords = product(chars, repeat=3)

for pwd in list(passwords)[:5]: # First 5
    print(''.join(pwd))
# aaa, aab, aac, aba, abb
\`\`\``
      },
      {
        title: "Grouping: groupby",
        content: `\\\`groupby()\\\` groups consecutive elements with the same key.

**Important:** Items must be sorted by key!

\`\`\`python
from itertools import groupby

# Group by value
data = [1, 1, 2, 2, 2, 3, 3, 3, 3]

for key, group in groupby(data):
    print(f'{key}: {list(group)}')
#1: [1, 1]
#2: [2, 2, 2]
#3: [3, 3, 3, 3]
\`\`\`

**Grouping by function:**

\`\`\`python
from itertools import groupby

# We group words by length
words = ['apple', 'bat', 'cat', 'dog', 'elephant', 'fox']

# First we sort!
words_sorted = sorted(words, key=len)

for length, group in groupby(words_sorted, key=len):
    print(f'Length {length}: {list(group)}')
# Length 3: ['bat', 'cat', 'dog', 'fox']
# Length 5: ['apple']
# Length 8: ['elephant']
\`\`\`

**Practical example: Grouping students by grade**

\`\`\`python
from itertools import groupby

students = [
    ('Alexander', 95),
    ('Maria', 88),
    ('Ivan', 95),
    ('Elena', 88),
    ('Petro', 90)
]

# Sort by rating
students_sorted = sorted(students, key=lambda x: x[1])

# Grouping
for grade, group in groupby(students_sorted, key=lambda x: x[1]):
    names = [name for name, _ in group]
    print(f'Grade {grade}: {names}')
# Score 88: ['Maria', 'Elena']
# Score 90: ['Petro']
# Score 95: ['Alexander', 'Ivan']
\`\`\``
      },
      {
        title: "Merging and filtering",
        content: `**chain() - concatenation of iterators**

\`\`\`python
from itertools import chain

# Combines multiple sequences
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

combined = chain(list1, list2, list3)
print(list(combined))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# From unpacking
lists = [[1, 2], [3, 4], [5, 6]]
combined = chain(*lists)
print(list(combined))
# [1, 2, 3, 4, 5, 6]
\`\`\`

**zip_longest() - zip with padding**

\`\`\`python
from itertools import zip_longest

# Normal zip trims to shortest sequence
list1 = [1, 2, 3]
list2 = ['a', 'b']
print(list(zip(list1, list2)))
# [(1, 'a'), (2, 'b')]

# zip_longest fills None
print(list(zip_longest(list1, list2)))
# [(1, 'a'), (2, 'b'), (3, None)]

# With custom padding value
print(list(zip_longest(list1, list2, fillvalue='-')))
# [(1, 'a'), (2, 'b'), (3, '-')]
\`\`\`

**takewhile() and dropwhile() - conditional filtering**

\`\`\`python
from itertools import takewhile, dropwhile

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# We take elements while the condition is True
small = takewhile(lambda x: x < 5, numbers)
print(list(small))
# [1, 2, 3, 4]

# We skip elements while the condition is True
skipped = dropwhile(lambda x: x < 5, numbers)
print(list(skipped))
# [5, 6, 7, 8, 9, 10]
\`\`\`

**filterfalse() - filtering false values**

\`\`\`python
from itertools import filterfalse

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# We take only odd ones (filter even ones)
odd = filterfalse(lambda x: x % 2 == 0, numbers)
print(list(odd))
# [1, 3, 5, 7, 9]
\`\`\``
      },
      {
        title: "Combination of itertools functions",
        content: `You can combine different itertools functions for complex tasks.

**Example: All possible combinations with a limit**

\`\`\`python
from itertools import combinations, chain

# All combinations of different sizes
items = ['a', 'b', 'c', 'd']

# Combinations of 2 and 3
combs_2 = combinations(items, 2)
combs_3 = combinations(items, 3)

# Unite
all_combs = chain(combs_2, combs_3)
print(list(all_combs))
# [('a', 'b'), ('a', 'c'), ..., ('a', 'b', 'c'), ...]
\`\`\`

**Example: Processing data with grouping**

\`\`\`python
from itertools import groupby, chain

# Data from various sources
data1 = [1, 1, 2, 2]
data2 = [2, 3, 3, 4]

# Combine and sort
combined = sorted(chain(data1, data2))

# Grouping
for key, group in groupby(combined):
    count = len(list(group))
    print(f'{key}: {count} times')
#1: 2 times
#2: 3 times
#3: 2 times
#4: 1 time
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we studied the itertools module:

**Key Features:**

1. **Infinite iterators** - cycle, repeat, count
2. **Combinatorics** - combinations, permutations, product
3. **Grouping** - groupby (sorting required!)
4. **Unification** - chain, zip_longest
5. **Filtering** - takewhile, dropwhile, filterfalse

**Advantages:**

- Efficiency - works with iterators
- Power - many out-of-the-box features
- Readability - declarative code

**Important to remember:**

- groupby needs sorted data
- Infinite iterators can hang the program
- itertools works with iterators without creating lists

**Next step:**

In the next lesson, we will learn the functools module for working with functions.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: cycle for alternation",
      code: `from itertools import cycle

colors = cycle(['red', 'green', 'blue'])
for i in range(5):
    print(next(colors))
# red, green, blue, red, green`,
      explanation: "We use cycle to endlessly repeat the sequence."
    },
    {
      title: "Example 2: combinations for selection",
      code: `from itertools import combinations

items = ['a', 'b', 'c', 'd']
combs = combinations(items, 2)
print(list(combs))
# [('a', 'b'), ('a', 'c'), ('a', 'd'), ('b', 'c'), ('b', 'd'), ('c', 'd')]`,
      explanation: "We generate all possible combinations of 4 elements of 2."
    },
    {
      title: "Example 3: groupby for grouping",
      code: `from itertools import groupby

data = [1, 1, 2, 2, 2, 3]
for key, group in groupby(data):
    print(f'{key}: {len(list(group))}')
# 1: 2
# 2: 3
# 3: 1`,
      explanation: "We group the elements by value and count the number."
    },
    {
      title: "Example 4: chain for merging",
      code: `from itertools import chain

list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = chain(list1, list2)
print(list(combined))
# [1, 2, 3, 4, 5, 6]`,
      explanation: "We combine several sequences into one."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to sort the data before groupby",
      explanation: "groupby only works with consecutive elements, so the data must be sorted.",
      correctApproach: "Always sort data before using groupby: sorted(data, key=...)"
    },
    {
      mistake: "Using infinite iterators without limit",
      explanation: "cycle, repeat, count can work indefinitely, which will freeze the program.",
      correctApproach: "Use break or takewhile to limit the number of iterations."
    },
    {
      mistake: "Confusion between combinations and permutations",
      explanation: "combinations - the order is not important, permutations - the order is important.",
      correctApproach: "Use combinations for selection, permutations for ordered sequences."
    }
  ],
  
  summary: `In this lesson, we studied the itertools module:

1. Infinite iterators - cycle, repeat, count
2. Combinatorics - combinations, permutations, product
3. Grouping - groupby (sorting required!)
4. Joining - chain, zip_longest
5. Filtering - takewhile, dropwhile, filterfalse

itertools helps you write efficient and elegant code for working with sequences!`,
  
  practiceTask: {
    title: "Generation of all possible passwords",
    description: "Use product to generate all possible combinations",
    problemStatement: `Create a function that generates all possible passwords of a given length:
1. Use product to generate combinations
2. Limit the output to the first 10 passwords
3. Count the total number of possible passwords

Characters: 'abc'
Length: 3`,
    outputFormat: `First 10 passwords:
aaa
aab
ac
aba
abb
abc
aca
acb
acc
baa

Total number: 27`,
    examples: [
      {
        output: `First 10 passwords:
aa
ab
ba
bb

Total number: 4`,
        explanation: "We use product with repeat to generate all combinations."
      }
    ],
    solution: {
      code: `from itertools import product

def generate_passwords(chars, length):
    passwords = product(chars, repeat=length)
    password_list = list(passwords)
    
    print('First 10 passwords:')
    for pwd in password_list[:10]:
        print(''.join(pwd))
    
    print(f'\\\\nTotal number: {len(password_list)}')

generate_passwords('ab', 2)`,
      explanation: "We use product with repeat to generate all possible combinations of characters of a given length."
    },
    hints: [
      "Use product with the repeat parameter",
      "Convert tuples to strings using join",
      "Limit the output to the first 10 items",
      "Count the total via len()"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does cycle() do?",
        options: [
          "Repeats the sequence endlessly",
          "Counts elements",
          "Groups elements",
          "Filters items"
        ],
        correctAnswer: 0,
        explanation: "cycle() repeats the sequence ad infinitum in a loop."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between combinations and permutations?",
        options: [
          "combinations - the order is not important, permutations - important",
          "combinations - order is important, permutations - not important",
          "There is no difference",
          "combinations is faster"
        ],
        correctAnswer: 0,
        explanation: "combinations - selection without taking into account the order, permutations - taking into account the order."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What do you need to do before using groupby?",
        options: [
          "Nothing",
          "Sort the data",
          "Convert to a list",
          "Filter data"
        ],
        correctAnswer: 1,
        explanation: "groupby only works with consecutive elements, so the data must be sorted."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does chain() do?",
        options: [
          "Combines several sequences",
          "Groups elements",
          "Filters items",
          "Sorts elements"
        ],
        correctAnswer: 0,
        explanation: "chain() combines several iterators into one."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "itertools works with iterators without creating intermediate lists.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. itertools works with memory-saving iterators."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
