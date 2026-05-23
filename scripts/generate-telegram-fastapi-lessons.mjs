import fs from 'fs'
import path from 'path'

const QUIZ = "import { QUIZ_QUESTION_TYPES } from '../courseData'"

function quizBlock(questions) {
  return `  quiz: {
    questions: [
${questions.map((q, i) => `      {
        id: "q${i + 1}",
        type: QUIZ_QUESTION_TYPES.${q.type},
        question: ${JSON.stringify(q.question)},
        options: ${JSON.stringify(q.options)},
        correctAnswer: ${q.correctAnswer},
        explanation: ${JSON.stringify(q.explanation)}
      }`).join(',\n')}
    ],
    timeLimit: 15,
    passingScore: 70
  }`
}

function writeLesson(stem, locale, data) {
  const dir =
    locale === 'en'
      ? 'src/lib/lessonContent/en'
      : 'src/lib/lessonContent'
  const exportName = `lesson_${stem.replace('lesson-', '').replace(/-/g, '_')}`
  const content = `/**
 * ${data.title}
 */

${QUIZ}

export const ${exportName} = {
  lessonId: ${JSON.stringify(data.lessonId)},
  moduleId: ${JSON.stringify(data.moduleId)},
  order: ${data.order},
  title: ${JSON.stringify(data.title)},

  learningObjectives: ${JSON.stringify(data.learningObjectives, null, 2).replace(/\n/g, '\n  ')},

  prerequisites: ${JSON.stringify(data.prerequisites)},

  videoUrl: "",

  theory: {
    sections: ${JSON.stringify(data.sections, null, 4).replace(/^/gm, '    ').replace(/^    /, '')}
  },

  codeExamples: ${JSON.stringify(data.codeExamples || [], null, 2).replace(/\n/g, '\n  ')},

  commonMistakes: ${JSON.stringify(data.commonMistakes || [], null, 2).replace(/\n/g, '\n  ')},

  summary: ${JSON.stringify(data.summary)},

  practiceTask: ${data.practiceTask ? JSON.stringify(data.practiceTask, null, 2).replace(/\n/g, '\n  ') : 'null'},

${quizBlock(data.quiz)}
}
`
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${stem}.js`), content)
  console.log('Wrote', path.join(dir, `${stem}.js`))
}

const lessons = [
  // module 14 telegram UK base - locale applied in loop below
]

const defs = [
  {
    stem: 'lesson-14-1',
    moduleId: 'module-14',
    order: 1,
    prerequisites: ['lesson-13-5'],
    uk: {
      title: 'Telegram Bot API: токен і перші запити',
      learningObjectives: [
        'Створити бота через @BotFather',
        'Зберігати токен у змінних оточення',
        'Надсилати повідомлення через HTTP API',
        'Отримувати оновлення getUpdates',
      ],
      sections: [
        {
          title: 'Що таке Telegram-бот',
          content: `Telegram-бот - це звичайний акаунт, яким керує ваш Python-код через **Bot API**.

**Кроки:**
1. Відкрийте @BotFather у Telegram
2. Команда \`/newbot\` - ім'я та username (закінчується на \`bot\`)
3. Отримайте **токен** - секретний ключ API

**Ніколи не публікуйте токен у GitHub!** Зберігайте в \`.env\`:

\`\`\`
TELEGRAM_BOT_TOKEN=123456:ABC...
\`\`\``,
        },
        {
          title: 'HTTP-запити до api.telegram.org',
          content: `Базова URL: \`https://api.telegram.org/bot<TOKEN>/METHOD\`

**Надіслати повідомлення:**

\`\`\`python
import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = 123456789  # ваш chat_id

url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
payload = {"chat_id": CHAT_ID, "text": "Привіт з Python!"}
r = requests.post(url, json=payload)
r.raise_for_status()
print(r.json())
\`\`\`

**Отримати chat_id:** напишіть боту, потім викличте \`getUpdates\` і знайдіть \`message.chat.id\`.`,
        },
      ],
      codeExamples: [
        {
          title: 'getUpdates',
          code: `import os, requests
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
r = requests.get(f"https://api.telegram.org/bot{TOKEN}/getUpdates")
print(r.json())`,
          explanation: 'Показує останні повідомлення користувачів боту.',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Токен у коді замість .env',
          explanation: 'Токен потрапить у репозиторій.',
          correctApproach: 'Використовуйте os.getenv та .gitignore для .env',
        },
      ],
      summary:
        'Ви створили бота в BotFather, навчилися викликати sendMessage та getUpdates через requests.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Де безпечно зберігати токен бота?',
          options: ['У .env файлі', 'У README', 'У коментарі коду', 'У назві змінної'],
          correctAnswer: 0,
          explanation: 'Токен має бути лише в секретах оточення.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Який метод надсилає текст користувачу?',
          options: ['sendMessage', 'getUpdates', 'deleteWebhook', 'setWebhook'],
          correctAnswer: 0,
          explanation: 'sendMessage відправляє повідомлення в чат.',
        },
        {
          type: 'TRUE_FALSE',
          question: 'Токен бота можна публікувати в соцмережах.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False - токен дає повний контроль над ботом.',
        },
      ],
    },
    en: {
      title: 'Telegram Bot API: token and first requests',
      learningObjectives: [
        'Create a bot via @BotFather',
        'Store the token in environment variables',
        'Send messages through the HTTP API',
        'Fetch updates with getUpdates',
      ],
      sections: [
        {
          title: 'What is a Telegram bot',
          content: `A Telegram bot is an account controlled by your Python code through the **Bot API**.

**Steps:**
1. Open @BotFather in Telegram
2. Run \`/newbot\` - choose a name and username (must end with \`bot\`)
3. Copy the **token** - your secret API key

**Never commit the token to GitHub.** Store it in \`.env\`:

\`\`\`
TELEGRAM_BOT_TOKEN=123456:ABC...
\`\`\``,
        },
        {
          title: 'HTTP calls to api.telegram.org',
          content: `Base URL: \`https://api.telegram.org/bot<TOKEN>/METHOD\`

**Send a message:**

\`\`\`python
import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = 123456789

url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
payload = {"chat_id": CHAT_ID, "text": "Hello from Python!"}
r = requests.post(url, json=payload)
r.raise_for_status()
print(r.json())
\`\`\`

**Get chat_id:** message your bot, call \`getUpdates\`, read \`message.chat.id\`.`,
        },
      ],
      codeExamples: [
        {
          title: 'getUpdates',
          code: `import os, requests
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
r = requests.get(f"https://api.telegram.org/bot{TOKEN}/getUpdates")
print(r.json())`,
          explanation: 'Lists recent messages sent to your bot.',
        },
      ],
      commonMistakes: [
        {
          mistake: 'Hardcoding the token',
          explanation: 'The token can leak through version control.',
          correctApproach: 'Use os.getenv and add .env to .gitignore',
        },
      ],
      summary:
        'You created a bot in BotFather and learned sendMessage and getUpdates with requests.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Where should you store the bot token?',
          options: ['In a .env file', 'In README', 'In a code comment', 'In the variable name'],
          correctAnswer: 0,
          explanation: 'Secrets belong in environment variables only.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Which method sends text to a user?',
          options: ['sendMessage', 'getUpdates', 'deleteWebhook', 'setWebhook'],
          correctAnswer: 0,
          explanation: 'sendMessage delivers a message to a chat.',
        },
        {
          type: 'TRUE_FALSE',
          question: 'It is safe to publish your bot token online.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False - anyone with the token controls your bot.',
        },
      ],
    },
  },
  {
    stem: 'lesson-14-2',
    moduleId: 'module-14',
    order: 2,
    prerequisites: ['lesson-14-1'],
    uk: {
      title: 'Бібліотека python-telegram-bot: echo-бот',
      learningObjectives: [
        'Встановити python-telegram-bot',
        'Налаштувати Application та polling',
        'Обробляти команду /start',
        'Повторювати текст користувача',
      ],
      sections: [
        {
          title: 'Встановлення',
          content: `\`\`\`bash
pip install python-telegram-bot
\`\`\`

Використовуємо **v21+** з async API.`,
        },
        {
          title: 'Мінімальний бот',
          content: `\`\`\`python
import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

load_dotenv()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Привіт! Напиши мені текст.")

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(update.message.text)

def main():
    app = Application.builder().token(os.getenv("TELEGRAM_BOT_TOKEN")).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))
    app.run_polling()

if __name__ == "__main__":
    main()
\`\`\``,
        },
      ],
      summary: 'Echo-бот з /start працює через polling без ручних getUpdates.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Що робить run_polling()?',
          options: [
            'Періодично запитує нові повідомлення',
            'Відправляє email',
            'Створює GUI',
            'Компілює код',
          ],
          correctAnswer: 0,
          explanation: 'Polling отримує оновлення від Telegram.',
        },
      ],
    },
    en: {
      title: 'python-telegram-bot library: echo bot',
      learningObjectives: [
        'Install python-telegram-bot',
        'Configure Application and polling',
        'Handle the /start command',
        'Echo user text',
      ],
      sections: [
        {
          title: 'Installation',
          content: `\`\`\`bash
pip install python-telegram-bot
\`\`\`

We use **v21+** with the async API.`,
        },
        {
          title: 'Minimal bot',
          content: `\`\`\`python
import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

load_dotenv()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi! Send me any text.")

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(update.message.text)

def main():
    app = Application.builder().token(os.getenv("TELEGRAM_BOT_TOKEN")).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))
    app.run_polling()

if __name__ == "__main__":
    main()
\`\`\``,
        },
      ],
      summary: 'An echo bot with /start runs via polling without manual getUpdates.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'What does run_polling() do?',
          options: [
            'Periodically fetches new updates',
            'Sends email',
            'Creates a GUI',
            'Compiles code',
          ],
          correctAnswer: 0,
          explanation: 'Polling retrieves updates from Telegram.',
        },
      ],
    },
  },
  {
    stem: 'lesson-14-3',
    moduleId: 'module-14',
    order: 3,
    prerequisites: ['lesson-14-2'],
    uk: {
      title: 'Команди, клавіатури та стан діалогу',
      learningObjectives: [
        'Додавати кастомні команди /help, /menu',
        'Створювати ReplyKeyboardMarkup',
        'Зберігати дані в context.user_data',
        'Обробляти натискання кнопок',
      ],
      sections: [
        {
          title: 'Клавіатура',
          content: `\`\`\`python
from telegram import ReplyKeyboardMarkup

async def menu(update, context):
    kb = [["Погода", "Курс USD"], ["Допомога"]]
    markup = ReplyKeyboardMarkup(kb, resize_keyboard=True)
    await update.message.reply_text("Обери дію:", reply_markup=markup)
\`\`\`

**context.user_data** - словник для кроків діалогу (наприклад, очікування міста).`,
        },
      ],
      summary: 'Бот отримує меню з кнопками та зберігає стан користувача.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Де зберігати тимчасові дані сесії користувача?',
          options: ['context.user_data', 'globals()', 'print()', 'sys.argv'],
          correctAnswer: 0,
          explanation: 'user_data - стандартне сховище на чат.',
        },
      ],
    },
    en: {
      title: 'Commands, keyboards, and dialog state',
      learningObjectives: [
        'Add custom commands /help, /menu',
        'Build ReplyKeyboardMarkup',
        'Store data in context.user_data',
        'Handle button presses',
      ],
      sections: [
        {
          title: 'Keyboard',
          content: `\`\`\`python
from telegram import ReplyKeyboardMarkup

async def menu(update, context):
    kb = [["Weather", "USD rate"], ["Help"]]
    markup = ReplyKeyboardMarkup(kb, resize_keyboard=True)
    await update.message.reply_text("Choose an action:", reply_markup=markup)
\`\`\`

Use **context.user_data** for multi-step flows (e.g. waiting for a city name).`,
        },
      ],
      summary: 'The bot shows a button menu and keeps per-user state.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Where should you store temporary user session data?',
          options: ['context.user_data', 'globals()', 'print()', 'sys.argv'],
          correctAnswer: 0,
          explanation: 'user_data is the standard per-chat store.',
        },
      ],
    },
  },
  {
    stem: 'lesson-14-4',
    moduleId: 'module-14',
    order: 4,
    prerequisites: ['lesson-14-3'],
    uk: {
      title: 'Практика: корисний Telegram-бот',
      learningObjectives: [
        'Зібрати бота з кількох команд',
        'Підключити зовнішнє API (курс валют або погода)',
        'Логувати помилки',
        'Оформити README з інструкцією запуску',
      ],
      sections: [
        {
          title: 'Ідея проєкту',
          content: `Створіть **бота-асистента**:
- /start, /help
- Кнопка «Курс USD» - requests до публічного API НБУ або exchangerate
- Кнопка «Нагадати» - зберігає текст у user_data

Додайте \`try/except\` навколо HTTP-запитів і відповідайте користувачу зрозумілою помилкою.`,
        },
      ],
      summary: 'Фінальний Telegram-проєкт поєднує handlers, клавіатуру та HTTP.',
      practiceTask: {
        title: 'Бот-асистент',
        description: 'Реалізуйте мінімум 3 команди та одну кнопку з даними з API.',
        hints: ['Використайте .env для токена', 'Перевірте бота в приватному чаті'],
      },
      quiz: [
        {
          type: 'TRUE_FALSE',
          question: 'Помилки API варто показувати користувачу як stack trace.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False - коротке людське повідомлення без технічних деталей.',
        },
      ],
    },
    en: {
      title: 'Practice: a useful Telegram bot',
      learningObjectives: [
        'Combine multiple commands in one bot',
        'Call an external API (FX rate or weather)',
        'Log errors properly',
        'Write a README with run instructions',
      ],
      sections: [
        {
          title: 'Project idea',
          content: `Build an **assistant bot**:
- /start, /help
- "USD rate" button - requests to a public exchange API
- "Remind me" - stores text in user_data

Wrap HTTP calls in \`try/except\` and reply with a friendly error message.`,
        },
      ],
      summary: 'The capstone Telegram project combines handlers, keyboards, and HTTP.',
      practiceTask: {
        title: 'Assistant bot',
        description: 'Implement at least 3 commands and one API-powered button.',
        hints: ['Use .env for the token', 'Test in a private chat first'],
      },
      quiz: [
        {
          type: 'TRUE_FALSE',
          question: 'You should show users full API stack traces.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'False - use short human-readable errors.',
        },
      ],
    },
  },
  {
    stem: 'lesson-15-1',
    moduleId: 'module-15',
    order: 1,
    prerequisites: ['lesson-14-4'],
    uk: {
      title: 'FastAPI: перший REST endpoint',
      learningObjectives: [
        'Встановити fastapi та uvicorn',
        'Створити app і маршрут GET /',
        'Запустити сервер локально',
        'Переглянути автодокументацію /docs',
      ],
      sections: [
        {
          title: 'Чому FastAPI',
          content: `**FastAPI** - сучасний фреймворк для REST API на Python:
- Швидкий (на базі Starlette)
- Автоматична OpenAPI документація
- Валідація через Pydantic

\`\`\`bash
pip install fastapi uvicorn[standard]
\`\`\``,
        },
        {
          title: 'Hello API',
          content: `\`\`\`python
from fastapi import FastAPI

app = FastAPI(title="Student API")

@app.get("/")
def root():
    return {"message": "API працює"}

@app.get("/health")
def health():
    return {"status": "ok"}
\`\`\`

Запуск: \`uvicorn main:app --reload\`

Відкрийте http://127.0.0.1:8000/docs`,
        },
      ],
      summary: 'Ви запустили FastAPI і побачили інтерактивну документацію Swagger.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Яка команда запускає сервер?',
          options: ['uvicorn main:app --reload', 'python manage.py run', 'npm start', 'flask run only'],
          correctAnswer: 0,
          explanation: 'uvicorn - ASGI сервер для FastAPI.',
        },
      ],
    },
    en: {
      title: 'FastAPI: your first REST endpoint',
      learningObjectives: [
        'Install fastapi and uvicorn',
        'Create an app and GET / route',
        'Run the server locally',
        'Open auto docs at /docs',
      ],
      sections: [
        {
          title: 'Why FastAPI',
          content: `**FastAPI** is a modern Python REST framework:
- Fast (built on Starlette)
- Automatic OpenAPI docs
- Validation with Pydantic

\`\`\`bash
pip install fastapi uvicorn[standard]
\`\`\``,
        },
        {
          title: 'Hello API',
          content: `\`\`\`python
from fastapi import FastAPI

app = FastAPI(title="Student API")

@app.get("/")
def root():
    return {"message": "API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}
\`\`\`

Run: \`uvicorn main:app --reload\`

Open http://127.0.0.1:8000/docs`,
        },
      ],
      summary: 'You started FastAPI and explored interactive Swagger docs.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Which command starts the server?',
          options: ['uvicorn main:app --reload', 'python manage.py run', 'npm start', 'flask run only'],
          correctAnswer: 0,
          explanation: 'uvicorn is the ASGI server for FastAPI.',
        },
      ],
    },
  },
  {
    stem: 'lesson-15-2',
    moduleId: 'module-15',
    order: 2,
    prerequisites: ['lesson-15-1'],
    uk: {
      title: 'Параметри шляху, query та моделі Pydantic',
      learningObjectives: [
        'Використовувати path parameters /items/{id}',
        'Додавати query параметри skip, limit',
        'Описувати моделі BaseModel',
        'Повертати типізовані відповіді',
      ],
      sections: [
        {
          title: 'Path і Query',
          content: `\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str
    price: float

items_db: list[Item] = []

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for it in items_db:
        if it.id == item_id:
            return it
    return {"error": "not found"}

@app.get("/items")
def list_items(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]
\`\`\``,
        },
      ],
      summary: 'Маршрути з параметрами та Pydantic-моделі описують контракт API.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Для чого використовують BaseModel?',
          options: [
            'Валідація та серіалізація даних',
            'Малювання GUI',
            'Відправка email',
            'Скрапінг HTML',
          ],
          correctAnswer: 0,
          explanation: 'Pydantic перевіряє типи полів.',
        },
      ],
    },
    en: {
      title: 'Path, query parameters, and Pydantic models',
      learningObjectives: [
        'Use path parameters /items/{id}',
        'Add query params skip and limit',
        'Define BaseModel schemas',
        'Return typed responses',
      ],
      sections: [
        {
          title: 'Path and Query',
          content: `\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str
    price: float

items_db: list[Item] = []

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for it in items_db:
        if it.id == item_id:
            return it
    return {"error": "not found"}

@app.get("/items")
def list_items(skip: int = 0, limit: int = 10):
    return items_db[skip : skip + limit]
\`\`\``,
        },
      ],
      summary: 'Parameterized routes and Pydantic models define your API contract.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'What is BaseModel used for?',
          options: [
            'Data validation and serialization',
            'Drawing GUIs',
            'Sending email',
            'HTML scraping',
          ],
          correctAnswer: 0,
          explanation: 'Pydantic validates field types.',
        },
      ],
    },
  },
  {
    stem: 'lesson-15-3',
    moduleId: 'module-15',
    order: 3,
    prerequisites: ['lesson-15-2'],
    uk: {
      title: 'POST, помилки HTTP та статус-коди',
      learningObjectives: [
        'Створювати POST /items з тілом JSON',
        'Повертати статус 201 Created',
        'Використовувати HTTPException',
        'Оновлювати та видаляти ресурси',
      ],
      sections: [
        {
          title: 'POST і помилки',
          content: `\`\`\`python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

class ItemCreate(BaseModel):
    name: str
    price: float

@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate):
    if payload.price < 0:
        raise HTTPException(status_code=400, detail="Ціна не може бути від'ємною")
    new_id = len(items_db) + 1
    item = {"id": new_id, **payload.model_dump()}
    items_db.append(item)
    return item
\`\`\``,
        },
      ],
      summary: 'POST створює ресурси, HTTPException повертає зрозумілі помилки клієнту.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Який код зазвичай означає успішне створення?',
          options: ['201', '404', '500', '301'],
          correctAnswer: 0,
          explanation: '201 Created - стандарт для POST.',
        },
      ],
    },
    en: {
      title: 'POST, HTTP errors, and status codes',
      learningObjectives: [
        'Create POST /items with a JSON body',
        'Return 201 Created',
        'Use HTTPException',
        'Update and delete resources',
      ],
      sections: [
        {
          title: 'POST and errors',
          content: `\`\`\`python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

class ItemCreate(BaseModel):
    name: str
    price: float

@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate):
    if payload.price < 0:
        raise HTTPException(status_code=400, detail="Price cannot be negative")
    new_id = len(items_db) + 1
    item = {"id": new_id, **payload.model_dump()}
    items_db.append(item)
    return item
\`\`\``,
        },
      ],
      summary: 'POST creates resources; HTTPException returns clear client errors.',
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Which status code usually means successful creation?',
          options: ['201', '404', '500', '301'],
          correctAnswer: 0,
          explanation: '201 Created is standard for POST.',
        },
      ],
    },
  },
  {
    stem: 'lesson-15-4',
    moduleId: 'module-15',
    order: 4,
    prerequisites: ['lesson-15-3'],
    uk: {
      title: 'Практика: REST API + webhook для Telegram',
      learningObjectives: [
        'Зібрати CRUD API для списку задач',
        'Додати endpoint POST /telegram/webhook',
        'Зв\'язати FastAPI з логікою бота',
        'Описати деплой (ngrok / хостинг)',
      ],
      sections: [
        {
          title: 'Проєкт',
          content: `**Міні-бекенд:**
- GET/POST /tasks - список справ
- POST /telegram/webhook - приймає Update від Telegram

\`\`\`python
from fastapi import FastAPI, Request

@app.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    # обробка message.text
    return {"ok": True}
\`\`\`

Локально: ngrok http 8000, потім setWebhook на публічний URL.`,
        },
      ],
      summary: 'Ви поєднали REST API та Telegram webhook в одному FastAPI-додатку.',
      practiceTask: {
        title: 'Tasks API + webhook',
        description: 'CRUD для tasks і один робочий webhook endpoint.',
        hints: ['Спочатку перевірте /docs', 'Webhook потребує HTTPS URL'],
      },
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'Webhook Telegram вимагає…',
          options: [
            'Публічний HTTPS URL',
            'Лише localhost',
            'Tkinter',
            'SMTP',
          ],
          correctAnswer: 0,
          explanation: 'Telegram надсилає POST лише на доступний HTTPS endpoint.',
        },
      ],
    },
    en: {
      title: 'Practice: REST API + Telegram webhook',
      learningObjectives: [
        'Build a CRUD API for a task list',
        'Add POST /telegram/webhook',
        'Connect FastAPI with bot logic',
        'Document deploy with ngrok or hosting',
      ],
      sections: [
        {
          title: 'Project',
          content: `**Mini backend:**
- GET/POST /tasks - todo list
- POST /telegram/webhook - receives Telegram Update

\`\`\`python
from fastapi import FastAPI, Request

@app.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    # handle message.text
    return {"ok": True}
\`\`\`

Locally: ngrok http 8000, then setWebhook to the public URL.`,
        },
      ],
      summary: 'You combined a REST API and a Telegram webhook in one FastAPI app.',
      practiceTask: {
        title: 'Tasks API + webhook',
        description: 'CRUD for tasks plus one working webhook endpoint.',
        hints: ['Test via /docs first', 'Webhook needs an HTTPS URL'],
      },
      quiz: [
        {
          type: 'MULTIPLE_CHOICE',
          question: 'A Telegram webhook requires…',
          options: [
            'A public HTTPS URL',
            'localhost only',
            'Tkinter',
            'SMTP',
          ],
          correctAnswer: 0,
          explanation: 'Telegram POSTs updates only to reachable HTTPS endpoints.',
        },
      ],
    },
  },
]

for (const def of defs) {
  for (const locale of ['uk', 'en']) {
    const loc = def[locale]
    writeLesson(def.stem, locale, {
      lessonId: def.stem,
      moduleId: def.moduleId,
      order: def.order,
      prerequisites: def.prerequisites,
      title: loc.title,
      learningObjectives: loc.learningObjectives,
      sections: loc.sections,
      codeExamples: loc.codeExamples,
      commonMistakes: loc.commonMistakes,
      summary: loc.summary,
      practiceTask: loc.practiceTask,
      quiz: loc.quiz,
    })
  }
}

console.log('Done.')
