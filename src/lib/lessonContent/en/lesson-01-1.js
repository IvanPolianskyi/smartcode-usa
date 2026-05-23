/**
 * Lesson 01-1: Comparison operators: ==, !=, <, >, <=, >=
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_01_1 = {
  lessonId: "lesson-01-1",
  moduleId: "module-01",
  order: 1,
  title: "Comparison operators: ==, !=, <, >, <=, >=",
  
  learningObjectives: [
    "Use comparison operators",
    "Compare different data types",
    "Understand comparison results (True/False)",
    "Apply operators to various data structures"
  ],
  
  prerequisites: ["lesson-00-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are comparison operators?",
        content: `Comparison operators let us compare values and get a result: **True** or **False**.

This is a lot like math! For example:
- 5 > 3 — this is true (True)
- 2 < 1 — this is false (False)

**Why does this matter?**
Comparison operators help a program make decisions. For example:
- "Is 10 greater than 5?" → True
- "Does 7 equal 7?" → True
- "Is 3 less than 2?" → False

**What we'll learn:**
1. The equality operator (==)
2. The inequality operator (!=)
3. Greater than (>)
4. Less than (<)
5. Greater than or equal to (>=)
6. Less than or equal to (<=)`
      },
      {
        title: "The equality operator (==)",
        content: `The **==** operator checks whether two values are **equal**.

**Important:** Don't confuse **==** (comparison) with **=** (assignment)!

\`\`\`python
# Assignment (store a value in a variable)
x = 5

# Comparison (check if equal)
5 == 5  # True
5 == 3  # False
\`\`\`

**Examples:**
\`\`\`python
# Comparing numbers
2 == 2    # True
2 == 3    # False

# Comparing strings
"hello" == "hello"  # True
"hello" == "world"  # False

# Comparing variables
a = 10
b = 10
a == b    # True

c = 5
a == c    # False
\`\`\`

**Remember:** The == operator always returns True or False!`
      },
      {
        title: "The inequality operator (!=)",
        content: `The **!=** operator checks whether two values are **NOT equal**.

**!=** means "not equal to"

\`\`\`python
# Comparing numbers
2 != 3    # True (2 is not equal to 3)
2 != 2    # False (2 equals 2)

# Comparing strings
"hello" != "world"  # True
"hello" != "hello"  # False

# Comparing variables
a = 10
b = 5
a != b    # True (10 is not equal to 5)

c = 10
a != c    # False (10 equals 10)
\`\`\`

**Remember:** != returns True if the values are NOT equal, and False if they are equal!`
      },
      {
        title: "Greater than (>) and less than (<)",
        content: `The **>** and **<** operators compare which number is greater or smaller.

**>** means "greater than"
**<** means "less than"

\`\`\`python
# Greater than (>)
5 > 3     # True (5 is greater than 3)
3 > 5     # False (3 is not greater than 5)
2 > 2     # False (2 is not greater than 2)

# Less than (<)
3 < 5     # True (3 is less than 5)
5 < 3     # False (5 is not less than 3)
2 < 2     # False (2 is not less than 2)

# With variables
a = 10
b = 5
a > b     # True (10 is greater than 5)
a < b     # False (10 is not less than 5)
\`\`\`

**Comparing strings:**
Python can compare strings alphabetically:
\`\`\`python
"apple" < "banana"  # True (a comes before b in the alphabet)
"zebra" > "apple"   # True (z comes after a)
\`\`\``
      },
      {
        title: "Greater than or equal to (>=) and less than or equal to (<=)",
        content: `The **>=** and **<=** operators check whether a number is greater/less **or equal**.

**>=** means "greater than or equal to"
**<=** means "less than or equal to"

\`\`\`python
# Greater than or equal to (>=)
5 >= 3     # True (5 is greater than 3)
5 >= 5     # True (5 equals 5)
3 >= 5     # False (3 is not greater than or equal to 5)

# Less than or equal to (<=)
3 <= 5     # True (3 is less than 5)
5 <= 5     # True (5 equals 5)
5 <= 3     # False (5 is not less than or equal to 3)

# With variables
a = 10
b = 10
a >= b     # True (10 equals 10)
a <= b     # True (10 equals 10)

c = 15
a >= c     # False (10 is not greater than or equal to 15)
a <= c     # True (10 is less than 15)
\`\`\`

**Remember:** >= and <= return True if at least one condition is met!`
      },
      {
        title: "Comparing different data types",
        content: `**Comparing numbers:**
\`\`\`python
# Integers
10 == 10        # True
10 != 5         # True
10 > 5          # True

# Decimal numbers
3.5 == 3.5      # True
2.1 < 3.7       # True
5.0 >= 5        # True (5.0 equals 5)
\`\`\`

**Comparing strings:**
\`\`\`python
"hello" == "hello"      # True
"hello" != "world"      # True
"apple" < "banana"      # True (alphabetically)
\`\`\`

**Comparing boolean values:**
\`\`\`python
True == True    # True
True != False   # True
False == False  # True
\`\`\`

**Important:** You cannot compare different types without conversion:
\`\`\`python
# This works
5 == 5.0        # True (5 is converted to 5.0)

# But this doesn't make sense
# "5" == 5       # False (the string "5" is not equal to the number 5)
\`\`\``
      },
      {
        title: "Practical applications",
        content: `**Checking age:**
\`\`\`python
age = 12
is_teenager = age >= 13  # False (12 is not greater than or equal to 13)
is_child = age < 18      # True (12 is less than 18)
\`\`\`

**Checking a score:**
\`\`\`python
score = 85
passed = score >= 60     # True (85 is greater than or equal to 60)
excellent = score >= 90  # False (85 is not greater than or equal to 90)
\`\`\`

**Checking passwords:**
\`\`\`python
password = "secret123"
correct_password = "secret123"
is_correct = password == correct_password  # True
\`\`\`

Comparison operators help a program make decisions!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Basic comparisons",
      code: `# Comparing numbers
print(2 == 2)    # True
print(2 == 3)    # False
print(2 != 3)    # True
print(2 != 2)    # False`,
      explanation: "Demonstrates basic == and != operators for comparing numbers."
    },
    {
      title: "Example 2: Greater than / less than",
      code: `# Greater than / less than
print(5 > 3)     # True
print(3 > 5)     # False
print(2 < 4)     # True
print(4 < 2)     # False`,
      explanation: "Shows how to use > and < to compare numbers."
    },
    {
      title: "Example 3: Greater/less than or equal to",
      code: `# Greater than or equal to
print(5 >= 5)    # True
print(5 >= 3)    # True
print(3 >= 5)    # False

# Less than or equal to
print(3 <= 3)    # True
print(3 <= 5)    # True
print(5 <= 3)    # False`,
      explanation: "Demonstrates >= and <= for comparisons that include equality."
    },
    {
      title: "Example 4: Comparing with variables",
      code: `# Comparing with variables
age = 12
min_age = 13

can_join = age >= min_age
print(can_join)  # False (12 is not greater than or equal to 13)

score = 85
passing_score = 60
passed = score >= passing_score
print(passed)    # True (85 is greater than or equal to 60)`,
      explanation: "Shows practical use of comparison operators with variables."
    },
    {
      title: "Example 5: Comparing strings",
      code: `# Comparing strings
name1 = "Alexander"
name2 = "Alexander"
name3 = "Maria"

print(name1 == name2)  # True (same strings)
print(name1 == name3)  # False (different strings)
print(name1 != name3)  # True (not equal)`,
      explanation: "Demonstrates comparing strings with == and !=."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing == and =",
      explanation: "== is used for comparison, and = is used to assign a value.",
      correctApproach: "Remember: == for checking (are they equal?), = for storing (save the value)."
    },
    {
      mistake: "Incorrect use of >= and <=",
      explanation: ">= means 'greater than OR equal to', not 'greater than AND equal to at the same time'.",
      correctApproach: "5 >= 5 returns True because 5 equals 5 (at least one condition is met)."
    },
    {
      mistake: "Comparing different types without conversion",
      explanation: "Comparing the string '5' with the number 5 gives False because they are different types.",
      correctApproach: "Convert types before comparing: int('5') == 5 or '5' == str(5)."
    }
  ],
  
  summary: `In this lesson we learned:

1. The equality operator (==) — checks whether two values are equal
2. The inequality operator (!=) — checks whether two values are NOT equal
3. Greater than (>) — checks whether the first number is greater than the second
4. Less than (<) — checks whether the first number is less than the second
5. Greater than or equal to (>=) — checks whether the first number is greater than or equal to the second
6. Less than or equal to (<=) — checks whether the first number is less than or equal to the second

All comparison operators return True or False.

Next lesson — logical operators and, or, not!`,
  
  practiceTask: {
    title: "Checking age and score",
    description: "Create a program to check age and score",
    problemStatement: `Write a program that:
1. Stores age in a variable age (for example, 12)
2. Stores a score in a variable score (for example, 85)
3. Checks whether age is greater than or equal to 13
4. Checks whether score is greater than or equal to 60
5. Prints the results of the checks`,
    outputFormat: `Example output:
Age: 12
Score: 85
Age >= 13: False
Score >= 60: True`,
    examples: [
      {
        output: `Age: 12
Score: 85
Age >= 13: False
Score >= 60: True`,
        explanation: "The program uses comparison operators to check conditions"
      }
    ],
    solution: {
      code: `# Checking age and score
age = 12
score = 85

# Print values
print("Age: " + str(age))
print("Score: " + str(score))

# Checks
is_teenager = age >= 13
passed = score >= 60

print("Age >= 13: " + str(is_teenager))
print("Score >= 60: " + str(passed))`,
      explanation: "The solution uses >= to check conditions and str() to convert numbers to strings for output."
    },
    hints: [
      "Use the >= operator for checking",
      "Use str() to convert numbers to strings",
      "Use print() to display results",
      "Store comparison results in variables"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expression 5 == 5 return?",
        options: [
          "True",
          "False",
          "5",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The == operator checks equality. 5 equals 5, so the result is True."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the != operator mean?",
        options: [
          "Equal to",
          "Not equal to",
          "Greater than",
          "Less than"
        ],
        correctAnswer: 1,
        explanation: "The != operator means 'not equal to' and returns True if the values are not equal."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 10\ny = 5\nprint(x > y)\n```",
        options: [
          "True",
          "False",
          "10",
          "5"
        ],
        correctAnswer: 0,
        explanation: "x (10) is greater than y (5), so the > operator returns True."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expression 3 >= 3 return?",
        options: [
          "True",
          "False",
          "3",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The >= operator means 'greater than or equal to'. 3 equals 3, so the result is True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nage = 12\nprint(age >= 13)\n```",
        options: [
          "True",
          "False",
          "12",
          "13"
        ],
        correctAnswer: 1,
        explanation: "12 is not greater than or equal to 13, so the >= operator returns False."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between == and = ?",
        options: [
          "== compares, = assigns",
          "== assigns, = compares",
          "No difference",
          "== for numbers, = for strings"
        ],
        correctAnswer: 0,
        explanation: "== is used for comparison (are they equal?), and = is used to assign a value to a variable."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
