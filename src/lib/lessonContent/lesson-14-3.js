/**
 * Команди, клавіатури та стан діалогу
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_3 = {
  lessonId: "lesson-14-3",
  moduleId: "module-14",
  order: 3,
  title: "Команди, клавіатури та стан діалогу",

  learningObjectives: [
    "Додавати кастомні команди /help, /menu",
    "Створювати ReplyKeyboardMarkup",
    "Зберігати дані в context.user_data",
    "Обробляти натискання кнопок"
  ],

  prerequisites: ["lesson-14-2"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Клавіатура",
            "content": "```python\nfrom telegram import ReplyKeyboardMarkup\n\nasync def menu(update, context):\n    kb = [[\"Погода\", \"Курс USD\"], [\"Допомога\"]]\n    markup = ReplyKeyboardMarkup(kb, resize_keyboard=True)\n    await update.message.reply_text(\"Обери дію:\", reply_markup=markup)\n```\n\n**context.user_data** - словник для кроків діалогу (наприклад, очікування міста)."
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Бот отримує меню з кнопками та зберігає стан користувача.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де зберігати тимчасові дані сесії користувача?",
        options: ["context.user_data","globals()","print()","sys.argv"],
        correctAnswer: 0,
        explanation: "user_data - стандартне сховище на чат."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
