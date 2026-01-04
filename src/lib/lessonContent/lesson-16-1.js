/**
 * 00 Overview Of Sending Emails
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_16_1 = {
  lessonId: "lesson-16-1",
  moduleId: "module-14",
  order: 1,
  title: "00 Overview Of Sending Emails",
  
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
        title: "Overview of Sending Emails",
        content: `The smtplib library allows you to manually go through the steps of creating and sending an email in Python:

Create an SMTP object for a server. Here are the main Server Domain Name for the top email services. If you don't see your email server here, you may need to do a quick Google Search to see if there SMTP server domain name is available:

    Provider
    SMTP server domain name     

    Gmail (will need App Password)
    smtp.gmail.com

    Yahoo Mail
    smtp.mail.yahoo.com

    Outlook.com/Hotmail.com
    smtp-mail.outlook.com
    

    AT&T
    smpt.mail.att.net (Use port 465)

    Verizon
    smtp.verizon.net (Use port 465) 

    Comcast
    smtp.comcast.net

Next is to create an STMP object that can make the method calls to log you in to your email in order to send messages. Notice how also specify a port number. If the number 587 does not work on your computer, try using 465 instead. Keep in mind, a firewall or antivirus may prevent Python from opening up this port, so you may need to disable it on your computer.

Next we run the ehlo() command which \"greets\" the server and establishes the connection. This method call should be done directly after creating the object. Calling it after other methods may result in errors in connecting later on. The first item in the tuple that is returned should be 250, indicating a successful connection.

When using the 587 port, this means you are using TLS encryption, which you need to initiate by running the starttls() command. If you are using port 465, this means you are using SSL and you can skip this step.

Now its time to set up the email and the passwords. You should never save the raw string of your password or email in a script, because anyone that sees this script will then be able to see you email and password! Instead you should use input() to get that information. If you also don't want your password to be visible when typing it in, you can use the built-in **getpass** library that will hide your password as you type it in, either with asterisks or by just keeping it invisible.

____
**Note for Gmail Users, you need to generate an app password instead of your normal email password. This also requires enabling 2-step authentication. Follow the instructions here to set-up 2-Step Factor Authentication as well as App Password Generation:https://support.google.com/accounts/answer/185833?hl=en/. Set-up 2 Factor Authentication, then create the App Password, choose Mail as the App and give it any name you want. This will output a 16 letter password for you. Pass in this password as your login password for the smtp.**
____

Now we can send an email using the .sendmail() method.

If you get back an empty dictionary, then the sending was successful.

You can then close your session with the .quit() method.

Now that we know how to send emails, its time to learn how to look through emails you've already recieved.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад коду",
      code: `import smtplib`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `smtp_object = smtplib.SMTP('smtp.gmail.com',587)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `smtp_object.ehlo()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `smtp_object.starttls()`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "For hidden passwords",
      code: `# For hidden passwords
import getpass`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `result = getpass.getpass(\"Type something here and it will be hidden: \")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Just keep in mind that its still visible as an object internally:",
      code: `# Just keep in mind that its still visible as an object internally:
result`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Or just use input()",
      code: `# Or just use input()
input(\"Enter your password\")`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `email = getpass.getpass(\"Enter your email: \")
password = getpass.getpass(\"Enter your password: \")
smtp_object.login(email,password)`,
      explanation: "Приклад коду з курсу"
    },
    {
      title: "Приклад коду",
      code: `from_address = getpass.getpass(\"Enter your email: \")
to_address = getpass.getpass(\"Enter the email of the recipient: \")
subject = input(\"Enter the subject line: \")
message = input(\"Type out the message you want to send: \")
msg = \"Subject: \" + subject + '\\n' + message
smtp_object.sendmail(from_address,to_address,msg)`,
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
