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
    "Розуміти що таке контекстний менеджер",
    "Використовувати with для роботи з файлами",
    "Розуміти переваги with перед file.close()",
    "Працювати з кількома файлами одночасно"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-05-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке контекстний менеджер?",
        content: `**Контекстний менеджер (Context Manager)** - це спосіб безпечної роботи з ресурсами (файлами, з'єднаннями тощо).

**Проблема без with:**
\`\`\`python
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()  # Легко забути!
\`\`\`

**Що може піти не так?**
- Забули викликати file.close()
- Виникла помилка до закриття файлу
- Файл залишається відкритим і займає ресурси

**Рішення - with statement:**
\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
# Файл автоматично закривається тут!
\`\`\`

**Переваги with:**
- Автоматичне закриття файлу
- Закриває навіть якщо виникла помилка
- Чистіший і зрозуміліший код
- Безпечніше`
      },
      {
        title: "Синтаксис with statement",
        content: `**Базовий синтаксис:**

\`\`\`python
with open("файл", "режим") as змінна:
    # Робота з файлом
    код_роботи_з_файлом
# Файл автоматично закритий тут
\`\`\`

**Приклад 1: Читання файлу**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закритий
\`\`\`

**Приклад 2: Запис у файл**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок\\n")
# Файл автоматично закритий та збережений
\`\`\`

**Приклад 3: Додавання в кінець**
\`\`\`python
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("Новий запис\\n")
# Файл автоматично закритий
\`\`\``
      },
      {
        title: "Робота з кількома файлами",
        content: `**Можна відкрити кілька файлів одночасно!**

**Спосіб 1: З комою**
\`\`\`python
with open("input.txt", "r", encoding="utf-8") as infile, \\
     open("output.txt", "w", encoding="utf-8") as outfile:
    
    content = infile.read()
    outfile.write(content.upper())
# Обидва файли автоматично закриті
\`\`\`

**Спосіб 2: Вкладені with (більш читабельно)**
\`\`\`python
with open("input.txt", "r", encoding="utf-8") as infile:
    content = infile.read()
    
    with open("output.txt", "w", encoding="utf-8") as outfile:
        outfile.write(content.upper())
# Обидва файли автоматично закриті
\`\`\`

**Приклад: Копіювання файлу**
\`\`\`python
with open("original.txt", "r", encoding="utf-8") as source, \\
     open("copy.txt", "w", encoding="utf-8") as destination:
    
    for line in source:
        destination.write(line)
print("Файл скопійовано!")
\`\`\``
      },
      {
        title: "Читання файлу по рядках з with",
        content: `**Найефективніший спосіб читання великих файлів:**

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())
# Файл автоматично закритий
\`\`\`

**Чому це найкраще?**
- Не завантажує весь файл у пам'ять
- Працює з файлами будь-якого розміру
- Автоматично закриває файл
- Зрозумілий код

**Приклад: Обробка великого файлу**
\`\`\`python
# Підрахунок рядків
count = 0
with open("big_file.txt", "r", encoding="utf-8") as file:
    for line in file:
        count += 1
print(f"Файл містить {count} рядків")
\`\`\`

**Приклад: Пошук у файлі**
\`\`\`python
search_word = "Python"
found_lines = []

with open("data.txt", "r", encoding="utf-8") as file:
    for line_num, line in enumerate(file, 1):
        if search_word in line:
            found_lines.append((line_num, line.strip()))

for line_num, line in found_lines:
    print(f"Рядок {line_num}: {line}")
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Статистика файлу**

\`\`\`python
with open("text.txt", "r", encoding="utf-8") as file:
    content = file.read()
    
    lines = content.count('\\n') + 1
    words = len(content.split())
    chars = len(content)
    
    print(f"Рядків: {lines}")
    print(f"Слів: {words}")
    print(f"Символів: {chars}")
\`\`\`

**Приклад 2: Фільтрація даних**

\`\`\`python
# Читаємо числа та зберігаємо тільки додатні
with open("numbers.txt", "r") as infile, \\
     open("positive.txt", "w") as outfile:
    
    for line in infile:
        number = float(line.strip())
        if number > 0:
            outfile.write(f"{number}\\n")
\`\`\`

**Приклад 3: Обробка списку студентів**

\`\`\`python
with open("students.txt", "r", encoding="utf-8") as file:
    students = []
    for line in file:
        name = line.strip()
        if name:  # Пропускаємо порожні рядки
            students.append(name)

print(f"Всього студентів: {len(students)}")
print("Список:", ", ".join(students))
\`\`\``
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
      explanation: "Демонструє базове використання with для безпечного читання файлу."
    },
    {
      title: "Приклад 2: Запис у файл",
      code: `# Запис даних у файл
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Перший рядок\\n")
    file.write("Другий рядок\\n")
    file.write("Третій рядок\\n")
# Файл автоматично закритий та збережений`,
      explanation: "Показує як використовувати with для запису даних у файл."
    },
    {
      title: "Приклад 3: Обробка по рядках",
      code: `# Читання та обробка кожного рядка
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip().upper())
# Файл автоматично закритий`,
      explanation: "Демонструє ефективну обробку файлу по рядках."
    },
    {
      title: "Приклад 4: Копіювання файлу",
      code: `# Копіювання вмісту файлу
with open("original.txt", "r", encoding="utf-8") as source, \\
     open("copy.txt", "w", encoding="utf-8") as destination:
    
    content = source.read()
    destination.write(content)

print("Файл скопійовано!")`,
      explanation: "Показує роботу з двома файлами одночасно."
    },
    {
      title: "Приклад 5: Підрахунок рядків",
      code: `# Підрахунок рядків у файлі
line_count = 0
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        line_count += 1

print(f"Файл містить {line_count} рядків")`,
      explanation: "Демонструє ефективний спосіб підрахунку рядків без завантаження всього файлу."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути encoding='utf-8'",
      explanation: "Без кодування можуть бути проблеми з українським текстом.",
      correctApproach: "Завжди вказуй encoding='utf-8' для текстових файлів"
    },
    {
      mistake: "Спробувати використати файл після блоку with",
      explanation: "Після виходу з блоку with файл закритий і його не можна використовувати.",
      correctApproach: "Вся робота з файлом має бути всередині блоку with"
    },
    {
      mistake: "Не використовувати strip() при читанні рядків",
      explanation: "Кожен рядок містить символ нового рядка \\n в кінці.",
      correctApproach: "Використовуй line.strip() для видалення \\n"
    },
    {
      mistake: "Відкрити файл у режимі 'w' замість 'a'",
      explanation: "Режим 'w' видаляє весь попередній вміст файлу.",
      correctApproach: "Використовуй 'a' для додавання, 'w' тільки для нового файлу"
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Контекстний менеджер** - спосіб безпечної роботи з файлами
2. **with statement** - автоматичне закриття файлів
3. **Синтаксис with** - \`with open() as file:\`
4. **Робота з кількома файлами** - одночасне відкриття
5. **Читання по рядках** - ефективна обробка великих файлів

Тепер ви вмієте безпечно працювати з файлами використовуючи with!

Наступний урок - практична робота з текстовими файлами!`,
  
  practiceTask: {
    title: "Система логування",
    description: "Створіть програму для ведення логів з використанням with",
    problemStatement: `Напишіть програму, яка:
1. Створює файл log.txt
2. Додає 5 записів у лог-файл:
   - "Програма запущена"
   - "Завантаження даних"
   - "Обробка даних"
   - "Збереження результатів"
   - "Програма завершена"
3. Читає всі записи з файлу
4. Виводить їх з нумерацією`,
    inputFormat: "Програма використовує фіксовані записи",
    outputFormat: `Приклад виведення:
1. Програма запущена
2. Завантаження даних
3. Обробка даних
4. Збереження результатів
5. Програма завершена`,
    examples: [
      {
        input: "logs = ['Програма запущена', 'Завантаження даних', ...]",
        output: `1. Програма запущена
2. Завантаження даних
3. Обробка даних
4. Збереження результатів
5. Програма завершена`,
        explanation: "Програма записує логи у файл, потім читає та виводить їх з нумерацією"
      }
    ],
    solution: {
      code: `# Система логування
logs = [
    "Програма запущена",
    "Завантаження даних",
    "Обробка даних",
    "Збереження результатів",
    "Програма завершена"
]

# Записати логи у файл
with open("log.txt", "w", encoding="utf-8") as file:
    for log in logs:
        file.write(log + "\\n")

# Прочитати логи з файлу та вивести з нумерацією
with open("log.txt", "r", encoding="utf-8") as file:
    for num, line in enumerate(file, 1):
        print(f"{num}. {line.strip()}")`,
      explanation: "Рішення використовує with для безпечної роботи з файлом, enumerate для нумерації рядків."
    },
    hints: [
      "Використовуй with open() для роботи з файлом",
      "Використовуй режим 'w' для запису",
      "Використовуй enumerate(file, 1) для нумерації з 1",
      "Не забудь strip() для видалення \\n",
      "Не забудь encoding='utf-8'"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка основна перевага використання with statement?",
        options: [
          "Файл автоматично закривається",
          "Файл працює швидше",
          "Файл займає менше місця",
          "Файл краще захищений"
        ],
        correctAnswer: 0,
        explanation: "Основна перевага with - автоматичне закриття файлу після виходу з блоку."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Чи потрібно викликати file.close() після цього коду?\n\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\n```",
        options: [
          "Ні, файл автоматично закритий",
          "Так, обов'язково",
          "Тільки якщо була помилка",
          "Залежить від розміру файлу"
        ],
        correctAnswer: 0,
        explanation: "with автоматично закриває файл після виходу з блоку, не потрібно викликати close()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що станеться з файлом, якщо виникне помилка всередині блоку with?",
        options: [
          "Файл все одно буде закритий",
          "Файл залишиться відкритим",
          "Програма зависне",
          "Файл буде видалений"
        ],
        correctAnswer: 0,
        explanation: "with гарантує закриття файлу навіть якщо виникла помилка всередині блоку."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки файлів буде відкрито одночасно?\n\n```python\nwith open('in.txt', 'r') as f1, open('out.txt', 'w') as f2:\n    f2.write(f1.read())\n```",
        options: [
          "2 файли",
          "1 файл",
          "3 файли",
          "Помилка синтаксису"
        ],
        correctAnswer: 0,
        explanation: "Можна відкрити кілька файлів одночасно, розділяючи їх комою - тут відкрито 2 файли."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна використовувати змінну file після блоку with?",
        options: [
          "Ні, файл вже закритий",
          "Так, файл доступний",
          "Тільки для читання",
          "Залежить від режиму відкриття"
        ],
        correctAnswer: 0,
        explanation: "Після виходу з блоку with файл закритий і його не можна використовувати."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

