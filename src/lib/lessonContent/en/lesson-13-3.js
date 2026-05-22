/**
 * Lesson 13-3: Layout Management in Tkinter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_13_3 = {
  lessonId: "lesson-13-3",
  moduleId: "module-13",
  order: 3,
  title: "Widgets: Label, Button, Entry, Text",
  
  learningObjectives: [
    "Use Label for text",
    "Create buttons from Button",
    "Receive input via Entry and Text",
    "Customize widgets"
  ],
  
  prerequisites: ["lesson-13-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Widgets: Label, Button, Entry, Text",
        content: `In this tutorial, we'll learn the basic Tkinter widgets for creating a graphical user interface.

**Label** - a widget for displaying text or an image
**Button** - a button for performing actions
**Entry** - input field for one-line text
**Text** - multi-line text field

These widgets are the basis for creating interactive GUI applications.

**Label:**

Label is used to display text or image. It does not interact with the user, but can display information.

\`\`\`python
from tkinter import *

root = Tk()
label = Label(root, text="Hello world!")
label.pack()
root.mainloop()
\`\`\`

**Button:**

Button creates a clickable button. When pressed, the function is executed.

\`\`\`python
from tkinter import *

def button_clicked():
    print("Button pressed!")

root = Tk()
button = Button(root, text="Click me", command=button_clicked)
button.pack()
root.mainloop()
\`\`\`

**Entry (Input field):**

Entry creates a single-line text input field.

\`\`\`python
from tkinter import *

root = Tk()
entry = Entry(root, width=30)
entry.pack()

def get_text():
    text = entry.get()
    print(f"Entered text: {text}")

button = Button(root, text="Get text", command=get_text)
button.pack()
root.mainloop()
\`\`\`

**Text (Multi-line field):**

Text creates a multiline text field for entering or displaying text.

\`\`\`python
from tkinter import *

root = Tk()
text_widget = Text(root, width=40, height=10)
text_widget.pack()

def get_text():
    content = text_widget.get("1.0", END)
    print(f"Entered text:\\n{content}")

button = Button(root, text="Get text", command=get_text)
button.pack()
root.mainloop()
\`\`\`

**Widget settings:**

All widgets have parameters to configure:
- \`text\` - text to display
- \`width\`, \`height\` - dimensions
- \`bg\`, \`fg\` - background and text color
- \`font\` - font
- \`command\` - function to execute (for Button)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Label",
      code: `from tkinter import *

root = Tk()
root.title("Label example")

label = Label(root, text="Hello world!", font=("Arial", 16))
label.pack()

root.mainloop()`,
      explanation: "We create a simple Label with text and a customized font."
    },
    {
      title: "Example 2: Button",
      code: `from tkinter import *

def on_button_click():
    print("Button pressed!")

root = Tk()
root.title("Button example")

button = Button(root, text="Click me", command=on_button_click)
button.pack()

root.mainloop()`,
      explanation: "We create a button that performs a function when pressed."
    },
    {
      title: "Example 3: Entry",
      code: `from tkinter import *

def show_text():
    text = entry.get()
    label.config(text=f"You entered: {text}")

root = Tk()
root.title("Example Entry")

entry = Entry(root, width=30)
entry.pack()

button = Button(root, text="Show text", command=show_text)
button.pack()

label = Label(root, text="")
label.pack()

root.mainloop()`,
      explanation: "We create an input field and a button to receive the entered text."
    },
    {
      title: "Example 4: Text",
      code: `from tkinter import *

def show_text():
    content = text_widget.get("1.0", END)
    print(f"Entered text:\\n{content}")

root = Tk()
root.title("Example Text")

text_widget = Text(root, width=40, height=10)
text_widget.pack()

button = Button(root, text="Show text", command=show_text)
button.pack()

root.mainloop()`,
      explanation: "We create a multi-line text field for entering text."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call mainloop()",
      explanation: "Without mainloop(), the window will not be displayed or will be closed immediately.",
      correctApproach: "Always call root.mainloop() at the end of the program to display the window."
    },
    {
      mistake: "Incorrectly retrieving text from Text",
      explanation: "For Text you need to use get() with string indices, not just get().",
      correctApproach: "Use text_widget.get('1.0', END) to get all the text."
    },
    {
      mistake: "Do not specify command for Button",
      explanation: "Button without command will not perform any action when pressed.",
      correctApproach: "Always specify the command=function parameter for a Button if interaction is required."
    }
  ],
  
  summary: `In this lesson, we learned the main Tkinter widgets:

1. Label - to display text or image
2. Button - a button for performing actions when pressed
3. Entry - a one-line field for entering text
4. Text - multi-line text field

These widgets are the basis for creating interactive GUI applications. In the next lesson, we will learn how to place these widgets in a window.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
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
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which widget creates a single line input field?",
        options: [
          "Entry",
          "Text",
          "Label",
          "Button"
        ],
        correctAnswer: 0,
        explanation: "Entry creates a single-line text input field."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to get all text from Text widget?",
        options: [
          "text_widget.get('1.0', END)",
          "text_widget.get()",
          "text_widget.text",
          "text_widget.value"
        ],
        correctAnswer: 0,
        explanation: "For Text you need to use get() with indices '1.0' (start) and END (end)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Button can work without a command parameter.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Button can be created without command, but it will not perform any action when clicked."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
