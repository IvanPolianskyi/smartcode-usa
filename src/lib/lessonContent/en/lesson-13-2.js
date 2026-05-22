/**
 * Lesson 13-2: Basic Tkinter Widgets
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_13_2 = {
  lessonId: "lesson-13-2",
  moduleId: "module-13",
  order: 2,
  title: "Creating the first window. Tk(), mainloop()",
  
  learningObjectives: [
    "Create the first window",
    "Use Tk() and mainloop()",
    "Adjust dimensions and title",
    "Close the window"
  ],
  
  prerequisites: ["lesson-13-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Creating the first window",
        content: `In this tutorial, we'll learn how to create our first GUI window using Tkinter.

**Creating the main window:**

The \`Tk()\` class is used to create the main window:

\`\`\`python
from tkinter import *

root = Tk()
root.mainloop()
\`\`\`

**What's happening:**
1. \`Tk()\` - creates the main program window
2. \`mainloop()\` - starts the main event loop that displays the window and processes events

**Window Settings:**

**Window title:**
\`\`\`python
root.title("My App")
\`\`\`

**Window dimensions:**
\`\`\`python
root.geometry("400x300") # width x height
\`\`\`

**Minimum/maximum dimensions:**
\`\`\`python
root.minsize(200, 150) # minimum sizes
root.maxsize(800, 600) # maximum sizes
\`\`\`

**Position of the window on the screen:**
\`\`\`python
root.geometry("400x300+100+100") # dimensions + position x + position y
\`\`\`

**Other useful settings:**

**Icon change:**
\`\`\`python
root.iconbitmap("icon.ico") # Windows
# or for cross-platform compatibility:
root.iconphoto(False, PhotoImage(file="icon.png"))
\`\`\`

**Window background:**
\`\`\`python
root.configure(bg="lightblue")
\`\`\`

**Close window:**

The window can be closed:
- By pressing the X button in the upper corner
- By calling the \`destroy()\` method:
\`\`\`python
root.destroy()
\`\`\`

**Closing Processing:**

You can add a window close event handler:
\`\`\`python
def on_closing():
    if messagebox.askokcancel("Logout", "Are you sure you want to log out?"):
        root.destroy()

root.protocol("WM_DELETE_WINDOW", on_closing)
\`\`\`

**Important about mainloop():**

\`mainloop()\` is an infinite loop that:
- Displays a window on the screen
- Handles events (clicks, key presses, etc.)
- Updates the interface
- Blocks code execution after itself

**Note:** The code after \`mainloop()\` will be executed only after closing the window.

**Full example:**

\`\`\`python
from tkinter import *

root = Tk()
root.title("My First App")
root.geometry("400x300")
root.configure(bg="lightgray")

label = Label(root, text="Hello, Tkinter!", font=("Arial", 16))
label.pack(pady=50)

root.mainloop()
\`\`\`

Now you know how to create and customize GUI windows!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Minimal window",
      code: `from tkinter import *

root = Tk()
root.mainloop()`,
      explanation: "The simplest example of creating a window. Creates an empty window with default dimensions."
    },
    {
      title: "Title window",
      code: `from tkinter import *

root = Tk()
root.title("My App")
root.mainloop()`,
      explanation: "Add a title to the window using the title() method."
    },
    {
      title: "A window with specified dimensions",
      code: `from tkinter import *

root = Tk()
root.title("Window 400x300")
root.geometry("400x300")
root.mainloop()`,
      explanation: "Set the size of the window to 400 pixels wide and 300 pixels high."
    },
    {
      title: "A window with a position on the screen",
      code: `from tkinter import *

root = Tk()
root.title("Position Window")
root.geometry("400x300+100+100")
root.mainloop()`,
      explanation: "We set the size and position of the window. +100+100 means 100 pixels from the left edge and 100 from the top."
    },
    {
      title: "Window with minimum and maximum dimensions",
      code: `from tkinter import *

root = Tk()
root.title("Window with limits")
root.geometry("400x300")
root.minsize(200, 150)
root.maxsize(800, 600)
root.mainloop()`,
      explanation: "We set limits on the size of the window. The user will not be able to make the window smaller or larger than the specified dimensions."
    },
    {
      title: "Window with colored background",
      code: `from tkinter import *

root = Tk()
root.title("Color Window")
root.geometry("400x300")
root.configure(bg="lightblue")
root.mainloop()`,
      explanation: "Change the background color of the window using the configure() method."
    },
    {
      title: "Window with closing trim",
      code: `from tkinter import *
from tkinter import messagebox

def on_closing():
    if messagebox.askokcancel("Logout", "Are you sure you want to log out?"):
        root.destroy()

root = Tk()
root.title("Confirmation Window")
root.geometry("400x300")
root.protocol("WM_DELETE_WINDOW", on_closing)
root.mainloop()`,
      explanation: "We add a window closing event handler with confirmation from the user."
    },
    {
      title: "Complete example with widgets",
      code: `from tkinter import *

root = Tk()
root.title("My First App")
root.geometry("400x300")
root.configure(bg="lightgray")

label = Label(root, text="Hello, Tkinter!", font=("Arial", 16), bg="lightgray")
label.pack(pady=50)

button = Button(root, text="Press me", command=lambda: print("The button is pressed!"))
button.pack()

root.mainloop()`,
      explanation: "A complete example of a window with a label and a button. Demonstrates the basic structure of a GUI application."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call mainloop()",
      explanation: "Without mainloop(), the window will not be displayed or will be closed immediately after creation.",
      correctApproach: "Always call root.mainloop() at the end of the program to display and maintain the window."
    },
    {
      mistake: "Incorrect geometry format",
      explanation: "The geometry format should be 'widthxheight' or 'widthxheight+x+y'.",
      correctApproach: "Use the correct format: root.geometry('400x300') or root.geometry('400x300+100+100')."
    },
    {
      mistake: "The code after mainloop() is not executed",
      explanation: "mainloop() blocks execution, so the code after it will be executed only after the window is closed.",
      correctApproach: "Place all the code that must be executed before the window is displayed before mainloop()."
    },
    {
      mistake: "Creating multiple Tk() objects",
      explanation: "Usually only one main Tk() object is needed. Multiple objects can cause problems.",
      correctApproach: "Create one main Tk() object, and use Toplevel() for additional windows."
    }
  ],
  
  summary: `In this lesson, we learned how to create GUI windows:

1. Tk() - creates the main program window
2. mainloop() - starts the main event loop to display and process events
3. title() - sets the title of the window
4. geometry() - adjusts the size and position of the window
5. minsize() / maxsize() - sets size limits
6. configure() - configures various properties of the window (background color, etc.)
7. destroy() - closes the window programmatically
8. protocol() - adds a window closing event handler

Now you can create and customize GUI windows! In the next lesson, we will add widgets to our windows.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method should be called to display the window?",
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
        explanation: "The correct format is 'widthxheight' (eg '400x300')."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to set window title?",
        options: [
          "root.title('Title')",
          "root.setTitle('Title')",
          "root.heading('Heading')",
          "root.name('Title')"
        ],
        correctAnswer: 0,
        explanation: "The title() method sets the title of the window."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "The code after mainloop() will be executed immediately after the window is created.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. mainloop() blocks execution, so the code after it will be executed only after the window is closed."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to programmatically close a window?",
        options: [
          "root.destroy()",
          "root.close()",
          "root.exit()",
          "root.quit()"
        ],
        correctAnswer: 0,
        explanation: "The destroy() method closes the window and releases resources."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
