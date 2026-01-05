/**
 * Lesson 12-1: Вступ до email: smtplib
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_1 = {
  lessonId: "lesson-12-1",
  moduleId: "module-12",
  order: 1,
  title: "Вступ до email: smtplib",
  
  learningObjectives: [
    "Розуміти протокол SMTP",
    "Використовувати smtplib",
    "Відправляти прості email",
    "Налаштувати SMTP сервер"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-11-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до відправки email",
        content: `Email (електронна пошта) — один з найпоширеніших способів комунікації в інтернеті.

**Що таке SMTP?**

SMTP (Simple Mail Transfer Protocol) — протокол для відправки електронних листів.

**Бібліотека smtplib:**

- Вбудована бібліотека Python
- Не потребує встановлення
- Підтримує SMTP протокол
- Працює з різними поштовими серверами

**Основні задачі:**

- Відправка простих текстових повідомлень
- Відправка HTML повідомлень
- Додавання вкладень
- Масові розсилки
- Автоматизація сповіщень

**Імпорт:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
\`\`\``
      },
      {
        title: "Налаштування SMTP сервера",
        content: `**Популярні SMTP сервери:**

- **Gmail:** smtp.gmail.com (порт 587 або 465)
- **Outlook:** smtp-mail.outlook.com (порт 587)
- **Yahoo:** smtp.mail.yahoo.com (порт 587)
- **Локальний сервер:** localhost (порт 25)

**Налаштування для Gmail:**

\`\`\`python
import smtplib

# Налаштування Gmail
smtp_server = "smtp.gmail.com"
smtp_port = 587
email_address = "your_email@gmail.com"
email_password = "your_app_password"  # App Password, не звичайний пароль
\`\`\`

**Важливо для Gmail:**

1. Увімкніть двофакторну аутентифікацію
2. Створіть App Password (не звичайний пароль)
3. Використовуйте App Password для підключення

**Налаштування для інших сервісів:**

\`\`\`python
# Outlook
smtp_server = "smtp-mail.outlook.com"
smtp_port = 587

# Yahoo
smtp_server = "smtp.mail.yahoo.com"
smtp_port = 587

# Локальний сервер (для тестування)
smtp_server = "localhost"
smtp_port = 25
\`\`\``
      },
      {
        title: "Відправка простого текстового email",
        content: `**Базовий приклад:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_simple_email(sender, password, recipient, subject, body):
    # Створюємо повідомлення
    msg = MIMEText(body)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # Підключаємося до SMTP сервера
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Шифрування з'єднання
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Email відправлено успішно!')
    except Exception as e:
        print(f'Помилка відправки: {e}')

# Використання
send_simple_email(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Тестовий лист',
    body='Це тестовий email з Python!'
)
\`\`\`

**Покрокове пояснення:**

1. **MIMEText** — створює текстове повідомлення
2. **msg['From']** — адреса відправника
3. **msg['To']** — адреса одержувача
4. **msg['Subject']** — тема листа
5. **server.starttls()** — вмикає шифрування
6. **server.login()** — авторизація
7. **server.send_message()** — відправка
8. **server.quit()** — закриття з'єднання`
      },
      {
        title: "Безпечне зберігання паролів",
        content: `**НЕ зберігайте паролі в коді!**

**Варіант 1: Змінні оточення**

\`\`\`python
import os
import smtplib
from email.mime.text import MIMEText

# Отримуємо змінні з оточення
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

# Встановіть змінні перед запуском:
# export EMAIL_ADDRESS="your_email@gmail.com"
# export EMAIL_PASSWORD="your_app_password"
\`\`\`

**Варіант 2: Файл конфігурації (.env)**

\`\`\`python
# Встановіть python-dotenv: pip install python-dotenv
from dotenv import load_dotenv
import os

load_dotenv()  # Завантажує змінні з .env файлу

email_address = os.getenv('EMAIL_ADDRESS')
email_password = os.getenv('EMAIL_PASSWORD')
\`\`\`

**Файл .env (не додавайте до git!):**

\`\`\`
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
\`\`\`

**Варіант 3: Файл конфігурації (безпечний)**

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
        title: "Обробка помилок",
        content: `**Повна обробка помилок:**

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
        
        return True, "Email відправлено успішно"
        
    except SMTPAuthenticationError:
        return False, "Помилка авторизації. Перевірте email та пароль"
    except SMTPRecipientsRefused:
        return False, "Невірна адреса одержувача"
    except SMTPException as e:
        return False, f"Помилка SMTP: {e}"
    except Exception as e:
        return False, f"Невідома помилка: {e}"

# Використання
success, message = send_email_safe(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipient='recipient@example.com',
    subject='Тест',
    body='Тіло листа'
)

if success:
    print(f"✓ {message}")
else:
    print(f"✗ {message}")
\`\`\`

**Типи помилок:**

- **SMTPAuthenticationError** — невірний email/пароль
- **SMTPRecipientsRefused** — невірна адреса одержувача
- **SMTPException** — загальна помилка SMTP
- **ConnectionError** — проблеми з мережею`
      },
      {
        title: "Відправка кільком одержувачам",
        content: `**Відправка одному або кільком одержувачам:**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_to_multiple(sender, password, recipients, subject, body):
    msg = MIMEText(body)
    msg['From'] = sender
    msg['Subject'] = subject
    
    # recipients може бути рядком або списком
    if isinstance(recipients, str):
        recipients = [recipients]
    
    msg['To'] = ', '.join(recipients)
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg, to_addrs=recipients)
        server.quit()
        print(f'Email відправлено {len(recipients)} одержувачам')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
recipients = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
]

send_to_multiple(
    sender='your_email@gmail.com',
    password='your_app_password',
    recipients=recipients,
    subject='Масовий лист',
    body='Це лист для кількох одержувачів'
)
\`\`\`

**Примітка:**

- Всі одержувачі бачать адреси інших одержувачів
- Для прихованої копії використовуйте BCC (буде в наступному уроці)`
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Сповіщення про помилку**

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def send_error_notification(error_message):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    recipient = 'admin@example.com'
    
    msg = MIMEText(f'Помилка в системі:\\n\\n{error_message}')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = '🚨 Сповіщення про помилку'
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Сповіщення відправлено')
    except Exception as e:
        print(f'Не вдалося відправити сповіщення: {e}')

# Використання
try:
    # Ваш код, який може викликати помилку
    result = 1 / 0
except Exception as e:
    send_error_notification(str(e))
\`\`\`

**Приклад 2: Щоденний звіт**

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

def send_daily_report(report_data):
    sender = 'your_email@gmail.com'
    password = 'your_app_password'
    recipient = 'manager@example.com'
    
    report_text = f'''
Щоденний звіт за {datetime.now().strftime("%Y-%m-%d")}

Дані:
{report_data}
'''
    
    msg = MIMEText(report_text)
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = f'Щоденний звіт - {datetime.now().strftime("%Y-%m-%d")}'
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print('Звіт відправлено')
    except Exception as e:
        print(f'Помилка: {e}')

# Використання
report_data = "Продано товарів: 150\\nОтримано замовлень: 45"
send_daily_report(report_data)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили основи відправки email:

**Ключові концепції:**

1. **SMTP** — протокол для відправки email
2. **smtplib** — вбудована бібліотека Python
3. **MIMEText** — створення текстового повідомлення
4. **starttls()** — шифрування з'єднання
5. **Безпека** — зберігання паролів у змінних оточення

**Основні кроки:**

1. Створити MIMEText об'єкт
2. Встановити From, To, Subject
3. Підключитися до SMTP сервера
4. Увімкнути шифрування (starttls)
5. Авторизуватися (login)
6. Відправити повідомлення (send_message)
7. Закрити з'єднання (quit)

**Важливо:**

- Використовуйте App Password для Gmail
- Не зберігайте паролі в коді
- Обробляйте помилки
- Використовуйте змінні оточення або .env файли

**Наступний крок:**

У наступному уроці ми навчимося створювати HTML email та додавати вкладення.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий email",
      code: `import smtplib
from email.mime.text import MIMEText

msg = MIMEText('Привіт! Це тестовий email.')
msg['From'] = 'your_email@gmail.com'
msg['To'] = 'recipient@example.com'
msg['Subject'] = 'Тест'

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('your_email@gmail.com', 'your_app_password')
server.send_message(msg)
server.quit()`,
      explanation: "Відправляємо простий текстовий email через Gmail SMTP."
    },
    {
      title: "Приклад 2: З обробкою помилок",
      code: `import smtplib
from email.mime.text import MIMEText

try:
    msg = MIMEText('Тіло листа')
    msg['From'] = 'sender@gmail.com'
    msg['To'] = 'recipient@example.com'
    msg['Subject'] = 'Тема'
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('sender@gmail.com', 'password')
    server.send_message(msg)
    server.quit()
    print('Відправлено!')
except Exception as e:
    print(f'Помилка: {e}')`,
      explanation: "Відправка email з обробкою помилок."
    },
    {
      title: "Приклад 3: Кільком одержувачам",
      code: `import smtplib
from email.mime.text import MIMEText

recipients = ['user1@example.com', 'user2@example.com']
msg = MIMEText('Масовий лист')
msg['From'] = 'sender@gmail.com'
msg['To'] = ', '.join(recipients)
msg['Subject'] = 'Масовий лист'

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('sender@gmail.com', 'password')
server.send_message(msg, to_addrs=recipients)
server.quit()`,
      explanation: "Відправка email кільком одержувачам одночасно."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання звичайного пароля Gmail",
      explanation: "Gmail вимагає App Password для програмного доступу.",
      correctApproach: "Створіть App Password в налаштуваннях Google Account та використовуйте його."
    },
    {
      mistake: "Зберігання паролів у коді",
      explanation: "Паролі в коді можуть бути скомпрометовані.",
      correctApproach: "Використовуйте змінні оточення або .env файли для зберігання паролів."
    },
    {
      mistake: "Не використовувати starttls()",
      explanation: "Без шифрування дані передаються відкритим текстом.",
      correctApproach: "Завжди використовуйте server.starttls() перед login()."
    },
    {
      mistake: "Не обробляти помилки",
      explanation: "Помилки SMTP можуть викликати падіння програми.",
      correctApproach: "Використовуйте try/except для обробки SMTPException та інших помилок."
    }
  ],
  
  summary: `На цьому уроці ми вивчили основи відправки email:

1. **SMTP протокол** — протокол для відправки email
2. **smtplib** — вбудована бібліотека Python
3. **MIMEText** — створення текстового повідомлення
4. **Безпека** — зберігання паролів у змінних оточення
5. **Обробка помилок** — правильна обробка винятків

Email — потужний інструмент для автоматизації сповіщень!`,
  
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
        question: "Що таке SMTP?",
        options: [
          "Протокол для відправки електронних листів",
          "Протокол для отримання email",
          "Формат email повідомлення",
          "Бібліотека Python"
        ],
        correctAnswer: 0,
        explanation: "SMTP (Simple Mail Transfer Protocol) — це протокол для відправки електронних листів."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який порт використовується для Gmail SMTP з starttls?",
        options: [
          "587",
          "25",
          "465",
          "80"
        ],
        correctAnswer: 0,
        explanation: "Gmail використовує порт 587 для SMTP з starttls (TLS шифрування)."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить метод starttls()?",
        options: [
          "Вмикає шифрування з'єднання",
          "Відправляє повідомлення",
          "Авторизує користувача",
          "Закриває з'єднання"
        ],
        correctAnswer: 0,
        explanation: "starttls() вмикає TLS шифрування для безпечного з'єднання з SMTP сервером."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як безпечно зберігати паролі для email?",
        options: [
          "У змінних оточення або .env файлах",
          "Прямо в коді",
          "У коментарях",
          "У назвах змінних"
        ],
        correctAnswer: 0,
        explanation: "Паролі слід зберігати у змінних оточення або .env файлах, які не потрапляють у систему контролю версій."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Для Gmail можна використовувати звичайний пароль облікового запису.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Gmail вимагає App Password для програмного доступу, а не звичайний пароль облікового запису."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
