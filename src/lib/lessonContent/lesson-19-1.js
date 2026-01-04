/**
 * 01 Interact
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_19_1 = {
  lessonId: "lesson-19-1",
  moduleId: "module-16",
  order: 1,
  title: "01 Interact",
  
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
        title: "Using Interact",
        content: `In this lecture we will begin to learn about creating dashboard-type GUI with iPython widgets!

The \`interact\` function (\`ipywidgets.interact\`) automatically creates user interface (UI) controls for exploring code and data interactively. It is the easiest way to get started using IPython's widgets.

Please Note! The widgets in this notebook won't show up on NbViewer or GitHub renderings. To view the widgets and interact with them, you will need to download this notebook and run it with a Jupyter Notebook server.`
      },
      {
        title: "Basic `interact`",
        content: `At the most basic level, \`interact\` auto-generates UI controls for function arguments, and then calls the function with those arguments when you manipulate the controls interactively. To use \`interact\`, you need to define a function that you want to explore. Here is a function that prints its only argument \`x\`.

When you pass this function as the first argument to \`interact\` along with an integer keyword argument (\`x=10\`), a slider is generated and bound to the function parameter. Note that the semicolon here just prevents an **out** cell from showing up.

When you move the slider, the function is called, which prints the current value of \`x\`.

If you pass \`True\` or \`False\`, \`interact\` will generate a check-box:

If you pass a string, \`interact\` will generate a text area.

\`interact\` can also be used as a decorator. This allows you to define a function and interact with it in a single shot. As this example shows, \`interact\` also works with functions that have multiple arguments.`
      },
      {
        title: "Fixing arguments using `fixed`",
        content: `There are times when you may want to explore a function using \`interact\`, but fix one or more of its arguments to specific values. This can be accomplished by wrapping values with the \`fixed\` function.

When we call \`interact\`, we pass \`fixed(20)\` for q to hold it fixed at a value of \`20\`.

Notice that a slider is only produced for \`p\` as the value of \`q\` is fixed.`
      },
      {
        title: "Widget abbreviations",
        content: `When you pass an integer-valued keyword argument of \`10\` (\`x=10\`) to \`interact\`, it generates an integer-valued slider control with a range of \`[-10,+3\times10]\`. In this case, \`10\` is an *abbreviation* for an actual slider widget:

\`\`\`python
IntSlider(min=-10,max=30,step=1,value=10)
\`\`\`

In fact, we can get the same result if we pass this \`IntSlider\` as the keyword argument for \`x\`:

This examples clarifies how \`interact\` processes its keyword arguments:

1. If the keyword argument is a \`Widget\` instance with a \`value\` attribute, that widget is used. Any widget with a \`value\` attribute can be used, even custom ones.
2. Otherwise, the value is treated as a *widget abbreviation* that is converted to a widget before it is used.

The following table gives an overview of different widget abbreviations:

  Keyword argumentWidget  
  \`True\` or \`False\`Checkbox  
  \`'Hi there'\`Text
  \`value\` or \`(min,max)\` or \`(min,max,step)\` if integers are passedIntSlider
  \`value\` or \`(min,max)\` or \`(min,max,step)\` if floats are passedFloatSlider
  \`['orange','apple']\` or \`{'one':1,'two':2}\`Dropdown

Note that a dropdown is used if a list or a dict is given (signifying discrete choices), and a slider is used if a tuple is given (signifying a range).

You have seen how the checkbox and text area widgets work above. Here, more details about the different abbreviations for sliders and drop-downs are given.

If a 2-tuple of integers is passed \`(min,max)\`, an integer-valued slider is produced with those minimum and maximum values (inclusively). In this case, the default step size of \`1\` is used.

If a 3-tuple of integers is passed \`(min,max,step)\`, the step size can also be set.

A float-valued slider is produced if the elements of the tuples are floats. Here the minimum is \`0.0\`, the maximum is \`10.0\` and step size is \`0.1\` (the default).

The step size can be changed by passing a third element in the tuple.

For both integer and float-valued sliders, you can pick the initial value of the widget by passing a default keyword argument to the underlying Python function. Here we set the initial value of a float slider to \`5.5\`.

Dropdown menus are constructed by passing a list of strings. In this case, the strings are both used as the names in the drop-down menu UI and passed to the underlying Python function.

If you want a drop-down menu that passes non-string values to the Python function, you can pass a dictionary. The keys in the dictionary are used for the names in the drop-down menu UI and the values are the arguments that are passed to the underlying Python function.`
      },
      {
        title: "Using function annotations with `interact`",
        content: `You can also specify widget abbreviations using [function annotations](https://docs.python.org/3/tutorial/controlflow.html#function-annotations).

Define a function with a checkbox widget abbreviation for the argument \`x\`.

Then, because the widget abbreviation has already been defined, you can call \`interact\` with a single argument.`
      },
      {
        title: "interactive",
        content: `In addition to \`interact\`, IPython provides another function, \`interactive\`, that is useful when you want to reuse the widgets that are produced or access the data that is bound to the UI controls.

Note that unlike \`interact\`, the return value of the function will not be displayed automatically, but you can display a value inside the function with \`IPython.display.display\`.

Here is a function that returns the sum of its two arguments and displays them. The display line may be omitted if you don’t want to show the result of the function.

Unlike \`interact\`, \`interactive\` returns a \`Widget\` instance rather than immediately displaying the widget.

The widget is an \`interactive\`, a subclass of \`VBox\`, which is a container for other widgets.

The children of the \`interactive\` are two integer-valued sliders and an output widget, produced by the widget abbreviations above.

To actually display the widgets, you can use IPython's \`display\` function.

At this point, the UI controls work just like they would if \`interact\` had been used. You can manipulate them interactively and the function will be called. However, the widget instance returned by \`interactive\` also give you access to the current keyword arguments and return value of the underlying Python function.

Here are the current keyword arguments. If you rerun this cell after manipulating the sliders, the values will have changed.

Here is the current return value of the function.`
      },
      {
        title: "Conclusion",
        content: `You should now have a basic understanding of how to use Interact in Jupyter Notebooks!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Start with some imports!",
      code: `# Start with some imports!

from ipywidgets import interact, interactive, fixed
import ipywidgets as widgets`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Very basic function",
      code: `# Very basic function
def f(x):
    return x`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Generate a slider to interact with",
      code: `# Generate a slider to interact with
interact(f, x=10,);`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Booleans generate check-boxes",
      code: `# Booleans generate check-boxes
interact(f, x=True);`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Strings generate text areas",
      code: `# Strings generate text areas
interact(f, x='Hi there!');`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Using a decorator!",
      code: `# Using a decorator!
@interact(x=True, y=1.0)
def g(x, y):
    return (x, y)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Again, a simple function",
      code: `# Again, a simple function
def h(p, q):
    return (p, q)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `interact(h, p=5, q=fixed(20));`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Can call the IntSlider to get more specific",
      code: `# Can call the IntSlider to get more specific
interact(f, x=widgets.IntSlider(min=-10,max=30,step=1,value=10));`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Min,Max slider with Tuples",
      code: `# Min,Max slider with Tuples
interact(f, x=(0,4));`,
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
