/**
 * Практика: корисний Telegram-бот
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_14_4 = {
  lessonId: "lesson-14-4",
  moduleId: "module-14",
  order: 4,
  title: "Практика: корисний Telegram-бот",

  learningObjectives: [
    "Зібрати бота з кількох команд",
    "Підключити зовнішнє API (курс валют або погода)",
    "Логувати помилки",
    "Оформити README з інструкцією запуску"
  ],

  prerequisites: ["lesson-14-3"],

  videoUrl: "",

  theory: {
    sections: [
        {
            "title": "Ідея проєкту",
            "content": "Створіть **бота-асистента**:\n- /start, /help\n- Кнопка «Курс USD» - requests до публічного API НБУ або exchangerate\n- Кнопка «Нагадати» - зберігає текст у user_data\n\nДодайте `try/except` навколо HTTP-запитів і відповідайте користувачу зрозумілою помилкою."
        }
    ]
  },

  codeExamples: [],

  commonMistakes: [],

  summary: "Фінальний Telegram-проєкт поєднує handlers, клавіатуру та HTTP.",

  practiceTask: {
    "title": "Бот-асистент",
    "description": "Реалізуйте мінімум 3 команди та одну кнопку з даними з API.",
    "hints": [
      "Використайте .env для токена",
      "Перевірте бота в приватному чаті"
    ]
  },

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Помилки API варто показувати користувачу як stack trace.",
        options: ["True","False"],
        correctAnswer: 1,
        explanation: "False - коротке людське повідомлення без технічних деталей."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
