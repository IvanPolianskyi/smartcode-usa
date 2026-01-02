/**
 * Lesson 5-2: Контекстний менеджер with
 * Perfect educational content with comprehensive examples
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_2 = {
  lessonId: "lesson-5-2",
  moduleId: "module-5",
  order: 2,
  title: "Контекстний менеджер with",
  
  learningObjectives: [
    "Використовувати контекстний менеджер with",
    "Розуміти переваги with перед звичайним open()",
    "Автоматично закривати файли",
    "Уникати витоку ресурсів",
    "Розуміти принцип роботи контекстних менеджерів",
    "Практично застосовувати with у реальних програмах"
  ],
  
  estimatedTime: 60,
  prerequisites: ["lesson-5-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Проблема з ручним закриттям файлів",
        content: `**Проблема:** У попередньому уроці ми вивчили, що потрібно завжди закривати файли методом \`close()\`. Але це легко забути або зробити неправильно.

**Приклади проблем:**

**Проблема 1: Забули close()**
\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
# Забули file.close() - файл залишився відкритим!
# Дані можуть не зберегтися, файл заблокований
\`\`\`

**Проблема 2: Помилка перед close()**
\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
result = 10 / 0  # Помилка ділення на нуль!
file.close()  # Цей рядок НЕ виконається через помилку вище
# Файл залишився відкритим!
\`\`\`

**Проблема 3: Складні умови**
\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
if умова:
    content = file.read()
    file.close()  # Закриваємо тут
else:
    # А що якщо тут теж потрібно закрити?
    # Легко забути!
    pass
\`\`\`

**Наслідки:**
- Файл залишається відкритим
- Дані можуть не зберегтися (буфер не записаний)
- Файл може бути заблокований для інших програм
- Витрата ресурсів пам'яті
- Потенційні витоки ресурсів

**Рішення:** Контекстний менеджер \`with\`!`
      },
      {
        title: "Що таке контекстний менеджер with?",
        content: `**Контекстний менеджер** — це об'єкт Python, який автоматично виконує дії при вході та виході з блоку коду.

**Синтаксис:**
\`\`\`python
with open("файл.txt", "режим", encoding="utf-8") as file:
    # Робота з файлом
    content = file.read()
    print(content)
# Тут файл автоматично закриється!
\`\`\`

**Як це працює:**
1. **Вхід у блок:** Python викликає метод \`__enter__()\`, який відкриває файл
2. **Виконання коду:** Виконується код всередині блоку \`with\`
3. **Вихід з блоку:** Python автоматично викликає метод \`__exit__()\`, який закриває файл
4. **Гарантія:** Файл закриється навіть якщо виникла помилка!

**Переваги with:**
- ✅ **Автоматичне закриття** — не потрібно пам'ятати про close()
- ✅ **Безпека** — працює навіть при помилках
- ✅ **Чистіший код** — менше рядків, більш читабельно
- ✅ **Менше помилок** — неможливо забути закрити файл
- ✅ **Pythonic стиль** — рекомендований спосіб роботи з файлами

**Аналогія:** Контекстний менеджер — як автоматичні двері: вони відкриваються, коли ви входите, і автоматично закриваються, коли виходите, навіть якщо щось пішло не так!`
      },
      {
        title: "Базове використання with",
        content: `**Приклад 1: Читання файлу**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закрито!

# Спробувати прочитати після блоку - помилка!
# content = file.read()  # ValueError: I/O operation on closed file
\`\`\`

**Приклад 2: Запис у файл**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок\\n")
    file.write("Це третій рядок")
# Файл автоматично закрито, дані гарантовано збережено!
\`\`\`

**Приклад 3: Додавання до файлу**
\`\`\`python
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("Новий запис\\n")
    file.write("Ще один запис\\n")
# Файл автоматично закрито, дані додано!
\`\`\`

**Приклад 4: Обробка помилок**
\`\`\`python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        result = 10 / 0  # Помилка ділення на нуль!
        print("Цей рядок не виконається")
except ZeroDivisionError:
    print("Помилка обчислення")
# Файл гарантовано закрито, навіть при помилці!
\`\`\`

**Важливо:** 
- Файл закривається автоматично, навіть якщо виникла помилка!
- Після виходу з блоку \`with\` файл вже закритий
- Не потрібно викликати \`file.close()\` вручну`
      },
      {
        title: "Кілька файлів одночасно",
        content: `**Можна відкривати кілька файлів одночасно в одному блоці with:**

**Спосіб 1: Через кому (рекомендовано для коротких рядків)**
\`\`\`python
# Читання з одного файлу та запис у інший
with open("input.txt", "r", encoding="utf-8") as input_file, \\
     open("output.txt", "w", encoding="utf-8") as output_file:
    content = input_file.read()
    output_file.write(content.upper())
# Обидва файли автоматично закрито!
\`\`\`

**Спосіб 2: Вкладені блоки (рекомендовано для довгих рядків)**
\`\`\`python
# Більш читабельний варіант для складних операцій
with open("input.txt", "r", encoding="utf-8") as input_file:
    with open("output.txt", "w", encoding="utf-8") as output_file:
        content = input_file.read()
        output_file.write(content.upper())
# Обидва файли закрито!
\`\`\`

**Приклад: Копіювання файлу**
\`\`\`python
with open("source.txt", "r", encoding="utf-8") as source, \\
     open("copy.txt", "w", encoding="utf-8") as destination:
    destination.write(source.read())
print("Файл скопійовано!")
\`\`\`

**Приклад: Обробка кількох файлів**
\`\`\`python
# Читання з двох файлів та об'єднання в один
with open("file1.txt", "r", encoding="utf-8") as f1, \\
     open("file2.txt", "r", encoding="utf-8") as f2, \\
     open("combined.txt", "w", encoding="utf-8") as combined:
    content1 = f1.read()
    content2 = f2.read()
    combined.write(content1 + "\\n---\\n\\n" + content2)
print("Файли об'єднано!")
\`\`\`

**Важливо:** Всі файли закриваються автоматично в правильному порядку!`
      },
      {
        title: "Порівняння: з with та без with",
        content: `**Без with (старий спосіб - НЕ рекомендується):**
\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
try:
    content = file.read()
    # Якщо тут виникне помилка, close() не викличеться
    result = 10 / 0
finally:
    file.close()  # Потрібно вручну закривати
\`\`\`

**З with (рекомендований спосіб):**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    result = 10 / 0  # Помилка, але файл закриється!
# Файл автоматично закрито!
\`\`\`

**Порівняння:**

| Аспект | Без with | З with |
|--------|----------|--------|
| Кількість рядків | 5-7 рядків | 2-3 рядки |
| Закриття при помилці | Потрібен try/finally | Автоматично |
| Ризик забути close() | Високий | Неможливо |
| Читабельність | Нижча | Вища |
| Pythonic стиль | Ні | Так |

**Переваги with:**
- ✅ Менше коду
- ✅ Автоматичне закриття
- ✅ Працює при помилках
- ✅ Більш читабельний код
- ✅ Менше можливостей для помилок
- ✅ Рекомендований спосіб у Python

**Висновок:** Завжди використовуйте \`with\` для роботи з файлами! Це стандарт у сучасному Python.`
      },
      {
        title: "Практичні поради та найкращі практики",
        content: `**1. Завжди використовуйте with для файлів:**
\`\`\`python
# Правильно ✅
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Неправильно ❌
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
file.close()  # Можна забути!
\`\`\`

**2. Не забувайте encoding='utf-8':**
\`\`\`python
# Правильно ✅
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Неправильно ❌ (може не прочитати українські літери)
with open("data.txt", "r") as file:
    content = file.read()
\`\`\`

**3. Використовуйте файл тільки всередині блоку with:**
\`\`\`python
# Правильно ✅
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
# content доступний тут, file - ні

# Неправильно ❌
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
file.read()  # Помилка! Файл вже закритий
\`\`\`

**4. Для великих файлів використовуйте ітерацію:**
\`\`\`python
# Правильно ✅ (для великих файлів)
with open("large.txt", "r", encoding="utf-8") as file:
    for line in file:
        process(line)  # Обробляємо по рядку

# Неправильно ❌ (завантажує весь файл)
with open("large.txt", "r", encoding="utf-8") as file:
    content = file.read()  # Може викликати проблеми з пам'яттю
\`\`\`

**5. Обробка помилок з with:**
\`\`\`python
# Правильно ✅
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        # Якщо тут помилка, файл все одно закриється
except FileNotFoundError:
    print("Файл не знайдено!")
\`\`\`

**6. Кілька файлів - використовуйте вкладені блоки для читабельності:**
\`\`\`python
# Для складних операцій
with open("input.txt", "r", encoding="utf-8") as input_file:
    with open("output.txt", "w", encoding="utf-8") as output_file:
        # Складна обробка
        content = input_file.read()
        processed = process_content(content)
        output_file.write(processed)
\`\`\``
      },
      {
        title: "Що ще можна використовувати з with?",
        content: `**Контекстні менеджери працюють не тільки з файлами!**

**1. Бібліотеки для роботи з базами даних**
\`\`\`python
# Приклад (псевдокод)
with database.connection() as conn:
    # Робота з базою даних
    conn.execute("SELECT * FROM users")
# З'єднання автоматично закрито
\`\`\`

**2. Блокування потоків (threading)**
\`\`\`python
import threading

lock = threading.Lock()

with lock:
    # Критична секція коду
    # Тільки один потік може виконувати цей код одночасно
    shared_resource += 1
# Блокування автоматично знято
\`\`\`

**3. Власні контекстні менеджери (вивчимо пізніше)**
\`\`\`python
class MyContextManager:
    def __enter__(self):
        # Код при вході в блок
        print("Вхід у блок")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Код при виході з блоку
        print("Вихід з блоку")
        return False  # Не приховуємо помилки

with MyContextManager() as cm:
    # Робота з ресурсом
    print("Всередині блоку")
# Автоматично викликається __exit__()
\`\`\`

**4. Модуль contextlib**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def my_context():
    print("Вхід")
    yield "ресурс"
    print("Вихід")

with my_context() as resource:
    print(f"Використовуємо {resource}")
\`\`\`

**Головна ідея:** Контекстні менеджери гарантують правильне управління ресурсами (файли, з'єднання, блокування) незалежно від того, чи виникла помилка!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове використання with",
      code: `# Читання файлу
with open("students.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закрито!

# Запис у файл
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок\\n")
# Файл автоматично закрито, дані збережено!`,
      explanation: "Демонструє базове використання контекстного менеджера with для читання та запису. Зверніть увагу, що не потрібно викликати close()."
    },
    {
      title: "Приклад 2: Обробка помилок з with",
      code: `# Навіть при помилці файл закриється!
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        result = 10 / 0  # Помилка ділення на нуль
        print("Цей рядок не виконається")
except ZeroDivisionError:
    print("Помилка обчислення")
# Файл гарантовано закрито, навіть при помилці!

# Перевірка, що файл закрито
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
    # Тут файл вже закрито
    file.read()  # Спроба прочитати - помилка!
except ValueError as e:
    print(f"Помилка: {e}")  # I/O operation on closed file`,
      explanation: "Показує, що файл закривається автоматично навіть при помилках. Це головна перевага with перед ручним закриттям."
    },
    {
      title: "Приклад 3: Копіювання файлу з with",
      code: `# Копіювання вмісту одного файлу в інший
with open("source.txt", "r", encoding="utf-8") as source, \\
     open("destination.txt", "w", encoding="utf-8") as destination:
    content = source.read()
    destination.write(content)
    print("Файл скопійовано!")
# Обидва файли автоматично закрито!`,
      explanation: "Демонструє відкриття кількох файлів одночасно з with. Обидва файли закриваються автоматично."
    },
    {
      title: "Приклад 4: Обробка даних з файлу",
      code: `# Читання, обробка та запис
with open("input.txt", "r", encoding="utf-8") as input_file:
    lines = input_file.readlines()

# Обробка даних (поза контекстним менеджером)
processed_lines = []
for line in lines:
    processed_lines.append(line.strip().upper() + "\\n")

# Запис оброблених даних
with open("output.txt", "w", encoding="utf-8") as output_file:
    output_file.writelines(processed_lines)
    print("Дані оброблено та збережено!")`,
      explanation: "Показує читання, обробку та запис даних з використанням with. Дані можна обробляти поза блоком with."
    },
    {
      title: "Приклад 5: Додавання до файлу з with",
      code: `# Додавання записів у лог-файл
from datetime import datetime

def додати_лог(повідомлення):
    """Додає запис у лог-файл з датою та часом."""
    зараз = datetime.now()
    дата_час = зараз.strftime("%Y-%m-%d %H:%M:%S")
    
    with open("app.log", "a", encoding="utf-8") as log_file:
        log_file.write(f"{дата_час}: {повідомлення}\\n")

# Використання
додати_лог("Програма запущена")
додати_лог("Обробка даних")
додати_лог("Програма завершена")

# Читання логів
with open("app.log", "r", encoding="utf-8") as log_file:
    print("=== Логи ===")
    print(log_file.read())`,
      explanation: "Демонструє практичне використання with для логування. Функція може викликатися багато разів, і файл завжди правильно закривається."
    },
    {
      title: "Приклад 6: Об'єднання кількох файлів",
      code: `# Читання з двох файлів та об'єднання в один
with open("file1.txt", "r", encoding="utf-8") as f1, \\
     open("file2.txt", "r", encoding="utf-8") as f2, \\
     open("combined.txt", "w", encoding="utf-8") as combined:
    content1 = f1.read()
    content2 = f2.read()
    combined.write(f"=== Файл 1 ===\\n{content1}\\n\\n")
    combined.write(f"=== Файл 2 ===\\n{content2}")
print("Файли об'єднано!")`,
      explanation: "Показує, як можна відкрити кілька файлів одночасно для складних операцій. Всі файли закриваються автоматично."
    },
    {
      title: "Приклад 7: Обробка великого файлу по рядках",
      code: `# Для великих файлів використовуємо ітерацію
with open("large_file.txt", "r", encoding="utf-8") as file:
    line_count = 0
    word_count = 0
    
    for line in file:
        line_count += 1
        words = line.strip().split()
        word_count += len(words)
    
    print(f"Рядків: {line_count}")
    print(f"Слів: {word_count}")
# Файл автоматично закрито, не завантажуючи весь вміст в пам'ять!`,
      explanation: "Демонструє ефективну обробку великих файлів з використанням ітерації та with. Файл не завантажується повністю в пам'ять."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба використати файл після блоку with",
      explanation: "Після виходу з блоку with файл автоматично закривається. Спроба прочитати або записати викличе ValueError: 'I/O operation on closed file'.",
      correctApproach: "Використовуйте файл тільки всередині блоку with. Якщо потрібні дані після закриття, збережіть їх у змінну всередині блоку: with open('file.txt') as f: content = f.read()"
    },
    {
      mistake: "Використання старого способу (без with) замість with",
      explanation: "Старий спосіб з file.close() більш схильний до помилок, витоку ресурсів та забування закрити файл. Це не Pythonic стиль.",
      correctApproach: "Завжди використовуйте with open() для роботи з файлами - це безпечніше, зручніше та рекомендований спосіб у Python."
    },
    {
      mistake: "Забути encoding='utf-8' в with",
      explanation: "Навіть з with потрібно вказувати кодування для українського тексту. Без encoding='utf-8' може виникнути UnicodeDecodeError.",
      correctApproach: "Завжди вказуйте encoding='utf-8': with open('file.txt', 'r', encoding='utf-8') as file:"
    },
    {
      mistake: "Спроба відкрити файл, який не існує, без обробки помилок",
      explanation: "Якщо файл не існує, open() з режимом 'r' викличе FileNotFoundError, навіть з with. Потрібна обробка помилок.",
      correctApproach: "Використовуйте try/except для обробки FileNotFoundError: try: with open('file.txt', 'r') as f: ... except FileNotFoundError: print('Файл не знайдено')"
    },
    {
      mistake: "Думати, що with тільки для файлів",
      explanation: "Контекстні менеджери використовуються не тільки для файлів, але й для баз даних, блокувань потоків, та інших ресурсів.",
      correctApproach: "Розумійте, що with - це загальний механізм управління ресурсами в Python, не тільки для файлів."
    },
    {
      mistake: "Використання file.close() всередині блоку with",
      explanation: "Це не потрібно та не рекомендується. Файл автоматично закриється при виході з блоку with.",
      correctApproach: "Не викликайте file.close() всередині блоку with - файл закриється автоматично. Просто використовуйте файл."
    }
  ],
  
  summary: `На цьому уроці ми вивчили контекстний менеджер with:

**Ключові концепції:**
1. **with** — контекстний менеджер, який автоматично закриває файли
2. **Синтаксис:** \`with open("file.txt", "r", encoding="utf-8") as file: ...\`
3. **Автоматичне закриття** — файл закривається навіть при помилках
4. **Кілька файлів** — можна відкривати кілька файлів одночасно
5. **Гарантія** — файл завжди закриється правильно

**Переваги with:**
- ✅ Автоматичне закриття файлу
- ✅ Працює навіть при помилках
- ✅ Чистіший та читабельніший код
- ✅ Менше можливостей для помилок
- ✅ Pythonic стиль програмування

**Практичні поради:**
- Завжди використовуйте with для роботи з файлами
- Не забувайте encoding='utf-8' для текстових файлів
- Використовуйте файл тільки всередині блоку with
- Для великих файлів використовуйте ітерацію всередині with

**Рекомендація:** Завжди використовуйте \`with\` для роботи з файлами! Це найбезпечніший та найзручніший спосіб, рекомендований у Python.

Контекстні менеджери - це потужний інструмент для правильного управління ресурсами!`,
  
  practiceTask: {
    title: "Створення системи резервного копіювання з with",
    description: "Створіть повноцінну програму для резервного копіювання файлів з використанням контекстного менеджера with",
    problemStatement: `Створіть програму для резервного копіювання файлів з наступними функціями:

**Функція 1: Створити резервну копію файлу**
- Приймає назву файлу
- Створює копію з назвою "файл_backup.txt"
- Використовує with для обох файлів (джерело та копія)
- Виводить повідомлення про успіх
- Обробляє помилки (FileNotFoundError)

**Функція 2: Створити резервну копію з датою**
- Створює копію з назвою "файл_2024-01-15.txt"
- Використовує поточну дату в назві
- Використовує with
- Обробляє помилки

**Функція 3: Відновити файл з резервної копії**
- Приймає назву оригінального файлу та резервної копії
- Відновлює файл з копії
- Використовує with для обох файлів
- Обробляє помилки

**Функція 4: Створити копію з автоматичною нумерацією**
- Створює копію з назвою "файл_backup_1.txt", "файл_backup_2.txt" тощо
- Перевіряє, які копії вже існують
- Створює нову з наступним номером
- Використовує with

**Вимоги:**
- Використовуйте ТІЛЬКИ with (без file.close())
- Обробіть помилки (FileNotFoundError, PermissionError)
- Використовуйте encoding='utf-8' для всіх текстових файлів
- Додайте перевірку існування файлів через os.path.exists()
- Створіть зручне меню для навігації

**Приклад використання:**
\`\`\`
=== Система резервного копіювання ===
1. Створити резервну копію
2. Створити резервну копію з датою
3. Відновити файл
4. Створити копію з нумерацією
0. Вихід
Виберіть дію: 1
Введіть назву файлу: data.txt
Резервна копія створена: data_backup.txt

Виберіть дію: 4
Введіть назву файлу: data.txt
Резервна копія створена: data_backup_1.txt
\`\`\``,
    inputFormat: "Створіть програму з меню та функціями. Користувач вводить числа для вибору дії та назви файлів.",
    outputFormat: `Приклад виведення:
=== Система резервного копіювання ===
1. Створити резервну копію
2. Створити резервну копію з датою
3. Відновити файл
4. Створити копію з нумерацією
0. Вихід

Виберіть дію: 1
Введіть назву файлу: data.txt
Резервна копія створена: data_backup.txt

Виберіть дію: 4
Введіть назву файлу: data.txt
Резервна копія створена: data_backup_1.txt`,
    examples: [
      {
        input: "Створити копію: data.txt",
        output: "Створено data_backup.txt з використанням with",
        explanation: "Програма створює резервну копію файлу, використовуючи with для обох файлів (джерело та копія)."
      },
      {
        input: "Відновити data.txt з data_backup.txt",
        output: "Файл відновлено з використанням with",
        explanation: "Програма відновлює оригінальний файл з копії, використовуючи with для обох файлів."
      },
      {
        input: "Створити копію з нумерацією для data.txt (якщо вже є data_backup.txt)",
        output: "Створено data_backup_1.txt",
        explanation: "Програма перевіряє існуючі копії та створює нову з наступним номером."
      }
    ],
    solution: {
      code: `from datetime import datetime
import os

def створити_резервну_копію(назва_файлу):
    """Створює резервну копію файлу."""
    if not os.path.exists(назва_файлу):
        print(f"Помилка: Файл '{назва_файлу}' не знайдено!")
        return False
    
    резервна_копія = f"{назва_файлу}_backup.txt"
    
    try:
        with open(назва_файлу, "r", encoding="utf-8") as source, \\
             open(резервна_копія, "w", encoding="utf-8") as backup:
            content = source.read()
            backup.write(content)
        
        print(f"Резервна копія створена: {резервна_копія}")
        return True
    except PermissionError:
        print(f"Помилка: Немає доступу до файлу '{назва_файлу}'")
        return False
    except Exception as e:
        print(f"Помилка при створенні копії: {e}")
        return False

def створити_резервну_копію_з_датою(назва_файлу):
    """Створює резервну копію з датою в назві."""
    if not os.path.exists(назва_файлу):
        print(f"Помилка: Файл '{назва_файлу}' не знайдено!")
        return False
    
    зараз = datetime.now()
    дата = зараз.strftime("%Y-%m-%d")
    
    # Розбиваємо назву файлу на ім'я та розширення
    if "." in назва_файлу:
        ім_я, розширення = назва_файлу.rsplit(".", 1)
        резервна_копія = f"{ім_я}_{дата}.{розширення}"
    else:
        резервна_копія = f"{назва_файлу}_{дата}"
    
    try:
        with open(назва_файлу, "r", encoding="utf-8") as source, \\
             open(резервна_копія, "w", encoding="utf-8") as backup:
            content = source.read()
            backup.write(content)
        
        print(f"Резервна копія з датою створена: {резервна_копія}")
        return True
    except PermissionError:
        print(f"Помилка: Немає доступу до файлу '{назва_файлу}'")
        return False
    except Exception as e:
        print(f"Помилка при створенні копії: {e}")
        return False

def відновити_файл(оригінальний_файл, резервна_копія):
    """Відновлює файл з резервної копії."""
    if not os.path.exists(резервна_копія):
        print(f"Помилка: Резервна копія '{резервна_копія}' не знайдена!")
        return False
    
    try:
        with open(резервна_копія, "r", encoding="utf-8") as backup, \\
             open(оригінальний_файл, "w", encoding="utf-8") as original:
            content = backup.read()
            original.write(content)
        
        print(f"Файл '{оригінальний_файл}' відновлено з '{резервна_копія}'")
        return True
    except PermissionError:
        print(f"Помилка: Немає доступу до файлу")
        return False
    except Exception as e:
        print(f"Помилка при відновленні: {e}")
        return False

def створити_копію_з_нумерацією(назва_файлу):
    """Створює копію з автоматичною нумерацією."""
    if not os.path.exists(назва_файлу):
        print(f"Помилка: Файл '{назва_файлу}' не знайдено!")
        return False
    
    # Знаходимо наступний доступний номер
    номер = 1
    while True:
        if "." in назва_файлу:
            ім_я, розширення = назва_файлу.rsplit(".", 1)
            резервна_копія = f"{ім_я}_backup_{номер}.{розширення}"
        else:
            резервна_копія = f"{назва_файлу}_backup_{номер}"
        
        if not os.path.exists(резервна_копія):
            break
        номер += 1
    
    try:
        with open(назва_файлу, "r", encoding="utf-8") as source, \\
             open(резервна_копія, "w", encoding="utf-8") as backup:
            content = source.read()
            backup.write(content)
        
        print(f"Резервна копія створена: {резервна_копія}")
        return True
    except PermissionError:
        print(f"Помилка: Немає доступу до файлу '{назва_файлу}'")
        return False
    except Exception as e:
        print(f"Помилка при створенні копії: {e}")
        return False

def головне_меню():
    """Головне меню програми."""
    while True:
        print("\\n=== Система резервного копіювання ===")
        print("1. Створити резервну копію")
        print("2. Створити резервну копію з датою")
        print("3. Відновити файл")
        print("4. Створити копію з нумерацією")
        print("0. Вихід")
        
        вибір = input("Виберіть дію: ")
        
        if вибір == "1":
            назва = input("Введіть назву файлу: ")
            створити_резервну_копію(назва)
        elif вибір == "2":
            назва = input("Введіть назву файлу: ")
            створити_резервну_копію_з_датою(назва)
        elif вибір == "3":
            оригінал = input("Введіть назву оригінального файлу: ")
            копія = input("Введіть назву резервної копії: ")
            відновити_файл(оригінал, копія)
        elif вибір == "4":
            назва = input("Введіть назву файлу: ")
            створити_копію_з_нумерацією(назва)
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір! Спробуйте ще раз.")

# Запуск програми
if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє повну програму для резервного копіювання з використанням with для всіх операцій з файлами. Включає обробку помилок, перевірку існування файлів, та роботу з датами та нумерацією. Кожна функція використовує with для гарантованого закриття файлів."
    },
    hints: [
      "Використовуйте with для обох файлів (джерело та призначення) в одному блоці",
      "Використовуйте datetime.now() та strftime('%Y-%m-%d') для форматування дати",
      "Обробіть FileNotFoundError та PermissionError для різних типів помилок",
      "Не забудьте encoding='utf-8' для всіх текстових файлів",
      "Використовуйте os.path.exists() для перевірки існування файлів",
      "Для нумерації використовуйте цикл while для пошуку наступного доступного номера",
      "Розбивайте назву файлу на ім'я та розширення через rsplit('.', 1) для правильної обробки",
      "Не викликайте file.close() - with зробить це автоматично"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить контекстний менеджер with?",
        options: ["Тільки відкриває файл", "Тільки автоматично закриває файл", "Відкриває та автоматично закриває файл", "Тільки читає файл"],
        correctAnswer: 2,
        explanation: "Контекстний менеджер with відкриває файл при вході в блок, дозволяє працювати з ним, і автоматично закриває його після виходу з блоку, навіть при помилках."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться з файлом у цьому коді?\n\n```python\nwith open('data.txt', 'r', encoding='utf-8') as file:\n    content = file.read()\n    result = 10 / 0\nprint('Готово')\n```",
        options: ["Файл залишиться відкритим через помилку", "Файл закриється автоматично навіть при помилці", "Виникне помилка і файл не закриється", "Код не виконається"],
        correctAnswer: 1,
        explanation: "Навіть при помилці (ZeroDivisionError) файл автоматично закриється, бо with гарантує виклик __exit__ при виході з блоку, незалежно від того, чи виникла помилка."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка головна перевага with перед звичайним open() з close()?",
        options: ["Швидше працює", "Автоматично закриває файл навіть при помилках", "Менше пам'яті використовує", "Підтримує більше форматів файлів"],
        correctAnswer: 1,
        explanation: "Головна перевага with - автоматичне закриття файлу навіть якщо виникла помилка, що запобігає витоку ресурсів та забезпечує надійність коду."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nwith open('test.txt', 'w', encoding='utf-8') as f:\n    f.write('Привіт')\nprint(f.closed)\n```",
        options: ["True", "False", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "Після виходу з блоку with файл автоматично закривається, тому f.closed поверне True. Це підтверджує, що файл правильно закрито."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна відкрити кілька файлів одночасно з with?",
        options: ["Ні, тільки один файл", "Так, через кому в одному with", "Так, але тільки для читання", "Так, але потрібні окремі блоки for кожного файлу"],
        correctAnswer: 1,
        explanation: "Так, можна відкрити кілька файлів одночасно: with open('file1.txt') as f1, open('file2.txt') as f2: або через вкладені блоки. Обидва способи працюють."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nwith open('data.txt', 'r', encoding='utf-8') as file:\n    content = file.read()\nfile.read()\n```",
        options: ["Прочитає файл двічі", "Прочитає файл один раз", "ValueError: I/O operation on closed file", "FileNotFoundError"],
        correctAnswer: 2,
        explanation: "Після виходу з блоку with файл автоматично закривається. Спроба прочитати файл після блоку викличе ValueError, бо файл вже закритий."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи потрібно викликати file.close() всередині блоку with?",
        options: ["Так, обов'язково", "Ні, файл закриється автоматично", "Тільки для файлів на запис", "Тільки для великих файлів"],
        correctAnswer: 1,
        explanation: "Ні, не потрібно викликати file.close() всередині блоку with. Файл автоматично закривається при виході з блоку. Виклик close() вручну не потрібен та не рекомендується."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який спосіб роботи з файлами є рекомендованим у Python?",
        options: ["file = open(); file.close()", "with open() as file:", "open() без close()", "Всі способи рівнозначні"],
        correctAnswer: 1,
        explanation: "with open() as file: є рекомендованим способом у Python, бо це Pythonic стиль, безпечніший, автоматично закриває файли, та працює навіть при помилках."
      },
      {
        id: "q9",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Скільки файлів буде автоматично закрито в цьому коді?\n\n```python\nwith open('input.txt', 'r') as f1:\n    with open('output.txt', 'w') as f2:\n        f2.write(f1.read())\n```",
        options: ["1", "2", "0", "Залежить від помилок"],
        correctAnswer: 1,
        explanation: "Обидва файли (f1 та f2) будуть автоматично закриті. Вкладені блоки with закривають файли в зворотному порядку: спочатку f2, потім f1."
      },
      {
        id: "q10",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи потрібно вказувати encoding='utf-8' при використанні with?",
        options: ["Ні, with автоматично використовує utf-8", "Так, encoding потрібно вказувати як і раніше", "Тільки для файлів на запис", "Тільки для українського тексту"],
        correctAnswer: 1,
        explanation: "Так, encoding='utf-8' потрібно вказувати як і раніше: with open('file.txt', 'r', encoding='utf-8') as file:. with не змінює необхідність вказувати кодування для текстових файлів."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
