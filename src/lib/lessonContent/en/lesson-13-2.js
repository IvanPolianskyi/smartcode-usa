/**
 * Lesson 13-2: Creating the first window. Tk(), mainloop()
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_13_2 = {
  lessonId: "lesson-13-2",
  moduleId: "module-13",
  order: 2,
  title: "Creating the first window. Tk(), mainloop()",
  
  learningObjectives: [
    "Create the first window",
    "Use Tk() and mainloop()",
    "Configure size and title",
    "Close the window"
  ],
  
  prerequisites: ["lesson-13-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Creating the first window",
        content: `In this lesson we will learn how to create our first GUI window with Tkinter.

**Creating the main window:**

To create the main window, use the \`Tk()\` class:

\`\`\`python
from tkinter import *

root = Tk()
root.mainloop()
\`\`\`

**What happens:**
1. \`Tk()\` - creates the application's main window
2. \`mainloop()\` - starts the main event loop that displays the window and handles events

**Window setup:**

**Window title:**
\`\`\`python
root.title("My app")
\`\`\`

**Window size:**
\`\`\`python
root.geometry("400x300")  # width x height
\`\`\`

**Minimum/maximum size:**
\`\`\`python
root.minsize(200, 150)  # minimum size
root.maxsize(800, 600)  # maximum size
\`\`\`

**Window position on screen:**
\`\`\`python
root.geometry("400x300+100+100")  # size + x position + y position
\`\`\`

**Other useful settings:**

**Changing the icon:**
\`\`\`python
root.iconbitmap("icon.ico")  # Windows
# or for cross-platform use:
root.iconphoto(False, PhotoImage(file="icon.png"))
\`\`\`

**Window background:**
\`\`\`python
root.configure(bg="lightblue")
\`\`\`

**Closing the window:**

You can close the window by:
- Clicking the X button in the top corner
- Calling the \`destroy()\` method:
\`\`\`python
root.destroy()
\`\`\`

**Handling close:**

You can add a handler for the window close event:
\`\`\`python
def on_closing():
    if messagebox.askokcancel("Exit", "Are you sure you want to exit?"):
        root.destroy()

root.protocol("WM_DELETE_WINDOW", on_closing)
\`\`\`

**Important about mainloop():**

\`mainloop()\` is an infinite loop that:
- Displays the window on screen
- Handles events (clicks, key presses, etc.)
- Updates the interface
- Blocks execution of code after it

**Note:** Code after \`mainloop()\` runs only after the window is closed.

**Full example:**

\`\`\`python
from tkinter import *

root = Tk()
root.title("My first app")
root.geometry("400x300")
root.configure(bg="lightgray")

label = Label(root, text="Hello, Tkinter!", font=("Arial", 16))
label.pack(pady=50)

root.mainloop()
\`\`\`

Now you know how to create and configure GUI windows!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Minimal window",
      code: `from tkinter import *

root = Tk()
root.mainloop()`,
      explanation: "The simplest window example. Creates an empty window with default size."
    },
    {
      title: "Window with a title",
      code: `from tkinter import *

root = Tk()
root.title("My app")
root.mainloop()`,
      explanation: "Add a title to the window with the title() method."
    },
    {
      title: "Window with a set size",
      code: `from tkinter import *

root = Tk()
root.title("Window 400x300")
root.geometry("400x300")
root.mainloop()`,
      explanation: "Set the window size to 400 pixels wide and 300 pixels tall."
    },
    {
      title: "Window with screen position",
      code: `from tkinter import *

root = Tk()
root.title("Window with position")
root.geometry("400x300+100+100")
root.mainloop()`,
      explanation: "Set size and position. +100+100 means 100 pixels from the left edge and 100 from the top."
    },
    {
      title: "Window with min and max size",
      code: `from tkinter import *

root = Tk()
root.title("Window with limits")
root.geometry("400x300")
root.minsize(200, 150)
root.maxsize(800, 600)
root.mainloop()`,
      explanation: "Set size limits. The user cannot make the window smaller or larger than the given sizes."
    },
    {
      title: "Window with a colored background",
      code: `from tkinter import *

root = Tk()
root.title("Colored window")
root.geometry("400x300")
root.configure(bg="lightblue")
root.mainloop()`,
      explanation: "Change the window background color with the configure() method."
    },
    {
      title: "Window with close handling",
      code: `from tkinter import *
from tkinter import messagebox

def on_closing():
    if messagebox.askokcancel("Exit", "Are you sure you want to exit?"):
        root.destroy()

root = Tk()
root.title("Window with confirmation")
root.geometry("400x300")
root.protocol("WM_DELETE_WINDOW", on_closing)
root.mainloop()`,
      explanation: "Add a close-event handler with user confirmation."
    },
    {
      title: "Full example with widgets",
      code: `from tkinter import *

root = Tk()
root.title("My first app")
root.geometry("400x300")
root.configure(bg="lightgray")

label = Label(root, text="Hello, Tkinter!", font=("Arial", 16), bg="lightgray")
label.pack(pady=50)

button = Button(root, text="Click me", command=lambda: print("Button clicked!"))
button.pack()

root.mainloop()`,
      explanation: "Full window example with a label and a button. Shows the basic structure of a GUI app."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call mainloop()",
      explanation: "Without mainloop() the window will not appear or will close immediately after creation.",
      correctApproach: "Always call root.mainloop() at the end of the program to display and keep the window alive."
    },
    {
      mistake: "Wrong geometry format",
      explanation: "The geometry format must be 'widthxheight' or 'widthxheight+x+y'.",
      correctApproach: "Use the correct format: root.geometry('400x300') or root.geometry('400x300+100+100')."
    },
    {
      mistake: "Code after mainloop() does not run",
      explanation: "mainloop() blocks execution, so code after it runs only after the window is closed.",
      correctApproach: "Place all code that should run before the window appears before mainloop()."
    },
    {
      mistake: "Creating multiple Tk() objects",
      explanation: "Usually you need only one main Tk() object. Multiple objects can cause problems.",
      correctApproach: "Create one main Tk() object, and use Toplevel() for additional windows."
    }
  ],
  
  summary: `In this lesson we learned how to create GUI windows:

1. Tk() - creates the application's main window
2. mainloop() - starts the main event loop for display and event handling
3. title() - sets the window title
4. geometry() - configures window size and position
5. minsize() / maxsize() - sets size limits
6. configure() - configures various window properties (background color, etc.)
7. destroy() - closes the window programmatically
8. protocol() - adds a handler for the window close event

Now you can create and configure GUI windows! In the next lesson we will add widgets to our windows.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method must you call to display the window?",
        options: [
          "mainloop()",
          "show()",
          "display()",
          "run()"
        ],
        correctAnswer: 0,
        explanation: "mainloop() starts the main event loop that displays the window and handles events."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the correct format for geometry()?",
        options: [
          "400x300",
          "400,300",
          "400*300",
          "400 300"
        ],
        correctAnswer: 0,
        explanation: "Correct format: 'widthxheight' (for example, '400x300')."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you set the window title?",
        options: [
          "root.title('Title')",
          "root.setTitle('Title')",
          "root.heading('Title')",
          "root.name('Title')"
        ],
        correctAnswer: 0,
        explanation: "The title() method sets the window title."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Code after mainloop() runs immediately after the window is created.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. mainloop() blocks execution, so code after it runs only after the window is closed."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you close a window programmatically?",
        options: [
          "root.destroy()",
          "root.close()",
          "root.exit()",
          "root.quit()"
        ],
        correctAnswer: 0,
        explanation: "The destroy() method closes the window and frees resources."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
