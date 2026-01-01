/**
 * 02 Widget Basics
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_19_3 = {
  lessonId: "lesson-19-3",
  moduleId: "module-19",
  order: 3,
  title: "02 Widget Basics",
  
  learningObjectives: [
    "Вивчити основні концепції",
    "Застосувати знання на практиці",
    "Розв'язати практичні задачі"
  ],
  
  estimatedTime: 90,
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Widget Basics",
        content: `In this lecture we will continue to build off our understanding of **interact** and **interactive** to begin using full widgets!`
      },
      {
        title: "What are widgets?",
        content: `Widgets are eventful python objects that have a representation in the browser, often as a control like a slider, textbox, etc.`
      },
      {
        title: "What can they be used for?",
        content: `You can use widgets to build **interactive GUIs** for your notebooks.  
You can also use widgets to **synchronize stateful and stateless information** between Python and JavaScript.`
      },
      {
        title: "Using widgets",
        content: `To use the widget framework, you need to import \`ipywidgets\`.`
      },
      {
        title: "repr",
        content: `Widgets have their own display \`repr\` which allows them to be displayed using IPython's display framework. Constructing and returning an \`IntSlider\` automatically displays the widget (as seen below). Widgets are displayed inside the output area below the code cell. Clearing cell output will also remove the widget.`
      },
      {
        title: "display()",
        content: `You can also explicitly display the widget using \`display(...)\`.`
      },
      {
        title: "Multiple display() calls",
        content: `If you display the same widget twice, the displayed instances in the front-end will remain in sync with each other. Try dragging the slider below and watch the slider above.`
      },
      {
        title: "Closing widgets",
        content: `You can close a widget by calling its \`close()\` method.`
      },
      {
        title: "Widget properties",
        content: `All of the IPython widgets share a similar naming scheme. To read the value of a widget, you can query its \`value\` property.

Similarly, to set a widget's value, you can set its \`value\` property.`
      },
      {
        title: "Keys",
        content: `In addition to \`value\`, most widgets share \`keys\`, \`description\`, and \`disabled\`. To see the entire list of synchronized, stateful properties of any specific widget, you can query the \`keys\` property.`
      },
      {
        title: "Shorthand for setting the initial values of widget properties",
        content: `While creating a widget, you can set some or all of the initial values of that widget by defining them as keyword arguments in the widget's constructor (as seen below).`
      },
      {
        title: "Linking two similar widgets",
        content: `If you need to display the same value two different ways, you'll have to use two different widgets. Instead of attempting to manually synchronize the values of the two widgets, you can use the \`link\` or \`jslink\` function to link two properties together (the difference between these is discussed in Widget Events).  Below, the values of two widgets are linked together.`
      },
      {
        title: "Unlinking widgets",
        content: `Unlinking the widgets is simple.  All you have to do is call \`.unlink\` on the link object. Try changing one of the widgets above after unlinking to see that they can be independently changed.`
      },
      {
        title: "Conclusion",
        content: `You should now be beginning to have an understanding of how Widgets can interact with each other and how you can begin to specify widget details.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `import ipywidgets as widgets`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `widgets.IntSlider()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `from IPython.display import display
w = widgets.IntSlider()
display(w)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `display(w)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `display(w)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `w.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `w = widgets.IntSlider()
display(w)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `w.value`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `w.value = 100`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `w.keys`,
      explanation: "Приклад коду з курсу"
    }
  ],
  
  commonMistakes: [],
  
  summary: "Підсумок уроку",
  
  practiceTask: {
    title: "Практична задача",
    description: "Опишіть задачу",
    problemStatement: "Умова задачі",
    inputFormat: "",
    outputFormat: "",
    examples: [],
    solution: {
      code: "",
      explanation: ""
    },
    hints: [],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [],
    timeLimit: 10,
    passingScore: 70
  }
}
