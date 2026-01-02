/**
 * Lesson 05-2: Контекстний менеджер with
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_05_2 = {
  lessonId: "lesson-05-2",
  moduleId: "module-05",
  order: 2,
  title: "Контекстний менеджер with",
  
  learningObjectives: [
    "Використовувати контекстний менеджер with",
    "Розуміти переваги with statement",
    "Автоматично закривати файли",
    "Уникати витоку ресурсів",
    "Розуміти принцип роботи контекстних менеджерів"
  ],
  
  estimatedTime: 60,
  prerequisites: ["lesson-05-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке контекстний менеджер?",
        content: `**Контекстний менеджер** - це об'єкт, який визначає що відбувається при вході та виході з блоку коду.

**Проблема без with:**
\`\`\`python
file = open("data.txt", "r")
content = file.read()
# Якщо тут станеться помилка, файл не закриється!
file.close()  # Може не виконатися
\`\`\`

**Рішення з with:**
\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
# Файл автоматично закривається тут, навіть якщо була помилка!
\`\`\`

**Переваги with:**
- ✅ Автоматичне закриття файлу
- ✅ Працює навіть при помилках
- ✅ Чистіший та читабельніший код
- ✅ Немає витоку ресурсів`
      },
      {
        title: "Синтаксис with statement",
        content: `**Базовий синтаксис:**
\`\`\`python
with open("файл.txt", "режим") as змінна:
    # код для роботи з файлом
    дія
# Файл автоматично закривається тут
\`\`\`

**Приклад: Читання**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл закритий автоматично
\`\`\`

**Приклад: Запис**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок")
# Файл закритий та дані збережені
\`\`\`

**Приклад: Додавання**
\`\`\`python
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("Новий запис\\n")
# Файл закритий, дані додані
\`\`\``
      },
      {
        title: "Чому with краще?",
        content: `**Порівняння підходів:**

**Старий спосіб (без with):**
\`\`\`python
file = open("data.txt", "r")
try:
    content = file.read()
    # Якщо тут помилка, файл може не закритися
finally:
    file.close()  # Завжди закриваємо
\`\`\`

**Новий спосіб (з with):**
\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
    # Навіть якщо тут помилка, файл закриється
# Файл завжди закритий
\`\`\`

**Переваги:**
1. **Менше коду** - не потрібен try/finally
2. **Безпечніше** - файл завжди закривається
3. **Читабельніше** - код простіший для розуміння
4. **Менше помилок** - неможливо забути закрити файл`
      },
      {
        title: "Кілька файлів одночасно",
        content: `Можна відкривати кілька файлів одночасно:

\`\`\`python
with open("input.txt", "r") as input_file, open("output.txt", "w") as output_file:
    content = input_file.read()
    output_file.write(content.upper())
# Обидва файли закриті
\`\`\`

**Або на окремих рядках:**
\`\`\`python
with open("input.txt", "r") as input_file, \\
     open("output.txt", "w") as output_file:
    content = input_file.read()
    output_file.write(content)
\`\`\`

**Приклад: Копіювання файлу**
\`\`\`python
with open("source.txt", "r", encoding="utf-8") as source, \\
     open("copy.txt", "w", encoding="utf-8") as copy:
    content = source.read()
    copy.write(content)
print("Файл скопійовано!")
\`\`\``
      },
      {
        title: "Обробка помилок з with",
        content: `**with statement працює навіть при помилках:**

\`\`\`python
try:
    with open("data.txt", "r") as file:
        content = file.read()
        # Якщо тут помилка, файл все одно закриється
        result = 10 / 0  # Помилка!
except ZeroDivisionError:
    print("Помилка ділення")
# Файл вже закритий, навіть після помилки
\`\`\`

**Важливо:**
- Файл закривається **завжди**, навіть при помилках
- Не потрібен окремий try/finally для закриття
- with statement сам обробляє закриття ресурсів

**Рекомендація:** Завжди використовуй \`with\` для роботи з файлами!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове використання with",
      code: `# Читання файлу з with
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закритий`,
      explanation: "Демонструє базове використання with statement для читання файлу."
    },
    {
      title: "Приклад 2: Запис з with",
      code: `# Запис у файл з with
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок")
# Файл автоматично закритий`,
      explanation: "Показує використання with для запису у файл."
    },
    {
      title: "Приклад 3: Кілька файлів",
      code: `# Відкриття кількох файлів
with open("input.txt", "r") as input_file, open("output.txt", "w") as output_file:
    content = input_file.read()
    output_file.write(content.upper())
# Обидва файли закриті`,
      explanation: "Демонструє відкриття кількох файлів одночасно."
    },
    {
      title: "Приклад 4: Обробка помилок",
      code: `# with працює навіть при помилках
try:
    with open("data.txt", "r") as file:
        content = file.read()
        # Помилка тут не завадить закрити файл
except FileNotFoundError:
    print("Файл не знайдено")
# Файл закритий автоматично`,
      explanation: "Показує що with statement завжди закриває файл, навіть при помилках."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути використати with",
      explanation: "Без with легко забути закрити файл, що може призвести до витоку ресурсів.",
      correctApproach: "Завжди використовуй with open() для роботи з файлами"
    },
    {
      mistake: "Спробувати використати файл після with блоку",
      explanation: "Після виходу з with блоку файл вже закритий і не можна з ним працювати.",
      correctApproach: "Всі операції з файлом мають бути всередині with блоку"
    },
    {
      mistake: "Не вказати encoding для українського тексту",
      explanation: "Без encoding='utf-8' можуть бути проблеми з кирилицею.",
      correctApproach: "Завжди вказуй encoding='utf-8' в with open()"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Контекстний менеджер with** - автоматичне управління ресурсами
2. **Синтаксис with** - with open() as file:
3. **Переваги with** - автоматичне закриття, безпека, чистий код
4. **Кілька файлів** - відкриття кількох файлів одночасно
5. **Обробка помилок** - with працює навіть при помилках

Тепер ви вмієте безпечно працювати з файлами за допомогою with statement!

Наступний урок - робота з CSV та TXT файлами!`,
  
  practiceTask: {
    title: "Копіювання та обробка файлів",
    description: "Створіть програму для копіювання та обробки файлів з використанням with",
    problemStatement: `Напишіть програму, яка:
1. Відкриває файл source.txt для читання
2. Читає весь вміст файлу
3. Перетворює текст у великі літери
4. Записує результат у файл output.txt
5. Використовує with statement для обох файлів`,
    inputFormat: "Програма використовує файл source.txt з текстом",
    outputFormat: `Приклад: якщо source.txt містить "привіт світ", то output.txt містить "ПРИВІТ СВІТ"`,
    examples: [
      {
        input: "source.txt містить: 'привіт світ\\nце python'",
        output: "output.txt містить: 'ПРИВІТ СВІТ\\nЦЕ PYTHON'",
        explanation: "Програма читає source.txt, перетворює на великі літери та записує в output.txt"
      }
    ],
    solution: {
      code: `# Копіювання та обробка файлів
with open("source.txt", "r", encoding="utf-8") as source_file, \\
     open("output.txt", "w", encoding="utf-8") as output_file:
    content = source_file.read()
    upper_content = content.upper()
    output_file.write(upper_content)

print("Файл оброблено та збережено!")`,
      explanation: "Рішення використовує with statement для відкриття обох файлів одночасно, читає, обробляє та записує результат."
    },
    hints: [
      "Використовуйте with open() для обох файлів",
      "Використовуйте метод .upper() для перетворення у великі літери",
      "Не забудьте encoding='utf-8' для українського тексту",
      "Всі операції мають бути всередині with блоку"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить with statement?",
        options: [
          "Автоматично закриває файл",
          "Відкриває файл",
          "Читає файл",
          "Записує у файл"
        ],
        correctAnswer: 0,
        explanation: "with statement автоматично закриває файл після виходу з блоку коду."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться з файлом після виконання цього коду?\n\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\nprint('Готово')\n```",
        options: [
          "Файл закритий автоматично",
          "Файл залишається відкритим",
          "Файл видалений",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Після виходу з with блоку файл автоматично закривається."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому with statement краще за звичайний open()?",
        options: [
          "Автоматично закриває файл навіть при помилках",
          "Швидше працює",
          "Менше пам'яті використовує",
          "Всі варіанти правильні"
        ],
        correctAnswer: 0,
        explanation: "with statement автоматично закриває файл навіть якщо сталася помилка, що робить код безпечнішим."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи можна використати файл після with блоку?\n\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\nprint(file.read())  # Після with блоку\n```",
        options: [
          "Ні, файл вже закритий",
          "Так, файл відкритий",
          "Так, але тільки для читання",
          "Залежить від режиму"
        ],
        correctAnswer: 0,
        explanation: "Після виходу з with блоку файл автоматично закривається, тому спроба використати його викличе помилку."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Скільки файлів можна відкрити одночасно в одному with statement?",
        options: [
          "Тільки один",
          "Два",
          "Скільки завгодно",
          "Три"
        ],
        correctAnswer: 2,
        explanation: "Можна відкрити скільки завгодно файлів одночасно, розділяючи їх комами."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
