/**
 * Telegram Bot API: токен і перші запити
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_1 = {
  lessonId: "lesson-14-1",
  moduleId: "module-14",
  order: 1,
  title: "Telegram Bot API: токен і перші запити",

  learningObjectives: [
    "Створити бота через @BotFather",
    "Зберігати токен у змінних оточення",
    "Надсилати повідомлення через HTTP API",
    "Отримувати оновлення getUpdates"
  ],

  prerequisites: ["lesson-13-5"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Що таке Telegram-бот",
            "content": "Telegram-бот - це звичайний акаунт, яким керує ваш Python-код через **Bot API**.\n\n**Кроки:**\n1. Відкрийте @BotFather у Telegram\n2. Команда `/newbot` - ім'я та username (закінчується на `bot`)\n3. Отримайте **токен** - секретний ключ API\n\n**Ніколи не публікуйте токен у GitHub!** Зберігайте в `.env`:\n\n```\nTELEGRAM_BOT_TOKEN=123456:ABC...\n```"
        },
        {
            "title": "HTTP-запити до api.telegram.org",
            "content": "Базова URL: `https://api.telegram.org/bot<TOKEN>/METHOD`\n\n**Надіслати повідомлення:**\n\n```python\nimport os\nimport requests\nfrom dotenv import load_dotenv\n\nload_dotenv()\nTOKEN = os.getenv(\"TELEGRAM_BOT_TOKEN\")\nCHAT_ID = 123456789  # ваш chat_id\n\nurl = f\"https://api.telegram.org/bot{TOKEN}/sendMessage\"\npayload = {\"chat_id\": CHAT_ID, \"text\": \"Привіт з Python!\"}\nr = requests.post(url, json=payload)\nr.raise_for_status()\nprint(r.json())\n```\n\n**Отримати chat_id:** напишіть боту, потім викличте `getUpdates` і знайдіть `message.chat.id`."
        }
    ]
  },

  codeExamples: [
    {
      "title": "getUpdates",
      "code": "import os, requests\nfrom dotenv import load_dotenv\nload_dotenv()\nTOKEN = os.getenv(\"TELEGRAM_BOT_TOKEN\")\nr = requests.get(f\"https://api.telegram.org/bot{TOKEN}/getUpdates\")\nprint(r.json())",
      "explanation": "Показує останні повідомлення користувачів боту."
    }
  ],

  commonMistakes: [
    {
      "mistake": "Токен у коді замість .env",
      "explanation": "Токен потрапить у репозиторій.",
      "correctApproach": "Використовуйте os.getenv та .gitignore для .env"
    }
  ],

  summary: "Ви створили бота в BotFather, навчилися викликати sendMessage та getUpdates через requests.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де безпечно зберігати токен бота?",
        options: ["У .env файлі","У README","У коментарі коду","У назві змінної"],
        correctAnswer: 0,
        explanation: "Токен має бути лише в секретах оточення."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод надсилає текст користувачу?",
        options: ["sendMessage","getUpdates","deleteWebhook","setWebhook"],
        correctAnswer: 0,
        explanation: "sendMessage відправляє повідомлення в чат."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Токен бота можна публікувати в соцмережах.",
        options: ["True","False"],
        correctAnswer: 1,
        explanation: "False - токен дає повний контроль над ботом."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
