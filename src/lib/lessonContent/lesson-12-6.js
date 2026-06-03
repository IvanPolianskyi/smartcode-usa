/**
 * Lesson 12-6: Підсумок автоматизації: звіти та email
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_6 = {
  lessonId: "lesson-12-6",
  moduleId: "module-12",
  order: 6,
  title: "Підсумок автоматизації: звіти та email",

  learningObjectives: [
    "Поєднати CSV, PDF та email в один сценарій",
    "Планувати пайплайн звітування",
    "Уникати типових помилок автоматизації",
    "Підготуватися до модуля GUI"
  ],

  prerequisites: ["lesson-12-3", "lesson-12-5"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Пайплайн «дані → звіт → лист»",
        content: `Типова **автоматизація** після модулів 11–12:

\`\`\`
Джерело (CSV / API / БД)
    → обробка в Python
    → PDF (reportlab) або текст
    → вкладення в email (smtplib + MIME)
    → SMTP Gmail / корпоративний сервер
\`\`\`

Кожен крок — окремий урок; разом — **система сповіщень** без ручної роботи.`
      },
      {
        title: "Розклад і надійність",
        content: `**Планувальник** (cron на Linux, Task Scheduler на Windows) запускає скрипт щодня:

\`\`\`bash
# приклад cron: щодня о 8:00
0 8 * * * /usr/bin/python3 /home/user/send_report.py
\`\`\`

**У скрипті:**

- try/except навколо SMTP і запису файлів
- лог у файл \`report.log\`
- секрети лише в .env

При помилці — лист адміну або запис у лог, без падіння без повідомлення.`
      },
      {
        title: "Чеклист якості звіту",
        content: `- [ ] Тема листа з датою
- [ ] Тіло: короткий текст + вкладення PDF/CSV
- [ ] Кодування UTF-8 у CSV
- [ ] Не дублювати одержувачів у To (BCC для масових розсилок — урок 12-2)
- [ ] Тест на своєму email перед продакшеном`
      },
      {
        title: "Що далі в курсі",
        content: `Модуль **13 (Tkinter)** — графічні інтерфейси для локальних утиліт.

Модулі **14–15** — Telegram-боти та **FastAPI** для серверної логіки та webhook.

Навички email і PDF залишаються корисними для сповіщень з бота або API.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Скелет щоденного звіту",
      code: `# 1. read csv → aggregate
# 2. build PDF with reportlab
# 3. send via smtplib + MIMEMultipart
# 4. log success / failure`,
      explanation: "Оркестрація без нових бібліотек — лише поєднання вивченого."
    }
  ],

  commonMistakes: [
    {
      mistake: "Запускати скрипт лише вручну",
      explanation: "Автоматизація не працює без планувальника.",
      correctApproach: "cron / Task Scheduler + перевірка логів."
    },
    {
      mistake: "Вкладення без вказання MIME-типу",
      explanation: "Клієнт може не відкрити PDF.",
      correctApproach: "MIMEApplication для PDF (урок 12-2)."
    }
  ],

  summary: `Модулі 11–12 дають повний ланцюжок документів і email; планувальник перетворює скрипт на щоденний сервіс. Далі — GUI та веб-боти.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який модуль відправляє email у курсі?",
        options: ["smtplib", "requests", "tkinter", "PIL"],
        correctAnswer: 0,
        explanation: "smtplib + email.mime з модулів 12-1–12-2."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Де зберігати пароль SMTP у продакшені?",
        options: ["Змінні оточення / .env", "У README", "У PDF", "У CSV"],
        correctAnswer: 0,
        explanation: "Секрети не в коді та не в git."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Навіщо cron у пайплайні звіту?",
        options: [
          "Запускати скрипт за розкладом",
          "Парсити HTML",
          "Створювати GUI",
          "Компілювати Python"
        ],
        correctAnswer: 0,
        explanation: "Планувальник = автоматичний запуск."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат зручний для архіву таблиці перед PDF?",
        options: ["CSV", "JPEG", "MP3", "ZIP only"],
        correctAnswer: 0,
        explanation: "CSV відкривається в Excel (урок 12-5)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "PDF вкладення в email потребує MIME multipart.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — MIMEMultipart + MIMEApplication (урок 12-2)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
