/**
 * Lesson 13-3: Widgets: Label, Button, Entry, Text
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_13_3 = {
  lessonId: "lesson-13-3",
  moduleId: "module-13",
  order: 3,
  title: "Widgets: Label, Button, Entry, Text",
  
  learningObjectives: [
    "Use Label for text",
    "Create buttons with Button",
    "Get input through Entry and Text",
    "Configure widgets"
  ],
  
  prerequisites: ["lesson-13-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Overview of the four widgets",
        content: `**Label** - shows text or an image (not edited by the user).

**Button** - a button; when pressed, \`command\` is called.

**Entry** - a single-line input field.

**Text** - a multi-line field (notes, log).

Together they cover 90% of simple forms before moving to \`ttk\` or a web interface.`
      },
      {
        title: "Label",
        content: `**Label:**

Label is used to display text or an image. It does not interact with the user, but can show information.

\`\`\`python
from tkinter import *

root = Tk()
label = Label(root, text="Hello, world!")
label.pack()
root.mainloop()
\`\`\`

**Useful options:** \`font=("Arial", 14)\`, \`fg\` (text color), \`bg\` (background), \`padx\` / \`pady\` with \`pack()\`.`
      },
      {
        title: "Button",
        content: `**Button:**

Button creates a clickable button. When clicked, a function runs.

\`\`\`python
from tkinter import *

def button_clicked():
    print("Button clicked!")

root = Tk()
button = Button(root, text="Click me", command=button_clicked)
button.pack()
root.mainloop()
\`\`\`

**Button state:** \`state=DISABLED\` - gray inactive button; \`state=NORMAL\` - active again.`
      },
      {
        title: "Entry and StringVar",
        content: `**Entry (input field):**

Entry creates a single-line field for text input.

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

**StringVar** - bind Entry to a variable for automatic Label updates:

\`\`\`python
from tkinter import *

root = Tk()
name = StringVar()
Entry(root, textvariable=name, width=30).pack()
Label(root, textvariable=name).pack()
root.mainloop()
\`\`\`

**Entry methods:** \`get()\`, \`insert(0, text)\`, \`delete(0, END)\`.`
      },
      {
        title: "Text (multi-line field)",
        content: `**Text (multi-line field):**

Text creates a multi-line text field for entering or displaying text.

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

Line indexes: \`"1.0"\` - line 1, character 0; \`END\` - the end. A **Scrollbar** is often added to Text for long logs.

**Configuration (all widgets):** \`text\`, \`width\`, \`height\`, \`bg\`, \`fg\`, \`font\`, for Button - \`command\`.`
      },
      {
        title: "Summary",
        content: `Label - display, Entry/Text - input, Button - action. \`StringVar\` is handy for "field + caption" forms. Next - pack/grid layout (lesson 13-4).`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Label",
      code: `from tkinter import *

root = Tk()
root.title("Label example")

label = Label(root, text="Hello, world!", font=("Arial", 16))
label.pack()

root.mainloop()`,
      explanation: "Create a simple Label with text and a custom font."
    },
    {
      title: "Example 2: Button",
      code: `from tkinter import *

def on_button_click():
    print("Button clicked!")

root = Tk()
root.title("Button example")

button = Button(root, text="Click me", command=on_button_click)
button.pack()

root.mainloop()`,
      explanation: "Create a button that runs a function when clicked."
    },
    {
      title: "Example 3: Entry",
      code: `from tkinter import *

def show_text():
    text = entry.get()
    label.config(text=f"You entered: {text}")

root = Tk()
root.title("Entry example")

entry = Entry(root, width=30)
entry.pack()

button = Button(root, text="Show text", command=show_text)
button.pack()

label = Label(root, text="")
label.pack()

root.mainloop()`,
      explanation: "Create an input field and a button to get the entered text."
    },
    {
      title: "Example 4: Text",
      code: `from tkinter import *

def show_text():
    content = text_widget.get("1.0", END)
    print(f"Entered text:\\n{content}")

root = Tk()
root.title("Text example")

text_widget = Text(root, width=40, height=10)
text_widget.pack()

button = Button(root, text="Show text", command=show_text)
button.pack()

root.mainloop()`,
      explanation: "Create a multi-line text field for entering text."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Forgetting to call mainloop()",
      explanation: "Without mainloop() the window will not appear or will close immediately.",
      correctApproach: "Always call root.mainloop() at the end of the program to display the window."
    },
    {
      mistake: "Getting text from Text incorrectly",
      explanation: "For Text you need get() with line indexes, not just get().",
      correctApproach: "Use text_widget.get('1.0', END) to get all text."
    },
    {
      mistake: "Not setting command for Button",
      explanation: "A Button without command will not perform any action when clicked.",
      correctApproach: "Always set command=function for Button when interaction is needed."
    }
  ],
  
  summary: `In this lesson we studied the main Tkinter widgets:

1. Label - for displaying text or an image
2. Button - a button for performing actions when clicked
3. Entry - a single-line field for text input
4. Text - a multi-line text field

These widgets are the foundation for building interactive GUI apps. In the next lesson we will learn how to place these widgets in a window.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
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
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which widget creates a single-line input field?",
        options: [
          "Entry",
          "Text",
          "Label",
          "Button"
        ],
        correctAnswer: 0,
        explanation: "Entry creates a single-line field for text input."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you get all text from a Text widget?",
        options: [
          "text_widget.get('1.0', END)",
          "text_widget.get()",
          "text_widget.text",
          "text_widget.value"
        ],
        correctAnswer: 0,
        explanation: "For Text you need get() with indexes '1.0' (start) and END (end)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Button can work without the command parameter.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. A Button can be created without command, but it will not perform any action when clicked."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why use StringVar with Entry?",
        options: [
          "To automatically update other widgets when the text changes",
          "To speed up mainloop",
          "To replace pack()",
          "To send email"
        ],
        correctAnswer: 0,
        explanation: "textvariable binds Entry to a Label or other widgets through one variable."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
