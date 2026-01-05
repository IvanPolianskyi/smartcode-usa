/**
 * Lesson 12-3: Практика: автоматизація email
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_3 = {
  lessonId: "lesson-12-3",
  moduleId: "module-12",
  order: 3,
  title: "Практика: автоматизація email",
  
  learningObjectives: [
    "Створити скрипт для відправки email",
    "Автоматизувати відправку звітів",
    "Створити систему сповіщень",
    "Практикуватися у роботі з email"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-12-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до автоматизації email",
        content: `Автоматизація email дозволяє:
- Відправляти звіти автоматично
- Створювати системи сповіщень
- Надсилати масові розсилки
- Інтегрувати email в програми

**Типові сценарії:**

- Щоденні/щотижневі звіти
- Сповіщення про помилки
- Вітальні листи для нових користувачів
- Нагадування про події
- Автоматичні відповіді

**Інструменти:**

- smtplib — відправка email
- schedule — планування задач
- threading — асинхронна відправка
- logging — логування подій`
      },
      {
        title: "Створення класу для відправки email",
        content: `**Базовий клас EmailSender:**

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
        """Відправити простий текстовий email"""
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
            return True, "Email відправлено"
        except Exception as e:
            return False, str(e)
    
    def send_html_email(self, recipient, subject, html_body, text_body=None):
        """Відправити HTML email"""
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
            return True, "Email відправлено"
        except Exception as e:
            return False, str(e)
    
    def send_with_attachment(self, recipient, subject, body, file_path):
        """Відправити email з вкладенням"""
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
            return True, "Email відправлено"
        except Exception as e:
            return False, str(e)

# Використання
sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

success, message = sender.send_text_email(
    recipient='recipient@example.com',
    subject='Тест',
    body='Тіло листа'
)
\`\`\``
      },
      {
        title: "Автоматизація звітів",
        content: `**Щоденний звіт:**

\`\`\`python
import schedule
import time
from datetime import datetime

class ReportSender:
    def __init__(self, email_sender):
        self.email_sender = email_sender
    
    def generate_daily_report(self):
        """Генерує щоденний звіт"""
        report_date = datetime.now().strftime("%Y-%m-%d")
        
        # Симуляція даних звіту
        report_data = {
            'date': report_date,
            'sales': 15000,
            'orders': 45,
            'customers': 23
        }
        
        html_content = f"""
        <html>
        <body>
            <h2>Щоденний звіт за {report_date}</h2>
            <table border="1" cellpadding="10">
                <tr>
                    <th>Показник</th>
                    <th>Значення</th>
                </tr>
                <tr>
                    <td>Продажі</td>
                    <td>{report_data['sales']} грн</td>
                </tr>
                <tr>
                    <td>Замовлення</td>
                    <td>{report_data['orders']}</td>
                </tr>
                <tr>
                    <td>Клієнти</td>
                    <td>{report_data['customers']}</td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return html_content
    
    def send_daily_report(self):
        """Відправляє щоденний звіт"""
        html_content = self.generate_daily_report()
        subject = f"Щоденний звіт - {datetime.now().strftime('%Y-%m-%d')}"
        
        success, message = self.email_sender.send_html_email(
            recipient='manager@example.com',
            subject=subject,
            html_body=html_content
        )
        
        if success:
            print(f"Звіт відправлено: {message}")
        else:
            print(f"Помилка: {message}")

# Налаштування автоматичної відправки
email_sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

report_sender = ReportSender(email_sender)

# Відправляти щодня о 9:00
schedule.every().day.at("09:00").do(report_sender.send_daily_report)

# Запуск планувальника
while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\``
      },
      {
        title: "Система сповіщень про помилки",
        content: `**Автоматичні сповіщення:**

\`\`\`python
import logging
from datetime import datetime

class ErrorNotifier:
    def __init__(self, email_sender, admin_email):
        self.email_sender = email_sender
        self.admin_email = admin_email
        self.error_count = 0
    
    def notify_error(self, error_message, error_type="ERROR", traceback=None):
        """Відправити сповіщення про помилку"""
        self.error_count += 1
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="background-color: #ff4444; color: white; padding: 20px;">
                <h2>🚨 Сповіщення про помилку</h2>
            </div>
            <div style="padding: 20px;">
                <p><strong>Тип:</strong> {error_type}</p>
                <p><strong>Час:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                <p><strong>Повідомлення:</strong></p>
                <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
{error_message}
                </pre>
                {f'<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">{traceback}</pre>' if traceback else ''}
            </div>
        </body>
        </html>
        """
        
        subject = f"🚨 {error_type}: {error_message[:50]}"
        
        success, message = self.email_sender.send_html_email(
            recipient=self.admin_email,
            subject=subject,
            html_body=html_content
        )
        
        if success:
            logging.info(f"Сповіщення про помилку відправлено")
        else:
            logging.error(f"Не вдалося відправити сповіщення: {message}")
    
    def notify_critical_error(self, error_message, traceback=None):
        """Відправити критичне сповіщення"""
        self.notify_error(error_message, "CRITICAL", traceback)

# Використання
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

# Приклад використання
try:
    # Ваш код, який може викликати помилку
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
        title: "Масові розсилки",
        content: `**Система масових розсилок:**

\`\`\`python
import time
from threading import Thread

class MassMailer:
    def __init__(self, email_sender):
        self.email_sender = email_sender
        self.sent_count = 0
        self.failed_count = 0
    
    def send_to_list(self, recipients, subject, html_body, text_body=None, delay=1):
        """Відправити email списку одержувачів"""
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
                
                # Затримка між відправками (щоб не перевантажити сервер)
                time.sleep(delay)
                
            except Exception as e:
                self.failed_count += 1
                results.append({'recipient': recipient, 'status': 'error', 'error': str(e)})
        
        return results
    
    def send_async(self, recipients, subject, html_body, text_body=None):
        """Асинхронна відправка"""
        thread = Thread(
            target=self.send_to_list,
            args=(recipients, subject, html_body, text_body)
        )
        thread.start()
        return thread

# Використання
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
    <h1>Спеціальна пропозиція!</h1>
    <p>Ми маємо для вас особливу пропозицію.</p>
</body>
</html>
"""

results = mailer.send_to_list(
    recipients=recipients,
    subject='Спеціальна пропозиція',
    html_body=html_content,
    delay=2  # 2 секунди між відправками
)

print(f"Відправлено: {mailer.sent_count}")
print(f"Помилок: {mailer.failed_count}")
\`\`\``
      },
      {
        title: "Інтеграція з програмами",
        content: `**Декоратор для автоматичних сповіщень:**

\`\`\`python
from functools import wraps

class EmailDecorator:
    def __init__(self, email_sender, admin_email):
        self.email_sender = email_sender
        self.admin_email = admin_email
    
    def notify_on_error(self, func):
        """Декоратор для сповіщень про помилки"""
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                import traceback
                error_msg = f"Помилка в функції {func.__name__}: {str(e)}"
                
                html_content = f"""
                <html>
                <body>
                    <h2>Помилка в функції {func.__name__}</h2>
                    <pre>{traceback.format_exc()}</pre>
                </body>
                </html>
                """
                
                self.email_sender.send_html_email(
                    recipient=self.admin_email,
                    subject=f"Помилка: {func.__name__}",
                    html_body=html_content
                )
                raise  # Повторно викликаємо помилку
        
        return wrapper

# Використання
email_sender = EmailSender(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    email_address='your_email@gmail.com',
    password='your_app_password'
)

decorator = EmailDecorator(email_sender, 'admin@example.com')

@decorator.notify_on_error
def critical_function():
    # Ваша функція
    result = 1 / 0  # Це викличе помилку
    return result

# При виклику функції, якщо виникне помилка, адміністратор отримає email
try:
    critical_function()
except:
    pass
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми створили систему автоматизації email:

**Що ми зробили:**

1. **EmailSender клас** — базова функціональність для відправки
2. **ReportSender** — автоматичні звіти
3. **ErrorNotifier** — сповіщення про помилки
4. **MassMailer** — масові розсилки
5. **EmailDecorator** — інтеграція з програмами

**Ключові концепції:**

- Класова структура для повторного використання
- Планування задач з schedule
- Асинхронна відправка з threading
- Декоратори для інтеграції
- Логування подій

**Важливо:**

- Дотримуйтеся обмежень SMTP серверів
- Додавайте затримки між відправками
- Обробляйте помилки
- Логуйте всі операції
- Використовуйте BCC для масових розсилок

**Наступні кроки:**

- Інтегруйте email в ваші проекти
- Створіть власні системи сповіщень
- Автоматизуйте рутинні задачі
- Розширте функціональність

Email автоматизація — потужний інструмент для продуктивності!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базовий EmailSender",
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
        # Відправка...`,
      explanation: "Базовий клас для відправки email з повторним використанням."
    },
    {
      title: "Приклад 2: Автоматичні звіти",
      code: `import schedule

def send_daily_report():
    # Генеруємо та відправляємо звіт
    pass

schedule.every().day.at("09:00").do(send_daily_report)

while True:
    schedule.run_pending()
    time.sleep(60)`,
      explanation: "Планування автоматичної відправки звітів."
    },
    {
      title: "Приклад 3: Сповіщення про помилки",
      code: `try:
    # Ваш код
    result = risky_operation()
except Exception as e:
    notifier.notify_error(
        error_message=str(e),
        error_type="ERROR"
    )`,
      explanation: "Автоматичні сповіщення про помилки в програмі."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не додавати затримки між відправками",
      explanation: "SMTP сервери можуть заблокувати занадто швидкі відправки.",
      correctApproach: "Додавайте time.sleep() між відправками для масових розсилок."
    },
    {
      mistake: "Не обробляти помилки в автоматизації",
      explanation: "Помилки можуть зупинити всю систему автоматизації.",
      correctApproach: "Використовуйте try/except та логування для всіх операцій."
    },
    {
      mistake: "Не логувати операції",
      explanation: "Без логування важко відстежити проблеми.",
      correctApproach: "Використовуйте logging модуль для запису всіх операцій."
    },
    {
      mistake: "Використовувати CC замість BCC для масових розсилок",
      explanation: "CC показує всі адреси одержувачам, що порушує конфіденційність.",
      correctApproach: "Використовуйте BCC для масових розсилок, щоб приховати адреси."
    }
  ],
  
  summary: `На цьому уроці ми створили систему автоматизації email:

1. **EmailSender клас** — базова функціональність
2. **Автоматичні звіти** — планування з schedule
3. **Сповіщення про помилки** — інтеграція з програмами
4. **Масові розсилки** — ефективна відправка
5. **Декоратори** — автоматизація сповіщень

Автоматизація email — ключ до продуктивності!`,
  
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
        question: "Чому важливо додавати затримки між відправками email?",
        options: [
          "Щоб не перевантажити SMTP сервер та уникнути блокування",
          "Щоб зберегти пам'ять",
          "Щоб прискорити відправку",
          "Це не потрібно"
        ],
        correctAnswer: 0,
        explanation: "SMTP сервери мають обмеження на швидкість відправки. Затримки допомагають уникнути блокування."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка бібліотека використовується для планування задач?",
        options: [
          "schedule",
          "time",
          "datetime",
          "threading"
        ],
        correctAnswer: 0,
        explanation: "Бібліотека schedule дозволяє планувати виконання функцій за розкладом."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке BCC у контексті масових розсилок?",
        options: [
          "Прихована копія - одержувачі не бачать адреси інших",
          "Копія - всі бачать адреси",
          "Тема листа",
          "Вкладення"
        ],
        correctAnswer: 0,
        explanation: "BCC (Blind Carbon Copy) приховує адреси одержувачів, що важливо для конфіденційності в масових розсилках."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як інтегрувати email сповіщення в існуючі функції?",
        options: [
          "Використати декоратори",
          "Додати в код функції",
          "Використати глобальні змінні",
          "Це неможливо"
        ],
        correctAnswer: 0,
        explanation: "Декоратори дозволяють додавати функціональність (наприклад, сповіщення про помилки) без зміни коду функції."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Для масових розсилок завжди слід використовувати CC замість BCC.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Для масових розсилок слід використовувати BCC, щоб приховати адреси одержувачів та забезпечити конфіденційність."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
