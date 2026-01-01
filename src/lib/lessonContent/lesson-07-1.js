/**
 * 01 Errors And Exceptions Handling
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_07_1 = {
  lessonId: "lesson-07-1",
  moduleId: "module-07",
  order: 1,
  title: "01 Errors And Exceptions Handling",
  
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
        title: "Errors and Exception Handling",
        content: `In this lecture we will learn about Errors and Exception Handling in Python. You've definitely already encountered errors by this point in the course. For example:

Note how we get a SyntaxError, with the further description that it was an EOL (End of Line Error) while scanning the string literal. This is specific enough for us to see that we forgot a single quote at the end of the line. Understanding these various error types will help you debug your code much faster. 

This type of error and description is known as an Exception. Even if a statement or expression is syntactically correct, it may cause an error when an attempt is made to execute it. Errors detected during execution are called exceptions and are not unconditionally fatal.

You can check out the full list of built-in exceptions [here](https://docs.python.org/3/library/exceptions.html). Now let's learn how to handle errors and exceptions in our own code.`
      },
      {
        title: "try and except",
        content: `The basic terminology and syntax used to handle errors in Python are the try and except statements. The code which can cause an exception to occur is put in the try block and the handling of the exception is then implemented in the except block of code. The syntax follows:

    try:
       You do your operations here...
       ...
    except ExceptionI:
       If there is ExceptionI, then execute this block.
    except ExceptionII:
       If there is ExceptionII, then execute this block.
       ...
    else:
       If there is no exception then execute this block. 

We can also just check for any exception with just using except: To get a better understanding of all this let's check out an example: We will look at some code that opens and writes a file:

Now let's see what would happen if we did not have write permission (opening only with 'r'):

Great! Notice how we only printed a statement! The code still ran and we were able to continue doing actions and running code blocks. This is extremely useful when you have to account for possible input errors in your code. You can be prepared for the error and keep running code, instead of your code just breaking as we saw above.

We could have also just said except: if we weren't sure what exception would occur. For example:

Great! Now we don't actually need to memorize that list of exception types! Now what if we kept wanting to run code after the exception occurred? This is where finally comes in.
## finally
The finally: block of code will always be run regardless if there was an exception in the try code block. The syntax is:

    try:
       Code block here
       ...
       Due to any exception, this code may be skipped!
    finally:
       This code block would always be executed.

For example:

We can use this in conjunction with except. Let's see a new example that will take into account a user providing the wrong input:

Notice how we got an error when trying to print val (because it was never properly assigned). Let's remedy this by asking the user and checking to make sure the input type is an integer:

Hmmm...that only did one check. How can we continually keep checking? We can use a while loop!

So why did our function print \"Finally, I executed!\" after each trial, yet it never printed \`val\` itself? This is because with a try/except/finally clause, any continue or break statements are reserved until *after* the try clause is completed. This means that even though a successful input of **3** brought us to the else: block, and a break statement was thrown, the try clause continued through to finally: before breaking out of the while loop. And since print(val) was outside the try clause, the break statement prevented it from running.

Let's make one final adjustment:

**Great! Now you know how to handle errors and exceptions in Python with the try, except, else, and finally notation!**`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `print('Hello)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `try:
    f = open('testfile','w')
    f.write('Test write this')
except IOError:
    # This will only check for an IOError exception and then execute this print statement
    print(\"Error: Could not find file or read data\")
else:
    print(\"Content written successfully\")
    f.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `try:
    f = open('testfile','r')
    f.write('Test write this')
except IOError:
    # This will only check for an IOError exception and then execute this print statement
    print(\"Error: Could not find file or read data\")
else:
    print(\"Content written successfully\")
    f.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `try:
    f = open('testfile','r')
    f.write('Test write this')
except:
    # This will check for any exception and then execute this print statement
    print(\"Error: Could not find file or read data\")
else:
    print(\"Content written successfully\")
    f.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `try:
    f = open(\"testfile\", \"w\")
    f.write(\"Test write statement\")
    f.close()
finally:
    print(\"Always execute finally code blocks\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def askint():
    try:
        val = int(input(\"Please enter an integer: \"))
    except:
        print(\"Looks like you did not enter an integer!\")

    finally:
        print(\"Finally, I executed!\")
    print(val)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `askint()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `askint()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def askint():
    try:
        val = int(input(\"Please enter an integer: \"))
    except:
        print(\"Looks like you did not enter an integer!\")
        val = int(input(\"Try again-Please enter an integer: \"))
    finally:
        print(\"Finally, I executed!\")
    print(val)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `askint()`,
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
