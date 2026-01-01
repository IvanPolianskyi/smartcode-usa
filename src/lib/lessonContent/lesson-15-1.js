/**
 * 01 Working With Pdfs
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_15_1 = {
  lessonId: "lesson-15-1",
  moduleId: "module-15",
  order: 1,
  title: "01 Working With Pdfs",
  
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
        title: "Working with PDF Files",
        content: `Welcome back Agent. Often you will have to deal with PDF files. There are [many libraries in Python for working with PDFs](https://www.binpress.com/tutorial/manipulating-pdfs-with-python/167), each with their pros and cons, the most common one being **pypdf**. You can install it with:

    pip install pypdf
    
Keep in mind that not every PDF file can be read with this library. PDFs that are too blurry, have a special encoding, encrypted, or maybe just created with a particular program that doesn't work well with pypdf won't be able to be read. If you find yourself in this situation, try using the libraries linked above, but keep in mind, these may also not work. The reason for this is because of the many different parameters for a PDF and how non-standard the settings can be, text could be shown as an image instead of a utf-8 encoding. There are many parameters to consider in this aspect.

As far as pypdf is concerned, it can only read the text from a PDF document, it won't be able to grab images or other media files from a PDF.
___

## Working with pypdf

Let's being showing the basics of the pypdf library.`
      },
      {
        title: "Reading PDFs",
        content: `Similar to the csv library, we open a pdf, then create a reader object for it. Notice how we use the binary method of reading , 'rb', instead of just 'r'.

We can then extract the text:`
      },
      {
        title: "Adding to PDFs",
        content: `We can not write to PDFs using Python because of the differences between the single string type of Python, and the variety of fonts, placements, and other parameters that a PDF could have.

What we can do is copy pages and append pages to the end.

Now we have copied a page and added it to another new document!

___`
      },
      {
        title: "Simple Example",
        content: `Let's try to grab all the text from this PDF file:

Excellent work! That is all for pypdf for now, remember that this won't work with every PDF file and is limited in its scope to only text of PDFs.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `!pip install pypdf`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "note the capitalization",
      code: `# note the capitalization
import pypdf`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Notice we read it as a binary with 'rb'",
      code: `# Notice we read it as a binary with 'rb'
f = open('Working_Business_Proposal.pdf','rb')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `pdf_reader = pypdf.PdfReader(f)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `len(pdf_reader.pages)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `page_number = 0
page_one = pdf_reader.pages[0]`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `page_one_text = page_one.extract_text()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `page_one_text`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `f.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `f = open('Working_Business_Proposal.pdf','rb')
pdf_reader = pypdf.PdfReader(f)`,
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
