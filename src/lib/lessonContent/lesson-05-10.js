/**
 * 04 Oop Challenge
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_10 = {
  lessonId: "lesson-05-10",
  moduleId: "module-05",
  order: 10,
  title: "04 Oop Challenge",
  
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
        title: "Object Oriented Programming Challenge",
        content: `For this challenge, create a bank account class that has two attributes:

* owner
* balance

and two methods:

* deposit
* withdraw

As an added requirement, withdrawals may not exceed the available balance.

Instantiate your class, make several deposits and withdrawals, and test to make sure the account can't be overdrawn.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `class Account:
    pass`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "1. Instantiate the class",
      code: `# 1. Instantiate the class
acct1 = Account('Jose',100)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "2. Print the object",
      code: `# 2. Print the object
print(acct1)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "3. Show the account owner attribute",
      code: `# 3. Show the account owner attribute
acct1.owner`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "4. Show the account balance attribute",
      code: `# 4. Show the account balance attribute
acct1.balance`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "5. Make a series of deposits and withdrawals",
      code: `# 5. Make a series of deposits and withdrawals
acct1.deposit(50)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `acct1.withdraw(75)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "6. Make a withdrawal that exceeds the available balance",
      code: `# 6. Make a withdrawal that exceeds the available balance
acct1.withdraw(500)`,
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
