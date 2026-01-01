/**
 * 01 Methods
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_5 = {
  lessonId: "lesson-03-5",
  moduleId: "module-03",
  order: 5,
  title: "01 Methods",
  
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
        title: "Methods",
        content: `We've already seen a few example of methods when learning about Object and Data Structure Types in Python. Methods are essentially functions built into objects. Later on in the course we will learn about how to create our own objects and methods using Object Oriented Programming (OOP) and classes.

Methods perform specific actions on an object and can also take arguments, just like a function. This lecture will serve as just a brief introduction to methods and get you thinking about overall design methods that we will touch back upon when we reach OOP in the course.

Methods are in the form:

    object.method(arg1,arg2,etc...)
    
You'll later see that we can think of methods as having an argument 'self' referring to the object itself. You can't see this argument but we will be using it later on in the course during the OOP lectures.

Let's take a quick look at what an example of the various methods a list has:

Fortunately, with iPython and the Jupyter Notebook we can quickly see all the possible methods using the tab key. The methods for a list are:

* append
* count
* extend
* insert
* pop
* remove
* reverse
* sort

Let's try out a few of them:

append() allows us to add elements to the end of a list:

Great! Now how about count()? The count() method will count the number of occurrences of an element in a list.

You can always use Shift+Tab in the Jupyter Notebook to get more help about the method. In general Python you can use the help() function:

Feel free to play around with the rest of the methods for a list. Later on in this section your quiz will involve using help and Google searching for methods of different types of objects!

Great! By this lecture you should feel comfortable calling methods of objects in Python!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Create a simple list",
      code: `# Create a simple list
lst = [1,2,3,4,5]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst.append(6)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `lst`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Check how many times 2 shows up in the list",
      code: `# Check how many times 2 shows up in the list
lst.count(2)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `help(lst.count)`,
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
