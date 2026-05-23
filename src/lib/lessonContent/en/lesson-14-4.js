/**
 * Practice: a useful Telegram bot
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_14_4 = {
  lessonId: "lesson-14-4",
  moduleId: "module-14",
  order: 4,
  title: "Practice: a useful Telegram bot",

  learningObjectives: [
    "Combine multiple commands in one bot",
    "Call an external API (FX rate or weather)",
    "Log errors properly",
    "Write a README with run instructions"
  ],

  prerequisites: ["lesson-14-3"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Project idea",
            "content": "Build an **assistant bot**:\n- /start, /help\n- \"USD rate\" button - requests to a public exchange API\n- \"Remind me\" - stores text in user_data\n\nWrap HTTP calls in `try/except` and reply with a friendly error message."
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "The capstone Telegram project combines handlers, keyboards, and HTTP.",

  practiceTask: {
    "title": "Assistant bot",
    "description": "Implement at least 3 commands and one API-powered button.",
    "hints": [
      "Use .env for the token",
      "Test in a private chat first"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You should show users full API stack traces.",
        options: ["True","False"],
        correctAnswer: 1,
        explanation: "False - use short human-readable errors."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
