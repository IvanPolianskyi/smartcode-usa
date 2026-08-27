/**
 * Lesson 00-4: Dictionaries (dict): keys, values, methods
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_00_4 = {
  lessonId: "lesson-00-4",
  moduleId: "module-00",
  order: 4,
  title: "Dictionaries (dict): keys, values, methods",
  
  learningObjectives: [
    "Create and modify dictionaries",
    "Access values by keys",
    "Work with nested dictionaries",
    "Use basic dictionary methods"
  ],
  
  prerequisites: ["lesson-00-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are dictionaries?",
        content: `We have already learned about *sequences* in Python (lists). Now let's move on to **mappings** in Python.

**What is a mapping?**
A mapping is a collection of objects stored by a **key**, unlike sequences, which store objects by their relative position. This is an important difference!

A **Python dictionary** consists of a key and an associated value. The value can be almost any Python object.

**Why are dictionaries useful?**
- Fast lookup by key
- Convenient storage of structured data
- Organizing data in "key-value" pairs

**What we will learn:**
1. Creating dictionaries
2. Accessing values by keys
3. Adding and changing values
4. Nested dictionaries`
      },
      {
        title: "Creating dictionaries",
        content: `**Basic syntax:**
Dictionaries are created using curly braces \`{}\` and a colon \`:\` to mark the key and value:

\`\`\`python
# Simple dictionary
my_dict = {'key1': 'value1', 'key2': 'value2'}
print(my_dict)  # {'key1': 'value1', 'key2': 'value2'}
\`\`\`

**Accessing values by key:**
\`\`\`python
my_dict = {'name': 'Alexander', 'age': 16, 'city': 'New York'}
print(my_dict['name'])  # Alexander
print(my_dict['age'])    # 16
\`\`\`

**Dictionaries are very flexible with data types:**
\`\`\`python
my_dict = {
    'key1': 123,
    'key2': [12, 23, 33],
    'key3': ['item0', 'item1', 'item2'],
    'key4': {'nested': 'dictionary'}
}
\`\`\`

**Accessing nested elements:**
\`\`\`python
# Get the list
print(my_dict['key2'])  # [12, 23, 33]

# Get a list element
print(my_dict['key3'][0])  # 'item0'

# Call a method on a value
print(my_dict['key3'][0].upper())  # 'ITEM0'
\`\`\`

**Empty dictionary:**
\`\`\`python
empty_dict = {}
# or
empty_dict = dict()
\`\`\``
      },
      {
        title: "Modifying dictionaries",
        content: `**Changing a value:**
\`\`\`python
my_dict = {'key1': 123, 'key2': 456}

# Change a value
my_dict['key1'] = 999
print(my_dict)  # {'key1': 999, 'key2': 456}
\`\`\`

**Shorthand operators:**
\`\`\`python
my_dict = {'key1': 123}

# Add to or subtract from a value
my_dict['key1'] += 100
print(my_dict['key1'])  # 223

my_dict['key1'] -= 50
print(my_dict['key1'])  # 173
\`\`\`

**Adding new keys:**
\`\`\`python
# Start with an empty dictionary
my_dict = {}

# Add keys step by step
my_dict['name'] = 'Alexander'
my_dict['age'] = 16
my_dict['city'] = 'New York'

print(my_dict)  # {'name': 'Alexander', 'age': 16, 'city': 'New York'}
\`\`\`

**Updating several values:**
\`\`\`python
my_dict = {'name': 'Alexander', 'age': 16}
my_dict.update({'age': 17, 'city': 'New York'})
print(my_dict)  # {'name': 'Alexander', 'age': 17, 'city': 'New York'}
\`\`\``
      },
      {
        title: "Nested dictionaries",
        content: `Dictionaries can contain other dictionaries! This is a very powerful Python feature.

**Example of a nested dictionary:**
\`\`\`python
# Dictionary with nested dictionaries
students = {
    'student1': {
        'name': 'Alexander',
        'age': 16,
        'grades': [85, 92, 78]
    },
    'student2': {
        'name': 'Maria',
        'age': 15,
        'grades': [95, 88, 91]
    }
}
\`\`\`

**Accessing nested values:**
\`\`\`python
# Get the first student's name
print(students['student1']['name'])  # Alexander

# Get the second student's grades
print(students['student2']['grades'])  # [95, 88, 91]

# Get the first student's first grade
print(students['student1']['grades'][0])  # 85
\`\`\`

**Changing nested values:**
\`\`\`python
# Add a new grade
students['student1']['grades'].append(90)
print(students['student1']['grades'])  # [85, 92, 78, 90]

# Change the age
students['student1']['age'] = 17
\`\`\`

**More complex example:**
\`\`\`python
school = {
    'class_9A': {
        'homeroom_teacher': 'John Peterson',
        'students': {
            'student1': {'name': 'Alexander', 'score': 85},
            'student2': {'name': 'Maria', 'score': 92}
        }
    }
}

# Get a student's score
print(school['class_9A']['students']['student1']['score'])  # 85
\`\`\``
      },
      {
        title: "Basic dictionary methods",
        content: `**keys() - get all keys:**
\`\`\`python
my_dict = {'name': 'Alexander', 'age': 16, 'city': 'New York'}
keys = list(my_dict.keys())
print(keys)  # ['name', 'age', 'city']
\`\`\`

**values() - get all values:**
\`\`\`python
values = list(my_dict.values())
print(values)  # ['Alexander', 16, 'New York']
\`\`\`

**items() - get key-value pairs:**
\`\`\`python
items = list(my_dict.items())
print(items)  # [('name', 'Alexander'), ('age', 16), ('city', 'New York')]
\`\`\`
*Note: items() returns pairs that we currently treat as lists. We will learn more about this later.*

**get() - get a value by key:**
\`\`\`python
# If the key exists, return the value
print(my_dict.get('name'))  # Alexander

# If the key is missing, you can provide a default value
print(my_dict.get('phone', 'Not specified'))  # 'Not specified'
\`\`\`

**in - check whether a key exists:**
\`\`\`python
my_dict = {'name': 'Alexander', 'age': 16}
print('name' in my_dict)  # True
print('phone' in my_dict)  # False
\`\`\``
      },
      {
        title: "Practical applications",
        content: `**Dictionary as a database:**
\`\`\`python
# User database
users = {
    'user1': {
        'username': 'alex',
        'email': 'alex@example.com',
        'age': 16,
        'active': True
    },
    'user2': {
        'username': 'maria',
        'email': 'maria@example.com',
        'age': 15,
        'active': True
    }
}

# Get user1's data
user1 = users.get('user1')
print("User user1:", user1)

# Get user1's email
user1_email = users['user1']['email']
print("Email user1:", user1_email)
\`\`\`

**Simple dictionary example:**
\`\`\`python
# Storing student information
students = {
    'Alexander': 85,
    'Maria': 92,
    'Dmitry': 78
}

# Get a specific student's grade
print("Alexander's grade:", students['Alexander'])

# Add a new student
students['Anna'] = 95
print("Updated dictionary:", students)

# Get all names
names = list(students.keys())
print("All names:", names)
\`\`\`

You now have a solid basic understanding of how to create and use dictionaries!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Creating and accessing dictionaries",
      code: `# Creating a dictionary
student = {
    'name': 'Alexander',
    'age': 16,
    'grade': 9,
    'city': 'New York'
}

# Accessing values
print("Name:", student['name'])
print("Age:", student['age'])
print("Grade:", student['grade'])`,
      explanation: "Demonstrates creating a dictionary and accessing values by keys."
    },
    {
      title: "Example 2: Modifying dictionaries",
      code: `# Modifying a dictionary
scores = {'math': 85, 'physics': 92}

# Add a new subject
scores['chemistry'] = 78
print("After adding:", scores)

# Change a score
scores['math'] = 90
print("After changing:", scores)

# Check whether a key exists
print("Physics in dictionary:", 'physics' in scores)`,
      explanation: "Shows how to add and change dictionary entries, and how to check for keys."
    },
    {
      title: "Example 3: Nested dictionaries",
      code: `# Nested dictionaries
school = {
    'class_9A': {
        'homeroom_teacher': 'John Peterson',
        'students': {
            'student1': {'name': 'Alexander', 'score': 85},
            'student2': {'name': 'Maria', 'score': 92}
        }
    }
}

# Access nested values
print("Homeroom teacher:", school['class_9A']['homeroom_teacher'])
print("Alexander's score:", school['class_9A']['students']['student1']['score'])`,
      explanation: "Demonstrates working with nested dictionaries and accessing deeply nested values."
    },
    {
      title: "Example 4: Dictionary methods",
      code: `# Dictionary methods
my_dict = {'name': 'Alexander', 'age': 16, 'city': 'New York'}

# Get keys
print("Keys:", list(my_dict.keys()))

# Get values
print("Values:", list(my_dict.values()))

# Get pairs
print("Items:", list(my_dict.items()))

# Safe access
print("Phone:", my_dict.get('phone', 'Not specified'))`,
      explanation: "Shows how to use the main dictionary methods to work with data."
    },
    {
      title: "Example 5: Working with keys and values",
      code: `# Working with keys and values
grades = {
    'Alexander': 85,
    'Maria': 92,
    'Dmitry': 78,
    'Anna': 95
}

# Get all names (keys)
names = list(grades.keys())
print("All names:", names)

# Get all grades (values)
scores = list(grades.values())
print("All grades:", scores)

# Get a specific student's grade
print("Alexander's grade:", grades['Alexander'])`,
      explanation: "Demonstrates working with dictionary keys and values."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing keys and values",
      explanation: "Keys are what we look up by; values are what we get back.",
      correctApproach: "Remember: my_dict[key] = value, where key is the key and value is the value."
    },
    {
      mistake: "Using lists as keys",
      explanation: "Dictionary keys must be immutable types.",
      correctApproach: "Use strings or numbers as keys. Do not use lists as keys."
    },
    {
      mistake: "Forgetting to use list() with keys(), values(), and items()",
      explanation: "The keys(), values(), and items() methods return special objects that need to be converted to a list.",
      correctApproach: "Always use list(): keys = list(my_dict.keys())"
    }
  ],
  
  summary: `In this lesson we learned:

1. Creating dictionaries - using curly braces {} and a colon :
2. Accessing values - by keys with square brackets
3. Modification - adding and changing values
4. Nested dictionaries - dictionaries inside dictionaries
5. Basic methods - keys(), values(), items(), get()
6. Checking for a key - using the in operator

Dictionaries are a powerful tool for organizing structured data!`,
  
  practiceTask: {
    title: "Working with dictionaries",
    description: "Create a program that works with dictionaries and their methods",
    problemStatement: `Write a program that:
1. Reads name, age, city, subject, and a new age (one value per line)
2. Creates a dictionary with student information (name, age, city)
3. Adds a new key (subject) with a value
4. Changes the age to the new value
5. Uses the get() method for safe access to a phone number
6. Prints the keys, values, and the result of get()

Input format:
Alexander
16
New York
Math
17`,
    outputFormat: `Name: Alexander
Age: 16
City: New York
Subject: Math
Updated age: 17
Keys: ['name', 'age', 'city', 'subject']
Values: ['Alexander', 17, 'New York', 'Math']
Phone: Not specified`,
    examples: [
      {
        input: `Alexander
16
New York
Math
17`,
        output: `Name: Alexander
Age: 16
City: New York
Subject: Math
Updated age: 17
Keys: ['name', 'age', 'city', 'subject']
Values: ['Alexander', 17, 'New York', 'Math']
Phone: Not specified`,
        explanation: "Created a dictionary, added a subject, updated age, get() returned the default value"
      },
      {
        input: `Maria
15
Chicago
Physics
16`,
        output: `Name: Maria
Age: 15
City: Chicago
Subject: Physics
Updated age: 16
Keys: ['name', 'age', 'city', 'subject']
Values: ['Maria', 16, 'Chicago', 'Physics']
Phone: Not specified`,
        explanation: "Another set of student data"
      },
      {
        input: `Ivan
17
Boston
History
18`,
        output: `Name: Ivan
Age: 17
City: Boston
Subject: History
Updated age: 18
Keys: ['name', 'age', 'city', 'subject']
Values: ['Ivan', 18, 'Boston', 'History']
Phone: Not specified`,
        explanation: "Third test case with a student dictionary"
      }
    ],
    solution: {
      code: `# Working with dictionaries
name = input().strip()
age = int(input())
city = input().strip()
subject = input().strip()
new_age = int(input())

student = {
    "name": name,
    "age": age,
    "city": city
}

print("Name:", student["name"])
print("Age:", student["age"])
print("City:", student["city"])

student["subject"] = subject
print("Subject:", student["subject"])

student["age"] = new_age
print("Updated age:", student["age"])

phone = student.get("phone", "Not specified")
print("Keys:", list(student.keys()))
print("Values:", list(student.values()))
print("Phone:", phone)`,
      explanation: "The solution reads data with input() and demonstrates creating a dictionary, adding/changing keys, and the keys(), values(), and get() methods."
    },
    hints: [
      "Read 5 lines with input()",
      "To add a new key: dict['key'] = value",
      "The get() method lets you provide a default value",
      "Use list() with keys() and values()"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you create an empty dictionary?",
        options: [
          "Only with dict()",
          "Only with {}",
          "With either dict() or {}",
          "With dict[]"
        ],
        correctAnswer: 2,
        explanation: "Both dict() and {} create an empty dictionary. Note that set() creates an empty set — {} alone is a dict, not a set."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmy_dict = {'a': 1, 'b': 2}\nprint(my_dict.get('c', 0))\n```",
        options: [
          "1",
          "2",
          "0",
          "An error"
        ],
        correctAnswer: 2,
        explanation: "get() returns the default value (0) if the key is not in the dictionary."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method returns key-value pairs?",
        options: [
          "keys()",
          "values()",
          "items()",
          "pairs()"
        ],
        correctAnswer: 2,
        explanation: "The items() method returns key-value pairs."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmy_dict = {'x': 1, 'y': 2}\nmy_dict['z'] = 3\nprint(len(my_dict))\n```",
        options: [
          "2",
          "3",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "After adding the key 'z', the dictionary contains 3 elements, so len() returns 3."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you use a list as a dictionary key?",
        options: [
          "Yes, always",
          "No, lists cannot be used as keys",
          "Only empty lists",
          "Only lists with one element"
        ],
        correctAnswer: 1,
        explanation: "Dictionary keys must be simple types like strings or numbers. Lists cannot be used as keys."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nmy_dict = {'a': {'b': 2}}\nprint(my_dict['a']['b'])\n```",
        options: [
          "2",
          "{'b': 2}",
          "An error",
          "None"
        ],
        correctAnswer: 0,
        explanation: "my_dict['a'] returns {'b': 2}, and my_dict['a']['b'] returns 2."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
