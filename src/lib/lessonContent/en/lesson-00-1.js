/**
 * Lesson 00-1: Introduction to Python. Setup and Your First Program
 *
 * Title matches pythonCurriculum.js exactly - the sidebar reads from the
 * curriculum and the <h1> reads from here, so they must not drift.
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_00_1 = {
  lessonId: "lesson-00-1",
  moduleId: "module-00",
  order: 1,
  title: "Introduction to Python. Setup and Your First Program",

  learningObjectives: [
    "Run your first Python program without installing anything",
    "Use print() to make a program say something",
    "Read an error message instead of fearing it",
    "Install Python locally for work outside the browser"
  ],

  prerequisites: [],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Your first program, right now",
        content: `Most courses open with twenty minutes of installation. Not this one.

Every code box in these lessons runs **real Python** in your browser. Same language, same rules, same error messages as the Python that runs Instagram and Spotify. Nothing to download, nothing to configure.

So let's skip the theory and write a program.

The \`print()\` function shows something on screen. Whatever you put between the brackets, Python prints:

\`\`\`python
print("Hello, World!")
\`\`\`

Text goes in quotes. \`"Hello, World!"\` is called a **string** - a piece of text. The quotes are not part of the message; they are how you tell Python "this is text, not a command."

Press **Run** below and watch it happen. Then change the name to yours and run it again.`,
        interactives: [
          {
            id: 'hello',
            type: 'tryIt',
            prompt: 'Change the text to your own name, then run it.',
            starterCode: 'print("Hello, World!")',
            expect: { mustMatch: '\\S' },
            hint: 'Keep the quotes and the brackets - only change the words inside.',
          },
        ],
      },
      {
        title: "How print() is built",
        content: `That one line has four separate pieces, and every one of them matters:

\`\`\`python
print("Hello, World!")
#  ^      ^         ^
#  |      |         |
#  |      |         closing bracket
#  |      the text, wrapped in quotes
#  the function name
\`\`\`

1. **\`print\`** - the name of the function. Lowercase. \`Print\` or \`PRINT\` will not work.
2. **\`(\` and \`)\`** - the brackets. They mean "call this function".
3. **\`"\` and \`"\`** - the quotes. They mark where the text starts and ends.
4. Everything in between - the message.

Single quotes work exactly the same as double quotes:

\`\`\`python
print('Hello')     # fine
print("Hello")     # also fine
print("Hello')     # error - the quotes must match
\`\`\`

Use whichever you like, but open and close with the same one.`,
        interactives: [
          {
            id: 'print-blanks',
            type: 'fillBlank',
            prompt: 'Complete the line so it prints the word Python. The text needs its quotes.',
            template: '{{fn}}({{text}})',
            blanks: [
              { id: 'fn', answer: 'print', width: 7, placeholder: 'function' },
              {
                id: 'text',
                answer: '"Python"',
                accept: ['"Python"', "'Python'"],
                width: 12,
                placeholder: 'the text',
              },
            ],
            explanation: 'print, then brackets, then the text wrapped in matching quotes.',
            hint: 'The function name is lowercase, and the text needs quotes around it.',
          },
        ],
      },
      {
        title: "One print, one line",
        content: `Each \`print()\` puts its output on its own line. Python does not squash them together:

\`\`\`python
print("Line one")
print("Line two")
\`\`\`

gives you

\`\`\`
Line one
Line two
\`\`\`

Code runs **top to bottom**, one line at a time. The first \`print()\` finishes completely before the second one starts. That order is not a detail you can ignore - it is the single most important rule in programming, and it will explain most of the bugs you write this year.

Before you run the next one, decide in your head what it will print. Guessing first is how you find out what you actually believe.`,
        interactives: [
          {
            id: 'guess-order',
            type: 'predictOutput',
            prompt: 'What does this print?',
            code: 'print("Ready")\nprint("Set")\nprint("Go")',
            options: [
              'Ready Set Go',
              'Ready\nSet\nGo',
              'Go\nSet\nReady',
              'Nothing - three prints in a row is an error',
            ],
            correctAnswer: 1,
            explanation:
              'Three separate print() calls, so three separate lines - in the order they are written.',
          },
        ],
      },
      {
        title: "Comments: notes Python ignores",
        content: `Anything after a \`#\` on a line is a **comment**. Python skips it entirely.

\`\`\`python
# This line does nothing at all
print("Visible")     # this bit is ignored too
\`\`\`

Comments are for humans - the you of next month, who will not remember why this code looks like that. They cost nothing and they are not decoration: a comment that explains *why* is worth ten that explain *what*.

\`\`\`python
# Bad: says what the code already says
print("Hi")     # prints Hi

# Good: says something the code cannot
print("Hi")     # greeting shown before the menu loads
\`\`\`

Commenting a line out is also the fastest debugging tool there is - put a \`#\` in front and Python pretends the line was never written.`,
        interactives: [
          {
            id: 'guess-comment',
            type: 'predictOutput',
            prompt: 'Careful - what actually reaches the screen?',
            code: '# print("First")\nprint("Second")  # print("Third")',
            options: [
              'First\nSecond\nThird',
              'Second\nThird',
              'Second',
              'Nothing',
            ],
            correctAnswer: 2,
            explanation:
              'The first line is commented out, and the trailing comment on line 2 is ignored too. Only "Second" survives.',
          },
        ],
      },
      {
        title: "Errors are information, not failure",
        content: `You will write broken code today. Everyone does. Python does not punish you for it - it tells you what went wrong and where.

Miss a closing bracket and you get:

\`\`\`
SyntaxError: '(' was never closed
\`\`\`

Misspell the function and you get:

\`\`\`
NameError: name 'prnt' is not defined
\`\`\`

Read the **last line** first - that is the actual problem. The rest is Python showing its work.

The three you will meet this week:

| Error | What it usually means |
|---|---|
| \`SyntaxError\` | A typo: missing bracket, missing quote, stray character |
| \`NameError\` | You used a name Python has never seen (often a misspelling) |
| \`TypeError\` | You did something to a value its type does not allow |

Break the code below on purpose - delete a bracket, misspell \`print\` - and read what comes back. Getting comfortable with error messages now saves you hours later.`,
        interactives: [
          {
            id: 'break-it',
            type: 'tryIt',
            prompt: 'Break it deliberately, read the error, then fix it so it runs again.',
            starterCode: '# Try: remove a bracket, or misspell print, then run.\n# Then put it back and run again.\nprint("It works")',
            expect: { mustContain: ['it works'] },
            hint: 'To finish this block, get it back to a working state that prints "It works".',
          },
        ],
      },
      {
        title: "Installing Python on your machine",
        content: `The browser is enough for this whole module. When you want to build things that live outside a lesson page - scripts, bots, real projects - you will want Python installed locally.

**1. Download**

Go to [python.org/downloads](https://www.python.org/downloads/) and take the latest 3.x release.

**2. Tick the box**

On Windows the installer shows a checkbox: **"Add python.exe to PATH"**. Tick it. If you skip it, your terminal will not find Python and you will spend an evening confused about why.

**3. Check it worked**

Open Command Prompt (Windows) or Terminal (macOS/Linux):

\`\`\`bash
python --version
\`\`\`

If that says "command not found", try \`python3 --version\` - on macOS and Linux, \`python3\` is usually the right name.

You should see something like \`Python 3.12.5\`.

**4. Get an editor**

[VS Code](https://code.visualstudio.com/) is free, and its Python extension gives you highlighting and error hints as you type. That is the one to start with.

**The interactive shell**

Typing \`python\` on its own opens a prompt where each line runs as you press Enter:

\`\`\`
>>> print("Hello")
Hello
>>> 2 + 2
4
\`\`\`

The \`>>>\` means Python is waiting for you. It is perfect for testing one small thing - notice that \`2 + 2\` printed \`4\` without any \`print()\`, which only happens in the shell. Type \`exit()\` to leave.

Use the shell to try things. Use files for anything you want to keep.`,
      },
    ]
  },

  codeExamples: [
    {
      title: "Example 1: A program that says several things",
      code: `print("Welcome!")
print("This is Python.")
print("Let's build something.")`,
      explanation:
        "Three print() calls run top to bottom and produce three lines, in exactly that order."
    },
    {
      title: "Example 2: Both kinds of quotes",
      code: `print("Double quotes work")
print('Single quotes work too')
print("It's easier to use double quotes when the text has an apostrophe")`,
      explanation:
        "Pick either quote style. Double quotes save you from escaping an apostrophe inside the text."
    },
    {
      title: "Example 3: Blank lines and spacing",
      code: `print("First block")
print()
print("Second block")`,
      explanation:
        "print() with nothing inside prints an empty line - a cheap way to space out output."
    },
    {
      title: "Example 4: Comments in real use",
      code: `# Shown to the player when the game starts
print("=== SPACE ADVENTURE ===")
print("Press any key to begin")

# print("DEBUG: menu loaded")  <- switched off, kept for later`,
      explanation:
        "Comments explain intent, and commenting a line out disables it without deleting it."
    }
  ],

  commonMistakes: [
    {
      mistake: "Capitalising the function name",
      explanation:
        "Python is case-sensitive. Print() and PRINT() are different names from print(), and none of them exist.",
      correctApproach: "Always lowercase: print(\"Hello\"). A NameError almost always means a typo like this."
    },
    {
      mistake: "Mismatched or missing quotes",
      explanation:
        "print(\"Hello') mixes quote styles, and print(Hello) has none - Python then thinks Hello is a variable name and raises NameError.",
      correctApproach: "Open and close with the same quote character: print(\"Hello\") or print('Hello')."
    },
    {
      mistake: "Forgetting the closing bracket",
      explanation:
        "print(\"Hello\" leaves the call unfinished, and Python reports SyntaxError: '(' was never closed.",
      correctApproach: "Every ( needs its ). Most editors highlight the matching pair when you put the cursor on one."
    },
    {
      mistake: "Skipping 'Add Python to PATH' during installation",
      explanation:
        "Without it the python command is not on your system path, so the terminal cannot find it even though Python is installed.",
      correctApproach: "Tick the box during install, or re-run the installer and choose Modify to add it."
    },
    {
      mistake: "Editing a file but running the old saved version",
      explanation:
        "Running a file executes what is on disk, not what is on your screen, so unsaved changes appear to do nothing.",
      correctApproach: "Save (Ctrl+S / Cmd+S) before running. Unsaved files usually show a dot in the editor tab."
    }
  ],

  summary: `What you can do now:

1. Run Python - in the browser here, and locally once you have installed it
2. Use print() to make a program produce output
3. Write text as a string, wrapped in matching quotes
4. Know that code runs top to bottom, one line at a time
5. Write comments with # to explain why, and to switch lines off
6. Read an error message and find the useful line

The whole of programming builds on that fourth point. Next lesson: variables - giving names to values so a program can remember things.`,

  practiceTask: {
    title: "Your first program",
    description: "Write a program that introduces you",
    problemStatement: `Write a program that prints exactly four lines, in this order:
1. A greeting (starts with Hello, Hi, or Hey)
2. Your name (the line must include "name" or "My name is …")
3. That you are learning Python (the line must include the word Python)
4. A farewell (Goodbye, Bye, or See you)

Use one print() per line. Exact wording can vary - the checker looks at the shape of each line, not a fixed script.`,
    outputFormat: `Four non-empty lines. Example:

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
        explanation: "Typical case: Hello + My name is + Python + Goodbye"
      },
      {
        output: `Hi!
My name is Maria
I am learning Python
Bye!`,
        explanation: "Edge-ish wording: Hi/Bye still match the greeting and farewell rules"
      },
      {
        output: `Hey
name: Sam
Learning Python today
See you`,
        explanation: "Unusual but valid: greeting Hey, 'name' without 'My name is', 'See you' farewell"
      }
    ],
    solution: {
      code: `# my_first_program.py
print("Hello!")
print("My name is Alexander")
print("I am learning Python")
print("Goodbye!")`,
      explanation:
        "Four separate print() calls, each producing its own line, in the order they are written."
    },
    hints: [
      "Start by sketching the four lines on paper: greeting, name, Python, farewell — then turn each into a print()",
      "Use the print() function for every line; you do not need input() for this task",
      "Put the word Python on the third line and a farewell word (Goodbye, Bye, or See you) on the fourth"
    ],
    validation: {
      minLines: 4,
      lineRules: [
        { pattern: '^(hello|hi|hey)', flags: 'i' },
        { pattern: '(my name is|name)', flags: 'i' },
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
          "A web browser"
        ],
        correctAnswer: 0,
        explanation: "Python is a high-level programming language, created by Guido van Rossum in 1991."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which function prints text to the screen?",
        options: [
          "echo()",
          "print()",
          "output()",
          "display()"
        ],
        correctAnswer: 1,
        explanation: "print() is the built-in function for showing output."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "What does this code print?\n\n```python\nprint('Hello')\nprint('World')\n```",
        options: [
          "HelloWorld",
          "Hello and World on separate lines",
          "An error",
          "Nothing"
        ],
        correctAnswer: 1,
        explanation: "Each print() ends its line, so the two words land on separate lines."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Which line raises an error?\n\n```python\nprint(\"A\")\nprint('B')\nprint(\"C')\n```",
        options: [
          "Line 1",
          "Line 2",
          "Line 3",
          "None of them"
        ],
        correctAnswer: 2,
        explanation:
          "Line 3 opens with a double quote and closes with a single one. Quotes must match, so this is a SyntaxError."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.LOGIC,
        question: "Which symbol starts a comment in Python?",
        options: [
          "//",
          "#",
          "/*",
          "--"
        ],
        correctAnswer: 1,
        explanation: "# starts a comment. Everything after it on that line is ignored by Python."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "You run your code and see `NameError: name 'prnt' is not defined`. What is most likely wrong?",
        options: [
          "Python is not installed correctly",
          "The function name is misspelled",
          "A quote is missing",
          "The file was not saved"
        ],
        correctAnswer: 1,
        explanation:
          "A NameError means Python does not recognise that name. Here 'prnt' is a typo for 'print'."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Python code runs from top to bottom, one line at a time.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "Yes. Execution order follows the order of the lines - the foundation everything else builds on."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Python is free and open source.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Python is completely free to download, use and distribute."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
