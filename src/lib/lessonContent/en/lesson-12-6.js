/**
 * Lesson 12-6: Automation Recap: Reports and Email
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_6 = {
  lessonId: "lesson-12-6",
  moduleId: "module-12",
  order: 6,
  title: "Automation Recap: Reports and Email",

  learningObjectives: [
    "Combine CSV, PDF, and email in one workflow",
    "Plan a reporting pipeline",
    "Avoid common automation mistakes",
    "Prepare for the GUI module"
  ],

  prerequisites: ["lesson-12-3", "lesson-12-5"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Pipeline: data → report → email",
        content: `Typical **automation** after modules 11–12:

\`\`\`
Source (CSV / API / DB)
    → processing in Python
    → PDF (reportlab) or text
    → email attachment (smtplib + MIME)
    → SMTP Gmail / corporate server
\`\`\`

Each step is a separate lesson; together they form a **notification system** without manual work.`
      },
      {
        title: "Scheduling and reliability",
        content: `A **scheduler** (cron on Linux, Task Scheduler on Windows) runs the script daily:

\`\`\`bash
# приклад cron: щодня о 8:00
0 8 * * * /usr/bin/python3 /home/user/send_report.py
\`\`\`

**In the script:**

- try/except around SMTP and file writes
- log to \`report.log\`
- secrets only in .env

On error — email the admin or write to the log, without failing silently.`
      },
      {
        title: "Report quality checklist",
        content: `- [ ] Subject line with date
- [ ] Body: short text + PDF/CSV attachment
- [ ] UTF-8 encoding in CSV
- [ ] Do not duplicate recipients in To (BCC for bulk mailings — lesson 12-2)
- [ ] Test on your own email before production`
      },
      {
        title: "What's next in the course",
        content: `Module **13 (Tkinter)** — graphical interfaces for local utilities.

Modules **14–15** — Telegram bots and **FastAPI** for server logic and webhooks.

Email and PDF skills remain useful for notifications from a bot or API.`
      }
    ]
  },

  codeExamples: [
    {
      title: "Daily report skeleton",
      code: `# 1. read csv → aggregate
# 2. build PDF with reportlab
# 3. send via smtplib + MIMEMultipart
# 4. log success / failure`,
      explanation: "Orchestration without new libraries — just combining what you learned."
    }
  ],

  commonMistakes: [
    {
      mistake: "Running the script only manually",
      explanation: "Automation does not work without a scheduler.",
      correctApproach: "cron / Task Scheduler + log monitoring."
    },
    {
      mistake: "Attachment without specifying MIME type",
      explanation: "The client may not open the PDF.",
      correctApproach: "MIMEApplication for PDF (lesson 12-2)."
    }
  ],

  summary: `Modules 11–12 provide a full document and email chain; a scheduler turns the script into a daily service. Next — GUI and web bots.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which module sends email in this course?",
        options: ["smtplib", "requests", "tkinter", "PIL"],
        correctAnswer: 0,
        explanation: "smtplib + email.mime from modules 12-1–12-2."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Where should the SMTP password be stored in production?",
        options: ["Environment variables / .env", "In README", "In PDF", "In CSV"],
        correctAnswer: 0,
        explanation: "Secrets not in code or git."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is cron used in a report pipeline?",
        options: [
          "Run the script on a schedule",
          "Parse HTML",
          "Create a GUI",
          "Compile Python"
        ],
        correctAnswer: 0,
        explanation: "Scheduler = automatic execution."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which format is convenient for archiving a table before PDF?",
        options: ["CSV", "JPEG", "MP3", "ZIP only"],
        correctAnswer: 0,
        explanation: "CSV opens in Excel (lesson 12-5)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "PDF attachments in email require MIME multipart.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True — MIMEMultipart + MIMEApplication (lesson 12-2)."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
