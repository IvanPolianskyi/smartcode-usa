/**
 * Lesson 13-5: Advanced Tkinter Widgets
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_13_5 = {
  lessonId: "lesson-13-5",
  moduleId: "module-13",
  order: 5,
  title: "Event handling and practice: GUI application",
  
  learningObjectives: [
    "Handle click events",
    "Create callback functions",
    "Create a full-fledged GUI application",
    "Apply all acquired knowledge"
  ],
  
  prerequisites: ["lesson-13-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Event handling and practice: GUI application",
        content: `In this lesson, we will create a full-fledged GUI application using all the acquired knowledge about Tkinter.

**What you will learn:**
- Handle click events and other events
- Create callback functions for event processing
- Create a full-fledged GUI application
- Apply all acquired knowledge about widgets and placement

**Event handling:**

In Tkinter, events are handled through callback functions. The most common events:
- \`command\` - for Button (pressing the button)
- \`bind()\` - for other events (mouse click, key press, etc.)

**Example of event processing:**

\`\`\`python
from tkinter import *

def on_button_click():
    label.config(text="The button was pressed!")

def on_key_press(event):
    print(f"Key pressed: {event.keysym}")

root = Tk()
root.title("Event Handling")

button = Button(root, text="Click me", command=on_button_click)
button.pack()

label = Label(root, text="Waiting to click...")
label.pack()

# Handle keystrokes
root.bind('<Key>', on_key_press)
root.focus_set() # Set focus to receive keyboard events

root.mainloop()
\`\`\`

**Creating a full-fledged application:**

Let's create a simple calculator as an example of a full GUI application:

\`\`\`python
from tkinter import *

class Calculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculator")
        
        self.result_var = StringVar()
        self.result_var.set("0")
        
        self.create_widgets()
    
    def create_widgets(self):
        # The result field
        result_entry = Entry(self.root, textvariable=self.result_var, 
                           font=("Arial", 20), justify=RIGHT)
        result_entry.grid(row=0, column=0, columnspan=4, padx=5, pady=5, sticky=EW)
        
        # Buttons
        buttons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+'],
            ['C']
        ]
        
        for i, row in enumerate(buttons):
            for j, text in enumerate(row):
                if text == 'C':
                    btn = Button(self.root, text=text, command=self.clear,
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=0, columnspan=4, padx=2, pady=2, sticky=EW)
                elif text == '=':
                    btn = Button(self.root, text=text, command=self.calculate,
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=j, padx=2, pady=2, sticky=EW)
                otherwise:
                    btn = Button(self.root, text=text, 
                               command=lambda t=text: self.button_click(t),
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=j, padx=2, pady=2, sticky=EW)
    
    def button_click(self, char):
        current = self.result_var.get()
        if current == "0":
            self.result_var.set(char)
        otherwise:
            self.result_var.set(current + char)
    
    def clear(self):
        self.result_var.set("0")
    
    def calculate(self):
        try:
            result = eval(self.result_var.get())
            self.result_var.set(str(result))
        unless:
            self.result_var.set("Error")

root = Tk()
calc = Calculator(root)
root.mainloop()
\`\`\`

This is a hands-on project lesson where we will create a real GUI application using all the knowledge we have learned.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Handling button events",
      code: `from tkinter import *

def on_click():
    label.config(text="Button pressed!", fg="green")

root = Tk()
root.title("Event Handling")

button = Button(root, text="Click me", command=on_click)
button.pack(paddy=10)

label = Label(root, text="Waiting to click...")
label.pack()

root.mainloop()`,
      explanation: "A simple example of handling a button click event through a callback function."
    },
    {
      title: "Example 2: Handle keyboard events",
      code: `from tkinter import *

def on_key(event):
    label.config(text=f"Clicked: {event.keysym}")

root = Tk()
root.title("Keyboard Handling")
root.geometry("300x200")

label = Label(root, text="Press any key")
label.pack(pady=50)

root.bind('<Key>', on_key)
root.focus_set()

root.mainloop()`,
      explanation: "An example of handling keyboard events using bind()."
    },
    {
      title: "Example 3: A simple calculator",
      code: `from tkinter import *

class SimpleCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculator")
        
        self.result = StringVar()
        self.result.set("0")
        
        Entry(root, textvariable=self.result, font=("Arial", 16), 
              justify=RIGHT).grid(row=0, column=0, columnspan=4, padx=5, pady=5)
        
        buttons = ['7', '8', '9', '/', '4', '5', '6', '*',
                  '1', '2', '3', '-', '0', '.', '=', '+']
        
        row = 1
        col = 0
        for btn_text in buttons:
            if btn_text == '=':
                Button(root, text=btn_text, command=self.calculate,
                      width=5).grid(row=row, column=col, padx=2, pady=2)
            otherwise:
                Button(root, text=btn_text, 
                      command=lambda t=btn_text: self.button_click(t),
                      width=5).grid(row=row, column=col, padx=2, pady=2)
            col += 1
            if col > 3:
                col = 0
                row += 1
    
    def button_click(self, char):
        if self.result.get() == "0":
            self.result.set(char)
        otherwise:
            self.result.set(self.result.get() + char)
    
    def calculate(self):
        try:
            self.result.set(str(eval(self.result.get())))
        unless:
            self.result.set("Error")

root = Tk()
calc = SimpleCalculator(root)
root.mainloop()`,
      explanation: "A full-fledged GUI application - a simple calculator with event processing."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using lambda without correct parameters",
      explanation: "In the button creation loop, the lambda may grab the wrong value.",
      correctApproach: "Use lambda t=text: function(t) to capture the value correctly."
    },
    {
      mistake: "Forget to set focus for keyboard processing",
      explanation: "Without focus_set(), the window will not receive keyboard events.",
      correctApproach: "Call root.focus_set() after bind() to receive keyboard events."
    },
    {
      mistake: "Do not handle errors in calculate()",
      explanation: "eval() can cause errors when entered incorrectly.",
      correctApproach: "Use try/except to handle errors in the calculate() function."
    }
  ],
  
  summary: `In this lesson, we learned about event handling and created a full-fledged GUI application:

1. Event processing - through callback functions and bind()
2. command - for processing button presses
3. bind() - for processing other events (keyboard, mouse)
4. Creating applications - combining all knowledge about Tkinter

Summary of module 13:

We learned:
- Basics of Tkinter and creating windows
- Widgets: Label, Button, Entry, Text
- Placement methods: pack, grid, place
- Event processing and creation of full-fledged applications

Now you can create GUIs in Python!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to handle button click event?",
        options: [
          "Use the command parameter",
          "Use bind()",
          "Use event()",
          "Use click()"
        ],
        correctAnswer: 0,
        explanation: "The command=function parameter is used to process the button click."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What method is used to handle keyboard events?",
        options: [
          "bind()",
          "command",
          "key()",
          "keyboard()"
        ],
        correctAnswer: 0,
        explanation: "bind() is used to handle keyboard, mouse, and other events."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "After bind(), focus_set() must be called for the keyboard.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. focus_set() sets focus on the window so it can receive keyboard events."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should I do when using eval() in a calculator?",
        options: [
          "Handle errors via try/except",
          "No problem, eval() is safe",
          "Use exec() instead of eval()",
          "Use compile()"
        ],
        correctAnswer: 0,
        explanation: "eval() can throw errors, so you need to handle them via try/except."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
