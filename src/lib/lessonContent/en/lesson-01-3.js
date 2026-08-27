/**
 * Lesson 01-3: Practice: comparison operator problems
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_01_3 = {
  lessonId: "lesson-01-3",
  moduleId: "module-01",
  order: 3,
  title: "Practice: comparison operator problems",
  
  learningObjectives: [
    "Solve practical comparison problems",
    "Apply logical operators",
    "Build compound conditions",
    "Practice writing conditional expressions"
  ],
  
  prerequisites: ["lesson-01-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Review of what we learned",
        content: `In this lesson we will reinforce everything about comparison and logical operators.

**What we already know:**
1. Comparison operators: ==, !=, <, >, <=, >=
2. Logical operators: and, or, not
3. Chained comparisons: 3 < x < 10

**Approach to solving problems:**
1. Understand the problem statement
2. Decide which operators you need
3. Write the expression
4. Check the result`
      },
      {
        title: "Problem 1: Age check",
        content: `**Statement:** Create a program that checks whether a child can play a game.

**Requirements:**
- Age must be >= 13
- Score must be >= 60
- Both conditions must be true

**Solution:**
\`\`\`python
age = 14
score = 85

# Can play if age >= 13 AND score >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True

# If one condition fails
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False
\`\`\``
      },
      {
        title: "Problem 2: Discount system",
        content: `**Statement:** Create a program that checks for a discount.

**Requirements:**
- Discount for children under 12
- Discount for seniors over 65
- One condition is enough

**Solution:**
\`\`\`python
age = 10

# Discount if age < 12 OR age > 65
has_discount = age < 12 or age > 65
print(has_discount)  # True

age = 70
has_discount = age < 12 or age > 65
print(has_discount)  # True

age = 20
has_discount = age < 12 or age > 65
print(has_discount)  # False
\`\`\``
      },
      {
        title: "Problem 3: Range check",
        content: `**Statement:** Check whether a number is within a range.

**Requirements:**
- Check whether the number is between 10 and 20
- Use a chained comparison

**Solution:**
\`\`\`python
x = 15

# Check whether the number is in the range [10, 20]
is_in_range = 10 <= x <= 20
print(is_in_range)  # True

# Same as:
is_in_range2 = x >= 10 and x <= 20
print(is_in_range2)  # True

x = 25
is_in_range = 10 <= x <= 20
print(is_in_range)  # False
\`\`\``
      },
      {
        title: "Tips for solving problems",
        content: `**1. Read the statement carefully:**
Understand exactly what you need to check.

**2. Decide which operators you need:**
- If BOTH conditions are required → and
- If at least ONE condition is enough → or
- If you need to invert → not

**3. Use parentheses:**
Parentheses () help clarify evaluation order.

**4. Check edge cases:**
Test what happens when values equal the boundaries.

**5. Test your code:**
Try different values to make sure everything works correctly.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Compound condition",
      code: `# Compound condition with and and or
age = 14
score = 85
is_student = True

# Can enroll if (age >= 13 AND score >= 60) OR has a student ID
can_enroll = (age >= 13 and score >= 60) or is_student
print(can_enroll)  # True`,
      explanation: "Demonstrates combining and and or for a compound condition."
    },
    {
      title: "Example 2: Using not",
      code: `# Using not
score = 45
passed = score >= 60

# Did NOT pass the test
not_passed = not passed
print(not_passed)  # True

# Or you can write it like this:
not_passed2 = not (score >= 60)
print(not_passed2)  # True`,
      explanation: "Shows using not to invert a condition."
    },
    {
      title: "Example 3: Chained comparisons",
      code: `# Chained comparisons
temperature = 20

# Check whether temperature is in a comfortable range
is_comfortable = 18 <= temperature <= 25
print(is_comfortable)  # True

# Check whether a number is between two others
x = 5
y = 10
z = 7
is_between = x < z < y
print(is_between)  # True`,
      explanation: "Demonstrates chained comparisons to simplify code."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Misusing and and or",
      explanation: "and requires both conditions True; or requires at least one True.",
      correctApproach: "Read the statement carefully: 'both' = and, 'at least one' = or."
    },
    {
      mistake: "Forgetting parentheses in complex expressions",
      explanation: "Without parentheses, operator precedence can give unexpected results.",
      correctApproach: "Always use parentheses for clarity: (a and b) or c"
    },
    {
      mistake: "Confusion with not",
      explanation: "not inverts the value, so not True = False.",
      correctApproach: "Remember: not always flips the value to its opposite."
    }
  ],
  
  summary: `In this lesson we:

1. Reviewed comparison operators - ==, !=, <, >, <=, >=
2. Reviewed logical operators - and, or, not
3. Solved practice problems - age checks, discounts, ranges
4. Learned to build compound conditions - combinations of operators

You can now use comparison and logical operators to create conditions!

Next module - conditional statements if/elif/else!`,
  
  practiceTask: {
    title: "Access verification system",
    description: "Create a program that checks club access",
    problemStatement: `Write a program that:
1. Reads age, score, and membership card status (True/False) from input
2. Checks whether the person can join: (age >= 13 AND score >= 60) OR has a membership card
3. Computes whether they CANNOT join using the not operator
4. Prints all results

Input format:
14
85
True`,
    outputFormat: `Age: 14
Score: 85
Membership card: True
Can join: True
Cannot join: False`,
    examples: [
      {
        input: `14
85
True`,
        output: `Age: 14
Score: 85
Membership card: True
Can join: True
Cannot join: False`,
        explanation: "Conditions pass - can_join True, not gives False"
      },
      {
        input: `10
70
False`,
        output: `Age: 10
Score: 70
Membership card: False
Can join: False
Cannot join: True`,
        explanation: "Age too low and no card - access denied, not → True"
      },
      {
        input: `16
50
False`,
        output: `Age: 16
Score: 50
Membership card: False
Can join: False
Cannot join: True`,
        explanation: "Score < 60 and no card - access denied"
      }
    ],
    solution: {
      code: `age = int(input())
score = int(input())
has_membership = input().strip() == "True"

print(f"Age: {age}")
print(f"Score: {score}")
print(f"Membership card: {has_membership}")

can_join = (age >= 13 and score >= 60) or has_membership
print(f"Can join: {can_join}")

cannot_join = not can_join
print(f"Cannot join: {cannot_join}")`,
      explanation: "Read data from stdin, combine and/or, and invert the result with not."
    },
    hints: [
      "Read age, score, and has_membership with input()",
      "Use and, or, and parentheses () for the access condition",
      "Use not to invert the result",
      "Permission/card: input().strip() == \"True\""
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 14\nscore = 85\nresult = age >= 13 and score >= 60\nprint(result)\n```",
        options: [
          "True",
          "False",
          "14",
          "85"
        ],
        correctAnswer: 0,
        explanation: "Both conditions are True (14 >= 13 and 85 >= 60), so and returns True."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 10\nresult = age < 12 or age > 65\nprint(result)\n```",
        options: [
          "True",
          "False",
          "10",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "age < 12 is True (10 < 12), so or returns True."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expression not (5 > 3) return?",
        options: [
          "True",
          "False",
          "5",
          "3"
        ],
        correctAnswer: 1,
        explanation: "Parentheses evaluate 5 > 3 first (True). not flips that boolean, so the result is False — not the numbers 5 or 3."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nx = 15\nresult = 10 <= x <= 20\nprint(result)\n```",
        options: [
          "True",
          "False",
          "15",
          "An error"
        ],
        correctAnswer: 0,
        explanation: "The chained comparison 10 <= x <= 20 means 10 <= 15 and 15 <= 20, which is True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nage = 12\nscore = 85\nhas_permission = True\nresult = (age >= 13 and score >= 60) or has_permission\nprint(result)\n```",
        options: [
          "True",
          "False",
          "12",
          "85"
        ],
        correctAnswer: 0,
        explanation: "Although (age >= 13 and score >= 60) is False, has_permission is True, so or returns True."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "You need a check that is True only when age >= 13 AND score >= 60. Which expression does that?",
        options: [
          "age >= 13 and score >= 60",
          "age >= 13 or score >= 60",
          "not (age >= 13)",
          "age >= 13 + score >= 60"
        ],
        correctAnswer: 0,
        explanation: "and requires both sides True. or would pass if either check passes, and not only flips one condition — it does not combine both."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
