/**
 * Lesson 02-8: Practice: more problems with operators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_02_8 = {
  lessonId: "lesson-02-8",
  moduleId: "module-02",
  order: 8,
  title: "Practice: more problems with operators",
  
  learningObjectives: [
    "Reinforce knowledge of loops and conditions",
    "Solve complex problems",
    "Combine different concepts",
    "Practice writing clean code"
  ],
  
  prerequisites: ["lesson-02-7"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Review of what we learned",
        content: `In this lesson we will reinforce everything from module 02:

**What we learned:**
1. Conditional statements (if/elif/else)
2. Loops (while, for)
3. Loop control (break, continue, else)
4. Nested loops
5. List comprehensions
6. Useful operators (in, min, max)

**Goal of this lesson:**
- Combine all concepts
- Solve more complex problems
- Improve programming skills`
      },
      {
        title: "Problem 1: Grade calculator",
        content: `**Statement:** Create a system that computes a weighted average grade.

- Grades list: [85, 92, 78, 96, 88]
- Weights: [0.2, 0.2, 0.2, 0.2, 0.2] (all equal)

**Algorithm:**
1. Multiply each grade by its weight
2. Add all results
3. Divide by the sum of weights

**Solution:**
\`\`\`python
grades = [85, 92, 78, 96, 88]
weights = [0.2, 0.2, 0.2, 0.2, 0.2]

weighted_sum = 0
for i in range(len(grades)):
    weighted_sum += grades[i] * weights[i]

average = weighted_sum / sum(weights)
print(f"Average grade: {average:.2f}")
\`\`\`

**With zip():**
\`\`\`python
weighted_sum = 0
for grade, weight in zip(grades, weights):
    weighted_sum += grade * weight
\`\`\``
      },
      {
        title: "Problem 2: Finding prime numbers",
        content: `**Statement:** Find all prime numbers up to n.

**A prime number** is divisible only by 1 and itself.

**Algorithm:**
1. For each number from 2 to n
2. Check whether it is divisible by any number from 2 to sqrt(n)
3. If not - it is prime

**Solution:**
\`\`\`python
n = 20
primes = []

for num in range(2, n + 1):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)

print(primes)  # [2, 3, 5, 7, 11, 13, 17, 19]
\`\`\``
      },
      {
        title: "Problem 3: Password analysis",
        content: `**Statement:** Check password strength by criteria.

**Criteria:**
- Length >= 8 characters
- Contains uppercase letters
- Contains lowercase letters
- Contains digits
- Contains special characters

**Solution:**
\`\`\`python
password = "MyPass123!"

checks = {
    "length": len(password) >= 8,
    "uppercase": any(c.isupper() for c in password),
    "lowercase": any(c.islower() for c in password),
    "digits": any(c.isdigit() for c in password),
    "special": any(c in "!@#$%^&*" for c in password)
}

strength = sum(checks.values())
print(f"Password strength: {strength}/5")

if strength == 5:
    print("Password is very strong!")
elif strength >= 3:
    print("Password is medium")
else:
    print("Password is weak")
\`\`\``
      },
      {
        title: "Problem 4: Matrix processing",
        content: `**Statement:** Find the sum of elements on the diagonals of a matrix.

**Solution:**
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Main diagonal (left to right)
main_diagonal = 0
for i in range(len(matrix)):
    main_diagonal += matrix[i][i]

# Secondary diagonal (right to left)
secondary_diagonal = 0
for i in range(len(matrix)):
    secondary_diagonal += matrix[i][len(matrix) - 1 - i]

print(f"Main diagonal: {main_diagonal}")  # 15
print(f"Secondary diagonal: {secondary_diagonal}")  # 15
\`\`\``
      },
      {
        title: "Problem 5: Grouping data",
        content: `**Statement:** Group students by grades.

**Solution:**
\`\`\`python
students = [
    {"name": "Ivan", "grade": 85},
    {"name": "Maria", "grade": 92},
    {"name": "Peter", "grade": 78},
    {"name": "Elena", "grade": 96},
    {"name": "Andrew", "grade": 65}
]

groups = {
    "Excellent (90+)": [],
    "Good (70-89)": [],
    "Needs improvement (<70)": []
}

for student in students:
    grade = student["grade"]
    if grade >= 90:
        groups["Excellent (90+)"].append(student["name"])
    elif grade >= 70:
        groups["Good (70-89)"].append(student["name"])
    else:
        groups["Needs improvement (<70)"].append(student["name"])

for group, names in groups.items():
    print(f"{group}: {', '.join(names)}")
\`\`\``
      },
      {
        title: "Tips for final practice",
        content: `**1. Read code carefully**
- Understand what each line does
- Track the variables

**2. Comment your code**
- Explain complex parts
- Add comments to functions

**3. Test different scenarios**
- Normal data
- Edge cases
- Invalid data

**4. Optimize after it works**
- First make working code
- Then optimize

**5. Practice regularly**
- Solve problems every day
- Gradually increase difficulty`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Grade calculator",
      code: `# Weighted average grade
grades = [85, 92, 78, 96, 88]
weights = [0.2, 0.2, 0.2, 0.2, 0.2]

weighted_sum = 0
for grade, weight in zip(grades, weights):
    weighted_sum += grade * weight

average = weighted_sum / sum(weights)
print(f"Average: {average:.2f}")`,
      explanation: "Demonstrates computing a weighted average grade."
    },
    {
      title: "Example 2: Prime numbers",
      code: `# Finding prime numbers
n = 20
primes = []

for num in range(2, n + 1):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)

print(primes)`,
      explanation: "Shows an algorithm for finding prime numbers."
    },
    {
      title: "Example 3: Password analysis",
      code: `# Checking password strength
password = "MyPass123!"

checks = {
    "length": len(password) >= 8,
    "uppercase": any(c.isupper() for c in password),
    "lowercase": any(c.islower() for c in password),
    "digits": any(c.isdigit() for c in password)
}

strength = sum(checks.values())
print(f"Strength: {strength}/4")`,
      explanation: "Demonstrates a comprehensive password check."
    },
    {
      title: "Example 4: Matrix diagonals",
      code: `# Sum of diagonals
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

main = sum(matrix[i][i] for i in range(len(matrix)))
secondary = sum(matrix[i][len(matrix)-1-i] for i in range(len(matrix)))

print(f"Main: {main}, Secondary: {secondary}")`,
      explanation: "Shows computing diagonal sums of a matrix."
    },
    {
      title: "Example 5: Grouping",
      code: `# Grouping students
students = [{"name": "Ivan", "grade": 85}, {"name": "Maria", "grade": 92}]

groups = {"Excellent": [], "Good": []}
for s in students:
    if s["grade"] >= 90:
        groups["Excellent"].append(s["name"])
    else:
        groups["Good"].append(s["name"])

print(groups)`,
      explanation: "Demonstrates grouping data by conditions."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not considering all edge cases",
      explanation: "Empty lists, one element, identical values - all need to be checked.",
      correctApproach: "Always test on different data, including edge cases"
    },
    {
      mistake: "Overly complex logic",
      explanation: "Complex code is hard to read and maintain.",
      correctApproach: "Break complex problems into simpler parts"
    },
    {
      mistake: "Not using available tools",
      explanation: "Python has many useful features (zip, enumerate, list comprehensions).",
      correctApproach: "Use built-in Python functions to simplify code"
    },
    {
      mistake: "Not commenting complex code",
      explanation: "In a month it will be hard to understand what the code does.",
      correctApproach: "Add comments to complex parts of the code"
    }
  ],
  
  summary: `In this lesson we reinforced our knowledge:

1. Complex problems - combining different concepts
2. Grade calculator - weighted average
3. Prime numbers - search algorithms
4. Password analysis - comprehensive checks
5. Matrix processing - working with two-dimensional data
6. Grouping data - organizing information
7. Practical tips - improving skills

Congratulations! You have completed module 02 - Python Operators!

You can now:
- Use conditional statements
- Work with loops
- Control program flow
- Write efficient code

Ready for the next module!`,
  
  practiceTask: {
    title: "Library management system",
    description: "Create a program for managing a library of books",
    problemStatement: `Write a program that:
1. Reads the minimum rating (float), an author name to search for, and the number of books n
2. Then reads n lines in the format: title;author;year;rating
3. Finds:
   - Books with rating >= minimum
   - Books by the given author
   - The newest book (largest year)
   - Average rating (1 decimal place)
4. Groups books by authors (in order of first appearance of the author)
5. Prints all results

Input format:
4.5
Ivan
4
Python Basics;Ivan;2020;4.5
Advanced Python;Maria;2021;4.8
Python for Beginners;Ivan;2019;4.2
Data Science;Peter;2022;4.9`,
    outputFormat: `Books with rating >= 4.5: ['Python Basics', 'Advanced Python', 'Data Science']
Books by Ivan: ['Python Basics', 'Python for Beginners']
Newest book: Data Science (2022)
Average rating: 4.6
Books by author:
Ivan: ['Python Basics', 'Python for Beginners']
Maria: ['Advanced Python']
Peter: ['Data Science']`,
    examples: [
      {
        input: `4.5
Ivan
4
Python Basics;Ivan;2020;4.5
Advanced Python;Maria;2021;4.8
Python for Beginners;Ivan;2019;4.2
Data Science;Peter;2022;4.9`,
        output: `Books with rating >= 4.5: ['Python Basics', 'Advanced Python', 'Data Science']
Books by Ivan: ['Python Basics', 'Python for Beginners']
Newest book: Data Science (2022)
Average rating: 4.6
Books by author:
Ivan: ['Python Basics', 'Python for Beginners']
Maria: ['Advanced Python']
Peter: ['Data Science']`,
        explanation: "Rating filter, author Ivan, newest 2022, average 4.6"
      },
      {
        input: `4.0
Olga
2
Book A;Olga;2018;4.0
Book B;Taras;2021;4.7`,
        output: `Books with rating >= 4.0: ['Book A', 'Book B']
Books by Olga: ['Book A']
Newest book: Book B (2021)
Average rating: 4.3
Books by author:
Olga: ['Book A']
Taras: ['Book B']`,
        explanation: "Both books >= 4.0; average (4.0+4.7)/2 = 4.3"
      },
      {
        input: `5.0
Peter
1
Alone;Peter;2015;4.1`,
        output: `Books with rating >= 5.0: []
Books by Peter: ['Alone']
Newest book: Alone (2015)
Average rating: 4.1
Books by author:
Peter: ['Alone']`,
        explanation: "No books with rating >= 5.0"
      }
    ],
    solution: {
      code: `min_rating = float(input())
search_author = input().strip()
n = int(input())

books = []
for _ in range(n):
    title, author, year, rating = input().strip().split(";")
    books.append({
        "title": title,
        "author": author,
        "year": int(year),
        "rating": float(rating)
    })

high_rated = [book["title"] for book in books if book["rating"] >= min_rating]
print(f"Books with rating >= {min_rating}: {high_rated}")

author_books = [book["title"] for book in books if book["author"] == search_author]
print(f"Books by {search_author}: {author_books}")

newest = books[0]
for book in books:
    if book["year"] > newest["year"]:
        newest = book
print(f"Newest book: {newest['title']} ({newest['year']})")

average_rating = sum(book["rating"] for book in books) / len(books)
print(f"Average rating: {average_rating:.1f}")

by_author = {}
for book in books:
    author = book["author"]
    if author not in by_author:
        by_author[author] = []
    by_author[author].append(book["title"])

print("Books by author:")
for author, titles in by_author.items():
    print(f"{author}: {titles}")`,
      explanation: "Read parameters and books from stdin, filter with list comprehensions, and group with a dictionary."
    },
    hints: [
      "Read min_rating, author, n, then n lines with ';' separator",
      "Use list comprehensions for filtering",
      "Format average rating with :.1f",
      "For grouping use a dictionary keyed by author"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is better to use for filtering a list?",
        options: [
          "Nested loops",
          "List comprehension",
          "Only if",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "List comprehension is the most efficient and readable way to filter."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code do?\n\n```python\nbooks = [{'year': 2020}, {'year': 2021}]\nnewest = books[0]\nfor book in books:\n    if book['year'] > newest['year']:\n        newest = book\n```",
        options: [
          "Finds the oldest book",
          "Finds the newest book",
          "Finds the first book",
          "An error"
        ],
        correctAnswer: 1,
        explanation: "The code finds the book with the largest year (the newest)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the best way to group data by categories?",
        options: [
          "A list of lists",
          "A dictionary of lists",
          "Tuples",
          "Sets"
        ],
        correctAnswer: 1,
        explanation: "A dictionary of lists is the most convenient way to group data."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code create?\n\n```python\nhigh_rated = [b['title'] for b in books if b['rating'] >= 4.5]\n```",
        options: [
          "A list of all books",
          "A list of titles of books with rating >= 4.5",
          "A list of ratings",
          "An error"
        ],
        correctAnswer: 1,
        explanation: "The list comprehension filters books with rating >= 4.5 and takes their titles."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to test code on different data?",
        options: [
          "To find bugs",
          "To make sure the code works correctly",
          "Both options",
          "It is not important"
        ],
        correctAnswer: 2,
        explanation: "Testing on different data helps find bugs and confirm correctness."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
