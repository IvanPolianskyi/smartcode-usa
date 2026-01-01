/**
 * 01 Web Scraping Exercises
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_13_2 = {
  lessonId: "lesson-13-2",
  moduleId: "module-13",
  order: 2,
  title: "01 Web Scraping Exercises",
  
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
        title: "Web Scraping Exercises",
        content: `## Complete the Tasks Below

**TASK: Import any libraries you think you'll need to scrape a website.**

**TASK: Use requests library and BeautifulSoup to connect to http://quotes.toscrape.com/ and get the HMTL text from the homepage.**

**TASK: Get the names of all the authors on the first page.**

**TASK: Create a list of all the quotes on the first page.**

**TASK: Inspect the site and use Beautiful Soup to extract the top ten tags from the requests text shown on the top right from the home page (e.g Love,Inspirational,Life, etc...). HINT: Keep in mind there are also tags underneath each quote, try to find a class only present in the top right tags, perhaps check the span.**

**TASK: Notice how there is more than one page, and subsequent pages look like this http://quotes.toscrape.com/page/2/. Use what you know about for loops and string concatenation to loop through all the pages and get all the unique authors on the website. Keep in mind there are many ways to achieve this, also note that you will need to somehow figure out how to check that your loop is on the last page with quotes. For debugging purposes, I will let you know that there are only 10 pages, so the last page is http://quotes.toscrape.com/page/10/, but try to create a loop that is robust enough that it wouldn't matter to know the amount of pages beforehand, perhaps use try/except for this, its up to you!**

There are lots of other potential solutions that are even more robust and flexible, the main idea is the same though, use a while loop to cycle through potential pages and have a break condition based on the invalid page.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "CODE HERE",
      code: `# CODE HERE`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "CODE HERE",
      code: `# CODE HERE`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "CODE HERE",
      code: `# CODE HERE`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `authors`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "CODE HERE",
      code: `#CODE HERE`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `quotes`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "CODE HERE",
      code: `# CODE HERE`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "CODE HERE",
      code: `# CODE HERE`,
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
