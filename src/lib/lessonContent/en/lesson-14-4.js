/**
 * Lesson 14-4: Practice: a useful Telegram bot
 * Full educational content (theory + existing project brief)
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

export const lesson_14_4 = {
  lessonId: "lesson-14-4",
  moduleId: "module-14",
  order: 4,
  title: "Practice: a useful Telegram bot",

  learningObjectives: [
    "Build a bot with several commands and buttons",
    "Connect an external HTTP API (exchange rate or weather)",
    "Log errors without leaking a stack trace to the user",
    "Write a README with run instructions"
  ],

  prerequisites: ["lesson-14-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Assistant bot architecture",
        content: `A typical **learning bot** from module 14:

\`\`\`
main.py          # Application, handlers, run_polling
.env             # TELEGRAM_BOT_TOKEN (not in git)
requirements.txt # python-telegram-bot, requests, python-dotenv
README.md        # how to run
\`\`\`

**Minimum functionality:**

| Command / button | Action |
|------------------|-----|
| /start | Greeting + show menu |
| /help | List of capabilities |
| "USD Rate" | GET to a public API (NBU, exchangerate.host) |
| "Remind …" | Save text in user_data, reply with confirmation |

Split **handlers** by responsibility: \`handlers/commands.py\`, \`handlers/menu.py\` - optional, but convenient for the README.`
      },
      {
        title: "Connecting an external API",
        content: `\`\`\`python
import requests

async def fetch_usd_rate() -> str:
    url = "https://api.exchangerate.host/latest?base=USD&symbols=UAH"
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        data = r.json()
        rate = data["rates"]["UAH"]
        return f"1 USD ≈ {rate:.2f} UAH"
    except requests.RequestException:
        raise RuntimeError("Exchange rate service is temporarily unavailable")
\`\`\`

In the handler:

\`\`\`python
async def on_usd_button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        text = await asyncio.to_thread(fetch_usd_rate)
        await update.message.reply_text(text)
    except RuntimeError as e:
        await update.message.reply_text(str(e))
\`\`\`

\`asyncio.to_thread\` - so you do not block the event loop during \`requests\` (important in v21).

**Alternative:** \`httpx\` with an async client - for a deeper level.`
      },
      {
        title: "Reminders via user_data",
        content: `\`\`\`python
async def remind_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    context.user_data["step"] = "await_reminder"
    await update.message.reply_text("Write the reminder text:")

async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if context.user_data.get("step") == "await_reminder":
        note = update.message.text
        context.user_data["reminders"] = context.user_data.get("reminders", [])
        context.user_data["reminders"].append(note)
        context.user_data.pop("step", None)
        await update.message.reply_text(f"Saved: {note}")
        return
    # other buttons...
\`\`\`

Full reminders with a timer need PTB **JobQueue** or a separate scheduler - for the course, in-memory storage is enough (data disappears after restart - normal for a demo).`
      },
      {
        title: "Logging and error UX",
        content: `\`\`\`python
import logging
logger = logging.getLogger(__name__)

async def on_usd_button(update, context):
    try:
        text = await asyncio.to_thread(fetch_usd_rate)
    except Exception as e:
        logger.exception("USD rate failed")
        await update.message.reply_text(
            "Could not get the rate. Please try later."
        )
        return
    await update.message.reply_text(text)
\`\`\`

**Do not show** the user a \`traceback\`, SQL, tokens, or internal URLs.

**README should include:**

1. Python 3.10+
2. \`pip install -r requirements.txt\`
3. A \`.env.example\` without a real token
4. \`python main.py\`
5. A screenshot or description: message the bot /start`
      },
      {
        title: "Checklist before submission",
        content: `- [ ] Token only in .env
- [ ] At least 3 commands (/start, /help, one more)
- [ ] One button with a real HTTP request
- [ ] try/except around the network
- [ ] Bot replies in a private chat with you
- [ ] README with run steps

Next, module 15 - **FastAPI** and webhook instead of polling for deployment.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Handler structure",
      code: `app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("help", help_cmd))
app.add_handler(CommandHandler("menu", menu))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))`,
      explanation: "Commands are registered before general text."
    }
  ],

  commonMistakes: [
    {
      mistake: "Showing the user a full traceback",
      explanation: "Confusion and risk of leaking details.",
      correctApproach: "Short clear message in English + logger.exception."
    },
    {
      mistake: "Blocking the event loop with sync requests in an async handler",
      explanation: "The bot freezes for other users.",
      correctApproach: "asyncio.to_thread or httpx async."
    },
    {
      mistake: "Committing .env to git",
      explanation: "Token leak.",
      correctApproach: ".env.example + .gitignore."
    }
  ],

  summary: `The final Telegram project combines handlers, a Reply menu, user_data, and an HTTP API with proper error handling and run documentation.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "API errors should be shown to the user as a stack trace.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - a short clear message without technical details."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should you store the token in a submission project?",
        options: [".env (not in git)", "main.py constant", "README", "photo.png"],
        correctAnswer: 0,
        explanation: "Secrets only in the environment."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should you add to the README?",
        options: [
          "Python version, pip install, .env.example, run command",
          "The full bot token",
          "Gmail password",
          "Only emoji"
        ],
        correctAnswer: 0,
        explanation: "Run instructions without secrets."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why asyncio.to_thread for requests in an async bot?",
        options: [
          "So you do not block the event loop",
          "To speed up the Telegram API",
          "BotFather requires it",
          "It replaces .env"
        ],
        correctAnswer: 0,
        explanation: "Sync I/O in an async handler blocks other updates."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How many commands does the project checklist ask for at minimum?",
        options: ["3", "1", "10", "0"],
        correctAnswer: 0,
        explanation: "For example /start, /help, and one more useful command."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
