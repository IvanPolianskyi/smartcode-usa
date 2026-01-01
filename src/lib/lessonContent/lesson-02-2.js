/**
 * 04 While Loops
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_2 = {
  lessonId: "lesson-02-2",
  moduleId: "module-02",
  order: 2,
  title: "04 While Loops",
  
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
        title: "while Loops",
        content: `The while statement in Python is one of most general ways to perform iteration. A while statement will repeatedly execute a single statement or group of statements as long as the condition is true. The reason it is called a 'loop' is because the code statements are looped through over and over again until the condition is no longer met.

The general format of a while loop is:

    while test:
        code statements
    else:
        final code statements

Let’s look at a few simple while loops in action.

Notice how many times the print statements occurred and how the while loop kept going until the True condition was met, which occurred once x==10. It's important to note that once this occurred the code stopped. Let's see how we could add an else statement:`
      },
      {
        title: "break, continue, pass",
        content: `We can use break, continue, and pass statements in our loops to add additional functionality for various cases. The three statements are defined by:

    break: Breaks out of the current closest enclosing loop.
    continue: Goes to the top of the closest enclosing loop.
    pass: Does nothing at all.
    
    
Thinking about break and continue statements, the general format of the while loop looks like this:

    while test: 
        code statement
        if test: 
            break
        if test: 
            continue 
    else:

break and continue statements can appear anywhere inside the loop’s body, but we will usually put them further nested in conjunction with an if statement to perform an action based on some condition.

Let's go ahead and look at some examples!

Note how we have a printed statement when x==3, and a continue being printed out as we continue through the outer while loop. Let's put in a break once x ==3 and see if the result makes sense:

Note how the other else statement wasn't reached and continuing was never printed!

After these brief but simple examples, you should feel comfortable using while statements in your code.

**A word of caution however! It is possible to create an infinitely running loop with while statements. For example:**

A quick note: If you *did* run the above cell, click on the Kernel menu above to restart the kernel!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `x = 0

while x < 10:
    print('x is currently: ',x)
    print(' x is still less than 10, adding 1 to x')
    x+=1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `x = 0

while x < 10:
    print('x is currently: ',x)
    print(' x is still less than 10, adding 1 to x')
    x+=1
    
else:
    print('All Done!')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `x = 0

while x < 10:
    print('x is currently: ',x)
    print(' x is still less than 10, adding 1 to x')
    x+=1
    if x==3:
        print('x==3')
    else:
        print('continuing...')
        continue`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `x = 0

while x < 10:
    print('x is currently: ',x)
    print(' x is still less than 10, adding 1 to x')
    x+=1
    if x==3:
        print('Breaking because x==3')
        break
    else:
        print('continuing...')
        continue`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "DO NOT RUN THIS CODE!!!!",
      code: `# DO NOT RUN THIS CODE!!!! 
while True:
    print(\"I'm stuck in an infinite loop!\")`,
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
