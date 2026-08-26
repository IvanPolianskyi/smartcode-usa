/**
 * Lesson 12-3: Practice: email automation
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_3 = {
  lessonId: "lesson-12-3",
  moduleId: "module-12",
  order: 3,
  title: "Practice: email automation",

  learningObjectives: [
    "Build a script for sending email",
    "Automate report delivery",
    "Create a notification system",
    "Practice working with email"
  ],

  prerequisites: ["lesson-12-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Introduction to email automation",
        content: `Email automation lets you:
- Send reports automatically
- Build notification systems
- Run bulk mailings
- Integrate email into applications

**Typical scenarios:**

- Daily / weekly reports
- Error alerts
- Welcome emails for new users
- Event reminders
- Auto-replies

**Tools:**

- smtplib — sending email
- schedule — task scheduling
- threading — asynchronous sending
- logging — event logging`
      },
      {
        title: "Creating a class for sending email",
        content: `**Basic EmailSender class:**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

class EmailSender:
    def __init__(self, smtp_server, smtp_port, email_address, password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.email_address = email_address
        self.password = password

    def send_text_email(self, recipient, subject, body):
        """Send a simple plain-text email"""
        try:
            msg = MIMEText(body)
            msg['From'] = self.email_address
            msg['To'] = recipient
            msg['Subject'] = subject

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_address, self.password)
            server.send_message(msg)
            server.quit()
            return True, "Email sent"
        except Exception as e:
            return False, str(e)

    def send_html_email(self, recipient, subject, html_body, text_body=None):
        """Send an HTML email"""
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = self.email_address
            msg['To'] = recipient
            msg['Subject'] = subject

            if text_body:
                msg.attach(MIMEText(text_body, 'plain'))
            msg.attach(MIMEText(html_body, 'html'))

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_address, self.password)
            server.send_message(msg)
            server.quit()
            return True, "Email sent"
        except Exception as e:
            return False, str(e)

    def send_with_attachment(self, recipient, subject, body, file_path):
        """Send an email with an attachment"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email_address
            msg['To'] = recipient
            msg['Subject'] = subject

            msg.attach(MIMEText(body, 'plain'))

            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    part = MIMEBase('application', 'octet-stream')
                    part.set_payload(f.read())
                    encoders.encode_base64(part)
                    part.add_header(
                        'Content-Disposition',
                        f'attachment; filename= {os.path.basename(file_path)}'
                    )
                    msg.attach(part)

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_address, self.password)
            server.send_message(msg)
            server.quit()
            return True, "Email sent"
        except Exception as e:
            return False, str(e)

# Usage
sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

success, message = sender.send_text_email(
    recipient='recipient@example.com',
    subject='Test',
    body='Message body'
)
\`\`\``
      },
      {
        title: "Automating reports",
        content: `**Daily report:**

\`\`\`python
import schedule
import time
from datetime import datetime

class ReportSender:
    def __init__(self, email_sender):
        self.email_sender = email_sender

    def generate_daily_report(self):
        """Generate a daily report"""
        report_date = datetime.now().strftime("%Y-%m-%d")

        # Simulated report data
        report_data = {
            'date': report_date,
            'sales': 15000,
            'orders': 45,
            'customers': 23
        }

        html_content = f"""
        <html>
        <body>
            <h2>Daily report for {report_date}</h2>
            <table border="1" cellpadding="10">
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Sales</td>
                    <td>{report_data['sales']} UAH</td>
                </tr>
                <tr>
                    <td>Orders</td>
                    <td>{report_data['orders']}</td>
                </tr>
                <tr>
                    <td>Customers</td>
                    <td>{report_data['customers']}</td>
                </tr>
            </table>
        </body>
        </html>
        """

        return html_content

    def send_daily_report(self):
        """Send the daily report"""
        html_content = self.generate_daily_report()
        subject = f"Daily report - {datetime.now().strftime('%Y-%m-%d')}"

        success, message = self.email_sender.send_html_email(
            recipient='manager@example.com',
            subject=subject,
            html_body=html_content
        )

        if success:
            print(f"Report sent: {message}")
        else:
            print(f"Error: {message}")

# Configure automatic sending
email_sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

report_sender = ReportSender(email_sender)

# Send every day at 9:00
schedule.every().day.at("09:00").do(report_sender.send_daily_report)

# Run the scheduler
while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\``
      },
      {
        title: "Error notification system",
        content: `**Automatic alerts:**

\`\`\`python
import logging
from datetime import datetime

class ErrorNotifier:
    def __init__(self, email_sender, admin_email):
        self.email_sender = email_sender
        self.admin_email = admin_email
        self.error_count = 0

    def notify_error(self, error_message, error_type="ERROR", traceback=None):
        """Send an error notification"""
        self.error_count += 1

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="background-color: #ff4444; color: white; padding: 20px;">
                <h2> Error notification</h2>
            </div>
            <div style="padding: 20px;">
                <p><strong>Type:</strong> {error_type}</p>
                <p><strong>Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                <p><strong>Message:</strong></p>
                <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
{error_message}
                </pre>
                {f'<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">{traceback}</pre>' if traceback else ''}
            </div>
        </body>
        </html>
        """

        subject = f" {error_type}: {error_message[:50]}"

        success, message = self.email_sender.send_html_email(
            recipient=self.admin_email,
            subject=subject,
            html_body=html_content
        )

        if success:
            logging.info(f"Error notification sent")
        else:
            logging.error(f"Failed to send notification: {message}")

    def notify_critical_error(self, error_message, traceback=None):
        """Send a critical alert"""
        self.notify_error(error_message, "CRITICAL", traceback)

# Usage
email_sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

notifier = ErrorNotifier(
    email_sender=email_sender,
    admin_email='admin@example.com'
)

# Example usage
try:
    # Your code that might raise an error
    result = 1 / 0
except Exception as e:
    import traceback
    notifier.notify_error(
        error_message=str(e),
        error_type="ERROR",
        traceback=traceback.format_exc()
    )
\`\`\``
      },
      {
        title: "Bulk mailings",
        content: `**Bulk mailing system:**

\`\`\`python
import time
from threading import Thread

class MassMailer:
    def __init__(self, email_sender):
        self.email_sender = email_sender
        self.sent_count = 0
        self.failed_count = 0

    def send_to_list(self, recipients, subject, html_body, text_body=None, delay=1):
        """Send email to a list of recipients"""
        results = []

        for recipient in recipients:
            try:
                success, message = self.email_sender.send_html_email(
                    recipient=recipient,
                    subject=subject,
                    html_body=html_body,
                    text_body=text_body
                )

                if success:
                    self.sent_count += 1
                    results.append({'recipient': recipient, 'status': 'sent'})
                else:
                    self.failed_count += 1
                    results.append({'recipient': recipient, 'status': 'failed', 'error': message})

                # Delay between sends (to avoid overloading the server)
                time.sleep(delay)

            except Exception as e:
                self.failed_count += 1
                results.append({'recipient': recipient, 'status': 'error', 'error': str(e)})

        return results

    def send_async(self, recipients, subject, html_body, text_body=None):
        """Send asynchronously"""
        thread = Thread(
            target=self.send_to_list,
            args=(recipients, subject, html_body, text_body)
        )
        thread.start()
        return thread

# Usage
email_sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

mailer = MassMailer(email_sender)

recipients = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
]

html_content = """
<html>
<body>
    <h1>Special offer!</h1>
    <p>We have a special offer for you.</p>
</body>
</html>
"""

results = mailer.send_to_list(
    recipients=recipients,
    subject='Special offer',
    html_body=html_content,
    delay=2  # 2 seconds between sends
)

print(f"Sent: {mailer.sent_count}")
print(f"Failed: {mailer.failed_count}")
\`\`\``
      },
      {
        title: "Integrating with applications",
        content: `**Decorator for automatic notifications:**

\`\`\`python
from functools import wraps

class EmailDecorator:
    def __init__(self, email_sender, admin_email):
        self.email_sender = email_sender
        self.admin_email = admin_email

    def notify_on_error(self, func):
        """Decorator for error notifications"""
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                import traceback
                error_msg = f"Error in function {func.__name__}: {str(e)}"

                html_content = f"""
                <html>
                <body>
                    <h2>Error in function {func.__name__}</h2>
                    <pre>{traceback.format_exc()}</pre>
                </body>
                </html>
                """

                self.email_sender.send_html_email(
                    recipient=self.admin_email,
                    subject=f"Error: {func.__name__}",
                    html_body=html_content
                )
                raise  # Re-raise the error

        return wrapper

# Usage
email_sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

decorator = EmailDecorator(email_sender, 'admin@example.com')

@decorator.notify_on_error
def critical_function():
    # Your function
    result = 1 / 0  # This will raise an error
    return result

# When the function is called, if an error occurs the admin receives an email
try:
    critical_function()
except:
    pass
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we built an email automation system:

**What we built:**

1. **EmailSender class** — core sending functionality
2. **ReportSender** — automatic reports
3. **ErrorNotifier** — error notifications
4. **MassMailer** — bulk mailings
5. **EmailDecorator** — application integration

**Key concepts:**

- Class structure for reuse
- Task scheduling with schedule
- Asynchronous sending with threading
- Decorators for integration
- Event logging

**Important:**

- Respect SMTP server rate limits
- Add delays between sends
- Handle errors
- Log all operations
- Use BCC for bulk mailings

**Next steps:**

- Integrate email into your projects
- Build your own notification systems
- Automate routine tasks
- Extend the functionality

Email automation is a powerful productivity tool!`
      }
    ]
  },

  codeExamples: [
    {
      title: "Example 1: Basic EmailSender",
      code: `class EmailSender:
    def __init__(self, smtp_server, email_address, password):
        self.smtp_server = smtp_server
        self.email_address = email_address
        self.password = password

    def send_text_email(self, recipient, subject, body):
        msg = MIMEText(body)
        msg['From'] = self.email_address
        msg['To'] = recipient
        msg['Subject'] = subject
        # Send...`,
      explanation: "A reusable base class for sending email."
    },
    {
      title: "Example 2: Automatic reports",
      code: `import schedule

def send_daily_report():
    # Generate and send the report
    pass

schedule.every().day.at("09:00").do(send_daily_report)

while True:
    schedule.run_pending()
    time.sleep(60)`,
      explanation: "Schedule automatic report delivery."
    },
    {
      title: "Example 3: Error notifications",
      code: `try:
    # Your code
    result = risky_operation()
except Exception as e:
    notifier.notify_error(
        error_message=str(e),
        error_type="ERROR"
    )`,
      explanation: "Automatic error alerts from your application."
    }
  ],

  commonMistakes: [
    {
      mistake: "Not adding delays between sends",
      explanation: "SMTP servers may block sends that are too fast.",
      correctApproach: "Use time.sleep() between sends for bulk mailings."
    },
    {
      mistake: "Not handling errors in automation",
      explanation: "Errors can stop the entire automation system.",
      correctApproach: "Use try/except and logging for every operation."
    },
    {
      mistake: "Not logging operations",
      explanation: "Without logs it is hard to track down problems.",
      correctApproach: "Use the logging module to record all operations."
    },
    {
      mistake: "Using CC instead of BCC for bulk mailings",
      explanation: "CC exposes all addresses to recipients, which breaks privacy.",
      correctApproach: "Use BCC for bulk mailings to hide addresses."
    }
  ],

  summary: `In this lesson we built an email automation system:

1. EmailSender class — core functionality
2. Automatic reports — scheduling with schedule
3. Error notifications — application integration
4. Bulk mailings — efficient delivery
5. Decorators — automated alerts

Email automation is a key to productivity!`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to add delays between email sends?",
        options: [
          "To avoid overloading the SMTP server and getting blocked",
          "To save memory",
          "To speed up sending",
          "It is not needed"
        ],
        correctAnswer: 0,
        explanation: "SMTP servers limit send rate. Delays help avoid being blocked."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which library is used for scheduling tasks?",
        options: [
          "schedule",
          "time",
          "datetime",
          "threading"
        ],
        correctAnswer: 0,
        explanation: "The schedule library lets you run functions on a timetable."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is BCC in the context of bulk mailings?",
        options: [
          "Blind carbon copy — recipients cannot see other addresses",
          "Carbon copy — everyone can see the addresses",
          "The email subject",
          "An attachment"
        ],
        correctAnswer: 0,
        explanation: "BCC (Blind Carbon Copy) hides recipient addresses, which matters for privacy in bulk mailings."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you integrate email notifications into existing functions?",
        options: [
          "Use decorators",
          "Hard-code them into every function",
          "Use global variables",
          "It is impossible"
        ],
        correctAnswer: 0,
        explanation: "Decorators let you add behavior (such as error notifications) without changing the function body."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "For bulk mailings you should always use CC instead of BCC.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. For bulk mailings use BCC to hide recipient addresses and protect privacy."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
