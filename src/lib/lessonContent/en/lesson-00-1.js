/**
 * Lesson 00-1: Introduction to Python. Installation and your first program
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_00_1 = {
  lessonId: "lesson-00-1",
  moduleId: "module-00",
  order: 1,
  title: "Introduction to Python. Installation and your first program",
  
  learningObjectives: [
    "Understand what Python is and its advantages",
    "Install Python and set up your environment",
    "Write your first 'Hello, World!' program",
    "Get familiar with the Python interpreter"
  ],
  
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is Python?",
        content: `Python is a modern high-level programming language created by Guido van Rossum in 1991. The name comes from the comedy show "Monty Python's Flying Circus", but the language itself is serious and powerful.

**Why is Python so popular?**

1. **Readability**: Python code reads almost like English
2. **Versatility**: Python is used for:
   - Web development (Django, Flask)
   - Scientific computing (Data Science, AI)
   - Task automation
   - Game development
   - Working with data
3. **Large community**: Millions of developers worldwide
4. **Free**: Python is completely free and open source

**Where is Python used?**
- YouTube, Instagram, Spotify - built with Python
- Google, NASA, Netflix - use Python
- Artificial intelligence and machine learning
- Automation and scripting`
      },
      {
        title: "Installing Python",
        content: `**Step 1: Download Python**

1. Go to the official site: https://www.python.org/downloads/
2. Download the latest Python 3.x version (3.11 or newer recommended)
3. During installation, be sure to check "Add Python to PATH"

**Step 2: Verify installation**

Open Command Prompt (Windows) or Terminal (Mac/Linux) and enter:

\`\`\`bash
python --version
\`\`\`

Or:

\`\`\`bash
python3 --version
\`\`\`

You should see something like: \`Python 3.11.5\`

**Step 3: Install a code editor**

Recommended editors:
- **VS Code** (Visual Studio Code) - free and popular
- **PyCharm** - powerful IDE for Python
- **Sublime Text** - lightweight and fast

For beginners we recommend VS Code.`
      },
      {
        title: "Your first program: Hello, World!",
        content: `A tradition in programming is to start with a program that prints "Hello, World!". It is the simplest program that confirms everything works correctly.

**Creating a file:**

1. Open your code editor
2. Create a new file named \`hello.py\`
3. Write the following code:

\`\`\`python
print("Hello, World!")
\`\`\`

Save the file

**Running the program:**

**Option 1: From the command line**
\`\`\`bash
python hello.py
\`\`\`

**Option 2: In VS Code**
- Right-click the file
- Choose "Run Python File in Terminal"

**Result:**
You will see in the terminal:
\`\`\`
Hello, World!
\`\`\`

Congratulations! You wrote your first Python program!`
      },
      {
        title: "Working with the Python interpreter",
        content: `Python has an interactive mode (REPL - Read-Eval-Print Loop) where you can run code immediately without creating files.

**Starting interactive mode:**

Open the command line and enter:
\`\`\`bash
python
\`\`\`

Or:
\`\`\`bash
python3
\`\`\`

You will see something like:
\`\`\`
Python 3.11.5 (main, ...)
Type "help", "copyright", "credits" or "license" for more information.
>>>
\`\`\`

**The \`>>>\` prompt** means Python is ready to accept commands.

**Usage examples:**

\`\`\`python
>>> print("Hello, Python!")
Hello, Python!

>>> 2 + 2
4

>>> print("This is my first Python code!")
This is my first Python code!
\`\`\`

**Exiting interactive mode:**

Enter:
\`\`\`python
>>> exit()
\`\`\`

Or press \`Ctrl+Z\` (Windows) or \`Ctrl+D\` (Mac/Linux)

**When to use interactive mode:**
- Quick code testing
- Experimenting with Python
- Learning and exploration

**When to use files:**
- Building real programs
- Saving code for later use
- Projects you need to run many times`
      },
      {
        title: "Structure of a Python program",
        content: `Let's look at the basic structure of a Python program:

\`\`\`python
# This is a comment - Python ignores everything after #

# Importing modules (we'll learn more about this later)
import math

# Comments explain the code
# This is just an example of program structure

# Running code
print("Hello! This is my first Python program")

# Simple output
print("Python is a great programming language!")
\`\`\`

**Key points:**

1. **Comments** start with \`#\` - they help explain the code
2. **The print() function** displays information on the screen
3. **Code runs top to bottom**, line by line

**Code style:**

Python follows the philosophy that "beautiful code is readable code". It is important to:
- Use indentation (4 spaces)
- Write clear code
- Add comments where needed`
      }
    ]
  },
  
  commonMistakes: [
    {
      mistake: "Forgetting to add Python to PATH during installation",
      explanation: "Without this, Python won't be available from the command line and you won't be able to run programs.",
      correctApproach: "During Python installation, always check 'Add Python to PATH'."
    },
    {
      mistake: "Using the wrong quotes",
      explanation: "Python distinguishes single (') and double (\") quotes, but they must be paired.",
      correctApproach: "Use matching quotes: print('Hello') or print(\"Hello\"), but not print('Hello\")."
    },
    {
      mistake: "Errors in file names",
      explanation: "File names with spaces or special characters can cause problems.",
      correctApproach: "Use simple names: hello.py, my_program.py (not 'my program.py' or 'my-program.py')."
    },
    {
      mistake: "Forgetting to save the file before running",
      explanation: "If the file isn't saved, the old version of the code runs.",
      correctApproach: "Always save the file (Ctrl+S) before running the program."
    }
  ],
  
  summary: `In this lesson we learned:

1. Python - a powerful and simple programming language
2. Installing Python - download from python.org and add to PATH
3. First program - print("Hello, World!")
4. Interactive mode - quick code testing via python
5. Program structure - comments and running code line by line

You are now ready to write your first Python programs! The next lesson covers variables and data types.`,
  
  practiceTask: {
    title: "Your first program",
    description: "Create your first Python program",
    problemStatement: `Write a program that:
1. Prints a greeting
2. Prints your name
3. Prints a message that you are learning Python
4. Prints a goodbye`,
    outputFormat: `Example output:
Hello!
My name is Alexander
I am learning Python
Goodbye!`,
    examples: [
      {
        output: `Hello!
My name is Alexander
I am learning Python
Goodbye!`,
        explanation: "The program uses the print() function to display messages"
      }
    ],
    solution: {
      code: `# my_first_program.py
print("Hello!")
print("My name is Alexander")
print("I am learning Python")
print("Goodbye!")`,
      explanation: "The solution uses the print() function to display several messages on the screen."
    },
    hints: [
      "Use the print() function for each line",
      "Each print() outputs text on a new line",
      "You can use single or double quotes"
    ],
    validation: {
      minLines: 4,
      exactLineCount: true,
      lineRules: [
        { pattern: '^(hello|hi|hey)', flags: 'i' },
        { minLength: 3 },
        { pattern: 'python', flags: 'i' },
        { pattern: '(goodbye|bye|see you)', flags: 'i' },
      ],
    },
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is Python?",
        options: [
          "A high-level programming language",
          "A text editor",
          "An operating system",
          "A browser"
        ],
        correctAnswer: 0,
        explanation: "Python is a high-level programming language created in 1991."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which command prints text to the screen in Python?",
        options: [
          "echo()",
          "print()",
          "output()",
          "display()"
        ],
        correctAnswer: 1,
        explanation: "The print() function is used to display text on the screen."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What will this code output?\n\n```python\nprint('Hello')\nprint('World')\n```",
        options: [
          "HelloWorld",
          "Hello\nWorld",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "Each print() outputs text on a new line, so the result is 'Hello' on one line and 'World' on the next."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Python is a free programming language.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Yes, Python is completely free and open source."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you start Python's interactive mode?",
        options: [
          "python run",
          "python",
          "python start",
          "python interactive"
        ],
        correctAnswer: 1,
        explanation: "The command 'python' or 'python3' starts Python's interactive mode (REPL)."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Which symbol is used for comments in Python?",
        options: [
          "//",
          "#",
          "/*",
          "--"
        ],
        correctAnswer: 1,
        explanation: "The # symbol is used for comments in Python. Everything after # on a line is ignored."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
