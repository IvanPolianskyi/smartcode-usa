/**
 * 06 List Comprehensions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_6 = {
  lessonId: "lesson-02-6",
  moduleId: "module-02",
  order: 6,
  title: "06 List Comprehensions",
  
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
        title: "List Comprehensions",
        content: `In addition to sequence operations and list methods, Python includes a more advanced operation called a list comprehension.

List comprehensions allow us to build out lists using a different notation. You can think of it as essentially a one line for loop built inside of brackets. For a simple example:
## Example 1

This is the basic idea of a list comprehension. If you're familiar with mathematical notation this format should feel familiar for example: x^2 : x in { 0,1,2...10 } 

Let's see a few more examples of list comprehensions in Python:
## Example 2`
      },
      {
        title: "Example 3",
        content: `Let's see how to add in if statements:`
      },
      {
        title: "Example 4",
        content: `Can also do more complicated arithmetic:`
      },
      {
        title: "Example 5",
        content: `We can also perform nested list comprehensions, for example:

Later on in the course we will learn about generator comprehensions. After this lecture you should feel comfortable reading and writing basic list comprehensions.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Grab every letter in string",
      code: `# Grab every letter in string
lst = [x for x in 'word']`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Check",
      code: `# Check
lst`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Square numbers in range and turn into list",
      code: `# Square numbers in range and turn into list
lst = [x**2 for x in range(0,11)]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Check for even numbers in a range",
      code: `# Check for even numbers in a range
lst = [x for x in range(11) if x % 2 == 0]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Convert Celsius to Fahrenheit",
      code: `# Convert Celsius to Fahrenheit
celsius = [0,10,20.1,34.5]

fahrenheit = [((9/5)*temp + 32) for temp in celsius ]

fahrenheit`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst = [ x**2 for x in [x**2 for x in range(11)]]
lst`,
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
