/**
 * Lesson 01-2: Logical operators: and, or, not
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_01_2 = {
  lessonId: "lesson-01-2",
  moduleId: "module-01",
  order: 2,
  title: "Logical operators: and, or, not",
  
  learningObjectives: [
    "Use logical operators and, or, not",
    "Build compound conditions",
    "Understand how logical operators work",
    "Apply them to real-world tasks"
  ],
  
  prerequisites: ["lesson-01-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What are logical operators?",
        content: `Logical operators let you combine several conditions. It is like saying:
- "I want ice cream **AND** cake" (both must be true)
- "I want ice cream **OR** cake" (at least one)
- "I do **NOT** want vegetables" (the opposite)

**Three logical operators:**
1. **and** - both conditions must be True
2. **or** - at least one condition must be True
3. **not** - flips True to False and vice versa

**What we will learn:**
1. The and operator
2. The or operator
3. The not operator
4. Combining operators`
      },
      {
        title: "The and operator",
        content: `The **and** operator returns **True** only if **both** conditions are True.

**Rule:** True and True = True, everything else = False

\`\`\`python
# Both conditions True
5 > 3 and 2 < 4    # True (both conditions True)
10 == 10 and 5 > 2  # True (both conditions True)

# One condition False
5 > 3 and 2 > 4    # False (second condition False)
10 == 10 and 5 < 2  # False (second condition False)

# Both conditions False
5 < 3 and 2 > 4    # False (both conditions False)
\`\`\`

**Practical example:**
\`\`\`python
# Check age and score
age = 14
score = 85

# Can play the game only if age >= 13 AND score >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True (both conditions True)

# If one condition is False
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False (first condition False)
\`\`\`

**Remember:** and requires BOTH conditions to be True!`
      },
      {
        title: "The or operator",
        content: `The **or** operator returns **True** if **at least one** condition is True.

**Rule:** False or False = False, everything else = True

\`\`\`python
# At least one condition True
5 > 3 or 2 > 4     # True (first condition True)
2 > 4 or 5 > 3     # True (second condition True)
5 > 3 or 2 < 4     # True (both conditions True)

# Both conditions False
5 < 3 or 2 > 4     # False (both conditions False)
10 < 5 or 2 > 10   # False (both conditions False)
\`\`\`

**Practical example:**
\`\`\`python
# Discount if age < 12 OR age > 65
age = 10
has_discount = age < 12 or age > 65
print(has_discount)  # True (10 < 12)

age = 70
has_discount = age < 12 or age > 65
print(has_discount)  # True (70 > 65)

age = 20
has_discount = age < 12 or age > 65
print(has_discount)  # False (both conditions False)
\`\`\`

**Remember:** or requires at least ONE condition to be True!`
      },
      {
        title: "The not operator",
        content: `The **not** operator flips a value to its opposite:
- not True = False
- not False = True

**Rule:** not inverts (flips) the value

\`\`\`python
# From True to False
not True           # False
not (5 > 3)        # False (5 > 3 is True, not True = False)

# From False to True
not False          # True
not (5 < 3)        # True (5 < 3 is False, not False = True)
\`\`\`

**Practical example:**
\`\`\`python
# Check whether the test was NOT passed
score = 45
passed = score >= 60
not_passed = not passed
print(not_passed)  # True (score < 60, so passed = False, not False = True)

# Check whether NOT equal
name = "Alexander"
is_not_alex = not (name == "Alexander")
print(is_not_alex)  # False (name == "Alexander" is True, not True = False)
\`\`\`

**Remember:** not always flips the value to its opposite!`
      },
      {
        title: "Combining operators",
        content: `You can combine several logical operators together.

**Operator precedence:**
1. not (highest)
2. and
3. or (lowest)

**Examples:**
\`\`\`python
# and with or
age = 14
score = 85
# (age >= 13 AND score >= 60) OR age >= 18
can_join = (age >= 13 and score >= 60) or age >= 18
print(can_join)  # True

# not with and
age = 12
# NOT (age >= 13 AND score >= 60)
cannot_join = not (age >= 13 and score >= 60)
print(cannot_join)  # True

# Complex conditions
x = 5
y = 10
z = 15
# (x < y) AND (y < z) OR (x > z)
result = (x < y and y < z) or x > z
print(result)  # True (x < y and y < z is True)
\`\`\`

**Important:** Use parentheses () for clarity!`
      },
      {
        title: "Chained comparisons",
        content: `Python lets you "chain" comparisons to simplify code.

**Usual way:**
\`\`\`python
x = 5
# Check whether x is greater than 3 AND less than 10
result = x > 3 and x < 10
print(result)  # True
\`\`\`

**Chained way (simpler):**
\`\`\`python
x = 5
# Same thing, but shorter
result = 3 < x < 10
print(result)  # True
\`\`\`

**More examples:**
\`\`\`python
# Check whether a number is in a range
age = 14
is_teenager = 13 <= age <= 19
print(is_teenager)  # True (14 is between 13 and 19)

# Check whether a number is between two others
x = 5
y = 10
z = 7
is_between = x < z < y
print(is_between)  # True (7 is between 5 and 10)
\`\`\`

**Remember:** Chained comparisons are just a shorter way to write and!`
      },
      {
        title: "Practical uses",
        content: `**Access system:**
\`\`\`python
age = 14
has_permission = True
# Can enter if age >= 13 AND has permission
can_enter = age >= 13 and has_permission
print(can_enter)  # True
\`\`\`

**Discount system:**
\`\`\`python
age = 10
is_student = True
# Discount if age < 12 OR has a student ID
has_discount = age < 12 or is_student
print(has_discount)  # True
\`\`\`

**Password check:**
\`\`\`python
password = "secret123"
correct_password = "secret123"
# NOT the correct password
is_wrong = not (password == correct_password)
print(is_wrong)  # False (password is correct)
\`\`\`

Logical operators help you build complex conditions!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: The and operator",
      code: `# The and operator
age = 14
score = 85

# Can play if age >= 13 AND score >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True

# If one condition is False
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False`,
      explanation: "Demonstrates using and to check two conditions at once."
    },
    {
      title: "Example 2: The or operator",
      code: `# The or operator
age = 10

# Discount if age < 12 OR age > 65
has_discount = age < 12 or age > 65
print(has_discount)  # True (10 < 12)

age = 20
has_discount = age < 12 or age > 65
print(has_discount)  # False (both conditions False)`,
      explanation: "Shows using or to check at least one condition."
    },
    {
      title: "Example 3: The not operator",
      code: `# The not operator
score = 45
passed = score >= 60

# Did NOT pass the test
not_passed = not passed
print(not_passed)  # True (score < 60)

# Invert a boolean value
is_raining = True
is_sunny = not is_raining
print(is_sunny)  # False`,
      explanation: "Demonstrates using not to invert values."
    },
    {
      title: "Example 4: Combining operators",
      code: `# Combining operators
age = 14
score = 85
is_student = True

# (age >= 13 AND score >= 60) OR has a student ID
can_join = (age >= 13 and score >= 60) or is_student
print(can_join)  # True

# NOT (age < 13 OR score < 60)
cannot_join = not (age < 13 or score < 60)
print(cannot_join)  # True`,
      explanation: "Shows combining several logical operators together."
    },
    {
      title: "Example 5: Chained comparisons",
      code: `# Chained comparisons
age = 14

# Check whether age is in the range (13-19)
is_teenager = 13 <= age <= 19
print(is_teenager)  # True

# Same as:
is_teenager2 = age >= 13 and age <= 19
print(is_teenager2)  # True

# Check whether a number is between two others
x = 5
y = 10
z = 7
is_between = x < z < y
print(is_between)  # True`,
      explanation: "Demonstrates chained comparisons as a way to simplify code."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Confusing and and or",
      explanation: "and requires both conditions True; or requires at least one True.",
      correctApproach: "Remember: and = 'both', or = 'at least one'."
    },
    {
      mistake: "Wrong operator precedence",
      explanation: "not has the highest precedence, then and, then or.",
      correctApproach: "Use parentheses () for clarity: (a and b) or c"
    },
    {
      mistake: "Using & instead of and",
      explanation: "& is a bitwise operator, not a logical one.",
      correctApproach: "Use and, or, not for logical operations."
    },
    {
      mistake: "Confusion with not",
      explanation: "not inverts the value, so not True = False.",
      correctApproach: "Remember: not always flips True to False and vice versa."
    }
  ],
  
  summary: `In this lesson we learned:

1. The and operator - returns True only if both conditions are True
2. The or operator - returns True if at least one condition is True
3. The not operator - inverts the value (True becomes False, False becomes True)
4. Combining operators - you can join several operators together
5. Chained comparisons - a way to simplify code (3 < x < 10)

Logical operators help you build complex conditions for decision-making!

Next lesson - practice with comparison and logical operators!`,
  
  practiceTask: {
    title: "Game access system",
    description: "Create a program that checks access to a game",
    problemStatement: `Write a program that:
1. Reads age (integer), score (integer), and permission (True or False) from input
2. Checks whether the player can play: (age >= 13 AND score >= 60) OR has permission
3. Prints the entered values and the result

Input format:
14
85
True`,
    outputFormat: `Age: 14
Score: 85
Permission: True
Can play: True`,
    examples: [
      {
        input: `14
85
True`,
        output: `Age: 14
Score: 85
Permission: True
Can play: True`,
        explanation: "Age and score are enough, or permission is granted - access allowed"
      },
      {
        input: `10
90
False`,
        output: `Age: 10
Score: 90
Permission: False
Can play: False`,
        explanation: "Age < 13 and no permission - access denied"
      },
      {
        input: `12
50
True`,
        output: `Age: 12
Score: 50
Permission: True
Can play: True`,
        explanation: "Age/score conditions fail, but permission is True (or) - access granted"
      }
    ],
    solution: {
      code: `age = int(input())
score = int(input())
has_permission = input().strip() == "True"

print(f"Age: {age}")
print(f"Score: {score}")
print(f"Permission: {has_permission}")

can_play = (age >= 13 and score >= 60) or has_permission
print(f"Can play: {can_play}")`,
      explanation: "Read data from stdin and check access with a combination of and and or."
    },
    hints: [
      "Read age, score, and has_permission with input()",
      "Permission: has_permission = input().strip() == \"True\"",
      "Use and for both conditions and or for permission",
      "Use parentheses () to group conditions"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expression True and False return?",
        options: [
          "True",
          "False",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "The and operator returns True only if both conditions are True. Here one is False, so the result is False."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expression True or False return?",
        options: [
          "True",
          "False",
          "An error",
          "Nothing"
        ],
        correctAnswer: 0,
        explanation: "The or operator returns True if at least one condition is True. Here the first is True, so the result is True."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 12\nscore = 85\nresult = age >= 13 and score >= 60\nprint(result)\n```",
        options: [
          "True",
          "False",
          "12",
          "85"
        ],
        correctAnswer: 1,
        explanation: "age >= 13 is False (12 is not >= 13), so and returns False even though score >= 60 is True."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expression not True return?",
        options: [
          "True",
          "False",
          "1",
          "0"
        ],
        correctAnswer: 1,
        explanation: "The not operator inverts the value. not True = False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 10\nresult = age < 12 or age > 65\nprint(result)\n```",
        options: [
          "True",
          "False",
          "10",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "age < 12 is True (10 < 12), so or returns True even though age > 65 is False."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 5\nresult = 3 < x < 10\nprint(result)\n```",
        options: [
          "True",
          "False",
          "5",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The chained comparison 3 < x < 10 means 3 < 5 and 5 < 10, which is True."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
