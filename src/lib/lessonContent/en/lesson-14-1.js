/**
 * Lesson 14-1: Telegram Bot API: token and first requests
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_1 = {
  lessonId: "lesson-14-1",
  moduleId: "module-14",
  order: 1,
  title: "Telegram Bot API: token and first requests",

  learningObjectives: [
    "Create a bot via @BotFather",
    "Store the token in environment variables",
    "Send messages through the HTTP API",
    "Receive updates with getUpdates",
    "Understand the difference between polling and webhook"
  ],

  prerequisites: ["lesson-13-5"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is a Telegram bot",
        content: `A **Telegram bot** is a special account controlled by your code through the **Bot API**, not by a person manually.

**Creating a bot:**

1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Command \`/newbot\` — a display name for people and a **username** (must end with \`bot\`, e.g. \`my_helper_bot\`)
3. BotFather will issue a **token** like \`123456789:AAH...\` — this is the secret key to the API

**BotFather commands you will need:**

- \`/mybots\` — list your bots, change description, avatar
- \`/setcommands\` — command menu in the Telegram client
- \`/revoke\` — revoke the token if it was exposed

**Never publish the token** on GitHub, screenshots, or chats. Whoever has the token has full control of the bot.`
      },
      {
        title: "Storing the token securely",
        content: `A \`.env\` file in the project root (add \`.env\` to \`.gitignore\`):

\`\`\`
TELEGRAM_BOT_TOKEN=123456789:AAHxxxxxxxx
\`\`\`

\`\`\`python
import os
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if not TOKEN:
    raise RuntimeError("Задайте TELEGRAM_BOT_TOKEN у .env")
\`\`\`

\`\`\`bash
pip install python-dotenv requests
\`\`\`

**In production** (hosting, VPS) set the token in the panel as a **secret / environment variable**, not in code.`
      },
      {
        title: "How the Bot API works",
        content: `All methods are **HTTPS requests** to:

\`https://api.telegram.org/bot<TOKEN>/<METHOD>\`

The response is always JSON:

\`\`\`json
{"ok": true, "result": { ... }}
\`\`\`

or on error:

\`\`\`json
{"ok": false, "description": "Bad Request: chat not found"}
\`\`\`

**Key concepts:**

| Term | Meaning |
|--------|----------|
| **chat_id** | Numeric id of a chat (user, group, channel) |
| **Update** | Event: new message, button press, etc. |
| **message** | Message object inside an Update |

**Two ways to receive Updates:**

1. **Polling** — your script periodically calls \`getUpdates\` (simpler for learning)
2. **Webhook** — Telegram sends POST to your HTTPS server (module 15)`
      },
      {
        title: "sendMessage — first message",
        content: `\`\`\`python
import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

def api(method: str, **params):
    url = f"https://api.telegram.org/bot{TOKEN}/{method}"
    r = requests.post(url, json=params, timeout=30)
    r.raise_for_status()
    data = r.json()
    if not data.get("ok"):
        raise RuntimeError(data.get("description", "API error"))
    return data["result"]

# CHAT_ID we get from getUpdates (next section)
CHAT_ID = 123456789

api("sendMessage", chat_id=CHAT_ID, text="Привіт з Python!")
\`\`\`

**Useful sendMessage parameters:**

- \`parse_mode\` — \`"HTML"\` or \`"MarkdownV2"\` for formatting
- \`reply_markup\` — keyboard (lesson 14-3)
- \`disable_notification\` — silent message`
      },
      {
        title: "getUpdates and chat_id",
        content: `**Algorithm for the first test:**

1. Start the bot (send it \`/start\` in Telegram)
2. Call \`getUpdates\`
3. Find \`result[].message.chat.id\`

\`\`\`python
import json

updates = api("getUpdates")
print(json.dumps(updates, indent=2, ensure_ascii=False))

for u in updates:
    msg = u.get("message") or u.get("edited_message")
    if msg:
        chat = msg["chat"]
        print("chat_id:", chat["id"], "ім'я:", chat.get("first_name"))
\`\`\`

**Offset (important for polling):** after processing an update pass \`offset = update_id + 1\` so you do not receive the same update again:

\`\`\`python
last_id = 0
while True:
    updates = api("getUpdates", offset=last_id, timeout=30)
    for u in updates:
        last_id = u["update_id"] + 1
        # process u
\`\`\`

In production the **python-telegram-bot** library (lesson 14-2) does this for you.`
      },
      {
        title: "Other useful API methods",
        content: `\`\`\`python
# Bot info
me = api("getMe")
print(me["username"])

# Remove webhook before polling (if you previously set up webhook)
api("deleteWebhook")

# Set command menu
api("setMyCommands", commands=[
    {"command": "start", "description": "Початок"},
    {"command": "help", "description": "Допомога"},
])
\`\`\`

**Limits (approximate):**

- No more than ~30 messages per second in one chat
- Text length up to 4096 characters
- Files — separate methods (\`sendDocument\`, \`sendPhoto\`)

Full list: [Bot API documentation](https://core.telegram.org/bots/api).`
      },
      {
        title: "Summary",
        content: `You created a bot in BotFather, learned to store the token in \`.env\`, and call \`sendMessage\` and \`getUpdates\` via \`requests\`.

**Next:** lesson 14-2 — python-telegram-bot with async handlers and \`run_polling()\`, without a manual getUpdates loop.`
      }
    ]
  },

  codeExamples: [
    {
      title: "getUpdates",
      code: `import os, requests
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
r = requests.get(
    f"https://api.telegram.org/bot{TOKEN}/getUpdates",
    timeout=30,
)
print(r.json())`,
      explanation: "Shows recent messages from users to the bot — use this to get chat_id."
    },
    {
      title: "api() wrapper",
      code: `def api(method, **params):
    url = f"https://api.telegram.org/bot{TOKEN}/{method}"
    data = requests.post(url, json=params, timeout=30).json()
    if not data.get("ok"):
        raise RuntimeError(data["description"])
    return data["result"]`,
      explanation: "Single place to check ok and handle API errors."
    }
  ],

  commonMistakes: [
    {
      mistake: "Token in code or README",
      explanation: "It ends up in git history forever.",
      correctApproach: "Only .env / secrets; if leaked — /revoke in BotFather."
    },
    {
      mistake: "Calling sendMessage without chat_id",
      explanation: "API returns 'chat not found'.",
      correctApproach: "Run getUpdates first after you message the bot."
    },
    {
      mistake: "Polling without offset",
      explanation: "The same Updates arrive again.",
      correctApproach: "Pass offset = update_id + 1 after each processed update."
    },
    {
      mistake: "Forgetting deleteWebhook before getUpdates",
      explanation: "If webhook is active, getUpdates may be empty.",
      correctApproach: "deleteWebhook, then polling or the PTB library."
    }
  ],

  summary: `Bot API — HTTP JSON to api.telegram.org. Store the BotFather token in .env. sendMessage sends text; getUpdates + offset receives events. Next — python-telegram-bot.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where is it safe to store the bot token?",
        options: ["In a .env file (not in git)", "In README", "In a code comment", "In a variable name in code"],
        correctAnswer: 0,
        explanation: "Secrets belong only in the environment or .env with .gitignore."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method sends text to a user?",
        options: ["sendMessage", "getUpdates", "deleteWebhook", "getMe"],
        correctAnswer: 0,
        explanation: "sendMessage delivers a message to a chat by chat_id."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where do you get chat_id for a private chat with the bot?",
        options: [
          "From getUpdates after you message the bot",
          "From the main.py filename",
          "From pip list",
          "BotFather sends chat_id in /newbot"
        ],
        correctAnswer: 0,
        explanation: "chat_id appears in message.chat.id in the getUpdates response."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why pass offset in getUpdates?",
        options: [
          "To avoid receiving already processed updates",
          "To speed up the internet",
          "To change the token",
          "To enable HTML in messages"
        ],
        correctAnswer: 0,
        explanation: "offset = last_update_id + 1 marks previous Updates as read."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "It is safe to publish the bot token on social media.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False — the token gives full control of the bot; if leaked, revoke it."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
