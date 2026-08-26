/**
 * Lesson 00-7: Nested Data Structures
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_7 = {
  lessonId: "lesson-00-7",
  moduleId: "module-00",
  order: 7,
  title: "Nested Data Structures",
  
  learningObjectives: [
    "Create nested lists and dictionaries",
    "Access nested data",
    "Manipulate complex structures",
    "Apply them to real-world tasks"
  ],
  
  prerequisites: ["lesson-00-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are nested structures?",
        content: `Nested data structures are structures inside other structures. This is a very powerful Python feature that lets you organize complex data.

**Types of nested structures:**
- Lists inside lists (matrices)
- Dictionaries inside dictionaries
- Lists inside dictionaries
- Dictionaries inside lists
- Combinations of all of the above

**Why this is useful:**
- Organizing complex data
- Representing real structures (for example, a database)
- Convenient access to data
- Efficient information storage`
      },
      {
        title: "Nested lists (matrices)",
        content: `**Creating a matrix:**
\`\`\`python
# 3x3 matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix)  # [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
\`\`\`

**Accessing elements:**
\`\`\`python
# Get the first row
print(matrix[0])  # [1, 2, 3]

# Get the first element of the first row
print(matrix[0][0])  # 1

# Get the second element of the third row
print(matrix[2][1])  # 8
\`\`\`

**Practical example — grade table:**
\`\`\`python
# Student grade table
grades = [
    ['Alexander', 85, 92, 78],
    ['Maria', 95, 88, 91],
    ['Dmitry', 78, 85, 90]
]

# Get Alexander's grades
alex_grades = grades[0][1:]  # [85, 92, 78]
print("Alexander's grades:", alex_grades)

# Get Maria's second grade
maria_second = grades[1][2]  # 88
print("Maria's second grade:", maria_second)

# Calculate Alexander's average
alex_scores = grades[0][1:]
alex_average = sum(alex_scores) / len(alex_scores)
print("Alexander's average:", alex_average)

# Calculate Maria's average
maria_scores = grades[1][1:]
maria_average = sum(maria_scores) / len(maria_scores)
print("Maria's average:", maria_average)

# Calculate Dmitry's average
dmitro_scores = grades[2][1:]
dmitro_average = sum(dmitro_scores) / len(dmitro_scores)
print("Dmitry's average:", dmitro_average)
\`\`\``
      },
      {
        title: "Nested dictionaries",
        content: `**Creating a nested dictionary:**
\`\`\`python
# Dictionary with nested dictionaries
students = {
    'student1': {
        "name": 'Alexander',
        'age': 16,
        'grades': [85, 92, 78],
        'contact': {
            'email': 'alex@example.com',
            'phone': '+15551234567'
        }
    },
    'student2': {
        "name": 'Maria',
        'age': 15,
        'grades': [95, 88, 91],
        'contact': {
            'email': 'maria@example.com',
            'phone': '+15557654321'
        }
    }
}
\`\`\`

**Accessing nested values:**
\`\`\`python
# Get the first student's name
print(students['student1']["name"])  # Alexander

# Get the second student's grades
print(students['student2']['grades'])  # [95, 88, 91]

# Get the first student's email
print(students['student1']['contact']['email'])  # alex@example.com
\`\`\`

**Modifying nested data:**
\`\`\`python
# Add a new grade
students['student1']['grades'].append(90)

# Change the age
students['student1']['age'] = 17

# Add a new field
students['student1']['city'] = 'New York'
\`\`\``
      },
      {
        title: "Lists of dictionaries",
        content: `**Creating a list of dictionaries:**
\`\`\`python
# List of dictionaries (like a database table)
students = [
    {
        "name": 'Alexander',
        'age': 16,
        'grades': [85, 92, 78]
    },
    {
        "name": 'Maria',
        'age': 15,
        'grades': [95, 88, 91]
    },
    {
        "name": 'Dmitry',
        'age': 16,
        'grades': [78, 85, 90]
    }
]
\`\`\`

**Accessing data:**
\`\`\`python
# Get the first student
first_student = students[0]
print(first_student["name"])  # Alexander

# Get the second student's grades
second_grades = students[1]['grades']
print(second_grades)  # [95, 88, 91]

# Get the third student's first grade
third_first_grade = students[2]['grades'][0]
print(third_first_grade)  # 78
\`\`\`

**Working with a list of dictionaries:**
\`\`\`python
# Get the first student's data
student1 = students[0]
name1 = student1["name"]
grades1 = student1['grades']
average1 = sum(grades1) / len(grades1)
print(name1 + ":", average1)

# Get the second student's data
student2 = students[1]
name2 = student2["name"]
grades2 = student2['grades']
average2 = sum(grades2) / len(grades2)
print(name2 + ":", average2)

# Get the third student's data
student3 = students[2]
name3 = student3["name"]
grades3 = student3['grades']
average3 = sum(grades3) / len(grades3)
print(name3 + ":", average3)

# Print all averages
averages = [average1, average2, average3]
print("All averages:", averages)
print("(In later modules we will learn how to automatically find the top student)")
\`\`\`

**Note:** In later modules we will learn loops (for, while) and conditional statements (if/elif/else), which will let you automate such checks.`
      },
      {
        title: "Dictionaries with lists",
        content: `**Creating a dictionary with lists:**
\`\`\`python
# Dictionary where values are lists
school = {
    'class_9A': ['Alexander', 'Maria', 'Dmitry'],
    'class_9B': ['Anna', 'Oleg', 'Sophia'],
    'class_10A': ['Ivan', 'Catherine', 'Michael']
}

# Get the list of students in class 9A
class_9a = school['class_9A']
print(class_9a)  # ['Alexander', 'Maria', 'Dmitry']

# Add a new student
school['class_9A'].append('Oksana')

# Get the first student in class 9B
first_student_9b = school['class_9B'][0]
print(first_student_9b)  # Anna
\`\`\`

**More complex example:**
\`\`\`python
# Dictionary with lists of dictionaries
school_data = {
    'class_9A': [
        {"name": 'Alexander', 'score': 85},
        {"name": 'Maria', 'score': 92},
        {"name": 'Dmitry', 'score': 78}
    ],
    'class_9B': [
        {"name": 'Anna', 'score': 95},
        {"name": 'Oleg', 'score': 88}
    ]
}

# Get Alexander's score
alex_score = school_data['class_9A'][0]['score']
print(alex_score)  # 85

# Find the average score for class 9A
# Get each student's score separately
student1_score = school_data['class_9A'][0]['score']
student2_score = school_data['class_9A'][1]['score']
student3_score = school_data['class_9A'][2]['score']

# Calculate the average
class_9a_scores = [student1_score, student2_score, student3_score]
average_9a = sum(class_9a_scores) / len(class_9a_scores)
print("Class 9A average:", average_9a)
\`\`\``
      },
      {
        title: "Practical applications",
        content: `**User database:**
\`\`\`python
# User database
users = {
    'user1': {
        'username': 'alex',
        'email': 'alex@example.com',
        'age': 16,
        'active': True,
        'orders': [
            {'id': 1, 'total': 100.50},
            {'id': 2, 'total': 250.00}
        ]
    },
    'user2': {
        'username': 'maria',
        'email': 'maria@example.com',
        'age': 15,
        'active': True,
        'orders': [
            {'id': 3, 'total': 75.25}
        ]
    }
}

# Find the total order amount for user1
user1 = users.get('user1')
user1_orders = user1.get('orders', [])

# Get the total of each order
order1_total = user1_orders[0]['total']
order2_total = user1_orders[1]['total']

# Calculate the overall total
total = order1_total + order2_total
print("Total order amount:", total, "USD")
\`\`\`

**Application configuration:**
\`\`\`python
# Application configuration
config = {
    'database': {
        'host': 'localhost',
        'port': 5432,
        'name': 'mydb',
        'credentials': {
            'username': 'admin',
            'password': 'secret'
        }
    },
    'api': {
        'base_url': 'https://api.example.com',
        'endpoints': ['/users', '/posts', '/comments']
    }
}

# Get the users URL
users_endpoint = config['api']['endpoints'][0]
full_url = config['api']['base_url'] + users_endpoint
print(full_url)  # https://api.example.com/users
\`\`\`

Nested data structures are a powerful tool for organizing complex data!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Matrix (nested lists)",
      code: `# Creating and working with a matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Get the first row
print(f"First row: {matrix[0]}")

# Get element [1][1]
print(f"Element [1][1]: {matrix[1][1]}")

# Get a column (first element of each row)
# Get the first element of each row separately
column = [matrix[0][0], matrix[1][0], matrix[2][0]]
print("First column:", column)`,
      explanation: "Demonstrates working with a matrix as a nested list."
    },
    {
      title: "Example 2: Nested dictionaries",
      code: `# Nested dictionaries
student = {
    "name": 'Alexander',
    'age': 16,
    'contact': {
        'email': 'alex@example.com',
        'phone': '+15551234567'
    }
}

# Access nested data
print(f"Name: {student["name"]}")
print(f"Email: {student['contact']['email']}")

# Modification
student['contact']['phone'] = '+15559876543'
print(f"New phone: {student['contact']['phone']}")`,
      explanation: "Shows creating and accessing nested dictionaries."
    },
    {
      title: "Example 3: List of dictionaries",
      code: `# List of dictionaries
students = [
    {"name": 'Alexander', 'score': 85},
    {"name": 'Maria', 'score': 92},
    {"name": 'Dmitry', 'score': 78}
]

# Find the average score
# Get each student's score
score1 = students[0]['score']
score2 = students[1]['score']
score3 = students[2]['score']

scores = [score1, score2, score3]
average = sum(scores) / len(scores)
print("Average score:", average)

# Print all scores
print("All scores:", scores)
print("(In later modules we will learn how to automatically find the top student)")`,
      explanation: "Demonstrates working with a list of dictionaries and finding values."
    },
    {
      title: "Example 4: Dictionary with lists",
      code: `# Dictionary with lists
classes = {
    'math': [85, 92, 78, 95],
    'physics': [88, 90, 85, 92],
    'chemistry': [75, 80, 85, 90]
}

# Find the average score for each subject
# Math
math_grades = classes['math']
math_average = sum(math_grades) / len(math_grades)
print("math:", math_average)

# Physics
physics_grades = classes['physics']
physics_average = sum(physics_grades) / len(physics_grades)
print("physics:", physics_average)

# Chemistry
chemistry_grades = classes['chemistry']
chemistry_average = sum(chemistry_grades) / len(chemistry_grades)
print("chemistry:", chemistry_average)

# Add a new grade
classes['math'].append(98)
print("Updated math grades:", classes['math'])`,
      explanation: "Shows working with a dictionary where values are lists."
    },
    {
      title: "Example 5: Complex structure",
      code: `# Complex nested structure
school = {
    'class_9A': {
        'homeroom_teacher': 'John Peterson',
        'students': [
            {"name": 'Alexander', 'grades': [85, 92, 78]},
            {"name": 'Maria', 'grades': [95, 88, 91]}
        ]
    }
}

# Get Alexander's grades
alex_grades = school['class_9A']['students'][0]['grades']
print(f"Alexander's grades: {alex_grades}")

# Calculate Alexander's average
alex_avg = sum(alex_grades) / len(alex_grades)
print(f"Alexander's average: {alex_avg:.2f}")`,
      explanation: "Demonstrates working with a complex nested data structure."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Getting confused with nested structure indexing",
      explanation: "When working with nested structures, it is easy to get lost in the indexes.",
      correctApproach: "Remember: matrix[0][1] means the first row, second element. Move from the outside in."
    },
    {
      mistake: "Trying to modify immutable structures inside",
      explanation: "If there is a tuple inside a dictionary, you cannot change it.",
      correctApproach: "Use lists instead of tuples if you need to make changes."
    },
    {
      mistake: "Forgetting to check whether a key exists before accessing it",
      explanation: "If the key is missing, Python raises a KeyError.",
      correctApproach: "Use get() for safe access: dict.get('key', 'default')"
    },
    {
      mistake: "Confusing lists and dictionaries when accessing data",
      explanation: "Lists use indexes [0], dictionaries use keys ['key'].",
      correctApproach: "Remember: lists are sequences with indexes; dictionaries are key-value pairs."
    }
  ],
  
  summary: `In this lesson we learned:

1. Nested lists — matrices and multidimensional structures
2. Nested dictionaries — dictionaries inside dictionaries
3. Lists of dictionaries — data tables
4. Dictionaries with lists — organizing data by category
5. Complex structures — combinations of all types

Nested data structures let you organize complex data efficiently! Next lesson — practice with all the structures you have learned.`,
  
  practiceTask: {
    title: "Library management system",
    description: "Create a program to manage a library of books",
    problemStatement: `Write a program that:
1. Reads data about 3 books (for each: title, author, number of pages — one value per line)
2. Stores the books in a data structure (a dictionary with a list of dictionaries)
3. Prints information about all books

Input format:
Kobzar
Taras Shevchenko
500
Field Notes on Ukrainian Madness
Oksana Zabuzhko
350
Haidamaky
Taras Shevchenko
200`,
    outputFormat: `Book 1: "Kobzar" by Taras Shevchenko (500 pages)
Book 2: "Field Notes on Ukrainian Madness" by Oksana Zabuzhko (350 pages)
Book 3: "Haidamaky" by Taras Shevchenko (200 pages)`,
    examples: [
      {
        input: `Kobzar
Taras Shevchenko
500
Field Notes on Ukrainian Madness
Oksana Zabuzhko
350
Haidamaky
Taras Shevchenko
200`,
        output: `Book 1: "Kobzar" by Taras Shevchenko (500 pages)
Book 2: "Field Notes on Ukrainian Madness" by Oksana Zabuzhko (350 pages)
Book 3: "Haidamaky" by Taras Shevchenko (200 pages)`,
        explanation: "Three classic Ukrainian books"
      },
      {
        input: `1984
George Orwell
328
Harry Potter
J.K. Rowling
400
Forest Song
Lesya Ukrainka
250`,
        output: `Book 1: "1984" by George Orwell (328 pages)
Book 2: "Harry Potter" by J.K. Rowling (400 pages)
Book 3: "Forest Song" by Lesya Ukrainka (250 pages)`,
        explanation: "Another set of three books"
      },
      {
        input: `Shadows of Forgotten Ancestors
Mykhailo Kotsiubynsky
180
The Kaidash Family
Ivan Nechuy-Levytsky
220
Eneida
Ivan Kotliarevsky
300`,
        output: `Book 1: "Shadows of Forgotten Ancestors" by Mykhailo Kotsiubynsky (180 pages)
Book 2: "The Kaidash Family" by Ivan Nechuy-Levytsky (220 pages)
Book 3: "Eneida" by Ivan Kotliarevsky (300 pages)`,
        explanation: "Third test set of books"
      }
    ],
    solution: {
      code: `# Library management system
title1 = input().strip()
author1 = input().strip()
pages1 = int(input())

title2 = input().strip()
author2 = input().strip()
pages2 = int(input())

title3 = input().strip()
author3 = input().strip()
pages3 = int(input())

library = {
    "books": [
        {"title": title1, "author": author1, "pages": pages1},
        {"title": title2, "author": author2, "pages": pages2},
        {"title": title3, "author": author3, "pages": pages3},
    ]
}

book1 = library["books"][0]
print(f'Book 1: "{book1["title"]}" by {book1["author"]} ({book1["pages"]} pages)')

book2 = library["books"][1]
print(f'Book 2: "{book2["title"]}" by {book2["author"]} ({book2["pages"]} pages)')

book3 = library["books"][2]
print(f'Book 3: "{book3["title"]}" by {book3["author"]} ({book3["pages"]} pages)')`,
      explanation: "The solution reads data for three books with input() and stores them in a nested dictionary + list of dictionaries structure."
    },
    hints: [
      "For each book, read 3 lines: title, author, pages",
      "Store books in a list of dictionaries inside the library dictionary",
      "Use f-strings for output"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
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
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you get a value from a nested dictionary?",
        options: [
          "dict['key1']['key2']",
          "dict['key1'][0]",
          "dict[0]['key1']",
          "dict.key1.key2"
        ],
        correctAnswer: 0,
        explanation: "To access nested dictionaries, use a sequence of keys: dict['key1']['key2']"
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nstudents = [{'name': 'Alex', 'age': 16}, {'name': 'Maria', 'age': 15}]\nprint(students[1]['name'])\n```",
        options: [
          "Alex",
          "Maria",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "students[1] returns the second dictionary {'name': 'Maria', 'age': 15}, and students[1]['name'] returns 'Maria'."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you add an element to a list inside a dictionary?",
        options: [
          "dict['key'].append(item)",
          "dict['key'] += item",
          "dict['key'] = item",
          "dict.append(item)"
        ],
        correctAnswer: 0,
        explanation: "If a dictionary value is a list, use append(): dict['key'].append(item)"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndata = {'users': [{'name': 'Alex'}, {'name': 'Maria'}]}\nprint(data['users'][0]['name'])\n```",
        options: [
          "users",
          "Alex",
          "Maria",
          "An error"
        ],
        correctAnswer: 1,
        explanation: "data['users'] returns a list, [0] gets the first element {'name': 'Alex'}, and ['name'] gets 'Alex'."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
