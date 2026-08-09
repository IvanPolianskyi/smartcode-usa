/**
 * Lesson 14-4: Практика: корисний Telegram-бот
 * Full educational content (theory + existing project brief)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_4 = {
  lessonId: "lesson-14-4",
  moduleId: "module-14",
  order: 4,
  title: "Практика: корисний Telegram-бот",

  learningObjectives: [
    "Зібрати бота з кількох команд та кнопок",
    "Підключити зовнішнє HTTP API (курс валют або погода)",
    "Логувати помилки без витоку stack trace користувачу",
    "Оформити README з інструкцією запуску"
  ],

  prerequisites: ["lesson-14-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Архітектура бота-асистента",
        content: `Типовий **навчальний бот** з модуля 14:

\`\`\`
main.py          # Application, handlers, run_polling
.env             # TELEGRAM_BOT_TOKEN (не в git)
requirements.txt # python-telegram-bot, requests, python-dotenv
README.md        # як запустити
\`\`\`

**Мінімальний функціонал:**

| Команда / кнопка | Дія |
|------------------|-----|
| /start | Привітання + показати меню |
| /help | Список можливостей |
| «Курс USD» | GET до публічного API (НБУ, exchangerate.host) |
| «Нагадати …» | Зберегти текст у user_data, відповісти підтвердженням |

Розділяйте **handlers** за відповідальністю: \`handlers/commands.py\`, \`handlers/menu.py\` - необов'язково, але зручно для README.`
      },
      {
        title: "Підключення зовнішнього API",
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

У handler:

\`\`\`python
async def on_usd_button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        text = await asyncio.to_thread(fetch_usd_rate)
        await update.message.reply_text(text)
    except RuntimeError as e:
        await update.message.reply_text(str(e))
\`\`\`

\`asyncio.to_thread\` - щоб не блокувати event loop під час \`requests\` (у v21 це важливо).

**Альтернатива:** \`httpx\` з async-клієнтом - для поглибленого рівня.`
      },
      {
        title: "Нагадування через user_data",
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
    # інші кнопки...
\`\`\`

Повноцінні нагадування з таймером потребують **JobQueue** PTB або окремого планувальника - для курсу достатньо збереження в пам'яті (після перезапуску дані зникнуть - це нормально для демо).`
      },
      {
        title: "Логування та UX помилок",
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

**Не показуйте** користувачу \`traceback\`, SQL, токени, внутрішні URL.

**README має містити:**

1. Python 3.10+
2. \`pip install -r requirements.txt\`
3. Приклад \`.env.example\` без реального токена
4. \`python main.py\`
5. Скрін або опис: написати боту /start`
      },
      {
        title: "Чеклист перед здачею",
        content: `- [ ] Токен лише в .env
- [ ] Мінімум 3 команди (/start, /help, ще одна)
- [ ] Одна кнопка з реальним HTTP-запитом
- [ ] try/except навколо мережі
- [ ] Бот відповідає в приватному чаті з вами
- [ ] README з кроками запуску

Далі модуль 15 - **FastAPI** і webhook замість polling для деплою.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Структура handlers",
      code: `app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("help", help_cmd))
app.add_handler(CommandHandler("menu", menu))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))`,
      explanation: "Команди зареєстровані перед загальним текстом."
    }
  ],

  commonMistakes: [
    {
      mistake: "Показувати користувачу повний traceback",
      explanation: "Плутанина та ризик витоку деталей.",
      correctApproach: "Коротке повідомлення українською + logger.exception."
    },
    {
      mistake: "Блокувати event loop синхронним requests у async handler",
      explanation: "Бот «зависає» для інших користувачів.",
      correctApproach: "asyncio.to_thread або httpx async."
    },
    {
      mistake: "Комітити .env у git",
      explanation: "Витік токена.",
      correctApproach: ".env.example + .gitignore."
    }
  ],

  summary: `Фінальний Telegram-проєкт поєднує handlers, Reply-меню, user_data та HTTP API з коректною обробкою помилок і документацією запуску.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Помилки API варто показувати користувачу як stack trace.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - коротке зрозуміле повідомлення без технічних деталей."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де зберігати токен у проєкті для здачі?",
        options: [".env (не в git)", "main.py константа", "README", "photo.png"],
        correctAnswer: 0,
        explanation: "Секрети тільки в оточенні."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що варто додати в README?",
        options: [
          "Версія Python, pip install, .env.example, команда запуску",
          "Повний токен бота",
          "Пароль від Gmail",
          "Лише emoji"
        ],
        correctAnswer: 0,
        explanation: "Інструкція запуску без секретів."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому asyncio.to_thread для requests у async боті?",
        options: [
          "Щоб не блокувати event loop",
          "Щоб прискорити Telegram API",
          "Обов'язково вимагає BotFather",
          "Замінює .env"
        ],
        correctAnswer: 0,
        explanation: "Синхронний I/O в async handler блокує інші оновлення."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Мінімум скільки команд просить чеклист проєкту?",
        options: ["3", "1", "10", "0"],
        correctAnswer: 0,
        explanation: "Наприклад /start, /help та ще одна корисна команда."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
