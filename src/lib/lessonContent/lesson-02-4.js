/**
 * 05 Useful Operators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_4 = {
  lessonId: "lesson-02-4",
  moduleId: "module-02",
  order: 4,
  title: "05 Useful Operators",
  
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
        title: "Useful Operators",
        content: `There are a few built-in functions and \"operators\" in Python that don't fit well into any category, so we will go over them in this lecture, let's begin!`
      },
      {
        title: "range",
        content: `The range function allows you to quickly *generate* a list of integers, this comes in handy a lot, so take note of how to use it! There are 3 parameters you can pass, a start, a stop, and a step size. Let's see some examples:

Note that this is a **generator** function, so to actually get a list out of it, we need to cast it to a list with **list()**. What is a generator? Its a special type of function that will generate information and not need to save it to memory. We haven't talked about functions or generators yet, so just keep this in your notes for now, we will discuss this in much more detail in later on in your training!`
      },
      {
        title: "enumerate",
        content: `enumerate is a very useful function to use with for loops. Let's imagine the following situation:

Keeping track of how many loops you've gone through is so common, that enumerate was created so you don't need to worry about creating and updating this index_count or loop_count variable`
      },
      {
        title: "zip",
        content: `Notice the format enumerate actually returns, let's take a look by transforming it to a list()

It was a list of tuples, meaning we could use tuple unpacking during our for loop. This data structure is actually very common in Python , especially when working with outside libraries. You can use the **zip()** function to quickly create a list of tuples by \"zipping\" up together two lists.

To use the generator, we could just use a for loop`
      },
      {
        title: "in operator",
        content: `We've already seen the **in** keyword during the for loop, but we can also use it to quickly check if an object is in a list`
      },
      {
        title: "not in",
        content: `We can combine **in** with a **not** operator, to check if some object or variable is not present in a list.`
      },
      {
        title: "min and max",
        content: `Quickly check the minimum or maximum of a list with these functions.`
      },
      {
        title: "random",
        content: `Python comes with a built in random library. There are a lot of functions included in this random library, so we will only show you two useful functions for now.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `range(0,11)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Notice how 11 is not included, up to but not including 11, just like slice notation!",
      code: `# Notice how 11 is not included, up to but not including 11, just like slice notation!
list(range(0,11))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `list(range(0,12))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Third parameter is step size!",
      code: `# Third parameter is step size!
# step size just means how big of a jump/leap/step you 
# take from the starting number to get to the next number.

list(range(0,11,2))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `list(range(0,101,10))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `index_count = 0

for letter in 'abcde':
    print(\"At index {} the letter is {}\".format(index_count,letter))
    index_count += 1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Notice the tuple unpacking!",
      code: `# Notice the tuple unpacking!

for i,letter in enumerate('abcde'):
    print(\"At index {} the letter is {}\".format(i,letter))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `list(enumerate('abcde'))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `mylist1 = [1,2,3,4,5]
mylist2 = ['a','b','c','d','e']`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "This one is also a generator! We will explain this later, but for now let's transform it to a list",
      code: `# This one is also a generator! We will explain this later, but for now let's transform it to a list
zip(mylist1,mylist2)`,
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
