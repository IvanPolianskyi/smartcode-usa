/**
 * Telegram Bot API: token and first requests
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
    "Fetch updates with getUpdates"
  ],

  prerequisites: ["lesson-13-5"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "What is a Telegram bot",
            "content": "A Telegram bot is an account controlled by your Python code through the **Bot API**.\n\n**Steps:**\n1. Open @BotFather in Telegram\n2. Run `/newbot` - choose a name and username (must end with `bot`)\n3. Copy the **token** - your secret API key\n\n**Never commit the token to GitHub.** Store it in `.env`:\n\n```\nTELEGRAM_BOT_TOKEN=123456:ABC...\n```"
        },
        {
            "title": "HTTP calls to api.telegram.org",
            "content": "Base URL: `https://api.telegram.org/bot<TOKEN>/METHOD`\n\n**Send a message:**\n\n```python\nimport os\nimport requests\nfrom dotenv import load_dotenv\n\nload_dotenv()\nTOKEN = os.getenv(\"TELEGRAM_BOT_TOKEN\")\nCHAT_ID = 123456789\n\nurl = f\"https://api.telegram.org/bot{TOKEN}/sendMessage\"\npayload = {\"chat_id\": CHAT_ID, \"text\": \"Hello from Python!\"}\nr = requests.post(url, json=payload)\nr.raise_for_status()\nprint(r.json())\n```\n\n**Get chat_id:** message your bot, call `getUpdates`, read `message.chat.id`."
        }
    ]
  },

  codeExamples: [
    {
      "title": "getUpdates",
      "code": "import os, requests\nfrom dotenv import load_dotenv\nload_dotenv()\nTOKEN = os.getenv(\"TELEGRAM_BOT_TOKEN\")\nr = requests.get(f\"https://api.telegram.org/bot{TOKEN}/getUpdates\")\nprint(r.json())",
      "explanation": "Lists recent messages sent to your bot."
    }
  ],

  commonMistakes: [
    {
      "mistake": "Hardcoding the token",
      "explanation": "The token can leak through version control.",
      "correctApproach": "Use os.getenv and add .env to .gitignore"
    }
  ],

  summary: "You created a bot in BotFather and learned sendMessage and getUpdates with requests.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should you store the bot token?",
        options: ["In a .env file","In README","In a code comment","In the variable name"],
        correctAnswer: 0,
        explanation: "Secrets belong in environment variables only."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method sends text to a user?",
        options: ["sendMessage","getUpdates","deleteWebhook","setWebhook"],
        correctAnswer: 0,
        explanation: "sendMessage delivers a message to a chat."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "It is safe to publish your bot token online.",
        options: ["True","False"],
        correctAnswer: 1,
        explanation: "False - anyone with the token controls your bot."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
