/**
 * Lesson 04-2: Контекстний менеджер with
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_04_2 = {
  lessonId: "lesson-04-2",
  moduleId: "module-04",
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
  prerequisites: ["lesson-04-1"],
  
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
content = file.read()
# Легко забути закрити файл!
file.close()  # Якщо забули - файл залишиться відкритим
\`\`\`

**Новий спосіб (з with):**
\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
    # Файл автоматично закриється тут
# Файл завжди закритий
\`\`\`

**Переваги:**
1. **Менше коду** - не потрібно викликати close()
2. **Безпечніше** - файл завжди закривається автоматично
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
        title: "Безпека з with",
        content: `**with statement завжди закриває файл:**

\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
    # Навіть якщо тут станеться помилка, файл закриється
    # Наприклад, якщо забудемо закрити або програма завершиться
# Файл вже закритий автоматично
\`\`\`

**Важливо:**
- Файл закривається **завжди**, навіть якщо сталася помилка
- Не потрібно пам'ятати про виклик close()
- with statement сам обробляє закриття ресурсів
- Це запобігає витоку ресурсів та проблемам з файлами

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
      title: "Приклад 4: Безпека з with",
      code: `# with завжди закриває файл
with open("data.txt", "r") as file:
    content = file.read()
    # Навіть якщо тут станеться помилка, файл закриється
    print(content)
# Файл закритий автоматично`,
      explanation: "Показує що with statement завжди закриває файл автоматично, навіть якщо всередині блоку сталася помилка."
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
    problemStatement: `Крок 1: Створіть файл source.txt
Спочатку потрібно створити файл source.txt з таким вмістом:
привіт світ
це python

Ви можете створити файл вручну або додати код для його створення на початку вашої програми.

Крок 2: Напишіть програму
Напишіть програму, яка:
1. Відкриває файл source.txt для читання
2. Читає весь вміст файлу
3. Перетворює текст у великі літери
4. Записує результат у файл output.txt
5. Використовує with statement для обох файлів`,
    inputFormat: "Спочатку створіть файл source.txt з текстом (див. Крок 1 вище)",
    outputFormat: `Приклад: якщо source.txt містить "привіт світ", то output.txt містить "ПРИВІТ СВІТ"`,
    examples: [
      {
        input: "source.txt містить: 'привіт світ\\nце python'",
        output: "Файл оброблено та збережено!",
        explanation: "Програма читає source.txt, перетворює на великі літери та записує в output.txt"
      }
    ],
    solution: {
      code: `# Копіювання та обробка файлів

# Спочатку створюємо файл source.txt (якщо його ще немає)
with open("source.txt", "w", encoding="utf-8") as f:
    f.write("привіт світ\\n")
    f.write("це python\\n")

# Тепер читаємо, обробляємо та записуємо результат
with open("source.txt", "r", encoding="utf-8") as source_file, \\
     open("output.txt", "w", encoding="utf-8") as output_file:
    content = source_file.read()
    upper_content = content.upper()
    output_file.write(upper_content)

print("Файл оброблено та збережено!")`,
      explanation: "Рішення спочатку створює файл source.txt (якщо його немає), потім використовує with statement для відкриття обох файлів одночасно, читає, обробляє та записує результат."
    },
    hints: [
      "Спочатку створіть файл source.txt з текстом 'привіт світ\\nце python'",
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
        question: "Що таке контекстний менеджер?",
        options: [
          "Об'єкт, який визначає що відбувається при вході та виході з блоку коду",
          "Функція для відкриття файлів",
          "Метод для читання файлів",
          "Змінна для зберігання файлу"
        ],
        correctAnswer: 0,
        explanation: "Контекстний менеджер - це об'єкт, який визначає що відбувається при вході та виході з блоку коду. with statement використовує контекстні менеджери."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Який синтаксис правильний для with statement?\n\n```python\n# Варіант 1\nwith open('file.txt', 'r') as f:\n    content = f.read()\n\n# Варіант 2\nwith open('file.txt', 'r'):\n    content = read()\n\n# Варіант 3\nwith open('file.txt', 'r') f:\n    content = f.read()\n```",
        options: [
          "Варіант 1",
          "Варіант 2",
          "Варіант 3",
          "Всі неправильні"
        ],
        correctAnswer: 0,
        explanation: "Правильний синтаксис: with open('file.txt', 'r') as f: - ключове слово 'as' обов'язкове для присвоєння файлу змінній."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що зробить цей код?\n\n```python\nwith open('input.txt', 'r') as input_file, open('output.txt', 'w') as output_file:\n    content = input_file.read()\n    output_file.write(content.upper())\n```",
        options: [
          "Прочитає input.txt, перетворить на великі літери та запише в output.txt",
          "Прочитає обидва файли",
          "Запише в обидва файли",
          "Викличе помилку"
        ],
        correctAnswer: 0,
        explanation: "Код відкриває два файли одночасно: читає з input.txt, перетворює текст на великі літери та записує в output.txt."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому with statement краще за звичайний open() з file.close()?",
        options: [
          "Автоматично закриває файл, навіть якщо забули викликати close()",
          "Швидше працює",
          "Менше пам'яті використовує",
          "Підтримує більше форматів файлів"
        ],
        correctAnswer: 0,
        explanation: "with statement краще тому що автоматично закриває файл, навіть якщо ви забули викликати close() або сталася помилка. Це робить код безпечнішим."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться з файлом після виконання цього коду?\n\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\n    print(content)\nprint('Готово')\n```",
        options: [
          "Файл закритий автоматично",
          "Файл залишається відкритим",
          "Файл видалений",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Після виходу з with блоку файл автоматично закривається. Це відбувається навіть якщо всередині блоку була помилка."
      },
      {
        id: "q6",
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
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи потрібно вказувати encoding='utf-8' при використанні with statement?",
        options: [
          "Так, для коректної роботи з українським текстом",
          "Ні, encoding не потрібен",
          "Тільки для читання",
          "Тільки для запису"
        ],
        correctAnswer: 0,
        explanation: "Так, encoding='utf-8' потрібен для коректної роботи з українським текстом. Без нього можуть бути проблеми з кирилицею."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
