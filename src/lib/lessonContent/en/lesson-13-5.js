/**
 * Lesson 13-5: Event handling and practice: GUI application
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
    "Build a full GUI application",
    "Apply everything you have learned"
  ],
  
  prerequisites: ["lesson-13-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Event model in Tkinter",
        content: `A GUI is an **event loop**: the user clicks → Tkinter calls your function.

| Mechanism | When |
|----------|------|
| \`command=\` | Button, Checkbutton |
| \`bind('<Event>', fn)\` | Keyboard, mouse, focus |

The \`event\` object has \`keysym\`, coordinates, \`widget\`, etc.`
      },
      {
        title: "command and bind",
        content: `**Event handling example:**

\`\`\`python
from tkinter import *

def on_button_click():
    label.config(text="Button clicked!")

def on_key_press(event):
    print(f"Key pressed: {event.keysym}")

root = Tk()
root.title("Event handling")

button = Button(root, text="Click me", command=on_button_click)
button.pack()

label = Label(root, text="Waiting for click...")
label.pack()

# Handle key presses
root.bind('<Key>', on_key_press)
root.focus_set()  # Focus so the window receives keyboard events

root.mainloop()
\`\`\`

**Common bind targets:** \`'<Return>'\`, \`'<Button-1>'\`, \`'<FocusIn>'\`.`
      },
      {
        title: "Classes and StringVar in a project",
        content: `For forms it helps to group widgets in a **class**:

\`\`\`python
class App:
    def __init__(self, root):
        self.root = root
        self.result = StringVar(value="0")
        Entry(root, textvariable=self.result).grid(row=0, column=0)
\`\`\`

This makes it easier to test logic separately from \`mainloop()\`.`
      },
      {
        title: "Example: calculator with grid",
        content: `**Building a full application** - a simple calculator:

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
        # Result field
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
                else:
                    btn = Button(self.root, text=text, 
                               command=lambda t=text: self.button_click(t),
                               font=("Arial", 16), width=5, height=2)
                    btn.grid(row=i+1, column=j, padx=2, pady=2, sticky=EW)
    
    def button_click(self, char):
        current = self.result_var.get()
        if current == "0":
            self.result_var.set(char)
        else:
            self.result_var.set(current + char)
    
    def clear(self):
        self.result_var.set("0")
    
    def calculate(self):
        try:
            result = eval(self.result_var.get())
            self.result_var.set(str(result))
        except:
            self.result_var.set("Error")

root = Tk()
calc = Calculator(root)
root.mainloop()
\`\`\`

**Warning:** \`eval()\` in this teaching example is **unsafe** in real programs (it can run arbitrary code). For production, parse the expression manually or use a safe parser.`
      },
      {
        title: "Module 13 summary",
        content: `You covered: Tk() / mainloop → widgets → pack/grid/place → events.

Next **module 14** - Telegram bots; a GUI can be combined with a bot as a local admin panel.

**GUI project checklist:** one geometry manager per container, \`mainloop()\` at the end, try/except in calculate, clear button labels.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Button event handling",
      code: `from tkinter import *

def on_click():
    label.config(text="Button clicked!", fg="green")

root = Tk()
root.title("Event handling")

button = Button(root, text="Click me", command=on_click)
button.pack(pady=10)

label = Label(root, text="Waiting for click...")
label.pack()

root.mainloop()`,
      explanation: "A simple example of handling a button click via a callback."
    },
    {
      title: "Example 2: Keyboard events",
      code: `from tkinter import *

def on_key(event):
    label.config(text=f"Pressed: {event.keysym}")

root = Tk()
root.title("Keyboard handling")
root.geometry("300x200")

label = Label(root, text="Press any key")
label.pack(pady=50)

root.bind('<Key>', on_key)
root.focus_set()

root.mainloop()`,
      explanation: "Example of handling keyboard events with bind()."
    },
    {
      title: "Example 3: Simple calculator",
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
            else:
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
        else:
            self.result.set(self.result.get() + char)
    
    def calculate(self):
        try:
            self.result.set(str(eval(self.result.get())))
        except:
            self.result.set("Error")

root = Tk()
calc = SimpleCalculator(root)
root.mainloop()`,
      explanation: "A full GUI application - a simple calculator with event handling."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using lambda without correct parameter capture",
      explanation: "When creating buttons in a loop, lambda may capture the wrong value.",
      correctApproach: "Use lambda t=text: function(t) to capture the value correctly."
    },
    {
      mistake: "Forgetting focus for keyboard handling",
      explanation: "Without focus_set() the window will not receive keyboard events.",
      correctApproach: "Call root.focus_set() after bind() to receive keyboard events."
    },
    {
      mistake: "Not handling errors in calculate()",
      explanation: "eval() can raise errors on invalid input.",
      correctApproach: "Use try/except in calculate()."
    }
  ],
  
  summary: `In this lesson we learned event handling and built a full GUI application:

1. Event handling - via callbacks and bind()
2. command - for button clicks
3. bind() - for other events (keyboard, mouse)
4. Building apps - combining all Tkinter knowledge

Module 13 summary:

We learned:
- Tkinter basics and creating windows
- Widgets: Label, Button, Entry, Text
- Layout: pack, grid, place
- Events and full applications

You can now create graphical user interfaces in Python!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you handle a button click event?",
        options: [
          "Use the command parameter",
          "Use bind()",
          "Use event()",
          "Use click()"
        ],
        correctAnswer: 0,
        explanation: "For button clicks use command=function."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method handles keyboard events?",
        options: [
          "bind()",
          "command",
          "key()",
          "keyboard()"
        ],
        correctAnswer: 0,
        explanation: "bind() is used for keyboard, mouse, and other events."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "After bind() for the keyboard you need to call focus_set().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. focus_set() gives the window focus so it can receive keyboard events."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should you do when using eval() in a calculator?",
        options: [
          "Handle errors with try/except",
          "Nothing, eval() is safe",
          "Use exec() instead of eval()",
          "Use compile()"
        ],
        correctAnswer: 0,
        explanation: "eval() can raise errors, so handle them with try/except."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is eval() unsafe in a calculator for real users?",
        options: [
          "It can execute arbitrary Python code from the input field",
          "It is slower than print",
          "It does not work with grid",
          "It requires pip install"
        ],
        correctAnswer: 0,
        explanation: "eval runs a string as code - never use it on untrusted input."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
