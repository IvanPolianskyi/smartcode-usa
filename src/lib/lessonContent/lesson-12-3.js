/**
 * 03 Math And Random Module
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_3 = {
  lessonId: "lesson-12-3",
  moduleId: "module-10",
  order: 3,
  title: "03 Math And Random Module",
  
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
        title: "Math and Random Modules",
        content: `Python comes with a built in math module and random module. In this lecture we will give a brief tour of their capabilities. Usually you can simply look up the function call you are looking for in the online documentation.

* [Math Module](https://docs.python.org/3/library/math.html)

* [Random Module](https://docs.python.org/3/library/random.html)

We won't go through every function available in these modules since there are so many, but we will show some useful ones.`
      },
      {
        title: "Random Module",
        content: `Random Module allows us to create random numbers. We can even set a seed to produce the same random set every time.

The explanation of how a computer attempts to generate random numbers is beyond the scope of this course since it involves higher level mathmatics. But if you are interested in this topic check out:
* https://en.wikipedia.org/wiki/Pseudorandom_number_generator
* https://en.wikipedia.org/wiki/Random_seed`
      },
      {
        title: "Understanding a seed",
        content: `Setting a seed allows us to start from a seeded psuedorandom number generator, which means the same random numbers will show up in a series. Note, you need the seed to be in the same cell if your using jupyter to guarantee the same results each time. Getting a same set of random numbers can be important in situations where you will be trying different variations of functions and want to compare their performance on random values, but want to do it fairly (so you need the same set of random numbers each time).`
      },
      {
        title: "Random with Sequences",
        content: `#### Grab a random item from a list`
      },
      {
        title: "Sample with Replacement",
        content: `Take a sample size, allowing picking elements more than once. Imagine a bag of numbered lottery balls, you reach in to grab a random lotto ball, then after marking down the number, **you place it back in the bag**, then continue picking another one.`
      },
      {
        title: "Sample without Replacement",
        content: `Once an item has been randomly picked, it can't be picked again. Imagine a bag of numbered lottery balls, you reach in to grab a random lotto ball, then after marking down the number, you **leave it out of the bag**, then continue picking another one.`
      },
      {
        title: "Shuffle a list",
        content: `**Note: This effects the object in place!**`
      },
      {
        title: "Random Distributions",
        content: `#### [Uniform Distribution](https://en.wikipedia.org/wiki/Uniform_distribution)`
      },
      {
        title: "[Normal/Gaussian Distribution](https://en.wikipedia.org/wiki/Normal_distribution)",
        content: `Final Note: If you find yourself using these libraries a lot, take a look at the NumPy library for Python, covers all these capabilities with extreme efficiency. We cover this library and a lot more in our data science and machine learning courses.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `import math`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `help(math)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `value = 4.35`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `math.floor(value)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `math.ceil(value)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `round(value)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `math.pi`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `from math import pi`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `pi`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `math.e`,
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
