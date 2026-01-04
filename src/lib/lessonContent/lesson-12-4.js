/**
 * 01 Opening And Reading Files Folders
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_4 = {
  lessonId: "lesson-12-4",
  moduleId: "module-10",
  order: 4,
  title: "01 Opening And Reading Files Folders",
  
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
        title: "Opening and Reading Files",
        content: `So far we've discussed how to open files manually, one by one. Let's explore how we can open files programatically.

_____`
      },
      {
        title: "Create Practice File",
        content: `We will begin by creating a practice text file that we will be using for demonstration.`
      },
      {
        title: "Getting Directories",
        content: `Python has a built-in [os module](https://docs.python.org/3/library/os.html) that allows us to use operating system dependent functionality.

You can get the current directory:`
      },
      {
        title: "Listing Files in a Directory",
        content: `You can also use the os module to list directories.`
      },
      {
        title: "Moving Files",
        content: `You can use the built-in **shutil** module to to move files to different locations. Keep in mind, there are permission restrictions, for example if you are logged in a User A, you won't be able to make changes to the top level Users folder without the proper permissions, [more info](https://stackoverflow.com/questions/23253439/shutil-movescr-dst-gets-me-ioerror-errno-13-permission-denied-and-3-more-e)`
      },
      {
        title: "Deleting Files",
        content: `____
**NOTE: The os module provides 3 methods for deleting files:**
* os.unlink(path) which deletes a file at the path your provide
* os.rmdir(path) which deletes a folder (folder must be empty) at the path your provide
* shutil.rmtree(path) this is the most dangerous, as it will remove all files and folders contained in the path.
**All of these methods can not be reversed! Which means if you make a mistake you won't be able to recover the file. Instead we will use the send2trash module. A safer alternative that sends deleted files to the trash bin instead of permanent removal.**
___

Install the send2trash module with:

    pip install send2trash
    
at your command line.`
      },
      {
        title: "Walking through a directory",
        content: `Often you will just need to \"walk\" through a directory, that is visit every file or folder and check to see if a file is in the directory, and then perhaps do something with that file. Usually recursively walking through every file and folder in a directory would be quite tricky to program, but luckily the os module has a direct method call for this called os.walk(). Let's explore how it works.

___
Excellent, you should now be aware of how to work with a computer's files and folders in whichever directory they are in. Remember that the os module works for any oeprating system that supports Python, which means these commands will work across Linux,MacOs, or Windows without need for adjustment.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `pwd`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `f = open('practice.txt','w+')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `f.write('test')
f.close()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `import os`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `os.getcwd()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "In your current directory",
      code: `# In your current directory
os.listdir()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "In any directory you pass",
      code: `# In any directory you pass
os.listdir(\"C:\\\\Users\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `import shutil`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `shutil.move('practice.txt','C:\\\\Users\\\\Marcial')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `os.listdir()`,
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
