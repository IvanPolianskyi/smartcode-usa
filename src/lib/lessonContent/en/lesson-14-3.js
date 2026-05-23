/**
 * Commands, keyboards, and dialog state
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_3 = {
  lessonId: "lesson-14-3",
  moduleId: "module-14",
  order: 3,
  title: "Commands, keyboards, and dialog state",

  learningObjectives: [
    "Add custom commands /help, /menu",
    "Build ReplyKeyboardMarkup",
    "Store data in context.user_data",
    "Handle button presses"
  ],

  prerequisites: ["lesson-14-2"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Keyboard",
            "content": "```python\nfrom telegram import ReplyKeyboardMarkup\n\nasync def menu(update, context):\n    kb = [[\"Weather\", \"USD rate\"], [\"Help\"]]\n    markup = ReplyKeyboardMarkup(kb, resize_keyboard=True)\n    await update.message.reply_text(\"Choose an action:\", reply_markup=markup)\n```\n\nUse **context.user_data** for multi-step flows (e.g. waiting for a city name)."
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "The bot shows a button menu and keeps per-user state.",

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should you store temporary user session data?",
        options: ["context.user_data","globals()","print()","sys.argv"],
        correctAnswer: 0,
        explanation: "user_data is the standard per-chat store."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
