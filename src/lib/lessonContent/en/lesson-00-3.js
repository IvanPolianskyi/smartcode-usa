/**
 * Lesson 00-3: Lists (list): creation, indexing, methods
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_00_3 = {
  lessonId: "lesson-00-3",
  moduleId: "module-00",
  order: 3,
  title: "Lists (list): creation, indexing, methods",
  
  learningObjectives: [
    "Create and modify lists",
    "Use indexing and slicing",
    "Apply list methods",
    "Copy a list without accidentally sharing it"
  ],
  
  prerequisites: ["lesson-00-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are lists?",
        content: `A list is an ordered collection of values, stored in one variable. Unlike the variables from the last lesson, which held a single value, a list holds many - and it is **mutable**, which means the elements inside it can be changed after you create it.

**Why are lists important?**
- Store multiple values in one variable
- You can add, remove, and change elements
- Support different data types in one list
- Help organize data in a structured way

**What we will learn:**
1. Creating lists
2. Indexing and slicing lists
3. Basic list methods
4. Nested lists

Lists are created using square brackets \`[]\` and commas that separate each element in the list.`,
        interactives: [
          {
            id: 'first-list',
            type: 'tryIt',
            prompt: 'Create a list called colors with three of your favorite colors, then print it.',
            starterCode: 'colors = ["red", "green", "blue"]\nprint(colors)',
            expect: { mustContain: ['['] },
            hint: 'Keep the square brackets, and separate each item with a comma.',
          },
        ],
      },
      {
        title: "Creating lists",
        content: `**Simple list:**
\`\`\`python
# List of integers
numbers = [1, 2, 3, 4, 5]
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

**List with different data types:**
Lists can contain different types of objects:
\`\`\`python
mixed_list = ['String', 23, 100.232, 'o', True]
print(mixed_list)  # ['String', 23, 100.232, 'o', True]
\`\`\`

**Empty list:**
\`\`\`python
empty_list = []
print(empty_list)  # []
\`\`\`

You can also build a list with the \`list()\` function - \`list()\` is exactly the same as \`[]\`, just spelled differently:
\`\`\`python
also_empty = list()
print(also_empty)  # []
\`\`\`

**List length:**
The \`len()\` function shows how many elements are in the list:
\`\`\`python
my_list = [1, 2, 3, 4, 5]
print(len(my_list))  # 5
\`\`\``,
        interactives: [
          {
            id: 'list-length',
            type: 'fillBlank',
            prompt: 'Print how many items are in the list below.',
            template: 'numbers = [10, 20, 30, 40]\nprint({{fn}}(numbers))',
            blanks: [
              { id: 'fn', answer: 'len', accept: ['len'], width: 6, placeholder: 'function' },
            ],
            explanation: 'len() counts the elements in any list.',
            hint: 'The same function you used to measure the length of a string.',
          },
        ],
      },
      {
        title: "Indexing and slicing",
        content: `Indexing and slicing let you access individual elements or parts of a list. Let's create a new list to see how this works:

\`\`\`python
my_list = ['one', 'two', 'three', 4, 5]
\`\`\`

**Getting an element by index:**
\`\`\`python
# Get the element at index 0
print(my_list[0])  # 'one'

# Get the last element
print(my_list[-1])  # 5

# Get the second-to-last element
print(my_list[-2])  # 4
\`\`\`

**Slicing:**
\`\`\`python
# Get elements from index 1 to the end
print(my_list[1:])  # ['two', 'three', 4, 5]

# Get elements up to index 3 (not including 3)
print(my_list[:3])  # ['one', 'two', 'three']

# Get elements from index 1 to 3
print(my_list[1:3])  # ['two', 'three']

# Get all elements with step 2
print(my_list[::2])  # ['one', 'three', 5]
\`\`\`

**Important:** Slices do not include the end index! \`my_list[1:3]\` returns the elements at indexes 1 and 2, but not 3.`,
        interactives: [
          {
            id: 'slice-predict',
            type: 'predictOutput',
            prompt: 'What does this print?',
            code: 'my_list = ["a", "b", "c", "d", "e"]\nprint(my_list[1:3])',
            options: [
              "['a', 'b']",
              "['b', 'c']",
              "['b', 'c', 'd']",
              "['c']",
            ],
            correctAnswer: 1,
            explanation: 'The slice [1:3] grabs the elements at index 1 and 2, and stops before index 3.',
          },
        ],
      },
      {
        title: "List operations",
        content: `**List concatenation (+):**
We can use \`+\` to combine lists:
\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]
\`\`\`

**Important:** This does not change the original lists! If you need to keep the changes, you must reassign:
\`\`\`python
my_list = [1, 2, 3]
my_list = my_list + [4, 5]
print(my_list)  # [1, 2, 3, 4, 5]
\`\`\`

**List multiplication (*):**
We can use \`*\` to duplicate a list:
\`\`\`python
my_list = [1, 2, 3]
doubled = my_list * 2
print(doubled)  # [1, 2, 3, 1, 2, 3]
\`\`\`

**Checking for an element (in):**
\`\`\`python
fruits = ['apple', 'banana', 'orange']
print('apple' in fruits)  # True
print('grape' in fruits)  # False
\`\`\``,
        interactives: [
          {
            id: 'concat-predict',
            type: 'predictOutput',
            prompt: 'What prints here?',
            code: 'a = [1, 2]\nb = [3, 4]\nprint(a + b)\nprint(a)',
            options: [
              '[1, 2, 3, 4]\n[1, 2, 3, 4]',
              '[1, 2, 3, 4]\n[1, 2]',
              '[4, 6]\n[1, 2]',
              'Error',
            ],
            correctAnswer: 1,
            explanation: '+ builds a brand new combined list. It never changes a or b themselves.',
          },
        ],
      },
      {
        title: "Basic list methods",
        content: `Python lists are flexible: you never declare how large they will be, and they grow or shrink as you call the methods below.

**append() - add one element to the end:**
\`\`\`python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)  # [1, 2, 3, 4]

my_list.append('five')
print(my_list)  # [1, 2, 3, 4, 'five']
\`\`\`

**extend() - add all elements from another list:**
\`\`\`python
my_list = [1, 2, 3]
my_list.extend([4, 5])
print(my_list)  # [1, 2, 3, 4, 5]
\`\`\`
The difference matters: \`my_list.append([4, 5])\` would add the sublist \`[4, 5]\` as one single item, while \`extend()\` unpacks it and adds \`4\` and \`5\` separately.

**pop() - remove and return an element:**
\`\`\`python
my_list = [1, 2, 3, 4, 5]

# Remove the last element
last = my_list.pop()
print(last)  # 5
print(my_list)  # [1, 2, 3, 4]

# Remove an element by index
second = my_list.pop(1)
print(second)  # 2
print(my_list)  # [1, 3, 4]
\`\`\`

**remove() - remove by value:**
\`\`\`python
my_list = ['apple', 'banana', 'orange']
my_list.remove('banana')
print(my_list)  # ['apple', 'orange']
\`\`\`

**insert() - insert an element at a position:**
\`\`\`python
my_list = [1, 2, 4]
my_list.insert(2, 3)  # Insert 3 at position 2
print(my_list)  # [1, 2, 3, 4]
\`\`\`

**sort() - sort the list:**
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 9]

words = ['apple', 'banana', 'orange']
words.sort()
print(words)  # ['apple', 'banana', 'orange']
\`\`\`

**reverse() - reverse the order:**
\`\`\`python
my_list = [1, 2, 3, 4, 5]
my_list.reverse()
print(my_list)  # [5, 4, 3, 2, 1]
\`\`\`

**index() - find an element's index:**
\`\`\`python
my_list = ['apple', 'banana', 'orange']
index = my_list.index('banana')
print(index)  # 1
\`\`\`

**count() - count how many times an element appears:**
\`\`\`python
my_list = [1, 2, 2, 3, 2, 4]
count = my_list.count(2)
print(count)  # 3
\`\`\`

**Important:** If an index does not exist, Python raises an error:
\`\`\`python
my_list = [1, 2, 3]
# print(my_list[100])  # Error: IndexError
\`\`\``,
        interactives: [
          {
            id: 'methods-practice',
            type: 'tryIt',
            prompt: 'Start with the list below. Append "kiwi", remove "banana", then print the result.',
            starterCode: 'fruits = ["apple", "banana"]\n',
            expect: { mustContain: ['kiwi'] },
            hint: 'Use fruits.append("kiwi") and fruits.remove("banana"), then print(fruits).',
          },
        ],
      },
      {
        title: "Nested lists",
        content: `A great feature of Python data structures is that they support **nesting**. That means we can have data structures inside other structures. For example: a list inside a list.

**Creating a nested list:**
\`\`\`python
# Create three lists
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

# Create a list of lists (a matrix)
matrix = [list1, list2, list3]
print(matrix)  # [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
\`\`\`

**Accessing elements:**
Now there are two levels of indexing:
\`\`\`python
# Get the first row of the matrix
print(matrix[0])  # [1, 2, 3]

# Get the first element of the first row
print(matrix[0][0])  # 1

# Get the second element of the third row
print(matrix[2][1])  # 8
\`\`\`

**Practical example - grade table:**
\`\`\`python
# Student grade table
grades = [
    ['Alexander', 85, 92, 78],
    ['Maria', 95, 88, 91],
    ['Dmitry', 78, 85, 90]
]

# Get Alexander's grades
alex_grades = grades[0]
print("Alexander:", alex_grades[1:])
# Alexander: [85, 92, 78]

# Get Maria's second grade
maria_second = grades[1][2]
print("Maria's second grade:", maria_second)  # 88
\`\`\``,
        interactives: [
          {
            id: 'matrix-predict',
            type: 'predictOutput',
            prompt: 'What does this print?',
            code: 'matrix = [[1, 2], [3, 4], [5, 6]]\nprint(matrix[2][0])',
            options: ['1', '2', '5', '6'],
            correctAnswer: 2,
            explanation: 'matrix[2] is [5, 6], and [0] takes the first element of that row: 5.',
          },
        ],
      },
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Creating and using lists",
      code: `# Creating lists
numbers = [1, 2, 3, 4, 5]
fruits = ['apple', 'banana', 'orange']
mixed = ['text', 42, 3.14, True]

print(f"Numbers: {numbers}")
print(f"Fruits: {fruits}")
print(f"Mixed list: {mixed}")
print(f"Length of numbers: {len(numbers)}")`,
      explanation: "Demonstrates creating lists of different types and using the len() function."
    },
    {
      title: "Example 2: Indexing and slicing",
      code: `# Indexing and slicing
my_list = ['one', 'two', 'three', 'four', 'five']

# Get elements
print(f"First: {my_list[0]}")
print(f"Last: {my_list[-1]}")
print(f"From 1 to 3: {my_list[1:3]}")
print(f"Everything except the first: {my_list[1:]}")
print(f"Everything except the last: {my_list[:-1]}")`,
      explanation: "Shows different ways to index and slice lists."
    },
    {
      title: "Example 3: List methods",
      code: `# Working with list methods
shopping = ['bread', 'milk']

# Add an element
shopping.append('eggs')
print(f"After append: {shopping}")

# Insert at a position
shopping.insert(1, 'butter')
print(f"After insert: {shopping}")

# Remove by value
shopping.remove('milk')
print(f"After remove: {shopping}")

# Remove the last item
last = shopping.pop()
print(f"Removed: {last}, remaining: {shopping}")`,
      explanation: "Demonstrates the main methods for modifying lists."
    },
    {
      title: "Example 4: Sorting and reversing",
      code: `# Sorting lists
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(f"Sorted: {numbers}")

words = ['apple', 'banana', 'orange']
words.sort()
print(f"Words sorted: {words}")

# Reverse
numbers.reverse()
print(f"In reverse order: {numbers}")`,
      explanation: "Shows how to sort and reverse the order of elements in a list."
    },
    {
      title: "Example 5: Nested lists",
      code: `# Nested lists (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(f"Full matrix: {matrix}")
print(f"First row: {matrix[0]}")
print(f"Element [0][0]: {matrix[0][0]}")
print(f"Element [2][1]: {matrix[2][1]}")

# Get a column (the first element of each row)
column = [matrix[0][0], matrix[1][0], matrix[2][0]]
print(f"First column: {column}")`,
      explanation: "Demonstrates working with nested lists and accessing matrix elements."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Trying to change an element at a non-existent index",
      explanation: "If the index does not exist, Python raises an IndexError.",
      correctApproach: "Always check the list length before accessing: if index < len(my_list):"
    },
    {
      mistake: "Confusing append() and extend()",
      explanation: "append() adds one element, extend() adds all elements from another list.",
      correctApproach: "Use append() for one element, extend() for a list of elements."
    },
    {
      mistake: "Forgetting that sort() modifies the original list",
      explanation: "sort() modifies the list in place and does not return a new list.",
      correctApproach: "If you need to keep the original, make a copy: sorted_list = original_list.copy(); sorted_list.sort()"
    },
    {
      mistake: "Confusing assignment and copying",
      explanation: "my_list2 = my_list1 creates a reference, not a copy.",
      correctApproach: "Use my_list2 = my_list1.copy() or my_list2 = my_list1[:] for a copy."
    }
  ],
  
  summary: `In this lesson we learned:

1. Creating lists - using square brackets []
2. Indexing and slicing - accessing elements by index
3. List methods - append(), pop(), remove(), insert(), sort(), reverse()
4. Nested lists - lists inside lists for creating matrices

Lists are one of the most important data structures in Python! Next lesson - dictionaries.`,
  
  practiceTask: {
    title: "Shopping list management system",
    description: "Create a program to manage a shopping list",
    problemStatement: `Write a program that:
1. Reads an initial shopping list (items separated by spaces on one line)
2. Reads 2 new items (one per line) and adds them with append()
3. Reads an item to remove and removes it with remove()
4. Sorts the list alphabetically
5. Prints the number of items in the list
6. Reads an item to check and checks whether it is in the list with the in operator

Input format:
bread milk eggs
butter
cheese
milk
butter`,
    outputFormat: `Initial list: ['bread', 'milk', 'eggs']
After adding: ['bread', 'milk', 'eggs', 'butter', 'cheese']
After removing: ['bread', 'eggs', 'butter', 'cheese']
Sorted list: ['bread', 'butter', 'cheese', 'eggs']
Number of items: 4
'butter' is in the list: True`,
    examples: [
      {
        input: `bread milk eggs
butter
cheese
milk
butter`,
        output: `Initial list: ['bread', 'milk', 'eggs']
After adding: ['bread', 'milk', 'eggs', 'butter', 'cheese']
After removing: ['bread', 'eggs', 'butter', 'cheese']
Sorted list: ['bread', 'butter', 'cheese', 'eggs']
Number of items: 4
'butter' is in the list: True`,
        explanation: "Added butter and cheese, removed milk, sorted the list"
      },
      {
        input: `apple banana
pear
kiwi
banana
apple`,
        output: `Initial list: ['apple', 'banana']
After adding: ['apple', 'banana', 'pear', 'kiwi']
After removing: ['apple', 'pear', 'kiwi']
Sorted list: ['apple', 'kiwi', 'pear']
Number of items: 3
'apple' is in the list: True`,
        explanation: "Added pear and kiwi, removed banana"
      },
      {
        input: `tea coffee sugar
milk
honey
sugar
tea`,
        output: `Initial list: ['tea', 'coffee', 'sugar']
After adding: ['tea', 'coffee', 'sugar', 'milk', 'honey']
After removing: ['tea', 'coffee', 'milk', 'honey']
Sorted list: ['coffee', 'honey', 'milk', 'tea']
Number of items: 4
'tea' is in the list: True`,
        explanation: "Added milk and honey, removed sugar"
      }
    ],
    solution: {
      code: `# Shopping list management system
shopping_list = input().split()
print(f"Initial list: {shopping_list}")

item1 = input().strip()
item2 = input().strip()
shopping_list.append(item1)
shopping_list.append(item2)
print(f"After adding: {shopping_list}")

to_remove = input().strip()
shopping_list.remove(to_remove)
print(f"After removing: {shopping_list}")

shopping_list.sort()
print(f"Sorted list: {shopping_list}")

print(f"Number of items: {len(shopping_list)}")

check_item = input().strip()
print(f"'{check_item}' is in the list: {check_item in shopping_list}")`,
      explanation: "The solution reads data with input() and uses append(), remove(), sort(), len(), and the in operator."
    },
    hints: [
      "Initial list: input().split()",
      "Use append() to add elements",
      "Use remove() to remove by value",
      "Use sort() to sort",
      "Use len() and the in operator"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you create an empty list?",
        options: [
          "Only with list()",
          "Only with []",
          "With either list() or []",
          "With list[]"
        ],
        correctAnswer: 2,
        explanation: "Both list() and [] create an empty list. Beginners often think only one syntax works. list[] is invalid."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmy_list = [1, 2, 3]\nmy_list.append(4)\nprint(len(my_list))\n```",
        options: [
          "3",
          "4",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "append() adds an element to the end of the list, so len() returns 4."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method removes and returns the last element of a list?",
        options: [
          "remove()",
          "pop()",
          "delete()",
          "clear()"
        ],
        correctAnswer: 1,
        explanation: "The pop() method removes and returns the last element (or the element at a given index)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmy_list = [1, 2, 3, 4, 5]\nprint(my_list[1:3])\n```",
        options: [
          "[1, 2, 3]",
          "[2, 3]",
          "[2, 3, 4]",
          "An error"
        ],
        correctAnswer: 1,
        explanation: "The slice [1:3] returns the elements at indexes 1 and 2 (not including 3), which is [2, 3]."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you change list elements after creating the list?",
        options: [
          "No, lists are immutable",
          "Yes, lists are mutable",
          "You can only add, but not change",
          "You can only remove, but not add"
        ],
        correctAnswer: 1,
        explanation: "Lists are mutable, so elements can be changed, added, and removed."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmatrix = [[1, 2], [3, 4]]\nprint(matrix[1][0])\n```",
        options: [
          "1",
          "2",
          "3",
          "4"
        ],
        correctAnswer: 2,
        explanation: "matrix[1] returns [3, 4], and matrix[1][0] returns the first element of that list, which is 3."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method sorts a list in place?",
        options: [
          "sorted()",
          "sort()",
          "order()",
          "arrange()"
        ],
        correctAnswer: 1,
        explanation: "The sort() method sorts a list in place (modifies the original list), while sorted() returns a new sorted list."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
