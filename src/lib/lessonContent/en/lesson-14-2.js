/**
 * python-telegram-bot library: echo bot
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_2 = {
  lessonId: "lesson-14-2",
  moduleId: "module-14",
  order: 2,
  title: "python-telegram-bot library: echo bot",

  learningObjectives: [
    "Install python-telegram-bot",
    "Configure Application and polling",
    "Handle the /start command",
    "Echo user text"
  ],

  prerequisites: ["lesson-14-1"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Installation",
            "content": "```bash\npip install python-telegram-bot\n```\n\nWe use **v21+** with the async API."
        },
        {
            "title": "Minimal bot",
            "content": "```python\nimport os\nfrom dotenv import load_dotenv\nfrom telegram import Update\nfrom telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\nload_dotenv()\n\nasync def start(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    await update.message.reply_text(\"Hi! Send me any text.\")\n\nasync def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    await update.message.reply_text(update.message.text)\n\ndef main():\n    app = Application.builder().token(os.getenv(\"TELEGRAM_BOT_TOKEN\")).build()\n    app.add_handler(CommandHandler(\"start\", start))\n    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))\n    app.run_polling()\n\nif __name__ == \"__main__\":\n    main()\n```"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "An echo bot with /start runs via polling without manual getUpdates.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does run_polling() do?",
        options: ["Periodically fetches new updates","Sends email","Creates a GUI","Compiles code"],
        correctAnswer: 0,
        explanation: "Polling retrieves updates from Telegram."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
