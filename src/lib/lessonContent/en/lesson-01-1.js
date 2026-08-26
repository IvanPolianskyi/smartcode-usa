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
    "Apply operators to different data structures"
  ],
  
  prerequisites: ["lesson-00-8"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are comparison operators?",
        content: `Comparison operators let us compare values and get a result: **True** or **False**.

This is a lot like math! For example:
- 5 > 3 - True
- 2 < 1 - False

**Why does this matter?**
Comparison operators help a program make decisions. For example:
- "Is 10 greater than 5?" → True
- "Does 7 equal 7?" → True
- "Is 3 less than 2?" → False

**What we will learn:**
1. Equality operator (==)
2. Inequality operator (!=)
3. Greater than (>)
4. Less than (<)
5. Greater than or equal (>=)
6. Less than or equal (<=)`
      },
      {
        title: "Equality operator (==)",
        content: `The **==** operator checks whether two values are **equal**.

**Important:** Do not confuse **==** (comparison) with **=** (assignment)!

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
        title: "Inequality operator (!=)",
        content: `The **!=** operator checks whether two values are **NOT equal**.

**!=** means "not equal"

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
        content: `The **>** and **<** operators compare which number is larger or smaller.

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
        title: "Greater than or equal (>=) and less than or equal (<=)",
        content: `The **>=** and **<=** operators check whether a number is greater/less **or equal**.

**>=** means "greater than or equal"
**<=** means "less than or equal"

\`\`\`python
# Greater than or equal (>=)
5 >= 3     # True (5 is greater than 3)
5 >= 5     # True (5 equals 5)
3 >= 5     # False (3 is neither greater than nor equal to 5)

# Less than or equal (<=)
3 <= 5     # True (3 is less than 5)
5 <= 5     # True (5 equals 5)
5 <= 3     # False (5 is neither less than nor equal to 3)

# With variables
a = 10
b = 10
a >= b     # True (10 equals 10)
a <= b     # True (10 equals 10)

c = 15
a >= c     # False (10 is neither greater than nor equal to 15)
a <= c     # True (10 is less than 15)
\`\`\`

**Remember:** >= and <= return True if at least one of the conditions is met!`
      },
      {
        title: "Comparing different data types",
        content: `**Comparing numbers:**
\`\`\`python
# Integers
10 == 10        # True
10 != 5         # True
10 > 5          # True

# Decimals
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

**Important:** You should not compare different types without converting:
\`\`\`python
# This works
5 == 5.0        # True (5 is converted to 5.0)

# But this does not make sense as equality of the same kind of value
# "5" == 5       # False (the string "5" is not equal to the number 5)
\`\`\``
      },
      {
        title: "Practical uses",
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
      explanation: "Demonstrates the basic == and != operators for comparing numbers."
    },
    {
      title: "Example 2: Greater/less comparisons",
      code: `# Greater/less comparisons
print(5 > 3)     # True
print(3 > 5)     # False
print(2 < 4)     # True
print(4 < 2)     # False`,
      explanation: "Shows how to use > and < to compare numbers."
    },
    {
      title: "Example 3: Greater/less or equal comparisons",
      code: `# Greater than or equal
print(5 >= 5)    # True
print(5 >= 3)    # True
print(3 >= 5)    # False

# Less than or equal
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

print(name1 == name2)  # True (identical strings)
print(name1 == name3)  # False (different strings)
print(name1 != name3)  # True (not equal)`,
      explanation: "Demonstrates comparing strings with == and !=."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing == and =",
      explanation: "== is used for comparison, while = assigns a value.",
      correctApproach: "Remember: == to check (are they equal?), = to store (save a value)."
    },
    {
      mistake: "Misusing >= and <=",
      explanation: ">= means 'greater than OR equal', not 'greater and equal at the same time'.",
      correctApproach: "5 >= 5 returns True because 5 equals 5 (at least one condition is met)."
    },
    {
      mistake: "Comparing different types without converting",
      explanation: "Comparing the string '5' with the number 5 gives False because they are different types.",
      correctApproach: "Convert types before comparing: int('5') == 5 or '5' == str(5)."
    }
  ],
  
  summary: `In this lesson we learned:

1. Equality operator (==) - checks whether two values are equal
2. Inequality operator (!=) - checks whether two values are NOT equal
3. Greater than (>) - checks whether the first number is greater than the second
4. Less than (<) - checks whether the first number is less than the second
5. Greater than or equal (>=) - checks whether the first number is greater than or equal to the second
6. Less than or equal (<=) - checks whether the first number is less than or equal to the second

All comparison operators return True or False.

Next lesson - logical operators and, or, not!`,
  
  practiceTask: {
    title: "Age and score check",
    description: "Create a program that checks age and score",
    problemStatement: `Write a program that:
1. Reads age (integer) and score (integer) from input
2. Checks whether age is greater than or equal to 13
3. Checks whether score is greater than or equal to 60
4. Prints the values and the check results

Input format:
12
85`,
    outputFormat: `Age: 12
Score: 85
Age >= 13: False
Score >= 60: True`,
    examples: [
      {
        input: `12
85`,
        output: `Age: 12
Score: 85
Age >= 13: False
Score >= 60: True`,
        explanation: "Age 12 < 13 → False, score 85 >= 60 → True"
      },
      {
        input: `15
55`,
        output: `Age: 15
Score: 55
Age >= 13: True
Score >= 60: False`,
        explanation: "Age 15 >= 13 → True, score 55 < 60 → False"
      },
      {
        input: `13
60`,
        output: `Age: 13
Score: 60
Age >= 13: True
Score >= 60: True`,
        explanation: "Both conditions are on the boundary and pass → True"
      }
    ],
    solution: {
      code: `age = int(input())
score = int(input())

print(f"Age: {age}")
print(f"Score: {score}")

is_teenager = age >= 13
passed = score >= 60

print(f"Age >= 13: {is_teenager}")
print(f"Score >= 60: {passed}")`,
      explanation: "Read age and score with input(), compare with >=, and print the results."
    },
    hints: [
      "Read age and score: age = int(input()), score = int(input())",
      "Use the >= operator for the checks",
      "Store comparison results in variables",
      "Use f-strings or str() for output"
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
          "Equals",
          "Not equal",
          "Greater than",
          "Less than"
        ],
        correctAnswer: 1,
        explanation: "The != operator means 'not equal' and returns True if the values are not equal."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 10\ny = 5\nprint(x > y)\n```",
        options: [
          "True",
          "False",
          "10",
          "5"
        ],
        correctAnswer: 0,
        explanation: "x (10) is greater than y (5), so > returns True."
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
        explanation: "The >= operator means 'greater than or equal'. 3 equals 3, so the result is True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 12\nprint(age >= 13)\n```",
        options: [
          "True",
          "False",
          "12",
          "13"
        ],
        correctAnswer: 1,
        explanation: "12 is neither greater than nor equal to 13, so >= returns False."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the difference between == and = ?",
        options: [
          "== compares, = assigns",
          "== assigns, = compares",
          "There is no difference",
          "== is for numbers, = is for strings"
        ],
        correctAnswer: 0,
        explanation: "== is used for comparison (are they equal?), and = assigns a value to a variable."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
