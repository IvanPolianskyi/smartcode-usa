/**
 * Lesson 14-3: Commands, keyboards, and dialog state
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_3 = {
  lessonId: "lesson-14-3",
  moduleId: "module-14",
  order: 3,
  title: "Commands, keyboards, and dialog state",

  learningObjectives: [
    "Add /help and /menu commands",
    "Create ReplyKeyboardMarkup",
    "Store state in context.user_data",
    "Handle keyboard button presses"
  ],

  prerequisites: ["lesson-14-2"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Command menu in Telegram",
        content: `The user sees a list of commands next to the input field if you set them via the Bot API or BotFather (\`/setcommands\`).

In PTB code:

\`\`\`python
from telegram import BotCommand

async def post_init(app):
    await app.bot.set_my_commands([
        BotCommand("start", "Get started"),
        BotCommand("help", "Help"),
        BotCommand("menu", "Main menu"),
    ])

app = Application.builder().token(token).post_init(post_init).build()
\`\`\`

**/help handler** - short text without a keyboard:

\`\`\`python
async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "/start - start\\n/menu - buttons\\n/help - this help"
    )
\`\`\``
      },
      {
        title: "Reply keyboard (buttons under the input field)",
        content: `\`\`\`python
from telegram import ReplyKeyboardMarkup, KeyboardButton

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [KeyboardButton("Weather"), KeyboardButton("USD Rate")],
        [KeyboardButton("Help")],
    ]
    markup = ReplyKeyboardMarkup(
        keyboard,
        resize_keyboard=True,
        one_time_keyboard=False,
    )
    await update.message.reply_text(
        "Choose an action with a button:",
        reply_markup=markup,
    )
\`\`\`

**Parameters:**

- \`resize_keyboard=True\` - compact buttons on a phone
- \`one_time_keyboard=True\` - keyboard hides after a press

The button text arrives as a **regular message** - handle it with the same MessageHandler:

\`\`\`python
async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = update.message.text
    if text == "USD Rate":
        await update.message.reply_text("Fetching the rate…")
    elif text == "Weather":
        await update.message.reply_text("Enter a city:")
        context.user_data["step"] = "await_city"
    else:
        await update.message.reply_text("Press /menu")
\`\`\``
      },
      {
        title: "context.user_data - dialog state",
        content: `\`context.user_data\` is a dictionary **per user in this chat**. Handy for steps like "asked for a city → waiting for a reply".

\`\`\`python
async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    step = context.user_data.get("step")

    if step == "await_city":
        city = update.message.text
        context.user_data.pop("step", None)
        await update.message.reply_text(f"Weather for {city}: …")
        return

    if update.message.text == "Weather":
        context.user_data["step"] = "await_city"
        await update.message.reply_text("Which city?")
        return
\`\`\`

**Do not confuse:**

| Store | Scope |
|---------|---------|
| \`user_data\` | One user + chat |
| \`chat_data\` | Whole chat (group) |
| \`bot_data\` | Global for the bot |

For a learning bot, \`user_data\` is enough.`
      },
      {
        title: "Inline buttons (briefly)",
        content: `**Reply** - buttons instead of the keyboard (text into the chat). **Inline** - buttons under a message; the callback is not visible in the input field:

\`\`\`python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

async def rates(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    kb = InlineKeyboardMarkup([
        [InlineKeyboardButton("USD", callback_data="cur_usd")],
        [InlineKeyboardButton("EUR", callback_data="cur_eur")],
    ])
    await update.message.reply_text("Choose a currency:", reply_markup=kb)
\`\`\`

Handler:

\`\`\`python
from telegram.ext import CallbackQueryHandler

async def on_button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    if query.data == "cur_usd":
        await query.edit_message_text("USD: 41.2")
\`\`\`

\`CallbackQueryHandler(on_button)\` - for the project in 14-4 you can combine Reply + Inline.`
      },
      {
        title: "Remove the keyboard",
        content: `\`\`\`python
from telegram import ReplyKeyboardRemove

await update.message.reply_text(
    "Dialog finished.",
    reply_markup=ReplyKeyboardRemove(),
)
\`\`\`

Useful after a "survey" scenario so old buttons do not linger.`
      },
      {
        title: "Summary",
        content: `Commands - CommandHandler + set_my_commands. Reply keyboard - ReplyKeyboardMarkup; presses = text. Step state - \`context.user_data['step']\`. Next - building a full assistant bot (14-4).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Menu with two rows",
      code: `kb = [[KeyboardButton("A"), KeyboardButton("B")],
      [KeyboardButton("Help")]]
markup = ReplyKeyboardMarkup(kb, resize_keyboard=True)`,
      explanation: "A list of lists - rows of buttons."
    },
    {
      title: "await_city step",
      code: `context.user_data["step"] = "await_city"
# in on_text check step and clear with pop`,
      explanation: "A simple state machine without a separate library."
    }
  ],

  commonMistakes: [
    {
      mistake: "Waiting for callback_data from a Reply button",
      explanation: "Reply sends text, not a callback.",
      correctApproach: "Compare update.message.text with the button label."
    },
    {
      mistake: "Storing everything in a global variable",
      explanation: "Steps from different users get mixed up.",
      correctApproach: "context.user_data for each chat/user."
    },
    {
      mistake: "Not calling query.answer() for Inline",
      explanation: "Telegram shows a loading clock on the button.",
      correctApproach: "await query.answer() at the start of the callback handler."
    },
    {
      mistake: "Forgetting CommandHandler for /menu",
      explanation: "The user types /menu as text - a separate handler is needed.",
      correctApproach: "CommandHandler('menu', menu) + optional 'Menu' button."
    }
  ],

  summary: `Commands are set via BotCommand. ReplyKeyboardMarkup gives buttons at the bottom; dialog state lives in user_data. Inline buttons use CallbackQueryHandler.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should you store temporary session data for one user?",
        options: ["context.user_data", "globals()", "sys.argv", "open('state.txt')"],
        correctAnswer: 0,
        explanation: "user_data is the standard PTB store for user+chat."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What arrives in the bot when a Reply button \"Weather\" is pressed?",
        options: [
          "A regular message with the text \"Weather\"",
          "callback_data=pogoda",
          "Only an update without message",
          "A .json file"
        ],
        correctAnswer: 0,
        explanation: "Reply Keyboard = text in message.text."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which class creates buttons under the input field?",
        options: [
          "ReplyKeyboardMarkup",
          "InlineKeyboardMarkup",
          "ForceReply",
          "KeyboardRemove only"
        ],
        correctAnswer: 0,
        explanation: "Reply - under the input field; Inline - under the message."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does resize_keyboard=True do?",
        options: [
          "Fits button height to the screen",
          "Removes the keyboard",
          "Makes buttons inline",
          "Encrypts the token"
        ],
        correctAnswer: 0,
        explanation: "A more compact keyboard on mobile."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "For Inline buttons you must call await query.answer().",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True - otherwise the Telegram client hangs on the press."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
