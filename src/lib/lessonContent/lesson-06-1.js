/**
 * Useful_Info_Notebook
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_06_1 = {
  lessonId: "lesson-06-1",
  moduleId: "module-06",
  order: 1,
  title: "Useful_Info_Notebook",
  
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
        title: "Modules and Packages",
        content: `There's no code here because it didn't really make sense for the section. Check out the video lectures for more info and the resources for this.

Here is the best source the official docs!
https://docs.python.org/3/tutorial/modules.html#packages

But I really like the info here: https://python4astronomers.github.io/installation/packages.html

Here's some extra info to help:

Modules in Python are simply Python files with the .py extension, which implement a set of functions. Modules are imported from other modules using the import command.

To import a module, we use the import command. Check out the full list of built-in modules in the Python standard library [here](https://docs.python.org/3/py-modindex.html).

The first time a module is loaded into a running Python script, it is initialized by executing the code in the module once. If another module in your code imports the same module again, it will not be loaded twice but once only - so local variables inside the module act as a \"singleton\" - they are initialized only once.

If we want to import the math module, we simply import the name of the module:`
      },
      {
        title: "Exploring built-in modules",
        content: `Two very important functions come in handy when exploring modules in Python - the dir and help functions.

We can look for which functions are implemented in each module by using the dir function:

When we find the function in the module we want to use, we can read about it more using the help function, inside the Python interpreter:`
      },
      {
        title: "Writing modules",
        content: `Writing Python modules is very simple. To create a module of your own, simply create a new .py file with the module name, and then import it using the Python file name (without the .py extension) using the import command.

## Writing packages
Packages are name-spaces which contain multiple packages and modules themselves. They are simply directories, but with a twist.

Each package in Python is a directory which MUST contain a special file called **\__init\__.py**. This file can be empty, and it indicates that the directory it contains is a Python package, so it can be imported the same way a module can be imported.

If we create a directory called foo, which marks the package name, we can then create a module inside that package called bar. We also must not forget to add the **\__init\__.py** file inside the foo directory.

To use the module bar, we can import it in two ways:

In the first method, we must use the foo prefix whenever we access the module bar. In the second method, we don't, because we import the module to our module's name-space.

The **\__init\__.py** file can also decide which modules the package exports as the API, while keeping other modules internal, by overriding the **\__all\__** variable, like so:`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "import the library",
      code: `# import the library
import math`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "use it (ceiling rounding)",
      code: `# use it (ceiling rounding)
math.ceil(2.4)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `print(dir(math))`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `help(math.ceil)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Just an example, this won't work",
      code: `# Just an example, this won't work
import foo.bar`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "OR could do it this way",
      code: `# OR could do it this way
from foo import bar`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `__init__.py:

__all__ = [\"bar\"]`,
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
