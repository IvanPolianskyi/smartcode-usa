/**
 * 01 Introduction To Python Statements
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_02_1 = {
  lessonId: "lesson-02-1",
  moduleId: "module-02",
  order: 1,
  title: "01 Introduction To Python Statements",
  
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
        title: "Introduction to Python Statements",
        content: `In this lecture we will be doing a quick overview of Python Statements. This lecture will emphasize differences between Python and other languages such as C++. 

There are two reasons we take this approach for learning the context of Python Statements:

    1.) If you are coming from a different language this will rapidly accelerate your understanding of Python.
    2.) Learning about statements will allow you to be able to read other languages more easily in the future.`
      },
      {
        title: "Python vs Other Languages",
        content: `Let's create a simple statement that says:
\"If a is greater than b, assign 2 to a and 4 to b\"

Take a look at these two if statements (we will learn about building out if statements soon).

**Version 1 (Other Languages)**

    if (a>b){
        a = 2;
        b = 4;
    }
                        
**Version 2 (Python)**   

    if a>b:
        a = 2
        b = 4

You'll notice that Python is less cluttered and much more readable than the first version. How does Python manage this?

Let's walk through the main differences:

Python gets rid of () and {} by incorporating two main factors: a *colon* and *whitespace*. The statement is ended with a colon, and whitespace is used (indentation) to describe what takes place in case of the statement.

Another major difference is the lack of semicolons in Python. Semicolons are used to denote statement endings in many other languages, but in Python, the end of a line is the same as the end of a statement.

Lastly, to end this brief overview of differences, let's take a closer look at indentation syntax in Python vs other languages:

## Indentation

Here is some pseudo-code to indicate the use of whitespace and indentation in Python:

**Other Languages**

    if (x)
        if(y)
            code-statement;
    else
        another-code-statement;
        
**Python**
    
    if x:
        if y:
            code-statement
    else:
        another-code-statement

Note how Python is so heavily driven by code indentation and whitespace. This means that code readability is a core part of the design of the Python language.

Now let's start diving deeper by coding these sort of statements in Python!`
      },
      {
        title: "if, elif, else Statements",
        content: `if Statements in Python allows us to tell the computer to perform alternative actions based on a certain set of results.

Verbally, we can imagine we are telling the computer:

\"Hey if this case happens, perform some action\"

We can then expand the idea further with elif and else statements, which allow us to tell the computer:

\"Hey if this case happens, perform some action. Else, if another case happens, perform some other action. Else, if *none* of the above cases happened, perform this action.\"

Let's go ahead and look at the syntax format for if statements to get a better idea of this:

    if case1:
        perform action1
    elif case2:
        perform action2
    else: 
        perform action3`
      },
      {
        title: "First Example",
        content: `Let's see a quick example of this:

Let's add in some else logic:`
      },
      {
        title: "Multiple Branches",
        content: `Let's get a fuller picture of how far if, elif, and else can take us!

We write this out in a nested structure. Take note of how the if, elif, and else line up in the code. This can help you see what if is related to what elif or else statements.

We'll reintroduce a comparison syntax for Python.

Note how the nested if statements are each checked until a True boolean causes the nested code below it to run. You should also note that you can put in as many elif statements as you want before you close off with an else.

Let's create two more simple examples for the if, elif, and else statements:`
      },
      {
        title: "Indentation",
        content: `It is important to keep a good understanding of how indentation works in Python to maintain the structure and order of your code. We will touch on this topic again when we start building out functions!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `if True:
    print('It was true!')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `x = False

if x:
    print('x was True!')
else:
    print('I will be printed in any case where x is not true')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `loc = 'Bank'

if loc == 'Auto Shop':
    print('Welcome to the Auto Shop!')
elif loc == 'Bank':
    print('Welcome to the bank!')
else:
    print('Where are you?')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `person = 'Sammy'

if person == 'Sammy':
    print('Welcome Sammy!')
else:
    print(\"Welcome, what's your name?\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `person = 'George'

if person == 'Sammy':
    print('Welcome Sammy!')
elif person =='George':
    print('Welcome George!')
else:
    print(\"Welcome, what's your name?\")`,
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
