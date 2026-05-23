/**
 * Бібліотека python-telegram-bot: echo-бот
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_2 = {
  lessonId: "lesson-14-2",
  moduleId: "module-14",
  order: 2,
  title: "Бібліотека python-telegram-bot: echo-бот",

  learningObjectives: [
    "Встановити python-telegram-bot",
    "Налаштувати Application та polling",
    "Обробляти команду /start",
    "Повторювати текст користувача"
  ],

  prerequisites: ["lesson-14-1"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Встановлення",
            "content": "```bash\npip install python-telegram-bot\n```\n\nВикористовуємо **v21+** з async API."
        },
        {
            "title": "Мінімальний бот",
            "content": "```python\nimport os\nfrom dotenv import load_dotenv\nfrom telegram import Update\nfrom telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\nload_dotenv()\n\nasync def start(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    await update.message.reply_text(\"Привіт! Напиши мені текст.\")\n\nasync def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):\n    await update.message.reply_text(update.message.text)\n\ndef main():\n    app = Application.builder().token(os.getenv(\"TELEGRAM_BOT_TOKEN\")).build()\n    app.add_handler(CommandHandler(\"start\", start))\n    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))\n    app.run_polling()\n\nif __name__ == \"__main__\":\n    main()\n```"
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Echo-бот з /start працює через polling без ручних getUpdates.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить run_polling()?",
        options: ["Періодично запитує нові повідомлення","Відправляє email","Створює GUI","Компілює код"],
        correctAnswer: 0,
        explanation: "Polling отримує оновлення від Telegram."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
