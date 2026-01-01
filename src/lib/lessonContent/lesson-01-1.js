/**
 * 01 Comparison Operators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_01_1 = {
  lessonId: "lesson-01-1",
  moduleId: "module-01",
  order: 1,
  title: "01 Comparison Operators",
  
  learningObjectives: [
    "Вивчити основні концепції",
    "Застосувати знання на практиці",
    "Розв'язати практичні задачі"
  ],
  
  estimatedTime: 90,
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Comparison Operators",
        content: `In this lecture we will be learning about Comparison Operators in Python. These operators will allow us to compare variables and output a Boolean value (True or False). 

If you have any sort of background in Math, these operators should be very straight forward.

First we'll present a table of the comparison operators and then work through some examples:

 Table of Comparison Operators   In the table below, a=3 and b=4.

OperatorDescriptionExample

==
If the values of two operands are equal, then the condition becomes true.
 (a == b) is not true.

!=
If values of two operands are not equal, then condition becomes true.
(a != b) is true

&gt;
If the value of left operand is greater than the value of right operand, then condition becomes true.
 (a &gt; b) is not true.

&lt;
If the value of left operand is less than the value of right operand, then condition becomes true.
 (a &lt; b) is true.

&gt;=
If the value of left operand is greater than or equal to the value of right operand, then condition becomes true.
 (a &gt;= b) is not true. 

&lt;=
If the value of left operand is less than or equal to the value of right operand, then condition becomes true.
 (a &lt;= b) is true.

Let's now work through quick examples of each of these.

#### Equal

Note that == is a comparison operator, while = is an assignment operator.`
      },
      {
        title: "Less than or Equal to",
        content: `**Great! Go over each comparison operator to make sure you understand what each one is saying. But hopefully this was straightforward for you.**

Next we will cover chained comparison operators`
      },
      {
        title: "Chained Comparison Operators",
        content: `An interesting feature of Python is the ability to *chain* multiple comparisons to perform a more complex test. You can use these chained comparisons as shorthand for larger Boolean Expressions.

In this lecture we will learn how to chain comparison operators and we will also introduce two other important statements in Python: **and** and **or**.

Let's look at a few examples of using chains:

The above statement checks if 1 was less than 2 **and** if 2 was less than 3. We could have written this using an **and** statement in Python:

The **and** is used to make sure two checks have to be true in order for the total check to be true. Let's see another example:

The above checks if 3 is larger than both of the other numbers, so you could use **and** to rewrite it as:

It's important to note that Python is checking both instances of the comparisons. We can also use **or** to write comparisons in Python. For example:

Note how it was true; this is because with the **or** operator, we only need one *or* the other to be true. Let's see one more example to drive this home:

Great! For an overview of this quick lesson: You should have a comfortable understanding of using **and** and **or** statements as well as reading chained comparison code.

Go ahead and go to the quiz for this section to check your understanding!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `2 == 2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `1 == 0`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 != 1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 != 2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 > 1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 > 4`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 < 4`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 < 1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 >= 2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `2 >= 1`,
      explanation: "Приклад коду з курсу"
    }
  ],
  
  commonMistakes: [],
  
  summary: "Підсумок уроку",
  
  practiceTask: {
    title: "Практична задача",
    description: "Опишіть задачу",
    problemStatement: "Умова задачі",
    inputFormat: "",
    outputFormat: "",
    examples: [],
    solution: {
      code: "",
      explanation: ""
    },
    hints: [],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [],
    timeLimit: 10,
    passingScore: 70
  }
}
