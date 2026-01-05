/**
 * Lesson 12-2: Створення HTML email та вкладення
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_2 = {
  lessonId: "lesson-12-2",
  moduleId: "module-12",
  order: 2,
  title: "Створення HTML email та вкладення",
  
  learningObjectives: [
    "Створювати HTML email",
    "Додавати вкладення",
    "Форматувати повідомлення",
    "Використовувати email модуль"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-12-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до HTML email",
        content: `HTML email дозволяє створювати красиві та формативні повідомлення з:
- Кольорами та шрифтами
- Зображеннями
- Таблицями та структурою
- Посиланнями та кнопками

**Переваги HTML email:**

- Красиве форматування
- Візуально привабливі повідомлення
- Можливість додавати зображення
- Професійний вигляд

**Модулі email:**

\`\`\`python
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
\`\`\``
      },
      {
        title: "Створення HTML email",
        content: `**Простий HTML email:**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_html_email(sender, password, recipient, subject, html_body):
    # Створюємо multipart повідомлення
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # HTML версія
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)
    
    # Відправка
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('HTML email відправлено!')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
html_content = """
<html>
  <body>
    <h1 style="color: blue;">Привіт!</h1>
    <p>Це <b>HTML</b> email з Python.</p>
    <a href="https://example.com">Посилання</a>
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

**Комбінований email (текст + HTML):**

\`\`\`python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_combined_email(sender, password, recipient, subject, text_body, html_body):
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # Текстова версія (для клієнтів без підтримки HTML)
    text_part = MIMEText(text_body, 'plain')
    msg.attach(text_part)
    
    # HTML версія
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Email відправлено!')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
text_content = "Привіт! Це текстова версія email."
html_content = """
<html>
  <body>
    <h1>Привіт!</h1>
    <p>Це <b>HTML</b> версія email.</p>
  </body>
</html>
"""

send_combined_email(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Комбінований Email',
    text_body=text_content,
    html_body=html_content
)
\`\`\``
      },
      {
        title: "Створення красивих HTML шаблонів",
        content: `**Професійний HTML шаблон:**

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
            <a href="https://example.com" class="button">Перейти</a>
        </div>
        <div class="footer">
            {footer_text}
        </div>
    </body>
    </html>
    """
    return html

# Використання
html_template = create_html_template(
    title="Ласкаво просимо!",
    content="<p>Дякуємо за реєстрацію на нашому сайті.</p>",
    footer_text="© 2024 Наша компанія"
)
\`\`\`

**Шаблон з таблицею:**

\`\`\`python
def create_table_email(data):
    html = """
    <html>
    <body>
        <h2>Звіт про продажі</h2>
        <table border="1" cellpadding="10" style="border-collapse: collapse;">
            <tr style="background-color: #4CAF50; color: white;">
                <th>Товар</th>
                <th>Кількість</th>
                <th>Ціна</th>
            </tr>
    """
    
    for item in data:
        html += f"""
            <tr>
                <td>{item['name']}</td>
                <td>{item['quantity']}</td>
                <td>{item['price']} грн</td>
            </tr>
        """
    
    html += """
        </table>
    </body>
    </html>
    """
    return html

# Використання
data = [
    {'name': 'Товар 1', 'quantity': 10, 'price': 100},
    {'name': 'Товар 2', 'quantity': 5, 'price': 200},
    {'name': 'Товар 3', 'quantity': 8, 'price': 150}
]

html_content = create_table_email(data)
\`\`\``
      },
      {
        title: "Додавання вкладень",
        content: `**Додавання файлу як вкладення:**

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
    
    # Тіло повідомлення
    msg.attach(MIMEText(body, 'plain'))
    
    # Додавання вкладення
    if os.path.exists(file_path):
        with open(file_path, 'rb') as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        
        encoders.encode_base64(part)
        
        # Отримуємо ім'я файлу
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
        print('Email з вкладенням відправлено!')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
send_email_with_attachment(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Email з вкладенням',
    body='Дивіться вкладення.',
    file_path='report.pdf'
)
\`\`\`

**Додавання кількох вкладень:**

\`\`\`python
def send_email_with_multiple_attachments(sender, password, recipient, subject, body, file_paths):
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Додаємо всі файли
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
        print(f'Email з {len(file_paths)} вкладеннями відправлено!')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
files = ['report.pdf', 'data.xlsx', 'image.jpg']
send_email_with_multiple_attachments(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Email з вкладеннями',
    body='Дивіться вкладення.',
    file_paths=files
)
\`\`\``
      },
      {
        title: "Додавання зображень в HTML email",
        content: `**Вбудовані зображення (inline images):**

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
    
    # HTML з посиланням на зображення
    html_part = MIMEText(html_body, 'html')
    msg.attach(html_part)
    
    # Додаємо зображення
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
        print('Email з зображенням відправлено!')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
html_with_image = """
<html>
  <body>
    <h1>Привіт!</h1>
    <p>Ось наше зображення:</p>
    <img src="cid:image1" alt="Зображення" style="max-width: 500px;">
  </body>
</html>
"""

send_email_with_image(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Email з зображенням',
    html_body=html_with_image,
    image_path='logo.png'
)
\`\`\`

**Примітка:** \`cid:image1\` посилається на Content-ID зображення.`
      },
      {
        title: "CC та BCC (копії)",
        content: `**Додавання CC (копія) та BCC (прихована копія):**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_email_with_cc_bcc(sender, password, recipient, cc_recipients, bcc_recipients, subject, body):
    msg = MIMEText(body)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # CC (копія) - всі бачать адреси
    if cc_recipients:
        if isinstance(cc_recipients, str):
            cc_recipients = [cc_recipients]
        msg['Cc'] = ', '.join(cc_recipients)
    
    # BCC (прихована копія) - не додається в заголовки
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
        print('Email з CC/BCC відправлено!')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
send_email_with_cc_bcc(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='main@example.com',
    cc_recipients=['cc1@example.com', 'cc2@example.com'],
    bcc_recipients=['bcc@example.com'],
    subject='Email з копіями',
    body='Це email з CC та BCC.'
)
\`\`\`

**Різниця між CC та BCC:**

- **CC (Carbon Copy)** — всі одержувачі бачать адреси інших
- **BCC (Blind Carbon Copy)** — одержувачі не бачать адреси BCC`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Вітальний email з логотипом**

\`\`\`python
def send_welcome_email(user_email, user_name):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <div style="text-align: center; padding: 20px;">
            <h1 style="color: #4CAF50;">Ласкаво просимо, {user_name}!</h1>
            <p>Дякуємо за реєстрацію на нашому сайті.</p>
            <a href="https://example.com/login" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                      text-decoration: none; border-radius: 5px;">
                Увійти
            </a>
        </div>
    </body>
    </html>
    """
    
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = user_email
    msg['Subject'] = 'Ласкаво просимо!'
    
    msg.attach(MIMEText(html_content, 'html'))
    
    # Відправка...
\`\`\`

**Приклад 2: Звіт з вкладенням**

\`\`\`python
def send_report_email(recipient, report_path):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    
    html_content = """
    <html>
    <body>
        <h2>Щомісячний звіт</h2>
        <p>Дякуємо за вашу роботу цього місяця.</p>
        <p>Детальний звіт у вкладенні.</p>
    </body>
    </html>
    """
    
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = 'Щомісячний звіт'
    
    msg.attach(MIMEText(html_content, 'html'))
    
    # Додаємо вкладення
    with open(report_path, 'rb') as f:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename= {os.path.basename(report_path)}')
        msg.attach(part)
    
    # Відправка...
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили розширені можливості email:

**Ключові концепції:**

1. **HTML email** — красиве форматування повідомлень
2. **MIMEMultipart** — для комбінованих повідомлень
3. **Вкладення** — додавання файлів до email
4. **Вбудовані зображення** — зображення в HTML
5. **CC та BCC** — копії та приховані копії

**Основні модулі:**

- \`email.mime.multipart.MIMEMultipart\` — багаточастинкові повідомлення
- \`email.mime.text.MIMEText\` — текст та HTML
- \`email.mime.base.MIMEBase\` — вкладення
- \`email.mime.image.MIMEImage\` — зображення
- \`email.encoders\` — кодування вкладень

**Важливо:**

- Завжди додавайте текстову версію разом з HTML
- Перевіряйте наявність файлів перед додаванням
- Використовуйте BCC для масових розсилок
- Тестуйте HTML email у різних клієнтах

**Наступний крок:**

У наступному уроці ми створимо практичний проект з автоматизації email.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: HTML email",
      code: `import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

msg = MIMEMultipart('alternative')
msg['From'] = 'sender@gmail.com'
msg['To'] = 'recipient@example.com'
msg['Subject'] = 'HTML Email'

html = '<html><body><h1>Привіт!</h1></body></html>'
msg.attach(MIMEText(html, 'html'))

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('sender@gmail.com', 'password')
server.send_message(msg)
server.quit()`,
      explanation: "Створюємо та відправляємо HTML email."
    },
    {
      title: "Приклад 2: Email з вкладенням",
      code: `from email.mime.base import MIMEBase
from email import encoders

msg = MIMEMultipart()
msg.attach(MIMEText('Тіло листа', 'plain'))

with open('file.pdf', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename= file.pdf')
    msg.attach(part)`,
      explanation: "Додаємо файл як вкладення до email."
    },
    {
      title: "Приклад 3: CC та BCC",
      code: `msg['To'] = 'main@example.com'
msg['Cc'] = 'cc@example.com'
# BCC додається в to_addrs, але не в заголовки
all_recipients = ['main@example.com', 'cc@example.com', 'bcc@example.com']
server.send_message(msg, to_addrs=all_recipients)`,
      explanation: "Додаємо CC та BCC до email."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не додавати текстову версію разом з HTML",
      explanation: "Деякі клієнти не підтримують HTML, тому потрібна текстова версія.",
      correctApproach: "Завжди додавайте обидві версії: текстову та HTML."
    },
    {
      mistake: "Не перевіряти наявність файлів перед додаванням",
      explanation: "Спроба додати неіснуючий файл викличе помилку.",
      correctApproach: "Використовуйте os.path.exists() перед додаванням вкладень."
    },
    {
      mistake: "Забувати encode_base64 для вкладень",
      explanation: "Бінарні файли потрібно кодувати в base64 для email.",
      correctApproach: "Завжди використовуйте encoders.encode_base64(part) для вкладень."
    },
    {
      mistake: "Неправильне використання Content-ID для зображень",
      explanation: "Content-ID повинен відповідати cid: в HTML.",
      correctApproach: "Використовуйте унікальні Content-ID та відповідні cid: в HTML."
    }
  ],
  
  summary: `На цьому уроці ми вивчили розширені можливості email:

1. **HTML email** — створення красивих повідомлень
2. **Вкладення** — додавання файлів
3. **Вбудовані зображення** — зображення в HTML
4. **CC та BCC** — копії та приховані копії
5. **MIMEMultipart** — багаточастинкові повідомлення

HTML email та вкладення — потужні інструменти для професійних повідомлень!`,
  
  practiceTask: {
    title: "Практичне завдання",
    description: "Для цього уроку практичного завдання немає. Ви можете перейти до тесту.",
    problemStatement: "Для цього уроку практичного завдання немає. Ви можете перейти до тесту.",
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
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який клас використовується для HTML email?",
        options: [
          "MIMEMultipart",
          "MIMEText",
          "MIMEBase",
          "SMTP"
        ],
        correctAnswer: 0,
        explanation: "MIMEMultipart використовується для створення багаточастинкових повідомлень, включаючи HTML email."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як додати файл як вкладення до email?",
        options: [
          "Використати MIMEBase з encode_base64",
          "Додати файл напряму в текст",
          "Вставити файл в HTML",
          "Використати MIMEText"
        ],
        correctAnswer: 0,
        explanation: "Для вкладень використовується MIMEBase з кодуванням base64 через encoders.encode_base64()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке BCC?",
        options: [
          "Прихована копія - одержувачі не бачать адреси BCC",
          "Копія - всі бачать адреси",
          "Тема листа",
          "Вкладення"
        ],
        correctAnswer: 0,
        explanation: "BCC (Blind Carbon Copy) - прихована копія, де одержувачі не бачать адреси інших одержувачів BCC."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо додавати текстову версію разом з HTML?",
        options: [
          "Деякі клієнти не підтримують HTML",
          "HTML займає більше місця",
          "Текстова версія обов'язкова",
          "Це не потрібно"
        ],
        correctAnswer: 0,
        explanation: "Деякі email клієнти та налаштування не підтримують HTML, тому текстова версія забезпечує сумісність."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Для вбудованих зображень в HTML email використовується Content-ID.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Вбудовані зображення використовують Content-ID, на який посилається cid: в HTML."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
