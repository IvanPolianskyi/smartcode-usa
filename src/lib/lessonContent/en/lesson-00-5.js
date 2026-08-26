/**
 * Lesson 00-5: Tuples (tuple) and Sets (set)
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_5 = {
  lessonId: "lesson-00-5",
  moduleId: "module-00",
  order: 5,
  title: "Tuples (tuple) and Sets (set)",
  
  learningObjectives: [
    "Understand the difference between lists and tuples",
    "Create and use tuples",
    "Understand the difference between sets and lists",
    "Use set operations"
  ],
  
  prerequisites: ["lesson-00-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are tuples?",
        content: `In Python, tuples are very similar to lists; however, unlike lists, they are **immutable**. You would use tuples to represent things that should not change, such as days of the week or dates on a calendar.

**When to use tuples:**
- When data should not change
- For coordinates (x, y)
- For RGB colors
- For returning multiple values from a function
- When you need speed (tuples are faster than lists)

**What we will learn:**
1. Creating tuples
2. Basic tuple methods
3. Tuple immutability
4. When to use tuples

**Creating tuples:**
Tuples are created using parentheses \`()\` with elements separated by commas:`
      },
      {
        title: "Creating and using tuples",
        content: `**Simple tuple:**
\`\`\`python
# Create a tuple
t = (1, 2, 3)
print(t)  # (1, 2, 3)
\`\`\`

**Single-element tuple:**
\`\`\`python
# Important: the comma after the element!
single = (1,)  # Tuple with one element
not_tuple = (1)  # This is just a number, not a tuple!
\`\`\`

**Tuple with different types:**
\`\`\`python
mixed = ('one', 2, 3.14, 'text')
print(mixed)  # ('one', 2, 3.14, 'text')
\`\`\`

**Tuple length:**
\`\`\`python
t = (1, 2, 3, 4, 5)
print(len(t))  # 5
\`\`\`

**Indexing and slicing:**
Tuples support indexing and slicing, just like lists:
\`\`\`python
t = ('one', 'two', 'three', 4, 5)

# Get an element by index
print(t[0])    # 'one'
print(t[-1])   # 5

# Slices
print(t[1:3])  # ('two', 'three')
print(t[:3])   # ('one', 'two', 'three')
\`\`\``
      },
      {
        title: "Tuple methods",
        content: `Tuples have built-in methods, but not as many as lists. Let's look at two of them:

**index() - find an element's index:**
\`\`\`python
t = ('one', 'two', 'three')
index = t.index('two')
print(index)  # 1
\`\`\`

**count() - count how many times an element appears:**
\`\`\`python
t = (1, 2, 2, 3, 2, 4)
count = t.count(2)
print(count)  # 3
\`\`\`

**Tuple operations:**
\`\`\`python
t1 = (1, 2, 3)
t2 = (4, 5, 6)

# Concatenation
combined = t1 + t2
print(combined)  # (1, 2, 3, 4, 5, 6)

# Multiplication
doubled = t1 * 2
print(doubled)  # (1, 2, 3, 1, 2, 3)

# Membership check
print(2 in t1)  # the element is in the tuple
\`\`\``
      },
      {
        title: "",
        content: `

**What you CANNOT do:**
\`\`\`python
t = (1, 2, 3)

#  You cannot change an element
# t[0] = 10  # Error: TypeError

#  You cannot add an element
# t.append(4)  # Error: AttributeError

#  You cannot remove an element
# t.remove(2)  # Error: AttributeError
\`\`\`

**Why this matters:**
Because of immutability, tuples cannot grow. After a tuple is created, we cannot add elements to it.

**But you can create a new tuple:**
\`\`\`python
t = (1, 2, 3)
# Create a new tuple based on the old one
new_t = t + (4, 5)
print(new_t)  # (1, 2, 3, 4, 5)
print(t)      # (1, 2, 3) - the original did not change
\`\`\`

**Unpacking tuples:**
\`\`\`python
# Create a tuple
coordinates = (10, 20)

# Unpack
x, y = coordinates
print("x:", x, ", y:", y)  # x: 10, y: 20

# Unpacking a tuple (without a function)
# (In later modules we will learn how to create functions)
name_age = ('Alexander', 16)
name, age = name_age
print(name + ",", age, "years old")  # Alexander, 16 years old
\`\`\``
      },
      {
        title: "When to use tuples",
        content: `You might ask: "Why use tuples when they have fewer available methods?" Honestly, tuples are used less often than lists in programming, but they are useful when immutability is needed.

**Advantages of tuples:**
-  Immutability ensures data integrity
-  Faster than lists
-  Use less memory
-  Can be used as dictionary keys

**Usage examples:**
\`\`\`python
# Coordinates (should not change)
point = (10, 20)

# RGB colors
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)

# Days of the week
days = ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')

# Using as a dictionary key
locations = {
    (0, 0): 'Start',
    (10, 20): 'End'
}
\`\`\`

If in your program you pass an object and need to make sure it will not change, then a tuple is your solution. It provides a convenient source of data integrity.`
      },
      {
        title: "Sets",
        content: `**What are sets?**
Sets are an unordered collection of **unique** elements. We can create them using the \`set()\` function.

**Creating sets:**
\`\`\`python
# Create a set
my_set = {1, 2, 3}
print(my_set)  # {1, 2, 3}

# Empty set (not {} - that is a dictionary!)
empty_set = set()
print(empty_set)  # set()
\`\`\`

**Important:** Notice the curly braces. That does not mean a dictionary! Although you can think of a set as a dictionary with only keys.

**Uniqueness of elements:**
We know that a set has only unique entries. What happens when we try to add something that is already in the set?

\`\`\`python
my_set = {1, 2, 3}
my_set.add(1)  # Try to add 1 again
print(my_set)  # {1, 2, 3} - it was not added because it already exists
\`\`\`

**Getting unique elements from a list:**
\`\`\`python
# List with duplicate elements
my_list = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

# Convert to a set to get unique values
unique = set(my_list)
print(unique)  # {1, 2, 3, 4}

# Convert back to a list
unique_list = list(unique)
print(unique_list)  # [1, 2, 3, 4]
\`\`\``
      },
      {
        title: "Set operations",
        content: `**Adding elements:**
\`\`\`python
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)  # {1, 2, 3, 4}

# Add several elements
my_set.update([5, 6, 7])
print(my_set)  # {1, 2, 3, 4, 5, 6, 7}
\`\`\`

**Removing elements:**
\`\`\`python
my_set = {1, 2, 3, 4, 5}

# Remove an element
my_set.remove(3)
print(my_set)  # {1, 2, 4, 5}

# Remove without an error if the element is missing
my_set.discard(10)  # Will not raise an error
\`\`\`

**Set operations:**
\`\`\`python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Union
union = set1 | set2
print(union)  # {1, 2, 3, 4, 5, 6}

# Intersection
intersection = set1 & set2
print(intersection)  # {3, 4}

# Difference
difference = set1 - set2
print(difference)  # {1, 2}

# Symmetric difference
sym_diff = set1 ^ set2
print(sym_diff)  # {1, 2, 5, 6}
\`\`\`

**Membership check:**
\`\`\`python
my_set = {1, 2, 3}
print(2 in my_set)  # the element is in the set
print(5 in my_set)  # the element is not in the set
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Creating and using tuples",
      code: `# Creating tuples
coordinates = (10, 20)
colors = ('red', 'green', 'blue')

print("Coordinates:", coordinates)
print("Colors:", colors)

# Unpacking
x, y = coordinates
print("x:", x, ", y:", y)

# Indexing
print("First color:", colors[0])`,
      explanation: "Demonstrates creating tuples, unpacking, and indexing."
    },
    {
      title: "Example 2: Tuple immutability",
      code: `# Tuples are immutable
t = (1, 2, 3)
print("Original:", t)

# Create a new tuple
new_t = t + (4, 5)
print("New:", new_t)
print("Original did not change:", t)

# Trying to change will raise an error
# t[0] = 10  # TypeError: 'tuple' object does not support item assignment`,
      explanation: "Shows tuple immutability and creating new tuples."
    },
    {
      title: "Example 3: Sets and uniqueness",
      code: `# Creating sets
numbers = {1, 2, 3, 3, 4, 4, 5}
print("Set (unique):", numbers)

# Converting a list to a set
my_list = [1, 2, 2, 3, 3, 3, 4]
unique = set(my_list)
print("Unique from list:", unique)

# Adding elements
numbers.add(6)
print("After adding:", numbers)`,
      explanation: "Demonstrates creating sets and getting unique elements."
    },
    {
      title: "Example 4: Set operations",
      code: `# Set operations
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

print("Set 1:", set1)
print("Set 2:", set2)

# Union
union = set1 | set2
print("Union:", union)

# Intersection
intersection = set1 & set2
print("Intersection:", intersection)

# Difference
difference = set1 - set2
print("Difference:", difference)`,
      explanation: "Shows the main set operations: union, intersection, and difference."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Trying to modify a tuple",
      explanation: "Tuples are immutable, so you cannot change, add, or remove elements.",
      correctApproach: "Create a new tuple: new_tuple = old_tuple + (new_element,)"
    },
    {
      mistake: "Creating a single-element tuple without a comma",
      explanation: "(1) is a number, not a tuple. You need a comma: (1,).",
      correctApproach: "Always add a comma for a single-element tuple: single = (1,)"
    },
    {
      mistake: "Confusing {} for a set and a dictionary",
      explanation: "{} creates an empty dictionary, not a set.",
      correctApproach: "Use set() to create an empty set: empty_set = set()"
    },
    {
      mistake: "Using a list as a dictionary key",
      explanation: "Dictionary keys must be immutable. Lists are mutable, so they cannot be used.",
      correctApproach: "Use a tuple as a key: {(1, 2): 'value'}"
    }
  ],
  
  summary: `In this lesson we learned:

1. Tuples (tuple) - immutable sequences, created with ()
2. Immutability - tuples cannot be changed after creation
3. Tuple methods - index(), count()
4. Sets (set) - unordered collections of unique elements
5. Set operations - union, intersection, difference

Tuples and sets are important data structures for different tasks! Next lesson - strings.`,
  
  practiceTask: {
    title: "Coordinate system and unique values",
    description: "Create a program that works with coordinates and sets",
    problemStatement: `Write a program that:
1. Reads the coordinates of two points (two numbers per line)
2. Calculates the distance between these points
3. Reads a list of numbers and creates a set of unique values
4. Reads two sets of numbers and finds the common elements
5. Prints the unique values and common elements as sorted lists

Input format:
0 0
3 4
1 2 2 3 3 3 4 4 5
1 2 3 4 5
3 4 6 7`,
    outputFormat: `Point 1: (0, 0)
Point 2: (3, 4)
Distance: 5.0
Unique values: [1, 2, 3, 4, 5]
Common elements: [3, 4]`,
    examples: [
      {
        input: `0 0
3 4
1 2 2 3 3 3 4 4 5
1 2 3 4 5
3 4 6 7`,
        output: `Point 1: (0, 0)
Point 2: (3, 4)
Distance: 5.0
Unique values: [1, 2, 3, 4, 5]
Common elements: [3, 4]`,
        explanation: "Distance between (0,0) and (3,4) = 5.0; set intersection = [3, 4]"
      },
      {
        input: `1 1
4 5
5 5 1 2 2 3
1 2 3
2 3 4`,
        output: `Point 1: (1, 1)
Point 2: (4, 5)
Distance: 5.0
Unique values: [1, 2, 3, 5]
Common elements: [2, 3]`,
        explanation: "Distance 5.0; unique [1, 2, 3, 5]; common [2, 3]"
      },
      {
        input: `0 0
5 12
9 8 8 7 7 7
7 8 9
8 9 10`,
        output: `Point 1: (0, 0)
Point 2: (5, 12)
Distance: 13.0
Unique values: [7, 8, 9]
Common elements: [8, 9]`,
        explanation: "Distance between (0,0) and (5,12) = 13.0"
      }
    ],
    solution: {
      code: `# Coordinate system and sets
x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
point1 = (x1, y1)
point2 = (x2, y2)

print("Point 1:", point1)
print("Point 2:", point2)

dist = ((x2 - x1)**2 + (y2 - y1)**2)**0.5
print("Distance:", dist)

nums = list(map(int, input().split()))
unique = set(nums)
print("Unique values:", sorted(unique))

set1 = set(map(int, input().split()))
set2 = set(map(int, input().split()))
common = set1 & set2
print("Common elements:", sorted(common))`,
      explanation: "The solution reads coordinates and numbers with input(), uses tuples for points and sets for unique/common values. Set results are printed with sorted()."
    },
    hints: [
      "Read coordinates: x, y = map(int, input().split())",
      "Distance formula: ((x2-x1)**2 + (y2-y1)**2)**0.5",
      "Use set() for unique values",
      "Use & for set intersection",
      "Print sorted(unique) and sorted(common) so the order is stable"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you create a tuple with one element?",
        options: [
          "(1)",
          "(1,)",
          "[1]",
          "{1}"
        ],
        correctAnswer: 1,
        explanation: "For a single-element tuple you need a comma: (1,). Without the comma it is just a number."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nt = (1, 2, 3)\nt[0] = 10\nprint(t)\n```",
        options: [
          "(10, 2, 3)",
          "(1, 2, 3)",
          "An error",
          "Nothing"
        ],
        correctAnswer: 2,
        explanation: "Tuples are immutable, so trying to change an element raises a TypeError."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you create an empty set?",
        options: [
          "{}",
          "set()",
          "[]",
          "Both {} and set()"
        ],
        correctAnswer: 1,
        explanation: "{} creates an empty dictionary. Use set() for an empty set."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmy_set = {1, 2, 2, 3, 3, 3}\nprint(len(my_set))\n```",
        options: [
          "6",
          "3",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "Sets contain only unique elements, so {1, 2, 2, 3, 3, 3} = {1, 2, 3}, and len() = 3."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which operation finds the common elements of two sets?",
        options: [
          "|",
          "&",
          "-",
          "^"
        ],
        correctAnswer: 1,
        explanation: "The & operator finds the intersection (common elements) of two sets."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx, y = (10, 20)\nprint(x + y)\n```",
        options: [
          "(10, 20)",
          "30",
          "An error",
          "1020"
        ],
        correctAnswer: 1,
        explanation: "Tuple unpacking assigns x=10, y=20, so x+y=30."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you use a tuple as a dictionary key?",
        options: [
          "No, tuples are mutable",
          "Yes, tuples are immutable",
          "Only empty tuples",
          "Only tuples with numbers"
        ],
        correctAnswer: 1,
        explanation: "Yes, tuples are immutable, so they can be used as dictionary keys."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
