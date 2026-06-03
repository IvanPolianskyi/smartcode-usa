/**
 * Lesson 12-5: Working with CSV Files
 * Full educational content (supplementary lesson)
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_5 = {
  lessonId: "lesson-12-5",
  moduleId: "module-12",
  order: 5,
  title: "Working with CSV Files",

  learningObjectives: [
    "Understand the CSV format",
    "Read and write CSV using the csv module",
    "Handle utf-8 encoding",
    "Prepare data for email and PDF reports"
  ],

  prerequisites: ["lesson-12-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is CSV",
        content: `**CSV (Comma-Separated Values)** — a text-based tabular format: rows = records, commas (or \`;\`) = column separators.

**Where it is used:**

- Export from Excel / Google Sheets
- Logs and reports
- Data for automation scripts

**Built-in module** \`csv\` — no pip required:

\`\`\`python
import csv
\`\`\`

The first row is often **column headers**.`
      },
      {
        title: "Reading CSV",
        content: `\`\`\`python
import csv

with open("sales.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["product"], row["amount"])
\`\`\`

\`DictReader\` returns each row as a **dictionary** — convenient access by column name.

**Regular reader** (lists):

\`\`\`python
with open("data.csv", newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        print(row)  # list of values
\`\`\`

**Encoding:** on Windows, \`utf-8-sig\` is often needed (BOM from Excel):

\`\`\`python
open("file.csv", encoding="utf-8-sig")
\`\`\``
      },
      {
        title: "Writing CSV",
        content: `\`\`\`python
import csv

rows = [
    {"name": "Товар A", "qty": 10},
    {"name": "Товар B", "qty": 5},
]

with open("out.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "qty"])
    writer.writeheader()
    writer.writerows(rows)
\`\`\`

\`newline=""\` — required when writing CSV in Python 3 (otherwise extra blank lines appear).`
      },
      {
        title: "Connection with email and PDF",
        content: `Typical report pipeline:

1. Collect data → list of dictionaries
2. Save **CSV** for archiving
3. With **reportlab** (lesson 11) — PDF for the manager
4. Via **smtplib** (lesson 12) — send PDF as an attachment

CSV is an intermediate format that opens in Excel without additional code.`
      },
      {
        title: "Summary",
        content: `csv.DictReader / DictWriter — the standard for tabular data. Always specify encoding and newline="". Next — report automation recap (lesson 12-6).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Summing values from CSV",
      code: `import csv
total = 0
with open("sales.csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        total += float(row["amount"])
print(total)`,
      explanation: "DictReader gives access to columns by name."
    }
  ],

  commonMistakes: [
    {
      mistake: "Forgetting encoding=utf-8",
      explanation: "Cyrillic text turns into garbled characters.",
      correctApproach: "utf-8 or utf-8-sig for files from Excel."
    },
    {
      mistake: "Missing newline='' when writing",
      explanation: "Double line breaks appear.",
      correctApproach: "open(..., newline='') with csv.writer."
    }
  ],

  summary: `CSV — simple exchange of tabular data; the csv module reads and writes rows for reports and automation.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which Python module reads CSV without installation?",
        options: ["csv", "pandas only", "openpyxl", "json"],
        correctAnswer: 0,
        explanation: "csv is part of the standard library."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does csv.DictReader return for each row?",
        options: ["dict", "tuple only", "set", "bytes"],
        correctAnswer: 0,
        explanation: "Keys are column names from the header."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which open() parameter is important when writing CSV on Windows?",
        options: ["newline=''", "binary=True", "append only", "buffering=0"],
        correctAnswer: 0,
        explanation: "newline='' prevents extra \\r\\n."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which encoding is often needed for CSV from Excel with non-ASCII text?",
        options: ["utf-8-sig", "ascii", "latin1 only", "cp437"],
        correctAnswer: 0,
        explanation: "utf-8-sig fixes BOM issues."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "CSV and Excel .xlsx are the same format.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False — xlsx is binary; CSV is text."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
