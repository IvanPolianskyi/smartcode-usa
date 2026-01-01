/**
 * 02 Functions
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_1 = {
  lessonId: "lesson-03-1",
  moduleId: "module-03",
  order: 1,
  title: "02 Functions",
  
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
        title: "Functions",
        content: `## Introduction to Functions

This lecture will consist of explaining what a function is in Python and how to create one. Functions will be one of our main building blocks when we construct larger and larger amounts of code to solve problems.

### What is a function?

Formally, a function is a useful device that groups together a set of statements so they can be run more than once. They can also let us specify parameters that can serve as inputs to the functions.

On a more fundamental level, functions allow us to not have to repeatedly write the same code again and again. If you remember back to the lessons on strings and lists, remember that we used a function len() to get the length of a string. Since checking the length of a sequence is a common task you would want to write a function that can do this repeatedly at command.

Functions will be one of most basic levels of reusing code in Python, and it will also allow us to start thinking of program design (we will dive much deeper into the ideas of design when we learn about Object Oriented Programming).`
      },
      {
        title: "Why even use functions?",
        content: `Put simply, you should use functions when you plan on using a block of code multiple times. The function will allow you to call the same block of code without having to write it multiple times. This in turn will allow you to create more complex Python scripts. To really understand this though, we should actually write our own functions!`
      },
      {
        title: "Function Topics",
        content: `* def keyword
* simple example of a function
* calling a function with ()
* accepting parameters
* print versus return
* adding in logic inside a function
* multiple returns inside a function
* adding in loops inside a function
* tuple unpacking
* interactions between functions`
      },
      {
        title: "def keyword",
        content: `Let's see how to build out a function's syntax in Python. It has the following form:

We begin with def then a space followed by the name of the function. Try to keep names relevant, for example len() is a good name for a length() function. Also be careful with names, you wouldn't want to call a function the same name as a [built-in function in Python](https://docs.python.org/3/library/functions.html) (such as len).

Next come a pair of parentheses with a number of arguments separated by a comma. These arguments are the inputs for your function. You'll be able to use these inputs in your function and reference them. After this you put a colon.

Now here is the important step, you must indent to begin the code inside your function correctly. Python makes use of *whitespace* to organize code. Lots of other programing languages do not do this, so keep that in mind.

Next you'll see the docstring, this is where you write a basic description of the function. Using Jupyter and Jupyter Notebooks, you'll be able to read these docstrings by pressing Shift+Tab after a function name. Docstrings are not necessary for simple functions, but it's good practice to put them in so you or other people can easily understand the code you write.

After all this you begin writing the code you wish to execute.

The best way to learn functions is by going through examples. So let's try to go through examples that relate back to the various objects and data structures we learned about before.`
      },
      {
        title: "Calling a function with ()",
        content: `Call the function:

If you forget the parenthesis (), it will simply display the fact that say_hello is a function. Later on we will learn we can actually pass in functions into other functions! But for now, simply remember to call functions with ().`
      },
      {
        title: "Accepting parameters (arguments)",
        content: `Let's write a function that greets people with their name.`
      },
      {
        title: "Using return",
        content: `So far we've only seen print() used, but if we actually want to save the resulting variable we need to use the **return** keyword.

Let's see some example that use a return statement. return allows a function to *return* a result that can then be stored as a variable, or used in whatever manner a user wants.

### Example: Addition function

What happens if we input two strings?`
      },
      {
        title: "Very Common Question: \"What is the difference between *return* and *print*?\"",
        content: `**The return keyword allows you to actually save the result of the output of a function as a variable. The print() function simply displays the output to you, but doesn't save it for future use. Let's explore this in more detail**

**But what happens if we actually want to save this result for later use?**

**Be careful! Notice how print_result() doesn't let you actually save the result to a variable! It only prints it out, with print() returning None for the assignment!**`
      },
      {
        title: "Adding Logic to Internal Function Operations",
        content: `So far we know quite a bit about constructing logical statements with Python, such as if/else/elif statements, for and while loops, checking if an item is **in** a list or **not in** a list (Useful Operators Lecture). Let's now see how we can perform these operations within a function.`
      },
      {
        title: "Check if a number is even",
        content: `**Recall the mod operator % which returns the remainder after division, if a number is even then mod 2 (% 2) should be == to zero.**

** Let's use this to construct a function. Notice how we simply return the boolean check.**`
      },
      {
        title: "Check if any number in  a list is even",
        content: `Let's return a boolean indicating if **any** number in a list is even. Notice here how **return** breaks out of the loop and exits the function

** Is this enough? NO! We're not returning anything if they are all odds!**

** VERY COMMON MISTAKE!! LET'S SEE A COMMON LOGIC ERROR, NOTE THIS IS WRONG!!!**

** Correct Approach: We need to initiate a return False AFTER running through the entire loop**`
      },
      {
        title: "Return all even numbers in a list",
        content: `Let's add more complexity, we now will return all the even numbers in a list, otherwise return an empty list.`
      },
      {
        title: "Returning Tuples for Unpacking",
        content: `** Recall we can loop through a list of tuples and \"unpack\" the values within them**

**Similarly, functions often return tuples, to easily return multiple results for later use.**

Let's imagine the following list:

The employee of the month function will return both the name and number of hours worked for the top performer (judged by number of hours worked).`
      },
      {
        title: "Interactions between functions",
        content: `Functions often use results from other functions, let's see a simple example through a guessing game. There will be 3 positions in the list, one of which is an 'O', a function will shuffle the list, another will take a player's guess, and finally another will check to see if it is correct. This is based on the classic carnival game of guessing which cup a red ball is under.

**How to shuffle a list in Python**

**OK, let's create our simple game**

Now we will check the user's guess. Notice we only print here, since we have no need to save a user's guess or the shuffled list.

Now we create a little setup logic to run all the functions. Notice how they interact with each other!

Great! You should now have a basic understanding of creating your own functions to save yourself from repeatedly writing code!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `def name_of_function(arg1,arg2):
    '''
    This is where the function's Document String (docstring) goes.
    When you call help() on your function it will be printed out.
    '''
    # Do stuff here
    # Return desired result`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def say_hello():
    print('hello')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `say_hello()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `say_hello`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def greeting(name):
    print(f'Hello {name}')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `greeting('Jose')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `def add_num(num1,num2):
    return num1+num2`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `add_num(4,5)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Can also save as variable due to return",
      code: `# Can also save as variable due to return
result = add_num(4,5)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print(result)`,
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
