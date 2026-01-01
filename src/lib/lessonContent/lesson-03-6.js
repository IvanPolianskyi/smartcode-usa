/**
 * 05 Lambda Expressions Map And Filter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_6 = {
  lessonId: "lesson-03-6",
  moduleId: "module-03",
  order: 6,
  title: "05 Lambda Expressions Map And Filter",
  
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
        title: "Lambda Expressions, Map, and Filter",
        content: `Now its time to quickly learn about two built in functions, filter and map. Once we learn about how these operate, we can learn about the lambda expression, which will come in handy when you begin to develop your skills further!`
      },
      {
        title: "map function",
        content: `The **map** function allows you to \"map\" a function to an iterable object. That is to say you can quickly call the same function to every item in an iterable, such as a list. For example:

The functions can also be more complex`
      },
      {
        title: "filter function",
        content: `The filter function returns an iterator yielding those items of iterable for which function(item)
is true. Meaning you need to filter by a function that returns either True or False. Then passing that into filter (along with your iterable) and you will get back only the results that would return True when passed to the function.`
      },
      {
        title: "lambda expression",
        content: `One of Pythons most useful (and for beginners, confusing) tools is the lambda expression. lambda expressions allow us to create \"anonymous\" functions. This basically means we can quickly make ad-hoc functions without needing to properly define a function using def.

Function objects returned by running lambda expressions work exactly the same as those created and assigned by defs. There is key difference that makes lambda useful in specialized roles:

**lambda's body is a single expression, not a block of statements.**

* The lambda's body is similar to what we would put in a def body's return statement. We simply type the result as an expression instead of explicitly returning it. Because it is limited to an expression, a lambda is less general that a def. We can only squeeze design, to limit program nesting. lambda is designed for coding simple functions, and def handles the larger tasks.

Lets slowly break down a lambda expression by deconstructing a function:

We could simplify it:

We could actually even write this all on one line.

This is the form a function that a lambda expression intends to replicate. A lambda expression can then be written as:

So why would use this? Many function calls need a function passed in, such as map and filter. Often you only need to use the function you are passing in once, so instead of formally defining it, you just use the lambda expression. Let's repeat some of the examples from above with a lambda expression

Here are a few more examples, keep in mind the more comples a function is, the harder it is to translate into a lambda expression, meaning sometimes its just easier (and often the only way) to create the def keyword function.

** Lambda expression for grabbing the first character of a string: **

** Lambda expression for reversing a string: **

You can even pass in multiple arguments into a lambda expression. Again, keep in mind that not every function can be translated into a lambda expression.

You will find yourself using lambda expressions often with certain non-built-in libraries, for example the pandas library for data analysis works very well with lambda expressions.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `def square(num):
    return num**2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `my_nums = [1,2,3,4,5]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `map(square,my_nums)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "To get the results, either iterate through map()",
      code: `# To get the results, either iterate through map() 
# or just cast to a list
list(map(square,my_nums))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def splicer(mystring):
    if len(mystring) % 2 == 0:
        return 'even'
    else:
        return mystring[0]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `mynames = ['John','Cindy','Sarah','Kelly','Mike']`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `list(map(splicer,mynames))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def check_even(num):
    return num % 2 == 0`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `nums = [0,1,2,3,4,5,6,7,8,9,10]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `filter(check_even,nums)`,
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
