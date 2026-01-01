/**
 * 01 Overview Of Received Emails
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_16_2 = {
  lessonId: "lesson-16-2",
  moduleId: "module-16",
  order: 2,
  title: "01 Overview Of Received Emails",
  
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
        title: "Overview of Received Emails",
        content: `Now that we understand how to send emails progammatically with Python, let's explore how we can read and search recieved emails. To do we will use the built-in [imaplib library](https://docs.python.org/3/library/imaplib.html#imap4-example). We will also use the built in [email](https://docs.python.org/3/library/email.examples.html) library for parsing through the recieved emails.`
      },
      {
        title: "Searching Mail",
        content: `Now that we have connected to our mail, we should be able to search for it using the specialized syntax of IMAP. Here are the different search keys you can use:

Keyword 
        Definition
    
    
        'ALL'
        
        Returns all messages in your email folder. Often there are size limits from imaplib.
        To change these use imaplib._MAXLINE = 100 , where 100 is whatever you want the limit to be.
        
    
    
        'BEFORE date'
        
        Returns all messages before the date. Date must be formatted as 01-Nov-2000.
        
    
     
        'ON date'
        
        Returns all messages on the date. Date must be formatted as 01-Nov-2000.
        
    
     
        'SINCE date'
        
        Returns all messages after the date. Date must be formatted as 01-Nov-2000.
        
    
    
        'FROM some_string '
        
        Returns all from the sender in the string. String can be an email, for example 'FROM               user@example.com' or just a string that may appear in the email, \"FROM example\"
        
    
    
        'TO some_string'
        
        Returns all outgoing email to the email in the string. String can be an email, for example 'FROM user@example.com' or just a string that may appear in the email, \"FROM example\"
        
    
    
        'CC some_string' and/or 'BCC some_string'
        
        Returns all messages in your email folder. Often there are size limits from imaplib.
        To change these use imaplib._MAXLINE = 100 , where 100 is whatever you want the limit to be.
        
    
    
        'SUBJECT string','BODY string','TEXT \"string with spaces\"'
        
        Returns all messages with the subject string or the string in the body of the email. If the string you are searching for has spaces in it, wrap it in double quotes.
        
    
    
        'SEEN', 'UNSEEN'
        
        Returns all messages that have been seen or unseen. (Also known as read or unread)
        
    
        
        'ANSWERED', 'UNANSWERED'
        
        Returns all messages that have been replied to or unreplied to. 
        
    
        
        'DELETED', 'UNDELETED'
        
        Returns all messages that have been deleted or that have not been deleted.

You can also use the logical operators AND and OR to combine the above statements. Check out the full list of search keys here: https://developer.4d.com/docs/API/IMAPTransporterClass#authorized-search-keys.

Please note that some IMAP server providers for different email services will have slightly different syntax. You may need to experiment to get the results you want.

___________
___________

Now we can search our mail for any term we want.

Send yourself a test email with the subject line:

    this is a test email for python

Or some other uniquely identifying string.    

We will now need to reconnect to our imap server. You will probably need to restart your kernel for this step if you are using jupyter notebook.

Let's now search and confirm if it is there:

We can now save what it has returned:

The data will be a list of unique ids.

We can use the built in email library to help parse this raw string.

Excellent! We've successfully have been able to check our email's inbox , filter by some condition, and read the body of the text that was there. This will come in handy in the near future!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `import imaplib`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `M = imaplib.IMAP4_SSL('imap.gmail.com')`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `import getpass`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `user = input(\"Enter your email: \")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Remember , you may need an app password if you are a gmail user",
      code: `# Remember , you may need an app password if you are a gmail user
# 
password = getpass.getpass(\"Enter your password: \")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `M.login(user,password)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `M.list()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Connect to your inbox",
      code: `# Connect to your inbox
M.select(\"inbox\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Use if you get an error saying limit was reached",
      code: `# Use if you get an error saying limit was reached
imaplib._MAXLINE = 10000000`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Restart your kernel and run the following:",
      code: `# Restart your kernel and run the following:
import imaplib
import getpass
M = imaplib.IMAP4_SSL('imap.gmail.com')
user = input(\"Enter your email: \")
password = getpass.getpass(\"Enter your password: \")
M.login(user,password)`,
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
