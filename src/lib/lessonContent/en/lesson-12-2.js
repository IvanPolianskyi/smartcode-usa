/**
 * Lesson 12-2: Creating HTML Email and Attachments
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_2 = {
  lessonId: "lesson-12-2",
  moduleId: "module-12",
  order: 2,
  title: "Creating HTML email and attachments",
  
  learningObjectives: [
    "Create HTML email",
    "Add attachment",
    "Format the message",
    "Use the email module"
  ],
  
  prerequisites: ["lesson-12-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to HTML email",
        content: `HTML email allows you to create beautiful and formative messages with:
- Colors and fonts
- Images
- Tables and structure
- Links and buttons

**Advantages of HTML email:**

- Beautiful formatting
- Visually attractive messages
- Ability to add images
- Professional appearance

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
    
    # HTML version
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)
    
    # Sending
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
    <p>This is an <b>HTML</b> email with Python.</p>
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

**Combined email (text + HTML):**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_combined_email(sender, password, recipient, subject, text_body, html_body):
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # Text version (for clients without HTML support)
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
text_content = "Hello! This is the text version of the email."
html_content = """
<html>
  <body>
    <h1>Hello!</h1>
    <p>This is the <b>HTML</b> version of email.</p>
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
        title: "Creating beautiful HTML templates",
        content: `**Professional HTML Template:**

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
    content="<p>Thank you for registering on our website.</p>",
    footer_text="© 2024 Our Company"
)
\`\`\`

**Template with table:**

\`\`\`python
def create_table_email(data):
    html = """
    <html>
    <body>
        <h2>Sales report</h2>
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
        content: `**Adding a file as an attachment:**

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
    
    # Adding an attachment
    if os.path.exists(file_path):
        with open(file_path, 'rb') as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        
        encoders.encode_base64(part)
        
        # We get the file name
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
    body='See attachment.',
    file_path='report.pdf'
)
\`\`\`

**Adding multiple attachments:**

\`\`\`python
def send_email_with_multiple_attachments(sender, password, recipient, subject, body, file_paths):
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Add all files
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
    body='See attachment.',
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
    
    # HTML with a link to the image
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)
    
    # Add an image
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

**Note:** \`cid:image1\` refers to the Content-ID of the image.`
      },
      {
        title: "CC and BCC (copies)",
        content: `**Adding CC (Cc) and BCC (Bcc):**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_email_with_cc_bcc(sender, password, recipient, cc_recipients, bcc_recipients, subject, body):
    msg = MIMEText(body)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # CC (copy) - everyone sees the addresses
    if cc_recipients:
        if isinstance(cc_recipients, str):
            cc_recipients = [cc_recipients]
        msg['Cc'] = ', '.join(cc_recipients)
    
    # BCC (Bcc) - not added to headers
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
    body='This is an email with CC and BCC.'
)
\`\`\`

**Difference between CC and BCC:**

- **CC (Carbon Copy)** - all recipients see the addresses of others
- **BCC (Blind Carbon Copy)** - recipients do not see the BCC address`
      },
      {
        title: "Practical examples",
        content: `**Example 1: Welcome email with logo**

\`\`\`python
def send_welcome_email(user_email, user_name):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center; padding: 20px;">
            <h1 style="color: #4CAF50;">Welcome {user_name}!</h1>
            <p>Thank you for registering on our website.</p>
            <a href="https://example.com/login" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                      text-decoration: none; border-radius: 5px;">
                Sign in
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
    
    # Sending...
\`\`\`

**Example 2: Report with attachment**

\`\`\`python
def send_report_email(recipient, report_path):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    
    html_content = """
    <html>
    <body>
        <h2>Monthly report</h2>
        <p>Thank you for your work this month.</p>
        <p>Detailed report in attachment.</p>
    </body>
    </html>
    """
    
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = 'Monthly Report'
    
    msg.attach(MIMEText(html_content, 'html'))
    
    # Add attachments
    with open(report_path, 'rb') as f:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename= {os.path.basename(report_path)}')
        msg.attach(part)
    
    # Sending...
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we studied the advanced features of email:

**Key Concepts:**

1. **HTML email** - beautiful message formatting
2. **MIMEMultipart** - for combined messages
3. **Attachments** - adding files to email
4. **Embedded images** - images in HTML
5. **CC and BCC** - copies and blind copies

**Main modules:**

- \`email.mime.multipart.MIMEMultipart\` - multipart messages
- \`email.mime.text.MIMEText\` - text and HTML
- \`email.mime.base.MIMEBase\` - attachment
- \`email.mime.image.MIMEImage\` - image
- \`email.encoders\` - encoding of attachments

**Important:**

- Always add the text version along with the HTML
- Check for files before adding
- Use BCC for mass mailings
- Test HTML email in different clients

**Next step:**

In the next lesson, we will create a practical email automation project.`
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
      explanation: "We create and send HTML email."
    },
    {
      title: "Example 2: Email with an attachment",
      code: `from email.mime.base import MIMEBase
from email import encoders

msg = MIMEMultipart()
msg.attach(MIMEText('Mail body', 'plain'))

with open('file.pdf', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename= file.pdf')
    msg.attach(part)`,
      explanation: "We add the file as an attachment to the email."
    },
    {
      title: "Example 3: CC and BCC",
      code: `msg['To'] = 'main@example.com'
msg['Cc'] = 'cc@example.com'
# BCC is added to to_addrs, but not headers
all_recipients = ['main@example.com', 'cc@example.com', 'bcc@example.com']
server.send_message(msg, to_addrs=all_recipients)`,
      explanation: "Add CC and BCC to the email."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not include the text version with the HTML",
      explanation: "Some clients do not support HTML, so a text version is required.",
      correctApproach: "Always include both text and HTML versions."
    },
    {
      mistake: "Do not check for files before adding",
      explanation: "Attempting to add a file that does not exist will cause an error.",
      correctApproach: "Use os.path.exists() before adding attachments."
    },
    {
      mistake: "Forget encode_base64 for attachments",
      explanation: "Binaries must be base64 encoded for email.",
      correctApproach: "Always use encoders.encode_base64(part) for attachments."
    },
    {
      mistake: "Incorrect use of Content-ID for images",
      explanation: "Content-ID must match cid: in HTML.",
      correctApproach: "Use unique Content-IDs and corresponding cid:s in HTML."
    }
  ],
  
  summary: `In this lesson, we studied the advanced features of email:

1. HTML email - creating beautiful messages
2. Attachment - adding files
3. Embedded images - images in HTML
4. CC and BCC - copies and blind copies
5. MIMEMultipart - multipart messages

HTML email and attachments are powerful tools for professional messaging!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What class is used for HTML email?",
        options: [
          "MIMEMultipart",
          "MIMEText",
          "MIMEBase",
          "SMTP"
        ],
        correctAnswer: 0,
        explanation: "MIMEMultipart is used to create multipart messages, including HTML email."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to add a file as an attachment to an email?",
        options: [
          "Use MIMEBase with encode_base64",
          "Add a file directly to the text",
          "Paste the file into HTML",
          "Use MIMEText"
        ],
        correctAnswer: 0,
        explanation: "MIMEBase with base64 encoding via encoders.encode_base64() is used for attachments."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is BCC?",
        options: [
          "BCC - Recipients do not see the BCC address",
          "Copy - everyone can see the addresses",
          "The subject of the letter",
          "Attachment"
        ],
        correctAnswer: 0,
        explanation: "BCC (Blind Carbon Copy) - a hidden copy, where recipients do not see the addresses of other BCC recipients."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to add the text version along with the HTML?",
        options: [
          "Some clients do not support HTML",
          "HTML takes up more space",
          "The text version is required",
          "It is not necessary"
        ],
        correctAnswer: 0,
        explanation: "Some email clients and settings do not support HTML, so the text version ensures compatibility."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Content-ID is used for embedded images in HTML email.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Embedded images use the Content-ID referenced by cid: in the HTML."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
