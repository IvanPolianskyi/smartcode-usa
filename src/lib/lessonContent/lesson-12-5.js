/**
 * Lesson 12-5: Робота з CSV файлами
 * Full educational content (додатковий урок)
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_12_5 = {
  lessonId: "lesson-12-5",
  moduleId: "module-12",
  order: 5,
  title: "Робота з CSV файлами",

  learningObjectives: [
    "Розуміти формат CSV",
    "Читати та записувати CSV через модуль csv",
    "Обробляти кодування utf-8",
    "Готувати дані для звітів email і PDF"
  ],

  prerequisites: ["lesson-12-3"],

  videoUrl: "",

  theory: {
    sections: [
      {
        title: "Що таке CSV",
        content: `**CSV (Comma-Separated Values)** - текстовий табличний формат: рядки = записи, коми (або \`;\`) = роздільники колонок.

**Де використовується:**

- Експорт з Excel / Google Sheets
- Логи та звіти
- Дані для скриптів автоматизації

**Вбудований модуль** \`csv\` - без pip:

\`\`\`python
import csv
\`\`\`

Перший рядок часто - **заголовки** колонок.`
      },
      {
        title: "Читання CSV",
        content: `\`\`\`python
import csv

with open("sales.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["product"], row["amount"])
\`\`\`

\`DictReader\` повертає кожний рядок як **словник** - зручно за іменем колонки.

**Звичайний reader** (списки):

\`\`\`python
with open("data.csv", newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        print(row)  # список значень
\`\`\`

**Кодування:** на Windows часто \`utf-8-sig\` (BOM від Excel):

\`\`\`python
open("file.csv", encoding="utf-8-sig")
\`\`\``
      },
      {
        title: "Запис CSV",
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

\`newline=""\` - обов'язково при записі CSV в Python 3 (інакше зайві порожні рядки).`
      },
      {
        title: "Зв'язок з email і PDF",
        content: `Типовий пайплайн звіту:

1. Зібрати дані → список словників
2. Зберегти **CSV** для архіву
3. З **reportlab** (урок 11) - PDF для керівника
4. Через **smtplib** (урок 12) - надіслати PDF вкладенням

CSV - проміжний формат, який відкривають у Excel без додаткового коду.`
      },
      {
        title: "Підсумок",
        content: `csv.DictReader / DictWriter - стандарт для табличних даних. Завжди вказуйте encoding та newline="". Далі - узагальнення звітів (урок 12-6).`
      }
    ]
  },

  codeExamples: [
    {
      title: "Підрахунок суми з CSV",
      code: `import csv
total = 0
with open("sales.csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        total += float(row["amount"])
print(total)`,
      explanation: "DictReader дає доступ до колонок за іменем."
    }
  ],

  commonMistakes: [
    {
      mistake: "Забути encoding=utf-8",
      explanation: "Кирилиця перетворюється на кракозябри.",
      correctApproach: "utf-8 або utf-8-sig для файлів з Excel."
    },
    {
      mistake: "Відсутній newline='' при записі",
      explanation: "З'являються подвійні переноси рядків.",
      correctApproach: "open(..., newline='') з csv.writer."
    }
  ],

  summary: `CSV - простий обмін табличними даними; модуль csv читає та пише рядки для звітів і автоматизації.`,

  practiceTask: null,

  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який модуль Python читає CSV без встановлення?",
        options: ["csv", "pandas only", "openpyxl", "json"],
        correctAnswer: 0,
        explanation: "csv - стандартна бібліотека."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що повертає csv.DictReader для кожного рядка?",
        options: ["dict", "tuple only", "set", "bytes"],
        correctAnswer: 0,
        explanation: "Ключі - назви колонок з заголовка."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр open() важливий при записі CSV у Windows?",
        options: ["newline=''", "binary=True", "append only", "buffering=0"],
        correctAnswer: 0,
        explanation: "newline='' запобігає зайвим \\r\\n."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яке кодування часто потрібне для CSV з Excel українською?",
        options: ["utf-8-sig", "ascii", "latin1 only", "cp437"],
        correctAnswer: 0,
        explanation: "utf-8-sig прибирає проблеми з BOM."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "CSV і Excel .xlsx - це один і той самий формат.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False - xlsx бінарний; CSV - текстовий."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
