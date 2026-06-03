/**
 * Lesson 14-2: python-telegram-bot library: echo bot
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_2 = {
  lessonId: "lesson-14-2",
  moduleId: "module-14",
  order: 2,
  title: "python-telegram-bot library: echo bot",

  learningObjectives: [
    "Install python-telegram-bot v21+",
    "Build an Application with handlers",
    "Write async functions for commands and messages",
    "Run the bot with run_polling()"
  ],

  prerequisites: ["lesson-14-1"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Why use a library instead of raw API",
        content: `Manual \`getUpdates\` + \`offset\` works, but gets complicated quickly. **python-telegram-bot** (PTB):

- Manages polling or webhook
- Separates **handlers** by event type (command, text, button)
- Provides typed \`Update\` and \`ContextTypes\`
- Supports **async/await** (version 21+)

\`\`\`bash
pip install "python-telegram-bot>=21.0" python-dotenv
\`\`\`

Documentation: [python-telegram-bot.org](https://docs.python-telegram-bot.org/)`
      },
      {
        title: "Minimal bot structure",
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

**Key parts:**

- \`Application.builder().token(...).build()\`
- \`CommandHandler("start", start)\` — only \`/start\`
- \`MessageHandler(filters.TEXT & ~filters.COMMAND, echo)\` — text without commands
- \`run_polling()\` — endless loop receiving Updates`
      },
      {
        title: "Async handlers",
        content: `Handlers in PTB v21 are **async def**. Use \`await\` inside for network calls to Telegram:

\`\`\`python
async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "Доступні команди:\\n"
        "/start — початок\\n"
        "/help — ця довідка"
    )
    await update.message.reply_text(text)
\`\`\`

**Why async:** while the bot waits for Telegram's response, the event loop can handle other updates (useful under load).

**Mistake:** a plain \`def\` without async in v21 — the handler will not work correctly.`
      },
      {
        title: "Filters and multiple handlers",
        content: `\`\`\`python
from telegram.ext import CommandHandler, MessageHandler, filters

app.add_handler(CommandHandler("help", help_cmd))

# Photos only
app.add_handler(MessageHandler(filters.PHOTO, photo_handler))

# Text starting with "Привіт"
app.add_handler(
    MessageHandler(filters.Regex(r"^Привіт"), greet_handler)
)
\`\`\`

**Order matters:** the first matching handler processes the Update. Add specific filters **above** general ones.

\`\`\`python
# Bad: echo catches everything
app.add_handler(MessageHandler(filters.TEXT, echo))
app.add_handler(CommandHandler("start", start))  # may never run

# Good: commands first
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))
\`\`\``
      },
      {
        title: "Logging and errors",
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

Show the user a **short** message; put details in the log:

\`\`\`python
try:
    await update.message.reply_text(result)
except Exception:
    await update.message.reply_text("Щось пішло не так. Спробуйте пізніше.")
\`\`\``
      },
      {
        title: "Summary",
        content: `Echo bot on PTB: Application + CommandHandler + MessageHandler + \`run_polling()\`. Next — keyboards and \`context.user_data\` (lesson 14-3).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Echo with /start",
      code: `app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))
app.run_polling()`,
      explanation: "Classic pair: greeting and repeating text."
    },
    {
      title: "/help reference",
      code: `app.add_handler(CommandHandler("help", help_cmd))`,
      explanation: "Separate handler for each command."
    }
  ],

  commonMistakes: [
    {
      mistake: "Synchronous def handlers in v21",
      explanation: "PTB 21 expects async.",
      correctApproach: "async def handler(...) and await reply_text."
    },
    {
      mistake: "Echo handler before CommandHandler",
      explanation: "Echo may swallow commands.",
      correctApproach: "CommandHandler first, then general TEXT."
    },
    {
      mistake: "Forgetting ~filters.COMMAND in echo",
      explanation: "Bot duplicates /start as text.",
      correctApproach: "filters.TEXT & ~filters.COMMAND."
    },
    {
      mistake: "Token None without a check",
      explanation: "Cryptic error on build().",
      correctApproach: "Check os.getenv after load_dotenv()."
    }
  ],

  summary: `python-telegram-bot simplifies polling: Application, async handlers, filters. The echo bot is the foundation for commands and menus in the next lesson.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does run_polling() do?",
        options: [
          "Periodically receives updates from Telegram",
          "Sends email via SMTP",
          "Creates a Tkinter GUI",
          "Compiles Python to bytecode"
        ],
        correctAnswer: 0,
        explanation: "Polling is a getUpdates loop inside the library."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which handler handles the /start command?",
        options: [
          "CommandHandler('start', start)",
          "MessageHandler(filters.TEXT, start)",
          "CallbackQueryHandler",
          "ErrorHandler"
        ],
        correctAnswer: 0,
        explanation: "CommandHandler is bound to the command name without a slash in code."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which filter for echo without duplicating commands?",
        options: [
          "filters.TEXT & ~filters.COMMAND",
          "filters.ALL",
          "filters.COMMAND only",
          "filters.PHOTO"
        ],
        correctAnswer: 0,
        explanation: "Text messages, but not commands."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you reply to a user in an async handler?",
        options: [
          "await update.message.reply_text('...')",
          "update.message.reply_text('...') without await",
          "print('...')",
          "requests.post manually"
        ],
        correctAnswer: 0,
        explanation: "PTB v21 methods are async; await is required."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "In PTB v21 handlers are usually declared as async def.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — that is the standard for version 21+."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
