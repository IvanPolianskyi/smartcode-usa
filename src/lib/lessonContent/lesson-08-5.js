/**
 * Lesson 08-5: Робота з CSV та Excel
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_08_5 = {
  lessonId: "lesson-08-5",
  moduleId: "module-08",
  order: 5,
  title: "Робота з CSV та Excel",
  
  learningObjectives: [
    "Читати та записувати CSV файли",
    "Працювати з Excel файлами за допомогою openpyxl",
    "Обробляти структуровані дані",
    "Використовувати pandas для роботи з таблицями"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-08-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до CSV",
        content: `CSV (Comma-Separated Values) — це текстовий формат для зберігання табличних даних.

**Що таке CSV?**

- Простий формат, де дані розділені комами (або іншими роздільниками)
- Кожен рядок — це запис
- Перший рядок часто містить заголовки колонок
- Легко читається та редагується

**Приклад CSV файлу:**

\`\`\`csv
Ім'я,Вік,Місто
Олександр,25,Київ
Марія,23,Львів
Іван,30,Одеса
\`\`\`

**Імпорт модуля csv:**

\`\`\`python
import csv
\`\`\``
      },
      {
        title: "Читання CSV файлів",
        content: `**csv.reader()** — читає CSV файл рядок за рядком.

\`\`\`python
import csv

# Читання CSV файлу
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
# ['Ім\'я', 'Вік', 'Місто']
# ['Олександр', '25', 'Київ']
# ['Марія', '23', 'Львів']
\`\`\`

**csv.DictReader()** — читає CSV як словники (з заголовками).

\`\`\`python
import csv

# Читання як словники
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Ім\'я'], row['Вік'])
# Олександр 25
# Марія 23
\`\`\`

**Обробка даних:**

\`\`\`python
import csv

students = []

with open('students.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        students.append({
            'name': row['Ім\'я'],
            'age': int(row['Вік']),
            'grade': float(row['Оцінка'])
        })

print(students)
\`\`\``
      },
      {
        title: "Запис у CSV файли",
        content: `**csv.writer()** — записує дані в CSV файл.

\`\`\`python
import csv

data = [
    ['Ім\'я', 'Вік', 'Місто'],
    ['Олександр', '25', 'Київ'],
    ['Марія', '23', 'Львів']
]

# Запис у CSV
with open('output.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)
\`\`\`

**csv.DictWriter()** — записує словники в CSV.

\`\`\`python
import csv

data = [
    {'Ім\'я': 'Олександр', 'Вік': '25', 'Місто': 'Київ'},
    {'Ім\'я': 'Марія', 'Вік': '23', 'Місто': 'Львів'}
]

# Запис словників
with open('output.csv', 'w', encoding='utf-8', newline='') as f:
    fieldnames = ['Ім\'я', 'Вік', 'Місто']
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()  # Записуємо заголовки
    writer.writerows(data)
\`\`\`

**Важливо:** Використовуйте \`newline=''\` при відкритті файлу для запису, щоб уникнути порожніх рядків.

**Різні роздільники:**

\`\`\`python
import csv

# Використання крапки з комою як роздільника
with open('data.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f, delimiter=';')
    writer.writerow(['Ім\'я', 'Вік'])
    writer.writerow(['Олександр', '25'])
\`\`\``
      },
      {
        title: "Робота з Excel файлами (openpyxl)",
        content: `Для роботи з Excel файлами використовуємо бібліотеку \`openpyxl\`.

**Встановлення:**

\`\`\`bash
pip install openpyxl
\`\`\`

**Читання Excel файлів:**

\`\`\`python
from openpyxl import load_workbook

# Завантажуємо Excel файл
wb = load_workbook('data.xlsx')
ws = wb.active  # Активний лист

# Читаємо значення комірки
print(ws['A1'].value)  # Значення комірки A1

# Читаємо рядок
for row in ws.iter_rows(min_row=1, max_row=3, values_only=True):
    print(row)
\`\`\`

**Запис у Excel файли:**

\`\`\`python
from openpyxl import Workbook

# Створюємо нову книгу
wb = Workbook()
ws = wb.active

# Записуємо дані
ws['A1'] = 'Ім\'я'
ws['B1'] = 'Вік'
ws['A2'] = 'Олександр'
ws['B2'] = 25

# Зберігаємо
wb.save('output.xlsx')
\`\`\`

**Робота з кількома листами:**

\`\`\`python
from openpyxl import Workbook

wb = Workbook()

# Створюємо новий лист
ws1 = wb.create_sheet('Студенти')
ws2 = wb.create_sheet('Оцінки')

# Записуємо дані
ws1['A1'] = 'Ім\'я'
ws2['A1'] = 'Предмет'

wb.save('data.xlsx')
\`\`\`

**Читання з конкретного листа:**

\`\`\`python
from openpyxl import load_workbook

wb = load_workbook('data.xlsx')
ws = wb['Студенти']  # Вибір конкретного листа

for row in ws.iter_rows(values_only=True):
    print(row)
\`\`\``
      },
      {
        title: "Робота з pandas для таблиць",
        content: `\`pandas\` — потужна бібліотека для роботи з даними. Вона спрощує роботу з CSV та Excel.

**Встановлення:**

\`\`\`bash
pip install pandas openpyxl
\`\`\`

**Читання CSV з pandas:**

\`\`\`python
import pandas as pd

# Читання CSV
df = pd.read_csv('data.csv', encoding='utf-8')
print(df)

# Доступ до колонок
print(df['Ім\'я'])
print(df['Вік'].mean())  # Середнє значення
\`\`\`

**Читання Excel з pandas:**

\`\`\`python
import pandas as pd

# Читання Excel
df = pd.read_excel('data.xlsx', sheet_name='Студенти')
print(df)
\`\`\`

**Запис у CSV та Excel:**

\`\`\`python
import pandas as pd

# Створюємо DataFrame
data = {
    'Ім\'я': ['Олександр', 'Марія'],
    'Вік': [25, 23],
    'Місто': ['Київ', 'Львів']
}
df = pd.DataFrame(data)

# Записуємо в CSV
df.to_csv('output.csv', index=False, encoding='utf-8')

# Записуємо в Excel
df.to_excel('output.xlsx', index=False, sheet_name='Студенти')
\`\`\`

**Обробка даних:**

\`\`\`python
import pandas as pd

df = pd.read_csv('students.csv', encoding='utf-8')

# Фільтрація
high_grades = df[df['Оцінка'] > 90]

# Групування
by_city = df.groupby('Місто')['Оцінка'].mean()

# Сортування
sorted_df = df.sort_values('Оцінка', ascending=False)
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Експорт даних у CSV**

\`\`\`python
import csv

students = [
    {'name': 'Олександр', 'grade': 95},
    {'name': 'Марія', 'grade': 88},
    {'name': 'Іван', 'grade': 92}
]

with open('grades.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'grade'])
    writer.writeheader()
    writer.writerows(students)
\`\`\`

**Приклад 2: Аналіз CSV даних**

\`\`\`python
import csv

total = 0
count = 0

with open('grades.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        total += int(row['grade'])
        count += 1

average = total / count if count > 0 else 0
print(f'Середня оцінка: {average:.2f}')
\`\`\`

**Приклад 3: Конвертація CSV в Excel**

\`\`\`python
import csv
from openpyxl import Workbook

wb = Workbook()
ws = wb.active

# Читаємо CSV
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row_num, row in enumerate(reader, start=1):
        for col_num, value in enumerate(row, start=1):
            ws.cell(row=row_num, column=col_num, value=value)

wb.save('data.xlsx')
\`\`\`

**Приклад 4: Обробка великих файлів**

\`\`\`python
import csv

# Обробка великого CSV файлу по частинах
def process_large_csv(filename, chunk_size=1000):
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        chunk = []
        for row in reader:
            chunk.append(row)
            if len(chunk) >= chunk_size:
                # Обробляємо chunk
                process_chunk(chunk)
                chunk = []
        # Обробляємо останній chunk
        if chunk:
            process_chunk(chunk)

def process_chunk(chunk):
    # Ваша логіка обробки
    print(f'Оброблено {len(chunk)} записів')
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили роботу з CSV та Excel:

**CSV (модуль csv):**

1. **csv.reader()** — читання CSV рядками
2. **csv.DictReader()** — читання як словники
3. **csv.writer()** — запис рядками
4. **csv.DictWriter()** — запис словниками

**Excel (openpyxl):**

1. **load_workbook()** — завантаження Excel файлу
2. **Workbook()** — створення нової книги
3. **Робота з листами** — створення та вибір листів
4. **Доступ до комірок** — читання та запис

**Pandas:**

1. **pd.read_csv()** — читання CSV
2. **pd.read_excel()** — читання Excel
3. **df.to_csv()** — запис у CSV
4. **df.to_excel()** — запис у Excel
5. **Обробка даних** — фільтрація, групування, сортування

**Важливо:**

- Використовуйте \`encoding='utf-8'\` для українського тексту
- Використовуйте \`newline=''\` при записі CSV
- Pandas спрощує роботу з великими даними

**Наступний крок:**

У наступному уроці ми закріпимо всі знання модуля 8 практичними задачами.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання CSV",
      code: `import csv

with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Ім\'я'], row['Вік'])`,
      explanation: "Використовуємо csv.DictReader для читання CSV як словників."
    },
    {
      title: "Приклад 2: Запис у CSV",
      code: `import csv

data = [{'Ім\'я': 'Олександр', 'Вік': '25'}]
with open('output.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['Ім\'я', 'Вік'])
    writer.writeheader()
    writer.writerows(data)`,
      explanation: "Використовуємо csv.DictWriter для запису словників у CSV."
    },
    {
      title: "Приклад 3: Робота з Excel",
      code: `from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws['A1'] = 'Ім\'я'
ws['B1'] = 'Вік'
wb.save('data.xlsx')`,
      explanation: "Створюємо Excel файл та записуємо дані."
    },
    {
      title: "Приклад 4: Pandas для CSV",
      code: `import pandas as pd

df = pd.read_csv('data.csv', encoding='utf-8')
print(df['Вік'].mean())  # Середнє значення`,
      explanation: "Використовуємо pandas для читання та обробки CSV даних."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути newline='' при записі CSV",
      explanation: "Без newline='' можуть з'явитися порожні рядки між записами.",
      correctApproach: "Завжди використовуйте newline='' при відкритті CSV файлу для запису."
    },
    {
      mistake: "Не вказувати encoding='utf-8'",
      explanation: "Без encoding='utf-8' українські символи можуть відображатися неправильно.",
      correctApproach: "Завжди використовуйте encoding='utf-8' для роботи з українським текстом."
    },
    {
      mistake: "Спроба читати Excel без openpyxl",
      explanation: "Для роботи з Excel потрібна бібліотека openpyxl.",
      correctApproach: "Встановіть openpyxl: pip install openpyxl"
    }
  ],
  
  summary: `На цьому уроці ми вивчили роботу з CSV та Excel:

1. **CSV** — csv.reader, csv.DictReader, csv.writer, csv.DictWriter
2. **Excel** — openpyxl для читання та запису
3. **Pandas** — спрощена робота з табличними даними

CSV та Excel — стандартні формати для зберігання та обміну структурованими даними!`,
  
  practiceTask: {
    title: "Створення системи обліку студентів",
    description: "Створіть систему для зберігання та обробки даних студентів у CSV та Excel",
    problemStatement: `Створіть систему обліку студентів:
1. Створіть функцію для збереження даних студентів у CSV
2. Створіть функцію для читання даних з CSV
3. Створіть функцію для обчислення середньої оцінки
4. Експортуйте дані у Excel файл

Дані студентів:
- Олександр, 25, Python, 95
- Марія, 23, JavaScript, 88
- Іван, 30, Python, 92`,
    inputFormat: "Список студентів з даними",
    outputFormat: `Дані збережено у students.csv
Завантажено 3 студентів
Середня оцінка: 91.67
Дані експортовано у students.xlsx`,
    examples: [
      {
        input: "students = [{'name': 'Олександр', 'age': 25, 'course': 'Python', 'grade': 95}]",
        output: `Дані збережено
Завантажено 1 студента
Середня оцінка: 95.0`,
        explanation: "Використовуємо csv для збереження та читання, обчислюємо середнє значення."
      }
    ],
    solution: {
      code: `import csv
from openpyxl import Workbook

def save_students_csv(students, filename='students.csv'):
    with open(filename, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['name', 'age', 'course', 'grade'])
        writer.writeheader()
        writer.writerows(students)
    print(f'Дані збережено у {filename}')

def load_students_csv(filename='students.csv'):
    students = []
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            students.append({
                'name': row['name'],
                'age': int(row['age']),
                'course': row['course'],
                'grade': float(row['grade'])
            })
    return students

def calculate_average_grade(students):
    if not students:
        return 0
    total = sum(s['grade'] for s in students)
    return total / len(students)

def export_to_excel(students, filename='students.xlsx'):
    wb = Workbook()
    ws = wb.active
    
    # Заголовки
    ws['A1'] = 'Ім\'я'
    ws['B1'] = 'Вік'
    ws['C1'] = 'Курс'
    ws['D1'] = 'Оцінка'
    
    # Дані
    for row_num, student in enumerate(students, start=2):
        ws[f'A{row_num}'] = student['name']
        ws[f'B{row_num}'] = student['age']
        ws[f'C{row_num}'] = student['course']
        ws[f'D{row_num}'] = student['grade']
    
    wb.save(filename)
    print(f'Дані експортовано у {filename}')

# Дані
students = [
    {'name': 'Олександр', 'age': 25, 'course': 'Python', 'grade': 95},
    {'name': 'Марія', 'age': 23, 'course': 'JavaScript', 'grade': 88},
    {'name': 'Іван', 'age': 30, 'course': 'Python', 'grade': 92}
]

# Зберігаємо
save_students_csv(students)

# Завантажуємо
loaded = load_students_csv()
print(f'Завантажено {len(loaded)} студентів')

# Обчислюємо середнє
avg = calculate_average_grade(loaded)
print(f'Середня оцінка: {avg:.2f}')

# Експортуємо
export_to_excel(loaded)`,
      explanation: "Використовуємо csv для збереження/читання, обчислюємо середнє значення та експортуємо в Excel."
    },
    hints: [
      "Використайте csv.DictWriter для запису",
      "Використайте csv.DictReader для читання",
      "Обчисліть середнє через sum() та len()",
      "Використайте openpyxl для створення Excel файлу"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає CSV?",
        options: [
          "Comma-Separated Values",
          "Column-Separated Values",
          "Computer-Structured Values",
          "Code-Separated Values"
        ],
        correctAnswer: 0,
        explanation: "CSV означає Comma-Separated Values — значення, розділені комами."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який параметр потрібен при відкритті CSV для запису?",
        options: [
          "encoding='utf-8'",
          "newline=''",
          "mode='w'",
          "Всі вищеперелічені"
        ],
        correctAnswer: 3,
        explanation: "Потрібні всі параметри: encoding для українського тексту, newline для коректного формату, mode для запису."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Яка різниця між csv.reader() та csv.DictReader()?",
        options: [
          "reader повертає списки, DictReader — словники",
          "DictReader швидший",
          "reader працює тільки з файлами",
          "Немає різниці"
        ],
        correctAnswer: 0,
        explanation: "csv.reader() повертає рядки як списки, csv.DictReader() — як словники з ключами з заголовків."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка бібліотека потрібна для роботи з Excel файлами?",
        options: [
          "csv",
          "openpyxl",
          "pandas",
          "json"
        ],
        correctAnswer: 1,
        explanation: "openpyxl — бібліотека для роботи з Excel файлами (.xlsx)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Pandas може читати та записувати як CSV, так і Excel файли.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. Pandas підтримує обидва формати через pd.read_csv(), pd.read_excel(), df.to_csv(), df.to_excel()."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


