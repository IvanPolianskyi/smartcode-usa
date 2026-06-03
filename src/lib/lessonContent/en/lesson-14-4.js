/**
 * Lesson 14-4: Practice: useful Telegram bot
 * Full educational content (theory + existing project brief)
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_4 = {
  lessonId: "lesson-14-4",
  moduleId: "module-14",
  order: 4,
  title: "Practice: useful Telegram bot",

  learningObjectives: [
    "Build a bot with several commands and buttons",
    "Connect an external HTTP API (exchange rate or weather)",
    "Log errors without leaking stack traces to users",
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

**Minimum features:**

| Command / button | Action |
|------------------|-----|
| /start | Greeting + show menu |
| /help | List of capabilities |
| «Курс USD» | GET to a public API (NBU, exchangerate.host) |
| «Нагадати …» | Save text in user_data, confirm to user |

Split **handlers** by responsibility: \`handlers/commands.py\`, \`handlers/menu.py\` — optional but handy for the README.`
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
        raise RuntimeError("Сервіс курсу тимчасово недоступний")
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

\`asyncio.to_thread\` — so \`requests\` does not block the event loop (important in v21).

**Alternative:** \`httpx\` with an async client — for advanced level.`
      },
      {
        title: "Reminders via user_data",
        content: `\`\`\`python
async def remind_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    context.user_data["step"] = "await_reminder"
    await update.message.reply_text("Напишіть текст нагадування:")

async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if context.user_data.get("step") == "await_reminder":
        note = update.message.text
        context.user_data["reminders"] = context.user_data.get("reminders", [])
        context.user_data["reminders"].append(note)
        context.user_data.pop("step", None)
        await update.message.reply_text(f"Збережено: {note}")
        return
    # other buttons...
\`\`\`

Full reminders with timers need PTB **JobQueue** or a separate scheduler — for the course, storing in memory is enough (data disappears after restart — fine for a demo).`
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
            "Не вдалося отримати курс. Спробуйте пізніше."
        )
        return
    await update.message.reply_text(text)
\`\`\`

**Do not show** the user \`traceback\`, SQL, tokens, or internal URLs.

**README should include:**

1. Python 3.10+
2. \`pip install -r requirements.txt\`
3. Example \`.env.example\` without a real token
4. \`python main.py\`
5. Screenshot or description: message the bot /start`
      },
      {
        title: "Checklist before submission",
        content: `- [ ] Token only in .env
- [ ] At least 3 commands (/start, /help, and one more)
- [ ] One button with a real HTTP request
- [ ] try/except around network calls
- [ ] Bot responds in a private chat with you
- [ ] README with run steps

Next module 15 — **FastAPI** and webhook instead of polling for deployment.`
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
      explanation: "Commands registered before general text handler."
    }
  ],

  commonMistakes: [
    {
      mistake: "Showing the full traceback to the user",
      explanation: "Confusing and risk of leaking details.",
      correctApproach: "Short user-facing message + logger.exception."
    },
    {
      mistake: "Blocking the event loop with sync requests in async handler",
      explanation: "Bot freezes for other users.",
      correctApproach: "asyncio.to_thread or httpx async."
    },
    {
      mistake: "Committing .env to git",
      explanation: "Token leak.",
      correctApproach: ".env.example + .gitignore."
    }
  ],

  summary: `The final Telegram project combines handlers, Reply menu, user_data, and HTTP API with proper error handling and run documentation.`,

  practiceTask: {
    title: "Assistant bot",
    description: "Implement at least 3 commands and one button that fetches data from a public API.",
    hints: [
      "Use .env for the token",
      "Test the bot in a private chat",
      "Log errors to the console, not to the chat"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "API errors should be shown to the user as a stack trace.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False — a short clear message without technical details."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should the token be stored for project submission?",
        options: [".env (not in git)", "main.py constant", "README", "photo.png"],
        correctAnswer: 0,
        explanation: "Secrets only in the environment."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What should go in the README?",
        options: [
          "Python version, pip install, .env.example, run command",
          "Full bot token",
          "Gmail password",
          "Emoji only"
        ],
        correctAnswer: 0,
        explanation: "Run instructions without secrets."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why asyncio.to_thread for requests in an async bot?",
        options: [
          "To avoid blocking the event loop",
          "To speed up the Telegram API",
          "Required by BotFather",
          "Replaces .env"
        ],
        correctAnswer: 0,
        explanation: "Sync I/O in an async handler blocks other updates."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What is the minimum number of commands in the project checklist?",
        options: ["3", "1", "10", "0"],
        correctAnswer: 0,
        explanation: "For example /start, /help, and one more useful command."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
