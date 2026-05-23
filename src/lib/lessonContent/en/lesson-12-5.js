/**
 * Lesson 12-5: Email Automation and Best Practices
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_5 = {
  lessonId: "lesson-12-5",
  moduleId: "module-12",
  order: 3,
  title: "00 Working With Csv Files",
  
  learningObjectives: [
    "Learn basic concepts",
    "Apply knowledge in practice",
    "Solve practical problems"
  ],
  
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Working with CSV Files",
        content: `Welcome back! Let's discuss how to work with CSV files in Python. A file with the CSV file extension is a Comma Separated Values file. All CSV files are plain text, contain alphanumeric characters, and structure the data contained within them in a tabular form. Don't confuse Excel Files with csv files, while csv files are formatted very similarly to excel files, they don't have data types for their values, they are all strings with no font or color. They also don't have worksheets the way an excel file does. Python does have several libraries for working with Excel files, you can check them out [here](http://www.python-excel.org/) and [here](https://www.xlwings.org/).

Files in the CSV format are generally used to exchange data, usually when there's a large amount, between different applications. Database programs, analytical software, and other applications that store massive amounts of information (like contacts and customer data), will usually support the CSV format.

Let's explore how we can open a csv file with Python's built-in csv library.

____
## Notebook Location. 

Run **pwd** inside a notebook cell to find out where your notebook is located

____
## Reading CSV Files

When passing in the file path, make sure to include the extension if it has one, you should be able to Tab Autocomplete the file name. If you can't Tab autocomplete, that is a good indicator your file is not in the same location as your notebook. You can always type in the entire file path (it will look similar in formatting to the output of **pwd**.`
      },
      {
        title: "Encoding",
        content: `Often csv files may contain characters that you can't interpret with standard python, this could be something like an **@** symbol, or even foreign characters. Let's view an example of this sort of error ([its pretty common, so its important to go over](https://stackoverflow.com/questions/9233027/unicodedecodeerror-charmap-codec-cant-decode-byte-x-in-position-y-character)).

Cast to a list may give an error, note the **can't decode** line in the error, this is a giveaway that we have an encoding problem!

Let's not try reading it with a \"utf-8\" encoding.

Note the first item in the list is the header line, this contains the information about what each column represents. Let's format our printing just a bit:

Let's imagine we wanted a list of  all the emails. For demonstration, since there are 1000 items plus the header, we will only do a few rows.

What if we wanted a list of full names?`
      },
      {
        title: "Writing to CSV Files",
        content: `We can also write csv files, either new ones or add on to existing ones.`
      },
      {
        title: "New File",
        content: `**This will also overwrite any exisiting file with the same name, so be careful with this!**

____
### Existing File

That is all for the basics! If you believe you will be working with CSV files often, you may want to check out the powerful [pandas library](https://pandas.pydata.org/).`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Code example",
      code: `pwd`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `import csv`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `data = open('example.csv')`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `data`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `csv_data = csv.reader(data)`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `data_lines = list(csv_data)`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `data = open('example.csv',encoding=\"utf-8\")
csv_data = csv.reader(data)
data_lines = list(csv_data)`,
      explanation: "Code example from the course"
    },
    {
      title: "Looks like it worked!",
      code: `# Looks like it worked!
data_lines[:3]`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `for line in data_lines[:5]:
    print(line)`,
      explanation: "Code example from the course"
    },
    {
      title: "Code example",
      code: `len(data_lines)`,
      explanation: "Code example from the course"
    }
  ],
  
  commonMistakes: [],
  
  summary: "Summary of the lesson",
  
  practiceTask: null,
  
  quiz: {
    questions: [],
    timeLimit: 10,
    passingScore: 70
  }
}
