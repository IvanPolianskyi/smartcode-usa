/**
 * Lesson 5-3: Робота з CSV та TXT
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_3 = {
  lessonId: "lesson-5-3",
  moduleId: "module-5",
  order: 3,
  title: "Робота з CSV та TXT",
  
  learningObjectives: [
    "Читати та записувати CSV файли",
    "Працювати з TXT файлами",
    "Обробляти структуровані дані",
    "Використовувати csv модуль",
    "Розуміти різницю між CSV та TXT"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-5-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке CSV?",
        content: `**CSV (Comma-Separated Values)** — формат для зберігання табличних даних.

**Структура CSV:**
- Кожен рядок = один запис
- Значення розділені комами (або іншими роздільниками)
- Перший рядок часто містить заголовки

**Приклад CSV файлу (students.csv):**
\`\`\`
Ім'я,Вік,Курс,Бал
Олександр,15,Python,85
Марія,16,Python,92
Дмитро,15,Web,78
\`\`\`

**Переваги CSV:**
- ✅ Простий формат
- ✅ Легко читати та редагувати
- ✅ Підтримується Excel, Google Sheets
- ✅ Компактний (займає мало місця)

**Недоліки:**
- ❌ Немає типів даних (все текст)
- ❌ Проблеми з комами в даних
- ❌ Немає підтримки вкладених структур`
      },
      {
        title: "Модуль csv",
        content: `**csv модуль** — стандартний модуль Python для роботи з CSV файлами.

**Імпорт:**
\`\`\`python
import csv
\`\`\`

**Основні функції:**
- \`csv.reader()\` — читає CSV файл
- \`csv.writer()\` — записує в CSV файл
- \`csv.DictReader()\` — читає як словник
- \`csv.DictWriter()\` — записує зі словника

**Переваги csv модуля:**
- Автоматично обробляє коми в даних
- Підтримує різні роздільники
- Правильно обробляє лапки та спеціальні символи
- Працює з кодуваннями`
      },
      {
        title: "Читання CSV файлів",
        content: `**Спосіб 1: csv.reader() (список списків)**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # ['Ім\'я', 'Вік', 'Курс', 'Бал']
                    # ['Олександр', '15', 'Python', '85']
\`\`\`

**Спосіб 2: csv.DictReader() (словники) - РЕКОМЕНДОВАНО**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["Ім'я"], row["Бал"])  # Доступ по назві колонки
        # Олександр 85
        # Марія 92
\`\`\`

**Переваги DictReader:**
- ✅ Доступ по назві колонки (зручніше)
- ✅ Не потрібно пам'ятати порядок колонок
- ✅ Більш читабельний код

**Обробка даних:**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        ім_я = row["Ім'я"]
        вік = int(row["Вік"])  # Конвертація в число
        бал = int(row["Бал"])
        print(f"{ім_я}: {бал} балів")
\`\`\``
      },
      {
        title: "Запис у CSV файли",
        content: `**Спосіб 1: csv.writer() (список списків)**
\`\`\`python
import csv

дані = [
    ["Ім'я", "Вік", "Курс", "Бал"],
    ["Олександр", 15, "Python", 85],
    ["Марія", 16, "Python", 92]
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(дані)  # Записує всі рядки
\`\`\`

**Спосіб 2: csv.DictWriter() (словники) - РЕКОМЕНДОВАНО**
\`\`\`python
import csv

дані = [
    {"Ім'я": "Олександр", "Вік": 15, "Курс": "Python", "Бал": 85},
    {"Ім'я": "Марія", "Вік": 16, "Курс": "Python", "Бал": 92}
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()  # Записує заголовки
    writer.writerows(дані)  # Записує дані
\`\`\`

**Важливо:** 
- Використовуйте \`newline=""\` при відкритті файлу для запису
- \`writeheader()\` записує заголовки (тільки для DictWriter)
- \`writerows()\` записує кілька рядків, \`writerow()\` — один рядок`
      },
      {
        title: "Робота з TXT файлами",
        content: `**TXT (текстові файли)** — прості файли з текстом.

**Відмінності від CSV:**
- CSV — структуровані дані (таблиця)
- TXT — неструктуровані дані (просто текст)

**Коли використовувати TXT:**
- Логи програми
- Конфігураційні файли
- Документація
- Простий текст без структури

**Приклади роботи з TXT:**

**1. Читання всього файлу:**
\`\`\`python
with open("log.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
\`\`\`

**2. Читання по рядках:**
\`\`\`python
with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())
\`\`\`

**3. Запис у файл:**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Рядок 1\\n")
    file.write("Рядок 2\\n")
\`\`\`

**4. Обробка структурованих TXT (key=value):**
\`\`\`python
config = {}
with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        if "=" in line:
            key, value = line.strip().split("=")
            config[key] = value
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Аналіз даних з CSV**
\`\`\`python
import csv

# Знайти студентів з балами > 80
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    відмінники = []
    for row in reader:
        if int(row["Бал"]) > 80:
            відмінники.append(row["Ім'я"])

print("Відмінники:", відмінники)
\`\`\`

**Приклад 2: Експорт даних у CSV**
\`\`\`python
import csv

студенти = [
    {"Ім'я": "Олександр", "Вік": 15, "Бал": 85},
    {"Ім'я": "Марія", "Вік": 16, "Бал": 92}
]

with open("export.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(студенти)
\`\`\`

**Приклад 3: Конвертація TXT в CSV**
\`\`\`python
import csv

# TXT файл: Олександр,15,Python,85
with open("data.txt", "r", encoding="utf-8") as txt_file, \\
     open("data.csv", "w", encoding="utf-8", newline="") as csv_file:
    
    writer = csv.writer(csv_file)
    writer.writerow(["Ім'я", "Вік", "Курс", "Бал"])  # Заголовки
    
    for line in txt_file:
        row = line.strip().split(",")
        writer.writerow(row)
\`\`\``
      },
      {
        title: "Обробка помилок при роботі з CSV",
        content: `**Типові помилки:**

**1. Файл не існує:**
\`\`\`python
import csv

try:
    with open("students.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            print(row)
except FileNotFoundError:
    print("Файл не знайдено!")
\`\`\`

**2. Помилка формату CSV:**
\`\`\`python
import csv

try:
    with open("students.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            вік = int(row["Вік"])  # Може викликати ValueError
except ValueError:
    print("Помилка формату даних!")
\`\`\`

**3. Відсутня колонка:**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Безпечний доступ до колонки
        бал = row.get("Бал", "0")  # Поверне "0" якщо колонки немає
        print(бал)
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання CSV з DictReader",
      code: `import csv

# Файл: students.csv
# Ім'я,Вік,Курс,Бал
# Олександр,15,Python,85
# Марія,16,Python,92

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім\\'я']}: {row['Бал']} балів")

# Виведення:
# Олександр: 85 балів
# Марія: 92 балів`,
      explanation: "Демонструє читання CSV файлу з використанням DictReader для зручного доступу до даних."
    },
    {
      title: "Приклад 2: Запис у CSV з DictWriter",
      code: `import csv

дані = [
    {"Ім'я": "Олександр", "Вік": 15, "Курс": "Python", "Бал": 85},
    {"Ім'я": "Марія", "Вік": 16, "Курс": "Python", "Бал": 92},
    {"Ім'я": "Дмитро", "Вік": 15, "Курс": "Web", "Бал": 78}
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()  # Записує заголовки
    writer.writerows(дані)  # Записує всі рядки

print("Дані збережено у students.csv")`,
      explanation: "Показує запис даних у CSV файл з використанням DictWriter."
    },
    {
      title: "Приклад 3: Аналіз даних з CSV",
      code: `import csv

# Знайти середній бал та найкращого студента
бали = []
найкращий_студент = None
найкращий_бал = 0

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        бал = int(row["Бал"])
        бали.append(бал)
        
        if бал > найкращий_бал:
            найкращий_бал = бал
            найкращий_студент = row["Ім'я"]

середній_бал = sum(бали) / len(бали) if бали else 0

print(f"Середній бал: {середній_бал:.2f}")
print(f"Найкращий студент: {найкращий_студент} ({найкращий_бал} балів)")`,
      explanation: "Демонструє обробку та аналіз даних з CSV файлу."
    },
    {
      title: "Приклад 4: Фільтрація та експорт",
      code: `import csv

# Знайти всіх студентів Python курсу та зберегти в новий файл
python_students = []

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        if row["Курс"] == "Python":
            python_students.append(row)

# Зберегти у новий файл
with open("python_students.csv", "w", encoding="utf-8", newline="") as file:
    if python_students:
        fieldnames = python_students[0].keys()
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(python_students)

print(f"Знайдено {len(python_students)} студентів Python курсу")`,
      explanation: "Показує фільтрацію даних та експорт у новий CSV файл."
    },
    {
      title: "Приклад 5: Робота з TXT файлами",
      code: `# Читання конфігураційного файлу
config = {}

with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if line and not line.startswith("#"):  # Пропускаємо коментарі
            if "=" in line:
                key, value = line.split("=", 1)
                config[key.strip()] = value.strip()

print("Конфігурація:", config)

# Запис логів
import datetime

def додати_лог(повідомлення):
    зараз = datetime.datetime.now()
    з_логом = f"{зараз.strftime('%Y-%m-%d %H:%M:%S')}: {повідомлення}\\n"
    
    with open("app.log", "a", encoding="utf-8") as file:
        file.write(з_логом)

додати_лог("Програма запущена")
додати_лог("Обробка даних")`,
      explanation: "Демонструє роботу з текстовими файлами для конфігурації та логування."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути newline='' при записі CSV",
      explanation: "Без newline='' CSV файл може містити зайві порожні рядки між записами.",
      correctApproach: "Завжди використовуйте newline='' при відкритті CSV файлу для запису: open('file.csv', 'w', encoding='utf-8', newline='')."
    },
    {
      mistake: "Використання csv.reader() замість csv.DictReader()",
      explanation: "csv.reader() повертає списки, де потрібно пам'ятати порядок колонок. DictReader зручніший.",
      correctApproach: "Використовуйте csv.DictReader() для зручного доступу до даних по назві колонки: row['Ім'я']."
    },
    {
      mistake: "Не обробляти помилки при конвертації типів",
      explanation: "Дані в CSV завжди рядки. При конвертації в int() або float() може виникнути ValueError.",
      correctApproach: "Використовуйте try/except або перевірки перед конвертацією: try: вік = int(row['Вік']) except ValueError: вік = 0."
    },
    {
      mistake: "Забути writeheader() для DictWriter",
      explanation: "Без writeheader() CSV файл не матиме заголовків, що ускладнить читання.",
      correctApproach: "Завжди викликайте writer.writeheader() перед writer.writerows() для DictWriter."
    },
    {
      mistake: "Плутанина між CSV та TXT",
      explanation: "CSV - структуровані дані (таблиця), TXT - неструктуровані (просто текст). Не плутайте формати.",
      correctApproach: "Використовуйте CSV для табличних даних, TXT для простого тексту, логів, конфігурацій."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **CSV формат** — табличні дані, розділені комами
2. **csv модуль** — стандартний модуль для роботи з CSV
3. **csv.DictReader()** — читає CSV як словники (рекомендовано)
4. **csv.DictWriter()** — записує словники в CSV (рекомендовано)
5. **newline=''** — важливо при записі CSV
6. **TXT файли** — для неструктурованих текстових даних
7. **Обробка помилок** — важливо при роботі з файлами

**Рекомендації:**
- Використовуйте DictReader/DictWriter для зручності
- Завжди вказуйте newline='' при записі CSV
- Обробляйте помилки при конвертації типів
- Використовуйте encoding='utf-8' для українського тексту

CSV ідеальний для табличних даних, TXT — для простого тексту!`,
  
  practiceTask: {
    title: "Створення системи обліку студентів",
    description: "Створіть програму для обліку студентів з використанням CSV файлів",
    problemStatement: `Створіть систему обліку студентів з наступними функціями:

**Функція 1: Додати студента**
- Запитує ім'я, вік, курс, бал
- Додає студента в CSV файл "students.csv"
- Якщо файл не існує, створює з заголовками

**Функція 2: Показати всіх студентів**
- Читає всіх студентів з CSV
- Виводить їх у зручному форматі

**Функція 3: Знайти студентів за курсом**
- Запитує назву курсу
- Шукає всіх студентів цього курсу
- Виводить результат

**Функція 4: Статистика**
- Підраховує середній бал
- Знаходить найкращого студента
- Підраховує кількість студентів на кожному курсі

**Функція 5: Експорт за курсом**
- Запитує назву курсу
- Експортує студентів цього курсу в окремий CSV файл

**Вимоги:**
- Використовуйте csv.DictReader та csv.DictWriter
- Використовуйте with для роботи з файлами
- Обробіть помилки (FileNotFoundError, ValueError)
- Використовуйте encoding='utf-8' та newline=''

**Приклад використання:**
\`\`\`
=== Система обліку студентів ===
1. Додати студента
2. Показати всіх студентів
3. Знайти за курсом
4. Статистика
5. Експорт за курсом
0. Вихід
Виберіть дію: 1
Ім'я: Олександр
Вік: 15
Курс: Python
Бал: 85
Студент додано!
\`\`\``,
    inputFormat: "Створіть програму з меню та функціями",
    outputFormat: `Приклад виведення:
=== Система обліку студентів ===
1. Додати студента
2. Показати всіх студентів
3. Знайти за курсом
4. Статистика
5. Експорт за курсом
0. Вихід

Виберіть дію: 2
=== Всі студенти ===
Олександр, 15 років, Python, 85 балів
Марія, 16 років, Python, 92 бали`,
    examples: [
      {
        input: "Додати студента: Олександр, 15, Python, 85",
        output: "Студент додано в CSV файл",
        explanation: "Програма додає студента в CSV з правильними заголовками"
      },
      {
        input: "Статистика",
        output: "Середній бал: 85.5, Найкращий: Марія (92), Python: 2 студенти",
        explanation: "Програма аналізує дані з CSV та виводить статистику"
      }
    ],
    solution: {
      code: `import csv
import os

CSV_FILE = "students.csv"
FIELDNAMES = ["Ім'я", "Вік", "Курс", "Бал"]

def додати_студента():
    """Додає нового студента в CSV файл."""
    ім_я = input("Ім'я: ")
    вік = input("Вік: ")
    курс = input("Курс: ")
    бал = input("Бал: ")
    
    # Валідація
    try:
        вік = int(вік)
        бал = int(бал)
    except ValueError:
        print("Помилка: Вік та бал мають бути числами!")
        return
    
    студент = {
        "Ім'я": ім_я,
        "Вік": str(вік),
        "Курс": курс,
        "Бал": str(бал)
    }
    
    # Перевірка, чи існує файл
    файл_існує = os.path.exists(CSV_FILE)
    
    with open(CSV_FILE, "a", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        
        # Якщо файл новий, записуємо заголовки
        if not файл_існує:
            writer.writeheader()
        
        writer.writerow(студент)
    
    print("Студент додано!")

def показати_всіх_студентів():
    """Виводить всіх студентів."""
    try:
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            студенти = list(reader)
            
            if not студенти:
                print("Список студентів порожній.")
                return
            
            print("\\n=== Всі студенти ===")
            for студент in студенти:
                print(f"{студент['Ім\\'я']}, {студент['Вік']} років, "
                      f"{студент['Курс']}, {студент['Бал']} балів")
            print()
    except FileNotFoundError:
        print("Файл не знайдено. Додайте першого студента!")

def знайти_за_курсом():
    """Знаходить студентів за курсом."""
    курс = input("Введіть назву курсу: ")
    
    try:
        знайдені = []
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["Курс"].lower() == курс.lower():
                    знайдені.append(row)
        
        if знайдені:
            print(f"\\n=== Знайдено {len(знайдені)} студентів курсу '{курс}' ===")
            for студент in знайдені:
                print(f"{студент['Ім\\'я']}, {студент['Вік']} років, "
                      f"{студент['Бал']} балів")
        else:
            print(f"Студентів курсу '{курс}' не знайдено.")
    except FileNotFoundError:
        print("Файл не знайдено!")

def статистика():
    """Виводить статистику по студентах."""
    try:
        студенти = []
        курси = {}
        
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                студенти.append(row)
                курс = row["Курс"]
                курси[курс] = курси.get(курс, 0) + 1
        
        if not студенти:
            print("Немає даних для статистики.")
            return
        
        # Середній бал
        бали = [int(с["Бал"]) for с in студенти]
        середній_бал = sum(бали) / len(бали)
        
        # Найкращий студент
        найкращий = max(студенти, key=lambda x: int(x["Бал"]))
        
        print("\\n=== Статистика ===")
        print(f"Всього студентів: {len(студенти)}")
        print(f"Середній бал: {середній_бал:.2f}")
        print(f"Найкращий студент: {найкращий['Ім\\'я']} ({найкращий['Бал']} балів)")
        print("\\nСтудентів по курсах:")
        for курс, кількість in курси.items():
            print(f"  {курс}: {кількість}")
        print()
    except FileNotFoundError:
        print("Файл не знайдено!")

def експорт_за_курсом():
    """Експортує студентів курсу в окремий файл."""
    курс = input("Введіть назву курсу для експорту: ")
    
    try:
        знайдені = []
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["Курс"].lower() == курс.lower():
                    знайдені.append(row)
        
        if not знайдені:
            print(f"Студентів курсу '{курс}' не знайдено.")
            return
        
        назва_файлу = f"{курс}_students.csv"
        with open(назва_файлу, "w", encoding="utf-8", newline="") as file:
            writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
            writer.writeheader()
            writer.writerows(знайдені)
        
        print(f"Експортовано {len(знайдені)} студентів у файл '{назва_файлу}'")
    except FileNotFoundError:
        print("Файл не знайдено!")

def головне_меню():
    """Головне меню програми."""
    while True:
        print("\\n=== Система обліку студентів ===")
        print("1. Додати студента")
        print("2. Показати всіх студентів")
        print("3. Знайти за курсом")
        print("4. Статистика")
        print("5. Експорт за курсом")
        print("0. Вихід")
        
        вибір = input("Виберіть дію: ")
        
        if вибір == "1":
            додати_студента()
        elif вибір == "2":
            показати_всіх_студентів()
        elif вибір == "3":
            знайти_за_курсом()
        elif вибір == "4":
            статистика()
        elif вибір == "5":
            експорт_за_курсом()
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір! Спробуйте ще раз.")

# Запуск програми
if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє повну систему обліку студентів з використанням CSV файлів, включаючи всі необхідні функції та обробку помилок."
    },
    hints: [
      "Використовуйте csv.DictReader та csv.DictWriter для зручності",
      "Перевіряйте існування файлу через os.path.exists() перед додаванням заголовків",
      "Використовуйте newline='' при відкритті CSV для запису",
      "Обробіть FileNotFoundError для випадку, коли файл не існує",
      "Використовуйте list(reader) для збереження всіх рядків у пам'ять для аналізу"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке CSV?",
        options: ["Текстовий файл", "Формат для табличних даних", "Бінарний файл", "Модуль Python"],
        correctAnswer: 1,
        explanation: "CSV (Comma-Separated Values) — формат для зберігання табличних даних, де значення розділені комами."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який спосіб читання CSV найзручніший?",
        options: ["csv.reader()", "csv.DictReader()", "Звичайний read()", "readlines()"],
        correctAnswer: 1,
        explanation: "csv.DictReader() найзручніший, бо дозволяє доступ до даних по назві колонки: row['Ім'я']."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що потрібно вказати при відкритті CSV для запису?\nwith open('file.csv', 'w', encoding='utf-8', ???) as file:",
        options: ["newline=''", "mode='w'", "delimiter=','", "quotechar='\"'"],
        correctAnswer: 0,
        explanation: "При записі CSV потрібно вказати newline='' щоб уникнути зайвих порожніх рядків між записами."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод DictWriter записує заголовки?",
        options: ["writeheader()", "writeheaders()", "header()", "write()"],
        correctAnswer: 0,
        explanation: "writeheader() записує заголовки (назви колонок) в CSV файл. Потрібно викликати перед writerows()."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\nimport csv\nwith open('data.csv', 'r') as f:\n    r = csv.DictReader(f)\n    for row in r:\n        print(row['Name'])\n# data.csv: Name,Age\n# John,20",
        options: ["Name", "John", "Помилку", "Name\\nJohn"],
        correctAnswer: 1,
        explanation: "DictReader читає рядки як словники. Перший рядок (заголовки) використовується як ключі, тому row['Name'] поверне 'John'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати TXT замість CSV?",
        options: ["Завжди", "Для табличних даних", "Для неструктурованого тексту, логів, конфігурацій", "Ніколи"],
        correctAnswer: 2,
        explanation: "TXT використовується для неструктурованого тексту (логи, конфігурації, документація), CSV — для табличних даних."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
