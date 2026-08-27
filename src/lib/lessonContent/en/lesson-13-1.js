/**
 * Lesson 13-1: Introduction to GUI. What is Tkinter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_13_1 = {
  lessonId: "lesson-13-1",
  moduleId: "module-13",
  order: 1,
  title: "Introduction to GUI. What is Tkinter",
  
  learningObjectives: [
    "Understand what a GUI is",
    "Get familiar with Tkinter",
    "Understand GUI application architecture",
    "Prepare the environment for work"
  ],
  
  prerequisites: ["lesson-12-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is a GUI",
        content: `**GUI (Graphical User Interface)** - a graphical interface: windows, buttons, and input fields instead of only text commands in the terminal.

**When a GUI is appropriate:**

- Desktop utilities for non-programmers
- Prototypes of internal tools
- Learning demos after CLI and web modules

**CLI vs GUI:**

| CLI | GUI |
|-----|-----|
| Fast to automate | Convenient to "click" |
| Scripts, servers | Desktop applications |
| Less code for simple tasks | More code for layout |

In industrial products people often choose **web** (React) or **mobile** apps; Tkinter is an excellent **first step** into GUI with Python.`
      },
      {
        title: "Tkinter in the Python ecosystem",
        content: `**Tkinter** - the standard binding to the Tcl/Tk library, shipped with Python.

**Advantages for the course:**

- No \`pip install\` needed (on Windows/macOS)
- Low barrier to entry
- One \`main.py\` file - and you already have a window

**Alternatives (overview):**

- **PyQt / PySide** - powerful, heavier licenses/size
- **Kivy** - mobile and touch
- **Dear PyGui** - games and visualizations

For module 13, Tkinter is enough.`
      },
      {
        title: "GUI application architecture",
        content: `Typical cycle:

1. **Root** (\`Tk()\`) - the main window
2. **Widgets** - Label, Button, Entry…
3. **Geometry** - pack / grid / place (lesson 13-4)
4. **mainloop()** - event loop: clicks, input, redrawing
5. **Callbacks** - functions for events (lesson 13-5)

\`\`\`python
import tkinter as tk

def on_click():
    label.config(text="Clicked!")

root = tk.Tk()
label = tk.Label(root, text="Hello")
label.pack()
btn = tk.Button(root, text="OK", command=on_click)
btn.pack()
root.mainloop()
\`\`\`

While \`mainloop()\` is running the program is "alive"; code after it runs only after the window is closed.`
      },
      {
        title: "Main widgets",
        content: `| Widget | Purpose |
|--------|-------------|
| Label | Text or image |
| Button | Button, \`command=callback\` |
| Entry | Single-line input |
| Text | Multi-line input |
| Frame | Grouping widgets |
| Canvas | Drawing, custom graphics |
| Listbox | List of strings |
| Menu | Window menu |

Lessons 13-3, 13-4, and 13-5 cover Label, Button, Entry, Text, and event handling in more detail.`
      },
      {
        title: "Import and Linux",
        content: `Recommended style:

\`\`\`python
import tkinter as tk
from tkinter import ttk  # themes "like Windows 10"
\`\`\`

Avoid \`from tkinter import *\` in large projects - it pollutes the namespace.

**Linux:** if \`ModuleNotFoundError: tkinter\`:

\`\`\`bash
sudo apt install python3-tk
\`\`\`

**Check:**

\`\`\`python
import tkinter
print(tkinter.TkVersion)
\`\`\``
      },
      {
        title: "Summary",
        content: `GUI is visual interaction; Tkinter is the built-in starting point. Next: \`Tk()\`, \`mainloop()\`, window setup (lesson 13-2), widgets and layout.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Importing Tkinter",
      code: `from tkinter import *`,
      explanation: "Import all classes and functions from the tkinter module. This is the simplest approach for beginners."
    },
    {
      title: "Alternative import",
      code: `import tkinter as tk`,
      explanation: "Alternative import with the tk prefix. Helps avoid name conflicts."
    },
    {
      title: "Checking Tkinter installation",
      code: `import tkinter
print(tkinter.TkVersion)`,
      explanation: "Check the Tkinter version. If there is no error, Tkinter is installed correctly."
    },
    {
      title: "Simple GUI example",
      code: `from tkinter import *

# Create the main window
root = Tk()
root.title("My first GUI")

# Add a label with text
label = Label(root, text="Hello, GUI!")
label.pack()

# Start the main loop
root.mainloop()`,
      explanation: "Minimal GUI app example. Creates a window with the text 'Hello, GUI!'"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call mainloop()",
      explanation: "Without mainloop() the window will not appear or will close immediately after opening.",
      correctApproach: "Always call root.mainloop() at the end of the program to display and keep the window alive."
    },
    {
      mistake: "Importing with * instead of as tk",
      explanation: "Importing with * can create name conflicts with other modules.",
      correctApproach: "For larger projects prefer 'import tkinter as tk' to avoid conflicts."
    },
    {
      mistake: "Trying to use Tkinter without installing it on Linux",
      explanation: "On some Linux systems Tkinter is not installed by default.",
      correctApproach: "Install python3-tk via the package manager: sudo apt-get install python3-tk"
    }
  ],
  
  summary: `In this lesson we learned:

1. GUI - a graphical user interface for convenient interaction
2. Tkinter - the standard Python library for building GUIs
3. GUI architecture - main window, widgets, events, and handlers
4. Main widgets - Label, Button, Entry, Text, and others
5. Setup - Tkinter already comes with Python

In the next lesson we will create our first window!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a GUI?",
        options: [
          "Graphical User Interface",
          "Graphical tool for processing",
          "Generator of unique identifiers",
          "Global User Interface"
        ],
        correctAnswer: 0,
        explanation: "GUI (Graphical User Interface) is a graphical user interface that lets you interact with a program through visual elements."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Do you need to install Tkinter separately?",
        options: [
          "No, it is installed together with Python",
          "Yes, you need to install it via pip",
          "Only on Windows",
          "Only on Linux"
        ],
        correctAnswer: 0,
        explanation: "Tkinter ships with Python, so no extra install is needed (except on some Linux systems)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which widget is used to display text?",
        options: [
          "Label",
          "Button",
          "Entry",
          "Text"
        ],
        correctAnswer: 0,
        explanation: "Label is used to display text or an image."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Tkinter works only on Windows.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Tkinter is cross-platform and works on Windows, macOS, and Linux."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a widget in Tkinter?",
        options: [
          "An interface element (button, input field, etc.)",
          "A special function",
          "A data type",
          "A Python module"
        ],
        correctAnswer: 0,
        explanation: "A widget is an interface element such as a button, input field, label, and so on."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does mainloop() do?",
        options: [
          "Starts the GUI event processing loop",
          "Closes the window",
          "Sets the title",
          "Compiles .py into .exe"
        ],
        correctAnswer: 0,
        explanation: "mainloop() keeps the window open and handles clicks and input."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
