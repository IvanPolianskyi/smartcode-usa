/**
 * Lesson 13-4: Layout: pack, grid, place
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_13_4 = {
  lessonId: "lesson-13-4",
  moduleId: "module-13",
  order: 4,
  title: "Layout: pack, grid, place",
  
  learningObjectives: [
    "Use pack for layout",
    "Apply grid for tables",
    "Use place for absolute positioning",
    "Choose the right method"
  ],
  
  prerequisites: ["lesson-13-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Three geometry managers",
        content: `In Tkinter widgets do not sit on their own - a **geometry manager** places them:

| Method | Idea |
|-------|------|
| \`pack()\` | Stack top/bottom/side |
| \`grid()\` | Table row × column |
| \`place()\` | Coordinates x, y |

**Rule:** in **one parent** widget (Frame or root) use only **one** manager type.`
      },
      {
        title: "pack() - widget stack",
        content: `**1. pack() - automatic layout**

\`pack()\` places widgets automatically, one after another. This is the simplest method.

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
- \`fill\` - X, Y, BOTH - fill available space
- \`padx\`, \`pady\` - padding

**Frame + pack:** nested Frames let you build a panel on the left (LEFT) and right (RIGHT).`
      },
      {
        title: "grid() - forms and tables",
        content: `**2. grid() - table layout**

\`grid()\` places widgets in a table with rows and columns. Ideal for forms.

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
- \`rowspan\`, \`columnspan\` - merge cells
- \`sticky\` - alignment (N, S, E, W)
- \`padx\`, \`pady\` - padding

**Column weight:** \`columnconfigure(0, weight=1)\` - stretch when the window is resized.`
      },
      {
        title: "place() - absolute coordinates",
        content: `**3. place() - absolute positioning**

\`place()\` places widgets at absolute coordinates. Used rarely.

\`\`\`python
from tkinter import *

root = Tk()
root.geometry("300x200")

label = Label(root, text="Absolute placement")
label.place(x=50, y=50)

button = Button(root, text="Button")
button.place(x=100, y=100)

root.mainloop()
\`\`\`

**place() parameters:**
- \`x\`, \`y\` - coordinates
- \`relx\`, \`rely\` - relative coordinates (0.0 to 1.0)
- \`anchor\` - anchor point

\`relx=0.5, rely=0.5, anchor=CENTER\` - center when the window is resized (rare in practice).`
      },
      {
        title: "What to choose",
        content: `**Do not mix** pack and grid in one container - Tkinter may error or break the layout.

- **pack** - toolbars, simple button lists
- **grid** - login forms, calculators, tables
- **place** - animations, overlapping elements

**Tip:** start with grid for forms; pack for quick prototypes.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: pack()",
      code: `from tkinter import *

root = Tk()
root.title("pack() example")

label1 = Label(root, text="First", bg="lightblue")
label1.pack(fill=X, padx=10, pady=5)

label2 = Label(root, text="Second", bg="lightgreen")
label2.pack(fill=X, padx=10, pady=5)

label3 = Label(root, text="Third", bg="lightyellow")
label3.pack(fill=X, padx=10, pady=5)

root.mainloop()`,
      explanation: "pack() automatically stacks widgets with horizontal fill."
    },
    {
      title: "Example 2: grid()",
      code: `from tkinter import *

root = Tk()
root.title("grid() example")

Label(root, text="Name:").grid(row=0, column=0, padx=5, pady=5)
Entry(root, width=30).grid(row=0, column=1, padx=5, pady=5)

Label(root, text="Email:").grid(row=1, column=0, padx=5, pady=5)
Entry(root, width=30).grid(row=1, column=1, padx=5, pady=5)

Button(root, text="Submit").grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()`,
      explanation: "grid() creates a table layout, ideal for forms."
    },
    {
      title: "Example 3: place()",
      code: `from tkinter import *

root = Tk()
root.title("place() example")
root.geometry("300x200")

label = Label(root, text="Absolute placement", bg="lightblue")
label.place(x=50, y=50)

button = Button(root, text="Button")
button.place(x=100, y=100)

root.mainloop()`,
      explanation: "place() positions widgets at absolute coordinates."
    },
    {
      title: "Example 4: grid() with sticky",
      code: `from tkinter import *

root = Tk()
root.title("Grid with sticky")

Label(root, text="Aligned left").grid(row=0, column=0, sticky=W, padx=5, pady=5)
Label(root, text="Aligned right").grid(row=0, column=1, sticky=E, padx=5, pady=5)
Label(root, text="Fills entire cell").grid(row=1, column=0, columnspan=2, sticky=EW, padx=5, pady=5)

root.mainloop()`,
      explanation: "sticky is used for alignment and filling space in grid()."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Mixing pack() and grid()",
      explanation: "You cannot use pack() and grid() for widgets in the same container.",
      correctApproach: "Use one method (pack, grid, or place) for all widgets in a container."
    },
    {
      mistake: "Not specifying row and column for grid()",
      explanation: "Without row and column widgets may be placed incorrectly.",
      correctApproach: "Always specify row and column for widgets in grid()."
    },
    {
      mistake: "Using place() for complex layouts",
      explanation: "place() is hard to maintain and adapt for different window sizes.",
      correctApproach: "Use grid() for complex layouts; place() only for precise positioning."
    }
  ],
  
  summary: `In this lesson we learned three layout methods:

1. pack() - automatic layout, the simplest method
2. grid() - table layout, ideal for forms
3. place() - absolute positioning by coordinates

Remember:
- Do not mix pack() and grid() in one container
- grid() works best for complex layouts
- pack() is simplest for basic layout

In the next lesson we will learn event handling and build full GUI applications!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which layout method works best for forms?",
        options: [
          "grid()",
          "pack()",
          "place()",
          "layout()"
        ],
        correctAnswer: 0,
        explanation: "grid() is ideal for forms because it creates a table with rows and columns."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Can you mix pack() and grid() in one container?",
        options: [
          "No, you cannot",
          "Yes, you can",
          "Only for different widget types",
          "Only if you also use place()"
        ],
        correctAnswer: 0,
        explanation: "You cannot mix pack() and grid() in one container. Use one method for all widgets."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which grid() parameter merges cells?",
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
        explanation: "False. place() is hard to maintain for complex layouts. Use grid() instead."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does grid(sticky='ew') do?",
        options: [
          "Stretches the widget horizontally in the cell",
          "Removes the widget",
          "Changes the font",
          "Calls mainloop"
        ],
        correctAnswer: 0,
        explanation: "sticky=E+W (or 'ew') anchors the widget to the east and west sides of the cell."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
