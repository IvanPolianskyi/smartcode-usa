/**
 * Lesson 13-1: Introduction to GUI. What is Tkinter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_13_1 = {
  lessonId: "lesson-13-1",
  moduleId: "module-13",
  order: 1,
  title: "Introduction to GUI. What is Tkinter?",
  
  learningObjectives: [
    "Understand what a GUI is",
    "Get to know Tkinter",
    "Understand the architecture of GUI applications",
    "Prepare the environment for work"
  ],
  
  prerequisites: ["lesson-12-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "What is a GUI?",
        content: `A **GUI** uses windows, buttons, and fields instead of typing commands in a terminal.

**Good fits:** desktop utilities, internal tools, learning demos after CLI and web modules.

| CLI | GUI |
|-----|-----|
| Scripts, servers | Desktop apps |
| Fast automation | Click-friendly UX |

Tkinter is a solid **first GUI step** in Python; many products later move to web or mobile UI.`
      },
      {
        title: "Tkinter in the Python ecosystem",
        content: `**Tkinter** ships with Python (Tcl/Tk binding).

- No pip install on Windows/macOS
- Low learning curve
- Single \`main.py\` can show a window

Alternatives: PyQt/PySide (richer), Kivy (touch), Dear PyGui. Module 13 stays with Tkinter.`
      },
      {
        title: "GUI application architecture",
        content: `1. **Root** (\`Tk()\`) — main window
2. **Widgets** — Label, Button, Entry…
3. **Layout** — pack / grid / place (lesson 13-4)
4. **mainloop()** — event loop
5. **Callbacks** — event handlers (lesson 13-5)

\`\`\`python
import tkinter as tk

def on_click():
    label.config(text="Clicked!")

root = tk.Tk()
label = tk.Label(root, text="Hello")
label.pack()
tk.Button(root, text="OK", command=on_click).pack()
root.mainloop()
\`\`\`

Code after \`mainloop()\` runs only after the window closes.`
      },
      {
        title: "Core widgets",
        content: `| Widget | Role |
|--------|------|
| Label | Text or image |
| Button | Action, \`command=\` |
| Entry | Single-line input |
| Text | Multi-line input |
| Frame | Grouping |
| Canvas | Drawing |

Lessons 13-3–13-5 cover widgets and events in depth.`
      },
      {
        title: "Imports and Linux",
        content: `Prefer:

\`\`\`python
import tkinter as tk
from tkinter import ttk
\`\`\`

Avoid \`from tkinter import *\` in large projects.

Linux: \`sudo apt install python3-tk\` if import fails.

\`\`\`python
import tkinter
print(tkinter.TkVersion)
\`\`\``
      },
      {
        title: "Summary",
        content: `Next: \`Tk()\`, \`mainloop()\`, and window setup in lesson 13-2.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Import Tkinter",
      code: `from tkinter import *`,
      explanation: "We import all classes and functions from the tkinter module. This is the easiest way for beginners."
    },
    {
      title: "Alternative import",
      code: `import tkinter as tk`,
      explanation: "An alternative way to import with the tk prefix. Avoids name conflicts."
    },
    {
      title: "Checking your Tkinter installation",
      code: `import tkinter
print(tkinter.TkVersion)`,
      explanation: "Checking the version of Tkinter. If there is no error, Tkinter is installed correctly."
    },
    {
      title: "A simple GUI example",
      code: `from tkinter import *

# We create the main window
root = Tk()
root.title("My first GUI")

# Add a label with text
label = Label(root, text="Hello GUI!")
label.pack()

# We start the main loop
root.mainloop()`,
      explanation: "A minimal example of a GUI application. Creates a window with the text 'Hello GUI!'"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call mainloop()",
      explanation: "Without mainloop(), the window will not display or close immediately after opening.",
      correctApproach: "Always call root.mainloop() at the end of the program to display and maintain the window."
    },
    {
      mistake: "Import via * instead of as tk",
      explanation: "Importing via * can create name conflicts with other modules.",
      correctApproach: "For large projects it is better to use 'import tkinter as tk' to avoid conflicts."
    },
    {
      mistake: "Trying to use Tkinter without installing it on Linux",
      explanation: "On some Linux systems, Tkinter is not installed by default.",
      correctApproach: "Install python3-tk via the package manager: sudo apt-get install python3-tk"
    }
  ],
  
  summary: `In this lesson we learned:

1. GUI - graphical user interface for convenient interaction
2. Tkinter is a standard Python library for creating GUIs
3. GUI architecture - main window, widgets, events and handlers
4. Basic widgets - Label, Button, Entry, Text and others
5. Preparation - Tkinter is already installed with Python

In the next lesson, we will create our first window!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a GUI?",
        options: [
          "Graphical user interface",
          "Graphic tool for processing",
          "Generator of unique identifiers",
          "Global user interface"
        ],
        correctAnswer: 0,
        explanation: "GUI (Graphical User Interface) is a graphical user interface that allows you to interact with the program through visual elements."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Do I need to install Tkinter separately?",
        options: [
          "No, it is installed with Python",
          "Yes, you need to install via pip",
          "Only on Windows",
          "Only on Linux"
        ],
        correctAnswer: 0,
        explanation: "Tkinter comes bundled with Python, so no additional installation is required (except on some Linux systems)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What widget is used to display text?",
        options: [
          "Label",
          "Button",
          "Entry",
          "Text"
        ],
        correctAnswer: 0,
        explanation: "Label is used to display text or image."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Tkinter only works on Windows.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Tkinter is cross-platform and runs on Windows, macOS, and Linux."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is a widget in Tkinter?",
        options: [
          "Interface element (button, input field, etc.)",
          "Special function",
          "Data type",
          "A Python module"
        ],
        correctAnswer: 0,
        explanation: "A widget is an interface element such as a button, input field, label, etc."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does mainloop() do?",
        options: [
          "Runs the GUI event loop",
          "Closes the window",
          "Sets the window title",
          "Compiles Python to exe"
        ],
        correctAnswer: 0,
        explanation: "mainloop() keeps the window open and processes clicks and input."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
