/**
 * Lesson 14-3: Команди, клавіатури та стан діалогу
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_3 = {
  lessonId: "lesson-14-3",
  moduleId: "module-14",
  order: 3,
  title: "Команди, клавіатури та стан діалогу",

  learningObjectives: [
    "Додавати команди /help та /menu",
    "Створювати ReplyKeyboardMarkup",
    "Зберігати стан у context.user_data",
    "Обробляти натискання кнопок клавіатури"
  ],

  prerequisites: ["lesson-14-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Меню команд у Telegram",
        content: `Користувач бачить список команд біля поля вводу, якщо ви задали їх через Bot API або BotFather (\`/setcommands\`).

У коді PTB:

\`\`\`python
from telegram import BotCommand

async def post_init(app):
    await app.bot.set_my_commands([
        BotCommand("start", "Початок роботи"),
        BotCommand("help", "Допомога"),
        BotCommand("menu", "Головне меню"),
    ])

app = Application.builder().token(token).post_init(post_init).build()
\`\`\`

**Handler /help** - короткий текст без клавіатури:

\`\`\`python
async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "/start - старт\\n/menu - кнопки\\n/help - ця довідка"
    )
\`\`\``
      },
      {
        title: "Reply-клавіатура (кнопки під полем вводу)",
        content: `\`\`\`python
from telegram import ReplyKeyboardMarkup, KeyboardButton

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [KeyboardButton("Погода"), KeyboardButton("Курс USD")],
        [KeyboardButton("Допомога")],
    ]
    markup = ReplyKeyboardMarkup(
        keyboard,
        resize_keyboard=True,
        one_time_keyboard=False,
    )
    await update.message.reply_text(
        "Обери дію кнопкою:",
        reply_markup=markup,
    )
\`\`\`

**Параметри:**

- \`resize_keyboard=True\` - компактні кнопки на телефоні
- \`one_time_keyboard=True\` - клавіатура ховається після натискання

Текст кнопки приходить як **звичайне повідомлення** - обробляйте тим самим MessageHandler:

\`\`\`python
async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = update.message.text
    if text == "Курс USD":
        await update.message.reply_text("Запит курсу…")
    elif text == "Погода":
        await update.message.reply_text("Введіть місто:")
        context.user_data["step"] = "await_city"
    else:
        await update.message.reply_text("Натисніть /menu")
\`\`\``
      },
      {
        title: "context.user_data - стан діалогу",
        content: `\`context.user_data\` - словник **на одного користувача в цьому чаті**. Зручно для кроків «запитали місто → чекаємо відповідь».

\`\`\`python
async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    step = context.user_data.get("step")

    if step == "await_city":
        city = update.message.text
        context.user_data.pop("step", None)
        await update.message.reply_text(f"Погода для {city}: …")
        return

    if update.message.text == "Погода":
        context.user_data["step"] = "await_city"
        await update.message.reply_text("Яке місто?")
        return
\`\`\`

**Не плутати:**

| Сховище | Область |
|---------|---------|
| \`user_data\` | Один user + chat |
| \`chat_data\` | Увесь чат (група) |
| \`bot_data\` | Глобально для бота |

Для навчального бота достатньо \`user_data\`.`
      },
      {
        title: "Inline-кнопки (коротко)",
        content: `**Reply** - кнопки замість клавіатури (текст у чат). **Inline** - кнопки під повідомленням, callback не видно в полі вводу:

\`\`\`python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

async def rates(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    kb = InlineKeyboardMarkup([
        [InlineKeyboardButton("USD", callback_data="cur_usd")],
        [InlineKeyboardButton("EUR", callback_data="cur_eur")],
    ])
    await update.message.reply_text("Оберіть валюту:", reply_markup=kb)
\`\`\`

Обробник:

\`\`\`python
from telegram.ext import CallbackQueryHandler

async def on_button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    if query.data == "cur_usd":
        await query.edit_message_text("USD: 41.2")
\`\`\`

\`CallbackQueryHandler(on_button)\` - для проєкту в 14-4 можна поєднати Reply + Inline.`
      },
      {
        title: "Прибрати клавіатуру",
        content: `\`\`\`python
from telegram import ReplyKeyboardRemove

await update.message.reply_text(
    "Діалог завершено.",
    reply_markup=ReplyKeyboardRemove(),
)
\`\`\`

Корисно після сценарію «опитування», щоб не залишати старі кнопки.`
      },
      {
        title: "Підсумок",
        content: `Команди - CommandHandler + set_my_commands. Reply-клавіатура - ReplyKeyboardMarkup; натискання = текст. Стан кроків - \`context.user_data['step']\`. Далі - збір повноцінного бота-асистента (14-4).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Меню з двома рядками",
      code: `kb = [[KeyboardButton("A"), KeyboardButton("B")],
      [KeyboardButton("Допомога")]]
markup = ReplyKeyboardMarkup(kb, resize_keyboard=True)`,
      explanation: "Список списків - рядки кнопок."
    },
    {
      title: "Крок await_city",
      code: `context.user_data["step"] = "await_city"
# у on_text перевіряємо step і скидаємо pop`,
      explanation: "Простий state machine без окремої бібліотеки."
    }
  ],

  commonMistakes: [
    {
      mistake: "Чекати callback_data від Reply-кнопки",
      explanation: "Reply надсилає текст, не callback.",
      correctApproach: "Порівнюйте update.message.text з міткою кнопки."
    },
    {
      mistake: "Зберігати все в глобальній змінній",
      explanation: "Кроки різних користувачів змішаються.",
      correctApproach: "context.user_data для кожного чату/користувача."
    },
    {
      mistake: "Не викликати query.answer() для Inline",
      explanation: "Telegram показує «годинник» на кнопці.",
      correctApproach: "await query.answer() на початку callback handler."
    },
    {
      mistake: "Забути CommandHandler для /menu",
      explanation: "Користувач пише /menu текстом - потрібен окремий handler.",
      correctApproach: "CommandHandler('menu', menu) + кнопка «Меню» за бажанням."
    }
  ],

  summary: `Команди оформлюють через BotCommand. ReplyKeyboardMarkup дає кнопки внизу; стан діалогу - у user_data. Inline-кнопки - через CallbackQueryHandler.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де зберігати тимчасові дані сесії одного користувача?",
        options: ["context.user_data", "globals()", "sys.argv", "open('state.txt')"],
        correctAnswer: 0,
        explanation: "user_data - стандартне сховище PTB на user+chat."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що приходить у бот при натисканні Reply-кнопки «Погода»?",
        options: [
          "Звичайне повідомлення з текстом «Погода»",
          "callback_data=pogoda",
          "Тільки update без message",
          "Файл .json"
        ],
        correctAnswer: 0,
        explanation: "Reply Keyboard = текст у message.text."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який клас створює кнопки під полем вводу?",
        options: [
          "ReplyKeyboardMarkup",
          "InlineKeyboardMarkup",
          "ForceReply",
          "KeyboardRemove only"
        ],
        correctAnswer: 0,
        explanation: "Reply - під полем вводу; Inline - під повідомленням."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить resize_keyboard=True?",
        options: [
          "Підганяє висоту кнопок під екран",
          "Видаляє клавіатуру",
          "Робить кнопки inline",
          "Шифрує токен"
        ],
        correctAnswer: 0,
        explanation: "Компактніша клавіатура на мобільних."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Для Inline-кнопок обов'язково викликати await query.answer().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - інакше клієнт Telegram «висить» на натисканні."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
