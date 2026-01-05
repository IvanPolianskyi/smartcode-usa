/**
 * 08 Bonus   With Statement Context Managers
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_1 = {
  lessonId: "lesson-13-3",
  moduleId: "module-15",
  order: 1,
  title: "08 Bonus   With Statement Context Managers",
  
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
        title: "With Statement Context Managers",
        content: `When you open a file using \`f = open('test.txt')\`, the file stays open until you specifically call \`f.close()\`.  Should an exception be raised while working with the file, it remains open. This can lead to vulnerabilities in your code, and inefficient use of resources.

A context manager handles the opening and closing of resources, and provides a built-in \`try/finally\` block should any exceptions occur.

The best way to demonstrate this is with an example.

### Standard \`open()\` procedure, with a raised exception:

Let's see if we can modify our file:

Ouch! I may not have wanted to do that until I traced the exception! Unfortunately, the exception prevented the last line, \`p.close()\` from running. Let's close the file manually:`
      },
      {
        title: "Protect the file with `try/except/finally`",
        content: `A common workaround is to insert a \`try/except/finally\` clause to close the file whenever an exception is raised:

Let's see if we can modify our file this time:

Excellent! Our file is safe.

### Save steps with \`with\`

Now we'll employ our context manager. The syntax follows \`with [resource] as [target]: do something\`

Can we modify the file?

Great! With just one line of code we've handled opening the file, enclosing our code in a \`try/finally\` block, and closing our file all at the same time.

Now you should have a basic understanding of context managers.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `p = open('oops.txt','a')
p.readlines()
p.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `p.write('add more text')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `p.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `p = open('oops.txt','a')
try:
    p.readlines()
except:
    print('An exception was raised!')
finally:
    p.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `p.write('add more text')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `with open('oops.txt','a') as p:
    p.readlines()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `p.write('add more text')`,
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
