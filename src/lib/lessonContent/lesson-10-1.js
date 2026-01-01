/**
 * 01 Decorators
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_1 = {
  lessonId: "lesson-10-1",
  moduleId: "module-10",
  order: 1,
  title: "01 Decorators",
  
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
        title: "Decorators",
        content: `Decorators can be thought of as functions which modify the *functionality* of another function. They help to make your code shorter and more \"Pythonic\". 

To properly explain decorators we will slowly build up from functions. Make sure to run every cell in this Notebook for this lecture to look the same on your own computer.So let's break down the steps:

## Functions Review`
      },
      {
        title: "Scope Review",
        content: `Remember from the nested statements lecture that Python uses Scope to know what a label is referring to. For example:

Remember that Python functions create a new scope, meaning the function has its own namespace to find variable names when they are mentioned within the function. We can check for local variables and global variables with the locals() and globals() functions. For example:

Here we get back a dictionary of all the global variables, many of them are predefined in Python. So let's go ahead and look at the keys:

Note how **s** is there, the Global Variable we defined as a string:

Now let's run our function to check for local variables that might exist inside our function (there shouldn't be any)

Great! Now lets continue with building out the logic of what a decorator is. Remember that in Python **everything is an object**. That means functions are objects which can be assigned labels and passed into other functions. Lets start with some simple examples:

Assign another label to the function. Note that we are not using parentheses here because we are not calling the function **hello**, instead we are just passing a function object to the **greet** variable.

So what happens when we delete the name **hello**?

Even though we deleted the name **hello**, the name **greet** *still points to* our original function object. It is important to know that functions are objects that can be passed to other objects!`
      },
      {
        title: "Functions within functions",
        content: `Great! So we've seen how we can treat functions as objects, now let's see how we can define functions inside of other functions:

Note how due to scope, the welcome() function is not defined outside of the hello() function. Now lets learn about returning functions from within functions:
## Returning Functions

Now let's see what function is returned if we set x = hello(), note how the empty parentheses means that name has been defined as Jose.

Great! Now we can see how x is pointing to the greet function inside of the hello function.

Let's take a quick look at the code again. 

In the if/else clause we are returning greet and welcome, not greet() and welcome(). 

This is because when you put a pair of parentheses after it, the function gets executed; whereas if you don’t put parentheses after it, then it can be passed around and can be assigned to other variables without executing it.

When we write x = hello(), hello() gets executed and because the name is Jose by default, the function greet is returned. If we change the statement to x = hello(name = \"Sam\") then the welcome function will be returned. We can also do print(hello()()) which outputs *This is inside the greet() function*.`
      },
      {
        title: "Functions as Arguments",
        content: `Now let's see how we can pass functions as arguments into other functions:

Great! Note how we can pass the functions as objects and then use them within other functions. Now we can get started with writing our first decorator:`
      },
      {
        title: "Creating a Decorator",
        content: `In the previous example we actually manually created a Decorator. Here we will modify it to make its use case clear:

So what just happened here? A decorator simply wrapped the function and modified its behavior. Now let's understand how we can rewrite this code using the @ symbol, which is what Python uses for Decorators:

**Great! You've now built a Decorator manually and then saw how we can use the @ symbol in Python to automate this and clean our code. You'll run into Decorators a lot if you begin using Python for Web Development, such as Flask or Django!**`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `def func():
    return 1`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `func()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `s = 'Global Variable'

def check_for_locals():
    print(locals())`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print(globals())`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print(globals().keys())`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `globals()['s']`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `check_for_locals()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def hello(name='Jose'):
    return 'Hello '+name`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `hello()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `greet = hello`,
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
