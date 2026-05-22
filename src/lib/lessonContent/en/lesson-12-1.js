/**
 * Lesson 12-1: Introduction to Email: smtplib
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_1 = {
  lessonId: "lesson-12-1",
  moduleId: "module-12",
  order: 1,
  title: "Introduction to email: smtplib",
  
  learningObjectives: [
    "Understand the SMTP protocol",
    "Use smtplib",
    "Send simple emails",
    "Configure SMTP server"
  ],
  
  prerequisites: ["lesson-11-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to sending email",
        content: `Email is one of the most common methods of communication on the Internet.

**What is SMTP?**

SMTP (Simple Mail Transfer Protocol) is a protocol for sending e-mails.

**smtplib library:**

- Built-in Python library
- No installation required
- Supports SMTP protocol
- Works with different mail servers

**Main tasks:**

- Sending simple text messages
- Sending HTML messages
- Adding attachments
- Mass mailings
- Automation of notifications

**Import:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
\`\`\``
      },
      {
        title: "SMTP server settings",
        content: `**Popular SMTP servers:**

- **Gmail:** smtp.gmail.com (port 587 or 465)
- **Outlook:** smtp-mail.outlook.com (port 587)
- **Yahoo:** smtp.mail.yahoo.com (port 587)
- **Local server:** localhost (port 25)

**Settings for Gmail:**

\`\`\`python
import smtplib

# Gmail settings
smtp_server = "smtp.gmail.com"
smtp_port = 587
email_address = "your_email@gmail.com"
email_password = "your_app_password" # App Password, not a normal password
\`\`\`

**Important for Gmail:**

1. Enable two-factor authentication
2. Create an App Password (not a normal password)
3. Use App Password to connect

**Settings for other services:**

\`\`\`python
# Outlook
smtp_server = "smtp-mail.outlook.com"
smtp_port = 587

# yahoo
smtp_server = "smtp.mail.yahoo.com"
smtp_port = 587

# Local server (for testing)
smtp_server = "localhost"
smtp_port = 25
\`\`\``
      },
      {
        title: "Sending a simple text email",
        content: `**Base example:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_simple_email(sender, password, recipient, subject, body):
    # We create a message
    msg = MIMEText(body)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # Connect to the SMTP server
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls() # Encrypt the connection
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Email sent successfully!')
    except Exception as e:
        print(f'Error sending: {e}')

# Usage
send_simple_email(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Test Sheet',
    body='This is a test email with Python!'
)
\`\`\`

**Step-by-step explanation:**

1. **MIMEText** - creates a text message
2. **msg['From']** - the address of the sender
3. **msg['To']** - address of the recipient
4. **msg['Subject']** - subject of the letter
5. **server.starttls()** - enables encryption
6. **server.login()** - authorization
7. **server.send_message()** - sending
8. **server.quit()** - closing the connection`
      },
      {
        title: "Safe storage of passwords",
        content: `**DO NOT store passwords in code!**

**Option 1: Variable Environments**

\`\`\`python
import os
import smtplib
from email.mime.text import MIMEText

# We get variables from the environment
email_address = os.getenv('EMAIL_ADDRESS')
email_password = os.getenv('EMAIL_PASSWORD')

def send_email(recipient, subject, body):
    msg = MIMEText(body)
    msg['From'] = email_address
    msg['To'] = recipient
    msg['Subject'] = subject
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_address, email_password)
    server.send_message(msg)
    server.quit()

# Set the variables before running:
# export EMAIL_ADDRESS="your_email@gmail.com"
# export EMAIL_PASSWORD="your_app_password"
\`\`\`

**Option 2: Configuration file (.env)**

\`\`\`python
# Install python-dotenv: pip install python-dotenv
from dotenv import load_dotenv
import os

load_dotenv() # Loads variables from an .env file

email_address = os.getenv('EMAIL_ADDRESS')
email_password = os.getenv('EMAIL_PASSWORD')
\`\`\`

**.env file (don't add to git!):**

\`\`\`
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
\`\`\`

**Option 3: Configuration file (secure)**

\`\`\`python
import json

def load_config():
    with open('config.json', 'r') as f:
        return json.load(f)

config = load_config()
email_address = config['email_address']
email_password = config['email_password']
\`\`\``
      },
      {
        title: "Error handling",
        content: `**Full Error Handling:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from smtplib import SMTPException, SMTPAuthenticationError, SMTPRecipientsRefused

def send_email_safe(sender, password, recipient, subject, body):
    try:
        msg = MIMEText(body)
        msg['From'] = sender
        msg['To'] = recipient
        msg['Subject'] = subject
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        
        return True, "Email sent successfully"
        
    except SMTPAuthenticationError:
        return False, "Authentication error. Check email and password"
    except SMTPRecipientsRefused:
        return False, "Invalid recipient address"
    except SMTPException as e:
        return False, f"SMTP Error: {e}"
    except Exception as e:
        return False, f"Unknown error: {e}"

# Usage
success, message = send_email_safe(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Test',
    body='Body of the message'
)

if successful:
    print(f" {message}")
otherwise:
    print(f" {message}")
\`\`\`

**Types of errors:**

- **SMTPAuthenticationError** - invalid email/password
- **SMTPRecipientsRefused** - Invalid recipient address
- **SMTPException** - general SMTP error
- **ConnectionError** - network problems`
      },
      {
        title: "Sending to multiple recipients",
        content: `**Sending to one or more recipients:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_to_multiple(sender, password, recipients, subject, body):
    msg = MIMEText(body)
    msg['From'] = sender
    msg['Subject'] = subject
    
    # recipients can be a string or a list
    if isinstance(recipients, str):
        recipients = [recipients]
    
    msg['To'] = ', '.join(recipients)
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg, to_addrs=recipients)
        server.quit()
        print(f'Email sent to {len(recipients)} recipients')
    except Exception as e:
        print(f'Error: {e}')

# Usage
recipients = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
]

send_to_multiple(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipients=recipients,
    subject='Mass letter',
    body='This is an email for multiple recipients'
)
\`\`\`

**Note:**

- All recipients see the addresses of other recipients
- For a hidden copy, use BCC (will be in the next lesson)`
      },
      {
        title: "Practical examples",
        content: `**Example 1: Error Notification**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_error_notification(error_message):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    recipient = 'admin@example.com'
    
    msg = MIMEText(f'System error:\\n\\n{error_message}')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = 'Error Notification'
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Notification sent')
    except Exception as e:
        print(f'Failed to send notification: {e}')

# Usage
try:
    # Your code that might cause the error
    result = 1 / 0
except Exception as e:
    send_error_notification(str(e))
\`\`\`

**Example 2: Daily report**

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

def send_daily_report(report_data):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    recipient = 'manager@example.com'
    
    report_text = f'''
Daily report for {datetime.now().strftime("%Y-%m-%d")}

Data:
{report_data}
''''
    
    msg = MIMEText(report_text)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = f'Daily report - {datetime.now().strftime("%Y-%m-%d")}'
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Report sent')
    except Exception as e:
        print(f'Error: {e}')

# Usage
report_data = "Products sold: 150\\nOrders received: 45"
send_daily_report(report_data)
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we learned the basics of sending an email:

**Key Concepts:**

1. **SMTP** - protocol for sending email
2. **smtplib** - built-in Python library
3. **MIMEText** - creating a text message
4. **starttls()** - connection encryption
5. **Security** - storing passwords in environment variables

**Basic steps:**

1. Create a MIMEText object
2. Set From, To, Subject
3. Connect to the SMTP server
4. Enable encryption (starttls)
5. Log in
6. Send a message (send_message)
7. Close the connection (quit)

**Important:**

- Use App Password for Gmail
- Do not store passwords in code
- Handle errors
- Use environment variables or .env files

**Next step:**

In the next lesson, we will learn how to create an HTML email and add attachments.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Simple email",
      code: `import smtplib
from email.mime.text import MIMEText

msg = MIMEText('Hello! This is a test email.')
msg['From'] = 'your_email@gmail.com'
msg['To'] = 'recipient@example.com'
msg['Subject'] = 'Test'

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('your_email@gmail.com', 'your_app_password')
server.send_message(msg)
server.quit()`,
      explanation: "We send a simple text email via Gmail SMTP."
    },
    {
      title: "Example 2: With error handling",
      code: `import smtplib
from email.mime.text import MIMEText

try:
    msg = MIMEText('Mail body')
    msg['From'] = 'sender@gmail.com'
    msg['To'] = 'recipient@example.com'
    msg['Subject'] = 'Subject'
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('sender@gmail.com', 'password')
    server.send_message(msg)
    server.quit()
    print('Sent!')
except Exception as e:
    print(f'Error: {e}')`,
      explanation: "Sending email with error handling."
    },
    {
      title: "Example 3: To multiple recipients",
      code: `import smtplib
from email.mime.text import MIMEText

recipients = ['user1@example.com', 'user2@example.com']
msg = MIMEText('Bulk Mail')
msg['From'] = 'sender@gmail.com'
msg['To'] = ', '.join(recipients)
msg['Subject'] = 'Mass email'

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('sender@gmail.com', 'password')
server.send_message(msg, to_addrs=recipients)
server.quit()`,
      explanation: "Sending email to several recipients at the same time."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using a regular Gmail password",
      explanation: "Gmail requires an App Password for programmatic access.",
      correctApproach: "Create an App Password in Google Account settings and use it."
    },
    {
      mistake: "Saving passwords in code",
      explanation: "Passwords in the code can be compromised.",
      correctApproach: "Use environment variables or .env files to store passwords."
    },
    {
      mistake: "Do not use starttls()",
      explanation: "Without encryption, data is transmitted in clear text.",
      correctApproach: "Always use server.starttls() before login()."
    },
    {
      mistake: "Do not handle errors",
      explanation: "SMTP errors can cause the application to crash.",
      correctApproach: "Use try/except to handle SMTPException and other errors."
    }
  ],
  
  summary: `In this lesson, we learned the basics of sending an email:

1. SMTP protocol - a protocol for sending email
2. smtplib - built-in Python library
3. MIMEText - creation of a text message
4. Security - storing passwords in environment variables
5. Error handling - correct handling of exceptions

Email is a powerful tool for automating notifications!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is SMTP?",
        options: [
          "Protocol for sending e-mails",
          "Protocol for receiving email",
          "Email message format",
          "Python library"
        ],
        correctAnswer: 0,
        explanation: "SMTP (Simple Mail Transfer Protocol) is a protocol for sending emails."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What port is used for Gmail SMTP with starttls?",
        options: [
          "587",
          "25",
          "465",
          "80"
        ],
        correctAnswer: 0,
        explanation: "Gmail uses port 587 for SMTP with starttls (TLS encryption)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the starttls() method do?",
        options: [
          "Enables connection encryption",
          "Sends a message",
          "Authorizes the user",
          "Closes the connection"
        ],
        correctAnswer: 0,
        explanation: "starttls() enables TLS encryption for a secure connection to the SMTP server."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to safely store passwords for email?",
        options: [
          "In environment variables or .env files",
          "Right in the code",
          "In the comments",
          "In variable names"
        ],
        correctAnswer: 0,
        explanation: "Passwords should be stored in environment variables or .env files that do not fall into version control."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can use your regular account password for Gmail.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Gmail requires an App Password for programmatic access, not a regular account password."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
