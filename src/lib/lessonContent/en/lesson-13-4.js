/**
 * Lesson 13-4: Menus and Dialogs in Tkinter
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_13_4 = {
  lessonId: "lesson-13-4",
  moduleId: "module-13",
  order: 4,
  title: "Placement of elements: pack, grid, place",
  
  learningObjectives: [
    "Use pack for placement",
    "Apply grid for tables",
    "Use place for point placement",
    "Choose the right method"
  ],
  
  prerequisites: ["lesson-13-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Placement of elements: pack, grid, place",
        content: `Tkinter has three methods for placing widgets in a window: **pack**, **grid**, and **place**. Each has its advantages and is used in different situations.

**1. pack() - automatic placement**

\`pack()\` places the widgets automatically, one by one. This is the simplest method.

\`\`\`python
from tkinter import *

root = Tk()
label1 = Label(root, text="First")
label1.pack()

label2 = Label(root, text="Second")
label2.pack()

label3 = Label(root, text="Third")
label3.pack()

root.mainloop()
\`\`\`

**pack() parameters:**
- \`side\` - TOP (default), BOTTOM, LEFT, RIGHT
- \`fill\` - X, Y, BOTH - space filling
- \`padx\`, \`pady\` - indents

**2. grid() - tabular arrangement**

\`grid()\` places widgets as a table with rows and columns. Ideal for forms.

\`\`\`python
from tkinter import *

root = Tk()

Label(root, text="Name:").grid(row=0, column=0)
Entry(root).grid(row=0, column=1)

Label(root, text="Email:").grid(row=1, column=0)
Entry(root).grid(row=1, column=1)

Button(root, text="Submit").grid(row=2, column=0, columnspan=2)

root.mainloop()
\`\`\`

**grid() parameters:**
- \`row\`, \`column\` - position in the table
- \`rowspan\`, \`columnspan\` - combining cells
- \`sticky\` - alignment (N, S, E, W)
- \`padx\`, \`pady\` - indents

**3. place() - point placement**

\`place()\` places widgets by absolute coordinates. It is rarely used.

\`\`\`python
from tkinter import *

root = Tk()
root.geometry("300x200")

label = Label(root, text="Point Placement")
label.place(x=50, y=50)

button = Button(root, text="Button")
button.place(x=100, y=100)

root.mainloop()
\`\`\`

**place() parameters:**
- \`x\`, \`y\` - coordinates
- \`relx\`, \`rely\` - relative coordinates (0.0 to 1.0)
- \`anchor\` - anchor point

**Important:**

Don't mix \`pack()\` and \`grid()\` in the same container! Use one method for all widgets in a container.

**When to use:**

- **pack()** - for simple vertical or horizontal placement
- **grid()** - for forms, tables, complex layouts
- **place()** - for point positioning (rare)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: pack()",
      code: `from tkinter import *

root = Tk()
root.title("Example pack()")

label1 = Label(root, text="First", bg="lightblue")
label1.pack(fill=X, padx=10, pady=5)

label2 = Label(root, text="Second", bg="lightgreen")
label2.pack(fill=X, padx=10, pady=5)

label3 = Label(root, text="Third", bg="lightyellow")
label3.pack(fill=X, padx=10, pady=5)

root.mainloop()`,
      explanation: "pack() automatically places widgets one after the other with width padding."
    },
    {
      title: "Example 2: grid()",
      code: `from tkinter import *

root = Tk()
root.title("Example grid()")

Label(root, text="Name:").grid(row=0, column=0, padx=5, pady=5)
Entry(root, width=30).grid(row=0, column=1, padx=5, pady=5)

Label(root, text="Email:").grid(row=1, column=0, padx=5, pady=5)
Entry(root, width=30).grid(row=1, column=1, padx=5, pady=5)

Button(root, text="Submit").grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()`,
      explanation: "grid() creates a tabular layout, perfect for forms."
    },
    {
      title: "Example 3: place()",
      code: `from tkinter import *

root = Tk()
root.title("Example place()")
root.geometry("300x200")

label = Label(root, text="Point placement", bg="lightblue")
label.place(x=50, y=50)

button = Button(root, text="Button")
button.place(x=100, y=100)

root.mainloop()`,
      explanation: "place() places widgets by absolute coordinates."
    },
    {
      title: "Example 4: Combination of grid() with sticky",
      code: `from tkinter import *

root = Tk()
root.title("Grid with sticky")

Label(root, text="Left aligned").grid(row=0, column=0, sticky=W, padx=5, pady=5)
Label(root, text="Right aligned").grid(row=0, column=1, sticky=E, padx=5, pady=5)
Label(root, text="Fills all space").grid(row=1, column=0, columnspan=2, sticky=EW, padx=5, pady=5)

root.mainloop()`,
      explanation: "sticky is used to align and fill space in grid()."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Mixing pack() and grid()",
      explanation: "You cannot use pack() and grid() for widgets in the same container.",
      correctApproach: "Use one method (pack, grid, or place) for all widgets in a container."
    },
    {
      mistake: "Do not specify row and column for grid()",
      explanation: "Without specifying row and column widgets may be placed incorrectly.",
      correctApproach: "Always specify row and column for widgets in grid()."
    },
    {
      mistake: "Using place() for complex layouts",
      explanation: "place() is difficult to maintain and adapt to different window sizes.",
      correctApproach: "Use grid() for complex layouts, place() only for point positioning."
    }
  ],
  
  summary: `In this lesson, we learned three methods of placing widgets:

1. pack() - automatic placement, the simplest method
2. grid() - tabular arrangement, ideal for forms
3. place() - point placement by coordinates

It is important to remember:
- Don't mix pack() and grid() in the same container
- grid() is best for complex layouts
- pack() is the easiest for basic placement

In the next lesson, we'll learn how to handle events and create full-fledged GUI applications!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which placement method is best for forms?",
        options: [
          "grid()",
          "pack()",
          "place()",
          "layout()"
        ],
        correctAnswer: 0,
        explanation: "grid() is ideal for forms because it creates a tabular layout with rows and columns."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Is it possible to mix pack() and grid() in the same container?",
        options: [
          "No, you can't",
          "Yes, you can",
          "Only for different types of widgets",
          "Only if you use place()"
        ],
        correctAnswer: 0,
        explanation: "You cannot mix pack() and grid() in the same container. Use one method for all widgets."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What parameter of grid() is used to merge cells?",
        options: [
          "columnspan or rowspan",
          "merge",
          "combine",
          "join"
        ],
        correctAnswer: 0,
        explanation: "columnspan and rowspan are used to merge cells in grid()."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "place() is best for complex layouts with many widgets.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. place() is difficult to maintain for complex layouts. Use grid() for complex layouts."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
