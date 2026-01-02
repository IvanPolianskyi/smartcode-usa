/**
 * Lesson 5-3: Робота з CSV та TXT
 * Perfect educational content with comprehensive examples
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
    "Розуміти різницю між CSV та TXT",
    "Практично застосовувати CSV та TXT у реальних програмах"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-5-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке CSV та навіщо він потрібен?",
        content: `**CSV (Comma-Separated Values)** — це простий текстовий формат для зберігання табличних даних.

**Структура CSV:**
- Кожен рядок = один запис (рядок таблиці)
- Значення розділені комами (або іншими роздільниками)
- Перший рядок часто містить заголовки (назви колонок)
- Простий та читабельний формат

**Приклад CSV файлу (students.csv):**
\`\`\`
Ім'я,Вік,Курс,Бал
Олександр,15,Python,85
Марія,16,Python,92
Дмитро,15,Web,78
Анна,17,Python,95
\`\`\`

**Переваги CSV:**
- ✅ **Простий формат** — легко читати та редагувати
- ✅ **Універсальність** — підтримується Excel, Google Sheets, багатьма програмами
- ✅ **Компактність** — займає мало місця
- ✅ **Сумісність** — працює на всіх платформах
- ✅ **Людсько-читабельний** — можна відкрити в текстовому редакторі

**Недоліки CSV:**
- ❌ **Немає типів даних** — все зберігається як текст
- ❌ **Проблеми з комами** — якщо в даних є коми, потрібні лапки
- ❌ **Немає підтримки вкладених структур** — тільки плоска таблиця
- ❌ **Немає стандарту** — різні програми можуть інтерпретувати по-різному

**Коли використовувати CSV:**
- Експорт/імпорт даних з Excel
- Зберігання табличних даних
- Обмін даними між програмами
- Прості бази даних
- Логування структурованих даних

**Аналогія:** CSV — як звичайна таблиця на папері, але в комп'ютері!`
      },
      {
        title: "Модуль csv: стандартний інструмент Python",
        content: `**csv модуль** — це стандартний модуль Python для роботи з CSV файлами. Він входить до стандартної бібліотеки, тому не потрібно встановлювати.

**Імпорт:**
\`\`\`python
import csv
\`\`\`

**Основні класи та функції:**

| Функція/Клас | Опис | Коли використовувати |
|--------------|------|---------------------|
| \`csv.reader()\` | Читає CSV як список списків | Коли потрібен доступ по індексу |
| \`csv.writer()\` | Записує список списків в CSV | Коли дані у вигляді списків |
| \`csv.DictReader()\` | Читає CSV як словники | **РЕКОМЕНДОВАНО** - зручніший доступ |
| \`csv.DictWriter()\` | Записує словники в CSV | **РЕКОМЕНДОВАНО** - зручніший запис |

**Переваги csv модуля:**
- ✅ **Автоматична обробка ком** — правильно обробляє коми в даних
- ✅ **Підтримка різних роздільників** — не тільки коми, але й табуляція, крапка з комою
- ✅ **Правильна обробка лапок** — автоматично екранує спеціальні символи
- ✅ **Працює з кодуваннями** — підтримує UTF-8 та інші
- ✅ **Надійність** — правильно обробляє крайові випадки

**Чому не використовувати split(',')?**
\`\`\`python
# ❌ НЕПРАВИЛЬНО - може зламатися
line = "Олександр,15,Python,85"
row = line.split(",")  # Працює, але...

# Проблема: що якщо в даних є кома?
line = "Олександр,15,\"Python, Advanced\",85"
row = line.split(",")  # Розіб'є неправильно!

# ✅ ПРАВИЛЬНО - використовуйте csv модуль
import csv
with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # Правильно обробить коми в даних
\`\`\``
      },
      {
        title: "Читання CSV файлів",
        content: `**Спосіб 1: csv.reader() (список списків)**

Повертає кожен рядок як список значень:
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  
        # ['Ім'я', 'Вік', 'Курс', 'Бал']  - перший рядок (заголовки)
        # ['Олександр', '15', 'Python', '85']
        # ['Марія', '16', 'Python', '92']

# Доступ по індексу
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    заголовки = next(reader)  # Пропускаємо перший рядок
    for row in reader:
        ім_я = row[0]  # Перша колонка
        бал = row[3]   # Четверта колонка
        print(f"{ім_я}: {бал}")
\`\`\`

**Недоліки csv.reader():**
- Потрібно пам'ятати порядок колонок
- Доступ по індексу (row[0], row[1]) - незручно
- Якщо порядок колонок зміниться, код зламається

**Спосіб 2: csv.DictReader() (словники) - РЕКОМЕНДОВАНО**

Повертає кожен рядок як словник, де ключі - назви колонок:
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
        # {'Ім'я': 'Олександр', 'Вік': '15', 'Курс': 'Python', 'Бал': '85'}
        # {'Ім'я': 'Марія', 'Вік': '16', 'Курс': 'Python', 'Бал': '92'}

# Доступ по назві колонки
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім'я']}: {row['Бал']} балів")
        # Олександр: 85 балів
        # Марія: 92 бали
\`\`\`

**Переваги DictReader:**
- ✅ Доступ по назві колонки (зручніше)
- ✅ Не потрібно пам'ятати порядок колонок
- ✅ Більш читабельний код
- ✅ Код не зламається, якщо порядок колонок зміниться

**Обробка даних з конвертацією типів:**
\`\`\`python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        ім_я = row["Ім'я"]  # Вже рядок
        вік = int(row["Вік"])  # Конвертація в число
        бал = int(row["Бал"])  # Конвертація в число
        
        if бал > 80:
            print(f"{ім_я} ({вік} років): {бал} балів - відмінник!")
\`\`\`

**Важливо:** Всі дані в CSV - це рядки! Потрібно конвертувати в числа, якщо потрібно.`
      },
      {
        title: "Запис у CSV файли",
        content: `**Спосіб 1: csv.writer() (список списків)**

Записує дані у вигляді списків:
\`\`\`python
import csv

дані = [
    ["Ім'я", "Вік", "Курс", "Бал"],  # Заголовки
    ["Олександр", "15", "Python", "85"],
    ["Марія", "16", "Python", "92"],
    ["Дмитро", "15", "Web", "78"]
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(дані)  # Записує всі рядки одразу
\`\`\`

**Або по одному рядку:**
\`\`\`python
with open("students.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Ім'я", "Вік", "Курс", "Бал"])  # Заголовки
    writer.writerow(["Олександр", "15", "Python", "85"])
    writer.writerow(["Марія", "16", "Python", "92"])
\`\`\`

**Спосіб 2: csv.DictWriter() (словники) - РЕКОМЕНДОВАНО**

Записує дані у вигляді словників:
\`\`\`python
import csv

дані = [
    {"Ім'я": "Олександр", "Вік": "15", "Курс": "Python", "Бал": "85"},
    {"Ім'я": "Марія", "Вік": "16", "Курс": "Python", "Бал": "92"},
    {"Ім'я": "Дмитро", "Вік": "15", "Курс": "Web", "Бал": "78"}
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]  # Порядок колонок
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()  # Записує заголовки (обов'язково!)
    writer.writerows(дані)  # Записує всі рядки
\`\`\`

**Або по одному рядку:**
\`\`\`python
with open("students.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerow({"Ім'я": "Олександр", "Вік": "15", "Курс": "Python", "Бал": "85"})
    writer.writerow({"Ім'я": "Марія", "Вік": "16", "Курс": "Python", "Бал": "92"})
\`\`\`

**Важливі моменти:**

1. **newline=""** — обов'язково вказуйте при записі CSV!
   - Без цього можуть з'явитися зайві порожні рядки
   - Це специфіка роботи з CSV в Python

2. **writeheader()** — записує заголовки (тільки для DictWriter)
   - Викликайте перед writerows() або writerow()
   - Без цього CSV не матиме заголовків

3. **fieldnames** — визначає порядок та назви колонок
   - Для DictWriter обов'язковий параметр
   - Визначає порядок запису колонок

4. **Дані як рядки** — всі значення мають бути рядками
   - Числа конвертуйте: str(85)
   - DictWriter автоматично обробить це`
      },
      {
        title: "Робота з TXT файлами",
        content: `**TXT (текстові файли)** — це прості файли, які містять тільки текст без структури.

**Відмінності CSV vs TXT:**

| Аспект | CSV | TXT |
|--------|-----|-----|
| **Структура** | Табличні дані (рядки та колонки) | Неструктуровані дані (просто текст) |
| **Формат** | Значення розділені комами | Вільний формат |
| **Використання** | Таблиці, бази даних | Логи, конфігурації, документація |
| **Обробка** | Потрібен csv модуль | Звичайне читання/запис |

**Коли використовувати TXT:**
- 📝 **Логи програми** — запис подій та помилок
- ⚙️ **Конфігураційні файли** — налаштування програми
- 📄 **Документація** — текстові документи
- 📋 **Простий текст** — без структури
- 🗒️ **Нотатки** — вільний текст

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
        print(line.strip())  # strip() видаляє \\n та пробіли
\`\`\`

**3. Запис у файл:**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Рядок 1\\n")
    file.write("Рядок 2\\n")
    file.write("Рядок 3\\n")
\`\`\`

**4. Додавання до файлу (лог):**
\`\`\`python
from datetime import datetime

def додати_лог(повідомлення):
    зараз = datetime.now()
    дата_час = зараз.strftime("%Y-%m-%d %H:%M:%S")
    
    with open("app.log", "a", encoding="utf-8") as file:
        file.write(f"{дата_час}: {повідомлення}\\n")

додати_лог("Програма запущена")
додати_лог("Обробка даних")
\`\`\`

**5. Обробка структурованих TXT (key=value):**
\`\`\`python
# Файл config.txt:
# database_host=localhost
# database_port=5432
# debug=True

config = {}
with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if line and not line.startswith("#"):  # Пропускаємо коментарі
            if "=" in line:
                key, value = line.split("=", 1)  # split максимум на 2 частини
                config[key.strip()] = value.strip()

print(config)
# {'database_host': 'localhost', 'database_port': '5432', 'debug': 'True'}
\`\`\`

**6. Обробка багаторядкового тексту:**
\`\`\`python
# Читання та обробка тексту
with open("document.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
    
    # Підрахунок слів
    word_count = 0
    for line in lines:
        words = line.split()
        word_count += len(words)
    
    print(f"Рядків: {len(lines)}")
    print(f"Слів: {word_count}")
\`\`\``
      },
      {
        title: "Практичні приклади та застосування",
        content: `**Приклад 1: Аналіз даних з CSV**

Знайти студентів з балами вище середнього:
\`\`\`python
import csv

# Спочатку знаходимо середній бал
бали = []
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        бали.append(int(row["Бал"]))

середній_бал = sum(бали) / len(бали) if бали else 0

# Знаходимо студентів вище середнього
відмінники = []
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        if int(row["Бал"]) > середній_бал:
            відмінники.append(row["Ім'я"])

print(f"Середній бал: {середній_бал:.2f}")
print(f"Відмінники: {відмінники}")
\`\`\`

**Приклад 2: Експорт даних у CSV**

Експортувати дані з програми в CSV:
\`\`\`python
import csv

студенти = [
    {"Ім'я": "Олександр", "Вік": 15, "Курс": "Python", "Бал": 85},
    {"Ім'я": "Марія", "Вік": 16, "Курс": "Python", "Бал": 92},
    {"Ім'я": "Дмитро", "Вік": 15, "Курс": "Web", "Бал": 78}
]

with open("export.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(студенти)

print("Дані експортовано в export.csv")
\`\`\`

**Приклад 3: Конвертація TXT в CSV**

Якщо дані в TXT файлі розділені комами:
\`\`\`python
import csv

# TXT файл data.txt:
# Олександр,15,Python,85
# Марія,16,Python,92

with open("data.txt", "r", encoding="utf-8") as txt_file, \\
     open("data.csv", "w", encoding="utf-8", newline="") as csv_file:
    
    writer = csv.writer(csv_file)
    writer.writerow(["Ім'я", "Вік", "Курс", "Бал"])  # Заголовки
    
    for line in txt_file:
        row = line.strip().split(",")
        writer.writerow(row)

print("Конвертацію завершено!")
\`\`\`

**Приклад 4: Фільтрація та експорт**

Знайти всіх студентів Python курсу та зберегти в новий файл:
\`\`\`python
import csv

python_students = []

# Читання та фільтрація
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        if row["Курс"] == "Python":
            python_students.append(row)

# Експорт у новий файл
if python_students:
    with open("python_students.csv", "w", encoding="utf-8", newline="") as file:
        fieldnames = python_students[0].keys()
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(python_students)
    
    print(f"Експортовано {len(python_students)} студентів Python курсу")
\`\`\`

**Приклад 5: Оновлення даних в CSV**

Додати новий запис до існуючого CSV:
\`\`\`python
import csv
import os

новий_студент = {"Ім'я": "Анна", "Вік": "17", "Курс": "Python", "Бал": "95"}

# Перевірка, чи існує файл
файл_існує = os.path.exists("students.csv")

with open("students.csv", "a", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # Якщо файл новий, додаємо заголовки
    if not файл_існує:
        writer.writeheader()
    
    writer.writerow(новий_студент)

print("Студента додано!")
\`\`\``
      },
      {
        title: "Обробка помилок при роботі з CSV",
        content: `**Типові помилки та їх обробка:**

**1. Файл не існує (FileNotFoundError):**
\`\`\`python
import csv

try:
    with open("students.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            print(row)
except FileNotFoundError:
    print("Помилка: Файл 'students.csv' не знайдено!")
    print("Створіть файл або перевірте шлях.")
\`\`\`

**2. Помилка формату даних (ValueError):**
\`\`\`python
import csv

try:
    with open("students.csv", "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            вік = int(row["Вік"])  # Може викликати ValueError
            бал = int(row["Бал"])
            print(f"Вік: {вік}, Бал: {бал}")
except ValueError as e:
    print(f"Помилка формату даних: {e}")
    print("Перевірте, чи всі числа записані правильно.")
\`\`\`

**3. Відсутня колонка (KeyError):**
\`\`\`python
import csv

# Безпечний доступ до колонки
with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Спосіб 1: get() з значенням за замовчуванням
        бал = row.get("Бал", "0")  # Поверне "0" якщо колонки немає
        
        # Спосіб 2: try/except
        try:
            бал = row["Бал"]
        except KeyError:
            бал = "0"
        
        print(f"Бал: {бал}")
\`\`\`

**4. Помилка запису (PermissionError):**
\`\`\`python
import csv

try:
    with open("students.csv", "w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=["Ім'я", "Вік"])
        writer.writeheader()
except PermissionError:
    print("Помилка: Немає доступу до файлу!")
    print("Перевірте права доступу або закрийте файл в іншій програмі.")
\`\`\`

**5. Комплексна обробка помилок:**
\`\`\`python
import csv
import os

def безпечно_читати_csv(назва_файлу):
    """Безпечно читає CSV файл з обробкою помилок."""
    try:
        if not os.path.exists(назва_файлу):
            print(f"Файл '{назва_файлу}' не знайдено!")
            return []
        
        студенти = []
        with open(назва_файлу, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    # Валідація даних
                    вік = int(row.get("Вік", "0"))
                    бал = int(row.get("Бал", "0"))
                    
                    if вік < 0 or вік > 150:
                        print(f"Попередження: Невірний вік для {row.get('Ім'я', 'невідомо')}")
                        continue
                    
                    студенти.append(row)
                except ValueError:
                    print(f"Попередження: Помилка формату даних у рядку")
                    continue
        
        return студенти
    except PermissionError:
        print(f"Помилка: Немає доступу до файлу '{назва_файлу}'")
        return []
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return []

# Використання
студенти = безпечно_читати_csv("students.csv")
print(f"Завантажено {len(студенти)} студентів")
\`\`\``
      },
      {
        title: "Практичні поради та найкращі практики",
        content: `**1. Завжди використовуйте DictReader/DictWriter:**
\`\`\`python
# ✅ Правильно - зручніший доступ
with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["Ім'я"])

# ❌ Неправильно - потрібно пам'ятати порядок
with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row[0])  # Що якщо порядок зміниться?
\`\`\`

**2. Завжди вказуйте newline='' при записі:**
\`\`\`python
# ✅ Правильно
with open("data.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

# ❌ Неправильно - можуть з'явитися зайві рядки
with open("data.csv", "w", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
\`\`\`

**3. Обробляйте помилки конвертації типів:**
\`\`\`python
# ✅ Правильно
try:
    вік = int(row["Вік"])
except ValueError:
    вік = 0  # Значення за замовчуванням

# ❌ Неправильно - може викликати помилку
вік = int(row["Вік"])  # Що якщо "Вік" не число?
\`\`\`

**4. Використовуйте get() для безпечного доступу:**
\`\`\`python
# ✅ Правильно
бал = row.get("Бал", "0")  # Поверне "0" якщо колонки немає

# ❌ Неправильно - може викликати KeyError
бал = row["Бал"]  # Що якщо колонки немає?
\`\`\`

**5. Перевіряйте існування файлу перед додаванням заголовків:**
\`\`\`python
# ✅ Правильно
import os
файл_існує = os.path.exists("data.csv")

with open("data.csv", "a", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    if not файл_існує:
        writer.writeheader()
    writer.writerow(новий_рядок)
\`\`\`

**6. Використовуйте encoding='utf-8' для українського тексту:**
\`\`\`python
# ✅ Правильно
with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

# ❌ Неправильно - може не прочитати українські літери
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
\`\`\`

**7. Для великих CSV використовуйте ітерацію:**
\`\`\`python
# ✅ Правильно - не завантажує весь файл в пам'ять
with open("large.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        process(row)  # Обробляємо по рядку

# ❌ Неправильно - завантажує весь файл
with open("large.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    всі_рядки = list(reader)  # Може викликати проблеми з пам'яттю
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
# Дмитро,15,Web,78

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Ім'я']}: {row['Бал']} балів")

# Виведення:
# Олександр: 85 балів
# Марія: 92 бали
# Дмитро: 78 балів`,
      explanation: "Демонструє читання CSV файлу з використанням DictReader для зручного доступу до даних по назві колонки."
    },
    {
      title: "Приклад 2: Запис у CSV з DictWriter",
      code: `import csv

дані = [
    {"Ім'я": "Олександр", "Вік": "15", "Курс": "Python", "Бал": "85"},
    {"Ім'я": "Марія", "Вік": "16", "Курс": "Python", "Бал": "92"},
    {"Ім'я": "Дмитро", "Вік": "15", "Курс": "Web", "Бал": "78"}
]

with open("students.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()  # Записує заголовки
    writer.writerows(дані)  # Записує всі рядки

print("Дані збережено у students.csv")`,
      explanation: "Показує запис даних у CSV файл з використанням DictWriter. Зверніть увагу на newline='' та writeheader()."
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
      explanation: "Демонструє обробку та аналіз даних з CSV файлу: підрахунок середнього балу та пошук найкращого студента."
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
if python_students:
    with open("python_students.csv", "w", encoding="utf-8", newline="") as file:
        fieldnames = python_students[0].keys()
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(python_students)
    
    print(f"Знайдено {len(python_students)} студентів Python курсу")
    print("Дані збережено у python_students.csv")`,
      explanation: "Показує фільтрацію даних (пошук студентів Python курсу) та експорт у новий CSV файл."
    },
    {
      title: "Приклад 5: Додавання нового запису",
      code: `import csv
import os

новий_студент = {
    "Ім'я": "Анна",
    "Вік": "17",
    "Курс": "Python",
    "Бал": "95"
}

# Перевірка, чи існує файл
файл_існує = os.path.exists("students.csv")

with open("students.csv", "a", encoding="utf-8", newline="") as file:
    fieldnames = ["Ім'я", "Вік", "Курс", "Бал"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # Якщо файл новий, додаємо заголовки
    if not файл_існує:
        writer.writeheader()
    
    writer.writerow(новий_студент)

print("Студента додано!")`,
      explanation: "Демонструє додавання нового запису до існуючого CSV файлу з перевіркою існування файлу."
    },
    {
      title: "Приклад 6: Робота з TXT файлами",
      code: `# Читання конфігураційного файлу
config = {}

# Файл config.txt:
# database_host=localhost
# database_port=5432
# debug=True
# # Це коментар

with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if line and not line.startswith("#"):  # Пропускаємо коментарі
            if "=" in line:
                key, value = line.split("=", 1)
                config[key.strip()] = value.strip()

print("Конфігурація:", config)
# {'database_host': 'localhost', 'database_port': '5432', 'debug': 'True'}

# Запис логів
from datetime import datetime

def додати_лог(повідомлення):
    зараз = datetime.now()
    з_логом = f"{зараз.strftime('%Y-%m-%d %H:%M:%S')}: {повідомлення}\\n"
    
    with open("app.log", "a", encoding="utf-8") as file:
        file.write(з_логом)

додати_лог("Програма запущена")
додати_лог("Обробка даних")
додати_лог("Програма завершена")`,
      explanation: "Демонструє роботу з текстовими файлами для конфігурації (key=value формат) та логування з датою та часом."
    },
    {
      title: "Приклад 7: Безпечне читання з обробкою помилок",
      code: `import csv
import os

def безпечно_читати_csv(назва_файлу):
    """Безпечно читає CSV файл з обробкою помилок."""
    try:
        if not os.path.exists(назва_файлу):
            print(f"Файл '{назва_файлу}' не знайдено!")
            return []
        
        студенти = []
        with open(назва_файлу, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    # Валідація даних
                    вік = int(row.get("Вік", "0"))
                    бал = int(row.get("Бал", "0"))
                    
                    if вік < 0 or вік > 150:
                        print(f"Попередження: Невірний вік для {row.get('Ім'я', 'невідомо')}")
                        continue
                    
                    студенти.append(row)
                except ValueError:
                    print(f"Попередження: Помилка формату даних у рядку")
                    continue
        
        return студенти
    except PermissionError:
        print(f"Помилка: Немає доступу до файлу '{назва_файлу}'")
        return []
    except Exception as e:
        print(f"Невідома помилка: {e}")
        return []

# Використання
студенти = безпечно_читати_csv("students.csv")
print(f"Завантажено {len(студенти)} студентів")`,
      explanation: "Показує комплексну обробку помилок при роботі з CSV: перевірка існування файлу, валідація даних, обробка різних типів помилок."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути newline='' при записі CSV",
      explanation: "Без newline='' CSV файл може містити зайві порожні рядки між записами, особливо на Windows. Це може зламати читання файлу в інших програмах.",
      correctApproach: "Завжди використовуйте newline='' при відкритті CSV файлу для запису: open('file.csv', 'w', encoding='utf-8', newline='')."
    },
    {
      mistake: "Використання csv.reader() замість csv.DictReader()",
      explanation: "csv.reader() повертає списки, де потрібно пам'ятати порядок колонок (row[0], row[1]). Якщо порядок колонок зміниться, код зламається. DictReader зручніший та безпечніший.",
      correctApproach: "Використовуйте csv.DictReader() для зручного доступу до даних по назві колонки: row['Ім'я']. Це робить код більш читабельним та стійким до змін."
    },
    {
      mistake: "Не обробляти помилки при конвертації типів",
      explanation: "Дані в CSV завжди рядки. При конвертації в int() або float() може виникнути ValueError, якщо дані не є числами. Це може зупинити програму.",
      correctApproach: "Використовуйте try/except або перевірки перед конвертацією: try: вік = int(row['Вік']) except ValueError: вік = 0. Або використовуйте row.get('Вік', '0') для безпечного доступу."
    },
    {
      mistake: "Забути writeheader() для DictWriter",
      explanation: "Без writeheader() CSV файл не матиме заголовків (назв колонок), що ускладнить читання файлу та роботу з ним в Excel або інших програмах.",
      correctApproach: "Завжди викликайте writer.writeheader() перед writer.writerows() або writer.writerow() для DictWriter. Це записує назви колонок у перший рядок."
    },
    {
      mistake: "Плутанина між CSV та TXT",
      explanation: "CSV - структуровані дані (таблиця з рядками та колонками), TXT - неструктуровані (просто текст). Використання неправильного формату ускладнює обробку даних.",
      correctApproach: "Використовуйте CSV для табличних даних (бази даних, експорт з Excel), TXT для простого тексту (логи, конфігурації, документація)."
    },
    {
      mistake: "Не перевіряти існування файлу перед додаванням заголовків",
      explanation: "Якщо файл вже існує і ви додаєте дані в режимі 'a', але викликаєте writeheader(), заголовки додадуться знову, що створить дублікати.",
      correctApproach: "Перевіряйте існування файлу через os.path.exists() перед додаванням заголовків: if not os.path.exists('file.csv'): writer.writeheader()."
    },
    {
      mistake: "Забути encoding='utf-8' для українського тексту",
      explanation: "Без encoding='utf-8' Python може не прочитати українські літери (ґ, є, і, ї) з CSV файлу, виникне UnicodeDecodeError.",
      correctApproach: "Завжди вказуйте encoding='utf-8' при роботі з CSV файлами: open('file.csv', 'r', encoding='utf-8')."
    },
    {
      mistake: "Завантажувати весь великий CSV файл в пам'ять",
      explanation: "Використання list(reader) для великих CSV файлів завантажує весь файл в пам'ять, що може викликати проблеми з пам'яттю та сповільнити програму.",
      correctApproach: "Для великих файлів використовуйте ітерацію: for row in reader: process(row). Це обробляє файл по рядку, не завантажуючи весь вміст в пам'ять."
    }
  ],
  
  summary: `На цьому уроці ми вивчили роботу з CSV та TXT файлами:

**Ключові концепції:**
1. **CSV формат** — табличні дані, розділені комами
2. **csv модуль** — стандартний модуль Python для роботи з CSV
3. **csv.DictReader()** — читає CSV як словники (РЕКОМЕНДОВАНО)
4. **csv.DictWriter()** — записує словники в CSV (РЕКОМЕНДОВАНО)
5. **newline=''** — обов'язково при записі CSV
6. **TXT файли** — для неструктурованих текстових даних
7. **Обробка помилок** — важливо при роботі з файлами

**Практичні поради:**
- Використовуйте DictReader/DictWriter для зручності
- Завжди вказуйте newline='' при записі CSV
- Обробляйте помилки при конвертації типів (int, float)
- Використовуйте encoding='utf-8' для українського тексту
- Перевіряйте існування файлу перед додаванням заголовків
- Для великих файлів використовуйте ітерацію, а не list()

**Вибір формату:**
- **CSV** — для табличних даних, експорт/імпорт, бази даних
- **TXT** — для логів, конфігурацій, документації, простого тексту

CSV ідеальний для структурованих табличних даних, TXT — для неструктурованого тексту!`,
  
  practiceTask: {
    title: "Створення системи обліку студентів з CSV",
    description: "Створіть повноцінну програму для обліку студентів з використанням CSV файлів та всіх набутих знань",
    problemStatement: `Створіть систему обліку студентів з наступними функціями:

**Функція 1: Додати студента**
- Запитує ім'я, вік, курс, бал
- Валідує дані (вік та бал мають бути числами)
- Додає студента в CSV файл "students.csv"
- Якщо файл не існує, створює з заголовками
- Використовує режим 'a' для додавання

**Функція 2: Показати всіх студентів**
- Читає всіх студентів з CSV
- Виводить їх у зручному форматі з нумерацією
- Обробляє випадок, коли файл порожній або не існує

**Функція 3: Знайти студентів за курсом**
- Запитує назву курсу
- Шукає всіх студентів цього курсу (нечутливо до регістру)
- Виводить результат з статистикою

**Функція 4: Статистика**
- Підраховує загальну кількість студентів
- Обчислює середній бал
- Знаходить найкращого та найгіршого студента
- Підраховує кількість студентів на кожному курсі
- Виводить відсоток відмінників (бал >= 90)

**Функція 5: Експорт за курсом**
- Запитує назву курсу
- Експортує студентів цього курсу в окремий CSV файл
- Назва файлу: "курс_students.csv" (наприклад, "Python_students.csv")
- Використовує DictWriter з заголовками

**Функція 6: Оновити бал студента**
- Запитує ім'я студента та новий бал
- Знаходить студента в CSV
- Оновлює його бал
- Зберігає оновлені дані

**Вимоги:**
- Використовуйте csv.DictReader та csv.DictWriter
- Використовуйте with для роботи з файлами
- Обробіть помилки (FileNotFoundError, ValueError, KeyError)
- Використовуйте encoding='utf-8' та newline=''
- Перевіряйте існування файлу через os.path.exists()
- Валідуйте вхідні дані
- Створіть зручне меню для навігації

**Приклад використання:**
\`\`\`
=== Система обліку студентів ===
1. Додати студента
2. Показати всіх студентів
3. Знайти за курсом
4. Статистика
5. Експорт за курсом
6. Оновити бал студента
0. Вихід
Виберіть дію: 1
Ім'я: Олександр
Вік: 15
Курс: Python
Бал: 85
Студент додано!

Виберіть дію: 4
=== Статистика ===
Всього студентів: 3
Середній бал: 85.00
Найкращий студент: Марія (92 балів)
Найгірший студент: Дмитро (78 балів)
Студентів по курсах:
  Python: 2
  Web: 1
Відмінників: 33.33%
\`\`\``,
    inputFormat: "Створіть програму з меню та функціями. Користувач вводить числа для вибору дії та дані студентів.",
    outputFormat: `Приклад виведення:
=== Система обліку студентів ===
1. Додати студента
2. Показати всіх студентів
3. Знайти за курсом
4. Статистика
5. Експорт за курсом
6. Оновити бал студента
0. Вихід

Виберіть дію: 2
=== Всі студенти ===
1. Олександр, 15 років, Python, 85 балів
2. Марія, 16 років, Python, 92 бали
3. Дмитро, 15 років, Web, 78 балів`,
    examples: [
      {
        input: "Додати студента: Олександр, 15, Python, 85",
        output: "Студент додано в CSV файл з правильними заголовками",
        explanation: "Програма додає студента в CSV, перевіряючи існування файлу та додаючи заголовки, якщо потрібно."
      },
      {
        input: "Статистика",
        output: "Середній бал: 85.5, Найкращий: Марія (92), Python: 2 студенти, Відмінників: 33%",
        explanation: "Програма аналізує дані з CSV, обчислює статистику та виводить детальну інформацію."
      },
      {
        input: "Експорт за курсом: Python",
        output: "Створено файл Python_students.csv зі студентами Python курсу",
        explanation: "Програма фільтрує студентів за курсом та експортує їх у окремий CSV файл."
      }
    ],
    solution: {
      code: `import csv
import os

CSV_FILE = "students.csv"
FIELDNAMES = ["Ім'я", "Вік", "Курс", "Бал"]

def додати_студента():
    """Додає нового студента в CSV файл."""
    ім_я = input("Ім'я: ").strip()
    вік_рядок = input("Вік: ").strip()
    курс = input("Курс: ").strip()
    бал_рядок = input("Бал: ").strip()
    
    # Валідація
    if not ім_я or not курс:
        print("Помилка: Ім'я та курс не можуть бути порожніми!")
        return
    
    try:
        вік = int(вік_рядок)
        бал = int(бал_рядок)
        
        if вік < 0 or вік > 150:
            print("Помилка: Вік має бути від 0 до 150!")
            return
        
        if бал < 0 or бал > 100:
            print("Помилка: Бал має бути від 0 до 100!")
            return
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
    
    try:
        with open(CSV_FILE, "a", encoding="utf-8", newline="") as file:
            writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
            
            # Якщо файл новий, записуємо заголовки
            if not файл_існує:
                writer.writeheader()
            
            writer.writerow(студент)
        
        print("Студент додано!")
    except Exception as e:
        print(f"Помилка при додаванні: {e}")

def показати_всіх_студентів():
    """Виводить всіх студентів."""
    try:
        if not os.path.exists(CSV_FILE):
            print("Файл не знайдено. Додайте першого студента!")
            return
        
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            студенти = list(reader)
            
            if not студенти:
                print("Список студентів порожній.")
                return
            
            print("\\n=== Всі студенти ===")
            for номер, студент in enumerate(студенти, 1):
                print(f"{номер}. {студент['Ім'я']}, {студент['Вік']} років, "
                      f"{студент['Курс']}, {студент['Бал']} балів")
            print()
    except Exception as e:
        print(f"Помилка при читанні: {e}")

def знайти_за_курсом():
    """Знаходить студентів за курсом."""
    курс = input("Введіть назву курсу: ").strip()
    
    if not курс:
        print("Помилка: Назва курсу не може бути порожньою!")
        return
    
    try:
        if not os.path.exists(CSV_FILE):
            print("Файл не знайдено!")
            return
        
        знайдені = []
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["Курс"].lower() == курс.lower():
                    знайдені.append(row)
        
        if знайдені:
            print(f"\\n=== Знайдено {len(знайдені)} студентів курсу '{курс}' ===")
            for студент in знайдені:
                print(f"{студент['Ім'я']}, {студент['Вік']} років, "
                      f"{студент['Бал']} балів")
            
            # Статистика по курсу
            бали = [int(с["Бал"]) for с in знайдені]
            середній = sum(бали) / len(бали)
            print(f"\\nСередній бал по курсу: {середній:.2f}")
        else:
            print(f"Студентів курсу '{курс}' не знайдено.")
    except Exception as e:
        print(f"Помилка: {e}")

def статистика():
    """Виводить статистику по студентах."""
    try:
        if not os.path.exists(CSV_FILE):
            print("Файл не знайдено!")
            return
        
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
        
        # Найкращий та найгірший студент
        найкращий = max(студенти, key=lambda x: int(x["Бал"]))
        найгірший = min(студенти, key=lambda x: int(x["Бал"]))
        
        # Відмінники (бал >= 90)
        відмінники = [с for с in студенти if int(с["Бал"]) >= 90]
        відсоток_відмінників = (len(відмінники) / len(студенти)) * 100
        
        print("\\n=== Статистика ===")
        print(f"Всього студентів: {len(студенти)}")
        print(f"Середній бал: {середній_бал:.2f}")
        print(f"Найкращий студент: {найкращий['Ім'я']} ({найкращий['Бал']} балів)")
        print(f"Найгірший студент: {найгірший['Ім'я']} ({найгірший['Бал']} балів)")
        print("\\nСтудентів по курсах:")
        for курс, кількість in курси.items():
            print(f"  {курс}: {кількість}")
        print(f"Відмінників (бал >= 90): {len(відмінники)} ({відсоток_відмінників:.2f}%)")
        print()
    except Exception as e:
        print(f"Помилка: {e}")

def експорт_за_курсом():
    """Експортує студентів курсу в окремий файл."""
    курс = input("Введіть назву курсу для експорту: ").strip()
    
    if not курс:
        print("Помилка: Назва курсу не може бути порожньою!")
        return
    
    try:
        if not os.path.exists(CSV_FILE):
            print("Файл не знайдено!")
            return
        
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
    except Exception as e:
        print(f"Помилка: {e}")

def оновити_бал_студента():
    """Оновлює бал студента."""
    ім_я = input("Введіть ім'я студента: ").strip()
    новий_бал_рядок = input("Введіть новий бал: ").strip()
    
    if not ім_я:
        print("Помилка: Ім'я не може бути порожнім!")
        return
    
    try:
        новий_бал = int(новий_бал_рядок)
        if новий_бал < 0 or новий_бал > 100:
            print("Помилка: Бал має бути від 0 до 100!")
            return
    except ValueError:
        print("Помилка: Бал має бути числом!")
        return
    
    try:
        if not os.path.exists(CSV_FILE):
            print("Файл не знайдено!")
            return
        
        # Читаємо всіх студентів
        студенти = []
        знайдено = False
        
        with open(CSV_FILE, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["Ім'я"].lower() == ім_я.lower():
                    row["Бал"] = str(новий_бал)
                    знайдено = True
                студенти.append(row)
        
        if not знайдено:
            print(f"Студента '{ім_я}' не знайдено!")
            return
        
        # Записуємо оновлені дані
        with open(CSV_FILE, "w", encoding="utf-8", newline="") as file:
            writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
            writer.writeheader()
            writer.writerows(студенти)
        
        print(f"Бал студента '{ім_я}' оновлено до {новий_бал}!")
    except Exception as e:
        print(f"Помилка: {e}")

def головне_меню():
    """Головне меню програми."""
    while True:
        print("\\n=== Система обліку студентів ===")
        print("1. Додати студента")
        print("2. Показати всіх студентів")
        print("3. Знайти за курсом")
        print("4. Статистика")
        print("5. Експорт за курсом")
        print("6. Оновити бал студента")
        print("0. Вихід")
        
        вибір = input("Виберіть дію: ").strip()
        
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
        elif вибір == "6":
            оновити_бал_студента()
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір! Спробуйте ще раз.")

# Запуск програми
if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє повну систему обліку студентів з використанням CSV файлів. Включає всі необхідні функції, валідацію даних, обробку помилок, статистику та експорт. Кожна функція використовує with, DictReader/DictWriter, та правильно обробляє помилки."
    },
    hints: [
      "Використовуйте csv.DictReader та csv.DictWriter для зручності",
      "Перевіряйте існування файлу через os.path.exists() перед додаванням заголовків",
      "Використовуйте newline='' при відкритті CSV для запису",
      "Обробіть FileNotFoundError, ValueError, KeyError для різних типів помилок",
      "Використовуйте list(reader) для збереження всіх рядків у пам'ять для оновлення",
      "Для оновлення читайте весь файл, змінюйте дані, потім перезаписуйте",
      "Валідуйте вхідні дані (вік, бал мають бути в допустимих межах)",
      "Використовуйте .lower() для нечутливого пошуку"
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
        explanation: "CSV (Comma-Separated Values) — формат для зберігання табличних даних, де значення розділені комами. Кожен рядок - це один запис таблиці."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який спосіб читання CSV найзручніший та найбезпечніший?",
        options: ["csv.reader()", "csv.DictReader()", "Звичайний read()", "readlines()"],
        correctAnswer: 1,
        explanation: "csv.DictReader() найзручніший та найбезпечніший, бо дозволяє доступ до даних по назві колонки (row['Ім'я']), не потрібно пам'ятати порядок колонок, код не зламається при зміні порядку."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що потрібно вказати при відкритті CSV для запису?\n\n```python\nwith open('file.csv', 'w', encoding='utf-8', ???) as file:\n    writer = csv.DictWriter(file, fieldnames=fieldnames)\n```",
        options: ["newline=''", "mode='w'", "delimiter=','", "quotechar='\"'"],
        correctAnswer: 0,
        explanation: "При записі CSV потрібно вказати newline='' щоб уникнути зайвих порожніх рядків між записами. Це особливо важливо на Windows."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод DictWriter записує заголовки (назви колонок)?",
        options: ["writeheader()", "writeheaders()", "header()", "write()"],
        correctAnswer: 0,
        explanation: "writeheader() записує заголовки (назви колонок) в CSV файл. Потрібно викликати перед writerows() або writerow(). Без цього CSV не матиме заголовків."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nimport csv\nwith open('data.csv', 'r', encoding='utf-8') as f:\n    r = csv.DictReader(f)\n    for row in r:\n        print(row['Name'])\n# data.csv:\n# Name,Age\n# John,20\n# Mary,25\n```",
        options: ["Name\\nJohn\\nMary", "John\\nMary", "Помилку", "Name"],
        correctAnswer: 1,
        explanation: "DictReader читає рядки як словники. Перший рядок (заголовки) використовується як ключі, тому row['Name'] для першого рядка даних поверне 'John', для другого - 'Mary'."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати TXT замість CSV?",
        options: ["Завжди", "Для табличних даних", "Для неструктурованого тексту, логів, конфігурацій", "Ніколи"],
        correctAnswer: 2,
        explanation: "TXT використовується для неструктурованого тексту (логи, конфігурації, документація, нотатки), CSV — для табличних даних (бази даних, експорт з Excel, структуровані дані)."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип даних повертає csv.DictReader() для кожного рядка?",
        options: ["Список", "Словник", "Рядок", "Кортеж"],
        correctAnswer: 1,
        explanation: "csv.DictReader() повертає кожен рядок як словник (dict), де ключі - це назви колонок з першого рядка, а значення - дані з поточного рядка."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться, якщо не вказати newline='' при записі CSV?\n\n```python\nwith open('data.csv', 'w', encoding='utf-8') as file:\n    writer = csv.writer(file)\n    writer.writerow(['a', 'b', 'c'])\n```",
        options: ["Нічого", "Можуть з'явитися зайві порожні рядки", "Файл не створиться", "Помилка кодування"],
        correctAnswer: 1,
        explanation: "Без newline='' можуть з'явитися зайві порожні рядки між записами, особливо на Windows. Це може зламати читання файлу в інших програмах."
      },
      {
        id: "q9",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який тип даних мають всі значення в CSV файлі?",
        options: ["Числа", "Рядки (str)", "Залежить від колонки", "Булеві значення"],
        correctAnswer: 1,
        explanation: "Всі дані в CSV файлі зберігаються як рядки (str). Якщо потрібні числа, потрібно конвертувати: int(row['Вік']) або float(row['Бал'])."
      },
      {
        id: "q10",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому краще використовувати csv модуль замість split(',')?",
        options: ["Швидше працює", "Правильно обробляє коми в даних та спеціальні символи", "Менше пам'яті використовує", "Підтримує більше форматів"],
        correctAnswer: 1,
        explanation: "csv модуль правильно обробляє коми всередині даних (якщо дані в лапках), спеціальні символи, різні роздільники, та інші крайові випадки. split(',') може зламатися на складних даних."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
