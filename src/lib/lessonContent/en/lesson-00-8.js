/**
 * Lesson 00-8: Practice: Problems with Objects and Data Structures
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_8 = {
  lessonId: "lesson-00-8",
  moduleId: "module-00",
  order: 8,
  title: "Practice: Problems with Objects and Data Structures",
  
  learningObjectives: [
    "Solve practical problems with objects",
    "Apply all the knowledge you have gained",
    "Analyze and optimize solutions",
    "Practice working with data"
  ],
  
  prerequisites: ["lesson-00-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Practice with all data structures",
        content: `In this lesson we will reinforce everything you have learned about Python objects and data structures. We will solve practical problems that combine different concepts.

**What we will review:**
- Variables and data types (int, float, str, bool)
- Lists and their methods
- Dictionaries and their methods
- Tuples and sets
- Strings and formatting
- Nested data structures

**Approach to solving problems:**
1. Understand the problem
2. Determine which data structures you need
3. Break the problem into subproblems
4. Write the code
5. Test the solution
6. Optimize if needed

**Useful techniques:** checking \`key in dict\`, \`.get(key, default)\`, iterating with \`for item in list\`, copying a list with \`items.copy()\` or \`list(items)\` before modifying it in a loop.`
      },
      {
        title: "Problem 1: Grading system",
        content: `**Task:** Create a system for storing and processing student grades.

**Requirements:**
- Store the student's name, subjects, and grades
- Calculate the average score
- Find the best and worst student
- Group grades by subject

**Solution:**
\`\`\`python
# Data structure
students = [
    {
        'name': 'Alexander',
        'grades': {
            'math': [85, 92, 78],
            'physics': [88, 90, 85],
            'chemistry': [75, 80, 85]
        }
    },
    {
        'name': 'Maria',
        'grades': {
            'math': [95, 98, 92],
            'physics': [90, 88, 91],
            'chemistry': [92, 95, 90]
        }
    }
]

# Calculate the average for the first student (Alexander)
student1 = students[0]
student1_all_grades = []
# Get grades from each subject
student1_all_grades.extend(student1['grades']['math'])
student1_all_grades.extend(student1['grades']['physics'])
student1_all_grades.extend(student1['grades']['chemistry'])
student1_average = sum(student1_all_grades) / len(student1_all_grades)
print(student1['name'] + ":", student1_average)

# Calculate the average for the second student (Maria)
student2 = students[1]
student2_all_grades = []
student2_all_grades.extend(student2['grades']['math'])
student2_all_grades.extend(student2['grades']['physics'])
student2_all_grades.extend(student2['grades']['chemistry'])
student2_average = sum(student2_all_grades) / len(student2_all_grades)
print(student2['name'] + ":", student2_average)

# Print all averages
averages = [student1_average, student2_average]
print("\\nAll averages:", averages)
print("(In later modules we will learn how to automatically find the top student)")
\`\`\``
      },
      {
        title: "Problem 2: Text analysis",
        content: `**Task:** Create a program for analyzing text.

**Requirements:**
- Count the number of words
- Find the most frequent words
- Find the longest and shortest word
- Remove duplicate words

**Solution:**
\`\`\`python
text = "Python is a great programming language Python is a very popular language"

# Split into words
words = text.split()
print(f"Number of words: {len(words)}")

# Find unique words
unique_words = set(words)
print(f"Unique words: {len(unique_words)}")

# Print the first word as an example
# (In later modules we will learn how to automatically find the longest and shortest word)
first_word = words[0]
print(f"First word: {first_word} ({len(first_word)} characters)")
print("(In later modules we will learn how to automatically find the longest and shortest word)")

# Count word frequencies (manually for each word)
word_count = {}
# Check each word separately
word_count['Python'] = words.count('Python')
word_count['is'] = words.count('is')
word_count['a'] = words.count('a')
word_count['great'] = words.count('great')
word_count['programming'] = words.count('programming')
word_count['language'] = words.count('language')
word_count['very'] = words.count('very')
word_count['popular'] = words.count('popular')

print("\\nWord frequencies:")
print("  Python:", word_count.get('Python', 0), "times")
print("  language:", word_count.get('language', 0), "times")
print("(In later modules we will learn how to automatically count all words)")
\`\`\``
      },
      {
        title: "Problem 3: Inventory management",
        content: `**Task:** Create an inventory management system for a store.

**Requirements:**
- Add products with a name, price, and quantity
- Find a product by name
- Calculate the total inventory value
- Print products with low stock

**Solution:**
\`\`\`python
# Inventory structure
inventory = {
    'apples': {'price': 25.50, 'quantity': 100},
    'bananas': {'price': 30.00, 'quantity': 50},
    'oranges': {'price': 35.75, 'quantity': 75},
    'grapes': {'price': 80.00, 'quantity': 5}
}

# Find a product by name
product = inventory.get('apples')
print("Product 'apples':", product)

# Calculate the total inventory value
# Calculate the value of each product separately
apples_value = inventory['apples']['price'] * inventory['apples']['quantity']
bananas_value = inventory['bananas']['price'] * inventory['bananas']['quantity']
oranges_value = inventory['oranges']['price'] * inventory['oranges']['quantity']
grapes_value = inventory['grapes']['price'] * inventory['grapes']['quantity']

total_value = apples_value + bananas_value + oranges_value + grapes_value
print("Total inventory value:", total_value, "USD")

# Find products with low stock (less than 20)
# Check the quantity of each product
grapes_qty = inventory['grapes']['quantity']
print("Grape quantity:", grapes_qty)
print("(In later modules we will learn how to automatically check all products and find those with low stock)")

# Add a new product
inventory['tangerines'] = {'price': 40.00, 'quantity': 60}
print(f"\\nAdded product: tangerines")
\`\`\``
      },
      {
        title: "Tips for solving problems",
        content: `**1. Break the problem into parts:**
Do not try to solve everything at once. Break the problem into smaller subproblems.

**2. Use the right data structures:**
- Lists — for sequences that can change
- Dictionaries — for key-value pairs
- Sets — for unique elements
- Tuples — for immutable sequences

**3. Use built-in functions:**
- \`sum()\`, \`len()\`
- List and dictionary methods
- Functions for working with strings

**4. Test your code:**
Always check your code with different input data.

**5. Optimize after it works:**
First make working code, then optimize it.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Complex data system",
      code: `# Complex system for managing a school
school = {
    'classes': {
        '9A': {
            'homeroom_teacher': 'John Peterson',
            'students': [
                {'name': 'Alexander', 'grades': [85, 92, 78]},
                {'name': 'Maria', 'grades': [95, 88, 91]}
            ]
        },
        '9B': {
            'homeroom_teacher': 'Mary Ivanova',
            'students': [
                {'name': 'Dmitry', 'grades': [78, 85, 90]}
            ]
        }
    }
}

# Find the average score for class 9A
class_9a_students = school['classes']['9A']['students']
# Get each student's grades
all_grades = []
all_grades.extend(class_9a_students[0]['grades'])
all_grades.extend(class_9a_students[1]['grades'])
average_9a = sum(all_grades) / len(all_grades)
print("Class 9A average:", average_9a)`,
      explanation: "Demonstrates a complex nested structure for managing a school."
    },
    {
      title: "Example 2: Data processing",
      code: `# Data processing and analysis
data = [
    {'name': 'Item1', 'price': 100, 'quantity': 10},
    {'name': 'Item2', 'price': 200, 'quantity': 5},
    {'name': 'Item3', 'price': 150, 'quantity': 8}
]

# Calculate the total value
# Calculate the value of each item separately
item1_value = data[0]['price'] * data[0]['quantity']
item2_value = data[1]['price'] * data[1]['quantity']
item3_value = data[2]['price'] * data[2]['quantity']
total_value = item1_value + item2_value + item3_value
print("Total value:", total_value, "USD")

# Print all prices
prices = [data[0]['price'], data[1]['price'], data[2]['price']]
print("All prices:", prices)
print("(In later modules we will learn how to automatically find the most expensive item)")`,
      explanation: "Shows processing a list of dictionaries for data analysis."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not breaking a complex problem into parts",
      explanation: "Trying to solve everything at once can lead to confusion and errors.",
      correctApproach: "Break the problem into smaller subproblems and solve them one by one."
    },
    {
      mistake: "Using the wrong data structure",
      explanation: "Using a list instead of a dictionary or vice versa can make the code more complicated.",
      correctApproach: "Choose the data structure that best fits your problem."
    },
    {
      mistake: "Forgetting to handle edge cases",
      explanation: "Empty lists, missing keys, and similar cases can cause errors.",
      correctApproach: "Always check that data exists before processing it."
    }
  ],
  
  summary: `In this lesson we:

1. Reviewed all data structures — lists, dictionaries, tuples, sets, strings
2. Solved practical problems — management systems, data analysis
3. Applied nested structures — complex data organization
4. Learned a problem-solving approach — breaking into subproblems, testing

You are now ready for the next module — comparison operators!`,
  
  practiceTask: {
    title: "Student management system",
    description: "Create a program that works with student information",
    problemStatement: `Write a program that:
1. Reads data about 2 students. For each:
   - name
   - age
   - math grades (two numbers separated by a space)
   - physics grades (two numbers separated by a space)
2. Stores the data in a nested structure (a list of dictionaries)
3. Calculates the average score for each student
4. Prints information in the format: "Student [name] ([age] years old): average score [average score]"

Input format:
Alexander
16
85 90
80 85
Maria
15
95 90
90 93`,
    outputFormat: `Student Alexander (16 years old): average score 85.0
Student Maria (15 years old): average score 92.0`,
    examples: [
      {
        input: `Alexander
16
85 90
80 85
Maria
15
95 90
90 93`,
        output: `Student Alexander (16 years old): average score 85.0
Student Maria (15 years old): average score 92.0`,
        explanation: "Alexander: (85+90+80+85)/4 = 85.0; Maria: (95+90+90+93)/4 = 92.0"
      },
      {
        input: `Peter
17
70 80
90 100
Elena
16
100 100
90 90`,
        output: `Student Peter (17 years old): average score 85.0
Student Elena (16 years old): average score 95.0`,
        explanation: "Peter: 85.0; Elena: 95.0"
      },
      {
        input: `Andrew
14
50 60
70 80
Sophia
15
88 92
76 84`,
        output: `Student Andrew (14 years old): average score 65.0
Student Sophia (15 years old): average score 85.0`,
        explanation: "Andrew: 65.0; Sophia: 85.0"
      }
    ],
    solution: {
      code: `# Student management system
name1 = input().strip()
age1 = int(input())
math1 = list(map(int, input().split()))
phys1 = list(map(int, input().split()))

name2 = input().strip()
age2 = int(input())
math2 = list(map(int, input().split()))
phys2 = list(map(int, input().split()))

students = [
    {
        "name": name1,
        "age": age1,
        "subjects": {
            "math": math1,
            "physics": phys1
        }
    },
    {
        "name": name2,
        "age": age2,
        "subjects": {
            "math": math2,
            "physics": phys2
        }
    }
]

student1 = students[0]
grades1 = []
grades1.extend(student1["subjects"]["math"])
grades1.extend(student1["subjects"]["physics"])
avg1 = sum(grades1) / len(grades1)
print(f"Student {name1} ({age1} years old): average score {avg1}")

student2 = students[1]
grades2 = []
grades2.extend(student2["subjects"]["math"])
grades2.extend(student2["subjects"]["physics"])
avg2 = sum(grades2) / len(grades2)
print(f"Student {name2} ({age2} years old): average score {avg2}")`,
      explanation: "The solution reads data for two students with input(), stores it in a nested structure, and calculates the average with sum()/len()."
    },
    hints: [
      "For each student, read 4 lines: name, age, math grades, physics grades",
      "Use list(map(int, input().split())) for grades",
      "Use extend() to combine grade lists",
      "Average score = sum(grades) / len(grades)"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which data structure is best for storing key-value pairs?",
        options: [
          "List",
          "Dictionary",
          "Tuple",
          "Set"
        ],
        correctAnswer: 1,
        explanation: "A dictionary is ideal for storing key-value pairs."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which data structure is best for storing unique elements?",
        options: [
          "List",
          "Dictionary",
          "Tuple",
          "Set"
        ],
        correctAnswer: 3,
        explanation: "A set automatically stores only unique elements."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\ndata = {'a': [1, 2], 'b': [3, 4]}\nprint(sum(data['a']))\n```",
        options: [
          "3",
          "[1, 2]",
          "An error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "data['a'] returns [1, 2], and sum([1, 2]) = 3."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you get a value from a dictionary in a list of dictionaries?",
        options: [
          "list[0]['key']",
          "list['key'][0]",
          "list.key",
          "list.get('key')"
        ],
        correctAnswer: 0,
        explanation: "Use an index to access a list element, then a key to access the value: list[0]['key']"
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you safely copy a nested list in Python?",
        options: [
          "copy() or list() / slice for a shallow copy; deepcopy for a deep copy",
          "Always with =",
          "Only with pickle",
          "With int()"
        ],
        correctAnswer: 0,
        explanation: "Assignment with = creates a reference to the same object; copy/deepcopy create a copy."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
