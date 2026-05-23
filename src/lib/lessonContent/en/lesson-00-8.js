/**
 * Lesson 00-8: Practice: problems with objects and data structures
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_8 = {
  lessonId: "lesson-00-8",
  moduleId: "module-00",
  order: 8,
  title: "Practice: problems with objects and data structures",
  
  learningObjectives: [
    "Solve practical problems with objects",
    "Apply all acquired knowledge",
    "Analyze and optimize solutions",
    "Practice working with data"
  ],
  
  prerequisites: ["lesson-00-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Practice with all data structures",
        content: `In this lesson we will reinforce all the knowledge we gained about Python objects and data structures. We will solve practical problems that combine different concepts.

**What we will review:**
- Variables and data types (int, float, str, bool)
- Lists and their methods
- Dictionaries and their methods
- Tuples and sets
- Strings and formatting
- Nested data structures

**Approach to solving problems:**
1. Understand the problem
2. Determine which data structures are needed
3. Break the problem into subtasks
4. Write the code
5. Test the solution
6. Optimize if needed`
      },
      {
        title: "Problem 1: Grade system",
        content: `**Task:** Create a system for storing and processing student grades.

**Requirements:**
- Store student name, subject, and grades
- Calculate average grade
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

# Calculate average for the first student (Alexander)
student1 = students[0]
student1_all_grades = []
# Get grades from each subject
student1_all_grades.extend(student1['grades']['math'])
student1_all_grades.extend(student1['grades']['physics'])
student1_all_grades.extend(student1['grades']['chemistry'])
student1_average = sum(student1_all_grades) / len(student1_all_grades)
print(student1['name'] + ":", student1_average)

# Calculate average for the second student (Maria)
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
print("(In upcoming modules we will learn to automatically find the best student)")
\`\`\``
      },
      {
        title: "Problem 2: Text analysis",
        content: `**Task:** Create a program for text analysis.

**Requirements:**
- Count the number of words
- Find the most frequent words
- Find the longest and shortest word
- Remove duplicate words

**Solution:**
\`\`\`python
text = "Python is a great programming language Python is very popular language"

# Split into words
words = text.split()
print(f"Number of words: {len(words)}")

# Find unique words
unique_words = set(words)
print(f"Unique words: {len(unique_words)}")

# Print the first word as an example
# (In upcoming modules we will learn to automatically find the longest and shortest word)
first_word = words[0]
print(f"First word: {first_word} ({len(first_word)} characters)")
print("(In upcoming modules we will learn to automatically find the longest and shortest word)")

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
print("(In upcoming modules we will learn to automatically count all words)")
\`\`\``
      },
      {
        title: "Problem 3: Inventory management",
        content: `**Task:** Create a store inventory management system.

**Requirements:**
- Add products with name, price, and quantity
- Find a product by name
- Calculate total inventory value
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

# Calculate total inventory value
# Calculate each product's value separately
apples_value = inventory['apples']['price'] * inventory['apples']['quantity']
bananas_value = inventory['bananas']['price'] * inventory['bananas']['quantity']
oranges_value = inventory['oranges']['price'] * inventory['oranges']['quantity']
grapes_value = inventory['grapes']['price'] * inventory['grapes']['quantity']

total_value = apples_value + bananas_value + oranges_value + grapes_value
print("Total inventory value:", total_value, "UAH")

# Find products with low stock (less than 20)
# Check each product's quantity
grapes_qty = inventory['grapes']['quantity']
print("Grapes quantity:", grapes_qty)
print("(In upcoming modules we will learn to automatically check all products and find those with low stock)")

# Add a new product
inventory['mandarins'] = {'price': 40.00, 'quantity': 60}
print(f"\\nAdded product: mandarins")
\`\`\``
      },
      {
        title: "Tips for solving problems",
        content: `**1. Break the problem into parts:**
Don't try to solve everything at once. Break the problem into smaller subtasks.

**2. Use the right data structures:**
- Lists - for sequences that can be modified
- Dictionaries - for key-value pairs
- Sets - for unique elements
- Tuples - for immutable sequences

**3. Use built-in functions:**
- \`sum()\`, \`len()\`
- List and dictionary methods
- String functions

**4. Test your code:**
Always check your code with different input data.

**5. Optimize after it works:**
First make working code, then optimize it.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Comprehensive data system",
      code: `# Comprehensive system for school management
school = {
    'classes': {
        '9A': {
            'homeroom_teacher': 'Ivan Petrovych',
            'students': [
                {'name': 'Alexander', 'grades': [85, 92, 78]},
                {'name': 'Maria', 'grades': [95, 88, 91]}
            ]
        },
        '9B': {
            'homeroom_teacher': 'Maria Ivanivna',
            'students': [
                {'name': 'Dmitry', 'grades': [78, 85, 90]}
            ]
        }
    }
}

# Find the average for class 9A
class_9a_students = school['classes']['9A']['students']
# Get each student's grades
all_grades = []
all_grades.extend(class_9a_students[0]['grades'])
all_grades.extend(class_9a_students[1]['grades'])
average_9a = sum(all_grades) / len(all_grades)
print("Class 9A average:", average_9a)`,
      explanation: "Demonstrates a complex nested structure for school management."
    },
    {
      title: "Example 2: Data processing",
      code: `# Data processing and analysis
data = [
    {'name': 'Product1', 'price': 100, 'quantity': 10},
    {'name': 'Product2', 'price': 200, 'quantity': 5},
    {'name': 'Product3', 'price': 150, 'quantity': 8}
]

# Calculate total value
# Calculate each product's value separately
item1_value = data[0]['price'] * data[0]['quantity']
item2_value = data[1]['price'] * data[1]['quantity']
item3_value = data[2]['price'] * data[2]['quantity']
total_value = item1_value + item2_value + item3_value
print("Total value:", total_value, "UAH")

# Print all prices
prices = [data[0]['price'], data[1]['price'], data[2]['price']]
print("All prices:", prices)
print("(In upcoming modules we will learn to automatically find the most expensive product)")`,
      explanation: "Shows processing a list of dictionaries for data analysis."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not breaking a complex problem into parts",
      explanation: "Trying to solve everything at once can lead to confusion and errors.",
      correctApproach: "Break the problem into smaller subtasks and solve them one at a time."
    },
    {
      mistake: "Using the wrong data structure",
      explanation: "Using a list instead of a dictionary or vice versa can complicate the code.",
      correctApproach: "Choose the data structure that best fits your task."
    },
    {
      mistake: "Forgetting to handle edge cases",
      explanation: "Empty lists, missing keys, etc. can cause errors.",
      correctApproach: "Always check that data exists before processing it."
    }
  ],
  
  summary: `In this lesson we:

1. Reviewed all data structures - lists, dictionaries, tuples, sets, strings
2. Solved practical problems - management systems, data analysis
3. Applied nested structures - complex data organization
4. Learned an approach to solving - breaking into subtasks, testing

Now you are ready for the next module - comparison operators!`,
  
  practiceTask: {
    title: "Student management system",
    description: "Create a program for working with student information",
    problemStatement: `Write a program that:
1. Creates a data structure to store information about 2 students:
   - Alexander, 16 years old:
     * Math: [85, 90]
     * Physics: [80, 85]
   - Maria, 15 years old:
     * Math: [95, 90]
     * Physics: [90, 93]
2. Calculates the average grade for each student (sum of all grades divided by number of grades)
3. Prints information about each student in the format: "Student [name] ([age] years old): average grade [average grade]"`,
    outputFormat: `Example output:
Student Alexander (16 years old): average grade 85.0
Student Maria (15 years old): average grade 92.0

Note: 
- Alexander: (85+90+80+85)/4 = 85.0
- Maria: (95+90+90+93)/4 = 92.0`,
    examples: [
      {
        output: `Student Alexander (16 years old): average grade 85.0
Student Maria (15 years old): average grade 92.0`,
        explanation: "The program demonstrates working with nested data structures and calculating averages. Alexander has grades: 85, 90, 80, 85 (average = 85.0). Maria has grades: 95, 90, 90, 93 (average = 92.0)."
      }
    ],
    solution: {
      code: `# Student management system
students = [
    {
        "name": 'Alexander',
        'age': 16,
        'subjects': {
            'math': [85, 90],
            'physics': [80, 85]
        }
    },
    {
        "name": 'Maria',
        'age': 15,
        'subjects': {
            'math': [95, 90],
            'physics': [90, 93]
        }
    }
]

# Calculate average for the first student (Alexander)
student1 = students[0]
student1_all_grades = []
student1_all_grades.extend(student1['subjects']['math'])
student1_all_grades.extend(student1['subjects']['physics'])
student1_avg = sum(student1_all_grades) / len(student1_all_grades)
print("Student " + student1["name"] + " (" + str(student1['age']) + " years old): average grade", student1_avg)

# Calculate average for the second student (Maria)
student2 = students[1]
student2_all_grades = []
student2_all_grades.extend(student2['subjects']['math'])
student2_all_grades.extend(student2['subjects']['physics'])
student2_avg = sum(student2_all_grades) / len(student2_all_grades)
print("Student " + student2["name"] + " (" + str(student2['age']) + " years old): average grade", student2_avg)`,
      explanation: "The solution uses a nested structure (list of dictionaries with dictionaries of lists) and calculates the average grade for each student."
    },
    hints: [
      "Use a list of dictionaries to store students",
      "Use a dictionary of lists to store grades by subject",
      "Use extend() to combine grade lists",
      "Use sum() and len() to calculate average grades"
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
        question: "What will this code output?\n\n```python\ndata = {'a': [1, 2], 'b': [3, 4]}\nprint(sum(data['a']))\n```",
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
        explanation: "Use an index to access the list element, then a key to access the value: list[0]['key']"
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
