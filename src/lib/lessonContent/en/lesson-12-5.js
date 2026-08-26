/**
 * Lesson 12-5: Working with CSV files
 * Full educational content (bonus lesson)
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_5 = {
  lessonId: "lesson-12-5",
  moduleId: "module-12",
  order: 5,
  title: "Working with CSV files",

  learningObjectives: [
    "Understand the CSV format",
    "Read and write CSV with the csv module",
    "Handle UTF-8 encoding",
    "Prepare data for email and PDF reports"
  ],

  prerequisites: ["lesson-12-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "What is CSV?",
        content: `**CSV (Comma-Separated Values)** is a text table format: rows are records, and commas (or \`;\`) separate columns.

**Where it is used:**

- Export from Excel / Google Sheets
- Logs and reports
- Data for automation scripts

**Built-in module** \`csv\` - no pip install needed:

\`\`\`python
import csv
\`\`\`

The first row is often column **headers**.`
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

\`DictReader\` returns each row as a **dictionary** - convenient access by column name.

**Plain reader** (lists):

\`\`\`python
with open("data.csv", newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        print(row)  # list of values
\`\`\`

**Encoding:** on Windows you often need \`utf-8-sig\` (BOM from Excel):

\`\`\`python
open("file.csv", encoding="utf-8-sig")
\`\`\``
      },
      {
        title: "Writing CSV",
        content: `\`\`\`python
import csv

rows = [
    {"name": "Product A", "qty": 10},
    {"name": "Product B", "qty": 5},
]

with open("out.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "qty"])
    writer.writeheader()
    writer.writerows(rows)
\`\`\`

\`newline=""\` is required when writing CSV in Python 3 (otherwise you get extra blank lines).`
      },
      {
        title: "Link to email and PDF",
        content: `A typical reporting pipeline:

1. Collect data → list of dictionaries
2. Save **CSV** for the archive
3. With **reportlab** (lesson 11) - PDF for management
4. Via **smtplib** (lesson 12) - send the PDF as an attachment

CSV is an intermediate format you can open in Excel without extra code.`
      },
      {
        title: "Summary",
        content: `csv.DictReader / DictWriter are the standard for tabular data. Always set encoding and newline="". Next - report automation overview (lesson 12-6).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Sum amounts from CSV",
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
      explanation: "Non-ASCII characters turn into mojibake.",
      correctApproach: "Use utf-8 or utf-8-sig for Excel exports."
    },
    {
      mistake: "Missing newline='' when writing",
      explanation: "You get double line breaks.",
      correctApproach: "open(..., newline='') with csv.writer."
    }
  ],

  summary: `CSV is a simple way to exchange tabular data; the csv module reads and writes rows for reports and automation.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which Python module reads CSV without installing anything?",
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
        question: "Which open() argument matters when writing CSV on Windows?",
        options: ["newline=''", "binary=True", "append only", "buffering=0"],
        correctAnswer: 0,
        explanation: "newline='' prevents extra \\r\\n lines."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which encoding is often needed for CSV exported from Excel with non-ASCII text?",
        options: ["utf-8-sig", "ascii", "latin1 only", "cp437"],
        correctAnswer: 0,
        explanation: "utf-8-sig handles the BOM Excel adds."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "CSV and Excel .xlsx are the same format.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - xlsx is binary; CSV is plain text."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
