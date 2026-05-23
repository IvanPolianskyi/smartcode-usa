/**
 * Lesson 01-3: Practice: problems with comparison operators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_01_3 = {
  lessonId: "lesson-01-3",
  moduleId: "module-01",
  order: 3,
  title: "Practice: problems with comparison operators",
  
  learningObjectives: [
    "Solve practical comparison problems",
    "Apply logical operators",
    "Create complex conditions",
    "Practice writing conditional expressions"
  ],
  
  prerequisites: ["lesson-01-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Review of what we've learned",
        content: `In this lesson we'll reinforce everything about comparison and logical operators.

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
        title: "Problem 1: Checking age",
        content: `**Condition:** Create a program that checks whether a child can play a game.

**Requirements:**
- Age must be >= 13
- Score must be >= 60
- Both conditions must be met

**Solution:**
\`\`\`python
age = 14
score = 85

# Can play if age >= 13 AND score >= 60
can_play = age >= 13 and score >= 60
print(can_play)  # True

# If one condition is not met
age = 12
can_play = age >= 13 and score >= 60
print(can_play)  # False
\`\`\``
      },
      {
        title: "Problem 2: Discount system",
        content: `**Condition:** Create a program to check for a discount.

**Requirements:**
- Discount for children under 12
- Discount for seniors over 65
- Only one condition is enough

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
        content: `**Condition:** Check whether a number is within a range.

**Requirements:**
- Check whether the number is between 10 and 20
- Use a chained comparison

**Solution:**
\`\`\`python
x = 15

# Check if the number is in the range [10, 20]
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
        content: `**1. Read the condition carefully:**
Understand exactly what needs to be checked.

**2. Decide which operators you need:**
- If BOTH conditions are required → and
- If at least ONE condition is required → or
- If you need to invert → not

**3. Use parentheses:**
Parentheses () help clarify the order of evaluation.

**4. Check edge cases:**
Verify what happens when values equal the boundaries.

**5. Test your code:**
Try different values to make sure everything works correctly.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Complex condition",
      code: `# Complex condition with and and or
age = 14
score = 85
is_student = True

# Can enroll if (age >= 13 AND score >= 60) OR has a student ID
can_enroll = (age >= 13 and score >= 60) or is_student
print(can_enroll)  # True`,
      explanation: "Demonstrates combining and and or for a complex condition."
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
      explanation: "Shows using the not operator to invert a condition."
    },
    {
      title: "Example 3: Chained comparisons",
      code: `# Chained comparisons
temperature = 20

# Check if temperature is in a comfortable range
is_comfortable = 18 <= temperature <= 25
print(is_comfortable)  # True

# Check if a number is between two others
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
      mistake: "Incorrect use of and and or",
      explanation: "and requires both conditions to be True; or requires at least one to be True.",
      correctApproach: "Read the condition carefully: 'both' = and, 'at least one' = or."
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
3. Solved practical problems - age checks, discounts, ranges
4. Learned to create complex conditions - combining operators

Now you know how to use comparison and logical operators to build conditions!

Next module - conditional if/elif/else statements!`,
  
  practiceTask: {
    title: "Club access check system",
    description: "Create a program to check club access",
    problemStatement: `Write a program that:
1. Stores age in a variable age (for example, 14)
2. Stores a score in a variable score (for example, 85)
3. Stores whether a membership card exists in a variable has_membership (True or False)
4. Checks whether you can join: (age >= 13 AND score >= 60) OR has a membership card
5. Checks whether you CANNOT join (inverts the result)
6. Prints both results`,
    outputFormat: `Example output:
Age: 14
Score: 85
Membership card: True
Can join: True
Cannot join: False`,
    examples: [
      {
        output: `Age: 14
Score: 85
Membership card: True
Can join: True
Cannot join: False`,
        explanation: "The program uses a combination of and, or, and not to check access"
      }
    ],
    solution: {
      code: `# Club access check system
age = 14
score = 85
has_membership = True

# Print values
print("Age: " + str(age))
print("Score: " + str(score))
print("Membership card: " + str(has_membership))

# Access check: (age >= 13 AND score >= 60) OR has a membership card
can_join = (age >= 13 and score >= 60) or has_membership
print("Can join: " + str(can_join))

# Invert the result
cannot_join = not can_join
print("Cannot join: " + str(cannot_join))`,
      explanation: "The solution uses a combination of and, or, and not to check access and invert the result."
    },
    hints: [
      "Use the and operator to check both conditions",
      "Use the or operator to check at least one condition",
      "Use the not operator to invert the result",
      "Use parentheses () to group conditions",
      "Use str() to convert boolean values to strings"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nage = 14\nscore = 85\nresult = age >= 13 and score >= 60\nprint(result)\n```",
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
        question: "What will this code print?\n\n```python\nage = 10\nresult = age < 12 or age > 65\nprint(result)\n```",
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
        explanation: "5 > 3 is True, so not True = False."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code print?\n\n```python\nx = 15\nresult = 10 <= x <= 20\nprint(result)\n```",
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
        question: "What will this code print?\n\n```python\nage = 12\nscore = 85\nhas_permission = True\nresult = (age >= 13 and score >= 60) or has_permission\nprint(result)\n```",
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
        question: "Which operator returns True only if both conditions are True?",
        options: [
          "and",
          "or",
          "not",
          "=="
        ],
        correctAnswer: 0,
        explanation: "The and operator returns True only if both conditions are True."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
