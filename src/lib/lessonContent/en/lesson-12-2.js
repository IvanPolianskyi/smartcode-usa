/**
 * Lesson 12-2: Creating HTML email and attachments
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_2 = {
  lessonId: "lesson-12-2",
  moduleId: "module-12",
  order: 2,
  title: "Creating HTML email and attachments",

  learningObjectives: [
    "Create HTML emails",
    "Add attachments",
    "Format messages",
    "Use the email module"
  ],

  prerequisites: ["lesson-12-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Introduction to HTML email",
        content: `HTML email lets you create polished, well-formatted messages with:
- Colors and fonts
- Images
- Tables and layout structure
- Links and buttons

**Advantages of HTML email:**

- Attractive formatting
- Visually engaging messages
- Support for images
- A professional look

**Email modules:**

\`\`\`python
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
\`\`\``
      },
      {
        title: "Creating an HTML email",
        content: `**Simple HTML email:**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_html_email(sender, password, recipient, subject, html_body):
    # Create a multipart message
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # HTML part
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)

    # Send
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('HTML email sent!')
    except Exception as e:
        print(f'Error: {e}')

# Usage
html_content = """
<html>
  <body>
    <h1 style="color: blue;">Hello!</h1>
    <p>This is an <b>HTML</b> email from Python.</p>
    <a href="https://example.com">Link</a>
  </body>
</html>
"""

send_html_email(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='HTML Email',
    html_body=html_content
)
\`\`\`

**Combined email (plain text + HTML):**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_combined_email(sender, password, recipient, subject, text_body, html_body):
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # Plain-text version (for clients without HTML support)
    text_part = MIMEText(text_body, 'plain')
    msg.attach(text_part)

    # HTML version
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Email sent!')
    except Exception as e:
        print(f'Error: {e}')

# Usage
text_content = "Hello! This is the plain-text version of the email."
html_content = """
<html>
  <body>
    <h1>Hello!</h1>
    <p>This is the <b>HTML</b> version of the email.</p>
  </body>
</html>
"""

send_combined_email(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Combined Email',
    text_body=text_content,
    html_body=html_content
)
\`\`\``
      },
      {
        title: "Creating polished HTML templates",
        content: `**Professional HTML template:**

\`\`\`python
def create_html_template(title, content, footer_text):
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }}
            .content {{
                padding: 20px;
                background-color: #f9f9f9;
            }}
            .button {{
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 10px 0;
            }}
            .footer {{
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 12px;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>{title}</h1>
        </div>
        <div class="content">
            {content}
            <a href="https://example.com" class="button">Go</a>
        </div>
        <div class="footer">
            {footer_text}
        </div>
    </body>
    </html>
    """
    return html

# Usage
html_template = create_html_template(
    title="Welcome!",
    content="<p>Thank you for registering on our site.</p>",
    footer_text="© 2024 Our Company"
)
\`\`\`

**Template with a table:**

\`\`\`python
def create_table_email(data):
    html = """
    <html>
    <body>
        <h2>Sales Report</h2>
        <table border="1" cellpadding="10" style="border-collapse: collapse;">
            <tr style="background-color: #4CAF50; color: white;">
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
    """

    for item in data:
        html += f"""
            <tr>
                <td>{item['name']}</td>
                <td>{item['quantity']}</td>
                <td>{item['price']} UAH</td>
            </tr>
        """

    html += """
        </table>
    </body>
    </html>
    """
    return html

# Usage
data = [
    {'name': 'Product 1', 'quantity': 10, 'price': 100},
    {'name': 'Product 2', 'quantity': 5, 'price': 200},
    {'name': 'Product 3', 'quantity': 8, 'price': 150}
]

html_content = create_table_email(data)
\`\`\``
      },
      {
        title: "Adding attachments",
        content: `**Attach a file:**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

def send_email_with_attachment(sender, password, recipient, subject, body, file_path):
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # Message body
    msg.attach(MIMEText(body, 'plain'))

    # Add attachment
    if os.path.exists(file_path):
        with open(file_path, 'rb') as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())

        encoders.encode_base64(part)

        # Get the file name
        filename = os.path.basename(file_path)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename= {filename}'
        )

        msg.attach(part)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Email with attachment sent!')
    except Exception as e:
        print(f'Error: {e}')

# Usage
send_email_with_attachment(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Email with attachment',
    body='Please see the attachment.',
    file_path='report.pdf'
)
\`\`\`

**Attach multiple files:**

\`\`\`python
def send_email_with_multiple_attachments(sender, password, recipient, subject, body, file_paths):
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    # Attach every file
    for file_path in file_paths:
        if os.path.exists(file_path):
            with open(file_path, 'rb') as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())

            encoders.encode_base64(part)
            filename = os.path.basename(file_path)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename= {filename}'
            )
            msg.attach(part)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print(f'Email with {len(file_paths)} attachments sent!')
    except Exception as e:
        print(f'Error: {e}')

# Usage
files = ['report.pdf', 'data.xlsx', 'image.jpg']
send_email_with_multiple_attachments(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Email with attachments',
    body='Please see the attachments.',
    file_paths=files
)
\`\`\``
      },
      {
        title: "Adding images to HTML email",
        content: `**Inline images:**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

def send_email_with_image(sender, password, recipient, subject, html_body, image_path):
    msg = MIMEMultipart('related')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # HTML that references the image
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)

    # Attach the image
    if os.path.exists(image_path):
        with open(image_path, 'rb') as img_file:
            img = MIMEImage(img_file.read())
            img.add_header('Content-ID', '<image1>')
            msg.attach(img)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Email with image sent!')
    except Exception as e:
        print(f'Error: {e}')

# Usage
html_with_image = """
<html>
  <body>
    <h1>Hello!</h1>
    <p>Here is our image:</p>
    <img src="cid:image1" alt="Image" style="max-width: 500px;">
  </body>
</html>
"""

send_email_with_image(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Email with image',
    html_body=html_with_image,
    image_path='logo.png'
)
\`\`\`

**Note:** \`cid:image1\` refers to the image's Content-ID.`
      },
      {
        title: "CC and BCC",
        content: `**Adding CC (carbon copy) and BCC (blind carbon copy):**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_email_with_cc_bcc(sender, password, recipient, cc_recipients, bcc_recipients, subject, body):
    msg = MIMEText(body)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    # CC — everyone can see the addresses
    if cc_recipients:
        if isinstance(cc_recipients, str):
            cc_recipients = [cc_recipients]
        msg['Cc'] = ', '.join(cc_recipients)

    # BCC — not added to headers
    all_recipients = [recipient]
    if cc_recipients:
        all_recipients.extend(cc_recipients)
    if bcc_recipients:
        if isinstance(bcc_recipients, str):
            bcc_recipients = [bcc_recipients]
        all_recipients.extend(bcc_recipients)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg, to_addrs=all_recipients)
        server.quit()
        print('Email with CC/BCC sent!')
    except Exception as e:
        print(f'Error: {e}')

# Usage
send_email_with_cc_bcc(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='main@example.com',
    cc_recipients=['cc1@example.com', 'cc2@example.com'],
    bcc_recipients=['bcc@example.com'],
    subject='Email with copies',
    body='This email includes CC and BCC.'
)
\`\`\`

**Difference between CC and BCC:**

- **CC (Carbon Copy)** — all recipients can see each other's addresses
- **BCC (Blind Carbon Copy)** — recipients cannot see BCC addresses`
      },
      {
        title: "Practical examples",
        content: `**Example 1: Welcome email with branding**

\`\`\`python
def send_welcome_email(user_email, user_name):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'

    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center; padding: 20px;">
            <h1 style="color: #4CAF50;">Welcome, {user_name}!</h1>
            <p>Thank you for registering on our site.</p>
            <a href="https://example.com/login"
               style="background-color: #4CAF50; color: white; padding: 10px 20px;
                      text-decoration: none; border-radius: 5px;">
                Log in
            </a>
        </div>
    </body>
    </html>
    """

    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = user_email
    msg['Subject'] = 'Welcome!'

    msg.attach(MIMEText(html_content, 'html'))

    # Send...
\`\`\`

**Example 2: Report with an attachment**

\`\`\`python
def send_report_email(recipient, report_path):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'

    html_content = """
    <html>
    <body>
        <h2>Monthly Report</h2>
        <p>Thank you for your work this month.</p>
        <p>The detailed report is attached.</p>
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = 'Monthly Report'

    msg.attach(MIMEText(html_content, 'html'))

    # Add attachment
    with open(report_path, 'rb') as f:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename= {os.path.basename(report_path)}')
        msg.attach(part)

    # Send...
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we covered advanced email features:

**Key concepts:**

1. **HTML email** — polished message formatting
2. **MIMEMultipart** — for combined messages
3. **Attachments** — adding files to email
4. **Inline images** — images inside HTML
5. **CC and BCC** — copies and blind copies

**Main modules:**

- \`email.mime.multipart.MIMEMultipart\` — multipart messages
- \`email.mime.text.MIMEText\` — text and HTML
- \`email.mime.base.MIMEBase\` — attachments
- \`email.mime.image.MIMEImage\` — images
- \`email.encoders\` — encoding attachments

**Important:**

- Always include a plain-text version alongside HTML
- Check that files exist before attaching them
- Use BCC for bulk mailings
- Test HTML email in different clients

**Next step:**

In the next lesson we will build a practical email automation project.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Example 1: HTML email",
      code: `import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

msg = MIMEMultipart('alternative')
msg['From'] = 'sender@gmail.com'
msg['To'] = 'recipient@example.com'
msg['Subject'] = 'HTML Email'

html = '<html><body><h1>Hello!</h1></body></html>'
msg.attach(MIMEText(html, 'html'))

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('sender@gmail.com', 'password')
server.send_message(msg)
server.quit()`,
      explanation: "Create and send an HTML email."
    },
    {
      title: "Example 2: Email with attachment",
      code: `from email.mime.base import MIMEBase
from email import encoders

msg = MIMEMultipart()
msg.attach(MIMEText('Message body', 'plain'))

with open('file.pdf', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename= file.pdf')
    msg.attach(part)`,
      explanation: "Attach a file to an email."
    },
    {
      title: "Example 3: CC and BCC",
      code: `msg['To'] = 'main@example.com'
msg['Cc'] = 'cc@example.com'
# BCC goes in to_addrs, but not in headers
all_recipients = ['main@example.com', 'cc@example.com', 'bcc@example.com']
server.send_message(msg, to_addrs=all_recipients)`,
      explanation: "Add CC and BCC to an email."
    }
  ],

  commonMistakes: [
    {
      mistake: "Not including a plain-text version with HTML",
      explanation: "Some clients do not support HTML, so a text version is needed.",
      correctApproach: "Always attach both plain-text and HTML parts."
    },
    {
      mistake: "Not checking that files exist before attaching",
      explanation: "Trying to attach a missing file raises an error.",
      correctApproach: "Use os.path.exists() before adding attachments."
    },
    {
      mistake: "Forgetting encode_base64 for attachments",
      explanation: "Binary files must be base64-encoded for email.",
      correctApproach: "Always call encoders.encode_base64(part) for attachments."
    },
    {
      mistake: "Incorrect Content-ID for images",
      explanation: "Content-ID must match the cid: reference in HTML.",
      correctApproach: "Use unique Content-IDs and matching cid: values in HTML."
    }
  ],

  summary: `In this lesson we covered advanced email features:

1. HTML email — creating polished messages
2. Attachments — adding files
3. Inline images — images in HTML
4. CC and BCC — copies and blind copies
5. MIMEMultipart — multipart messages

HTML email and attachments are powerful tools for professional messaging!`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which class is used for HTML email?",
        options: [
          "MIMEMultipart",
          "MIMEText",
          "MIMEBase",
          "SMTP"
        ],
        correctAnswer: 0,
        explanation: "MIMEMultipart is used to build multipart messages, including HTML email."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you add a file as an email attachment?",
        options: [
          "Use MIMEBase with encode_base64",
          "Put the file directly into the text",
          "Embed the file in HTML",
          "Use MIMEText"
        ],
        correctAnswer: 0,
        explanation: "Attachments use MIMEBase with base64 encoding via encoders.encode_base64()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is BCC?",
        options: [
          "Blind carbon copy — recipients cannot see BCC addresses",
          "Carbon copy — everyone can see the addresses",
          "The email subject",
          "An attachment"
        ],
        correctAnswer: 0,
        explanation: "BCC (Blind Carbon Copy) hides BCC addresses from other recipients."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to include a plain-text version with HTML?",
        options: [
          "Some clients do not support HTML",
          "HTML takes more space",
          "A text version is always required by the protocol",
          "It is not needed"
        ],
        correctAnswer: 0,
        explanation: "Some email clients and settings do not support HTML, so a text version ensures compatibility."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Inline images in HTML email use Content-ID.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Inline images use Content-ID, which is referenced via cid: in HTML."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
