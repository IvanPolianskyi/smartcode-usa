/**
 * Lesson 14-2: Бібліотека python-telegram-bot: echo-бот
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_2 = {
  lessonId: "lesson-14-2",
  moduleId: "module-14",
  order: 2,
  title: "Бібліотека python-telegram-bot: echo-бот",

  learningObjectives: [
    "Встановити python-telegram-bot v21+",
    "Зібрати Application з handlers",
    "Писати async-функції для команд і повідомлень",
    "Запустити бота через run_polling()"
  ],

  prerequisites: ["lesson-14-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Навіщо бібліотека замість сирого API",
        content: `Ручні \`getUpdates\` + \`offset\` працюють, але швидко ускладнюються. **python-telegram-bot** (PTB):

- Керує polling або webhook
- Розділяє **handlers** за типом події (команда, текст, кнопка)
- Дає типізовані \`Update\` та \`ContextTypes\`
- Підтримує **async/await** (версія 21+)

\`\`\`bash
pip install "python-telegram-bot>=21.0" python-dotenv
\`\`\`

Документація: [python-telegram-bot.org](https://docs.python-telegram-bot.org/)`
      },
      {
        title: "Структура мінімального бота",
        content: `\`\`\`python
import os
import logging
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes,
)

load_dotenv()
logging.basicConfig(level=logging.INFO)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Привіт! Напиши текст — я повторю (echo)."
    )

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(update.message.text)

def main() -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    app = Application.builder().token(token).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, echo)
    )

    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
\`\`\`

**Ключові частини:**

- \`Application.builder().token(...).build()\`
- \`CommandHandler("start", start)\` — лише \`/start\`
- \`MessageHandler(filters.TEXT & ~filters.COMMAND, echo)\` — текст без команд
- \`run_polling()\` — нескінченний цикл отримання Update`
      },
      {
        title: "Async handlers",
        content: `Handlers у PTB v21 — **async def**. Всередині використовуйте \`await\` для мережевих викликів Telegram:

\`\`\`python
async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "Доступні команди:\\n"
        "/start — початок\\n"
        "/help — ця довідка"
    )
    await update.message.reply_text(text)
\`\`\`

**Чому async:** поки бот чекає відповідь Telegram, event loop може обробляти інші оновлення (корисно при навантаженні).

**Помилка:** звичайний \`def\` без async у v21 — handler не спрацює коректно.`
      },
      {
        title: "Фільтри та кілька handlers",
        content: `\`\`\`python
from telegram.ext import CommandHandler, MessageHandler, filters

app.add_handler(CommandHandler("help", help_cmd))

# Лише фото
app.add_handler(MessageHandler(filters.PHOTO, photo_handler))

# Текст, що починається з "Привіт"
app.add_handler(
    MessageHandler(filters.Regex(r"^Привіт"), greet_handler)
)
\`\`\`

**Порядок має значення:** перший handler, який підійшов, обробляє Update. Специфічні фільтри додавайте **вище** загальних.

\`\`\`python
# Погано: echo перехопить усе
app.add_handler(MessageHandler(filters.TEXT, echo))
app.add_handler(CommandHandler("start", start))  # може не дійти

# Добре: спочатку команди
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))
\`\`\``
      },
      {
        title: "Логування та помилки",
        content: `\`\`\`python
import logging

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    logging.error("Exception:", exc_info=context.error)

app.add_error_handler(error_handler)
\`\`\`

Користувачу показуйте **коротке** повідомлення, деталі — у лог:

\`\`\`python
try:
    await update.message.reply_text(result)
except Exception:
    await update.message.reply_text("Щось пішло не так. Спробуйте пізніше.")
\`\`\``
      },
      {
        title: "Підсумок",
        content: `Echo-бот на PTB: Application + CommandHandler + MessageHandler + \`run_polling()\`. Далі — клавіатури та \`context.user_data\` (урок 14-3).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Echo з /start",
      code: `app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))
app.run_polling()`,
      explanation: "Класична пара: привітання та повтор тексту."
    },
    {
      title: "Довідка /help",
      code: `app.add_handler(CommandHandler("help", help_cmd))`,
      explanation: "Окремий handler на кожну команду."
    }
  ],

  commonMistakes: [
    {
      mistake: "Синхронні def handlers у v21",
      explanation: "PTB 21 очікує async.",
      correctApproach: "async def handler(...) та await reply_text."
    },
    {
      mistake: "Echo handler перед CommandHandler",
      explanation: "Echo може «з'їсти» команди.",
      correctApproach: "Спочатку CommandHandler, потім загальний TEXT."
    },
    {
      mistake: "Забути ~filters.COMMAND у echo",
      explanation: "Бот дублює /start як текст.",
      correctApproach: "filters.TEXT & ~filters.COMMAND."
    },
    {
      mistake: "Токен None без перевірки",
      explanation: "Криптична помилка при build().",
      correctApproach: "Перевірте os.getenv після load_dotenv()."
    }
  ],

  summary: `python-telegram-bot спрощує polling: Application, async handlers, фільтри. Echo-бот — основа для команд і меню в наступному уроці.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить run_polling()?",
        options: [
          "Періодично отримує оновлення від Telegram",
          "Відправляє email через SMTP",
          "Створює GUI на Tkinter",
          "Компілює Python у bytecode"
        ],
        correctAnswer: 0,
        explanation: "Polling — цикл getUpdates всередині бібліотеки."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який handler обробляє команду /start?",
        options: [
          "CommandHandler('start', start)",
          "MessageHandler(filters.TEXT, start)",
          "CallbackQueryHandler",
          "ErrorHandler"
        ],
        correctAnswer: 0,
        explanation: "CommandHandler прив'язаний до імені команди без слеша в коді."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який фільтр для echo без дублювання команд?",
        options: [
          "filters.TEXT & ~filters.COMMAND",
          "filters.ALL",
          "filters.COMMAND only",
          "filters.PHOTO"
        ],
        correctAnswer: 0,
        explanation: "Текстові повідомлення, але не команди."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як правильно відповісти користувачу в async handler?",
        options: [
          "await update.message.reply_text('...')",
          "update.message.reply_text('...') без await",
          "print('...')",
          "requests.post вручну"
        ],
        correctAnswer: 0,
        explanation: "Методи PTB v21 — асинхронні, потрібен await."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "У PTB v21 handlers зазвичай оголошують як async def.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — це стандарт для версії 21+."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
