/**
 * Lesson 7-2: Версійний контроль з Git
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_2 = {
  lessonId: "lesson-7-2",
  moduleId: "module-7",
  order: 2,
  title: "Версійний контроль з Git",
  
  learningObjectives: [
    "Встановити Git",
    "Створити репозиторій",
    "Використовувати commit, push, pull",
    "Працювати з гілками"
  ],
  
  estimatedTime: 105,
  prerequisites: ["lesson-7-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке Git?",
        content: `**Git** — система версійного контролю коду.

**Переваги:**
- Збереження історії змін
- Співпраця в команді
- Відкат до попередніх версій
- Гілки для різних функцій

**Встановлення:**
\`\`\`bash
# Windows: завантажити з git-scm.com
# Linux: sudo apt install git
\`\`\``
      },
      {
        title: "Базові команди",
        content: `**Ініціалізація:**
\`\`\`bash
git init
\`\`\`

**Додавання файлів:**
\`\`\`bash
git add .
git add file.py
\`\`\`

**Коміт:**
\`\`\`bash
git commit -m "Додано нову функцію"
\`\`\`

**Перегляд статусу:**
\`\`\`bash
git status
git log
\`\`\``
      },
      {
        title: "Робота з GitHub",
        content: `**Додавання remote:**
\`\`\`bash
git remote add origin https://github.com/user/repo.git
\`\`\`

**Відправка:**
\`\`\`bash
git push origin main
\`\`\`

**Завантаження:**
\`\`\`bash
git pull origin main
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Робочий процес Git",
      code: `# Створення репозиторію
git init
git add .
git commit -m "Початковий коміт"

# Додавання змін
git add file.py
git commit -m "Додано нову функцію"

# Відправка на GitHub
git remote add origin https://github.com/user/repo.git
git push -u origin main`,
      explanation: "Базовий робочий процес з Git."
    }
  ],
  
  commonMistakes: [],
  
  summary: `Git дозволяє відстежувати зміни коду та співпрацювати в команді. Використовуйте commit для збереження змін.`,
  
  practiceTask: {
    title: "Створення репозиторію",
    description: "Створіть Git репозиторій та зробіть перший коміт",
    problemStatement: "Створіть репозиторій, додайте файли та зробіть коміт.",
    solution: {
      code: `# Команди Git
git init
git add .
git commit -m "Початковий коміт"
git remote add origin https://github.com/user/repo.git
git push -u origin main`,
      explanation: "Базові команди Git."
    },
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить git commit?",
        options: ["Відправляє на GitHub", "Зберігає зміни локально", "Створює гілку", "Видаляє файли"],
        correctAnswer: 1,
        explanation: "git commit зберігає зміни в локальному репозиторії."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

